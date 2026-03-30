import { slides } from './slides.js';

// ─── Render slides & nav ───────────────────────────────────────────────────
const contentEl  = document.getElementById('content');
const navListEl  = document.getElementById('navList');
const totalEl    = document.getElementById('totalSlides');
const currentEl  = document.getElementById('currentSlide');
const progressEl = document.getElementById('progressFill');
const btnPrev    = document.getElementById('btnPrev');
const btnNext    = document.getElementById('btnNext');

let current = 0;

function copyText(text) {
  if (!text) return Promise.resolve(false);
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }

  // Fallback (older browsers / non-secure contexts)
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return Promise.resolve(!!ok);
  } catch {
    return Promise.resolve(false);
  }
}

function setCopyFeedback(btn, ok) {
  if (!btn) return;
  const prev = btn.textContent;
  btn.classList.toggle('is-copied', !!ok);
  btn.textContent = ok ? 'Copiado' : 'Error';
  window.setTimeout(() => {
    btn.classList.remove('is-copied');
    btn.textContent = prev;
  }, 1200);
}

function buildUI() {
  totalEl.textContent = slides.length;

  slides.forEach((slide, i) => {
    // Slide panel
    const div = document.createElement('div');
    div.className = 'slide' + (i === 0 ? ' active' : '');
    div.id = `slide-${i}`;
    div.innerHTML = slide.content;
    contentEl.appendChild(div);

    // Nav section header (first item in section)
    if (slide.sectionLabel) {
      const sec = document.createElement('div');
      sec.className = 'nav-section';
      sec.innerHTML = `<div class="nav-section-label">${slide.sectionLabel}</div>`;
      navListEl.appendChild(sec);
    }

    // Nav item
    const item = document.createElement('div');
    item.className = 'nav-item' + (i === 0 ? ' active' : '');
    item.dataset.slide = i;
    item.innerHTML = `
      <span class="nav-icon">${slide.icon}</span>
      <div class="nav-text">
        <div class="nav-text-title">${slide.title}</div>
        <div class="nav-text-sub">${slide.sub}</div>
      </div>
      <div class="nav-dots">${slide.dots.map(f => `<div class="dot${f ? ' filled' : ''}"></div>`).join('')}</div>
    `;
    item.addEventListener('click', () => {
      goTo(i);
      closeSidebarMobile();
    });

    // append inside last section div
    navListEl.lastElementChild.appendChild(item);
  });
}

function goTo(idx) {
  if (idx < 0 || idx >= slides.length) return;

  const allSlides = document.querySelectorAll('.slide');
  const allItems  = document.querySelectorAll('.nav-item');

  allSlides[current].classList.remove('active');
  allSlides[current].classList.add('exit');
  setTimeout(() => allSlides[current].classList.remove('exit'), 350);
  allItems[current].classList.remove('active');

  current = idx;

  allSlides[current].classList.add('active');
  allItems[current].classList.add('active');

  currentEl.textContent  = current + 1;
  progressEl.style.width = ((current + 1) / slides.length * 100) + '%';
  btnPrev.disabled = current === 0;
  btnNext.disabled = current === slides.length - 1;

  allItems[current].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

window.navigate = (dir) => goTo(current + dir);

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('[data-copy], [data-copy-target]');
  if (!btn) return;
  const targetId = btn.getAttribute('data-copy-target');
  let text = '';
  if (targetId) {
    const el = document.getElementById(targetId);
    if (el) {
      if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') text = el.value || '';
      else text = el.textContent || '';
    }
  } else {
    text = btn.getAttribute('data-copy') || '';
  }
  const ok = await copyText(text);
  setCopyFeedback(btn, ok);
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
});

// ─── Sidebar mobile toggle ──────────────────────────────────────────────────
const sidebarEl = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function closeSidebarMobile() {
  document.body.classList.remove('sidebar-open');
  sidebarOverlay?.setAttribute('aria-hidden', 'true');
  sidebarToggle?.setAttribute('aria-label', 'Abrir menú');
}

sidebarToggle?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('sidebar-open');
  if (sidebarOverlay) sidebarOverlay.setAttribute('aria-hidden', !isOpen);
  if (sidebarToggle) sidebarToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});
sidebarOverlay?.addEventListener('click', closeSidebarMobile);

// ─── Custom cursor (solo en dispositivos con ratón) ─────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (isTouch) {
  cursor?.style.setProperty('display', 'none');
  ring?.style.setProperty('display', 'none');
  document.body.style.cursor = 'auto';
}

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx - 4 + 'px';
  cursor.style.top  = my - 4 + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.addEventListener('mouseover', e => {
  if (e.target.closest('a, button, .nav-item')) {
    cursor.style.transform = 'scale(2.5)';
    ring.style.width = ring.style.height = '48px';
  } else {
    cursor.style.transform = 'scale(1)';
    ring.style.width = ring.style.height = '32px';
  }
});

// ─── Init ──────────────────────────────────────────────────────────────────
buildUI();
btnPrev.disabled = true;
