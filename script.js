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
    // Add transitioning class before toggle so colors animate smoothly
    document.body.classList.add('theme-transitioning');
    const isDark = document.body.classList.toggle('dark');
    knob.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    showToast();
    // Remove after transition completes to avoid interfering with other animations
    setTimeout(() => document.body.classList.remove('theme-transitioning'), 400);
  });

  // Reveal on scroll — stagger children for a nicer cascade effect
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  reveals.forEach(r => obs.observe(r));

  // Nav — add subtle shadow on scroll for depth
  const navEl = document.querySelector('nav');
  let lastScroll = 0;
  let navShadowed = false;

  // Hide bottom bar near footer + nav shadow
  const bottomBar = document.getElementById('bottomBar');
  const footerEl  = document.querySelector('footer');

  function handleScroll() {
    const y = window.scrollY;

    // Nav shadow
    if (y > 40 && !navShadowed) {
      navEl.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
      navShadowed = true;
    } else if (y <= 40 && navShadowed) {
      navEl.style.boxShadow = 'none';
      navShadowed = false;
    }

    // Hide bottom bar near footer
    const footerTop = footerEl.getBoundingClientRect().top;
    const shouldHide = footerTop < 100;
    bottomBar.style.opacity = shouldHide ? '0' : '1';
    bottomBar.style.pointerEvents = shouldHide ? 'none' : 'auto';
    bottomBar.style.transform = shouldHide
      ? 'translateX(-50%) translateY(20px)'
      : 'translateX(-50%) translateY(0)';

    lastScroll = y;
  }

  // Use passive listener + requestAnimationFrame for smooth 60fps scroll handling
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        handleScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
