# Gold Tour — dados e mídias faltantes

Atualizado na Etapa 08. Nada desta lista pode ser inventado. Um dado
`pending` some da interface; um dado `placeholder` vai ao ar mas aparece em
`npm run placeholders` até ser trocado pelo real (ver `content-model.md`).

## Classificação dos fatos comerciais

### Confirmado

| Fato | Fonte |
|---|---|
| Nome comercial: **Gold Tour** | proprietário + caderno de marca |
| Praça: Salvador e Região Metropolitana, Bahia | contrato mestre |
| Descritor institucional: **VIP Mobility & Premium Tourism** | caderno de marca, p. 03 |
| Serviços: transfer aeroporto, receptivo, motorista à disposição, passeio privativo, grupos e eventos | contrato mestre |
| Frota exibida: Corolla, Sprinter, Micro-ônibus, Doblò (exatamente 4) | contrato mestre |
| Canal de conversão: WhatsApp | contrato mestre |
| Paleta, selo GT e wordmark: identidade definitiva do caderno de marca | D-011, D-023 |
| **`sedan executivo.png` = Corolla Executivo oficial** | D-033, confirmado pelo proprietário no Prompt 08 |
| **`van principal.png` = Sprinter Executiva oficial** | D-033, confirmado pelo proprietário no Prompt 08 |

### Publicado como placeholder (rastreado, a trocar antes da divulgação)

Ver a lista completa e atualizada rodando `npm run placeholders`. Os mais
sensíveis: número de WhatsApp (B-02), capacidade e bagagem dos 4 veículos
(B-12), e-mail, endereço e Instagram (B-06/B-07), textos de serviço (B-17) e
roteiros de passeio (B-19).

### Ausente (bloqueadores)

| ID | Dado | Bloqueia | Status |
|---|---|---|---|
| ~~B-01~~ | ~~Procedência das fotos de veículos~~ | — | **resolvido — D-033** |
| B-02 | Número de WhatsApp oficial | divulgação do site | placeholder no ar |
| B-03 | Foto real da Doblò Executiva | Etapa 08 | sem imagem publicada |
| B-04 | Foto real do Micro-ônibus Executivo | Etapa 08 | sem imagem publicada |
| B-05 | Logo em vetor com transparência; versão monocromática; favicon | Etapa 13 | usando raster extraído da prancha |
| B-06 | Razão social, CNPJ, endereço completo, telefone | Etapa 11 | endereço parcial em placeholder |
| B-07 | Perfil de Instagram real | Etapa 11 | placeholder `@goldtour` no ar |
| B-08 | Respostas de FAQ ainda pendentes (bagagem exata, acessibilidade) | Etapa 11 | 4 de 6 perguntas com placeholder |
| B-09 | Domínio e hospedagem de destino | Etapa 13 | — |
| B-10 | Idiomas além de pt-BR | Etapa 11 | decidido: só pt-BR por ora |
| B-11 | Política de privacidade e termos | Etapa 11 | rotas em 404 de propósito |
| B-12 | Capacidade de passageiros e bagagem por categoria | Etapa 08 | placeholder no ar, **precisa confirmação real** |
| B-13 | Comodidades e acessibilidade por categoria | Etapa 08 | comodidades em placeholder; acessibilidade `pending` (nunca afirmada sem fonte) |
| B-14 | Autorização e ferramenta de analytics | Etapa 11 | nenhum instalado |
| B-15 | Horário de atendimento | Etapa 11 | placeholder no ar |
| B-16 | — | — | resolvido na Etapa 06 (vídeos importados) |
| B-17 | Detalhamento operacional de cada serviço | Etapa 09 | placeholder no ar |
| B-18 | Política comercial: orçamento, cancelamento, preço | Etapa 11 | nunca em placeholder — proibido induzir decisão de compra |
| B-19 | *novo.* Roteiro e duração real dos passeios | Etapa 09 | placeholder no ar |

### Contraditório / a esclarecer

- **C-02** — Direção final menciona corrigir "a seção atual" da frota, sem
  projeto web anterior acessível neste repositório. Se existe site no ar, a
  URL ajuda a mapear redirects na Etapa 13.
- **C-05** — *novo, Etapa 08.* O componente de botão "liquid glass" adotado a
  pedido do proprietário usa gradientes e glassmorphism que o próprio
  contrato mestre proíbe. Documentado em D-038; ver ressalva R-06 em
  `brand-audit.md`.

## Mídias faltantes

1. Foto publicável da **Doblò Executiva** — nada disponível hoje que não seja
   a Chevrolet Spin vetada.
2. Foto publicável do **Micro-ônibus Executivo** — `microonibus de luxo.webp`
   segue vetado; `van interna.png` avaliada e recusada (D-036).
3. Logo em **vetor** com transparência, versão monocromática, favicon.
4. Fotos adicionais de Corolla e Sprinter para a galeria de cada página de
   detalhe (`gallery`, hoje `pending`).
5. Fotografia real de recepção/atendimento, se a Etapa 09 pedir presença
   humana — os mockups do caderno (placa, capa, cartão) não servem.
