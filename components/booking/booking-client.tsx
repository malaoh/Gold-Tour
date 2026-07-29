'use client'

import dynamic from 'next/dynamic'

/**
 * O formulário lê o rascunho da sessão e a query string, e nada disso existe
 * no servidor. Renderizar só no cliente evita divergência de hidratação e
 * dispensa o efeito de "restaurar depois que montou".
 */
const BookingForm = dynamic(
  () => import('./booking-form').then((mod) => mod.BookingForm),
  {
    ssr: false,
    loading: () => (
      <p role="status" className="text-text-muted text-base">
        Carregando formulário…
      </p>
    ),
  },
)

export function BookingClient() {
  return <BookingForm />
}
