import Link from 'next/link'
import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'
import { externalLinkProps } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { Monogram, Wordmark } from './logo'

/**
 * Cada bloco do rodapé só existe se o dado existir. Não há link vazio nem
 * href="#": o que não foi confirmado simplesmente não aparece.
 */
export function Footer() {
  const { contact, navigation, settings } = siteContent
  const email = publishable(contact.email)
  const address = publishable(contact.address)
  const social = publishable(contact.social)
  const hours = publishable(contact.businessHours)
  const serviceArea = publishable(contact.serviceArea)
  const whatsappUrl = buildWhatsAppUrl()
  const whatsappDisplay = publishable(contact.whatsapp)?.display
  const year = 2026

  // Documento sem texto redigido responde 404. Enquanto isso, o link não
  // aparece: link que leva a lugar nenhum é pior que link ausente (B-11).
  const legalLinks = navigation.legal.filter((item) =>
    siteContent.legal.some(
      (doc) => `/${doc.slug}` === item.href && publishable(doc.body) !== null,
    ),
  )

  return (
    <footer className="gt-dark bg-surface-sunken text-text border-border border-t">
      <div className="mx-auto w-full max-w-[82.5rem] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark tone="light" className="h-9 w-auto" />
            <p className="text-text-muted mt-5 max-w-sm text-base">
              Transfers, receptivo, passeios privativos e transporte executivo em{' '}
              {serviceArea ?? 'Salvador'}. Atendimento próximo, do planejamento ao destino.
            </p>
            {hours && <p className="text-text-muted mt-4 text-sm">{hours}</p>}
          </div>

          <nav aria-label="Rodapé">
            <h2 className="font-sans text-xs tracking-widest uppercase opacity-70">
              Navegação
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {navigation.footer.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-text hover:text-text-accent flex min-h-11 items-center text-base transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-xs tracking-widest uppercase opacity-70">
              Contato
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {whatsappUrl && (
                <li>
                  <a
                    href={whatsappUrl}
                    {...externalLinkProps}
                    className="text-text hover:text-text-accent flex min-h-11 items-center text-base transition-colors"
                  >
                    WhatsApp {whatsappDisplay}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="text-text hover:text-text-accent flex min-h-11 items-center text-base transition-colors"
                  >
                    {email}
                  </a>
                </li>
              )}
              {address?.city && (
                <li className="text-text-muted flex min-h-11 items-center text-base">
                  {address.city}
                  {address.state ? ` — ${address.state}` : ''}
                </li>
              )}
              {social?.map((channel) => (
                <li key={channel.url}>
                  <a
                    href={channel.url}
                    {...externalLinkProps}
                    className="text-text hover:text-text-accent flex min-h-11 items-center text-base transition-colors"
                  >
                    Instagram {channel.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border mt-14 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Monogram size={28} />
            <p className="text-text-muted font-sans text-xs tracking-widest uppercase">
              {settings.siteName} · {publishable(settings.descriptor)}
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-text-muted hover:text-text-accent flex min-h-11 items-center font-sans text-xs transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="text-text-muted font-sans text-xs">© {year} Gold Tour</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
