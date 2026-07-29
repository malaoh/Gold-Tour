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
3. **Entrada de seção:** deslocamento de 12 px para cima com fade, 240 ms,
   disparado por `IntersectionObserver`, **uma vez só**. Não repete ao voltar.
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

## Reduced motion

A regra global em `globals.css` reduz toda animação e transição para 0,01 ms
sob `prefers-reduced-motion: reduce`. Além disso:

- vídeos não iniciam e são substituídos pelo poster;
- revelações por scroll não acontecem — o conteúdo já nasce visível;
- `scroll-behavior` volta para `auto`.

O site precisa funcionar por completo sem nenhuma animação. Se alguma
informação só existe depois de uma animação, a implementação está errada.
