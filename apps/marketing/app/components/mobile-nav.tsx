"use client";

import { useState } from "react";

const links = [
  ["Plataforma", "#plataforma"], ["Produtos", "#produtos"], ["Inteligência", "#intelligence"], ["Segurança", "#seguranca"], ["Contato", "#contato"]
] as const;

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return <div className="mobile-nav">
    <button className="mobile-nav-toggle" type="button" aria-label={open ? "Fechar navegação" : "Abrir navegação"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}><span /><span /><span /></button>
    <nav id="mobile-navigation" aria-label="Navegação móvel" data-open={open}>
      {links.map(([label, href], index) => <a key={href} href={href} onClick={() => setOpen(false)}><small>0{index + 1}</small>{label}<span aria-hidden="true">↘</span></a>)}
    </nav>
  </div>;
}
