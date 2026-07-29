export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-surface flex min-h-dvh items-center justify-center"
    >
      <span className="sr-only">Carregando…</span>
      <span
        aria-hidden="true"
        className="border-border-strong size-6 animate-spin rounded-full border-2 border-t-transparent"
      />
    </div>
  )
}
