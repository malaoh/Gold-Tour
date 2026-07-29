# Gold Tour — handoff

Última atualização: 2026-07-29, ao fim da Etapa 05, da Etapa 06 e da parte
funcional da Etapa 07.

## Estado real

**O site existe e navega.** Home completa com as dez seções na ordem acordada,
páginas internas com conteúdo real, marca aplicada, mídia de Salvador
importada e o caminho de conversão funcionando de ponta a ponta até o WhatsApp.

### Rotas publicadas (16 no build)

| Rota | Estado |
|---|---|
| `/` | home completa |
| `/servicos` | índice dos 5 serviços |
| `/servicos/transfer-aeroporto` · `/motorista-a-disposicao` · `/grupos-e-eventos` | páginas de serviço |
| `/frota` | 4 categorias |
| `/frota/[slug]` | 4 páginas geradas estaticamente |
| `/passeios` | 4 capítulos editoriais |
| `/solicitar` | formulário funcional → WhatsApp |
| `/contato` | canais e área de atuação |
| `/design-system` | interno, 404 em produção |
| `/politica-de-privacidade` · `/termos` | **404 de propósito** — sem texto real (B-11) |

### Estrutura

```
app/            16 rotas + layout, error, not-found, loading
components/
  sections/     hero, service-selector, trust-strip, fleet-grid,
                tour-chapters, process-steps, faq, final-cta
  site/         header, footer, logo, page-intro, service-detail
  booking/      booking-form, booking-client
  ui/           button, field, card, badge, sheet-demo
content/        schema.ts (Fact<T>), site-content.ts
lib/            utils.ts, whatsapp.ts
public/brand/   selo, wordmark, monograma (+ variantes claras)
public/media/   5 vídeos ≤ 2,5 MB + 5 posters
public/frota/   corolla, sprinter
scripts/        placeholders.ts
tests/          12 unitários + 3 e2e
docs/           14 documentos
```

## Como o conteúdo funciona agora

Quatro estados, definidos em `content/schema.ts`:

- `confirmed` — tem fonte, vai ao ar como verdade;
- `placeholder` — provisório aprovado pelo proprietário, **vai ao ar** e é
  listado por `npm run placeholders`;
- `pending` — não existe, some da interface;
- `prohibited` — vetado por decisão, some e nunca cai em fallback.

**34 campos estão no ar como provisórios.** Rode `npm run placeholders` para a
lista completa.

## O que trocar antes de divulgar o site

| Prioridade | O quê | Onde |
|---|---|---|
| **1** | **Número de WhatsApp.** O site usa `+55 71 90000-0000`, fictício. Todo CTA aponta para ele. | `.env.local` → `NEXT_PUBLIC_WHATSAPP_E164` |
| **2** | Capacidades e bagagem dos 4 veículos (3, 15, 26 e 6 passageiros são chutes) | `content/site-content.ts` |
| **3** | E-mail, endereço, horário e Instagram | `content/site-content.ts` |
| **4** | Textos dos serviços e roteiros dos passeios | `content/site-content.ts` |
| **5** | Respostas de FAQ e política de cancelamento | `content/site-content.ts` |
| 6 | Fotos da Doblò e do micro-ônibus | `public/frota/` |
| 7 | Política de privacidade e termos | `content/site-content.ts` |
| 8 | Domínio de produção | `.env.local` → `NEXT_PUBLIC_SITE_URL` |
| 9 | Logo em vetor (hoje é raster extraído da prancha) | `public/brand/` |

## Riscos residuais

1. **O número de WhatsApp é fictício e está publicado.** Enquanto não trocar,
   o site não pode ser divulgado — um cliente que clicar não chega a ninguém.
2. **Capacidades de passageiros são provisórias.** São o tipo de dado que
   induz decisão de compra; confira antes de qualquer divulgação.
3. **Procedência das fotos de veículos** (B-01): `sedan executivo.png` e
   `van principal.png` trazem o glifo das ferramentas de IA do Google. Estão no
   ar por determinação do proprietário; se forem geradas por IA e não fotos da
   frota real, precisam ser substituídas.
4. **`postcss` vulnerável dentro do Next** — dependência de build, não vai ao
   cliente; a correção depende de release do Next.
5. **E2E não executado** — falta `npx playwright install chromium`.
6. **Logo raster.** Funciona, mas não escala nem gera favicon/OG decentes.

## Próxima ação

**Etapa 07 completa** — o passo a passo de 14 etapas (origem, destino, horário,
voo, bagagens, acessibilidade, categoria de veículo, revisão) em bottom sheet
no celular e painel no desktop. A base já existe: `lib/whatsapp.ts`, o schema
zod e o rascunho em `sessionStorage`.

Depois: Etapa 08 (frota e imagens), 09 (serviços e Salvador), 10 (mídia e
motion), 11 (legal, SEO, idiomas), 12 (QA completo), 13 (produção).
