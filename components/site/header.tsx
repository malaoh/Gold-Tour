'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { siteContent } from '@/content/site-content'
import { cn } from '@/lib/utils'
import { Wordmark } from './logo'

const nav = siteContent.navigation.primary

/**
 * O header não é sticky. A home abre com vídeo em tela cheia e uma barra fixa
 * comeria a primeira dobra em telas baixas; a navegação volta a ficar à mão no
 * rodapé e no CTA persistente. Sobre a mídia do hero ele fica transparente,
 * com um véu vertical curto garantindo a legibilidade.
 */
export function Header() {
  const pathname = usePathname()
  // Só a home abre com mídia em tela cheia.
  const overMedia = pathname === '/'
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Fecha ao trocar de rota. Ajuste durante a renderização, não em efeito:
  // é derivação de estado, não sincronização com sistema externo.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  // Trava o scroll do fundo sem deslocar a página.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Escape fecha e o foco volta ao gatilho; Tab circula dentro do painel.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus()
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'gt-dark z-40',
        overMedia
          ? 'absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 via-black/25 to-transparent pb-12'
          : 'bg-surface border-border relative border-b',
      )}
    >
      <div className="mx-auto flex w-full max-w-[82.5rem] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          aria-label="Gold Tour — página inicial"
          className="inline-flex min-h-11 shrink-0 items-center"
        >
          <Wordmark tone="light" priority className="h-8 w-auto sm:h-9" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'text-text hover:text-text-accent inline-flex min-h-11 items-center font-sans text-sm tracking-wide transition-colors',
                    isActive(item.href) &&
                      'text-text-accent decoration-current underline underline-offset-8',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/solicitar"
            className="bg-action text-on-action hover:bg-gold-soft hidden min-h-11 items-center rounded-md px-5 font-sans text-sm font-medium whitespace-nowrap transition-colors md:inline-flex"
          >
            Solicitar orçamento
          </Link>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movel"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="border-border-strong text-text inline-flex size-11 items-center justify-center rounded-md border lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cn(
                  'absolute left-0 block h-px w-5 bg-current transition-all duration-200',
                  open ? 'top-1.5 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 block h-px w-5 bg-current transition-all duration-200',
                  open ? 'top-1.5 -rotate-45' : 'top-3',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => {
              setOpen(false)
              triggerRef.current?.focus()
            }}
          />
          <div
            id="menu-movel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="gt-dark bg-surface border-border fixed inset-x-0 top-0 z-50 border-b px-5 pt-20 pb-[max(2rem,env(safe-area-inset-bottom))] lg:hidden"
          >
            <nav aria-label="Principal (móvel)">
              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.href} className="border-border border-b last:border-0">
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={cn(
                        'text-text flex min-h-14 items-center font-display text-xl',
                        isActive(item.href) && 'text-text-accent',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href="/solicitar"
              className="bg-action text-on-action mt-6 flex min-h-12 items-center justify-center rounded-md px-5 font-sans font-medium"
            >
              Solicitar orçamento
            </Link>
          </div>
        </>
      )}
    </header>
  )
}
