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

/* ── Gallery Filter & Photography Load More ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryGrid = document.querySelector('.gallery-grid');
const loadMoreWrap = document.getElementById('photography-load-more-wrap');
const loadMoreBtn = document.getElementById('load-more-photos-btn');
const countLeftEl = document.getElementById('photo-count-left');

// Remaining photography photos (113 items)
const remainingPhotos = [
  "20250116_125541 - Copy.jpg",
  "20250605_160235.jpg",
  "20250605_161306.jpg",
  "20250605_161616.jpg",
  "20250605_162439.jpg",
  "20250605_163536.jpg",
  "ESRCDGTFVNHJ.png",
  "IMG-20251225-WA0010.jpg",
  "IMG-20260906-WA0024.jpg",
  "IMG20240726152202[1] copy.jpg",
  "IMG20250116135259.jpg",
  "IMG20250929165228.jpg",
  "IMG20251001222238.jpg",
  "IMG20251010160144.jpg",
  "IMG20251010170025.jpg",
  "IMG20251010171742.jpg",
  "IMG20251011131005.jpg",
  "IMG20251012104345.jpg",
  "IMG20251012134818.jpg",
  "IMG20251012140310.jpg",
  "IMG20251012174934.jpg",
  "IMG20251020112444_20260111022528.jpg",
  "IMG20251022162137_20260111022903.jpg",
  "IMG20251022162157_20260111022902.jpg",
  "IMG20251025162854.jpg",
  "IMG20251107133723.jpg",
  "IMG20251211102416.jpg",
  "IMG20251211225425.jpg",
  "IMG20251211225551.jpg",
  "IMG20251219150203.jpg",
  "IMG20251219150214.jpg",
  "IMG20251223214826.jpg",
  "IMG20251225163947_01.jpg",
  "IMG20251225173144.jpg",
  "IMG20260101092017.jpg",
  "IMG20260101095212_01.jpg",
  "IMG20260101100619.jpg",
  "IMG20260102172007.jpg",
  "IMG20260121153927.jpg",
  "IMG20260121153939 (1).jpg",
  "IMG20260121153952.jpg",
  "IMG20260202113306.jpg",
  "IMG20260305102018 (1).jpg",
  "IMG20260602093520.jpg",
  "IMG20260610102852 (1) (1) (1) (1).jpg",
  "IMG20260610102940.jpg",
  "IMG20260610130739.jpg",
  "IMG20260610130922.jpg",
  "IMG20260614215459.jpg",
  "IMG20260616213615.jpg",
  "IMG20260617050037.jpg",
  "IMG20260730110451.jpg",
  "IMG20260730110502.jpg",
  "IMG20260730110620.jpg",
  "IMG20260730110655 (1).jpg",
  "IMG20260730110822.jpg",
  "IMG20260730133604.jpg",
  "IMG20260730133615.jpg",
  "IMG20260730133618.jpg",
  "IMG20260730133623.jpg",
  "IMG20260730133625.jpg",
  "IMG20260730133636.jpg",
  "IMG20260802150827.jpg",
  "IMG20260806114231.jpg",
  "IMG20260806114245.jpg",
  "IMG20260806114339.jpg",
  "IMG20260806114532.jpg",
  "IMG20260806114539.jpg",
  "IMG20260806121944 (1).jpg",
  "IMG20260806121944.jpg",
  "IMG20260806122021.jpg",
  "IMG20260806122146.jpg",
  "IMG20260806122319.jpg",
  "IMG20260806122347.jpg",
  "IMG20260806122556.jpg",
  "IMG20260806122857.jpg",
  "IMG20260806122944.jpg",
  "IMG20260806122955.jpg",
  "IMG20260819062254.jpg",
  "IMG20260820055619.jpg",
  "IMG20260820055919.jpg",
  "IMG20260820055920.jpg",
  "IMG20260820060226.jpg",
  "IMG20260820060654.jpg",
  "IMG20260820060830 (1).jpg",
  "IMG20260820060830 (2).jpg",
  "IMG20260820060830 (4).jpg",
  "IMG20260820063909.jpg",
  "IMG20260820065118.jpg",
  "IMG20260820065307.jpg",
  "IMG20261005163427.jpg",
  "IMG20261005163452.jpg",
  "IMG20261005164450.jpg",
  "IMG20261005165250.jpg",
  "IMG_0174.jpg",
  "IMG_20251011_010023.jpg",
  "IMG_20251014_170444.jpg",
  "IMG_20251014_170635.jpg",
  "IMG_20251014_171359.jpg",
  "IMG_20251130_233430.jpg",
  "IMG_20251205_192717.jpg",
  "IMG_20251212_000930.jpg",
  "IMG_20251226_214634.jpg",
  "IMG_20260105_063448088.jpg",
  "IMG_20260313_023536_777.jpg",
  "IMG_20260313_023604_440.jpg",
  "IMG_20260313_234129.jpg",
  "IMG_20260731_080415.jpg",
  "Layer 7.png",
  "RZXCTFBHJ.png",
  "erexhcvygbhnjm.png",
  "zxcvgbn.png",
  "zxfcgbhj.png"
];

function updateRemainingCount() {
  if (countLeftEl) {
    countLeftEl.textContent = remainingPhotos.length;
  }
  if (loadMoreWrap) {
    const currentActive = document.querySelector('.filter-btn.active');
    const isPhotoActive = currentActive && currentActive.dataset.filter === 'photo';
    if (isPhotoActive && remainingPhotos.length > 0) {
      loadMoreWrap.style.display = 'block';
    } else {
      loadMoreWrap.style.display = 'none';
    }
  }
}

function loadNextPhotos(batchSize = 20) {
  if (!galleryGrid || remainingPhotos.length === 0) return;
  const batch = remainingPhotos.splice(0, batchSize);

  batch.forEach(fn => {
    const item = document.createElement('div');
    item.className = 'gallery-item reveal';
    item.setAttribute('role', 'listitem');
    item.setAttribute('tabindex', '0');
    item.setAttribute('data-category', 'photo');
    item.setAttribute('data-src', `Photography/${fn}`);
    item.setAttribute('data-caption', 'Photography — Visual Capture by Aniket Kumar');
    item.setAttribute('aria-label', 'View photo');
    item.innerHTML = `
      <img src="Photography/${fn}" alt="Photography by Aniket Kumar" loading="lazy" />
      <div class="gallery-overlay" aria-hidden="true">
        <div class="gallery-item-title">Visual Capture</div>
        <div class="gallery-item-cat">Photography · Aniket Kumar</div>
      </div>
    `;

    // Click & Keyboard Lightbox
    item.addEventListener('click', () => {
      openLightbox(`Photography/${fn}`, 'Photography — Visual Capture by Aniket Kumar');
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });

    galleryGrid.appendChild(item);
  });

  updateRemainingCount();
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    loadNextPhotos(20);
  });
}

function applyGalleryFilter(filter) {
  const allItems = document.querySelectorAll('.gallery-item');
  allItems.forEach(item => {
    const cat = item.dataset.category || '';
    const show = filter === 'all' || cat.split(' ').includes(filter);
    item.style.display = show ? 'block' : 'none';
  });
  updateRemainingCount();
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyGalleryFilter(btn.dataset.filter);
  });
});

// Initialize remaining count and filter on load
updateRemainingCount();
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
