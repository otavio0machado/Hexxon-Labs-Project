"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const nodes = [
  { name: "QC", detail: "Regra e série", x: 47, y: 14, connection: "Liga leitura, referência e revisão." },
  { name: "Lote de reagente", detail: "Origem e validade", x: 75, y: 31, connection: "Relaciona o lote ao sinal analítico." },
  { name: "Equipamento", detail: "Ativo vinculado", x: 73, y: 67, connection: "Mantém o ativo dentro da investigação." },
  { name: "Manutenção", detail: "Intervenção registrada", x: 45, y: 86, connection: "Expõe a intervenção próxima ao evento." },
  { name: "Temperatura", detail: "Evidência ambiental", x: 18, y: 67, connection: "Torna a evidência ambiental consultável." },
  { name: "Evento de qualidade", detail: "Investigação e ação", x: 18, y: 31, connection: "Organiza revisão, evidência e fechamento." }
] as const;

export default function QualityGraph() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const current = nodes[selected]!;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting),), { threshold: .18 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <section ref={ref} id="quality-graph" className="quality-graph" data-visible={visible} aria-labelledby="quality-graph-title">
    <div className="quality-graph-copy"><span className="hx-eyebrow">Quality Graph</span><h2 id="quality-graph-title" className="marketing-heading">Um sinal não explica a operação sozinho.</h2><p>Selecione um ponto para ver como a investigação ganha contexto sem transformar associação em causalidade.</p><div className="quality-graph-status"><i aria-hidden="true" /> CONTEXTO VINCULÁVEL</div></div>
    <div className="quality-graph-stage">
      <div className="quality-graph-spatial" role="list" aria-label="Relações operacionais da qualidade">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M47 14 75 31 73 67 45 86 18 67 18 31Z" /><path className="graph-pulse-path" d="M47 14 75 31 73 67 45 86 18 67 18 31Z" /></svg>
        {nodes.map((node, index) => <button key={node.name} className="spatial-node" role="listitem" type="button" data-selected={index === selected} style={{ "--x": `${node.x}%`, "--y": `${node.y}%`, "--step": index } as CSSProperties} onClick={() => setSelected(index)} aria-pressed={index === selected}><span>{String(index + 1).padStart(2, "0")}</span><strong>{node.name}</strong><small>{node.detail}</small></button>)}
      </div>
      <div className="quality-graph-panel" aria-live="polite"><span>VÍNCULO ATIVO / {String(selected + 1).padStart(2, "0")}</span><strong>{current.name}</strong><p>{current.connection}</p></div>
      <ol className="quality-graph-mobile-chain">{nodes.map((node, index) => <li key={node.name}><button type="button" onClick={() => setSelected(index)} aria-current={index === selected ? "step" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><strong>{node.name}</strong><small>{node.detail}</small></button></li>)}</ol>
    </div>
  </section>;
}
