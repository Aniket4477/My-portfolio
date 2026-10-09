/* ============================================================
   ANIKET KUMAR PORTFOLIO — JavaScript
   ============================================================ */

'use strict';

/* ── Scroll Progress Bar ── */
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (window.scrollY / total) * 100;
  if (scrollProgress) scrollProgress.style.width = pct + '%';
}, { passive: true });

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
}, { passive: true });

/* ── Mobile Navigation ── */
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
  });

  // Close on link click
  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
}

/* ── Smooth Scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Active nav link ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');
const ninjaContainer = document.getElementById('ninja-runner-container');
const navList = document.querySelector('.nav-links');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const isActive = link.dataset.section === id;
        link.classList.toggle('active', isActive);
        
        if (isActive && ninjaContainer && navList) {
          ninjaContainer.style.opacity = '1';
          
          // Use setTimeout to ensure layout is ready
          setTimeout(() => {
            const linkRect = link.getBoundingClientRect();
            const listRect = navList.getBoundingClientRect();
            // center the ninja over the link text (ninja is ~35px wide, so center is ~17.5px)
            const offsetLeft = (linkRect.left - listRect.left) + (linkRect.width / 2) - 17.5;
            ninjaContainer.style.left = `${offsetLeft}px`;
          }, 50);
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ── Typewriter Effect ── */
const typeEl = document.getElementById('typewriter');
if (typeEl) {
  const texts = [
    'Aspiring Full Stack Developer',
    'Graphic Design Ninja',
    'Visual Storyteller',
    'CS Undergraduate',
    'Creative Technologist',
    'Design Jutsu Master',
  ];
  let textIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let paused = false;

  function type() {
    const current = texts[textIdx];

    if (paused) {
      paused = false;
      setTimeout(type, 1800);
      return;
    }

    if (!deleting) {
      typeEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        paused = true;
        setTimeout(type, 50);
        return;
      }
      setTimeout(type, 80);
    } else {
      typeEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        textIdx = (textIdx + 1) % texts.length;
      }
      setTimeout(type, 45);
    }
  }

  setTimeout(type, 600);
}

/* ── Back to Top ── */
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Certificate Lightbox ── */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxPlaceholder = document.getElementById('lightbox-placeholder');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, caption) {
  if (!lightbox) return;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (src) {
    lightboxImg.src = src;
    lightboxImg.style.display = 'block';
    if (lightboxPlaceholder) lightboxPlaceholder.style.display = 'none';
  } else {
    lightboxImg.style.display = 'none';
    if (lightboxPlaceholder) {
      lightboxPlaceholder.style.display = 'flex';
      const ph = lightboxPlaceholder.querySelector('.ph-caption');
      if (ph) ph.textContent = caption || '';
    }
  }

  if (lightboxCaption) lightboxCaption.textContent = caption || '';
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  if (lightboxImg) { lightboxImg.src = ''; }
}

document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.dataset.src || null;
    const caption = card.dataset.caption || '';
    openLightbox(src, caption);
  });
  // Keyboard
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

/* ── Gallery Item Lightbox ── */
document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
  item.addEventListener('click', () => {
    if (item.tagName.toLowerCase() !== 'a') {
      const src = item.dataset.src || null;
      const caption = item.dataset.caption || '';
      if (src) openLightbox(src, caption);
    }
  });
  item.addEventListener('keydown', (e) => {
    if (item.tagName.toLowerCase() !== 'a' && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      item.click();
    }
  });
});

/* ── Gallery Filter & Photography View-All Link ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryGrid = document.querySelector('.gallery-grid');
const loadMoreWrap = document.getElementById('photography-load-more-wrap');

// Show/hide the "View Full Gallery" link based on active filter
function updatePhotoViewAllLink() {
  if (!loadMoreWrap) return;
  const activeBtn = document.querySelector('.filter-btn.active');
  const isPhoto = activeBtn && activeBtn.dataset.filter === 'photo';
  loadMoreWrap.style.display = isPhoto ? 'block' : 'none';
}

function applyGalleryFilter(filter) {
  document.querySelectorAll('.gallery-item').forEach(item => {
    const cat = item.dataset.category || '';
    const show = filter === 'all' || cat.split(' ').includes(filter);
    item.style.display = show ? 'block' : 'none';
  });
  updatePhotoViewAllLink();
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyGalleryFilter(btn.dataset.filter);
  });
});

// Initialize filter on load
const initialActiveBtn = document.querySelector('.filter-btn.active');
if (initialActiveBtn) {
  applyGalleryFilter(initialActiveBtn.dataset.filter);
}



/* ── Subtle Particle Canvas ── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  const PARTICLE_COUNT = 60;
  const COLORS = ['rgba(255,107,0,', 'rgba(255,184,0,', 'rgba(124,58,237,', 'rgba(229,62,62,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomParticle() {
    const c = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.4 + 0.1,
      color: c,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, randomParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.a + ')';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0)  p.x = W;
      if (p.x > W)  p.x = 0;
      if (p.y < 0)  p.y = H;
      if (p.y > H)  p.y = 0;
    });
    requestAnimationFrame(draw);
  }

  // Respect reduced-motion
  const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!motionOk) { canvas.style.display = 'none'; return; }

  init();
  draw();
  window.addEventListener('resize', () => { resize(); }, { passive: true });
})();

/* ── Subtle cursor glow (desktop only) ── */
(function cursorGlow() {
  if (window.innerWidth < 1024) return;
  const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!motionOk) return;

  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = `
    position:fixed;pointer-events:none;z-index:0;
    width:300px;height:300px;border-radius:50%;
    background:radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%);
    transform:translate(-50%,-50%);
    transition:left 0.15s ease,top 0.15s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
    
    // Track mouse coordinates for the background mask effect
    document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
  }, { passive: true });
})();
