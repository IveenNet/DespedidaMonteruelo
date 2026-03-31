export default {
  sectionLabel: null,
  icon:  '🔁',
  title: 'n8n Workflows',
  sub:   'JuiceShop · DVWA · exportable',
  dots:  [true, true, true],

  content: `
    <div class="secops-workflows">
      <div class="slide-eyebrow">SecOps · Orquestación</div>
      <div class="slide-heading">Workflows n8n <span class="badge badge-done">PIRINEUS</span></div>
      <div class="slide-sub">Dos flujos gemelos en <code>server-pirineus</code>: mismo cableado (ZAP + Nuclei + informe + OpenClaw), distinto <code>target</code>. Aquí tienes el <strong>export JSON</strong> listo para importar y un mapa tipo editor n8n.</div>

      <div class="slide-actions">
        <button class="btn btn--inline" type="button" data-open-modal="implGuide">Abrir guía de implementación</button>
        <a class="btn btn--ghost" href="assets/downloads/n8n/pirineus-dvwa-full-scan.json" download="pirineus-dvwa-full-scan.json">Descargar DVWA</a>
        <a class="btn btn--ghost" href="assets/downloads/n8n/pirineus-juiceshop-full-scan.json" download="pirineus-juiceshop-full-scan.json">Descargar Juice Shop</a>
      </div>

      <div class="n8n-chrome">
        <div class="n8n-chrome-left">
          <span class="n8n-logo">n8<span>n</span></span>
          <span class="n8n-pill">Editor</span>
          <span class="n8n-pill n8n-pill--hot">Executions · v1</span>
        </div>
        <span class="n8n-pill">Importar → Workflow → From File</span>
      </div>

      <div class="n8n-dl-row">
        <a class="n8n-dl-card" href="assets/downloads/n8n/pirineus-juiceshop-full-scan.json" download="pirineus-juiceshop-full-scan.json">
          <div class="n8n-dl-top">
            <span class="n8n-dl-title">JuiceShop Full Scan</span>
            <span class="n8n-dl-badge">.json</span>
          </div>
          <div class="n8n-dl-meta">Export sanitizado: claves como <code>REPLACE_WITH_*</code>. Tras importar, sustituye por variables/secretos reales o por expresiones que lean tu <code>.env</code> de n8n.</div>
          <span class="n8n-dl-cta">Descargar workflow</span>
          <span class="n8n-dl-hint">pirineus-juiceshop-full-scan.json</span>
        </a>
        <a class="n8n-dl-card" href="assets/downloads/n8n/pirineus-dvwa-full-scan.json" download="pirineus-dvwa-full-scan.json">
          <div class="n8n-dl-top">
            <span class="n8n-dl-title">DVWA Full Scan</span>
            <span class="n8n-dl-badge">.json</span>
          </div>
          <div class="n8n-dl-meta">Export sanitizado: claves como <code>REPLACE_WITH_*</code>. Tras importar, sustituye por variables/secretos reales o por expresiones que lean tu <code>.env</code> de n8n.</div>
          <span class="n8n-dl-cta">Descargar workflow</span>
          <span class="n8n-dl-hint">pirineus-dvwa-full-scan.json</span>
        </a>
      </div>

      <div class="n8n-canvas">
        <div class="n8n-canvas-title"><strong>Anatomía del flujo</strong> · nodos agrupados por fase (como en el canvas real)</div>
        <div class="n8n-phases">
          <div class="n8n-phase">
            <div class="n8n-phase-label">01 · IN</div>
            <div class="n8n-nodes">
              <div class="n8n-node n8n-node--trigger">
                <span class="n8n-node-type">Manual</span>
                <span class="n8n-node-name">Manual Trigger</span>
              </div>
              <div class="n8n-node n8n-node--trigger">
                <span class="n8n-node-type">Cron</span>
                <span class="n8n-node-name">Schedule 00:00</span>
              </div>
              <div class="n8n-node n8n-node--trigger">
                <span class="n8n-node-type">Webhook</span>
                <span class="n8n-node-name">POST …/pirineus-scan</span>
              </div>
              <div class="n8n-connector" aria-hidden="true"></div>
              <div class="n8n-node n8n-node--logic">
                <span class="n8n-node-type">Code</span>
                <span class="n8n-node-name">Config</span>
              </div>
            </div>
          </div>
          <div class="n8n-phase">
            <div class="n8n-phase-label">02 · ZAP</div>
            <div class="n8n-nodes">
              <div class="n8n-node n8n-node--http">
                <span class="n8n-node-type">HTTP</span>
                <span class="n8n-node-name">Nueva sesión</span>
              </div>
              <div class="n8n-connector" aria-hidden="true"></div>
              <div class="n8n-node n8n-node--http">
                <span class="n8n-node-type">HTTP</span>
                <span class="n8n-node-name">Acceder URL</span>
              </div>
              <div class="n8n-connector" aria-hidden="true"></div>
              <div class="n8n-node n8n-node--http">
                <span class="n8n-node-type">HTTP</span>
                <span class="n8n-node-name">Spider → estado</span>
              </div>
              <div class="n8n-node n8n-node--logic">
                <span class="n8n-node-type">If</span>
                <span class="n8n-node-name">Spider 100%?</span>
              </div>
              <div class="n8n-connector" aria-hidden="true"></div>
              <div class="n8n-node n8n-node--http">
                <span class="n8n-node-type">HTTP</span>
                <span class="n8n-node-name">Active Scan</span>
              </div>
              <div class="n8n-node n8n-node--http">
                <span class="n8n-node-type">HTTP</span>
                <span class="n8n-node-name">Alertas</span>
              </div>
            </div>
          </div>
          <div class="n8n-phase">
            <div class="n8n-phase-label">03 · Nuclei</div>
            <div class="n8n-nodes">
              <div class="n8n-node n8n-node--http">
                <span class="n8n-node-type">HTTP POST</span>
                <span class="n8n-node-name">nuclei-api /scan</span>
              </div>
              <div class="n8n-connector" aria-hidden="true"></div>
              <div class="n8n-node n8n-node--logic">
                <span class="n8n-node-type">Code</span>
                <span class="n8n-node-name">Parsear Nuclei</span>
              </div>
            </div>
          </div>
          <div class="n8n-phase">
            <div class="n8n-phase-label">04 · OUT</div>
            <div class="n8n-nodes">
              <div class="n8n-node n8n-node--logic">
                <span class="n8n-node-type">Code</span>
                <span class="n8n-node-name">Construir informe + prompt bot</span>
              </div>
              <div class="n8n-connector" aria-hidden="true"></div>
              <div class="n8n-node n8n-node--logic">
                <span class="n8n-node-type">Code</span>
                <span class="n8n-node-name">Serializar body</span>
              </div>
              <div class="n8n-connector" aria-hidden="true"></div>
              <div class="n8n-node n8n-node--http">
                <span class="n8n-node-type">HTTP</span>
                <span class="n8n-node-name">OpenClaw hook</span>
              </div>
            </div>
          </div>
        </div>
        <div class="n8n-loops-note">
          <strong>Bucles y esperas:</strong> tras Spider y Active Scan hay nodos <em>Wait</em> (20s / 45s) y ramas <em>If</em> que repiten el polling hasta <code>status === "100"</code>. Si un HTTP falla, <code>onError: continueErrorOutput</code> alimenta nodos <strong>Error: …</strong> que formatean Telegram/OpenClaw sin tumbar todo el escaneo; Nuclei en error sigue con informe solo-ZAP.
        </div>
      </div>

      <div class="info-box">
        <strong>Seguridad:</strong> el JSON publicado no contiene API keys ni tokens reales. Sustituye <code>REPLACE_WITH_ZAP_API_KEY</code>, <code>REPLACE_WITH_OPENCLAW_TOKEN</code> y <code>REPLACE_WITH_TELEGRAM_CHAT_ID</code> (o elimina lo que no uses). Los <em>Wait</em> de n8n guardan <code>webhookId</code> en el export: si importas en otra instancia, revisa esos nodos según la doc de n8n.
      </div>
    </div>
  `,
};
