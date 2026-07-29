import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  /** `flat` é o padrão: borda fina, sem sombra. */
  elevation?: 'flat' | 'raised'
  className?: string
}

/**
 * Card discreto por decisão de direção: borda fina, raio pequeno, sem brilho.
 * A variante `raised` existe para overlays e para o card de frota em foco —
 * não para repetir "cartão premium" em toda seção.
 */
export function Card({ children, elevation = 'flat', className = '' }: CardProps) {
  const tone = elevation === 'raised' ? 'bg-surface-raised shadow-md' : 'bg-transparent'

  return (
    <div
      className={`border-border flex flex-col rounded-lg border p-5 ${tone} ${className}`}
    >
      {children}
    </div>
  )
}

type BadgeProps = {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'success' | 'error'
}

const badgeTones: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'border-border-strong text-text-muted',
  accent: 'border-current text-text-accent',
  success: 'border-current text-success',
  error: 'border-current text-error',
}

/** Badge sempre carrega texto — a cor nunca é o único portador do significado. */
export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-sans text-xs tracking-wide uppercase ${badgeTones[tone]}`}
    >
      {children}
    </span>
  )
}
