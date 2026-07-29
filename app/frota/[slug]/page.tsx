import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Monogram } from '@/components/site/logo'
import { PageIntro } from '@/components/site/page-intro'
import { MetalLink } from '@/components/ui/liquid-glass-button'
import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return siteContent.fleet.map((vehicle) => ({ slug: vehicle.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const vehicle = siteContent.fleet.find((item) => item.slug === slug)
  if (!vehicle) return {}
  return {
    title: vehicle.name,
    description: vehicle.shortDescription,
    alternates: { canonical: `/frota/${vehicle.slug}` },
    openGraph: { title: vehicle.name, description: vehicle.shortDescription },
  }
}

export default async function VeiculoPage({ params }: Params) {
  const { slug } = await params
  const vehicle = siteContent.fleet.find((item) => item.slug === slug)
  if (!vehicle) notFound()

  const asset = publishable(vehicle.media)
  const src = asset ? publishable(asset.src) : null
  const alt = asset ? publishable(asset.alt) : null
  const capacity = publishable(vehicle.passengerCapacity)
  const luggage = publishable(vehicle.luggageCapacity)
  const amenities = publishable(vehicle.amenities)
  const accessibility = publishable(vehicle.accessibility)
  const gallery = publishable(vehicle.gallery)

  return (
    <>
      <PageIntro eyebrow="Frota" title={vehicle.name} description={vehicle.shortDescription}>
        <nav aria-label="Trilha" className="mt-8 font-sans text-sm">
          <ol className="text-text-muted flex flex-wrap items-center gap-2">
            <li>
              <Link href="/frota" className="hover:text-text-accent underline-offset-4 hover:underline">
                Frota
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text" aria-current="page">
              {vehicle.name}
            </li>
          </ol>
        </nav>
      </PageIntro>

      <section className="bg-surface">
        <div className="mx-auto w-full max-w-[82.5rem] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="bg-navy-deep relative aspect-4/3 overflow-hidden">
                {src ? (
                  <Image
                    src={src}
                    alt={alt ?? ''}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center gap-3 px-8 text-center">
                    <Monogram size={52} />
                    <span className="font-sans text-xs tracking-widest text-[#6b84a0] uppercase">
                      Imagem em curadoria
                    </span>
                    <p className="max-w-[32ch] text-sm text-[#a8b4c2]">
                      Ainda não temos uma fotografia própria e confiável deste veículo.
                      Ela será publicada assim que estiver disponível.
                    </p>
                  </div>
                )}
              </div>

              {gallery && gallery.length > 0 && (
                <ul className="mt-4 grid grid-cols-3 gap-3">
                  {gallery.map((item) => {
                    const itemSrc = publishable(item.src)
                    const itemAlt = publishable(item.alt)
                    if (!itemSrc) return null
                    return (
                      <li key={item.id} className="bg-navy-deep relative aspect-square overflow-hidden">
                        <Image
                          src={itemSrc}
                          alt={itemAlt ?? ''}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            <div>
              <h2 className="text-2xl">Uso recomendado</h2>
              <p className="text-text-muted mt-3 max-w-[46ch] text-lg">
                {vehicle.shortDescription}
              </p>

              <h2 className="mt-10 text-2xl">Ficha</h2>
              <dl className="mt-6">
                {capacity && (
                  <div className="border-border flex justify-between gap-6 border-t py-4">
                    <dt className="text-text-muted font-sans text-sm">Passageiros</dt>
                    <dd className="text-base">Até {capacity}</dd>
                  </div>
                )}
                {luggage && (
                  <div className="border-border flex justify-between gap-6 border-t py-4">
                    <dt className="text-text-muted font-sans text-sm">Bagagem</dt>
                    <dd className="max-w-[22ch] text-right text-base">{luggage}</dd>
                  </div>
                )}
                {amenities && (
                  <div className="border-border flex justify-between gap-6 border-t py-4">
                    <dt className="text-text-muted font-sans text-sm">A bordo</dt>
                    <dd className="max-w-[24ch] text-right text-base">
                      {amenities.join(' · ')}
                    </dd>
                  </div>
                )}
                {accessibility && (
                  <div className="border-border flex justify-between gap-6 border-t py-4">
                    <dt className="text-text-muted font-sans text-sm">Acessibilidade</dt>
                    <dd className="max-w-[22ch] text-right text-base">{accessibility}</dd>
                  </div>
                )}
                {!capacity && !luggage && !amenities && !accessibility && (
                  <p className="border-border text-text-muted border-t py-4 text-base">
                    Capacidade, bagagem e comodidades ainda estão em confirmação com a
                    operação. Fale com a equipe para os detalhes deste veículo.
                  </p>
                )}
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                <MetalLink href={`/solicitar?veiculo=${vehicle.slug}`} variant="gold">
                  Solicitar com este veículo
                </MetalLink>
                <Link
                  href="/frota"
                  className="border-border-strong text-text inline-flex min-h-13 items-center justify-center rounded-md border px-8 font-sans font-medium"
                >
                  Voltar à frota
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
