export default {
  sectionLabel: null,
  icon:  '📡',
  title: 'Alertas',
  sub:   'VirusTotal · Telegram',
  dots:  [false, false],

  content: `
    <div class="slide-eyebrow">Issue #8 · Alertas</div>
    <div class="slide-heading">VirusTotal · Telegram <span class="badge badge-todo">pendiente</span></div>
    <div class="slide-sub">VirusTotal enriquece los hallazgos de ZAP analizando URLs y hashes. Telegram notifica al equipo en tiempo real cuando se detecta una vulnerabilidad.</div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🦠</div>
        <div class="card-title">VirusTotal API</div>
        <div class="card-desc">Analiza URLs, dominios y hashes detectados por ZAP para enriquecer el contexto de amenaza.</div>
        <div class="card-tag">500 req/día</div>
      </div>
      <div class="card">
        <div class="card-icon">✈️</div>
        <div class="card-title">Telegram Bot</div>
        <div class="card-desc">Notificación instantánea al equipo cuando Clawbot detecta una vulnerabilidad media o grave.</div>
        <div class="card-tag">bot api</div>
      </div>
    </div>

    <h3>// variables de entorno (.env)</h3>
    <div class="code-block">
      <div class="code-header">
        <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
        <span class="code-label">.env</span>
      </div>
      <div class="code-body"><span class="c-muted"># VirusTotal</span>
<span class="c-cyan">VIRUSTOTAL_API_KEY</span>=<span class="c-green">tu_clave_aqui</span>

<span class="c-muted"># Telegram Bot</span>
<span class="c-cyan">TELEGRAM_BOT_TOKEN</span>=<span class="c-green">tu_token_aqui</span>
<span class="c-cyan">TELEGRAM_CHAT_ID</span>=<span class="c-green">tu_chat_id_aqui</span>

<span class="c-muted"># OWASP ZAP</span>
<span class="c-cyan">ZAP_API_KEY</span>=<span class="c-green">tu_clave_zap_aqui</span></div>
    </div>

    <div class="info-box">
      <strong>VirusTotal gratuito:</strong> 500 consultas/día · 4 consultas/minuto. Suficiente para el laboratorio.<br>
      Regístrate en <strong>virustotal.com</strong> → perfil → API Key.
    </div>
  `
};
