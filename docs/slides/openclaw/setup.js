export default {
  sectionLabel: 'OpenClaw',
  icon:  '🦞',
  title: 'Setup',
  sub:   'gateway · approvals',
  dots:  [true, true, true],

  content: `
    <div class="slide-eyebrow">OpenClaw · Configuración</div>
    <div class="slide-heading">Preparar el agente <span class="badge badge-done">completado</span></div>
    <div class="slide-sub">OpenClaw recibe el payload de n8n, lo analiza con IA y devuelve un informe en español. La clave está en configurar identidad, aprobaciones y ejecución persistente.</div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🕶️</div>
        <div class="card-title">Identidad (prompt)</div>
        <div class="card-desc">Rol tipo analista SOC: prioriza por riesgo/impacto, explica pasos de mitigación y redacta en español con tono claro.</div>
        <div class="card-tag">agent</div>
      </div>
      <div class="card">
        <div class="card-icon">✅</div>
        <div class="card-title">Approvals</div>
        <div class="card-desc">Allowlist de acciones/herramientas (ejecución controlada). Evita que el agente haga cosas fuera del guion en demos.</div>
        <div class="card-tag">seguridad</div>
      </div>
      <div class="card">
        <div class="card-icon">🧷</div>
        <div class="card-title">Gateway</div>
        <div class="card-desc">Servicio persistente para que el agente pueda recibir webhooks y ejecutar flujos de forma estable.</div>
        <div class="card-tag">runtime</div>
      </div>
    </div>

    <h3>// comandos base</h3>
    <div class="code-block">
      <div class="code-header">
        <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
        <span class="code-label">terminal - VM Scanner</span>
      </div>
      <div class="code-body"><span class="c-muted"># Gateway (ejecución persistente)</span>
<span class="c-cyan">openclaw</span> <span class="c-yellow">gateway</span> <span class="c-green">install</span>
<span class="c-cyan">systemctl</span> <span class="c-yellow">--user</span> <span class="c-green">start openclaw-gateway</span>

<span class="c-muted"># Allowlist (ejemplo)</span>
<span class="c-cyan">openclaw</span> <span class="c-yellow">approvals</span> <span class="c-green">allowlist add</span> <span class="c-orange">n8n-webhook</span></div>
    </div>

    <div class="info-box">
      <strong>Regla de oro:</strong> separar “SecOps (pipeline y escáneres)” de “OpenClaw (cómo piensa, cómo opera y cómo entrega el informe)”.
    </div>
  `
};

