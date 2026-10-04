(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  var footerYear = document.getElementById("footer-year");
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  var dublinTime = document.getElementById("dublin-time");
  if (dublinTime) {
    var dublinClock = new Intl.DateTimeFormat("en-IE", {
      timeZone: "Europe/Dublin",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    var updateDublinTime = function () {
      dublinTime.textContent = dublinClock.format(new Date());
    };
    updateDublinTime();
    window.setInterval(updateDublinTime, 1000);
  }

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
      nav.classList.toggle("is-open", !isOpen);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        nav.classList.remove("is-open");
      });
    });
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ambientBackground = document.querySelector(".ambient-background");
  if (ambientBackground && window.gsap && !prefersReducedMotion) {
    var ambientGrid = ambientBackground.querySelector(".ambient-grid");
    var orbs = ambientBackground.querySelectorAll(".ambient-orb");
    var particleFragment = document.createDocumentFragment();
    var particles = [];

    for (var particleIndex = 0; particleIndex < 30; particleIndex += 1) {
      var particle = document.createElement("span");
      particle.className = "pixel-particle";
      particle.style.left = ((particleIndex * 37) % 97) + "%";
      particle.style.top = ((particleIndex * 61) % 94) + "%";
      particleFragment.appendChild(particle);
      particles.push(particle);
    }
    ambientBackground.appendChild(particleFragment);

    gsap.to(orbs[0], { x: "14vw", y: "10vh", scale: 1.18, duration: 18, ease: "sine.inOut", repeat: -1, yoyo: true });
    gsap.to(orbs[1], { x: "-10vw", y: "-8vh", scale: 1.28, duration: 22, ease: "sine.inOut", repeat: -1, yoyo: true, delay: -5 });
    gsap.to(orbs[2], { x: "8vw", y: "-12vh", scale: .82, duration: 15, ease: "sine.inOut", repeat: -1, yoyo: true, delay: -3 });
    gsap.to(ambientGrid, { x: "2%", y: "1.5%", rotation: 3, duration: 32, ease: "sine.inOut", repeat: -1, yoyo: true });
    particles.forEach(function (particle, index) {
      gsap.to(particle, {
        y: index % 2 ? -18 : 14,
        x: index % 3 ? 8 : -8,
        opacity: index % 4 === 0 ? .75 : .35,
        duration: 2.4 + (index % 5) * .45,
        ease: "steps(4)",
        repeat: -1,
        yoyo: true,
        delay: -(index % 7) * .35
      });
    });

    window.addEventListener("pointermove", function (event) {
      var x = (event.clientX / window.innerWidth - .5) * 18;
      var y = (event.clientY / window.innerHeight - .5) * 12;
      gsap.to(ambientBackground, { x: x, y: y, duration: 1.8, ease: "power2.out", overwrite: "auto" });
    }, { passive: true });
  }

  if (prefersReducedMotion) return;
  var revealItems = document.querySelectorAll(".section-shell, .project");
  if (!("IntersectionObserver" in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(function (item) { observer.observe(item); });
})();
