
/* ========================================================
   script.js  –  Eventora main JavaScript
   Auth (login / signup / logout) removed.
======================================================== */

/* PAGE LOADER */
window.addEventListener('load', () => {
  setTimeout(() => { document.getElementById('page-loader').classList.add('hidden'); }, 1800);
});

/* PARTICLE CANVAS */
(function () {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  function Particle() {
    this.x = Math.random() * W; this.y = Math.random() * H;
    this.r = Math.random() * 1.8 + 0.4;
    this.dx = (Math.random() - 0.5) * 0.35; this.dy = (Math.random() - 0.5) * 0.35;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '244,63,94' : '109,40,217';
  }
  Particle.prototype.update = function () {
    this.x += this.dx; this.y += this.dy;
    if (this.x < 0 || this.x > W) this.dx *= -1;
    if (this.y < 0 || this.y > H) this.dy *= -1;
  };
  Particle.prototype.draw = function () {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`; ctx.fill();
  };
  for (let i = 0; i < 120; i++) particles.push(new Particle());
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y,
          dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(109,40,217,${0.06 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }
  }
  function loop() { ctx.clearRect(0, 0, W, H); particles.forEach(p => { p.update(); p.draw(); }); drawLines(); requestAnimationFrame(loop); }
  loop();
})();

/* STICKY NAVBAR */
const topNavbar = document.getElementById('topNavbar');
window.addEventListener('scroll', () => { topNavbar.classList.toggle('scrolled', window.scrollY > 60); });

/* SIDE NAV TOGGLE */
const navToggle = document.getElementById('navToggle'), navIcon = document.getElementById('navToggleIcon'),
  sideNav = document.getElementById('sideNav'), navOverlay = document.getElementById('navOverlay');
function openNav() { sideNav.classList.add('open'); navOverlay.classList.add('open'); document.body.classList.add('nav-open'); navIcon.className = 'fas fa-times'; }
function closeNav() { sideNav.classList.remove('open'); navOverlay.classList.remove('open'); document.body.classList.remove('nav-open'); navIcon.className = 'fas fa-bars'; }
navToggle.addEventListener('click', e => { e.stopPropagation(); sideNav.classList.contains('open') ? closeNav() : openNav(); });
navOverlay.addEventListener('click', closeNav);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

/* TYPEWRITER */
(function () {
  const phrases = [
    "Where Dreams Begin & Celebrations Find Their Perfect Place",
    "India's Most Trusted Event Planning Platform",
    "Creating Memories That Last a Lifetime"
  ];
  const el = document.getElementById('tw-text'); let pi = 0, ci = 0, deleting = false;
  const SPEED = 68, DEL = 38, PAUSE = 2800;
  function loop() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(loop, PAUSE); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(loop, deleting ? DEL : SPEED);
  }
  setTimeout(loop, 500);
})();

/* SCROLL REVEAL */
(function () {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => obs.observe(el));
})();

/* TESTIMONIAL SLIDER */
(function () {
  const track = document.getElementById('testiTrack'), cards = track.querySelectorAll('.testi-card'),
    dotsEl = document.getElementById('testiDots'), prev = document.getElementById('testiPrev'), next = document.getElementById('testiNext');
  let current = 0, dots = [];
  function visibleCount() { if (window.innerWidth > 1100) return 3; if (window.innerWidth > 768) return 2; return 1; }
  const total = cards.length;
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'testi-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => go(i));
    dotsEl.appendChild(d); dots.push(d);
  }
  function go(idx) {
    const vc = visibleCount(), max = Math.max(0, total - vc);
    current = Math.max(0, Math.min(idx, max));
    const cw = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * cw}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  prev.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  window.addEventListener('resize', () => go(current));
  setInterval(() => { const vc = visibleCount(), max = Math.max(0, total - vc); go(current >= max ? 0 : current + 1); }, 4500);
})();

/* TOAST */
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast ${type}`; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.animation = 'toast-out 0.35s ease forwards'; setTimeout(() => t.remove(), 360); }, 3200);
}

/* CONTACT FORM (legacy click handler) */
document.querySelector('.form-submit').addEventListener('click', function (e) {
  e.preventDefault();
  showToast("Message sent! We'll contact you soon.");
});

/* ── EmailJS ─────────────────────────────────────────────── */
(function () {
  emailjs.init("mQIFSF33wZKBKVg3U");
})();

const contactForm = document.getElementById("contactForm");
const formStatus  = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  formStatus.style.color = "#F9A8D4";
  formStatus.textContent = "Sending your fest brief...";

  emailjs.send("service_gql9wzz", "template_cguj748", {
    name:      document.getElementById("contactName").value,
    email:     document.getElementById("contactEmail").value,
    college:   document.getElementById("contactCollege").value,
    fest_type: document.getElementById("contactFestType").value,
    footfall:  document.getElementById("contactFootfall").value,
    message:   document.getElementById("contactMessage").value
  })
  .then(function () {
    formStatus.style.color   = "#4ade80";
    formStatus.textContent   = "✔ Message sent successfully!";
    contactForm.reset();
  }, function (error) {
    formStatus.style.color   = "#ff4d4d";
    formStatus.textContent   = "❌ Failed to send message. Try again.";
    console.error(error);
  });
});
