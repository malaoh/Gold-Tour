# Gold Tour — sistema de movimento (Etapa 03)

## Princípio

Motion aqui serve para orientar, não para impressionar. A direção final pede
movimento "cinematográfico, curto e funcional", e a biblioteca UI/UX classifica
excesso de animação, parallax e scroll-jacking como severidade **alta**. As
duas coisas apontam para o mesmo lugar: pouca animação, bem colocada.

## Tokens

| Token | Valor | Uso |
|---|---|---|
| `--duration-instant` | 90 ms | mudança de cor em hover/active |
| `--duration-fast` | 160 ms | botões, links, campos |
| `--duration-base` | 240 ms | entrada de seção, abertura de acordeão |
| `--duration-slow` | 420 ms | bottom sheet, cross-fade de mídia |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0.15, 1)` | entrada e transição |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | saída |

Nada acima de 420 ms. Nada abaixo de 90 ms (mudança instantânea demais lê como
falha de renderização).

## Regras

1. **No máximo um ou dois elementos animados por tela.** Se três coisas se
   movem ao mesmo tempo, uma delas é decoração.
2. **Só `transform` e `opacity`.** Nunca animar `width`, `height`, `top` ou
   `left` — causa layout thrashing e CLS.
3. **Entrada de seção é opcional, não obrigatória.** Se implementada:
   deslocamento de 12 px para cima com fade, 240 ms, via `IntersectionObserver`,
   uma vez só, nunca repete ao voltar. **Estado real na Etapa 10: não
   implementada** — todas as seções da home renderizam estáticas. Isso não é
   uma lacuna; é a leitura mais segura da regra 1 (poucos elementos animados) e
   evita o próprio IntersectionObserver de entrada competir com o do vídeo do
   hero. Só vale adicionar se uma seção específica pedir ênfase — nunca em
   todas de uma vez.
4. **Sem scroll-jacking e sem parallax**, em nenhuma configuração e em nenhum
   breakpoint. Não é opção de reduced-motion: é proibido sempre.
5. **Nada pisca, nada pulsa, nada faz bounce.**
6. **Loading** é o único movimento contínuo permitido, e só enquanto durar a
   operação.
7. Hover nunca é o único caminho para uma informação ou ação — o que aparece no
   hover também aparece no foco.

## Vídeo

| Situação | Comportamento |
|---|---|
| Padrão (desktop, sem preferência de redução) | autoplay `muted` + `playsInline`, com botão de pausa visível e persistente |
| Mobile (< 768 px) | poster estático; play manual |
| Fora da viewport | pausa via `IntersectionObserver` |
| `prefers-reduced-motion: reduce` | o vídeo não toca; fica o poster |
| Falha de carregamento | poster permanece; nenhum espaço vazio |

O poster é sempre o LCP. O vídeo entra com `preload="none"` e nunca compete com
a primeira renderização. Um único vídeo na primeira dobra.

## Inventário de movimento (Etapa 10)

Tudo que realmente se move no site hoje, sem exceção:

| Elemento | Gatilho | Duração | Easing | Propriedade | Propósito | Fallback (reduced-motion) | Custo |
|---|---|---|---|---|---|---|---|
| Vídeo do hero | scroll para dentro/fora da viewport + botão manual | contínuo (loop) | — | reprodução de vídeo | trazer Salvador à vida na primeira dobra | não monta; poster estático | 1 decodificador, só ≥768 px |
| Botão de pausa do hero | clique | instantâneo | — | play/pause do `<video>` | controle do usuário sobre o movimento | mesmo comportamento (elemento nem existe) | nenhum |
| Botões e links (hover/active/focus) | ponteiro/teclado | 160 ms (`--duration-fast`) | `--ease-standard` | `color`, `background-color`, `border-color` | affordance de interação | cai para 0,01 ms | nenhum (CSS) |
| `LiquidLink`/`MetalButton` hover | ponteiro | 250–300 ms | `cubic-bezier(0.1,0.4,0.2,1)` | `transform: scale`, `filter: brightness`, sombras | resposta tátil do CTA principal | cai para 0,01 ms via regra global | CSS + pequeno estado React (`isHovered`/`isPressed`) |
| Menu móvel (abrir/fechar) | clique no botão hambúrguer | 200 ms | linear | `rotate` das duas barras do ícone | indicar estado aberto/fechado | idem, sem transição | nenhum |
| `<details>` do FAQ | clique/teclado | nativo do navegador | nativo | abertura da divulgação + `rotate-45` do `+` | revelar resposta | nativo, sem dependência de JS | nenhum |
| `<dialog>` (design system) | `showModal()`/`close()` | nativo | nativo | abertura/backdrop | overlay acessível | nativo | nenhum |

Não há parallax, não há scroll-jacking, não há seção pinada, não há
animação de entrada por scroll em nenhuma seção da home — zero elementos além
do vídeo do hero competem por atenção na primeira dobra.

## Reduced motion

A regra global em `globals.css` reduz toda animação e transição para 0,01 ms
sob `prefers-reduced-motion: reduce`. Além disso:

- vídeos não iniciam e são substituídos pelo poster;
- revelações por scroll não acontecem — o conteúdo já nasce visível;
- `scroll-behavior` volta para `auto`.

O site precisa funcionar por completo sem nenhuma animação. Se alguma
informação só existe depois de uma animação, a implementação está errada.
