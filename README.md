# Gold Tour

Site de conversão da Gold Tour — concierge de mobilidade executiva em Salvador,
Bahia. Transfers, receptivo, motorista à disposição, passeios privativos e
transporte para grupos e eventos, com continuidade do atendimento pelo
WhatsApp.

**Status:** todas as 14 etapas do projeto (00–13) aprovadas. **Não publicado**
— ver [`docs/handoff.md`](docs/handoff.md) para o que falta antes de ir ao ar.

## Começando

Requisitos: Node.js 20 ou superior e npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

A aplicação sobe em `http://localhost:3010`.

`npm ci` reproduz exatamente o `package-lock.json`. O projeto funciona sem
preencher o `.env.local` — os recursos que dependem de dados ainda não
confirmados usam placeholder rastreado (ver abaixo) ou simplesmente não
aparecem, por decisão de arquitetura.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run start` | serve o build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier (escreve) |
| `npm run format:check` | Prettier (só verifica) |
| `npm run test` | Vitest, uma passada |
| `npm run test:watch` | Vitest em watch |
| `npm run test:e2e` | Playwright |
| `npm run placeholders` | lista todo dado provisório publicado, com o id da pendência |
| `npm run verify` | lint + typecheck + test + build |

Antes do primeiro `test:e2e`: `npx playwright install chromium webkit`.

## Estrutura

```
app/                rotas (App Router), layout, error, not-found, loading,
                     sitemap.ts, robots.ts
components/sections/ blocos da home (hero, frota, passeios, FAQ, etc.)
components/site/    header, footer, logo, page-intro
components/booking/ formulário de solicitação
components/ui/      primitivos do design system + liquid-glass-button.tsx
content/            schema tipado + dados do site (fonte única de conteúdo)
docs/                documentação do projeto e das 14 etapas
lib/                 utilitários e integração com WhatsApp
public/brand/        logo (raster, extraída do caderno de marca)
public/media/        vídeos e posters aprovados
public/frota/        fotos da frota
scripts/placeholders.ts  relatório de pré-lançamento
tests/               testes unitários (Vitest)
tests/e2e/           testes end-to-end (Playwright)
```

## A regra que governa o conteúdo

Este site não publica informação inventada. Todo dado sensível a veracidade é
um `Fact<T>` (`content/schema.ts`) com um destes status:

| Status | Comportamento |
|---|---|
| `confirmed` | tem fonte rastreável, vai ao ar |
| `placeholder` | provisório **autorizado pelo proprietário**, vai ao ar e aparece em `npm run placeholders` até ser trocado |
| `pending` | não existe ainda — a interface **omite** a afirmação |
| `prohibited` | vetado por decisão registrada — nunca cai em fallback |

A leitura só acontece por `publishable()`, que devolve `null` para tudo que
não for `confirmed` ou `placeholder`:

```ts
tagline: confirmed('Mobilidade executiva em Salvador', 'direção final')
whatsapp: placeholder({ e164: '+5571900000000', display: '...' }, 'B-02', 'trocar antes de divulgar')
itinerary: pending('B-19', 'roteiro fechado não pode ser placeholder')
media: prohibited('D-005', 'baixa resolução e origem de concorrente')
```

Os ids de pendência vivem em [`docs/content-needs.md`](docs/content-needs.md) e
os de decisão em [`docs/decision-log.md`](docs/decision-log.md).

## Antes de divulgar o site

Rode `npm run placeholders` para a lista completa. O item que bloqueia tudo:

**Troque o número de WhatsApp.** Hoje o site usa `+55 71 90000-0000`
(fictício) para todo CTA de conversão. Defina o real em `.env.local`:

```
NEXT_PUBLIC_WHATSAPP_E164=5571999999999
```

Depois disso, revise capacidade/bagagem da frota, e-mail, endereço, textos de
serviço e demais itens do relatório — nenhum é inventado, mas vários ainda
são provisórios. Detalhes e prioridades em
[`docs/handoff.md`](docs/handoff.md).

## Variáveis de ambiente

Todas são públicas por natureza; nenhum segredo entra no repositório. Só usa o
prefixo `NEXT_PUBLIC_` o que já apareceria no HTML final.

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_E164` | número oficial do WhatsApp. Ausente: usa o placeholder de `content/site-content.ts` |
| `NEXT_PUBLIC_SITE_URL` | domínio de produção, para `metadataBase`, canonical, sitemap e Open Graph |

## Limitação conhecida (não é bug do site)

`notFound()` em `/termos`, `/design-system` e slugs inválidos de
`/frota/[slug]` responde HTTP 200 em vez de 404 — limitação documentada e sem
solução limpa do Next.js App Router quando há um boundary de Suspense na
árvore (`app/loading.tsx` global). Mitigado pelo `noindex` automático que o
próprio Next injeta nessas páginas e pela ausência de link interno para
qualquer uma delas. Detalhes em [`docs/qa-report.md`](docs/qa-report.md).

## Documentação

| Documento | Assunto |
|---|---|
| [project-brief](docs/project-brief.md) | objetivo, público, serviços, restrições |
| [brand-audit](docs/brand-audit.md) | identidade real, paleta, contraste, ressalvas |
| [content-model](docs/content-model.md) | entidades e a mecânica de veracidade |
| [content-needs](docs/content-needs.md) | tudo que falta, com ids de bloqueio |
| [architecture](docs/architecture.md) | stack, rotas, dados, testes, performance |
| [information-architecture](docs/information-architecture.md) | rotas, seções, navegação, SEO |
| [design-system](docs/design-system.md) | tokens, componentes, acessibilidade |
| [motion-system](docs/motion-system.md) | durações, regras, vídeo, reduced motion |
| [media-map](docs/media-map.md) | inventário de mídia e pipeline |
| [decision-log](docs/decision-log.md) | todas as decisões comprovadas (62 registradas) |
| [qa-report](docs/qa-report.md) | achados e correções de cada etapa de QA |
| [performance-report](docs/performance-report.md) | vídeo aprovado/recusado, LCP/CLS, payload |
| [progress](docs/progress.md) | status das 14 etapas |
| [handoff](docs/handoff.md) | estado final, pendências, riscos, manutenção |

## Rota interna

`/design-system` demonstra tokens e estados dos componentes. `notFound()` em
produção (ver limitação conhecida acima) e marcada `noindex`.
