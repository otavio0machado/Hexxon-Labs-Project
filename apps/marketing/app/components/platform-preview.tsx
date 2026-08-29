import { Badge, LeveyJenningsChart } from "@hexxon/ui";
import { HexxonMark } from "./hexxon-mark";

export default function PlatformPreview() {
  return <div className="platform-preview" aria-label="Demonstração da interface Hexxon Cloud com dados ilustrativos">
    <aside className="preview-sidebar"><HexxonMark compact /><div className="preview-sidebar-nav"><i data-active="true" /><i /><i /><i /><i /></div><span>QO</span></aside>
    <div className="preview-workspace">
      <header className="preview-topbar"><div><strong>Quality overview</strong><span>Unidade principal · Demonstração</span></div><div className="preview-topbar-actions"><span>28 AGO · 14:32</span><button type="button" aria-label="Notificações da demonstração"><i /> 3</button><b aria-hidden="true">OM</b></div></header>
      <div className="preview-content">
        <div className="preview-kpis"><article><span>QC em revisão</span><strong>02</strong><small><i /> 1 nova regra</small></article><article><span>Lotes ativos</span><strong>48</strong><small>3 próximos da validade</small></article><article><span>Ambiente</span><strong>08</strong><small><i /> dentro da faixa</small></article><article><span>Equipamentos</span><strong>12</strong><small>1 manutenção hoje</small></article></div>
        <section className="preview-chart-panel"><div className="preview-panel-head"><div><span>CONTROLE ANALÍTICO</span><strong>Glicose · Controle N2</strong></div><Badge tone="warning">revisar tendência</Badge></div><LeveyJenningsChart /></section>
        <aside className="preview-context-panel"><div className="preview-panel-head"><div><span>CONTEXTO RELACIONADO</span><strong>3 sinais conectados</strong></div><i /></div><ol><li data-connected="true"><span>13:42</span><div><strong>Lote B-928</strong><small>Entrou em uso · 12 AGO</small></div></li><li data-connected="true"><span>09:10</span><div><strong>EQ-041</strong><small>Manutenção · 14 AGO</small></div></li><li data-connected="true"><span>Agora</span><div><strong>QC shift</strong><small>Desvio detectado · 17 AGO</small></div></li></ol><button type="button">Abrir investigação <span aria-hidden="true">↗</span></button></aside>
      </div>
    </div>
  </div>;
}
