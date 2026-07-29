# Gold Tour — handoff

Última atualização: 2026-07-29, fim da Etapa 04.

## Estado real do projeto

Base técnica completa e verificada; **nenhuma página do site foi construída**.
O que existe é fundação: tokens, primitivos, modelo de conteúdo, testes,
configuração e documentação.

```
gold-tour/
├─ app/               layout (fontes, metadata, viewport), error, not-found,
│                     loading, design-system/ (interno, 404 em produção)
├─ components/ui/     button, field, card, badge, sheet-demo
├─ content/           schema.ts (Fact<T>), site-content.ts (dados com fonte)
├─ lib/               utils.ts, whatsapp.ts
├─ tests/             setup + 10 testes; e2e/ vazio (Playwright configurado)
├─ docs/              12 documentos
├─ public/            apenas os SVG do scaffold
└─ .env.example · next.config.ts · vitest.config.mts · playwright.config.ts
```

Rotas existentes: `/` (ainda a página do scaffold) e `/design-system`.

## Verificação (Etapa 04)

| Verificação | Resultado |
|---|---|
| `npm ci` reproduzível | lockfile íntegro |
| `npm run dev` | sobe em `:3010`, sem erro de console |
| `npm run lint` | limpo |
| `npm run typecheck` | limpo, com strict endurecido |
| `npm run test` | 10 testes, 2 arquivos, todos passando |
| `npm run build` | verde, 3 rotas estáticas |
| `npm run format:check` | tudo formatado |

## Bloqueadores por etapa

| Etapa | Bloqueio |
|---|---|
| 05 | nenhum — pode começar |
| 06 | B-16 (importar o vídeo do Farol da Barra) |
| **07** | **B-02 — sem o número de WhatsApp não existe caminho de conversão** |
| 08 | B-01, B-03, B-04, B-12, B-13 — 2 de 4 veículos sem imagem publicável |
| 09 | B-17 — nenhum detalhamento operacional de serviço |
| 11 | B-06, B-07, B-08, B-11, B-15 — footer, legal e FAQ vazios |
| 13 | B-09 — domínio e hospedagem |

Lista completa em `content-needs.md`.

## Riscos residuais

1. **`postcss` vulnerável dentro do Next.** `npm audit` aponta 1 alta e 1
   moderada em `next/node_modules/postcss`. É dependência de build, não vai
   para o cliente, e a única correção oferecida pelo npm é rebaixar o Next para
   a v9 — recusada. Depende de release do Next; reavaliar na Etapa 13.
2. **Logo inutilizável em produção.** Só existe a prancha achatada, sem alfa e
   sem vetor. O header da Etapa 05 vai precisar de uma solução interina
   documentada até B-05 chegar.
3. **A marca é uma proposta.** O caderno diz "PROPOSTA PARA RENAN" (C-01, C-03).
   Se não for a identidade adotada, os tokens da Etapa 03 mudam.
4. **Voz da marca em aberto** (C-04): copy-base sóbria foi mantida sobre a voz
   "VIP" do caderno; falta confirmação do proprietário.
5. **Playwright sem navegadores instalados.** `npx playwright install chromium`
   antes do primeiro `test:e2e`.

## Próxima ação

**Etapa 05 — shell, navegação e estrutura global.** O prompt já foi recebido e
está na fila, junto com os das Etapas 06 e 07. Nenhum deles foi executado.

Para destravar o caminho crítico, o que mais rende agora é receber: o **número
de WhatsApp** (B-02), a **logo em vetor ou PNG com transparência** (B-05) e a
confirmação sobre as **fotos dos veículos** (B-01).
