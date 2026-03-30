export default {
  sectionLabel: null,
  icon:  '🔁',
  title: 'n8n Workflows',
  sub:   'JuiceShop · DVWA',
  dots:  [true, true, true],

  content: `
    <div class="slide-eyebrow">SecOps · Orquestación</div>
    <div class="slide-heading">Workflows n8n <span class="badge badge-done">completado</span></div>
    <div class="slide-sub">En <code>server-pirineus</code> hay 2 workflows: uno para <strong>Juice Shop</strong> y otro para <strong>DVWA</strong>. Ambos hacen lo mismo: ZAP (spider+ascan) + Nuclei (API wrapper) → resumen ejecutivo → envío a OpenClaw.</div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🧃</div>
        <div class="card-title">JuiceShop Full Scan</div>
        <div class="card-desc">Trigger manual + cron 00:00 + webhook. Target <code>DMZ_JUICESHOP</code>. Reporte ejecutivo + prompt para análisis del bot.</div>
        <div class="card-tag">daily</div>
      </div>
      <div class="card">
        <div class="card-icon">🐛</div>
        <div class="card-title">DVWA Full Scan</div>
        <div class="card-desc">Misma lógica cambiando el target a <code>DMZ_DVWA</code>. Útil para comparar severidades y demostrar el pipeline.</div>
        <div class="card-tag">daily</div>
      </div>
      <div class="card">
        <div class="card-icon">🧱</div>
        <div class="card-title">Resiliencia</div>
        <div class="card-desc">Cada paso crítico tiene rama de error: si falla ZAP o Nuclei, se notifica y el flujo continúa con lo disponible.</div>
        <div class="card-tag">onError</div>
      </div>
    </div>

    <h3>// pipeline del workflow (JuiceShop)</h3>
    <div class="steps">
      <div class="step">
        <div class="step-num">01</div>
        <div class="step-content">
          <div class="step-title">Triggers</div>
          <div class="step-desc">Manual + <code>Schedule 00:00</code> + Webhook. Todos entran al nodo <strong>Config</strong> para centralizar variables.</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">02</div>
        <div class="step-content">
          <div class="step-title">Config (variables)</div>
          <div class="step-desc">Define <code>target</code>, <code>zapBase=http://owasp-zap:8090</code>, <code>nucleiApi=http://nuclei-api:5000</code> y marca timestamps en España.</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">03</div>
        <div class="step-content">
          <div class="step-title">ZAP (spider + ascan)</div>
          <div class="step-desc">Crea sesión → accede al target → lanza spider y espera al 100% → lanza active scan y espera al 100% → descarga alertas.</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">04</div>
        <div class="step-content">
          <div class="step-title">Nuclei (API)</div>
          <div class="step-desc">Hace <code>POST /scan</code> a <code>nuclei-api</code>. La API ejecuta Nuclei con templates web (cves, exposures, misconfiguration, vulnerabilities) y devuelve JSON listo para mapear.</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">05</div>
        <div class="step-content">
          <div class="step-title">Construir informe + enviar a OpenClaw</div>
          <div class="step-desc">Agrega contadores (ZAP/Nuclei), selecciona top evidencias y manda el cuerpo al webhook de OpenClaw con <code>Authorization: Bearer</code>.</div>
        </div>
      </div>
    </div>

    <h3>// nuclei-api.py (qué hace)</h3>
    <div class="cards">
      <div class="card">
        <div class="card-icon">🎯</div>
        <div class="card-title">/scan (POST)</div>
        <div class="card-desc">Recibe <code>{ target, severity }</code>, ejecuta Nuclei con templates “web”, guarda salida en <code>/reports/*.jsonl</code> y devuelve findings parseados.</div>
        <div class="card-tag">run</div>
      </div>
      <div class="card">
        <div class="card-icon">🩺</div>
        <div class="card-title">/health (GET)</div>
        <div class="card-desc">Comprueba que el servicio responde y lista qué carpetas de templates existen dentro del contenedor.</div>
        <div class="card-tag">health</div>
      </div>
      <div class="card">
        <div class="card-icon">📦</div>
        <div class="card-title">/templates (GET)</div>
        <div class="card-desc">Cuenta cuántos <code>.yaml</code> hay por carpeta de templates para verificar que el updater está funcionando.</div>
        <div class="card-tag">verify</div>
      </div>
    </div>

    <div class="info-box">
      <strong>Por qué existe:</strong> n8n no “habla Nuclei” de serie. Este wrapper convierte Nuclei en una API estable, controlada (timeouts, concurrency) y con salida parseada (JSON) para componer informes.
    </div>

    <h3>// payload mínimo hacia OpenClaw (ejemplo)</h3>
    <div class="code-block">
      <div class="code-header">
        <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
        <span class="code-label">webhook.json</span>
        <button
          class="copy-btn"
          type="button"
          aria-label="Copiar ejemplo de payload"
          title="Copiar"
          data-copy="{\n  \"runId\": \"2026-03-30T12:00Z\",\n  \"target\": \"http://IP:3000\",\n  \"summary\": {\n    \"zap\": { \"high\": 2, \"medium\": 6, \"low\": 12 },\n    \"nuclei\": { \"critical\": 0, \"high\": 1, \"medium\": 3 }\n  },\n  \"topFindings\": [\n    { \"tool\": \"zap\", \"risk\": \"HIGH\", \"name\": \"XSS\", \"url\": \"http://...\", \"evidence\": \"...\" },\n    { \"tool\": \"nuclei\", \"severity\": \"high\", \"templateId\": \"cve-...\", \"matched\": \"http://...\" }\n  ]\n}"
        >Copiar</button>
      </div>
      <div class="code-body"><span class="c-muted">{</span>
  <span class="c-cyan">"runId"</span>: <span class="c-green">"2026-03-30T12:00Z"</span>,
  <span class="c-cyan">"target"</span>: <span class="c-green">"http://IP:3000"</span>,
  <span class="c-cyan">"summary"</span>: { <span class="c-cyan">"zap"</span>: { <span class="c-cyan">"high"</span>: <span class="c-orange">2</span>, <span class="c-cyan">"medium"</span>: <span class="c-orange">6</span>, <span class="c-cyan">"low"</span>: <span class="c-orange">12</span> }, <span class="c-cyan">"nuclei"</span>: { <span class="c-cyan">"critical"</span>: <span class="c-orange">0</span>, <span class="c-cyan">"high"</span>: <span class="c-orange">1</span>, <span class="c-cyan">"medium"</span>: <span class="c-orange">3</span> } },
  <span class="c-cyan">"topFindings"</span>: [ <span class="c-muted">...</span> ]
<span class="c-muted">}</span></div>
    </div>

    <div class="info-box">
      <strong>Motivo:</strong> OpenClaw no necesita 5000 líneas crudas; necesita un “resumen + evidencias” para priorizar y explicar al SOC.
    </div>
  `
};

