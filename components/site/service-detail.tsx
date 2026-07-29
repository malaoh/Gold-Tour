import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageIntro } from '@/components/site/page-intro'
import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'

/** Página de serviço. Só renderiza o que tem conteúdo publicável. */
export function ServiceDetail({ slug }: { slug: string }) {
  const service = siteContent.services.find((item) => item.slug === slug)
  if (!service) notFound()

  const long = publishable(service.longDescription)
  const includes = publishable(service.includes)

  return (
    <>
      <PageIntro
        eyebrow="Serviço"
        title={service.name}
        description={long ?? service.shortDescription}
      />

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

          <div className="mt-14 flex flex-wrap gap-3">
            <Link
              href={`/solicitar?servico=${service.slug}`}
              className="bg-action text-on-action hover:bg-gold-soft inline-flex min-h-13 items-center justify-center rounded-md px-8 font-sans font-medium transition-colors"
            >
              Solicitar atendimento
            </Link>
            <Link
              href="/servicos"
              className="border-border-strong text-text inline-flex min-h-13 items-center justify-center rounded-md border px-8 font-sans font-medium"
            >
              Ver todos os serviços
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
