# Gold Tour — modelo de conteúdo (Etapa 01)

Implementação: [`content/schema.ts`](../content/schema.ts) (tipos) e
[`content/site-content.ts`](../content/site-content.ts) (dados).

## Princípio

O contrato do projeto proíbe publicar informação inventada. Aqui isso deixa de
ser disciplina editorial e vira restrição de tipo: todo campo sensível a
veracidade é um `Fact<T>`, e o único jeito de ler o valor é passar por
`publishable()`, que devolve `null` para qualquer coisa não confirmada.

```ts
type Fact<T> = ConfirmedFact<T> | PlaceholderFact<T> | PendingFact | ProhibitedFact
publishable(fact)  // T quando confirmed ou placeholder, null nos demais casos
```

| Status | Significado | Comportamento na interface |
|---|---|---|
| `confirmed` | dado com fonte rastreável (`source`) | renderiza |
| `placeholder` | valor provisório **aprovado pelo proprietário** (D-024), com `replaces` apontando o id em `content-needs.md` | renderiza e aparece em `npm run placeholders` até ser trocado |
| `pending` | não informado ainda; aponta o id em `content-needs.md` | omite a afirmação inteira |
| `prohibited` | vetado por decisão registrada (`decision`) | omite e nunca cai em fallback |

Nenhum desses status é exibido ao visitante. `placeholder` foi a única exceção
à regra original de "nada inventado vai ao ar" — e mesmo assim só existe por
autorização explícita do proprietário, e nunca para preço, prazo, avaliação ou
disponibilidade (induziriam decisão de compra).

**A Etapa 09 restringiu esse mecanismo para passeios.** O prompt da etapa
proíbe publicar, mesmo como placeholder, duração, sequência fechada de
paradas, ingresso, guia, alimentação, preço, disponibilidade, política de
crianças, acessibilidade, idioma ou área de embarque sem confirmação. Por
isso `itinerary` e `duration` em `Tour` usam `pending`, não `placeholder`,
mesmo o site já aceitando placeholder para outros campos — a página descreve
a região, não promete um roteiro.

A diferença entre `pending` e `prohibited` importa: `pending` some hoje e volta
quando o dado chegar; `prohibited` registra que já houve uma decisão de não
publicar aquilo (a imagem da Spin, o micro-ônibus de baixa resolução), para que
ninguém reintroduza o material por engano numa etapa futura.

## Entidades

| Entidade | Tipo | Situação hoje |
|---|---|---|
| `siteSettings` | `SiteSettings` | nome e tagline confirmados; domínio, idiomas e analytics pendentes |
| `companyContact` | `CompanyContact` | só a praça (Salvador/BA) confirmada; **WhatsApp pendente** |
| `navigation` | `Navigation` | rotas primárias, de rodapé e legais definidas |
| `services` | `Service[]` | 5 serviços com nome e resumo confirmados; detalhes pendentes |
| `fleetCategories` | `FleetCategory[]` | 4 categorias; capacidades e comodidades pendentes; 2 mídias proibidas |
| `tours` | `Tour[]` | vazio — nenhum roteiro real foi fornecido |
| `faq` | `FaqItem[]` | 6 perguntas registradas, **nenhuma resposta confirmada** |
| `legal` | `LegalDocument[]` | 2 documentos, corpo pendente |
| `localizedContent` | `LocalizedContent<T>` | estrutura pronta; só `pt-BR` ativo |
| `mediaAsset` | `MediaAsset` | com `provenance` e `license` obrigatórios |

### `MediaAsset` e procedência

Cada mídia declara de onde veio, porque a regra 6 do contrato depende disso:

`own-photo` · `licensed-stock` · `brand-asset` · `ai-generated` ·
`unverified` · `competitor`

Só `own-photo`, `licensed-stock` e `brand-asset` podem ser publicados, e
`licensed-stock` exige `license` confirmada. O campo `usageWarning` carrega
restrições de legenda — por exemplo, o clipe `Vehicles_stationary` não pode ser
apresentado como frota própria.

## Serviços modelados

| Slug | Página própria | Origem do texto |
|---|---|---|
| `transfer-aeroporto` | `/servicos/transfer-aeroporto` | copy-base da direção final |
| `receptivo` | seção | contrato mestre |
| `motorista-a-disposicao` | `/servicos/motorista-a-disposicao` | copy-base |
| `passeio-privativo` | seção; ver `/passeios` | copy-base |
| `grupos-e-eventos` | `/servicos/grupos-e-eventos` | copy-base |

"Frota executiva" e "orçamento pelo WhatsApp", citados no contrato, não são
serviços no modelo: o primeiro é a entidade `fleetCategories`, o segundo é o
fluxo de conversão da Etapa 07.

## Copy-base registrada

| Campo | Texto |
|---|---|
| eyebrow | Mobilidade executiva em Salvador |
| H1 | Salvador começa antes de você chegar. |
| descrição | Transfers, receptivo, passeios privativos e transporte executivo com atendimento próximo do planejamento ao destino. |
| CTA primário | Solicitar atendimento → `/solicitar` |
| CTA secundário | Conhecer serviços → `/servicos` |

A copy-base foi **mantida sem alteração**. O caderno de marca usa uma voz mais
cerimoniosa ("prestígio", "atendimento refinado", "experiência memorável",
"VIP"), mas é uma peça de proposta, não um guia de voz aprovado, e o contrato
mestre proíbe superlativos vazios. Do caderno foi incorporado apenas o
vocabulário concreto — hospitalidade, recepção, discrição, cuidado — e o
descritor institucional "VIP Mobility & Premium Tourism", que é parte da
assinatura da marca e não do texto corrido. Ver `brand-audit.md` §"Voz da marca".

## Consequência imediata

Com o estado atual dos dados, se a home fosse renderizada hoje ela teria hero,
lista de serviços com nome e resumo, e os quatro nomes de veículos — e **nada
mais**: sem FAQ, sem capacidades, sem fotos de frota, sem rodapé de contato e
sem CTA funcional de WhatsApp. Isso é o comportamento correto do modelo, e
mostra por que os bloqueadores B-01 a B-08 precisam ser resolvidos antes das
Etapas 07 e 08.
