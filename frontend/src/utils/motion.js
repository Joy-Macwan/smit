// Minimal reveal-on-scroll utility
export function initRevealOnScroll() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Immediately mark as visible to avoid motion
    document.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => el.classList.add('in'));
    return;
  }

  const targets = document.querySelectorAll('.reveal-up, .reveal-fade');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

  targets.forEach(el => {
    // Reset state to allow re-entrance on route change
    el.classList.remove('in');
    observer.observe(el);
  });
}
