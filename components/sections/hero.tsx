'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'

/**
 * Autoplay depende de duas media queries. `useSyncExternalStore` é o caminho
 * certo aqui: o navegador é a fonte da verdade, e o valor do servidor é sempre
 * "não" — quem renderiza no servidor não sabe o tamanho da tela nem a
 * preferência de movimento de ninguém.
 */
const AUTOPLAY_QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

function subscribeToAutoplay(onChange: () => void) {
  const list = window.matchMedia(AUTOPLAY_QUERY)
  list.addEventListener('change', onChange)
  return () => list.removeEventListener('change', onChange)
}

const getAutoplaySnapshot = () => window.matchMedia(AUTOPLAY_QUERY).matches

/**
 * O poster é o LCP: ele já vem no HTML como imagem de fundo e o vídeo só entra
 * depois, por cima, quando o contexto permite. Em mobile e em
 * `prefers-reduced-motion` o vídeo simplesmente não carrega — fica o poster, e
 * a página funciona igual.
 */
export function Hero() {
  const { hero } = siteContent
  const asset = publishable(hero.media)
  const src = asset ? publishable(asset.src) : null
  const poster = asset?.poster ? publishable(asset.poster) : null

  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const enabled = useSyncExternalStore(
    subscribeToAutoplay,
    getAutoplaySnapshot,
    () => false,
  )

  // Pausa quando o hero sai da tela — não faz sentido decodificar vídeo que
  // ninguém está vendo.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !enabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.2 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [enabled])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) void video.play().catch(() => {})
    else video.pause()
  }

  return (
    <section className="gt-dark bg-navy-deep relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden">
      {poster && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}

      {enabled && src && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={poster ?? undefined}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Véu vertical: existe só para o texto ter contraste sobre a imagem. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-0 bg-gradient-to-t from-[#05101c] via-[#05101c]/70 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[82.5rem] px-5 pt-32 pb-16 sm:px-8 sm:pb-20">
        <p className="text-text-accent font-sans text-xs tracking-[0.25em] uppercase sm:text-sm">
          {hero.eyebrow}
        </p>

        <h1 className="text-text mt-5 max-w-[15ch] text-4xl leading-[1.05]">
          {hero.headline}
        </h1>

        <p className="text-text-muted mt-6 max-w-[52ch] text-lg">{hero.description}</p>

        <div className="mt-9 flex flex-col gap-3 md:flex-row md:items-center">
          <Link
            href={hero.primaryCta.href}
            className="bg-action text-on-action hover:bg-gold-soft inline-flex min-h-13 items-center justify-center rounded-md px-8 font-sans font-medium transition-colors"
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="border-border-strong text-text hover:border-gold inline-flex min-h-13 items-center justify-center rounded-md border px-8 font-sans font-medium transition-colors"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      {enabled && src && (
        <button
          type="button"
          onClick={toggle}
          className="border-border-strong text-text hover:border-gold absolute top-24 right-5 z-10 inline-flex size-11 items-center justify-center rounded-full border bg-black/40 backdrop-blur-sm transition-colors sm:right-8"
        >
          <span className="sr-only">{playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}</span>
          <span aria-hidden="true" className="text-sm">
            {playing ? '❙❙' : '▶'}
          </span>
        </button>
      )}
    </section>
  )
}
