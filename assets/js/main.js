/* =========================================================
   Santosh Bakers — site interactions
   Vanilla JS · no backend · no dependencies
   ========================================================= */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "919587274379"; // main Gumanpura counter
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header on scroll ---------- */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  var closeNav = function () {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 940) closeNav();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach(function (el) {
    var delay = el.getAttribute("data-delay");
    if (delay) el.style.setProperty("--d", delay);
  });

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Scroll spy for nav ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('#primaryNav a[href^="#"]')
  );
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  var setActive = function (id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
    });
  };

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---------- Cake builder → WhatsApp ---------- */
  var form = document.getElementById("cakeBuilder");
  if (form) {
    var dateInput = document.getElementById("date");
    if (dateInput) {
      var today = new Date();
      var iso = today.toISOString().split("T")[0];
      dateInput.min = iso;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var get = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };

      var flavour = get("flavour");
      var weight = get("weight");
      var outlet = get("outlet");
      var date = get("date");
      var message = get("message");

      var lines = [
        "Hi Santosh Bakers! I'd like to order a cake.",
        "",
        "• Flavour: " + (flavour || "—"),
        "• Weight: " + (weight || "—"),
        "• " + (outlet === "Home delivery" ? "Delivery: Home delivery in Kota" : "Pickup outlet: " + (outlet || "—")),
      ];

      if (date) {
        var pretty = new Date(date + "T00:00:00");
        var formatted = isNaN(pretty.getTime())
          ? date
          : pretty.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
        lines.push("• Needed on: " + formatted);
      }

      if (message) lines.push("• Message on cake: " + message);

      lines.push("", "Please confirm availability and price. Thank you!");

      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- FAQ: one open at a time (nice on mobile) ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
