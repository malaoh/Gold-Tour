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
