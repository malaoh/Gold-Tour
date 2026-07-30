import type { Metadata } from 'next'
import { Faq } from '@/components/sections/faq'
import { FinalCta } from '@/components/sections/final-cta'
import { FleetGrid } from '@/components/sections/fleet-grid'
import { Hero } from '@/components/sections/hero'
import { ProcessSteps } from '@/components/sections/process-steps'
import { SalvadorChapters } from '@/components/sections/salvador-chapters'
import { ServiceSelector } from '@/components/sections/service-selector'
import { TrustStrip } from '@/components/sections/trust-strip'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/**
 * Ordem da home. Diferença em relação à versão anterior: o palco de capítulos
 * (`SalvadorChapters`) vem **antes** da frota, e seu último capítulo é o
 * veículo — então a jornada cinematográfica desagua naturalmente na grade de
 * frota, em vez de a frota aparecer solta no meio da página.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ServiceSelector />
      <TrustStrip />
      <SalvadorChapters />
      <FleetGrid />
      <ProcessSteps />
      <Faq />
      <FinalCta />
    </>
  )
}
