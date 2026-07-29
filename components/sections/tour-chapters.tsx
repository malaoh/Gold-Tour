import Image from 'next/image'
import Link from 'next/link'
import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'

/**
 * Capítulos alternados: imagem e texto trocam de lado a cada bloco no desktop
 * e empilham em mobile mantendo a mesma ordem de leitura. Usa o poster do
 * vídeo, não o vídeo — quatro vídeos rodando juntos seria exatamente o tipo de
 * excesso que o sistema de motion proíbe.
 *
 * `context` evita CTA morto: na home, "Conhecer os passeios" leva a
 * `/passeios`; dentro de `/passeios` esse link seria circular, então vira
 * "Solicitar este roteiro", ligado direto ao fluxo de solicitação.
 */
export function TourChapters({ context = 'home' }: { context?: 'home' | 'passeios' }) {
  return (
    <section className="gt-dark bg-surface-sunken text-text" aria-labelledby="salvador">
      <div className="mx-auto w-full max-w-[82.5rem] px-5 py-20 sm:px-8 sm:py-28">
        <h2 id="salvador" className="max-w-[16ch] text-2xl">
          Salvador do seu jeito.
        </h2>
        <p className="text-text-muted mt-4 max-w-[56ch] text-lg">
          A mesma cidade muda conforme a hora, o trajeto e a companhia. Estas são
          as regiões mais pedidas como ponto de partida — o roteiro dentro delas é
          combinado com você, não fechado de antemão.
        </p>

        <div className="mt-16 flex flex-col gap-20 sm:gap-28">
          {siteContent.tours.map((tour, index) => {
            const asset = publishable(tour.media)
            const poster = asset?.poster ? publishable(asset.poster) : null
            const alt = asset ? publishable(asset.alt) : null
            const reversed = index % 2 === 1

            return (
              <article
                key={tour.slug}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                {poster && (
                  <div
                    className={`relative aspect-16/10 overflow-hidden ${
                      reversed ? 'lg:order-2' : ''
                    }`}
                  >
                    <Image
                      src={poster}
                      alt={alt ?? ''}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className={reversed ? 'lg:order-1' : ''}>
                  <p className="text-text-accent font-sans text-xs tracking-[0.25em] uppercase">
                    Capítulo {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display mt-4 text-2xl">{tour.name}</h3>
                  <p className="text-text-muted mt-4 max-w-[48ch] text-lg">{tour.summary}</p>
                  {context === 'passeios' ? (
                    <Link
                      href="/solicitar?servico=passeio-privativo"
                      className="text-text-accent mt-6 inline-flex min-h-11 items-center font-sans text-sm underline-offset-4 hover:underline"
                    >
                      Solicitar este roteiro
                    </Link>
                  ) : (
                    <Link
                      href="/passeios"
                      className="text-text-accent mt-6 inline-flex min-h-11 items-center font-sans text-sm underline-offset-4 hover:underline"
                    >
                      Conhecer os passeios
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
