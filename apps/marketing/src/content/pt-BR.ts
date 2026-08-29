export const locale = "pt-BR";

export const products = [
  { slug: "enviro", name: "Hexxon Enviro", eyebrow: "Ambiente", summary: "Monitoramento ambiental sem transcrição manual.", detail: "Centralize leituras, exceções e evidências do ambiente em uma trilha operacional por unidade.", mark: "01", signal: "Pontos, faixas e evidências" },
  { slug: "trace", name: "Hexxon Trace", eyebrow: "Rastreabilidade", summary: "Rastreabilidade de reagentes e lotes, do recebimento ao uso analítico.", detail: "Conecte recebimento, movimentações, validade e contexto de uso sem depender de planilhas paralelas.", mark: "02", signal: "Lotes, movimentos e contexto" },
  { slug: "qc", name: "Hexxon QC", eyebrow: "Controle analítico", summary: "Controle de qualidade analítico, inteligência Westgard e investigação de tendências.", detail: "Estruture referências, medições e sinais operacionais para decisões humanas com regras determinísticas no backend.", mark: "03", signal: "Referências, regras e séries" },
  { slug: "asset", name: "Hexxon Asset", eyebrow: "Ativos", summary: "Ciclo de vida de equipamentos, calibração e inteligência de manutenção.", detail: "Trate ativos e intervenções como evidência operacional vinculável a cada unidade e fluxo de qualidade.", mark: "04", signal: "Ativos, planos e intervenções" },
  { slug: "quality", name: "Hexxon Quality", eyebrow: "Qualidade", summary: "Não conformidades, evidências e gestão da qualidade.", detail: "Organize ocorrências, investigações e ações corretivas em uma linha do tempo auditável.", mark: "05", signal: "Eventos, evidências e ações" },
  { slug: "intelligence", name: "Hexxon Intelligence", eyebrow: "Inteligência", summary: "Inteligência operacional contextual em toda a plataforma.", detail: "Receba sínteses e hipóteses assistivas com contexto rastreável — sem delegar decisões críticas à IA.", mark: "06", signal: "Contexto, explicação e revisão" }
] as const;

export type ProductSlug = (typeof products)[number]["slug"];
export const productBySlug = (slug: string) => products.find((product) => product.slug === slug);

export const marketingCopy = {
  hero: {
    eyebrow: "Infraestrutura de qualidade / laboratórios modernos",
    title: "Infraestrutura de qualidade para laboratórios modernos.",
    supporting: "Conecte controle de qualidade, reagentes, equipamentos, monitoramento ambiental e inteligência operacional em uma plataforma rastreável.",
    primary: "Explorar a plataforma",
    secondary: "Falar com a Hexxon"
  }
} as const;
