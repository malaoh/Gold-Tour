# Gold Tour — relatório de QA

Última execução: 2026-07-29, ao fim das Etapas 05 a 07 (parcial).

## Verificações automatizadas

| Verificação | Comando | Resultado |
|---|---|---|
| Lint | `npm run lint` | limpo |
| Tipos | `npm run typecheck` | limpo (strict + `noUncheckedIndexedAccess`) |
| Unitários e invariantes | `npm run test` | 12 testes, 2 arquivos, todos passando |
| Build de produção | `npm run build` | verde, 16 rotas |
| Formatação | `npm run format:check` | limpo |
| Placeholders publicados | `npm run placeholders` | 34 campos listados |
| E2E | `npm run test:e2e` | **não executado** — navegadores não instalados |

Para rodar o e2e: `npx playwright install chromium`.

## Breakpoints

Home verificada nos cinco tamanhos exigidos. Em todos: **sem overflow
horizontal**, um único `h1`, nenhum link vazio, nenhuma imagem sem `alt`,
nenhum erro de console.

| Viewport | Observação |
|---|---|
| 375×812 | vídeo não carrega (só poster), CTAs empilhados em largura total |
| 390×844 | idem; CTA do header oculto para não espremer a barra |
| 768×1024 | vídeo ativo com botão de pausa; CTA do header aparece |
| 1024×768 | navegação completa visível, rota ativa sublinhada |
| 1440×900 | grade de frota em quatro colunas |

### Correções feitas durante a verificação

1. **Header não sobrepunha o hero.** `relative` e `absolute` na mesma classe —
   o CSS resolvia a favor de `relative`. Separadas por contexto.
2. **Wordmark ilegível sobre fundo escuro.** O degradê metálico da marca tem
   áreas escuras que somem no marinho. Gerada uma variante clara a partir do
   alfa da própria marca (`#E3CFA4`, 10,7:1 sobre o marinho).
3. **Doze alvos de toque abaixo de 44 px** — links do rodapé, navegação,
   "Ver a frota completa" e o link do logo. Todos elevados a `min-h-11`.
4. **CTA do header quebrava em duas linhas em 390 px.** Movido de `sm:` para
   `md:`, com `whitespace-nowrap`.

## Acessibilidade

| Item | Situação |
|---|---|
| Skip link | primeiro elemento focável, visível ao receber foco |
| Landmarks | `header`, `nav` (rotuladas), `main#conteudo`, `footer` |
| Hierarquia de títulos | um `h1` por página, sem salto de nível |
| Foco visível | 2 px + 3 px de afastamento; marinho no claro, ouro no escuro |
| Alvos de toque | ≥ 44×44 em toda a interface |
| Menu móvel | `aria-expanded`, `aria-controls`, foco preso, `Esc` fecha, clique fora fecha, foco volta ao gatilho, scroll do fundo travado |
| Formulário | labels reais e visíveis, `aria-invalid`, `aria-describedby`, erro junto do campo, `inputmode` e `autocomplete` corretos |
| FAQ | `<details>` nativo — teclado e busca na página funcionam sem JS |
| Contraste | todos os pares de token medidos por script; nenhum reprova |
| Cor sozinha | nenhuma informação depende só de cor |
| Vídeo | `muted`, `playsInline`, botão de pausa visível, pausa fora da viewport |
| Reduced motion | vídeo não inicia; transições em 0,01 ms; sem parallax ou scroll-jacking em nenhuma configuração |

## Caminho de conversão

Testado manualmente no navegador, de ponta a ponta:

`/` → "Transfer aeroporto" → `/solicitar?servico=transfer-aeroporto`
(serviço já pré-selecionado) → preenchimento → envio → WhatsApp aberto com:

```
Olá! Gostaria de solicitar um atendimento com a Gold Tour.
Serviço: Transfer aeroporto
Nome: Ana Souza
Passageiros: 3
Observações: Aeroporto SSA para Barra, voo G3 1234 · Contato: 71988887777
```

Confirmado: campos vazios não entram na mensagem, acentuação codificada
corretamente, rascunho da sessão apagado após o envio. O mesmo caminho está
coberto por `tests/e2e/solicitar.spec.ts`.

**O número usado é o placeholder `+55 71 90000-0000`.** Nenhuma divulgação do
site pode acontecer antes de trocá-lo (B-02).

## Pendências de QA

- E2E não executado (navegadores do Playwright ausentes).
- Leitor de tela real ainda não testado — só a estrutura semântica foi conferida.
- Medição de Core Web Vitals em rede lenta: Etapa 12.
- Páginas `/politica-de-privacidade` e `/termos` respondem **404** de propósito:
  os textos não existem (B-11) e publicar política genérica criaria obrigação
  legal que a operação não combinou. Os links seguem no rodapé e passam a
  funcionar quando o conteúdo chegar.
