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
  initChatPromptActions();
  initLivePreviewActions();
  initPreview3DotsMenu();
  initPreviewWideMode();
  initOrcaCanvaVisualEditor();
  initAgentPopover();
  initBeautyStoreInteractions();
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
    } else {
      // Default to Project Management
      if (pmView) pmView.classList.add('active');
      if (btnManagement) btnManagement.classList.add('active');
      window.location.hash = '#project-management';
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
    if (hash === '#build') {
      switchView('build');
    } else if (hash === '#document') {
      switchView('document');
    } else if (hash === '#deployment') {
      switchView('deployment');
    } else if (hash === '#context-vault') {
      switchView('context-vault');
    } else if (hash === '#project-management') {
      switchView('project-management');
    }
  }

  applyHashView();
  window.addEventListener('hashchange', applyHashView);
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
}

/**
 * Handles Tab Switching (Chat/Terminal & Preview/Files/Logs)
 */
function initTabsSwitchers() {
  const tabChat = document.getElementById('tabChat');
  const tabTerminal = document.getElementById('tabTerminal');

  if (tabChat && tabTerminal) {
    tabChat.addEventListener('click', () => {
      tabChat.classList.add('active');
      tabChat.setAttribute('aria-selected', 'true');
      tabTerminal.classList.remove('active');
      tabTerminal.setAttribute('aria-selected', 'false');
    });

    tabTerminal.addEventListener('click', () => {
      tabTerminal.classList.add('active');
      tabTerminal.setAttribute('aria-selected', 'true');
      tabChat.classList.remove('active');
      tabChat.setAttribute('aria-selected', 'false');
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
}

function saveVaultDocs(docs) {
  try {
    localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(docs));
  } catch (e) {
    console.error('Error saving vault docs to localStorage:', e);
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
}
