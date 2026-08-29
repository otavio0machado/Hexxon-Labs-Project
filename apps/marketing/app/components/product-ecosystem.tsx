"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "../../src/content";

export default function ProductEcosystem() {
  const [selected, setSelected] = useState(0);
  const product = products[selected]!;
  return <div className="product-ecosystem" data-selected={product.slug}>
    <svg viewBox="0 0 100 100" className="ecosystem-links" aria-hidden="true"><path d="M50 50 50 15M50 50 79 32M50 50 79 68M50 50 50 85M50 50 21 68M50 50 21 32" /></svg>
    <div className="ecosystem-core"><small>PLATFORM</small><strong>HEXXON<br />CLOUD</strong></div>
    <div className="ecosystem-nodes" role="list" aria-label="Produtos Hexxon">
      {products.map((item, index) => <Link role="listitem" href={`/products/${item.slug}`} key={item.slug} className="ecosystem-node" data-active={index === selected} onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)}><span>{item.mark}</span><strong>{item.name.replace("Hexxon ", "")}</strong><small>{item.eyebrow}</small></Link>)}
    </div>
    <div className="ecosystem-caption" aria-live="polite"><span>{product.mark} / {product.eyebrow}</span><strong>{product.signal}</strong><p>{product.summary}</p></div>
  </div>;
}
