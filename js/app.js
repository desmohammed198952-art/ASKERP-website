(function () {
  const STORAGE_KEY = 'askerp-lang';
  const html = document.documentElement;

  const setLang = (lang) => {
    const next = lang === 'en' ? 'en' : 'ar';
    html.lang = next;
    html.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = strings[next][key];
      if (value == null) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const value = strings[next][key];
      if (value != null) el.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      const value = strings[next][key];
      if (value != null) el.setAttribute('aria-label', value);
    });
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === next);
    });
    document.title = strings[next].page_title || 'ASKERP';
    localStorage.setItem(STORAGE_KEY, next);
  };

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const saved = localStorage.getItem(STORAGE_KEY);
  setLang(saved === 'en' ? 'en' : 'ar');
})();
