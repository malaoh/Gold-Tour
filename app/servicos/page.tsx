import type { Metadata } from 'next'
import Link from 'next/link'
import { PageIntro } from '@/components/site/page-intro'
import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Transfer aeroporto, receptivo, motorista à disposição, passeios privativos e transporte para grupos e eventos em Salvador.',
}

export default function ServicosPage() {
  return (
    <>
      <PageIntro
        eyebrow="Serviços"
        title="Cinco formas de circular por Salvador."
        description="Todas com a mesma base: planejamento antes, motorista dedicado e uma equipe acompanhando o trajeto."
      />

      <section className="bg-surface">
        <div className="mx-auto w-full max-w-[82.5rem] px-5 py-20 sm:px-8">
          <ul className="grid gap-px md:grid-cols-2">
            {siteContent.services.map((service) => {
              const long = publishable(service.longDescription)
              const includes = publishable(service.includes)

              return (
                <li key={service.slug} className="border-border border-t py-8 md:px-8 md:first:pl-0">
                  <h2 className="font-display text-2xl">{service.name}</h2>
                  <p className="text-text-muted mt-3 max-w-[52ch] text-lg">
                    {long ?? service.shortDescription}
                  </p>

                  {includes && (
                    <ul className="mt-5 flex flex-col gap-2">
                      {includes.map((item) => (
                        <li key={item} className="text-text-muted flex gap-3 text-base">
                          <span aria-hidden="true" className="text-text-accent">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                    <Link
                      href={`/solicitar?servico=${service.slug}`}
                      className="text-text-accent inline-flex min-h-11 items-center font-sans text-sm underline-offset-4 hover:underline"
                    >
                      Solicitar este serviço
                    </Link>
                    {service.detailRoute && (
                      <Link
                        href={service.detailRoute}
                        className="text-text-muted hover:text-text-accent inline-flex min-h-11 items-center font-sans text-sm underline-offset-4 hover:underline"
                      >
                        Saber mais
                      </Link>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
