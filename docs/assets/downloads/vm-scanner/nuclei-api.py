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
