export default {
  sectionLabel: null, // misma sección que el anterior
  icon:  '🌐',
  title: 'Red · Opnsense',
  sub:   'firewall · VLANs',
  dots:  [false, false],

  content: `
    <div class="slide-eyebrow">Issue #5 · Infraestructura</div>
    <div class="slide-heading">Red · Opnsense <span class="badge badge-wip">en progreso</span></div>
    <div class="slide-sub">Configuración del firewall y segmentación de red del laboratorio. Opnsense actuará como router entre la VM-Targets y la VM-Scanner.</div>

    <div class="cards">
      <div class="card">
        <div class="card-icon">🔥</div>
        <div class="card-title">Firewall</div>
        <div class="card-desc">Opnsense como firewall perimetral controlando el tráfico entre VMs del laboratorio.</div>
        <div class="card-tag">pendiente</div>
      </div>
      <div class="card">
        <div class="card-icon">🔀</div>
        <div class="card-title">VLANs</div>
        <div class="card-desc">Segmentación de red para aislar los objetivos del escáner y el SIEM.</div>
        <div class="card-tag">pendiente</div>
      </div>
      <div class="card">
        <div class="card-icon">🔗</div>
        <div class="card-title">Conectividad</div>
        <div class="card-desc">Validar que Clawbot + ZAP puede alcanzar Juice Shop y DVWA a través del firewall.</div>
        <div class="card-tag">pendiente</div>
      </div>
    </div>

    <div class="info-box">
      <strong>Nota:</strong> La conectividad SSH entre VMs quedará resuelta una vez Opnsense esté gestionando el enrutamiento de la red del laboratorio en Isard.
    </div>
  `
};
