import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Monogram } from '@/components/site/logo'
import { PageIntro } from '@/components/site/page-intro'
import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return siteContent.fleet.map((vehicle) => ({ slug: vehicle.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const vehicle = siteContent.fleet.find((item) => item.slug === slug)
  return { title: vehicle?.name, description: vehicle?.shortDescription }
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

  return (
    <>
      <PageIntro eyebrow="Frota" title={vehicle.name} description={vehicle.shortDescription} />

      <section className="bg-surface">
        <div className="mx-auto w-full max-w-[82.5rem] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
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
                <div className="flex size-full flex-col items-center justify-center gap-3">
                  <Monogram size={52} />
                  <span className="font-sans text-xs tracking-widest text-[#6b84a0] uppercase">
                    Foto em produção
                  </span>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl">Ficha</h2>
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
                    <dd className="text-base">{luggage}</dd>
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
                    <dd className="text-base">{accessibility}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/solicitar"
                  className="bg-action text-on-action hover:bg-gold-soft inline-flex min-h-13 items-center justify-center rounded-md px-8 font-sans font-medium transition-colors"
                >
                  Solicitar com este veículo
                </Link>
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
