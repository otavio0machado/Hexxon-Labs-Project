# Marketing Platform — Sprint 02

## Escopo entregue

`apps/marketing` contém a landing institucional e as rotas estáticas de produto:

- `/`
- `/products/enviro`
- `/products/trace`
- `/products/qc`
- `/products/asset`
- `/products/quality`
- `/products/intelligence`

A landing cobre navbar, hero, visualização de plataforma, grafo de qualidade, problema, produtos, Intelligence, rastreabilidade, segurança, integrações, CTA, contato e footer. Não há integrações comerciais ou coleta real de leads nesta sprint; o formulário identifica explicitamente que é uma demonstração visual.

## Conteúdo e i18n

O conteúdo variável de hero e produtos fica em `src/content/pt-BR.ts`, com `locale` explícito e um barrel de conteúdo. Novos idiomas devem adicionar módulos de mesmo contrato e uma decisão de routing (`/[locale]` ou domínio) antes de publicação internacional. Não introduzir strings de produto com nome institucional fora de `@hexxon/brand`.

## SEO e performance

- Metadata base, title template, Open Graph e OG image gerada em runtime.
- `sitemap.xml`, `robots.txt`, canonical por página de produto e JSON-LD Organization.
- As seis páginas de produto são SSG por `generateStaticParams`.
- O Quality Graph é um client component lazy-loaded; o restante da página é Server Component/CSS, sem imagens externas ou bibliotecas visuais pesadas.
- Sem logos, números de clientes, certificações ou depoimentos não verificáveis.

## Acessibilidade

Estrutura semântica, navegação com links, foco compartilhado do design system, formulário com labels, feedback `aria-live`, grafo com botões e estado `aria-pressed`, e motion reduzido via `prefers-reduced-motion`.

## Débitos técnicos

1. Conectar contato a um provedor aprovado, com consentimento, anti-abuso e retenção de dados antes de publicar.
2. Adicionar testes E2E, SEO snapshot e auditoria automatizada axe/Lighthouse.
3. Definir estratégia definitiva de rotas/locales e traduzir a totalidade da copy antes de expor outro idioma.
4. Validar tracking/analytics somente após definição de base legal, consentimento e política de privacidade.
5. Executar revisão visual manual em browsers/dispositivos de destino antes do deploy público.

