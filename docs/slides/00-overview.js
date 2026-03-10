export default {
  // ── Sidebar config ──────────────────────────────────────────────────────
  sectionLabel: 'Introducción',
  icon:  '🛡️',
  title: 'Visión general',
  sub:   'arquitectura · objetivos',
  dots:  [true],

  // ── Slide content (HTML) ────────────────────────────────────────────────
  content: `
    <div class="slide-eyebrow">Proyecto de innovación educativa</div>
    <div class="slide-heading">Análisis de vulnerabilidades automatizado</div>
    <div class="slide-sub">Sistema continuo para detectar vulnerabilidades en aplicaciones web y alertar al SOC en tiempo real.</div>

    <div class="arch">
<span class="highlight">Clawbot + ZAP</span>  <span class="arrow">──→</span>  escaneo activo  <span class="arrow">──→</span>  <span class="c-cyan">busca vulnerabilidades</span>
      +
<span class="highlight2">Wazuh agent</span>    <span class="arrow">──→</span>  análisis pasivo <span class="arrow">──→</span>  <span class="c-cyan">observa el tráfico</span>
      <span class="arrow">↓</span>
<span class="highlight">Wazuh SIEM</span>     <span class="arrow">──→</span>  correlaciona ambas fuentes
      <span class="arrow">↓</span>
<span class="highlight2">Kibana SOC</span>     <span class="arrow">──→</span>  Dashboard unificado
      <span class="arrow">↓</span>
<span class="highlight3">Telegram</span>       <span class="arrow">──→</span>  Alerta al equipo</div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🎯</div>
        <div class="card-title">Targets</div>
        <div class="card-desc">Juice Shop y DVWA como aplicaciones vulnerables objetivo del escaneo.</div>
        <div class="card-tag">DONE ✓</div>
      </div>
      <div class="card">
        <div class="card-icon">🌐</div>
        <div class="card-title">Opnsense</div>
        <div class="card-desc">Firewall y segmentación de red del laboratorio con VLANs.</div>
        <div class="card-tag">PENDING</div>
      </div>
      <div class="card">
        <div class="card-icon">🔍</div>
        <div class="card-title">Scanner</div>
        <div class="card-desc">Clawbot orquesta OWASP ZAP con escaneos periódicos automatizados.</div>
        <div class="card-tag">PENDING</div>
      </div>
      <div class="card">
        <div class="card-icon">🛡️</div>
        <div class="card-title">SIEM</div>
        <div class="card-desc">Wazuh recibe eventos y Kibana los visualiza en el Dashboard SOC.</div>
        <div class="card-tag">PENDING</div>
      </div>
      <div class="card">
        <div class="card-icon">📡</div>
        <div class="card-title">Alertas</div>
        <div class="card-desc">VirusTotal enriquece hallazgos. Telegram notifica al equipo al instante.</div>
        <div class="card-tag">PENDING</div>
      </div>
    </div>

    <table class="data-table">
      <tr><th>Herramienta</th><th>Rol</th><th>Estado</th></tr>
      <tr><td>Clawbot</td><td>Orquestador del flujo</td><td><span class="badge badge-todo">pendiente</span></td></tr>
      <tr><td>OWASP ZAP</td><td>Escáner de vulnerabilidades</td><td><span class="badge badge-todo">pendiente</span></td></tr>
      <tr><td>VirusTotal</td><td>Análisis de URLs y hashes</td><td><span class="badge badge-todo">pendiente</span></td></tr>
      <tr><td>Wazuh</td><td>SIEM — correlación de alertas</td><td><span class="badge badge-todo">pendiente</span></td></tr>
      <tr><td>Juice Shop / DVWA</td><td>Aplicaciones objetivo</td><td><span class="badge badge-done">hecho</span></td></tr>
      <tr><td>Telegram Bot</td><td>Notificaciones al equipo</td><td><span class="badge badge-todo">pendiente</span></td></tr>
    </table>
  `
};
