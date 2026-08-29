import type { ProductSlug } from "../../src/content";

const labels: Record<ProductSlug, string> = { enviro: "sensor field", trace: "lot trajectory", qc: "control series", asset: "asset lifecycle", quality: "evidence closure", intelligence: "context synthesis" };

export default function ProductSignal({ product }: { product: ProductSlug }) {
  return <div className="product-signal-visual" data-product={product} aria-label={`Visualização conceitual: ${labels[product]}`}>
    <div className="product-signal-meta"><span>{labels[product].toUpperCase()}</span><i /> <span>HEXXON / {product.toUpperCase()}</span></div>
    <svg viewBox="0 0 600 300" role="img" aria-label={`Sinal visual de ${labels[product]}`}><title>{labels[product]}</title>
      {product === "enviro" && <><path d="M10 190C80 80 130 245 200 135S330 220 395 120 500 205 590 72" /><path className="signal-secondary" d="M10 220C100 120 150 260 240 160S400 230 590 130" /><g>{[92, 200, 325, 470].map((x) => <circle key={x} cx={x} cy={140} r="8" />)}</g></>}
      {product === "trace" && <><path d="M45 235 160 154 246 192 350 72 535 124" /><path className="signal-secondary" d="M45 235 212 270 350 186 535 124" /><g>{[[45,235],[160,154],[246,192],[350,72],[535,124]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="10" />)}</g></>}
      {product === "qc" && <><path d="M20 154H580M20 83H580M20 225H580" /><path className="signal-primary" d="M35 166 102 142 165 158 235 116 300 171 365 148 430 102 505 136 565 84" /><g>{[[35,166],[102,142],[165,158],[235,116],[300,171],[365,148],[430,102],[505,136],[565,84]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="6" />)}</g></>}
      {product === "asset" && <><path d="M80 230 210 155 210 65 345 140 475 65 520 170 385 245Z" /><path className="signal-secondary" d="M210 155 345 140 385 245M210 65 345 140 475 65" /><g>{[[80,230],[210,155],[210,65],[345,140],[475,65],[520,170],[385,245]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="8" />)}</g></>}
      {product === "quality" && <><path d="M75 105 225 70 365 130 480 95M75 105 145 230 320 235 365 130" /><path className="signal-secondary" d="M145 230 225 70M320 235 480 95" /><g>{[[75,105],[225,70],[365,130],[480,95],[145,230],[320,235]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="9" />)}</g></>}
      {product === "intelligence" && <><path d="M20 195C100 70 140 255 230 140S360 250 435 100 520 160 590 52" /><path className="signal-secondary" d="M20 235 145 185 230 140 355 175 435 100 590 128" /><circle className="signal-core" cx="340" cy="170" r="38" /></>}
    </svg>
    <strong>{product === "intelligence" ? "SYNTHESIS" : "SIGNAL / ACTIVE"}</strong>
  </div>;
}
