  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navLinks = Array.from(document.querySelectorAll('.navContent'));

    // Map each nav item -> its target element (supports <a href="#id"> or data-target="#id")
    const linkMap = new Map();
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const dataTarget = link.dataset && link.dataset.target ? link.dataset.target.trim() : null;
      const selector = (href && href.startsWith('#')) ? href : dataTarget;
      if (!selector) {
        console.warn('navContent missing href/data-target:', link);
        return;
      }
      const targetEl = document.querySelector(selector);
      if (!targetEl) {
        console.warn('No element found for selector', selector);
        return;
      }
      linkMap.set(link, targetEl);

      // click handler - smooth scroll that accounts for sticky header height
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const rect = targetEl.getBoundingClientRect();
        const targetY = rect.top + window.scrollY - headerHeight - 10; // 10px gap
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      });
    });

    // Scroll handler: add/remove header scrolled class and toggle active class on nav items
    function onScroll() {
      const headerHeight = header ? header.offsetHeight : 0;
      if (window.scrollY > 50) header.classList.add('scrolled'); else header.classList.remove('scrolled');

      let currentLink = null;
      for (const [link, targetEl] of linkMap.entries()) {
        const rect = targetEl.getBoundingClientRect();
        if (rect.top <= headerHeight + 20 && rect.bottom > headerHeight + 20) {
          currentLink = link;
          break;
        }
      }
      // fallback: last target scrolled past
      if (!currentLink) {
        for (const [link, targetEl] of linkMap.entries()) {
          const rect = targetEl.getBoundingClientRect();
          if (rect.top <= headerHeight + 20) currentLink = link;
        }
      }

      navLinks.forEach(l => l.classList.remove('active'));
      if (currentLink) currentLink.classList.add('active');
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialize
  });