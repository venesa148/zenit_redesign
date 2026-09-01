/**
 * Zenith AI - Large Pop-up Modals (Manage & Agent Studio)
 */

document.addEventListener('DOMContentLoaded', () => {
  initManageModal();
  initAgentStudioModal();
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

/**
 * Agent Studio Modal Controller
 */
function initAgentStudioModal() {
  const modalBackdrop = document.getElementById('agentStudioModalBackdrop');
  const closeBtn = document.getElementById('btnAgentStudioClose');
  const agentNavBtns = document.querySelectorAll('#navAgentStudio, #iconNavAgentStudio');
  const innerNavItems = document.querySelectorAll('#agentStudioModalBackdrop .modal-inner-sidebar .modal-nav-item');
  const contentPanes = document.querySelectorAll('#agentStudioModalBackdrop .modal-pane-section');

  if (!modalBackdrop) return;

  function openModal() {
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Trigger open from Agent Studio button in Global Sidebar
  agentNavBtns.forEach(btn => {
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

  // Switching Inner Agent Studio Sidebar Tabs
  innerNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');

      innerNavItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      contentPanes.forEach(pane => {
        if (pane.id === `agent-pane-${targetTab}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}
