import type { Metadata } from 'next'
import { FleetCard } from '@/components/sections/fleet-grid'
import { PageIntro } from '@/components/site/page-intro'
import { siteContent } from '@/content/site-content'

export const metadata: Metadata = {
  title: 'Frota',
  description:
    'Corolla Executivo, Sprinter Executiva, Micro-ônibus Executivo e Doblò Executiva para transfers, passeios e grupos em Salvador.',
  alternates: { canonical: '/frota' },
  openGraph: {
    title: 'Frota | Gold Tour',
    description:
      'Corolla Executivo, Sprinter Executiva, Micro-ônibus Executivo e Doblò Executiva para transfers, passeios e grupos em Salvador.',
  },
}

export default function FrotaPage() {
  return (
    <>
      <PageIntro
        eyebrow="Frota"
        title="Quatro categorias, um mesmo padrão."
        description="A escolha do veículo depende de quantas pessoas viajam, de quanta bagagem existe e do tipo de trajeto. A equipe ajuda a decidir na hora da solicitação."
      />

      <section className="bg-surface">
        <div className="mx-auto w-full max-w-[82.5rem] px-5 py-20 sm:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {siteContent.fleet.map((vehicle, index) => (
              <FleetCard key={vehicle.slug} vehicle={vehicle} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
