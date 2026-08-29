# ADR-005 — PostgreSQL canônico e storage por porta

**Status:** Accepted — 2026-08-29

## Decisão

PostgreSQL é a fonte transacional, com Flyway como autoridade de schema. Anexos ficam em object storage via interface própria; Supabase pode ser provedor gerenciado de Postgres/storage, sem SDKs no domínio.

## Consequências

Há independência razoável de fornecedor e migrations auditáveis. Exige adapters, backup/restauração testados, RLS e política de acesso/retention a arquivos.

