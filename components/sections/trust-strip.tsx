import { Seal } from '@/components/site/logo'

/**
 * Argumentos operacionais, sem estatística, sem selo e sem número. Cada um
 * descreve algo que a operação faz — não uma qualidade abstrata.
 */
const PILLARS = [
  {
    title: 'Planejamento antes da viagem',
    body: 'O trajeto, o horário e o ponto de encontro são definidos antes de você embarcar. Nada fica para resolver na hora.',
  },
  {
    title: 'Recepção personalizada',
    body: 'Alguém espera por você com identificação, sabe o seu nome e conhece o destino combinado.',
  },
  {
    title: 'Atendimento humano',
    body: 'Você fala com uma equipe, não com um aplicativo. A mesma conversa acompanha a solicitação do início ao fim.',
  },
  {
    title: 'Coordenação do trajeto',
    body: 'Mudou o voo, atrasou a reunião, o grupo se dividiu: o percurso é reorganizado sem que você precise renegociar nada.',
  },
]

export function TrustStrip() {
  return (
    <section className="gt-dark bg-surface text-text" aria-labelledby="confianca">
      <div className="mx-auto w-full max-w-[82.5rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:items-start lg:gap-20">
          <div>
            <Seal size={132} className="opacity-90" />
            <h2 id="confianca" className="mt-8 max-w-[16ch] text-2xl">
              O trabalho começa muito antes do carro chegar.
            </h2>
            <p className="text-text-muted mt-5 max-w-[46ch] text-lg">
              Concierge de mobilidade quer dizer isto: alguém organizou o
              percurso, conferiu o horário e assumiu a responsabilidade pelo
              encontro.
            </p>
          </div>

          <ul className="grid gap-px sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <li key={pillar.title} className="border-border border-t pt-6 sm:px-6">
                <h3 className="font-display text-xl">{pillar.title}</h3>
                <p className="text-text-muted mt-3 text-base">{pillar.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
