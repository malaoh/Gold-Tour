'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Sem serviço de telemetria contratado (pendência B-14): o erro fica no
    // console do navegador e nos logs do servidor, e nada é enviado a terceiros.
    console.error(error)
  }, [error])

  return (
    <main
      id="conteudo"
      className="gt-dark bg-surface text-text flex min-h-dvh flex-col items-center justify-center px-5 py-24 text-center"
    >
      <p className="text-text-accent font-sans text-sm tracking-widest uppercase">
        Algo deu errado
      </p>
      <h1 className="mt-3 max-w-2xl text-3xl">Não conseguimos carregar esta página.</h1>
      <p className="text-text-muted mt-4 max-w-prose text-lg">
        Tente novamente. Se continuar, atualize a página em alguns instantes.
      </p>
      <button
        onClick={reset}
        className="bg-action text-on-action mt-8 inline-flex min-h-11 cursor-pointer items-center rounded-md px-6 font-sans font-medium"
      >
        Tentar de novo
      </button>
    </main>
  )
}
