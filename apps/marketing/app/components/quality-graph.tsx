"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const nodes = [["QC", "Controle analítico"], ["Lote de reagente", "Origem e validade"], ["Equipamento", "Ativo vinculado"], ["Manutenção", "Intervenção registrada"], ["Temperatura", "Evidência ambiental"], ["Evento de qualidade", "Investigação e ação"]] as const;

export default function QualityGraph() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  useEffect(() => { const section = sectionRef.current; if (!section) return; const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false), { threshold: 0.22 }); observer.observe(section); return () => observer.disconnect(); }, []);
  return <section ref={sectionRef} className="quality-graph" data-visible={visible} aria-labelledby="quality-graph-title"><div className="quality-graph-copy"><span className="hx-eyebrow">Grafo de qualidade</span><h2 id="quality-graph-title" className="marketing-heading">A qualidade não acontece em módulos isolados.</h2><p>Uma medição só ganha significado quando mantém o contexto de lote, ativo, intervenção, ambiente e evento de qualidade. Explore o encadeamento de evidências.</p><div className="quality-graph-status" aria-live="polite"><span className="hx-dot" />{nodes[selected]?.[1]}</div></div><div className="quality-graph-network" role="list" aria-label="Conexões de dados da plataforma">{nodes.map(([label, description], index) => <div className="graph-step" key={label} data-selected={index === selected} style={{ "--step": index } as CSSProperties}><button type="button" className="graph-node" onClick={() => setSelected(index)} aria-pressed={index === selected} aria-label={`${label}: ${description}`}><span className="graph-index">0{index + 1}</span><strong>{label}</strong><small>{description}</small></button>{index < nodes.length - 1 ? <div className="graph-link" aria-hidden="true"><span /></div> : null}</div>)}</div></section>;
}
