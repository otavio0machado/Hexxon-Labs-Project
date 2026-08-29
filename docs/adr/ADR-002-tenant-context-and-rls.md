# ADR-002 — tenant context confiável e RLS

**Status:** Accepted — 2026-08-29

## Decisão

Usar Organization como raiz de tenancy, Site como escopo operacional, `TenantContext` derivado de identidade/membership no backend e Row-Level Security PostgreSQL em tabelas tenant-owned. O cliente não determina tenant por parâmetro.

## Consequências

Todos os casos de uso, workers e migrations precisam carregar escopo. Há custo de testes e operações de banco, compensado por defesa em profundidade contra o risco central de vazamento entre clientes.

