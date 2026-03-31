export default {
  sectionLabel: null,
  icon:  '📡',
  title: 'Alertas',
  sub:   'Telegram · Threat Intel · playbooks',
  dots:  [true, true, true],

  content: `
    <div class="openclaw-alertas">
      <div class="slide-eyebrow">OpenClaw · Respuesta</div>
      <div class="slide-heading">Alertas accionables <span class="badge badge-done">PIRINEUS</span></div>
      <div class="slide-sub">El agente <strong>no escanea</strong>. Interpreta señales (n8n/Wazuh), enriquece con <strong>threat intel</strong> bajo demanda y responde por <strong>Telegram</strong> con playbooks consistentes: resumen, riesgo y próximos pasos.</div>

      <div class="slide-actions">
        <button class="btn btn--inline" type="button" data-open-modal="implGuide">Abrir guía de implementación</button>
      </div>

      <div class="oc-a-grid oc-a-grid--v2">
        <div class="oc-a-col">
          <div class="oc-a-panel oc-a-panel--protocol">
          <div class="oc-a-h">
            <span class="oc-a-kicker">// AGENTS.md</span>
            <span class="oc-a-title">Protocolo de sesión</span>
          </div>
          <ol class="oc-a-routine">
            <li><strong>Arranque</strong>: leer <code>SOUL.md</code>, <code>USER.md</code>, <code>memory/YYYY-MM-DD.md</code> (hoy y ayer). En sesión principal, también <code>MEMORY.md</code>.</li>
            <li><strong>Inputs</strong>: webhooks de <code>n8n</code> (reportes ZAP/Nuclei), alertas Wazuh severidad ≥ 8, y comandos de intel por Telegram.</li>
            <li><strong>Salida</strong>: mensajes cortos, estructurados, con niveles de riesgo y <em>Next steps</em> (pensados para móvil).</li>
          </ol>

          <div class="oc-a-boundaries">
            <div class="oc-a-boundaries-h">Límites (no negociables)</div>
            <div class="oc-a-boundaries-list">
              <span class="oc-a-pill">No ejecutar ZAP/Docker</span>
              <span class="oc-a-pill">No tocar host/FS</span>
              <span class="oc-a-pill">No fabricar resultados</span>
              <span class="oc-a-pill">Solo acciones allowlist</span>
            </div>
          </div>
          </div>

          <div class="oc-a-panel oc-a-panel--telegram">
          <div class="oc-a-h">
            <span class="oc-a-kicker">// Telegram</span>
            <span class="oc-a-title">Plantillas de respuesta</span>
          </div>

          <div class="oc-a-cards">
            <div class="oc-a-mini">
              <div class="oc-a-mini-top"><span class="oc-a-mini-ico">🕸️</span><span class="oc-a-mini-title">Web scan (n8n)</span></div>
              <div class="oc-a-mini-desc">Agrupar por severidad, explicar impacto y priorizar acciones 24–72h.</div>
            </div>
            <div class="oc-a-mini">
              <div class="oc-a-mini-top"><span class="oc-a-mini-ico">🚨</span><span class="oc-a-mini-title">Wazuh (≥ 8)</span></div>
              <div class="oc-a-mini-desc">Evaluación rápida: amenaza real vs ruido, con pasos concretos.</div>
            </div>
            <div class="oc-a-mini">
              <div class="oc-a-mini-top"><span class="oc-a-mini-ico">🦠</span><span class="oc-a-mini-title">/oracle (VT)</span></div>
              <div class="oc-a-mini-desc">Ratio de detección, veredicto, highlights de comportamiento.</div>
            </div>
            <div class="oc-a-mini">
              <div class="oc-a-mini-top"><span class="oc-a-mini-ico">🔭</span><span class="oc-a-mini-title">/shodan · /hunt</span></div>
              <div class="oc-a-mini-desc">Exposición, puertos, banners, CVEs y evaluación de riesgo.</div>
            </div>
          </div>

          <div class="code-block oc-a-console">
            <div class="code-header">
              <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
              <span class="code-label">telegram · output</span>
            </div>
            <div class="code-body"><span class="c-muted">[🕸️ WEB SCAN REPORT]</span> <span class="c-yellow">&lt;target&gt;</span>

<span class="c-cyan">**Summary**</span>
- <span class="c-orange">High</span>: X issues
- <span class="c-yellow">Medium</span>: Y issues
- <span class="c-green">Low</span>: Z issues

<span class="c-cyan">**High-Risk Findings**</span>
- <span class="c-orange">&lt;name&gt;</span> — <span class="c-muted">&lt;impact&gt;</span> — <span class="c-yellow">&lt;endpoint(s)&gt;</span>

<span class="c-cyan">**Recommended Actions (24–72h)**</span>
- <span class="c-green">&lt;Action 1&gt;</span>
- <span class="c-green">&lt;Action 2&gt;</span>

<span class="c-muted">[🚨 WAZUH ALERT]</span> Severity: <span class="c-orange">X/10</span>
<span class="c-cyan">**Assessment**</span> — <span class="c-muted">&lt;juicio corto + correlación si aplica&gt;</span></div>
          </div>
          </div>
        </div>

        <div class="oc-a-panel oc-a-panel--intel">
          <div class="oc-a-h oc-a-h--intel">
            <span class="oc-a-kicker">// Threat Intel</span>
            <span class="oc-a-title">Shodan primero</span>
          </div>

          <div class="oc-ti-stack">
            <details class="oc-ti oc-ti--shodan" open>
              <summary class="oc-ti-sum">
                <span class="oc-ti-ico">🔭</span>
                <span class="oc-ti-name">/shodan</span>
                <span class="oc-ti-sub">host intel · puertos · banners · CVEs</span>
                <span class="oc-ti-cta">ver código</span>
              </summary>
              <div class="oc-ti-body">
                <div class="oc-ti-meta">
                  <div class="oc-ti-line"><strong>Trigger</strong> <code>/shodan &lt;IP&gt;</code></div>
                  <div class="oc-ti-actions">
                    <button class="btn oc-ti-btn" type="button" data-copy-target="oc-shodan-code">Copiar</button>
                  </div>
                </div>
                <pre class="oc-ti-code" id="oc-shodan-code"># 1) Host info
GET https://api.shodan.io/shodan/host/&lt;IP&gt;?key=$SHODAN_API_KEY

# 2) Reverse DNS
GET https://api.shodan.io/dns/reverse?ips=&lt;IP&gt;&amp;key=$SHODAN_API_KEY

# 3) (Opcional) Si hay hostname, domain lookup
GET https://api.shodan.io/dns/domain/&lt;domain&gt;?key=$SHODAN_API_KEY</pre>
                <div class="oc-ti-hint">En PIRINEUS lo importante es correlacionar exposición (puertos/banners) con hallazgos de n8n (ZAP/Nuclei) y alertas Wazuh.</div>
              </div>
            </details>

            <details class="oc-ti oc-ti--hunt">
              <summary class="oc-ti-sum">
                <span class="oc-ti-ico">🔍</span>
                <span class="oc-ti-name">/hunt</span>
                <span class="oc-ti-sub">búsqueda avanzada · facets · muestras</span>
                <span class="oc-ti-cta">ver código</span>
              </summary>
              <div class="oc-ti-body">
                <div class="oc-ti-meta">
                  <div class="oc-ti-line"><strong>Trigger</strong> <code>/hunt &lt;query&gt;</code></div>
                  <div class="oc-ti-actions">
                    <button class="btn oc-ti-btn" type="button" data-copy-target="oc-hunt-code">Copiar</button>
                  </div>
                </div>
                <pre class="oc-ti-code" id="oc-hunt-code">GET https://api.shodan.io/shodan/host/search?key=$SHODAN_API_KEY&amp;query=&lt;query&gt;&amp;facets=country,port,org,product</pre>
                <div class="oc-ti-hint">Ejemplos útiles: <code>vuln:CVE-2021-44228</code>, <code>http.title:&quot;DVWA&quot;</code>, <code>country:ES</code>, <code>net:&lt;CIDR&gt;</code>.</div>
              </div>
            </details>

            <details class="oc-ti oc-ti--oracle">
              <summary class="oc-ti-sum">
                <span class="oc-ti-ico">🦠</span>
                <span class="oc-ti-name">/oracle</span>
                <span class="oc-ti-sub">VirusTotal v3 · veredicto · comportamiento</span>
                <span class="oc-ti-cta">ver código</span>
              </summary>
              <div class="oc-ti-body">
                <div class="oc-ti-meta">
                  <div class="oc-ti-line"><strong>Trigger</strong> <code>/oracle &lt;hash|ip|domain&gt;</code></div>
                  <div class="oc-ti-actions">
                    <button class="btn oc-ti-btn" type="button" data-copy-target="oc-oracle-code">Copiar</button>
                  </div>
                </div>
                <pre class="oc-ti-code" id="oc-oracle-code"># File hash
GET https://www.virustotal.com/api/v3/files/&lt;hash&gt;
Headers: x-apikey: $VIRUSTOTAL_API_KEY

GET https://www.virustotal.com/api/v3/files/&lt;hash&gt;/behaviour_summary
GET https://www.virustotal.com/api/v3/files/&lt;hash&gt;/comments

# IP / domain
GET https://www.virustotal.com/api/v3/ip_addresses/&lt;ip&gt;
GET https://www.virustotal.com/api/v3/domains/&lt;domain&gt;</pre>
              </div>
            </details>
          </div>

          <div class="oc-a-env">
            <div class="oc-a-env-h">Variables (ejemplo)</div>
            <div class="code-block">
              <div class="code-header">
                <div class="code-dots"><div class="code-dot"></div><div class="code-dot"></div><div class="code-dot"></div></div>
                <span class="code-label">.env</span>
              </div>
              <div class="code-body"><span class="c-muted"># Threat intel</span>
<span class="c-cyan">VIRUSTOTAL_API_KEY</span>=<span class="c-green">...</span>
<span class="c-cyan">SHODAN_API_KEY</span>=<span class="c-green">...</span>

<span class="c-muted"># Telegram</span>
<span class="c-cyan">TELEGRAM_BOT_TOKEN</span>=<span class="c-green">...</span>
<span class="c-cyan">TELEGRAM_CHAT_ID</span>=<span class="c-green">...</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <strong>Clave:</strong> el valor del agente no es “hacer más ruido”, sino <strong>correlacionar</strong> (misma IP/vector entre ZAP/Nuclei, Wazuh y VT/Shodan) y devolver una decisión accionable.
      </div>
    </div>
  `
};
