import type { Metadata } from 'next'
import { ServiceDetail } from '@/components/site/service-detail'
import { siteContent } from '@/content/site-content'

const service = siteContent.services.find((item) => item.slug === 'motorista-a-disposicao')

export const metadata: Metadata = {
  title: service?.name,
  description: service?.shortDescription,
  alternates: { canonical: '/servicos/motorista-a-disposicao' },
  openGraph: {
    title: service ? `${service.name} | Gold Tour` : undefined,
    description: service?.shortDescription,
  },
}

export default function Page() {
  return <ServiceDetail slug="motorista-a-disposicao" />
}
