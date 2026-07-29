# Gold Tour — inventário de mídia (Etapa 00)

Nenhum arquivo foi copiado, movido ou renomeado nesta etapa. Este é um
inventário de origem; a importação para `public/` ocorre na Etapa 10.

## Vídeos — `C:\Users\Yago\Downloads\GOLD TOUR`

Todos H.264, 24 fps, 8,0 s. Metadados verificados com `ffprobe`.

| Arquivo | Resolução | Tamanho | Uso previsto | Risco |
|---|---:|---:|---|---|
| `Farol_da_Barra_photograph_dolly-in_202607291103.mp4` | 1920×1080 | 6,8 MB | Hero principal | — |
| `Van_photograph_stabilized_push-in_1080p_202607291130.mp4` | 1920×1080 | 9,5 MB | Destaque Sprinter | procedência a confirmar |
| `Mercado_Modelo_Bay_glide_1080p_202607291111.mp4` | 1920×1080 | 16,2 MB | Capítulo panorâmico | peso alto para mobile |
| `Street_photograph_forward_dolly_….mp4` | 1920×1080 | 21,6 MB | Salvador histórico | **nome com `…` não web-safe**; peso alto |
| `Elevador_Lacerda_Bay_Saints_202607291104.mp4` | 1280×720 | 5,4 MB | Capítulo "Salvador", bloco menor | único fora de Full HD |
| `Forte_de_Santa_Maria_Porto_202607291117.mp4` | 1920×1080 | 19,0 MB | Secundário | **equipamento de filmagem visível** |
| `Vehicles_stationary_slider_move_1080p_202607291051.mp4` | 1920×1080 | 11,0 MB | Transição conceitual | **não é frota Gold Tour** |

### Verificações visuais feitas nesta etapa

- **Forte de Santa Maria** — inspeção de frame confirma um monitor/rig de
  câmera na borda direita do quadro, ocupando aproximadamente os 8% finais da
  largura, com elementos também no canto inferior direito. Só é publicável com
  recorte que elimine completamente a interferência; caso contrário, descartar.
- **Vehicles stationary** — inspeção de frame mostra Mercedes-Benz Classe S,
  Classe V e Sprinter enfileirados em ambiente urbano europeu, com placas de
  padrão europeu. **Não é Salvador e não é frota da Gold Tour.** Uso permitido
  apenas como transição conceitual, jamais legendado como frota própria.
- **Farol da Barra** — frame íntegro, sem interferência aparente.

### Regras herdadas para vídeo (Etapa 10)

Renomear para nomes web-safe · gerar poster de cada clipe · hero `muted` +
`playsInline` + botão de pausa visível · pausar fora da viewport · em mobile
privilegiar poster · em `prefers-reduced-motion` servir poster no lugar do
vídeo · não empilhar vários vídeos na primeira dobra.

## Imagens de veículos — `C:\Users\Yago\Downloads\02-Imagens`

A pasta contém **756 arquivos** de projetos diversos e não é uma biblioteca
Gold Tour. Varredura dirigida aos candidatos de frota:

| Arquivo | Resolução | Tamanho | Conteúdo verificado | Decisão |
|---|---:|---:|---|---|
| `sedan executivo.png` | 2048×2080 | 7,8 MB | Toyota Corolla preto, placa borrada, portaria noturna | candidato a Corolla — **ver risco AI** |
| `van principal.png` | 2336×1824 | 7,2 MB | Mercedes-Benz Sprinter preta, teto alto, placa borrada | candidato a Sprinter — **ver risco AI** |
| `microonibus de luxo.webp` | 640×427 | 83 KB | — | **vetado** (baixa resolução + origem de concorrente) |
| `van interna.png` | 1184×896 | 2,4 MB | interior de van | avaliar na Etapa 08 |
| `corolla.webp` | 1000×484 | 126 KB | — | resolução insuficiente para card grande |
| `van.webp` / `van 1.webp` | 1000×645 / 889×500 | 36 KB / 27 KB | — | resolução insuficiente |
| `Van.jpeg` | 1200×1600 | 479 KB | — | avaliar na Etapa 08 |
| `card sedan.png` / `card sedan 1.jpg` | 572×400 / 640×480 | 203 KB / 109 KB | — | resolução insuficiente |

Não foram encontrados duplicados exatos entre os candidatos (hashes distintos).
`van.webp`, `van 1.webp` e `Van.jpeg` são arquivos diferentes entre si.

### Risco de procedência (bloqueador B-01)

`sedan executivo.png` e `van principal.png` exibem, no canto inferior direito,
um glifo de quatro pontas característico das ferramentas de edição/geração por
IA do Google. Isso indica que as imagens passaram por processamento de IA —
possivelmente apenas upscale/limpeza, possivelmente geração.

Consequência prática: a regra 6 do contrato proíbe apresentar imagem de IA como
veículo real da Gold Tour. Antes da Etapa 08 é necessário que o proprietário
informe se são fotos de veículos realmente operados pela empresa e, se sim,
fornecer o original sem tratamento. Sem isso, as duas categorias que hoje têm
imagem também ficam sem imagem publicável.

## Marca

Nenhum logo, favicon, manual de marca ou paleta oficial da Gold Tour foi
localizado nas duas pastas auditadas. Os arquivos com "logo" no nome em
`02-Imagens` pertencem a outros projetos (PLK, Flor do Sertão, Kipao, Alfa,
Metafit, Flamingo, esmaltaria). Ver bloqueador B-05 e contradição C-01.

## Marca — atualização da Etapa 01

| Arquivo | Formato | Situação |
|---|---|---|
| `GOLD TOUR/e01bf865-9ee1-4fc7-b822-65a9b000ce7f.png` | PNG 1055×1491, `rgb24`, 1,8 MB | prancha do caderno de marca (p. 03). **Sem alfa, sem vetor** — não publicável como logo |

Detalhes em `brand-audit.md`. O que falta para a marca ir ao ar: vetor ou PNG
com transparência, versão monocromática e favicon (B-05).

## Pipeline de mídia planejado (Etapa 02, execução na Etapa 10)

| Etapa | Ação |
|---|---|
| 1 | Copiar apenas os clipes aprovados para `public/media/`, com nomes web-safe (resolve o `…` do arquivo `Street_photograph…`) |
| 2 | Reencodar em H.264, alvo ≤ 2,5 MB por clipe, mantendo 1920×1080 |
| 3 | Extrair poster de cada clipe (JPEG/AVIF), que passa a ser o LCP do bloco |
| 4 | Recortar `Forte_de_Santa_Maria` eliminando o equipamento — ou descartar |
| 5 | Registrar cada arquivo como `MediaAsset` com `provenance` e `license` |
| 6 | Nenhum vídeo entra no caminho crítico: `preload="none"` e poster sempre |

Nenhum arquivo foi copiado até aqui. As pastas de origem do usuário seguem
intocadas.

## Frota — Etapa 08

| Categoria | Arquivo publicado | Tratamento | Origem/licença |
|---|---|---|---|
| Corolla Executivo | `public/frota/corolla-executivo.jpg` | recorte 1400×1026 + correção de cor (contraste 1.05, saturação 0.92, vinheta) | `sedan executivo.png`, confirmado pelo proprietário como foto oficial (D-033) |
| Sprinter Executiva | `public/frota/sprinter-executiva.jpg` | recorte 1400×1094 + correção de cor (contraste 1.12, saturação 0.8, balanço de cor frio, vinheta) | `van principal.png`, confirmado pelo proprietário (D-033) |
| Micro-ônibus Executivo | — | painel "Imagem em curadoria" | sem foto confiável; `microonibus de luxo.webp` segue vetado (D-005) |
| Doblò Executiva | — | painel "Imagem em curadoria" | sem foto confiável; Chevrolet Spin segue vetada (D-006) |

Originais sem tratamento preservados em `public/frota/originals/` para
rastreio. `van interna.png` foi avaliada como candidata a galeria da Sprinter
e **recusada**: mostra bancos em fileiras de três (configuração de
micro-ônibus, não de van) e traz o mesmo glifo de ferramenta de IA das demais
imagens candidatas (D-036).

Nenhuma galeria adicional foi publicada — `gallery` permanece `pending` para
as quatro categorias.

## Passeios — Etapa 09

| Capítulo | Mídia | Uso |
|---|---|---|
| Salvador histórico | `salvador-historico.mp4`/poster (Street photograph) | poster estático em `/passeios` e na home |
| Baía e cidade baixa | `baia-de-todos-os-santos.mp4`/poster (Mercado Modelo) | idem |
| Orla e pôr do sol | `farol-da-barra-poster.jpg` **sem vídeo** | reaproveita o poster do hero como imagem secundária, sem autoplay — Prompt 10 exige justamente isto |
| Roteiro sob medida | `elevador-lacerda.mp4`/poster | idem primeiros dois |

`TourChapters` só renderiza `<Image>` a partir do `poster`; nenhum vídeo toca
nessa seção em nenhum breakpoint, então a regra "sem repetir o hero em
autoplay" vale mesmo quando o arquivo de origem é o mesmo do hero.

## Biblioteca de referência UI/UX

`Downloads/GOLD TOUR/ui-ux-pro-max-skill-main` é uma skill de inteligência de
UI/UX (84 estilos, 192 paletas, 74 pares tipográficos, 98 diretrizes de UX,
presets GSAP), com busca via
`.claude/skills/ui-ux-pro-max/scripts/search.py`. É consultiva: suas sugestões
de cor e estilo não substituem o branding Gold Tour.
