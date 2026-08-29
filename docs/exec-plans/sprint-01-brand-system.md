# Sprint 01 — Brand system + design system

## Entrega

- Monorepo pnpm/Turborepo com três apps Next.js: marketing, platform preview e Design Lab.
- `@hexxon/brand` centraliza nome de trabalho, metadata, descrição e domínios.
- `@hexxon/design-tokens` entrega tokens CSS/TypeScript para paleta, semântica, spacing e radius.
- `@hexxon/ui` entrega primitives de interface e exemplo SVG Levey-Jennings não decisório.
- `apps/design-lab` é o ambiente equivalente a Storybook para inspeção isolada.

## Validação

- `pnpm lint` — aprovado.
- `pnpm typecheck` — aprovado nos seis workspaces.
- `pnpm build` — aprovado para marketing, platform e Design Lab.
- `pnpm test` — scripts executados; ainda não há casos automatizados.
- `git diff --check` — aprovado.

## Débitos técnicos explícitos

1. Introduzir testes unitários/visuais e axe para primitives interativas antes da primeira funcionalidade autenticada.
2. Substituir as famílias fallback por tipografias licenciadas/autohospedadas após validação de licença, legibilidade e performance.
3. Evoluir Dialog, Dropdown e Command Palette para primitives completas com focus trap, roving focus e atalhos globais ao adicionar comportamento de produção.
4. Adicionar navegação móvel e preferências de densidade quando o shell autenticado tiver rotas e estado real.
5. Converter o Design Lab em Storybook somente se a necessidade de documentação de variantes automatizada justificar a dependência adicional.

## Fora do escopo mantido

Nenhuma regra de CQ, dados clínicos, autenticação, tenancy, API, backend, integração, storage ou ação operacional foi implementada nesta sprint.

