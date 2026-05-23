export default {
  sectionLabel: "SecOps",
  icon: "🧩",
  title: "Lab SecOps",
  sub: "Docker · redes · escáneres",
  dots: [true, true, true],

  content: `
    <div class="secops-lab">
      <div class="slide-eyebrow">SecOps · server-pirineus</div>
      <div class="slide-heading">VM-Scanner <span class="badge badge-done">completado</span></div>
      <div class="slide-sub"><code>vm-scanner/</code> contiene <code>docker-compose.yml</code>, <code>.env</code> y el wrapper <code>nuclei-api.py</code>. La idea: red interna (<code>secops-net</code>) + servicios listos para orquestación desde n8n.</div>

      <div class="slide-actions">
        <button class="btn btn--inline" type="button" data-open-modal="implGuide">Abrir guía de implementación</button>
        <a class="btn btn--ghost" href="assets/downloads/vm-scanner/docker-compose.yml" download="docker-compose.yml">Descargar compose</a>
        <a class="btn btn--ghost" href="assets/downloads/vm-scanner/nuclei-api.py" download="nuclei-api.py">Descargar nuclei-api.py</a>
        <a class="btn btn--ghost" href="assets/downloads/vm-scanner/.env.example" download=".env.example">Descargar .env.example</a>
      </div>

      <!-- Topología / estado (animado) -->
      <div class="secops-topology">
        <div class="topology-title">
          <span class="topology-kicker">// vm-scanner stack</span>
          <span class="topology-hint">secops-net · 172.20.0.0/24 · healthchecks · volúmenes</span>
        </div>

        <div class="topology-row topology-row-5">
          <div class="t-node t-node-orch">
            <div class="t-node-top">
              <span class="t-ico">⚙️</span>
              <span class="t-name">n8n</span>
              <span class="t-status t-status-up"><span class="t-dot"></span>:5678</span>
            </div>
            <div class="t-meta">
              <span class="t-pill">user mgmt</span>
              <span class="t-pill t-pill-img">n8nio/n8n</span>
              <span class="t-pill t-pill-net">secops-net</span>
            </div>
          </div>

          <div class="t-link" aria-hidden="true"><div class="t-flow"></div><span class="t-arrow">──→</span></div>

          <div class="t-node t-node-scan">
            <div class="t-node-top">
              <span class="t-ico">⚡</span>
              <span class="t-name">OWASP ZAP</span>
              <span class="t-status t-status-up"><span class="t-dot"></span>:8090</span>
            </div>
            <div class="t-meta">
              <span class="t-pill">daemon</span>
              <span class="t-pill">healthcheck</span>
              <span class="t-pill t-pill-img">zaproxy:stable</span>
            </div>
          </div>

          <div class="t-link t-link-dim" aria-hidden="true"><div class="t-flow"></div><span class="t-arrow">──→</span></div>

          <div class="t-node t-node-api">
            <div class="t-node-top">
              <span class="t-ico">🐍</span>
              <span class="t-name">nuclei-api</span>
              <span class="t-status t-status-warm"><span class="t-dot"></span>:5000</span>
            </div>
            <div class="t-meta">
              <span class="t-pill">Flask</span>
              <span class="t-pill">POST /scan</span>
              <span class="t-pill t-pill-img">Dockerfile</span>
            </div>
          </div>

          <div class="t-link t-link-dim" aria-hidden="true"><div class="t-flow"></div><span class="t-arrow">──→</span></div>

          <div class="t-node t-node-maint">
            <div class="t-node-top">
              <span class="t-ico">🧬</span>
              <span class="t-name">nuclei-updater</span>
              <span class="t-status t-status-warm"><span class="t-dot"></span>24h</span>
            </div>
            <div class="t-meta">
              <span class="t-pill">-update-templates</span>
              <span class="t-pill">update.log</span>
              <span class="t-pill t-pill-img">nuclei:latest</span>
            </div>
          </div>
        </div>

        <div class="topology-foot">
          <span class="t-note"><strong>Claves:</strong> templates en volumen (<code>nuclei-templates</code>), reports en volumen (<code>zap-reports</code>/<code>nuclei-reports</code>), y <code>nuclei-api</code> dentro de la red para resolver <code>http://nuclei-api:5000</code>.</span>
          <span class="t-spark" aria-hidden="true"></span>
        </div>
      </div>

      <div class="cards">
        <div class="card">
          <div class="card-icon">🗂️</div>
          <div class="card-title">Persistencia</div>
          <div class="card-desc">ZAP y Nuclei escriben reports en volúmenes; n8n los monta en modo lectura para construir informes sin “copiar archivos a mano”.</div>
          <div class="card-tag">volumes</div>
        </div>
        <div class="card">
          <div class="card-icon">🛡️</div>
          <div class="card-title">Aislamiento</div>
          <div class="card-desc"><code>secops-net</code> aísla el tráfico entre contenedores. Solo se publican puertos necesarios (<code>5678/8090/5000</code>).</div>
          <div class="card-tag">network</div>
        </div>
        <div class="card">
          <div class="card-icon">🔌</div>
          <div class="card-title">Salida a OpenClaw</div>
          <div class="card-desc">n8n envía el payload al host con <code>host.docker.internal</code> y token Bearer (configurado en <code>.env</code>).</div>
          <div class="card-tag">webhook</div>
        </div>
      </div>

      <h3>// docker-compose.yml</h3>
      <div class="code-block code-block-compose">
        <div class="code-header">
          <div class="code-header-left">
            <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
            <span class="code-label">vm-scanner/docker-compose.yml</span>
          </div>
          <div class="code-header-actions">
            <a class="dl-btn" href="assets/downloads/vm-scanner/docker-compose.yml" download="docker-compose.yml">Descargar</a>
            <button
              class="copy-btn"
              type="button"
              aria-label="Copiar docker-compose.yml"
              title="Copiar"
              data-copy-href="assets/downloads/vm-scanner/docker-compose.yml"
            >Copiar</button>
          </div>
        </div>
        <div class="code-body"><span class="c-yellow">services</span>:
  <span class="c-muted">  # ─── OWASP ZAP ────────────────────────────────────────────────</span>
  <span class="c-yellow">zap</span>:
    <span class="c-yellow">image</span>:<span class="c-green"> ghcr.io/zaproxy/zaproxy:stable</span>
    <span class="c-yellow">container_name</span>:<span class="c-green"> owasp-zap</span>
    <span class="c-yellow">restart</span>:<span class="c-green"> unless-stopped</span>
    <span class="c-yellow">mem_limit</span>:<span class="c-green"> 4g</span>
    <span class="c-yellow">mem_reservation</span>:<span class="c-green"> 1g</span>
    <span class="c-yellow">command</span>:<span class="c-green"> &gt;</span>
        zap.sh -daemon -host 0.0.0.0 -port 8090
        -config api.addrs.addr.name=.*
        -config api.addrs.addr.regex=true
        -config api.key={ZAP_API_KEY}
        -config api.disablekey=false
        -config connection.timeoutInSecs=300
    <span class="c-yellow">ports</span>:
      - <span class="c-green">&quot;8090:8090&quot;</span>
    <span class="c-yellow">environment</span>:
      - <span class="c-green">ZAP_API_KEY={ZAP_API_KEY}</span>
      - <span class="c-green">DMZ_DVWA={DMZ_DVWA}</span>
      - <span class="c-green">DMZ_JUICESHOP={DMZ_JUICESHOP}</span>
      - <span class="c-green">_JAVA_OPTIONS=-Xmx2g</span>
    <span class="c-yellow">volumes</span>:
      - <span class="c-green">zap-data:/zap/wrk</span>
      - <span class="c-green">zap-reports:/zap/reports</span>
    <span class="c-yellow">networks</span>:
      - <span class="c-green">secops-net</span>
    <span class="c-yellow">healthcheck</span>:
      <span class="c-yellow">test</span>:
          [
            &quot;CMD-SHELL&quot;,
            &quot;curl -f http://localhost:8090/JSON/core/view/version/ || exit 1&quot;,
          ]
      <span class="c-yellow">interval</span>:<span class="c-green"> 20s</span>
      <span class="c-yellow">timeout</span>:<span class="c-green"> 10s</span>
      <span class="c-yellow">retries</span>:<span class="c-green"> 5</span>
      <span class="c-yellow">start_period</span>:<span class="c-green"> 60s</span>
  <span class="c-muted">  # ─── NUCLEI (runner bajo demanda) ────────────────────────────</span>
  <span class="c-yellow">nuclei</span>:
    <span class="c-yellow">image</span>:<span class="c-green"> projectdiscovery/nuclei:latest</span>
    <span class="c-yellow">container_name</span>:<span class="c-green"> nuclei</span>
    <span class="c-yellow">restart</span>:<span class="c-green"> unless-stopped</span>
    <span class="c-yellow">entrypoint</span>:<span class="c-green"> [&quot;sleep&quot;, &quot;infinity&quot;]</span>
    <span class="c-yellow">environment</span>:
      - <span class="c-green">DMZ_DVWA={DMZ_DVWA}</span>
      - <span class="c-green">DMZ_JUICESHOP={DMZ_JUICESHOP}</span>
    <span class="c-yellow">volumes</span>:
      - <span class="c-green">nuclei-templates:/root/nuclei-templates</span>
      - <span class="c-green">nuclei-reports:/reports</span>
    <span class="c-yellow">networks</span>:
      - <span class="c-green">secops-net</span>
    <span class="c-yellow">depends_on</span>:
      <span class="c-yellow">nuclei-updater</span>:
        <span class="c-yellow">condition</span>:<span class="c-green"> service_healthy</span>
  <span class="c-muted">  # ─── NUCLEI TEMPLATE UPDATER (cada 24h) ──────────────────────</span>
  <span class="c-muted">  # El bucle: intenta actualizar, espera 1h si falla, 24h si OK.</span>
  <span class="c-muted">  # restart: on-failure evita reinicios infinitos ante errores graves.</span>
  <span class="c-yellow">nuclei-updater</span>:
    <span class="c-yellow">image</span>:<span class="c-green"> projectdiscovery/nuclei:latest</span>
    <span class="c-yellow">container_name</span>:<span class="c-green"> nuclei-updater</span>
    <span class="c-yellow">restart</span>:<span class="c-green"> on-failure</span>
    <span class="c-yellow">entrypoint</span>:<span class="c-green"> &gt;</span>
        sh -c &quot;
          while true; do
            if nuclei -update-templates -ud /root/nuclei-templates; then
              echo \&quot;[$(date -u +%Y-%m-%dT%H:%M:%SZ)] Templates actualizados OK\&quot; &gt;&gt; /root/nuclei-templates/update.log;
              sleep 86400;
            else
              echo \&quot;[$(date -u +%Y-%m-%dT%H:%M:%SZ)] ERROR al actualizar templates, reintentando en 1h\&quot; &gt;&gt; /root/nuclei-templates/update.log;
              sleep 3600;
            fi
          done&quot;
    <span class="c-yellow">volumes</span>:
      - <span class="c-green">nuclei-templates:/root/nuclei-templates</span>
    <span class="c-yellow">networks</span>:
      - <span class="c-green">secops-net</span>
    <span class="c-yellow">healthcheck</span>:
      <span class="c-yellow">test</span>:<span class="c-green"> [&quot;CMD-SHELL&quot;, &quot;test -f /root/nuclei-templates/update.log || exit 1&quot;]</span>
      <span class="c-yellow">interval</span>:<span class="c-green"> 30s</span>
      <span class="c-yellow">timeout</span>:<span class="c-green"> 10s</span>
      <span class="c-yellow">retries</span>:<span class="c-green"> 10</span>
      <span class="c-yellow">start_period</span>:<span class="c-green"> 120s</span>
  <span class="c-muted">  # ─── NUCLEI API WRAPPER ───────────────────────────────────────</span>
  <span class="c-yellow">nuclei-api</span>:
    <span class="c-yellow">build</span>:
      <span class="c-yellow">context</span>:<span class="c-green"> .</span>
      <span class="c-yellow">dockerfile</span>:<span class="c-green"> Dockerfile.nuclei-api</span>
    <span class="c-yellow">container_name</span>:<span class="c-green"> nuclei-api</span>
    <span class="c-yellow">restart</span>:<span class="c-green"> unless-stopped</span>
    <span class="c-yellow">ports</span>:
      - <span class="c-green">&quot;5000:5000&quot;</span>
    <span class="c-yellow">environment</span>:
      - <span class="c-green">DMZ_DVWA={DMZ_DVWA}</span>
      - <span class="c-green">DMZ_JUICESHOP={DMZ_JUICESHOP}</span>
    <span class="c-yellow">volumes</span>:
      - <span class="c-green">nuclei-templates:/root/nuclei-templates</span>
      - <span class="c-green">nuclei-reports:/reports</span>
      - <span class="c-green">./nuclei-api.py:/app/nuclei-api.py</span>
    <span class="c-yellow">working_dir</span>:<span class="c-green"> /app</span>
    <span class="c-yellow">networks</span>:
      - <span class="c-green">secops-net</span>
    <span class="c-yellow">depends_on</span>:
      <span class="c-yellow">nuclei-updater</span>:
        <span class="c-yellow">condition</span>:<span class="c-green"> service_healthy</span>
  <span class="c-muted">  # ─── N8N ──────────────────────────────────────────────────────</span>
  <span class="c-yellow">n8n</span>:
    <span class="c-yellow">image</span>:<span class="c-green"> n8nio/n8n:latest</span>
    <span class="c-yellow">container_name</span>:<span class="c-green"> n8n</span>
    <span class="c-yellow">restart</span>:<span class="c-green"> unless-stopped</span>
    <span class="c-yellow">ports</span>:
      - <span class="c-green">&quot;5678:5678&quot;</span>
    <span class="c-yellow">environment</span>:
      - <span class="c-green">N8N_BLOCK_ENV_ACCESS_IN_NODE=false</span>
      - <span class="c-green">N8N_HOST=0.0.0.0</span>
      - <span class="c-green">N8N_PORT=5678</span>
      - <span class="c-green">N8N_PROTOCOL=http</span>
      - <span class="c-green">WEBHOOK_URL=http://{SECOPS_IP}:5678</span>
      - <span class="c-green">N8N_BASIC_AUTH_ACTIVE=false</span>
      - <span class="c-green">N8N_USER_MANAGEMENT_JWT_SECRET={N8N_JWT_SECRET}</span>
      - <span class="c-green">N8N_DEFAULT_USER_EMAIL={N8N_USER}</span>
      - <span class="c-green">N8N_DEFAULT_USER_PASSWORD={N8N_PASSWORD}</span>
      - <span class="c-green">N8N_LOG_LEVEL=info</span>
      - <span class="c-green">N8N_COMMUNITY_PACKAGES_ENABLED=true</span>
      - <span class="c-green">N8N_SECURE_COOKIE=false</span>
      - <span class="c-green">N8N_ALLOW_EXEC=true</span>
      - <span class="c-green">GENERIC_TIMEZONE=Europe/Madrid</span>
      - <span class="c-green">TZ=Europe/Madrid</span>
      - <span class="c-green">ZAP_API_KEY={ZAP_API_KEY}</span>
      - <span class="c-green">OPENCLAW_TOKEN={OPENCLAW_TOKEN}</span>
      - <span class="c-green">OPENCLAW_URL=http://host.docker.internal:{OPENCLAW_PORT:-18789}</span>
      - <span class="c-green">DMZ_DVWA={DMZ_DVWA}</span>
      - <span class="c-green">DMZ_JUICESHOP={DMZ_JUICESHOP}</span>
    <span class="c-yellow">volumes</span>:
      - <span class="c-green">n8n-data:/home/node/.n8n</span>
      - <span class="c-green">zap-reports:/zap-reports:ro</span>
      - <span class="c-green">nuclei-reports:/home/node/.n8n-files/nuclei-reports:ro</span>
    <span class="c-yellow">networks</span>:
      - <span class="c-green">secops-net</span>
    <span class="c-yellow">depends_on</span>:
      <span class="c-yellow">zap</span>:
        <span class="c-yellow">condition</span>:<span class="c-green"> service_healthy</span>
    <span class="c-yellow">extra_hosts</span>:
      - <span class="c-green">&quot;host.docker.internal:host-gateway&quot;</span>
  <span class="c-muted"># ─── VOLÚMENES ────────────────────────────────────────────────</span>
<span class="c-yellow">volumes</span>:
  <span class="c-yellow">zap-data</span>:
  <span class="c-yellow">zap-reports</span>:
  <span class="c-yellow">nuclei-templates</span>:
  <span class="c-yellow">nuclei-reports</span>:
  <span class="c-yellow">n8n-data</span>:
  <span class="c-muted"># ─── RED ──────────────────────────────────────────────────────</span>
<span class="c-yellow">networks</span>:
  <span class="c-yellow">secops-net</span>:
    <span class="c-yellow">driver</span>:<span class="c-green"> bridge</span>
    <span class="c-yellow">ipam</span>:
      <span class="c-yellow">config</span>:
        - <span class="c-green">subnet: 172.20.0.0/24</span></div>
      </div>

      <h3>// .env (sin secretos)</h3>
    <div class="code-block">
      <div class="code-header">
        <div class="code-header-left">
          <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
          <span class="code-label">vm-scanner/.env</span>
        </div>
        <div class="code-header-actions">
          <a class="dl-btn" href="assets/downloads/vm-scanner/.env.example" download=".env.example">Descargar <span class="dl-hint">.example</span></a>
          <button
            class="copy-btn"
            type="button"
            aria-label="Copiar ejemplo de .env"
            title="Copiar"
            data-copy-href="assets/downloads/vm-scanner/.env.example"
          >Copiar</button>
        </div>
      </div>
      <div class="code-body"><span class="c-muted"># IPs targets (DMZ)</span>
<span class="c-cyan">DMZ_DVWA</span>=<span class="c-green">http://203.0.113.X:8080</span>
<span class="c-cyan">DMZ_JUICESHOP</span>=<span class="c-green">http://203.0.113.X:3000</span>

<span class="c-muted"># SecOps</span>
<span class="c-cyan">SECOPS_IP</span>=<span class="c-green">203.0.114.X</span>

<span class="c-muted"># ZAP · n8n · Nuclei API · OpenClaw</span>
<span class="c-cyan">ZAP_API_KEY</span>=<span class="c-green">__REDACTED__</span>
<span class="c-cyan">N8N_USER</span>=<span class="c-green">admin</span>
<span class="c-cyan">N8N_PASSWORD</span>=<span class="c-green">__REDACTED__</span>
<span class="c-cyan">N8N_JWT_SECRET</span>=<span class="c-green">__REDACTED__</span>
<span class="c-cyan">NUCLEI_API_KEY</span>=<span class="c-green">__REDACTED__</span>
<span class="c-cyan">OPENCLAW_TOKEN</span>=<span class="c-green">__REDACTED__</span>
<span class="c-cyan">OPENCLAW_PORT</span>=<span class="c-green">18789</span></div>
    </div>

      <h3>// por qué <code>nuclei-api</code> y <code>nuclei-updater</code></h3>
      <div class="install-steps">
        <div class="install-step">
          <div class="step-num">01</div>
          <div class="install-body">
            <div class="step-title">Plantillas en volumen (nuclei-updater)</div>
            <div class="step-desc">Los templates no van en una imagen estática que se queda vieja: viven en el volumen <code>nuclei-templates</code>. Este servicio ejecuta <strong>nuclei -update-templates</strong> en bucle, espera 24 h entre ciclos y escribe en <code>update.log</code> sin reiniciar n8n ni el API.</div>
            <div class="cmd-list">
              <div class="cmd-row cmd-row-plain">
                <code class="cmd">nuclei -update-templates -ud /root/nuclei-templates</code>
              </div>
              <div class="cmd-row cmd-row-plain">
                <code class="cmd">sleep 86400  → siguiente ciclo</code>
              </div>
            </div>
          </div>
        </div>
        <div class="install-step">
          <div class="step-num">02</div>
          <div class="install-body">
            <div class="step-title">Contrato HTTP (nuclei-api)</div>
            <div class="step-desc">n8n no lanza Nuclei por shell: habla HTTP con un wrapper Flask. Comparte el mismo volumen de plantillas, escribe JSONL bajo <code>/reports</code> y devuelve <strong>findings</strong> ya parseados al workflow.</div>
            <div class="cmd-list">
              <div class="cmd-row cmd-row-plain">
                <code class="cmd">POST http://nuclei-api:5000/scan — JSON: target, severity</code>
              </div>
              <div class="cmd-row cmd-row-plain">
                <code class="cmd">GET /health · GET /templates — verificar templates montados</code>
              </div>
            </div>
          </div>
        </div>
        <div class="install-step">
          <div class="step-num">03</div>
          <div class="install-body">
            <div class="step-title">Orden y red (secops-net)</div>
            <div class="step-desc"><code>nuclei-api</code> y <code>nuclei</code> esperan a <code>nuclei-updater</code> (<code>service_healthy</code>) antes de arrancar. Todo el stack resuelve nombres en <code>secops-net</code> (<code>owasp-zap</code>, <code>n8n</code>, etc.) y solo expones al host lo imprescindible.</div>
            <div class="cmd-list">
              <div class="cmd-row cmd-row-plain">
                <code class="cmd">subnet 172.20.0.0/24 · puertos típicos hacia fuera: 5678, 8090, 5000</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
      <strong>Importante:</strong> en la slide he omitido tus claves reales. En el servidor se usan variables de entorno (<code>{VAR}</code> con <code>$</code> en el servidor) y secretos en <code>.env</code>.
      </div>

      <h3>// nuclei-api.py (wrapper)</h3>
      <div class="code-block">
        <div class="code-header">
          <div class="code-header-left">
            <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
            <span class="code-label">vm-scanner/nuclei-api.py</span>
          </div>
          <div class="code-header-actions">
            <a class="dl-btn" href="assets/downloads/vm-scanner/nuclei-api.py" download="nuclei-api.py">Descargar</a>
            <button class="copy-btn" type="button" data-copy-href="assets/downloads/vm-scanner/nuclei-api.py" aria-label="Copiar nuclei-api.py" title="Copiar">Copiar</button>
          </div>
        </div>
        <div class="code-body"><span class="c-muted"># Flask wrapper para ejecutar Nuclei bajo demanda y devolver JSON</span>
<span class="c-muted"># Endpoints:</span> <span class="c-cyan">POST</span> <span class="c-green">/scan</span> · <span class="c-cyan">GET</span> <span class="c-green">/health</span> · <span class="c-cyan">GET</span> <span class="c-green">/templates</span> · <span class="c-cyan">GET</span> <span class="c-green">/reports</span> · header <span class="c-green">X-API-Key</span> si <span class="c-green">NUCLEI_API_KEY</span> está definida

<span class="c-muted"># Idea:</span> n8n llama a <span class="c-green">http://nuclei-api:5000/scan</span> y recibe findings parseados.</div>
      </div>

      <div class="info-box">
        <strong>Por qué lo hacemos:</strong> Nuclei normalmente escribe a stdout/archivos. Este wrapper lo convierte en una API estable (timeouts, concurrency, JSONL) para que n8n pueda orquestar sin “magia” y sin depender de shells.
      </div>


      <textarea id="secops-env" hidden># ─── IPs de los targets en la VLAN DMZ ───────────────────────
DMZ_DVWA=http://203.0.113.X:8080
DMZ_JUICESHOP=http://203.0.113.X:3000

# ─── IP de esta VM (SecOps) ───────────────────────────────────
SECOPS_IP=203.0.114.X

# ─── ZAP ──────────────────────────────────────────────────────
ZAP_API_KEY=__REDACTED__

# ─── n8n ──────────────────────────────────────────────────────
N8N_USER=admin
N8N_PASSWORD=__REDACTED__
N8N_JWT_SECRET=__REDACTED__

# ─── Nuclei API ───────────────────────────────────────────────
NUCLEI_API_KEY=__REDACTED__

# ─── OpenClaw ─────────────────────────────────────────────────
OPENCLAW_TOKEN=__REDACTED__
OPENCLAW_PORT=18789</textarea>

      <textarea id="secops-nuclei-api-py" hidden>from flask import Flask, request, jsonify
from urllib.parse import urlparse
import subprocess, os, json, uuid, logging
from datetime import datetime

# ─── Logging ──────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%dT%H:%M:%S',
)
log = logging.getLogger('nuclei-api')

app = Flask(__name__)

# ─── Config desde entorno ──────────────────────────────────────
API_KEY      = os.getenv('NUCLEI_API_KEY', '')          # vacío = sin auth (solo lab)
REPORTS_DIR  = os.getenv('REPORTS_DIR', '/reports')
BULK_SIZE    = os.getenv('NUCLEI_BULK_SIZE', '20')
CONCURRENCY  = os.getenv('NUCLEI_CONCURRENCY', '10')
SCAN_TIMEOUT = int(os.getenv('NUCLEI_SCAN_TIMEOUT', '300'))  # timeout proceso (seg)
REQ_TIMEOUT  = os.getenv('NUCLEI_REQ_TIMEOUT', '10')         # timeout por request HTTP

TEMPLATE_DIRS = [
    '/root/nuclei-templates/http/vulnerabilities/',
    '/root/nuclei-templates/http/misconfiguration/',
    '/root/nuclei-templates/http/exposures/',
    '/root/nuclei-templates/http/cves/',
]

# ─── Helpers ──────────────────────────────────────────────────
def require_key():
    """Devuelve respuesta 401 si la API key no es válida. None si OK."""
    if API_KEY and request.headers.get('X-API-Key') != API_KEY:
        return jsonify({'error': 'unauthorized'}), 401
    return None


def is_valid_target(target: str) -> bool:
    """Valida que el target sea una URL http/https bien formada."""
    try:
        parsed = urlparse(target)
        return parsed.scheme in ('http', 'https') and bool(parsed.netloc)
    except Exception:
        return False


def safe_filename(target: str) -> str:
    """Genera un nombre de fichero seguro a partir del target."""
    name = (
        target
        .replace('http://', '')
        .replace('https://', '')
        .replace('/', '-')
        .replace(':', '-')
    )
    # Eliminar caracteres no seguros
    name = ''.join(c for c in name if c.isalnum() or c in '-_.')
    return name[:80]  # limitar longitud


# ─── Endpoints ────────────────────────────────────────────────
@app.route('/scan', methods=['POST'])
def scan():
    err = require_key()
    if err:
        return err

    data = request.json or {}
    target   = data.get('target', '').strip()
    severity = data.get('severity', 'low,medium,high,critical')
    # Permitir sobreescribir concurrencia/bulk desde el request (opcional)
    bulk     = str(data.get('bulk_size', BULK_SIZE))
    conc     = str(data.get('concurrency', CONCURRENCY))

    if not target:
        return jsonify({'error': 'target requerido'}), 400

    if not is_valid_target(target):
        return jsonify({'error': 'target inválido — debe ser http:// o https://'}), 400

    # Nombre de fichero con uuid corto para evitar colisiones
    date   = datetime.now().strftime('%Y%m%d_%H%M%S')
    name   = safe_filename(target)
    run_id = uuid.uuid4().hex[:6]
    output = os.path.join(REPORTS_DIR, f"{name}-{date}-{run_id}.jsonl")

    # Templates disponibles
    template_args = []
    for tdir in TEMPLATE_DIRS:
        if os.path.isdir(tdir):
            template_args += ['-t', tdir]

    if not template_args:
        log.warning("No se encontraron carpetas de templates, usando -automatic-scan")
        template_args = ['-automatic-scan']

    cmd = [
        'nuclei',
        *template_args,
        '-u',           target,
        '-severity',    severity,
        '-jsonl',
        '-o',           output,
        '-timeout',     REQ_TIMEOUT,
        '-retries',     '1',
        '-bulk-size',   bulk,
        '-concurrency', conc,
        '-no-interactsh',
    ]

    log.info(f"Iniciando scan | target={target} | severity={severity} | output={output}")
    log.info(f"CMD: {' '.join(cmd)}")

    try:
        result = subprocess.run(
            cmd,
            timeout=SCAN_TIMEOUT,
            capture_output=True,
            text=True
        )

        if result.stdout:
            log.info(f"STDOUT: {result.stdout[:500]}")
        if result.stderr:
            log.warning(f"STDERR: {result.stderr[:500]}")

        findings = []
        if os.path.exists(output):
            with open(output) as f:
                for line in f:
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        findings.append(json.loads(line))
                    except json.JSONDecodeError as e:
                        log.error(f"Parse error en línea JSONL: {e} | '{line[:100]}'")

        log.info(f"Scan finalizado | findings={len(findings)}")

        return jsonify({
            'ok':             True,
            'target':         target,
            'findings':       findings,
            'count':          len(findings),
            'output_file':    output,
            'templates_used': template_args,
            'run_id':         run_id,
        })

    except subprocess.TimeoutExpired:
        log.error(f"Timeout tras {SCAN_TIMEOUT}s | target={target}")
        return jsonify({
            'ok':    False,
            'error': f'nuclei timeout after {SCAN_TIMEOUT}s',
            'target': target,
        }), 500

    except Exception as e:
        log.exception(f"Error inesperado en scan: {e}")
        return jsonify({'ok': False, 'error': str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    available = [d for d in TEMPLATE_DIRS if os.path.isdir(d)]
    return jsonify({
        'ok':                 True,
        'templates_available': available,
        'reports_dir':        REPORTS_DIR,
        'auth_enabled':       bool(API_KEY),
    })


@app.route('/templates', methods=['GET'])
def list_templates():
    result = {}
    for tdir in TEMPLATE_DIRS:
        if os.path.isdir(tdir):
            try:
                count = sum(1 for f in os.listdir(tdir) if f.endswith('.yaml'))
                result[tdir] = count
            except OSError as e:
                log.error(f"No se pudo listar {tdir}: {e}")
                result[tdir] = -1
        else:
            result[tdir] = 'NOT FOUND'
    return jsonify(result)


@app.route('/reports', methods=['GET'])
def list_reports():
    """Lista los ficheros de reporte generados."""
    err = require_key()
    if err:
        return err
    try:
        files = sorted(
            [f for f in os.listdir(REPORTS_DIR) if f.endswith('.jsonl')],
            reverse=True
        )
        return jsonify({'ok': True, 'reports': files, 'count': len(files)})
    except OSError as e:
        return jsonify({'ok': False, 'error': str(e)}), 500


# ─── Arranque ─────────────────────────────────────────────────
if __name__ == '__main__':
    debug = os.getenv('FLASK_DEBUG', 'false').lower() == 'true'
    log.info(f"nuclei-api arrancando | debug={debug} | auth={'ON' if API_KEY else 'OFF'}")
    app.run(host='0.0.0.0', port=5000, debug=debug)</textarea>
    </div>
  `,
};
