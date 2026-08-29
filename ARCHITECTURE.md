# Arquitetura da Hexxon Labs

## Direção

A Hexxon inicia como **modular monolith** implantado como uma API Spring Boot, com PostgreSQL e aplicativos web independentes para marketing e plataforma. A separação é por módulos de domínio e contratos, não por serviços distribuídos. Extração futura de serviço só será considerada quando houver fronteira estável, equipe/escala independentes, telemetria e custo operacional que a justifiquem.

```text
Marketing Platform ──> hexxon.com.br
Hexxon Cloud
  Platform (Next.js) ──> app.hexxon.com.br ──> API (Spring Boot) ──> PostgreSQL
                                                ├─ object storage
                                                ├─ outbox/workers
                                                └─ integration adapters / AI adapters
```

`Hexxon Core` é transversal e fornece os mecanismos de plataforma; não se torna um "módulo deus" de regras laboratoriais. Cada produto mantém seu próprio modelo e invariantes, consumindo as capacidades do Core por contratos internos.

## Módulos e boundaries

| Módulo | Responsabilidade | Não é responsável por |
|---|---|---|
| Core | Organization, Site, User, Membership, RBAC, entitlements, auditoria, anexos, notificações e conexões | decisões de CQ, estoque ou manutenção |
| Enviro | pontos, leituras, faixas, exceções e evidências ambientais | interpretar OCR como verdade ou gerir equipamentos |
| Trace | catálogo configurável, lotes, movimentações e vínculos rastreáveis | decidir aprovação de CQ |
| QC | referências versionadas, medições, regras determinísticas, violações e séries | IA decisória ou relatórios institucionais |
| Asset | ativos, planos, ordens, calibrações e estado operacional | inventário de reagentes |
| Quality | eventos de qualidade, investigações, CAPA, documentos e assinaturas | substituir sistemas analíticos/LIS |
| Intelligence | análise assistiva, explicação, extração e recomendações | alterar qualquer estado de domínio sem comando humano autorizado |
| Integrations | conectores, mapeamentos, execução, retries e reconciliação | regra de negócio dentro de SDKs de terceiros |

Os módulos publicam eventos de domínio para a outbox transacional; consumidores internos podem materializar notificações, projeções, analytics e integrações. Comandos síncronos cruzam fronteiras apenas por uma API de aplicação explícita.

## Modelo de tenancy

- `Organization` é o cliente contratual e raiz de isolamento.
- `Site` representa uma unidade/instalação da organização; opera com timezone, endereços e configurações próprias.
- `User` é uma identidade global. `Membership` estabelece vínculo, escopo e estado por organização; papéis podem ser limitados a sites.
- O contexto de tenant é derivado do token/sessão e da membership ativa no backend. Trocar de organização exige reemissão/atualização controlada do contexto; não é um campo confiado ao cliente.
- Entidades tenant-owned contêm `organization_id` obrigatório. Dados operacionais que pertencem a uma unidade contêm também `site_id` obrigatório. Integridade, índices e RLS PostgreSQL formam defesa em profundidade.

Detalhes em [docs/architecture/multi-tenancy.md](./docs/architecture/multi-tenancy.md).

## Entidades de plataforma

| Entidade | Papel e invariantes principais |
|---|---|
| Organization | conta cliente; possui sites, memberships, políticas, assinatura e dados operacionais |
| Site | unidade de Organization; não atravessa organizações; timezone obrigatório |
| User | identidade humana global; e-mail normalizado e verificável; não recebe acesso sem Membership ativa |
| Membership | vínculo User–Organization, estado e escopo de sites; uma só membership ativa por par |
| Role | conjunto nomeado de permissions, versionável por organização; papéis do sistema são templates, não enums rígidos |
| Permission | capacidade estável no formato `resource:action`; concedida no servidor e nunca inferida da UI |
| Entitlement | direito comercial de uma Organization a módulo, limite ou recurso; não substitui RBAC |
| Subscription | estado comercial e período de cobrança; mudanças são auditáveis e provêm de integração de billing |
| AuditEvent | registro append-only de comando, ator, tenant, alvo, contexto, correlação e resultado |
| Attachment | metadados, classificação, owner e integridade de objeto externo; o binário não fica no banco |
| Notification | entrega de comunicação derivada de evento, com canal, estado e retries |
| Integration | conexão externa, credenciais por referência, mapeamento/versionamento e execução rastreável |

## Segurança, API, dados e IA

As normas obrigatórias estão em:

- [API e security model](./docs/architecture/api-and-security.md)
- [Banco, storage, observabilidade e analytics](./docs/architecture/data-storage-observability.md)
- [Especificação da fundação](./docs/product-specs/platform-foundation.md)

## Decisões registradas

1. [ADR-001 — modular monolith](./docs/adr/ADR-001-modular-monolith.md)
2. [ADR-002 — tenant context e RLS](./docs/adr/ADR-002-tenant-context-and-rls.md)
3. [ADR-003 — RBAC e entitlements separados](./docs/adr/ADR-003-rbac-and-entitlements.md)
4. [ADR-004 — auditoria append-only](./docs/adr/ADR-004-audit-events.md)
5. [ADR-005 — PostgreSQL e object storage abstraído](./docs/adr/ADR-005-data-and-storage.md)
6. [ADR-006 — IA assistiva com governança](./docs/adr/ADR-006-assistive-ai.md)
7. [ADR-007 — contratos REST e outbox](./docs/adr/ADR-007-api-contracts-and-outbox.md)

