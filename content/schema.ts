/**
 * Gold Tour — modelo de conteúdo tipado (Etapa 01).
 *
 * Regra central do projeto: nada que não esteja confirmado pela operação pode
 * chegar ao visitante. O tipo `Fact<T>` torna isso uma restrição de
 * compilação, e não uma disciplina de quem escreve o conteúdo: para ler um
 * valor é preciso passar por `publishable()`, que devolve `null` sempre que o
 * dado ainda não foi confirmado.
 *
 * Os status são metadados internos. Nenhum deles é renderizado.
 */

export type VeracityStatus = 'confirmed' | 'placeholder' | 'pending' | 'prohibited'

/** Dado confirmado pela operação, com fonte rastreável. */
export type ConfirmedFact<T> = {
  status: 'confirmed'
  value: T
  /** De onde veio: quem informou, documento, data. */
  source: string
}

/**
 * Valor provisório aprovado pelo proprietário para o site ir ao ar antes do
 * dado definitivo. **É exibido ao visitante** — a diferença para `confirmed` é
 * que ele aparece no relatório de placeholders e precisa ser trocado antes do
 * lançamento. Não use para nada que possa enganar quem contrata: preço,
 * capacidade, prazo, avaliação ou disponibilidade continuam proibidos.
 */
export type PlaceholderFact<T> = {
  status: 'placeholder'
  value: T
  /** Id em docs/content-needs.md do dado real que vai substituir este. */
  replaces: string
  note?: string
}

/** Dado que ainda não existe. Nunca é exibido; vira pendência em content-needs. */
export type PendingFact = {
  status: 'pending'
  /** Id da pendência em docs/content-needs.md, ex.: 'B-02'. */
  blocker: string
  note?: string
}

/** Dado cuja publicação foi vetada por decisão registrada. */
export type ProhibitedFact = {
  status: 'prohibited'
  /** Id da decisão em docs/decision-log.md, ex.: 'D-005'. */
  decision: string
  reason: string
}

export type Fact<T> = ConfirmedFact<T> | PlaceholderFact<T> | PendingFact | ProhibitedFact

export const confirmed = <T>(value: T, source: string): ConfirmedFact<T> => ({
  status: 'confirmed',
  value,
  source,
})

export const placeholder = <T>(
  value: T,
  replaces: string,
  note?: string,
): PlaceholderFact<T> => ({
  status: 'placeholder',
  value,
  replaces,
  note,
})

export const pending = (blocker: string, note?: string): PendingFact => ({
  status: 'pending',
  blocker,
  note,
})

export const prohibited = (decision: string, reason: string): ProhibitedFact => ({
  status: 'prohibited',
  decision,
  reason,
})

/**
 * Único caminho de leitura de um `Fact`. Devolve o valor quando ele é
 * publicável (confirmado ou placeholder aprovado) e `null` quando o dado não
 * existe ou foi vetado — nesse caso a interface omite a afirmação inteira em
 * vez de mostrar texto genérico.
 */
export function publishable<T>(fact: Fact<T>): T | null {
  return fact.status === 'confirmed' || fact.status === 'placeholder' ? fact.value : null
}

export const isPublishable = <T>(
  fact: Fact<T>,
): fact is ConfirmedFact<T> | PlaceholderFact<T> =>
  fact.status === 'confirmed' || fact.status === 'placeholder'

/** Placeholder ainda por trocar. Usado pelo relatório de pré-lançamento. */
export const isPlaceholder = <T>(fact: Fact<T>): fact is PlaceholderFact<T> =>
  fact.status === 'placeholder'

// ---------------------------------------------------------------------------
// Mídia
// ---------------------------------------------------------------------------

export type MediaKind = 'image' | 'video'

/** Como o arquivo entrou no projeto — define se pode ou não ser publicado. */
export type MediaProvenance =
  | 'own-photo' // fotografia própria da operação Gold Tour
  | 'licensed-stock' // banco de imagens com licença comercial registrada
  | 'brand-asset' // material de identidade fornecido pelo proprietário
  | 'ai-generated' // gerado ou tratado por IA
  | 'unverified' // origem desconhecida — bloqueia publicação
  | 'competitor' // material de concorrente — proibido

export type MediaAsset = {
  id: string
  kind: MediaKind
  /** Caminho em /public depois da importação da Etapa 10. */
  src: Fact<string>
  /** Arquivo de origem fora do repositório, para rastreio. */
  sourcePath?: string
  alt: Fact<string>
  width?: number
  height?: number
  bytes?: number
  provenance: MediaProvenance
  /** Licença ou autorização. Obrigatório para publicar stock. */
  license: Fact<string>
  /** Poster obrigatório para vídeo. */
  poster?: Fact<string>
  /** Legenda que não pode ser usada, ex.: não chamar de "frota própria". */
  usageWarning?: string
}

// ---------------------------------------------------------------------------
// Entidades de conteúdo
// ---------------------------------------------------------------------------

export type Locale = 'pt-BR' | 'en' | 'es'

export type SiteSettings = {
  siteName: string
  tagline: Fact<string>
  descriptor: Fact<string>
  defaultLocale: Locale
  /** Idiomas efetivamente publicados. */
  enabledLocales: Fact<Locale[]>
  canonicalUrl: Fact<string>
  /** Analytics só entra quando autorizado explicitamente. */
  analytics: Fact<{ provider: string; id: string }>
}

export type SocialChannel = {
  platform: 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin'
  handle: string
  url: string
}

export type CompanyContact = {
  tradeName: string
  legalName: Fact<string>
  taxId: Fact<string> // CNPJ
  whatsapp: Fact<{ e164: string; display: string }>
  phone: Fact<{ e164: string; display: string }>
  email: Fact<string>
  address: Fact<{
    street: string
    district: string
    city: string
    state: string
    postalCode: string
  }>
  serviceArea: Fact<string>
  businessHours: Fact<string>
  social: Fact<SocialChannel[]>
}

export type NavigationItem = {
  label: string
  href: string
  children?: NavigationItem[]
}

export type Navigation = {
  primary: NavigationItem[]
  footer: NavigationItem[]
  legal: NavigationItem[]
}

export type Service = {
  slug: string
  name: string
  /** Rota própria, quando o serviço tem página dedicada. */
  detailRoute?: string
  shortDescription: string
  longDescription: Fact<string>
  /** O que a operação realmente entrega. Só entra se confirmado. */
  includes: Fact<string[]>
  media: Fact<MediaAsset>
  /** Preço nunca é exibido sem confirmação; hoje o site não exibe preço. */
  pricing: Fact<string>
}

export type FleetCategory = {
  slug: string
  name: string
  shortDescription: string
  /** Número de passageiros — exige fonte interna verificável. */
  passengerCapacity: Fact<number>
  /** Bagagem — exige fonte interna verificável. */
  luggageCapacity: Fact<string>
  /** Ar-condicionado, Wi-Fi, TV, etc. Nada é presumido do fabricante. */
  amenities: Fact<string[]>
  accessibility: Fact<string>
  media: Fact<MediaAsset>
  gallery: Fact<MediaAsset[]>
}

export type Tour = {
  slug: string
  name: string
  summary: string
  /** Roteiro real praticado pela operação. */
  itinerary: Fact<string[]>
  duration: Fact<string>
  media: Fact<MediaAsset>
}

export type FaqItem = {
  id: string
  question: string
  /** Resposta só existe se veio da operação. Sem resposta, a pergunta some. */
  answer: Fact<string>
  topic: 'agendamento' | 'voos' | 'bagagem' | 'grupos' | 'acessibilidade' | 'alteracoes'
}

export type LegalDocument = {
  slug: 'politica-de-privacidade' | 'termos'
  title: string
  body: Fact<string>
  updatedAt: Fact<string>
}

/** Traduções. Enquanto só houver pt-BR, os demais ficam pending. */
export type LocalizedContent<T> = {
  'pt-BR': T
  en?: Fact<T>
  es?: Fact<T>
}

// ---------------------------------------------------------------------------
// Copy da home
// ---------------------------------------------------------------------------

export type HeroCopy = {
  eyebrow: string
  headline: string
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  media: Fact<MediaAsset>
}

export type SiteContent = {
  settings: SiteSettings
  contact: CompanyContact
  navigation: Navigation
  hero: HeroCopy
  services: Service[]
  fleet: FleetCategory[]
  tours: Tour[]
  faq: FaqItem[]
  legal: LegalDocument[]
}
