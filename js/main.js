document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scroll for the CTA and back-to-top
  document.querySelectorAll('[data-scroll]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });
  document.getElementById('to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Show more / less on timeline entries
  document.querySelectorAll('[data-more]').forEach((btn) => {
    const panel = btn.previousElementSibling;
    btn.addEventListener('click', () => {
      const show = panel.hidden;
      panel.hidden = !show;
      btn.textContent = show ? 'Show less' : 'Show more';
      btn.setAttribute('aria-expanded', String(show));
    });
  });

  // Scroll-triggered reveal for timeline milestones
  const milestones = document.querySelectorAll('.milestone');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    milestones.forEach((m) => { m.classList.add('reveal'); io.observe(m); });
  }

  // Highlight current section in nav
  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.querySelectorAll('a').forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  // Flip cards (tap on touch devices)
  document.querySelectorAll('.flip').forEach((card) => {
    const flip = () => card.classList.toggle('flipped');
    card.addEventListener('click', flip);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });
  });

  // Lightbox
  const box = document.getElementById('lightbox');
  const boxImg = document.getElementById('lightbox-img');
  const boxTitle = document.getElementById('lightbox-title');
  const boxText = document.getElementById('lightbox-text');
  const closeBtn = box.querySelector('.lightbox-close');
  let lastFocus = null;

  const openBox = (hobby) => {
    const img = hobby.querySelector('img');
    boxImg.src = img.src;
    boxImg.alt = img.alt;
    boxTitle.textContent = hobby.dataset.title;
    boxText.textContent = hobby.dataset.text;
    lastFocus = hobby;
    box.hidden = false;
    closeBtn.focus();
  };
  const closeBox = () => {
    box.hidden = true;
    if (lastFocus) lastFocus.focus();
  };

  document.querySelectorAll('.hobby').forEach((h) => {
    h.addEventListener('click', () => openBox(h));
    h.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBox(h); }
    });
  });
  closeBtn.addEventListener('click', closeBox);
  box.addEventListener('click', (e) => { if (e.target === box) closeBox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !box.hidden) closeBox(); });

  // Theme switcher: sets data-theme on <html>; the variables live in css/theme.css
  const themeButtons = document.querySelectorAll('[data-theme-set]');
  const themes = ['blush', 'dark', 'lavender'];
  const applyTheme = (name) => {
    document.documentElement.dataset.theme = name;
    themeButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.themeSet === name)));
  };
  let savedTheme = 'blush';
  try {
    savedTheme = localStorage.getItem('theme') || 'blush';
  } catch (err) {
    savedTheme = 'blush';
  }
  applyTheme(themes.includes(savedTheme) ? savedTheme : 'blush');
  themeButtons.forEach((b) => {
    b.addEventListener('click', () => {
      applyTheme(b.dataset.themeSet);
      try {
        localStorage.setItem('theme', b.dataset.themeSet);
      } catch (err) {
        savedTheme = b.dataset.themeSet;
      }
    });
  });

  // "2 industry roles" jumps to both role cards and highlights them
  document.querySelectorAll('[data-flash]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const roles = Array.from(document.querySelectorAll('[data-role]'));
      roles.forEach((r) => r.classList.add('visible', 'flash'));
      roles[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => roles.forEach((r) => r.classList.remove('flash')), 2800);
    });
  });
});
