'use client'

import { useRef } from 'react'
import { Button } from './button'

/**
 * Demonstração do overlay usando `<dialog>` nativo: foco preso, fechamento por
 * `Esc` e retorno do foco ao gatilho vêm do navegador, sem biblioteca e sem
 * reimplementar acessibilidade à mão. O BookingSheet da Etapa 07 parte daqui.
 */
export function SheetDemo() {
  const ref = useRef<HTMLDialogElement>(null)

  return (
    <>
      <Button variant="secondary" onClick={() => ref.current?.showModal()}>
        Abrir painel
      </Button>

      <dialog
        ref={ref}
        aria-labelledby="sheet-demo-title"
        className="gt-dark border-border bg-surface text-text backdrop:bg-graphite/70 m-0 mt-auto w-full max-w-lg rounded-t-xl border p-6 sm:mx-auto sm:my-auto sm:rounded-xl"
      >
        <h2 id="sheet-demo-title" className="text-xl">
          Painel de solicitação
        </h2>
        <p className="text-text-muted mt-2 text-base">
          Em mobile este painel sobe do rodapé; em telas maiores ele centraliza. O
          fechamento por <kbd>Esc</kbd> e o foco preso são nativos do elemento{' '}
          <code>dialog</code>.
        </p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => ref.current?.close()}>Continuar</Button>
          <Button variant="secondary" onClick={() => ref.current?.close()}>
            Fechar
          </Button>
        </div>
      </dialog>
    </>
  )
}
