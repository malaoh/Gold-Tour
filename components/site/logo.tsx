import Image from 'next/image'

/**
 * Marca extraída do caderno oficial (p. 03), com o fundo creme removido.
 *
 * Existem duas versões de cada peça. A original tem o degradê metálico e serve
 * sobre fundo claro; a versão `claro` é a mesma silhueta preenchida em um ouro
 * mais alto (#E3CFA4, 10,7:1 sobre o marinho), porque o degradê original tem
 * áreas escuras que somem em superfície escura.
 *
 * São arquivos raster. Quando o vetor chegar (B-05), basta substituí-los.
 */

type Tone = 'gold' | 'light'

const suffix = (tone: Tone) => (tone === 'light' ? '-claro' : '')

export function Wordmark({
  className = '',
  tone = 'gold',
  priority = false,
}: {
  className?: string
  tone?: Tone
  priority?: boolean
}) {
  return (
    <Image
      src={`/brand/wordmark${suffix(tone)}.png`}
      alt="Gold Tour — VIP Mobility & Premium Tourism"
      width={580}
      height={130}
      priority={priority}
      className={className}
    />
  )
}

export function Seal({
  className = '',
  size = 180,
  tone = 'light',
}: {
  className?: string
  size?: number
  tone?: Tone
}) {
  return (
    <Image
      src={`/brand/selo${suffix(tone)}.png`}
      alt=""
      aria-hidden="true"
      width={470}
      height={440}
      style={{ width: size, height: 'auto' }}
      className={className}
    />
  )
}

export function Monogram({
  size = 40,
  className = '',
  tone = 'light',
}: {
  size?: number
  className?: string
  tone?: Tone
}) {
  return (
    <Image
      src={`/brand/monograma${suffix(tone)}.png`}
      alt=""
      aria-hidden="true"
      width={190}
      height={150}
      style={{ width: size, height: 'auto' }}
      className={className}
    />
  )
}
