# Contenido completo de la presentación web (DespedidaMonteruelo)

Este documento recopila **toda la información textual** que aparece en el sitio estático bajo `docs/`: marco de página (`docs/index.html`), barra lateral, modal de implementación y cada slide en el orden definido en `docs/assets/js/slides.js`.

**Origen:** generado a partir de los módulos en `docs/slides/` y el HTML shell. Las rutas de descarga (`assets/...`) son relativas a la carpeta **`docs/`** cuando abres el sitio (p. ej. GitHub Pages).

**Orden de slides:** Visión general → Targets → Red · Opnsense → Lab SecOps → Workflows n8n → OpenClaw Setup → OpenClaw Workspace → OpenClaw Alertas → SIEM · SOC.

---

## Marco de la aplicación (`docs/index.html`)

- **Título de página:** DespedidaMonteruelo · CIFP Virgen de Gracia
- **Top bar:** CIFP Virgen de Gracia · DespedidaMonteruelo · botón **Tema** (claro/oscuro) · **Guía ?** (modal) · indicación de teclas **← →** para navegar · contador de slide `actual / total`
- **Barra de progreso** bajo la top bar
- **Navegación inferior:** botones ← y →

### Barra lateral (cabecera fija)

- **Reto 4**
- **Análisis de vulnerabilidades automatizado**
- La lista de entradas se construye desde cada slide: se muestra `sectionLabel` cuando existe, y el título de cada slide (`title`).

### Modal: Guía rápida (PIRINEUS)

**Kicker:** `// implementación`  
**Título:** Guía rápida (PIRINEUS)

1. **1) Levanta el scanner (Docker)**  
   Importa el stack de **vm-scanner** (incluye n8n, ZAP y Nuclei wrapper) y ajusta variables.  
   Enlaces: descargar `docker-compose.yml`, descargar `.env.example`.

2. **2) Importa workflows en n8n**  
   Workflows gemelos (DVWA / Juice Shop). Tras importar, sustituye `REPLACE_WITH_*` por secretos/vars reales.  
   Enlaces: DVWA workflow, Juice Shop workflow.

3. **3) Instala OpenClaw + gateway**  
   Instala desde [openclaw.ai](https://openclaw.ai/), haz `onboard` y deja el gateway persistente con `systemd --user`.  
   Nota: comandos y perímetro (allowlist) en la sección OpenClaw de las slides.

4. **4) Verifica “output”**  
   Salida deseada: resumen corto para móvil (Telegram) + trazabilidad en repo (informes/PR). Si falta contexto, revisar Workspace y allowlist.

---

## Slide 1 — Visión general (`docs/slides/intro/overview.js`)

- **Sección (sidebar):** Introducción
- **Icono / título nav:** Visión general
- **Subtítulo:** pipeline · outputs · límites
- **Eyebrow:** Proyecto de innovación educativa
- **Heading:** Análisis de vulnerabilidades **automatizado**
- **Sub:** Pipeline reproducible para escanear (ZAP/Nuclei), interpretar (OpenClaw) y entregar respuestas accionables (Telegram + repositorio). El agente **no ejecuta escáneres**: opera con webhooks, memoria y allowlist.
- **Acción:** Abrir guía de implementación

### Pipeline (orden visual)

| Nodo        | Subtítulo        |
|------------|------------------|
| n8n        | orquestador      |
| ZAP        | scanner activo   |
| Nuclei     | templates CVE    |
| OpenClaw   | analista · memoria |
| Telegram   | ChatOps          |
| GitHub     | informes · PR    |

Flechas: n8n → ZAP + Nuclei → OpenClaw → Telegram + GitHub.

### Tarjetas (cards)

| Título              | Descripción | Etiqueta |
|---------------------|-------------|----------|
| Targets             | Juice Shop y DVWA como aplicaciones vulnerables objetivo del escaneo en red DMZ. | DONE ✓ |
| n8n + ZAP + Nuclei  | n8n orquesta el flujo completo. ZAP hace el spider y active scan. Nuclei lanza templates CVE. | DONE ✓ |
| OpenClaw (Pirineus) | Interpreta webhooks (n8n/Wazuh), correlaciona señales, usa memoria y devuelve playbooks por Telegram. Threat intel (Shodan/VT) solo cuando lo piden. | DONE ✓ |
| Wazuh SIEM          | SIEM desplegado (Docker): ingesta, reglas, MITRE y SOAR hacia OpenClaw (webhook en alertas críticas) con trazabilidad en Telegram. | DONE ✓ |
| Alertas Telegram    | Informe de seguridad completo con ZAP + Nuclei entregado por Telegram al finalizar cada escaneo. | DONE ✓ |
| Límites y control   | Approvals/allowlist: el agente es capaz, pero el perímetro lo define el proyecto. Sin inventar resultados, sin tocar host/FS. | GUARDRAILS |

### Tabla estado

| Herramienta        | Rol | Estado |
|--------------------|-----|--------|
| n8n                | Orquestador del flujo de escaneo | completado |
| OWASP ZAP          | Escáner activo — spider + active scan | completado |
| Nuclei             | Escáner de templates CVE / vulnerabilidades conocidas | completado |
| OpenClaw           | Agente IA — análisis e informe via webhook | completado |
| Wazuh              | SIEM — correlación de alertas y dashboard SOC | completado |
| Juice Shop / DVWA  | Aplicaciones objetivo (red DMZ) | completado |
| Telegram Bot       | Notificaciones al equipo SOC | completado |
| GitHub             | Entrega: informes, PRs y trazabilidad | completado |

---

## Slide 2 — Targets (`docs/slides/infraestructura/targets.js`)

- **Sección:** Infraestructura
- **Título nav:** Targets
- **Subtítulo:** Juice Shop · DVWA
- **Eyebrow:** Issue #4 · Infraestructura
- **Heading:** Targets **completado**
- **Sub:** VM-Targets con Juice Shop y DVWA desplegados en Docker como aplicaciones vulnerables objetivo del escaneo automatizado.
- **Acciones:** Abrir guía de implementación · Descargar compose (`assets/downloads/vm-web/docker-compose.yml`)

### Bloque // servicios

- **Juice Shop** — UP — HTTP — `:3000` — imagen `bkimminich/juice-shop`
- **DVWA** — UP — HTTP — `:8080` — imagen `ghcr.io/digininja/dvwa`
- **DB (MariaDB)** — READY — internal — `mariadb:10.11`

**Nota pie:** Tip: mantén DVWA en **Low** durante demos para maximizar superficie de ataque.

### `// docker-compose.yml` (contenido mostrado)

```yaml
services:
  juice-shop:
    image: bkimminich/juice-shop
    container_name: juice-shop
    restart: unless-stopped
    ports:
      - "3000:3000"

  dvwa:
    image: ghcr.io/digininja/dvwa:latest
    container_name: dvwa
    restart: unless-stopped
    environment:
      - DB_SERVER=db
    depends_on: [db]
    ports:
      - "8080:80"

  db:
    image: mariadb:10.11
    environment:
      - MYSQL_ROOT_PASSWORD=dvwa
      - MYSQL_DATABASE=dvwa
      - MYSQL_USER=dvwa
      - MYSQL_PASSWORD=p@ssw0rd
```

### `// instalación paso a paso`

1. **01 — Instalar Docker**  
   - `sudo apt install curl -y`  
   - `curl -fsSL https://get.docker.com | sh`  
   - `sudo usermod -aG docker $USER`

2. **02 — Crear carpeta y compose**  
   - `mkdir ~/vm-targets && cd ~/vm-targets`  
   - `nano docker-compose.yml`

3. **03 — Levantar contenedores**  
   - `docker compose up -d`  
   - `docker compose ps`

4. **04 — Configurar DVWA**  
   Acceder a `http://IP:8080` → login `admin` / `password` → **Create / Reset Database** → nivel **Low**.

### Caja informativa

**Credenciales DVWA:** usuario `admin` · contraseña `password`  
Establecer nivel **Low** en DVWA Security para maximizar la superficie de ataque durante el escaneo.

---

## Slide 3 — Red · Opnsense (`docs/slides/infraestructura/opnsense.js`)

- **Título nav:** Red · Opnsense
- **Subtítulo:** segmentación · rutas · reglas
- **Eyebrow:** Issue #5 · Infraestructura
- **Heading:** Red · Opnsense **completado**
- **Sub:** La red es el “guardrail físico” del lab: segmentación, rutas y reglas para que el escáner llegue a los targets sin abrir más de lo necesario.
- **Acciones:** Abrir guía de implementación · Ver diagrama en grande (`docs/assets/images/red_drawio.jpg`)

### Tarjetas

- **Firewall:** Políticas 'Deny All' por defecto. Reglas explícitas para permitir escaneos (8080, 3000) y telemetría (1514) entre zonas.
- **VLANs:** División en 5 subredes aisladas: Admins (Jump Host), DMZ (Targets), LANOPERADORES (SOC), LANWAZUH (SIEM) y SECOPS (Pentesting/Bot).
- **Conectividad:** Flujo validado: Escaneos (SECOPS → DMZ), Telemetría (All → LANWAZUH) y Túnel de Alertas Críticas (Wazuh → OpenClaw → Telegram).

**Imagen:** diagrama de red (`red_drawio.jpg`).

### Acordeón: Checklist de diseño

**01 Segmentación** — Targets aislados del scanner y del SOC; nada de "todo en la misma red".

`interfaces_opnsense.conf`:

```
# INTERFAZ      | SUBNET (CIDR)     | ROL / PROPÓSITO
#-----------------------------------------------------------------------
Admins        | 20.0.0.0/24       | Acceso administrativo y Jump Host
DMZ           | 203.0.113.0/24    | Contenedores vulnerables (Targets)
LANOPERADORES | 192.168.56.0/24   | Analistas SOC (Workstations)
LANWAZUH      | 40.0.0.0/24       | Core SIEM (Indexador, Manager, Dashboard)
SECOPS        | 203.0.114.0/24    | Pentesting, Orquestación (n8n) y OpenClaw
WAN           | Pública / NAT     | Salida a Internet (Telegram, Shodan, VT)
```

**02 Reglas mínimas** — Matriz de Acceso: Reglas de Firewall (OPNsense)  
`firewall_ruleset.conf`:

```
# ACCIÓN | INTERFAZ ORIGEN | DESTINO          | PUERTOS        | JUSTIFICACIÓN
#---------------------------------------------------------------------------------------------------------
DROP   | WAN             | ANY              | ANY            | Active Response: Bloqueo de IPs maliciosas (SOC_AUTO_BLOCK)
PASS   | WAN             | DMZ (Targets)    | 21, 22, 80/443 | Exposición pública intencionada del entorno vulnerable
PASS   | LANOPERADORES   | DMZ              | puertos_dmz    | Acceso auditores a los servicios vulnerables (Alias)
PASS   | LANOPERADORES   | ! DMZ            | ANY            | Salida a Internet y acceso al Dashboard de Wazuh
PASS   | SECOPS          | DMZ              | TCP 3000, 8080 | Tráfico de ataque: Escaneos DAST de ZAP y Nuclei
PASS   | SECOPS          | WAN              | TCP 443        | Salida de OpenClaw hacia API de Telegram y Threat Intel
PASS   | DMZ / SECOPS    | LANWAZUH         | TCP 1514       | Telemetría: Envío de logs desde los agentes al Manager
PASS   | LANWAZUH        | SECOPS           | TCP 18789      | Túnel Zero Trust: Inyección de alertas críticas a OpenClaw
PASS   | LANWAZUH        | DMZ / SECOPS     | TCP 22         | Gestión interna autorizada desde la red del SIEM
PASS   | Admins          | ANY              | TCP 22, 443    | Administración integral desde el Jump Host
DROP   | ANY             | ANY              | ANY            | Default Deny (Cierre total implícito del Firewall)
```

**03 Trazabilidad** — Explicar qué componente habla con cuál mediante registro centralizado del firewall.

`opnsense_filterlog.log` (ejemplo):

```
# Trazabilidad del flujo completo: Escaneo -> Alerta -> Bloqueo

[10:15:22] PASS | SECOPS -> DMZ | 203.0.114.10:51234 -> 203.0.113.10:8080
> ZAP enviando payloads de inyección HTTP contra DVWA

[10:18:05] PASS | LANWAZUH -> SECOPS | 40.0.0.10:48112 -> 203.0.114.10:18789
> El script Python inyecta la alerta crítica por el túnel Zero Trust hacia OpenClaw

[10:18:10] DROP | WAN -> DMZ | 185.15.2.44:33412 -> 203.0.113.10:22
> Active Response de Wazuh actuando en el Firewall: IP bloqueada por SOC_AUTO_BLOCK
```

### Nota final

La conectividad SSH entre VMs quedará resuelta una vez Opnsense esté gestionando el enrutamiento de la red del laboratorio en Isard.

---

## Slide 4 — Lab SecOps (`docs/slides/secops/lab.js`)

- **Sección:** SecOps
- **Título nav:** Lab SecOps
- **Subtítulo:** Docker · redes · escáneres
- **Eyebrow:** SecOps · server-pirineus
- **Heading:** VM-Scanner **completado**
- **Sub:** `vm-scanner/` contiene `docker-compose.yml`, `.env` y el wrapper `nuclei-api.py`. Red interna (`secops-net`) + servicios listos para orquestación desde n8n.
- **Acciones:** Abrir guía de implementación · Descargar compose

### // vm-scanner stack

- **n8n** — `:5678` — BASIC auth — `n8nio/n8n` — secops-net
- **OWASP ZAP** — `:8090` — daemon, healthcheck — `zaproxy:stable`
- **nuclei-api** — `:5000` — Flask, POST /scan — `nuclei:latest`
- **nuclei-updater** — ciclo 24h — `-update-templates` — `nuclei:latest`

**Red:** secops-net · 172.20.0.0/24 · healthchecks · volúmenes  
**Nota pie:** Templates en volumen (`nuclei-templates`), reports (`zap-reports` / `nuclei-reports`), `nuclei-api` resuelve `http://nuclei-api:5000`.

### Tarjetas

- **Persistencia:** ZAP y Nuclei escriben reports en volúmenes; n8n los monta en lectura para informes. Tag: volumes
- **Aislamiento:** `secops-net` aísla tráfico; puertos publicados 5678/8090/5000. Tag: network
- **Salida a OpenClaw:** n8n usa `host.docker.internal` y token Bearer en `.env`. Tag: webhook

### `// docker-compose.yml` (íntegro, igual que en la slide / descarga)

Fuente en repo: `docs/assets/downloads/vm-scanner/docker-compose.yml`.

```yaml
services:

  # ─── OWASP ZAP ─────────────────────────────────────────────
  zap:
    image: ghcr.io/zaproxy/zaproxy:stable
    container_name: owasp-zap
    restart: unless-stopped
    mem_limit: 4g
    mem_reservation: 1g
    command: >
      zap.sh -daemon -host 0.0.0.0 -port 8090 -config api.addrs.addr.name=.* -config api.addrs.addr.regex=true -config api.key=${ZAP_API_KEY} -config api.disablekey=false -config connection.timeoutInSecs=300
    ports:
      - "8090:8090"
    environment:
      - ZAP_API_KEY=${ZAP_API_KEY}
      - DMZ_DVWA=${DMZ_DVWA}
      - DMZ_JUICESHOP=${DMZ_JUICESHOP}
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
      - DMZ_DVWA=${DMZ_DVWA}
      - DMZ_JUICESHOP=${DMZ_JUICESHOP}
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
      - DMZ_DVWA=${DMZ_DVWA}
      - DMZ_JUICESHOP=${DMZ_JUICESHOP}
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
      - secops-net # nuclei-api debe estar en secops-net (DNS interno)
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
      - WEBHOOK_URL=http://${SECOPS_IP}:5678
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=${N8N_USER}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - N8N_LOG_LEVEL=info
      - N8N_COMMUNITY_PACKAGES_ENABLED=true
      - N8N_SECURE_COOKIE=false
      - N8N_ALLOW_EXEC=true
      - GENERIC_TIMEZONE=Europe/Madrid
      - TZ=Europe/Madrid
      - ZAP_API_KEY=${ZAP_API_KEY}
      - OPENCLAW_TOKEN=${OPENCLAW_TOKEN}
      - OPENCLAW_URL=http://host.docker.internal:${OPENCLAW_PORT:-18789}
      - DMZ_DVWA=${DMZ_DVWA}
      - DMZ_JUICESHOP=${DMZ_JUICESHOP}
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
```

### `// .env.example` (íntegro)

Fuente: `docs/assets/downloads/vm-scanner/.env.example`.

```env
# Copia a .env y rellena valores reales (no subas .env al repo).
# ─── IPs / Targets ─────────────────────────────────────────
SECOPS_IP=203.0.114.10

DMZ_IP=203.0.113.10
DMZ_DVWA=http://203.0.113.10:8080
DMZ_JUICESHOP=http://203.0.113.10:3000

# ─── ZAP ───────────────────────────────────────────────────
ZAP_API_KEY=

# ─── N8N ───────────────────────────────────────────────────
N8N_USER=admin
N8N_PASSWORD=

# ─── OpenClaw ──────────────────────────────────────────────
OPENCLAW_TOKEN=
OPENCLAW_PORT=18789
```

En la **slide** el bloque visible usa `__REDACTED__` para secretos; el ejemplo descargable deja campos vacíos como arriba.

### `// por qué nuclei-api y nuclei-updater`

1. **Plantillas en volumen:** `nuclei -update-templates` en bucle 24h, log en `update.log`.
2. **Contrato HTTP:** `POST http://nuclei-api:5000/scan` — JSON target/severity; `GET /health`, `GET /templates`.
3. **Orden y red:** `depends_on: nuclei-updater`; subnet 172.20.0.0/24; puertos hacia fuera 5678, 8090, 5000.

**Importante:** en la slide se omiten claves reales; en servidor se usan `${...}` y `.env`.

### `// nuclei-api.py` (íntegro, igual que descarga / textarea de la slide)

Fuente: `docs/assets/downloads/vm-scanner/nuclei-api.py`.

```python
from flask import Flask, request, jsonify
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
        '-jsonl',
        '-o', output,
        '-timeout', '10',
        '-retries', '1',
        '-bulk-size', '20',
        '-concurrency', '10',
        '-no-interactsh',
    ]

    print(f"[nuclei-api] CMD: {' '.join(cmd)}", flush=True)

    try:
        result = subprocess.run(cmd, timeout=300, capture_output=True, text=True)
        print(f"[nuclei-api] STDOUT: {result.stdout[:500]}", flush=True)
        print(f"[nuclei-api] STDERR: {result.stderr[:500]}", flush=True)

        findings = []
        if os.path.exists(output):
            with open(output) as f:
                for line in f:
                    line = line.strip()
                    if line:
                        try:
                            findings.append(json.loads(line))
                        except Exception as e:
                            print(f"[nuclei-api] parse error: {e} | line: {line[:100]}", flush=True)

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
```

**Por qué (texto de la slide):** Nuclei escribe a stdout/archivos; el wrapper ofrece API estable (timeouts, concurrency, JSONL) para n8n sin shells.

---

## Slide 5 — Workflows n8n (`docs/slides/secops/workflows.js`)

- **Título nav:** n8n Workflows
- **Subtítulo:** JuiceShop · DVWA · exportable
- **Eyebrow:** SecOps · Orquestación
- **Heading:** Workflows n8n **PIRINEUS**
- **Sub:** Dos flujos gemelos en `server-pirineus`: mismo cableado (ZAP + Nuclei + informe + OpenClaw), distinto `target`. Export JSON listo para importar y mapa tipo editor n8n.
- **Acciones:** Abrir guía de implementación · Descargar DVWA · Descargar Juice Shop (`assets/downloads/n8n/...`)

**Chrome UI:** n8n logo · pill “Editor” · “Executions · v1” · “Importar → Workflow → From File”

### Tarjetas de descarga

- **JuiceShop Full Scan** — meta: export sanitizado con `REPLACE_WITH_*`; tras importar sustituir por vars/secretos o expresiones desde `.env` de n8n. Archivo: `pirineus-juiceshop-full-scan.json`
- **DVWA Full Scan** — igual. Archivo: `pirineus-dvwa-full-scan.json`

### Anatomía del flujo (nodos por fase)

**01 · IN:** Manual Trigger · Cron Schedule 00:00 · Webhook POST …/pirineus-scan · Code “Config”

**02 · ZAP:** HTTP Nueva sesión → Acceder URL → Spider → estado · If “Spider 100%?” → Active Scan → Alertas

**03 · Nuclei:** HTTP POST `nuclei-api /scan` → Code “Parsear Nuclei”

**04 · OUT:** Code “Construir informe + prompt bot” → Code “Serializar body” → HTTP “OpenClaw hook”

**Nota bucles y esperas:** Wait 20s / 45s, ramas If con polling hasta `status === "100"`. Si HTTP falla, `onError: continueErrorOutput` hacia nodos **Error: …** para Telegram/OpenClaw sin tumbar el escaneo; Nuclei en error → informe solo-ZAP.

### Caja seguridad

El JSON publicado no contiene API keys ni tokens reales. Sustituir `REPLACE_WITH_ZAP_API_KEY`, `REPLACE_WITH_OPENCLAW_TOKEN`, `REPLACE_WITH_TELEGRAM_CHAT_ID`. Los Wait de n8n guardan `webhookId` en el export: revisar al importar en otra instancia según documentación n8n.

---

## Slide 6 — OpenClaw Setup (`docs/slides/openclaw/setup.js`)

- **Sección:** OpenClaw
- **Título nav:** Setup
- **Subtítulo:** cerebro del sistema · agente · gateway
- **Eyebrow:** OpenClaw · Configuración
- **Heading:** El cerebro de PIRINEUS **agente**
- **Sub:** No es solo el receptor de n8n: es **nuestro agente**. Contexto del lab, workspace, actúa: conclusiones, **PRs e informes en repo**, Telegram, **VirusTotal** y **Shodan** bajo demanda.

### Diagrama central (constelación)

Satélites: **n8n** (pipeline ZAP/Nuclei) · **Telegram** (chat, VT/Shodan) · **GitHub** (PRs, informes) · **Memoria & docs** (AGENTS, SOUL, …). Núcleo: **OpenClaw** — orquesta · razona · ejecuta — “Los flujos empujan datos; el agente cruza con conocimiento del sistema…”

### Leyenda flujo

- **Entra:** señal bruta (webhook, mensaje, informe parcial)
- **Pasa:** lógica + herramientas acordadas (allowlist)
- **Sale:** contenido listo (PR, respuesta SOC, dato enriquecido)

### Panel Instalación

1. CLI + **gateway** como servicio (`systemctl --user`), endpoint `/hooks/agent`.
2. Puerto alineado con Docker: `host.docker.internal` + Bearer entre servicios de confianza.
3. **Approvals / allowlist:** Git, APIs (VT, Shodan), Telegram… solo lo autorizado.

### Panel Qué hace el agente

- n8n es fuente importante, no dueño del agente.
- **Pull requests** para informes versionados en `DespedidaMonteruelo`.
- **Telegram + intel** bajo demanda.

**Acciones:** Abrir guía · [Docs OpenClaw](https://openclaw.ai/)

### `// comandos de referencia` (Quick Start openclaw.ai)

```bash
# 1 — One-liner oficial
curl -fsSL https://openclaw.ai/install.sh | bash

# 2 — Alternativa npm
npm i -g openclaw

# 3 — Onboarding
openclaw onboard

# 4 — Instalar desde fuente
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --install-method git

# 5 — PIRINEUS: gateway persistente
openclaw gateway install
systemctl --user daemon-reload
systemctl --user enable --now openclaw-gateway
systemctl --user is-active openclaw-gateway

# 6 — Allowlist (ejemplo)
openclaw approvals allowlist add n8n-webhook
openclaw approvals allowlist list
```

### ClawHub

[clawhub.ai](https://clawhub.ai/) — skills y plugins; `npx clawhub@latest install …`.

### `// perímetro de ejecución`

- **Gateway:** servicio persistente (`systemd --user`), agente online.
- **Approvals:** allowlist de acciones.
- **Workspace:** contrato operativo (slide Workspace).

**Cierre:** OpenClaw es el **cerebro operativo**; si no encaja, revisar **allowlist** y **Workspace**.

---

## Slide 7 — OpenClaw Workspace (`docs/slides/openclaw/workspace.js`)

- **Título nav:** Workspace
- **Subtítulo:** memoria · límites · plantillas
- **Eyebrow:** OpenClaw · Operación
- **Heading:** Pirineus Workspace **completado**
- **Sub:** El workspace es el “contrato” del agente: identidad, memoria, límites y formato de salida. Mismo input → mismo tipo de respuesta.
- **Acción:** Abrir guía de implementación

### // Startup routine — Antes de hablar

- **Identidad:** `SOUL.md` + `USER.md`
- **Memoria reciente:** `memory/YYYY-MM-DD.md` (hoy y ayer)
- **Memoria larga:** `MEMORY.md` en sesión principal
- **Regla de oro:** si importa mañana, escríbelo (RAM volátil)

Pills: conciso · estructurado · sin inventar · correlación

### // Scope & boundaries — Qué sí / qué no

**Sí (inputs):** payloads n8n (ZAP/Nuclei) · alertas Wazuh (sev ≥ 8) · Telegram · Shodan / VT bajo demanda.

**No (límites):** no ejecutar ZAP/Docker ni “hacer escaneos” · no tocar host/FS ni extraer claves · no fabricar resultados · solo allowlist.

### // Memory system — Persistencia

- **Hoy / ayer:** `memory/YYYY-MM-DD.md` — anomalías, decisiones, contexto.
- **Largo plazo:** `MEMORY.md` — patrones, falsos positivos, prefs, “never again”.
- **Salida auditable:** Telegram + repo (hallazgo → evidencia → mitigación).

**Golden rule:** Si te importa mañana, escríbelo hoy.

### // Filesystem (workspace)

```
SOUL.md        # identidad y tono
USER.md        # equipo, objetivos, restricciones
AGENTS.md      # protocolo, límites y comandos
MEMORY.md      # patrones/prefs (largo plazo)
memory/
  YYYY-MM-DD.md # log diario (hoy/ayer)
```

**Salida estándar (Telegram):** chips Summary · High risk · Evidence · Next steps · Correlation

### Caja

**Idea clave:** el workspace convierte al agente en “analista” (playbook y memoria), no en ejecutor descontrolado.

---

## Slide 8 — OpenClaw Alertas (`docs/slides/openclaw/alertas.js`)

- **Título nav:** Alertas
- **Subtítulo:** Telegram · Threat Intel · playbooks
- **Eyebrow:** OpenClaw · Respuesta
- **Heading:** Alertas accionables **PIRINEUS**
- **Sub:** El agente **no escanea**. Interpreta (n8n/Wazuh), enriquece con threat intel bajo demanda, responde por Telegram con playbooks: resumen, riesgo, próximos pasos.
- **Acción:** Abrir guía de implementación

### // AGENTS.md — Protocolo de sesión

1. **Arranque:** leer SOUL, USER, memory hoy/ayer; en sesión principal también MEMORY.
2. **Inputs:** webhooks n8n (ZAP/Nuclei), alertas Wazuh ≥ 8, comandos intel por Telegram.
3. **Salida:** mensajes cortos, riesgo, *Next steps* (móvil).

**Límites:** No ejecutar ZAP/Docker · No tocar host/FS · No fabricar · Solo allowlist.

### // Telegram — Plantillas

- **Web scan (n8n):** severidad, impacto, priorizar 24–72h.
- **Wazuh (≥ 8):** amenaza real vs ruido, pasos concretos.
- **/oracle (VT):** ratio detección, veredicto, comportamiento.
- **/shodan · /hunt:** exposición, puertos, banners, CVEs, riesgo.

**Ejemplo consola `telegram · output`:**

```
[🕸️ WEB SCAN REPORT] <target>

**Summary**
- High: X issues
- Medium: Y issues
- Low: Z issues

**High-Risk Findings**
- <name> — <impact> — <endpoint(s)>

**Recommended Actions (24–72h)**
- <Action 1>
- <Action 2>

[🚨 WAZUH ALERT] Severity: X/10
**Assessment** — <juicio corto + correlación si aplica>
```

### // Threat Intel — Shodan primero

**/shodan** — Trigger: `/shodan <IP>`

```
# 1) Host info
GET https://api.shodan.io/shodan/host/<IP>?key=$SHODAN_API_KEY

# 2) Reverse DNS
GET https://api.shodan.io/dns/reverse?ips=<IP>&key=$SHODAN_API_KEY

# 3) (Opcional) Si hay hostname, domain lookup
GET https://api.shodan.io/dns/domain/<domain>?key=$SHODAN_API_KEY
```

Hint: correlacionar exposición con ZAP/Nuclei y Wazuh.

**/hunt** — Trigger: `/hunt <query>`

```
GET https://api.shodan.io/shodan/host/search?key=$SHODAN_API_KEY&query=<query>&facets=country,port,org,product
```

Ejemplos: `vuln:CVE-2021-44228`, `http.title:"DVWA"`, `country:ES`, `net:<CIDR>`.

**/oracle** — Trigger: `/oracle <hash|ip|domain>`

```
# File hash
GET https://www.virustotal.com/api/v3/files/<hash>
Headers: x-apikey: $VIRUSTOTAL_API_KEY

GET https://www.virustotal.com/api/v3/files/<hash>/behaviour_summary
GET https://www.virustotal.com/api/v3/files/<hash>/comments

# IP / domain
GET https://www.virustotal.com/api/v3/ip_addresses/<ip>
GET https://www.virustotal.com/api/v3/domains/<domain>
```

### Variables (.env ejemplo en slide)

```env
# Threat intel
VIRUSTOTAL_API_KEY=...
SHODAN_API_KEY=...

# Telegram
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

### Caja

**Clave:** correlacionar (misma IP/vector entre ZAP/Nuclei, Wazuh y VT/Shodan) y devolver decisión accionables.

---

## Slide 9 — SIEM · SOC / Wazuh (`docs/slides/soc/siem.js`)

- **Sección:** SIEM · SOC
- **Título nav:** SIEM · SOC
- **Subtítulo:** Wazuh · SOAR · Threat Intel
- **Eyebrow:** Issue #7 · SIEM
- **Heading:** Wazuh · SOC **COMPLETADO**
- **Sub:** El SIEM es el cerebro analítico del laboratorio. Centraliza telemetría, detecta vulnerabilidades, mapea amenazas con MITRE ATT&CK y orquesta SOAR hacia OpenClaw.
- **Acciones:** Abrir guía de implementación · Ver diagrama (`docs/assets/images/wazuh_diagram.jpg`)

### Tarjetas

- **Arquitectura y Agentes:** Stack Indexer, Server y Dashboard v4.14.3 en Docker. Agentes: firewalls, secops, web-servers, workstations.
- **Ingesta y Custom Rules:** Logs nativos, Docker, Suricata (eve.json). Decodificadores y `local_rules.xml`.
- **Respuesta Automatizada (SOAR):** Script Python (Integrations) inyecta alertas críticas (Nivel ≥ 10) al bot OpenClaw vía Webhook; MTTR en segundos.

### Diagrama

**Topología del Flujo SOC / SOAR** — imagen `wazuh_diagram.jpg` — *Flujo de telemetría en tiempo real: desde la recolección en los endpoints hasta la notificación final vía webhook.*

### Caso de validación

Ataque simulado de fuerza bruta SSH contra la DMZ. Wazuh correlacionó fallos (Regla 5712, Nivel 10) y el script disparó payload al canal SecOps en Telegram en menos de 1 segundo.

### Acordeón: Instalación SOC paso a paso

1. **Preparar entorno y clonar**

```bash
sudo apt update && sudo apt install docker.io docker-compose-v2 git -y
git clone https://github.com/wazuh/wazuh-docker.git -b v4.14.3
cd wazuh-docker/single-node
```

2. **Certificados TLS**

```bash
docker compose -f generate-indexer-certs.yml run --rm generator
```

3. **Desplegar stack** — Manager TCP **1514**, Dashboard **443** (`admin / SecretPassword`)

```bash
docker compose up -d
```

4. **Enrolamiento desde Dashboard** — Agents → Deploy new agent; ejemplo de comando autogenerado:

```bash
WAZUH_MANAGER="10.0.0.X" WAZUH_REGISTRATION_SERVER="10.0.0.X" apt-get install wazuh-agent
systemctl daemon-reload
systemctl enable wazuh-agent
systemctl start wazuh-agent
```

### Acordeón: Configuración de Logs (agent.conf)

Despliegue por grupos (OPNsense / Suricata). Desde **Management > Groups > firewalls > Files > agent.conf**.

```xml
<agent_config>
  <!-- Logs del Firewall (OPNsense) -->
  <localfile>
    <log_format>syslog</log_format>
    <location>/var/log/filter/filter*.log</location>
  </localfile>

  <!-- Alertas del IPS (Suricata) estructuradas -->
  <localfile>
    <log_format>json</log_format>
    <location>/var/log/suricata/eve.json</location>
  </localfile>
</agent_config>
```

### Acordeón: Integración SOAR con OpenClaw

Webhook OpenClaw con validación por token. Script en contenedor Manager, permisos `root:wazuh`.

**bash:**

```bash
# 1. Inyectar el script al contenedor del Manager
docker cp custom-openclaw wazuh-wazuh.manager-1:/var/ossec/integrations/

# 2. Corregir propietario y permisos
docker exec -u root wazuh-wazuh.manager-1 chown root:wazuh /var/ossec/integrations/custom-openclaw
docker exec -u root wazuh-wazuh.manager-1 chmod 750 /var/ossec/integrations/custom-openclaw
```

**`/var/ossec/integrations/custom-openclaw`** (Python): importa sys, json, requests; `WEBHOOK_URL = "http://<IP_OPENCLAW>:18789/hooks/agent"`; `TOKEN`; headers Authorization Bearer; lee alerta de `sys.argv[1]`; extrae `src_ip`, `dst_user`; payload con `agentId`, `message` (markdown Telegram), `deliver: true`, `channel: telegram`, `to: "-5219601134"`; `requests.post(WEBHOOK_URL, json=payload, headers=headers)`.

### Acordeón: Vulnerability Detection & MITRE

1. **Threat Hunting (MITRE ATT&CK):** mapeo táctica/técnica (ej. T1110).
2. **Vulnerability Scanner:** inventario vs NVD, CVEs CVSS.
3. **CTI:** VirusTotal, AlienVault OTX, etc.
4. **Active Response:** IP atacante en Drop del firewall (OPNsense).
5. **Dashboards:** uso de dashboards nativos Wazuh; evitar custom OpenSearch innecesario.

---

## Descargas y assets referenciados en la web

| Recurso | Ruta bajo `docs/` |
|---------|-------------------|
| Compose VM web (targets) | `assets/downloads/vm-web/docker-compose.yml` |
| Compose VM scanner | `assets/downloads/vm-scanner/docker-compose.yml` |
| Ejemplo `.env` scanner | `assets/downloads/vm-scanner/.env.example` |
| `nuclei-api.py` | `assets/downloads/vm-scanner/nuclei-api.py` |
| Workflow DVWA | `assets/downloads/n8n/pirineus-dvwa-full-scan.json` |
| Workflow Juice Shop | `assets/downloads/n8n/pirineus-juiceshop-full-scan.json` |
| Diagrama red | `assets/images/red_drawio.jpg` |
| Diagrama Wazuh | `assets/images/wazuh_diagram.jpg` |

---

## Anexo: workflows n8n (export JSON)

En la slide **Workflows n8n** el contenido “completo” de cada flujo es el **archivo JSON exportado** (grafo de nodos, conexiones, parámetros y placeholders `REPLACE_WITH_*`). Por volumen (~900 líneas por archivo) **no se incrustan aquí**; son equivalentes a lo que descargas desde la web:

- `docs/assets/downloads/n8n/pirineus-dvwa-full-scan.json`
- `docs/assets/downloads/n8n/pirineus-juiceshop-full-scan.json`

Para volcarlos también en texto plano dentro de un único `.md`, se puede concatenar o generar otro anexo automatizado a partir de esos archivos.

---

## Coherencia entre slides (nota editorial)

La **Visión general** y la slide **SIEM · SOC** describen **Wazuh como desplegado e integrado** (tabla y tarjeta en overview alineadas con el badge **COMPLETADO** de la slide SIEM).

---

*Fin del volcado de contenido visible en la web estática del proyecto.*
