/**
 * Gold Tour — conteúdo do site (Etapa 01).
 *
 * Só entra aqui o que tem fonte. Tudo que ainda não foi confirmado pela
 * operação fica como `pending(...)` com o id da pendência em
 * docs/content-needs.md, e a interface simplesmente não renderiza a afirmação.
 *
 * Copy-base conforme GOLD_TOUR_DIRECAO_FINAL.md §"Copy-base".
 */

import { confirmed, pending, prohibited, type SiteContent } from './schema'

const BRAND_BOOK =
  'Caderno de marca Gold Tour, página 03, enviado pelo proprietário em 2026-07-29'
const CONTRACT = 'Contrato mestre do projeto, informado pelo proprietário'
const DIRECTION = 'GOLD_TOUR_DIRECAO_FINAL.md'

export const siteContent: SiteContent = {
  settings: {
    siteName: 'Gold Tour',
    tagline: confirmed('Mobilidade executiva em Salvador', DIRECTION),
    descriptor: confirmed('VIP Mobility & Premium Tourism', BRAND_BOOK),
    defaultLocale: 'pt-BR',
    enabledLocales: pending('B-10', 'Definir se haverá EN e ES na primeira versão'),
    canonicalUrl: pending('B-09', 'Domínio de produção não definido'),
    analytics: pending('B-14', 'Nenhuma ferramenta de analytics autorizada até agora'),
  },

  contact: {
    tradeName: 'Gold Tour',
    legalName: pending('B-06'),
    taxId: pending('B-06'),
    whatsapp: pending('B-02', 'Bloqueia o fluxo de conversão inteiro'),
    phone: pending('B-06'),
    email: pending('B-06'),
    address: pending('B-06'),
    serviceArea: confirmed('Salvador, Bahia', CONTRACT),
    businessHours: pending('B-15', 'Horário de atendimento não informado'),
    social: pending('B-07'),
  },

  navigation: {
    primary: [
      { label: 'Serviços', href: '/servicos' },
      { label: 'Frota', href: '/frota' },
      { label: 'Passeios', href: '/passeios' },
      { label: 'Contato', href: '/contato' },
    ],
    footer: [
      { label: 'Serviços', href: '/servicos' },
      { label: 'Frota', href: '/frota' },
      { label: 'Passeios', href: '/passeios' },
      { label: 'Solicitar atendimento', href: '/solicitar' },
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
    media: pending('B-16', 'Vídeo do Farol da Barra a importar na Etapa 10'),
  },

  services: [
    {
      slug: 'transfer-aeroporto',
      name: 'Transfer aeroporto',
      detailRoute: '/servicos/transfer-aeroporto',
      shortDescription: 'Recepção e deslocamento planejados de acordo com sua chegada.',
      longDescription: pending('B-17', 'Detalhamento operacional não fornecido'),
      includes: pending('B-17'),
      media: pending('B-16'),
      pricing: pending('B-18', 'Nenhum preço será exibido sem confirmação'),
    },
    {
      slug: 'receptivo',
      name: 'Receptivo',
      shortDescription:
        'Acolhimento na chegada, com acompanhamento do primeiro contato ao destino.',
      longDescription: pending('B-17'),
      includes: pending('B-17'),
      media: pending('B-16'),
      pricing: pending('B-18'),
    },
    {
      slug: 'motorista-a-disposicao',
      name: 'Motorista à disposição',
      detailRoute: '/servicos/motorista-a-disposicao',
      shortDescription:
        'Mobilidade executiva para agendas, compromissos e permanências na cidade.',
      longDescription: pending('B-17'),
      includes: pending('B-17'),
      media: pending('B-16'),
      pricing: pending('B-18'),
    },
    {
      slug: 'passeio-privativo',
      name: 'Passeio privativo',
      shortDescription:
        'Roteiros flexíveis para conhecer Salvador com conforto e no seu ritmo.',
      longDescription: pending('B-17'),
      includes: pending('B-17'),
      media: pending('B-16'),
      pricing: pending('B-18'),
    },
    {
      slug: 'grupos-e-eventos',
      name: 'Grupos e eventos',
      detailRoute: '/servicos/grupos-e-eventos',
      shortDescription: 'Coordenação de transporte para equipes, famílias e convidados.',
      longDescription: pending('B-17'),
      includes: pending('B-17'),
      media: pending('B-16'),
      pricing: pending('B-18'),
    },
  ],

  fleet: [
    {
      slug: 'corolla-executivo',
      name: 'Corolla Executivo',
      shortDescription:
        'Discrição e conforto para deslocamentos individuais ou em pequenos grupos.',
      passengerCapacity: pending('B-12'),
      luggageCapacity: pending('B-12'),
      amenities: pending('B-13'),
      accessibility: pending('B-13'),
      media: pending('B-01', 'Foto candidata com indício de tratamento por IA'),
      gallery: pending('B-01'),
    },
    {
      slug: 'sprinter-executiva',
      name: 'Sprinter Executiva',
      shortDescription: 'Espaço e praticidade para grupos, transfers e roteiros.',
      passengerCapacity: pending('B-12'),
      luggageCapacity: pending('B-12'),
      amenities: pending('B-13'),
      accessibility: pending('B-13'),
      media: pending('B-01', 'Foto candidata com indício de tratamento por IA'),
      gallery: pending('B-01'),
    },
    {
      slug: 'micro-onibus-executivo',
      name: 'Micro-ônibus Executivo',
      shortDescription: 'Solução coordenada para grupos maiores e eventos.',
      passengerCapacity: pending('B-12'),
      luggageCapacity: pending('B-12'),
      amenities: pending('B-13'),
      accessibility: pending('B-13'),
      media: prohibited(
        'D-005',
        'Único arquivo local é 640x427 e tem origem ligada a concorrente',
      ),
      gallery: pending('B-04'),
    },
    {
      slug: 'doblo-executiva',
      name: 'Doblò Executiva',
      shortDescription:
        'Versatilidade para passageiros e bagagens em trajetos urbanos e transfers.',
      passengerCapacity: pending('B-12'),
      luggageCapacity: pending('B-12'),
      amenities: pending('B-13'),
      accessibility: pending('B-13'),
      media: prohibited(
        'D-006',
        'A imagem disponível é uma Chevrolet Spin e nao representa a Doblo',
      ),
      gallery: pending('B-03'),
    },
  ],

  tours: [],

  faq: [
    {
      id: 'voo-atrasado',
      question: 'E se o meu voo atrasar?',
      answer: pending('B-08'),
      topic: 'voos',
    },
    {
      id: 'bagagem',
      question: 'Quanta bagagem cabe em cada veículo?',
      answer: pending('B-12'),
      topic: 'bagagem',
    },
    {
      id: 'cadeirinha',
      question: 'Vocês oferecem cadeirinha para crianças?',
      answer: pending('B-08'),
      topic: 'acessibilidade',
    },
    {
      id: 'acessibilidade',
      question: 'Há opção acessível para cadeirante?',
      answer: pending('B-13'),
      topic: 'acessibilidade',
    },
    {
      id: 'alteracao',
      question: 'Consigo alterar ou cancelar uma solicitação?',
      answer: pending('B-08'),
      topic: 'alteracoes',
    },
    {
      id: 'grupos',
      question: 'Como funciona o atendimento para grupos e eventos?',
      answer: pending('B-08'),
      topic: 'grupos',
    },
  ],

  legal: [
    {
      slug: 'politica-de-privacidade',
      title: 'Política de privacidade',
      body: pending('B-11'),
      updatedAt: pending('B-11'),
    },
    {
      slug: 'termos',
      title: 'Termos de uso',
      body: pending('B-11'),
      updatedAt: pending('B-11'),
    },
  ],
}
