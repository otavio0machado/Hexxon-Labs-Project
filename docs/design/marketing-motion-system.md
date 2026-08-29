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

Motion explica conexões: o Core monta sua geometria, o pulso percorre os paths, tabs interpolam o indicador, previews fazem crossfade curto e o Quality Graph desenha a sequência conforme o scroll nativo. Ela não é usada em métricas, em fade-up genérico ou para esconder conteúdo. Não há dependência de WebGL ou biblioteca externa de animação.

Em `prefers-reduced-motion`, as transições são removidas, os nós permanecem visíveis e paths deixam de pulsar. O layout e o conteúdo são os mesmos.

## Performance

As animações atuam em `transform`, `opacity`, `stroke-dashoffset` e um único estado React derivado do scroll via `requestAnimationFrame`. O Quality Graph permanece carregado sob demanda. Nenhuma imagem pesada, canvas, fonte remota ou dependência de motion foi introduzida.
