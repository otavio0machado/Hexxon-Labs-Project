# Hexxon Signal Lattice

## Intenção

Signal Lattice é a linguagem visual do marketing da Hexxon: um sistema de células, conexões e pulsos que faz relações operacionais perceptíveis sem usar símbolos médicos genéricos. Ela representa contexto vinculável, não dados clínicos e nem uma topologia literal de infraestrutura.

## Gramática

- **HexCell** representa um domínio ou ponto de evidência. É reservada para núcleos, seleção e marcos, nunca usada como moldura de todo card.
- **SignalPath** conecta apenas elementos cuja relação é narrada na página. Linha pontilhada indica contexto disponível; o pulso é uma leitura visual de fluxo, não uma métrica em tempo real.
- **Lattice plane** é uma grade angular de baixo contraste. Ela dá profundidade à instrumentação, sem competir com conteúdo.
- **Signal green** marca foco, estado ligado ou próximo passo. Lilac define estrutura e caminhos; nenhuma cor é a única representação de estado.

## Aplicação no marketing

O hero usa um campo pseudo-3D de seis domínios e núcleo Hexxon. O ecossistema de produtos usa uma topologia central de Hexxon Cloud com destinos equivalentes e links reais. O Quality Graph usa disposição espacial no desktop e uma cadeia semântica no mobile. A área de contato traduz a sequência Interesse → Laboratório → Contato → Hexxon em um guia lateral puramente visual, sem alterar o formulário comercial.

## Limites

Não usar Signal Lattice como ornamento repetido, diagrama científico implausível, cursor customizado, canvas/WebGL ou substituto de texto e controles. Todo SVG decorativo fica fora da ordem de leitura ou tem rótulo acessível quando comunica conteúdo.

## Responsividade e acessibilidade

Em telas estreitas, o campo de sinal reduz densidade e os grafos espaciais passam para sequências lineares operáveis por teclado. `prefers-reduced-motion` preserva linhas e nós estáticos; nenhuma informação depende de animação. Foco de teclado segue os links e botões sem depender da cor.
