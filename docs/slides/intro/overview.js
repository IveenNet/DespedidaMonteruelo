export default {
  sectionLabel: 'Introducción',
  icon:  '🛡️',
  title: 'Visión general',
  sub:   'pipeline · outputs · límites',
  dots:  [true, true, true],

  content: `
    <div class="intro-overview">
      <div class="slide-eyebrow">Proyecto de innovación educativa</div>
      <div class="slide-heading">Análisis de vulnerabilidades <span class="heading-accent">automatizado</span></div>
      <div class="slide-sub">Pipeline reproducible para escanear (ZAP/Nuclei), interpretar (OpenClaw) y entregar respuestas accionables (Telegram + repositorio). El agente <strong>no ejecuta escáneres</strong>: opera con webhooks, memoria y allowlist.</div>


      <div class="slide-actions">
        <button class="btn btn--inline" type="button" data-open-modal="implGuide">Abrir guía de implementación</button>
      </div>

      <!-- Pipeline animado -->
      <div class="pipeline">
        <div class="pipe-node pipe-n8n">
          <div class="pipe-icon">⚙️</div>
          <div class="pipe-label">n8n</div>
          <div class="pipe-sub">orquestador</div>
        </div>
        <div class="pipe-arrow">
          <div class="pipe-flow"></div>
          <span>──→</span>
        </div>
        <div class="pipe-node pipe-zap">
          <div class="pipe-icon">⚡</div>
          <div class="pipe-label">ZAP</div>
          <div class="pipe-sub">scanner activo</div>
        </div>
        <div class="pipe-connector">+</div>
        <div class="pipe-node pipe-nuclei">
          <div class="pipe-icon">🧬</div>
          <div class="pipe-label">Nuclei</div>
          <div class="pipe-sub">templates CVE</div>
        </div>
        <div class="pipe-arrow">
          <div class="pipe-flow"></div>
          <span>──→</span>
        </div>
        <div class="pipe-node pipe-openclaw">
          <div class="pipe-icon">🦞</div>
          <div class="pipe-label">OpenClaw</div>
          <div class="pipe-sub">analista · memoria</div>
        </div>
        <div class="pipe-arrow">
          <div class="pipe-flow"></div>
          <span>──→</span>
        </div>
        <div class="pipe-node pipe-telegram">
          <div class="pipe-icon">✈️</div>
          <div class="pipe-label">Telegram</div>
          <div class="pipe-sub">ChatOps</div>
        </div>
        <div class="pipe-connector">+</div>
        <div class="pipe-node pipe-github">
          <div class="pipe-icon">🐙</div>
          <div class="pipe-label">GitHub</div>
          <div class="pipe-sub">informes · PR</div>
        </div>
      </div>

      <!-- Cards herramientas -->
      <div class="cards">
        <div class="card">
          <div class="card-icon">🎯</div>
          <div class="card-title">Targets</div>
          <div class="card-desc">Juice Shop y DVWA como aplicaciones vulnerables objetivo del escaneo en red DMZ.</div>
          <div class="card-tag">DONE ✓</div>
        </div>
        <div class="card">
          <div class="card-icon">⚙️</div>
          <div class="card-title">n8n + ZAP + Nuclei</div>
          <div class="card-desc">n8n orquesta el flujo completo. ZAP hace el spider y active scan. Nuclei lanza templates CVE.</div>
          <div class="card-tag">DONE ✓</div>
        </div>
        <div class="card">
          <div class="card-icon">🦞</div>
          <div class="card-title">OpenClaw (Pirineus)</div>
          <div class="card-desc">Interpreta webhooks (n8n/Wazuh), correlaciona señales, usa memoria y devuelve playbooks por Telegram. Threat intel (Shodan/VT) solo cuando lo piden.</div>
          <div class="card-tag">DONE ✓</div>
        </div>
        <div class="card">
          <div class="card-icon">🛡️</div>
          <div class="card-title">Wazuh SIEM</div>
          <div class="card-desc">SIEM desplegado (Docker): ingesta, reglas, MITRE y SOAR hacia OpenClaw (webhook en alertas críticas) con trazabilidad en Telegram.</div>
          <div class="card-tag">DONE ✓</div>
        </div>
        <div class="card">
          <div class="card-icon">✈️</div>
          <div class="card-title">Alertas Telegram</div>
          <div class="card-desc">Informe de seguridad completo con ZAP + Nuclei entregado por Telegram al finalizar cada escaneo.</div>
          <div class="card-tag">DONE ✓</div>
        </div>
        <div class="card">
          <div class="card-icon">🔐</div>
          <div class="card-title">Límites y control</div>
          <div class="card-desc">Approvals/allowlist: el agente es capaz, pero el perímetro lo define el proyecto. Sin inventar resultados, sin tocar host/FS.</div>
          <div class="card-tag card-tag--guard">GUARDRAILS</div>
        </div>
      </div>

      <!-- Tabla estado -->
      <table class="data-table">
        <tr><th>Herramienta</th><th>Rol</th><th>Estado</th></tr>
        <tr><td>n8n</td><td>Orquestador del flujo de escaneo</td><td><span class="badge badge-done">completado</span></td></tr>
        <tr><td>OWASP ZAP</td><td>Escáner activo — spider + active scan</td><td><span class="badge badge-done">completado</span></td></tr>
        <tr><td>Nuclei</td><td>Escáner de templates CVE / vulnerabilidades conocidas</td><td><span class="badge badge-done">completado</span></td></tr>
        <tr><td>OpenClaw</td><td>Agente IA — análisis e informe via webhook</td><td><span class="badge badge-done">completado</span></td></tr>
        <tr><td>Wazuh</td><td>SIEM — correlación de alertas y dashboard SOC</td><td><span class="badge badge-done">completado</span></td></tr>
        <tr><td>Juice Shop / DVWA</td><td>Aplicaciones objetivo (red DMZ)</td><td><span class="badge badge-done">completado</span></td></tr>
        <tr><td>Telegram Bot</td><td>Notificaciones al equipo SOC</td><td><span class="badge badge-done">completado</span></td></tr>
        <tr><td>GitHub</td><td>Entrega: informes, PRs y trazabilidad</td><td><span class="badge badge-done">completado</span></td></tr>
      </table>
    </div>
  `
};