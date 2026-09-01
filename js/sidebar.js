/**
 * Zenith AI - Unified Sidebar Behavior (Global & Secondary Sidebars)
 */

document.addEventListener('DOMContentLoaded', () => {
  initGlobalSidebar();
  initSecondarySidebar();
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
