export default {
  sectionLabel: null,
  icon:  '🧠',
  title: 'Workspace',
  sub:   'memoria · límites · plantillas',
  dots:  [true, true, true],

  content: `
    <div class="slide-eyebrow">OpenClaw · Operación</div>
    <div class="slide-heading">Pirineus Workspace <span class="badge badge-done">completado</span></div>
    <div class="slide-sub">El workspace es el “contrato” del agente: identidad, memoria, límites y formato de salida. Con eso, el análisis es consistente y auditable: mismo input → mismo tipo de respuesta.</div>

    <div class="slide-actions">
      <button class="btn btn--inline" type="button" data-open-modal="implGuide">Abrir guía de implementación</button>
    </div>

    <div class="openclaw-ws">
      <div class="openclaw-ws-grid">
        <div class="openclaw-ws-panel">
          <div class="openclaw-ws-h">
            <span class="openclaw-ws-k">// Startup routine</span>
            <span class="openclaw-ws-t">Antes de hablar</span>
          </div>
          <ul class="openclaw-ws-list">
            <li><strong>Identidad</strong>: <code>SOUL.md</code> (quién soy) + <code>USER.md</code> (a quién sirvo).</li>
            <li><strong>Memoria reciente</strong>: <code>memory/YYYY-MM-DD.md</code> (hoy y ayer).</li>
            <li><strong>Memoria larga</strong>: <code>MEMORY.md</code> solo en sesión principal (preferencias y patrones).</li>
            <li><strong>Regla de oro</strong>: si un hallazgo importa mañana, se escribe (RAM es volátil).</li>
          </ul>
          <div class="openclaw-ws-pills">
            <span class="openclaw-ws-pill">conciso</span>
            <span class="openclaw-ws-pill">estructurado</span>
            <span class="openclaw-ws-pill">sin inventar</span>
            <span class="openclaw-ws-pill">correlación</span>
          </div>
        </div>

        <div class="openclaw-ws-panel">
          <div class="openclaw-ws-h">
            <span class="openclaw-ws-k">// Scope & boundaries</span>
            <span class="openclaw-ws-t">Qué sí / qué no</span>
          </div>
          <div class="openclaw-ws-two">
            <div class="openclaw-ws-box">
              <div class="openclaw-ws-box-h">Sí (inputs)</div>
              <ul>
                <li>Payloads de <strong>n8n</strong> (ZAP/Nuclei).</li>
                <li>Alertas <strong>Wazuh</strong> (sev ≥ 8).</li>
                <li>Chat <strong>Telegram</strong> (preguntas + comandos).</li>
                <li>Intel bajo demanda: <strong>Shodan</strong> / <strong>VirusTotal</strong>.</li>
              </ul>
            </div>
            <div class="openclaw-ws-box openclaw-ws-box--no">
              <div class="openclaw-ws-box-h">No (límites)</div>
              <ul>
                <li>No ejecutar ZAP/Docker ni “hacer escaneos”.</li>
                <li>No tocar host/FS, ni extraer claves.</li>
                <li>No “fabricar” resultados si falta dato.</li>
                <li>Solo acciones aprobadas (allowlist).</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="openclaw-ws-panel openclaw-ws-panel--wide openclaw-ws-panel--memory">
          <div class="openclaw-ws-h">
            <span class="openclaw-ws-k">// Memory system</span>
            <span class="openclaw-ws-t">Persistencia (sin magia)</span>
          </div>
          <div class="openclaw-ws-timeline">
            <div class="openclaw-ws-node">
              <div class="openclaw-ws-node-dot"></div>
              <div class="openclaw-ws-node-title">Hoy / ayer</div>
              <div class="openclaw-ws-node-desc"><code>memory/YYYY-MM-DD.md</code> · anomalías recientes, decisiones y contexto operativo.</div>
            </div>
            <div class="openclaw-ws-node">
              <div class="openclaw-ws-node-dot"></div>
              <div class="openclaw-ws-node-title">Largo plazo</div>
              <div class="openclaw-ws-node-desc"><code>MEMORY.md</code> · patrones, falsos positivos, preferencias de formato y “never again”.</div>
            </div>
            <div class="openclaw-ws-node">
              <div class="openclaw-ws-node-dot"></div>
              <div class="openclaw-ws-node-title">Salida auditable</div>
              <div class="openclaw-ws-node-desc">Telegram para acción rápida + repo para trazabilidad (hallazgo → evidencia → mitigación).</div>
            </div>
          </div>
          <div class="openclaw-ws-glass">
            <div class="openclaw-ws-glass-k">Golden rule</div>
            <div class="openclaw-ws-glass-t">Si te importa mañana, escríbelo hoy.</div>
          </div>
        </div>

        <div class="openclaw-ws-panel openclaw-ws-panel--wide">
          <div class="openclaw-ws-h">
            <span class="openclaw-ws-k">// Filesystem (workspace)</span>
            <span class="openclaw-ws-t">Estructura mental</span>
          </div>
          <div class="code-block">
            <div class="code-header">
              <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
              <span class="code-label">workspace/</span>
            </div>
            <div class="code-body"><span class="c-cyan">SOUL.md</span>        <span class="c-muted"># identidad y tono</span>
<span class="c-cyan">USER.md</span>        <span class="c-muted"># equipo, objetivos, restricciones</span>
<span class="c-cyan">AGENTS.md</span>      <span class="c-muted"># protocolo, límites y comandos</span>
<span class="c-cyan">MEMORY.md</span>      <span class="c-muted"># patrones/prefs (largo plazo)</span>
<span class="c-cyan">memory/</span>
  <span class="c-green">YYYY-MM-DD.md</span> <span class="c-muted"># log diario (hoy/ayer)</span></div>
          </div>

          <div class="openclaw-ws-out">
            <div class="openclaw-ws-out-h">Salida estándar (Telegram)</div>
            <div class="openclaw-ws-out-row">
              <span class="openclaw-ws-chip">Summary</span>
              <span class="openclaw-ws-chip">High risk</span>
              <span class="openclaw-ws-chip">Evidence</span>
              <span class="openclaw-ws-chip">Next steps</span>
              <span class="openclaw-ws-chip">Correlation</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Idea clave:</strong> el workspace convierte al agente en “analista” (con playbook y memoria), no en un ejecutor descontrolado.
    </div>
  `
};

