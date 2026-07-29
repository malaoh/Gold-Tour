const STEPS = [
  {
    title: 'Solicite',
    body: 'Conte o serviço, a data e o trajeto. Leva menos de dois minutos e não exige cadastro.',
  },
  {
    title: 'Confirme com a equipe',
    body: 'Alguém responde pelo WhatsApp para acertar os detalhes e confirmar o que ficou combinado.',
  },
  {
    title: 'Viaje com acompanhamento',
    body: 'No dia, você sabe quem vai buscar, a que horas e por onde. Se algo mudar, a equipe reorganiza.',
  },
]

export function ProcessSteps() {
  return (
    <section className="bg-surface" aria-labelledby="como-funciona">
      <div className="mx-auto w-full max-w-[82.5rem] px-5 py-20 sm:px-8 sm:py-28">
        <h2 id="como-funciona" className="max-w-[18ch] text-2xl">
          Como funciona.
        </h2>

        <ol className="mt-12 grid gap-px md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="border-border border-t pt-6 md:px-6 md:first:pl-0">
              <span className="text-text-accent font-display text-3xl">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display mt-4 text-xl">{step.title}</h3>
              <p className="text-text-muted mt-3 text-base">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
