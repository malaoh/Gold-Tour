# Gold Tour — handoff

Última atualização: 2026-07-29, fim da Etapa 00.

## Estado real do projeto

**Classificação:** pasta nova, recém-inicializada. Não é site em manutenção,
não é exportação de Lovable/Framer/Webflow, não é aplicação incompleta herdada.

O repositório contém exclusivamente o scaffold padrão do `create-next-app`,
criado nesta sessão e ainda não modificado:

```
gold-tour/
├─ app/            layout.tsx, page.tsx, globals.css, favicon.ico  (scaffold)
├─ public/         file.svg, globe.svg, next.svg, vercel.svg, window.svg (scaffold)
├─ docs/           criado na Etapa 00
├─ AGENTS.md       aviso do Next 16 sobre breaking changes
├─ CLAUDE.md       aponta para AGENTS.md
├─ next.config.ts  vazio (config padrão)
├─ eslint.config.mjs · postcss.config.mjs · tsconfig.json
└─ package.json · package-lock.json
```

- Rotas existentes: apenas `/` (página de boas-vindas do Next).
- Estilos: `app/globals.css` com `@import "tailwindcss"` padrão.
- Banco de dados: nenhum. Variáveis de ambiente: nenhuma (`.env*` inexistente).
- Testes: nenhum. CI: nenhum. `npm run lint` existe; não há `typecheck` nem `test`.
- `node_modules/` instalado; `.next/` presente de uma geração de tipos.
- Nenhum conteúdo, branding ou dado da Gold Tour foi escrito em código.

## Comandos disponíveis

| Comando | Efeito |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run start` | serve o build |
| `npm run lint` | ESLint |

Ainda não existem: `typecheck`, `test`, `format`. A criar na Etapa 04.

## Preservação do trabalho do usuário

`git status` na abertura e no fechamento da Etapa 00: **working tree limpo**,
nenhuma alteração local pendente, nada descartado. Único commit anterior:
`7530356 Initial commit: scaffold Next.js project for Gold Tour`.

Nenhum arquivo em `Downloads/GOLD TOUR` ou `Downloads/02-Imagens` foi movido,
renomeado, copiado ou alterado.

## Bloqueadores que já afetam o cronograma

| ID | Falta | Trava |
|---|---|---|
| B-01 | Procedência das duas fotos de veículos (indício de edição por IA) | Etapa 08 |
| B-02 | Número de WhatsApp | Etapa 07 |
| B-03/B-04 | Fotos de Doblò e micro-ônibus | Etapa 08 |
| B-05 | Logo, favicon, cores e fontes oficiais | Etapa 03 |
| B-06 | Dados empresariais para footer e páginas legais | Etapa 11 |

Lista completa em `docs/content-needs.md`.

## Próxima ação

**Etapa 01 — verdade do negócio, marca e modelo de conteúdo.**

Aguardando o Prompt 01. Para que a Etapa 01 produza conteúdo real em vez de
suposição, o ideal é receber junto: número de WhatsApp, ativos de marca (ou a
confirmação de que não existem), dados empresariais e a URL de um site atual,
se houver.

Nada será implementado antes do próximo prompt.
