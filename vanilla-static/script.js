/**
 * Rashmi Pandey Portfolio — Interactive Client Script
 * Lightweight, Vanilla JavaScript (Zero Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Active Section Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // 3. Email Copy to Clipboard Interaction
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyText = document.getElementById('copyEmailText');

  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', async () => {
      const email = 'rashmipd870@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyText.textContent;
        copyText.textContent = 'Copied to Clipboard!';
        copyBtn.style.color = 'var(--teal)';
        setTimeout(() => {
          copyText.textContent = originalText;
          copyBtn.style.color = '';
        }, 2200);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // 4. Subtle Scroll Entrance Animations (Prefers-reduced-motion check)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll('.card, .hero-content, .timeline-item');
    
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));
  }
});
