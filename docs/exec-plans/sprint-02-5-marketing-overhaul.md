# Sprint 02.5 — Marketing Experience Overhaul

## Escopo entregue

- Linguagem visual Signal Lattice para hero, descoberta de produtos, Quality Graph e contato.
- Navegação móvel acessível com destinos antes ocultos.
- Ecossistema de produtos conectado, com links preservados para as seis páginas.
- Quality Graph espacial no desktop e sequência selecionável no mobile.
- Assinatura visual específica por página de produto, sem alterar roteamento, metadata ou analytics.
- Sistema de motion documentado com fallback completo para movimento reduzido.

## Preservação da Sprint 03

O componente de contato continua enviando `POST /api/v1/marketing/leads` com os mesmos nomes de campo, fonte, UTM, evento `CONTACT_STARTED`, evento `CONTACT_SUBMITTED`, honeypot `website` e sem e-mail comercial no frontend. Nenhum controller, modelo, validação, rate limit, persistência, painel interno, integração ou notificação comercial foi alterado nesta sprint.

## Débitos técnicos

- Rodar Lighthouse em ambiente de produção hospedado; o servidor de desenvolvimento não fornece métrica representativa.
- Adicionar Playwright/axe para regressões de teclado e acessibilidade do marketing.
- Substituir os SVGs conceituais por visualizações de produto alimentadas por contratos quando houver dados validados.
