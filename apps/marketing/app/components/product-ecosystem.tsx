"use client";

import Link from "next/link";
import { useState } from "react";
import { products, type ProductSlug } from "../../src/content";

const previewCopy: Record<ProductSlug, { title: string; meta: string; status: string }> = {
  enviro: { title: "Monitoramento ambiental", meta: "8 pontos monitorados", status: "1 ação necessária" },
  trace: { title: "Proveniência de lotes", meta: "Lote B-928", status: "4 movimentos vinculados" },
  qc: { title: "Controle analítico", meta: "Glicose · Controle N2", status: "Tendência em revisão" },
  asset: { title: "Ciclo do equipamento", meta: "EQ-041 · Analisador", status: "Manutenção registrada" },
  quality: { title: "Evento de qualidade", meta: "NC-2026-018", status: "Investigação aberta" },
  intelligence: { title: "Síntese de contexto", meta: "5 sinais relacionados", status: "Confirmação humana" }
};

function ProductPreview({ slug }: { slug: ProductSlug }) {
  const copy = previewCopy[slug];
  return <div className="product-live-preview" data-product={slug} key={slug}>
    <header><div><span>HEXXON {slug.toUpperCase()}</span><strong>{copy.title}</strong></div><i /><small>DEMONSTRAÇÃO</small></header>
    <div className="product-preview-body">
      {slug === "enviro" && <><div className="enviro-reading"><span>Sala técnica</span><strong>22.4<sup>°C</sup></strong><small><i /> dentro da faixa</small></div><svg viewBox="0 0 520 170" aria-label="Tendência de temperatura demonstrativa"><path d="M8 110C68 106 88 80 144 92s83 27 132 5 72-48 121-22 73 28 115-7" /><path className="preview-area" d="M8 110C68 106 88 80 144 92s83 27 132 5 72-48 121-22 73 28 115-7V160H8Z" /></svg><div className="preview-stat-row"><span>Faixa 20–24°C</span><span>{copy.meta}</span><strong>{copy.status}</strong></div></>}
      {slug === "trace" && <><div className="trace-lot-head"><span>REAGENTE / GLU</span><strong>{copy.meta}</strong><small>Validade 30 NOV 2026</small></div><div className="trace-timeline"><i /><article><span>12 AGO</span><strong>Recebimento</strong><small>Conferido</small></article><article><span>13 AGO</span><strong>Armazenamento</strong><small>Câmara 02</small></article><article><span>17 AGO</span><strong>Uso analítico</strong><small>EQ-041</small></article><article><span>AGORA</span><strong>QC relacionado</strong><small>Em revisão</small></article></div><div className="preview-stat-row"><span>Origem preservada</span><span>4 evidências</span><strong>{copy.status}</strong></div></>}
      {slug === "qc" && <><div className="qc-chart-head"><span>{copy.meta}</span><strong>106.3 <small>mg/dL</small></strong></div><svg viewBox="0 0 520 200" aria-label="Gráfico Levey-Jennings demonstrativo"><path className="qc-band" d="M8 45H512M8 100H512M8 155H512" /><path d="M8 119 68 108 128 122 188 90 248 113 308 104 368 72 428 94 490 53" />{[[8,119],[68,108],[128,122],[188,90],[248,113],[308,104],[368,72],[428,94],[490,53]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />)}</svg><div className="preview-stat-row"><span>Média 101 mg/dL</span><span>SD 2.7</span><strong>{copy.status}</strong></div></>}
      {slug === "asset" && <><div className="asset-head"><span>EQ-041</span><strong>Analisador principal</strong><small><i /> operacional</small></div><div className="asset-track"><i /><article><span>14 AGO</span><strong>Manutenção preventiva</strong><small>Evidência anexada</small></article><article><span>30 AGO</span><strong>Calibração programada</strong><small>Em 2 dias</small></article><article><span>12 SET</span><strong>Revisão de desempenho</strong><small>Planejada</small></article></div><div className="preview-stat-row"><span>Disponibilidade 99.1%</span><span>3 planos ativos</span><strong>{copy.status}</strong></div></>}
      {slug === "quality" && <><div className="quality-workflow"><article data-state="done"><span>01</span><strong>Registro</strong><small>Concluído</small></article><i /><article data-state="active"><span>02</span><strong>Investigação</strong><small>Em andamento</small></article><i /><article><span>03</span><strong>Ação</strong><small>Aguardando</small></article><i /><article><span>04</span><strong>Fechamento</strong><small>Aguardando</small></article></div><div className="quality-evidence"><span>CONTEXTO</span><strong>3 evidências vinculadas</strong><small>Lote · Equipamento · Controle analítico</small></div><div className="preview-stat-row"><span>{copy.meta}</span><span>Responsável atribuído</span><strong>{copy.status}</strong></div></>}
      {slug === "intelligence" && <><div className="intelligence-query"><span>CONTEXT SYNTHESIS</span><p>O deslocamento da série começou após a entrada do lote B-928. A manutenção de EQ-041 ocorreu três dias antes; o ambiente permaneceu dentro da faixa.</p></div><div className="intelligence-sources"><span><i /> Lote B-928</span><span><i /> EQ-041</span><span><i /> QC N2</span><span><i /> Ambiente</span></div><div className="preview-stat-row"><span>{copy.meta}</span><span>Rastreável à origem</span><strong>{copy.status}</strong></div></>}
    </div>
  </div>;
}

export default function ProductEcosystem() {
  const [selected, setSelected] = useState(2);
  const product = products[selected]!;
  return <div className="product-system" data-selected={product.slug}>
    <div className="product-switcher" role="tablist" aria-label="Produtos Hexxon">{products.map((item, index) => <button key={item.slug} type="button" role="tab" aria-selected={index === selected} aria-controls="product-preview" onClick={() => setSelected(index)}><i aria-hidden="true" /><span>{item.mark}</span><strong>{item.name.replace("Hexxon ", "")}</strong></button>)}</div>
    <div id="product-preview" role="tabpanel" className="product-preview-shell"><ProductPreview slug={product.slug} /><footer><div><span>{product.eyebrow}</span><strong>{product.signal}</strong></div><Link href={`/products/${product.slug}`}>Explorar {product.name} <span aria-hidden="true">↗</span></Link></footer></div>
  </div>;
}
