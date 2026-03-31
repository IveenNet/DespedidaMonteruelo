export default {
  sectionLabel: "Infraestructura",
  icon: "🎯",
  title: "Targets",
  sub: "Juice Shop · DVWA",
  dots: [true, true, true],

  content: `
    <div class="infra-targets">
      <div class="slide-eyebrow">Issue #4 · Infraestructura</div>
      <div class="slide-heading">Targets <span class="badge badge-done">completado</span></div>
      <div class="slide-sub">VM-Targets con Juice Shop y DVWA desplegados en Docker como aplicaciones vulnerables objetivo del escaneo automatizado.</div>

      <div class="slide-actions">
        <button class="btn btn--inline" type="button" data-open-modal="implGuide">Abrir guía de implementación</button>
        <a class="btn btn--ghost" href="assets/downloads/vm-web/docker-compose.yml" download="docker-compose.yml">Descargar compose</a>
      </div>

      <!-- Topología / estado (animado) -->
      <div class="targets-topology">
        <div class="topology-title">
          <span class="topology-kicker">// servicios</span>
          <span class="topology-hint">docker compose · red interna · puertos publicados</span>
        </div>

        <div class="topology-row">
          <div class="t-node t-node-app">
            <div class="t-node-top">
              <span class="t-ico">🧃</span>
              <span class="t-name">Juice Shop</span>
              <span class="t-status t-status-up"><span class="t-dot"></span>UP</span>
            </div>
            <div class="t-meta">
              <span class="t-pill">HTTP</span>
              <span class="t-pill t-pill-port">:3000</span>
              <span class="t-pill t-pill-img">bkimminich/juice-shop</span>
            </div>
          </div>

          <div class="t-link" aria-hidden="true">
            <div class="t-flow"></div>
            <span class="t-arrow">──→</span>
          </div>

          <div class="t-node t-node-app">
            <div class="t-node-top">
              <span class="t-ico">🐛</span>
              <span class="t-name">DVWA</span>
              <span class="t-status t-status-up"><span class="t-dot"></span>UP</span>
            </div>
            <div class="t-meta">
              <span class="t-pill">HTTP</span>
              <span class="t-pill t-pill-port">:8080</span>
              <span class="t-pill t-pill-img">ghcr.io/digininja/dvwa</span>
            </div>
          </div>

          <div class="t-link t-link-dim" aria-hidden="true">
            <div class="t-flow"></div>
            <span class="t-arrow">──→</span>
          </div>

          <div class="t-node t-node-db">
            <div class="t-node-top">
              <span class="t-ico">🗄️</span>
              <span class="t-name">DB (MariaDB)</span>
              <span class="t-status t-status-warm"><span class="t-dot"></span>READY</span>
            </div>
            <div class="t-meta">
              <span class="t-pill">internal</span>
              <span class="t-pill t-pill-img">mariadb:10.11</span>
            </div>
          </div>
        </div>

        <div class="topology-foot">
          <span class="t-note">Tip: mantén DVWA en <strong>Low</strong> durante demos para maximizar superficie de ataque.</span>
          <span class="t-spark" aria-hidden="true"></span>
        </div>
      </div>

      <h3>// docker-compose.yml</h3>
      <div class="code-block">
        <div class="code-header">
          <div class="code-header-left">
            <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
            <span class="code-label">vm-web/docker-compose.yml</span>
          </div>
          <div class="code-header-actions">
            <a class="dl-btn" href="assets/downloads/vm-web/docker-compose.yml" download="docker-compose.yml">Descargar</a>
            <button
              class="copy-btn"
              type="button"
              data-copy="services:\n  juice-shop:\n    image: bkimminich/juice-shop\n    container_name: juice-shop\n    restart: unless-stopped\n    ports:\n      - &quot;3000:3000&quot;\n\n  dvwa:\n    image: ghcr.io/digininja/dvwa:latest\n    container_name: dvwa\n    restart: unless-stopped\n    environment:\n      - DB_SERVER=db\n    depends_on: [db]\n    ports:\n      - &quot;8080:80&quot;\n\n  db:\n    image: mariadb:10.11\n    environment:\n      - MYSQL_ROOT_PASSWORD=dvwa\n      - MYSQL_DATABASE=dvwa\n      - MYSQL_USER=dvwa\n      - MYSQL_PASSWORD=p@ssw0rd"
              aria-label="Copiar docker-compose.yml"
              title="Copiar"
            >Copiar</button>
          </div>
        </div>
        <div class="code-body"><span class="c-muted">services:</span>
  <span class="c-cyan">juice-shop</span>:
    <span class="c-yellow">image</span>: <span class="c-green">bkimminich/juice-shop</span>
    <span class="c-yellow">container_name</span>: juice-shop
    <span class="c-yellow">restart</span>: unless-stopped
    <span class="c-yellow">ports</span>:
      - <span class="c-green">"3000:3000"</span>

  <span class="c-cyan">dvwa</span>:
    <span class="c-yellow">image</span>: <span class="c-green">ghcr.io/digininja/dvwa:latest</span>
    <span class="c-yellow">container_name</span>: dvwa
    <span class="c-yellow">restart</span>: unless-stopped
    <span class="c-yellow">environment</span>:
      - <span class="c-green">DB_SERVER=db</span>
    <span class="c-yellow">depends_on</span>: [db]
    <span class="c-yellow">ports</span>:
      - <span class="c-green">"8080:80"</span>

  <span class="c-cyan">db</span>:
    <span class="c-yellow">image</span>: <span class="c-green">mariadb:10.11</span>
    <span class="c-yellow">environment</span>:
      - <span class="c-green">MYSQL_ROOT_PASSWORD=dvwa</span>
      - <span class="c-green">MYSQL_DATABASE=dvwa</span>
      - <span class="c-green">MYSQL_USER=dvwa</span>
      - <span class="c-green">MYSQL_PASSWORD=p@ssw0rd</span></div>
      </div>

      <h3>// instalación paso a paso</h3>
      <div class="install-steps">
        <div class="install-step">
          <div class="step-num">01</div>
          <div class="install-body">
            <div class="step-title">Instalar Docker</div>
            <div class="step-desc">Ejecuta en tu VM (Debian/Ubuntu):</div>
            <div class="cmd-list">
              <div class="cmd-row">
                <code class="cmd">sudo apt install curl -y</code>
                <button class="copy-mini" type="button" data-copy="sudo apt install curl -y" aria-label="Copiar comando">⧉</button>
              </div>
              <div class="cmd-row">
                <code class="cmd">curl -fsSL https://get.docker.com | sh</code>
                <button class="copy-mini" type="button" data-copy="curl -fsSL https://get.docker.com | sh" aria-label="Copiar comando">⧉</button>
              </div>
              <div class="cmd-row">
                <code class="cmd">sudo usermod -aG docker $USER</code>
                <button class="copy-mini" type="button" data-copy="sudo usermod -aG docker $USER" aria-label="Copiar comando">⧉</button>
              </div>
            </div>
          </div>
        </div>

        <div class="install-step">
          <div class="step-num">02</div>
          <div class="install-body">
            <div class="step-title">Crear carpeta y compose</div>
            <div class="step-desc">Prepara la carpeta y pega el YAML:</div>
            <div class="cmd-list">
              <div class="cmd-row">
                <code class="cmd">mkdir ~/vm-targets && cd ~/vm-targets</code>
                <button class="copy-mini" type="button" data-copy="mkdir ~/vm-targets && cd ~/vm-targets" aria-label="Copiar comando">⧉</button>
              </div>
              <div class="cmd-row">
                <code class="cmd">nano docker-compose.yml</code>
                <button class="copy-mini" type="button" data-copy="nano docker-compose.yml" aria-label="Copiar comando">⧉</button>
              </div>
            </div>
          </div>
        </div>

        <div class="install-step">
          <div class="step-num">03</div>
          <div class="install-body">
            <div class="step-title">Levantar contenedores</div>
            <div class="step-desc">Docker descarga imágenes y arranca los servicios:</div>
            <div class="cmd-list">
              <div class="cmd-row">
                <code class="cmd">docker compose up -d</code>
                <button class="copy-mini" type="button" data-copy="docker compose up -d" aria-label="Copiar comando">⧉</button>
              </div>
              <div class="cmd-row">
                <code class="cmd">docker compose ps</code>
                <button class="copy-mini" type="button" data-copy="docker compose ps" aria-label="Copiar comando">⧉</button>
              </div>
            </div>
          </div>
        </div>

        <div class="install-step">
          <div class="step-num">04</div>
          <div class="install-body">
            <div class="step-title">Configurar DVWA</div>
            <div class="step-desc">Acceder a <code>http://IP:8080</code> → login con <code>admin / password</code> → pulsar <strong>Create / Reset Database</strong> → nivel <strong>Low</strong>.</div>
            <div class="cmd-list">
              <div class="cmd-row">
                <code class="cmd">http://IP:8080</code>
                <button class="copy-mini" type="button" data-copy="http://IP:8080" aria-label="Copiar URL">⧉</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <strong>Credenciales DVWA:</strong> usuario <code>admin</code> · contraseña <code>password</code><br>
        Establecer nivel <strong>Low</strong> en DVWA Security para maximizar la superficie de ataque durante el escaneo.
      </div>
    </div>
  `,
};
