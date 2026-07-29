import type { Metadata } from 'next'
import { TourChapters } from '@/components/sections/tour-chapters'
import { PageIntro } from '@/components/site/page-intro'

export const metadata: Metadata = {
  title: 'Passeios',
  description:
    'Salvador histórico, Baía de Todos-os-Santos, orla e roteiros sob medida, com veículo e motorista exclusivos.',
}

export default function PasseiosPage() {
  return (
    <>
      <PageIntro
        eyebrow="Passeios"
        title="A cidade no seu ritmo."
        description="Roteiros privativos, sem horário coletivo e sem grupo desconhecido. O percurso é combinado antes e ajustado durante."
      />
      <TourChapters />
    </>
  )
}
