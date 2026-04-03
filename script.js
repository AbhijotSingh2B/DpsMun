  // ─────────────────────────────────────────────
  //  LINKS — replace these URLs before going live
  // ─────────────────────────────────────────────
  const LINKS = {
    INTERNAL_REGISTRATIONS:   "https://docs.google.com/forms/d/e/1FAIpQLScQB0xw3pm89ZebKhwhzwNXRpI6ASUg5tl1_6m3AAfYkvJfgQ/viewform",
    INDIVIDUAL_REGISTRATIONS: "https://docs.google.com/forms/d/e/1FAIpQLSdhDzMT6PZ6Un1LCozPuLfa9HE9KBMtenuTAXNReKaL7tCRvQ/viewform",
    INTERNATIONAL_PRESS:      "https://docs.google.com/forms/d/e/1FAIpQLScaq_170ChSfCuhLMlTgfRfyPqA6V1Z-o2S09H5ZWF2ZB00fg/viewform",
    PUBLIC_EYE_MATRIX:        "https://docs.google.com/spreadsheets/d/19LE8vLtQZNSzs5MC0x-77ea-0t7HMQW9Qj_Apv4PzKo/edit?gid=261275778#gid=261275778",
    BROCHURE:                 "https://ugc.production.linktr.ee/0ea79abc-44e1-453a-8011-7e2cfb68c983_Brochure---DPS-MOHALI-MUN.pdf",
    INSTAGRAM:                "https://instagram.com/dpsmun",
  };
  // ─────────────────────────────────────────────

  function wireLinks() {
    document.querySelectorAll('[data-link]').forEach(el => {
      const key = el.getAttribute('data-link');
      if (LINKS[key]) {
        el.href = LINKS[key];
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
      }
    });
    document.querySelectorAll('a[href*="instagram.com"]').forEach(el => {
      el.href = LINKS.INSTAGRAM;
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireLinks);
  } else {
    wireLinks();
  }

  // Dark mode toggle
  const toggle = document.getElementById('themeToggle');
  const knob   = document.getElementById('themeKnob');
  const toast  = document.getElementById('wipToast');
  let toastTimer = null;

  function showToast() {
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    knob.textContent = '🌙';
  }

  toggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    knob.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    showToast();
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  reveals.forEach(r => obs.observe(r));

  // Hide bottom bar near footer
  const bottomBar = document.getElementById('bottomBar');
  const footerEl  = document.querySelector('footer');
  window.addEventListener('scroll', () => {
    const footerTop = footerEl.getBoundingClientRect().top;
    bottomBar.style.opacity = footerTop < 80 ? '0' : '1';
    bottomBar.style.pointerEvents = footerTop < 80 ? 'none' : 'auto';
  });
