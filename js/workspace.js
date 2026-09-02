/**
 * Zenith AI - Multi-level Workspace Interactions & Live Beauty Preview
 */

document.addEventListener('DOMContentLoaded', () => {
  initWorkspaceViewSwitcher();
  initProjectManagementInteractions();
  initDocumentsExplorer();
  initDeploymentDashboard();
  initTabsSwitchers();
  initChatPromptActions();
  initLivePreviewActions();
  initAgentPopover();
  initBeautyStoreInteractions();
});

/**
 * Handles switching between Build View, Project Management View, Documents View, and Deployment View
 */
function initWorkspaceViewSwitcher() {
  const btnBuild = document.getElementById('secNavBuild');
  const btnManagement = document.getElementById('secNavManagement');
  const btnDocument = document.getElementById('secNavDocument');
  const btnDeployment = document.getElementById('secNavDeployment');
  const buildView = document.getElementById('buildViewContainer');
  const pmView = document.getElementById('pmViewContainer');
  const docView = document.getElementById('docViewContainer');
  const deployView = document.getElementById('deployViewContainer');
  const secNavItems = document.querySelectorAll('.sec-nav-item');

  function switchView(targetView) {
    secNavItems.forEach(item => item.classList.remove('active'));
    if (buildView) buildView.classList.remove('active');
    if (pmView) pmView.classList.remove('active');
    if (docView) docView.classList.remove('active');
    if (deployView) deployView.classList.remove('active');

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

  // Handle URL Hash on Initial Load & Hash changes
  function applyHashView() {
    const hash = window.location.hash;
    if (hash === '#build') {
      switchView('build');
    } else if (hash === '#document') {
      switchView('document');
    } else if (hash === '#deployment') {
      switchView('deployment');
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
      showToast('🚀 Memulai pipeline deployment baru #dep-8922...');

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
        appendLog('SUCCESS', '🎉 Deployment #dep-8922 is LIVE! Healthcheck HTTP 200 OK.', 'log-tag-success');
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>Trigger Deployment</span>
        `;
        showToast('✅ Deployment #dep-8922 berhasil dan live di Production!');
      }, 3800);
    });
  }

  // Quick Action Buttons
  if (promoteBtn) {
    promoteBtn.addEventListener('click', () => {
      showToast('🚀 Mempromosikan Staging v1.5.0-rc2 ke Production...');
      appendLog('PROMOTE', 'Promoting staging build (v1.5.0-rc2) to Production cluster...', 'log-tag-info');
    });
  }

  if (redeployProdBtn) {
    redeployProdBtn.addEventListener('click', () => {
      showToast('🔄 Memulai redeploy Production v1.4.2...');
      appendLog('REDEPLOY', 'Restarting container pods for Production (v1.4.2)...', 'log-tag-info');
    });
  }

  rollbackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const depId = btn.getAttribute('data-id') || 'dep';
      showToast(`⏪ Memulai rollback ke versi #${depId}...`);
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
      showToast('📥 Mengunduh file runtime-logs.txt...');
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

  const page1HTML = `
    <tr>
      <td><a href="#task-25" class="task-id-link">US-25</a></td>
      <td class="task-name-text">Implement Customer Management Module</td>
      <td><span class="task-status-badge status-progress">[-] In Progress</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">🤖</span><span>Dev Backend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-high"></span><span>High</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-26" class="task-id-link">US-26</a></td>
      <td class="task-name-text">Create API for Customer Data</td>
      <td><span class="task-status-badge status-done">[x] Done</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">🤖</span><span>Dev Backend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-medium"></span><span>Medium</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-27" class="task-id-link">US-27</a></td>
      <td class="task-name-text">Build Customer List UI</td>
      <td><span class="task-status-badge status-progress">[-] In Progress</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">🤖</span><span>Dev Frontend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-high"></span><span>High</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-28" class="task-id-link">US-28</a></td>
      <td class="task-name-text">Customer Detail &amp; Edit UI</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">🤖</span><span>Dev Frontend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-medium"></span><span>Medium</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-29" class="task-id-link">US-29</a></td>
      <td class="task-name-text">Customer Search &amp; Filter</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">🤖</span><span>Dev Frontend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-medium"></span><span>Medium</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-30" class="task-id-link">US-30</a></td>
      <td class="task-name-text">Unit Test for Customer Module</td>
      <td><span class="task-status-badge status-blocked">[!] Blocked</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">🤖</span><span>QA Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-low"></span><span>Low</span></span></td>
    </tr>
  `;

  const page2HTML = `
    <tr>
      <td><a href="#task-31" class="task-id-link">US-31</a></td>
      <td class="task-name-text">Customer Data Export to CSV &amp; PDF</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">🤖</span><span>Dev Backend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-medium"></span><span>Medium</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-32" class="task-id-link">US-32</a></td>
      <td class="task-name-text">Audit Log &amp; Activity History Tracker</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">🤖</span><span>Dev Backend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-low"></span><span>Low</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-33" class="task-id-link">US-33</a></td>
      <td class="task-name-text">Role-based Permissions for Sales Manager</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">🤖</span><span>Dev Backend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-high"></span><span>High</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-34" class="task-id-link">US-34</a></td>
      <td class="task-name-text">Customer Bulk Import Validation Pipeline</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">🤖</span><span>Dev Backend Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-medium"></span><span>Medium</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-35" class="task-id-link">US-35</a></td>
      <td class="task-name-text">Integration E2E Cypress Test Suite</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">🤖</span><span>QA Agent</span></span></td>
      <td><span class="priority-indicator"><span class="priority-dot dot-high"></span><span>High</span></span></td>
    </tr>
    <tr>
      <td><a href="#task-36" class="task-id-link">US-36</a></td>
      <td class="task-name-text">Customer Performance Load Testing (10k RPS)</td>
      <td><span class="task-status-badge status-todo">[ ] To Do</span></td>
      <td><span class="agent-pill-info"><span class="agent-icon-circle">🤖</span><span>QA Agent</span></span></td>
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
      <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; color: #2563eb;">
        <span>⚡ Zenith Assistant</span>
        <span style="font-size: 0.725rem; color: #64748b; font-weight: 500;">Claude 3.7 Sonnet</span>
      </div>
      <div>
        Membangun prototype <strong>Toko Kecantikan 'Rose &amp; Petal'</strong> dengan palet warna <em>soft pastel pink</em>, 4 kartu skincare botanical, metrik pesanan, dan keranjang belanja interaktif...
      </div>
      <div class="ai-step-pills">
        <span class="step-pill-done">✓ 1. Design Tokens Generated</span>
        <span class="step-pill-done">✓ 2. Soft Pastel Components Ready</span>
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
  const statusBadge = document.querySelector('.badge-status-running');

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
 * Handles Live Preview Toolbar Actions (Start, Stop, Restart)
 */
function initLivePreviewActions() {
  const startBtn = document.getElementById('btnStartLivePreview');
  const startToolBtn = document.getElementById('btnStartPrevTool');
  const stopToolBtn = document.getElementById('btnStopTool');
  const restartToolBtn = document.getElementById('btnRestartTool');
  const emptyCanvas = document.getElementById('previewCanvasEmpty');
  const beautyViewport = document.getElementById('beautyPreviewViewport');
  const statusBadge = document.querySelector('.badge-status-running');

  function handleStart() {
    startLivePreview();
  }

  function handleStop() {
    if (emptyCanvas && beautyViewport) {
      beautyViewport.classList.remove('active');
      emptyCanvas.style.display = 'flex';
      if (statusBadge) {
        statusBadge.textContent = 'STOPPED';
        statusBadge.style.backgroundColor = '#f1f5f9';
        statusBadge.style.color = '#64748b';
      }
    }
  }

  function handleRestart() {
    if (statusBadge) {
      statusBadge.textContent = 'RESTARTING...';
      statusBadge.style.backgroundColor = '#fef3c7';
      statusBadge.style.color = '#d97706';
    }
    setTimeout(() => {
      startLivePreview();
    }, 600);
  }

  if (startBtn) startBtn.addEventListener('click', handleStart);
  if (startToolBtn) startToolBtn.addEventListener('click', handleStart);
  if (stopToolBtn) stopToolBtn.addEventListener('click', handleStop);
  if (restartToolBtn) restartToolBtn.addEventListener('click', handleRestart);
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

  // Open full Agent Studio modal from popover button
  if (openStudioBtn) {
    openStudioBtn.addEventListener('click', (e) => {
      e.preventDefault();
      container.classList.remove('show-popover');
      const agentModal = document.getElementById('agentStudioModalBackdrop');
      if (agentModal) {
        agentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
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
