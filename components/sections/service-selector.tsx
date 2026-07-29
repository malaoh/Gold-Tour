import Link from 'next/link'
import { siteContent } from '@/content/site-content'

/** Os quatro caminhos de entrada. Cada um leva ao fluxo já pré-selecionado. */
const QUICK = ['transfer-aeroporto', 'motorista-a-disposicao', 'passeio-privativo', 'grupos-e-eventos']

export function ServiceSelector() {
  const services = QUICK.map((slug) =>
    siteContent.services.find((service) => service.slug === slug),
  ).filter((service) => service !== undefined)

  return (
    <section className="bg-surface" aria-labelledby="escolha-rapida">
      <div className="mx-auto w-full max-w-[82.5rem] px-5 py-20 sm:px-8 sm:py-24">
        <h2 id="escolha-rapida" className="max-w-[20ch] text-2xl">
          Do que você precisa em Salvador?
        </h2>
        <p className="text-text-muted mt-4 max-w-[58ch] text-lg">
          Escolha o ponto de partida. A solicitação já começa com esse serviço
          selecionado.
        </p>

        <ul className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Link
                href={`/solicitar?servico=${service.slug}`}
                className="group border-border hover:bg-surface-sunken focus-visible:bg-surface-sunken flex h-full flex-col border-t p-6 transition-colors lg:border-l lg:first:border-l-0"
              >
                <span className="text-text-accent font-sans text-xs tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display mt-4 text-xl">{service.name}</span>
                <span className="text-text-muted mt-3 text-base">
                  {service.shortDescription}
                </span>
                <span className="text-text-accent mt-6 font-sans text-sm underline-offset-4 group-hover:underline">
                  Solicitar
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
