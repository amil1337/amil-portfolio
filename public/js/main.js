// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Always start in light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply the current theme
  if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fi fi-rs-brightness"></i>';
    darkModeToggle.setAttribute('data-tooltip', 'Light Mode');
  }
  
  // Toggle theme when button is clicked
  darkModeToggle.addEventListener('click', (e) => {
    // Prevent default anchor behavior that causes page to scroll to top
    e.preventDefault();
    
    let theme = 'light';
    
    if (document.body.getAttribute('data-theme') !== 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      theme = 'dark';
      darkModeToggle.innerHTML = '<i class="fi fi-rs-brightness"></i>';
      darkModeToggle.setAttribute('data-tooltip', 'Light Mode');
    } else {
      document.body.removeAttribute('data-theme');
      darkModeToggle.innerHTML = '<i class="fi fi-rc-moon"></i>';
      darkModeToggle.setAttribute('data-tooltip', 'Dark Mode');
    }
    
    localStorage.setItem('theme', theme);
  });
  
  // Smooth scrolling for in-page links
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
  
  // Reveal animations on scroll
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
  
  // Initialize reveal animations
  window.addEventListener('scroll', revealElements);
  window.addEventListener('load', revealElements);
  
  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Basic form validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // In a real application, you would send the form data to a server here
      console.log('Form submitted:', { name, email, subject, message });
      
      // Show success message
      contactForm.innerHTML = `
        <div class="form-success">
          <h3>Thank you for your message!</h3>
          <p>I'll get back to you as soon as possible.</p>
        </div>
      `;
    });
  }
});
