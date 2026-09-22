/**
 * Zenith AI - Unified Sidebar Behavior (Global & Secondary Sidebars) & Theme Manager
 */

document.addEventListener('DOMContentLoaded', () => {
  initGlobalSidebar();
  initSecondarySidebar();
  initThemeManager();
});

/**
 * Handles Global Royal Blue Sidebar Collapse & Expand (Toggle at TOP)
 */
function initGlobalSidebar() {
  const sidebar = document.getElementById('globalSidebarRoot');
  const toggleBtn = document.getElementById('btnToggleGlobalTop');

  if (!sidebar || !toggleBtn) return;

  function updateToggleIcon(isCollapsed) {
    if (isCollapsed) {
      // Expanded icon (arrow pointing right >> to expand)
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="13 17 18 12 13 7"/>
          <polyline points="6 17 11 12 6 7"/>
        </svg>
      `;
      toggleBtn.setAttribute('title', 'Expand Global Sidebar');
    } else {
      // Collapse icon (arrow pointing left << to collapse)
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="11 17 6 12 11 7"/>
          <polyline points="18 17 13 12 18 7"/>
        </svg>
      `;
      toggleBtn.setAttribute('title', 'Collapse to Icons');
    }
  }

  // Initial icon state
  updateToggleIcon(sidebar.classList.contains('collapsed'));

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isCollapsed = sidebar.classList.toggle('collapsed');
    updateToggleIcon(isCollapsed);
  });
}

/**
 * Handles Secondary Sidebar Collapse & Re-open Tab with (>> Indicator)
 */
function initSecondarySidebar() {
  const secSidebar = document.getElementById('secondarySidebar');
  const toggleBtn = document.getElementById('btnToggleSecSidebar');
  const reopenTab = document.getElementById('secSidebarReopenTab');

  if (!secSidebar) return;

  function setSecondaryCollapsed(collapsed) {
    if (collapsed) {
      secSidebar.classList.add('collapsed');
      if (reopenTab) reopenTab.classList.add('visible');
    } else {
      secSidebar.classList.remove('collapsed');
      if (reopenTab) reopenTab.classList.remove('visible');
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      setSecondaryCollapsed(true);
    });
  }

  if (reopenTab) {
    reopenTab.addEventListener('click', () => {
      setSecondaryCollapsed(false);
    });
  }
}

/**
 * Direct 1-Click Global UI/UX Theme Switcher (Light <-> Dark)
 */
function initThemeManager() {
  const STORAGE_KEY = 'zenith_theme_preference';

  function getStoredTheme() {
    var stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('zenith_theme');
    if (stored === 'dark' || stored === 'light') return stored;
    // Default to system preference or light
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function updateThemeUI(theme) {
    const isDark = (theme === 'dark');
    const toggleBtns = document.querySelectorAll('#btnGlobalThemeToggle, .global-sb-theme-btn');

    toggleBtns.forEach(btn => {
      if (isDark) {
        btn.classList.add('is-dark');
        btn.setAttribute('title', 'Beralih ke Mode Terang (Light Mode)');
        btn.setAttribute('aria-label', 'Beralih ke Mode Terang');
      } else {
        btn.classList.remove('is-dark');
        btn.setAttribute('title', 'Beralih ke Mode Gelap (Dark Mode)');
        btn.setAttribute('aria-label', 'Beralih ke Mode Gelap');
      }

      const icon = btn.querySelector('.theme-btn-icon') || document.getElementById('themeActiveIcon');
      const label = btn.querySelector('.theme-btn-label') || document.getElementById('themeActiveLabel');

      if (icon) {
        if (isDark) {
          icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
          `;
        } else {
          icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
            </svg>
          `;
        }
      }

      if (label) {
        label.textContent = isDark ? 'Mode Gelap' : 'Mode Terang';
      }
    });
  }

  function applyTheme(theme, showToast = false) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme-preference', theme);
    if (document.body) {
      document.body.setAttribute('data-theme', theme);
    }
    localStorage.setItem(STORAGE_KEY, theme);
    localStorage.setItem('zenith_theme', theme);
    updateThemeUI(theme);

    if (showToast) {
      const msg = (theme === 'dark')
        ? '🌙 Mode Gelap diaktifkan'
        : '☀️ Mode Terang diaktifkan';
      showToastFeedback(msg);
    }
  }

  function showToastFeedback(text) {
    let toast = document.getElementById('zenithThemeToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'zenithThemeToast';
      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.right = '24px';
      toast.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
      toast.style.color = '#ffffff';
      toast.style.padding = '10px 18px';
      toast.style.borderRadius = '10px';
      toast.style.fontSize = '13px';
      toast.style.fontWeight = '600';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
      toast.style.zIndex = '99999';
      toast.style.transition = 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
      toast.style.pointerEvents = 'none';
      toast.style.border = '1px solid rgba(255,255,255,0.15)';
      document.body.appendChild(toast);
    }

    toast.textContent = text;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0) scale(1)';

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.95)';
    }, 2000);
  }

  // Initial apply
  const initialTheme = getStoredTheme();
  applyTheme(initialTheme, false);

  // Direct 1-Click Toggle Listener
  const toggleBtns = document.querySelectorAll('#btnGlobalThemeToggle, .global-sb-theme-btn');
  toggleBtns.forEach(btn => {
    btn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const target = (current === 'dark') ? 'light' : 'dark';
      applyTheme(target, true);
    };
  });
}



// Feedback modal logic
document.addEventListener('DOMContentLoaded', () => {
  const feedbackLinks = document.querySelectorAll('#feedbackLink, .global-sb-feedback-link');
  const modal = document.getElementById('feedbackModal');
  if (!modal) return;
  
  const closeBtn = document.getElementById('feedbackCloseBtn');
  const typeBtns = document.querySelectorAll('.feedback-type-btn');
  const sendBtn = document.querySelector('.feedback-send-btn');
  
  feedbackLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
  
  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      // Ideally send data
      alert('Feedback sent! Thank you.');
      modal.classList.remove('active');
    });
  }
});
