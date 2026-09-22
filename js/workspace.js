/**
 * Zenith AI - Multi-level Workspace Interactions, Context Vault & Live Beauty Preview
 */

document.addEventListener('DOMContentLoaded', () => {
  initWorkspaceViewSwitcher();
  initProjectManagementInteractions();
  initDocumentsExplorer();
  initDeploymentDashboard();
  initContextVault();
  initContextSelectorModal();
  initTabsSwitchers();
  initTerminalExecution();
  initChatPromptActions();
  initLivePreviewActions();
  initPreview3DotsMenu();
  initPreviewWideMode();
  initFileExplorerSidebar();
  initPreviewLogDrawer();
  initDocumentTabsManager();
  initOrcaCanvaVisualEditor();
  initAgentPopover();
  initBeautyStoreInteractions();
  initPreviewCloseToggle();
});

/**
 * Handles switching between Build View, Project Management View, Documents View, Deployment View, and Context Vault View
 */
function initWorkspaceViewSwitcher() {
  const btnBuild = document.getElementById('secNavBuild');
  const btnManagement = document.getElementById('secNavManagement');
  const btnDocument = document.getElementById('secNavDocument');
  const btnDeployment = document.getElementById('secNavDeployment');
  const btnContextVault = document.getElementById('secNavContextVault');
  const buildView = document.getElementById('buildViewContainer');
  const pmView = document.getElementById('pmViewContainer');
  const docView = document.getElementById('docViewContainer');
  const deployView = document.getElementById('deployViewContainer');
  const contextVaultView = document.getElementById('contextVaultViewContainer');
  const secNavItems = document.querySelectorAll('.sec-nav-item');

  function switchView(targetView) {
    secNavItems.forEach(item => item.classList.remove('active'));
    if (buildView) buildView.classList.remove('active');
    if (pmView) pmView.classList.remove('active');
    if (docView) docView.classList.remove('active');
    if (deployView) deployView.classList.remove('active');
    if (contextVaultView) contextVaultView.classList.remove('active');

    if (targetView === 'build') {
      if (buildView) buildView.classList.add('active');
      if (btnBuild) btnBuild.classList.add('active');
      window.location.hash = '#build';
    } else if (targetView === 'document') {
      if (docView) docView.classList.add('active');
      if (btnDocument) btnDocument.classList.add('active');
      window.location.hash = '#document';
    } else if (targetView === 'deployment') {
      if (deployView) deployView.classList.add('active');
      if (btnDeployment) btnDeployment.classList.add('active');
      window.location.hash = '#deployment';
    } else if (targetView === 'context-vault') {
      if (contextVaultView) contextVaultView.classList.add('active');
      if (btnContextVault) btnContextVault.classList.add('active');
      window.location.hash = '#context-vault';
    } else if (targetView === 'project-management') {
      if (pmView) pmView.classList.add('active');
      if (btnManagement) btnManagement.classList.add('active');
      window.location.hash = '#project-management';
    } else {
      // Default to Build View (AI Chat, Preview & Right File Explorer)
      if (buildView) buildView.classList.add('active');
      if (btnBuild) btnBuild.classList.add('active');
      window.location.hash = '#build';
    }
  }

  if (btnBuild) {
    btnBuild.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('build');
    });
  }

  if (btnManagement) {
    btnManagement.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('project-management');
    });
  }

  if (btnDocument) {
    btnDocument.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('document');
    });
  }

  if (btnDeployment) {
    btnDeployment.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('deployment');
    });
  }

  if (btnContextVault) {
    btnContextVault.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('context-vault');
    });
  }

  // Handle URL Hash on Initial Load & Hash changes
  function applyHashView() {
    const hash = window.location.hash;
    if (hash === '#document') {
      switchView('document');
    } else if (hash === '#deployment') {
      switchView('deployment');
    } else if (hash === '#context-vault') {
      switchView('context-vault');
    } else if (hash === '#project-management') {
      switchView('project-management');
    } else {
      switchView('build');
    }
  }

  applyHashView();
  window.addEventListener('hashchange', applyHashView);
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Handles Deployment Pipeline Simulation, Actions & Live Console Stream
 */
function initDeploymentDashboard() {
  const triggerBtn = document.getElementById('btnTriggerDeployment');
  const terminalLogs = document.getElementById('deployTerminalLogs');
  const clearLogsBtn = document.getElementById('btnClearLogs');
  const downloadLogsBtn = document.getElementById('btnDownloadLogs');
  const promoteBtn = document.getElementById('btnPromoteStaging');
  const redeployProdBtn = document.getElementById('btnRedeployProd');
  const rollbackBtns = document.querySelectorAll('.btn-action-rollback');

  function showToast(msg) {
    const toast = document.getElementById('beautyToast');
    const toastText = document.getElementById('beautyToastText');
    if (toast && toastText) {
      toastText.textContent = msg;
      toast.style.display = 'inline-flex';
      setTimeout(() => { toast.style.display = 'none'; }, 2400);
    }
  }

  function appendLog(tag, msg, tagClass = 'log-tag-info') {
    if (!terminalLogs) return;
    const now = new Date();
    const timeStr = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
    const logLine = document.createElement('div');
    logLine.className = 'log-line';
    logLine.innerHTML = `<span class="log-time">${timeStr}</span> <span class="${tagClass}">[${tag}]</span> <span>${msg}</span>`;
    terminalLogs.appendChild(logLine);
    terminalLogs.scrollTop = terminalLogs.scrollHeight;
  }

  // Trigger Deployment Pipeline Simulation
  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      triggerBtn.disabled = true;
      triggerBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        <span>Deploying Pipeline...</span>
      `;
      showToast('Memulai pipeline deployment baru #dep-8922...');

      appendLog('PIPELINE', 'Triggering manual build & deployment workflow #wf-4093...', 'log-tag-info');

      setTimeout(() => {
        appendLog('GIT', 'Checkout branch main (commit 38f921a)... Verified', 'log-tag-info');
      }, 700);

      setTimeout(() => {
        appendLog('DOCKER', 'Compiling multi-stage assets & optimizing node modules... OK (32MB)', 'log-tag-info');
      }, 1500);

      setTimeout(() => {
        appendLog('TESTS', 'Executing Cypress & Jest suites: 142/142 passed (100%)', 'log-tag-success');
      }, 2300);

      setTimeout(() => {
        appendLog('K8S', 'Rolling cluster pods with zero-downtime strategy... Complete', 'log-tag-info');
      }, 3100);

      setTimeout(() => {
        appendLog('SUCCESS', 'Deployment #dep-8922 is LIVE! Healthcheck HTTP 200 OK.', 'log-tag-success');
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>Trigger Deployment</span>
        `;
        showToast('Deployment #dep-8922 berhasil dan live di Production!');
      }, 3800);
    });
  }

  // Quick Action Buttons
  if (promoteBtn) {
    promoteBtn.addEventListener('click', () => {
      showToast('Mempromosikan Staging v1.5.0-rc2 ke Production...');
      appendLog('PROMOTE', 'Promoting staging build (v1.5.0-rc2) to Production cluster...', 'log-tag-info');
    });
  }

  if (redeployProdBtn) {
    redeployProdBtn.addEventListener('click', () => {
      showToast('Memulai redeploy Production v1.4.2...');
      appendLog('REDEPLOY', 'Restarting container pods for Production (v1.4.2)...', 'log-tag-info');
    });
  }

  rollbackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const depId = btn.getAttribute('data-id') || 'dep';
      showToast(`Memulai rollback ke versi #${depId}...`);
      appendLog('ROLLBACK', `Rolling back cluster release to version #${depId}...`, 'log-tag-warn');
    });
  });

  if (clearLogsBtn) {
    clearLogsBtn.addEventListener('click', () => {
      if (terminalLogs) {
        terminalLogs.innerHTML = '<div class="log-line"><span class="log-time">[Console]</span> <span class="log-tag-info">[INFO]</span> <span>Log console cleared.</span></div>';
      }
    });
  }

  if (downloadLogsBtn) {
    downloadLogsBtn.addEventListener('click', () => {
      showToast('Mengunduh file runtime-logs.txt...');
    });
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Handles Document Explorer Tree, Category Collapse, Document Previews & Sub-Tabs
 */
function initDocumentsExplorer() {
  const docItems = document.querySelectorAll('.doc-nav-item');
  const docPanels = document.querySelectorAll('.doc-panel-section');
  const activeTitle = document.getElementById('docActiveTitle');
  const activeBadge = document.getElementById('docActiveBadge');
  const activeMeta = document.getElementById('docActiveMeta');
  const subTabsBar = document.getElementById('docSubTabsBar');
  const subTabBtns = document.querySelectorAll('.doc-sub-tab-btn');
  const prdSubPanes = document.querySelectorAll('.prd-subtab-pane');
  const categoryHeaders = document.querySelectorAll('.doc-category-header');
  const downloadBtn = document.getElementById('btnDownloadDoc');
  const viewFullBtn = document.getElementById('btnViewFullDoc');

  // 1. Category Accordion Toggling
  categoryHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const groupId = header.getAttribute('data-toggle');
      if (groupId) {
        const groupEl = document.getElementById(groupId);
        if (groupEl) {
          groupEl.classList.toggle('collapsed');
        }
      }
    });
  });

  // 2. Document Item Selection
  docItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      docItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const targetId = item.getAttribute('data-doc-target');
      const title = item.getAttribute('data-doc-title') || 'Document';
      const badge = item.getAttribute('data-doc-badge') || 'Approved';
      const phase = item.getAttribute('data-doc-phase') || 'Phase 1';
      const agent = item.getAttribute('data-doc-agent') || 'Agent';
      const date = item.getAttribute('data-doc-date') || 'Today';

      // Update Header Text
      if (activeTitle) activeTitle.textContent = title;
      if (activeBadge) {
        activeBadge.textContent = badge;
        activeBadge.className = badge === 'Approved' ? 'badge-doc-status-approved' : (badge === 'Live' ? 'badge-doc-status-live' : 'badge-doc-status-draft');
      }
      if (activeMeta) {
        activeMeta.innerHTML = `<span>${phase}</span> · <span>Dibuat oleh ${agent}</span> · <span>Terakhir diupdate ${date}</span>`;
      }

      // Hide all panels, show target panel
      docPanels.forEach(panel => panel.classList.remove('active'));
      if (targetId) {
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      }

      // Toggle Sub-Tabs Bar (Show for PRD, hide or adapt for others)
      if (subTabsBar) {
        if (targetId === 'docPanelPrd') {
          subTabsBar.style.display = 'flex';
        } else {
          subTabsBar.style.display = 'none';
        }
      }

      // Hide Edit Header and Sidebar when not in PRD/BRD
      const docHeaderTop = document.querySelector('.doc-header-top');
      const docEditSidebar = document.getElementById('docEditSidebar');
      
      if (targetId === 'docPanelPrd' || targetId === 'docPanelBRD') {
        if (docHeaderTop) docHeaderTop.style.display = 'flex';
      } else {
        if (docHeaderTop) docHeaderTop.style.display = 'none';
        if (docEditSidebar) docEditSidebar.style.display = 'none';
        
        // Reset preview mode buttons
        const btnPreviewMode = document.getElementById('btnPreviewMode');
        const btnEditMode = document.getElementById('btnEditMode');
        if (btnPreviewMode) {
            btnPreviewMode.classList.add('active');
            btnPreviewMode.style.background = '#e2e8f0';
            btnPreviewMode.style.color = 'var(--text-primary)';
        }
        if (btnEditMode) {
            btnEditMode.classList.remove('active');
            btnEditMode.style.background = 'transparent';
            btnEditMode.style.color = 'var(--text-secondary)';
        }
      }
    });
  });

  // 3. Sub-Tab Switching within PRD
  subTabBtns.forEach(tab => {
    tab.addEventListener('click', () => {
      subTabBtns.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const subtabKey = tab.getAttribute('data-subtab');
      prdSubPanes.forEach(pane => {
        pane.style.display = 'none';
      });

      const activePane = document.getElementById(`prdSubtab-${subtabKey}`);
      if (activePane) {
        activePane.style.display = 'block';
      } else {
        // Fallback for subtabs without separate panels
        const overviewPane = document.getElementById('prdSubtab-overview');
        if (overviewPane) overviewPane.style.display = 'block';
      }
    });
  });

  // 4. Download & View Full Feedback
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const currentDoc = activeTitle ? activeTitle.textContent : 'Document';
      const toast = document.getElementById('beautyToast');
      const toastText = document.getElementById('beautyToastText');
      if (toast && toastText) {
        toastText.textContent = `Mengunduh PDF: ${currentDoc}...`;
        toast.style.display = 'inline-flex';
        setTimeout(() => { toast.style.display = 'none'; }, 2200);
      }
    });
  }

  if (viewFullBtn) {
    viewFullBtn.addEventListener('click', () => {
      const currentDoc = activeTitle ? activeTitle.textContent : 'Document';
      const toast = document.getElementById('beautyToast');
      const toastText = document.getElementById('beautyToastText');
      if (toast && toastText) {
        toastText.textContent = `Membuka tampilan penuh: ${currentDoc}`;
        toast.style.display = 'inline-flex';
        setTimeout(() => { toast.style.display = 'none'; }, 2200);
      }
    });
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Handles Project Management Interactivity (Timeline Zoom, Pagination, SDLC phase click)
 */
function initProjectManagementInteractions() {
  // 1. SDLC Stepper clicks
  const stepCards = document.querySelectorAll('.pm-step-card');
  stepCards.forEach(card => {
    card.addEventListener('click', () => {
      stepCards.forEach(c => {
        if (!c.classList.contains('approved')) {
          c.classList.remove('active');
          c.classList.add('pending');
          const badge = c.querySelector('.pm-step-badge');
          if (badge && !c.classList.contains('approved')) {
            badge.className = 'pm-step-badge badge-pending';
            badge.innerHTML = '<span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #94a3b8;"></span><span>Pending</span>';
          }
        }
      });
      
      if (!card.classList.contains('approved')) {
        card.classList.remove('pending');
        card.classList.add('active');
        const badge = card.querySelector('.pm-step-badge');
        if (badge) {
          badge.className = 'pm-step-badge badge-in-progress';
          badge.innerHTML = '<span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: #6366f1;"></span><span>In Progress</span>';
        }
      }
    });
  });

  // 2. Timeline Zoom Controls
  const zoomInBtn = document.getElementById('btnZoomIn');
  const zoomOutBtn = document.getElementById('btnZoomOut');
  const zoomDisplay = document.getElementById('zoomLevelDisplay');
  const ganttTable = document.querySelector('.pm-gantt-table');

  let currentZoom = 100;
  const zoomLevels = [75, 100, 125, 150];

  function setZoom(newZoom) {
    currentZoom = newZoom;
    if (zoomDisplay) zoomDisplay.textContent = `${currentZoom}%`;
    if (ganttTable) {
      ganttTable.style.transformOrigin = 'left top';
      ganttTable.style.minWidth = `${960 * (currentZoom / 100)}px`;
    }
  }

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      const idx = zoomLevels.indexOf(currentZoom);
      if (idx < zoomLevels.length - 1) {
        setZoom(zoomLevels[idx + 1]);
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      const idx = zoomLevels.indexOf(currentZoom);
      if (idx > 0) {
        setZoom(zoomLevels[idx - 1]);
      }
    });
  }

  // 3. Current Sprint Tasks Pagination (Page 1 & 2)
  const btnPrevPage = document.getElementById('btnPrevPage');
  const btnNextPage = document.getElementById('btnNextPage');
  const btnPage1 = document.getElementById('btnPage1');
  const btnPage2 = document.getElementById('btnPage2');
  const tasksTableBody = document.getElementById('sprintTasksTableBody');
  const tasksCountInfo = document.getElementById('tasksPaginationCount');

  const robotSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>';

  const page1HTML = `
    <tr>
      <td><a href="#task-25" class="task-id-link">US-25</a></td>
      <td class="task-name-text">Implement Customer Management Module</td>
      <td><span class="task-status-badge status-progress">[-] In Progress</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">${robotSvg}</span><span>Dev Backend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-high"></span><span>High</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-26" class="task-id-link">US-26</a></td>
      <td class="task-name-text">Create API for Customer Data</td>
      <td><span class="task-status-badge status-done">[x] Done</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">${robotSvg}</span><span>Dev Backend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-medium"></span><span>Medium</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-27" class="task-id-link">US-27</a></td>
      <td class="task-name-text">Build Customer List UI</td>
      <td><span class="task-status-badge status-progress">[-] In Progress</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">${robotSvg}</span><span>Dev Frontend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-high"></span><span>High</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-28" class="task-id-link">US-28</a></td>
      <td class="task-name-text">Customer Detail &amp; Edit UI</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">${robotSvg}</span><span>Dev Frontend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-medium"></span><span>Medium</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-29" class="task-id-link">US-29</a></td>
      <td class="task-name-text">Customer Search &amp; Filter</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">${robotSvg}</span><span>Dev Frontend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-medium"></span><span>Medium</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-30" class="task-id-link">US-30</a></td>
      <td class="task-name-text">Unit Test for Customer Module</td>
      <td><span class="task-status-badge status-blocked">[!] Blocked</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">${robotSvg}</span><span>QA Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-low"></span><span>Low</span></span></td>
    </tr>
  `;

  const page2HTML = `
    <tr>
      <td><a href="#task-31" class="task-id-link">US-31</a></td>
      <td class="task-name-text">Customer Data Export to CSV &amp; PDF</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">${robotSvg}</span><span>Dev Backend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-medium"></span><span>Medium</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-32" class="task-id-link">US-32</a></td>
      <td class="task-name-text">Audit Log &amp; Activity History Tracker</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">${robotSvg}</span><span>Dev Backend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-low"></span><span>Low</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-33" class="task-id-link">US-33</a></td>
      <td class="task-name-text">Role-based Permissions for Sales Manager</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">${robotSvg}</span><span>Dev Backend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-high"></span><span>High</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-34" class="task-id-link">US-34</a></td>
      <td class="task-name-text">Customer Bulk Import Validation Pipeline</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">${robotSvg}</span><span>Dev Backend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-medium"></span><span>Medium</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-35" class="task-id-link">US-35</a></td>
      <td class="task-name-text">Integration E2E Cypress Test Suite</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">${robotSvg}</span><span>QA Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-high"></span><span>High</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-36" class="task-id-link">US-36</a></td>
      <td class="task-name-text">Customer Performance Load Testing (10k RPS)</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">${robotSvg}</span><span>QA Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-medium"></span><span>Medium</span></span></td>
    </tr>
  `;

  let currentPage = 1;

  function renderPage(page) {
    currentPage = page;
    if (page === 1) {
      if (tasksTableBody) tasksTableBody.innerHTML = page1HTML;
      if (tasksCountInfo) tasksCountInfo.textContent = 'Showing 1 to 6 of 12 tasks';
      if (btnPage1) btnPage1.classList.add('active');
      if (btnPage2) btnPage2.classList.remove('active');
    } else {
      if (tasksTableBody) tasksTableBody.innerHTML = page2HTML;
      if (tasksCountInfo) tasksCountInfo.textContent = 'Showing 7 to 12 of 12 tasks';
      if (btnPage2) btnPage2.classList.add('active');
      if (btnPage1) btnPage1.classList.remove('active');
    }
  }

  if (btnPage1) btnPage1.addEventListener('click', () => renderPage(1));
  if (btnPage2) btnPage2.addEventListener('click', () => renderPage(2));
  if (btnPrevPage) btnPrevPage.addEventListener('click', () => { if (currentPage > 1) renderPage(1); });
  if (btnNextPage) btnNextPage.addEventListener('click', () => { if (currentPage < 2) renderPage(2); });
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Handles Tab Switching (Chat/Terminal & Preview/Files/Logs)
 */
function initTabsSwitchers() {
  const tabChat = document.getElementById('tabChat');
  const tabTerminal = document.getElementById('tabTerminal');
  const chatViewContainer = document.getElementById('chatViewContainer');
  const terminalViewContainer = document.getElementById('terminalViewContainer');
  const terminalPromptInput = document.getElementById('terminalPromptInput');

  if (tabChat && tabTerminal) {
    tabChat.addEventListener('click', () => {
      tabChat.classList.add('active');
      tabChat.setAttribute('aria-selected', 'true');
      tabTerminal.classList.remove('active');
      tabTerminal.setAttribute('aria-selected', 'false');

      if (chatViewContainer) {
        chatViewContainer.style.display = 'flex';
        chatViewContainer.classList.add('active');
      }
      if (terminalViewContainer) {
        terminalViewContainer.style.display = 'none';
        terminalViewContainer.classList.remove('active');
      }
    });

    tabTerminal.addEventListener('click', () => {
      tabTerminal.classList.add('active');
      tabTerminal.setAttribute('aria-selected', 'true');
      tabChat.classList.remove('active');
      tabChat.setAttribute('aria-selected', 'false');

      if (chatViewContainer) {
        chatViewContainer.style.display = 'none';
        chatViewContainer.classList.remove('active');
      }
      if (terminalViewContainer) {
        terminalViewContainer.style.display = 'flex';
        terminalViewContainer.classList.add('active');
        if (terminalPromptInput) {
          setTimeout(() => terminalPromptInput.focus(), 60);
        }
      }
    });
  }

  // Right Panel Tabs
  const previewTabs = document.querySelectorAll('.preview-tab-link');
  previewTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      previewTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Handles Interactive Terminal Execution, Shortcuts, and Command Emulation
 */
function initTerminalExecution() {
  const outputBody = document.getElementById('terminalOutputBody');
  const promptInput = document.getElementById('terminalPromptInput');
  const btnSend = document.getElementById('btnTerminalSend');
  const btnClear = document.getElementById('btnTerminalClear');
  const btnRestart = document.getElementById('btnTerminalRestart');
  const pills = document.querySelectorAll('.btn-term-pill');

  if (!outputBody || !promptInput) return;

  const commandHistory = ['npm run dev'];
  let historyIndex = -1;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function scrollToBottom() {
    outputBody.scrollTop = outputBody.scrollHeight;
  }

  function executeCommand(rawCmd) {
    const cmd = (rawCmd || '').trim();
    if (!cmd) return;

    // Track command history
    if (commandHistory[commandHistory.length - 1] !== cmd) {
      commandHistory.push(cmd);
    }
    historyIndex = -1;

    // Handle 'clear' command directly
    if (cmd.toLowerCase() === 'clear') {
      outputBody.innerHTML = '';
      promptInput.value = '';
      return;
    }

    // Build log group
    const logGroup = document.createElement('div');
    logGroup.className = 'term-log-group';

    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-command-line';
    cmdLine.innerHTML = `
      <span class="term-prompt-user">zenith@coba</span><span class="term-prompt-colon">:</span><span class="term-prompt-path">~/projects/coba</span><span class="term-prompt-symbol">$</span>
      <span class="term-cmd-text">${escapeHtml(cmd)}</span>
    `;
    logGroup.appendChild(cmdLine);

    const outLines = document.createElement('div');
    outLines.className = 'term-output-lines';

    const normalized = cmd.toLowerCase().trim();

    if (normalized.startsWith('npm run dev') || normalized === 'npm start') {
      outLines.innerHTML = `
        <div class="term-line info">> coba@1.0.0 dev</div>
        <div class="term-line info">> next dev --port 3000</div>
        <div class="term-line success">▲ Next.js 15.0.0 (Turbopack)</div>
        <div class="term-line success">✓ Local:   http://localhost:3000</div>
        <div class="term-line info">○ Network: http://192.168.1.104:3000</div>
        <div class="term-line muted">Compiled / in 324ms (158 modules)</div>
        <div class="term-line success">✓ Turbopack live reload active on active preview frame</div>
      `;
    } else if (normalized.startsWith('npm run build')) {
      outLines.innerHTML = `
        <div class="term-line info">> coba@1.0.0 build</div>
        <div class="term-line info">> next build</div>
        <div class="term-line info">▲ Next.js 15.0.0</div>
        <div class="term-line success">✓ Creating an optimized production build...</div>
        <div class="term-line success">✓ Compiled successfully in 1.4s</div>
        <div class="term-line info">○ Generating static pages (6/6)</div>
        <div class="term-line success">✓ Final bundle size: 84.2 kB (gzipped)</div>
      `;
    } else if (normalized.startsWith('npm test') || normalized.startsWith('vitest') || normalized.startsWith('jest')) {
      outLines.innerHTML = `
        <div class="term-line info">RUN  v2.1.2 /d/intern/zenit_redesign</div>
        <div class="term-line success">✓ test/components/Header.test.tsx (4 tests)</div>
        <div class="term-line success">✓ test/api/products.test.ts (6 tests)</div>
        <div class="term-line success">✓ test/features/cart.test.ts (5 tests)</div>
        <div class="term-line success">Test Files  3 passed (3)</div>
        <div class="term-line success">Tests       15 passed (15)</div>
        <div class="term-line muted">Duration    480ms (transform 120ms, setup 42ms, collect 80ms, tests 238ms)</div>
      `;
    } else if (normalized === 'git status') {
      outLines.innerHTML = `
        <div class="term-line info">On branch main</div>
        <div class="term-line info">Your branch is up to date with 'origin/main'.</div>
        <div class="term-line warning">Changes not staged for commit:</div>
        <div class="term-line muted">  (use "git add &lt;file&gt;..." to update what will be committed)</div>
        <div class="term-line error">	modified:   app/page.jsx</div>
        <div class="term-line error">	modified:   components/Header.jsx</div>
        <div class="term-line error">	modified:   css/workspace.css</div>
        <div class="term-line success">Untracked files:</div>
        <div class="term-line success">	docs/PRD-v2.md</div>
        <div class="term-line muted">no changes added to commit (use "git add" to stage)</div>
      `;
    } else if (normalized === 'git log' || normalized.startsWith('git log')) {
      outLines.innerHTML = `
        <div class="term-line warning">commit 9c4d18e (HEAD -> main, origin/main)</div>
        <div class="term-line muted">Author: Zenith AI &lt;ai@zenith.engine&gt;</div>
        <div class="term-line muted">Date:   Wed Sep 9 10:18:00 2026 +0700</div>
        <div class="term-line">    feat(terminal): implement interactive terminal view with command runner</div>
        <div class="term-line warning">commit 8a2f7c1</div>
        <div class="term-line muted">Date:   Wed Sep 9 09:50:22 2026 +0700</div>
        <div class="term-line">    feat(preview): retain fixed preview tab hierarchy and breadcrumb toggle</div>
      `;
    } else if (normalized.includes('docker') && (normalized.includes('ps') || normalized.includes('compose'))) {
      outLines.innerHTML = `
        <div class="term-line info">NAME               IMAGE              COMMAND                  SERVICE      STATUS                    PORTS</div>
        <div class="term-line success">coba-web-1         coba-web:latest    "docker-entrypoint.s…"   coba-web     Up 3 hours (healthy)      0.0.0.0:3000->3000/tcp</div>
        <div class="term-line success">coba-postgres-1    postgres:16-alpine "docker-entrypoint.s…"   coba-db      Up 3 hours (healthy)      0.0.0.0:5432->5432/tcp</div>
        <div class="term-line muted">coba-redis-1       redis:7-alpine     "docker-entrypoint.s…"   coba-cache   Up 3 hours                0.0.0.0:6379->6379/tcp</div>
      `;
    } else if (normalized.startsWith('curl')) {
      outLines.innerHTML = `
        <div class="term-line info">HTTP/1.1 200 OK</div>
        <div class="term-line info">Content-Type: application/json; charset=utf-8</div>
        <div class="term-line info">Date: Wed, 09 Sep 2026 03:19:10 GMT</div>
        <div class="term-line json">[</div>
        <div class="term-line json">  { "id": 1, "name": "Rose Hydra Essence Serum", "price": 42.00, "rating": 4.9, "stock": 140 },</div>
        <div class="term-line json">  { "id": 2, "name": "Peptide Renewal Night Cream", "price": 58.00, "rating": 4.8, "stock": 95 },</div>
        <div class="term-line json">  { "id": 3, "name": "Botanical Cleansing Gel Oil", "price": 28.00, "rating": 4.7, "stock": 210 }</div>
        <div class="term-line json">]</div>
      `;
    } else if (normalized === 'help' || normalized === '--help' || normalized === '-h') {
      outLines.innerHTML = `
        <div class="term-line info">⚡ Zenith Workspace Interactive Shell (v2.4.0)</div>
        <div class="term-line muted">Common developer commands:</div>
        <div class="term-line success">  npm run dev          Start Turbopack dev server (port 3000)</div>
        <div class="term-line success">  npm run build        Compile production build</div>
        <div class="term-line success">  npm test             Run test suites</div>
        <div class="term-line success">  git status           Show git working tree status</div>
        <div class="term-line success">  git log              Show recent commits</div>
        <div class="term-line success">  docker compose ps    Check container status</div>
        <div class="term-line success">  curl &lt;url&gt;           Fetch JSON / HTTP API endpoints</div>
        <div class="term-line success">  ls / dir             List project files</div>
        <div class="term-line success">  clear                Clear terminal output</div>
        <div class="term-line info">Any custom command or AI directive can also be entered directly.</div>
      `;
    } else if (normalized === 'ls' || normalized === 'dir' || normalized.startsWith('ls ') || normalized.startsWith('dir ')) {
      outLines.innerHTML = `
        <div class="term-line info">total 48</div>
        <div class="term-line success">drwxr-xr-x   8 zenith staff    256 Sep  9 10:12 app/</div>
        <div class="term-line success">drwxr-xr-x  14 zenith staff    448 Sep  9 10:10 components/</div>
        <div class="term-line success">drwxr-xr-x   4 zenith staff    128 Sep  9 09:30 public/</div>
        <div class="term-line"> -rw-r--r--   1 zenith staff   1420 Sep  9 09:20 package.json</div>
        <div class="term-line"> -rw-r--r--   1 zenith staff    620 Sep  9 09:20 tailwind.config.js</div>
        <div class="term-line"> -rw-r--r--   1 zenith staff    812 Sep  9 09:20 tsconfig.json</div>
        <div class="term-line"> -rw-r--r--   1 zenith staff   3140 Sep  9 09:35 openapi.yaml</div>
      `;
    } else if (normalized === 'whoami') {
      outLines.innerHTML = `<div class="term-line success">zenith (developer agent · session #coba-2026)</div>`;
    } else if (normalized === 'pwd') {
      outLines.innerHTML = `<div class="term-line success">/workspace/projects/coba</div>`;
    } else if (normalized === 'date') {
      outLines.innerHTML = `<div class="term-line info">${new Date().toUTCString()}</div>`;
    } else {
      outLines.innerHTML = `
        <div class="term-line info">[zenith-sh] Executing in container 'coba-runtime': "${escapeHtml(cmd)}"</div>
        <div class="term-line success">✓ Process completed with exit code 0 (elapsed 42ms)</div>
      `;
    }

    logGroup.appendChild(outLines);
    outputBody.appendChild(logGroup);

    promptInput.value = '';
    scrollToBottom();
  }

  // Keyboard navigation on input
  promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(promptInput.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        historyIndex++;
        promptInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        promptInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1;
        promptInput.value = '';
      }
    }
  });

  // Run button click
  if (btnSend) {
    btnSend.addEventListener('click', () => {
      executeCommand(promptInput.value);
      promptInput.focus();
    });
  }

  // Quick suggestion pills click
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd') || pill.textContent.replace(/^[▶🌿🐳🌐🧹\s]+/, '').trim();
      executeCommand(cmd);
      promptInput.focus();
    });
  });

  // Clear button click
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      outputBody.innerHTML = '';
      promptInput.focus();
    });
  }

  // Restart button click
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      outputBody.innerHTML = `
        <div class="terminal-welcome-banner">
          <div class="term-banner-brand">⚡ ZENITH WORKSPACE CLOUD ENVIRONMENT (v2.4.0-linux-x64)</div>
          <div class="term-banner-meta">Container: <span class="term-accent">coba-runtime</span> · Shell: <span class="term-accent">bash 5.2</span> · Node: <span class="term-accent">v20.12.0</span> · Port: <span class="term-accent">3000</span></div>
          <div class="term-banner-note">Session restarted at ${new Date().toLocaleTimeString()}. Type shell commands or AI directives below.</div>
        </div>
      `;
      promptInput.value = '';
      promptInput.focus();
    });
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Handles Chat Input & Suggestion Pills & AI Prototype Builder Simulation
 */
function initChatPromptActions() {
  const textarea = document.getElementById('chatPromptInput');
  const sendBtn = document.getElementById('btnChatSend');
  const pills = document.querySelectorAll('.btn-suggestion-pill');
  const chatCenterBody = document.querySelector('.chat-center-body');

  // Suggestion Pill click fills textarea & can auto-trigger build
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      if (textarea) {
        textarea.value = pill.textContent.trim();
        textarea.focus();
        if (sendBtn) sendBtn.classList.add('active');
      }
    });
  });

  if (textarea && sendBtn) {
    textarea.addEventListener('input', () => {
      if (textarea.value.trim().length > 0) {
        sendBtn.classList.add('active');
      } else {
        sendBtn.classList.remove('active');
      }
    });

    sendBtn.addEventListener('click', () => {
      const msg = textarea.value.trim();
      if (msg.length > 0) {
        submitUserPrompt(msg);
        textarea.value = '';
        sendBtn.classList.remove('active');
      }
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const msg = textarea.value.trim();
        if (msg.length > 0) {
          submitUserPrompt(msg);
          textarea.value = '';
          sendBtn.classList.remove('active');
        }
      }
    });
  }

  function submitUserPrompt(userText) {
    if (!chatCenterBody) return;

    let convContainer = document.getElementById('chatConversationContainer');
    if (!convContainer) {
      // Hide hero spark headline when conversation begins
      const sparkle = chatCenterBody.querySelector('.chat-sparkle-badge');
      const headline = chatCenterBody.querySelector('.chat-hero-headline');
      const desc = chatCenterBody.querySelector('.chat-hero-desc');
      const pillsRow = chatCenterBody.querySelector('.suggestion-pills-row');

      if (sparkle) sparkle.style.display = 'none';
      if (headline) headline.style.display = 'none';
      if (desc) desc.style.display = 'none';
      if (pillsRow) pillsRow.style.display = 'none';

      convContainer = document.createElement('div');
      convContainer.id = 'chatConversationContainer';
      convContainer.className = 'chat-conversation-container';
      chatCenterBody.appendChild(convContainer);
    }

    // Add user bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble-user';
    userBubble.textContent = userText;
    convContainer.appendChild(userBubble);

    // AI Thinking & Building Simulation
    const aiBubble = document.createElement('div');
    aiBubble.className = 'chat-bubble-ai';
    aiBubble.innerHTML = `
      <div class="chat-sender-header" style="display: flex; align-items: center; gap: 0.35rem; font-weight: 700; color: #2563eb;">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        <span>Zenith Assistant</span>
        <span style="font-size: 0.725rem; color: #64748b; font-weight: 500; margin-left: auto;">Claude 3.7 Sonnet</span>
      </div>
      <div>
        Membangun prototype <strong>Toko Kecantikan 'Rose &amp; Petal'</strong> dengan palet warna <em>soft pastel pink</em>, 4 kartu skincare botanical, metrik pesanan, dan keranjang belanja interaktif...
      </div>
      <div class="ai-step-pills">
        <span class="step-pill-done">✓ 3. Live Preview Running</span>
      </div>
    `;
    convContainer.appendChild(aiBubble);

    // Trigger Live Preview automatically
    startLivePreview();
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Starts the live preview and displays the Soft Pastel Pink Beauty Store
 */
function startLivePreview() {
  const emptyCanvas = document.getElementById('previewCanvasEmpty');
  const beautyViewport = document.getElementById('beautyPreviewViewport');
  const statusBadge = document.getElementById('previewStatusBadge') || document.querySelector('.badge-status-running');

  if (emptyCanvas && beautyViewport) {
    emptyCanvas.style.display = 'none';
    beautyViewport.classList.add('active');
    if (statusBadge) {
      statusBadge.textContent = 'RUNNING';
      statusBadge.style.backgroundColor = '#d1fae5';
      statusBadge.style.color = '#059669';
    }
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Handles Live Preview Initial Actions (CTA start buttons)
 */
function initLivePreviewActions() {
  const startBtn = document.getElementById('btnStartLivePreview');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startLivePreview();
      showToastFeedback('Live preview dimulai (Node watch server live)');
    });
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * FEATURE 1: PREVIEW 3-DOTS MORE ACTIONS DROPDOWN (Start, Stop, Restart, Build Image)
 */
function initPreview3DotsMenu() {
  const dotsBtn = document.getElementById('btnPreviewMoreActions');
  const dropdownCard = document.getElementById('prevDotsDropdownCard');
  const menuStart = document.getElementById('menuItemStart');
  const menuStop = document.getElementById('menuItemStop');
  const menuRestart = document.getElementById('menuItemRestart');
  const menuBuildImg = document.getElementById('menuItemBuildImg');
  const emptyCanvas = document.getElementById('previewCanvasEmpty');
  const beautyViewport = document.getElementById('beautyPreviewViewport');
  const statusBadge = document.getElementById('previewStatusBadge');

  if (!dotsBtn || !dropdownCard) return;

  // Toggle Dropdown on click
  dotsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownCard.classList.toggle('show-dropdown');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdownCard.contains(e.target) && e.target !== dotsBtn) {
      dropdownCard.classList.remove('show-dropdown');
    }
  });

  // 1. Start Preview
  if (menuStart) {
    menuStart.addEventListener('click', () => {
      dropdownCard.classList.remove('show-dropdown');
      startLivePreview();
      showToastFeedback('🟢 Live preview berjalan di port 3000');
    });
  }

  // 2. Stop Preview
  if (menuStop) {
    menuStop.addEventListener('click', () => {
      dropdownCard.classList.remove('show-dropdown');
      if (emptyCanvas && beautyViewport) {
        beautyViewport.classList.remove('active');
        emptyCanvas.style.display = 'flex';
        if (statusBadge) {
          statusBadge.textContent = 'STOPPED';
          statusBadge.style.backgroundColor = '#f1f5f9';
          statusBadge.style.color = '#64748b';
        }
      }
      // Hide selection overlay if active
      const overlay = document.getElementById('orcaSelectionOverlay');
      if (overlay) overlay.style.display = 'none';
      showToastFeedback('🔴 Preview dev server dihentikan');
    });
  }

  // 3. Restart Preview
  if (menuRestart) {
    menuRestart.addEventListener('click', () => {
      dropdownCard.classList.remove('show-dropdown');
      if (statusBadge) {
        statusBadge.textContent = 'RESTARTING...';
        statusBadge.style.backgroundColor = '#fef3c7';
        statusBadge.style.color = '#d97706';
      }
      showToastFeedback('🔄 Membersihkan cache & me-restart runtime...');
      setTimeout(() => {
        startLivePreview();
        showToastFeedback('🟢 Preview berhasil di-restart');
      }, 700);
    });
  }

  // 4. Build Image
  if (menuBuildImg) {
    menuBuildImg.addEventListener('click', () => {
      dropdownCard.classList.remove('show-dropdown');
      showToastFeedback('📦 Mengompilasi Docker image zenith/rose-beauty:latest...');
      setTimeout(() => {
        showToastFeedback('✅ Image Docker berhasil di-build (38.4MB)');
      }, 1600);
    });
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * FEATURE 2: PREVIEW WIDE / EXPANDED FULLSCREEN MODE (Inside Website)
 */
function initPreviewWideMode() {
  const btnOpenExt = document.getElementById('btnOpenExt');
  const btnExitWide = document.getElementById('btnExitWidePreview');
  const buildView = document.getElementById('buildViewContainer');
  const secSidebar = document.getElementById('secondarySidebar');
  const reopenTab = document.getElementById('secSidebarReopenTab');

  if (!btnOpenExt || !buildView) return;

  function enterWideMode() {
    buildView.classList.add('preview-expanded-mode');
    if (secSidebar) secSidebar.classList.add('collapsed');
    if (reopenTab) reopenTab.classList.add('visible');
    showToastFeedback('Preview diperluas ke mode layar penuh');
  }

  function exitWideMode() {
    buildView.classList.remove('preview-expanded-mode');
    if (secSidebar) secSidebar.classList.remove('collapsed');
    if (reopenTab) reopenTab.classList.remove('visible');
    showToastFeedback('Tampilan split 2 kolom dikembalikan');
  }

  btnOpenExt.addEventListener('click', (e) => {
    e.preventDefault();
    enterWideMode();
  });

  if (btnExitWide) {
    btnExitWide.addEventListener('click', (e) => {
      e.preventDefault();
      exitWideMode();
    });
  }

  // ESC key exits wide preview
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && buildView.classList.contains('preview-expanded-mode')) {
      exitWideMode();
    }
  });
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * FEATURE: RIGHT FILE EXPLORER SIDEBAR
 * Handles opening, closing, folder toggle (expand/collapse), file click selection,
 * search filter, and collapse-all actions.
 */
function initFileExplorerSidebar() {
  const toggleButtons = document.querySelectorAll('.btn-toggle-file-explorer');
  const sidebar = document.getElementById('fileExplorerSidebar');
  const btnClose = document.getElementById('btnCloseFileExplorer');
  const btnCollapseAll = document.getElementById('btnExplorerCollapseAll');
  const btnRefresh = document.getElementById('btnExplorerRefresh');
  const searchInput = document.getElementById('explorerSearchInput');
  const treeFolders = document.querySelectorAll('.tree-folder');
  const fileItems = document.querySelectorAll('.tree-item.file-item');

  if (!sidebar) return;

  function setSidebarOpen(open) {
    if (open) {
      sidebar.classList.remove('collapsed');
      toggleButtons.forEach(btn => btn.classList.add('active'));
    } else {
      sidebar.classList.add('collapsed');
      toggleButtons.forEach(btn => btn.classList.remove('active'));
    }
  }

  function toggleSidebar() {
    const isCurrentlyCollapsed = sidebar.classList.contains('collapsed');
    setSidebarOpen(isCurrentlyCollapsed);
  }

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleSidebar();
    });
  });

  if (btnClose) {
    btnClose.addEventListener('click', (e) => {
      e.preventDefault();
      setSidebarOpen(false);
    });
  }

  // Folder Expansion / Collapse Toggle
  treeFolders.forEach(folder => {
    const header = folder.querySelector(':scope > .folder-header');
    if (header) {
      header.addEventListener('click', (e) => {
        e.stopPropagation();
        folder.classList.toggle('open');
      });
    }
  });

  // Collapse All Folders
  if (btnCollapseAll) {
    btnCollapseAll.addEventListener('click', (e) => {
      e.preventDefault();
      treeFolders.forEach(f => f.classList.remove('open'));
      showToastFeedback('Semua folder ditutup');
    });
  }

  // Refresh Tree
  if (btnRefresh) {
    btnRefresh.addEventListener('click', (e) => {
      e.preventDefault();
      treeFolders.forEach(f => f.classList.add('open'));
      if (searchInput) searchInput.value = '';
      fileItems.forEach(item => item.style.display = 'flex');
      showToastFeedback('Struktur file diperbarui');
    });
  }

  // File Click Interaction (Opens document tab in Preview panel)
  fileItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const filename = item.getAttribute('data-file') || item.querySelector('.tree-label').textContent.trim();
      if (typeof openDocumentTab === 'function') {
        openDocumentTab(filename);
      }
      showToastFeedback(`File dibuka: ${filename}`);
    });
  });

  // Search Filter Input
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      fileItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
      if (q) {
        // Auto expand all folders when searching
        treeFolders.forEach(f => f.classList.add('open'));
      }
    });
  }

  // =========================================================================
  // OVERFLOW MENU (⋮) & FILE / FOLDER MANAGEMENT (+ New File, + New Folder, + Upload Folder)
  // =========================================================================
  const btnMoreActions = document.getElementById('btnExplorerMoreActions');
  const dropdownMenu = document.getElementById('explorerDropdownMenu');
  const targetDirBadge = document.getElementById('explorerTargetDirBadge');
  const labelNewFileTarget = document.getElementById('labelNewFileTarget');
  const labelNewFolderTarget = document.getElementById('labelNewFolderTarget');
  const menuItemNewFile = document.getElementById('menuItemNewFile');
  const menuItemNewFolder = document.getElementById('menuItemNewFolder');
  const menuItemUploadFolder = document.getElementById('menuItemUploadFolder');
  const folderUploadInput = document.getElementById('explorerFolderUploadInput');

  const creationDialog = document.getElementById('explorerCreationDialog');
  const creationDialogTitle = document.getElementById('creationDialogTitle');
  const creationDialogIcon = document.getElementById('creationDialogIcon');
  const creationDialogLocation = document.getElementById('creationDialogLocation');
  const creationInputName = document.getElementById('creationInputName');
  const btnCancelCreation = document.getElementById('btnCancelCreation');
  const btnCreationCancelAction = document.getElementById('btnCreationCancelAction');
  const btnCreationSubmitAction = document.getElementById('btnCreationSubmitAction');

  let currentTargetDir = ''; // '' represents root 'coba', or e.g. 'app', 'css', 'js'
  let currentTargetFolderEl = null;
  let currentCreationMode = 'file'; // 'file' or 'folder'

  function updateActiveDir(dir, folderEl) {
    currentTargetDir = dir || '';
    currentTargetFolderEl = folderEl || null;

    // Highlight target folder in tree
    document.querySelectorAll('.tree-folder').forEach(f => f.classList.remove('active-target'));
    if (folderEl) {
      folderEl.classList.add('active-target');
    }

    const displayLabel = dir ? `/${dir}` : 'Root';
    if (targetDirBadge) targetDirBadge.textContent = displayLabel;
    if (labelNewFileTarget) labelNewFileTarget.textContent = `Create in ${displayLabel}`;
    if (labelNewFolderTarget) labelNewFolderTarget.textContent = `Create folder in ${displayLabel}`;
    if (creationDialogLocation) creationDialogLocation.textContent = dir ? `/${dir}` : 'Root (coba)';
  }

  // Bind active dir selection on tree folders
  treeFolders.forEach(folder => {
    const header = folder.querySelector(':scope > .folder-header');
    if (header) {
      header.addEventListener('click', () => {
        const folderDir = folder.getAttribute('data-folder') || '';
        updateActiveDir(folderDir, folder);
      });
    }
  });

  // Bind active dir selection on file items
  fileItems.forEach(item => {
    item.addEventListener('click', () => {
      const filePath = item.getAttribute('data-file') || '';
      const fileDir = filePath.includes('/') ? filePath.substring(0, filePath.lastIndexOf('/')) : '';
      const parentFolder = item.closest('.tree-folder');
      updateActiveDir(fileDir, parentFolder);
    });
  });

  // 1. Toggle Overflow Dropdown Menu (⋮)
  if (btnMoreActions && dropdownMenu) {
    btnMoreActions.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isVisible = dropdownMenu.style.display !== 'none';
      dropdownMenu.style.display = isVisible ? 'none' : 'block';
      btnMoreActions.classList.toggle('active', !isVisible);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdownMenu.contains(e.target) && e.target !== btnMoreActions && !btnMoreActions.contains(e.target)) {
        dropdownMenu.style.display = 'none';
        btnMoreActions.classList.remove('active');
      }
    });
  }

  // 2. Open / Close Creation Dialog
  function openCreationDialog(mode) {
    currentCreationMode = mode;
    if (dropdownMenu) dropdownMenu.style.display = 'none';
    if (btnMoreActions) btnMoreActions.classList.remove('active');

    if (creationDialog) {
      creationDialog.style.display = 'block';
      if (mode === 'file') {
        if (creationDialogIcon) creationDialogIcon.textContent = '📄';
        if (creationDialogTitle) creationDialogTitle.textContent = 'New File';
        if (creationInputName) {
          creationInputName.placeholder = 'e.g. MyComponent.jsx';
          creationInputName.value = '';
          setTimeout(() => creationInputName.focus(), 60);
        }
      } else {
        if (creationDialogIcon) creationDialogIcon.textContent = '📁';
        if (creationDialogTitle) creationDialogTitle.textContent = 'New Folder';
        if (creationInputName) {
          creationInputName.placeholder = 'e.g. utils, hooks, services';
          creationInputName.value = '';
          setTimeout(() => creationInputName.focus(), 60);
        }
      }
    }
  }

  function closeCreationDialog() {
    if (creationDialog) creationDialog.style.display = 'none';
    if (creationInputName) creationInputName.value = '';
  }

  if (menuItemNewFile) {
    menuItemNewFile.addEventListener('click', (e) => {
      e.preventDefault();
      openCreationDialog('file');
    });
  }

  if (menuItemNewFolder) {
    menuItemNewFolder.addEventListener('click', (e) => {
      e.preventDefault();
      openCreationDialog('folder');
    });
  }

  if (btnCancelCreation) {
    btnCancelCreation.addEventListener('click', (e) => {
      e.preventDefault();
      closeCreationDialog();
    });
  }

  if (btnCreationCancelAction) {
    btnCreationCancelAction.addEventListener('click', (e) => {
      e.preventDefault();
      closeCreationDialog();
    });
  }

  // 3. Submit New File or Folder
  function handleSubmitCreation() {
    if (!creationInputName) return;
    const rawVal = creationInputName.value.trim();
    if (!rawVal) {
      creationInputName.focus();
      return;
    }

    const treeBody = document.getElementById('explorerTreeBody');
    const targetChildren = currentTargetFolderEl
      ? (currentTargetFolderEl.querySelector(':scope > .tree-children') || currentTargetFolderEl)
      : treeBody;

    if (currentCreationMode === 'file') {
      // === CREATE NEW FILE ===
      const finalName = rawVal.includes('.') ? rawVal : `${rawVal}.jsx`;
      const fullPath = currentTargetDir ? `${currentTargetDir}/${finalName}` : finalName;

      // Determine language & icon
      let lang = 'React JSX';
      let icon = '⚛';
      let starterCode = `// ${fullPath}\n\nexport default function ${finalName.replace(/[^a-zA-Z0-9]/g, '')}() {\n  return (\n    <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">\n      <h2 className="text-lg font-bold text-slate-900">${finalName}</h2>\n      <p className="text-sm text-slate-500 mt-1">Component synthesized via Zenith File Explorer.</p>\n    </div>\n  );\n}\n`;

      if (finalName.endsWith('.css')) {
        lang = 'CSS';
        icon = '🎨';
        starterCode = `/* ${fullPath} */\n.${finalName.replace('.css', '')} {\n  display: block;\n  box-sizing: border-box;\n}\n`;
      } else if (finalName.endsWith('.json')) {
        lang = 'JSON';
        icon = '📦';
        starterCode = `{\n  "name": "${finalName.replace('.json', '')}",\n  "version": "1.0.0"\n}\n`;
      } else if (finalName.endsWith('.md')) {
        lang = 'Markdown';
        icon = '📝';
        starterCode = `# ${finalName}\n\nDocumentation created in Zenith Workspace.\n`;
      } else if (finalName.endsWith('.js')) {
        lang = 'JavaScript';
        icon = '📜';
        starterCode = `// ${fullPath}\nexport function ${finalName.replace(/[^a-zA-Z0-9]/g, '')}() {\n  return true;\n}\n`;
      }

      // Add to database
      FILE_DATABASE[fullPath] = {
        name: finalName,
        dir: currentTargetDir || 'coba',
        path: fullPath,
        lang: lang,
        icon: icon,
        code: starterCode
      };

      // Add to DOM Tree
      if (targetChildren) {
        const newFileEl = document.createElement('div');
        newFileEl.className = 'tree-item file-item';
        newFileEl.setAttribute('data-file', fullPath);
        newFileEl.innerHTML = `
          <span class="file-icon">${icon}</span>
          <span class="tree-label">${finalName}</span>
          <span class="file-meta">Just now</span>
        `;
        newFileEl.addEventListener('click', (e) => {
          e.stopPropagation();
          openDocumentTab(fullPath);
        });

        targetChildren.appendChild(newFileEl);
        if (currentTargetFolderEl) currentTargetFolderEl.classList.add('open');
      }

      closeCreationDialog();
      showToastFeedback(`📄 File '${finalName}' dibuat di ${currentTargetDir ? '/' + currentTargetDir : 'root'}!`);
      openDocumentTab(fullPath);

    } else {
      // === CREATE NEW FOLDER ===
      const folderName = rawVal.replace(/[^a-zA-Z0-9_.-]/g, '');
      if (!folderName) return;

      const fullFolderDir = currentTargetDir ? `${currentTargetDir}/${folderName}` : folderName;

      if (targetChildren) {
        const newFolderEl = document.createElement('div');
        newFolderEl.className = 'tree-folder open';
        newFolderEl.setAttribute('data-folder', fullFolderDir);
        newFolderEl.innerHTML = `
          <div class="tree-item folder-header">
            <span class="tree-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
            <span class="folder-icon">📁</span>
            <span class="tree-label">${folderName}</span>
          </div>
          <div class="tree-children"></div>
        `;

        const header = newFolderEl.querySelector('.folder-header');
        header.addEventListener('click', (e) => {
          e.stopPropagation();
          newFolderEl.classList.toggle('open');
          updateActiveDir(fullFolderDir, newFolderEl);
        });

        targetChildren.appendChild(newFolderEl);
        if (currentTargetFolderEl) currentTargetFolderEl.classList.add('open');
        updateActiveDir(fullFolderDir, newFolderEl);
      }

      closeCreationDialog();
      showToastFeedback(`📁 Folder '${folderName}' dibuat di ${currentTargetDir ? '/' + currentTargetDir : 'root'}!`);
    }
  }

  if (btnCreationSubmitAction) {
    btnCreationSubmitAction.addEventListener('click', (e) => {
      e.preventDefault();
      handleSubmitCreation();
    });
  }

  if (creationInputName) {
    creationInputName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmitCreation();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeCreationDialog();
      }
    });
  }

  // 4. Handle Upload Folder
  if (menuItemUploadFolder && folderUploadInput) {
    menuItemUploadFolder.addEventListener('click', (e) => {
      e.preventDefault();
      if (dropdownMenu) dropdownMenu.style.display = 'none';
      if (btnMoreActions) btnMoreActions.classList.remove('active');
      folderUploadInput.click();
    });

    folderUploadInput.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      let rootFolderName = 'uploaded-folder';
      if (files[0].webkitRelativePath) {
        rootFolderName = files[0].webkitRelativePath.split('/')[0];
      }

      const treeBody = document.getElementById('explorerTreeBody');
      const targetChildren = currentTargetFolderEl
        ? (currentTargetFolderEl.querySelector(':scope > .tree-children') || currentTargetFolderEl)
        : treeBody;

      const fullUploadedDir = currentTargetDir ? `${currentTargetDir}/${rootFolderName}` : rootFolderName;

      const newFolderEl = document.createElement('div');
      newFolderEl.className = 'tree-folder open';
      newFolderEl.setAttribute('data-folder', fullUploadedDir);
      newFolderEl.innerHTML = `
        <div class="tree-item folder-header">
          <span class="tree-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
          <span class="folder-icon">📁</span>
          <span class="tree-label">${rootFolderName}</span>
        </div>
        <div class="tree-children"></div>
      `;

      const header = newFolderEl.querySelector('.folder-header');
      header.addEventListener('click', (ev) => {
        ev.stopPropagation();
        newFolderEl.classList.toggle('open');
        updateActiveDir(fullUploadedDir, newFolderEl);
      });

      const childrenContainer = newFolderEl.querySelector('.tree-children');
      let firstFileToOpen = null;

      for (const file of files) {
        let relativePath = file.webkitRelativePath || `${rootFolderName}/${file.name}`;
        if (currentTargetDir) {
          relativePath = `${currentTargetDir}/${relativePath}`;
        }
        let content = '';
        try {
          content = await file.text();
        } catch (_) {
          content = `// Content for ${file.name}\n`;
        }

        const fileName = file.name;
        const ext = fileName.split('.').pop().toLowerCase();
        const lang = ext === 'jsx' || ext === 'tsx' ? 'React JSX' : (ext === 'css' ? 'CSS' : (ext === 'json' ? 'JSON' : (ext === 'md' ? 'Markdown' : 'JavaScript')));
        const icon = ext === 'jsx' ? '⚛' : (ext === 'css' ? '🎨' : (ext === 'json' ? '📦' : (ext === 'md' ? '📝' : '📜')));

        FILE_DATABASE[relativePath] = {
          name: fileName,
          dir: relativePath.includes('/') ? relativePath.substring(0, relativePath.lastIndexOf('/')) : rootFolderName,
          path: relativePath,
          lang: lang,
          icon: icon,
          code: content || `// ${relativePath}\n`
        };

        const itemEl = document.createElement('div');
        itemEl.className = 'tree-item file-item';
        itemEl.setAttribute('data-file', relativePath);
        itemEl.innerHTML = `
          <span class="file-icon">${icon}</span>
          <span class="tree-label">${fileName}</span>
          <span class="file-meta">${(file.size / 1024).toFixed(1)} KB</span>
        `;
        itemEl.addEventListener('click', (ev) => {
          ev.stopPropagation();
          openDocumentTab(relativePath);
        });

        childrenContainer.appendChild(itemEl);

        if (!firstFileToOpen && (ext === 'jsx' || ext === 'js' || ext === 'css' || ext === 'json')) {
          firstFileToOpen = relativePath;
        }
      }

      if (targetChildren) {
        targetChildren.appendChild(newFolderEl);
        if (currentTargetFolderEl) currentTargetFolderEl.classList.add('open');
      }

      showToastFeedback(`📂 Folder '${rootFolderName}' berhasil diunggah (${files.length} file)!`);

      if (firstFileToOpen) {
        openDocumentTab(firstFileToOpen);
      }

      folderUploadInput.value = '';
    });
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * FEATURE: BOTTOM LOG DRAWER & VERTICAL RESIZING
 * Handles toolbar toggle, vertical drag-to-resize, height toggle, log filters, and clear.
 */
function initPreviewLogDrawer() {
  const btnToggle = document.getElementById('btnToggleLogDrawer');
  const drawer = document.getElementById('previewLogDrawer');
  const btnClose = document.getElementById('btnCloseLogDrawer');
  const btnClear = document.getElementById('btnClearLogs');
  const btnToggleHeight = document.getElementById('btnLogToggleHeight');
  const resizer = document.getElementById('logDrawerResizer');
  const previewPane = document.querySelector('.workspace-preview-pane');
  const filterBtns = document.querySelectorAll('.log-filter-btn');
  const logBody = document.getElementById('logDrawerBody');

  if (!drawer || !btnToggle) return;

  function setDrawerOpen(open) {
    if (open) {
      drawer.classList.add('open');
      btnToggle.classList.add('active');
    } else {
      drawer.classList.remove('open');
      btnToggle.classList.remove('active');
    }
  }

  function toggleDrawer() {
    const isOpen = drawer.classList.contains('open');
    setDrawerOpen(!isOpen);
  }

  btnToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleDrawer();
  });

  if (btnClose) {
    btnClose.addEventListener('click', (e) => {
      e.preventDefault();
      setDrawerOpen(false);
    });
  }

  // Quick Height Toggle (Half vs Expanded)
  if (btnToggleHeight) {
    btnToggleHeight.addEventListener('click', (e) => {
      e.preventDefault();
      if (drawer.classList.contains('expanded-height')) {
        drawer.classList.remove('expanded-height');
        drawer.style.height = '48%';
        btnToggleHeight.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>`;
        btnToggleHeight.title = 'Perluas tinggi panel log';
      } else {
        drawer.classList.add('expanded-height');
        drawer.style.height = '82%';
        btnToggleHeight.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`;
        btnToggleHeight.title = 'Kembalikan setengah layar';
      }
    });
  }

  // Log Filter Pills
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      const logRows = logBody.querySelectorAll('.log-entry');
      logRows.forEach(row => {
        const level = row.getAttribute('data-level');
        if (filter === 'all') {
          row.style.display = 'flex';
        } else if (filter === 'info') {
          row.style.display = (level === 'info' || level === 'vite' || level === 'success') ? 'flex' : 'none';
        } else if (filter === 'warn') {
          row.style.display = (level === 'warn') ? 'flex' : 'none';
        } else if (filter === 'error') {
          row.style.display = (level === 'error') ? 'flex' : 'none';
        }
      });
    });
  });

  // Clear Logs
  if (btnClear) {
    btnClear.addEventListener('click', (e) => {
      e.preventDefault();
      if (logBody) {
        logBody.innerHTML = `
          <div class="log-entry log-cleared">
            <span class="log-time">[${new Date().toLocaleTimeString('en-US', {hour12: false})}]</span>
            <span class="log-msg">Console dibersihkan. Menunggu output runtime berikutnya...</span>
          </div>`;
        showToastFeedback('Log runtime dibersihkan');
      }
    });
  }

  // Drag-to-Resize Logic on Top Resizer Bar
  let isResizing = false;
  let startY = 0;
  let startHeight = 0;

  if (resizer && previewPane) {
    resizer.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isResizing = true;
      startY = e.clientY;
      startHeight = drawer.getBoundingClientRect().height;
      drawer.classList.add('resizing');
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';

      function onMouseMove(e) {
        if (!isResizing) return;
        const deltaY = startY - e.clientY;
        const newHeight = startHeight + deltaY;
        const paneHeight = previewPane.getBoundingClientRect().height;
        const minHeight = 110;
        const maxHeight = paneHeight - 65;

        if (newHeight >= minHeight && newHeight <= maxHeight) {
          drawer.style.height = `${newHeight}px`;
        }
      }

      function onMouseUp() {
        isResizing = false;
        drawer.classList.remove('resizing');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      }

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * ==========================================================================
 * FEATURE: DOCUMENT TABS, CODE EDITOR & BREADCRUMB MANAGER
 * Opens files as tabs alongside Preview, supports syntax highlighting, line numbers,
 * independent tab closing (X), breadcrumb trail, and copy code.
 * ==========================================================================
 */
let currentActiveFilePath = null;

const FILE_DATABASE = {
  'app/page.jsx': {
    name: 'page.jsx',
    dir: 'app',
    path: 'app/page.jsx',
    lang: 'React JSX',
    icon: '⚛',
    code: `import React, { useState } from 'react';
import Header from './components/Header';
import BeautyCard from './components/BeautyCard';
import BagModal from './components/BagModal';

export default function HomePage() {
  const [bag, setBag] = useState([
    { id: 1, name: 'Velvet Rose Mist', price: 149000, quantity: 1 }
  ]);
  const [isBagOpen, setIsBagOpen] = useState(false);

  const products = [
    { id: 1, name: 'Velvet Rose Mist', category: 'SKINCARE', price: 149000, rating: 4.9, reviews: 128 },
    { id: 2, name: 'Silk Petal Serum', category: 'BESTSELLER', price: 219000, rating: 5.0, reviews: 245 },
    { id: 3, name: 'Peony Blossom Dew Lip Oil', category: 'GLOW', price: 98000, rating: 4.9, reviews: 96 }
  ];

  const handleAddToBag = (product) => {
    setBag(prev => [...prev, { ...product, quantity: 1 }]);
    setIsBagOpen(true);
  };

  return (
    <div className="store-container min-h-screen bg-rose-50/30">
      <Header cartCount={bag.length} onOpenCart={() => setIsBagOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="hero-banner rounded-3xl p-10 bg-gradient-to-r from-rose-100 to-pink-50 shadow-sm">
          <span className="text-xs font-bold tracking-widest text-rose-600 uppercase">Botanical Luxury</span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2">Radiance from Pure Petals</h1>
          <p className="text-slate-600 mt-3 max-w-lg">
            Sustainably harvested damask rose essence and cold-pressed botanical oils formulated for glass-skin hydration.
          </p>
        </section>

        {/* Featured Products Grid */}
        <section className="product-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {products.map(product => (
            <BeautyCard key={product.id} product={product} onAdd={handleAddToBag} />
          ))}
        </section>
      </main>

      {isBagOpen && <BagModal items={bag} onClose={() => setIsBagOpen(false)} />}
    </div>
  );
}`
  },
  'app/layout.jsx': {
    name: 'layout.jsx',
    dir: 'app',
    path: 'app/layout.jsx',
    lang: 'React JSX',
    icon: '⚛',
    code: `import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Rose & Petal — Botanical Luxury Beauty',
  description: 'Clean organic beauty and skincare formulated with cold-pressed rose extracts.',
  keywords: ['skincare', 'botanical beauty', 'rose petal', 'organic cosmetics']
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="font-sans antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-[#fbfcfe] text-[#111827] selection:bg-rose-200">
        <div className="app-shell flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}`
  },
  'app/components/Header.jsx': {
    name: 'Header.jsx',
    dir: 'app/components',
    path: 'app/components/Header.jsx',
    lang: 'React JSX',
    icon: '⚛',
    code: `import React from 'react';

export default function Header({ cartCount = 0, onOpenCart }) {
  return (
    <header className="beauty-nav flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur border-b border-rose-100 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🌸</span>
        <div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">Rose &amp; Petal</span>
          <span className="block text-[11px] font-semibold text-rose-500 uppercase tracking-widest">Atelier Paris</span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <a href="#serums" className="hover:text-rose-600 transition-colors">Serums</a>
        <a href="#creams" className="hover:text-rose-600 transition-colors">Creams</a>
        <a href="#lipcare" className="hover:text-rose-600 transition-colors">Lip Care</a>
        <a href="#rituals" className="hover:text-rose-600 transition-colors">Rituals</a>
      </nav>

      <button 
        type="button" 
        onClick={onOpenCart}
        className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-700 font-semibold text-sm hover:bg-rose-100 transition-all"
      >
        <span>👜 Bag</span>
        <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center font-bold">
          {cartCount}
        </span>
      </button>
    </header>
  );
}`
  },
  'app/components/BeautyCard.jsx': {
    name: 'BeautyCard.jsx',
    dir: 'app/components',
    path: 'app/components/BeautyCard.jsx',
    lang: 'React JSX',
    icon: '⚛',
    code: `import React from 'react';

export default function BeautyCard({ product, onAdd }) {
  const formatRupiah = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  return (
    <article className="beauty-card group rounded-2xl bg-white p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <div className="relative aspect-square rounded-xl bg-gradient-to-tr from-rose-50 to-pink-50 flex items-center justify-center text-5xl mb-4 overflow-hidden">
        <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-rose-600 uppercase tracking-wider">
          #{product.category}
        </span>
        <span className="group-hover:scale-110 transition-transform duration-300">
          {product.category === 'SKINCARE' ? '🌹' : product.category === 'BESTSELLER' ? '✨' : '💄'}
        </span>
      </div>

      <h3 className="font-bold text-slate-800 text-base leading-snug group-hover:text-rose-700 transition-colors">
        {product.name}
      </h3>

      <div className="flex items-center gap-1.5 text-xs text-amber-500 mt-1 font-semibold">
        <span>★ {product.rating.toFixed(1)}</span>
        <span className="text-slate-400 font-normal">({product.reviews} ulasan)</span>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
        <span className="font-extrabold text-slate-900 text-base">
          {formatRupiah(product.price)}
        </span>
        <button
          type="button"
          onClick={() => onAdd(product)}
          className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-rose-600 transition-colors"
        >
          + Add to Bag
        </button>
      </div>
    </article>
  );
}`
  },
  'app/components/BagModal.jsx': {
    name: 'BagModal.jsx',
    dir: 'app/components',
    path: 'app/components/BagModal.jsx',
    lang: 'React JSX',
    icon: '⚛',
    code: `import React from 'react';

export default function BagModal({ items = [], onClose }) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full p-6 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b">
          <h2 className="text-lg font-bold text-slate-900">Your Shopping Bag ({items.length})</h2>
          <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 text-slate-500">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border">
              <div>
                <p className="font-semibold text-sm text-slate-800">{item.name}</p>
                <p className="text-xs text-rose-600 font-medium">Rp {item.price.toLocaleString('id-ID')} &times; {item.quantity}</p>
              </div>
              <span className="text-xl">🌸</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t space-y-3">
          <div className="flex justify-between font-bold text-base">
            <span>Subtotal</span>
            <span>Rp {total.toLocaleString('id-ID')}</span>
          </div>
          <button type="button" className="w-full py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200">
            Checkout Securely
          </button>
        </div>
      </div>
    </div>
  );
}`
  },
  'app/globals.css': {
    name: 'globals.css',
    dir: 'app',
    path: 'app/globals.css',
    lang: 'CSS',
    icon: '🎨',
    code: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-rose: #e11d48;
  --bg-atelier: #fbfcfe;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

body {
  font-family: var(--font-body);
  background-color: var(--bg-atelier);
  color: #111827;
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

.beauty-card {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

.beauty-card:hover {
  transform: translateY(-2px);
}`
  },
  'css/tokens.css': {
    name: 'tokens.css',
    dir: 'css',
    path: 'css/tokens.css',
    lang: 'CSS',
    icon: '🎨',
    code: `:root {
  --zenith-primary: #2d5584;
  --zenith-primary-hover: #39689e;
  --zenith-primary-active: #224166;
  --zenith-primary-light: #f0f4f9;
  --bg-app: #fbfcfe;
  --bg-surface: #ffffff;
  --text-primary: #111827;
  --text-muted: #64748b;
  --font-sans: 'Plus Jakarta Sans', 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}`
  },
  'package.json': {
    name: 'package.json',
    dir: 'coba',
    path: 'package.json',
    lang: 'JSON',
    icon: '📦',
    code: `{
  "name": "zenith-coba-project",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "^15.0.0",
    "lucide-react": "^0.460.0",
    "tailwindcss": "^3.4.1"
  }
}`
  },
  'lib/api-spec/openapi.yaml': {
    name: 'openapi.yaml',
    dir: 'lib/api-spec',
    path: 'lib/api-spec/openapi.yaml',
    lang: 'YAML',
    icon: '📜',
    code: `openapi: 3.0.3
info:
  title: Zenith Coba - Rose & Petal API Spec
  version: 1.0.0
  description: OpenAPI REST contracts for luxury cosmetics shopping bag and product catalog.
servers:
  - url: http://localhost:3000/api
    description: Local Dev Server
paths:
  /products:
    get:
      summary: Retrieve skincare formulation catalog
      operationId: getProducts
      parameters:
        - name: category
          in: query
          required: false
          schema:
            type: string
            example: HYDRATION
      responses:
        '200':
          description: Successful retrieval
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Product'
  /bag/items:
    post:
      summary: Add skincare item to bag
      operationId: addToBag
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                productId:
                  type: integer
                  example: 1
                quantity:
                  type: integer
                  default: 1
      responses:
        '201':
          description: Item added successfully
components:
  schemas:
    Product:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        price:
          type: integer
        rating:
          type: number
`
  },
  'README.md': {
    name: 'README.md',
    dir: 'coba',
    path: 'README.md',
    lang: 'Markdown',
    icon: '📝',
    code: `# Zenith Coba — Rose & Petal Atelier 🌸

Full-stack luxury e-commerce prototype synthesized with **Next.js 15 & React 19**.

## Features
- ✨ Glassmorphic luxury beauty catalog
- 🛍️ Dynamic interactive shopping bag store
- 📦 PostgreSQL Compose backend integration
- 🚀 Real-time Vite HMR development watcher

## Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the live preview.
`
  }
};

/**
 * Formats raw code with HTML syntax highlighting tokens (Single-pass tokenization)
 */
function formatCodeWithSyntax(rawCode, lang) {
  const escaped = rawCode
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (lang === 'React JSX' || lang === 'JavaScript') {
    const tokenRegex = /(\/\/[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b(?:import|export|default|function|const|let|var|return|from|if|else|new|class|extends|async|await)\b)|(\b(?:useState|useEffect|useMemo|useCallback|useRef)\b)|(&lt;\/?[A-Z][a-zA-Z0-9]*)|(&lt;\/?[a-z][a-z0-9-]*)|(\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*=))|(\b\d+\b)/g;

    return escaped.replace(tokenRegex, (match, comment, str, keyword, hook, comp, tag, attr, num) => {
      if (comment) return `<span class="syn-comment">${comment}</span>`;
      if (str) return `<span class="syn-string">${str}</span>`;
      if (keyword) return `<span class="syn-keyword">${keyword}</span>`;
      if (hook) return `<span class="syn-fn">${hook}</span>`;
      if (comp) return `<span class="syn-component">${comp}</span>`;
      if (tag) return `<span class="syn-tag">${tag}</span>`;
      if (attr) return `<span class="syn-attr">${attr}</span>`;
      if (num) return `<span class="syn-num">${num}</span>`;
      return match;
    });
  } else if (lang === 'CSS') {
    const tokenRegex = /(\/\*[\s\S]*?\*\/)|(@[a-zA-Z-]+)|(--[a-zA-Z0-9-]+(?=\s*:))|([a-zA-Z-]+(?=\s*:))|(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+(?:px|rem|em|%|ms|s)?\b)/g;

    return escaped.replace(tokenRegex, (match, comment, atRule, cssVar, prop, val, num) => {
      if (comment) return `<span class="syn-comment">${comment}</span>`;
      if (atRule) return `<span class="syn-keyword">${atRule}</span>`;
      if (cssVar) return `<span class="syn-attr">${cssVar}</span>`;
      if (prop) return `<span class="syn-keyword">${prop}</span>`;
      if (val) return `<span class="syn-string">${val}</span>`;
      if (num) return `<span class="syn-num">${num}</span>`;
      return match;
    });
  } else if (lang === 'JSON') {
    const tokenRegex = /("(?:\\.|[^"\\])*"(?=\s*:))|("(?:\\.|[^"\\])*")|(\b(?:true|false|null)\b)|(\b\d+\b)/g;

    return escaped.replace(tokenRegex, (match, key, str, bool, num) => {
      if (key) return `<span class="syn-attr">${key}</span>`;
      if (str) return `<span class="syn-string">${str}</span>`;
      if (bool) return `<span class="syn-keyword">${bool}</span>`;
      if (num) return `<span class="syn-num">${num}</span>`;
      return match;
    });
  } else if (lang === 'YAML' || lang === 'OpenAPI YAML') {
    return escaped
      .replace(/(#[^\n]*)/g, '<span class="syn-comment">$1</span>')
      .replace(/^([ \t]*[a-zA-Z0-9_-]+:)/gm, '<span class="syn-attr">$1</span>')
      .replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, '<span class="syn-string">$1</span>')
      .replace(/\b(true|false|null)\b/g, '<span class="syn-keyword">$1</span>');
  } else {
    // Markdown
    return escaped
      .replace(/^(#+ [^\n]+)/gm, '<span class="syn-keyword">$1</span>')
      .replace(/(`[^`]+`)/g, '<span class="syn-string">$1</span>')
      .replace(/(\*\*[^*]+\*\*)/g, '<span class="syn-fn">$1</span>');
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Renders dynamic breadcrumb trail based on active file path
 * e.g. app > components > Header.jsx or lib > api-spec > openapi.yaml
 */
function renderBreadcrumb(filePath) {
  const bcTrail = document.getElementById('bcTrail');
  if (!bcTrail) return;

  const fileData = FILE_DATABASE[filePath] || {
    name: filePath.split('/').pop(),
    lang: filePath.endsWith('.jsx') ? 'React JSX' : (filePath.endsWith('.yaml') || filePath.endsWith('.yml') ? 'YAML' : 'JavaScript'),
    icon: filePath.endsWith('.jsx') ? '⚛' : (filePath.endsWith('.yaml') || filePath.endsWith('.yml') ? '📜' : (filePath.endsWith('.css') ? '🎨' : '📄'))
  };

  const segments = filePath.split('/');
  const fileName = segments[segments.length - 1];
  const dirSegments = segments.slice(0, segments.length - 1);

  let html = '';
  dirSegments.forEach((seg) => {
    html += `<span class="bc-item bc-dir">${seg}</span>`;
    html += `<span class="bc-sep">&gt;</span>`;
  });

  html += `
    <span class="bc-item bc-file">
      <span class="bc-file-icon">${fileData.icon || '📄'}</span>
      <span class="bc-file-name">${fileName}</span>
    </span>
  `;

  bcTrail.innerHTML = html;

  const bcLangPill = document.getElementById('bcLangPill');
  if (bcLangPill) {
    bcLangPill.textContent = fileData.lang || 'React JSX';
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Opens a file as a document tab alongside the fixed Preview tab.
 */
function openDocumentTab(filePath) {
  const tabsGroup = document.getElementById('previewTabsGroup');
  if (!tabsGroup) return;

  if (filePath === 'preview') {
    activateDocument('preview');
    return;
  }

  const fileData = FILE_DATABASE[filePath] || {
    name: filePath.split('/').pop(),
    dir: filePath.includes('/') ? filePath.substring(0, filePath.lastIndexOf('/')) : 'coba',
    path: filePath,
    lang: filePath.endsWith('.jsx') ? 'React JSX' : (filePath.endsWith('.yaml') || filePath.endsWith('.yml') ? 'YAML' : (filePath.endsWith('.css') ? 'CSS' : (filePath.endsWith('.json') ? 'JSON' : 'JavaScript'))),
    icon: filePath.endsWith('.jsx') ? '⚛' : (filePath.endsWith('.yaml') || filePath.endsWith('.yml') ? '📜' : (filePath.endsWith('.css') ? '🎨' : (filePath.endsWith('.js') ? '📜' : '📄'))),
    code: `// File: ${filePath}\n// Synthesized module by Zenith AI\n\nexport default function Module() {\n  return <div>Module ${filePath} loaded</div>;\n}`
  };

  // Check if tab is already opened
  let existingTab = tabsGroup.querySelector(`.doc-tab[data-file="${filePath}"]`);
  if (!existingTab) {
    const newTab = document.createElement('a');
    newTab.className = 'preview-tab-link doc-tab';
    newTab.setAttribute('href', '#');
    newTab.setAttribute('data-file', filePath);
    newTab.setAttribute('role', 'tab');
    newTab.setAttribute('title', filePath);
    newTab.innerHTML = `
      <span class="doc-tab-icon">${fileData.icon}</span>
      <span class="doc-tab-title">${fileData.name}</span>
      <button type="button" class="doc-tab-close-btn" title="Close ${fileData.name}">&times;</button>
    `;

    // Click tab activates this file
    newTab.addEventListener('click', (e) => {
      e.preventDefault();
      activateDocument(filePath);
    });

    // Close button
    const closeBtn = newTab.querySelector('.doc-tab-close-btn');
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeDocumentTab(filePath);
    });

    tabsGroup.appendChild(newTab);
  }

  // Activate the document tab
  activateDocument(filePath);
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Activates a tab (either the fixed Preview tab or an open document tab).
 * - When Preview tab is active: Toolbar is visible, breadcrumb is hidden, live preview is shown.
 * - When a file tab is active: Toolbar is hidden, breadcrumb is visible, code editor is shown.
 */
function activateDocument(filePath) {
  const tabsGroup = document.getElementById('previewTabsGroup');
  const tabPreview = document.getElementById('tabPreview');
  const toolbar = document.getElementById('previewActionsToolbar');
  const breadcrumb = document.getElementById('editorBreadcrumbBar');
  const beautyViewport = document.getElementById('beautyPreviewViewport');
  const emptyCanvas = document.getElementById('previewCanvasEmpty');
  const codeViewport = document.getElementById('codeEditorViewport');
  const lineNumbers = document.getElementById('editorLineNumbers');
  const codeContent = document.getElementById('editorCodeContent');
  const statusLines = document.getElementById('editorStatusLines');
  const statusType = document.getElementById('editorStatusType');
  const fileTreeItems = document.querySelectorAll('.tree-item.file-item');
  const logDrawer = document.getElementById('previewLogDrawer');

  if (!tabsGroup) return;

  if (!filePath || filePath === 'preview') {
    // === SWITCH TO LIVE PREVIEW TAB ===
    currentActiveFilePath = 'preview';

    // 1. Update tabs: Preview active, document tabs inactive
    const allTabs = tabsGroup.querySelectorAll('.preview-tab-link');
    allTabs.forEach(t => t.classList.remove('active'));
    if (tabPreview) tabPreview.classList.add('active');

    // 2. Toolbar is SHOWN, breadcrumb is HIDDEN
    if (toolbar) toolbar.style.display = 'flex';
    if (breadcrumb) breadcrumb.style.display = 'none';

    // 3. Code editor is HIDDEN, Live preview is SHOWN
    if (codeViewport) {
      codeViewport.style.display = 'none';
      codeViewport.classList.remove('active');
    }
    if (emptyCanvas) {
      emptyCanvas.style.display = 'none';
    }
    if (beautyViewport) {
      beautyViewport.style.display = 'flex';
      beautyViewport.classList.add('active');
    }
    if (logDrawer) {
      logDrawer.style.display = 'flex';
    }

    // 4. File tree selection cleared
    fileTreeItems.forEach(i => i.classList.remove('active'));
    return;
  }

  // === SWITCH TO DOCUMENT FILE TAB ===
  currentActiveFilePath = filePath;

  const fileData = FILE_DATABASE[filePath] || {
    name: filePath.split('/').pop(),
    dir: filePath.includes('/') ? filePath.substring(0, filePath.lastIndexOf('/')) : 'coba',
    path: filePath,
    lang: filePath.endsWith('.jsx') ? 'React JSX' : (filePath.endsWith('.yaml') || filePath.endsWith('.yml') ? 'YAML' : (filePath.endsWith('.css') ? 'CSS' : (filePath.endsWith('.json') ? 'JSON' : 'JavaScript'))),
    icon: filePath.endsWith('.jsx') ? '⚛' : (filePath.endsWith('.yaml') || filePath.endsWith('.yml') ? '📜' : (filePath.endsWith('.css') ? '🎨' : (filePath.endsWith('.js') ? '📜' : '📄'))),
    code: `// File: ${filePath}\n// Synthesized module by Zenith AI\n\nexport default function Module() {\n  return <div>Module ${filePath} loaded</div>;\n}`
  };

  // 1. Update tabs: file tab active, Preview tab inactive
  const allTabs = tabsGroup.querySelectorAll('.preview-tab-link');
  allTabs.forEach(t => t.classList.remove('active'));
  const activeTab = tabsGroup.querySelector(`.doc-tab[data-file="${filePath}"]`);
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
  }

  // 2. Toolbar is HIDDEN, breadcrumb is SHOWN
  if (toolbar) toolbar.style.display = 'none';
  if (breadcrumb) breadcrumb.style.display = 'flex';

  // 3. Live preview is HIDDEN, Code editor is SHOWN
  if (beautyViewport) {
    beautyViewport.style.display = 'none';
    beautyViewport.classList.remove('active');
  }
  if (emptyCanvas) {
    emptyCanvas.style.display = 'none';
  }
  if (codeViewport) {
    codeViewport.style.display = 'flex';
    codeViewport.classList.add('active');
  }
  if (logDrawer) {
    logDrawer.style.display = 'none';
  }

  // 4. Render dynamic breadcrumb (e.g. app > components > Header.jsx or lib > api-spec > openapi.yaml)
  renderBreadcrumb(filePath);

  // 5. Populate code and line numbers
  const lines = fileData.code.split('\n');
  if (lineNumbers) {
    lineNumbers.innerHTML = lines.map((_, idx) => `<span>${idx + 1}</span>`).join('');
  }
  if (codeContent) {
    codeContent.innerHTML = formatCodeWithSyntax(fileData.code, fileData.lang);
  }
  if (statusLines) {
    statusLines.textContent = `${lines.length} lines`;
  }
  if (statusType) {
    statusType.textContent = fileData.lang;
  }

  // 6. Highlight corresponding file in the tree
  fileTreeItems.forEach(item => {
    const itemFile = item.getAttribute('data-file');
    if (itemFile === filePath) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Closes an open document tab independently.
 * If active tab is closed, activates adjacent tab or reverts to Preview tab.
 */
function closeDocumentTab(filePath) {
  const tabsGroup = document.getElementById('previewTabsGroup');
  if (!tabsGroup) return;

  const tabToClose = tabsGroup.querySelector(`.doc-tab[data-file="${filePath}"]`);
  if (!tabToClose) return;

  const wasActive = tabToClose.classList.contains('active');
  const prevSibling = tabToClose.previousElementSibling;
  const nextSibling = tabToClose.nextElementSibling;

  tabToClose.remove();

  if (wasActive) {
    if (nextSibling && nextSibling.classList.contains('doc-tab')) {
      const nextFile = nextSibling.getAttribute('data-file');
      activateDocument(nextFile);
    } else if (prevSibling && prevSibling.classList.contains('doc-tab')) {
      const prevFile = prevSibling.getAttribute('data-file');
      activateDocument(prevFile);
    } else {
      // Revert to Preview tab
      activateDocument('preview');
    }
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Initializes Document Tabs Manager & Clipboard Copy
 */
function initDocumentTabsManager() {
  const tabPreview = document.getElementById('tabPreview');
  const btnCopy = document.getElementById('btnCopyEditorCode');

  if (tabPreview) {
    tabPreview.addEventListener('click', (e) => {
      e.preventDefault();
      activateDocument('preview');
    });
  }

  // Pre-open demo file (page.jsx) as a document tab alongside Preview
  openDocumentTab('app/page.jsx');

  if (btnCopy) {
    btnCopy.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentActiveFilePath && FILE_DATABASE[currentActiveFilePath]) {
        navigator.clipboard.writeText(FILE_DATABASE[currentActiveFilePath].code).then(() => {
          showToastFeedback(`📋 Kode '${FILE_DATABASE[currentActiveFilePath].name}' disalin ke clipboard!`);
        }).catch(() => {
          showToastFeedback(`📋 Kode disalin ke clipboard!`);
        });
      }
    });
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * FEATURE 3: ORCA & CANVA VISUAL BUILDER (Direct in-line editing & Drag-and-drop to Chat)
 */
function initOrcaCanvaVisualEditor() {
  const interactiveEls = document.querySelectorAll('.orca-interactive-el');
  const editableTexts = document.querySelectorAll('.orca-editable-text');
  const overlay = document.getElementById('orcaSelectionOverlay');
  const tagBadge = document.getElementById('orcaTagBadge');
  const btnEditText = document.getElementById('orcaBtnEditText');
  const btnSendToChat = document.getElementById('orcaBtnSendToChat');
  const dragHandle = document.getElementById('orcaDragHandle');
  const chatInputCard = document.getElementById('chatInputBoxCard');
  const chatTextarea = document.getElementById('chatPromptInput');
  const beautyViewport = document.getElementById('beautyPreviewViewport');

  let selectedElement = null;

  // 1. Element Selection & Floating Overlay
  function positionOverlay(el) {
    if (!overlay || !beautyViewport) return;
    const vpRect = beautyViewport.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const top = elRect.top - vpRect.top + beautyViewport.scrollTop;
    const left = elRect.left - vpRect.left + beautyViewport.scrollLeft;

    overlay.style.top = `${top}px`;
    overlay.style.left = `${left}px`;
    overlay.style.width = `${elRect.width}px`;
    overlay.style.height = `${elRect.height}px`;
    overlay.style.display = 'block';

    const compName = el.getAttribute('data-component-name') || el.tagName.toLowerCase();
    const compTag = el.getAttribute('data-orca-component') || '';
    if (tagBadge) {
      tagBadge.textContent = `<${el.tagName.toLowerCase()}.${compTag}> ${compName}`;
    }
  }

  interactiveEls.forEach(el => {
    el.addEventListener('click', (e) => {
      // Don't select if clicking a button inside unless specifically targeted
      if (e.target.closest('.btn-add-bag')) return;
      
      interactiveEls.forEach(item => item.classList.remove('orca-selected'));
      el.classList.add('orca-selected');
      selectedElement = el;
      positionOverlay(el);
    });

    // Native Drag and Drop from Element
    el.addEventListener('dragstart', (e) => {
      const compName = el.getAttribute('data-component-name') || 'Komponen';
      const price = el.getAttribute('data-price') || '';
      const textSample = el.querySelector('h4, h2, span, p')?.textContent?.trim() || '';

      const dragPayload = {
        name: compName,
        price: price,
        text: textSample,
        tag: el.getAttribute('data-orca-component') || 'element'
      };

      e.dataTransfer.setData('text/plain', JSON.stringify(dragPayload));
      e.dataTransfer.effectAllowed = 'copyMove';

      if (chatInputCard) chatInputCard.classList.add('drag-target-active');
    });

    el.addEventListener('dragend', () => {
      if (chatInputCard) chatInputCard.classList.remove('drag-target-active');
    });
  });

  // Reposition overlay on scroll
  if (beautyViewport) {
    beautyViewport.addEventListener('scroll', () => {
      if (selectedElement && overlay && overlay.style.display === 'block') {
        positionOverlay(selectedElement);
      }
    });
  }

  // 2. Direct In-Line Text Editing (Canva concept)
  editableTexts.forEach(textEl => {
    textEl.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      enableInlineEdit(textEl);
    });
  });

  function enableInlineEdit(textEl) {
    textEl.setAttribute('contenteditable', 'true');
    textEl.focus();

    // Place cursor at the end
    const range = document.createRange();
    range.selectNodeContents(textEl);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    showToastFeedback('✏️ Mode Edit Aktif — Ubah teks lalu tekan Enter');

    function saveInlineEdit() {
      textEl.removeAttribute('contenteditable');
      textEl.removeEventListener('blur', saveInlineEdit);
      textEl.removeEventListener('keydown', handleKey);
      showToastFeedback('🌸 Perubahan teks berhasil disimpan!');
      if (selectedElement) positionOverlay(selectedElement);
    }

    function handleKey(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        saveInlineEdit();
      }
    }

    textEl.addEventListener('blur', saveInlineEdit);
    textEl.addEventListener('keydown', handleKey);
  }

  if (btnEditText) {
    btnEditText.addEventListener('click', (e) => {
      e.stopPropagation();
      if (selectedElement) {
        const firstEditable = selectedElement.querySelector('.orca-editable-text') || selectedElement;
        enableInlineEdit(firstEditable);
      }
    });
  }

  // 3. Send Reference to AI Chat Button
  if (btnSendToChat) {
    btnSendToChat.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!selectedElement || !chatTextarea) return;
      const compName = selectedElement.getAttribute('data-component-name') || 'Komponen';
      const price = selectedElement.getAttribute('data-price') || '';
      const textContent = selectedElement.querySelector('h4, h2, p')?.textContent?.trim() || '';

      appendComponentRefToChat({
        name: compName,
        price: price,
        text: textContent
      });
    });
  }

  // 4. Drag Handle from Overlay
  if (dragHandle) {
    dragHandle.addEventListener('dragstart', (e) => {
      if (!selectedElement) return;
      const compName = selectedElement.getAttribute('data-component-name') || 'Komponen';
      const price = selectedElement.getAttribute('data-price') || '';
      const textSample = selectedElement.querySelector('h4, h2, span, p')?.textContent?.trim() || '';

      const dragPayload = {
        name: compName,
        price: price,
        text: textSample,
        tag: selectedElement.getAttribute('data-orca-component') || 'element'
      };

      e.dataTransfer.setData('text/plain', JSON.stringify(dragPayload));
      e.dataTransfer.effectAllowed = 'copyMove';

      if (chatInputCard) chatInputCard.classList.add('drag-target-active');
    });

    dragHandle.addEventListener('dragend', () => {
      if (chatInputCard) chatInputCard.classList.remove('drag-target-active');
    });
  }

  // 5. Chat Input Drop Zone Handlers
  if (chatInputCard) {
    chatInputCard.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      chatInputCard.classList.add('drag-target-active');
    });

    chatInputCard.addEventListener('dragleave', () => {
      chatInputCard.classList.remove('drag-target-active');
    });

    chatInputCard.addEventListener('drop', (e) => {
      e.preventDefault();
      chatInputCard.classList.remove('drag-target-active');

      try {
        const rawData = e.dataTransfer.getData('text/plain');
        if (rawData) {
          const data = JSON.parse(rawData);
          appendComponentRefToChat(data);
        }
      } catch (err) {
        // Fallback for raw text
        const rawText = e.dataTransfer.getData('text/plain');
        if (rawText && chatTextarea) {
          chatTextarea.value = `${chatTextarea.value} ${rawText}`.trim();
          chatTextarea.focus();
        }
      }
    });
  }

  function appendComponentRefToChat(data) {
    if (!chatTextarea) return;
    const priceStr = data.price ? ` (${data.price})` : '';
    const textSnippet = data.text ? ` - "${data.text.substring(0, 35)}..."` : '';
    const refTag = `[Target: ${data.name}${priceStr}${textSnippet}]`;

    if (!chatTextarea.value.includes(refTag)) {
      chatTextarea.value = chatTextarea.value
        ? `${chatTextarea.value}\n${refTag} Tolong ubah styling dan sesuaikan layout komponen ini: `
        : `${refTag} Tolong ubah styling dan sesuaikan layout komponen ini: `;
    }

    chatTextarea.focus();
    const sendBtn = document.getElementById('btnChatSend');
    if (sendBtn) sendBtn.classList.add('active');

    showToastFeedback(`🎯 Elemen '${data.name}' dilampirkan ke AI prompt!`);
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Helper to show toast messages
 */
function showToastFeedback(msg) {
  const toast = document.getElementById('beautyToast');
  const toastText = document.getElementById('beautyToastText');
  if (toast && toastText) {
    toastText.textContent = msg;
    toast.style.display = 'inline-flex';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.display = 'none';
    }, 2400);
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * FEATURE 4: KNOWLEDGE & REUSABLE CONTEXT VAULT CONTROLLER
 */
const VAULT_STORAGE_KEY = 'zenith_context_vault_docs';

const DEFAULT_VAULT_DOCS = [
  {
    id: 'doc-prd-1',
    name: 'PRD-Skincare-Commerce-v2.2.pdf',
    ext: 'pdf',
    size: '245 KB',
    sizeBytes: 250880,
    tag: 'Specification',
    date: 'Today, 10:30',
    usageCount: 5,
    status: 'Ready for AI',
    content: `[PRD Document: Rose & Petal Botanical Beauty eCommerce]\nVersion: 2.2\nStatus: Approved\n\n1. Product Vision: Pure botanical skincare brand targeting young adults with pastel aesthetic.\n2. Core Features: Interactive Product Catalog, Realtime Shopping Bag with Toast notifications, 4 Featured Formulas (Petal Drops, Rose Velvet Cleanser, Sakura Night Elixir, Peony Lip Oil).\n3. Pricing Architecture: IDR currency standardization with unit price tags ranging from Rp 98.000 to Rp 235.000.\n4. Design Tokens: Base palette Soft Pastel Pink (#fff5f7, #fce7f3, #ec4899, #831843).`
  },
  {
    id: 'doc-schema-2',
    name: 'Beauty_Catalog_Schema.json',
    ext: 'json',
    size: '48 KB',
    sizeBytes: 49152,
    tag: 'Data Schema',
    date: 'Yesterday',
    usageCount: 3,
    status: 'Ready for AI',
    content: `{\n  "$schema": "http://json-schema.org/draft-07/schema#",\n  "title": "ProductCatalog",\n  "type": "object",\n  "properties": {\n    "catalog_id": { "type": "string" },\n    "currency": { "type": "string", "default": "IDR" },\n    "items": {\n      "type": "array",\n      "items": {\n        "type": "object",\n        "properties": {\n          "sku": { "type": "string" },\n          "name": { "type": "string" },\n          "price": { "type": "number" },\n          "category": { "type": "string" }\n        }\n      }\n    }\n  }\n}`
  },
  {
    id: 'doc-brand-3',
    name: 'Brand_Guidelines_Pink_Pastel.pdf',
    ext: 'pdf',
    size: '1.1 MB',
    sizeBytes: 1153433,
    tag: 'Brand & UI',
    date: '3 days ago',
    usageCount: 8,
    status: 'Ready for AI',
    content: `[Brand Design Guidelines: Rose & Petal]\nPrimary Tone: Botanical Warm Pastel\nTypography: Plus Jakarta Sans / Inter\nPrimary Accent: Rose Magenta #ec4899\nDark Header Text: Wine Slate #831843\nSurface Background: Rosewater Mist #fff5f7\nCard Shadows: 0 4px 14px rgba(244, 114, 182, 0.12)`
  },
  {
    id: 'doc-brd-4',
    name: 'Business_Requirements_BRD.docx',
    ext: 'docx',
    size: '180 KB',
    sizeBytes: 184320,
    tag: 'Requirements',
    date: 'Last week',
    usageCount: 2,
    status: 'Ready for AI',
    content: `[Business Requirements Document: Zenith Pad Commerce]\nAuthor: Business Analyst Agent\nKey Objectives:\n- Increase conversion by 25% with 1-click add to cart.\n- Provide real-time stock verification.\n- Multi-channel export for marketing assets.`
  }
];

let activeSelectedDocIds = [];

function loadVaultDocs() {
  try {
    const raw = localStorage.getItem(VAULT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(DEFAULT_VAULT_DOCS));
      return DEFAULT_VAULT_DOCS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_VAULT_DOCS;
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

function saveVaultDocs(docs) {
  try {
    localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(docs));
  } catch (e) {
    console.error('Error saving vault docs to localStorage:', e);
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

function initContextVault() {
  const uploadCtaBtn = document.getElementById('btnVaultUploadCta');
  const fileInput = document.getElementById('vaultFileInput');
  const browseLink = document.getElementById('btnBrowseVaultLink');
  const dropzone = document.getElementById('vaultDropzone');
  const tableBody = document.getElementById('vaultDocsTableBody');
  const searchInput = document.getElementById('vaultSearchInput');
  const filterBtns = document.querySelectorAll('.vault-filter-btn');
  const selectAllChk = document.getElementById('chkVaultSelectAll');

  // Preview Modal Elements
  const previewModal = document.getElementById('docQuickPreviewModalBackdrop');
  const previewCloseBtn = document.getElementById('btnDocPreviewClose');
  const previewTitle = document.getElementById('previewModalDocTitle');
  const previewMeta = document.getElementById('previewModalDocMeta');
  const previewTextBlock = document.getElementById('docPreviewTextBlock');
  const btnCopyRef = document.getElementById('btnCopyDocRefFromModal');
  const btnAttachDirect = document.getElementById('btnAttachDirectFromModal');

  let currentPreviewDoc = null;
  let currentFilter = 'all';

  function renderTable() {
    if (!tableBody) return;
    const docs = loadVaultDocs();
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = docs.filter(doc => {
      const matchSearch = doc.name.toLowerCase().includes(query) || doc.tag.toLowerCase().includes(query);
      if (!matchSearch) return false;
      if (currentFilter === 'all') return true;
      if (currentFilter === 'pdf') return doc.ext === 'pdf';
      if (currentFilter === 'json') return doc.ext === 'json' || doc.ext === 'yaml';
      if (currentFilter === 'doc') return doc.ext === 'docx' || doc.tag.toLowerCase().includes('requirement');
      return true;
    });

    tableBody.innerHTML = '';

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 2rem; color: #94a3b8;">
            Tidak ada dokumen yang sesuai dengan pencarian.
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(doc => {
      const tr = document.createElement('tr');
      const isChecked = activeSelectedDocIds.includes(doc.id);

      tr.innerHTML = `
        <td><input type="checkbox" class="chk-vault-doc" data-id="${doc.id}" ${isChecked ? 'checked' : ''} /></td>
        <td>
          <div class="doc-name-cell">
            <span class="doc-format-icon ${doc.ext}">${doc.ext.toUpperCase()}</span>
            <span>${doc.name}</span>
          </div>
        </td>
        <td><span class="vault-tag-pill">${doc.tag}</span></td>
        <td>${doc.size}</td>
        <td style="color: #64748b;">${doc.date}</td>
        <td><span style="font-weight: 600; color: #2d5584;">${doc.usageCount} builds</span></td>
        <td><span class="vault-status-pill ready">● ${doc.status}</span></td>
        <td>
          <div class="vault-actions-group">
            <button type="button" class="btn-vault-action btn-action-preview" data-id="${doc.id}" title="Preview text">👁️ View</button>
            <button type="button" class="btn-vault-action btn-action-copy" data-name="${doc.name}" title="Copy reference tag">🔗 Ref</button>
            <button type="button" class="btn-vault-action btn-action-attach" data-id="${doc.id}" title="Attach to Active Build">➕ Attach</button>
            <button type="button" class="btn-vault-action btn-action-delete" data-id="${doc.id}" title="Delete document">🗑️</button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    updateCounters(docs);
    attachTableEventListeners();
  }

  function updateCounters(docs) {
    const totalDocsEl = document.getElementById('statTotalDocs');
    const activeDocsEl = document.getElementById('statActiveDocs');
    const storageUsedEl = document.getElementById('statStorageUsed');
    const navBadge = document.getElementById('secNavVaultBadge');
    const countFilterAll = document.getElementById('countFilterAll');

    if (totalDocsEl) totalDocsEl.textContent = `${docs.length} Files`;
    if (activeDocsEl) activeDocsEl.textContent = `${activeSelectedDocIds.length} Selected`;
    if (navBadge) navBadge.textContent = docs.length;
    if (countFilterAll) countFilterAll.textContent = docs.length;

    // Calculate approx storage
    const totalBytes = docs.reduce((acc, d) => acc + (d.sizeBytes || 102400), 0);
    const mb = (totalBytes / (1024 * 1024)).toFixed(2);
    if (storageUsedEl) storageUsedEl.textContent = `${mb} MB`;
  }

  function attachTableEventListeners() {
    // Checkbox toggling
    document.querySelectorAll('.chk-vault-doc').forEach(chk => {
      chk.addEventListener('change', () => {
        const id = chk.getAttribute('data-id');
        if (chk.checked) {
          if (!activeSelectedDocIds.includes(id)) activeSelectedDocIds.push(id);
        } else {
          activeSelectedDocIds = activeSelectedDocIds.filter(item => item !== id);
        }
        syncAttachedContextChips();
      });
    });

    // Preview
    document.querySelectorAll('.btn-action-preview').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const docs = loadVaultDocs();
        const doc = docs.find(d => d.id === id);
        if (doc) openDocPreviewModal(doc);
      });
    });

    // Copy ref
    document.querySelectorAll('.btn-action-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        navigator.clipboard?.writeText(`@context:${name}`);
        showToastFeedback(`📋 Reference tag '@context:${name}' disalin!`);
      });
    });

    // Attach directly
    document.querySelectorAll('.btn-action-attach').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (!activeSelectedDocIds.includes(id)) {
          activeSelectedDocIds.push(id);
        }
        syncAttachedContextChips();
        renderTable();
        showToastFeedback('📄 Dokumen dilampirkan ke sesi Build!');
      });
    });

    // Delete
    document.querySelectorAll('.btn-action-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        let docs = loadVaultDocs();
        const doc = docs.find(d => d.id === id);
        if (confirm(`Hapus dokumen "${doc?.name || 'ini'}" dari Context Vault?`)) {
          docs = docs.filter(d => d.id !== id);
          activeSelectedDocIds = activeSelectedDocIds.filter(item => item !== id);
          saveVaultDocs(docs);
          syncAttachedContextChips();
          renderTable();
          showToastFeedback('🗑️ Dokumen dihapus dari vault.');
        }
      });
    });
  }

  function openDocPreviewModal(doc) {
    if (!previewModal) return;
    currentPreviewDoc = doc;
    if (previewTitle) previewTitle.textContent = doc.name;
    if (previewMeta) previewMeta.textContent = `Size: ${doc.size} · Tag: ${doc.tag} · Uploaded ${doc.date}`;
    if (previewTextBlock) previewTextBlock.textContent = doc.content || `[No preview text content available for ${doc.name}]`;
    previewModal.classList.add('active');
  }

  function closeDocPreviewModal() {
    if (previewModal) previewModal.classList.remove('active');
  }

  if (previewCloseBtn) previewCloseBtn.addEventListener('click', closeDocPreviewModal);
  if (previewModal) {
    previewModal.addEventListener('click', (e) => {
      if (e.target === previewModal) closeDocPreviewModal();
    });
  }

  if (btnCopyRef) {
    btnCopyRef.addEventListener('click', () => {
      if (currentPreviewDoc) {
        navigator.clipboard?.writeText(`@context:${currentPreviewDoc.name}`);
        showToastFeedback(`📋 Tag '@context:${currentPreviewDoc.name}' disalin!`);
      }
    });
  }

  if (btnAttachDirect) {
    btnAttachDirect.addEventListener('click', () => {
      if (currentPreviewDoc) {
        if (!activeSelectedDocIds.includes(currentPreviewDoc.id)) {
          activeSelectedDocIds.push(currentPreviewDoc.id);
        }
        syncAttachedContextChips();
        renderTable();
        closeDocPreviewModal();
        showToastFeedback(`📄 '${currentPreviewDoc.name}' dilampirkan ke Build!`);
      }
    });
  }

  // Upload Handlers (CTA & File Input)
  if (uploadCtaBtn && fileInput) {
    uploadCtaBtn.addEventListener('click', () => fileInput.click());
  }
  if (browseLink && fileInput) {
    browseLink.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleUploadedFiles(Array.from(e.target.files));
        fileInput.value = '';
      }
    });
  }

  // Dropzone Drag & Drop
  if (dropzone) {
    dropzone.addEventListener('click', () => {
      if (fileInput) fileInput.click();
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('drag-over');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleUploadedFiles(Array.from(e.dataTransfer.files));
      }
    });
  }

  function handleUploadedFiles(files) {
    let docs = loadVaultDocs();
    let processedCount = 0;

    files.forEach(file => {
      const ext = file.name.split('.').pop().toLowerCase() || 'txt';
      const sizeKB = (file.size / 1024).toFixed(0);
      const sizeStr = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${sizeKB} KB`;

      let tag = 'Document';
      if (ext === 'pdf') tag = 'Specification';
      else if (ext === 'json' || ext === 'yaml' || ext === 'yml') tag = 'Data Schema';
      else if (ext === 'docx') tag = 'Requirements';
      else if (ext === 'md') tag = 'Guides';

      const newDoc = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        ext: ext,
        size: sizeStr,
        sizeBytes: file.size,
        tag: tag,
        date: 'Baru saja',
        usageCount: 1,
        status: 'Ready for AI',
        content: `[Content of uploaded file: ${file.name}]\nSize: ${sizeStr}\nFormat: ${ext.toUpperCase()}\nStatus: Processed & Indexed in Zenith Context Vault.`
      };

      // Read text if text/json/md
      if (file.type.includes('text') || ext === 'json' || ext === 'md' || ext === 'csv' || ext === 'yaml') {
        const reader = new FileReader();
        reader.onload = (event) => {
          newDoc.content = event.target.result || newDoc.content;
          docs.unshift(newDoc);
          processedCount++;
          if (processedCount === files.length) {
            saveVaultDocs(docs);
            renderTable();
            showToastFeedback(`✅ ${files.length} dokumen berhasil di-upload dan disimpan di Vault!`);
          }
        };
        reader.readAsText(file);
      } else {
        docs.unshift(newDoc);
        processedCount++;
        if (processedCount === files.length) {
          saveVaultDocs(docs);
          renderTable();
          showToastFeedback(`✅ ${files.length} dokumen berhasil di-upload dan disimpan di Vault!`);
        }
      }
    });
  }

  // Search & Filter
  if (searchInput) {
    searchInput.addEventListener('input', renderTable);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      renderTable();
    });
  });

  if (selectAllChk) {
    selectAllChk.addEventListener('change', () => {
      const docs = loadVaultDocs();
      if (selectAllChk.checked) {
        activeSelectedDocIds = docs.map(d => d.id);
      } else {
        activeSelectedDocIds = [];
      }
      syncAttachedContextChips();
      renderTable();
    });
  }

  // Initial render
  renderTable();
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * FEATURE 5: CONTEXT SELECTOR MODAL & ATTACHED CONTEXT CHIPS (For Chat Build)
 */
function initContextSelectorModal() {
  const btnAddContext = document.getElementById('btnAddContext');
  const modalBackdrop = document.getElementById('contextSelectModalBackdrop');
  const closeBtn = document.getElementById('btnContextModalClose');
  const cancelBtn = document.getElementById('btnCancelContextModal');
  const applyBtn = document.getElementById('btnApplyContextModal');
  const checklistContainer = document.getElementById('contextDocsChecklist');
  const searchInput = document.getElementById('contextModalSearchInput');
  const selectedCountText = document.getElementById('modalSelectedCountText');
  const btnApplyCount = document.getElementById('btnModalApplyCount');
  const quickUploadBtn = document.getElementById('btnQuickUploadModal');
  const clearAllBtn = document.getElementById('btnClearAllContext');

  let modalTempSelectedIds = [];

  function openModal() {
    if (!modalBackdrop) return;
    modalTempSelectedIds = [...activeSelectedDocIds];
    renderChecklist();
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderChecklist() {
    if (!checklistContainer) return;
    const docs = loadVaultDocs();
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = docs.filter(d => d.name.toLowerCase().includes(query) || d.tag.toLowerCase().includes(query));

    checklistContainer.innerHTML = '';

    if (filtered.length === 0) {
      checklistContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #94a3b8;">
          Tidak ada dokumen ditemukan. Klik "+ Upload New" untuk menambahkan.
        </div>
      `;
      return;
    }

    filtered.forEach(doc => {
      const isSelected = modalTempSelectedIds.includes(doc.id);
      const item = document.createElement('div');
      item.className = `context-check-item ${isSelected ? 'selected' : ''}`;
      item.innerHTML = `
        <input type="checkbox" data-id="${doc.id}" ${isSelected ? 'checked' : ''} />
        <span class="doc-format-icon ${doc.ext}">${doc.ext.toUpperCase()}</span>
        <div class="context-item-info">
          <span class="context-item-name">${doc.name}</span>
          <div class="context-item-meta">
            <span>${doc.tag}</span> · <span>${doc.size}</span>
            <span class="context-token-pill">~${Math.round((doc.sizeBytes || 50000) / 40)} tokens</span>
          </div>
        </div>
      `;

      item.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() !== 'input') {
          const chk = item.querySelector('input[type="checkbox"]');
          chk.checked = !chk.checked;
        }
        const chk = item.querySelector('input[type="checkbox"]');
        if (chk.checked) {
          if (!modalTempSelectedIds.includes(doc.id)) modalTempSelectedIds.push(doc.id);
          item.classList.add('selected');
        } else {
          modalTempSelectedIds = modalTempSelectedIds.filter(id => id !== doc.id);
          item.classList.remove('selected');
        }
        updateModalSelectionText();
      });

      checklistContainer.appendChild(item);
    });

    updateModalSelectionText();
  }

  function updateModalSelectionText() {
    if (selectedCountText) {
      selectedCountText.textContent = `${modalTempSelectedIds.length} documents selected`;
    }
    if (btnApplyCount) {
      btnApplyCount.textContent = modalTempSelectedIds.length;
    }
  }

  if (btnAddContext) {
    btnAddContext.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      activeSelectedDocIds = [...modalTempSelectedIds];
      syncAttachedContextChips();
      closeModal();
      showToastFeedback(`🎯 ${activeSelectedDocIds.length} dokumen dilampirkan sebagai konteks prompt AI!`);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', renderChecklist);
  }

  // Quick upload inside modal
  if (quickUploadBtn) {
    quickUploadBtn.addEventListener('click', () => {
      const fileInput = document.getElementById('vaultFileInput');
      if (fileInput) fileInput.click();
    });
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      activeSelectedDocIds = [];
      syncAttachedContextChips();
      showToastFeedback('Semua konteks aktif dibersihkan.');
    });
  }

  // Sync on startup with first 2 docs as active sample
  activeSelectedDocIds = ['doc-prd-1', 'doc-schema-2'];
  syncAttachedContextChips();
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Synchronizes context chips above textarea and counter badges
 */
function syncAttachedContextChips() {
  const bar = document.getElementById('attachedContextBar');
  const wrapper = document.getElementById('attachedChipsWrapper');
  const countText = document.getElementById('contextCountText');
  const statActiveDocs = document.getElementById('statActiveDocs');
  const docs = loadVaultDocs();

  if (!wrapper || !countText) return;

  const selectedDocs = docs.filter(d => activeSelectedDocIds.includes(d.id));

  if (selectedDocs.length > 0) {
    if (bar) bar.style.display = 'flex';
    countText.textContent = `${selectedDocs.length} files`;
    countText.style.color = '#2d5584';
    countText.style.fontWeight = '700';

    wrapper.innerHTML = '';
    selectedDocs.forEach(doc => {
      const chip = document.createElement('div');
      chip.className = 'context-chip-item';
      chip.innerHTML = `
        <span class="chip-icon">📄</span>
        <span>${doc.name}</span>
        <button type="button" class="btn-remove-chip" data-id="${doc.id}" title="Remove context">✕</button>
      `;

      chip.querySelector('.btn-remove-chip').addEventListener('click', (e) => {
        e.stopPropagation();
        activeSelectedDocIds = activeSelectedDocIds.filter(id => id !== doc.id);
        syncAttachedContextChips();
        // Update vault table if open
        const chk = document.querySelector(`.chk-vault-doc[data-id="${doc.id}"]`);
        if (chk) chk.checked = false;
        showToastFeedback(`Konteks '${doc.name}' dilepas.`);
      });

      wrapper.appendChild(chip);
    });
  } else {
    if (bar) bar.style.display = 'none';
    countText.textContent = '0 files';
    countText.style.color = '#94a3b8';
    countText.style.fontWeight = '500';
    wrapper.innerHTML = '';
  }

  if (statActiveDocs) {
    statActiveDocs.textContent = `${selectedDocs.length} Selected`;
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Handles Beauty Store Shopping Bag & Toast Interactions
 */
function initBeautyStoreInteractions() {
  const addBagButtons = document.querySelectorAll('.btn-add-bag');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const toast = document.getElementById('beautyToast');
  const toastText = document.getElementById('beautyToastText');

  let cartCount = 3;

  addBagButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const product = btn.getAttribute('data-product') || 'Produk';
      cartCount++;
      if (cartCountBadge) cartCountBadge.textContent = cartCount;

      if (toast && toastText) {
        toastText.textContent = `Ditambahkan: ${product}`;
        toast.style.display = 'inline-flex';
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
          toast.style.display = 'none';
        }, 2200);
      }
    });
  });
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Handles Hover / Click Popover for Agent Robot Icon beside Terminal
 */
function initAgentPopover() {
  const container = document.getElementById('agentPopoverContainer');
  const triggerBtn = document.getElementById('btnAgentRobotPopover');
  const popoverCard = document.getElementById('agentPopoverCard');
  const openStudioBtn = document.getElementById('btnOpenAgentStudioModalFromPopover');
  const agentItems = document.querySelectorAll('.agent-popover-item');

  if (!container || !triggerBtn || !popoverCard) return;

  // Toggle on click
  triggerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    container.classList.toggle('show-popover');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      container.classList.remove('show-popover');
    }
  });

  // Open full Agent Studio page from popover button
  if (openStudioBtn) {
    openStudioBtn.addEventListener('click', (e) => {
      e.preventDefault();
      container.classList.remove('show-popover');
      window.location.href = 'agent-studio.html';
    });
  }

  // Switch active agent on click
  agentItems.forEach(item => {
    item.addEventListener('click', () => {
      agentItems.forEach(i => {
        i.classList.remove('active');
        const check = i.querySelector('.agent-active-check');
        if (check) check.remove();
      });

      item.classList.add('active');
      const checkSpan = document.createElement('span');
      checkSpan.className = 'agent-active-check';
      checkSpan.textContent = '✓';
      item.appendChild(checkSpan);
    });
  });
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

/**
 * Handles collapsing and expanding the right Preview Pane.
 */
function initPreviewCloseToggle() {
  const btnClosePreview = document.getElementById('btnClosePreview');
  const btnOpenPreview = document.getElementById('btnOpenPreview');
  const previewPane = document.getElementById('workspacePreviewPane');
  const collapsedBar = document.getElementById('previewCollapsedBar');

  if (btnClosePreview && previewPane && collapsedBar) {
    btnClosePreview.addEventListener('click', () => {
      previewPane.classList.add('collapsed');
      collapsedBar.style.display = 'flex';
    });
  }

  if (btnOpenPreview && previewPane && collapsedBar) {
    btnOpenPreview.addEventListener('click', () => {
      previewPane.classList.remove('collapsed');
      collapsedBar.style.display = 'none';
    });
  }
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}

