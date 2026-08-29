# Direção de marca e design

## Nome mutável, produto estável

O nome de trabalho é **Hexxon Labs** e pode mudar por avaliação jurídica. Na implementação, todo nome, logotipo textual, título, descrições institucionais, URLs de e-mail e Open Graph devem vir de um pacote único `packages/brand` (por exemplo `brand.ts` e arquivos de conteúdo). Nenhum módulo de produto deve importar ou repetir a marca em strings.

## Linguagem visual

- Estética de instrumentação e operações: superfícies escuras ou neutras estruturadas, contraste nítido, tipografia funcional, acentos reservados para estado e prioridade.
- Não usar convenções visuais indistintas de healthtech de consumo. Densidade, histórico, evidência e anomalia são características de primeira classe.
- Status nunca depende só de cor; sempre tem texto, ícone/padrão e semântica acessível.
- Componentes, tokens e layouts ficam em `packages/design-tokens` e `packages/ui`; apps não definem escalas próprias.

## UX operacional

- Ações críticas apresentam contexto, impacto, motivo quando exigido e confirmação proporcional ao risco.
- Formulários preservam autoria e timezone operacional; entradas assistidas por IA exigem revisão humana antes de persistir.
- Visões multi-site indicam escopo de forma permanente; filtros não podem sugerir uma organização diferente da efetivamente autorizada.

