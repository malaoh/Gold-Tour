# Gold Tour — design system (Etapa 03)

Implementação: [`app/globals.css`](../app/globals.css) (tokens),
[`components/ui/`](../components/ui) (primitivos),
[`/design-system`](../app/design-system/page.tsx) (demonstração interna, 404 em produção).

## Consulta à UI/UX Pro Max — aceito e recusado

Comando executado conforme o prompt, com `--design-system`, mais consultas aos
domínios `ux` e `icons`.

| Recomendação | Decisão | Por quê |
|---|---|---|
| Pattern "Minimal Single Column" | **recusado** | Prevê 5 seções e "3 benefit bullets". A home tem 10 seções e uma narrativa editorial; o padrão é fino demais para o escopo. |
| Style "Zero Interface" (voice-first, ambient) | **recusado** | Pensado para assistentes e AI platforms. Nada a ver com hospitalidade editorial. |
| Paleta sugerida (`#1E293B`, ação `#DC2626`) | **recusado** | O branding Gold Tour tem prioridade. Vermelho de ação contraria a assinatura dourada. |
| Tipografia `Newsreader` (títulos) | **aceito** | Coincide com o fallback da direção final e conversa com o wordmark serifado. |
| Tipografia `Roboto` (interface) | **recusado** | Substituído por `Manrope`, indicado pela direção final e mais próximo do sans humanista do caderno. |
| Ícones: Phosphor como família única, Heroicons como reserva | **aceito** | Traço fino, boa cobertura. Família única, conforme a regra. |
| "Avoid: Generic photos + Complex booking" | **aceito** | Já é regra do contrato. |
| Checklist de pré-entrega (foco, reduced-motion, 4,5:1, breakpoints, SVG em vez de emoji) | **aceito integralmente** | — |
| `ux`: reduced-motion obrigatório; nada de parallax/scroll-jacking; no máximo 1–2 elementos animados por tela | **aceito** | Vira regra dura no `motion-system.md`. |

## Cores

### Marca (fonte: caderno de marca, p. 03)

| Token | Hex | Papel |
|---|---|---|
| `--color-graphite` | `#1C1F23` | texto no claro, superfície profunda |
| `--color-navy` | `#0B1D33` | superfície escura institucional |
| `--color-gold` | `#C8A96A` | assinatura, ação, texto no escuro |
| `--color-offwhite` | `#F7F5F0` | superfície clara |

### Derivados (ferramentas, não cores de marca)

| Token | Hex | Motivo |
|---|---|---|
| `--color-gold-ink` | `#7A5F28` | o ouro reprova em fundo claro; este tem 5,51:1 |
| `--color-gold-soft` | `#E0CB9C` | ornamento e hover sobre marinho |
| `--color-navy-deep` | `#071624` | superfície rebaixada no escuro |
| `--color-navy-raised` | `#12283F` | elevação no escuro |
| `--color-ivory-sunken` | `#ECE8DF` | superfície rebaixada no claro |

### A regra do ouro

O Ouro Champagne tem **2,06:1 sobre o Off-White**. Isso reprova o mínimo de
4,5:1 para texto e reprova até o mínimo de 3:1 para elementos gráficos. A
consequência é explícita:

- **fundo escuro:** ouro pode ser texto, link, ícone e borda (7,55:1);
- **fundo claro:** ouro só existe como ornamento sem função informativa —
  filete, moldura, detalhe. Texto, link e botão usam `gold-ink`;
- **botão primário:** fundo ouro com texto grafite (7,36:1) — funciona igual
  nos dois temas, e por isso o CTA nunca muda de cor ao mudar de seção.

### Semânticas

`surface` · `surface-raised` · `surface-sunken` · `surface-inverse` ·
`text` · `text-muted` · `text-inverse` · `text-accent` ·
`border` (decorativo) · `border-strong` (campos e controles, ≥3:1) ·
`action` · `on-action` · `focus` · `success` · `error`

Nenhum componente usa hex direto: tudo passa por token semântico.

### Contraste verificado

Todos os pares foram medidos por script (WCAG 2.1, luminância relativa):

| Par | Razão | Mínimo |
|---|---:|---|
| texto / claro | 15,18:1 | 4,5 |
| texto muted / claro | 6,92:1 | 4,5 |
| accent (`gold-ink`) / claro | 5,51:1 | 4,5 |
| sucesso / claro · erro / claro | 5,90:1 · 6,03:1 | 4,5 |
| borda forte / claro | 3,68:1 | 3 |
| texto / escuro | 15,57:1 | 4,5 |
| texto muted / escuro | 8,06:1 | 4,5 |
| accent (ouro) / escuro | 7,55:1 | 4,5 |
| sucesso / escuro · erro / escuro | 7,73:1 · 6,83:1 | 4,5 |
| borda forte / escuro | 4,39:1 | 3 |
| foco no claro · no escuro | 15,57:1 · 7,55:1 | 3 |
| texto sobre botão ouro | 7,36:1 | 4,5 |

Nenhum par obrigatório reprova. Dois valores foram corrigidos durante a etapa:
`border-strong` estava em 1,97:1 (claro) e 2,03:1 (escuro).

## Tipografia

- **Display:** Newsreader — `h1`, `h2`, `h3`, números editoriais.
- **Interface:** Manrope — corpo, botões, rótulos, navegação.
- Carregadas por `next/font/google` com `display: swap`, servidas do próprio
  domínio. Sem CDN externo.
- Escala fluida por `clamp()`, de 375 px a 1440 px. `--text-base` vai de
  **16 px a 17 px** — nunca abaixo de 16 px em mobile.
- `line-height` 1,6 no corpo e 1,12 nos títulos. `text-wrap: balance` em
  títulos, `pretty` em parágrafos.

## Grid, espaçamento e forma

- Container de leitura: `68rem`. Container largo (mídia): `82.5rem`.
- Escala de espaçamento base 4 px (`--spacing: 0.25rem`).
- Raios discretos: 2 / 4 / 8 / 12 px. Nada arredondado demais — a marca é
  editorial, não "app".
- Sombras discretas e frias-neutras, derivadas do marinho com opacidade baixa.
  Nenhum glow, nenhum brilho colorido.

## Componentes e estados

| Componente | Estados cobertos |
|---|---|
| `Button` (primary / secondary / ghost, md / lg) | default, hover, active, focus-visible, disabled, loading (`aria-busy` + texto em `sr-only`) |
| `Field` | default, com dica, erro (`aria-invalid` + `aria-describedby`), desabilitado |
| `Card` (flat / raised) | — |
| `Badge` (neutral / accent / success / error) | cor **nunca** é o único portador: o rótulo é textual |
| Overlay (`<dialog>` nativo) | foco preso, `Esc`, retorno de foco, backdrop — tudo nativo |

Regras aplicadas: nenhuma informação apenas por cor; nenhuma interação apenas
por hover; foco nunca removido; alvo mínimo de 44×44 px imposto no CSS base.

## Ícones

Família única: **Phosphor** (`@phosphor-icons/react`), peso `light`/`regular`,
com Heroicons como reserva se faltar um símbolo. Emoji nunca é ícone. A
dependência entra na Etapa 04.

## Imagens e gradientes

- Tratamento editorial: enquadramento amplo, sem filtro colorido, sem
  saturação artificial. Mistura de foto de estúdio e foto de rua exige
  normalização de luz e enquadramento.
- **Gradiente só existe para legibilidade** — véu escuro atrás de texto sobre
  mídia, sempre vertical e sempre a partir da borda. Gradiente decorativo,
  colorido ou de marca é proibido.

## Dark theme

O site é predominantemente escuro por direção de arte, alternando seções claras
para respiro. O tema é aplicado por seção, com a classe `.gt-dark`, e **não**
por `prefers-color-scheme` — a alternância é composição editorial, não
preferência do visitante. Por isso não há alternador de tema.

Cada bloco `.gt-dark` redefine as semânticas; os componentes não sabem em que
tema estão.

## Responsivo

| Breakpoint | Largura |
|---|---:|
| base | 375 px |
| `sm` | 390 px |
| `md` | 768 px |
| `lg` | 1024 px |
| `xl` | 1440 px |

`overflow-x: hidden` no `body` como rede de segurança, com a regra de que
nenhuma seção pode depender disso.

## Verificações desta etapa

| Teste | Resultado |
|---|---|
| Contraste de todos os pares de token | aprovado após 2 correções |
| `tsc --noEmit` | limpo |
| `eslint` | limpo |
| Render em 1440×900 | ok, sem overflow (`scrollWidth` 1425) |
| Render em 375×812 | ok, sem overflow, corpo em 16,08 px |
| Alvos de toque em 375 px | nenhum abaixo de 44×44 |
| Console | sem erros |
| Overlay: foco entra no `dialog`, `Esc` fecha | ok |
| Fonte aplicada | Newsreader ativa nos títulos |
