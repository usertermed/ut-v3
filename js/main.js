/**
 * Damien Sullins Portfolio — Main Interactions
 */

(function () {
  "use strict";

  // ---------- Year ----------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Cursor Glow ----------
  const glow = document.getElementById("cursorGlow");
  if (glow && window.matchMedia("(pointer: fine)").matches) {
    let raf = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!raf) raf = requestAnimationFrame(animateGlow);
    });

    function animateGlow() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      glow.style.left = currentX + "px";
      glow.style.top = currentY + "px";
      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        raf = requestAnimationFrame(animateGlow);
      } else {
        raf = null;
      }
    }
  }

  // ---------- Nav Scroll ----------
  const nav = document.getElementById("nav");
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile Menu ----------
  const toggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileMenu.classList.toggle("open", !open);
      mobileMenu.setAttribute("aria-hidden", String(open));
      document.body.style.overflow = open ? "" : "hidden";
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobileMenu.classList.remove("open");
        mobileMenu.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      });
    });
  }

  // ---------- Reveal on Scroll ----------
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, Number(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // ---------- Animated Stats ----------
  const stats = document.querySelectorAll(".stat-number[data-target]");
  if (stats.length && "IntersectionObserver" in window) {
    const animateValue = (el, target, duration = 1600) => {
      const start = 0;
      const startTime = performance.now();
      const isLarge = target >= 100;

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * eased);
        el.textContent = isLarge ? current.toLocaleString() + "+" : current + "+";
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = isLarge ? target.toLocaleString() + "+" : target + "+";
      };
      requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = Number(entry.target.dataset.target);
            animateValue(entry.target, target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    stats.forEach((el) => statsObserver.observe(el));
  }

  // ---------- Contact Form ----------
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        if (formNote) {
          formNote.textContent = "Please fill in all fields.";
          formNote.className = "form-note error";
        }
        return;
      }

      // Static site: open mailto as a graceful fallback
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:hello@damiensullins.com?subject=${subject}&body=${body}`;

      if (formNote) {
        formNote.textContent = "Opening your email client…";
        formNote.className = "form-note success";
      }
      form.reset();
    });
  }

  // ---------- Smooth anchor offset for fixed nav ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // ---------- Skills confetti on click ----------
  // Fires a confetti burst when any `.skill-card` is clicked.
  document.addEventListener("click", (e) => {
    const skill = e.target.closest && e.target.closest(".skill-card");
    if (!skill) return;
    // origin x/y centered on the clicked element
    const rect = skill.getBoundingClientRect();
    const origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };

    if (typeof confetti === "function") {
      // multiple bursts for a nicer effect
      confetti({ particleCount: 40, spread: 60, origin });
      setTimeout(() => confetti({ particleCount: 30, spread: 80, origin }), 120);
      setTimeout(() => confetti({ particleCount: 20, spread: 100, origin }), 260);
    }
  });
})();
