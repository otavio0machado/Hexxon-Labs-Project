# Multi-tenancy e isolamento

## Modelo

O modelo é **shared database, shared schema, row-scoped tenancy**, com `organization_id` obrigatório nas tabelas pertencentes a clientes e `site_id` obrigatório onde a operação é local. Cada foreign key para entidade tenant-owned deve impedir atravessamento de organização — por chaves compostas ou validação transacional explícita protegida por testes.

## Contexto confiável

1. O provedor de identidade autentica o usuário.
2. O backend resolve a membership ativa e a organização/site selecionados a partir de claims assinadas ou sessão controlada.
3. Um `TenantContext` request-scoped contém `organizationId`, `membershipId`, sites permitidos, user id, request/correlation id e atributos necessários de autorização.
4. Repositórios e serviços recebem o contexto; controllers nunca aceitam tenant como fonte de verdade.
5. O banco recebe `app.organization_id` em cada transação e políticas RLS rejeitam leitura/escrita fora do escopo.

Headers ou campos como `X-Organization-Id` podem servir para solicitar troca de contexto, mas são validados contra memberships do token antes de estabelecer uma transação. Eles jamais filtram dados por si só.

## Estratégia de banco

- PostgreSQL com migrations versionadas (Flyway é a escolha inicial).
- `organization_id` NOT NULL; índices iniciam por `organization_id` e acrescentam `site_id`, estado/data ou chave de consulta relevante.
- RLS aplicada para tabelas tenant-owned. O runtime usa papel de aplicação sem `BYPASSRLS`; jobs usam role separada, escopo explícito e trilha de auditoria.
- Constraints impedem chaves órfãs, duplicidade de membership e associação de site a outra organização.
- Testes de integração criam duas organizações e provam que read, update, delete, export, attachment e eventos não cruzam fronteiras.

## Contextos especiais

- Suporte/impersonação requer concessão temporária, motivo, aprovação/política e `actor` distinto de `subject` no AuditEvent.
- Workers/outbox carregam organização e causação do evento. Não podem executar consultas sem escopo.
- Analytics trabalha com dados minimizados e agrega por tenant; qualquer visão cross-tenant exige base legal e aprovação explícita, fora do fluxo operacional.

