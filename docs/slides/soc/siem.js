export default {
  sectionLabel: 'SIEM · SOC',
  icon:  '🛡️',
  title: 'SIEM · SOC',
  sub:   'Wazuh · SOAR · Threat Intel',
  dots:  [true, true, true],

  content: `
    <div class="slide-eyebrow">Issue #7 · SIEM</div>
    <div class="slide-heading">Wazuh · SOC <span class="badge badge-done">COMPLETADO</span></div>
    <div class="slide-sub">El SIEM es el cerebro analítico del laboratorio. Centraliza la telemetría, detecta vulnerabilidades, mapea amenazas con MITRE ATT&CK y orquesta respuestas automatizadas (SOAR) hacia OpenClaw.</div>

    <div class="slide-actions">
      <button class="btn btn--inline" type="button" data-open-modal="implGuide">Abrir guía de implementación</button>
      <a class="btn btn--ghost" href="./assets/images/wazuh_diagram.jpg" target="_blank" rel="noopener noreferrer">Ver diagrama en grande</a>
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🛡️</div>
        <div class="card-title">Arquitectura y Agentes</div>
        <div class="card-desc">Despliegue del stack completo (Indexer, Server y Dashboard v4.14.3) en Docker. Agentes segmentados en: <em>firewalls, secops, web-servers</em> y <em>workstations</em>.</div>
      </div>
      <div class="card">
        <div class="card-icon">👁️</div>
        <div class="card-title">Ingesta y Custom Rules</div>
        <div class="card-desc">Lectura de logs nativos, Docker y Suricata (eve.json). Uso de decodificadores propios y <code>local_rules.xml</code> para afinar la detección y reducir falsos positivos.</div>
      </div>
      <div class="card">
        <div class="card-icon">🚀</div>
        <div class="card-title">Respuesta Automatizada (SOAR)</div>
        <div class="card-desc">Script Python (Integrations) que inyecta alertas críticas (Nivel ≥ 10) al bot OpenClaw vía Webhook, reduciendo el MTTR (Tiempo Medio de Respuesta) a segundos.</div>
      </div>
    </div>

    <div class="diagram-section" style="margin: 2.5rem 0; padding: 1.5rem; background: #1a1a1a; border-radius: 12px; border: 1px dashed #444; text-align: center;">
      <div style="font-size: 0.85rem; color: #888; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px;">Topología del Flujo SOC / SOAR</div>
      
      <div class="network-diagram">
        <img src="./assets/images/wazuh_diagram.jpg" alt="Diagrama de red" />
      </div>
      
      <div class="step-desc" style="margin-top: 1rem; font-style: italic;">
        Flujo de telemetría en tiempo real: desde la recolección en los endpoints hasta la notificación final vía webhook.
      </div>
    </div>

    <div class="info-box">
      <strong>Caso de validación:</strong> Durante las pruebas, se simuló un ataque de fuerza bruta SSH contra la DMZ. Wazuh correlacionó los fallos de autenticación (Regla 5712, Nivel 10) y el script disparó el payload al canal de SecOps en Telegram en menos de 1 segundo.
    </div>

    <details class="accordion" style="margin-top: 1.5rem;">
      <summary>
        <span class="acc-left">
          <span class="acc-ico">📦</span>
          <span>
            <span class="acc-title">Instalación SOC paso a paso</span><br/>
            <span class="acc-sub">Despliegue del Stack y Enrolamiento de Agentes</span>
          </span>
        </span>
        <span class="acc-cta">ver</span>
      </summary>
      <div class="acc-body">
        <div class="steps">
          <div class="step">
            <div class="step-num">01</div>
            <div class="step-content">
              <div class="step-title">Preparar el entorno y clonar repositorio</div>
              <div class="step-desc">Instalamos las dependencias necesarias y descargamos la versión específica del stack de Wazuh para Docker.</div>
              <div class="code-block" style="margin-top: 0.75rem;">
                <div class="code-header"><span class="code-label">bash</span></div>
                <div class="code-body">sudo apt update && sudo apt install docker.io docker-compose-v2 git -y
git clone https://github.com/wazuh/wazuh-docker.git -b v4.14.3
cd wazuh-docker/single-node</div>
              </div>
            </div>
          </div>
          <div class="step">
            <div class="step-num">02</div>
            <div class="step-content">
              <div class="step-title">Generar Certificados TLS</div>
              <div class="step-desc"><strong>Paso crítico:</strong> Wazuh Indexer requiere certificados para la comunicación cifrada con el Manager y el Dashboard.</div>
              <div class="code-block" style="margin-top: 0.75rem;">
                <div class="code-header"><span class="code-label">bash</span></div>
                <div class="code-body">docker compose -f generate-indexer-certs.yml run --rm generator</div>
              </div>
            </div>
          </div>
          <div class="step">
            <div class="step-num">03</div>
            <div class="step-content">
              <div class="step-title">Desplegar el Stack</div>
              <div class="step-desc">Levantamos los contenedores en segundo plano. El Manager queda escuchando en <strong>TCP 1514</strong> y el Dashboard en <strong>443</strong> (<code>admin / SecretPassword</code>).</div>
              <div class="code-block" style="margin-top: 0.75rem;">
                <div class="code-header"><span class="code-label">bash</span></div>
                <div class="code-body">docker compose up -d</div>
              </div>
            </div>
          </div>
          <div class="step">
            <div class="step-num">04</div>
            <div class="step-content">
              <div class="step-title">Enrolamiento desde el Dashboard</div>
              <div class="step-desc">Para agilizar el proceso, se utiliza el asistente nativo (<em>Agents -> Deploy new agent</em>). Al seleccionar el sistema operativo y la IP del SOC, el Dashboard genera el comando exacto de instalación y registro.</div>
              <div class="code-block" style="margin-top: 0.75rem;">
                <div class="code-header"><span class="code-label">bash</span></div>
                <div class="code-body"><span class="c-muted"># Ejemplo del comando autogenerado listo para pegar en el endpoint:</span>
WAZUH_MANAGER="10.0.0.X" WAZUH_REGISTRATION_SERVER="10.0.0.X" apt-get install wazuh-agent
systemctl daemon-reload
systemctl enable wazuh-agent
systemctl start wazuh-agent</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </details>

    <details class="accordion">
      <summary>
        <span class="acc-left">
          <span class="acc-ico">⚙️</span>
          <span>
            <span class="acc-title">Configuración de Logs (agent.conf)</span><br/>
            <span class="acc-sub">Despliegue masivo por grupos (Ej: OPNsense / Suricata)</span>
          </span>
        </span>
        <span class="acc-cta">ver</span>
      </summary>
      <div class="acc-body">
        <div class="step-desc" style="margin-bottom: 1rem;">
          Se empujan configuraciones centralizadas desde el Manager a los grupos. Así extraemos la inteligencia del IPS (Suricata) instalado en el OPNsense sin tocar el firewall a mano. <strong>Esta configuración se aplica cómodamente desde la interfaz web</strong> navegando a <em>Management > Groups > firewalls > Files > agent.conf</em>.
        </div>
        <div class="code-block">
          <div class="code-header">
            <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
            <span class="code-label">agent.conf (Grupo: firewalls)</span>
          </div>
          <div class="code-body"><span class="c-muted">&lt;agent_config&gt;</span>
  <span class="c-muted">&lt;!-- Logs del Firewall (OPNsense) --&gt;</span>
  <span class="c-cyan">&lt;localfile&gt;</span>
    <span class="c-green">&lt;log_format&gt;</span>syslog<span class="c-green">&lt;/log_format&gt;</span>
    <span class="c-green">&lt;location&gt;</span>/var/log/filter/filter*.log<span class="c-green">&lt;/location&gt;</span>
  <span class="c-cyan">&lt;/localfile&gt;</span>

  <span class="c-muted">&lt;!-- Alertas del IPS (Suricata) estructuradas --&gt;</span>
  <span class="c-cyan">&lt;localfile&gt;</span>
    <span class="c-green">&lt;log_format&gt;</span>json<span class="c-green">&lt;/log_format&gt;</span>
    <span class="c-green">&lt;location&gt;</span>/var/log/suricata/eve.json<span class="c-green">&lt;/location&gt;</span>
  <span class="c-cyan">&lt;/localfile&gt;</span>
<span class="c-muted">&lt;/agent_config&gt;</span></div>
        </div>
      </div>
    </details>

    <details class="accordion">
      <summary>
        <span class="acc-left">
          <span class="acc-ico">🐍</span>
          <span>
            <span class="acc-title">Integración SOAR con OpenClaw</span><br/>
            <span class="acc-sub">Bypass de la limitación de cabeceras de Wazuh</span>
          </span>
        </span>
        <span class="acc-cta">ver</span>
      </summary>
      <div class="acc-body">
        <div class="step-desc" style="margin-bottom: 1rem;">
          El Webhook de OpenClaw exige validación por Token. Se desarrolló un script para formatear el JSON y firmar la petición HTTP. <strong>Dado que el Manager corre en Docker</strong>, es vital inyectar el script en el contenedor y asignarle los permisos correctos (<code>root:wazuh</code>).
        </div>
        
        <div class="code-block" style="margin-bottom: 1.5rem;">
          <div class="code-header"><span class="code-label">bash</span></div>
          <div class="code-body"><span class="c-muted"># 1. Inyectar el script al contenedor del Manager</span>
docker cp custom-openclaw wazuh-wazuh.manager-1:/var/ossec/integrations/

<span class="c-muted"># 2. Corregir propietario y permisos de ejecución</span>
docker exec -u root wazuh-wazuh.manager-1 chown root:wazuh /var/ossec/integrations/custom-openclaw
docker exec -u root wazuh-wazuh.manager-1 chmod 750 /var/ossec/integrations/custom-openclaw</div>
        </div>

        <div class="code-block">
          <div class="code-header">
            <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
            <span class="code-label">/var/ossec/integrations/custom-openclaw</span>
          </div>
          <div class="code-body"><span class="c-muted">#!/var/ossec/framework/python/bin/python3</span>
<span class="c-cyan">import</span> sys, json, requests

<span class="c-muted"># Configuración segura y ruta del gateway</span>
WEBHOOK_URL = <span class="c-green">"http://&lt;IP_OPENCLAW&gt;:18789/hooks/agent"</span>
TOKEN = <span class="c-green">"&lt;TU_TOKEN_SECRETO&gt;"</span>
headers = {
    <span class="c-green">'Content-Type'</span>: <span class="c-green">'application/json'</span>,
    <span class="c-green">'Authorization'</span>: <span class="c-cyan">f</span><span class="c-green">'Bearer {</span>TOKEN<span class="c-green">}'</span>
}

<span class="c-muted"># Extraer telemetría de la alerta (Nivel 10+)</span>
alert_file = sys.argv[<span class="c-yellow">1</span>]
<span class="c-cyan">with</span> open(alert_file, <span class="c-green">'r'</span>) <span class="c-cyan">as</span> f:
    alert_data = json.load(f)

src_ip = alert_data.get(<span class="c-green">'data'</span>, {}).get(<span class="c-green">'srcip'</span>, <span class="c-green">'IP no registrada'</span>)
dst_user = alert_data.get(<span class="c-green">'data'</span>, {}).get(<span class="c-green">'dstuser'</span>, <span class="c-green">'Usuario no registrado'</span>)

<span class="c-muted"># Formatear y Enviar a Telegram</span>
payload = {
    <span class="c-green">"agentId"</span>: <span class="c-green">"main"</span>,
    <span class="c-green">"message"</span>: <span class="c-cyan">f</span><span class="c-green">"🚨 *ALERTA WAZUH*, IP Atacante: {</span>src_ip<span class="c-green">}, User: {</span>dst_user<span class="c-green">}"</span>,
    <span class="c-green">"deliver"</span>: <span class="c-cyan">True</span>,
    <span class="c-green">"channel"</span>: <span class="c-green">"telegram"</span>,
    <span class="c-green">"to"</span>: <span class="c-green">"-5219601134"</span>
}
requests.post(WEBHOOK_URL, json=payload, headers=headers)</div>
        </div>
      </div>
    </details>

    <details class="accordion">
      <summary>
        <span class="acc-left">
          <span class="acc-ico">🎯</span>
          <span>
            <span class="acc-title">Vulnerability Detection & MITRE</span><br/>
            <span class="acc-sub">Auditoría pasiva y Threat Intelligence</span>
          </span>
        </span>
        <span class="acc-cta">ver</span>
      </summary>
      <div class="acc-body">
        <div class="steps">
          <div class="step">
            <div class="step-num">01</div>
            <div class="step-content">
              <div class="step-title">Threat Hunting (MITRE ATT&CK)</div>
              <div class="step-desc">Wazuh clasifica cada alerta mapeando la táctica y técnica del atacante (ej. <em>T1110 - Credential Access</em>), vital para perfilar ataques automatizados de herramientas como Nuclei.</div>
            </div>
          </div>
          <div class="step">
            <div class="step-num">02</div>
            <div class="step-content">
              <div class="step-title">Vulnerability Scanner</div>
              <div class="step-desc">El agente cruza periódicamente el inventario de software de los endpoints con las bases de datos del NVD, alertando de CVEs críticos y su puntuación CVSS.</div>
            </div>
          </div>
          <div class="step">
            <div class="step-num">03</div>
            <div class="step-content">
              <div class="step-title">Integración Threat Intelligence (CTI)</div>
              <div class="step-desc">Enriquecimiento de logs consultando bases externas (como VirusTotal o AlienVault OTX) para detectar hashes, IPs o dominios maliciosos conocidos al instante.</div>
            </div>
          </div>
          <div class="step">
            <div class="step-num">04</div>
            <div class="step-content">
              <div class="step-title">Active Response (Bloqueo)</div>
              <div class="step-desc">Capacidad de reacción automática inyectando la IP del atacante en la tabla de <em>Drop</em> del firewall perimetral (OPNsense) para aislar intrusiones en tiempo real.</div>
            </div>
          </div>
          <div class="step">
            <div class="step-num">05</div>
            <div class="step-content">
              <div class="step-title">Dashboards Nativos vs Custom</div>
              <div class="step-desc">Como filosofía de diseño del laboratorio, se optó por utilizar exclusivamente los dashboards y módulos que Wazuh proporciona por defecto. Crear visualizaciones personalizadas en OpenSearch añade una complejidad innecesaria, ya que la interfaz nativa cubre perfectamente las necesidades de monitorización, MITRE y vulnerabilidades.</div>
            </div>
          </div>
        </div>
      </div>
    </details>
  `
};