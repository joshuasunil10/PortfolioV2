(function () {
  "use strict";

  // Register GSAP plugins
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ----- Mobile nav -----
  const nav = document.querySelector(".navbar");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelectorAll(".navbar-link");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !expanded);
      nav.classList.toggle("is-open", !expanded);
    });

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  // ----- Footer year -----
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Irish time (Dublin) in navbar -----
  var navTimeEl = document.getElementById("nav-time");
  if (navTimeEl) {
    var formatIrishTime = function () {
      var now = new Date();
      var timeStr = now.toLocaleTimeString("en-IE", {
        timeZone: "Europe/Dublin",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      navTimeEl.textContent = timeStr;
    };
    formatIrishTime();
    setInterval(formatIrishTime, 1000);
  }

  // ----- GSAP animations (skip if reduced motion) -----
  if (prefersReducedMotion || typeof gsap === "undefined") return;

  // Navbar links
  gsap.from(".navbar-link", {
    y: -12,
    opacity: 0,
    duration: 0.6,
    stagger: 0.06,
    ease: "power2.out",
  });

  // Hero timeline
  var tl = gsap.timeline();
  tl.from(".hero-badge", { opacity: 0, y: 10, duration: 0.5, ease: "power2.out" })
    .from(".hero-content .about-image img", {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.3")
    .from(".hero-content h1", { y: 24, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
    .from(".hero-tagline", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
    .from(".hero-button", { opacity: 0, y: 16, stagger: 0.1, duration: 0.5, ease: "back.out(1.4)" }, "-=0.25");

  // Parallax hero image
  gsap.to(".hero-content .about-image img", {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  // Section headings
  gsap.utils.toArray("section h1, section h2").forEach(function (heading) {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 32,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  // Skills list
  gsap.from(".skills-list li", {
    scrollTrigger: {
      trigger: ".skills-list",
      start: "top 85%",
    },
    opacity: 0,
    y: 16,
    stagger: 0.04,
    duration: 0.5,
    ease: "power2.out",
  });

  // Project cards
  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".project-grid",
      start: "top 82%",
    },
    opacity: 0,
    y: 24,
    stagger: 0.1,
    duration: 0.6,
    ease: "power2.out",
  });

  // Contact section
  gsap.from(".contact h2, .contact > p, .contact-links", {
    scrollTrigger: {
      trigger: ".contact",
      start: "top 85%",
    },
    opacity: 0,
    y: 24,
    stagger: 0.1,
    duration: 0.6,
    ease: "power2.out",
  });

  // Footer
  gsap.from(".footer p", {
    scrollTrigger: {
      trigger: ".footer",
      start: "top 92%",
    },
    opacity: 0,
    y: 12,
    duration: 0.5,
    ease: "power2.out",
  });

  // Card hover scale (optional)
  document.querySelectorAll(".project-card").forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      gsap.to(card, { scale: 1.02, duration: 0.25, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", function () {
      gsap.to(card, { scale: 1, duration: 0.25, ease: "power2.inOut" });
    });
  });
})();
