import type { NextConfig } from 'next'

/**
 * Cabeçalhos de segurança básicos. Ainda não há CSP restritiva: o conjunto
 * final de origens só se fecha depois da Etapa 10 (mídia) e da decisão sobre
 * analytics (B-14). Uma CSP incompleta dá falsa segurança e quebra em produção.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
