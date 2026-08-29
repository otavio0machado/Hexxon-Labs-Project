# Especificação — fundação de plataforma

## Objetivo

Definir o núcleo que permite produtos Hexxon seguros e multi-tenant sem antecipar a implementação dos módulos clínicos.

## Capacidades do Hexxon Core

### Identidade e acesso

- User global com autenticação, recuperação e proteção contra abuso.
- Membership por Organization, com estado `invited`, `active`, `suspended` ou `revoked` e escopo opcional de Sites.
- Role por Organization, composta de Permissions estáveis (`qc.measurement:create`, `trace.lot:archive`, por exemplo). Templates são iniciais e podem evoluir por política; roles do Biodiagnóstico não migram como enum.
- Autorização efetiva = identidade autenticada + membership ativa + escopo + permission + entitlement do produto. Negação é padrão.

### Comercial

Subscription representa contrato e ciclo comercial. Entitlement torna explícito quais módulos, limites e features uma Organization pode usar. Falha de entitlement não é falha de autenticação e deve retornar erro de negócio compreensível.

### Auditoria

`AuditEvent` é criado para comandos críticos com: organização/site, ator/impersonação, ação estável, tipo e id do alvo, antes/depois redigidos quando pertinente, motivo, correlação/causação, IP/user-agent quando legalmente permitido, resultado e timestamp UTC. Eventos não são editáveis nem apagáveis por rotinas de produto.

### Arquivos e anexos

`Attachment` armazena metadados, hash, mídia, tamanho, classificação, owner e retenção. Upload é direto ao storage por URL curta e escopo verificado no backend; confirmação do arquivo, antivírus/validação e associação à entidade são passos distintos. Acesso é por URL assinada curta, reautorizada.

### Integrações e notificações

`Integration` contém tipo, estado, escopo, configuração não secreta, referência de segredo, versão de mapeamento e telemetria. Execuções recebem idempotência, estado, tentativas, correlação e reconciliação. Notification é derivada de evento/outbox e nunca deve bloquear o comando clínico.

## Contrato de módulos

Cada módulo deve expor casos de uso de aplicação, contratos DTO e eventos publicados. Ele é dono de seu schema/tabelas. Outro módulo não consulta suas tabelas diretamente; usa API interna, projeção autorizada ou evento. O Core fornece serviços de tenant, autorização, auditoria e anexos, mas não conhece entidades clínicas.

## Critérios de aceitação para uma feature de produto

1. Define owner, escopo `organization`/`site`, autorizações e entitlements.
2. Explicita invariantes de domínio e como o backend os valida.
3. Define eventos de auditoria, anexos e retenção quando aplicável.
4. Descreve contratos REST, falhas e idempotência.
5. Possui testes de isolamento tenant, autorização e trilha crítica.
6. Declara se usa conhecimento do Bio-Java-Codex e sua classificação.

