# Dados, storage, observabilidade, analytics e integrações

## PostgreSQL e migrations

PostgreSQL é o banco transacional canônico. JPA/Hibernate mapeia cada módulo, mas migrations são a autoridade do schema. Supabase é aceitável como PostgreSQL/storage gerenciado se cumprir requisitos de região, backup, acesso de rede e RLS; o código não deve importar SDKs Supabase fora de adapters de infraestrutura.

Backups são testados por restauração periódica. Dados regulatórios usam retenção e preservação configurável por Organization; não há hard delete por API de produto. Particionamento é considerado para `audit_events`, telemetria e séries de alta cardinalidade apenas com métricas que o justifiquem.

## File storage

Interface `ObjectStorage` permite S3-compatible/Supabase Storage sem vazamento no domínio. Objetos recebem chave não enumerável baseada em tenant, hash SHA-256, content type validado, limite de tamanho, análise antimalware e retenção. Metadados ficam no banco; URLs assinadas são de curta duração e emitidas após nova autorização.

## Observabilidade

OpenTelemetry é a convenção: traces, métricas e logs estruturados transportam `requestId`, `correlationId`, `organizationId` pseudonimizado, módulo e versão — sem conteúdo clínico, tokens, prompts completos ou anexos. Dashboards acompanham latência, erro, saturation, jobs/outbox, autenticação, autorização negada e auditoria falha. Alertas têm runbook e proprietário.

## Analytics

Analytics operacional é derivado de eventos e projeções de leitura; não é fonte de verdade para regra clínica. Métricas de produto usam dados minimizados, consentimento/base legal aplicável e retenção definida. Nunca compartilhar sinais cross-tenant em benchmark sem agregação, limiar de anonimato e aprovação jurídica/comercial.

## Integrações

Arquitetura integration-first significa contratos estáveis, webhooks assinados, polling com cursor, retries exponenciais, DLQ, idempotência e reconciliação; não significa acoplamento a um fornecedor. Credenciais ficam em vault/secret manager e `Integration` guarda apenas referência. Cada conector declara escopo, mapeamento, erros e capacidade de replay seguro.

