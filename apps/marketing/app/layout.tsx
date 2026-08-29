import type { Metadata } from "next";
import { brand } from "@hexxon/brand";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hexxon.com.br"),
  title: { default: brand.name, template: `%s | ${brand.name}` },
  description: brand.description,
  openGraph: { type: "website", locale: "pt_BR", url: "/", siteName: brand.name, title: brand.name, description: brand.description },
  robots: { index: true, follow: true }
};
export const viewport = { themeColor: "#101012", colorScheme: "dark" };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
