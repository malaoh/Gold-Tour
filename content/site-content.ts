/**
 * Gold Tour — conteúdo do site.
 *
 * Três origens de dado convivem aqui:
 *
 *   confirmed(...)   — tem fonte rastreável e vai ao ar como verdade.
 *   placeholder(...) — provisório, aprovado pelo proprietário para o site
 *                      existir antes do dado final. Vai ao ar, mas aparece no
 *                      relatório de pré-lançamento (`npm run placeholders`).
 *   pending(...)     — não existe ainda. Some da interface.
 *   prohibited(...)  — vetado por decisão registrada. Some e nunca cai em fallback.
 *
 * Placeholder nunca é usado para preço, prazo, avaliação ou disponibilidade —
 * esses induziriam a decisão de compra e continuam proibidos (D-024).
 */

import {
  confirmed,
  pending,
  placeholder,
  prohibited,
  type FleetCategory,
  type MediaAsset,
  type Service,
  type SiteContent,
  type Tour,
} from './schema'

const BRAND_BOOK = 'Caderno de marca Gold Tour, p. 03, fornecido pelo proprietário'
const CONTRACT = 'Contrato mestre do projeto, informado pelo proprietário'
const DIRECTION = 'GOLD_TOUR_DIRECAO_FINAL.md'
const OWNER_OK = 'Proprietário autorizou placeholder editável em 2026-07-29'

/** Atalho para mídia própria já importada para /public. */
const media = (
  id: string,
  src: string,
  alt: string,
  extra: Partial<MediaAsset> = {},
): MediaAsset => ({
  id,
  kind: src.endsWith('.mp4') ? 'video' : 'image',
  src: confirmed(src, 'Importado na Etapa 06 a partir do pacote do proprietário'),
  alt: confirmed(alt, 'Redigido pela equipe do site'),
  provenance: 'own-photo',
  license: confirmed('Material fornecido pelo proprietário', OWNER_OK),
  ...extra,
})

const services: Service[] = [
  {
    slug: 'transfer-aeroporto',
    name: 'Transfer aeroporto',
    detailRoute: '/servicos/transfer-aeroporto',
    shortDescription: 'Recepção e deslocamento planejados de acordo com sua chegada.',
    longDescription: placeholder(
      'Acompanhamos o seu voo e ajustamos o encontro ao horário real de desembarque. O motorista aguarda no saguão com identificação, cuida das bagagens e conduz até o endereço combinado — sem fila, sem negociação e sem espera no meio-fio.',
      'B-17',
      'Texto provisório: confirmar como a operação de fato recebe no aeroporto.',
    ),
    includes: placeholder(
      [
        'Acompanhamento do voo',
        'Recepção identificada no saguão',
        'Apoio com bagagens',
        'Trajeto direto ao endereço combinado',
      ],
      'B-17',
    ),
    media: confirmed(
      media('svc-transfer', '/media/farol-da-barra-poster.jpg', 'Farol da Barra ao entardecer'),
      'Etapa 06',
    ),
    pricing: pending('B-18', 'Nenhum preço será exibido sem confirmação'),
  },
  {
    slug: 'receptivo',
    name: 'Receptivo',
    shortDescription:
      'Acolhimento na chegada, com acompanhamento do primeiro contato ao destino.',
    longDescription: placeholder(
      'Para quem chega pela primeira vez, o receptivo organiza tudo o que acontece entre o desembarque e o check-in: quem espera, por onde se vai e o que fazer se algo mudar de última hora.',
      'B-17',
    ),
    includes: placeholder(
      ['Contato antes da viagem', 'Recepção presencial', 'Orientação sobre a cidade'],
      'B-17',
    ),
    media: confirmed(
      media('svc-receptivo', '/media/elevador-lacerda-poster.jpg', 'Elevador Lacerda e a Baía de Todos-os-Santos'),
      'Etapa 06',
    ),
    pricing: pending('B-18'),
  },
  {
    slug: 'motorista-a-disposicao',
    name: 'Motorista à disposição',
    detailRoute: '/servicos/motorista-a-disposicao',
    shortDescription:
      'Mobilidade executiva para agendas, compromissos e permanências na cidade.',
    longDescription: placeholder(
      'O carro e o motorista ficam à sua disposição pelo período contratado. Entre um compromisso e outro não há corrida nova, aplicativo nem explicação de trajeto: a agenda é combinada uma vez e cumprida.',
      'B-17',
    ),
    includes: placeholder(
      ['Período combinado previamente', 'Motorista dedicado', 'Roteiro flexível durante o dia'],
      'B-17',
    ),
    media: confirmed(
      media('svc-motorista', '/frota/corolla-executivo.jpg', 'Sedã executivo preto em portaria de hotel'),
      'Etapa 06',
    ),
    pricing: pending('B-18'),
  },
  {
    slug: 'passeio-privativo',
    name: 'Passeio privativo',
    shortDescription: 'Roteiros flexíveis para conhecer Salvador com conforto e no seu ritmo.',
    longDescription: placeholder(
      'Um roteiro montado com você, e não uma excursão com horário fixo. Dá para começar mais tarde, ficar mais tempo onde valeu a pena e mudar de ideia no caminho.',
      'B-17',
    ),
    includes: placeholder(
      ['Roteiro combinado antes', 'Ritmo definido por você', 'Veículo e motorista exclusivos'],
      'B-17',
    ),
    media: confirmed(
      media('svc-passeio', '/media/salvador-historico-poster.jpg', 'Rua do centro histórico de Salvador'),
      'Etapa 06',
    ),
    pricing: pending('B-18'),
  },
  {
    slug: 'grupos-e-eventos',
    name: 'Grupos e eventos',
    detailRoute: '/servicos/grupos-e-eventos',
    shortDescription: 'Coordenação de transporte para equipes, famílias e convidados.',
    longDescription: placeholder(
      'Quando são muitas pessoas chegando em horários diferentes, o transporte deixa de ser um carro e vira coordenação. Cuidamos da escala, dos veículos e do ponto de encontro.',
      'B-17',
    ),
    includes: placeholder(
      ['Planejamento de escala', 'Mais de um veículo quando necessário', 'Ponto de encontro definido'],
      'B-17',
    ),
    media: confirmed(
      media('svc-grupos', '/media/sprinter-poster.jpg', 'Van executiva preta'),
      'Etapa 06',
    ),
    pricing: pending('B-18'),
  },
]

const fleet: FleetCategory[] = [
  {
    slug: 'corolla-executivo',
    name: 'Corolla Executivo',
    shortDescription:
      'Discrição e conforto para deslocamentos individuais ou em pequenos grupos.',
    passengerCapacity: placeholder(
      3,
      'B-12',
      'Valor provisório. Confirmar com a operação antes do lançamento.',
    ),
    luggageCapacity: placeholder('2 malas grandes', 'B-12'),
    amenities: placeholder(['Ar-condicionado', 'Água a bordo'], 'B-13'),
    accessibility: pending('B-13'),
    media: confirmed(
      media('frota-corolla', '/frota/corolla-executivo.jpg', 'Toyota Corolla preto em portaria de hotel'),
      'Etapa 06',
    ),
    gallery: pending('B-01'),
  },
  {
    slug: 'sprinter-executiva',
    name: 'Sprinter Executiva',
    shortDescription: 'Espaço e praticidade para grupos, transfers e roteiros.',
    passengerCapacity: placeholder(15, 'B-12'),
    luggageCapacity: placeholder('1 mala grande por passageiro', 'B-12'),
    amenities: placeholder(['Ar-condicionado', 'Poltronas reclináveis', 'Porta-malas amplo'], 'B-13'),
    accessibility: pending('B-13'),
    media: confirmed(
      media('frota-sprinter', '/frota/sprinter-executiva.jpg', 'Mercedes-Benz Sprinter executiva preta'),
      'Etapa 06',
    ),
    gallery: pending('B-01'),
  },
  {
    slug: 'micro-onibus-executivo',
    name: 'Micro-ônibus Executivo',
    shortDescription: 'Solução coordenada para grupos maiores e eventos.',
    passengerCapacity: placeholder(26, 'B-12'),
    luggageCapacity: placeholder('Bagageiro dedicado', 'B-12'),
    amenities: placeholder(['Ar-condicionado', 'Poltronas reclináveis'], 'B-13'),
    accessibility: pending('B-13'),
    media: prohibited(
      'D-005',
      'Único arquivo local tem 640x427 e origem ligada a concorrente',
    ),
    gallery: pending('B-04'),
  },
  {
    slug: 'doblo-executiva',
    name: 'Doblò Executiva',
    shortDescription:
      'Versatilidade para passageiros e bagagens em trajetos urbanos e transfers.',
    passengerCapacity: placeholder(6, 'B-12'),
    luggageCapacity: placeholder('4 malas grandes', 'B-12'),
    amenities: placeholder(['Ar-condicionado', 'Porta-malas amplo'], 'B-13'),
    accessibility: pending('B-13'),
    media: prohibited('D-006', 'A imagem disponível é uma Chevrolet Spin'),
    gallery: pending('B-03'),
  },
]

/**
 * Passeios — Etapa 09.
 *
 * São categorias editoriais, não pacotes fechados: o contrato proíbe publicar
 * duração, sequência fixa de paradas, ingresso, guia, alimentação, preço,
 * disponibilidade, política de crianças, acessibilidade, idioma ou área de
 * embarque sem confirmação da operação — mesmo como placeholder. Por isso
 * `itinerary` e `duration` ficam `pending`: a página descreve a região e a
 * disposição da equipe em adaptar, não um roteiro prometido.
 */
const tours: Tour[] = [
  {
    slug: 'salvador-historico',
    name: 'Salvador histórico',
    summary:
      'Ladeiras, igrejas e casarões do centro antigo, no horário em que a luz favorece e o movimento ainda deixa andar. O trajeto é combinado com você antes de sair.',
    itinerary: pending('B-19', 'Sem sequência fixa de paradas até a operação confirmar um roteiro real'),
    duration: pending('B-19'),
    media: confirmed(
      media('tour-historico', '/media/salvador-historico.mp4', 'Percurso por rua do centro histórico', {
        poster: confirmed('/media/salvador-historico-poster.jpg', 'Etapa 06'),
      }),
      'Etapa 06',
    ),
  },
  {
    slug: 'baia-de-todos-os-santos',
    name: 'Baía e cidade baixa',
    summary:
      'A cidade vista de onde ela faz sentido: a baía aberta, o porto e a linha do horizonte que separa a cidade alta da baixa. O ritmo é definido com você, não por um roteiro fixo.',
    itinerary: pending('B-19', 'Sem sequência fixa de paradas até a operação confirmar um roteiro real'),
    duration: pending('B-19'),
    media: confirmed(
      media('tour-baia', '/media/baia-de-todos-os-santos.mp4', 'Vista aérea da Baía de Todos-os-Santos', {
        poster: confirmed('/media/baia-de-todos-os-santos-poster.jpg', 'Etapa 06'),
      }),
      'Etapa 06',
    ),
  },
  {
    slug: 'orla',
    name: 'Orla e pôr do sol',
    summary:
      'Da Barra ao litoral norte, com tempo reservado para o entardecer — sem pressa de voltar e sem horário fechado.',
    itinerary: pending('B-19', 'Sem sequência fixa de paradas até a operação confirmar um roteiro real'),
    duration: pending('B-19'),
    media: confirmed(
      media('tour-orla', '/media/farol-da-barra-poster.jpg', 'Farol da Barra ao entardecer', {
        poster: confirmed('/media/farol-da-barra-poster.jpg', 'Etapa 06'),
      }),
      'Etapa 06',
    ),
  },
  {
    slug: 'sob-medida',
    name: 'Roteiro sob medida',
    summary:
      'Você diz o que quer ver, quanto tempo tem e com quem viaja. A equipe monta o percurso com base nisso e ajusta no caminho.',
    itinerary: pending('B-19', 'Por definição não tem roteiro fixo'),
    duration: pending('B-19'),
    media: confirmed(
      media('tour-medida', '/media/elevador-lacerda.mp4', 'Elevador Lacerda visto da baía', {
        poster: confirmed('/media/elevador-lacerda-poster.jpg', 'Etapa 06'),
      }),
      'Etapa 06',
    ),
  },
]

export const siteContent: SiteContent = {
  settings: {
    siteName: 'Gold Tour',
    tagline: confirmed('Mobilidade executiva em Salvador', DIRECTION),
    descriptor: confirmed('VIP Mobility & Premium Tourism', BRAND_BOOK),
    defaultLocale: 'pt-BR',
    enabledLocales: confirmed(['pt-BR'], 'Etapa 05: apenas português nesta versão'),
    canonicalUrl: pending('B-09', 'Domínio de produção não definido'),
    analytics: pending('B-14', 'Nenhuma ferramenta autorizada'),
  },

  contact: {
    tradeName: 'Gold Tour',
    legalName: pending('B-06'),
    taxId: pending('B-06'),
    whatsapp: placeholder(
      { e164: '+5571900000000', display: '+55 71 90000-0000' },
      'B-02',
      'NÚMERO FICTÍCIO. Substituir por NEXT_PUBLIC_WHATSAPP_E164 antes de divulgar o site.',
    ),
    phone: pending('B-06'),
    email: placeholder('contato@goldtour.com.br', 'B-06', 'E-mail provisório.'),
    address: placeholder(
      {
        street: 'Endereço a confirmar',
        district: '',
        city: 'Salvador',
        state: 'BA',
        postalCode: '',
      },
      'B-06',
    ),
    serviceArea: confirmed('Salvador e Região Metropolitana, Bahia', CONTRACT),
    businessHours: placeholder('Atendimento todos os dias', 'B-15'),
    social: placeholder(
      [
        {
          platform: 'instagram' as const,
          handle: '@goldtour',
          url: 'https://instagram.com/goldtour',
        },
      ],
      'B-07',
      'Perfil provisório. Confirmar o @ real antes de publicar.',
    ),
  },

  navigation: {
    primary: [
      { label: 'Início', href: '/' },
      { label: 'Serviços', href: '/servicos' },
      { label: 'Frota', href: '/frota' },
      { label: 'Passeios', href: '/passeios' },
      { label: 'Contato', href: '/contato' },
    ],
    footer: [
      { label: 'Serviços', href: '/servicos' },
      { label: 'Frota', href: '/frota' },
      { label: 'Passeios', href: '/passeios' },
      { label: 'Contato', href: '/contato' },
    ],
    legal: [
      { label: 'Política de privacidade', href: '/politica-de-privacidade' },
      { label: 'Termos de uso', href: '/termos' },
    ],
  },

  hero: {
    eyebrow: 'Mobilidade executiva em Salvador',
    headline: 'Salvador começa antes de você chegar.',
    description:
      'Transfers, receptivo, passeios privativos e transporte executivo com atendimento próximo do planejamento ao destino.',
    primaryCta: { label: 'Solicitar atendimento', href: '/solicitar' },
    secondaryCta: { label: 'Conhecer serviços', href: '/servicos' },
    media: confirmed(
      media('hero', '/media/farol-da-barra.mp4', 'Farol da Barra ao entardecer, com o mar ao fundo', {
        poster: confirmed('/media/farol-da-barra-poster.jpg', 'Etapa 06'),
      }),
      'Etapa 06',
    ),
  },

  services,
  fleet,
  tours,

  faq: [
    {
      id: 'voo-atrasado',
      question: 'E se o meu voo atrasar?',
      answer: placeholder(
        'Acompanhamos o status do voo informado na solicitação e ajustamos o horário do encontro. Se o atraso for grande, a equipe entra em contato pelo WhatsApp para combinar o novo horário.',
        'B-08',
      ),
      topic: 'voos',
    },
    {
      id: 'como-solicito',
      question: 'Como faço para solicitar?',
      answer: confirmed(
        'Pelo formulário do site ou direto no WhatsApp. Você informa o serviço, a data e os detalhes do trajeto, e a equipe responde para confirmar.',
        'Fluxo real do site',
      ),
      topic: 'agendamento',
    },
    {
      id: 'cadeirinha',
      question: 'Vocês oferecem cadeirinha para crianças?',
      answer: placeholder(
        'Sim, mediante solicitação antecipada. Informe a idade e o peso da criança ao solicitar o atendimento para que a cadeirinha correta esteja no veículo.',
        'B-08',
      ),
      topic: 'acessibilidade',
    },
    {
      id: 'alteracao',
      question: 'Consigo alterar ou cancelar uma solicitação?',
      answer: placeholder(
        'Sim. Alterações e cancelamentos são tratados pelo WhatsApp com a equipe que atendeu a sua solicitação.',
        'B-18',
        'Confirmar prazo e política de cancelamento antes do lançamento.',
      ),
      topic: 'alteracoes',
    },
    {
      id: 'grupos',
      question: 'Como funciona o atendimento para grupos e eventos?',
      answer: placeholder(
        'A equipe monta a escala de veículos e horários a partir do número de pessoas, dos voos e do ponto de encontro. Para grupos, o ideal é solicitar com antecedência.',
        'B-08',
      ),
      topic: 'grupos',
    },
    {
      id: 'acessibilidade',
      question: 'Há opção acessível para cadeirante?',
      answer: pending('B-13', 'Não afirmar acessibilidade sem confirmação da operação'),
      topic: 'acessibilidade',
    },
  ],

  legal: [
    {
      slug: 'politica-de-privacidade',
      title: 'Política de privacidade',
      body: pending('B-11'),
      updatedAt: pending('B-11'),
    },
    { slug: 'termos', title: 'Termos de uso', body: pending('B-11'), updatedAt: pending('B-11') },
  ],
}
