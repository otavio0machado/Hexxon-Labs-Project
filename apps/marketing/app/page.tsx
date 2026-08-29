import dynamic from "next/dynamic";
import Link from "next/link";
import Script from "next/script";
import { brand } from "@hexxon/brand";
import ContactForm from "./components/contact-form";
import DesktopNav from "./components/desktop-nav";
import HexSignalField from "./components/hex-signal-field";
import { BrandLockup } from "./components/hexxon-mark";
import MobileNav from "./components/mobile-nav";
import PlatformPreview from "./components/platform-preview";
import ProductEcosystem from "./components/product-ecosystem";
import { MarketingAnalytics, TrackedAnchor } from "./components/analytics";
import { marketingCopy } from "../src/content";

const QualityGraph = dynamic(() => import("./components/quality-graph"), { loading: () => <section className="quality-story quality-story-loading" aria-label="Carregando Quality Graph" /> });
const organizationSchema = { "@context": "https://schema.org", "@type": "Organization", name: brand.name, url: "https://hexxon.com.br", description: brand.description };

export default function MarketingPage() {
  return <main className="marketing-shell"><MarketingAnalytics /><Script id="hexxon-organization" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(organizationSchema)}</Script><div className="page-signal" aria-hidden="true"><i /></div>
    <header className="marketing-header"><div className="marketing-container marketing-nav"><Link href="/" className="marketing-mark" aria-label={brand.name}><BrandLockup /></Link><DesktopNav /><div className="nav-actions"><a className="nav-cta" href="#contato">Agendar conversa <span aria-hidden="true">↗</span></a><MobileNav /></div></div></header>

    <section className="hero-section"><div className="marketing-container hero-layout"><div className="hero-copy"><span className="section-kicker">Digital laboratory infrastructure</span><h1>{marketingCopy.hero.title}</h1><p>{marketingCopy.hero.supporting}</p><div className="hero-actions"><TrackedAnchor className="hx-button" href="#plataforma">Ver a plataforma <span aria-hidden="true">↓</span></TrackedAnchor><TrackedAnchor className="text-action" href="#contato">Falar com a Hexxon <span aria-hidden="true">↗</span></TrackedAnchor></div><div className="hero-proof"><span><i /> 6 sistemas conectáveis</span><span>Uma trilha operacional</span></div></div><HexSignalField /></div></section>

    <section className="problem-section" aria-labelledby="problem-title"><div className="marketing-container problem-layout"><div><span className="section-kicker">O ponto de ruptura</span><h2 id="problem-title">Os dados existem.<br /><em>O contexto se perde.</em></h2></div><div className="fragmented-signals" aria-label="Sinais isolados tornam-se contexto conectado"><span data-signal="isolated"><i /> LOTE B-928</span><span data-signal="isolated"><i /> EQ-041</span><span data-signal="isolated"><i /> QC SHIFT</span><svg viewBox="0 0 520 100" aria-hidden="true"><path d="M25 52H495" /><path className="fragment-pulse" d="M25 52H495" /></svg><strong><i /> CONTEXTO HEXXON</strong></div></div></section>

    <section id="plataforma" className="platform-section"><div className="marketing-container"><header className="section-heading"><div><span className="section-kicker">03 / Hexxon Cloud</span><h2>Uma visão operacional que conecta o que antes estava disperso.</h2></div><p>Controle analítico, lotes, ambiente e equipamentos aparecem juntos quando a equipe precisa investigar.</p></header><PlatformPreview /></div></section>

    <section id="produtos" className="products-section"><div className="marketing-container"><header className="section-heading"><div><span className="section-kicker">04 / Product system</span><h2>Seis produtos. Um núcleo de qualidade.</h2></div><p>Selecione um produto para explorar como cada parte da operação ganha contexto.</p></header><ProductEcosystem /></div></section>

    <QualityGraph />

    <section id="seguranca" className="intelligence-trust-section"><div className="marketing-container intelligence-trust-grid"><div className="intelligence-demo"><header><div><span>HEXXON INTELLIGENCE</span><strong>Síntese da investigação</strong></div><i>ASSISTIVE</i></header><div className="intelligence-summary"><span>5 sinais analisados</span><p>O deslocamento da série começou após a entrada do lote B-928. A manutenção de EQ-041 ocorreu três dias antes; o ambiente permaneceu dentro da faixa.</p></div><div className="intelligence-sources"><span><i /> Lote</span><span><i /> Equipamento</span><span><i /> QC</span><span><i /> Ambiente</span></div><footer><span>Requer confirmação do responsável</span><button type="button">Revisar contexto <span aria-hidden="true">↗</span></button></footer></div><div className="trust-copy"><span className="section-kicker">06 / Intelligence + trust</span><h2>Inteligência para explicar. Controle humano para decidir.</h2><p>A Hexxon reúne as evidências e mostra relações. Cada unidade permanece isolada, cada ação crítica é rastreável e a decisão continua com a equipe.</p><ul><li><i /> Ambiente isolado por laboratório</li><li><i /> Histórico completo de ações</li><li><i /> Regras verificáveis</li><li><i /> Confirmação humana</li></ul><Link href="/products/intelligence" className="text-action">Explorar Intelligence <span aria-hidden="true">↗</span></Link></div></div></section>

    <section className="conversion-section"><div className="conversion-intro"><div className="marketing-container"><div><span className="section-kicker">Built with laboratories, not around them.</span><h2>Infraestrutura criada a partir da operação real.</h2></div><p>A plataforma nasce onde evidência e contexto costumam se separar — e transforma esse fluxo em uma experiência clara para a equipe.</p></div></div><div id="contato" className="contact-section"><div className="marketing-container contact-layout"><div className="contact-copy"><span className="section-kicker">07 / Comece uma conversa</span><h2>Qual fluxo mais precisa de contexto hoje?</h2><p>Conte o ponto de partida. A conversa começa pela realidade do seu laboratório.</p><div className="contact-convergence" aria-hidden="true"><span>OPERAÇÃO</span><i /><span>CONTEXTO</span><i /><strong>HEXXON</strong></div></div><ContactForm /></div></div></section>

    <footer className="marketing-footer"><div className="marketing-container"><div className="marketing-mark"><BrandLockup /></div><p>Quality infrastructure for modern laboratories.</p><div><a href="#plataforma">Plataforma</a><a href="#produtos">Produtos</a><a href="#quality-graph">Quality Graph</a><a href="#contato">Contato</a></div><small>© {new Date().getFullYear()} {brand.name}. Nome de trabalho sujeito a validação jurídica.</small></div></footer>
  </main>;
}
