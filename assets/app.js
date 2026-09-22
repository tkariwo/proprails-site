(() => {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.menu-btn');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  menu?.addEventListener('click', () => nav?.classList.toggle('mobile-open'));
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('mobile-open')));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const ADDRESS = 'tafadzwa@proprails.co.za';
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('.form-status');
    const fallback = form.querySelector('[data-mail-fallback]');
    const output = form.querySelector('[data-mail-text]');
    const copyBtn = form.querySelector('[data-copy-mail]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const company = data.get('company') || '';
      const email = data.get('email') || '';
      const topic = data.get('topic') || 'Prop Rails enquiry';
      const message = data.get('message') || '';
      const subject = `[Prop Rails] ${topic} — ${company || name}`;
      const body = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\n${message}`;

      if (status) { status.style.display = 'block'; status.textContent = 'Opening your email client…'; }

      try {
        window.location.href = `mailto:${ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      } catch (err) { /* the copy panel below is the fallback */ }

      // Many people read mail in a browser tab and have no mailto handler at all, in which
      // case the line above does nothing visible. Rather than guess whether it worked,
      // always surface the message so there is a path either way.
      window.setTimeout(() => {
        if (status) status.textContent = 'Your email client should now be open. If nothing happened, copy the message below and send it however you prefer:';
        if (fallback && output) {
          output.value = `To: ${ADDRESS}\nSubject: ${subject}\n\n${body}`;
          fallback.hidden = false;
        }
      }, 1200);
    });

    copyBtn?.addEventListener('click', async () => {
      if (!output) return;
      const done = () => {
        copyBtn.textContent = 'Copied';
        window.setTimeout(() => { copyBtn.textContent = 'Copy message'; }, 2200);
      };
      try {
        await navigator.clipboard.writeText(output.value);
        done();
      } catch (err) {
        output.removeAttribute('readonly');
        output.select();
        try { document.execCommand('copy'); done(); } catch (e2) { copyBtn.textContent = 'Select and copy manually'; }
        output.setAttribute('readonly', '');
      }
    });
  }
})();
