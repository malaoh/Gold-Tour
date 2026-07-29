import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'

/**
 * Configuração do WhatsApp.
 *
 * O número é público por natureza — ele aparece na própria URL do wa.me — e
 * por isso vive em `NEXT_PUBLIC_WHATSAPP_E164`. Nenhum segredo do projeto pode
 * usar o prefixo `NEXT_PUBLIC_`.
 *
 * Enquanto o número não for informado (pendência B-02), `getWhatsAppNumber`
 * devolve `null` e todo CTA de conversão deve ser omitido — jamais renderizado
 * como botão morto.
 */

const ENV_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_E164?.trim()

/** Só aceita E.164 brasileiro: 55 + DDD + 8 ou 9 dígitos. */
const E164_BR = /^\+?55\d{10,11}$/

export function getWhatsAppNumber(): string | null {
  if (ENV_NUMBER && E164_BR.test(ENV_NUMBER)) {
    return ENV_NUMBER.replace(/\D/g, '')
  }

  const fromContent = publishable(siteContent.contact.whatsapp)
  if (fromContent && E164_BR.test(fromContent.e164)) {
    return fromContent.e164.replace(/\D/g, '')
  }

  return null
}

export const isWhatsAppConfigured = (): boolean => getWhatsAppNumber() !== null

export type BookingDraft = {
  service?: string
  vehicle?: string
  name?: string
  date?: string
  people?: string
  notes?: string
}

/** Monta a mensagem que o visitante enviará. Só inclui o que foi preenchido. */
export function buildWhatsAppMessage(draft: BookingDraft): string {
  const lines = ['Olá! Gostaria de solicitar um atendimento com a Gold Tour.']

  if (draft.service) lines.push(`Serviço: ${draft.service}`)
  if (draft.vehicle) lines.push(`Veículo preferido: ${draft.vehicle}`)
  if (draft.name) lines.push(`Nome: ${draft.name}`)
  if (draft.date) lines.push(`Data: ${draft.date}`)
  if (draft.people) lines.push(`Passageiros: ${draft.people}`)
  if (draft.notes) lines.push(`Observações: ${draft.notes}`)

  return lines.join('\n')
}

/**
 * URL final do handoff. Devolve `null` quando não há número — o caminho de
 * conversão simplesmente não existe até B-02 ser resolvido.
 */
export function buildWhatsAppUrl(draft: BookingDraft = {}): string | null {
  const number = getWhatsAppNumber()
  if (!number) return null

  const text = encodeURIComponent(buildWhatsAppMessage(draft))
  return `https://wa.me/${number}?text=${text}`
}
