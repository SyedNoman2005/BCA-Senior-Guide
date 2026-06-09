document.addEventListener("DOMContentLoaded", () => {

  // --- 1. Typing Animation Logic ---
  const typedTextSpan = document.querySelector(".typing-text");
  // The exact require phrase
  const textArray = ["I am your senior Syed Noman.", "Welcome to BCA."];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
      if (charIndex < textArray[textArrayIndex].length) {
          typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
          charIndex++;
          setTimeout(type, typingDelay);
      } else {
          setTimeout(erase, newTextDelay);
      }
  }

  function erase() {
      if (charIndex > 0) {
          typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, erasingDelay);
      } else {
          textArrayIndex++;
          if (textArrayIndex >= textArray.length) textArrayIndex = 0;
          setTimeout(type, typingDelay + 500);
      }
  }

  if (textArray.length) setTimeout(type, newTextDelay);


  // --- 2. 3D Card Tilt Hover Effect ---
  const tiltElements = document.querySelectorAll('.tilt-card');
  tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
          // Check if device supports hover (ignores touch devices)
          if (window.matchMedia("(hover: none)").matches) return;
          
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          // Max rotation degrees
          const maxRotate = 10;
          const rotateX = ((y - centerY) / centerY) * -maxRotate;
          const rotateY = ((x - centerX) / centerX) * maxRotate;

          el.style.transition = 'transform 0.1s ease';
          el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      el.addEventListener('mouseleave', () => {
          el.style.transition = 'transform 0.5s ease-out';
          el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
  });


  // --- 3. Accordion Logic for Academic Hub ---
  const accHeaders = document.querySelectorAll('.acc-header');
  accHeaders.forEach(header => {
      header.addEventListener('click', () => {
          const body = header.nextElementSibling;
          const isActive = header.classList.contains('active');

          // Close all accordions first
          document.querySelectorAll('.acc-body').forEach(b => {
              b.style.maxHeight = null;
          });
          document.querySelectorAll('.acc-header').forEach(h => {
              h.classList.remove('active');
          });

          // Open the clicked one if it wasn't already open
          if (!isActive) {
              header.classList.add('active');
              body.style.maxHeight = body.scrollHeight + "px";
          }
      });
  });


  // --- 4. Canvas Particle System Background ---
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray = [];
  const numberOfParticles = window.innerWidth > 768 ? 100 : 50;

  class Particle {
      constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          // Varying sizes
          this.size = Math.random() * 2 + 0.5;
          // Random directions and slow speeds
          this.speedX = Math.random() * 0.8 - 0.4;
          this.speedY = Math.random() * 0.8 - 0.4;
          // Colors matching the theme
          this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.5)' : 'rgba(112, 0, 255, 0.5)';
      }

      update() {
          this.x += this.speedX;
          this.y += this.speedY;

          // Bounce off edges
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
      }
  }

  function initParticles() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
          particlesArray.push(new Particle());
      }
  }

  function animateParticles() {
      // Create a trailing effect by using clearRect with opacity (or just clearRect)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
      }
      requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
  });

  // --- 5. Image Zoom Modal Logic ---
  const modal = document.getElementById("image-modal");
  const profileImg = document.getElementById("profile-pic");
  const modalImg = document.getElementById("zoomed-img");
  const closeModal = document.querySelector(".close-modal");

  if(profileImg && modal) {
      profileImg.onclick = function() {
          modal.style.display = "flex"; // Use flex to center properly
          modalImg.src = this.src;
      }
      closeModal.onclick = function() {
          modal.style.display = "none";
      }
      modal.onclick = function(e) {
          if (e.target !== modalImg) {
              modal.style.display = "none";
          }
      }
  }

});
