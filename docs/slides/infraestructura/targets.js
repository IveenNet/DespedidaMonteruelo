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
        <a class="btn btn--ghost" href="assets/downloads/vm-web/env.dmz" download="env.dmz">Descargar env.dmz</a>
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
              data-copy-target="targets-compose-yml"
              aria-label="Copiar docker-compose.yml"
              title="Copiar"
            >Copiar</button>
          </div>
        </div>
        <div class="code-body"><span class="c-yellow">services</span>:
  <span class="c-muted">  # ─── JUICE SHOP ───────────────────────────────────────────────</span>
  <span class="c-yellow">juice-shop</span>:
    <span class="c-yellow">image</span>:<span class="c-green"> bkimminich/juice-shop</span>
    <span class="c-yellow">container_name</span>:<span class="c-green"> juice-shop</span>
    <span class="c-yellow">restart</span>:<span class="c-green"> unless-stopped</span>
    <span class="c-yellow">mem_limit</span>:<span class="c-green"> 512m</span>
    <span class="c-yellow">mem_reservation</span>:<span class="c-green"> 256m</span>
    <span class="c-yellow">ports</span>:
      - <span class="c-green">&quot;3000:3000&quot;</span>
    <span class="c-yellow">networks</span>:
      - <span class="c-green">dmz-internal</span>
    <span class="c-yellow">healthcheck</span>:
      <span class="c-yellow">test</span>:<span class="c-green"> [&quot;CMD-SHELL&quot;, &quot;wget -qO- http://localhost:3000 || exit 1&quot;]</span>
      <span class="c-yellow">interval</span>:<span class="c-green"> 30s</span>
      <span class="c-yellow">timeout</span>:<span class="c-green"> 10s</span>
      <span class="c-yellow">retries</span>:<span class="c-green"> 3</span>
      <span class="c-yellow">start_period</span>:<span class="c-green"> 30s</span>
  <span class="c-muted">  # ─── DVWA ─────────────────────────────────────────────────────</span>
  <span class="c-yellow">dvwa</span>:
    <span class="c-yellow">image</span>:<span class="c-green"> ghcr.io/digininja/dvwa:latest</span>
    <span class="c-yellow">container_name</span>:<span class="c-green"> dvwa</span>
    <span class="c-yellow">restart</span>:<span class="c-green"> unless-stopped</span>
    <span class="c-yellow">mem_limit</span>:<span class="c-green"> 256m</span>
    <span class="c-yellow">mem_reservation</span>:<span class="c-green"> 128m</span>
    <span class="c-yellow">environment</span>:
      - <span class="c-green">DB_SERVER=db</span>
      - <span class="c-green">DB_DATABASE=\${DVWA_DB:-dvwa}</span>
      - <span class="c-green">DB_USER=\${DVWA_USER:-dvwa}</span>
      - <span class="c-green">DB_PASSWORD=\${DVWA_PASSWORD:-p@ssw0rd}</span>
    <span class="c-yellow">depends_on</span>:
      <span class="c-yellow">db</span>:
        <span class="c-yellow">condition</span>:<span class="c-green"> service_healthy</span>
    <span class="c-yellow">ports</span>:
      - <span class="c-green">&quot;8080:80&quot;</span>
    <span class="c-yellow">networks</span>:
      - <span class="c-green">dmz-internal</span>
  <span class="c-muted">  # ─── MARIADB ──────────────────────────────────────────────────</span>
  <span class="c-yellow">db</span>:
    <span class="c-yellow">image</span>:<span class="c-green"> mariadb:10.11</span>
    <span class="c-yellow">container_name</span>:<span class="c-green"> dvwa-db</span>
    <span class="c-yellow">restart</span>:<span class="c-green"> unless-stopped</span>
    <span class="c-yellow">mem_limit</span>:<span class="c-green"> 256m</span>
    <span class="c-yellow">mem_reservation</span>:<span class="c-green"> 128m</span>
    <span class="c-yellow">environment</span>:
      - <span class="c-green">MYSQL_ROOT_PASSWORD=\${DVWA_ROOT_PASSWORD:-dvwa_root}</span>
      - <span class="c-green">MYSQL_DATABASE=\${DVWA_DB:-dvwa}</span>
      - <span class="c-green">MYSQL_USER=\${DVWA_USER:-dvwa}</span>
      - <span class="c-green">MYSQL_PASSWORD=\${DVWA_PASSWORD:-p@ssw0rd}</span>
    <span class="c-yellow">volumes</span>:
      - <span class="c-green">dvwa-db-data:/var/lib/mysql</span>
    <span class="c-yellow">networks</span>:
      - <span class="c-green">dmz-internal</span>
    <span class="c-yellow">healthcheck</span>:
      <span class="c-yellow">test</span>:
          [
            &quot;CMD-SHELL&quot;,
            &quot;mysqladmin ping -h localhost -u root -p\${DVWA_ROOT_PASSWORD:-dvwa_root} --silent&quot;,
          ]
      <span class="c-yellow">interval</span>:<span class="c-green"> 10s</span>
      <span class="c-yellow">timeout</span>:<span class="c-green"> 5s</span>
      <span class="c-yellow">retries</span>:<span class="c-green"> 6</span>
      <span class="c-yellow">start_period</span>:<span class="c-green"> 30s</span>
  <span class="c-muted"># ─── VOLÚMENES ────────────────────────────────────────────────</span>
<span class="c-yellow">volumes</span>:
  <span class="c-yellow">dvwa-db-data</span>:
<span class="c-yellow">networks</span>:
  <span class="c-yellow">dmz-internal</span>:
    <span class="c-yellow">driver</span>:<span class="c-green"> bridge</span></div>
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
            <div class="step-desc">Prepara la carpeta, copia el YAML y (opcional) <code>env.dmz</code> como <code>.env</code> para credenciales de MariaDB/DVWA:</div>
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

      <textarea id="targets-compose-yml" hidden>services:
  # ─── JUICE SHOP ───────────────────────────────────────────────
  juice-shop:
    image: bkimminich/juice-shop
    container_name: juice-shop
    restart: unless-stopped
    mem_limit: 512m
    mem_reservation: 256m
    ports:
      - "3000:3000"
    networks:
      - dmz-internal
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:3000 || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s

  # ─── DVWA ─────────────────────────────────────────────────────
  dvwa:
    image: ghcr.io/digininja/dvwa:latest
    container_name: dvwa
    restart: unless-stopped
    mem_limit: 256m
    mem_reservation: 128m
    environment:
      - DB_SERVER=db
      - DB_DATABASE=\${DVWA_DB:-dvwa}
      - DB_USER=\${DVWA_USER:-dvwa}
      - DB_PASSWORD=\${DVWA_PASSWORD:-p@ssw0rd}
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "8080:80"
    networks:
      - dmz-internal

  # ─── MARIADB ──────────────────────────────────────────────────
  db:
    image: mariadb:10.11
    container_name: dvwa-db
    restart: unless-stopped
    mem_limit: 256m
    mem_reservation: 128m
    environment:
      - MYSQL_ROOT_PASSWORD=\${DVWA_ROOT_PASSWORD:-dvwa_root}
      - MYSQL_DATABASE=\${DVWA_DB:-dvwa}
      - MYSQL_USER=\${DVWA_USER:-dvwa}
      - MYSQL_PASSWORD=\${DVWA_PASSWORD:-p@ssw0rd}
    volumes:
      - dvwa-db-data:/var/lib/mysql
    networks:
      - dmz-internal
    healthcheck:
      test:
        [
          "CMD-SHELL",
          "mysqladmin ping -h localhost -u root -p\${DVWA_ROOT_PASSWORD:-dvwa_root} --silent",
        ]
      interval: 10s
      timeout: 5s
      retries: 6
      start_period: 30s

# ─── VOLÚMENES ────────────────────────────────────────────────
volumes:
  dvwa-db-data:

networks:
  dmz-internal:
    driver: bridge</textarea>
    </div>
  `,
};
