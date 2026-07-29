# Gold Tour — progresso das etapas

Status possíveis: `pendente` · `em andamento` · `APROVADA` · `REPROVADA`

| # | Etapa | Status | Data | Observação |
|---|---|---|---|---|
| 00 | Bootstrap, auditoria e governança | APROVADA | 2026-07-29 | Pasta nova identificada; 6 documentos criados |
| 01 | Verdade do negócio, marca e modelo de conteúdo | APROVADA | 2026-07-29 | Marca auditada; modelo tipado com `Fact<T>` |
| 02 | Arquitetura, rotas e plano técnico | APROVADA | 2026-07-29 | Stack preservada; rotas, componentes e orçamentos definidos |
| 03 | Design system Gold Tour | APROVADA | 2026-07-29 | Tokens da marca real; contraste medido; rota `/design-system` |
| 04 | Fundação técnica e qualidade automatizada | APROVADA | 2026-07-29 | Vitest (10 testes), Playwright, Prettier, env, erro/404 |
| 05 | Shell, navegação e estrutura global | APROVADA | 2026-07-29 | Header, menu móvel acessível, footer, 16 rotas |
| 06 | Home e narrativa principal | APROVADA | 2026-07-29 | 10 seções, hero em vídeo, 5 breakpoints verificados |
| 07 | Fluxo de solicitação e WhatsApp | PARCIAL | 2026-07-29 | Formulário de tela única já entrega ao WhatsApp; passo a passo de 14 etapas pendente |
| 08 | Frota, imagens e detalhes dos veículos | APROVADA | 2026-07-29 | Corolla/Sprinter com foto oficial e harmonizada; Doblò/Micro-ônibus em curadoria honesta; CTA pré-seleciona veículo |
| 09 | Serviços, passeios e conteúdo de Salvador | APROVADA | 2026-07-29 | CTAs contextuais conectados ao fluxo; roteiro fechado removido dos passeios |
| 10 | Pipeline de mídia e motion | pendente | — | 5 vídeos já importados com poster; falta otimização final |
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

## Etapa 05 — shell

Header com marca real, navegação de 5 itens, estado ativo por rota e CTA
persistente; transparente sobre o hero, sólido nas demais páginas. Menu móvel
com foco preso, `Esc`, clique fora, retorno de foco e scroll travado. Footer
com contato, navegação e legal — cada bloco só existe se o dado existir.
Skip link, landmarks e 16 rotas navegáveis, nenhuma com conteúdo inventado
sem marcação.

## Etapa 06 — home

Dez seções na ordem do contrato. Hero com vídeo do Farol da Barra (poster como
LCP, pausa visível, sem vídeo em mobile e em reduced-motion). Escolha rápida
que pré-seleciona o serviço no fluxo. Confiança sem estatística. Frota com
quatro cards de altura igual. Quatro capítulos editoriais de Salvador. Como
funciona, FAQ e CTA final. Verificada em 375, 390, 768, 1024 e 1440 —
quatro correções aplicadas durante a verificação (ver `qa-report.md`).

## Etapa 07 — parcial

`/solicitar` entrega uma solicitação real ao WhatsApp, com serviço
pré-selecionado pela home, validação zod junto ao campo, rascunho em
`sessionStorage` e aviso de privacidade antes do envio. Caminho completo
verificado no navegador e coberto por teste e2e. Falta o passo a passo de 14
etapas em bottom sheet/painel.

## Etapa 08 — frota

Corolla e Sprinter confirmados como fotos oficiais pelo proprietário (encerra
B-01) e harmonizados com correção de cor para lerem como a mesma sessão
fotográfica. Doblò e Micro-ônibus seguem sem Spin e sem o arquivo vetado —
tratamento editorial honesto ("Imagem em curadoria") na grade e no detalhe.
Páginas de detalhe com trilha de navegação, seção "Uso recomendado" e ficha
técnica. CTA "Solicitar com este veículo" pré-seleciona a categoria no fluxo
de solicitação — verificado ponta a ponta até a mensagem do WhatsApp. Nesta
etapa também foi integrado, a pedido do proprietário, um componente de
terceiros ("liquid glass"/"metal" button) nos CTAs principais, com registro
explícito do conflito com o contrato visual e do risco de contraste
associado (ver `qa-report.md` e `decision-log.md` D-038 a D-040).

## Etapa 09 — serviços e passeios

Corrigido um problema real encontrado ao aplicar as regras da própria etapa:
os 4 passeios publicavam roteiro fechado como placeholder, o que o Prompt 09
proíbe explicitamente mesmo para dado provisório. `itinerary` e `duration`
voltaram a `pending` (somem da interface); os nomes dos passeios foram
alinhados às categorias editoriais seguras do prompt. Adicionado breadcrumb e
seção "Como solicitar" nas páginas de serviço, com canonical e Open Graph
próprios em `/servicos`, `/passeios` e nas 3 páginas de serviço com rota
dedicada. CTA de cada capítulo de passeio agora é contextual — nunca aponta
para a própria página. Coberto por novo teste automatizado.
