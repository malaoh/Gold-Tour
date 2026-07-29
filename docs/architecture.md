# Gold Tour — arquitetura técnica (Etapa 02)

Nenhuma página foi implementada nesta etapa. Este documento fixa as decisões
para que as Etapas 04 a 12 não precisem improvisar.

## Stack — mantida, sem migração

A stack criada no bootstrap está saudável (`tsc --noEmit` limpo, `next build`
verde, ESLint sem apontamentos) e atende ao escopo. **Preservada integralmente.**

| Camada | Escolha | Versão |
|---|---|---|
| Framework | Next.js App Router | 16.2.12 |
| UI | React | 19.2.4 |
| Linguagem | TypeScript (strict) | 5.x |
| Estilo | Tailwind CSS v4 (`@theme` em CSS, sem `tailwind.config.js`) | 4.x |
| Lint | ESLint + `eslint-config-next` | 9.x |
| Gerenciador | npm | 11.x |

Não entram no projeto: CMS, autenticação, banco de dados, gateway de pagamento.
O escopo é um site de conversão com handoff para WhatsApp — nada disso é
necessário, e cada um deles adicionaria superfície de manutenção sem retorno.

### Dependências adicionadas na Etapa 04

Produção: `@phosphor-icons/react` (família única de ícones SVG) e `zod`
(validação do formulário). Desenvolvimento: `vitest`, `@vitejs/plugin-react`,
`@testing-library/react`, `@testing-library/jest-dom`,
`@testing-library/user-event`, `jsdom`, `@playwright/test`, `prettier`,
`prettier-plugin-tailwindcss`.

Nenhuma dependência redundante: não entraram `clsx` nem `tailwind-merge` — `cn`
em `lib/utils.ts` resolve o caso de uso em cinco linhas e não há conflito de
classes complexo o bastante para justificar o merge.

**Override de segurança:** `sharp` foi fixado em `^0.35.3` via `overrides`
porque a versão trazida pelo Next (0.34.5) acumula quatro CVEs de libvips. O
`npm audit fix --force` sugeria rebaixar o Next para a versão 9 — inaceitável.
Ver riscos residuais em `handoff.md`.

Animação: **CSS puro** (`transition`, `@keyframes`, `IntersectionObserver` para
revelar seções). **GSAP não será adotado** — a narrativa prevista (revelar
seção, cross-fade de vídeo, abrir bottom sheet) é resolvida em CSS, e o
contrato pede motion curto e funcional. Se a Etapa 09 exigir uma sequência
encadeada impossível em CSS, a decisão é reaberta com registro.

## Rotas

Rotas planejadas em `app/`. Não há projeto anterior, portanto **não há URL
legada a preservar e nenhum redirect é necessário** — ver `information-architecture.md`.

```
app/
├─ layout.tsx                        AppShell: fontes, tokens, skip-link, header, footer
├─ page.tsx                          /
├─ servicos/
│  ├─ page.tsx                       /servicos
│  ├─ transfer-aeroporto/page.tsx
│  ├─ motorista-a-disposicao/page.tsx
│  └─ grupos-e-eventos/page.tsx
├─ frota/
│  ├─ page.tsx                       /frota
│  └─ [slug]/page.tsx                /frota/corolla-executivo, etc.
├─ passeios/
│  └─ page.tsx                       /passeios
├─ solicitar/page.tsx                fluxo de solicitação
├─ contato/page.tsx                  contato direto
├─ politica-de-privacidade/page.tsx
├─ termos/page.tsx
└─ not-found.tsx
```

**Adiado:** `/passeios/[slug]`. O modelo de conteúdo tem `tours: []` — nenhum
roteiro real foi fornecido (B-17). Criar páginas de passeio agora significaria
inventar itinerário. A rota entra quando houver conteúdo.

**Condicional:** `/termos` só é publicada se houver termos reais (B-11). Sem
texto, a rota não existe e o link some do rodapé.

Renderização: tudo estático (`force-static`). O conteúdo vem de módulos TS
tipados, não de rede — não há motivo para SSR. `generateStaticParams` em
`/frota/[slug]` a partir de `siteContent.fleet`.

## Componentes

Convenção: componentes de apresentação em `components/`, primitivos do design
system em `components/ui/`. Server Components por padrão; `'use client'` só
onde há estado ou evento.

| Componente | Tipo | Papel |
|---|---|---|
| `AppShell` | server | layout raiz, skip-link, landmarks |
| `Header` | server | logo, navegação, CTA persistente |
| `MobileNavigation` | client | menu em drawer, foco preso, `Esc` fecha |
| `HeroMedia` | client | vídeo com poster, pausa visível, troca por poster em reduced-motion |
| `ServiceSelector` | server | escolha rápida de serviço → alimenta o fluxo |
| `TrustStrip` | server | confiança operacional, sem número inventado |
| `FleetCard` / `FleetGrid` | server | 4 cards de altura idêntica; "Ver detalhes" → rota real |
| `TourChapter` | client | capítulo visual de Salvador com mídia |
| `ProcessSteps` | server | solicite → confirme → viaje |
| `FAQ` | client | acordeão acessível; some inteiro se não houver resposta confirmada |
| `BookingLauncher` | client | botão persistente que abre o fluxo |
| `BookingSheet` | client | bottom sheet em mobile, painel/modal em desktop |
| `WhatsAppHandoff` | client | monta a mensagem e entrega ao WhatsApp |
| `Footer` | server | contato real, legal, redes — campos pendentes somem |
| `MediaWithFallback` | client | imagem/vídeo com poster, `onError`, sem CLS |
| `LanguageSwitcher` | — | **não implementado** enquanto `enabledLocales` for pendente (B-10) |

## Dados e estado

- **Fonte do conteúdo:** módulos TypeScript em `content/` (`schema.ts` +
  `site-content.ts`), importados em tempo de build. Sem CMS, sem fetch.
- **Tipagem:** `Fact<T>` com status `confirmed | pending | prohibited`; leitura
  só por `publishable()`. Ver `content-model.md`.
- **Estado do formulário:** `useState` no `BookingSheet`. Sem biblioteca de
  estado global — há um único fluxo.
- **Persistência temporária:** rascunho da solicitação em `sessionStorage`
  (chave `gt:booking-draft`), para que o visitante não perca o preenchimento ao
  navegar. Expira com a aba. Nenhum dado pessoal em `localStorage`, nenhum
  envio a terceiros, nenhum cookie de rastreio.
- **Validação:** `zod` no submit; erro exibido junto ao campo, com
  `aria-describedby` e `aria-invalid`.
- **WhatsApp:** número em `NEXT_PUBLIC_WHATSAPP_E164`, lido em
  `content/site-content.ts`. É um dado público por natureza (fica na URL do
  `wa.me`), então `NEXT_PUBLIC_` é adequado. **Nenhum segredo no cliente:** o
  projeto não tem token, chave de API nem credencial; se algum surgir, fica em
  variável sem prefixo e só é lida no servidor.
- **i18n:** estrutura `LocalizedContent<T>` já existe no schema. A implementação
  (`/en`, `/es` por segmento de rota) fica congelada até B-10 ser resolvido.
  Nada de detecção automática por `Accept-Language`.
- **Analytics:** **nenhum**. Não há autorização (B-14). Nada de GA, Meta Pixel
  ou similar até decisão explícita registrada.

## Qualidade

### Testes

| Nível | Ferramenta | Cobertura mínima |
|---|---|---|
| Unitário | Vitest | `publishable()` e os helpers de `Fact`; montagem da mensagem do WhatsApp; validação zod |
| Componente | Vitest + Testing Library | `FAQ` (acordeão, teclado), `BookingSheet` (foco preso, `Esc`), `FleetCard` (some quando mídia é `prohibited`), `MediaWithFallback` |
| End-to-end | Playwright | caminho completo: home → escolher serviço → preencher → **URL final do `wa.me` correta** |

O teste e2e do handoff é o mais importante do projeto: é o único ponto onde uma
falha silenciosa custa uma venda. Ele deve assertar a URL montada, não o
comportamento do WhatsApp.

Instalação e configuração na Etapa 04.

### Breakpoints

| Nome | Largura | Alvo |
|---|---:|---|
| base | 375 px | mobile — ponto de partida do CSS |
| `sm` | 390 px | ajustes finos |
| `md` | 768 px | tablet retrato |
| `lg` | 1024 px | tablet paisagem / laptop pequeno |
| `xl` | 1440 px | desktop |

Verificação obrigatória em 375×812, 390×844, 768×1024, 1024×768 e 1440×900.

### Orçamento de performance

| Métrica | Meta |
|---|---|
| JS inicial (comprimido) | ≤ 120 KB na home |
| CSS total | ≤ 40 KB |
| LCP (4G, mobile) | ≤ 2,5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0,05 |
| Peso da primeira dobra sem o vídeo | ≤ 300 KB |

O vídeo do hero é o principal risco: os arquivos de origem vão de 5 a 22 MB. A
regra é que ele **nunca** entra no caminho do LCP — o LCP é o poster.

### Estratégia de imagem e vídeo

- Imagens por `next/image`, servidas em AVIF/WebP, com `width`/`height`
  sempre declarados. `priority` só no poster do hero.
- Vídeo: sem `preload` (`preload="none"`), `poster` obrigatório, `muted`,
  `playsInline`, botão de pausa visível e persistente.
- Autoplay **apenas** em telas ≥ 768 px e só com `prefers-reduced-motion: no-preference`.
  Em mobile, poster estático com play manual.
- `IntersectionObserver` pausa o vídeo fora da viewport.
- Um único vídeo na primeira dobra.
- Reencode na Etapa 10: alvo ≤ 2,5 MB por clipe em H.264, com MP4 servido por
  `<source>` único (sem VP9/AV1 até haver medição que justifique).

### Reduced motion

`@media (prefers-reduced-motion: reduce)` desliga transform/opacity animados,
troca o vídeo pelo poster e mantém apenas mudanças instantâneas de estado.
Nada de scroll-jacking nem parallax em nenhuma configuração — a própria
biblioteca UI/UX classifica isso como severidade alta.

## Segurança e privacidade

- Sem cookies de terceiros, sem pixel, sem fontes carregadas de CDN externo
  (as fontes vão via `next/font`, servidas do próprio domínio).
- Formulário não persiste dado pessoal fora da sessão do navegador.
- Cabeçalhos de segurança básicos em `next.config.ts` na Etapa 04.
