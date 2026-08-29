"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

const cells = [
  [50, 18, "ORGANIZATION"], [31, 31, "SITE"], [69, 34, "ASSET"], [51, 49, "CORE"],
  [22, 59, "QC"], [78, 62, "TRACE"], [40, 77, "ENVIRO"], [62, 81, "QUALITY"]
] as const;

export default function HexSignalField() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(Boolean(entry?.isIntersecting)), { threshold: .25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--signal-x", `${((event.clientX - rect.left) / rect.width - .5) * 8}deg`);
    event.currentTarget.style.setProperty("--signal-y", `${((event.clientY - rect.top) / rect.height - .5) * -8}deg`);
  }

  return <div ref={ref} className="signal-field" data-active={active} onPointerMove={move} onPointerLeave={(event) => { event.currentTarget.style.setProperty("--signal-x", "0deg"); event.currentTarget.style.setProperty("--signal-y", "0deg"); }} aria-label="Mapa visual de sinais operacionais conectados">
    <div className="signal-field-chrome"><span>HEXXON / SIGNAL LATTICE</span><span><i /> LIVE CONTEXT</span></div>
    <svg className="signal-field-lines" viewBox="0 0 100 100" aria-hidden="true" preserveAspectRatio="none">
      <path d="M50 18 31 31 51 49 69 34M51 49 22 59 40 77 62 81 78 62 51 49" />
      <path className="signal-path signal-path-a" d="M50 18 31 31 51 49 78 62" />
      <path className="signal-path signal-path-b" d="M22 59 51 49 69 34" />
    </svg>
    <div className="signal-field-plane" aria-hidden="true" />
    {cells.map(([x, y, label], index) => <span key={label} className={`signal-cell ${label === "CORE" ? "signal-cell-core" : ""}`} style={{ "--x": `${x}%`, "--y": `${y}%`, "--delay": `${index * 90}ms` } as CSSProperties}><b>{label === "CORE" ? "H" : ""}</b><small>{label}</small></span>)}
    <div className="signal-field-readout"><span>06 DOMAINS</span><strong>Signals form context.</strong><span>QO / 01</span></div>
  </div>;
}
