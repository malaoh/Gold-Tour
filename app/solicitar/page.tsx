import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookingClient } from '@/components/booking/booking-client'
import { PageIntro } from '@/components/site/page-intro'

export const metadata: Metadata = {
  title: 'Solicitar atendimento',
  description:
    'Conte o serviço, a data e o trajeto. A equipe da Gold Tour responde pelo WhatsApp para confirmar os detalhes.',
  robots: { index: false, follow: true },
}

export default function SolicitarPage() {
  return (
    <>
      <PageIntro
        eyebrow="Solicitação"
        title="Conte o que você precisa."
        description="Leva menos de dois minutos e não exige cadastro. A equipe responde pelo WhatsApp para acertar os detalhes."
      />

      <section className="bg-surface">
        <div className="mx-auto w-full max-w-[68rem] px-5 py-16 sm:px-8 sm:py-20">
          <Suspense fallback={null}>
            <BookingClient />
          </Suspense>
        </div>
      </section>
    </>
  )
}
