import { describe, expect, it } from 'vitest'
import {
  confirmed,
  isPublishable,
  pending,
  prohibited,
  publishable,
} from '@/content/schema'
import { siteContent } from '@/content/site-content'

describe('Fact', () => {
  it('devolve o valor quando confirmado', () => {
    expect(publishable(confirmed('Salvador', 'contrato'))).toBe('Salvador')
  })

  it('devolve null quando pendente', () => {
    expect(publishable(pending('B-02'))).toBeNull()
  })

  it('devolve null quando proibido', () => {
    expect(publishable(prohibited('D-005', 'baixa resolução'))).toBeNull()
  })

  it('isPublishable estreita o tipo apenas para confirmado', () => {
    const fact = confirmed(42, 'operação')
    expect(isPublishable(fact)).toBe(true)
    expect(isPublishable(pending('B-12'))).toBe(false)
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

  it('nenhuma categoria de frota expõe capacidade ou comodidade não confirmada', () => {
    for (const vehicle of siteContent.fleet) {
      expect(publishable(vehicle.passengerCapacity)).toBeNull()
      expect(publishable(vehicle.amenities)).toBeNull()
    }
  })

  it('nenhum serviço expõe preço', () => {
    for (const service of siteContent.services) {
      expect(publishable(service.pricing)).toBeNull()
    }
  })

  it('nenhuma resposta de FAQ é publicada sem confirmação', () => {
    const publicadas = siteContent.faq.filter((item) => isPublishable(item.answer))
    expect(publicadas).toHaveLength(0)
  })
})
