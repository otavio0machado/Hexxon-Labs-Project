# Hexxon Labs

Plataforma SaaS B2B para operações de qualidade, rastreabilidade, conformidade e inteligência operacional em laboratórios clínicos.

> Estado: Sprint 01 — brand system e design system implementados. As telas são superfícies de referência visual, não funcionalidades de produto conectadas a dados reais.

## Produtos planejados

- **Hexxon Core** — identidade, organização, sites, autorização, auditoria, anexos, notificações, integrações e entitlements.
- **Hexxon Enviro** — monitoramento e evidências ambientais.
- **Hexxon Trace** — rastreabilidade de reagentes, lotes e movimentações.
- **Hexxon QC** — controle de qualidade, referências, regras determinísticas e tendências.
- **Hexxon Asset** — equipamentos, planos e registros de manutenção.
- **Hexxon Quality** — não conformidades, CAPA, documentos e evidências.
- **Hexxon Intelligence** — análises assistivas por IA e insights operacionais.

## Estrutura proposta

```text
apps/
  marketing/       # hexxon.com.br
  platform/        # app.hexxon.com.br
  api/             # api.hexxon.com.br — Spring Boot modular monolith
packages/
  brand/           # nome, logo textual, metadata e textos institucionais
  ui/
  design-tokens/
  contracts/
  shared/
docs/
  company/ product-specs/ design/ architecture/ adr/ exec-plans/
infrastructure/
```

O monorepo foi materializado nesta Sprint 01. `apps/design-lab` é o ambiente isolado de inspeção dos componentes e exemplos.

## Documentação de partida

- [Arquitetura](./ARCHITECTURE.md)
- [Visão e posicionamento](./docs/company/overview.md)
- [Especificação da fundação](./docs/product-specs/platform-foundation.md)
- [Modelo multi-tenant](./docs/architecture/multi-tenancy.md)
- [API e segurança](./docs/architecture/api-and-security.md)
- [Dados, storage e observabilidade](./docs/architecture/data-storage-observability.md)
- [Avaliação do Bio-Java-Codex](./docs/architecture/bio-java-codex-assessment.md)
- [Plano da Sprint 00 e próximo backlog](./docs/exec-plans/sprint-00-foundation.md)
- [Design system](./docs/design/design-system.md)
- [Marketing Platform](./docs/product-specs/marketing-platform.md)
- [Leads e infraestrutura comercial](./docs/product-specs/leads-and-commercial-infrastructure.md)

## Tecnologia inicial

Next.js/TypeScript/React/Tailwind no frontend e Java/Spring Boot/PostgreSQL no backend. Supabase pode prover PostgreSQL e storage, mas não define modelos, autorização nem regras de domínio da Hexxon.

## Desenvolvimento local

```bash
docker compose -f infrastructure/docker-compose.yml up -d
pnpm dev:api
pnpm --filter @hexxon/marketing dev
```

Configure [apps/api/.env.example](./apps/api/.env.example) antes de acessar o painel interno de leads em `/internal/leads`.
