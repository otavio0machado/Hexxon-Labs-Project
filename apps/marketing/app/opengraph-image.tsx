import { ImageResponse } from "next/og";
export const alt = "Hexxon Labs — quality infrastructure for modern laboratories";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() { return new ImageResponse(<div style={{ alignItems: "center", background: "#101012", color: "#FAF8F4", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", padding: 70, width: "100%" }}><div style={{ color: "#A6D94F", fontSize: 28, letterSpacing: 8 }}>HEXXON LABS</div><div style={{ display: "flex", flexDirection: "column", fontFamily: "serif", fontSize: 78, letterSpacing: -4, marginTop: 32, textAlign: "center" }}><span>Infraestrutura de qualidade</span><span>para laboratórios modernos.</span></div><div style={{ color: "#B28AE1", fontSize: 28, marginTop: 42 }}>Sinais conectados. Contexto rastreável.</div></div>, size); }
