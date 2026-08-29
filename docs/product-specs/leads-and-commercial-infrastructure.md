# Leads, contato e infraestrutura comercial

## Fluxo

O formulário de marketing envia `POST /v1/marketing/leads` para a API Spring Boot através do rewrite Next `/api/*`. `ContactLead` é persistido no PostgreSQL por migration Flyway e começa em `NEW`. O painel interno em `/internal/leads` consulta e atualiza o status via endpoints autenticados por token de ambiente.

Campos persistidos: `id`, nome, e-mail profissional, telefone, laboratório, cidade, estado, porte, número de unidades, interesse, mensagem, source, UTMs, criação, status, assignedTo e notes. A API recebe `phone`, `city`, `organizationSize`, `assignedTo` e `notes` mesmo quando a primeira versão pública do formulário não os solicita.

## Proteções

- Bean Validation no backend, limites de tamanho e enumerações fechadas.
- Sanitização server-side com Jsoup safelist vazia e normalização de espaços.
- Honeypot `website`, invisível para pessoas; tentativa preenchida é recusada.
- Limite por IP: cinco leads por 15 minutos; eventos recebem limite separado de 120 por 15 minutos.
- Formulário público não usa cookie de autenticação, portanto CSRF token não se aplica. Admin usa `Authorization: Bearer` e o browser não o envia automaticamente; CORS limita origens configuradas.
- Token do painel não é hardcoded nem persistido pelo frontend. `MARKETING_ADMIN_TOKEN` é obrigatório para leitura/escrita administrativa.

O limitador atual é local à instância. Antes de escalar horizontalmente, trocar por Redis ou equivalente distribuído, preservando a interface.

## Analytics preservando privacidade

Eventos persistidos: `MARKETING_PAGE_VIEW`, `PRODUCT_VIEW`, `CTA_CLICKED`, `CONTACT_STARTED` e `CONTACT_SUBMITTED`. O navegador usa um UUID por sessão em `sessionStorage`, sem cookies, fingerprinting ou enriquecimento de perfil. A API recebe caminho, produto opcional, source e identificador efêmero; o evento não carrega os campos do lead.

## Integrações e notificações

`LeadIntegrationProvider` é a porta para adapters futuros de HubSpot, Pipedrive ou Salesforce. A implementação atual é no-op e registra somente o id do lead. O `CommercialLeadNotificationService` pode entregar uma notificação ao webhook configurado por `COMMERCIAL_NOTIFICATION_WEBHOOK_URL`; a URL nunca passa pelo frontend. Falhas de CRM/notificação não descartam o lead persistido e devem ganhar outbox/retry na evolução de produção.

## Operação local

1. Suba PostgreSQL: `docker compose -f infrastructure/docker-compose.yml up -d`.
2. Copie valores de `apps/api/.env.example` para o ambiente.
3. Rode `pnpm dev:api` e `pnpm --filter @hexxon/marketing dev`.
4. Abra `/internal/leads` e forneça o token configurado apenas na sessão atual.

## Débitos técnicos

1. Substituir token administrativo por OIDC/Membership/RBAC quando o Hexxon Core estiver implementado.
2. Implementar outbox, retry e observabilidade para CRM/webhook; provider atual não deve ser tratado como entrega garantida.
3. Trocar limite em memória por serviço compartilhado em produção.
4. Adicionar criptografia/classificação de PII, retenção e atendimento a solicitações LGPD antes de produção.
5. Criar testes de integração com PostgreSQL/Testcontainers, E2E do formulário e abuse testing.
