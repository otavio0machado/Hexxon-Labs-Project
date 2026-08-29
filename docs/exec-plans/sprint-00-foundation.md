# Sprint 00 — fundação e arquitetura

## Escopo concluído

- Avaliação read-only do Bio-Java-Codex como design partner.
- Definição de produto, módulos, boundaries, multi-tenancy, contratos, segurança, dados, storage, observabilidade, analytics, IA e integrações.
- Registro de ADRs e matriz explícita de migração.

Não foram implementados endpoints, schema, apps, autenticação, UI, integrações ou funcionalidades de produto.

## Decisões centrais

1. Modular monolith Spring Boot como ponto de partida.
2. Shared PostgreSQL com `organization_id`/`site_id`, tenant context derivado da membership e RLS como defesa em profundidade.
3. RBAC separado de entitlements comerciais.
4. Auditoria append-only obrigatória para comandos críticos.
5. Object storage abstraído e anexos governados; Supabase é infraestrutura opcional, não dependência de domínio.
6. IA apenas assistiva, com revisão humana e regras críticas determinísticas no backend.
7. REST versionado com RFC 9457, idempotência e outbox para eventos.

## Backlog priorizado

### P0 — Sprint 01: plataforma executável mínima

1. Materializar monorepo e toolchain (pnpm/Turborepo ou equivalente decidido e documentado), incluindo `packages/brand`, tokens e contratos.
2. Criar API Spring Boot modular com healthcheck, migration Flyway, Docker local e configuração por ambiente.
3. Implementar Organization, Site, User e Membership, TenantContext e primeiras migrations/índices/RLS.
4. Integrar OIDC/OAuth web e autorização mínima por permission, com testes negativos de cross-tenant.
5. Criar `AuditEvent` append-only e outbox transacional, com uma operação de exemplo auditável.
6. Configurar CI para testes, lint, typecheck, build, SAST/dependency scan inicial e verificação de migrations.

### P1 — após a fundação

1. Attachment/ObjectStorage com upload seguro e metadados auditáveis.
2. Catálogo/entitlements e Subscription adapter.
3. Contrato inicial de Hexxon QC: política de referência versionada, measurement e Rules Engine, validado com especialista.
4. Framework de importação rastreável e Integration framework.
5. Design system e shell da plataforma multi-site.

### P2 — condicionado a descoberta e design partners

1. Enviro, Trace e Asset com correlações explícitas por ids.
2. Relatórios/evidências verificáveis.
3. AI Gateway com governança, avaliação e custo por tenant.
4. Quality/CAPA e conectores externos.

## Riscos a gerenciar

| Risco | Mitigação inicial |
|---|---|
| Regras de CQ aparentemente corretas, mas sem validação universal | Política versionada, suíte de casos, especialista e responsável técnico antes de produção |
| RLS configurado incorretamente ou bypassado por job | Papel sem `BYPASSRLS`, testes de integração, tenant context obrigatório e revisão de migration |
| Escopo excessivo por sete módulos | Fatiar por Core + fluxo piloto de QC; manter boundaries sem construir todos os módulos |
| IA interpretada como decisão clínica | Guardrails de produto/API, confirmação humana, logs/redação e comunicação explícita |
| Lock-in em infraestrutura | Portas para storage, identity, AI e integrations; Supabase apenas em adapter |
| Marca precisar mudar | `packages/brand` como fonte única ao materializar o monorepo |

## Critérios para iniciar a Sprint 01

- [ ] Aprovação deste direcionamento e dos ADRs pela fundação/produto.
- [ ] Escolha documentada de provedor de identidade, ambiente local e hospedagem inicial, ou autorização para iniciar com interfaces/adapters locais.
- [ ] Confirmação do recorte P0: Core multi-tenant antes de um módulo clínico.
- [ ] Responsável técnico disponível para validar política de CQ antes de qualquer engine de produção.
- [ ] Propriedade dos domínios, requisitos de LGPD/retention e modelo comercial mínimo identificados.
- [ ] Convenção para IDs, timezone operacional, roles de banco e CI aprovada ou explicitamente delegada à Sprint 01.

## Validação da Sprint 00

O repositório não possui código, manifests, linter, typechecker ou build configurados. Portanto não há comandos executáveis de teste/lint/typecheck/build nesta sprint documental. A validação aplicável é revisão de links Markdown, árvore e consistência dos ADRs.

## Bio-Java-Codex consulted

**Arquivos/componentes principais analisados:** `QcService`, `WestgardEngine`, `QcReferenceService`, `DriftDetector`, `ReagentService`, `TemperatureService`, `MaintenanceService`, `AuditService`, `PermissionCatalog`, `AiService` e `service/ai/*`, `ImportRunService`, entidades principais, `SecurityConfig`, controllers, testes e `PLANS.md`/documentação de transição.

**Conhecimento reaproveitado:** centralização de decisão determinística de CQ, referência vigente e não ambígua, persistência de violações, rastreabilidade de lote/movimento, evidência ambiental, relatório verificável e IA assistiva.

**Código reutilizado:** nenhum.

**Código adaptado:** nenhum nesta sprint; capacidades classificadas ADAPT estão documentadas para redesenho posterior.

**Conceitos reescritos:** tenancy, RBAC, auditoria, CQ como motor versionado, Enviro, Asset e contratos de API.

**Itens descartados:** singleton de laboratório, hardcodes do Biodiagnóstico, hard deletes em registros regulatórios, filtros/autorização single-tenant e acoplamentos por strings.

**Diferenças relevantes:** o Biodiagnóstico opera como uma instalação; Hexxon atende múltiplas organizações, sites, contratos, políticas e integrações sob isolamento obrigatório.

**Débitos do original não transferidos:** auditoria best-effort, ausência de tenancy, permissões/roles hardcoded, relações frágeis por texto, deletes físicos e limites em memória.

