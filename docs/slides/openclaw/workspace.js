export default {
  sectionLabel: null,
  icon:  '🧠',
  title: 'Workspace',
  sub:   'sesiones · informes',
  dots:  [true, true, true],

  content: `
    <div class="slide-eyebrow">OpenClaw · Operación</div>
    <div class="slide-heading">Cómo trabajo con OpenClaw <span class="badge badge-done">completado</span></div>
    <div class="slide-sub">El workspace define “qué sabe el agente” (contexto), “qué puede hacer” (approvals) y “cómo responde” (plantillas). Así el informe es consistente y auditable.</div>

    <div class="steps">
      <div class="step">
        <div class="step-num">01</div>
        <div class="step-content">
          <div class="step-title">Contexto y reglas</div>
          <div class="step-desc">Fuentes: arquitectura, alcance del lab, formato de reporte y criterios de priorización (impacto, explotabilidad, superficie).</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">02</div>
        <div class="step-content">
          <div class="step-title">Sesión de análisis</div>
          <div class="step-desc">Recibe el payload (n8n) → agrupa por riesgo → destaca evidencias → propone mitigación y “next actions”.</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">03</div>
        <div class="step-content">
          <div class="step-title">Salida estándar</div>
          <div class="step-desc">Informe corto para Telegram + informe ampliado (si aplica) para el SOC / documentación del reto.</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">04</div>
        <div class="step-content">
          <div class="step-title">Trazabilidad</div>
          <div class="step-desc">Cada hallazgo del informe referencia el origen (ZAP/Nuclei), URL/endpoint y evidencia mínima para reproducir.</div>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>Objetivo:</strong> que el agente no sea “magia”, sino un analista reproducible: mismo input → salida consistente, útil y explicable.
    </div>
  `
};

