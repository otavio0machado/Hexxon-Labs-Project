# ADR-004 — AuditEvent append-only obrigatório

**Status:** Accepted — 2026-08-29

## Decisão

Comandos críticos criam AuditEvent append-only na mesma transação. O evento contém tenant, actor, alvo, ação estável, resultado, correlação e detalhes redigidos. Não há falha silenciosa de auditoria.

## Consequências

Maior rigor transacional e volume de dados, mas trilhas confiáveis para conformidade e investigação. Retenção, acesso e redaction exigem política específica; logs técnicos não substituem auditoria.

