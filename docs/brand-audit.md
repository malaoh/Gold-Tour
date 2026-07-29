# Gold Tour — auditoria de marca (Etapa 01)

Fonte única auditada: `C:\Users\Yago\Downloads\GOLD TOUR\e01bf865-9ee1-4fc7-b822-65a9b000ce7f.png`
(adicionada à pasta pelo proprietário em 2026-07-29 12:34 e anexada ao Prompt 01).

## O que existe

| Item | Situação |
|---|---|
| Arquivo | 1 PNG, 1055×1491, `rgb24` — **sem canal alfa, sem transparência** |
| Natureza | Página **03** de um "CADERNO DE MARCA — PROPOSTA PARA RENAN" |
| Conteúdo | Selo circular, wordmark, conceito, 3 mockups de aplicação, paleta |
| Vetor (SVG/AI/EPS/PDF) | **não existe** |
| Logo isolada em arquivo próprio | **não existe** — só embutida na prancha |

### Versões de logo identificadas (todas dentro da prancha, não como arquivo)

1. **Selo de Serviço (principal)** — brasão circular: anel externo com
   "GOLD TOUR" em arco superior e "VIP MOBILITY & PREMIUM TOURISM" em arco
   inferior, monograma **GT** ao centro com estrela de quatro pontas acima,
   ornamentos losangulares laterais. Acabamento dourado com relevo/gradiente.
2. **Wordmark (horizontal)** — "GOLD TOUR" em serifada com versalete, sobre
   filete ornamental, com o descritor "VIP MOBILITY & PREMIUM TOURISM" abaixo.
3. **Monograma reduzido GT** — aparece duas vezes: na flâmula azul-marinho do
   canto superior esquerdo (dourado sobre marinho) e no rodapé (dourado sobre
   off-white). Serve como marca reduzida / favicon.
4. **Versão monocromática** — **não existe**. Nenhuma variação 1-cor, negativa
   pura ou preto-e-branco foi fornecida.

### Legibilidade e área de proteção

- O texto em arco do anel externo tem altura muito pequena em relação ao
  diâmetro. Em aplicação web abaixo de ~120 px o descritor
  "VIP MOBILITY & PREMIUM TOURISM" fica ilegível — o selo deve ter tamanho
  mínimo generoso ou ceder lugar ao monograma GT.
- **Área de proteção não está especificada** no material. A prancha usa, na
  prática, um respiro visual de aproximadamente meia-altura do anel ao redor do
  selo. Isso é observação, não norma oficial.
- Sem transparência, o selo **não pode ser sobreposto** a vídeo ou foto sem
  antes ser recortado/vetorizado.

## Paleta oficial declarada

| Nome | Hex declarado | Amostra medida no pixel | Papel |
|---|---|---|---|
| Grafite | `#1C1F23` | `#1F2325` | texto escuro / superfície profunda |
| Ouro Champagne | `#C8A96A` | `#CBA975` | assinatura e ação |
| Off-White | `#F7F5F0` | `#F3EFE8` | superfície clara / respiro |
| Azul Marinho | `#0B1D33` | `#0C1F31` | cor institucional / superfície escura |

As pequenas diferenças entre o hex impresso e o pixel medido vêm da compressão
e do gradiente metálico da amostra de ouro. **Os valores impressos são a fonte
de verdade.**

### Contraste verificado (WCAG 2.1)

| Combinação | Razão | Veredito |
|---|---:|---|
| Grafite sobre Off-White | 15,2:1 | AAA |
| Azul Marinho sobre Off-White | 15,6:1 | AAA |
| Off-White sobre Azul Marinho | 15,6:1 | AAA |
| Ouro Champagne sobre Azul Marinho | 7,5:1 | AAA |
| **Ouro Champagne sobre Off-White** | **2,1:1** | **reprova AA e reprova até o mínimo de 3:1 para gráficos** |

**Consequência operacional:** o Ouro Champagne funciona como cor de texto e de
ação apenas sobre fundo escuro. Sobre fundo claro ele só pode aparecer como
elemento decorativo sem função informativa. Todo botão, link ou rótulo dourado
em seção clara precisará de um tom âmbar escurecido — a derivação desse token
acessível é trabalho da **Etapa 03**, não desta.

## Tipografia

- **Títulos e wordmark:** serifada didone/transicional, com versalete e
  espaçamento entre letras largo. A fonte exata **não é declarada** na prancha.
- **Texto de apoio ("Conceito"):** sans-serif humanista de peso leve. Também
  **não declarada**.
- Nenhum arquivo de fonte foi fornecido; nenhuma licença foi informada.

Comparação com a direção final: o fallback sugerido lá é `Newsreader` (títulos)
e `Manrope` (interface). `Newsreader` é uma serifada de leitura, mais suave que
a didone da prancha; `Manrope` é compatível com o sans do bloco de conceito.
Como não há fonte oficial declarada, **o fallback permanece válido**, com a
ressalva de que a escolha final deve ser calibrada na Etapa 03 contra o
wordmark. Não haverá tentativa de recriar a fonte do logotipo.

## Comparação com os tokens de fallback da direção final

| Papel | Fallback da direção final | Marca real | Decisão |
|---|---|---|---|
| Superfície escura profunda | Obsidiana `#0B0D0E` | Grafite `#1C1F23` | **usar a marca** |
| Azul institucional | Azul-noturno `#0E1B2A` | Azul Marinho `#0B1D33` | **usar a marca** |
| Superfície clara | Marfim `#F5F1E8` / `#FCFBF8` | Off-White `#F7F5F0` | **usar a marca** |
| Assinatura / ação | Dourado Bahia `#C6A15B` | Ouro Champagne `#C8A96A` | **usar a marca** |
| Azul secundário | Azul Atlântico `#0E5263` | — | fallback permanece (sem equivalente) |
| Sucesso / erro | `#1E6B4E` / `#B42318` | — | fallback permanece |
| Texto escuro | `#151718` | Grafite `#1C1F23` cobre o papel | usar a marca |

A identidade real substitui o fallback em 4 dos 7 papéis. Os 3 restantes não
têm equivalente na prancha e seguem com o valor de fallback até haver definição.

## Voz da marca

O caderno usa: "hospitalidade", "cuidado em cada detalhe", "prestígio",
"recepção exclusiva", "atendimento refinado", "experiência memorável", e o
descritor "VIP MOBILITY & PREMIUM TOURISM"; o cartão traz
"EXPERIÊNCIA · DISCRIÇÃO · EXCELÊNCIA".

É uma voz mais cerimoniosa e mais explicitamente "premium/VIP" que a copy-base
da direção final, que é sóbria e concreta. **Não há evidência de que a voz do
caderno seja a voz aprovada para o site** — a prancha é uma proposta, e o
contrato mestre proíbe superlativos vazios. Portanto a copy-base permanece
como está (ver `content-model.md`), incorporando apenas o vocabulário de
hospitalidade e discrição, sem os superlativos.

## Ressalvas registradas

- **R-01** — O material é uma **proposta** ("PROPOSTA PARA RENAN"), não um
  manual aprovado. É preciso confirmar que este é o branding adotado.
- **R-02** — Só a página 03 foi entregue. As páginas 01, 02 e seguintes do
  caderno podem conter fontes oficiais, área de proteção, usos proibidos e
  versões alternativas.
- **R-03** — Sem vetor e sem transparência, o selo não é utilizável em
  produção sobre mídia. É necessário o arquivo original (SVG/AI/EPS/PDF) ou um
  PNG com alfa em alta resolução.
- **R-04** — Os três mockups de aplicação (placa, capa, cartão) são peças de
  apresentação com aparência de render/IA. **Não podem ser publicados como
  fotos de materiais reais da empresa.**
- **R-05** — A prancha é assinada como proposta para "Renan". A relação entre
  Renan e a Gold Tour (proprietário? sócio?) não está registrada e não será
  presumida.
