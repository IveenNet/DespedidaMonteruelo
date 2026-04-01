export default {
  sectionLabel: null,
  icon:  '🌐',
  title: 'Red · Opnsense',
  sub:   'segmentación · rutas · reglas',
  dots:  [true, true, true],

  content: `
    <div class="slide-eyebrow">Issue #5 · Infraestructura</div>
    <div class="slide-heading">Red · Opnsense <span class="badge badge-done">completado</span></div>
    <div class="slide-sub">La red es el “guardrail físico” del lab: segmentación, rutas y reglas para que el escáner llegue a los targets sin abrir más de lo necesario.</div>

    <div class="slide-actions">
      <button class="btn btn--inline" type="button" data-open-modal="implGuide">Abrir guía de implementación</button>
      <a class="btn btn--ghost" href="./assets/images/red_drawio.jpg" target="_blank" rel="noopener noreferrer">Ver diagrama en grande</a>
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🔥</div>
        <div class="card-title">Firewall</div>
        <div class="card-desc">Políticas 'Deny All' por defecto. Reglas explícitas para permitir escaneos (8080, 3000) y telemetría (1514) entre zonas.</div>
      </div>
      <div class="card">
        <div class="card-icon">🔀</div>
        <div class="card-title">VLANs</div>
        <div class="card-desc">División en 5 subredes aisladas: Admins (Jump Host), DMZ (Targets), LANOPERADORES (SOC), LANWAZUH (SIEM) y SECOPS (Pentesting/Bot).</div>
      </div>
      <div class="card">
        <div class="card-icon">🔗</div>
        <div class="card-title">Conectividad</div>
        <div class="card-desc">Flujo validado: Escaneos (SECOPS → DMZ), Telemetría (All → LANWAZUH) y Túnel de Alertas Críticas (Wazuh → OpenClaw → Telegram).</div>
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
              <div class="step-desc">
  Targets aislados del scanner y del SOC; nada de "todo en la misma red".
  
  <div class="code-block" style="margin-top: 1rem;">
    <div class="code-header">
      <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
      <span class="code-label">interfaces_opnsense.conf</span>
    </div>
    <div class="code-body"><span class="c-muted"># INTERFAZ      | SUBNET (CIDR)     | ROL / PROPÓSITO</span>
<span class="c-muted">#-----------------------------------------------------------------------</span>
<span class="c-cyan">Admins</span>        | 20.0.0.0/24       | <span class="c-green">Acceso administrativo y Jump Host</span>
<span class="c-cyan">DMZ</span>           | 203.0.113.0/24    | <span class="c-green">Contenedores vulnerables (Targets)</span>
<span class="c-cyan">LANOPERADORES</span> | 192.168.56.0/24   | <span class="c-green">Analistas SOC (Workstations)</span>
<span class="c-cyan">LANWAZUH</span>      | 40.0.0.0/24       | <span class="c-green">Core SIEM (Indexador, Manager, Dashboard)</span>
<span class="c-cyan">SECOPS</span>        | 203.0.114.0/24    | <span class="c-green">Pentesting, Orquestación (n8n) y OpenClaw</span>
<span class="c-cyan">WAN</span>           | Pública / NAT     | <span class="c-green">Salida a Internet (Telegram, Shodan, VT)</span></div>
  </div>
</div>
            </div>
          </div>
          <div class="step">
            <div class="step-num">02</div>
            <div class="step-content">
              <div class="step-title">Reglas mínimas</div>
              <div class="oc-a-env" style="margin-top: 2rem;">
      <div class="oc-a-env-h">Matriz de Acceso: Reglas de Firewall (OPNsense)</div>
      <div class="code-block">
        <div class="code-header">
          <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
          <span class="code-label">firewall_ruleset.conf</span>
        </div>
        <div class="code-body"><span class="c-muted"># ACCIÓN | INTERFAZ ORIGEN | DESTINO          | PUERTOS        | JUSTIFICACIÓN</span>
<span class="c-muted">#---------------------------------------------------------------------------------------------------------</span>
<span class="c-orange">DROP</span>   | WAN             | ANY              | ANY            | <span class="c-muted">Active Response: Bloqueo de IPs maliciosas (SOC_AUTO_BLOCK)</span>
<span class="c-green">PASS</span>   | WAN             | DMZ (Targets)    | 21, 22, 80/443 | <span class="c-muted">Exposición pública intencionada del entorno vulnerable</span>
<span class="c-green">PASS</span>   | LANOPERADORES   | DMZ              | puertos_dmz    | <span class="c-muted">Acceso auditores a los servicios vulnerables (Alias)</span>
<span class="c-green">PASS</span>   | LANOPERADORES   | ! DMZ            | ANY            | <span class="c-muted">Salida a Internet y acceso al Dashboard de Wazuh</span>
<span class="c-green">PASS</span>   | SECOPS          | DMZ              | TCP 3000, 8080 | <span class="c-muted">Tráfico de ataque: Escaneos DAST de ZAP y Nuclei</span>
<span class="c-green">PASS</span>   | SECOPS          | WAN              | TCP 443        | <span class="c-muted">Salida de OpenClaw hacia API de Telegram y Threat Intel</span>
<span class="c-green">PASS</span>   | DMZ / SECOPS    | LANWAZUH         | TCP 1514       | <span class="c-muted">Telemetría: Envío de logs desde los agentes al Manager</span>
<span class="c-green">PASS</span>   | LANWAZUH        | SECOPS           | TCP 18789      | <span class="c-muted">Túnel Zero Trust: Inyección de alertas críticas a OpenClaw</span>
<span class="c-green">PASS</span>   | LANWAZUH        | DMZ / SECOPS     | TCP 22         | <span class="c-muted">Gestión interna autorizada desde la red del SIEM</span>
<span class="c-green">PASS</span>   | Admins          | ANY              | TCP 22, 443    | <span class="c-muted">Administración integral desde el Jump Host</span>
<span class="c-orange">DROP</span>   | ANY             | ANY              | ANY            | <span class="c-muted">Default Deny (Cierre total implícito del Firewall)</span></div>
      </div>
    </div>
            </div>
          </div>
          <div class="step">
            <div class="step-num">03</div>
            <div class="step-content">
              <div class="step-title">Trazabilidad</div>
              <div class="step-desc">
  Que sea fácil explicar "qué componente habla con cuál" y por qué, mediante el registro centralizado del firewall.
  
  <div class="code-block" style="margin-top: 1rem;">
    <div class="code-header">
      <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
      <span class="code-label">opnsense_filterlog.log</span>
    </div>
    <div class="code-body"><span class="c-muted"># Trazabilidad del flujo completo: Escaneo -> Alerta -> Bloqueo</span>

<span class="c-muted">[10:15:22]</span> <span class="c-green">PASS</span> | <span class="c-cyan">SECOPS</span> -> <span class="c-cyan">DMZ</span> | <span class="c-yellow">203.0.114.10:51234</span> -> <span class="c-yellow">203.0.113.10:8080</span>
<span class="c-muted">> ZAP enviando payloads de inyección HTTP contra DVWA</span>

<span class="c-muted">[10:18:05]</span> <span class="c-green">PASS</span> | <span class="c-cyan">LANWAZUH</span> -> <span class="c-cyan">SECOPS</span> | <span class="c-yellow">40.0.0.10:48112</span> -> <span class="c-yellow">203.0.114.10:18789</span>
<span class="c-muted">> El script Python inyecta la alerta crítica por el túnel Zero Trust hacia OpenClaw</span>

<span class="c-muted">[10:18:10]</span> <span class="c-orange">DROP</span> | <span class="c-cyan">WAN</span> -> <span class="c-cyan">DMZ</span> | <span class="c-yellow">185.15.2.44:33412</span> -> <span class="c-yellow">203.0.113.10:22</span>
<span class="c-muted">> Active Response de Wazuh actuando en el Firewall: IP bloqueada por SOC_AUTO_BLOCK</span></div>
  </div>
</div>
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