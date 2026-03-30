export default {
  sectionLabel: 'SIEM · SOC',
  icon:  '🛡️',
  title: 'SIEM · SOC',
  sub:   'Wazuh',
  dots:  [false, false],

  content: `
    <div class="slide-eyebrow">Issue #7 · SIEM</div>
    <div class="slide-heading">Wazuh<span class="badge badge-todo">pendiente</span></div>
    <div class="slide-sub">Wazuh recibe los eventos de seguridad y los correlaciona. Wazuh Dashboard presenta las alertas clasificadas por nivel de riesgo.</div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🛡️</div>
        <div class="card-title">Wazuh Manager</div>
        <div class="card-desc">SIEM open source. Recibe eventos de Clawbot vía API Elastic y aplica reglas de detección.</div>
        <div class="card-tag">siem</div>
      </div>
      <div class="card">
        <div class="card-icon">📊</div>
        <div class="card-title">Wazuh Dashboard</div>
        <div class="card-desc">Dashboard SOC con visualización de vulnerabilidades por nivel de riesgo (crítico/alto/medio).</div>
        <div class="card-tag">:5601</div>
      </div>
      <div class="card">
        <div class="card-icon">🔎</div>
        <div class="card-title">Wazuh Agent</div>
        <div class="card-desc">Agente en VM-Targets que captura logs de Apache/Nginx mientras ZAP realiza el escaneo.</div>
        <div class="card-tag">vm-targets</div>
      </div>
    </div>

    <div class="info-box">
      <strong>Próximo paso:</strong> Desplegar Wazuh en Docker. Crear regla de alerta que dispare al SOC cuando ZAP detecte vulnerabilidad de nivel medio o grave vía API Elastic.
    </div>

    <h3>// comandos_instalacion_wazuh.sh</h3>
    <div class="code-block">
      <div class="code-header">
        <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
        <span class="code-label">terminal - VM 2 (SOC)</span>
      </div>
      <div class="code-body"><span class="c-muted"># 1. Te descargas la carpeta oficial que ya trae el compose real</span>
  <span class="c-cyan">git</span> <span class="c-yellow">clone</span> <span class="c-green">https://github.com/wazuh/wazuh-docker.git -b v4.9.0</span>
  <span class="c-cyan">cd</span> <span class="c-green">wazuh-docker/single-node</span>

  <span class="c-muted"># 2. Ejecutas el script que crea los certificados TLS obligatorios</span>
  <span class="c-cyan">docker</span> <span class="c-yellow">compose</span> <span class="c-green">-f generate-indexer-certs.yml run --rm generator</span>

  <span class="c-muted"># 3. Levantas el chiringuito (Indexer, Manager y Dashboard)</span>
  <span class="c-cyan">docker</span> <span class="c-yellow">compose</span> <span class="c-green">up -d</span></div>
    </div>

    <h3>// instalación SOC paso a paso</h3>
    <div class="steps">
      <div class="step">
        <div class="step-num">01</div>
        <div class="step-content">
          <div class="step-title">Instalar dependencias</div>
          <div class="step-desc"><code>sudo apt install docker.io docker-compose-v2 git -y</code> → <code>sudo usermod -aG docker $USER</code></div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">02</div>
        <div class="step-content">
          <div class="step-title">Descargar repositorio</div>
          <div class="step-desc">Se clona el repositorio oficial de Wazuh Docker y se accede al directorio de despliegue <code>single-node</code>.</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">03</div>
        <div class="step-content">
          <div class="step-title">Generar Certificados</div>
          <div class="step-desc">Se ejecuta el script <code>generate-indexer-certs.yml</code>. <strong>Paso crítico:</strong> Sin esto, la BD rechazará las conexiones del Manager por seguridad.</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">04</div>
        <div class="step-content">
          <div class="step-title">Desplegar y Verificar</div>
          <div class="step-desc"><code>docker compose up -d</code> → Acceder por web a <code>https://IP_VM2</code> (ignorar advertencia de certificado autofirmado).</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Credenciales Wazuh Dashboard:</strong> usuario <code>admin</code> · contraseña <code>SecretPassword</code><br>
      El Wazuh Manager quedará escuchando automáticamente en el puerto <strong>TCP 1514</strong> a la espera de los agentes de la DMZ.
    </div>
  `
};
