# Convenções de API e modelo de segurança

## API

- Base: `/v1`; JSON UTF-8; nomes de campos `camelCase`; UUIDs como strings; timestamps ISO-8601 UTC.
- Coleções usam `limit` (máximo documentado) e cursor opaco; respostas retornam `items`, `nextCursor` e metadados mínimos.
- Criações e comandos externos aceitam `Idempotency-Key`; mesmo actor, tenant, rota e chave retornam o resultado original ou conflito explícito.
- APIs nunca expõem entidades JPA. Request/response contracts vivem em `packages/contracts` e são versionados por compatibilidade.
- Eventos assíncronos usam envelope com `eventId`, `type`, `occurredAt`, `organizationId`, `correlationId`, `causationId`, versão e payload minimizado.

## Erros

Erros seguem RFC 9457 (`application/problem+json`): `type`, `title`, `status`, `detail`, `instance`, `code`, `requestId` e, para validação, `errors[]` com campo e código. Não revelar existência de recursos fora do tenant; responder 404 ou 403 conforme política anti-enumeração documentada por endpoint. Nunca expor stack trace, SQL, segredo ou PII desnecessária.

## Security model

- OIDC/OAuth 2.1 com PKCE para aplicações web; tokens curtos e refresh rotacionado, revogável e protegido. A seleção de organização é validada no backend.
- MFA obrigatório para administradores, suporte com impersonação e operações de alto impacto, conforme rollout.
- Autorização no backend em cada caso de uso; UI esconde ações não permitidas, mas não é barreira de segurança.
- Rate limit e proteções contra brute force por rota, IP/identidade e tenant; limites de IA e integração são separados.
- TLS em trânsito, criptografia gerenciada em repouso, segredos por ambiente, SAST/dependency scanning e logs estruturados redigidos.
- Exclusão, exportação, assinatura, arquivamento e alteração de configuração exigem permission específica, motivo quando aplicável e AuditEvent.

## Regra de CQ e IA

Regras como Westgard, seleção de referência, determinação de status e necessidade de calibração são determinísticas, versionadas e executadas no backend. IA pode propor dados ou explicações, mas seu output deve ser marcado como assistivo, versionado e confirmado por usuário autorizado antes de virar dado de domínio.

