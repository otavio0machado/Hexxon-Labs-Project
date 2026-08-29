import type { Metadata } from "next";
import { brand } from "@hexxon/brand";
import "./globals.css";
export const metadata: Metadata = { title: `${brand.productName} — operations` };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
