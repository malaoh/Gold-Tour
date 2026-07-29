import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  loading?: boolean
  children: ReactNode
}

/**
 * O botão primário usa Ouro Champagne com texto Grafite (7,36:1). Essa
 * combinação foi escolhida porque funciona igual sobre fundo claro e sobre
 * fundo escuro — o CTA não precisa mudar de cor ao mudar de seção.
 *
 * O estado de carregamento nunca é comunicado só pela cor ou só pelo spinner:
 * `aria-busy` mais texto acessível acompanham a mudança visual.
 */
const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-sans font-medium ' +
  'transition-colors duration-fast ease-standard cursor-pointer ' +
  'disabled:cursor-not-allowed disabled:opacity-45'

const variants: Record<Variant, string> = {
  primary: 'bg-action text-on-action hover:bg-gold-soft active:bg-gold-soft',
  secondary:
    'border border-border-strong bg-transparent text-text hover:bg-surface-sunken active:bg-surface-sunken',
  ghost: 'bg-transparent text-text-accent underline-offset-4 hover:underline',
}

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 text-base',
  lg: 'min-h-13 px-7 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
      {loading && <span className="sr-only">Enviando…</span>}
    </button>
  )
}
