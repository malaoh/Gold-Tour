# Gold Tour — relatório de performance (Etapa 10)

Medido contra o **build de produção** (`next build` + `next start`), não o
servidor de desenvolvimento — dev inclui compilação sob demanda e não é
representativo. Medição feita em `localhost` (sem latência de rede real);
os números de payload são o dado mais confiável aqui, os de tempo servem só
como piso otimista.

## Vídeo: inventário e decisão

Todos os arquivos de origem são H.264, 24 fps, 8 s.

| Arquivo original | Resolução | Decisão | Seção | Nome web-safe | Motivo |
|---|---:|---|---|---|---|
| `Farol_da_Barra_photograph_dolly-in_…mp4` | 1920×1080 | **Aprovado** | Hero | `farol-da-barra.mp4` | Abertura de identidade imediata; frame íntegro |
| `Van_photograph_stabilized_push-in_…mp4` | 1920×1080 | **Aprovado** | Frota (poster) | `sprinter.mp4` | Fundo limpo, boa leitura do veículo |
| `Mercado_Modelo_Bay_glide_1080p_…mp4` | 1920×1080 | **Aprovado** | Passeios — Baía e cidade baixa | `baia-de-todos-os-santos.mp4` | Visual amplo, sem interferência |
| `Street_photograph_forward_dolly_…mp4` | 1920×1080 | **Aprovado** | Passeios — Salvador histórico | `salvador-historico.mp4` | Contexto histórico, sem interferência |
| `Elevador_Lacerda_Bay_Saints_…mp4` | 1280×720 | **Aprovado, mídia secundária** | Passeios — Roteiro sob medida | `elevador-lacerda.mp4` | Único fora de Full HD; mantido em bloco menor, nunca ampliado |
| `Forte_de_Santa_Maria_Porto_…mp4` | 1920×1080 | **Recusado** | — | não importado | Equipamento de filmagem visível na borda direita do quadro (D-008); sem recorte aprovado |
| `Vehicles_stationary_slider_move_…mp4` | 1920×1080 | **Recusado para uso próprio** | — | não importado | Mercedes com placas europeias em cenário europeu — não é Salvador nem frota Gold Tour (D-007); nenhuma seção do site precisa de "transição conceitual" que justifique o risco de confusão |

### Onde cada vídeo aparece de fato

Só o **hero** renderiza um `<video>` de verdade. `TourChapters` (passeios,
frota nos capítulos editoriais) usa exclusivamente o **poster** de cada
clipe — nunca o vídeo — então mesmo os arquivos "aprovados" para passeios não
adicionam decodificador nenhum fora da home. Isso satisfaz de saída a regra
"evitar múltiplos decoders ativos" e "não carregar todos os vídeos na
entrada".

| Local | Elemento | Arquivo |
|---|---|---|
| Hero (`/`) | `<video>` condicional | `farol-da-barra.mp4` |
| Passeios — Salvador histórico | `<Image>` (poster) | `salvador-historico-poster.jpg` |
| Passeios — Baía e cidade baixa | `<Image>` (poster) | `baia-de-todos-os-santos-poster.jpg` |
| Passeios — Orla e pôr do sol | `<Image>` (poster, sem vídeo) | `farol-da-barra-poster.jpg` |
| Passeios — Roteiro sob medida | `<Image>` (poster) | `elevador-lacerda-poster.jpg` |
| Frota — Grupos e eventos (serviço) | `<Image>` (poster) | `sprinter-poster.jpg` |

`sprinter.mp4` está importado e pronto (D-027) mas **não está embutido** em
nenhuma página ainda — só o poster é usado. Fica disponível para a Etapa 11+
se a narrativa de frota pedir vídeo.

## Comportamento do vídeo do hero

| Regra | Implementação |
|---|---|
| `preload` | `none` — nunca baixa antes de decidir se vai tocar |
| Autoplay | só quando `min-width: 768px` **e** `prefers-reduced-motion: no-preference`, lido via `useSyncExternalStore` (sem efeito, sem flash) |
| `muted` / `playsInline` | sempre, quando o vídeo existe |
| Pausa fora da viewport | `IntersectionObserver`, threshold 0,2 |
| Botão de pausa | sempre visível quando o vídeo está ativo; `aria-label` muda com o estado |
| `reduced-motion` | vídeo nunca é montado no DOM — fica só o poster de fundo |
| Mobile (<768px) | vídeo nunca é montado — poster + `<h1>` já comunicam a proposta |
| Áudio automático | impossível — `muted` é obrigatório no elemento |

### Correção aplicada nesta etapa: enquadramento por breakpoint

O farol fica no terço direito do quadro original. Um recorte alto e estreito
(celular) cortava as laterais com `object-position: center` e **apagava o
farol inteiro** — sobrava só céu e sol. Corrigido com `object-position`
progressivo:

| Breakpoint | Posição (poster e vídeo) |
|---|---|
| `<640px` | `82% 55%` |
| `640–767px` | `78% 55%` |
| `768–1023px` | `70% 50%` |
| `1024–1439px` | `60% 50%` |
| `≥1440px` | `center` |

Verificado visualmente em 375, 768 e 1440 — farol visível nos três.

## Medições (produção, localhost)

| Métrica | Valor | Contexto |
|---|---:|---|
| LCP | 152 ms | localhost, sem latência de rede; elemento = poster do hero (correto — nunca o vídeo) |
| CLS | 0 | nenhum layout shift detectado no carregamento |
| Payload total, home, mobile (375 px) | **314 KB** | build de produção, sem vídeo carregado |
| — JS | ~160 KB | acima da meta de 120 KB (ver P2 abaixo) |
| — Fontes (2× woff2) | ~81 KB | `next/font`, cache longo, sem CDN externo |
| — CSS | ~10 KB | dentro da meta de 40 KB |
| — Poster do hero | 44 KB | AVIF/WebP servidos automaticamente pelo `next/image`/`next.config` |
| Vídeo do hero na carga inicial (mobile) | 0 KB | confirmado — `<video>` nem existe no DOM abaixo de 768 px |

### P2 registrado para a Etapa 12

JS inicial (~160 KB) ficou acima do orçamento de 120 KB definido na Etapa 02.
A diferença provável é o par `@radix-ui/react-slot` + `class-variance-authority`
trazido pelo componente `liquid-glass-button` (D-038). Não é um problema de
vídeo/motion; registrado aqui porque a medição desta etapa foi o que revelou o
número. Não corrigido agora — envolveria rever a decisão do proprietário
sobre o componente, fora do escopo desta etapa.

## Etapa 12 — nota

Nenhuma métrica nova de performance foi coletada nesta etapa; os números
acima (build de produção, Etapa 10) continuam válidos — os quatro achados da
Etapa 12 foram de acessibilidade e responsividade (foco de teclado, CTA
duplicado em mobile), não de payload ou tempo de carregamento. O JS acima da
meta (P2 registrado na Etapa 10) segue como pendência para revisão futura.

## Teste em condição limitada

Rede lenta e CPU limitada não foram emuladas nesta etapa (o Browser pane não
expõe throttling de CPU/rede neste ambiente). Compensado por: payload medido
diretamente (314 KB é compatível com 4G lento em poucos segundos), vídeo
comprovadamente ausente em mobile, e `preload="none"` em qualquer vídeo que
exista. Teste em dispositivo real ou emulação de CPU/rede fica registrado como
pendência da Etapa 12.

## Rodada de imersão — palco de capítulos (2026-07-29)

Medido na build de produção (`next build` + `next start`), viewport 390×844.

### Antes / depois do portão de visibilidade

O palco adiciona 4 vídeos à home. A primeira implementação disparava
play/preload na hidratação, sem checar se a seção estava perto da tela:

| Métrica | Sem portão (1ª versão) | Com portão (final) |
|---|---:|---:|
| Payload total na entrada | **4065 KB** | **1015 KB** |
| Vídeos de capítulo baixados na entrada | 2 (3,0 MB) | **0** |
| LCP | 140 ms | 420 ms |
| CLS | 0 | 0 |
| Elementos `<video>` no DOM | 4 | 4 |

Redução de **75% no payload de entrada**. Os vídeos passam a ser buscados
somente quando a seção chega a 300px da viewport — verificado: ao rolar até
lá, exatamente 2 arquivos são baixados (o ativo e o próximo) e 1 está tocando.

O LCP subiu de 140 ms para 420 ms porque, sem os vídeos competindo por banda
na entrada, o navegador prioriza diferente — ainda assim está muito abaixo da
meta de 2,5 s. Ambas as medições são em localhost, sem latência real.

### Regras de mídia do palco (verificadas em runtime)

| Regra | Status |
|---|---|
| Não carregar todos os vídeos na entrada | ✅ zero na entrada |
| Capítulos sob demanda | ✅ portão de 300px |
| Pré-carregar somente o próximo | ✅ `preload` = `[auto, auto, none, none]` |
| Apenas um vídeo ativo | ✅ medido: `playingCount: 1` |
| Pausar fora da viewport | ✅ portão pausa tudo ao sair |
| Pausar com aba oculta | ✅ `visibilitychange` |
| Dimensões reservadas | ✅ CLS 0 |
| Sem frame preto no crossfade | ✅ poster de cada capítulo já pintado sob o vídeo |
