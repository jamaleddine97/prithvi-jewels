/* ============================================
   PRITHVI JEWELS — Main JavaScript
   Mobile nav, hero slider, scroll-to-top,
   trending carousel auto-scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile Nav Toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      this.classList.toggle('active');
    });

    // Close nav when clicking a link (mobile)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  /* ---------- Hero Slider ---------- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-slider-dot');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(function (s) { s.classList.remove('active'); });
    dots.forEach(function (d) { d.classList.remove('active'); });
    if (slides[index]) {
      slides[index].classList.add('active');
    }
    if (dots[index]) {
      dots[index].classList.add('active');
    }
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  if (slides.length > 0) {
    showSlide(0);
    slideInterval = setInterval(nextSlide, 5000);

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        clearInterval(slideInterval);
        showSlide(i);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  /* ---------- Scroll to Top ---------- */
  const scrollTopBtn = document.querySelector('.scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Trending Carousel Auto-Scroll ---------- */
  const carousel = document.querySelector('.trending-carousel');

  if (carousel) {
    let scrollPos = 0;
    const scrollSpeed = 1;
    let isHovered = false;

    carousel.addEventListener('mouseenter', function () { isHovered = true; });
    carousel.addEventListener('mouseleave', function () { isHovered = false; });

    function autoScroll() {
      if (!isHovered) {
        scrollPos += scrollSpeed;
        if (scrollPos >= carousel.scrollWidth - carousel.clientWidth) {
          scrollPos = 0;
        }
        carousel.scrollLeft = scrollPos;
      } else {
        scrollPos = carousel.scrollLeft;
      }
      requestAnimationFrame(autoScroll);
    }
    requestAnimationFrame(autoScroll);
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Header shrink on scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.12)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
      }
    });
  }

});
