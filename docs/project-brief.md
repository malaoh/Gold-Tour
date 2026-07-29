# Gold Tour — project brief

> Documento vivo. Atualizado na Etapa 00 (auditoria). Toda afirmação aqui é
> rastreável a uma fonte; o que não tem fonte está em `content-needs.md`.

## Objetivo do produto

Landing page / site de conversão que transforma interesse em **solicitação de
orçamento e agendamento** de translados e transfers em Salvador (BA), com
continuidade do atendimento pelo WhatsApp.

Fonte: briefing do proprietário nesta sessão + `GOLD_TOUR_DIRECAO_FINAL.md`.

## Posicionamento

Gold Tour é apresentada como **concierge digital de mobilidade em Salvador** —
não como locadora, não como app de corrida, não como landing turística genérica.

Atributos a comunicar: organização, hospitalidade, pontualidade, discrição,
conforto executivo, atendimento humano e conhecimento local.

Fonte: `GOLD_TOUR_DIRECAO_FINAL.md` §"Norte criativo".

## Público

Não há pesquisa de público formalizada. Inferência de trabalho, **a confirmar
na Etapa 01**:

- passageiro que chega ao aeroporto de Salvador e quer recepção resolvida;
- executivo/agenda corporativa que precisa de motorista à disposição;
- famílias e grupos em passeio privativo;
- organizadores de eventos que precisam coordenar transporte de convidados.

Status: **provável, não confirmado**.

## Serviços a apresentar

Lista fechada pelo proprietário no contrato mestre:

1. transfer aeroporto
2. receptivo
3. motorista à disposição
4. passeios privativos
5. transporte para grupos e eventos
6. frota executiva
7. solicitação de orçamento com continuidade pelo WhatsApp

## Frota (lista fechada)

Exatamente quatro categorias, sem acréscimo:

| Categoria | Imagem local aproveitável | Situação |
|---|---|---|
| Corolla Executivo | `02-Imagens/sedan executivo.png` | candidata — provenance a confirmar |
| Sprinter Executiva | `02-Imagens/van principal.png` | candidata — provenance a confirmar |
| Micro-ônibus Executivo | — | **sem imagem publicável** |
| Doblò Executiva | — | **sem imagem publicável** |

Proibições registradas: não usar Chevrolet Spin como "Mini Van Executiva"; não
publicar `microonibus de luxo.webp` (640×427, origem ligada a concorrente).

## Proposta de valor (copy-base aprovada)

- Etiqueta: "Mobilidade executiva em Salvador"
- Título: "Salvador começa antes de você chegar."
- Apoio: "Transfers, receptivo, passeios privativos e transporte executivo com
  atendimento próximo do planejamento ao destino."
- CTA primário: "Solicitar atendimento" · secundário: "Conhecer serviços"

Fonte: `GOLD_TOUR_DIRECAO_FINAL.md` §"Copy-base".

## Restrições inegociáveis

- Nada de preço, capacidade, bagagem, prazo, avaliações, anos de mercado,
  selos, parceiros ou política comercial sem confirmação do proprietário.
- Nenhuma foto de banco, fabricante, concorrente ou IA apresentada como
  veículo real da Gold Tour.
- Mobile-first a partir de 375 px, WCAG AA, teclado, foco visível, alvos
  44×44 px, reduced motion, sem overflow horizontal, sem erro de console.
- Todo CTA precisa funcionar. Nenhum placeholder visível ao visitante.

## Stack decidida (herdada do bootstrap)

Next.js 16.2.12 · React 19.2.4 · TypeScript 5 · Tailwind CSS 4 · ESLint 9 · npm.
Ver `docs/decision-log.md` D-002 e `docs/handoff.md`.
