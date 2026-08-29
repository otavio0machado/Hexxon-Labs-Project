"use client";

import { useState, type FormEvent } from "react";
import { trackMarketingEvent } from "./analytics";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [started, setStarted] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const data = new FormData(event.currentTarget);
    const utm = new URLSearchParams(window.location.search);
    const payload = Object.fromEntries(data.entries());
    const response = await fetch("/api/v1/marketing/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, source: "marketing_site", utmSource: utm.get("utm_source"), utmMedium: utm.get("utm_medium"), utmCampaign: utm.get("utm_campaign") }) });
    if (response.ok) { setState("success"); trackMarketingEvent("CONTACT_SUBMITTED"); event.currentTarget.reset(); } else setState("error");
  }

  function startedContact() { if (!started) { setStarted(true); trackMarketingEvent("CONTACT_STARTED"); } }

  return <form className="contact-form" onSubmit={submit} onFocus={startedContact} aria-label="Contato Hexxon">
    <div className="contact-form-rail" aria-hidden="true"><span>INTERESSE</span><i /><span>LABORATÓRIO</span><i /><span>CONTATO</span><i /><strong>HEXXON</strong></div>
    <div className="contact-form-fields">
      <label className="contact-field contact-field-name"><span><i /> Nome</span><input name="name" autoComplete="name" required maxLength={160} placeholder="Como podemos chamar você?" /></label>
      <label className="contact-field"><span><i /> E-mail profissional</span><input name="businessEmail" type="email" autoComplete="email" required maxLength={254} placeholder="voce@laboratorio.com.br" /></label>
      <label className="contact-field contact-field-lab"><span><i /> Laboratório</span><input name="laboratoryName" required maxLength={200} placeholder="Nome do laboratório" /></label>
      <label className="contact-field contact-field-state"><span><i /> Estado (UF)</span><input name="state" required minLength={2} maxLength={2} pattern="[A-Za-z]{2}" placeholder="Ex.: SP" /></label>
      <label className="contact-field contact-field-interest"><span><i /> Interesse</span><select name="interest" required defaultValue="FULL_PLATFORM"><option value="FULL_PLATFORM">Plataforma completa</option><option value="QC">Hexxon QC</option><option value="TRACE">Hexxon Trace</option><option value="ENVIRO">Hexxon Enviro</option><option value="ASSET">Hexxon Asset</option><option value="QUALITY">Hexxon Quality</option><option value="PARTNERSHIP">Parceria</option><option value="OTHER">Outro</option></select></label>
      <label className="contact-field"><span><i /> Quantidade aproximada de unidades</span><input name="siteCount" type="number" min="1" max="10000" inputMode="numeric" placeholder="Ex.: 3" /></label>
      <label className="contact-field contact-field-message"><span><i /> Mensagem opcional</span><textarea name="message" maxLength={4000} placeholder="Conte brevemente o contexto do seu laboratório." /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="contact-form-submit"><button className="hx-button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Enviando…" : "Iniciar conversa"}<span aria-hidden="true">↗</span></button><p className="form-note" aria-live="polite">{state === "success" ? "Recebemos seu contato. A equipe comercial retornará pelo canal informado." : state === "error" ? "Não foi possível enviar agora. Revise os campos e tente novamente." : "Usamos estes dados apenas para responder ao seu contato comercial."}</p></div>
    </div>
  </form>;
}
