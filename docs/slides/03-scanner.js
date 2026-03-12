export default {
  sectionLabel: 'Automatización SOAR',
  icon:  '🧠',
  title: 'Pirineus SOC',
  sub:   'OpenClaw · ZAP · VirusTotal',
  dots:  [false, false, false],

  content: `
    <div class="slide-eyebrow">Issue #6 · Automatización Inteligente</div>
    <div class="slide-heading">Pirineus Agent <span class="badge badge-done">completado</span></div>
    <div class="slide-sub">Orquestador basado en IA (OpenClaw) que integra OWASP ZAP y VirusTotal para una respuesta ante incidentes automatizada.</div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🕶️</div>
        <div class="card-title">Identity: Pirineus</div>
        <div class="card-desc">Agente autónomo con rol de analista SOC en la Matrix. Gestiona ChatOps vía Telegram.</div>
        <div class="card-tag">AI Engine</div>
      </div>
      <div class="card">
        <div class="card-icon">🔮</div>
        <div class="card-title">The Oracle</div>
        <div class="card-desc">Integración con API de VirusTotal para análisis de reputación de IPs y Hashes sospechosos.</div>
        <div class="card-tag">Threat Intel</div>
      </div>
    </div>

    <h3>// zap_scan.sh (Orquestación Bash)</h3>
    <div class="code-block">
      <div class="code-header">
        <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
        <span class="code-label">zap_scan.sh</span>
      </div>
      <div class="code-body"><span class="c-muted"># Lanzar Spider y Active Scan vía API</span>
<span class="c-cyan">SPIDER_ID</span>=$(<span class="c-yellow">curl</span> -s <span class="c-green">"$ZAP_URL/JSON/spider/action/scan/"</span> | <span class="c-yellow">jq</span> -r <span class="c-green">'.scan'</span>)
<span class="c-muted"># Bucle de espera hasta 100%</span>
<span class="c-yellow">while</span> [ <span class="c-green">"$STATUS"</span> != <span class="c-green">"100"</span> ]; <span class="c-yellow">do</span> <span class="c-yellow">sleep</span> 10; <span class="c-yellow">done</span>
<span class="c-muted"># Extraer alertas y resumir con jq</span>
<span class="c-yellow">jq</span> -r <span class="c-green">'.alerts[] | "[\(.risk)] \(.name)"'</span> scan.json | <span class="c-yellow">sort</span> | <span class="c-yellow">uniq -c</span></div>
    </div>

    <h3>// despliegue del agente pirineus</h3>
    <div class="steps">
      <div class="step">
        <div class="step-num">01</div>
        <div class="step-content">
          <div class="step-title">Configurar Identidad (AGENTS.md)</div>
          <div class="step-desc">Editar el "System Prompt" en inglés para definir el rol de Pirineus, sus reglas de seguridad y comandos rápidos (ChatOps).</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">02</div>
        <div class="step-content">
          <div class="step-title">Scripts de Integración</div>
          <div class="step-desc">Crear <code>zap_scan.sh</code> y <code>vt_check.sh</code> en <code>~/vm-scanner</code> para permitir que la IA ejecute herramientas de shell.</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">03</div>
        <div class="step-content">
          <div class="step-title">Activar Servicio Gateway</div>
          <div class="step-desc"><code>openclaw gateway install</code> → <code>systemctl --user start openclaw-gateway</code> para ejecución persistente.</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">04</div>
        <div class="step-content">
          <div class="step-title">Programar Auditoría (Cron)</div>
          <div class="step-desc"><code>openclaw cron add --every 1h</code> enviando el reporte final a Telegram vía canal <code>442971272</code>.</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Interacción ChatOps:</strong> Comandos disponibles en Telegram: <code>/zap</code> (Escaneo manual), <code>/oracle [IP]</code> (Consulta VT) y <code>/status</code> (Estado del sistema).<br>
      Integración validada: El reporte de Pirineus resume más de 5000 alertas en un informe legible de 10 líneas.
    </div>
  `
};