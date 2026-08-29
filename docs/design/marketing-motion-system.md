# Motion system — marketing

## Tokens

| Token | Valor | Uso |
|---|---:|---|
| `--motion-fast` | 140ms | foco, hover e controles compactos |
| `--motion-standard` | 260ms | seleção de nós e menu móvel |
| `--motion-emphasis` | 520ms | entrada de uma relação no campo de sinal |
| `--ease-precision` | cubic-bezier(.2,.8,.2,1) | mudança controlada de interface |
| `--ease-flow` | cubic-bezier(.16,1,.3,1) | percurso de sinais |
| `--ease-spring-subtle` | cubic-bezier(.22,1.18,.36,1) | ênfase discreta de seleção |

## Regras

Motion explica conexões: o pulso percorre paths do hero e do Quality Graph, e a seleção de um nó ganha contraste. Ela não é usada em métricas, fundos contínuos, navegação forçada ou para esconder conteúdo. Não há dependência de WebGL ou biblioteca de animação.

Em `prefers-reduced-motion`, as transições são removidas, os nós permanecem visíveis e paths deixam de pulsar. O layout e o conteúdo são os mesmos.

## Performance

As animações atuam somente em `transform`, `opacity` e `stroke-dashoffset` de SVGs pequenos. O Quality Graph permanece carregado sob demanda. Nenhuma imagem pesada, canvas ou fonte adicional foi introduzida.
