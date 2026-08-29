import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productBySlug, products } from "../../../src/content";
import { MarketingAnalytics, TrackedAnchor } from "../../components/analytics";
import { BrandLockup } from "../../components/hexxon-mark";
import ProductSignal from "../../components/product-signal";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const product = productBySlug(slug); if (!product) return {}; return { title: product.name, description: product.summary, alternates: { canonical: `/products/${product.slug}` }, openGraph: { title: product.name, description: product.summary, url: `/products/${product.slug}` } }; }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();
  return <main className="marketing-shell product-page" data-product={product.slug}><MarketingAnalytics productSlug={product.slug} />
    <header className="marketing-header"><div className="marketing-container marketing-nav"><Link href="/" className="marketing-mark" aria-label="Hexxon Labs"><BrandLockup /></Link><Link className="nav-cta" href="/#produtos">Todos os produtos <span aria-hidden="true">↗</span></Link></div></header>
    <section className="product-hero"><div className="marketing-container product-hero-layout"><div><span className="hx-eyebrow">{product.eyebrow} / {product.mark}</span><h1>{product.name}</h1><p>{product.summary}</p><TrackedAnchor className="hx-button" href="/#contato" productSlug={product.slug}>Falar com a Hexxon <span aria-hidden="true">↗</span></TrackedAnchor></div><ProductSignal product={product.slug} /></div></section>
    <section className="product-focus"><div className="marketing-container product-focus-layout"><div><span className="hx-eyebrow">Contexto operacional</span><h2 className="marketing-heading">{product.detail}</h2></div><div className="product-detail-panel"><span className="hx-mono">{product.mark} / CAPABILITY</span><strong>{product.signal}</strong><p>Uma capacidade conectável dentro da Hexxon Cloud, com escopo organizacional, evidências auditáveis e fronteiras de domínio explícitas.</p></div></div></section>
    <section className="product-boundary"><div className="marketing-container"><span>PRODUCT / {product.mark}</span><i /><span>ORGANIZATION SCOPE</span><i /><strong>AUDITABLE EVIDENCE</strong></div></section>
    <section className="built-section"><div className="marketing-container built-layout"><span className="built-index">Designed for<br />context.</span><div><p className="built-lead">Esta página apresenta um direcionamento de produto, não uma promessa de funcionalidade já liberada.</p><p>Roadmap e escopo serão validados com laboratórios e responsáveis técnicos antes de produção.</p></div></div></section>
    <footer className="marketing-footer"><div className="marketing-container"><Link href="/" className="marketing-mark"><BrandLockup /></Link><small>Nome de trabalho sujeito a validação jurídica.</small></div></footer>
  </main>;
}
