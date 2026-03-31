export default {
  sectionLabel: null,
  icon:  '🌐',
  title: 'Red · Opnsense',
  sub:   'segmentación · rutas · reglas',
  dots:  [true, false, false],

  content: `
    <div class="slide-eyebrow">Issue #5 · Infraestructura</div>
    <div class="slide-heading">Red · Opnsense <span class="badge badge-wip">en progreso</span></div>
    <div class="slide-sub">La red es el “guardrail físico” del lab: segmentación, rutas y reglas para que el escáner llegue a los targets sin abrir más de lo necesario.</div>

    <div class="slide-actions">
      <button class="btn btn--inline" type="button" data-open-modal="implGuide">Abrir guía de implementación</button>
      <a class="btn btn--ghost" href="./assets/images/red_drawio.jpg" target="_blank" rel="noopener noreferrer">Ver diagrama en grande</a>
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🔥</div>
        <div class="card-title">Firewall</div>
        <div class="card-desc">Reglas explícitas entre redes: permitir solo lo necesario (HTTP/HTTPS a targets, puertos del scanner, gestión restringida).</div>
        <div class="card-tag card-tag--todo">pendiente</div>
      </div>
      <div class="card">
        <div class="card-icon">🔀</div>
        <div class="card-title">VLANs</div>
        <div class="card-desc">Separación clara: DMZ (targets) vs SecOps (scanner) vs SOC (SIEM). Menos blast radius, más trazabilidad.</div>
        <div class="card-tag card-tag--todo">pendiente</div>
      </div>
      <div class="card">
        <div class="card-icon">🔗</div>
        <div class="card-title">Conectividad</div>
        <div class="card-desc">Verificar el flujo real: n8n/ZAP/Nuclei → targets; y salida del informe → OpenClaw (gateway en host) → Telegram/GitHub.</div>
        <div class="card-tag card-tag--todo">pendiente</div>
      </div>
    </div>

    <div class="network-diagram">
      <img src="./assets/images/red_drawio.jpg" alt="Diagrama de red" />
    </div>

    <details class="accordion">
      <summary>
        <span class="acc-left">
          <span class="acc-ico">🧭</span>
          <span>
            <span class="acc-title">Checklist de diseño</span><br/>
            <span class="acc-sub">lo que tiene que quedar “obvio” para el lector</span>
          </span>
        </span>
        <span class="acc-cta">ver</span>
      </summary>
      <div class="acc-body">
        <div class="steps">
          <div class="step">
            <div class="step-num">01</div>
            <div class="step-content">
              <div class="step-title">Segmentación</div>
              <div class="step-desc">Targets aislados del scanner y del SOC; nada de “todo en la misma red”.</div>
            </div>
          </div>
          <div class="step">
            <div class="step-num">02</div>
            <div class="step-content">
              <div class="step-title">Reglas mínimas</div>
              <div class="step-desc">Abrir únicamente puertos y direcciones necesarias para el pipeline del lab.</div>
            </div>
          </div>
          <div class="step">
            <div class="step-num">03</div>
            <div class="step-content">
              <div class="step-title">Trazabilidad</div>
              <div class="step-desc">Que sea fácil explicar “qué componente habla con cuál” y por qué.</div>
            </div>
          </div>
        </div>
      </div>
    </details>

    <div class="info-box">
      <strong>Nota:</strong> La conectividad SSH entre VMs quedará resuelta una vez Opnsense esté gestionando el enrutamiento de la red del laboratorio en Isard.
    </div>
  `
};