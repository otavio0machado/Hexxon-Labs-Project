# ADR-003 — RBAC separado de entitlements

**Status:** Accepted — 2026-08-29

## Decisão

Permissions autorizam pessoas; Entitlements autorizam a Organization a consumir produto/limite. Roles são conjuntos versionáveis de permissions, com templates de sistema, e Membership define seu escopo.

## Consequências

Evita transformar plano comercial em permissão administrativa e impede transportar os enums específicos do Biodiagnóstico. Exige avaliador de autorização central e UI que exponha motivos distintos de bloqueio.

