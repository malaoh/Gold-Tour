/**
 * Relatório de pré-lançamento: lista tudo que está no ar como provisório.
 *
 * Rode `npm run placeholders` antes de divulgar o site. Enquanto a lista não
 * estiver vazia, existe conteúdo publicado que ainda precisa ser trocado pelo
 * dado real.
 */

import { isPlaceholder, type Fact } from '../content/schema'
import { siteContent } from '../content/site-content'

type Row = { campo: string; substitui: string; valor: string; nota?: string }

const rows: Row[] = []

function check(campo: string, fact: Fact<unknown>) {
  if (!isPlaceholder(fact)) return
  const raw = typeof fact.value === 'object' ? JSON.stringify(fact.value) : String(fact.value)
  rows.push({
    campo,
    substitui: fact.replaces,
    valor: raw.length > 60 ? `${raw.slice(0, 57)}…` : raw,
    ...(fact.note ? { nota: fact.note } : {}),
  })
}

const { contact, services, fleet, tours, faq } = siteContent

check('contato.whatsapp', contact.whatsapp)
check('contato.email', contact.email)
check('contato.endereco', contact.address)
check('contato.horario', contact.businessHours)
check('contato.redes', contact.social)

for (const service of services) {
  check(`servico.${service.slug}.descricao`, service.longDescription)
  check(`servico.${service.slug}.inclui`, service.includes)
}

for (const vehicle of fleet) {
  check(`frota.${vehicle.slug}.passageiros`, vehicle.passengerCapacity)
  check(`frota.${vehicle.slug}.bagagem`, vehicle.luggageCapacity)
  check(`frota.${vehicle.slug}.comodidades`, vehicle.amenities)
}

for (const tour of tours) check(`passeio.${tour.slug}.roteiro`, tour.itinerary)
for (const item of faq) check(`faq.${item.id}`, item.answer)

if (rows.length === 0) {
  console.log('Nenhum placeholder publicado. O site está com dados reais.')
} else {
  console.log(`\n${rows.length} campo(s) provisório(s) no ar:\n`)
  console.table(rows)
  console.log('\nDetalhes das pendências: docs/content-needs.md\n')
}
