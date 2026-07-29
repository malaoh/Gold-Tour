import { isPublishable, publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'

/**
 * Só entram perguntas com resposta publicável. Se nenhuma tiver, a seção
 * inteira desaparece — melhor ausência que resposta inventada.
 *
 * `<details>` dá acordeão acessível de graça: teclado, `aria-expanded` e
 * busca na página funcionam sem uma linha de JavaScript.
 */
export function Faq() {
  const items = siteContent.faq.filter((item) => isPublishable(item.answer))
  if (items.length === 0) return null

  return (
    <section className="gt-dark bg-surface text-text" aria-labelledby="faq">
      <div className="mx-auto w-full max-w-[68rem] px-5 py-20 sm:px-8 sm:py-28">
        <h2 id="faq" className="max-w-[18ch] text-2xl">
          Perguntas frequentes.
        </h2>

        <div className="mt-10">
          {items.map((item) => (
            <details key={item.id} className="border-border group border-b">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 font-sans text-lg [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-text-accent shrink-0 text-xl transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="text-text-muted max-w-[62ch] pb-6 text-base">
                {publishable(item.answer)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
