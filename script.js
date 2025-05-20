document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.textContent = '↑ Topo';
  btn.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#0b1320;color:white;padding:10px;border:none;border-radius:5px;cursor:pointer;opacity:0;transition:opacity 0.3s ease;z-index:999;';
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 600 ? '1' : '0';
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  if (!localStorage.getItem('welcome')) {
    const toast = document.createElement('div');
    toast.textContent = 'Bem-vindo(a) à LUCK Holding!';
    toast.style.cssText = 'position:fixed;bottom:20px;left:20px;background:#000;color:#fff;padding:15px;border-radius:5px;z-index:1000;opacity:0;transition:opacity 0.3s ease;';
    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = '1', 200);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
    localStorage.setItem('welcome', 'true');
  }

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = 'red';
          valid = false;
        } else {
          input.style.borderColor = '';
        }
      });
      if (valid) {
        alert('Mensagem enviada com sucesso!');
        form.reset();
      } else {
        alert('Preencha todos os campos obrigatórios.');
      }
    });
  }

  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => loader.classList.add('fade-out'), 1500);
  }
});
