const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const filters = [...document.querySelectorAll('.filter-chip')];
const cards = [...document.querySelectorAll('.project-card')];
const emptyState = document.querySelector('.empty-state');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const category = filter.dataset.filter;
    let visibleCount = 0;
    filters.forEach((item) => {
      const active = item === filter;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((card) => {
      const visible = category === 'all' || card.dataset.category.split(' ').includes(category);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  });
});

let toastTimer;
function showToast(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2600);
}

document.querySelector('.copy-email')?.addEventListener('click', async (event) => {
  const email = event.currentTarget.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    showToast('Email copied. Say hello anytime!');
  } catch {
    window.location.href = `mailto:${email}`;
    showToast('Opening your email app.');
  }
});

const revealTargets = document.querySelectorAll('.section-heading, .project-card, .about-grid, .now-card, .contact-inner');

if (!('IntersectionObserver' in window)) {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

  revealTargets.forEach((element) => {
    element.classList.add('reveal-ready');
    revealObserver.observe(element);
  });
}

const themeToggle = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');
function setTheme(theme, save = true) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeToggle?.setAttribute('aria-pressed', String(isDark));
  themeToggle?.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  themeToggle?.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  const themeLabel = themeToggle?.querySelector('.theme-label');
  if (themeLabel) themeLabel.textContent = isDark ? 'Dark' : 'Light';
  if (themeColor) themeColor.content = isDark ? '#15151a' : '#f6f4ef';
  if (save) {
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
  }
}
setTheme(document.documentElement.dataset.theme || 'light', false);
themeToggle?.addEventListener('click', () => {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

document.querySelectorAll('.project-visual').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty('--tilt-x', `${x * 5}deg`);
    card.style.setProperty('--tilt-y', `${y * -5}deg`);
  });
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

