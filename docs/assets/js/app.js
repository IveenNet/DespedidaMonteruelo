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
    item.addEventListener('click', () => goTo(i));

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

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
});

// ─── Custom cursor ─────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

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
