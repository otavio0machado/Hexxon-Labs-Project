# Hexxon Labs — guia de engenharia

## Missão desta base

Hexxon Labs é uma plataforma SaaS B2B para Quality Operations de laboratórios clínicos. Este repositório constrói um produto independente, multi-tenant e auditável. O Bio-Java-Codex é um design partner e referência de domínio, nunca uma base de código a ser copiada.

## Regras inegociáveis

- A regra de negócio crítica vive no backend. O frontend apenas coleta, apresenta e orquestra a experiência.
- O tenant é resolvido a partir de contexto autenticado e vínculo de membership; nunca de um `organizationId` enviado pelo navegador.
- Todo dado de negócio tenant-owned tem `organization_id`, escopo de site quando aplicável, índices compostos e política de acesso no banco.
- Operações críticas criam `AuditEvent` imutável na mesma transação do comando de domínio. Falha de auditoria bloqueia o comando.
- IA é assistiva: pode extrair, explicar, resumir e sugerir; não pode liberar/reprovar CQ, alterar registros nem executar ações.
- Não há exclusão física de dados regulatórios. Correções são novos eventos, versões ou arquivamento com motivo e ator.
- Não hardcode nomes de laboratórios, unidades, equipamentos, fabricantes, permissões, ranges ou catálogos do Biodiagnóstico.
- Nome, logotipo textual, metadata e textos institucionais ficam centralizados em `packages/brand` quando o monorepo for criado.

## Arquitetura e limites

Leia [ARCHITECTURE.md](./ARCHITECTURE.md) antes de alterar contratos, dados, segurança ou limites de módulos. ADRs em `docs/adr/` são decisões vigentes; novas decisões relevantes exigem um ADR.

O início é um modular monolith: `apps/api` é o único backend implantável e contém módulos internos com APIs de aplicação explícitas. Um módulo não acessa repositórios ou entidades internas de outro módulo; comunica-se por contratos internos e eventos de domínio/outbox.

## Organização do trabalho

1. Classifique a mudança: pequena/média/grande e não crítica/crítica.
2. Para domínio laboratorial, consulte o Bio-Java-Codex localmente em modo somente leitura e registre a classificação REUSE, ADAPT, REWRITE ou DISCARD em `docs/architecture/bio-java-codex-assessment.md`.
3. Para mudanças críticas, defina invariantes, autorização, auditoria e testes antes da implementação.
4. Atualize contratos e documentação na mesma mudança que altera comportamento.
5. Ao fechar uma sprint, execute testes, lint, typecheck e build existentes; documente comandos, resultados e débitos. Não invente sucesso para ferramentas que ainda não existem.

## Convenções técnicas iniciais

- Frontend: Next.js, TypeScript, React, Tailwind, componentes próprios sobre primitives robustas, TanStack Query quando houver estado remoto, React Hook Form + Zod para formulários.
- Backend: Java/Spring Boot, Spring Security, Bean Validation, JPA/Hibernate e PostgreSQL.
- APIs: REST JSON versionada sob `/v1`, problem details RFC 9457, cursores para coleções grandes e `Idempotency-Key` para comandos repetíveis.
- Identificadores: UUID/UUIDv7 (a confirmar na Sprint 01); horários em UTC/`timestamptz`; datas operacionais com timezone explícito do site.
- Dependências externas entram por adapters; módulos de domínio não importam SDKs de provedores.

## Segurança e dados

- Segredos somente em secret manager/variáveis de ambiente; jamais em commits, prompts, logs ou auditoria.
- Dados de saúde e anexos recebem classificação e retenção definida por organização e contrato. Princípio de mínimo privilégio, MFA para papéis privilegiados e trilha de auditoria pesquisável.
- Toda consulta e mutação deve passar por tenant context. Testes devem provar isolamento entre organizações, inclusive em identificadores adivinhados.

## Bio-Java-Codex

- Fonte local consultada nesta sprint: `/Users/otaviodasilvamachado/Desktop/Bio Java Codex`, commit `a6aeb1e3731112d3086f5b75cee94cbfb87df196`, sincronizado com `origin/main` em 29/08/2026.
- É estritamente somente leitura neste trabalho. Não modifique, mova, gere migrations, faça commit ou push naquele repositório.
- Preserve conhecimento de domínio; reavalie implementação, acoplamentos e riscos antes de reutilizar qualquer conceito.

