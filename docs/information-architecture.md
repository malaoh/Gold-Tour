# Gold Tour — arquitetura de informação (Etapa 02)

## Mapa de rotas

| Rota | Estado | Conteúdo | Bloqueio |
|---|---|---|---|
| `/` | planejada | home completa | — |
| `/servicos` | planejada | índice dos 5 serviços | — |
| `/servicos/transfer-aeroporto` | planejada | página de serviço | B-17 |
| `/servicos/motorista-a-disposicao` | planejada | página de serviço | B-17 |
| `/servicos/grupos-e-eventos` | planejada | página de serviço | B-17 |
| `/frota` | planejada | 4 categorias | B-01, B-03, B-04 |
| `/frota/[slug]` | planejada | detalhe da categoria | B-12, B-13 |
| `/passeios` | planejada | narrativa de Salvador | B-16 |
| `/passeios/[slug]` | **adiada** | roteiro individual | sem conteúdo (`tours: []`) |
| `/solicitar` | planejada | fluxo de solicitação | **B-02** |
| `/contato` | planejada | contato direto | B-06 |
| `/politica-de-privacidade` | planejada | documento legal | B-11 |
| `/termos` | **condicional** | documento legal | B-11 |

`/solicitar` e `/contato` coexistem com papéis distintos: `/solicitar` é o
fluxo guiado que termina no WhatsApp; `/contato` é a página institucional com
os canais diretos. Os CTAs do site apontam para `/solicitar`.

### Redirects

**Nenhum.** Não existe projeto web anterior neste repositório e nenhuma URL
legada foi fornecida. Se a pendência C-02 revelar um site no ar, será preciso
mapear as URLs antigas antes do lançamento (Etapa 13).

## Ordem das seções da home

Registrada conforme o contrato, sem alteração:

| # | Seção | Componente | Observação |
|---|---|---|---|
| 1 | Header | `Header` + `MobileNavigation` | CTA "Solicitar atendimento" sempre visível |
| 2 | Hero | `HeroMedia` | Farol da Barra; poster é o LCP |
| 3 | Escolha rápida de serviço | `ServiceSelector` | 4 caminhos; a escolha pré-preenche o fluxo |
| 4 | Confiança operacional | `TrustStrip` | pontualidade, recepção, atendimento humano, planejamento — **sem números** |
| 5 | Frota | `FleetGrid` + `FleetCard` | 4 cards; 4 col ≥1440, 2×2 em tablet, 1 col/carrossel em mobile |
| 6 | Salvador do seu jeito | `TourChapter` | narrativa visual: centro histórico, baía, orla |
| 7 | Como funciona | `ProcessSteps` | solicite → confirme → viaje |
| 8 | FAQ | `FAQ` | **some inteira** enquanto nenhuma resposta for confirmada |
| 9 | CTA final | `BookingLauncher` | retomar ou iniciar solicitação |
| 10 | Footer | `Footer` | contato, legal, redes — campos pendentes somem |

### Comportamento com os dados de hoje

Se a home fosse construída agora, as seções 8 (FAQ) desapareceria por completo,
a seção 5 mostraria 4 cards sem foto e sem capacidade, e o rodapé ficaria sem
contato. Isso é o funcionamento correto do modelo — e a medida exata do que os
bloqueadores custam.

## Navegação

- **Primária:** Serviços · Frota · Passeios · Contato + CTA "Solicitar atendimento".
  Quatro itens mais ação: dentro do limite que a UI/UX Pro Max recomenda.
- **Mobile:** drawer acionado por botão de 44×44 px, com foco preso, fechamento
  por `Esc` e por toque fora. O CTA fica fixo e visível fora do drawer.
- **Rodapé:** repete a navegação, acrescenta legal e redes.
- **Skip-link** para o conteúdo principal como primeiro elemento focável.
- Breadcrumb em `/frota/[slug]` e nas páginas de serviço.

## Hierarquia de títulos

Um único `h1` por página. Na home, o `h1` é a headline do hero
("Salvador começa antes de você chegar."); cada seção seguinte abre com `h2`, e
os cards de frota usam `h3`. Sem salto de nível.

## SEO

- `title` e `description` por rota via `generateMetadata`.
- Canonical dependente de B-09 (domínio).
- Open Graph com imagem dedicada — a criar quando houver logo em vetor (B-05).
- `sitemap.ts` e `robots.ts` gerados a partir das rotas reais publicadas.
- JSON-LD: `LocalBusiness` só quando houver endereço, telefone e horário
  confirmados (B-06, B-15). Schema incompleto ou inventado não será emitido.
- `lang="pt-BR"` no `html`. `hreflang` só quando houver mais de um idioma.
