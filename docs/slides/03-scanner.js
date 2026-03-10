export default {
  sectionLabel: 'Automatización',
  icon:  '🔍',
  title: 'Scanner',
  sub:   'Clawbot · OWASP ZAP',
  dots:  [false, false, false],

  content: `
    <div class="slide-eyebrow">Issue #6 · Automatización</div>
    <div class="slide-heading">Scanner <span class="badge badge-todo">pendiente</span></div>
    <div class="slide-sub">Clawbot orquesta OWASP ZAP mediante su API para lanzar escaneos activos periódicos contra Juice Shop y DVWA.</div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🤖</div>
        <div class="card-title">Clawbot</div>
        <div class="card-desc">Orquestador del flujo. Ejecuta escaneos con trigger tipo cron de forma automática.</div>
        <div class="card-tag">vm-scanner</div>
      </div>
      <div class="card">
        <div class="card-icon">🔍</div>
        <div class="card-title">OWASP ZAP</div>
        <div class="card-desc">Escáner de vulnerabilidades web. Expone API REST para integración con Clawbot.</div>
        <div class="card-tag">:8090</div>
      </div>
    </div>

    <div class="info-box">
      <strong>Próximo paso:</strong> Desplegar OWASP ZAP en Docker en la VM-Scanner y verificar que la API responde correctamente. Luego crear el flujo Clawbot con el trigger cron apuntando a Juice Shop y DVWA.
    </div>
  `
};
