/**
 * Zenith AI - Login Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggle();
  initFormSubmit();
  initCardInteractions();
});

/**
 * Handles Password visibility toggle (eye icon)
 */
function initPasswordToggle() {
  const toggleBtn = document.getElementById('togglePasswordBtn');
  const passwordInput = document.getElementById('passwordInput');

  if (!toggleBtn || !passwordInput) return;

  toggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

    // Toggle Eye SVG icon
    if (isPassword) {
      // Show eye-off icon (open eye / crossed)
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      `;
      toggleBtn.setAttribute('aria-label', 'Hide password');
    } else {
      // Show eye slash icon
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
          <line x1="2" x2="22" y1="2" y2="22"/>
        </svg>
      `;
      toggleBtn.setAttribute('aria-label', 'Show password');
    }
  });
}

/**
 * Handles Form Submission with micro-animation
 */
function initFormSubmit() {
  const form = document.getElementById('loginForm');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput')?.value;
    const password = document.getElementById('passwordInput')?.value;

    if (!email || !password) {
      alert('Silakan masukkan email dan password Anda.');
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="animate-spin" style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12" />
      </svg>
      <span>Signing in...</span>
    `;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = `<span>Redirecting...</span>`;
      console.log('Zenith Login Successful:', { email });
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 500);
    }, 1000);
  });
}

/**
 * Feature card clicks
 */
function initCardInteractions() {
  const platformBuilderCard = document.getElementById('cardPlatformBuilder');
  const agentStudioCard = document.getElementById('cardAgentStudio');

  if (platformBuilderCard) {
    platformBuilderCard.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Selected Platform Builder');
    });
  }

  if (agentStudioCard) {
    agentStudioCard.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Selected Agent Studio');
    });
  }
}
