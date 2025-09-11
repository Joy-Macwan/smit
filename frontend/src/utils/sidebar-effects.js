/**
 * This file contains utility functions for handling sidebar effects
 * and animations in the SMIT application.
 */

// Function to initialize sidebar ripple effects
export function initSidebarEffects() {
  // Add ripple effect to sidebar links
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  
  sidebarLinks.forEach(link => {
    // Only add the event listener if it doesn't already have one
    if (!link.hasAttribute('data-ripple-initialized')) {
      link.setAttribute('data-ripple-initialized', 'true');
      
      link.addEventListener('click', function(e) {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple', 'ripple-primary');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        link.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    }
  });
  
  // Add hover spotlight effect to the sidebar logo
  const logo = document.querySelector('.logoimg');
  if (logo && !logo.hasAttribute('data-spotlight-initialized')) {
    logo.setAttribute('data-spotlight-initialized', 'true');
    
    logo.addEventListener('mousemove', function(e) {
      const rect = logo.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create a radial gradient spotlight effect
      logo.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`;
    });
    
    logo.addEventListener('mouseleave', function() {
      logo.style.background = 'none';
    });
  }
  
  // Add subtle hover animations to nav group titles
  const navGroupTitles = document.querySelectorAll('.nav-group-title');
  navGroupTitles.forEach(title => {
    if (!title.hasAttribute('data-animation-initialized')) {
      title.setAttribute('data-animation-initialized', 'true');
      
      title.addEventListener('mouseenter', function() {
        title.style.transform = 'translateX(5px)';
        title.style.color = 'rgba(255, 255, 255, 0.8)';
        title.style.transition = 'all 0.3s ease';
      });
      
      title.addEventListener('mouseleave', function() {
        title.style.transform = 'translateX(0)';
        title.style.color = 'rgba(255, 255, 255, 0.5)';
      });
    }
  });
}

// Function to handle sidebar overlay and responsiveness
export function handleSidebarResponsiveness() {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (hamburger && sidebar && overlay) {
    // Toggle sidebar on hamburger click
    hamburger.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
      
      // Add ARIA attributes for accessibility
      const isOpen = sidebar.classList.contains('open');
      sidebar.setAttribute('aria-hidden', !isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    
    // Close sidebar when clicking on overlay
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      sidebar.setAttribute('aria-hidden', 'true');
    });
  }
}

// Initialize all sidebar effects
export function initializeAllSidebarEffects() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSidebarEffects();
      handleSidebarResponsiveness();
    });
  } else {
    initSidebarEffects();
    handleSidebarResponsiveness();
  }
}

// Export a function to add the active state programmatically
export function setActiveSidebarLink(path) {
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  
  sidebarLinks.forEach(link => {
    // Get the href attribute value
    const href = link.getAttribute('href');
    
    // Remove active class from all links
    link.classList.remove('active');
    
    // Add active class to matching link
    if (href === path) {
      link.classList.add('active');
    }
  });
}
