// ============================================
// 1. SCROLL REVEAL ANIMATION
// ============================================

function initScrollReveal() {
  // Elementos que queremos animar
  const elementsToAnimate = document.querySelectorAll(
    '.project-item, .skill-card, .timeline-item'
  );

  // Configuración del observer
  const observerOptions = {
    root: null, // viewport
    threshold: 0.1, // 10% visible
    rootMargin: '0px 0px -50px 0px' // trigger un poco antes
  };

  // Callback cuando el elemento es visible
  const observerCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Añadir delay escalonado para efecto cascada
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 100); // 100ms entre cada elemento
        
        // Dejar de observar una vez animado
        observer.unobserve(entry.target);
      }
    });
  };

  // Crear observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observar cada elemento
  elementsToAnimate.forEach((element) => {
    element.classList.add('animate-on-scroll');
    observer.observe(element);
  });
}

// ============================================
// 2. ANIMATED COUNTER
// ============================================

function animateCounter(element, target, duration = 2000, suffix = '') {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

function initCounterAnimation() {
  const statsNumbers = document.querySelectorAll('.stat-number');
  
  if (statsNumbers.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.5 // 50% visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent;
        
        // Extraer número y sufijo (ej: "20+" → number: 20, suffix: "+")
        const match = text.match(/(\d+)(\+?)/);
        
        if (match) {
          const number = parseInt(match[1]);
          const suffix = match[2] || '';
          
          // Animar
          animateCounter(element, number, 2000, suffix);
        }
        
        // Solo animar una vez
        observer.unobserve(element);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  statsNumbers.forEach((stat) => {
    observer.observe(stat);
  });
}

// ============================================
// 3. SMOOTH SCROLL (mejorado)
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = 80; // altura del navbar
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// 4. INIT ALL ANIMATIONS
// ============================================

function initAnimations() {
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveal();
      initCounterAnimation();
      initSmoothScroll();
    });
  } else {
    // DOM ya está listo
    initScrollReveal();
    initCounterAnimation();
    initSmoothScroll();
  }
}

// Iniciar animaciones
initAnimations();

// ============================================
// 5. RESPETA REDUCED MOTION
// ============================================

// Si el usuario prefiere movimiento reducido, desactivar animaciones
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Añadir clase global para desactivar animaciones
  document.documentElement.classList.add('reduce-motion');
}