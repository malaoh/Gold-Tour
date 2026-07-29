import type { InputHTMLAttributes } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  error?: string
}

/**
 * Campo com label real e visível — nunca placeholder no lugar do rótulo.
 * O erro fica junto do campo, é ligado por `aria-describedby` e vem
 * acompanhado de `aria-invalid`, de modo que a informação não dependa da cor.
 */
export function Field({ label, hint, error, id, className = '', ...props }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-text font-sans text-sm font-medium">
        {label}
      </label>

      {hint && (
        <p id={hintId} className="text-text-muted text-sm">
          {hint}
        </p>
      )}

      <input
        {...props}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={
          'bg-surface-raised text-text min-h-11 rounded-md border px-3.5 text-base ' +
          'duration-fast ease-standard transition-colors ' +
          'placeholder:text-text-muted disabled:opacity-45 ' +
          (error ? 'border-error' : 'border-border-strong') +
          ` ${className}`
        }
      />

      {error && (
        <p id={errorId} className="text-error flex items-center gap-1.5 text-sm">
          <span aria-hidden="true">▲</span>
          {error}
        </p>
      )}
    </div>
  )
}
