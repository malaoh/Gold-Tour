import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageIntro } from '@/components/site/page-intro'
import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'

const doc = siteContent.legal.find((item) => item.slug === 'politica-de-privacidade')

export const metadata: Metadata = {
  title: doc?.title,
  description: 'O que o site da Gold Tour faz — e não faz — com os dados que você informa.',
  alternates: { canonical: '/politica-de-privacidade' },
}

export default function Page() {
  const body = doc ? publishable(doc.body) : null

  // Esta página só publica quando body é `confirmed`: se um dia o texto
  // voltar a pending (por exemplo, numa revisão jurídica em andamento), a
  // rota volta a 404 em vez de mostrar texto desatualizado ou genérico.
  if (!doc || !body) notFound()

  return (
    <>
      <PageIntro eyebrow="Documento" title={doc.title} />
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-[68rem] px-5 py-16 sm:px-8">
          <p className="max-w-[70ch] text-base whitespace-pre-line">{body}</p>
        </div>
      </section>
    </>
  )
}
