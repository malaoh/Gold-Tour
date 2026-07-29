import type { Metadata, Viewport } from 'next'
import { Manrope, Newsreader } from 'next/font/google'
import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3010'

/**
 * Fontes servidas pelo próprio domínio (next/font), sem CDN externo.
 *
 * A prancha de marca não declara as fontes oficiais (ver docs/brand-audit.md
 * R-02), então vale o fallback da direção final: Newsreader nos títulos,
 * Manrope na interface. Quando o caderno completo chegar, esta escolha é
 * reavaliada.
 */
const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Gold Tour — mobilidade executiva em Salvador',
    template: '%s · Gold Tour',
  },
  description:
    'Transfers, receptivo, passeios privativos e transporte executivo com atendimento próximo do planejamento ao destino.',
  // Sem imagem de Open Graph até existir logo em vetor (pendência B-05).
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Gold Tour',
  },
}

export const viewport: Viewport = {
  themeColor: '#0B1D33',
  // Zoom nunca é desabilitado.
  initialScale: 1,
  width: 'device-width',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${newsreader.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="bg-action text-on-action sr-only rounded-md px-4 py-3 font-sans font-medium focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
        >
          Ir para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
