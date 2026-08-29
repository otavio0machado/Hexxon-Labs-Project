# Bio-Java-Codex → Hexxon: assessment de migração

## Fonte e método

Consulta realizada em modo somente leitura no repositório local `/Users/otaviodasilvamachado/Desktop/Bio Java Codex`, commit `a6aeb1e3731112d3086f5b75cee94cbfb87df196`, sincronizado com `origin/main` em 29/08/2026. Foram analisados serviços, entidades, controladores, testes e planos de CQ, reagentes, temperatura, manutenção, auditoria, permissões, IA, relatórios, importações e autenticação.

Classificação: **REUSE** = conceito/artefato genérico e comprovado; **ADAPT** = capacidade válida que exige tenancy, contrato ou generalização; **REWRITE** = regra/conceito preservado com nova implementação; **DISCARD** = não pertence ao produto-alvo.

| Bio-Java-Codex capability | Destino Hexxon | Decisão | Justificativa | Riscos a tratar |
|---|---|---|---|---|
| `QcService` — registro, cálculo de CV/Z-score/status e histórico | Hexxon QC / Measurement Decision | REWRITE | Decisão no backend e persistência de violações são corretas; serviço atual depende de nomes, defaults e dados single-lab | Sem tenant/site, deletes físicos e defaults `Normal`/CV 10; validar semântica clínica por configuração versionada |
| `WestgardEngine` — 1-2s, 1-3s, 2-2s, R-4s, 4-1s, 10x | Hexxon QC / Rules Engine | ADAPT | Motor determinístico, testável e separado é uma boa fronteira | Janela, escopo de série, regras habilitadas e versão de política devem ser explícitos por contexto e revisados por especialista |
| `QcReferenceService` — referência por exame, área, nível, lote e vigência | Hexxon QC / Reference Policy | ADAPT | Seleção explícita e rejeição de ambiguidade são conhecimento forte | Sobreposição atual ignora dimensão de lote na regra de overlap; referências devem ser imutáveis/versionadas e tenant/site scoped |
| `DriftDetector` — regressão e runs preventivos | Hexxon Intelligence / Operational Signals | REWRITE | Separar alerta preventivo de Westgard e excluir rejeições é uma boa intenção | Heurísticas e thresholds não são decisão clínica universal; exigir política versionada, validação e explicabilidade |
| `ReagentService` e `StockMovement` | Hexxon Trace / Lots & Movements | ADAPT | Movimentação, validade, arquivamento e auditoria são capacidades reutilizáveis | Status/nomes/categorias e migration flags são legados; ligação com CQ por nome/lote é fraca; hard delete não é aceitável |
| `TemperatureService` com fotos e OCR | Hexxon Enviro / Evidence Capture | REWRITE | Leitura por ponto, faixa e evidência visual resolvem problema real | OCR deve ser sugestão, com confiança/revisão; faixas, períodos e localizações configuráveis; anexos seguros e imutáveis |
| `MaintenanceService` | Hexxon Asset / Maintenance | REWRITE | Plano, execução e vencimento de manutenção são domínio válido | Equipamento é string e status é inferido em memória; falta asset id, plano, evidência, auditoria e isolamento |
| `AuditService`/`AuditLog` | Hexxon Core / AuditEvent | REWRITE | JSON de detalhes e ator são ponto de partida conceitual | Log falha silenciosamente, não carrega tenant/correlação de forma completa e não é política append-only suficiente |
| `PermissionCatalog` + `User` enum roles | Hexxon Core / RBAC | REWRITE | Permissões atômicas e implicações são úteis | Módulos, labels e roles estão hardcoded para Biodiagnóstico; não há membership/organization/site/entitlement |
| `AiService`, `AiProvider`, router e prompts | Hexxon Intelligence / AI Gateway | ADAPT | Abstração de provedor, roteamento, limites e avisos assistivos são base saudável | Prompts possuem catálogos e nomes locais; faltam consentimento, retenção, versionamento de output, custo por tenant e aprovação de dados |
| Reports V2, hashes e assinaturas | Hexxon Quality / Reporting Evidence | ADAPT | Catálogo de geradores, execução, hash e verificação são conceitos fortes | Templates e rótulos locais; assinatura, retenção e força probatória requerem especificação e avaliação regulatória próprias |
| `ImportRunService` e importação de CQ | Hexxon Core / Import Framework + QC adapter | ADAPT | Registro de execução, modos e contagens é reutilizável | Username sem tenant e erros textuais são insuficientes; usar arquivo, schema versionado, linha/erro estruturados, idempotência e replay |
| JWT stateless, refresh e method security | Hexxon Core / Identity adapter | ADAPT | Proteções de rota, refresh e rate limit mostram capacidades úteis | Arquitetura é single-tenant e auth próprio; adotar OIDC/OAuth com claims de membership, MFA e rotação/revogação governadas |
| `LabSettings` singleton | Configuração organizacional | DISCARD | Resolve uma instalação, não um SaaS | Singleton e campos locais não generalizam; substituir por políticas versionadas de Organization/Site |
| Controllers que retornam entidades/listas e filtros em memória | API Hexxon | DISCARD | Não é contrato SaaS adequado | Vazamento de modelo, paginação/desempenho, exposição involuntária e ausência de scoping |

## Conhecimento de domínio preservado

- Status crítico deve resultar de uma decisão canônica no backend, com referência, série histórica e violações rastreáveis.
- Referência de CQ depende de contexto e vigência; ambiguidade é erro operacional, não uma escolha arbitrária do frontend.
- Levey-Jennings, Westgard, tendências, reagente, manutenção e ambiente devem apresentar evidência e manter suas correlações como hipótese, não causalidade.
- Registros de importação e relatórios precisam ser reproduzíveis, verificáveis e atribuíveis.

## Legados/débitos que não migram

- Modelo single-lab: usuários, `LabSettings` singleton, roles e permissões fechados e ausência de `organization_id`/`site_id`.
- Strings clínicas/operacionais hardcoded (`Normal`, CV padrão, áreas, tipos de manutenção, labels de módulos) como regra global.
- Hard deletes para CQ, referência, manutenção e lote; auditoria best-effort que apenas registra warning se falhar.
- Relações por strings (nome de equipamento, exame e lote) onde o novo modelo requer ids e vínculo explícito.
- Mistura de autorização por role e authority em expressões extensas, além de aliases históricos de permissões.
- Rate limits em memória e detalhes de importação resumidos como texto, insuficientes em ambiente distribuído/auditável.

## Observação regulatória

Esta análise não certifica conformidade clínica/regulatória nem afirma que thresholds atuais são universalmente corretos. Antes de disponibilizar regras de CQ, o conjunto de políticas, validação, versionamento e evidências deve ser aprovado por responsável técnico e revisão regulatória aplicável.

