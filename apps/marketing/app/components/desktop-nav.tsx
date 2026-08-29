"use client";

import { useEffect, useState } from "react";

const links = [
  ["Plataforma", "plataforma"], ["Produtos", "produtos"], ["Quality Graph", "quality-graph"], ["Segurança", "seguranca"], ["Contato", "contato"]
] as const;

export default function DesktopNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observers = links.map(([, id]) => {
      const section = document.getElementById(id);
      if (!section) return null;
      const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) setActive(id); }, { rootMargin: "-24% 0px -66%", threshold: 0 });
      observer.observe(section);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return <nav aria-label="Navegação principal">{links.map(([label, id]) => <a key={id} href={`#${id}`} data-active={active === id}>{label}</a>)}</nav>;
}
