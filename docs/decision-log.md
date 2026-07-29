# Gold Tour — registro de decisões

Somente decisões já comprovadas, com fonte verificável. Decisões propostas mas
não confirmadas não entram aqui.

| ID | Data | Decisão | Fonte / evidência |
|---|---|---|---|
| D-001 | 2026-07-29 | O projeto web da Gold Tour vive em `C:\Users\Yago\OneDrive\Desktop\Dev\gold-tour`, versionado em `github.com/malaoh/Gold-Tour` (branch `main`). | Criado nesta sessão a pedido do proprietário; push confirmado. |
| D-002 | 2026-07-29 | Stack: Next.js 16.2.12 (App Router), React 19.2.4, TypeScript 5, Tailwind CSS 4, ESLint 9, npm. Sem `src/`, alias `@/*`. | `package.json`, `tsconfig.json`, `app/` — scaffold aprovado pelo proprietário antes do contrato. |
| D-003 | 2026-07-29 | `C:\Users\Yago\Downloads\GOLD TOUR` é pacote de mídia e referência, **não** o projeto web. Nenhum arquivo do usuário será movido de lá. | Auditoria da pasta: 7 `.mp4` + skill de UI/UX, nenhum projeto web. Confirma `GOLD_TOUR_DIRECAO_FINAL.md`. |
| D-004 | 2026-07-29 | Frota exibida terá exatamente 4 categorias: Corolla Executivo, Sprinter Executiva, Micro-ônibus Executivo, Doblò Executiva. | Contrato mestre §"FROTA CORRETA" + direção final. |
| D-005 | 2026-07-29 | `microonibus de luxo.webp` fica **vetado** para publicação. | 640×427 verificado por `ffprobe`; origem ligada a concorrente conforme direção final. |
| D-006 | 2026-07-29 | Chevrolet Spin não pode representar a Doblò Executiva nem "Mini Van Executiva". | Direção final §"Correções obrigatórias". |
| D-007 | 2026-07-29 | `Vehicles_stationary_slider_move_1080p_202607291051.mp4` não pode ser legendado como frota própria. | Frame inspecionado: Mercedes S/V/Sprinter com placas europeias, cenário urbano europeu. |
| D-008 | 2026-07-29 | `Forte_de_Santa_Maria_Porto_202607291117.mp4` só é publicável com recorte que elimine o equipamento de filmagem; caso contrário, descartado. | Frame inspecionado: monitor/rig visível na borda direita. |
| D-009 | 2026-07-29 | ~~Identidade visual oficial da Gold Tour é inexistente no material auditado.~~ **Superada por D-011** na Etapa 01, quando o proprietário forneceu o caderno de marca. | Varredura de `GOLD TOUR` e `02-Imagens` na Etapa 00. |
| D-010 | 2026-07-29 | Documentação do projeto vive em `docs/` no repositório, versionada junto com o código. | Etapa 00. |
| D-011 | 2026-07-29 | A identidade Gold Tour existe: selo circular GT, wordmark serifado e paleta Grafite/Ouro Champagne/Off-White/Azul Marinho. Substitui o fallback da direção final em 4 dos 7 papéis de cor. | Caderno de marca, p. 03, enviado pelo proprietário. |
| D-012 | 2026-07-29 | Criado um segundo dourado, `--color-gold-ink` `#7A5F28`, para texto e ação em fundo claro. | O Ouro Champagne tem 2,06:1 sobre o Off-White, medido por script; reprova AA e reprova o mínimo de 3:1 para gráficos. |
| D-013 | 2026-07-29 | Botão primário é ouro com texto grafite (7,36:1), igual nos dois temas. | Medição de contraste; evita que o CTA mude de cor a cada seção. |
| D-014 | 2026-07-29 | A copy-base da direção final foi mantida; a voz "VIP/prestígio/experiência memorável" do caderno **não** foi adotada como voz do site. | O caderno é uma proposta e o contrato mestre proíbe superlativos vazios. Registrado como C-04 para confirmação. |
| D-015 | 2026-07-29 | Tema escuro aplicado por seção via classe `.gt-dark`, não por `prefers-color-scheme`. Não haverá alternador de tema. | A alternância claro/escuro é composição editorial, não preferência do visitante. |
| D-016 | 2026-07-29 | Stack mantida sem migração: Next.js 16 App Router, React 19, TypeScript strict, Tailwind 4. Sem CMS, autenticação, banco ou pagamento. | Projeto saudável na auditoria (build, typecheck e lint limpos); nada no escopo exige essas camadas. |
| D-017 | 2026-07-29 | Animação em CSS puro. GSAP **não** adotado. | A narrativa prevista (revelar seção, cross-fade, bottom sheet) é resolvível em CSS; o contrato pede motion curto e funcional. |
| D-018 | 2026-07-29 | Família de ícones única: Phosphor, com Heroicons como reserva. | Recomendação da UI/UX Pro Max; traço fino compatível com a marca. |
| D-019 | 2026-07-29 | `/passeios/[slug]` adiada e `/termos` condicionada a conteúdo real. | `tours` está vazio e não há termos redigidos; criar as rotas agora exigiria inventar conteúdo. |
| D-020 | 2026-07-29 | Nenhum analytics instalado. | Sem autorização registrada (B-14). |
| D-021 | 2026-07-29 | Overlays usam `<dialog>` nativo. | Foco preso, `Esc` e retorno de foco vêm do navegador, sem biblioteca e sem reimplementar acessibilidade. |
| D-022 | 2026-07-29 | `sharp` fixado em `^0.35.3` por `overrides`. | Quatro CVEs de libvips na versão trazida pelo Next; a correção automática rebaixaria o Next para a v9. |
