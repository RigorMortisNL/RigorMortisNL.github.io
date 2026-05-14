/* =========================================================
   RIGOR MORTIS — Interactive Snow & Page Dynamics
   Canvas snow, parallax, scroll animations, mobile nav
   ========================================================= */

(function () {
  'use strict';

  /* ── Snow Canvas ─────────────────────────────────────── */
  const canvas = document.getElementById('snow-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const resizeObserver = new ResizeObserver(() => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });
    resizeObserver.observe(document.documentElement);

    const FLAKE_COUNT = 130;
    const flakes = Array.from({ length: FLAKE_COUNT }, () => ({
      x:           Math.random() * W,
      y:           Math.random() * H,
      r:           Math.random() * 2.8 + 0.4,
      speed:       Math.random() * 0.7 + 0.15,
      wind:        (Math.random() - 0.5) * 0.25,
      opacity:     Math.random() * 0.55 + 0.15,
      wobble:      Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.018 + 0.004,
      glow:        Math.random() > 0.85,
    }));

    function drawSnow() {
      ctx.clearRect(0, 0, W, H);

      for (const f of flakes) {
        ctx.beginPath();
        if (f.glow) {
          const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 3);
          grad.addColorStop(0, `rgba(180, 230, 255, ${f.opacity})`);
          grad.addColorStop(1, 'transparent');
          ctx.arc(f.x, f.y, f.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = grad;
        } else {
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(230, 244, 255, ${f.opacity})`;
        }
        ctx.fill();

        f.y += f.speed;
        f.x += f.wind + Math.sin(f.wobble) * 0.28;
        f.wobble += f.wobbleSpeed;

        if (f.y > H + 10) { f.y = -10; f.x = Math.random() * W; }
        if (f.x > W + 10)  f.x = -10;
        if (f.x < -10)     f.x = W + 10;
      }

      requestAnimationFrame(drawSnow);
    }

    drawSnow();
  }

  /* ── Navigation: scroll effect ───────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Navigation: mobile toggle ───────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Scroll-triggered animations ────────────────────── */
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  if (animatedEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    animatedEls.forEach(el => observer.observe(el));
  }

  /* ── Hero parallax on scroll ─────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1.08) translateY(${scrolled * 0.18}px)`;
      }
    }, { passive: true });
  }

  /* ── Stat counter animation ──────────────────────────── */
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length) {
    const numObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent.trim();
          // Only animate pure numbers
          if (/^\d+$/.test(text)) {
            const target = parseInt(text, 10);
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const interval = setInterval(() => {
              current = Math.min(current + step, target);
              el.textContent = current + (el.dataset.suffix || '');
              if (current >= target) clearInterval(interval);
            }, 30);
          }
          numObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => numObserver.observe(el));
  }

})();
