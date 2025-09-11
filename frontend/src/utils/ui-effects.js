/**
 * Modern UI Animation and Interaction Utilities
 * 
 * This file contains JavaScript functions that enhance the UI with
 * interactive animations and effects
 */

// Ripple effect for buttons and clickable elements
export function initRippleEffect() {
  const rippleElements = document.querySelectorAll('.ripple');
  
  rippleElements.forEach(element => {
    element.addEventListener('click', function(e) {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      element.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Reveal animations when elements enter viewport
export function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  revealElements.forEach(element => {
    observer.observe(element);
  });
}

// Spotlight effect for cards and containers
export function initSpotlightEffect() {
  const spotlightElements = document.querySelectorAll('.bg-spotlight');
  
  spotlightElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / element.offsetWidth) * 100;
      const y = ((e.clientY - rect.top) / element.offsetHeight) * 100;
      
      element.style.setProperty('--x', `${x}%`);
      element.style.setProperty('--y', `${y}%`);
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.setProperty('--x', '50%');
      element.style.setProperty('--y', '50%');
    });
  });
}

// 3D tilt effect for cards
export function initTiltEffect() {
  const tiltElements = document.querySelectorAll('.tilt');
  
  tiltElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (centerY - y) / 10;
      const tiltY = (x - centerX) / 10;
      
      element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// Magnetic effect for buttons and interactive elements
export function initMagneticEffect() {
  const magneticElements = document.querySelectorAll('.magnetic');
  
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / 8;
      const deltaY = (y - centerY) / 8;
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0px, 0px)';
    });
  });
}

// Animated counter for numbers
export function initCounterAnimation() {
  const counterElements = document.querySelectorAll('.counter-animate');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.dataset.target, 10);
        const duration = parseInt(target.dataset.duration || 2000, 10);
        let startTime = null;
        
        function countUp(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const currentValue = Math.floor(progress * targetValue);
          
          target.textContent = currentValue.toLocaleString();
          
          if (progress < 1) {
            requestAnimationFrame(countUp);
          } else {
            target.textContent = targetValue.toLocaleString();
          }
        }
        
        requestAnimationFrame(countUp);
        observer.unobserve(target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  counterElements.forEach(element => {
    observer.observe(element);
  });
}

// Parallax scrolling effect for background elements
export function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const offset = scrollTop * speed;
      
      element.style.transform = `translateY(${offset}px)`;
    });
  });
}

// Animated typing effect for text
export function initTypingEffect() {
  const typingElements = document.querySelectorAll('.typing');
  
  typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.visibility = 'visible';
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  });
}

// Initialize all UI effects
export function initAllEffects() {
  document.addEventListener('DOMContentLoaded', () => {
    initRippleEffect();
    initRevealAnimations();
    initSpotlightEffect();
    initTiltEffect();
    initMagneticEffect();
    initCounterAnimation();
    initParallaxEffect();
    initTypingEffect();
  });
}

// Automatically initialize all effects when this module is imported
initAllEffects();
