import { Faq } from '@/components/sections/faq'
import { FinalCta } from '@/components/sections/final-cta'
import { FleetGrid } from '@/components/sections/fleet-grid'
import { Hero } from '@/components/sections/hero'
import { ProcessSteps } from '@/components/sections/process-steps'
import { ServiceSelector } from '@/components/sections/service-selector'
import { TourChapters } from '@/components/sections/tour-chapters'
import { TrustStrip } from '@/components/sections/trust-strip'

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceSelector />
      <TrustStrip />
      <FleetGrid />
      <TourChapters />
      <ProcessSteps />
      <Faq />
      <FinalCta />
    </>
  )
}
