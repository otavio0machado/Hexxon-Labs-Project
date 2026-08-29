import type { MetadataRoute } from "next";
import { products } from "../src/content";
export default function sitemap(): MetadataRoute.Sitemap { const baseUrl = "https://hexxon.com.br"; return [{ url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }, ...products.map(({ slug }) => ({ url: `${baseUrl}/products/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 }))]; }
