# Sprint 02.6 — Hexxon Visual Reset

## Resultado

A exploração editorial da Sprint 02.5 foi substituída por **Digital Laboratory Infrastructure**: sans moderna dominante, superfícies profundas em aubergine/graphite, geometria Hexxon em escala e demonstrações de produto como protagonistas.

## Sete movimentos

1. Hero com Hexxon Core pseudo-3D e seis domínios conectados.
2. Problema condensado em sinais fragmentados que convergem em contexto.
3. Hexxon Cloud com interface operacional demonstrativa em grande escala.
4. Product System com tabs e seis previews plausíveis.
5. Quality Graph sticky, progressivo por scroll e linear no mobile.
6. Intelligence e confiança integradas numa única demonstração.
7. Built with laboratories, CTA e formulário numa conversão contínua.

## Preservação funcional

O reset ficou restrito ao marketing visual. Rotas, metadata, JSON-LD, sitemap, robots, páginas de produto, analytics, painel interno e rewrite da API foram preservados. O formulário mantém `POST /api/v1/marketing/leads`, nomes de campos, UTM, `source`, eventos `CONTACT_STARTED` e `CONTACT_SUBMITTED`, honeypot e todos os estados comerciais. Backend, modelos, rate limiting, sanitização, persistência, notificações e integrações não foram alterados.

## QA visual

Foram executados três ciclos completos de navegador: baseline da Sprint 02.5, reset estrutural e refinamento. A inspeção cobriu 1440×900, 1280×832 e 390×844, hero antes/depois da montagem, troca de Product System, seleção no Quality Graph, navegação ativa, menu móvel e contato responsivo.

## Decisões de performance

- SVG/CSS e APIs nativas foram suficientes; nenhuma dependência de animação ou WebGL foi adicionada.
- O Quality Graph continua carregado sob demanda.
- Nenhuma fonte remota ou imagem pesada entrou no caminho crítico.

## Débitos técnicos

- Medir Core Web Vitals e Lighthouse em build de produção hospedado.
- Adicionar Playwright/axe para regressões de navegação, tabs, formulário e movimento reduzido.
- Trocar dados demonstrativos por contratos reais quando os módulos de produto forem implementados.
