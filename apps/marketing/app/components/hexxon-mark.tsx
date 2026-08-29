import type { ReactNode } from "react";

export function HexxonMark({ compact = false }: { compact?: boolean }) {
  return <span className="hexxon-mark-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" focusable="false"><path className="mark-shell" d="M13 3 5 8v6M5 19v5l8 5M19 29l8-5v-6M27 13V8l-8-5" /><path className="mark-signal" d="M10 9v6l12 7V10M10 22v-5l12-7" /><circle cx="10" cy="16" r="1.6" /><circle cx="22" cy="9" r="1.6" /></svg>{!compact && <span className="hexxon-mark-signal" />}</span>;
}

export function BrandLockup({ children }: { children?: ReactNode }) {
  return <><HexxonMark />HEXXON <span>LABS</span>{children}</>;
}
