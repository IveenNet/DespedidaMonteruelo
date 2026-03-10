export default {
  sectionLabel: 'Infraestructura',
  icon:  '🎯',
  title: 'Targets',
  sub:   'Juice Shop · DVWA',
  dots:  [true, true, true],

  content: `
    <div class="slide-eyebrow">Issue #4 · Infraestructura</div>
    <div class="slide-heading">Targets <span class="badge badge-done">completado</span></div>
    <div class="slide-sub">VM-Targets con Juice Shop y DVWA desplegados en Docker como aplicaciones vulnerables objetivo del escaneo automatizado.</div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🧃</div>
        <div class="card-title">Juice Shop</div>
        <div class="card-desc">Aplicación web vulnerable de OWASP con más de 100 retos de seguridad.</div>
        <div class="card-tag">:3000</div>
      </div>
      <div class="card">
        <div class="card-icon">🐛</div>
        <div class="card-title">DVWA</div>
        <div class="card-desc">Damn Vulnerable Web App con niveles de seguridad configurables (Low/Medium/High).</div>
        <div class="card-tag">:8080</div>
      </div>
    </div>

    <h3>// docker-compose.yml</h3>
    <div class="code-block">
      <div class="code-header">
        <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
        <span class="code-label">docker-compose.yml</span>
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
    <div class="steps">
      <div class="step">
        <div class="step-num">01</div>
        <div class="step-content">
          <div class="step-title">Instalar Docker</div>
          <div class="step-desc"><code>sudo apt install curl -y</code> → <code>curl -fsSL https://get.docker.com | sh</code> → <code>sudo usermod -aG docker $USER</code></div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">02</div>
        <div class="step-content">
          <div class="step-title">Crear carpeta y compose</div>
          <div class="step-desc"><code>mkdir ~/vm-targets && cd ~/vm-targets</code> → crear <code>docker-compose.yml</code> con el contenido de arriba.</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">03</div>
        <div class="step-content">
          <div class="step-title">Levantar contenedores</div>
          <div class="step-desc"><code>docker compose up -d</code> → Docker descarga las imágenes y arranca los servicios automáticamente.</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">04</div>
        <div class="step-content">
          <div class="step-title">Configurar DVWA</div>
          <div class="step-desc">Acceder a <code>http://IP:8080</code> → login con <code>admin / password</code> → pulsar <strong>Create / Reset Database</strong> → establecer nivel <strong>Low</strong>.</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Credenciales DVWA:</strong> usuario <code>admin</code> · contraseña <code>password</code><br>
      Establecer nivel <strong>Low</strong> en DVWA Security para maximizar la superficie de ataque durante el escaneo.
    </div>
  `
};
