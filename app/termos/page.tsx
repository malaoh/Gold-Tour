import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageIntro } from '@/components/site/page-intro'
import { publishable } from '@/content/schema'
import { siteContent } from '@/content/site-content'

const doc = siteContent.legal.find((item) => item.slug === 'termos')

export const metadata: Metadata = { title: doc?.title }

export default function Page() {
  const body = doc ? publishable(doc.body) : null

  // O documento ainda não foi redigido (pendência B-11). Publicar um texto
  // genérico de política seria pior que não publicar: cria obrigação legal
  // que a operação não combinou.
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
