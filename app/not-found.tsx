import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      id="conteudo"
      className="gt-dark bg-surface text-text flex min-h-dvh flex-col items-center justify-center px-5 py-24 text-center"
    >
      <p className="text-text-accent font-sans text-sm tracking-widest uppercase">
        Página não encontrada
      </p>
      <h1 className="mt-3 max-w-2xl text-3xl">Esse endereço não leva a lugar nenhum.</h1>
      <p className="text-text-muted mt-4 max-w-prose text-lg">
        O link pode ter mudado ou sido digitado de outro jeito. Volte ao início para
        seguir daqui.
      </p>
      <Link
        href="/"
        className="bg-action text-on-action mt-8 inline-flex min-h-11 items-center rounded-md px-6 font-sans font-medium"
      >
        Voltar ao início
      </Link>
    </main>
  )
}
