
(() => {
  'use strict';

  const root = document.documentElement;
  const toggle = document.querySelector('#themeToggle');

  const saved = localStorage.getItem('cv-theme');
  const initial = saved === 'light' || saved === 'dark'
    ? saved
    : 'dark';

  const setTheme = theme => {
    root.setAttribute('data-bs-theme', theme);

    toggle.innerHTML = `
      <i class="bi bi-${theme === 'dark' ? 'sun' : 'moon-stars'}"></i>
    `;

    toggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'
    );
  };

  setTheme(initial);

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-bs-theme') === 'dark'
      ? 'light'
      : 'dark';

    setTheme(next);
    localStorage.setItem('cv-theme', next);
  });

  document.querySelector('#year').textContent =
    new Date().getFullYear();

  document.querySelector('#printCV')
    .addEventListener('click', () => window.print());

  const filters = document.querySelectorAll('.filter-btn');

  filters.forEach(button => {
    button.addEventListener('click', () => {
      filters.forEach(b => {
        b.classList.toggle('active', b === button);
        b.setAttribute('aria-pressed', String(b === button));
      });

      document.querySelectorAll('.project-item').forEach(card => {
        card.hidden =
          button.dataset.filter !== 'all' &&
          card.dataset.category !== button.dataset.filter;
      });
    });
  });

  const toastEl = document.querySelector('#siteToast');

  document.querySelector('#copyProfile')
    .addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(
          location.href.split('#')[0]
        );

        document.querySelector('#toastText').textContent =
          'Enlace del portafolio copiado';
      } catch {
        document.querySelector('#toastText').textContent =
          'Copia la dirección desde tu navegador';
      }

      bootstrap.Toast.getOrCreateInstance(toastEl).show();
    });

  document.querySelectorAll('#mainMenu .nav-link')
    .forEach(link => {
      link.addEventListener('click', () => {
        const menu = document.querySelector('#mainMenu');

        if (menu.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal')
      .forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal')
      .forEach(el => el.classList.add('visible'));
  }


  const navLinks = document.querySelectorAll('#mainMenu .nav-link');

  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('main section[id]');

    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.toggle(
              'active',
              a.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -55% 0px'
    });

    sections.forEach(s => navObserver.observe(s));
  }
})();
