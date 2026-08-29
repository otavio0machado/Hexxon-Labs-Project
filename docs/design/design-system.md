# Hexxon Design System

## Propósito

O design system da Hexxon traduz operações laboratoriais em uma superfície de alta precisão: escura, editorial, legível e deliberadamente distante do visual hospitalar/healthtech genérico. Ele não é uma camada decorativa sobre dashboards comuns; prioriza estado, evidência, densidade controlada e relação entre sinais operacionais.

O sistema está materializado em:

```text
packages/brand/          # nome de trabalho, metadata e textos institucionais centralizados
packages/design-tokens/  # tokens TypeScript e CSS semânticos
packages/ui/             # primitives e componentes React
apps/design-lab/         # ambiente equivalente ao Storybook
apps/marketing/          # exemplo de marketing hero
apps/platform/           # exemplo de dashboard operacional
```

## Direção de marca

**Scientific Premium · Biotech Experimental · High precision · Dark scientific instrumentation · Editorial technology · Neo-Swiss with personality.**

O vocabulário é de sinal, instrumentação, evidência, grade, série e estado. A marca evita azul médico, teal/cyan, gradiente azul-verde, cruz médica, DNA/moléculas decorativas, stock de profissionais, superfícies excessivamente brancas, glassmorphism e cards SaaS intercambiáveis.

O nome ainda é variável. Toda cópia institucional está em `@hexxon/brand`; UI de produto usa rótulos de domínio, nunca concatena o nome institucional.

## Tokens

### Escalas base

| Família | Valores |
|---|---|
| Purple | `950 #180A24`, `900 #25102F`, `800 #35164A`, `700 #4B2167`, `600 #633487` |
| Lilac | `500 #9970D0`, `400 #B28AE1`, `300 #CDB0ED`, `200 #E0CEF5` |
| Signal green | `500 #A6D94F`, `400 #BDE66F`, `300 #D0EE96` |
| Moss | `900 #343D22`, `700 #596633`, `600 #6C7B3F`, `500 #7E8F4B` |
| Neutrals | `Ink #101012`, `Graphite #1C1B1F`, `Bone #F5F2EA`, `Off white #FAF8F4` |

O green é sinal operacional, não decoração e não recompensa gamificada. Purple delimita estrutura e profundidade, sem o brilho de uma interface crypto.

### Tokens semânticos

| Token | Uso |
|---|---|
| `--background` | canvas principal Ink |
| `--surface`, `--surface-raised`, `--surface-interactive` | planos de informação, nunca “vidro” translúcido indiscriminado |
| `--text-primary`, `--text-secondary`, `--text-tertiary` | hierarquia de leitura |
| `--border` | estrutura e separação discreta |
| `--brand-primary`, `--brand-secondary` | ação e sinal de marca |
| `--success`, `--warning`, `--danger`, `--info` | estado semântico — sempre acompanhado de texto/ícone |
| `--focus-ring` | foco visível, independente de estado semântico |

As cores de foreground principais foram verificadas contra Ink: Off white 17.92:1, text secondary 10.36:1, lilac 6.89:1, green 11.46:1, warning 11.77:1, danger 8.39:1 e info 9.98:1. Isso atende WCAG AA para texto normal nesses pares. Qualquer nova combinação deve ser testada antes de entrar no token semântico.

### Tipografia, espaço e forma

- Interface: system sans (`Arial`, Helvetica como fallback) por legibilidade e disponibilidade. A Sprint de produto pode introduzir uma família licenciada após teste de performance e licença.
- Display editorial: Georgia como fallback controlado, usada somente em títulos/valores de alta hierarquia; não em tabelas ou entrada de dados.
- Monospace: SF Mono/Consolas para IDs, atalhos e metadados técnicos.
- Espaçamento: escala 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 e 96px. Não usar valores ad hoc fora dessa escala sem novo token.
- Radius: 6, 10, 16 e 24px; pills exclusivamente para controles compactos/status.
- Elevação: `shadow-1` para cards, `shadow-2` para superfícies flutuantes e `shadow-3` para dialogs. Border e contraste fazem a maior parte da separação.

## Layout e responsividade

- Grid de referência: 12 colunas desktop, 8 tablet, 4 mobile; container máximo de 1240px e gutter de 24px (16px em mobile).
- Dashboard: quatro status cards no desktop, dois no tablet e uma coluna no mobile. Tabelas preservam semântica e rolam horizontalmente quando necessário; não esmagam colunas críticas.
- Sidebar desaparece abaixo de 640px; a implementação de navegação móvel será um componente próprio quando o shell autenticado existir.
- A seleção de Organization/Site deve permanecer visível no shell em qualquer breakpoint. Nenhum filtro visual muda o tenant efetivo.

## Componentes implementados

| Componente | Uso e regra |
|---|---|
| Button | ação principal, secundária, quiet ou destrutiva; estados nativos de foco/disabled |
| Badge | estado compacto com texto e ponto; nunca apenas cor |
| Card | agrupamento com borda/elevation, não contêiner automático para cada dado |
| Alert | exceção ou feedback relevante; `danger` usa `role=alert` |
| Field/input/select/textarea | label associado ao controle, hint descrito por `aria-describedby` |
| Tabs | mudança local de visão, não substitui navegação ou rota |
| Dialog | confirmação/fluxo curto de alto contexto; sempre possui título e fechamento |
| Dropdown | ações secundárias por primitive `details/summary` |
| CommandPalette | atalho para ações frequentes; não autorização alternativa |
| DataTable | dados densos em tabela semântica, com cabeçalhos de coluna |
| Sidebar | navegação de app com estado ativo explícito |
| Skeleton/empty state | preservam estrutura enquanto carrega e explicam ausência de dado |
| Tooltip | complemento breve, nunca única fonte de instrução crítica |
| StatusCard | indicador com label, valor, delta e estado explícito |
| LeveyJenningsChart | série SVG acessível com título/descrição e bandas de referência |

## Data visualization

Gráficos servem investigação, não ornamento. A paleta usa lilac para linha/estrutura, green para estado nominal e warning/danger somente para exceções. Cada gráfico operacional deve oferecer:

1. título, unidade, janela temporal e escopo Site;
2. legenda ou texto alternativo que preserve o significado sem cor;
3. valor/fonte acessível em tabela ou resumo quando a interação for complexa;
4. tooltip com dados exatos e link à evidência quando aplicável;
5. indicação de política/versão quando exibir decisão ou faixa de CQ.

O exemplo Levey-Jennings é apenas visual e não implementa engine ou decisão clínica. A Sprint de QC conectará séries e bandas somente a contratos validados no backend.

## Motion

Motion é curta, física e explicativa. O sistema usa `--motion-fast` (140ms), `--motion-standard` (260ms) e `--motion-emphasis` (520ms), com as curvas `--ease-precision`, `--ease-flow` e `--ease-spring-subtle`. Usos legítimos: revelar uma relação, transicionar o foco de um registro e confirmar associação de evidência. Não animar métricas continuamente, não bloquear leitura e não usar parallax como conteúdo. `prefers-reduced-motion` deixa relações e conteúdo estáticos e visíveis.

A camada de marketing é documentada em [Signal Lattice](./hexxon-visual-language.md) e [Motion system](./marketing-motion-system.md). Ela usa SVG/CSS pequenos, sem WebGL e sem depender de uma biblioteca de motion.

## Acessibilidade

- WCAG 2.2 AA é baseline: contraste, foco de 3px, semântica HTML, teclado e preferência de movimento reduzido.
- Cor nunca é a única portadora de status; Badge e Alert carregam texto e sinal gráfico.
- Controls usam label e descrição programática; dialogs usam `dialog`/`aria-labelledby`; tabelas usam `th scope=col`; SVG de gráfico tem `title` e `desc`.
- O Design Lab é a superfície de inspeção manual. Antes de produção, adicionar testes automatizados de acessibilidade (axe) e testes de teclado/reader aos componentes interativos.

## Como inspecionar

```bash
pnpm install
pnpm --filter @hexxon/design-lab dev
```

Também há previews de integração em `@hexxon/marketing` e `@hexxon/platform`. Todos consomem os mesmos tokens e `@hexxon/ui`.

## Limites desta sprint

Não há dados reais, autenticação, APIs, regras de domínio, CQ decisório, storage, gráficos de produção ou Storybook empacotado. `apps/design-lab` é o ambiente equivalente exigido para inspeção isolada; Storybook pode ser introduzido quando os componentes adquirirem variantes/documentação automatizada suficientes para justificar sua manutenção.
