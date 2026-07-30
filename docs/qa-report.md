# Gold Tour — relatório de QA

Última execução: 2026-07-29, ao fim das Etapas 05 a 07 (parcial).

## Verificações automatizadas

| Verificação | Comando | Resultado |
|---|---|---|
| Lint | `npm run lint` | limpo |
| Tipos | `npm run typecheck` | limpo (strict + `noUncheckedIndexedAccess`) |
| Unitários e invariantes | `npm run test` | 12 testes, 2 arquivos, todos passando |
| Build de produção | `npm run build` | verde, 16 rotas |
| Formatação | `npm run format:check` | limpo |
| Placeholders publicados | `npm run placeholders` | 34 campos listados |
| E2E | `npm run test:e2e` | **não executado** — navegadores não instalados |

Para rodar o e2e: `npx playwright install chromium`.

## Breakpoints

Home verificada nos cinco tamanhos exigidos. Em todos: **sem overflow
horizontal**, um único `h1`, nenhum link vazio, nenhuma imagem sem `alt`,
nenhum erro de console.

| Viewport | Observação |
|---|---|
| 375×812 | vídeo não carrega (só poster), CTAs empilhados em largura total |
| 390×844 | idem; CTA do header oculto para não espremer a barra |
| 768×1024 | vídeo ativo com botão de pausa; CTA do header aparece |
| 1024×768 | navegação completa visível, rota ativa sublinhada |
| 1440×900 | grade de frota em quatro colunas |

### Correções feitas durante a verificação

1. **Header não sobrepunha o hero.** `relative` e `absolute` na mesma classe —
   o CSS resolvia a favor de `relative`. Separadas por contexto.
2. **Wordmark ilegível sobre fundo escuro.** O degradê metálico da marca tem
   áreas escuras que somem no marinho. Gerada uma variante clara a partir do
   alfa da própria marca (`#E3CFA4`, 10,7:1 sobre o marinho).
3. **Doze alvos de toque abaixo de 44 px** — links do rodapé, navegação,
   "Ver a frota completa" e o link do logo. Todos elevados a `min-h-11`.
4. **CTA do header quebrava em duas linhas em 390 px.** Movido de `sm:` para
   `md:`, com `whitespace-nowrap`.

## Acessibilidade

| Item | Situação |
|---|---|
| Skip link | primeiro elemento focável, visível ao receber foco |
| Landmarks | `header`, `nav` (rotuladas), `main#conteudo`, `footer` |
| Hierarquia de títulos | um `h1` por página, sem salto de nível |
| Foco visível | 2 px + 3 px de afastamento; marinho no claro, ouro no escuro |
| Alvos de toque | ≥ 44×44 em toda a interface |
| Menu móvel | `aria-expanded`, `aria-controls`, foco preso, `Esc` fecha, clique fora fecha, foco volta ao gatilho, scroll do fundo travado |
| Formulário | labels reais e visíveis, `aria-invalid`, `aria-describedby`, erro junto do campo, `inputmode` e `autocomplete` corretos |
| FAQ | `<details>` nativo — teclado e busca na página funcionam sem JS |
| Contraste | todos os pares de token medidos por script; nenhum reprova |
| Cor sozinha | nenhuma informação depende só de cor |
| Vídeo | `muted`, `playsInline`, botão de pausa visível, pausa fora da viewport |
| Reduced motion | vídeo não inicia; transições em 0,01 ms; sem parallax ou scroll-jacking em nenhuma configuração |

## Caminho de conversão

Testado manualmente no navegador, de ponta a ponta:

`/` → "Transfer aeroporto" → `/solicitar?servico=transfer-aeroporto`
(serviço já pré-selecionado) → preenchimento → envio → WhatsApp aberto com:

```
Olá! Gostaria de solicitar um atendimento com a Gold Tour.
Serviço: Transfer aeroporto
Nome: Ana Souza
Passageiros: 3
Observações: Aeroporto SSA para Barra, voo G3 1234 · Contato: 71988887777
```

Confirmado: campos vazios não entram na mensagem, acentuação codificada
corretamente, rascunho da sessão apagado após o envio. O mesmo caminho está
coberto por `tests/e2e/solicitar.spec.ts`.

**O número usado é o placeholder `+55 71 90000-0000`.** Nenhuma divulgação do
site pode acontecer antes de trocá-lo (B-02).

## Etapa 08 — frota

| Verificação | Resultado |
|---|---|
| Nenhuma Chevrolet Spin publicada | confirmado — grep automatizado em teste (`content-facts.test.ts`) |
| Nenhuma referência ao arquivo vetado do micro-ônibus | confirmado — mesmo teste |
| `Doblò` e `Micro-ônibus` sem mídia publicada | confirmado |
| Grid 4/2×2/1 col nos breakpoints | verificado em 1440 e 375 (screenshots antes/depois) |
| CTA "Solicitar com este veículo" pré-seleciona o veículo | verificado ponta a ponta: `/frota/sprinter-executiva` → `/solicitar?veiculo=sprinter-executiva` → mensagem final contém "Veículo preferido: Sprinter Executiva" |
| `lint` / `typecheck` / `test` (15 testes) / `build` | todos verdes |
| Console em `/frota` e `/frota/sprinter-executiva` | sem erro |

### Risco de acessibilidade introduzido nesta etapa — CTAs "liquid glass"/"metal"

A pedido do proprietário (D-038), os CTAs primários passaram a usar um
componente de terceiros. Medi o contraste do texto do `MetalButton` (variante
`gold`, usada em CTAs sobre fundo claro) contra o gradiente de fundo:

| Ponto do gradiente | Contraste texto/fundo | Veredito |
|---|---:|---|
| Topo (`#FFEBA1`) | 1.16:1 | **reprova gravemente** — texto quase ilegível |
| Base (`#9B873F`) | 3.45:1 | reprova AA (4.5:1); passa só o piso de texto grande |

Isso é uma regressão real de acessibilidade nos CTAs de conversão
(`Solicitar com este veículo`, `Solicitar atendimento`, envio do formulário)
em página clara. Foi implementado assim mesmo por decisão explícita e
informada do proprietário, mas fica registrado como item a corrigir na Etapa
12 — por exemplo, escurecendo o texto ou estreitando a faixa do gradiente.

## Etapa 09 — serviços e passeios

| Verificação | Resultado |
|---|---|
| Nenhum passeio publica roteiro fechado ou duração | confirmado — teste automatizado (`content-facts.test.ts`) |
| CTA "Solicitar este roteiro" em `/passeios` vs "Conhecer os passeios" na home | verificado — `TourChapters` recebe `context` e não gera link circular |
| Nenhum link vazio em `/passeios`, `/servicos/*` | confirmado via `document.querySelectorAll('a[href="#"], a:not([href])')` |
| Canonical + Open Graph únicos em `/servicos`, `/passeios` e nas 3 páginas de serviço | confirmado |
| Breadcrumb em página de serviço | confirmado (`Serviços / Nome do serviço`) |
| `lint` / `typecheck` / `test` (16 testes) / `build` | todos verdes |

**Achado corrigido nesta etapa:** os quatro passeios estavam publicando um
roteiro fechado (`itinerary`) como `placeholder` — por exemplo, "Pelourinho,
Terreiro de Jesus, Elevador Lacerda, Mercado Modelo" para "Salvador
histórico". O Prompt 09 proíbe explicitamente publicar sequência fechada de
paradas sem confirmação, mesmo como provisório. Corrigido: `itinerary` e
`duration` voltaram a `pending` (somem da interface) para as 4 categorias; o
texto de cada capítulo agora fala em região e flexibilidade, não em paradas
prometidas.

## Etapa 10 — mídia e motion

| Verificação | Resultado |
|---|---|
| Vídeo do hero ausente no DOM em mobile (<768px) | confirmado via `document.querySelector('video')` em build de produção |
| `matchMedia` de autoplay respeita `prefers-reduced-motion` | confirmado por leitura de código (`useSyncExternalStore` na mesma media query) |
| Farol visível no enquadramento em 375/768/1440 | confirmado por screenshot — corrigido nesta etapa (D-046) |
| LCP = poster, não vídeo | confirmado via `PerformanceObserver('largest-contentful-paint')`, elemento `DIV` |
| CLS | 0 |
| Nenhum vídeo de concorrente/conceitual no bundle | confirmado — `public/media/` só tem os 5 arquivos aprovados |
| `lint` / `typecheck` / `test` (16 testes) / `build` | todos verdes |

Ver `performance-report.md` para a tabela completa de vídeo aprovado/recusado
e o inventário de motion.

### Novo P2

JS inicial da home em produção mede ~160 KB, acima da meta de 120 KB definida
na Etapa 02 — provavelmente por causa das dependências do componente
liquid-glass (`@radix-ui/react-slot`, `class-variance-authority`). Não é falha
de vídeo/motion; registrado para revisão na Etapa 12.

## Etapa 11 — confiança, contato, legal, SEO e idiomas

| Verificação | Resultado |
|---|---|
| FAQ publicada não contém resposta operacional presumida | confirmado — teste automatizado; só 1 pergunta confirmada renderiza |
| Política de privacidade publica e reflete só o código real | confirmado — texto lido na página, sem afirmação de dado não verificável |
| Termos segue 404 (depende de política comercial não confirmada) | confirmado |
| `/sitemap.xml` só lista rotas reais, publicadas e indexáveis | confirmado — 13 URLs, sem `/solicitar`, `/design-system` nem `/termos` |
| `/robots.txt` aponta para o sitemap e bloqueia `/design-system` | confirmado |
| Favicon e `app/icon.png` mostram o monograma GT completo | confirmado — corrigido um recorte antigo que cortava o "G" |
| Canonical + Open Graph em `/`, `/frota`, `/contato` | confirmado |
| Nenhum cookie de marketing, nenhum analytics instalado | confirmado — B-14 segue pendente por falta de autorização |
| Caminho de conversão (`/solicitar` → WhatsApp) continua funcionando | confirmado ponta a ponta |
| `lint` / `typecheck` / `test` (18 testes) / `build` | todos verdes |

### Achado corrigido nesta etapa

Duas inconsistências reais entre o que eu mesmo tinha documentado e o que
estava publicado:

1. A resposta de FAQ sobre cancelamento estava em `placeholder` referenciando
   B-18 — mas `content-needs.md` já dizia explicitamente que B-18 "nunca
   [entra] em placeholder". Corrigido: voltou a `pending`.
2. O ícone/favicon do site usava um recorte antigo do monograma que cortava a
   letra "G", deixando só um traço solto ao lado do "T". Recortado de novo a
   partir do selo maior da prancha original, com o "GT" completo e legível.

## Etapa 12 — auditoria completa e QA de produção

### Achados, classificados e corrigidos

| # | Severidade | Achado | Correção |
|---|---|---|---|
| 1 | **P1** | CTA principal ("Solicitar atendimento"/"Solicitar orçamento") sem nenhum indicador de foco visível ao navegar por teclado — o ring do shadcn não renderizava neste projeto (`box-shadow` ficava zerado) | Removido `outline-none` de `LiquidLink` e `MetalButton`/`MetalLink`; passaram a herdar o `:focus-visible` global do site (D-057) |
| 2 | **P1** | CTA "Solicitar orçamento" do header aparecia também em mobile — a base do `LiquidLink` força `inline-flex` incondicional, vencendo o `hidden` passado por fora na mesma cascata | `hidden md:inline-flex` movido para um wrapper `<div>` em volta do `LiquidLink` (D-058) |
| 3 | **P2** | Texto do `MetalButton`/`MetalLink` (variante gold, CTAs em fundo claro) com contraste de 1,16:1 no topo do gradiente e 3,45:1 na base — ambos reprovam AA | Texto trocado de creme para grafite da marca: 13,9:1 e 4,67:1 (D-056) |
| 4 | **P2** | Ícone/monograma distorcido em toda a UI (não só no favicon): `components/site/logo.tsx` tinha `width`/`height` do recorte antigo (70×80), esticando o arquivo novo (190×150) | Dimensões corrigidas no componente (D-055) |
| 5 | **P3** | FAQ de cancelamento em `placeholder` contradizia a própria documentação (B-18 "nunca em placeholder") | Corrigido na Etapa 11 (D-048), confirmado ainda válido nesta auditoria |

Todos os quatro primeiros achados foram encontrados **nesta etapa**, com o
código já "pronto" segundo as etapas anteriores — prova de por que a Etapa 12
existe como auditoria separada e não como autoavaliação das etapas
anteriores. Nenhum é cosmético: os dois P1 afetavam diretamente acessibilidade
por teclado e a hierarquia mobile do header.

### Primeiro passe (sem alteração de código)

| Verificação | Resultado |
|---|---|
| 375×812, 390×844, 768×1024, 1024×768, 1440×900 — home | sem overflow horizontal em nenhum |
| Mesmas rotas em `/frota`, `/frota/[slug]`, `/passeios`, `/solicitar` | sem overflow, sem texto truncado |
| Teclado: skip link é o primeiro elemento focável | confirmado |
| Teclado: menu móvel — trap de foco, ciclo completo, `Esc` fecha e devolve o foco ao gatilho, scroll do fundo trava e destrava | confirmado |
| Teclado: `:focus-visible` visível em links de navegação e primitivos do design system | confirmado (2px, navy no claro / dourado no escuro) |
| Rede lenta | não emulada — o Browser pane deste ambiente não expõe throttling de CPU/rede; compensado pelas medições de payload da Etapa 10 (314 KB mobile, zero vídeo abaixo de 768 px) |
| `prefers-reduced-motion` | não emulável neste navegador de automação (não há API para forçar a preferência a partir da página); comportamento verificado por leitura de código — `useSyncExternalStore` na mesma media query do autoplay |

### Oito jornadas

| # | Jornada | Resultado |
|---|---|---|
| 1 | Home → transfer → preencher → revisar → WhatsApp | ✅ mensagem final correta, sem campo vazio |
| 2 | Home → frota → Doblò → solicitar | ✅ `?veiculo=doblo-executiva`, veículo aparece no formulário mesmo sem foto publicada |
| 3 | Home → Sprinter → detalhes → solicitar | ✅ testado até a URL final do WhatsApp, em build de produção |
| 4 | Home → passeio → roteiro sob medida → solicitar | ✅ os 4 capítulos de `/passeios` linkam para `/solicitar?servico=passeio-privativo`, nenhum link circular |
| 5 | Menu móvel → serviços → contato | ✅ navegação e fechamento automático do menu ao trocar de rota |
| 6 | Fechar e retomar solicitação | ✅ dados preenchidos sobrevivem à navegação via `sessionStorage`, restaurados ao voltar |
| 7 | Erro de campo e recuperação | ✅ envio vazio foca o primeiro campo inválido, `aria-invalid` + `aria-describedby` corretos, não navega |
| 8 | Página inexistente → retorno seguro | ✅ 404 com link de volta ao início |

### Revisão visual

Hierarquia clara, proposta comunicada na primeira dobra (eyebrow + H1 + CTA
antes de qualquer scroll), Salvador reconhecível (farol, agora enquadrado
corretamente em todos os breakpoints — Etapa 10), frota com exatamente 4
categorias corretas e **sem Chevrolet Spin em nenhum lugar do bundle**
(confirmado por teste automatizado), sem texto truncado em nenhuma rota
verificada, grid da frota equilibrado (1 coluna mobile, 2×2 tablet, 4
colunas desktop). O painel "Imagem em curadoria" (Doblò/Micro-ônibus) lê como
decisão editorial deliberada, não como espaço vazio.

**Ressalva registrada, não corrigida por decisão consciente:** os CTAs
liquid-glass/metal (D-038) continuam esteticamente fora da diretriz original
do contrato ("sem glassmorphism, sem botão cenográfico"). Isso não é uma
falha de QA — é uma divergência intencional, autorizada pelo proprietário e
documentada desde a Etapa 08. A auditoria desta etapa corrigiu os problemas
*técnicos* que o componente trouxe (foco, contraste, responsividade), não a
escolha estética em si, que não é da alçada de uma auditoria de QA reverter.

### Conteúdo

- Nenhum dado inventado — reforçado por 18 testes automatizados sobre `Fact<T>`.
- **Placeholders públicos existem e são intencionais** (D-024, autorização
  direta do proprietário): WhatsApp, e-mail, endereço, Instagram, horário,
  textos de serviço e capacidades de veículo. Não foram revertidos nesta
  auditoria — diferente das correções das Etapas 09 e 11 (que tratavam de
  categorias específicas explicitamente vetadas mesmo como placeholder), aqui
  não há proibição equivalente, e reverter quebraria o site inteiro contra
  instrução direta e recente do proprietário. Tratado como o item nº 1 da
  lista de pré-lançamento (`npm run placeholders`, ver `handoff.md`).
- Nenhum link vazio, nenhuma foto de concorrente, nenhuma foto conceitual
  como frota real, nenhuma tradução incompleta publicada — confirmados.

### Verificação final

`lint`, `typecheck`, `test` (18 testes), `build` de produção: todos verdes.
Jornada completa até o WhatsApp reexecutada **na build de produção** depois
de todas as correções desta etapa, com resultado correto.

## Pendências de QA

- E2E não executado (navegadores do Playwright ausentes).
- Leitor de tela real ainda não testado — só a estrutura semântica foi conferida.
- Medição de Core Web Vitals em rede lenta: Etapa 12.
- Páginas `/politica-de-privacidade` e `/termos` respondem **404** de propósito:
  os textos não existem (B-11) e publicar política genérica criaria obrigação
  legal que a operação não combinou. Os links seguem no rodapé e passam a
  funcionar quando o conteúdo chegar.
- **P2 (Etapa 12):** contraste do texto sobre o `MetalButton` gold em fundo
  claro reprova AA em boa parte do gradiente (ver acima).
- Capacidade de passageiros da frota (3/15/26/6) é placeholder e precisa de
  confirmação real antes de qualquer divulgação (B-12).
