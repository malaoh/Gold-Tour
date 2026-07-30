'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

/**
 * Palco cinematográfico de capítulos — o núcleo da experiência da home.
 *
 * Arquitetura: a `<section>` tem altura de N×100svh e contém um filho
 * `sticky top-0` de 100svh. Enquanto a seção rola, o palco fica preso na tela
 * e o capítulo ativo muda — o vídeo faz crossfade, o texto troca, o rail
 * atualiza. É scroll nativo: não há scroll-jacking, a barra do navegador
 * continua se comportando normalmente e o teclado funciona.
 *
 * Por que controller próprio e não componente do 21st.dev: nenhum dos seis
 * avaliados troca vídeo por capítulo, e nenhum tem rail clicável, indicador
 * 01/04 ou deep link por hash. Ver docs/21st-component-audit.md.
 *
 * Cada capítulo tem uma âncora real (`<div id>`) posicionada no ponto do
 * scroll onde ele fica ativo, então `/#capitulo-x` e o botão voltar do
 * navegador funcionam sem código especial.
 */

export type Chapter = {
  id: string
  eyebrow: string
  title: string
  body: string
  /** Vídeo do capítulo, já otimizado em /public/media. */
  video: string
  /** Poster — é o que aparece antes do vídeo e em reduced-motion. */
  poster: string
  alt: string
  /** `object-position` por capítulo: cada frame tem um ponto de interesse. */
  focus?: string
  cta?: { label: string; href: string }
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function subscribeReducedMotion(onChange: () => void) {
  const list = window.matchMedia(REDUCED_MOTION)
  list.addEventListener('change', onChange)
  return () => list.removeEventListener('change', onChange)
}

export function ChapterStage({
  chapters,
  heading,
  skipTargetId,
}: {
  chapters: Chapter[]
  /** Nome acessível da seção. Fica em `sr-only`: no palco em tela cheia, o
   * título de cada capítulo é que carrega o conteúdo visível. */
  heading: string
  /** id da próxima seção — destino do "Pular experiência". */
  skipTargetId: string
}) {
  const [active, setActive] = useState(0)
  /** O palco está perto da viewport? Enquanto false, nenhum vídeo é buscado. */
  const [stageNear, setStageNear] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const anchorRefs = useRef<(HTMLDivElement | null)[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  )

  // Capítulo ativo pelo IntersectionObserver das âncoras. Sem cálculo por
  // pixel no scroll: o navegador avisa quando a âncora cruza o meio da tela.
  useEffect(() => {
    const anchors = anchorRefs.current.filter(Boolean) as HTMLDivElement[]
    if (anchors.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = anchors.indexOf(entry.target as HTMLDivElement)
          if (index >= 0) setActive(index)
        }
      },
      // Faixa estreita no meio da tela: só um capítulo é o "ativo" por vez.
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )

    for (const anchor of anchors) observer.observe(anchor)
    return () => observer.disconnect()
  }, [])

  /**
   * Portão de visibilidade do palco.
   *
   * Sem isso, o efeito de play/preload rodava na hidratação e baixava 3 MB de
   * vídeo no carregamento da home — antes de o visitante chegar perto da
   * seção (medido: 4 MB de payload mobile). Com o portão, nenhum vídeo de
   * capítulo é buscado até o palco se aproximar da viewport.
   *
   * `rootMargin` de 300px arma o carregamento pouco antes da entrada, para o
   * primeiro capítulo não aparecer só com poster.
   */
  useEffect(() => {
    const stage = sectionRef.current
    if (!stage) return

    const observer = new IntersectionObserver(
      ([entry]) => setStageNear(entry?.isIntersecting ?? false),
      { rootMargin: '300px 0px 300px 0px' },
    )
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  /**
   * Só o vídeo ativo toca. O próximo é pré-carregado (`preload="auto"`) para
   * o crossfade não mostrar frame preto; os demais ficam em `none`.
   *
   * Nada acontece enquanto o palco não estiver perto da tela.
   */
  useEffect(() => {
    if (prefersReducedMotion) return

    if (!stageNear) {
      videoRefs.current.forEach((video) => {
        if (video) video.pause()
      })
      return
    }

    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === active) {
        video.preload = 'auto'
        void video.play().catch(() => {})
      } else {
        video.pause()
        if (index === active + 1) video.preload = 'auto'
      }
    })
  }, [active, stageNear, prefersReducedMotion])

  // Pausa tudo quando a aba sai de foco — nenhum decodificador rodando
  // para ninguém.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        videoRefs.current.forEach((v) => v?.pause())
      } else if (!prefersReducedMotion && stageNear) {
        void videoRefs.current[active]?.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [active, stageNear, prefersReducedMotion])

  const goToChapter = useCallback((index: number) => {
    anchorRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const current = chapters[active]
  if (!current) return null

  return (
    <section
      ref={sectionRef}
      id="experiencias"
      aria-labelledby="experiencias-heading"
      className="gt-dark bg-navy-deep text-text relative"
      // N capítulos × 100svh de altura de rolagem + 100svh para o último
      // capítulo ter tempo de tela antes da seção terminar.
      style={{ height: `${chapters.length * 100}svh` }}
    >
      {/* Âncoras reais: uma faixa de 100svh por capítulo, empilhadas ao longo
          da seção. São elas que o IntersectionObserver observa e que o hash
          aponta — deep link e back/forward funcionam de graça.

          A altura importa: com `rootMargin: -50%/-50%` a região de detecção
          é uma linha de altura zero no meio da tela. Âncoras de 1px cruzavam
          essa linha sem serem detectadas de forma confiável (bug encontrado
          na verificação: o capítulo ativo travava no 01). Com faixas de
          100svh, a linha central sempre cai dentro de exatamente uma âncora. */}
      {chapters.map((chapter, index) => (
        <div
          key={chapter.id}
          id={chapter.id}
          ref={(el) => {
            anchorRefs.current[index] = el
          }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0"
          style={{ top: `${index * 100}svh`, height: '100svh' }}
        />
      ))}

      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Camada de mídia: todos os posters no DOM, crossfade por opacidade.
            Nunca há frame preto porque o poster do capítulo já está pintado
            antes do vídeo aparecer. */}
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            aria-hidden={index !== active}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-out',
              index === active ? 'opacity-100' : 'opacity-0',
            )}
          >
            <div
              className="absolute inset-0 bg-cover"
              style={{
                backgroundImage: `url(${chapter.poster})`,
                backgroundPosition: chapter.focus ?? 'center',
              }}
            />
            {!prefersReducedMotion && (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el
                }}
                muted
                loop
                playsInline
                preload="none"
                poster={chapter.poster}
                aria-hidden="true"
                className="absolute inset-0 size-full object-cover"
                style={{ objectPosition: chapter.focus ?? 'center' }}
              >
                <source src={chapter.video} type="video/mp4" />
              </video>
            )}
          </div>
        ))}

        {/* Véu: existe só para o texto ter contraste sobre a mídia. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#05101c] via-[#05101c]/70 to-[#05101c]/25"
        />

        {/* Conteúdo editorial do capítulo ativo */}
        <div className="relative z-10 flex h-full flex-col justify-end pb-28 md:justify-center md:pb-0">
          <div className="mx-auto w-full max-w-[82.5rem] px-5 md:px-8">
            <h2 id="experiencias-heading" className="sr-only">
              {heading}
            </h2>

            <div className="max-w-[46ch]">
              <p className="text-text-accent font-sans text-xs tracking-[0.25em] uppercase">
                {String(active + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
                <span className="text-text-muted"> · {current.eyebrow}</span>
              </p>
              {/* key força o React a remontar, então a transição de entrada
                  roda a cada troca de capítulo. */}
              <h3 key={`${current.id}-t`} className="gt-chapter-in mt-4 text-3xl">
                {current.title}
              </h3>
              <p
                key={`${current.id}-b`}
                className="gt-chapter-in text-text-muted mt-5 text-lg"
                style={{ animationDelay: '80ms' }}
              >
                {current.body}
              </p>
              {current.cta && (
                <Link
                  key={`${current.id}-c`}
                  href={current.cta.href}
                  className="gt-chapter-in text-text-accent mt-7 inline-flex min-h-11 items-center gap-2 font-sans text-sm underline-offset-4 hover:underline"
                  style={{ animationDelay: '140ms' }}
                >
                  {current.cta.label}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Rail de capítulos — vertical no desktop, horizontal no mobile.
            São botões: navegam por scroll suave, sem trocar de rota. */}
        <nav
          aria-label="Capítulos da experiência"
          className="absolute inset-x-5 top-6 z-20 md:inset-x-auto md:top-auto md:right-8 md:bottom-12"
        >
          <ol className="gt-no-scrollbar flex gap-4 overflow-x-auto md:flex-col md:gap-1 md:overflow-visible">
            {chapters.map((chapter, index) => (
              <li key={chapter.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => goToChapter(index)}
                  aria-current={index === active ? 'true' : undefined}
                  className={cn(
                    'group flex min-h-11 items-center gap-3 font-sans text-xs whitespace-nowrap transition-colors md:justify-end',
                    index === active ? 'text-text' : 'text-text-muted hover:text-text',
                  )}
                >
                  <span className="tabular-nums opacity-70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{chapter.eyebrow}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'hidden h-px transition-all duration-300 ease-out md:block',
                      index === active ? 'bg-gold w-10' : 'bg-border-strong w-4',
                    )}
                  />
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* Pular experiência — respeita quem não quer a jornada inteira. */}
        <a
          href={`#${skipTargetId}`}
          className="text-text-muted hover:text-text absolute bottom-2 left-5 z-20 inline-flex min-h-11 items-center font-sans text-xs underline-offset-4 hover:underline md:bottom-6 md:left-8"
        >
          Pular experiência
        </a>
      </div>
    </section>
  )
}
