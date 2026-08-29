/** Central source of institutional copy until the working name is legally finalized. */
export const brand = {
  name: "Hexxon Labs",
  productName: "Hexxon Cloud",
  tagline: "Quality operations, made traceable.",
  description:
    "A precision operations platform for clinical laboratory quality, traceability, compliance and operational intelligence.",
  domains: {
    marketing: "hexxon.com.br",
    platform: "app.hexxon.com.br",
    api: "api.hexxon.com.br",
    docs: "docs.hexxon.com.br",
    status: "status.hexxon.com.br"
  }
} as const;

export const productLabels = {
  core: "Hexxon Core",
  enviro: "Hexxon Enviro",
  trace: "Hexxon Trace",
  qc: "Hexxon QC",
  asset: "Hexxon Asset",
  quality: "Hexxon Quality",
  intelligence: "Hexxon Intelligence"
} as const;
