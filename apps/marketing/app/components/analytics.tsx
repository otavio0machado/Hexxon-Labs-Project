"use client";
import { useEffect } from "react";

type EventName = "MARKETING_PAGE_VIEW" | "PRODUCT_VIEW" | "CTA_CLICKED" | "CONTACT_STARTED" | "CONTACT_SUBMITTED";
const sessionKey = "hexxon.marketing.anonymous-id";
function anonymousId() { if (typeof window === "undefined") return undefined; const current = window.sessionStorage.getItem(sessionKey); if (current) return current; const next = crypto.randomUUID(); window.sessionStorage.setItem(sessionKey, next); return next; }
export function trackMarketingEvent(eventType: EventName, productSlug?: string) { if (typeof window === "undefined") return; const body = JSON.stringify({ eventType, pagePath: window.location.pathname, productSlug, anonymousId: anonymousId(), source: "marketing_site" }); if (navigator.sendBeacon) { navigator.sendBeacon("/api/v1/marketing/events", new Blob([body], { type: "application/json" })); return; } void fetch("/api/v1/marketing/events", { body, headers: { "Content-Type": "application/json" }, keepalive: true, method: "POST" }); }
export function MarketingAnalytics({ productSlug }: { productSlug?: string }) { useEffect(() => { trackMarketingEvent(productSlug ? "PRODUCT_VIEW" : "MARKETING_PAGE_VIEW", productSlug); }, [productSlug]); return null; }
export function TrackedAnchor({ href, children, className, productSlug }: { href: string; children: React.ReactNode; className?: string; productSlug?: string }) { return <a href={href} className={className} onClick={() => trackMarketingEvent("CTA_CLICKED", productSlug)}>{children}</a>; }
