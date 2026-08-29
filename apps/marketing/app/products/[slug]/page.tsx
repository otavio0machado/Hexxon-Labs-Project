import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productBySlug, products } from "../../../src/content";
import { MarketingAnalytics, TrackedAnchor } from "../../components/analytics";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const product = productBySlug(slug); if (!product) return {}; return { title: product.name, description: product.summary, alternates: { canonical: `/products/${product.slug}` }, openGraph: { title: product.name, description: product.summary, url: `/products/${product.slug}` } }; }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();
  return <main className="marketing-shell product-page"><MarketingAnalytics productSlug={product.slug} /><header className="marketing-header"><div className="marketing-container marketing-nav"><Link href="/" className="marketing-mark"><i aria-hidden="true" />HEXXON <span>LABS</span></Link><Link className="nav-cta" href="/#produtos">Todos os produtos <span aria-hidden="true">↗</span></Link></div></header><section className="product-hero"><div className="marketing-container"><span className="hx-eyebrow">{product.eyebrow} / {product.mark}</span><h1>{product.name}</h1><p>{product.summary}</p><TrackedAnchor className="hx-button" href="/#contato" productSlug={product.slug}>Falar com a Hexxon <span aria-hidden="true">↗</span></TrackedAnchor></div></section><section className="marketing-section"><div className="marketing-container product-detail"><div><span className="hx-eyebrow">Contexto operacional</span><h2 className="marketing-heading">{product.detail}</h2></div><div className="product-detail-panel"><span className="hx-mono">{product.mark} / CAPABILITY</span><strong>{product.signal}</strong><p>Uma capacidade conectável dentro da Hexxon Cloud, com escopo organizacional, evidências auditáveis e fronteiras de domínio explícitas.</p></div></div></section><section className="marketing-section built-section"><div className="marketing-container built-layout"><span className="built-index">Designed for<br />context.</span><div><p className="built-lead">Esta página apresenta o direcionamento do produto, não uma promessa de funcionalidade já liberada.</p><p>O roadmap e o escopo de cada módulo serão validados com laboratórios e responsáveis técnicos antes de produção.</p></div></div></section><footer className="marketing-footer"><div className="marketing-container"><Link href="/" className="marketing-mark"><i aria-hidden="true" />HEXXON <span>LABS</span></Link><small>Nome de trabalho sujeito a validação jurídica.</small></div></footer></main>;
}
