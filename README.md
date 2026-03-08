# 🛡️ DespedidaMonteruelo — Análisis de Vulnerabilidades Automatizado

> **PROYECTO DE INNOVACIÓN EDUCATIVA**  
> Automatización en ciberseguridad con software libre  
> CIFP Virgen de Gracia

---

## 📋 Descripción

Sistema automatizado y continuo para analizar y detectar vulnerabilidades en aplicaciones web desplegadas por una organización, alertando al SOC ante nuevas vulnerabilidades encontradas.

El flujo de automatización utiliza **Clawbot** (en lugar de n8n) para orquestar los escaneos periódicos mediante la API de **OWASP ZAP**, integrando los resultados con **Wazuh (SIEM)** y notificando al equipo vía **Telegram**.

---

## 🏗️ Arquitectura del Sistema

```
+----------------+
| Aplicacion     |      (DVWA, Juice Shop, WebGoat...)
| Web Vuln.      |
+-------+--------+
        |
        | Escaneo periódico
        v
+----------------+       +----------------+      +----------------+
|   Clawbot      |------>|   OWASP ZAP    |      |  VirusTotal    |
|   (cron)       |<------|     (API)      |      |    (API Key)   |
+-------+--------+       +----------------+      +-------+--------+
        |                                                 |
        |<────────── Análisis de URLs / hashes ───────────┘
        |
        | Si hay vulnerabilidades
        v
+----------------+         +----------------+
|   Wazuh        |-------->|   Dashboard    |
|   (SIEM)       |         |     SOC        |
+-------+--------+         +----------------+
        |
        | Notificación
        v
+----------------+
|   Telegram     |
|   (alertas)    |
+----------------+
```

---

## 🛠️ Tecnologías utilizadas

| Herramienta | Rol |
|-------------|-----|
| **Clawbot** | Orquestador del flujo de automatización |
| **OWASP ZAP** | Escáner de vulnerabilidades web (API) |
| **VirusTotal** | Análisis de URLs, dominios y hashes mediante API Key |
| **Wazuh** | SIEM — correlación y gestión de alertas |
| **Telegram Bot** | Notificaciones en tiempo real al equipo |
| **Docker / Podman** | Contenedores para despliegue del laboratorio |
| **DVWA / Juice Shop / WebGoat** | Aplicaciones web vulnerables de prueba |

---

## 🌿 Flujo de trabajo con Git Flow

> ⚠️ **Importante para el equipo:** Este proyecto usa **Git Flow**. Por favor, leed esta sección antes de tocar nada.

### Ramas principales

| Rama | Propósito |
|------|-----------|
| `main` | Código estable y revisado. **Nunca se toca directamente.** |
| `develop` | Rama de integración. **Aquí se une todo el trabajo del equipo.** |

---

### 🔧 Inicializar Git Flow (solo la primera vez por máquina)

```bash
git clone git@github.com:IveenNet/DespedidaMonteruelo.git
cd DespedidaMonteruelo
git flow init
```

> Durante el `init` acepta los valores por defecto pulsando **Enter** en todo. Usará `main` como rama de producción y `develop` como rama de integración.

---

### Cómo trabajar día a día (paso a paso)

#### 1️⃣ Antes de empezar cualquier tarea — actualizar develop

```bash
git checkout develop
git pull origin develop
```

#### 2️⃣ Iniciar una nueva tarea con Git Flow

```bash
git flow feature start nombre-descriptivo
```

> **Ejemplos:**
> ```bash
> git flow feature start configurar-owasp-zap
> git flow feature start flujo-clawbot-escaneo
> git flow feature start integracion-telegram
> git flow feature start integracion-virustotal
> ```
> Esto crea automáticamente la rama `feature/nombre-descriptivo` desde `develop`.

#### 3️⃣ Trabajar y guardar cambios

```bash
git add .
git commit -m "feat: descripción corta de lo que hiciste"
```

> **Prefijos recomendados para commits:**
> - `feat:` → nueva funcionalidad
> - `fix:` → corrección de error
> - `docs:` → cambios en documentación
> - `chore:` → tareas de mantenimiento

#### 4️⃣ Subir tu rama a GitHub

```bash
git push origin feature/nombre-descriptivo
```

#### 5️⃣ Finalizar la feature (merge a develop)

```bash
git flow feature finish nombre-descriptivo
git push origin develop
```

> Esto hace el merge a `develop` y elimina la rama `feature/` automáticamente.

---

### 🔁 Diagrama del flujo

```
main
 └── develop  ←─────────────────────────────────────────┐
       └── feature/configurar-owasp-zap                  │
       └── feature/flujo-clawbot-escaneo ────────────────┘ (feature finish)
       └── feature/integracion-virustotal
       └── feature/integracion-telegram
```

---

### ❌ Reglas que NO se deben romper

- **Nunca** hacer `push` directo a `main` o `develop`
- **Nunca** trabajar directamente en `develop`
- **Siempre** usar `git flow feature start` para iniciar una tarea
- **Siempre** hacer `pull` de `develop` antes de iniciar una feature nueva

---

## 🚀 Instalación y puesta en marcha

```bash
# 1. Clonar el repositorio
git clone git@github.com:IveenNet/DespedidaMonteruelo.git
cd DespedidaMonteruelo

# 2. Inicializar Git Flow
git flow init

# 3. Levantar el entorno (próximamente)
docker compose up -d
```

---

## 🔑 Configuración de API Keys

El proyecto requiere claves de API para algunas integraciones. **Nunca subas las claves al repositorio.** Crea un fichero `.env` en la raíz del proyecto (ya está en `.gitignore`):

```env
# VirusTotal
VIRUSTOTAL_API_KEY=tu_clave_aqui

# Telegram Bot
TELEGRAM_BOT_TOKEN=tu_token_aqui
TELEGRAM_CHAT_ID=tu_chat_id_aqui

# OWASP ZAP
ZAP_API_KEY=tu_clave_zap_aqui
```

### Obtener tu API Key de VirusTotal

1. Regístrate en [https://www.virustotal.com](https://www.virustotal.com)
2. Ve a tu perfil → **API Key**
3. Copia la clave y pégala en el `.env`

> La cuenta gratuita permite **500 consultas/día** y **4 consultas/minuto**, suficiente para el laboratorio.

### ¿Para qué usamos VirusTotal?

Clawbot consulta la API de VirusTotal para enriquecer los hallazgos de OWASP ZAP:
- Verificar si una URL o dominio tiene reputación maliciosa
- Analizar hashes de ficheros sospechosos encontrados durante el escaneo
- Añadir contexto de amenaza a las alertas enviadas al SOC y Telegram

---

## 📁 Estructura del proyecto (planificada)

```
DespedidaMonteruelo/
├── clawbot/          # Flujos y configuración de Clawbot
├── zap/              # Configuración y scripts de OWASP ZAP
├── wazuh/            # Reglas y configuración del SIEM
├── docker/           # Compose y Dockerfiles del laboratorio
├── docs/             # Documentación técnica del proyecto
├── .env.example      # Plantilla de variables de entorno
└── README.md
```

---

## 📚 Recursos

- [Documentación OWASP ZAP API](https://www.zaproxy.org/docs/api/)
- [Wazuh Documentation](https://documentation.wazuh.com/)
- [VirusTotal API Docs](https://docs.virustotal.com/reference/overview)
- [Git Flow — Guía visual](https://nvie.com/posts/a-successful-git-branching-model/)

---

*Reto 4 · Hacking Ético y Puesta en Producción Segura · Complejidad Media · ~15h*
