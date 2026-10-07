document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const currentTheme = document.documentElement.dataset.theme || 'light';
  if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fi fi-rs-brightness"></i>';
    darkModeToggle.setAttribute('data-tooltip', darkModeToggle.dataset.lightLabel || 'Light Mode');
    darkModeToggle.setAttribute('aria-label', darkModeToggle.dataset.lightLabel || 'Light Mode');
  }
  darkModeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    
    let theme = 'light';
    
    if (document.body.getAttribute('data-theme') !== 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      theme = 'dark';
      darkModeToggle.innerHTML = '<i class="fi fi-rs-brightness"></i>';
      darkModeToggle.setAttribute('data-tooltip', darkModeToggle.dataset.lightLabel || 'Light Mode');
    darkModeToggle.setAttribute('aria-label', darkModeToggle.dataset.lightLabel || 'Light Mode');
    } else {
      document.body.removeAttribute('data-theme');
      darkModeToggle.innerHTML = '<i class="fi fi-rc-moon"></i>';
      darkModeToggle.setAttribute('data-tooltip', darkModeToggle.dataset.darkLabel || 'Dark Mode');
      darkModeToggle.setAttribute('aria-label', darkModeToggle.dataset.darkLabel || 'Dark Mode');
    }
    
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  });
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') return;
      
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    });
  });
  const revealElements = () => {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight * 0.85) {
        section.classList.add('revealed');
      }
    });
  };
  window.addEventListener('scroll', revealElements);
  window.addEventListener('load', revealElements);
  
});
