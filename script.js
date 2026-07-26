/**
 * Pulse Gaming Arena - Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  // 1. Page Intro Loader (Displays for 3.5 seconds, allowing hover interaction)
  const loader = $('#pageLoader');
  if (loader) {
    const hideTimer = setTimeout(() => {
      loader.classList.add('done');
    }, 3500);

    // Allow user to click to dismiss intro immediately
    loader.addEventListener('click', () => {
      clearTimeout(hideTimer);
      loader.classList.add('done');
    });
  }

  // 2. Custom Cursor Movement & Ring Expand
  const dot = $('.cursor-dot');
  const ring = $('.cursor-ring');

  if (dot && ring) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    $$('a, button, input, select, .zone-card, .gallery-item').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        ring.style.width = '48px';
        ring.style.height = '48px';
        ring.style.background = 'rgba(78, 222, 255, 0.12)';
        ring.style.borderColor = 'rgba(101, 230, 255, 0.9)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width = '31px';
        ring.style.height = '31px';
        ring.style.background = 'transparent';
        ring.style.borderColor = 'rgba(120, 229, 255, 0.75)';
      });
    });
  }

  // 3. Hero Section Parallax Effect
  const hero = $('#hero');
  const heroMedia = $('.hero-media', hero);
  const crosshair = $('.crosshair', hero);

  if (hero && heroMedia) {
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      heroMedia.style.transform = `scale(1.07) translate(${x}px, ${y}px)`;
      if (crosshair) {
        crosshair.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
      }
    });

    hero.addEventListener('mouseleave', () => {
      heroMedia.style.transform = '';
      if (crosshair) crosshair.style.transform = '';
    });
  }

  // 4. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = $$('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // 5. Mobile Navigation Menu Toggle
  const mobileToggle = $('.mobile-toggle');
  const navLinks = $('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    $$('a', navLinks).forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 6. Lightbox Image Gallery Dialog
  const lightbox = $('#lightbox');
  const lightboxImg = $('img', lightbox);
  const closeLightboxBtn = $('#closeLightbox');

  $$('.gallery-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const imgPath = btn.dataset.img;
      if (lightbox && lightboxImg && imgPath) {
        lightboxImg.src = imgPath;
        lightbox.showModal();
      }
    });
  });

  if (closeLightboxBtn && lightbox) {
    closeLightboxBtn.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.close();
    });
  }

  // 7. Booking Modal Control
  const bookingModal = $('#bookingModal');
  const closeBookingBtn = $('#closeBooking');
  const openBookingBtns = $$('.open-booking');

  openBookingBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (bookingModal) {
        bookingModal.showModal();
        // Set default date to today
        const dateInput = $('#bookingDate', bookingModal);
        if (dateInput && !dateInput.value) {
          dateInput.value = new Date().toISOString().split('T')[0];
        }
      }
    });
  });

  if (closeBookingBtn && bookingModal) {
    closeBookingBtn.addEventListener('click', () => bookingModal.close());
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) bookingModal.close();
    });
  }

  // 8. Player Reviews Track Carousel
  const reviewTrack = $('#reviewTrack');
  const prevBtn = $('#prev');
  const nextBtn = $('#next');

  if (reviewTrack) {
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        reviewTrack.scrollBy({ left: 420, behavior: 'smooth' });
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        reviewTrack.scrollBy({ left: -420, behavior: 'smooth' });
      });
    }
  }

  // 9. Real-Time Dynamic Telemetry Speedometer Animation
  const speedDisplay = $('.speedometer b');
  const speedNeedle = $('.speedometer i');

  if (speedDisplay && speedNeedle) {
    let currentSpeed = 284;
    let targetSpeed = 284;

    function pickNextTarget() {
      // Fluctuate target speed dynamically between 195 and 318 KM/H
      targetSpeed = Math.floor(195 + Math.random() * 123);
      const nextInterval = 1200 + Math.random() * 2000;
      setTimeout(pickNextTarget, nextInterval);
    }
    pickNextTarget();

    function updateSpeedometer() {
      // Smooth interpolation towards target speed with slight micro-jitter
      const diff = targetSpeed - currentSpeed;
      currentSpeed += diff * 0.045 + (Math.random() * 1.2 - 0.6);
      
      // Clamp boundaries
      if (currentSpeed < 140) currentSpeed = 140;
      if (currentSpeed > 330) currentSpeed = 330;

      const roundedSpeed = Math.round(currentSpeed);
      speedDisplay.textContent = roundedSpeed;

      // Map speed to needle rotation (-45 deg to 115 deg)
      const angle = -45 + ((currentSpeed - 140) / 190) * 160;
      speedNeedle.style.transform = `rotate(${angle.toFixed(1)}deg)`;

      requestAnimationFrame(updateSpeedometer);
    }

    updateSpeedometer();
  }
});
