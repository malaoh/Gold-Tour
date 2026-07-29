'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { siteContent } from '@/content/site-content'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

const DRAFT_KEY = 'gt:booking-draft'

const schema = z.object({
  service: z.string().min(1, 'Escolha o serviço.'),
  name: z.string().trim().min(2, 'Informe o seu nome.'),
  contact: z.string().trim().min(8, 'Informe um telefone ou e-mail para contato.'),
  date: z.string().optional(),
  people: z.string().optional(),
  notes: z.string().optional(),
})

type Draft = z.infer<typeof schema>
type Errors = Partial<Record<keyof Draft, string>>

const EMPTY: Draft = { service: '', name: '', contact: '', date: '', people: '', notes: '' }

/**
 * Versão de trabalho do fluxo de solicitação: uma tela só, com o serviço já
 * pré-selecionado pela home. O passo a passo completo é a Etapa 07 — mas
 * nenhum CTA do site pode levar a lugar nenhum enquanto isso, então esta tela
 * já monta e entrega a mensagem do WhatsApp de verdade.
 *
 * O rascunho fica em `sessionStorage`: se a pessoa sair para ver a frota e
 * voltar, o que foi preenchido continua lá. Expira com a aba, não vai para
 * lugar nenhum e não é enviado a terceiros.
 */
export function BookingForm() {
  const params = useSearchParams()
  const serviceFromUrl = params.get('servico') ?? ''

  // Este componente só roda no cliente (ver booking-client.tsx), então dá para
  // ler o rascunho já na primeira renderização — sem efeito e sem piscar.
  const [draft, setDraft] = useState<Draft>(() => {
    const stored = sessionStorage.getItem(DRAFT_KEY)
    const restored: Draft = stored ? { ...EMPTY, ...JSON.parse(stored) } : EMPTY
    return serviceFromUrl ? { ...restored, service: serviceFromUrl } : restored
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)

  const update = (key: keyof Draft, value: string) => {
    setDraft((current) => {
      const next = { ...current, [key]: value }
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(next))
      return next
    })
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const result = schema.safeParse(draft)

    if (!result.success) {
      const next: Errors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Draft
        next[key] ??= issue.message
      }
      setErrors(next)
      document.getElementById(`f-${Object.keys(next)[0]}`)?.focus()
      return
    }

    const serviceName =
      siteContent.services.find((item) => item.slug === result.data.service)?.name ??
      result.data.service

    const url = buildWhatsAppUrl({
      service: serviceName,
      name: result.data.name,
      date: result.data.date,
      people: result.data.people,
      notes: [result.data.notes, `Contato: ${result.data.contact}`]
        .filter(Boolean)
        .join(' · '),
    })

    if (!url) return
    setSubmitting(true)
    sessionStorage.removeItem(DRAFT_KEY)
    window.location.href = url
  }

  const whatsappAvailable = buildWhatsAppUrl() !== null

  return (
    <form onSubmit={onSubmit} noValidate className="flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-service" className="text-text font-sans text-sm font-medium">
          Serviço
        </label>
        <select
          id="f-service"
          value={draft.service}
          onChange={(event) => update('service', event.target.value)}
          aria-invalid={errors.service ? true : undefined}
          aria-describedby={errors.service ? 'f-service-error' : undefined}
          className="border-border-strong bg-surface-raised text-text min-h-11 rounded-md border px-3.5 text-base"
        >
          <option value="">Selecione</option>
          {siteContent.services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id="f-service-error" className="text-error text-sm">
            {errors.service}
          </p>
        )}
      </div>

      <Field
        id="f-name"
        label="Nome"
        autoComplete="name"
        value={draft.name}
        onChange={(event) => update('name', event.target.value)}
        error={errors.name}
      />

      <Field
        id="f-contact"
        label="Telefone ou e-mail"
        hint="Para a equipe retomar o contato caso a conversa se perca."
        inputMode="tel"
        autoComplete="tel"
        value={draft.contact}
        onChange={(event) => update('contact', event.target.value)}
        error={errors.contact}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="f-date"
          label="Data"
          type="date"
          value={draft.date ?? ''}
          onChange={(event) => update('date', event.target.value)}
        />
        <Field
          id="f-people"
          label="Passageiros"
          inputMode="numeric"
          placeholder="Ex.: 4"
          value={draft.people ?? ''}
          onChange={(event) => update('people', event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-notes" className="text-text font-sans text-sm font-medium">
          Detalhes do trajeto
        </label>
        <p id="f-notes-hint" className="text-text-muted text-sm">
          Origem, destino, horário, número do voo, bagagens, cadeirinha — o que for
          útil.
        </p>
        <textarea
          id="f-notes"
          rows={4}
          aria-describedby="f-notes-hint"
          value={draft.notes ?? ''}
          onChange={(event) => update('notes', event.target.value)}
          className="border-border-strong bg-surface-raised text-text rounded-md border px-3.5 py-3 text-base"
        />
      </div>

      <p className="text-text-muted text-sm">
        Ao enviar, você abre uma conversa no WhatsApp com esses dados já escritos.
        Nada é armazenado neste site além do rascunho no seu próprio navegador, e a
        confirmação depende da resposta da equipe.
      </p>

      {whatsappAvailable ? (
        <Button type="submit" size="lg" loading={submitting} className="self-start">
          Enviar pelo WhatsApp
        </Button>
      ) : (
        <p className="text-error text-base">
          O canal de WhatsApp ainda não está configurado neste site.
        </p>
      )}
    </form>
  )
}
