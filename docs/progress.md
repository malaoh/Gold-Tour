# Gold Tour — progresso das etapas

Status possíveis: `pendente` · `em andamento` · `APROVADA` · `REPROVADA`

| # | Etapa | Status | Data | Observação |
|---|---|---|---|---|
| 00 | Bootstrap, auditoria e governança | APROVADA | 2026-07-29 | Pasta nova identificada; 6 documentos criados |
| 01 | Verdade do negócio, marca e modelo de conteúdo | APROVADA | 2026-07-29 | Marca auditada; modelo tipado com `Fact<T>` |
| 02 | Arquitetura, rotas e plano técnico | APROVADA | 2026-07-29 | Stack preservada; rotas, componentes e orçamentos definidos |
| 03 | Design system Gold Tour | APROVADA | 2026-07-29 | Tokens da marca real; contraste medido; rota `/design-system` |
| 04 | Fundação técnica e qualidade automatizada | APROVADA | 2026-07-29 | Vitest (10 testes), Playwright, Prettier, env, erro/404 |
| 05 | Shell, navegação e estrutura global | pendente | — | **Prompt recebido, não executado** |
| 06 | Home e narrativa principal | pendente | — | **Prompt recebido, não executado** |
| 07 | Fluxo de solicitação e WhatsApp | pendente | — | **Prompt recebido, não executado.** Bloqueada por B-02 |
| 08 | Frota, imagens e detalhes dos veículos | pendente | — | Bloqueada: 2 de 4 categorias sem imagem publicável |
| 09 | Serviços, passeios e conteúdo de Salvador | pendente | — | Bloqueada por B-17 |
| 10 | Pipeline de mídia e motion | pendente | — | 7 vídeos inventariados; posters a gerar |
| 11 | Confiança, contato, legal, SEO e idiomas | pendente | — | Bloqueada: dados empresariais ausentes |
| 12 | Integração, acessibilidade, performance e QA | pendente | — | |
| 13 | Produção, entrega e handoff final | pendente | — | Hospedagem/domínio não definidos |

## Etapa 00 — auditoria

Repositório, `package.json`, rotas, assets, git e docs auditados. 7 vídeos e os
candidatos de imagem de frota inventariados com `ffprobe`. Confirmado que
`Downloads/GOLD TOUR` é pacote de mídia, não o projeto web. Criados
`project-brief`, `progress`, `handoff`, `content-needs`, `decision-log`,
`media-map`.

## Etapa 01 — verdade e conteúdo

Caderno de marca recebido e auditado: selo GT, wordmark, paleta de quatro
cores, sem vetor e sem transparência. Contraste da paleta medido — o Ouro
Champagne reprova sobre fundo claro. Modelo de conteúdo tipado criado com
`Fact<T>` (`confirmed` / `pending` / `prohibited`) e populado apenas com dados
com fonte. Copy-base registrada sem alteração.

## Etapa 02 — arquitetura

Stack preservada. 13 rotas planejadas, 2 adiadas por falta de conteúdo real.
16 componentes especificados. Estratégia de dados, i18n, testes, breakpoints,
orçamento de performance e política de mídia definidos. Nenhuma página
implementada.

## Etapa 03 — design system

Consulta à UI/UX Pro Max registrada com o que foi aceito e recusado. Tokens da
marca real em `globals.css`, mais derivados acessíveis. Todos os pares de
contraste medidos por script — duas correções aplicadas. Primitivos `Button`,
`Field`, `Card`, `Badge` e overlay em `<dialog>` nativo. Rota interna
`/design-system` (404 em produção).

## Etapa 04 — fundação

TypeScript endurecido (`noUncheckedIndexedAccess` e mais duas flags). Prettier
com ordenação de classes Tailwind. Vitest com 10 testes passando, incluindo
invariantes do contrato (frota com 4 categorias; nenhum preço, capacidade ou
resposta de FAQ publicada sem confirmação). Playwright configurado. `.env.example`
sem segredos, `error.tsx`, `not-found.tsx`, `loading.tsx`, cabeçalhos de
segurança, `metadataBase`, `viewport`. README com instruções de clone limpo.
