import type { Metadata } from 'next'
import { PageIntro } from '@/components/site/page-intro'
import { MetalLink } from '@/components/ui/liquid-glass-button'
import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'
import { externalLinkProps } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale com a equipe da Gold Tour em Salvador.',
  alternates: { canonical: '/contato' },
  openGraph: { title: 'Contato | Gold Tour', description: 'Fale com a equipe da Gold Tour em Salvador.' },
}

export default function ContatoPage() {
  const { contact } = siteContent
  const email = publishable(contact.email)
  const hours = publishable(contact.businessHours)
  const area = publishable(contact.serviceArea)
  const social = publishable(contact.social)
  const whatsappUrl = buildWhatsAppUrl()
  const whatsappDisplay = publishable(contact.whatsapp)?.display

  return (
    <>
      <PageIntro
        eyebrow="Contato"
        title="Fale com a equipe."
        description="Para solicitar um atendimento, o caminho mais rápido é o formulário — ele já organiza as informações que a equipe precisa."
      />

      <section className="bg-surface">
        <div className="mx-auto w-full max-w-[68rem] px-5 py-20 sm:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl">Canais</h2>
              <ul className="mt-6">
                {whatsappUrl && (
                  <li className="border-border border-t py-4">
                    <a
                      href={whatsappUrl}
                      {...externalLinkProps}
                      className="text-text-accent inline-flex min-h-11 items-center text-base underline-offset-4 hover:underline"
                    >
                      WhatsApp {whatsappDisplay}
                    </a>
                  </li>
                )}
                {email && (
                  <li className="border-border border-t py-4">
                    <a
                      href={`mailto:${email}`}
                      className="text-text-accent inline-flex min-h-11 items-center text-base underline-offset-4 hover:underline"
                    >
                      {email}
                    </a>
                  </li>
                )}
                {social?.map((channel) => (
                  <li key={channel.url} className="border-border border-t py-4">
                    <a
                      href={channel.url}
                      {...externalLinkProps}
                      className="text-text-accent inline-flex min-h-11 items-center text-base underline-offset-4 hover:underline"
                    >
                      Instagram {channel.handle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl">Atendimento</h2>
              <dl className="mt-6">
                {area && (
                  <div className="border-border border-t py-4">
                    <dt className="text-text-muted font-sans text-sm">Área de atuação</dt>
                    <dd className="mt-1 text-base">{area}</dd>
                  </div>
                )}
                {hours && (
                  <div className="border-border border-t py-4">
                    <dt className="text-text-muted font-sans text-sm">Horário</dt>
                    <dd className="mt-1 text-base">{hours}</dd>
                  </div>
                )}
              </dl>

              <MetalLink href="/solicitar" variant="gold" className="mt-10">
                Solicitar atendimento
              </MetalLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
