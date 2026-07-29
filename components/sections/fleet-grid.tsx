import Image from 'next/image'
import Link from 'next/link'
import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'
import { Monogram } from '@/components/site/logo'
import type { FleetCategory } from '@/content/schema'

/**
 * Os quatro cards têm a mesma altura, a mesma área de imagem e o mesmo rodapé.
 * Quando não existe foto publicável, o lugar da imagem recebe um painel com o
 * monograma — nunca uma foto de outro veículo, nunca um espaço vazio.
 */
export function FleetCard({ vehicle }: { vehicle: FleetCategory }) {
  const asset = publishable(vehicle.media)
  const src = asset ? publishable(asset.src) : null
  const alt = asset ? publishable(asset.alt) : null
  const capacity = publishable(vehicle.passengerCapacity)
  const luggage = publishable(vehicle.luggageCapacity)

  return (
    <article className="border-border flex h-full flex-col border">
      <div className="bg-navy-deep relative aspect-4/3 overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={alt ?? ''}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3">
            <Monogram size={44} />
            <span className="font-sans text-xs tracking-widest text-[#6b84a0] uppercase">
              Foto em produção
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl">{vehicle.name}</h3>
        <p className="text-text-muted mt-3 flex-1 text-base">{vehicle.shortDescription}</p>

        {(capacity || luggage) && (
          <dl className="text-text-muted mt-5 flex flex-wrap gap-x-6 gap-y-1 font-sans text-sm">
            {capacity && (
              <div className="flex gap-1.5">
                <dt>Até</dt>
                <dd>{capacity} passageiros</dd>
              </div>
            )}
            {luggage && (
              <div className="flex gap-1.5">
                <dt className="sr-only">Bagagem</dt>
                <dd>{luggage}</dd>
              </div>
            )}
          </dl>
        )}

        <Link
          href={`/frota/${vehicle.slug}`}
          className="text-text-accent mt-6 inline-flex min-h-11 items-center font-sans text-sm underline-offset-4 hover:underline"
        >
          Ver detalhes
          <span className="sr-only"> de {vehicle.name}</span>
        </Link>
      </div>
    </article>
  )
}

export function FleetGrid() {
  return (
    <section className="bg-surface" aria-labelledby="frota">
      <div className="mx-auto w-full max-w-[82.5rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="frota" className="max-w-[18ch] text-2xl">
              Um veículo para cada jornada.
            </h2>
            <p className="text-text-muted mt-4 max-w-[54ch] text-lg">
              De um traslado individual à coordenação de um grupo inteiro.
            </p>
          </div>
          <Link
            href="/frota"
            className="text-text-accent inline-flex min-h-11 items-center font-sans text-sm underline-offset-4 hover:underline"
          >
            Ver a frota completa
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {siteContent.fleet.map((vehicle) => (
            <FleetCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  )
}
