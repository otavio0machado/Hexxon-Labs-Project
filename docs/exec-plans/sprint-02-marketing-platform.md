# Sprint 02 — Landing Page da Hexxon Labs

## Resultado

Landing premium PT-BR implementada em `apps/marketing`, com experiência dark scientific/editorial, páginas individuais para os seis produtos e um Quality Graph interativo que evidencia relações entre CQ, lote, equipamento, manutenção, temperatura e evento de qualidade.

## Decisões

- Nenhuma foto stock ou elemento clínico genérico: as visualizações são SVG/CSS leves e próprias.
- Copy conceitual onde não há evidência comercial. Não foram incluídos clientes, depoimentos, métricas, certificações ou promessas regulatórias.
- IA aparece como assistência contextual; nenhuma copy sugere decisão clínica autônoma.
- Grafo é carregado sob demanda e respeita `prefers-reduced-motion` fornecido pelos tokens.

## Validação

- `pnpm --filter @hexxon/marketing build` — aprovado, incluindo landing, OG image, sitemap, robots e seis rotas SSG.
- `pnpm lint` — aprovado.
- `pnpm typecheck` — aprovado.
- `pnpm test` — scripts executados; não há testes automatizados ainda.
- `git diff --check` — aprovado.

## Débitos

Os débitos técnicos e de publicação estão em [Marketing Platform](../product-specs/marketing-platform.md).

