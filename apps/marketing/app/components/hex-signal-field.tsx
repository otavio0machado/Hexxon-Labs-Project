"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

const modules = [
  { label: "QC", x: 50, y: 7 },
  { label: "ENVIRO", x: 82, y: 31 },
  { label: "QUALITY", x: 70, y: 75 },
  { label: "INTELLIGENCE", x: 50, y: 93 },
  { label: "ASSET", x: 30, y: 75 },
  { label: "TRACE", x: 18, y: 31 }
] as const;

export default function HexSignalField() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(Boolean(entry?.isIntersecting)), { threshold: .2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--core-rx", `${((event.clientY - rect.top) / rect.height - .5) * -5}deg`);
    event.currentTarget.style.setProperty("--core-ry", `${((event.clientX - rect.left) / rect.width - .5) * 7}deg`);
    event.currentTarget.style.setProperty("--light-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    event.currentTarget.style.setProperty("--light-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }

  return <div ref={ref} className="core-visual" data-active={active} onPointerMove={move} onPointerLeave={(event) => { event.currentTarget.style.setProperty("--core-rx", "0deg"); event.currentTarget.style.setProperty("--core-ry", "0deg"); }} aria-label="Hexxon Core conectando seis domínios operacionais">
    <div className="core-visual-glow" aria-hidden="true" />
    <svg className="core-connections" viewBox="0 0 100 100" aria-hidden="true">
      <path className="core-structure" d="M50 8 82 31 70 75 50 92 30 75 18 31Z" />
      <path className="core-spokes" d="M50 50 50 8M50 50 82 31M50 50 70 75M50 50 50 92M50 50 30 75M50 50 18 31" />
      <path className="core-signal core-signal-one" d="M18 31 50 50 70 75" />
      <path className="core-signal core-signal-two" d="M50 8 50 50 82 31" />
      <path className="core-signal core-signal-three" d="M30 75 50 50 50 92" />
    </svg>
    <div className="core-plane core-plane-back" aria-hidden="true" />
    <div className="core-plane core-plane-front" aria-hidden="true" />
    <div className="core-center" aria-hidden="true"><svg viewBox="0 0 120 120"><path d="M48 8 14 28v26M14 69v23l34 20M72 112l34-20V68M106 53V28L72 8" /><path d="M37 34v20l46 29V36M37 85V63l46-27" /><circle cx="37" cy="59" r="4" /><circle cx="83" cy="32" r="4" /></svg><span>CORE</span></div>
    {modules.map((module, index) => <span className="core-module" key={module.label} style={{ "--x": `${module.x}%`, "--y": `${module.y}%`, "--delay": `${240 + index * 90}ms` } as CSSProperties}><i aria-hidden="true" /><strong>{module.label}</strong></span>)}
    <div className="core-readout"><span><i /> CONTEXT LINKED</span><strong>6 operational systems</strong></div>
  </div>;
}
