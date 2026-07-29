import type { MetadataRoute } from 'next'
import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3010'

/**
 * Gerado a partir das rotas realmente publicadas — nada de página vazia ou
 * em 404 aqui. `/solicitar` fica fora por ser `noindex` (ver `robots` na
 * própria rota); `/design-system` fica fora por ser interna.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-07-29')

  const staticRoutes = [
    '',
    '/servicos',
    '/servicos/transfer-aeroporto',
    '/servicos/motorista-a-disposicao',
    '/servicos/grupos-e-eventos',
    '/frota',
    '/passeios',
    '/contato',
  ]

  const fleetRoutes = siteContent.fleet.map((vehicle) => `/frota/${vehicle.slug}`)

  const legalRoutes = siteContent.legal
    .filter((doc) => publishable(doc.body) !== null)
    .map((doc) => `/${doc.slug}`)

  return [...staticRoutes, ...fleetRoutes, ...legalRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }))
}
