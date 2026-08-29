# ADR-007 — REST versionado, problem details e outbox

**Status:** Accepted — 2026-08-29

## Decisão

Expor REST JSON em `/v1`, com RFC 9457, cursores e idempotência para comandos. Eventos internos/externos são publicados por outbox transacional com envelope versionado.

## Consequências

Clientes recebem contrato previsível e efeitos assíncronos não dependem de dual write. A equipe deve manter compatibilidade, consumidores idempotentes, DLQ/replay e monitoramento de lag.

