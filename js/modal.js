/**
 * Zenith AI - Manage Pop-up Modal Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initManageModal();
});

/**
 * Manage Modal Controller
 */
function initManageModal() {
  const modalBackdrop = document.getElementById('manageModalBackdrop');
  const closeBtn = document.getElementById('btnManageModalClose');
  const manageNavBtns = document.querySelectorAll('#navManage, #iconNavManage');
  const innerNavItems = document.querySelectorAll('#manageModalBackdrop .modal-inner-sidebar .modal-nav-item');
  const contentPanes = document.querySelectorAll('#manageModalBackdrop .modal-pane-section');

  if (!modalBackdrop) return;

  function openModal() {
    // Automatically collapse global sidebar to icon-bar mode when Manage is opened
    const globalSidebar = document.getElementById('globalSidebarRoot');
    const toggleBtn = document.getElementById('btnToggleGlobalTop');
    if (globalSidebar && !globalSidebar.classList.contains('collapsed')) {
      globalSidebar.classList.add('collapsed');
      if (toggleBtn) {
        toggleBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="13 17 18 12 13 7"/>
            <polyline points="6 17 11 12 6 7"/>
          </svg>
        `;
        toggleBtn.setAttribute('title', 'Expand Global Sidebar');
      }
    }

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Trigger open from Manage button in Global Sidebar
  manageNavBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Close on X button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close on outside backdrop click
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Switching Inner Manage Sidebar Tabs
  innerNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');

      innerNavItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      contentPanes.forEach(pane => {
        if (pane.id === `pane-${targetTab}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}

