import { describe, expect, it } from 'vitest'
import {
  confirmed,
  isPlaceholder,
  isPublishable,
  pending,
  placeholder,
  prohibited,
  publishable,
  type Fact,
} from '@/content/schema'
import { siteContent } from '@/content/site-content'

describe('Fact', () => {
  it('publica valor confirmado', () => {
    expect(publishable(confirmed('Salvador', 'contrato'))).toBe('Salvador')
  })

  it('publica placeholder aprovado', () => {
    expect(publishable(placeholder('provisório', 'B-06'))).toBe('provisório')
  })

  it('não publica pendente nem proibido', () => {
    expect(publishable(pending('B-02'))).toBeNull()
    expect(publishable(prohibited('D-005', 'baixa resolução'))).toBeNull()
  })

  it('isPlaceholder separa provisório de confirmado', () => {
    expect(isPlaceholder(placeholder(1, 'B-12'))).toBe(true)
    expect(isPlaceholder(confirmed(1, 'operação'))).toBe(false)
  })
})

describe('site-content — invariantes do contrato', () => {
  it('a frota tem exatamente as quatro categorias acordadas', () => {
    expect(siteContent.fleet.map((v) => v.slug)).toEqual([
      'corolla-executivo',
      'sprinter-executiva',
      'micro-onibus-executivo',
      'doblo-executiva',
    ])
  })

  it('nenhum serviço expõe preço', () => {
    for (const service of siteContent.services) {
      expect(publishable(service.pricing)).toBeNull()
    }
  })

  it('mídia vetada nunca é publicada', () => {
    const vetadas = siteContent.fleet.filter((v) => v.media.status === 'prohibited')
    expect(vetadas.length).toBeGreaterThan(0)
    for (const vehicle of vetadas) {
      expect(publishable(vehicle.media)).toBeNull()
    }
  })

  it('nenhuma foto de veículo aponta para o arquivo vetado do micro-ônibus', () => {
    for (const vehicle of siteContent.fleet) {
      const asset = publishable(vehicle.media)
      const value = asset ? publishable(asset.src) : null
      if (value) {
        expect(value).not.toMatch(/microonibus/i)
        expect(value).not.toMatch(/spin/i)
      }
    }
  })

  it('Doblò e micro-ônibus não têm mídia publicada (sem foto confiável ainda)', () => {
    const doblo = siteContent.fleet.find((v) => v.slug === 'doblo-executiva')
    const micro = siteContent.fleet.find((v) => v.slug === 'micro-onibus-executivo')
    expect(doblo && publishable(doblo.media)).toBeNull()
    expect(micro && publishable(micro.media)).toBeNull()
  })

  it('nenhum passeio publica roteiro fechado ou duração', () => {
    for (const tour of siteContent.tours) {
      expect(publishable(tour.itinerary)).toBeNull()
      expect(publishable(tour.duration)).toBeNull()
    }
  })

  it('acessibilidade nunca é afirmada sem confirmação da operação', () => {
    for (const vehicle of siteContent.fleet) {
      expect(publishable(vehicle.accessibility)).toBeNull()
    }
  })

  it('todo placeholder aponta a pendência que vai substituí-lo', () => {
    const facts: Fact<unknown>[] = [
      siteContent.contact.whatsapp,
      siteContent.contact.email,
      siteContent.contact.address,
      siteContent.contact.social,
      siteContent.contact.businessHours,
      ...siteContent.fleet.flatMap((v) => [
        v.passengerCapacity,
        v.luggageCapacity,
        v.amenities,
      ]),
      ...siteContent.services.flatMap((s) => [s.longDescription, s.includes]),
      ...siteContent.faq.map((f) => f.answer),
    ]

    for (const fact of facts) {
      if (isPlaceholder(fact)) {
        expect(fact.replaces).toMatch(/^B-\d+$/)
      }
    }
  })

  it('todo dado publicado é confirmado ou placeholder rastreado', () => {
    for (const service of siteContent.services) {
      if (isPublishable(service.longDescription)) {
        expect(['confirmed', 'placeholder']).toContain(service.longDescription.status)
      }
    }
  })
})
