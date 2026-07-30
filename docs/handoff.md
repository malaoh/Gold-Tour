# Gold Tour — handoff final

Última atualização: 2026-07-29, ao fim da Etapa 13. Todas as 14 etapas
(00–13) do contrato aprovadas.

## Status final: **PRONTO PARA HOSPEDAGEM, NÃO PRONTO PARA DIVULGAÇÃO PÚBLICA**

O código está completo, testado e correto. **Não deve ser divulgado a
clientes reais** enquanto o WhatsApp continuar fictício — é o único ponto
onde "pronto" e "publicável" divergem neste projeto. Ver critério completo
no fim deste documento.

## URLs

| Ambiente | URL |
|---|---|
| Local (dev) | `http://localhost:3010` |
| Produção | não definida — `NEXT_PUBLIC_SITE_URL` vazio (B-09) |

Não publicado. Ver seção "Publicação" abaixo para o checklist exato.

## Stack

Next.js 16.2.12 (App Router) · React 19.2.4 · TypeScript 5 (strict +
`noUncheckedIndexedAccess`) · Tailwind CSS 4 · ESLint 9 · Vitest 4 ·
Playwright · npm. Sem CMS, sem autenticação, sem banco de dados, sem gateway
de pagamento — o escopo (site de conversão com handoff para WhatsApp) nunca
precisou de nenhum dos quatro.

## Comandos

```bash
npm ci                      # instalação reproduzível
npm run dev                 # desenvolvimento, localhost:3010
npm run build && npm start  # build de produção
npm run verify               # lint + typecheck + test + build
npm run test:e2e             # Playwright (requer: npx playwright install chromium webkit)
npm run placeholders         # lista todo dado provisório publicado
```

## Variáveis de ambiente

Nenhum segredo — todas são públicas por natureza.

| Variável | Para quê | Estado atual |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_E164` | número oficial do WhatsApp | **vazio** — usa o placeholder `+5571900000000` de `content/site-content.ts` |
| `NEXT_PUBLIC_SITE_URL` | domínio de produção (metadataBase, canonical, sitemap, OG) | **vazio** — usa `http://localhost:3010` |

## Estrutura

```
app/                 rotas, layout, error, not-found, loading, sitemap.ts, robots.ts
components/sections/ hero, service-selector, trust-strip, fleet-grid,
                      tour-chapters, process-steps, faq, final-cta
components/site/     header, footer, logo, page-intro, service-detail
components/booking/  booking-form (formulário → WhatsApp), booking-client
components/ui/       button, field, card, badge, sheet-demo,
                      liquid-glass-button.tsx (LiquidLink, MetalButton, MetalLink)
content/             schema.ts (Fact<T>) + site-content.ts (todo o conteúdo)
lib/                 utils.ts, whatsapp.ts
public/brand/        logo raster (selo, wordmark, monograma + variantes claras)
public/media/        5 vídeos aprovados (≤2,5 MB) + posters
public/frota/        fotos da frota (+ originals/ sem tratamento)
scripts/placeholders.ts  relatório de pré-lançamento
tests/               18 testes unitários
tests/e2e/           6 testes end-to-end (Chromium + WebKit)
docs/                14 documentos — índice completo no README
```

## Conteúdo editável

Tudo em **`content/site-content.ts`**, um único arquivo. Cada campo é um
`Fact<T>`:

```ts
confirmed(valor, 'fonte')                    // publica como verdade
placeholder(valor, 'B-XX', 'nota opcional')  // publica, mas rastreado
pending('B-XX', 'nota opcional')             // some da interface
prohibited('D-XX', 'motivo')                 // some, nunca cai em fallback
```

### Como trocar o WhatsApp (a ação mais importante)

Duas opções, use a primeira:

1. **Recomendado:** definir `NEXT_PUBLIC_WHATSAPP_E164=5571999999999` em
   `.env.local` (ou nas variáveis de ambiente da hospedagem). Não precisa
   tocar em código.
2. Editar `content/site-content.ts` → `contact.whatsapp` → trocar o
   `placeholder(...)` por `confirmed({ e164: '+55...', display: '...' }, 'fonte')`.

### Como substituir imagens

- **Frota:** arquivos em `public/frota/`. Para Doblò e Micro-ônibus (hoje sem
  foto — `prohibited`), adicionar o arquivo e trocar `prohibited(...)` por
  `confirmed(media('id', '/frota/arquivo.jpg', 'alt text'), 'fonte')` em
  `content/site-content.ts`.
- **Logo:** `public/brand/`. Hoje é raster (PNG) extraído do caderno de marca
  — quando o vetor oficial chegar (B-05), substituir os arquivos mantendo os
  mesmos nomes, ou atualizar `components/site/logo.tsx` se o formato mudar.
- **Vídeos:** `public/media/`. Ver `docs/performance-report.md` para o
  processo de aprovação/recorte/compressão usado nos 5 vídeos atuais antes de
  adicionar um novo.

### Como adicionar tradução (EN/ES)

A estrutura já existe (`LocalizedContent<T>` em `content/schema.ts`) mas não
está implementada — `enabledLocales` é só `['pt-BR']`. Para ativar:

1. Traduzir o conteúdo e preencher os campos `en`/`es` de `LocalizedContent`.
2. Implementar roteamento por segmento (`/en/...`, `/es/...`) ou por
   subdomínio — não decidido, é trabalho novo de arquitetura.
3. Só then adicionar um seletor de idioma — o Prompt 11 explicitamente proíbe
   exibir seletor para tradução incompleta, e isso continua valendo.

## Testes

| Nível | Comando | Cobertura |
|---|---|---|
| Unitário | `npm run test` | 18 testes — invariantes do `Fact<T>`, frota, WhatsApp, FAQ, legal |
| E2E | `npm run test:e2e` | 6 testes (Chromium + WebKit) — jornada completa até o WhatsApp, validação de campo, ausência de link vazio |

Os e2e rodaram de verdade pela primeira vez na Etapa 13 e revelaram dois
bugs nos próprios testes (dependência de rede externa real, browser WebKit
não instalado) — corrigidos, não eram bugs do site.

## Hospedagem

**Não definida (B-09).** Dado que é Next.js App Router puro (sem
Edge Functions especiais, sem banco), qualquer hospedagem compatível com
Next.js serve — Vercel é a opção mais direta por ser a mantenedora do
framework, mas não é a única.

### Checklist de publicação (não executado — falta autorização e plataforma)

1. Escolher a hospedagem e criar o projeto.
2. Configurar `NEXT_PUBLIC_WHATSAPP_E164` com o número real — **obrigatório
   antes de qualquer divulgação**.
3. Configurar `NEXT_PUBLIC_SITE_URL` com o domínio final.
4. Deploy do branch `main`.
5. Configurar o domínio (se houver um comprado) e DNS — **requer autorização
   explícita separada**, não incluída neste handoff.
6. Smoke test na URL real: home carrega, `/sitemap.xml` e `/robots.txt`
   respondem, formulário de solicitação chega ao WhatsApp real.
7. Rodar `npm run placeholders` uma última vez e revisar cada item antes de
   divulgar o link publicamente.

Exemplo de comandos para Vercel (só como referência — não executado):

```bash
npm i -g vercel
vercel link
vercel env add NEXT_PUBLIC_WHATSAPP_E164 production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel --prod
```

## Pendências que não bloqueiam a hospedagem

Ver `npm run placeholders` para a lista completa e atualizada. Resumo por
prioridade:

| # | O quê | Onde |
|---|---|---|
| 1 | **Número de WhatsApp real** — bloqueia divulgação, não bloqueia deploy | `.env` |
| 2 | Capacidade/bagagem real dos 4 veículos (hoje são estimativas) | `content/site-content.ts` |
| 3 | E-mail, endereço, horário, Instagram reais | `content/site-content.ts` |
| 4 | Textos de serviço confirmados pela operação | `content/site-content.ts` |
| 5 | Respostas de FAQ (voo atrasado, cadeirinha, cancelamento, grupos) | `content/site-content.ts` |
| 6 | Fotos da Doblò e do Micro-ônibus | `public/frota/` |
| 7 | Termos de uso (depende de política comercial ainda não definida) | `content/site-content.ts` |
| 8 | Domínio de produção | `.env` |
| 9 | Logo em vetor com transparência | `public/brand/` |

## Riscos residuais

1. **WhatsApp fictício e publicado.** O item que efetivamente separa "código
   pronto" de "site publicável". Nada mais neste projeto depende disso para
   funcionar tecnicamente.
2. **Capacidades de passageiros são estimativas**, não confirmadas pela
   operação — risco de decepcionar um cliente no dia da viagem se estiverem
   erradas.
3. **CTAs "liquid glass"/"metal"** (D-038) divergem do contrato visual
   original ("sem glassmorphism, sem botão cenográfico") por decisão
   explícita e informada do proprietário. Os problemas técnicos que o
   componente trouxe (foco de teclado, contraste, responsividade) foram
   corrigidos na Etapa 12; a escolha estética em si não foi revertida.
4. **`notFound()` retorna HTTP 200 em algumas rotas raras** (`/termos`,
   `/design-system`, slug inválido de frota) — limitação documentada do
   Next.js App Router (não bug do site), mitigada por `noindex` automático e
   ausência de links internos. Ver `qa-report.md`.
5. **JS inicial em produção ~160 KB**, acima da meta de 120 KB da Etapa 02 —
   provável causa: `@radix-ui/react-slot` + `class-variance-authority` do
   componente liquid-glass. Não corrigido; reavaliar se performance virar
   prioridade.
6. **`postcss` vulnerável dentro do Next** (2 CVEs) — dependência de build,
   não vai ao cliente; correção depende de release do Next.
7. **Procedência das fotos de Corolla e Sprinter**: confirmadas como oficiais
   pelo proprietário (D-033), mas os arquivos originais têm um glifo
   característico de ferramentas de IA do Google — registrado, não
   bloqueante, mas vale saber.

## Rotina de manutenção recomendada

- **A cada troca de dado real:** rodar `npm run placeholders` para confirmar
  que o item saiu da lista.
- **A cada dependência nova:** `npm audit --omit=dev` antes de commitar —
  produção deve continuar só com as 2 vulnerabilidades já documentadas
  (D-022), nenhuma nova.
- **A cada mudança visual:** os 5 breakpoints de referência são 375×812,
  390×844, 768×1024, 1024×768, 1440×900 — testados manualmente ao longo do
  projeto, sem CI visual automatizado.
- **Antes de qualquer deploy:** `npm run verify` (lint + typecheck + test +
  build) e, idealmente, `npm run test:e2e`.
- **Se o Next.js for atualizado:** revisitar o achado de `notFound()`/HTTP 200
  (D-062) — pode ter sido corrigido em versão futura do framework.

## Critério final

| Critério | Status |
|---|---|
| Todas as etapas aprovadas | ✅ 14/14 |
| Nenhum P0/P1 em aberto | ✅ — os 2 P1 da Etapa 12 foram corrigidos |
| Lint, typecheck, testes, build passam | ✅ |
| Frota correta (4 categorias, sem Spin, sem mídia de concorrente) | ✅ |
| Acessibilidade e reduced-motion funcionam | ✅ |
| 5 breakpoints aprovados | ✅ |
| Documentação permite manutenção por outra pessoa | ✅ — este documento + 13 outros |
| **WhatsApp funciona com número real** | ❌ — placeholder fictício |

**Status: PRONTO** como entrega de código — build, testes, acessibilidade e
qualidade aprovados de ponta a ponta. **NÃO PRONTO** para divulgação pública
enquanto o WhatsApp continuar fictício: é a única lacuna entre o que está
aqui e um site que uma pessoa real pode usar para contratar a Gold Tour.
