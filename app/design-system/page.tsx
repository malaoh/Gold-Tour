import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge, Card } from '@/components/ui/card'
import { Field } from '@/components/ui/field'
import { SheetDemo } from '@/components/ui/sheet-demo'

/**
 * Página interna de demonstração do design system (Etapa 03).
 * Não é parte do site: em produção ela responde 404, e o robots marca noindex.
 */
export const metadata: Metadata = {
  title: 'Design system — uso interno',
  robots: { index: false, follow: false },
}

const swatches = [
  ['Grafite', '#1C1F23', 'texto e superfície profunda'],
  ['Azul Marinho', '#0B1D33', 'superfície escura institucional'],
  ['Ouro Champagne', '#C8A96A', 'assinatura e ação'],
  ['Off-White', '#F7F5F0', 'superfície clara'],
  ['Ouro tinta', '#7A5F28', 'texto e link em fundo claro'],
]

const scale = [
  ['text-4xl', 'Salvador começa antes'],
  ['text-3xl', 'Salvador começa antes'],
  ['text-2xl', 'Salvador começa antes'],
  ['text-xl', 'Salvador começa antes'],
  ['text-lg', 'Salvador começa antes'],
  ['text-base', 'Salvador começa antes de você chegar.'],
  ['text-sm', 'Salvador começa antes de você chegar.'],
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-border border-t py-10">
      <h2 className="mb-6 text-2xl">{title}</h2>
      {children}
    </section>
  )
}

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main className="mx-auto w-full max-w-[68rem] px-5 py-12">
      <p className="text-text-accent text-sm tracking-widest uppercase">Uso interno</p>
      <h1 className="mt-2 text-3xl">Design system Gold Tour</h1>
      <p className="text-text-muted mt-3 max-w-prose text-lg">
        Tokens e estados dos componentes-base. Esta rota não é publicada.
      </p>

      <Section title="Cores">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {swatches.map(([name, hex, use]) => (
            <li key={hex} className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="border-border size-14 shrink-0 rounded-md border"
                style={{ backgroundColor: hex }}
              />
              <span className="flex flex-col">
                <span className="font-medium">{name}</span>
                <span className="text-text-muted text-sm">
                  {hex} — {use}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="text-text-muted mt-5 max-w-prose text-sm">
          O Ouro Champagne tem 2,1:1 sobre o Off-White e por isso não carrega texto em
          fundo claro. Nesse caso entra o Ouro tinta, com 5,5:1.
        </p>
      </Section>

      <Section title="Superfícies">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-border bg-surface rounded-lg border p-6">
            <h3 className="text-lg">Claro</h3>
            <p className="text-text-muted mt-2">Texto de apoio em superfície clara.</p>
            <a
              href="#"
              className="text-text-accent mt-3 inline-block underline underline-offset-4"
            >
              Link de exemplo
            </a>
          </div>
          <div className="gt-dark border-border bg-surface text-text rounded-lg border p-6">
            <h3 className="text-lg">Escuro</h3>
            <p className="text-text-muted mt-2">Texto de apoio em superfície escura.</p>
            <a
              href="#"
              className="text-text-accent mt-3 inline-block underline underline-offset-4"
            >
              Link de exemplo
            </a>
          </div>
        </div>
      </Section>

      <Section title="Tipografia">
        <ul className="flex flex-col gap-3">
          {scale.map(([cls, sample]) => (
            <li key={cls} className="flex flex-col gap-1">
              <span className="text-text-muted font-sans text-xs">{cls}</span>
              <span
                className={`${cls} ${cls === 'text-base' || cls === 'text-sm' ? 'font-sans' : 'font-display'}`}
              >
                {sample}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Botões e estados">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Solicitar atendimento</Button>
          <Button variant="secondary">Conhecer serviços</Button>
          <Button variant="ghost">Ver detalhes</Button>
          <Button loading>Enviando</Button>
          <Button disabled>Indisponível</Button>
          <Button size="lg">Tamanho grande</Button>
        </div>
        <p className="text-text-muted mt-4 max-w-prose text-sm">
          Hover, active e focus existem em todos. Navegue com <kbd>Tab</kbd>: o anel de
          foco aparece com 2 px e 3 px de afastamento, em Azul Marinho no claro e em Ouro
          no escuro.
        </p>
      </Section>

      <Section title="Campos">
        <div className="grid max-w-xl gap-5">
          <Field id="f-nome" label="Nome" placeholder="Como podemos chamar você" />
          <Field
            id="f-voo"
            label="Número do voo"
            hint="Opcional. Ajuda a acompanhar a sua chegada."
            placeholder="Ex.: G3 1234"
          />
          <Field
            id="f-erro"
            label="WhatsApp"
            error="Informe um número com DDD."
            defaultValue="9999"
          />
          <Field id="f-off" label="Campo desativado" disabled value="" readOnly />
        </div>
      </Section>

      <Section title="Cards e badges">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <Badge>Frota</Badge>
            <h3 className="mt-3 text-lg">Corolla Executivo</h3>
            <p className="text-text-muted mt-2">
              Discrição e conforto para deslocamentos individuais ou em pequenos grupos.
            </p>
          </Card>
          <Card elevation="raised">
            <Badge tone="accent">Em destaque</Badge>
            <h3 className="mt-3 text-lg">Sprinter Executiva</h3>
            <p className="text-text-muted mt-2">
              Espaço e praticidade para grupos, transfers e roteiros.
            </p>
          </Card>
          <Card>
            <div className="flex gap-2">
              <Badge tone="success">Confirmado</Badge>
              <Badge tone="error">Pendente</Badge>
            </div>
            <h3 className="mt-3 text-lg">Estados de dado</h3>
            <p className="text-text-muted mt-2">
              Uso interno. Nenhum destes rótulos aparece para o visitante.
            </p>
          </Card>
        </div>
      </Section>

      <Section title="Overlay">
        <SheetDemo />
      </Section>

      <Section title="Motion">
        <p className="text-text-muted max-w-prose">
          Durações: 90 ms instantâneo, 160 ms rápido, 240 ms base, 420 ms lento. Curva
          padrão <code>cubic-bezier(0.2, 0, 0.15, 1)</code>. Com{' '}
          <code>prefers-reduced-motion: reduce</code>, toda transição cai para 0,01 ms e o
          vídeo é substituído pelo poster.
        </p>
      </Section>
    </main>
  )
}
