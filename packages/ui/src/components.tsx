"use client";

import { cloneElement, isValidElement, type ButtonHTMLAttributes, type ReactNode, useId, useState } from "react";

type Tone = "success" | "warning" | "danger" | "info" | "neutral";

export function Button({ variant = "primary", children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "quiet" | "danger" }) {
  return <button className="hx-button" data-variant={variant} {...props}>{children}</button>;
}

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return <span className="hx-badge" data-tone={tone}><span className="hx-dot" />{children}</span>;
}

export function Card({ children, raised = false, className = "" }: { children: ReactNode; raised?: boolean; className?: string }) {
  return <section className={`hx-card ${className}`} data-raised={raised}>{children}</section>;
}

export function Alert({ title, children, tone = "info" }: { title: string; children: ReactNode; tone?: Exclude<Tone, "neutral"> }) {
  return <div className="hx-alert" data-tone={tone} role={tone === "danger" ? "alert" : "status"}><strong aria-hidden="true">{tone === "danger" ? "!" : "↗"}</strong><div><strong>{title}</strong><p>{children}</p></div></div>;
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  const id = useId();
  const hintId = `${id}-hint`;
  const control = isValidElement<{ id?: string; "aria-describedby"?: string }>(children)
    ? cloneElement(children, { id, "aria-describedby": hint ? hintId : undefined })
    : children;
  return <div className="hx-field"><label htmlFor={id}>{label}</label>{control}{hint ? <small id={hintId}>{hint}</small> : null}</div>;
}

export function Tabs({ tabs, initial = 0 }: { tabs: string[]; initial?: number }) {
  const [active, setActive] = useState(initial);
  return <div className="hx-tabs" role="tablist" aria-label="Sections">{tabs.map((tab, index) => <button key={tab} role="tab" className="hx-tab" data-active={active === index} aria-selected={active === index} onClick={() => setActive(index)}>{tab}</button>)}</div>;
}

export function Dialog({ trigger, title, children }: { trigger: ReactNode; title: string; children: ReactNode }) {
  const id = useId();
  return <><span onClick={(event) => (event.currentTarget.nextElementSibling as HTMLDialogElement | null)?.showModal()}>{trigger}</span><dialog className="hx-dialog" aria-labelledby={id}><div className="hx-dialog-panel"><div className="hx-cluster" style={{ justifyContent: "space-between" }}><h2 id={id} style={{ margin: 0 }}>{title}</h2><form method="dialog"><Button variant="quiet" aria-label="Close dialog">×</Button></form></div><div style={{ marginTop: 18 }}>{children}</div></div></dialog></>;
}

export function Dropdown({ label, items }: { label: string; items: string[] }) {
  return <details className="hx-dropdown"><summary>{label}<span aria-hidden="true">⌄</span></summary><div className="hx-dropdown-menu">{items.map((item) => <button key={item}>{item}</button>)}</div></details>;
}

export function CommandPalette({ items }: { items: { label: string; shortcut: string }[] }) {
  return <div className="hx-command" role="search"><input className="hx-input" aria-label="Search commands" placeholder="Search the workspace…" />{items.map((item) => <button key={item.label}><span>{item.label}</span><kbd className="hx-mono">{item.shortcut}</kbd></button>)}</div>;
}

export function DataTable({ columns, rows }: { columns: string[]; rows: ReactNode[][] }) {
  return <div className="hx-table-wrap"><table className="hx-table"><thead><tr>{columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

export function Sidebar({ items }: { items: { label: string; mark: string; active?: boolean }[] }) {
  return <aside className="hx-sidebar"><div className="hx-cluster" style={{ margin: "4px 8px 28px" }}><span style={{ background: "var(--brand-secondary)", borderRadius: 2, display: "block", height: 13, width: 13 }} /><strong style={{ letterSpacing: "-.04em" }}>HEXXON</strong></div><nav className="hx-stack" style={{ gap: 3 }}>{items.map((item) => <a href="#" className="hx-nav-item" data-active={item.active} key={item.label}><span className="hx-mono">{item.mark}</span>{item.label}</a>)}</nav><div style={{ marginTop: "auto", padding: 10 }}><Badge tone="success">System nominal</Badge></div></aside>;
}

export function Skeleton({ width = "100%", height = 18 }: { width?: string; height?: number }) { return <div className="hx-skeleton" style={{ width, height }} />; }
export function Tooltip({ label, children }: { label: string; children: ReactNode }) { return <span className="hx-tooltip" title={label} tabIndex={0}>{children}</span>; }

export function StatusCard({ label, value, delta, tone = "success" }: { label: string; value: string; delta: string; tone?: Tone }) {
  return <Card><div className="hx-cluster" style={{ justifyContent: "space-between" }}><span className="hx-eyebrow" style={{ color: "var(--text-secondary)" }}>{label}</span><Badge tone={tone}>{tone}</Badge></div><div className="hx-stat-value">{value}</div><span className="hx-stat-delta" style={{ color: tone === "danger" ? "var(--danger)" : tone === "warning" ? "var(--warning)" : undefined }}>{delta}</span></Card>;
}

export function LeveyJenningsChart() {
  const points = [[16, 79], [49, 65], [82, 89], [115, 48], [148, 56], [181, 72], [214, 37], [247, 51], [280, 44], [313, 31], [346, 41]];
  return <figure style={{ margin: 0 }}><div className="hx-cluster" style={{ justifyContent: "space-between", marginBottom: 14 }}><div><div className="hx-eyebrow" style={{ color: "var(--text-secondary)" }}>Levey–Jennings</div><strong>Glucose · Control N2</strong></div><Badge tone="warning">1-2s</Badge></div><svg aria-labelledby="lj-title lj-desc" viewBox="0 0 364 120" width="100%" role="img"><title id="lj-title">Levey-Jennings chart</title><desc id="lj-desc">Eleven quality control values against standard deviation bands. The latest point is a warning.</desc>{[30, 48, 64, 80, 98].map((y, index) => <line key={y} x1="10" x2="354" y1={y} y2={y} stroke={index === 2 ? "#B28AE1" : "#3A3640"} strokeDasharray={index === 2 ? "0" : "3 4"} />)}<polyline fill="none" stroke="#A6D94F" strokeWidth="2.5" points={points.map((point) => point.join(",")).join(" ")} />{points.map(([x, y], index) => <circle key={x} cx={x} cy={y} r={index === points.length - 1 ? 5 : 3.5} fill={index === points.length - 1 ? "#F3C56B" : "#A6D94F"} />)}</svg><figcaption className="hx-muted" style={{ fontSize: ".76rem" }}>Mean 101 mg/dL · SD 2.7 · last reading 106.3 mg/dL</figcaption></figure>;
}
