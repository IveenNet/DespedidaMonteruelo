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
              <span class="t-pill">BASIC auth</span>
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
              <span class="t-pill t-pill-img">nuclei:latest</span>
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
              data-copy-target="secops-compose-yml"
            >Copiar</button>
          </div>
        </div>
        <div class="code-body"><span class="c-muted">services:</span>

  <span class="c-muted"># ─── OWASP ZAP ─────────────────────────────────────────────</span>
  <span class="c-cyan">zap</span>:
    <span class="c-yellow">image</span>: <span class="c-green">ghcr.io/zaproxy/zaproxy:stable</span>
    <span class="c-yellow">container_name</span>: <span class="c-green">owasp-zap</span>
    <span class="c-yellow">restart</span>: <span class="c-green">unless-stopped</span>
    <span class="c-yellow">mem_limit</span>: <span class="c-green">4g</span>
    <span class="c-yellow">mem_reservation</span>: <span class="c-green">1g</span>
    <span class="c-yellow">command</span>: <span class="c-muted">&gt;</span>
      <span class="c-green">zap.sh -daemon -host 0.0.0.0 -port 8090 -config api.addrs.addr.name=.* -config api.addrs.addr.regex=true -config api.key=\${ZAP_API_KEY} -config api.disablekey=false -config connection.timeoutInSecs=300</span>
    <span class="c-yellow">ports</span>:
      - <span class="c-green">&quot;8090:8090&quot;</span>
    <span class="c-yellow">environment</span>:
      - <span class="c-green">ZAP_API_KEY=\${ZAP_API_KEY}</span>
      - <span class="c-green">DMZ_DVWA=\${DMZ_DVWA}</span>
      - <span class="c-green">DMZ_JUICESHOP=\${DMZ_JUICESHOP}</span>
      - <span class="c-green">_JAVA_OPTIONS=-Xmx2g</span>
    <span class="c-yellow">volumes</span>:
      - <span class="c-green">zap-data:/zap/wrk</span>
      - <span class="c-green">zap-reports:/zap/reports</span>
    <span class="c-yellow">networks</span>:
      - <span class="c-green">secops-net</span>
    <span class="c-yellow">healthcheck</span>:
      <span class="c-yellow">test</span>: [ <span class="c-green">&quot;CMD-SHELL&quot;</span>, <span class="c-green">&quot;curl -f http://localhost:8090/JSON/core/view/version/ || exit 1&quot;</span> ]
      <span class="c-yellow">interval</span>: <span class="c-green">20s</span>
      <span class="c-yellow">timeout</span>: <span class="c-green">10s</span>
      <span class="c-yellow">retries</span>: <span class="c-green">5</span>
      <span class="c-yellow">start_period</span>: <span class="c-green">60s</span>
  <span class="c-muted"># ─── NUCLEI ────────────────────────────────────────────────</span>
  <span class="c-cyan">nuclei</span>:
    <span class="c-yellow">image</span>: <span class="c-green">projectdiscovery/nuclei:latest</span>
    <span class="c-yellow">container_name</span>: <span class="c-green">nuclei</span>
    <span class="c-yellow">restart</span>: <span class="c-green">unless-stopped</span>
    <span class="c-yellow">entrypoint</span>: [ <span class="c-green">&quot;sleep&quot;</span>, <span class="c-green">&quot;infinity&quot;</span> ]
    <span class="c-yellow">environment</span>:
      - <span class="c-green">DMZ_DVWA=\${DMZ_DVWA}</span>
      - <span class="c-green">DMZ_JUICESHOP=\${DMZ_JUICESHOP}</span>
    <span class="c-yellow">volumes</span>:
      - <span class="c-green">nuclei-templates:/root/nuclei-templates</span>
      - <span class="c-green">nuclei-reports:/reports</span>
    <span class="c-yellow">networks</span>:
      - <span class="c-green">secops-net</span>

  <span class="c-muted"># ─── NUCLEI TEMPLATE UPDATER (cada 24h) ────────────────────</span>
  <span class="c-cyan">nuclei-updater</span>:
    <span class="c-yellow">image</span>: <span class="c-green">projectdiscovery/nuclei:latest</span>
    <span class="c-yellow">container_name</span>: <span class="c-green">nuclei-updater</span>
    <span class="c-yellow">restart</span>: <span class="c-green">unless-stopped</span>
    <span class="c-yellow">entrypoint</span>: <span class="c-muted">&gt;</span>
      <span class="c-green">sh -c &quot;while true; do
        nuclei -update-templates -ud /root/nuclei-templates &amp;&amp;
        echo &quot;[updater] Templates OK&quot; &gt;&gt; /root/nuclei-templates/update.log 2&gt;&amp;1;
        sleep 86400;
      done&quot;</span>
    <span class="c-yellow">volumes</span>:
      - <span class="c-green">nuclei-templates:/root/nuclei-templates</span>
    <span class="c-yellow">networks</span>:
      - <span class="c-green">secops-net</span>

  <span class="c-muted"># ─── NUCLEI API WRAPPER ────────────────────────────────────</span>
  <span class="c-cyan">nuclei-api</span>:
    <span class="c-yellow">image</span>: <span class="c-green">projectdiscovery/nuclei:latest</span>
    <span class="c-yellow">container_name</span>: <span class="c-green">nuclei-api</span>
    <span class="c-yellow">restart</span>: <span class="c-green">unless-stopped</span>
    <span class="c-yellow">ports</span>:
      - <span class="c-green">&quot;5000:5000&quot;</span>
    <span class="c-yellow">environment</span>:
      - <span class="c-green">DMZ_DVWA=\${DMZ_DVWA}</span>
      - <span class="c-green">DMZ_JUICESHOP=\${DMZ_JUICESHOP}</span>
    <span class="c-yellow">volumes</span>:
      - <span class="c-green">nuclei-templates:/root/nuclei-templates</span>
      - <span class="c-green">nuclei-reports:/reports</span>
      - <span class="c-green">./nuclei-api.py:/app/nuclei-api.py</span>
    <span class="c-yellow">working_dir</span>: <span class="c-green">/app</span>
    <span class="c-yellow">entrypoint</span>: <span class="c-muted">&gt;</span>
      <span class="c-green">sh -c &quot;apk add python3 py3-pip -q &amp;&amp;
             pip install flask -q --break-system-packages &amp;&amp;
             python3 nuclei-api.py&quot;</span>
    <span class="c-yellow">networks</span>:
      - <span class="c-green">secops-net</span> <span class="c-muted"># ← nuclei-api en secops-net</span>
    <span class="c-yellow">depends_on</span>:
      - <span class="c-green">nuclei-updater</span>

  <span class="c-muted"># ─── N8N ───────────────────────────────────────────────────</span>
  <span class="c-cyan">n8n</span>:
    <span class="c-yellow">image</span>: <span class="c-green">n8nio/n8n:latest</span>
    <span class="c-yellow">container_name</span>: <span class="c-green">n8n</span>
    <span class="c-yellow">restart</span>: <span class="c-green">unless-stopped</span>
    <span class="c-yellow">ports</span>:
      - <span class="c-green">&quot;5678:5678&quot;</span>
    <span class="c-yellow">environment</span>:
      - <span class="c-green">N8N_BLOCK_ENV_ACCESS_IN_NODE=false</span>
      - <span class="c-green">N8N_HOST=0.0.0.0</span>
      - <span class="c-green">N8N_PORT=5678</span>
      - <span class="c-green">N8N_PROTOCOL=http</span>
      - <span class="c-green">WEBHOOK_URL=http://\${SECOPS_IP}:5678</span>
      - <span class="c-green">N8N_BASIC_AUTH_ACTIVE=true</span>
      - <span class="c-green">N8N_BASIC_AUTH_USER=\${N8N_USER}</span>
      - <span class="c-green">N8N_BASIC_AUTH_PASSWORD=\${N8N_PASSWORD}</span>
      - <span class="c-green">N8N_LOG_LEVEL=info</span>
      - <span class="c-green">N8N_COMMUNITY_PACKAGES_ENABLED=true</span>
      - <span class="c-green">N8N_SECURE_COOKIE=false</span>
      - <span class="c-green">N8N_ALLOW_EXEC=true</span>
      - <span class="c-green">GENERIC_TIMEZONE=Europe/Madrid</span>
      - <span class="c-green">TZ=Europe/Madrid</span>
      - <span class="c-green">ZAP_API_KEY=\${ZAP_API_KEY}</span>
      - <span class="c-green">OPENCLAW_TOKEN=\${OPENCLAW_TOKEN}</span>
      - <span class="c-green">OPENCLAW_URL=http://host.docker.internal:\${OPENCLAW_PORT:-18789}</span>
      - <span class="c-green">DMZ_DVWA=\${DMZ_DVWA}</span>
      - <span class="c-green">DMZ_JUICESHOP=\${DMZ_JUICESHOP}</span>
    <span class="c-yellow">volumes</span>:
      - <span class="c-green">n8n-data:/home/node/.n8n</span>
      - <span class="c-green">zap-reports:/zap-reports:ro</span>
      - <span class="c-green">nuclei-reports:/home/node/.n8n-files/nuclei-reports:ro</span>
    <span class="c-yellow">networks</span>:
      - <span class="c-green">secops-net</span>
    <span class="c-yellow">depends_on</span>:
      - <span class="c-green">zap</span>
    <span class="c-yellow">extra_hosts</span>:
      - <span class="c-green">&quot;host.docker.internal:host-gateway&quot;</span>

<span class="c-muted"># ─── VOLÚMENES ─────────────────────────────────────────────</span>
<span class="c-yellow">volumes</span>:
  <span class="c-cyan">zap-data</span>:
  <span class="c-cyan">zap-reports</span>:
  <span class="c-cyan">nuclei-templates</span>:
  <span class="c-cyan">nuclei-reports</span>:
  <span class="c-cyan">n8n-data</span>:

  <span class="c-muted"># ─── RED ───────────────────────────────────────────────────</span>
<span class="c-yellow">networks</span>:
  <span class="c-cyan">secops-net</span>:
    <span class="c-yellow">driver</span>: <span class="c-green">bridge</span>
    <span class="c-yellow">ipam</span>:
      <span class="c-yellow">config</span>:
        - <span class="c-yellow">subnet</span>: <span class="c-green">172.20.0.0/24</span></div>
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
            data-copy-target="secops-env"
          >Copiar</button>
        </div>
      </div>
      <div class="code-body"><span class="c-muted"># IPs / Targets</span>
<span class="c-cyan">SECOPS_IP</span>=<span class="c-green">203.0.114.10</span>
<span class="c-cyan">DMZ_DVWA</span>=<span class="c-green">http://203.0.113.10:8080</span>
<span class="c-cyan">DMZ_JUICESHOP</span>=<span class="c-green">http://203.0.113.10:3000</span>

<span class="c-muted"># ZAP</span>
<span class="c-cyan">ZAP_API_KEY</span>=<span class="c-green">__REDACTED__</span>

<span class="c-muted"># n8n</span>
<span class="c-cyan">N8N_USER</span>=<span class="c-green">admin</span>
<span class="c-cyan">N8N_PASSWORD</span>=<span class="c-green">__REDACTED__</span>

<span class="c-muted"># OpenClaw</span>
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
            <div class="step-desc"><code>nuclei-api</code> usa <code>depends_on: nuclei-updater</code> para arrancar con un primer lote de templates listo. Todo el stack resuelve nombres en <code>secops-net</code> (<code>owasp-zap</code>, <code>n8n</code>, etc.) y solo expones al host lo imprescindible.</div>
            <div class="cmd-list">
              <div class="cmd-row cmd-row-plain">
                <code class="cmd">subnet 172.20.0.0/24 · puertos típicos hacia fuera: 5678, 8090, 5000</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
      <strong>Importante:</strong> en la slide he omitido tus claves reales. En el servidor se usan variables de entorno (<code>\${...}</code>) y secretos en <code>.env</code>.
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
            <button class="copy-btn" type="button" data-copy-target="secops-nuclei-api-py" aria-label="Copiar nuclei-api.py" title="Copiar">Copiar</button>
          </div>
        </div>
        <div class="code-body"><span class="c-muted"># Flask wrapper para ejecutar Nuclei bajo demanda y devolver JSON</span>
<span class="c-muted"># Endpoints:</span> <span class="c-cyan">POST</span> <span class="c-green">/scan</span> · <span class="c-cyan">GET</span> <span class="c-green">/health</span> · <span class="c-cyan">GET</span> <span class="c-green">/templates</span>

<span class="c-muted"># Idea:</span> n8n llama a <span class="c-green">http://nuclei-api:5000/scan</span> y recibe findings parseados.</div>
      </div>

      <div class="info-box">
        <strong>Por qué lo hacemos:</strong> Nuclei normalmente escribe a stdout/archivos. Este wrapper lo convierte en una API estable (timeouts, concurrency, JSONL) para que n8n pueda orquestar sin “magia” y sin depender de shells.
      </div>

      <!-- Fuentes copiables (robusto, sin romper HTML) -->
      <textarea id="secops-compose-yml" hidden>services:

  # ─── OWASP ZAP ─────────────────────────────────────────────
  zap:
    image: ghcr.io/zaproxy/zaproxy:stable
    container_name: owasp-zap
    restart: unless-stopped
    mem_limit: 4g
    mem_reservation: 1g
    command: >
      zap.sh -daemon -host 0.0.0.0 -port 8090 -config api.addrs.addr.name=.* -config api.addrs.addr.regex=true -config api.key=\${ZAP_API_KEY} -config api.disablekey=false -config connection.timeoutInSecs=300
    ports:
      - "8090:8090"
    environment:
      - ZAP_API_KEY=\${ZAP_API_KEY}
      - DMZ_DVWA=\${DMZ_DVWA}
      - DMZ_JUICESHOP=\${DMZ_JUICESHOP}
      - _JAVA_OPTIONS=-Xmx2g
    volumes:
      - zap-data:/zap/wrk
      - zap-reports:/zap/reports
    networks:
      - secops-net
    healthcheck:
      test: [ "CMD-SHELL", "curl -f http://localhost:8090/JSON/core/view/version/ || exit 1" ]
      interval: 20s
      timeout: 10s
      retries: 5
      start_period: 60s
  # ─── NUCLEI ────────────────────────────────────────────────
  nuclei:
    image: projectdiscovery/nuclei:latest
    container_name: nuclei
    restart: unless-stopped
    entrypoint: [ "sleep", "infinity" ]
    environment:
      - DMZ_DVWA=\${DMZ_DVWA}
      - DMZ_JUICESHOP=\${DMZ_JUICESHOP}
    volumes:
      - nuclei-templates:/root/nuclei-templates
      - nuclei-reports:/reports
    networks:
      - secops-net

  # ─── NUCLEI TEMPLATE UPDATER (cada 24h) ────────────────────
  nuclei-updater:
    image: projectdiscovery/nuclei:latest
    container_name: nuclei-updater
    restart: unless-stopped
    entrypoint: >
      sh -c "while true; do
        nuclei -update-templates -ud /root/nuclei-templates &&
        echo \"[updater] Templates OK\" >> /root/nuclei-templates/update.log 2>&1;
        sleep 86400;
      done"
    volumes:
      - nuclei-templates:/root/nuclei-templates
    networks:
      - secops-net

  # ─── NUCLEI API WRAPPER ────────────────────────────────────
  nuclei-api:
    image: projectdiscovery/nuclei:latest
    container_name: nuclei-api
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      - DMZ_DVWA=\${DMZ_DVWA}
      - DMZ_JUICESHOP=\${DMZ_JUICESHOP}
    volumes:
      - nuclei-templates:/root/nuclei-templates
      - nuclei-reports:/reports
      - ./nuclei-api.py:/app/nuclei-api.py
    working_dir: /app
    entrypoint: >
      sh -c "apk add python3 py3-pip -q &&
             pip install flask -q --break-system-packages &&
             python3 nuclei-api.py"
    networks:
      - secops-net # ← ESTO FALTABA: nuclei-api no estaba en la red
    depends_on:
      - nuclei-updater

  # ─── N8N ───────────────────────────────────────────────────
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_BLOCK_ENV_ACCESS_IN_NODE=false
      - N8N_HOST=0.0.0.0
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - WEBHOOK_URL=http://\${SECOPS_IP}:5678
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=\${N8N_USER}
      - N8N_BASIC_AUTH_PASSWORD=\${N8N_PASSWORD}
      - N8N_LOG_LEVEL=info
      - N8N_COMMUNITY_PACKAGES_ENABLED=true
      - N8N_SECURE_COOKIE=false
      - N8N_ALLOW_EXEC=true
      - GENERIC_TIMEZONE=Europe/Madrid
      - TZ=Europe/Madrid
      - ZAP_API_KEY=\${ZAP_API_KEY}
      - OPENCLAW_TOKEN=\${OPENCLAW_TOKEN}
      - OPENCLAW_URL=http://host.docker.internal:\${OPENCLAW_PORT:-18789}
      - DMZ_DVWA=\${DMZ_DVWA}
      - DMZ_JUICESHOP=\${DMZ_JUICESHOP}
    volumes:
      - n8n-data:/home/node/.n8n
      - zap-reports:/zap-reports:ro
      - nuclei-reports:/home/node/.n8n-files/nuclei-reports:ro
    networks:
      - secops-net
    depends_on:
      - zap
    extra_hosts:
      - "host.docker.internal:host-gateway"

# ─── VOLÚMENES ─────────────────────────────────────────────
volumes:
  zap-data:
  zap-reports:
  nuclei-templates:
  nuclei-reports:
  n8n-data:

    # ─── RED ───────────────────────────────────────────────────
networks:
  secops-net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/24
</textarea>

      <textarea id="secops-env" hidden># ─── IPs / Targets ─────────────────────────────────────────
SECOPS_IP=203.0.114.10

DMZ_IP=203.0.113.10
DMZ_DVWA=http://203.0.113.10:8080
DMZ_JUICESHOP=http://203.0.113.10:3000

# ─── ZAP ───────────────────────────────────────────────────
ZAP_API_KEY=__REDACTED__

# ─── N8N ───────────────────────────────────────────────────
N8N_USER=admin
N8N_PASSWORD=__REDACTED__

# ─── OpenClaw ──────────────────────────────────────────────
OPENCLAW_TOKEN=__REDACTED__
OPENCLAW_PORT=18789
</textarea>

      <textarea id="secops-nuclei-api-py" hidden>from flask import Flask, request, jsonify
import subprocess, os, json
from datetime import datetime

app = Flask(__name__)

# Carpetas de templates útiles para pentesting web
# Nuclei v3: el flag es -jsonl, no -json
# La estructura es /root/nuclei-templates/http/...

TEMPLATE_DIRS = [
    '/root/nuclei-templates/http/vulnerabilities/',
    '/root/nuclei-templates/http/misconfiguration/',
    '/root/nuclei-templates/http/exposures/',
    '/root/nuclei-templates/http/cves/',
]

@app.route('/scan', methods=['POST'])
def scan():
    data = request.json
    target = data.get('target', '')
    severity = data.get('severity', 'low,medium,high,critical')

    if not target:
        return jsonify({'error': 'target required'}), 400

    date = datetime.now().strftime('%Y%m%d_%H%M')
    name = target.replace('http://', '').replace('https://', '').replace('/', '-').replace(':', '-')
    output = f"/reports/{name}-{date}.jsonl"

    # Usar solo templates que existen
    template_args = []
    for tdir in TEMPLATE_DIRS:
        if os.path.isdir(tdir):
            template_args += ['-t', tdir]

    # Si no hay ninguna carpeta válida, usar auto-detect de nuclei
    if not template_args:
        template_args = ['-automatic-scan']

    cmd = [
        'nuclei',
        *template_args,
        '-u', target,
        '-severity', severity,
        '-jsonl',           # ← Nuclei v3 usa -jsonl, no -json
        '-o', output,
        '-timeout', '10',
        '-retries', '1',
        '-bulk-size', '20',
        '-concurrency', '10',
        '-no-interactsh',   # evitar dependencia externa
    ]

    print(f\"[nuclei-api] CMD: {' '.join(cmd)}\", flush=True)

    try:
        result = subprocess.run(cmd, timeout=300, capture_output=True, text=True)
        print(f\"[nuclei-api] STDOUT: {result.stdout[:500]}\", flush=True)
        print(f\"[nuclei-api] STDERR: {result.stderr[:500]}\", flush=True)

        findings = []
        if os.path.exists(output):
            with open(output) as f:
                for line in f:
                    line = line.strip()
                    if line:
                        try:
                            findings.append(json.loads(line))
                        except Exception as e:
                            print(f\"[nuclei-api] parse error: {e} | line: {line[:100]}\", flush=True)

        return jsonify({
            'ok': True,
            'findings': findings,
            'count': len(findings),
            'output_file': output,
            'templates_used': template_args
        })

    except subprocess.TimeoutExpired:
        return jsonify({'error': 'nuclei timeout after 300s', 'ok': False}), 500
    except Exception as e:
        return jsonify({'error': str(e), 'ok': False}), 500


@app.route('/health', methods=['GET'])
def health():
    # Devuelve también info de templates disponibles
    available = [d for d in TEMPLATE_DIRS if os.path.isdir(d)]
    return jsonify({'ok': True, 'templates_available': available})


@app.route('/templates', methods=['GET'])
def list_templates():
    result = {}
    for tdir in TEMPLATE_DIRS:
        if os.path.isdir(tdir):
            try:
                count = sum(1 for f in os.listdir(tdir) if f.endswith('.yaml'))
                result[tdir] = count
            except:
                result[tdir] = -1
        else:
            result[tdir] = 'NOT FOUND'
    return jsonify(result)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
</textarea>
    </div>
  `,
};
