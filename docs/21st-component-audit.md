# Gold Tour — auditoria de componentes 21st.dev

Data: 2026-07-29 · MCP `21st.dev` usado de verdade (buscas + recuperação de
código). Registro do que foi pesquisado, o que foi aceito, o que foi recusado
e por quê.

## Método

1. Busca via MCP (`search`, gratuita) — todos os termos da lista obrigatória.
2. Inspeção do **preview real** (imagem renderizada), não só do nome e da
   descrição — decisão que mudou o resultado em pelo menos dois casos.
3. Recuperação do **código-fonte** (`get_component`, paga) apenas dos
   finalistas, conforme combinado com o proprietário.
4. Análise técnica do código: dependências, loops, custo de render,
   acessibilidade, compatibilidade com a stack e com o vídeo do hero.

**Nota sobre a cota:** `get_component` é pago e limitado por dia. Baixar
código dos ~35 termos pedidos esgotaria a cota antes da integração. Decisão do
proprietário: baixar só os finalistas das 4 funções-chave.

---

## Achado geral que mudou a estratégia

**A descrição de um componente no 21st.dev frequentemente não corresponde ao
preview.** Dois exemplos concretos encontrados nesta auditoria:

- `Glass Video Hero` se descreve como adequado a *"SaaS, travel, and modern
  product landing pages"*. O preview real é **roxo SaaS**, com badge
  *"New — Say Hello to Datacore v3.2"* e botão *"Book a Free Demo"*. É
  exatamente a "estética genérica de SaaS" que o contrato Gold Tour proíbe.
- `Crypto hero` e `GlassRefractionHero` têm **descrições idênticas**, palavra
  por palavra, apesar de serem componentes diferentes.

Conclusão: o catálogo é matéria-prima de qualidade irregular. Nenhuma decisão
foi tomada por nome ou descrição.

---

## Matriz de seleção

### Função 1 — Hero cinematográfico

| Componente | Autor | ID/URL | Decisão | Motivo |
|---|---|---|---|---|
| **Glass Video Hero** | `rahil1202` | [12005](https://21st.dev/@rahil1202/components/glass-video-hero) | **RECUSADO** | Preview real é roxo SaaS com badge "Datacore v3.2" e "Book a Free Demo". Identidade genérica de SaaS — proibida pelo contrato. Adaptar exigiria descartar praticamente toda a camada visual, sobrando só a estrutura de nav sobre vídeo, que o projeto **já tem** implementada e testada. |
| Video Scroll Hero | `isaiahbjork` | [7512](https://21st.dev/@isaiahbjork/components/video-scroll-hero) | RECUSADO | Escala o vídeo de 25% a 100% conforme o scroll. Efeito de vitrine de produto, não de abertura editorial. O hero da Gold Tour precisa ser legível e com CTA acionável **na primeira dobra** — um vídeo que começa pequeno atrasa a proposta de valor. |
| Scroll media expansion hero | `arunachalam` | [1932](https://21st.dev/@arunachalam/components/scroll-expansion-hero) | RECUSADO | Mesma lógica de expansão por scroll; mesmo problema. |
| Scroll Morph Hero | `prashantsom75` | [9583](https://21st.dev/@prashantsom75/components/scroll-morph-hero) | RECUSADO | "Interactive **rainbow** arc" — arco-íris está explicitamente na lista de proibições. |
| Hero Scrub | `jean.duthil13` | [12213](https://21st.dev/@jean.duthil13/components/hero-scrub) | RECUSADO | Depende de **GSAP ScrollTrigger** e sequência de imagens em canvas. O projeto decidiu não adotar GSAP (D-017); introduzir agora criaria um segundo controlador de scroll concorrente, exatamente o que o prompt proíbe. |
| WebGL Liquid | `componentry` | [18531](https://21st.dev/@componentry/components/webgl-liquid) | RECUSADO | Fundo WebGL animado substituiria a mídia real de Salvador por abstração — o oposto de "imagens e vídeos como protagonistas". |

**Decisão da função 1: manter e evoluir o hero próprio.** Ele já cumpre os
requisitos do prompt (100svh, full-bleed, poster, autoplay por visibilidade,
muted, playsInline, botão pausar, fallback reduced-motion, header integrado) e
já teve o enquadramento corrigido por breakpoint (D-046). O que falta é a
**transição guiada pelo scroll para o primeiro capítulo** — isso é integração,
não componente novo.

### Função 2 — Storytelling por capítulos (o núcleo do pedido)

| Componente | Autor | ID/URL | Decisão | Motivo |
|---|---|---|---|---|
| Sticky Scroll Reveal | `manuarora700` (Aceternity) | [952](https://21st.dev/@manuarora700/components/sticky-scroll-reveal) | RECUSADO como base | Troca **cor de fundo** e texto conforme o scroll; a mídia é um painel lateral fixo. Não troca vídeo, não tem rail clicável, não tem âncora/hash, não tem indicador 01/04. Faltam quase todos os requisitos. |
| Interactive Scrolling Story Component | `minhxthanh` | [6265](https://21st.dev/@minhxthanh/components/interactive-scrolling-story-component) | RECUSADO como base | Texto à esquerda, imagem à direita com slide. É layout de duas colunas, não palco sticky em tela cheia. Sem vídeo, sem rail, sem deep link. |
| Scroll Reveal Content A | `abui` | [19203](https://21st.dev/@abui/components/scroll-reveal-content-a) | RECUSADO | Três blocos com linha de progresso vertical + troca de **imagem**. Mais perto, mas sem vídeo, sem hash e limitado a 3 blocos. |
| Alice Scroll Story | `kedhareswer.12110626` | [7970](https://21st.dev/@kedhareswer.12110626/components/alice-scroll-story) | RECUSADO | GSAP (conflito, D-017) + conteúdo temático de Alice no País das Maravilhas fortemente acoplado. |
| Scroll 01 | `felipemenezes098` | [18041](https://21st.dev/@felipemenezes098/components/scroll-01) | RECUSADO | Mídia sticky lateral trocando **imagens**. Sem vídeo, sem rail, sem âncora. |
| Story scroll | `boudjadjasamira` | [12461](https://21st.dev/@boudjadjasamira/components/story-scroll) | RECUSADO | Sem descrição nenhuma no catálogo; risco não avaliável sem gastar recuperação paga. |

**Decisão da função 2: controller de capítulos próprio.** O próprio prompt
autoriza: *"Se nenhum componente reproduzir bem a experiência do site
Rubens & Medrado, implemente o controller de capítulos de forma
personalizada"*. Nenhum dos seis reúne os requisitos essenciais
simultaneamente:

| Requisito | Algum componente entrega? |
|---|---|
| Palco sticky 100svh | Sim (Sticky Scroll Reveal) |
| Troca de **vídeo** por capítulo | **Nenhum** — todos trocam imagem ou cor |
| Rail de capítulos clicável | **Nenhum** |
| Indicador 01/04 | **Nenhum** |
| Âncora real + hash + deep link | **Nenhum** |
| Rail horizontal no mobile | **Nenhum** |
| "Pular experiência" | **Nenhum** |
| Sem GSAP/Lenis extra | Alguns sim, outros não |

Arquitetura de referência analisada em `rubensemedrado.vercel.app` (medida no
DOM, não copiada): seção de `300vh` com filho `sticky top-0 h-screen`,
`IntersectionObserver` por capítulo, `aria-current` no rail, âncoras
`#capitulo-*`, alvos de 44px, rail vertical no desktop / horizontal no mobile.
Esses são **princípios de interação**, adaptados à Gold Tour com mídia,
tokens e conteúdo próprios.

### Função 3 — Navegação inferior mobile (dock)

| Componente | Autor | ID/URL | Decisão | Motivo |
|---|---|---|---|---|
| Bottom Menu | `0xUrvish` | [10458](https://21st.dev/@0xUrvish/components/bottom-menu) | **RECUSADO** | Preview real: 5 ícones (+, busca, sino, perfil, sol) **sem nenhum label**. É uma toolbar de ações, não navegação de destinos. Viola "ícone **e** label" e "labels nunca podem desaparecer completamente". |
| Limelight Nav | `easemize` | [2761](https://21st.dev/@easemize/components/limelight-nav) | **RECUSADO** | Preview real: 3 ícones, **sem labels**, tema claro, com efeito de holofote cônico. Mesmo problema de labels. O cone de luz também não combina com "reflexo discreto". |
| Modern Mobile Menu | `easemize` | [2580](https://21st.dev/@easemize/components/modern-mobile-menu) | RECUSADO | Sem preview em vídeo e sem detalhamento suficiente; do mesmo autor do Limelight, mesmo padrão icon-only esperado. |
| LumaBar | `ruixen.ui` | [5841](https://21st.dev/@ruixen.ui/components/futuristic-nav) | **RECUSADO** | Autodescrito como *"futuristic"* com *"glowing gradient indicator"*. Labels só aparecem em **tooltip no hover** — e o prompt proíbe depender de hover no mobile (onde hover não existe). |
| Tubelight Navbar | `ayushmxxn` | [1432](https://21st.dev/@ayushmxxn/components/tubelight-navbar) | RECUSADO | "Glowing effect"; ícones no mobile, texto só no desktop — inverte exatamente o que precisamos. |
| Magnetic Dock | `componentry` | [19178](https://21st.dev/@componentry/components/magnetic-dock) | RECUSADO | Escala magnética no hover é interação de mouse; no mobile não se aplica. |
| Hover Gradient NavBar | `ruixen.ui` | [5837](https://21st.dev/@ruixen.ui/components/hover-gradient-nav-bar) | RECUSADO | Flip 3D + glow no hover; depende de hover e usa brilho proibido. |
| Bottom Nav Bar | `arunachalam` | [8343](https://21st.dev/@arunachalam/components/bottom-nav-bar) | **ADAPTAR (base escolhida)** | O único que descreve explicitamente **ícone + label com o label do item ativo animando**, layout pill, `stickyBottom`, acessibilidade e temas via shadcn. Depende de `framer-motion`. |

**Decisão da função 3:** usar `Bottom Nav Bar` como referência estrutural
(pill + label do ativo + sticky), mas reimplementar com os tokens Gold Tour e
**sem** adicionar `framer-motion` — o indicador deslizante é resolvível com
transform CSS, e o projeto não tem biblioteca de animação instalada
(D-017: animação em CSS puro). Motivo de não instalar o componente cru: ele
traria `framer-motion` (~50 KB gzip) só para animar um pill, contra um
orçamento de JS que **já está estourado** em ~40 KB (ver
`performance-report.md`).

### Função 4 — Botões / CTA liquid glass

| Componente | Autor | ID/URL | Decisão | Motivo |
|---|---|---|---|---|
| **Apple Tahoe Liquid Glass Button** | `easemize` | [12460](https://21st.dev/@easemize/components/apple-tahoe-liquid-glass-button) | **RECUSADO — código analisado** | Ver análise técnica abaixo. |
| LiquidButton | `devsam7t3` | [18562](https://21st.dev/@devsam7t3/components/liquid-button) | RECUSADO | Sem preview em vídeo; mesma família de efeito já presente no projeto. |
| Liquid Metal Button | `johuniq` | [10443](https://21st.dev/@johuniq/components/liquid-metal-button) | RECUSADO | "Metallic **glowing** borders" — brilho proibido. |
| Glass Button | `easemize` | [4922](https://21st.dev/@easemize/components/glass-button) | RECUSADO | Redundante: o projeto já tem `liquid-glass-button.tsx` integrado e corrigido (contraste e foco) na Etapa 12. |
| Magnetic Button | `bundui` | [1507](https://21st.dev/@bundui/components/magnetic-button) | CONSIDERAR (fase futura) | Depende de `framer-motion`. O prompt pede cursor magnético *"somente no CTA principal e apenas em desktop"* — dá para fazer com `pointermove` + transform, sem dependência. |

#### Análise técnica: por que o Apple Tahoe Liquid Glass Button foi recusado

Baixei o código real (uma recuperação paga) e encontrei problemas graves que
nenhum preview revelaria:

1. **Loop `requestAnimationFrame` infinito e incondicional.** O `loop()`
   chama `requestAnimationFrame(loop)` sempre, sem nenhuma condição de
   parada — roda para sempre, mesmo com a página parada e o botão fora da
   tela. Dreno permanente de CPU e bateria.
2. **`getBoundingClientRect()` do botão e do container a cada frame** —
   força reflow de layout 60×/s.
3. **Troca do filtro SVG a cada frame:**
   `target.style.filter = url(#filterN)`, alternando entre dois filtros de
   `feDisplacementMap`. É uma das operações de composição mais caras que
   existem, aplicada continuamente.
4. **Incompatível com o hero da Gold Tour por arquitetura.** O botão só
   funciona dentro de um `<LiquidGlassViewport bgImage="...">`, que re-renderiza
   **uma imagem estática** através do filtro de refração. Nosso hero é
   **vídeo**. Não há caminho de adaptação: o componente precisa de uma URL de
   imagem para refratar.
5. **Cor de texto fixa em `text-black/85`** — sobre o marinho/dourado da Gold
   Tour ficaria ilegível. Justamente a classe de bug de contraste que
   corrigimos na Etapa 12.
6. **Demo puxa `framer-motion`, `lucide-react` e imagens externas hospedadas
   em Supabase de terceiros** — assets externos que o prompt manda remover.

Veredito: engenharia impressionante, mas é uma peça de demonstração para
fundo estático. Adotá-la significaria trocar um problema de contraste (já
resolvido) por um problema de performance permanente.

**Decisão da função 4: manter o `liquid-glass-button.tsx` já integrado.** Ele
foi trazido para o projeto na Etapa 08, adaptado aos tokens, e teve dois bugs
reais corrigidos na Etapa 12 (contraste de 1,16:1 → 13,9:1; foco de teclado
invisível). Não há ganho em substituí-lo por outro da mesma família.

### Função extra — Header flutuante

| Componente | Autor | ID/URL | Decisão | Motivo |
|---|---|---|---|---|
| Floating Header | `sshahaider` | [8137](https://21st.dev/@sshahaider/components/floating-header) | ADAPTAR (princípios) | Sem preview em vídeo, mas a descrição corresponde ao pedido: sticky, vidro arredondado, drawer mobile. Os **princípios** (transparente sobre a mídia → glass depois do scroll) serão aplicados ao `Header` existente, que já tem menu móvel acessível testado (foco preso, `Esc`, retorno de foco). Substituir o header inteiro descartaria acessibilidade já validada. |
| Glassmorphism Navigation | `akashsingh890901-crypto` | [15025](https://21st.dev/@akashsingh890901-crypto/components/glassmorphism-navigation) | RECUSADO | Sem descrição nem vídeo; risco não avaliável. |

---

## Resumo das decisões

| Função | Resultado | Componente 21st.dev envolvido |
|---|---|---|
| Hero | Evoluir o próprio (adicionar transição por scroll) | nenhum adotado — 6 avaliados e recusados |
| Capítulos por scroll | **Controller próprio** (autorizado pelo prompt) | 6 avaliados; princípios da referência R&M |
| Dock inferior mobile | Reimplementar com estrutura do `Bottom Nav Bar` | [8343](https://21st.dev/@arunachalam/components/bottom-nav-bar) como referência |
| Botão liquid glass | Manter o já integrado e corrigido | `Apple Tahoe` recusado após análise de código |
| Header | Evoluir o próprio com princípios do `Floating Header` | [8137](https://21st.dev/@sshahaider/components/floating-header) como referência |

**Nenhum componente instalado cru.** Zero dependências novas adicionadas por
esta auditoria — decisão deliberada, dado que o orçamento de JS do projeto já
está ~40 KB acima da meta (`performance-report.md`).

**Um componente por função**, conforme a regra: não há cinco bibliotecas
resolvendo a mesma coisa.

## Componentes pesquisados no MCP (registro completo)

Termos executados: `Glass Video Hero`, `Video Scroll Hero`, `Scroll media
expansion hero`, `Scroll Morph Hero`, `Hero scroll animation`, `Sticky Scroll
Reveal`, `Interactive Scrolling Story Component`, `Story scroll`, `Alice
Scroll Story`, `Floating Header`, `Glassmorphism Navigation`, `LumaBar`,
`Modern Mobile Menu`, `Bottom Menu`, `Dock`, `Apple Tahoe Liquid Glass
Button`, `Liquid Glass Button`, `Interactive Hover Button`, `Magnetic
Button`, `Glass Button`, `Apple Liquid glass switcher`, `Liquid Glass Card`,
`Glass Effect`.

Total: **35+ componentes retornados e avaliados**; 2 previews inspecionados
pixel a pixel; 1 código-fonte completo analisado linha a linha.
