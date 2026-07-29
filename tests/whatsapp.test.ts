import { describe, expect, it } from 'vitest'
import { buildWhatsAppMessage } from '@/lib/whatsapp'

/**
 * O handoff para o WhatsApp é o único ponto do site onde uma falha silenciosa
 * custa uma venda. A montagem da URL é testada de ponta a ponta no Playwright;
 * aqui fica a montagem da mensagem, que é pura.
 */
describe('buildWhatsAppMessage', () => {
  it('inclui só os campos preenchidos', () => {
    const message = buildWhatsAppMessage({ service: 'Transfer aeroporto', name: 'Ana' })

    expect(message).toContain('Serviço: Transfer aeroporto')
    expect(message).toContain('Nome: Ana')
    expect(message).not.toContain('Passageiros')
    expect(message).not.toContain('undefined')
  })

  it('funciona sem nenhum campo', () => {
    expect(buildWhatsAppMessage({})).toBe(
      'Olá! Gostaria de solicitar um atendimento com a Gold Tour.',
    )
  })

  it('inclui o veículo pré-selecionado a partir da frota', () => {
    const message = buildWhatsAppMessage({
      service: 'Grupos e eventos',
      vehicle: 'Sprinter Executiva',
      name: 'Ana',
    })

    expect(message).toContain('Veículo preferido: Sprinter Executiva')
  })
})
