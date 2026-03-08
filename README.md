# 🛡️ DespedidaMonteruelo — Análisis de Vulnerabilidades Automatizado

> **PROYECTO DE INNOVACIÓN EDUCATIVA**  
> Automatización en ciberseguridad con software libre  
> CIPFP Mislata · Prof. Ramón Onrubia Pérez

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
+----------------+         +----------------+
|   Clawbot      |-------->|   OWASP ZAP    |
|   (cron)       |<--------|     (API)      |
+-------+--------+         +----------------+
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

### Cómo trabajar día a día (paso a paso)

#### 1️⃣ Antes de empezar cualquier tarea — actualizar develop

```bash
git checkout develop
git pull origin develop
```

#### 2️⃣ Crear tu rama de trabajo para la nueva tarea

```bash
git checkout -b feature/nombre-descriptivo
```

> **Ejemplos de nombres:**
> - `feature/configurar-owasp-zap`
> - `feature/flujo-clawbot-escaneo`
> - `feature/integracion-telegram`
> - `fix/corregir-alerta-wazuh`

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

#### 5️⃣ Abrir una Pull Request hacia `develop`

1. Ve a GitHub → **Pull Requests** → **New Pull Request**
2. Base: `develop` ← Compare: `feature/tu-rama`
3. Añade una descripción de lo que hiciste
4. Pide revisión a un compañero antes de hacer merge

---

### 🔁 Diagrama del flujo

```
main
 └── develop  ←─────────────────────────────────┐
       └── feature/configurar-owasp-zap          │
       └── feature/flujo-clawbot-escaneo ────────┘ (via Pull Request)
       └── feature/integracion-telegram
```

---

### ❌ Reglas que NO se deben romper

- **Nunca** hacer `push` directo a `main` o `develop`
- **Nunca** trabajar directamente en `develop`
- **Siempre** crear una rama nueva para cada tarea
- **Siempre** hacer `pull` de `develop` antes de crear una rama nueva

---

## 🚀 Instalación y puesta en marcha

```bash
# 1. Clonar el repositorio
git clone git@github.com:IveenNet/DespedidaMonteruelo.git
cd DespedidaMonteruelo

# 2. Situarse en la rama de desarrollo
git checkout develop

# 3. Levantar el entorno (próximamente)
docker compose up -d
```

---

## 📁 Estructura del proyecto (planificada)

```
DespedidaMonteruelo/
├── clawbot/          # Flujos y configuración de Clawbot
├── zap/              # Configuración y scripts de OWASP ZAP
├── wazuh/            # Reglas y configuración del SIEM
├── docker/           # Compose y Dockerfiles del laboratorio
├── docs/             # Documentación técnica del proyecto
└── README.md
```

---

## 👥 Equipo

| Nombre | Rol |
|--------|-----|
| *(completar)* | *(completar)* |
| *(completar)* | *(completar)* |
| *(completar)* | *(completar)* |

---

## 📚 Recursos

- [Documentación OWASP ZAP API](https://www.zaproxy.org/docs/api/)
- [Wazuh Documentation](https://documentation.wazuh.com/)
- [Git Flow — Guía visual](https://nvie.com/posts/a-successful-git-branching-model/)
- Vídeo charla Ramón Onrubia — ISACA Valencia (diciembre 2025)

---

*Reto 4 · Hacking Ético y Puesta en Producción Segura · Complejidad Media · ~15h*
