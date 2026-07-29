import { Seal } from '@/components/site/logo'
import { LiquidLink } from '@/components/ui/liquid-glass-button'
import { externalLinkProps } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export function FinalCta() {
  const whatsappUrl = buildWhatsAppUrl()

  return (
    <section className="gt-dark bg-navy-deep text-text" aria-labelledby="cta-final">
      <div className="mx-auto flex w-full max-w-[68rem] flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
        <Seal size={104} className="opacity-80" />
        <h2 id="cta-final" className="mt-8 max-w-[16ch] text-3xl">
          Vamos planejar seu trajeto?
        </h2>
        <p className="text-text-muted mt-5 max-w-[52ch] text-lg">
          Conte para onde você vai e quando. A equipe responde para acertar os
          detalhes.
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <LiquidLink href="/solicitar" size="xl">
            Iniciar solicitação
          </LiquidLink>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              {...externalLinkProps}
              className="border-border-strong text-text hover:border-gold inline-flex min-h-13 items-center justify-center rounded-md border px-8 font-sans font-medium transition-colors"
            >
              Falar no WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
