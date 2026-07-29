import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageIntro } from '@/components/site/page-intro'
import { MetalLink } from '@/components/ui/liquid-glass-button'
import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'

/** O que ajuda a equipe a organizar qualquer um dos atendimentos — não muda por serviço. */
const HELPFUL_INFO = [
  'Data e horário desejados',
  'Origem e destino do trajeto',
  'Número de passageiros',
  'Número do voo, quando o atendimento envolve aeroporto',
]

/** Página de serviço. Só renderiza o que tem conteúdo publicável. */
export function ServiceDetail({ slug }: { slug: string }) {
  const service = siteContent.services.find((item) => item.slug === slug)
  if (!service) notFound()

  const long = publishable(service.longDescription)
  const includes = publishable(service.includes)

  return (
    <>
      <PageIntro eyebrow="Serviço" title={service.name} description={long ?? service.shortDescription}>
        <nav aria-label="Trilha" className="mt-8 font-sans text-sm">
          <ol className="text-text-muted flex flex-wrap items-center gap-2">
            <li>
              <Link href="/servicos" className="hover:text-text-accent underline-offset-4 hover:underline">
                Serviços
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text" aria-current="page">
              {service.name}
            </li>
          </ol>
        </nav>
      </PageIntro>

      <section className="bg-surface">
        <div className="mx-auto w-full max-w-[68rem] px-5 py-20 sm:px-8">
          {includes && (
            <>
              <h2 className="text-2xl">O que está incluído</h2>
              <ul className="mt-8 grid gap-px sm:grid-cols-2">
                {includes.map((item) => (
                  <li key={item} className="border-border border-t py-5 sm:px-6 sm:first:pl-0">
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-14 text-2xl">Como solicitar</h2>
          <p className="text-text-muted mt-3 max-w-[58ch] text-lg">
            Pelo formulário do site ou direto no WhatsApp. Quanto mais destes
            detalhes vierem já na primeira mensagem, mais rápido a equipe
            confirma:
          </p>
          <ul className="mt-5 flex flex-col gap-2">
            {HELPFUL_INFO.map((item) => (
              <li key={item} className="text-text-muted flex gap-3 text-base">
                <span aria-hidden="true" className="text-text-accent">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <MetalLink href={`/solicitar?servico=${service.slug}`} variant="gold">
              Solicitar atendimento
            </MetalLink>
            <Link
              href="/servicos"
              className="border-border-strong text-text inline-flex min-h-13 items-center justify-center rounded-md border px-8 font-sans font-medium"
            >
              Ver todos os serviços
            </Link>
          </div>

          <div className="border-border mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t pt-6">
            <Link
              href="/frota"
              className="text-text-accent inline-flex min-h-11 items-center font-sans text-sm underline-offset-4 hover:underline"
            >
              Ver a frota disponível
            </Link>
            <Link
              href="/passeios"
              className="text-text-accent inline-flex min-h-11 items-center font-sans text-sm underline-offset-4 hover:underline"
            >
              Conhecer os passeios
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
