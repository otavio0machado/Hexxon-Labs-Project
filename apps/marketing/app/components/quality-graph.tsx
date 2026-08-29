"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const events = [
  { date: "12 AGO", kind: "TRACE", title: "Lote B-928 entrou em uso", detail: "Recebimento e validade preservados", tone: "linked" },
  { date: "14 AGO", kind: "ASSET", title: "Manutenção em EQ-041", detail: "Intervenção registrada antes da série", tone: "linked" },
  { date: "17 AGO", kind: "QC", title: "Deslocamento da série detectado", detail: "Média acima da referência vigente", tone: "signal" },
  { date: "17 AGO", kind: "ENVIRO", title: "Ambiente dentro da faixa", detail: "8 pontos sem desvio relacionado", tone: "confirmed" },
  { date: "18 AGO", kind: "QC", title: "Regra Westgard 2_2s", detail: "Revisão humana necessária", tone: "warning" },
  { date: "18 AGO", kind: "QUALITY", title: "Investigação aberta", detail: "5 eventos relacionados ao contexto", tone: "active" }
] as const;

export default function QualityGraph() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.matchMedia("(max-width: 760px)").matches) return;
      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      element.style.setProperty("--graph-progress", `${progress}`);
      setActive(Math.min(events.length - 1, Math.floor(progress * events.length)));
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  return <section ref={ref} id="quality-graph" className="quality-story" data-active={active} aria-labelledby="quality-graph-title">
    <div className="quality-sticky">
      <header className="quality-story-heading"><div><span className="section-kicker">05 / Quality Graph</span><h2 id="quality-graph-title">O contexto se monta enquanto a operação acontece.</h2></div><p>Uma investigação deixa de ser uma busca manual por registros dispersos.</p></header>
      <div className="quality-tool">
        <header className="quality-toolbar"><div><span>QUALITY GRAPH</span><strong>Investigação QI-2026-018</strong></div><div><i /> CONTEXTO ATIVO <button type="button" aria-label="Mais opções da demonstração">•••</button></div></header>
        <div className="quality-timeline" role="group" aria-label="Linha do tempo da investigação">
          <div className="quality-timeline-track" aria-hidden="true"><i style={{ "--progress": `${active / (events.length - 1)}` } as CSSProperties} /></div>
          {events.map((event, index) => <button key={`${event.date}-${event.title}`} type="button" data-state={index < active ? "past" : index === active ? "active" : "future"} data-tone={event.tone} onClick={() => setActive(index)} aria-pressed={index === active}><span className="quality-node"><i /></span><time>{event.date}</time><div><small>{event.kind}</small><strong>{event.title}</strong><p>{event.detail}</p></div></button>)}
        </div>
        <aside className="quality-context-card" aria-live="polite"><header><span>CONTEXTO</span><i /></header><strong>{active + 1} de {events.length} eventos</strong><p>{events[active]!.detail}</p><div className="quality-context-score"><span>Relações encontradas</span><b>{Math.min(5, active + 1)}</b></div><ul><li><i /> Evidência rastreável</li><li><i /> Regra determinística</li><li data-pending={active < 5}><i /> Confirmação humana</li></ul><button type="button">Revisar evidências <span aria-hidden="true">↗</span></button></aside>
      </div>
      <div className="quality-progress" aria-hidden="true"><span>SCROLL TO ASSEMBLE CONTEXT</span><i><b style={{ transform: `scaleX(${(active + 1) / events.length})` }} /></i><span>{String(active + 1).padStart(2, "0")} / 06</span></div>
    </div>
  </section>;
}
