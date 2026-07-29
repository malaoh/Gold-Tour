/**
 * Utilitários compartilhados. Mantidos sem dependência externa: `cn` resolve o
 * que `clsx` resolveria e não há conflito de classes Tailwind complexo o
 * bastante para justificar `tailwind-merge`.
 */

type ClassValue = string | number | false | null | undefined

/** Compõe classes ignorando valores falsos. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}

/** `true` quando o visitante pediu menos movimento. Seguro no servidor. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Autoplay de vídeo só é aceitável em tela grande e sem preferência de
 * redução. Em mobile o padrão é poster com play manual — economia de dados e
 * respeito à decisão de quem navega.
 */
export function shouldAutoplayVideo(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  if (prefersReducedMotion()) return false
  return window.matchMedia('(min-width: 768px)').matches
}

/**
 * `true` num dispositivo de toque. Não muda depois do primeiro toque, então
 * um valor estático lido via `useSyncExternalStore` evita o padrão
 * "setState dentro de useEffect" — sem assinatura real, só uma leitura preguiçosa.
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/** Atributos obrigatórios de link externo — sempre seguros. */
export const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const

/** Formata um número E.164 para exibição brasileira: +55 71 9xxxx-xxxx. */
export function formatBrazilianPhone(e164: string): string {
  const digits = e164.replace(/\D/g, '')
  const match = /^55(\d{2})(\d{4,5})(\d{4})$/.exec(digits)
  if (!match) return e164
  return `+55 ${match[1]} ${match[2]}-${match[3]}`
}
