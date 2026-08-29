# ADR-001 — iniciar com modular monolith

**Status:** Accepted — 2026-08-29

## Contexto

A Hexxon precisa de velocidade de descoberta e fronteiras claras, sem o custo operacional prematuro de serviços distribuídos.

## Decisão

Uma API Spring Boot implantável, organizada por módulos de domínio com contratos internos, ownership de dados e outbox transacional. Apps web são deployáveis separadamente. Extrações exigem ADR posterior e evidência de necessidade.

## Consequências

Transações e observabilidade são mais simples no início. A disciplina de boundaries é obrigatória para impedir um monólito acoplado e manter extrações futuras viáveis.

