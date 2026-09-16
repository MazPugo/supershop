/* ── NAVBAR ────────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

// Scroll: add .scrolled class + highlight active section link
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightActiveLink();
});

// Mobile toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const open = navLinks.classList.contains('open');
  navToggle.setAttribute('aria-expanded', open);
  // Animate hamburger → X
  const spans = navToggle.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

// Highlight nav link matching the visible section
function highlightActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 100;
  sections.forEach(section => {
    const link = navLinks.querySelector(`a[href="#${section.id}"]`);
    if (!link) return;
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      navLinks.querySelectorAll('a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* ── SMOOTH SCROLL ─────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ── INTERSECTION OBSERVER: FADE-UP ANIMATIONS ─────────────── */
const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.skill-category, .cert-card, .project-card, .timeline-item, .highlight, .about-avatar'
).forEach(el => {
  el.classList.add('fade-up');
  fadeObserver.observe(el);
});

/* ── SKILL BAR ANIMATION ───────────────────────────────────── */
const barObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          const width = bar.getAttribute('data-width');
          // Small delay so the fade-up completes first
          setTimeout(() => { bar.style.width = width + '%'; }, 300);
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.skill-category').forEach(cat => {
  barObserver.observe(cat);
});

/* ── CONTACT FORM VALIDATION ───────────────────────────────── */
const form          = document.getElementById('contact-form');
const formSuccess   = document.getElementById('form-success');

function getField(id)  { return document.getElementById(id); }
function getError(id)  { return document.getElementById(id + '-error'); }

function validateField(id, validator, message) {
  const field = getField(id);
  const error = getError(id);
  const valid = validator(field.value.trim());
  field.classList.toggle('error', !valid);
  error.textContent = valid ? '' : message;
  return valid;
}

const validators = {
  name:    v => v.length >= 2,
  email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  message: v => v.length >= 10,
};

const messages = {
  name:    'Please enter your full name (at least 2 characters).',
  email:   'Please enter a valid email address.',
  message: 'Your message must be at least 10 characters.',
};

// Live validation on blur
['name', 'email', 'message'].forEach(id => {
  getField(id).addEventListener('blur', () => {
    validateField(id, validators[id], messages[id]);
  });
  getField(id).addEventListener('input', () => {
    if (getField(id).classList.contains('error')) {
      validateField(id, validators[id], messages[id]);
    }
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const nameOk    = validateField('name',    validators.name,    messages.name);
  const emailOk   = validateField('email',   validators.email,   messages.email);
  const messageOk = validateField('message', validators.message, messages.message);

  if (!nameOk || !emailOk || !messageOk) return;

  // Simulate send (no backend)
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled    = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    form.reset();
    btn.disabled    = false;
    btn.textContent = 'Send Message ✉️';
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

/* ── DOWNLOAD RESUME ────────────────────────────────────────── */
document.getElementById('download-resume').addEventListener('click', e => {
  e.preventDefault();
  // Placeholder: replace href with the actual resume PDF path when available
  alert('Resume download will be available once the PDF is uploaded.');
});

/* ── TYPED EFFECT ON HERO TITLE ─────────────────────────────── */
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const titles = ['Cloud Engineer', 'AWS Architect', 'DevOps Engineer', 'IaC Specialist'];
  let titleIndex = 0;
  let charIndex  = 0;
  let deleting   = false;

  function type() {
    const current = titles[titleIndex];
    if (deleting) {
      heroTitle.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      heroTitle.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = deleting ? 60 : 110;

    if (!deleting && charIndex === current.length) {
      delay = 2200;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  // Start after a short delay so the page loads first
  setTimeout(type, 1000);
}

/* ── INIT ────────────────────────────────────────────────────── */
highlightActiveLink();
