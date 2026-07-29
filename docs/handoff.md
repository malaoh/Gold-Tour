# Gold Tour — handoff

Última atualização: 2026-07-29, ao fim da Etapa 09.

## Estado real

O site navega de ponta a ponta com conteúdo real ou provisório rastreado —
nada inventado sem marcação. Frota com as 4 categorias corretas: Corolla e
Sprinter com foto oficial confirmada pelo proprietário e harmonizada
visualmente; Doblò e Micro-ônibus tratados honestamente (sem Spin, sem o
arquivo vetado, painel "Imagem em curadoria").

### Rotas publicadas (16 no build)

| Rota | Estado |
|---|---|
| `/` | home completa |
| `/servicos` | índice dos 5 serviços |
| `/servicos/transfer-aeroporto` · `/motorista-a-disposicao` · `/grupos-e-eventos` | páginas de serviço |
| `/frota` | 4 categorias, grid responsivo |
| `/frota/[slug]` | 4 páginas com trilha, uso recomendado, ficha e CTA pré-selecionado |
| `/passeios` | 4 capítulos editoriais |
| `/solicitar` | formulário funcional → WhatsApp, aceita `?servico=` e `?veiculo=` |
| `/contato` | canais e área de atuação |
| `/design-system` | interno, 404 em produção |
| `/politica-de-privacidade` · `/termos` | 404 de propósito — sem texto real (B-11) |

### Estrutura

```
app/            16 rotas + layout, error, not-found, loading
components/
  sections/     hero, service-selector, trust-strip, fleet-grid,
                tour-chapters, process-steps, faq, final-cta
  site/         header, footer, logo, page-intro, service-detail
  booking/      booking-form, booking-client
  ui/           button, field, card, badge, sheet-demo,
                liquid-glass-button (LiquidLink, MetalButton, MetalLink)
content/        schema.ts (Fact<T>), site-content.ts
lib/            utils.ts, whatsapp.ts
public/brand/   selo, wordmark, monograma (+ variantes claras)
public/media/   5 vídeos ≤ 2,5 MB + 5 posters
public/frota/   corolla, sprinter (+ originals/ sem tratamento)
scripts/        placeholders.ts
tests/          15 unitários + 3 e2e
docs/           14 documentos
```

## Como o conteúdo funciona

Quatro estados em `content/schema.ts`: `confirmed` (tem fonte, publica),
`placeholder` (provisório aprovado, publica e aparece em
`npm run placeholders`), `pending` (não existe, some), `prohibited` (vetado,
some e nunca cai em fallback).

## CTAs — mudança de visual nesta etapa

A pedido explícito do proprietário, os CTAs primários (`Solicitar
atendimento`, `Solicitar orçamento`, `Solicitar com este veículo`, `Enviar
pelo WhatsApp`, `Iniciar solicitação`) passaram a usar um componente de
terceiros colado pelo usuário (`components/ui/liquid-glass-button.tsx`):
`LiquidLink` sobre fundo escuro (hero, header, CTA final) e
`MetalButton`/`MetalLink` (variante gold) sobre fundo claro (frota, serviços,
contato, formulário). Isso substitui o `Button` discreto do design system
nesses pontos — `Button`, `Field`, `Card` e `Badge` continuam existindo e em
uso nas ações secundárias e na rota `/design-system`.

**Isso contraria o contrato mestre**, que proíbe "glassmorphism" e "botões
cenográficos". Foi feito mesmo assim porque o proprietário confirmou a
escolha depois de avisado do conflito. Ver `decision-log.md` D-038 a D-040 e
`brand-audit.md` R-06.

## O que trocar antes de divulgar o site

| Prioridade | O quê | Onde |
|---|---|---|
| **1** | **Número de WhatsApp.** Hoje é `+55 71 90000-0000`, fictício. | `.env.local` → `NEXT_PUBLIC_WHATSAPP_E164` |
| **2** | Capacidades e bagagem dos 4 veículos (3/15/26/6 passageiros são placeholder) | `content/site-content.ts` |
| **3** | E-mail, endereço, horário e Instagram | `content/site-content.ts` |
| **4** | Textos dos serviços e roteiros dos passeios | `content/site-content.ts` |
| **5** | Respostas de FAQ e política de cancelamento | `content/site-content.ts` |
| 6 | Fotos da Doblò e do micro-ônibus | `public/frota/` |
| 7 | Política de privacidade e termos | `content/site-content.ts` |
| 8 | Domínio de produção | `.env.local` → `NEXT_PUBLIC_SITE_URL` |
| 9 | Logo em vetor (hoje é raster extraído da prancha) | `public/brand/` |

## Riscos residuais

1. **WhatsApp fictício e publicado** — bloqueia qualquer divulgação.
2. **Capacidades de passageiros são provisórias** — induzem decisão de compra;
   confirmar antes de divulgar.
3. **Contraste dos novos CTAs.** O texto do `MetalButton` (gold) sobre a parte
   clara do próprio gradiente mede **1,16:1** — praticamente ilegível; a base
   do gradiente mede 3,45:1, ainda abaixo do mínimo de 4,5:1 para texto normal.
   É uma regressão de acessibilidade real, aceita conscientemente pelo
   proprietário nesta etapa. Recomendo corrigir na Etapa 12.
4. **`postcss` vulnerável dentro do Next** — dependência de build, não vai ao
   cliente; a correção depende de release do Next.
5. **E2E não executado** — falta `npx playwright install chromium`.
6. **Logo raster.** Funciona, mas não escala nem gera favicon/OG decentes.

## Etapa 09 — o que mudou

Corrigido um erro real: os 4 passeios publicavam roteiro fechado
(`itinerary`) como placeholder — por exemplo, "Pelourinho, Terreiro de
Jesus..." para "Salvador histórico". A própria Etapa 09 proíbe isso mesmo
como dado provisório. `itinerary` e `duration` agora são `pending` em todas
as categorias — a página fala em região e flexibilidade, não em paradas
prometidas. Nomes ajustados: "Baía e cidade baixa", "Orla e pôr do sol".

Páginas de serviço ganharam trilha de navegação, seção "Como solicitar" e
links relacionados (frota, passeios). `/servicos`, `/passeios` e as 3 páginas
de serviço com rota própria agora têm canonical e Open Graph. O CTA de cada
capítulo de passeio é contextual: "Conhecer os passeios" na home,
"Solicitar este roteiro" (→ `/solicitar?servico=passeio-privativo`) dentro de
`/passeios` — nunca um link circular.

## Próxima ação

**Etapa 10 — pipeline de mídia e motion.**
