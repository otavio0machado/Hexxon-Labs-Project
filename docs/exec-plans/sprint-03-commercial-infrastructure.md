# Sprint 03 — Leads, contato e infraestrutura comercial

## Entregue

- API Spring Boot/PostgreSQL em `apps/api` com migration para ContactLead e MarketingEvent.
- Formulário de contato conectado ao endpoint, com campos comerciais mínimos, UTMs, honeypot, validação client/server e feedback acessível.
- Painel interno `/internal/leads`, protegido por token de backend, para consulta e atualização de status.
- Analytics de baixo impacto e porta de integração CRM/notificação.

## Validação

- `mvn -q -f apps/api/pom.xml test package` — aprovado, incluindo teste de honeypot.
- `pnpm lint`, `pnpm typecheck`, `pnpm build` e `pnpm test` — aprovados.
- `git diff --check` — aprovado.

## Decisões

O sistema não usa e-mail de contato no frontend. Notificação e token administrativo são configuração de backend. Não há CRM ou webhook ativo sem configuração explícita.
