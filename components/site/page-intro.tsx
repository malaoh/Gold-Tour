import type { ReactNode } from 'react'

/** Abertura padrão das páginas internas: sobre marinho, com respiro editorial. */
export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <section className="gt-dark bg-surface text-text">
      <div className="mx-auto w-full max-w-[82.5rem] px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-text-accent font-sans text-xs tracking-[0.25em] uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-[18ch] text-3xl">{title}</h1>
        {description && (
          <p className="text-text-muted mt-6 max-w-[58ch] text-lg">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}
