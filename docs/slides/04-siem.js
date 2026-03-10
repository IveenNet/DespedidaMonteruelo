export default {
  sectionLabel: null,
  icon:  '🛡️',
  title: 'SIEM · SOC',
  sub:   'Wazuh · Kibana',
  dots:  [false, false],

  content: `
    <div class="slide-eyebrow">Issue #7 · SIEM</div>
    <div class="slide-heading">Wazuh · Kibana <span class="badge badge-todo">pendiente</span></div>
    <div class="slide-sub">Wazuh recibe los eventos de seguridad y los correlaciona. Kibana presenta el Dashboard SOC con las alertas clasificadas por nivel de riesgo.</div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🛡️</div>
        <div class="card-title">Wazuh Manager</div>
        <div class="card-desc">SIEM open source. Recibe eventos de Clawbot vía API Elastic y aplica reglas de detección.</div>
        <div class="card-tag">siem</div>
      </div>
      <div class="card">
        <div class="card-icon">📊</div>
        <div class="card-title">Kibana</div>
        <div class="card-desc">Dashboard SOC con visualización de vulnerabilidades por nivel de riesgo (crítico/alto/medio).</div>
        <div class="card-tag">:5601</div>
      </div>
      <div class="card">
        <div class="card-icon">🔎</div>
        <div class="card-title">Wazuh Agent</div>
        <div class="card-desc">Agente en VM-Targets que captura logs de Apache/Nginx mientras ZAP realiza el escaneo.</div>
        <div class="card-tag">vm-targets</div>
      </div>
    </div>

    <div class="info-box">
      <strong>Próximo paso:</strong> Desplegar Wazuh en Docker. Crear regla de alerta que dispare al SOC cuando ZAP detecte vulnerabilidad de nivel medio o grave vía API Elastic.
    </div>
  `
};
