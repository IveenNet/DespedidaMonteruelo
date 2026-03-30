export default {
  sectionLabel: 'OpenClaw',
  icon:  '🦞',
  title: 'Setup',
  sub:   'cerebro del sistema · agente · gateway',
  dots:  [true, true, true],

  content: `
    <div class="openclaw-setup">
      <div class="slide-eyebrow">OpenClaw · Configuración</div>
      <div class="slide-heading">El cerebro de PIRINEUS <span class="badge badge-done">agente</span></div>
      <div class="slide-sub openclaw-setup__sub">No es “el receptor de n8n”: es <strong>nuestro agente</strong>. Tiene contexto del laboratorio, razona con las reglas del workspace y actúa: convierte señales en conclusiones, puede <strong>publicar informes en este repositorio</strong> (pull requests) y, vía <strong>Telegram</strong>, consultar fuentes como <strong>VirusTotal</strong> y <strong>Shodan</strong> cuando hace falta enriquecer el análisis.</div>

      <div class="oc-brain-stage">
        <div class="oc-brain-aura" aria-hidden="true"></div>
        <div class="oc-constellation">
          <div class="oc-const-ring oc-const-ring--outer" aria-hidden="true"></div>
          <div class="oc-const-ring oc-const-ring--inner" aria-hidden="true"></div>
          <div class="oc-sat oc-sat--a">
            <span class="oc-sat-dot"></span>
            <span class="oc-sat-label">n8n</span>
            <span class="oc-sat-hint">pipeline ZAP / Nuclei</span>
          </div>
          <div class="oc-sat oc-sat--b">
            <span class="oc-sat-dot"></span>
            <span class="oc-sat-label">Telegram</span>
            <span class="oc-sat-hint">chat · VT / Shodan</span>
          </div>
          <div class="oc-sat oc-sat--c">
            <span class="oc-sat-dot"></span>
            <span class="oc-sat-label">GitHub</span>
            <span class="oc-sat-hint">PRs · informes en repo</span>
          </div>
          <div class="oc-sat oc-sat--d">
            <span class="oc-sat-dot"></span>
            <span class="oc-sat-label">Memoria &amp; docs</span>
            <span class="oc-sat-hint">AGENTS · SOUL · …</span>
          </div>
          <div class="oc-core">
            <div class="oc-core-icon">🦞</div>
            <div class="oc-core-name">OpenClaw</div>
            <div class="oc-core-tag">orquesta · razona · ejecuta</div>
            <p class="oc-core-copy">Los flujos automatizados <em>empujan</em> datos; el agente es quien los <em>cruza</em> con el conocimiento del sistema y decide qué contar, qué archivar y qué subir al repositorio.</p>
          </div>
        </div>
      </div>

      <div class="oc-flow-legend">
        <div class="oc-flow-chip oc-flow-chip--in"><span>Entra</span> señal bruta (webhook, mensaje, informe parcial)</div>
        <div class="oc-flow-chip oc-flow-chip--mid"><span>Pasa</span> por lógica + herramientas acordadas (allowlist)</div>
        <div class="oc-flow-chip oc-flow-chip--out"><span>Sale</span> contenido listo (PR, respuesta SOC, dato enriquecido)</div>
      </div>

      <div class="oc-split">
        <div class="oc-panel oc-panel--glow">
          <div class="oc-panel-h"><strong>Instalación</strong> · gateway siempre vivo</div>
          <ul class="oc-steps-mini">
            <li>
              <span class="oc-sn">1</span>
              <span>CLI + <strong>gateway</strong> como servicio (<code>systemctl --user</code>) para que el agente siga escuchando (<code>/hooks/agent</code>) aunque cierres la sesión.</span>
            </li>
            <li>
              <span class="oc-sn">2</span>
              <span>Puerto alineado con Docker: desde los contenedores suele verse como <code>host.docker.internal</code> + token Bearer compartido solo entre servicios de confianza.</span>
            </li>
            <li>
              <span class="oc-sn">3</span>
              <span><strong>Approvals / allowlist</strong>: Git, APIs de intel (VT, Shodan), Telegram… solo lo que el proyecto autoriza; el cerebro es capaz, pero el perímetro lo defines tú.</span>
            </li>
          </ul>
        </div>
        <div class="oc-panel oc-panel--glow">
          <div class="oc-panel-h"><strong>Qué hace el agente</strong> · más allá del escaneo</div>
          <ul class="oc-steps-mini">
            <li>
              <span class="oc-sn">◇</span>
              <span><strong>n8n</strong> es una fuente importante, no el dueño del agente: manda el resultado del lab; OpenClaw lo integra con el resto del contexto.</span>
            </li>
            <li>
              <span class="oc-sn">◇</span>
              <span><strong>Pull requests</strong> para dejar informes versionados en <code>DespedidaMonteruelo</code> (trazabilidad del reto, no solo un chat).</span>
            </li>
            <li>
              <span class="oc-sn">◇</span>
              <span><strong>Telegram + intel</strong>: consultas puntuales VirusTotal / Shodan cuando el diálogo lo requiere (ioc, exposición, contexto externo).</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="oc-cmd-section">
        <h3 class="oc-cmd-heading"><span class="oc-cmd-hash" aria-hidden="true">//</span> comandos de referencia</h3>
        <p class="oc-cmd-lead">Comandos alineados con el <strong>Quick Start</strong> de <a href="https://openclaw.ai/" target="_blank" rel="noopener noreferrer">openclaw.ai</a> (instalación en tu máquina, no dentro de los contenedores del lab). Después del <code>onboard</code>, en un servidor como PIRINEUS puedes dejar el <strong>gateway</strong> como servicio <code>systemd --user</code> y cerrar con la <strong>allowlist</strong>.</p>

        <div class="code-block oc-cli-dock">
          <div class="oc-cli-glow" aria-hidden="true"></div>
          <div class="oc-cli-chrome">
            <div class="oc-cli-chrome-left">
              <span class="oc-cli-logo">🦞</span>
              <span class="oc-cli-title">openclaw-shell</span>
              <span class="oc-cli-sep">·</span>
              <span class="oc-cli-sub">quick start</span>
            </div>
            <div class="oc-cli-chrome-right">
              <a class="oc-cli-badge oc-cli-badge--link" href="https://openclaw.ai/" target="_blank" rel="noopener noreferrer"><span class="oc-cli-badge-pulse" aria-hidden="true"></span>openclaw.ai</a>
            </div>
          </div>
          <div class="oc-cli-body">
            <div class="oc-cli-scanline" aria-hidden="true"></div>
            <div class="oc-cli-noise" aria-hidden="true"></div>
            <div class="oc-cli-lines">
              <div class="oc-cli-line oc-cli-line--comment"><span class="c-muted"># 1 — One-liner oficial (instala Node y dependencias si hace falta)</span></div>
              <div class="oc-cli-line"><span class="oc-cli-prompt" aria-hidden="true"></span><span class="c-cyan">curl</span> <span class="c-yellow">-fsSL</span> <span class="c-green">https://openclaw.ai/install.sh</span> <span class="c-muted">|</span> <span class="c-green">bash</span></div>
              <div class="oc-cli-line oc-cli-line--gap"></div>
              <div class="oc-cli-line oc-cli-line--comment"><span class="c-muted"># 2 — Alternativa: paquete global npm</span></div>
              <div class="oc-cli-line"><span class="oc-cli-prompt" aria-hidden="true"></span><span class="c-cyan">npm</span> <span class="c-yellow">i</span> <span class="c-green">-g</span> <span class="c-orange">openclaw</span></div>
              <div class="oc-cli-line oc-cli-line--gap"></div>
              <div class="oc-cli-line oc-cli-line--comment"><span class="c-muted"># 3 — Onboarding: «Meet your lobster» (configura el agente)</span></div>
              <div class="oc-cli-line"><span class="oc-cli-prompt" aria-hidden="true"></span><span class="c-cyan">openclaw</span> <span class="c-green">onboard</span></div>
              <div class="oc-cli-line oc-cli-line--gap"></div>
              <div class="oc-cli-line oc-cli-line--comment"><span class="c-muted"># 4 — Opción hackable: instalar desde fuente (git)</span></div>
              <div class="oc-cli-line"><span class="oc-cli-prompt" aria-hidden="true"></span><span class="c-cyan">curl</span> <span class="c-yellow">-fsSL</span> <span class="c-green">https://openclaw.ai/install.sh</span> <span class="c-muted">|</span> <span class="c-green">bash</span> <span class="c-yellow">-s</span> <span class="c-muted">--</span> <span class="c-yellow">--install-method</span> <span class="c-orange">git</span></div>
              <div class="oc-cli-line oc-cli-line--gap"></div>
              <div class="oc-cli-line oc-cli-line--comment"><span class="c-muted"># 5 — PIRINEUS: gateway persistente (systemd usuario; nombres según tu unidad)</span></div>
              <div class="oc-cli-line"><span class="oc-cli-prompt" aria-hidden="true"></span><span class="c-cyan">openclaw</span> <span class="c-yellow">gateway</span> <span class="c-green">install</span></div>
              <div class="oc-cli-line"><span class="oc-cli-prompt" aria-hidden="true"></span><span class="c-cyan">systemctl</span> <span class="c-yellow">--user</span> <span class="c-green">daemon-reload</span></div>
              <div class="oc-cli-line"><span class="oc-cli-prompt" aria-hidden="true"></span><span class="c-cyan">systemctl</span> <span class="c-yellow">--user</span> <span class="c-green">enable --now</span> <span class="c-orange">openclaw-gateway</span></div>
              <div class="oc-cli-line"><span class="oc-cli-prompt" aria-hidden="true"></span><span class="c-cyan">systemctl</span> <span class="c-yellow">--user</span> <span class="c-green">is-active</span> <span class="c-orange">openclaw-gateway</span></div>
              <div class="oc-cli-line oc-cli-line--gap"></div>
              <div class="oc-cli-line oc-cli-line--comment"><span class="c-muted"># 6 — Allowlist (ejemplo; n8n-webhook u otro alias que uses)</span></div>
              <div class="oc-cli-line"><span class="oc-cli-prompt" aria-hidden="true"></span><span class="c-cyan">openclaw</span> <span class="c-yellow">approvals</span> <span class="c-green">allowlist add</span> <span class="c-orange">n8n-webhook</span></div>
              <div class="oc-cli-line"><span class="oc-cli-prompt" aria-hidden="true"></span><span class="c-cyan">openclaw</span> <span class="c-yellow">approvals</span> <span class="c-green">allowlist list</span></div>
            </div>
            <div class="oc-cli-footer">
              <span class="oc-cli-hint">LISTO</span>
              <span class="oc-cli-caret" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="oc-clawhub">
        <div class="oc-clawhub-top">
          <div class="oc-clawhub-title"><span>ClawHub</span> · skills y plugins</div>
          <a href="https://clawhub.ai/" target="_blank" rel="noopener noreferrer">clawhub.ai →</a>
        </div>
        <p>
          <a href="https://clawhub.ai/" target="_blank" rel="noopener noreferrer">ClawHub</a> amplía el cerebro sin ensuciar el repo base: skills versionados, instalables con la CLI del ecosistema (<code>npx clawhub@latest install …</code>), para compartir patrones (informes, revisiones, integraciones) entre equipos.
        </p>
      </div>

      <h3>// bootstrap · archivos que cargan al arrancar</h3>
      <p class="oc-matrix-kicker">Contexto estable + tu criterio operativo. El modelo no “adivina” el proyecto: lee estos módulos junto a la sesión.</p>
      <div class="oc-file-matrix">
        <div class="oc-file-card">
          <div class="oc-file-name">AGENTS.md</div>
          <p>Reglas de trabajo: prioridades SOC, cómo mezclar hallazgos del lab con intel externa y cuándo escalar a PR o a pregunta en Telegram.</p>
        </div>
        <div class="oc-file-card">
          <div class="oc-file-name">SOUL.md</div>
          <p>Personalidad y límites éticos: tono docente, transparencia sobre límites de herramientas (VT/Shodan) y datos del entorno académico.</p>
        </div>
        <div class="oc-file-card">
          <div class="oc-file-name">IDENTITY.md</div>
          <p>Cómo se presenta el agente al grupo: nombre, rol, emoji; coherente con Telegram y con las respuestas largas del repositorio.</p>
        </div>
        <div class="oc-file-card">
          <div class="oc-file-name">USER.md</div>
          <p>El humano (equipo, tutores, Europa/Madrid): trato, plazos y expectativas de informe.</p>
        </div>
        <div class="oc-file-card">
          <div class="oc-file-name">TOOLS.md</div>
          <p>Capacidades reales: webhook n8n, rutas Git para PR, adaptadores Telegram, consultas VT/Shodan dentro de la allowlist; nada fuera de lista.</p>
        </div>
        <div class="oc-file-card">
          <div class="oc-file-name">MEMORY.md</div>
          <p>Lo que debe persistir entre sesiones: decisiones del reto, convenciones de severidad y estructura de informes en este repo.</p>
        </div>
        <div class="oc-file-card">
          <div class="oc-file-name">memory/*.md</div>
          <p>Bitácora diaria de ejecuciones y conversaciones; suele leerse hoy y ayer para no perder continuidad.</p>
        </div>
        <div class="oc-file-card">
          <div class="oc-file-name">BOOTSTRAP · BOOT</div>
          <p>Rutina de aterrizaje: alinear identidad, usuario y herramientas antes de aceptar tareas “serias”.</p>
        </div>
        <div class="oc-file-card">
          <div class="oc-file-name">HEARTBEAT.md</div>
          <p>Tareas periódicas ligadas a <code>openclaw.json</code>: ordenar memoria, revisar doc del reto o checks silenciosos si lo activáis.</p>
        </div>
      </div>

      <div class="info-box oc-info-highlight">
        <strong>Cierre:</strong> OpenClaw es el <strong>cerebro operativo</strong> del stack: piensa con todo el sistema a la vista, no solo con el último POST de n8n. Si el comportamiento no encaja, revisa allowlist y bootstrap antes del modelo.
      </div>
    </div>
  `,
};
