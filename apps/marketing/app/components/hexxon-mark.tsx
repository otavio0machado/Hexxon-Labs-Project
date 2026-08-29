import type { ReactNode } from "react";

export function HexxonMark({ compact = false }: { compact?: boolean }) {
  return <span className="hexxon-mark-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" focusable="false"><path d="M16 2 28 9v14L16 30 4 23V9L16 2Z" /><path d="M11 10v12m10-12v12M11 16h10" /></svg>{!compact && <span className="hexxon-mark-signal" />}</span>;
}

export function BrandLockup({ children }: { children?: ReactNode }) {
  return <><HexxonMark />HEXXON <span>LABS</span>{children}</>;
}
