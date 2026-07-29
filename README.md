# Gold Tour

Site de conversão da Gold Tour — concierge de mobilidade executiva em Salvador,
Bahia. Transfers, receptivo, motorista à disposição, passeios privativos e
transporte para grupos e eventos, com continuidade do atendimento pelo WhatsApp.

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
confirmados simplesmente não aparecem, por decisão de arquitetura.

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
| `npm run verify` | lint + typecheck + test + build |

Antes do primeiro `test:e2e`: `npx playwright install chromium`.

## Estrutura

```
app/           rotas (App Router), layout, error, not-found, loading
components/    componentes de apresentação
components/ui/ primitivos do design system
content/       schema tipado + dados do site (fonte única de conteúdo)
docs/          documentação do projeto e das etapas
lib/           utilitários e integração com WhatsApp
public/        assets estáticos
tests/         testes unitários e de componente (Vitest)
tests/e2e/     testes end-to-end (Playwright)
```

## A regra que governa o conteúdo

Este site não publica informação não confirmada. Todo dado sensível a
veracidade é um `Fact<T>` com status `confirmed`, `pending` ou `prohibited`, e a
leitura só acontece por `publishable()`, que devolve `null` para tudo que não
foi confirmado — a interface omite a afirmação em vez de exibir placeholder.

Ao adicionar conteúdo, informe a fonte:

```ts
tagline: confirmed('Mobilidade executiva em Salvador', 'direção final')
whatsapp: pending('B-02')            // aparece quando o dado chegar
media: prohibited('D-005', 'baixa resolução e origem de concorrente')
```

Os ids de pendência vivem em [`docs/content-needs.md`](docs/content-needs.md) e
os de decisão em [`docs/decision-log.md`](docs/decision-log.md).

## Variáveis de ambiente

Todas são públicas por natureza; nenhum segredo entra no repositório. Só usa o
prefixo `NEXT_PUBLIC_` o que já apareceria no HTML final.

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_E164` | número oficial do WhatsApp. Vazio: os CTAs de conversão não são publicados |
| `NEXT_PUBLIC_SITE_URL` | domínio de produção, para `metadataBase`, canonical e Open Graph |

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
| [decision-log](docs/decision-log.md) | decisões comprovadas |
| [progress](docs/progress.md) | status das etapas 00–13 |
| [handoff](docs/handoff.md) | estado real e próxima ação |

## Rota interna

`/design-system` demonstra tokens e estados dos componentes. Responde 404 em
produção e está marcada como `noindex`.
