from flask import Flask, request, jsonify
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
    app.run(host='0.0.0.0', port=5000, debug=debug)