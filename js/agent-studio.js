/**
 * Zenith AI - Agent Studio Controller (Secondary Sidebar & Multi-View Navigation)
 */

document.addEventListener('DOMContentLoaded', () => {
  try { initTestAgentPage(); } catch (e) { console.warn('initTestAgentPage error:', e); }
  try { initStudioViewSwitcher(); } catch (e) { console.warn('initStudioViewSwitcher error:', e); }
  try { initAgentFiltersAndSearch(); } catch (e) { console.warn('initAgentFiltersAndSearch error:', e); }
  try { initTestRunDrawer(); } catch (e) { console.warn('initTestRunDrawer error:', e); }
  try { initCreateAgentModal(); } catch (e) { console.warn('initCreateAgentModal error:', e); }
  try { initWorkflowAndToolActions(); } catch (e) { console.error('initWorkflowAndToolActions error:', e); }
});

/**
 * Handles switching between Agent Studio Sub-views via Secondary Sidebar
 */
function initStudioViewSwitcher() {
  const navItems = document.querySelectorAll('.studio-sec-nav-item');
  const panes = document.querySelectorAll('.studio-pane-section');
  const breadcrumbSub = document.getElementById('studioCrumbSub');

  const viewTitles = {
    agents: 'Agents',
    workflows: 'Workflows',
    tools: 'Tools & Sandboxes',
    knowledge: 'Knowledge Bases',
    deployments: 'Deployments',
    telemetry: 'Telemetry & Traces',
    evals: 'Evaluations & Tests',
    settings: 'Studio Settings',
    'workflow-detail': 'Workflow Builder'
  };

  function switchView(target) {
    if (!target) target = 'agents';

    // Update secondary nav active state
    navItems.forEach(item => {
      const matchView = (target === 'workflow-detail') ? 'workflows' : target;
      if (item.getAttribute('data-view') === matchView) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update view panes
    panes.forEach(pane => {
      if (pane.id === `pane-${target}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Update breadcrumb
    if (breadcrumbSub && viewTitles[target]) {
      breadcrumbSub.textContent = viewTitles[target];
    }

    // Update URL hash
    window.location.hash = `#${target}`;
  }

  // Click handlers for secondary nav items
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = item.getAttribute('data-view');
      switchView(targetView);
    });
  });

  // Recent agent links click handler
  const recentAgentItems = document.querySelectorAll('.sec-agent-recent-item');
  recentAgentItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const agentName = item.getAttribute('data-agent') || 'Zenith BA Architect';
      if (typeof window.openTestPage === 'function') {
        window.openTestPage(agentName, 'ACTIVE');
      }
    });
  });

  // Handle URL hash on load & hashchange
  function applyHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash.startsWith('test-')) {
      const slug = hash.replace('test-', '');
      const matchedName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      if (typeof window.openTestPage === 'function') {
        window.openTestPage(matchedName);
      }
      return;
    }
    if (hash && (hash === 'workflow-detail' || hash.startsWith('workflow-'))) {
      const slug = hash.replace('workflow-', '');
      const matchedName = (slug === 'detail' || !slug) ? 'Claim Processing Workflow' : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      if (typeof window.openWorkflowDetailPage === 'function') {
        window.openWorkflowDetailPage(matchedName);
      } else {
        switchView('workflow-detail');
      }
      return;
    }
    if (hash && viewTitles[hash]) {
      switchView(hash);
    } else {
      switchView('agents');
    }
  }

  applyHash();
  window.addEventListener('hashchange', applyHash);
}

/**
 * Filter & Search across Agent Cards
 */
function initAgentFiltersAndSearch() {
  const searchInput = document.getElementById('studioAgentSearch');
  const filterChips = document.querySelectorAll('.filter-chip');
  const modelSelect = document.getElementById('selectModelFilter');
  const agentCards = document.querySelectorAll('.agent-rich-card');

  let currentFilter = 'all';
  let currentModel = 'all';
  let currentSearch = '';

  function applyFilters() {
    agentCards.forEach(card => {
      const title = card.querySelector('.agent-card-name')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.agent-card-desc')?.textContent.toLowerCase() || '';
      const status = card.getAttribute('data-status') || '';
      const model = card.getAttribute('data-model') || '';
      const tags = card.getAttribute('data-tags') || '';

      const matchesSearch = !currentSearch || title.includes(currentSearch) || desc.includes(currentSearch) || tags.includes(currentSearch);
      const matchesFilter = currentFilter === 'all' || status === currentFilter;
      const matchesModel = currentModel === 'all' || model.includes(currentModel);

      if (matchesSearch && matchesFilter && matchesModel) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      applyFilters();
    });
  });

  if (modelSelect) {
    modelSelect.addEventListener('change', (e) => {
      currentModel = e.target.value;
      applyFilters();
    });
  }
}

/**
 * Interactive Test Run Slide-over Drawer
 */
function initTestRunDrawer() {
  const drawerBackdrop = document.getElementById('testRunDrawer');
  const closeBtn = document.getElementById('btnDrawerClose');
  const sendBtn = document.getElementById('btnDrawerSend');
  const inputEl = document.getElementById('drawerPromptInput');
  const chatBody = document.getElementById('drawerChatBody');
  const titleEl = document.getElementById('drawerAgentTitle');
  const testBtns = document.querySelectorAll('.btn-test-agent');

  if (!drawerBackdrop) return;

  function closeDrawer() {
    drawerBackdrop.classList.remove('active');
  }

  window.openTestDrawer = function (agentName) {
    if (titleEl) titleEl.textContent = `Test: ${agentName}`;
    drawerBackdrop.classList.add('active');
    if (inputEl) {
      inputEl.value = '';
      setTimeout(() => inputEl.focus(), 250);
    }
  };

  testBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.agent-rich-card');
      const agentName = card?.querySelector('.agent-card-name')?.textContent || 'Agent';
      openTestDrawer(agentName);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  drawerBackdrop.addEventListener('click', (e) => {
    if (e.target === drawerBackdrop) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerBackdrop.classList.contains('active')) {
      closeDrawer();
    }
  });

  function handleSendPrompt() {
    const prompt = inputEl?.value.trim();
    if (!prompt || !chatBody) return;

    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'drawer-chat-message user';
    userMsg.innerHTML = `<div class="drawer-bubble">${escapeHtml(prompt)}</div>`;
    chatBody.appendChild(userMsg);

    inputEl.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Show Typing Indicator
    const typingMsg = document.createElement('div');
    typingMsg.className = 'drawer-chat-message assistant';
    typingMsg.innerHTML = `
      <div class="drawer-bubble" style="display: flex; gap: 4px; align-items: center; padding: 0.75rem 1rem;">
        <span style="width: 6px; height: 6px; background: #64748b; border-radius: 50%; animation: pulse 1s infinite;"></span>
        <span style="width: 6px; height: 6px; background: #64748b; border-radius: 50%; animation: pulse 1s infinite 0.2s;"></span>
        <span style="width: 6px; height: 6px; background: #64748b; border-radius: 50%; animation: pulse 1s infinite 0.4s;"></span>
      </div>
    `;
    chatBody.appendChild(typingMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate Agent Response
    setTimeout(() => {
      typingMsg.remove();
      const agentResponse = generateAgentResponse(prompt);
      const assistantMsg = document.createElement('div');
      assistantMsg.className = 'drawer-chat-message assistant';
      assistantMsg.innerHTML = `<div class="drawer-bubble">${agentResponse}</div>`;
      chatBody.appendChild(assistantMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 900);
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', handleSendPrompt);
  }

  if (inputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSendPrompt();
      }
    });
  }
}

/**
 * Generate simulated responses for Agent test runs (Multi-Role BA, Dev, PM, UI & QA Synthesis)
 */
function generateAgentResponse(prompt) {
  const p = prompt.toLowerCase();

  // 1. Zenith BA Architect (Spec & Requirements)
  if (p.includes('spec') || p.includes('requirement') || p.includes('ba') || p.includes('bdd') || p.includes('feature')) {
    return `
      <div style="font-size: 0.85rem; line-height: 1.5;">
        <strong style="color: #2563eb; display: block; margin-bottom: 4px;">Zenith BA Architect — Spec Generated</strong>
        Generated BDD Feature Scaffold:<br>
        <div style="margin: 6px 0; padding: 6px 10px; background: rgba(37,99,235,0.06); border-left: 3px solid #2563eb; border-radius: 4px; font-family: monospace; font-size: 0.775rem;">
          <strong>Feature:</strong> Multi-Agent Studio Requirements<br>
          • <code>Given</code> user sends valid prompt in workspace<br>
          • <code>When</code> AST parser validates symbol schema<br>
          • <code>Then</code> live preview updates via WebContainer in &lt; 250ms
        </div>
      </div>
    `;
  }

  // 2. DevCore Synthesizer (Code & Build)
  if (p.includes('code') || p.includes('build') || p.includes('ast') || p.includes('syntax') || p.includes('generate')) {
    return `
      <div style="font-size: 0.85rem; line-height: 1.5;">
        <strong style="color: #7c3aed; display: block; margin-bottom: 4px;">DevCore Synthesizer — Synthesis Complete</strong>
        Compiled TS AST in <strong>18ms</strong>. Generated 3 module boundaries:<br>
        <code>agents/zenith-ba-architect.yaml</code> • <code>src/hooks/useAgent.ts</code><br>
        <span style="font-size: 0.75rem; color: #16a34a;">✔ WebContainer hot-reloaded (14 modules updated)</span>
      </div>
    `;
  }

  // 3. Product Manager (PM) Sprint & Backlog
  if (p.includes('pm') || p.includes('sprint') || p.includes('roadmap') || p.includes('backlog') || p.includes('milestone') || p.includes('ticket')) {
    return `
      <div style="font-size: 0.85rem; line-height: 1.5;">
        <strong style="color: #db2777; display: block; margin-bottom: 4px;">Omni PM Orchestrator — Sprint Roadmap</strong>
        <strong>Goal:</strong> ${escapeHtml(prompt)}<br>
        <table style="width: 100%; margin-top: 6px; font-size: 0.775rem; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid rgba(0,0,0,0.1);">
            <th style="text-align: left; padding: 3px;">Task</th>
            <th style="padding: 3px;">Owner</th>
            <th style="padding: 3px;">Points</th>
          </tr>
          <tr>
            <td style="padding: 3px;">1. Schema &amp; Auth Hooks</td>
            <td style="padding: 3px; text-align: center;"><span class="code-pill">DevCore</span></td>
            <td style="padding: 3px; text-align: center;">5 SP</td>
          </tr>
          <tr>
            <td style="padding: 3px;">2. Glassmorphic UI Wireframe</td>
            <td style="padding: 3px; text-align: center;"><span class="code-pill">PixelCraft</span></td>
            <td style="padding: 3px; text-align: center;">3 SP</td>
          </tr>
          <tr>
            <td style="padding: 3px;">3. Docker QA Sandbox Suite</td>
            <td style="padding: 3px; text-align: center;"><span class="code-pill">DeployGuard</span></td>
            <td style="padding: 3px; text-align: center;">2 SP</td>
          </tr>
        </table>
      </div>
    `;
  }

  // 4. UI/UX PixelCraft Styling
  if (p.includes('ui') || p.includes('ux') || p.includes('design') || p.includes('css') || p.includes('theme') || p.includes('token') || p.includes('color')) {
    return `
      <div style="font-size: 0.85rem; line-height: 1.5;">
        <strong style="color: #0284c7; display: block; margin-bottom: 4px;">PixelCraft UI/UX — Tokens Generated</strong>
        Applied Modern Glassmorphic Design System Tokens:<br>
        • Surface: <code>rgba(255, 255, 255, 0.85) / backdrop-filter: blur(16px)</code><br>
        • Brand Accent: <code>hsl(217, 91%, 60%)</code> | Contrast Ratio: <strong>6.8:1 (AAA)</strong><br>
        • Micro-animations: <code>cubic-bezier(0.16, 1, 0.3, 1) [200ms]</code>
      </div>
    `;
  }

  // 5. DeployGuard & QA
  if (p.includes('deploy') || p.includes('docker') || p.includes('test') || p.includes('qa') || p.includes('security') || p.includes('pipeline')) {
    return `
      <div style="font-size: 0.85rem; line-height: 1.5;">
        <strong style="color: #ea580c; display: block; margin-bottom: 4px;">DeployGuard QA — Pipeline Passed</strong>
        • Container Build: <code>zenith-preview:v2.4.1 (Alpine 3.19)</code><br>
        • Unit &amp; E2E Suite: <strong>48 / 48 passed (0 flaky)</strong><br>
        • Security Scan: <strong>0 critical CVEs</strong><br>
        • Endpoint Status: <span style="color: #16a34a; font-weight: 600;">Live @ preview-884.zenith.dev</span>
      </div>
    `;
  }

  // Default multi-role synthesis summary
  return `
    <div style="font-size: 0.85rem; line-height: 1.5;">
      <strong style="color: #2563eb;">Zenith Multi-Role Synthesis Output</strong><br>
      Evaluated prompt: <em>"${escapeHtml(prompt)}"</em><br><br>
      • <strong>BA Architect:</strong> Requirements model parsed with 100% semantic coverage.<br>
      • <strong>DevCore:</strong> Generated AST graph &amp; TypeScript modules in <strong>0.38s</strong>.<br>
      • <strong>DeployGuard:</strong> Verified against WebContainer sandbox without syntax errors.
    </div>
  `;
}

/**
 * Create Agent Modal
 */
/**
 * Create Agent Modal (Clean Single-Step Modal matching reference screenshot)
 */
function initCreateAgentModal() {
  const modalBackdrop = document.getElementById('createAgentModal');
  const openBtns = document.querySelectorAll('#btnNewAgentTop, #btnNewAgentSidebar, #btnNewAgentCard, #btnCreateAgentPage');
  const closeBtn = document.getElementById('btnCancelCreateAgent');
  const cancelModalBtn = document.getElementById('btnCancelCleanModal');
  const submitBtn = document.getElementById('btnSubmitCleanCreate');
  const nameInput = document.getElementById('newAgentNameInput');
  const goalInput = document.getElementById('newAgentGoalInput');
  const templatesGrid = document.getElementById('newAgentTemplatesGrid');

  if (!modalBackdrop) return;

  function openModal() {
    modalBackdrop.classList.add('active');
    if (nameInput) {
      nameInput.focus();
      nameInput.select();
    }
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
  }

  // Open modal buttons
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Close handlers
  [closeBtn, cancelModalBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', closeModal);
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) closeModal();
  });

  // Template selection interaction
  if (templatesGrid) {
    templatesGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.agent-start-card');
      if (!card) return;

      // Deselect all
      templatesGrid.querySelectorAll('.agent-start-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      const templateId = card.getAttribute('data-template-id');
      const cardName = card.getAttribute('data-agent-name');
      const cardDesc = card.getAttribute('data-agent-desc');

      // Update name input if user hasn't typed a custom one or clicked an existing agent
      if (templateId === 'blank') {
        if (!nameInput.value || nameInput.value.includes('Architect') || nameInput.value.includes('Synthesizer')) {
          nameInput.value = 'MCU Analyzer';
        }
      } else if (cardName) {
        nameInput.value = cardName;
      }

      if (goalInput && cardDesc && templateId !== 'blank') {
        goalInput.value = cardDesc;
      }
    });
  }

  // Form submission / Create agent button
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const agentName = nameInput?.value.trim() || 'Custom Agent';
      const agentGoal = goalInput?.value.trim() || 'Custom autonomous agent.';
      const selectedCard = templatesGrid?.querySelector('.agent-start-card.selected');
      const templateId = selectedCard?.getAttribute('data-template-id') || 'blank';

      // Add to table if table exists
      const tableBody = document.getElementById('agentsTableBody');
      if (tableBody) {
        const newRow = document.createElement('tr');
        newRow.className = 'agent-table-row';
        newRow.setAttribute('data-agent', agentName);
        newRow.setAttribute('data-status', 'draft');
        newRow.setAttribute('data-version', 'v0.1');

        newRow.innerHTML = `
          <td class="cell-name">
            <div class="agent-name-cell">
              <div class="agent-avatar-badge" style="background-color: rgba(99, 102, 241, 0.12); color: #6366f1;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <span class="agent-table-name">${escapeHtml(agentName)}</span>
            </div>
          </td>
          <td class="cell-desc">
            <p class="agent-table-desc">${escapeHtml(agentGoal)}</p>
          </td>
          <td class="cell-status">
            <span class="agent-status-pill draft">
              <span class="status-dot"></span>
              Draft
            </span>
          </td>
          <td class="cell-version">v0.1</td>
          <td class="cell-updated">Just now</td>
          <td class="cell-deploy">
            <span class="deployment-pill not-deployed">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              Not Deployed
            </span>
          </td>
          <td class="cell-actions">
            <button type="button" class="btn-table-action-menu" aria-label="Agent options">⋮</button>
          </td>
        `;

        // Direct navigation on clicking the new row
        newRow.addEventListener('click', (e) => {
          if (e.target.closest('.btn-table-action-menu')) return;
          if (typeof window.openTestPage === 'function') {
            window.openTestPage(agentName);
          }
        });

        tableBody.insertBefore(newRow, tableBody.firstChild);

        // Highlight newly inserted row briefly
        newRow.style.backgroundColor = 'rgba(37, 99, 235, 0.08)';
        newRow.style.transition = 'background-color 1s ease';
        setTimeout(() => { newRow.style.backgroundColor = ''; }, 1500);
      }

      closeModal();
      showStudioToast(`Agent "${agentName}" created! Redirecting to Test Studio...`);

      // Open detail/test page directly
      setTimeout(() => {
        if (typeof window.openTestPage === 'function') {
          window.openTestPage(agentName);
        }
      }, 350);
    });
  }
}

/**
 * Workflow and Tools quick actions
 */
function initWorkflowAndToolActions() {
  const copyBtns = document.querySelectorAll('.btn-copy-code');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-copy');
      if (code) {
        navigator.clipboard.writeText(code);
        showStudioToast('Copied endpoint to clipboard!');
      }
    });
  });
}

/**
 * Toast Notification Helper
 */
function showStudioToast(message) {
  let toast = document.getElementById('studioToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'studioToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background-color: #17243b;
      color: #ffffff;
      padding: 0.75rem 1.25rem;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 200;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.25s ease;
      opacity: 0;
      transform: translateY(12px);
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>${escapeHtml(message)}</span>
  `;

  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
  }, 2800);
}

function escapeHtml(str) {
  if (typeof str !== 'string') str = String(str || '');
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* =====================================================================
 * DUAL-COLUMN AGENT STUDIO DESIGN & RUN TEST VIEW — initTestAgentPage()
 * Opens #pane-test-agent matching reference layout screenshot
 * Integrates context document vault & upload from prototype sidebar
 * ===================================================================== */
function initTestAgentPage() {
  const paneTestAgent = document.getElementById('pane-test-agent');
  const paneAgents = document.getElementById('pane-agents');
  const btnBack = document.getElementById('btnBackToAgents');

  // Topbar elements
  const testAgentNameEl = document.getElementById('testAgentName');
  const testAgentBadgeEl = document.getElementById('testAgentBadge');
  const btnAgentSettings = document.getElementById('btnAgentSettings');
  const btnAgentCompare = document.getElementById('btnAgentCompare');
  const btnAgentPublish = document.getElementById('btnAgentPublish');

  // Left Column (DESIGN) elements
  const designFileTag = document.getElementById('designFileTag');
  const btnDesignTabChat = document.getElementById('btnDesignTabChat');
  const btnDesignTabTerminal = document.getElementById('btnDesignTabTerminal');
  const btnDesignTabYaml = document.getElementById('btnDesignTabYaml');
  const agentDesignFeed = document.getElementById('agentDesignFeed');
  const agentDesignTerminalPane = document.getElementById('agentDesignTerminalPane');
  const agentDesignYamlPane = document.getElementById('agentDesignYamlPane');
  const agentChatControlsWrapper = document.getElementById('agentChatControlsWrapper');
  const designPromptInput = document.getElementById('designPromptInput');
  const btnDesignAttachFile = document.getElementById('btnDesignAttachFile');
  const agentFileInputUpload = document.getElementById('agentFileInputUpload');
  const btnDesignSend = document.getElementById('btnDesignSend');
  const agentAttachedContextBar = document.getElementById('agentAttachedContextBar');
  const agentAttachedChipsWrapper = document.getElementById('agentAttachedChipsWrapper');
  const btnAgentClearAllContext = document.getElementById('btnAgentClearAllContext');
  const btnAgentAddContext = document.getElementById('btnAgentAddContext');
  const agentContextCountText = document.getElementById('agentContextCountText');
  const btnAgentBuildSession = document.getElementById('btnAgentBuildSession');

  // Journey Elements
  const btnAgentAddJourney = document.getElementById('btnAgentAddJourney');
  const agentJourneyCountBadge = document.getElementById('agentJourneyCountBadge');
  const agentJourneyCountText = document.getElementById('agentJourneyCountText');
  const btnTestAddJourney = document.getElementById('btnTestAddJourney');
  const testJourneyCountBadge = document.getElementById('testJourneyCountBadge');
  const testJourneyCountText = document.getElementById('testJourneyCountText');
  const testActiveModelLabel = document.getElementById('testActiveModelLabel');
  const journeyModal = document.getElementById('journeyModalBackdrop');
  const btnJourneyPublishTop = document.getElementById('btnJourneyPublishTop');
  const btnJourneyPublishBottom = document.getElementById('btnJourneyPublishBottom');
  const btnJourneyClose = document.getElementById('btnJourneyClose');
  const btnJourneyCancel = document.getElementById('btnJourneyCancel');
  const journeyTitleInput = document.getElementById('journeyTitleInput');
  const journeyBreadcrumbTitle = document.getElementById('journeyBreadcrumbTitle');
  const journeyDescInput = document.getElementById('journeyDescInput');
  const journeyCriteriaInput = document.getElementById('journeyCriteriaInput');
  const journeyGuidanceEditor = document.getElementById('journeyGuidanceEditor');
  const journeyAutocompleteMenu = document.getElementById('journeyAutocompleteMenu');

  // Model Selector Elements (Inside chat input lower bar)
  const btnDesignModelPicker = document.getElementById('btnDesignModelPicker');
  const designSelectedModelName = document.getElementById('designSelectedModelName');
  const designModelMenu = document.getElementById('designModelMenu');

  // Terminal Pane Elements
  const terminalPaneOutputBody = document.getElementById('terminalPaneOutputBody');
  const terminalInteractiveInput = document.getElementById('terminalInteractiveInput');
  const btnTerminalExec = document.getElementById('btnTerminalExec');
  const btnTerminalClearOutput = document.getElementById('btnTerminalClearOutput');
  const btnTerminalRestartSession = document.getElementById('btnTerminalRestartSession');
  const btnTerminalCopyLog = document.getElementById('btnTerminalCopyLog');
  const terminalPathBadge = document.getElementById('terminalPathBadge');

  // YAML Pane Elements
  const yamlFilePathTitle = document.getElementById('yamlFilePathTitle');
  const yamlCodeDisplay = document.getElementById('yamlCodeDisplay');
  const yamlCodeTextarea = document.getElementById('yamlCodeTextarea');
  const btnToggleEditYaml = document.getElementById('btnToggleEditYaml');
  const toggleEditYamlText = document.getElementById('toggleEditYamlText');
  const btnCopyYamlCode = document.getElementById('btnCopyYamlCode');
  const btnDownloadYamlFile = document.getElementById('btnDownloadYamlFile');
  const yamlStatsLine = document.getElementById('yamlStatsLine');

  // Right Column (TEST / RUN) elements
  const btnTabChatRun = document.getElementById('btnTabChatRun');
  const btnTabSimulations = document.getElementById('btnTabSimulations');
  const btnNewConversationTest = document.getElementById('btnNewConversationTest');
  const agentTestFeed = document.getElementById('agentTestFeed');
  const testAgentTargetName = document.getElementById('testAgentTargetName');
  const testEmptyTagline = document.getElementById('testEmptyTagline');
  const testPromptInput = document.getElementById('testPromptInput');
  const btnTestSend = document.getElementById('btnTestSend');

  // Context Selection Modal elements
  const contextModal = document.getElementById('contextSelectModalBackdrop');
  const btnContextModalClose = document.getElementById('btnContextModalClose');
  const btnCancelContextModal = document.getElementById('btnCancelContextModal');
  const btnApplyContextModal = document.getElementById('btnApplyContextModal');
  const contextModalSearchInput = document.getElementById('contextModalSearchInput');
  const btnQuickUploadModal = document.getElementById('btnQuickUploadModal');
  const modalQuickFileInput = document.getElementById('modalQuickFileInput');
  const contextDocsChecklist = document.getElementById('contextDocsChecklist');
  const modalSelectedCountText = document.getElementById('modalSelectedCountText');
  const btnModalApplyCount = document.getElementById('btnModalApplyCount');

  if (!paneTestAgent) return;

  // Active agent state
  let activeAgentName = 'MCU Analyzer';
  let activeAgentSlug = 'mcu-analyzer';

  // =========================================================================
  // DOCUMENT VAULT & CONTEXT ATTACHMENT STATE (Ported from Sidebar Prototype)
  // =========================================================================
  let VAULT_DOCS = [
    {
      id: 'doc-1',
      name: 'MCU_Architecture_Spec.pdf',
      type: 'PDF',
      size: '84 KB',
      tokens: '1.2k tokens',
      date: 'Uploaded today'
    },
    {
      id: 'doc-2',
      name: 'Zenith_Platform_PRD_v2.docx',
      type: 'DOCX',
      size: '142 KB',
      tokens: '3.4k tokens',
      date: 'Uploaded 2 days ago'
    },
    {
      id: 'doc-3',
      name: 'API_Contracts_OpenAPI.yaml',
      type: 'YAML',
      size: '38 KB',
      tokens: '950 tokens',
      date: 'Uploaded 1 week ago'
    },
    {
      id: 'doc-4',
      name: 'Firmware_State_Machine.md',
      type: 'MD',
      size: '16 KB',
      tokens: '620 tokens',
      date: 'Uploaded 2 weeks ago'
    }
  ];

  let attachedDocIds = new Set();
  let tempModalSelectedIds = new Set();

  // ── Open Full-Page Test / Design View ─────────────────────────────────
  function openTestPage(agentName, status = 'ACTIVE') {
    if (!agentName) agentName = 'Zenith BA Architect';
    activeAgentName = agentName.trim();
    activeAgentSlug = activeAgentName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'agent-test';

    const upperName = activeAgentName.toUpperCase();
    const isDraft = String(status || '').toLowerCase() === 'draft';

    // 0. Set mode on body and viewport for full-height 4-column layout
    document.body.classList.add('in-agent-detail');
    const viewport = document.querySelector('.studio-viewport');
    if (viewport) viewport.classList.add('in-agent-detail');

    // 1. Update Topbar
    if (testAgentNameEl) testAgentNameEl.textContent = upperName;
    if (testAgentBadgeEl) {
      if (isDraft) {
        testAgentBadgeEl.textContent = 'DRAFT';
        testAgentBadgeEl.className = 'agent-design-badge draft';
        testAgentBadgeEl.style.backgroundColor = '#fef3c7';
        testAgentBadgeEl.style.color = '#b45309';
        testAgentBadgeEl.style.borderColor = '#fde68a';
      } else {
        testAgentBadgeEl.textContent = 'ACTIVE';
        testAgentBadgeEl.className = 'agent-design-badge active';
        testAgentBadgeEl.style.backgroundColor = '#dcfce7';
        testAgentBadgeEl.style.color = '#15803d';
        testAgentBadgeEl.style.borderColor = '#bbf7d0';
      }
    }

    // 2. Update Left Column (Design)
    if (designFileTag) {
      designFileTag.textContent = `agents/${activeAgentSlug}.yaml`;
    }
    if (yamlFilePathTitle) {
      yamlFilePathTitle.textContent = `agents/${activeAgentSlug}.yaml`;
    }
    if (terminalPathBadge) {
      terminalPathBadge.textContent = `~/platform-data/studio/agents/${activeAgentSlug}.yaml`;
    }
    const designFooterHint = document.getElementById('designFooterHint');
    if (designFooterHint) {
      designFooterHint.innerHTML = `Edits land in <span class="font-mono">agents/${activeAgentSlug}.yaml</span>. Enter to send · Shift+Enter for a new line.`;
    }
    if (designPromptInput) {
      designPromptInput.value = '';
      const currentEngine = designSelectedModelName ? designSelectedModelName.textContent.trim() : 'Claude Code';
      designPromptInput.placeholder = `Describe what ${upperName} should do — ${currentEngine} writes the definition...`;
    }

    // Render YAML definition for this agent
    renderYamlDefinition();

    // Pre-populate design chat matching user request (Clean, no emoticons)
    if (agentDesignFeed) {
      agentDesignFeed.innerHTML = `
        <!-- Turn 1: Create agent -->
        <div class="design-msg-user">
          <div class="msg-sender-tag user">You</div>
          <div class="msg-content-text">Create an agent called BA Architect to transform business requirements into software specs and Gherkin BDD.</div>
        </div>
        <div class="design-msg-assistant">
          <div class="msg-sender-tag assistant">Claude Code · Specialist</div>
          <div class="msg-content-text">
            <p>I'll configure <strong>BA Architect</strong> to transform enterprise PRDs and business briefs into structured user stories, acceptance criteria, and Gherkin BDD scenarios. Initializing specification scaffold at <span class="design-code-badge font-mono">agents/${activeAgentSlug}.yaml</span> with reasoning model (Claude 3.7 Sonnet).</p>
          </div>
        </div>

        <!-- Turn 2: Add guardrail -->
        <div class="design-msg-user">
          <div class="msg-sender-tag user">You</div>
          <div class="msg-content-text">Add a guardrail to enforce strict requirements grounding and prevent scope creep.</div>
        </div>
        <div class="design-msg-assistant">
          <div class="msg-sender-tag assistant">Claude Code · Specialist</div>
          <div class="msg-content-text">
            <p>Added requirement-grounding guardrails to <span class="design-code-badge font-mono">agents/${activeAgentSlug}.yaml</span>:</p>
            <ul>
              <li><span class="design-code-badge font-mono">enforceGherkinSyntax: true</span> — Validates Given-When-Then rules.</li>
              <li><span class="design-code-badge font-mono">preventAmbiguousScopes: true</span> — Rejects ungrounded assumptions.</li>
              <li><span class="design-code-badge font-mono">maxStoryPoints: 13</span> — Enforces story decomposition limits.</li>
            </ul>
          </div>
        </div>

        <!-- Turn 3: Generate Gherkin BDD -->
        <div class="design-msg-user">
          <div class="msg-sender-tag user">You</div>
          <div class="msg-content-text">Also generate Gherkin BDD templates for Jira story generation.</div>
        </div>
        <div class="design-msg-assistant">
          <div class="msg-sender-tag assistant">Claude Code · Specialist</div>
          <div class="msg-content-text">
            <p>Added Gherkin BDD execution patterns and linked tools: <span class="tool-pill-badge">spec_validator</span> and <span class="tool-pill-badge">jira_schema_sync</span>. Acceptance criteria will automatically format for Jira integration.</p>
          </div>
        </div>

        <!-- Turn 4: Show current definition -->
        <div class="design-msg-user">
          <div class="msg-sender-tag user">You</div>
          <div class="msg-content-text">Show current definition</div>
        </div>
        <div class="design-msg-assistant">
          <div class="msg-sender-tag assistant">Claude Code · Specialist</div>
          <div class="msg-content-text">
            <p>Here is the current definition for <span class="design-code-badge font-mono">agents/${activeAgentSlug}.yaml</span>. The scaffold has 2 active tools, strict grounding guardrails, and active journey tracking. You can inspect or edit the structure in the <strong>YAML</strong> tab.</p>
          </div>
        </div>

        <!-- Turn 5: Journey Published and response in DESIGN -->
        <div class="design-msg-journey-published">
          <div class="pjc-header">
            <div class="pjc-title-wrap">
              <span class="pjc-title">Transaction Dispute</span>
            </div>
            <span class="pjc-badge">Published Journey</span>
          </div>
          <div class="pjc-section">
            <div class="pjc-section-label">Description</div>
            <div class="pjc-text">The customer mentions a suspicious, unrecognized, or incorrect charge.</div>
          </div>
          <div class="pjc-section">
            <div class="pjc-section-label">Criteria</div>
            <div class="pjc-text">Help the customer resolve a disputed transaction.</div>
          </div>
          <div class="pjc-section">
            <div class="pjc-section-label">Guidance &amp; Tool Flow</div>
            <div class="pjc-text pjc-guidance-content">
              <div class="guidance-step-line">1. Greet the customer empathetically and ask how you can help.</div>
              <div class="guidance-step-line">2. Authenticate the user with <span class="tool-pill-badge">UserAuthentication</span> .</div>
              <div class="guidance-step-line">3. Ask which credit card is affected (if they have multiple).</div>
              <div class="guidance-step-line">4. Gather details on the merchant and date of transaction.</div>
              <div class="guidance-step-line">5. Find transaction using <span class="tool-pill-badge">LookupTransaction</span> .</div>
              <div class="guidance-step-line">6. Confirm with customer that this is the correct transaction.</div>
              <div class="guidance-step-line">7. Once confirmed, check <span class="tool-pill-badge">CheckForFraud</span> , and proceed accordingly.</div>
            </div>
          </div>
        </div>
        <div class="design-msg-assistant">
          <div class="msg-sender-tag assistant">Claude Code · Specialist</div>
          <div class="msg-content-text">
            <p>Published Journey <span class="design-code-badge font-mono">Transaction Dispute</span> compiled into <span class="design-code-badge font-mono">agents/${activeAgentSlug}.yaml</span>.</p>
            <p>Bound Tool Actions: <span class="tool-pill-badge">UserAuthentication</span>, <span class="tool-pill-badge">LookupTransaction</span>, and <span class="tool-pill-badge">CheckForFraud</span>.</p>
            <p>Dispute resolution criteria and conversational guidance steps are active in the agent state machine. View the updated scaffold in the <strong>YAML</strong> tab.</p>
          </div>
        </div>
      `;
      agentDesignFeed.scrollTop = agentDesignFeed.scrollHeight;
    }

    // 3. Update Right Column (Test Chat)
    if (testAgentTargetName) {
      testAgentTargetName.textContent = upperName;
    }
    if (testEmptyTagline) {
      testEmptyTagline.innerHTML = `Talk to the draft of <strong>${escapeHtml(upperName)}</strong> through the run API — streamed, with a trace on every reply.`;
    }
    if (testPromptInput) {
      testPromptInput.value = '';
      testPromptInput.placeholder = `Message ${upperName}...`;
    }

    if (testActiveModelLabel) {
      testActiveModelLabel.textContent = `${activeAgentName} · Live Run API`;
    }
    if (testJourneyCountText) {
      testJourneyCountText.textContent = '1 active';
    }

    // Pre-populate test chat matching user request (Clean, no emoticons)
    if (agentTestFeed) {
      agentTestFeed.innerHTML = `
        <!-- Turn 1: GKM RPS Context -->
        <div class="test-msg-user-bubble">
          <div class="msg-sender-tag user-chat">You</div>
          <div class="msg-content-text">Saya ingin membuat sistem untuk membantu GKM mengingatkan dosen yang belum memperbarui RPS.</div>
        </div>
        <div class="test-msg-agent-card">
          <div class="test-msg-agent-header">
            <span class="test-msg-agent-title">${escapeHtml(activeAgentName)}</span>
            <span class="test-msg-badge-live">Run API Streamed</span>
          </div>
          <div class="test-msg-agent-body">
            Saya memahami kebutuhan tersebut. Sistem ini akan berfungsi sebagai <strong>Automated Reminder and Compliance Tracking Pipeline</strong> untuk Gugus Kendali Mutu (GKM) dalam memantau kepatuhan pembaruan Rencana Pembelajaran Semester (RPS) oleh dosen pengampu sebelum perkuliahan semester aktif dimulai.
          </div>
          <div class="test-trace-pill">142ms · 48 tokens · model: claude-3-7-sonnet · trace: #tr-8012</div>
        </div>

        <!-- Turn 2: Request PRD -->
        <div class="test-msg-user-bubble">
          <div class="msg-sender-tag user-chat">You</div>
          <div class="msg-content-text">Buatkan PRD dari kebutuhan tersebut.</div>
        </div>
        <div class="test-msg-agent-card">
          <div class="test-msg-agent-header">
            <span class="test-msg-agent-title">${escapeHtml(activeAgentName)}</span>
            <span class="test-msg-badge-live">Run API Streamed</span>
          </div>
          <div class="test-msg-agent-body">
            Berikut draft <strong>Product Requirements Document (PRD)</strong> awal yang telah distrukturkan:
            <div style="margin-top: 8px; padding: 10px 14px; background: rgba(37,99,235,0.04); border-left: 3px solid #2563eb; border-radius: 6px; font-size: 0.85rem; line-height: 1.6;">
              <strong style="color: #0f172a;">1. Problem Statement:</strong> Keterlambatan pengunggahan RPS menghambat audit mutu akademik GKM dan akreditasi prodi.<br>
              <strong style="color: #0f172a;">2. Objectives:</strong> Memastikan 100% kepatuhan upload RPS oleh dosen pada H-3 sebelum perkuliahan dimulai.<br>
              <strong style="color: #0f172a;">3. Stakeholders:</strong> Tim GKM (Auditor), Dosen Pengampu (User), Ketua Program Studi (Eskalasi).<br>
              <strong style="color: #0f172a;">4. Core Capabilities:</strong>
              <ul style="margin: 4px 0 0 16px; padding: 0;">
                <li>Sinkronisasi data dosen &amp; mata kuliah aktif dari database akademik.</li>
                <li>Notifikasi otomatis bertingkat melalui Email resmi dan bot WhatsApp.</li>
                <li>Dashboard metrik kepatuhan real-time dan audit log status RPS.</li>
              </ul>
            </div>
          </div>
          <div class="test-trace-pill">195ms · 96 tokens · model: claude-3-7-sonnet · trace: #tr-8013</div>
        </div>

        <!-- Turn 3: Request Gherkin BDD -->
        <div class="test-msg-user-bubble">
          <div class="msg-sender-tag user-chat">You</div>
          <div class="msg-content-text">Buatkan Gherkin BDD.</div>
        </div>
        <div class="test-msg-agent-card">
          <div class="test-msg-agent-header">
            <span class="test-msg-agent-title">${escapeHtml(activeAgentName)}</span>
            <span class="test-msg-badge-live">Run API Streamed</span>
          </div>
          <div class="test-msg-agent-body">
            Berikut spesifikasi <strong>Gherkin BDD Acceptance Criteria</strong>:
            <pre style="background: #0f172a; color: #f8fafc; padding: 10px 12px; border-radius: 8px; font-family: monospace; font-size: 0.78rem; line-height: 1.5; overflow-x: auto; margin-top: 6px;">Feature: RPS Reminder &amp; Compliance Tracking

  Scenario: Pengingat otomatis H-7 batas akhir upload RPS
    Given dosen terdaftar memiliki mata kuliah aktif dengan status RPS "Belum Diperbarui"
    And tanggal saat ini adalah H-7 sebelum batas akhir semester perkuliahan
    When sistem scheduler menjalankan evaluasi kepatuhan RPS harian pukul 08.00 WIB
    Then kirimkan notifikasi pengingat via Email resmi dan pesan bot WhatsApp dosen
    And perbarui status log pengiriman notifikasi pada dashboard monitoring GKM

  Scenario: Eskalasi ke Kaprodi pada H-3 jika RPS belum diunggah
    Given notifikasi H-7 telah dikirim dan status RPS masih "Belum Diperbarui"
    When batas waktu mencapai H-3 sebelum perkuliahan dimulai
    Then kirimkan rekapitulasi daftar dosen belum upload RPS ke email Kepala Program Studi</pre>
          </div>
          <div class="test-trace-pill">224ms · 130 tokens · model: claude-3-7-sonnet · trace: #tr-8014</div>
        </div>

        <!-- Published Journey Card in CHAT Feed -->
        <div class="design-msg-journey-published">
          <div class="pjc-header">
            <div class="pjc-title-wrap">
              <span class="pjc-title">Transaction Dispute</span>
            </div>
            <span class="pjc-badge">Published Journey</span>
          </div>
          <div class="pjc-section">
            <div class="pjc-section-label">Description</div>
            <div class="pjc-text">The customer mentions a suspicious, unrecognized, or incorrect charge.</div>
          </div>
          <div class="pjc-section">
            <div class="pjc-section-label">Criteria</div>
            <div class="pjc-text">Help the customer resolve a disputed transaction.</div>
          </div>
          <div class="pjc-section">
            <div class="pjc-section-label">Guidance &amp; Tool Flow</div>
            <div class="pjc-text pjc-guidance-content">
              <div class="guidance-step-line">1. Greet the customer empathetically and ask how you can help.</div>
              <div class="guidance-step-line">2. Authenticate the user with <span class="tool-pill-badge">UserAuthentication</span> .</div>
              <div class="guidance-step-line">3. Ask which credit card is affected (if they have multiple).</div>
              <div class="guidance-step-line">4. Gather details on the merchant and date of transaction.</div>
              <div class="guidance-step-line">5. Find transaction using <span class="tool-pill-badge">LookupTransaction</span> .</div>
              <div class="guidance-step-line">6. Confirm with customer that this is the correct transaction.</div>
              <div class="guidance-step-line">7. Once confirmed, check <span class="tool-pill-badge">CheckForFraud</span> , and proceed accordingly.</div>
            </div>
          </div>
        </div>

        <!-- Turn 4: Journey response dummy in CHAT column -->
        <div class="test-msg-user-bubble">
          <div class="msg-sender-tag user-chat">You</div>
          <div class="msg-content-text">Jalankan journey Transaction Dispute untuk verifikasi customer charge.</div>
        </div>
        <div class="test-msg-agent-card">
          <div class="test-msg-agent-header">
            <span class="test-msg-agent-title">${escapeHtml(activeAgentName)}</span>
            <span class="test-msg-badge-live">Journey Execution Trace</span>
          </div>
          <div class="test-msg-agent-body">
            Memulai eksekusi Journey: <strong>Transaction Dispute</strong>
            <div style="margin-top: 8px; padding: 10px 14px; background: rgba(2,132,199,0.04); border: 1px solid #bae6fd; border-radius: 8px; font-size: 0.84rem; line-height: 1.6;">
              <div style="font-weight: 700; color: #0369a1; margin-bottom: 6px;">Active Journey Workflow Steps Execution:</div>
              <div style="display: flex; flex-direction: column; gap: 5px;">
                <div><strong>1.</strong> Menghubungi nasabah secara empatik terkait tagihan mencurigakan. ✓</div>
                <div><strong>2.</strong> Otentikasi identitas nasabah dengan <span class="tool-pill-badge">UserAuthentication</span> — <em>Status: Verified (MFA Token valid)</em> ✓</div>
                <div><strong>3.</strong> Mengidentifikasi kartu kredit yang terdampak (Visa Platinum #4092). ✓</div>
                <div><strong>4.</strong> Query detail transaksi merchant via <span class="tool-pill-badge">LookupTransaction</span> — <em>Tx: #TX-99023 Rp 1.450.000 (Merchant: Digital Media Ltd)</em> ✓</div>
                <div><strong>5.</strong> Konfirmasi nasabah: Transaksi dinyatakan tidak sah/tidak dikenal. ✓</div>
                <div><strong>6.</strong> Evaluasi indikator fraud via <span class="tool-pill-badge">CheckForFraud</span> — <em>Risk Score: 0.88 (High Risk / Fraud Suspected)</em> ✓</div>
                <div><strong>7.</strong> Membuka dispute ticket #DSP-2026-88 dan memblokir sementara kartu secara aman. ✓</div>
              </div>
            </div>
          </div>
          <div class="test-trace-pill">182ms · 112 tokens · model: claude-3-7-sonnet · trace: #tr-8015</div>
        </div>
      `;
      agentTestFeed.scrollTop = agentTestFeed.scrollHeight;
    }

    // 4. Reset attached context for the fresh session
    attachedDocIds.clear();
    renderAttachedContextChips();

    // 5. Switch Pane & Breadcrumb
    document.querySelectorAll('.studio-pane-section').forEach(p => p.classList.remove('active'));
    paneTestAgent.classList.add('active');

    const crumb = document.getElementById('studioCrumbSub');
    if (crumb) crumb.textContent = `Agents / ${activeAgentName}`;

    window.location.hash = `#test-${activeAgentSlug}`;
  }
  window.openTestPage = openTestPage;

  // ── Back Button Handler ───────────────────────────────────────────────
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      document.body.classList.remove('in-agent-detail');
      const viewport = document.querySelector('.studio-viewport');
      if (viewport) viewport.classList.remove('in-agent-detail');
      document.querySelectorAll('.studio-pane-section').forEach(p => p.classList.remove('active'));
      if (paneAgents) paneAgents.classList.add('active');
      const crumb = document.getElementById('studioCrumbSub');
      if (crumb) crumb.textContent = 'Agents';
      window.location.hash = '#agents';
    });
  }

  // ── Topbar Actions (Settings, Compare, Publish) ───────────────────────
  if (btnAgentPublish) {
    btnAgentPublish.addEventListener('click', () => {
      if (testAgentBadgeEl) {
        testAgentBadgeEl.textContent = 'ACTIVE';
        testAgentBadgeEl.className = 'agent-design-badge active';
        testAgentBadgeEl.style.backgroundColor = '#dcfce7';
        testAgentBadgeEl.style.color = '#15803d';
        testAgentBadgeEl.style.borderColor = '#bbf7d0';
      }
      showStudioToast(`Agent "${activeAgentName}" has been published!`);
    });
  }

  if (btnAgentSettings) {
    btnAgentSettings.addEventListener('click', () => {
      showStudioToast(`Configuring settings for ${activeAgentName}...`);
    });
  }

  if (btnAgentCompare) {
    btnAgentCompare.addEventListener('click', () => {
      showStudioToast(`Compare mode: diffing draft against v1.0 deployment...`);
    });
  }

  // =========================================================================
  // ── LEFT COLUMN: 3-WAY TAB SWITCHER (Chat / Terminal / YAML) ────────────
  // =========================================================================
  let currentDesignMode = 'chat';

  function setDesignMode(mode) {
    currentDesignMode = mode;

    // Update active tab buttons
    if (btnDesignTabChat) btnDesignTabChat.classList.toggle('active', mode === 'chat');
    if (btnDesignTabTerminal) btnDesignTabTerminal.classList.toggle('active', mode === 'terminal');
    if (btnDesignTabYaml) btnDesignTabYaml.classList.toggle('active', mode === 'yaml');

    // Toggle Panes visibility
    if (agentDesignFeed) agentDesignFeed.style.display = (mode === 'chat') ? 'flex' : 'none';
    if (agentDesignTerminalPane) agentDesignTerminalPane.style.display = (mode === 'terminal') ? 'flex' : 'none';
    if (agentDesignYamlPane) agentDesignYamlPane.style.display = (mode === 'yaml') ? 'flex' : 'none';

    // Show chat controls (input prompt card + context accordion) only in Chat mode
    if (agentChatControlsWrapper) {
      agentChatControlsWrapper.style.display = (mode === 'chat') ? 'flex' : 'none';
    }

    // Contextual actions per mode
    if (mode === 'yaml') {
      renderYamlDefinition();
    } else if (mode === 'terminal') {
      if (terminalPaneOutputBody) {
        terminalPaneOutputBody.scrollTop = terminalPaneOutputBody.scrollHeight;
      }
      if (terminalInteractiveInput) {
        terminalInteractiveInput.focus();
      }
    } else if (mode === 'chat') {
      if (agentDesignFeed) {
        agentDesignFeed.scrollTop = agentDesignFeed.scrollHeight;
      }
      if (designPromptInput) {
        designPromptInput.focus();
      }
    }
  }

  if (btnDesignTabChat) {
    btnDesignTabChat.addEventListener('click', () => setDesignMode('chat'));
  }

  if (btnDesignTabTerminal) {
    btnDesignTabTerminal.addEventListener('click', () => {
      setDesignMode('terminal');
      showStudioToast('Switched Claude Code to Terminal console mode.');
    });
  }

  if (btnDesignTabYaml) {
    btnDesignTabYaml.addEventListener('click', () => {
      setDesignMode('yaml');
      showStudioToast(`Viewing specification in agents/${activeAgentSlug}.yaml`);
    });
  }

  // =========================================================================
  // ── YAML GENERATION & SYNTAX HIGHLIGHTING ENGINE ─────────────────────────
  // =========================================================================
  const AGENT_YAML_STORE = {};

  function generateDefaultYaml(slug, name) {
    const isTestAgent = slug.includes('test') || slug === 'agent-test';
    const isArchitect = slug.includes('architect');

    if (isTestAgent) {
      return `# Studio Agent Specification Definition
# Target file: agents/${slug}.yaml
version: "1.0"
slug: ${slug}
name: ${name || 'AGENT TEST'}
intent: TEST
description: "smoke-test agent for verifying the platform round-trip"

instruction: |
  Fixed four-line echo response:
  OK
  received: <input>
  length: <input_len>
  turn: <turn_num>

  Explicit rules against tidying up the echoed input,
  since a cleaned-up echo would mask a transport bug.

tools: []
guardrails: []
knowledge: []

model:
  provider: xai
  id: grok-4.3
  reasoningEffort: none
  fallback:
    provider: xai
    id: grok-4.6

limits:
  maxTurns: 4
  maxTokensPerRun: 20000
  autonomyLimit: 2

metadata:
  createdVia: "claude-code-cli"
  platform: "Zenith Studio v3.2"
  syncStatus: "synced"
  lastModified: "2026-09-10T10:39:35Z"`;
    }

    if (isArchitect) {
      return `# Studio Agent Specification Definition
# Target file: agents/${slug}.yaml
version: "2.1"
slug: ${slug}
name: "${name || 'Zenith BA Architect'}"
intent: ARCHITECTURE_ANALYSIS
description: "Decomposes enterprise PRDs into user stories, acceptance criteria, and BDD scenarios"

instruction: |
  You are the Zenith Business Analyst Architect.
  Your role is to ingest platform PRDs, API schemas, and architectural briefs.
  Structure requirements into clean user stories with Gherkin BDD syntax:
  Given-When-Then criteria, non-functional constraints, and security bounds.

model:
  provider: anthropic
  id: claude-3-7-sonnet
  reasoningEffort: high
  fallback:
    provider: anthropic
    id: claude-3-5-sonnet

limits:
  maxTurns: 16
  maxTokensPerRun: 120000
  autonomyLimit: 6

tools:
  - name: "spec_validator"
    enabled: true
  - name: "jira_schema_sync"
    enabled: true

guardrails:
  enforceGherkinSyntax: true
  preventAmbiguousScopes: true
  maxStoryPoints: 13

knowledge:
  - path: "docs/PRD_Template_v2.md"
  - path: "lib/api-spec/openapi.yaml"

journeys:
  - id: journey-transaction-dispute
    name: "Transaction Dispute"
    description: "The customer mentions a suspicious, unrecognized, or incorrect charge."
    criteria: "Help the customer resolve a disputed transaction."
    tools:
      - name: UserAuthentication
        type: tool
      - name: LookupTransaction
        type: tool
      - name: CheckForFraud
        type: tool
    guidance:
      - "1. Greet the customer empathetically and ask how you can help."
      - "2. Authenticate the user with @UserAuthentication."
      - "3. Ask which credit card is affected (if they have multiple)."
      - "4. Gather details on the merchant and date of transaction."
      - "5. Find transaction using @LookupTransaction."
      - "6. Confirm with customer that this is the correct transaction."
      - "7. Once confirmed, check @CheckForFraud, and proceed accordingly."

metadata:
  createdVia: "studio-chat-designer"
  platform: "Zenith Studio v3.2"
  syncStatus: "synced"
  lastModified: "2026-09-10T10:39:35Z"`;
    }

    return `# Studio Agent Specification Definition
# Target file: agents/${slug}.yaml
version: "1.0"
slug: ${slug}
name: "${name}"
intent: "GENERAL_EXECUTION"
description: "Autonomous task synthesis and workflow orchestration"

instruction: |
  Autonomous processing agent operating within Zenith Studio boundaries.
  Accepts streamed input, parses payload structures, and delegates execution
  with telemetric observability.

model:
  provider: anthropic
  id: claude-3-7-sonnet
  reasoningEffort: standard

limits:
  maxTurns: 10
  maxTokensPerRun: 80000
  autonomyLimit: 4

tools:
  - name: "system_evaluator"
    enabled: true

guardrails:
  strictValidation: true
  rateLimitPerMinute: 60

metadata:
  createdVia: "studio-chat-designer"
  platform: "Zenith Studio v3.2"
  syncStatus: "synced"
  lastModified: "2026-09-10T10:39:35Z"`;
  }

  function getActiveYamlString() {
    if (!AGENT_YAML_STORE[activeAgentSlug]) {
      AGENT_YAML_STORE[activeAgentSlug] = generateDefaultYaml(activeAgentSlug, activeAgentName);
    }
    return AGENT_YAML_STORE[activeAgentSlug];
  }

  function highlightYaml(rawYaml) {
    const lines = rawYaml.split('\n');
    let html = '';

    lines.forEach((line, idx) => {
      const lineNum = idx + 1;
      let highlighted = escapeHtml(line);

      if (line.trim().startsWith('#')) {
        // Full line comment
        highlighted = `<span class="yaml-token-comment">${highlighted}</span>`;
      } else {
        // Comment at end of line
        const commentIdx = highlighted.indexOf('#');
        let commentPart = '';
        if (commentIdx !== -1) {
          commentPart = `<span class="yaml-token-comment">${highlighted.slice(commentIdx)}</span>`;
          highlighted = highlighted.slice(0, commentIdx);
        }

        // List hyphens
        highlighted = highlighted.replace(/^(\s*)(-)(\s+)/, '$1<span class="yaml-token-dash">$2</span>$3');

        // Key-value pairs (key:)
        highlighted = highlighted.replace(/^(\s*[\w\.\-]+)(:)/, '$1<span class="yaml-token-key">:</span>');
        highlighted = highlighted.replace(/^(\s*)([\w\.\-]+)(:)/, '$1<span class="yaml-token-key">$2</span>:');

        // Strings in quotes
        highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="yaml-token-str">"$1"</span>');

        // Booleans
        highlighted = highlighted.replace(/\b(true|false|none)\b/g, '<span class="yaml-token-bool">$1</span>');

        // Numbers
        highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="yaml-token-num">$1</span>');

        highlighted = highlighted + commentPart;
      }

      html += `
        <div class="yaml-code-line">
          <span class="yaml-line-num font-mono">${lineNum}</span>
          <span class="yaml-line-content font-mono">${highlighted || '&nbsp;'}</span>
        </div>
      `;
    });

    return html;
  }

  function renderYamlDefinition() {
    const yamlStr = getActiveYamlString();
    if (yamlCodeDisplay) {
      yamlCodeDisplay.innerHTML = highlightYaml(yamlStr);
    }
    if (yamlCodeTextarea) {
      yamlCodeTextarea.value = yamlStr;
    }
    if (yamlFilePathTitle) {
      yamlFilePathTitle.textContent = `agents/${activeAgentSlug}.yaml`;
    }
    if (yamlStatsLine) {
      const lineCount = yamlStr.split('\n').length;
      const byteSize = (new Blob([yamlStr]).size / 1024).toFixed(1);
      yamlStatsLine.textContent = `${lineCount} lines · ${byteSize} KB · UTF-8`;
    }
  }

  // ── YAML Pane Actions (Edit, Copy, Export) ─────────────────────────────
  let isYamlEditing = false;

  if (btnToggleEditYaml) {
    btnToggleEditYaml.addEventListener('click', () => {
      isYamlEditing = !isYamlEditing;
      if (isYamlEditing) {
        // Switch to editable textarea
        if (yamlCodeDisplay) yamlCodeDisplay.style.display = 'none';
        if (yamlCodeTextarea) {
          yamlCodeTextarea.style.display = 'block';
          yamlCodeTextarea.value = getActiveYamlString();
          yamlCodeTextarea.focus();
        }
        if (toggleEditYamlText) toggleEditYamlText.textContent = 'Save YAML';
        btnToggleEditYaml.classList.add('active-edit');
        showStudioToast('Direct YAML edit mode enabled.');
      } else {
        // Save textarea content back to store and display
        if (yamlCodeTextarea) {
          const edited = yamlCodeTextarea.value;
          AGENT_YAML_STORE[activeAgentSlug] = edited;
        }
        renderYamlDefinition();
        if (yamlCodeDisplay) yamlCodeDisplay.style.display = 'flex';
        if (yamlCodeTextarea) yamlCodeTextarea.style.display = 'none';
        if (toggleEditYamlText) toggleEditYamlText.textContent = 'Edit YAML';
        btnToggleEditYaml.classList.remove('active-edit');
        showStudioToast(`Saved changes to agents/${activeAgentSlug}.yaml.`);
      }
    });
  }

  if (btnCopyYamlCode) {
    btnCopyYamlCode.addEventListener('click', () => {
      const yamlStr = getActiveYamlString();
      navigator.clipboard.writeText(yamlStr).then(() => {
        showStudioToast(`Copied agents/${activeAgentSlug}.yaml to clipboard!`);
      }).catch(() => {
        showStudioToast('YAML copied to clipboard.');
      });
    });
  }

  if (btnDownloadYamlFile) {
    btnDownloadYamlFile.addEventListener('click', () => {
      const yamlStr = getActiveYamlString();
      const blob = new Blob([yamlStr], { type: 'text/yaml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeAgentSlug}.yaml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showStudioToast(`Exported ${activeAgentSlug}.yaml`);
    });
  }

  // =========================================================================
  // ── MODEL SELECTOR (Inside Chat Input Lower Bar) ────────────────────────
  // =========================================================================
  if (btnDesignModelPicker && designModelMenu) {
    btnDesignModelPicker.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = designModelMenu.style.display === 'block';
      designModelMenu.style.display = isOpen ? 'none' : 'block';
      btnDesignModelPicker.classList.toggle('open', !isOpen);
    });

    document.querySelectorAll('.model-menu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const modelName = item.getAttribute('data-model') || 'Claude Code';

        // Update active checkmarks
        document.querySelectorAll('.model-menu-item').forEach(m => m.classList.remove('selected'));
        item.classList.add('selected');

        // Update button text
        if (designSelectedModelName) {
          designSelectedModelName.textContent = modelName;
        }

        // Close menu
        designModelMenu.style.display = 'none';
        btnDesignModelPicker.classList.remove('open');

        // Update prompt placeholder
        if (designPromptInput) {
          designPromptInput.placeholder = `Describe what ${activeAgentName.toUpperCase()} should do — ${modelName} writes the definition...`;
        }

        showStudioToast(`Design engine model switched to ${modelName}.`);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#designModelDropdownContainer')) {
        designModelMenu.style.display = 'none';
        btnDesignModelPicker.classList.remove('open');
      }
    });
  }

  // =========================================================================
  // ── TERMINAL CLI INTERACTION HANDLERS ────────────────────────────────────
  // =========================================================================
  if (terminalInteractiveInput && btnTerminalExec) {
    function executeTerminalCommand() {
      const cmd = terminalInteractiveInput.value.trim();
      if (!cmd) return;

      if (!terminalPaneOutputBody) return;

      // Append user command line
      const userEntry = document.createElement('div');
      userEntry.className = 'terminal-command-entry user-turn';
      userEntry.innerHTML = `
        <div class="term-prompt-line">
          <span class="term-prompt-sym user">user@studio$</span>
          <span class="term-prompt-cmd">${escapeHtml(cmd)}</span>
        </div>
      `;
      terminalPaneOutputBody.appendChild(userEntry);

      terminalInteractiveInput.value = '';
      terminalPaneOutputBody.scrollTop = terminalPaneOutputBody.scrollHeight;

      // Generate realistic CLI output
      setTimeout(() => {
        const replyBlock = document.createElement('div');
        replyBlock.className = 'terminal-block-action';

        const lowerCmd = cmd.toLowerCase();
        if (lowerCmd.startsWith('cat') || lowerCmd.includes('.yaml')) {
          replyBlock.innerHTML = `
            <div class="terminal-block-command highlight">
              <div class="term-tool-badge read">Read</div>
              <div class="term-code-snippet">agents/${activeAgentSlug}.yaml (${getActiveYamlString().split('\n').length} lines)</div>
            </div>
            <p class="term-dim" style="margin-top: 4px; font-size: 0.76rem;">Definition validated: model, limits, instructions synchronized.</p>
          `;
        } else if (lowerCmd.startsWith('ls')) {
          replyBlock.innerHTML = `
            <div class="terminal-block-command">
              <div class="term-tool-badge bash">Bash</div>
              <div class="term-code-snippet">ls -la agents/</div>
            </div>
            <div style="font-size: 0.74rem; color: #8b949e; margin-top: 4px;">
              -rw-r--r-- 1 studio staff  842 Sep 10 10:39 ${activeAgentSlug}.yaml<br>
              -rw-r--r-- 1 studio staff  910 Sep 10 09:20 agent-test.yaml<br>
              -rw-r--r-- 1 studio staff 1240 Sep 09 18:45 zenith-ba-architect.yaml
            </div>
          `;
        } else if (lowerCmd.includes('syntax') || lowerCmd.includes('verify')) {
          replyBlock.innerHTML = `
            <div class="terminal-block-command">
              <div class="term-tool-badge bash">Verify</div>
              <div class="term-code-snippet">yamllint agents/${activeAgentSlug}.yaml</div>
            </div>
            <p class="term-green" style="margin-top: 4px; font-size: 0.76rem;">[OK] agents/${activeAgentSlug}.yaml: 0 errors, 0 warnings. Valid YAML 1.2 schema.</p>
          `;
        } else if (lowerCmd.includes('diff')) {
          replyBlock.innerHTML = `
            <div class="terminal-block-command">
              <div class="term-tool-badge bash">Git</div>
              <div class="term-code-snippet">git diff agents/${activeAgentSlug}.yaml</div>
            </div>
            <div style="font-size: 0.74rem; color: #3fb950; margin-top: 4px;">
              + limits.autonomyLimit: 2<br>
              + limits.maxTurns: 4<br>
              + instruction: fixed echo probe specification
            </div>
          `;
        } else {
          replyBlock.innerHTML = `
            <div class="terminal-block-command highlight">
              <div class="term-tool-badge write">Write</div>
              <div class="term-code-snippet">agents/${activeAgentSlug}.yaml</div>
            </div>
            <p class="term-dim" style="margin-top: 4px; font-size: 0.76rem;">Applied CLI instruction: <em>"${escapeHtml(cmd)}"</em>. Scaffold updated and saved.</p>
          `;
        }

        terminalPaneOutputBody.appendChild(replyBlock);
        terminalPaneOutputBody.scrollTop = terminalPaneOutputBody.scrollHeight;
      }, 350);
    }

    btnTerminalExec.addEventListener('click', executeTerminalCommand);
    terminalInteractiveInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeTerminalCommand();
      }
    });

    // Terminal Quick Chips
    document.querySelectorAll('.term-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        let cmd = chip.getAttribute('data-cmd') || '';
        cmd = cmd.replace('agent-test.yaml', `${activeAgentSlug}.yaml`);
        terminalInteractiveInput.value = cmd;
        executeTerminalCommand();
      });
    });

    // Terminal Clear button
    if (btnTerminalClearOutput) {
      btnTerminalClearOutput.addEventListener('click', () => {
        if (terminalPaneOutputBody) {
          terminalPaneOutputBody.innerHTML = `
            <div class="terminal-log-intro">
              <span class="term-dim">Terminal cleared. Active session: ${activeAgentSlug}.yaml</span>
            </div>
          `;
          showStudioToast('Terminal screen cleared.');
        }
      });
    }

    // Terminal Restart button
    if (btnTerminalRestartSession) {
      btnTerminalRestartSession.addEventListener('click', () => {
        showStudioToast('Restarted Claude Code CLI session.');
      });
    }

    // Terminal Copy Log button
    if (btnTerminalCopyLog) {
      btnTerminalCopyLog.addEventListener('click', () => {
        if (terminalPaneOutputBody) {
          navigator.clipboard.writeText(terminalPaneOutputBody.innerText).then(() => {
            showStudioToast('Terminal CLI log copied to clipboard.');
          });
        }
      });
    }
  }

  // ── Left Column: Build Session Accordion ──────────────────────────────
  if (btnAgentBuildSession) {
    btnAgentBuildSession.addEventListener('click', () => {
      showStudioToast(`Build session active for agents/${activeAgentSlug}.yaml (0 errors).`);
    });
  }

  // ── RIGHT COLUMN: CHAT / SIMULATIONS SUITE ENGINE ────────────────────
  const agentSimulationsContainer = document.getElementById('agentSimulationsContainer');
  const agentTestInputCard = document.getElementById('agentTestInputCard');
  const agentDualStudioContainer = document.querySelector('.agent-dual-studio-container');

  const simViewList = document.getElementById('simViewList');
  const simViewDetail = document.getElementById('simViewDetail');
  const btnSimBackToList = document.getElementById('btnSimBackToList');
  const btnRunSimulation = document.getElementById('btnRunSimulation');
  const btnSimPreviewRun = document.getElementById('btnSimPreviewRun');
  const simRightPaneInitial = document.getElementById('simRightPaneInitial');
  const simRightPaneRunning = document.getElementById('simRightPaneRunning');
  const simPersonaChatMessages = document.getElementById('simPersonaChatMessages');
  const simActiveChatPersonaName = document.getElementById('simActiveChatPersonaName');
  const simActiveAgentCardName = document.getElementById('simActiveAgentCardName');
  const simTargetAgentName = document.getElementById('simTargetAgentName');

  const simDetailScenarioTitle = document.getElementById('simDetailScenarioTitle');
  const simDetailScenarioDesc = document.getElementById('simDetailScenarioDesc');
  const simDetailPersonaCount = document.getElementById('simDetailPersonaCount');
  const simDetailCriteriaCount = document.getElementById('simDetailCriteriaCount');
  const simUserInstructionsText = document.getElementById('simUserInstructionsText');
  const simExpectedBehaviorList = document.getElementById('simExpectedBehaviorList');

  const simStep1 = document.getElementById('simStep1');
  const simStep2 = document.getElementById('simStep2');
  const simStep3 = document.getElementById('simStep3');

  const btnSimHistoryList = document.getElementById('btnSimHistoryList');
  const btnSimHistoryDetail = document.getElementById('btnSimHistoryDetail');
  const simSearchScenarioInput = document.getElementById('simSearchScenarioInput');
  const simSettingsToggle = document.getElementById('simSettingsToggle');
  const btnNewSimulation = document.getElementById('btnNewSimulation');

  let currentActiveScenario = 'transaction-dispute';
  let currentActivePersona = 'normal';

  const SIMULATION_SCENARIOS = {
    'transaction-dispute': {
      title: 'Transaction Dispute',
      desc: 'Test how the agent handles a suspicious, unrecognized, or incorrect charge.',
      personas: '3 personas',
      criteria: '5 criteria',
      instructions: "The customer reports a suspicious charge on their card. They don't recognize the transaction and want it investigated.",
      behaviors: [
        'Authenticate the customer',
        'Ask for transaction details',
        'Lookup the transaction',
        'Check for fraud',
        'Provide appropriate resolution'
      ],
      dialogues: {
        normal: [
          { sender: 'User', text: 'Hi, I noticed a charge on my card that I don\'t recognize. Can you help me with this?', time: '00:12' },
          { sender: 'Agent', text: 'Of course! I\'m here to help you. Could you please tell me which card was affected and when you noticed the charge?', time: '00:18' },
          { sender: 'User', text: 'It\'s my Visa card. I saw the charge this morning.', time: '00:25' },
          { sender: 'Agent', text: 'Thank you. I\'ll verify your identity first for security. Could you please confirm your full name, date of birth, and the last 4 digits of your card?', time: '00:32' }
        ],
        confused: [
          { sender: 'User', text: 'Hello, there is some money missing from my account or card, I don\'t really understand what happened...', time: '00:10' },
          { sender: 'Agent', text: 'Don\'t worry, I will assist you step by step. Let\'s look at your recent card activity. Do you have your card with you?', time: '00:16' },
          { sender: 'User', text: 'Yes, I have it here. It says Visa Platinum.', time: '00:24' },
          { sender: 'Agent', text: 'Great. I will guide you through confirming your identity so we can safely review the charges together.', time: '00:31' }
        ],
        difficult: [
          { sender: 'User', text: 'Why was my card billed Rp 1.450.000 for something I never bought?! Refund it immediately!', time: '00:08' },
          { sender: 'Agent', text: 'I understand your concern and frustration regarding this unrecognized charge. I am prioritizing your dispute right now to protect your funds.', time: '00:14' },
          { sender: 'User', text: 'Good. Block that merchant and cancel the transaction right now.', time: '00:22' },
          { sender: 'Agent', text: 'I am initiating security verification to immediately freeze the card against further unauthorized charges and open a formal dispute ticket.', time: '00:29' }
        ]
      }
    },
    'card-lost': {
      title: 'Card Lost While Traveling',
      desc: 'Customer kehilangan kartu saat bepergian di luar negeri.',
      personas: '3 personas',
      criteria: '4 criteria',
      instructions: 'The customer is overseas and has lost their physical card. They need emergency assistance, instant card lock, and emergency cash or card replacement.',
      behaviors: [
        'Verify cardholder identity safely',
        'Lock lost card immediately',
        'Assess emergency fund requirements',
        'Arrange overseas emergency replacement dispatch'
      ],
      dialogues: {
        normal: [
          { sender: 'User', text: 'Help, I lost my wallet with my card while traveling in Tokyo today.', time: '00:09' },
          { sender: 'Agent', text: 'I understand this is urgent. I will secure your account immediately. Are you in a safe location right now?', time: '00:15' },
          { sender: 'User', text: 'Yes, I am back at the hotel.', time: '00:21' },
          { sender: 'Agent', text: 'Understood. I have temporarily frozen your card to prevent unauthorized charges. Let\'s check if any charges occurred in the last few hours.', time: '00:28' }
        ],
        confused: [
          { sender: 'User', text: 'I can\'t find my card in my bag at the airport, maybe I dropped it at the train station?', time: '00:11' },
          { sender: 'Agent', text: 'Let\'s secure your card right away. We can temporarily lock it while you check, or issue an emergency replacement.', time: '00:17' }
        ],
        difficult: [
          { sender: 'User', text: 'My card was stolen in Paris! I need cash right now to check in to my hotel!', time: '00:06' },
          { sender: 'Agent', text: 'I am locking your card immediately to safeguard your funds, and activating Emergency Cash Access for pickup at the nearest partner branch.', time: '00:13' }
        ]
      }
    },
    'cant-activate': {
      title: "Can't Activate Replacement Card",
      desc: 'Customer tidak bisa mengaktifkan kartu pengganti.',
      personas: '3 personas',
      criteria: '4 criteria',
      instructions: 'The customer received a replacement card in the mail but the activation fails via the mobile app or SMS channel.',
      behaviors: [
        'Verify card delivery status',
        'Check activation lock flags in core ledger',
        'Validate CVV and expiration date format',
        'Activate card securely with OTP step'
      ],
      dialogues: {
        normal: [
          { sender: 'User', text: 'I just received my replacement card but the app says error when I enter the last 4 digits.', time: '00:14' },
          { sender: 'Agent', text: 'I can help you activate your new card right now. May I verify the reference number printed on your delivery mailer?', time: '00:20' }
        ]
      }
    },
    'emergency-cash': {
      title: 'Emergency Cash Access',
      desc: 'Customer membutuhkan akses dana darurat.',
      personas: '3 personas',
      criteria: '4 criteria',
      instructions: 'The customer has an urgent requirement for cash withdrawal while physical cards are unavailable or damaged.',
      behaviors: [
        'Verify customer biometric authentication',
        'Confirm emergency fund limits',
        'Generate one-time ATM emergency withdrawal code',
        'Provide partner ATM location instructions'
      ],
      dialogues: {
        normal: [
          { sender: 'User', text: 'My card was swallowed by the machine and I need emergency cash today.', time: '00:10' },
          { sender: 'Agent', text: 'I will assist you in generating an instant cardless Emergency Cash code for withdrawal at our network ATMs.', time: '00:16' }
        ]
      }
    },
    'unexpected-fees': {
      title: 'Unexpected Fees',
      desc: 'Customer menanyakan biaya yang tidak dikenal.',
      personas: '3 personas',
      criteria: '3 criteria',
      instructions: 'The customer notices an unfamiliar recurring fee or international surcharge on their monthly billing statement.',
      behaviors: [
        'Explain fee origin and breakdown clearly',
        'Check waiver eligibility criteria',
        'Process courtesy fee reversal if applicable'
      ],
      dialogues: {
        normal: [
          { sender: 'User', text: 'There is a Rp 75.000 fee on my statement that I don\'t recognize.', time: '00:11' },
          { sender: 'Agent', text: 'Let me review the line item for you. That corresponds to the annual card membership assessment. Let me check if you qualify for a fee waiver.', time: '00:18' }
        ]
      }
    },
    'balance-history': {
      title: 'Balance and Transaction History',
      desc: 'Customer meminta informasi saldo dan riwayat transaksi.',
      personas: '3 personas',
      criteria: '3 criteria',
      instructions: 'The customer requests recent statement summaries, categorized spending, and ledger balance queries.',
      behaviors: [
        'Authenticate cardholder identity',
        'Query real-time ledger balance',
        'Summarize recent transactions chronologically'
      ],
      dialogues: {
        normal: [
          { sender: 'User', text: 'Can you show me my remaining available balance and transactions from this week?', time: '00:12' },
          { sender: 'Agent', text: 'Certainly! Your current available credit balance is Rp 18.550.000. Here are your 3 most recent transactions from this week...', time: '00:18' }
        ]
      }
    }
  };

  // Switch between Chat and Simulations tabs
  function setTestColumnView(viewMode) {
    const testJourneyGrp = document.getElementById('testJourneyAccordionGroup');
    const testHint = document.getElementById('testFooterHint');

    if (viewMode === 'simulations') {
      if (btnTabSimulations) btnTabSimulations.classList.add('active');
      if (btnTabChatRun) btnTabChatRun.classList.remove('active');

      if (agentDualStudioContainer) agentDualStudioContainer.classList.add('mode-simulations');
      if (agentTestFeed) agentTestFeed.style.display = 'none';
      if (agentTestInputCard) agentTestInputCard.style.display = 'none';
      if (testJourneyGrp) testJourneyGrp.style.display = 'none';
      if (testHint) testHint.style.display = 'none';
      if (btnNewConversationTest) btnNewConversationTest.style.display = 'none';
      if (agentSimulationsContainer) agentSimulationsContainer.style.display = 'flex';

      // Reset to View A (Scenario list)
      if (simViewList) simViewList.style.display = 'block';
      if (simViewDetail) simViewDetail.style.display = 'none';
      const simHist = document.getElementById('simViewHistory');
      if (simHist) simHist.style.display = 'none';

      // Update active agent labels
      const upperName = activeAgentName.toUpperCase();
      if (simActiveAgentCardName) simActiveAgentCardName.textContent = upperName;
      if (simTargetAgentName) simTargetAgentName.textContent = upperName;

      showStudioToast('Opened Simulations suite: Pick a scenario to evaluate.');
    } else {
      if (btnTabChatRun) btnTabChatRun.classList.add('active');
      if (btnTabSimulations) btnTabSimulations.classList.remove('active');

      if (agentDualStudioContainer) agentDualStudioContainer.classList.remove('mode-simulations');
      if (agentSimulationsContainer) agentSimulationsContainer.style.display = 'none';
      if (agentTestFeed) agentTestFeed.style.display = 'flex';
      if (agentTestInputCard) agentTestInputCard.style.display = 'block';
      if (testJourneyGrp) testJourneyGrp.style.display = 'block';
      if (testHint) testHint.style.display = 'block';
      if (btnNewConversationTest) btnNewConversationTest.style.display = 'block';
    }
  }

  if (btnTabChatRun) {
    btnTabChatRun.addEventListener('click', () => setTestColumnView('chat'));
  }
  if (btnTabSimulations) {
    btnTabSimulations.addEventListener('click', () => setTestColumnView('simulations'));
  }

  // Populate Scenario Detail View (View B)
  function openScenarioDetail(scenarioId) {
    const data = SIMULATION_SCENARIOS[scenarioId] || SIMULATION_SCENARIOS['transaction-dispute'];
    currentActiveScenario = scenarioId;
    currentActivePersona = 'normal';

    if (simDetailScenarioTitle) simDetailScenarioTitle.textContent = data.title;
    if (simDetailScenarioDesc) simDetailScenarioDesc.textContent = data.desc;
    if (simDetailPersonaCount) simDetailPersonaCount.textContent = data.personas;
    if (simDetailCriteriaCount) simDetailCriteriaCount.textContent = data.criteria;
    if (simUserInstructionsText) simUserInstructionsText.textContent = data.instructions;

    // Render expected behaviors list
    if (simExpectedBehaviorList) {
      simExpectedBehaviorList.innerHTML = data.behaviors.map(b => `
        <div class="sim-behavior-item">
          <span class="sim-behavior-check">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span>${escapeHtml(b)}</span>
        </div>
      `).join('');
    }

    // Reset Stepper
    if (simStep1) {
      simStep1.className = 'sim-step-item active';
      simStep1.querySelector('.sim-step-number').textContent = '1';
    }
    if (simStep2) {
      simStep2.className = 'sim-step-item';
      simStep2.querySelector('.sim-step-number').textContent = '2';
    }
    if (simStep3) {
      simStep3.className = 'sim-step-item';
      simStep3.querySelector('.sim-step-number').textContent = '3';
    }

    // Reset Persona cards selection
    document.querySelectorAll('.sim-persona-item').forEach(card => {
      if (card.getAttribute('data-persona') === 'normal') {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Reset Right Pane: Show Initial Concept State, Hide Running & Verdict States
    const simRightPaneVerdict = document.getElementById('simRightPaneVerdict');
    if (simRightPaneInitial) simRightPaneInitial.style.display = 'flex';
    if (simRightPaneRunning) simRightPaneRunning.style.display = 'none';
    if (simRightPaneVerdict) simRightPaneVerdict.style.display = 'none';

    // Switch Views
    if (simViewList) simViewList.style.display = 'none';
    if (simViewDetail) simViewDetail.style.display = 'flex';

    // Scroll to top of simulations container
    if (agentSimulationsContainer) agentSimulationsContainer.scrollTop = 0;
  }

  // Render Persona Conversation Stream
  function renderPersonaDialogue(scenarioId, personaKey) {
    const sc = SIMULATION_SCENARIOS[scenarioId] || SIMULATION_SCENARIOS['transaction-dispute'];
    const msgs = (sc.dialogues && sc.dialogues[personaKey]) || (sc.dialogues && sc.dialogues['normal']) || [];

    const personaLabels = {
      normal: 'Persona: Normal Customer',
      confused: 'Persona: Confused Customer',
      difficult: 'Persona: Difficult Customer'
    };
    if (simActiveChatPersonaName) {
      simActiveChatPersonaName.textContent = personaLabels[personaKey] || 'Persona: Normal Customer';
    }

    if (!simPersonaChatMessages) return;

    simPersonaChatMessages.innerHTML = msgs.map(m => {
      const isUser = m.sender.toLowerCase() === 'user';
      return `
        <div class="sim-msg-row ${isUser ? 'sim-msg-user' : 'sim-msg-agent'}">
          <div class="sim-msg-avatar ${isUser ? 'user-avatar' : 'agent-avatar'}">
            ${isUser
              ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`
              : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`
            }
          </div>
          <div class="sim-msg-content">
            <div class="sim-msg-sender-label">${escapeHtml(m.sender)}</div>
            <div class="sim-msg-bubble ${isUser ? 'user-bubble' : 'agent-bubble'}">
              ${escapeHtml(m.text)}
            </div>
            <span class="sim-msg-timestamp">${escapeHtml(m.time)}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Simulation Verdict & Completed Analysis (State 3)
  function renderSimulationVerdict(scenarioId) {
    const sc = SIMULATION_SCENARIOS[scenarioId] || SIMULATION_SCENARIOS['transaction-dispute'];
    const simRightPaneVerdict = document.getElementById('simRightPaneVerdict');
    const simVerdictScenarioTitle = document.getElementById('simVerdictScenarioTitle');
    const simVerdictCriteriaList = document.getElementById('simVerdictCriteriaList');
    const simVerdictConversationStream = document.getElementById('simVerdictConversationStream');
    const simTraceJsonContent = document.getElementById('simTraceJsonContent');

    // Stepper updates to Step 3 (Verdict)
    if (simStep1) {
      simStep1.className = 'sim-step-item';
      simStep1.querySelector('.sim-step-number').textContent = '✓';
    }
    if (simStep2) {
      simStep2.className = 'sim-step-item';
      simStep2.querySelector('.sim-step-number').textContent = '✓';
    }
    if (simStep3) {
      simStep3.className = 'sim-step-item active';
      simStep3.querySelector('.sim-step-number').textContent = '3';
    }

    // Toggle Panes: Hide Initial & Running, Show Verdict
    if (simRightPaneInitial) simRightPaneInitial.style.display = 'none';
    if (simRightPaneRunning) simRightPaneRunning.style.display = 'none';
    if (simRightPaneVerdict) simRightPaneVerdict.style.display = 'flex';

    if (simVerdictScenarioTitle) {
      simVerdictScenarioTitle.textContent = sc.title;
    }

    // Populate Expected Behaviors list
    if (simVerdictCriteriaList) {
      const behaviors = sc.behaviors || [
        'Authenticate user',
        'Ask affected card',
        'Find transaction',
        'Confirm transaction'
      ];

      const passedItemsHtml = behaviors.slice(0, 4).map(b => `
        <div class="sim-criteria-row passed">
          <span class="sim-criteria-icon passed">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          <span class="sim-criteria-text">${escapeHtml(b)}</span>
        </div>
      `).join('');

      const warningItemHtml = `
        <div class="sim-criteria-row warning">
          <span class="sim-criteria-icon warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </span>
          <div class="sim-criteria-warning-details">
            <div class="sim-criteria-warning-title">CheckForFraud</div>
            <div class="sim-criteria-warning-desc">Completed but not explicitly communicated to customer.</div>
          </div>
        </div>
      `;

      simVerdictCriteriaList.innerHTML = passedItemsHtml + warningItemHtml;
    }

    // Populate Conversation Transcript
    if (simVerdictConversationStream) {
      const msgs = (sc.dialogues && sc.dialogues[currentActivePersona]) || (sc.dialogues && sc.dialogues['normal']) || [
        { sender: 'User', text: "I have a charge on my card that I don't recognize. Can you help me with this?" },
        { sender: 'Agent', text: "I'm sorry to hear that. I'm here to help you resolve this. Could you please confirm your full name and the last 4 digits of your card for security?" }
      ];

      simVerdictConversationStream.innerHTML = msgs.map(m => {
        const isUser = m.sender.toLowerCase() === 'user';
        return `
          <div class="sim-verdict-msg-box ${isUser ? 'user' : 'agent'}">
            <div class="sim-verdict-sender-tag">${escapeHtml(m.sender.toUpperCase())}</div>
            <div class="sim-verdict-msg-bubble">${escapeHtml(m.text)}</div>
          </div>
        `;
      }).join('');
    }

    // Update Trace JSON Content
    if (simTraceJsonContent) {
      simTraceJsonContent.textContent = JSON.stringify({
        scenario_id: scenarioId,
        scenario_title: sc.title,
        persona: currentActivePersona,
        verdict: {
          status: "PASSED",
          score: 0.92,
          criteria_passed: 4,
          criteria_total: 5
        },
        tool_calls: [
          { name: "UserAuthentication", status: "COMPLETED", duration_ms: 28 },
          { name: "LookupTransaction", status: "COMPLETED", duration_ms: 35 },
          { name: "CheckForFraud", status: "COMPLETED_UNREPORTED", duration_ms: 42 }
        ],
        reasoning_trace: [
          "1. Intent classified: Cardholder Dispute Investigation.",
          "2. Authenticated user via UserAuthentication.",
          "3. Queried ledger for transaction records via LookupTransaction.",
          "4. Executed CheckForFraud. Anomaly probability within threshold.",
          "5. Locked card temporarily and provided dispute assurance."
        ]
      }, null, 2);
    }
  }

  // Trigger Execution of Simulation (User clicks 'Run Simulation')
  let simProgressTimeout = null;

  function executeSimulationRun() {
    if (simProgressTimeout) clearTimeout(simProgressTimeout);

    const simRightPaneVerdict = document.getElementById('simRightPaneVerdict');

    // Stepper updates
    if (simStep1) {
      simStep1.className = 'sim-step-item';
      simStep1.querySelector('.sim-step-number').textContent = '✓';
    }
    if (simStep2) {
      simStep2.className = 'sim-step-item active running';
      simStep2.querySelector('.sim-step-number').textContent = '2';
    }
    if (simStep3) {
      simStep3.className = 'sim-step-item';
      simStep3.querySelector('.sim-step-number').textContent = '3';
    }

    // Toggle Panes: Hide initial & verdict state, Show active simulation chat
    if (simRightPaneInitial) simRightPaneInitial.style.display = 'none';
    if (simRightPaneVerdict) simRightPaneVerdict.style.display = 'none';
    if (simRightPaneRunning) simRightPaneRunning.style.display = 'flex';

    // Reset progress track
    const progBar = simRightPaneRunning?.querySelector('.sim-progress-bar-fill');
    const progFraction = simRightPaneRunning?.querySelector('.sim-progress-fraction');
    if (progBar) progBar.style.width = '35%';
    if (progFraction) progFraction.textContent = '1 / 3';

    renderPersonaDialogue(currentActiveScenario, currentActivePersona);

    showStudioToast(`Running simulation for "${SIMULATION_SCENARIOS[currentActiveScenario]?.title || 'Scenario'}"...`);

    // Advance progress to 70%
    setTimeout(() => {
      if (progBar) progBar.style.width = '70%';
      if (progFraction) progFraction.textContent = '2 / 3';
    }, 400);

    // Complete progress and transition to Verdict state
    simProgressTimeout = setTimeout(() => {
      if (progBar) progBar.style.width = '100%';
      if (progFraction) progFraction.textContent = '3 / 3';

      setTimeout(() => {
        renderSimulationVerdict(currentActiveScenario);
        showStudioToast('SIMULATION COMPLETED: Score 92% · PASSED.');
      }, 350);
    }, 1100);
  }

  if (btnRunSimulation) {
    btnRunSimulation.addEventListener('click', executeSimulationRun);
  }
  if (btnSimPreviewRun) {
    btnSimPreviewRun.addEventListener('click', executeSimulationRun);
  }

  // Verdict Action Buttons: View Full Trace & Run Again
  const btnSimRunAgain = document.getElementById('btnSimRunAgain');
  if (btnSimRunAgain) {
    btnSimRunAgain.addEventListener('click', executeSimulationRun);
  }

  const btnSimViewFullTrace = document.getElementById('btnSimViewFullTrace');
  const simTraceModal = document.getElementById('simTraceModalBackdrop');
  const btnSimTraceClose = document.getElementById('btnSimTraceClose');
  const btnSimTraceCloseBtn = document.getElementById('btnSimTraceCloseBtn');

  if (btnSimViewFullTrace && simTraceModal) {
    btnSimViewFullTrace.addEventListener('click', () => {
      simTraceModal.style.display = 'flex';
      simTraceModal.classList.add('active');
    });
  }
  if (btnSimTraceClose && simTraceModal) {
    btnSimTraceClose.addEventListener('click', () => {
      simTraceModal.style.display = 'none';
      simTraceModal.classList.remove('active');
    });
  }
  if (btnSimTraceCloseBtn && simTraceModal) {
    btnSimTraceCloseBtn.addEventListener('click', () => {
      simTraceModal.style.display = 'none';
      simTraceModal.classList.remove('active');
    });
  }
  if (simTraceModal) {
    simTraceModal.addEventListener('click', (e) => {
      if (e.target === simTraceModal) {
        simTraceModal.style.display = 'none';
        simTraceModal.classList.remove('active');
      }
    });
  }

  // Stepper Items Click Navigation
  if (simStep1) {
    simStep1.addEventListener('click', () => {
      const simRightPaneVerdict = document.getElementById('simRightPaneVerdict');
      if (simRightPaneInitial) simRightPaneInitial.style.display = 'flex';
      if (simRightPaneRunning) simRightPaneRunning.style.display = 'none';
      if (simRightPaneVerdict) simRightPaneVerdict.style.display = 'none';
    });
  }
  if (simStep2) {
    simStep2.addEventListener('click', () => {
      const simRightPaneVerdict = document.getElementById('simRightPaneVerdict');
      if (simRightPaneRunning && simRightPaneRunning.style.display === 'none') {
        if (simRightPaneInitial) simRightPaneInitial.style.display = 'none';
        if (simRightPaneVerdict) simRightPaneVerdict.style.display = 'none';
        simRightPaneRunning.style.display = 'flex';
      }
    });
  }
  if (simStep3) {
    simStep3.addEventListener('click', () => {
      renderSimulationVerdict(currentActiveScenario);
    });
  }

  // Back Button from Detail View to List View
  if (btnSimBackToList) {
    btnSimBackToList.addEventListener('click', () => {
      if (simViewDetail) simViewDetail.style.display = 'none';
      if (simViewList) simViewList.style.display = 'flex';
      if (agentSimulationsContainer) agentSimulationsContainer.scrollTop = 0;
    });
  }

  // Bind 'Use' buttons on each Scenario Card
  document.querySelectorAll('.btn-sim-use').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.sim-scenario-card');
      const scId = btn.getAttribute('data-scenario') || card?.getAttribute('data-scenario-id') || 'transaction-dispute';

      // Mark card as selected in list
      document.querySelectorAll('.sim-scenario-card').forEach(c => c.classList.remove('selected'));
      if (card) card.classList.add('selected');

      openScenarioDetail(scId);
    });
  });

  // Also clicking the scenario card itself triggers 'Use'
  document.querySelectorAll('.sim-scenario-card').forEach(card => {
    card.addEventListener('click', () => {
      const scId = card.getAttribute('data-scenario-id') || 'transaction-dispute';
      document.querySelectorAll('.sim-scenario-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      openScenarioDetail(scId);
    });
  });

  // Persona item selection
  document.querySelectorAll('.sim-persona-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.sim-persona-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      currentActivePersona = item.getAttribute('data-persona') || 'normal';

      // If running pane is active, update dialogue
      if (simRightPaneRunning && simRightPaneRunning.style.display !== 'none') {
        renderPersonaDialogue(currentActiveScenario, currentActivePersona);
      }
    });
  });

  // Search Filter for Scenario List
  if (simSearchScenarioInput) {
    simSearchScenarioInput.addEventListener('input', () => {
      const q = simSearchScenarioInput.value.toLowerCase().trim();
      document.querySelectorAll('.sim-scenario-card').forEach(card => {
        const title = card.querySelector('.sim-card-title')?.textContent?.toLowerCase() || '';
        const desc = card.querySelector('.sim-card-desc')?.textContent?.toLowerCase() || '';
        if (!q || title.includes(q) || desc.includes(q)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Collapsible Settings
  if (simSettingsToggle) {
    simSettingsToggle.addEventListener('click', () => {
      showStudioToast('Simulation Settings: Concurrency: 3 workers · LLM Evaluator: Claude 3.7 Sonnet · Timeout: 60s');
    });
  }

  // ── Create Simulation Modal Logic ────────────────────────────────────
  const createSimModal = document.getElementById('createSimulationModalBackdrop');
  const btnCreateSimClose = document.getElementById('btnCreateSimClose');
  const btnCancelCreateSim = document.getElementById('btnCancelCreateSimulation');
  const btnSubmitCreateSim = document.getElementById('btnSubmitCreateSimulation');
  const btnAddExpectedBehavior = document.getElementById('btnAddExpectedBehavior');
  const createSimExpectedBehaviorList = document.getElementById('createSimExpectedBehaviorList');
  const expectedBehaviorCountBadge = document.getElementById('expectedBehaviorCountBadge');
  const simNewNameInput = document.getElementById('simNewNameInput');
  const simNewInstructionsInput = document.getElementById('simNewInstructionsInput');

  function updateExpectedBehaviorCount() {
    if (!createSimExpectedBehaviorList || !expectedBehaviorCountBadge) return;
    const rows = createSimExpectedBehaviorList.querySelectorAll('.expected-behavior-row');
    expectedBehaviorCountBadge.textContent = `${rows.length} criteria`;
  }

  function openCreateSimulationModal() {
    if (!createSimModal) return;
    createSimModal.style.display = 'flex';
    createSimModal.classList.add('active');
    if (simNewNameInput) {
      simNewNameInput.focus();
      simNewNameInput.select();
    }
    updateExpectedBehaviorCount();
  }

  function closeCreateSimulationModal() {
    if (!createSimModal) return;
    createSimModal.style.display = 'none';
    createSimModal.classList.remove('active');
  }

  if (btnNewSimulation) {
    btnNewSimulation.addEventListener('click', openCreateSimulationModal);
  }
  if (btnCreateSimClose) {
    btnCreateSimClose.addEventListener('click', closeCreateSimulationModal);
  }
  if (btnCancelCreateSim) {
    btnCancelCreateSim.addEventListener('click', closeCreateSimulationModal);
  }
  if (createSimModal) {
    createSimModal.addEventListener('click', (e) => {
      if (e.target === createSimModal) closeCreateSimulationModal();
    });
  }

  // Add expected behavior row
  if (btnAddExpectedBehavior && createSimExpectedBehaviorList) {
    btnAddExpectedBehavior.addEventListener('click', () => {
      const row = document.createElement('div');
      row.className = 'expected-behavior-row';
      row.innerHTML = `
        <div class="eb-check-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <input type="text" class="eb-item-input" placeholder="Enter expected behavior criteria..." />
        <button type="button" class="btn-remove-eb" title="Remove criterion">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      `;
      createSimExpectedBehaviorList.appendChild(row);
      updateExpectedBehaviorCount();
      const input = row.querySelector('.eb-item-input');
      if (input) input.focus();
    });
  }

  // Remove expected behavior row
  if (createSimExpectedBehaviorList) {
    createSimExpectedBehaviorList.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.btn-remove-eb');
      if (removeBtn) {
        const row = removeBtn.closest('.expected-behavior-row');
        if (row) {
          row.remove();
          updateExpectedBehaviorCount();
        }
      }
    });
  }

  // Submit Create Simulation
  if (btnSubmitCreateSim) {
    btnSubmitCreateSim.addEventListener('click', () => {
      const name = simNewNameInput ? simNewNameInput.value.trim() : '';
      const instructions = simNewInstructionsInput ? simNewInstructionsInput.value.trim() : '';

      if (!name) {
        showStudioToast('Please enter a simulation name.');
        if (simNewNameInput) simNewNameInput.focus();
        return;
      }
      if (!instructions) {
        showStudioToast('Please enter user instructions for the simulation.');
        if (simNewInstructionsInput) simNewInstructionsInput.focus();
        return;
      }

      // Collect behaviors
      const behaviorInputs = createSimExpectedBehaviorList ? createSimExpectedBehaviorList.querySelectorAll('.eb-item-input') : [];
      const behaviors = Array.from(behaviorInputs).map(inp => inp.value.trim()).filter(Boolean);
      if (behaviors.length === 0) {
        behaviors.push('Verify customer identity and authenticate account');
        behaviors.push('Respond accurately to customer request according to policy');
      }

      // Generate scenario ID
      const scenarioSlug = 'sim-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);

      // Register into SIMULATION_SCENARIOS
      SIMULATION_SCENARIOS[scenarioSlug] = {
        title: name,
        desc: instructions.length > 75 ? instructions.slice(0, 75) + '...' : instructions,
        personas: '3 personas',
        criteria: `${behaviors.length} criteria`,
        instructions: instructions,
        behaviors: behaviors,
        dialogues: {
          normal: [
            { sender: 'User', text: `Help! ${instructions.slice(0, 110)}`, time: '00:09' },
            { sender: 'Agent', text: `I understand and am ready to assist. ${behaviors[0] || 'Let me authenticate your account immediately.'}`, time: '00:15' },
            { sender: 'User', text: 'Yes, please proceed right away.', time: '00:22' },
            { sender: 'Agent', text: `Confirmed. Initiating: ${behaviors[1] || 'action complete'}. Everything is now secure and in order.`, time: '00:28' }
          ],
          confused: [
            { sender: 'User', text: `I'm not sure what happened with my card while traveling abroad. Can you guide me?`, time: '00:11' },
            { sender: 'Agent', text: `Don't worry, I will guide you step by step. First: ${behaviors[0] || 'let\'s verify your card details.'}`, time: '00:18' }
          ],
          difficult: [
            { sender: 'User', text: `This is completely unacceptable, my card was stolen and I need resolution NOW!`, time: '00:06' },
            { sender: 'Agent', text: `I take this matter very seriously and am locking your compromised card immediately to prevent unauthorized activity. We are also arranging ${behaviors[behaviors.length - 1] || 'emergency access'}.`, time: '00:14' }
          ]
        }
      };

      // Add new card to scenario cards list in View A
      const cardsList = document.querySelector('.sim-scenario-cards-list');
      if (cardsList) {
        const newCard = document.createElement('div');
        newCard.className = 'sim-scenario-card selected';
        newCard.setAttribute('data-scenario-id', scenarioSlug);
        newCard.innerHTML = `
          <div class="sim-card-icon-wrap icon-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div class="sim-card-info">
            <h4 class="sim-card-title">${escapeHtml(name)}</h4>
            <p class="sim-card-desc">${escapeHtml(instructions.slice(0, 80))}</p>
          </div>
          <button type="button" class="btn-sim-use" data-scenario="${scenarioSlug}">Use</button>
        `;

        // Deselect other cards
        cardsList.querySelectorAll('.sim-scenario-card').forEach(c => c.classList.remove('selected'));
        cardsList.prepend(newCard);

        // Bind clicks on the new card
        newCard.querySelector('.btn-sim-use').addEventListener('click', (e) => {
          e.stopPropagation();
          cardsList.querySelectorAll('.sim-scenario-card').forEach(c => c.classList.remove('selected'));
          newCard.classList.add('selected');
          openScenarioDetail(scenarioSlug);
        });

        newCard.addEventListener('click', () => {
          cardsList.querySelectorAll('.sim-scenario-card').forEach(c => c.classList.remove('selected'));
          newCard.classList.add('selected');
          openScenarioDetail(scenarioSlug);
        });
      }

      // Close modal
      closeCreateSimulationModal();

      // Show toast
      showStudioToast(`Simulation "${name}" created with ${behaviors.length} criteria!`);

      // Open new scenario in Detail View immediately
      openScenarioDetail(scenarioSlug);
    });
  }

  // View History Elements & Navigation
  const simViewHistory = document.getElementById('simViewHistory');
  const btnSimHistoryBack = document.getElementById('btnSimHistoryBack');

  function openSimulationHistory() {
    if (!simViewHistory) return;
    if (simViewList) simViewList.style.display = 'none';
    if (simViewDetail) simViewDetail.style.display = 'none';
    simViewHistory.style.display = 'flex';
    if (agentSimulationsContainer) agentSimulationsContainer.scrollTop = 0;
  }

  function closeSimulationHistory() {
    if (!simViewHistory) return;
    simViewHistory.style.display = 'none';
    if (simViewList) simViewList.style.display = 'block';
    if (agentSimulationsContainer) agentSimulationsContainer.scrollTop = 0;
  }

  if (btnSimHistoryList) {
    btnSimHistoryList.addEventListener('click', openSimulationHistory);
  }
  if (btnSimHistoryDetail) {
    btnSimHistoryDetail.addEventListener('click', openSimulationHistory);
  }
  if (btnSimHistoryBack) {
    btnSimHistoryBack.addEventListener('click', closeSimulationHistory);
  }

  // Filter pills on history view
  document.querySelectorAll('.sim-filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.sim-filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      document.querySelectorAll('.sim-history-card').forEach(card => {
        if (filter === 'all' || card.getAttribute('data-result') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // View buttons on history cards
  document.querySelectorAll('.btn-sim-hist-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const scenarioId = btn.getAttribute('data-scenario') || 'transaction-dispute';
      if (simViewHistory) simViewHistory.style.display = 'none';
      openScenarioDetail(scenarioId);
      executeSimulationRun();
    });
  });

  // ── Right Column: New conversation ────────────────────────────────────
  if (btnNewConversationTest) {
    btnNewConversationTest.addEventListener('click', () => {
      if (agentTestFeed) {
        const upperName = activeAgentName.toUpperCase();
        agentTestFeed.innerHTML = `
          <div class="test-feed-empty-state" id="testFeedEmptyState">
            <div class="test-empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <p class="test-empty-tagline" id="testEmptyTagline">
              Talk to the draft of <strong>${escapeHtml(upperName)}</strong> through the run API — streamed, with a trace on every reply.
            </p>
          </div>
        `;
      }
      if (testPromptInput) testPromptInput.value = '';
      showStudioToast('Started a fresh conversation session.');
    });
  }

  // =========================================================================
  // CONTEXT DOCUMENTS MODAL & ATTACHMENT LOGIC
  // =========================================================================
  function renderVaultChecklist(filterText = '') {
    if (!contextDocsChecklist) return;
    contextDocsChecklist.innerHTML = '';

    const query = (filterText || '').toLowerCase().trim();
    const filteredDocs = VAULT_DOCS.filter(doc =>
      !query || doc.name.toLowerCase().includes(query) || doc.type.toLowerCase().includes(query)
    );

    if (filteredDocs.length === 0) {
      contextDocsChecklist.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #94a3b8; font-size: 0.825rem;">
          No matching documents found in context vault.
        </div>
      `;
      return;
    }

    filteredDocs.forEach(doc => {
      const isSelected = tempModalSelectedIds.has(doc.id);
      const item = document.createElement('div');
      item.className = `context-check-item ${isSelected ? 'selected' : ''}`;
      item.setAttribute('data-doc-id', doc.id);

      item.innerHTML = `
        <input type="checkbox" id="check-${doc.id}" ${isSelected ? 'checked' : ''} />
        <div class="context-item-info">
          <div class="context-item-name">${escapeHtml(doc.name)}</div>
          <div class="context-item-meta">
            <span>${escapeHtml(doc.size)}</span>
            <span>·</span>
            <span>${escapeHtml(doc.type)}</span>
            <span>·</span>
            <span class="context-token-pill">${escapeHtml(doc.tokens)}</span>
            <span>·</span>
            <span>${escapeHtml(doc.date)}</span>
          </div>
        </div>
      `;

      item.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT') {
          const cb = item.querySelector('input[type="checkbox"]');
          if (cb) cb.checked = !cb.checked;
        }
        const cb = item.querySelector('input[type="checkbox"]');
        if (cb.checked) {
          tempModalSelectedIds.add(doc.id);
          item.classList.add('selected');
        } else {
          tempModalSelectedIds.delete(doc.id);
          item.classList.remove('selected');
        }
        updateModalSelectionCount();
      });

      contextDocsChecklist.appendChild(item);
    });

    updateModalSelectionCount();
  }

  function updateModalSelectionCount() {
    const count = tempModalSelectedIds.size;
    if (modalSelectedCountText) {
      modalSelectedCountText.textContent = `${count} document${count === 1 ? '' : 's'} selected`;
    }
    if (btnModalApplyCount) {
      btnModalApplyCount.textContent = count;
    }
  }

  function openContextModal() {
    if (!contextModal) return;
    tempModalSelectedIds = new Set(attachedDocIds);
    if (contextModalSearchInput) contextModalSearchInput.value = '';
    renderVaultChecklist();
    contextModal.classList.add('active');
  }

  function closeContextModal() {
    if (!contextModal) return;
    contextModal.classList.remove('active');
  }

  function renderAttachedContextChips() {
    if (!agentAttachedChipsWrapper || !agentAttachedContextBar) return;
    agentAttachedChipsWrapper.innerHTML = '';

    const count = attachedDocIds.size;

    if (agentContextCountText) {
      agentContextCountText.textContent = `${count} file${count === 1 ? '' : 's'}`;
    }

    if (count === 0) {
      agentAttachedContextBar.style.display = 'none';
      return;
    }

    agentAttachedContextBar.style.display = 'flex';

    attachedDocIds.forEach(id => {
      const doc = VAULT_DOCS.find(d => d.id === id);
      if (!doc) return;

      const chip = document.createElement('div');
      chip.className = 'context-chip-item';
      chip.innerHTML = `
        <span class="chip-type-tag" style="font-size: 0.68rem; font-weight: 700; padding: 1px 5px; background: rgba(37,99,235,0.08); color: #2563eb; border-radius: 4px;">${escapeHtml(doc.type || 'DOC')}</span>
        <span>${escapeHtml(doc.name)}</span>
        <button type="button" class="btn-remove-chip" data-id="${doc.id}" title="Remove context">×</button>
      `;

      chip.querySelector('.btn-remove-chip').addEventListener('click', (e) => {
        e.stopPropagation();
        attachedDocIds.delete(doc.id);
        renderAttachedContextChips();
        showStudioToast(`Removed "${doc.name}" from active context.`);
      });

      agentAttachedChipsWrapper.appendChild(chip);
    });
  }

  // ── Journey Specification & Publish Workflow ─────────────────────────
  function openJourneyModal() {
    if (!journeyModal) return;
    if (journeyTitleInput && journeyBreadcrumbTitle) {
      journeyBreadcrumbTitle.textContent = journeyTitleInput.value.trim() || 'Transaction Dispute';
    }
    journeyModal.style.display = 'flex';
    journeyModal.classList.add('active');
  }

  function closeJourneyModal() {
    if (!journeyModal) return;
    journeyModal.style.display = 'none';
    journeyModal.classList.remove('active');
    if (journeyAutocompleteMenu) {
      journeyAutocompleteMenu.style.display = 'none';
    }
  }

  if (btnAgentAddJourney) {
    btnAgentAddJourney.addEventListener('click', (e) => {
      e.preventDefault();
      openJourneyModal();
    });
  }

  if (btnTestAddJourney) {
    btnTestAddJourney.addEventListener('click', (e) => {
      e.preventDefault();
      openJourneyModal();
    });
  }

  if (btnJourneyClose) btnJourneyClose.addEventListener('click', closeJourneyModal);
  if (btnJourneyCancel) btnJourneyCancel.addEventListener('click', closeJourneyModal);

  if (journeyModal) {
    journeyModal.addEventListener('click', (e) => {
      if (e.target === journeyModal) closeJourneyModal();
    });
  }

  if (journeyTitleInput && journeyBreadcrumbTitle) {
    journeyTitleInput.addEventListener('input', () => {
      journeyBreadcrumbTitle.textContent = journeyTitleInput.value.trim() || 'Untitled Journey';
    });
  }

  // Insert tool pill helper
  function insertToolBadge(toolName) {
    if (!journeyGuidanceEditor) return;
    journeyGuidanceEditor.focus();

    const badgeHtml = `<span class="tool-pill-badge" contenteditable="false">${escapeHtml(toolName)}</span>&nbsp;`;
    
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && journeyGuidanceEditor.contains(sel.anchorNode)) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = badgeHtml;
      const frag = document.createDocumentFragment();
      let node;
      let lastNode;
      while ((node = tempDiv.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      if (lastNode) {
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } else {
      const stepLines = journeyGuidanceEditor.querySelectorAll('.guidance-step-line');
      if (stepLines.length > 0) {
        stepLines[stepLines.length - 1].insertAdjacentHTML('beforeend', ' ' + badgeHtml);
      } else {
        journeyGuidanceEditor.insertAdjacentHTML('beforeend', badgeHtml);
      }
    }
  }

  // Quick tool buttons
  document.querySelectorAll('.btn-quick-insert-tool').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tool = btn.getAttribute('data-tool');
      insertToolBadge(tool);
    });
  });

  // Autocomplete menu items
  if (journeyAutocompleteMenu) {
    journeyAutocompleteMenu.querySelectorAll('.autocomplete-tool-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tool = item.getAttribute('data-tool');

        // Remove trailing @ character if typed
        const sel = window.getSelection();
        if (sel && sel.anchorNode && sel.anchorNode.nodeType === Node.TEXT_NODE) {
          const text = sel.anchorNode.textContent;
          const atIdx = text.lastIndexOf('@');
          if (atIdx !== -1) {
            sel.anchorNode.textContent = text.substring(0, atIdx);
          }
        }

        insertToolBadge(tool);
        journeyAutocompleteMenu.style.display = 'none';
      });
    });

    // Close autocomplete on click outside
    document.addEventListener('click', (e) => {
      if (!journeyAutocompleteMenu.contains(e.target) && e.target !== journeyGuidanceEditor) {
        journeyAutocompleteMenu.style.display = 'none';
      }
    });
  }

  // Listen for '@' typed inside guidance editor
  if (journeyGuidanceEditor) {
    journeyGuidanceEditor.addEventListener('keyup', (e) => {
      if (e.key === '@') {
        if (journeyAutocompleteMenu) {
          journeyAutocompleteMenu.style.display = 'block';
        }
      } else if (e.key === 'Escape') {
        if (journeyAutocompleteMenu) {
          journeyAutocompleteMenu.style.display = 'none';
        }
      }
    });
  }

  // Publish Journey Handler
  function publishActiveJourney() {
    const title = journeyTitleInput ? journeyTitleInput.value.trim() : 'Transaction Dispute';
    const description = journeyDescInput ? journeyDescInput.value.trim() : '';
    const criteria = journeyCriteriaInput ? journeyCriteriaInput.value.trim() : '';
    const guidanceHtml = journeyGuidanceEditor ? journeyGuidanceEditor.innerHTML : '';

    if (!title || !description || !criteria) {
      showStudioToast('Please fill in required headings: Title, Description, and Criteria.');
      if (!title && journeyTitleInput) journeyTitleInput.focus();
      else if (!description && journeyDescInput) journeyDescInput.focus();
      else if (!criteria && journeyCriteriaInput) journeyCriteriaInput.focus();
      return;
    }

    // Close modal
    closeJourneyModal();

    // Ensure we are in Chat mode
    setDesignMode('chat');

    // Remove empty state in design feed if present
    const emptyState = document.getElementById('designFeedEmptyState');
    if (emptyState) emptyState.remove();

    // Append rich Published Journey message to Chat session
    const journeyBubble = document.createElement('div');
    journeyBubble.className = 'design-msg-journey-published';
    journeyBubble.innerHTML = `
      <div class="pjc-header">
        <div class="pjc-title-wrap">
          <span class="pjc-title">${escapeHtml(title)}</span>
        </div>
        <span class="pjc-badge">Published Journey</span>
      </div>
      <div class="pjc-section">
        <div class="pjc-section-label">Description</div>
        <div class="pjc-text">${escapeHtml(description)}</div>
      </div>
      <div class="pjc-section">
        <div class="pjc-section-label">Criteria</div>
        <div class="pjc-text">${escapeHtml(criteria)}</div>
      </div>
      <div class="pjc-section">
        <div class="pjc-section-label">Guidance &amp; Tool Flow</div>
        <div class="pjc-text pjc-guidance-content">${guidanceHtml}</div>
      </div>
    `;

    agentDesignFeed.appendChild(journeyBubble);
    agentDesignFeed.scrollTop = agentDesignFeed.scrollHeight;

    if (agentTestFeed) {
      const journeyBubbleChat = journeyBubble.cloneNode(true);
      agentTestFeed.appendChild(journeyBubbleChat);
      agentTestFeed.scrollTop = agentTestFeed.scrollHeight;
    }

    // Update journey counter badge
    if (agentJourneyCountText) {
      agentJourneyCountText.textContent = '1 active';
    }
    if (testJourneyCountText) {
      testJourneyCountText.textContent = '1 active';
    }

    // Update active agent YAML store with journey block
    let currentYaml = getActiveYamlString();
    const journeyYamlSnippet = `
journeys:
  - id: journey-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
    name: "${title}"
    description: "${description}"
    criteria: "${criteria}"
    tools:
      - name: UserAuthentication
        type: tool
      - name: LookupTransaction
        type: tool
      - name: CheckForFraud
        type: tool
    guidance:
      - "1. Greet the customer empathetically and ask how you can help."
      - "2. Authenticate the user with @UserAuthentication."
      - "3. Ask which credit card is affected (if they have multiple)."
      - "4. Gather details on the merchant and date of transaction."
      - "5. Find transaction using @LookupTransaction."
      - "6. Confirm with customer that this is the correct transaction."
      - "7. Once confirmed, check @CheckForFraud, and proceed accordingly."
`;

    if (currentYaml.includes('journeys:')) {
      currentYaml = currentYaml.replace(/journeys:[\s\S]*?(?=\n[a-z_]+:|$)/, journeyYamlSnippet.trim() + '\n\n');
    } else {
      if (currentYaml.includes('metadata:')) {
        currentYaml = currentYaml.replace('metadata:', `${journeyYamlSnippet.trim()}\n\nmetadata:`);
      } else {
        currentYaml += '\n' + journeyYamlSnippet;
      }
    }
    AGENT_YAML_STORE[activeAgentSlug] = currentYaml;
    renderYamlDefinition();

    // Trigger Claude Code assistant response
    setTimeout(() => {
      const agentMsg = document.createElement('div');
      agentMsg.className = 'design-msg-assistant';
      agentMsg.innerHTML = `
        <p>Published Journey <span class="design-code-badge font-mono">${escapeHtml(title)}</span> compiled into <span class="design-code-badge font-mono">agents/${activeAgentSlug}.yaml</span>.</p>
        <p>Bound Tool Actions: <span class="tool-pill-badge">UserAuthentication</span>, <span class="tool-pill-badge">LookupTransaction</span>, and <span class="tool-pill-badge">CheckForFraud</span>.</p>
        <p>Dispute resolution criteria and conversational guidance steps are active in the agent state machine. View the updated scaffold in the <strong>YAML</strong> tab.</p>
      `;
      agentDesignFeed.appendChild(agentMsg);
      agentDesignFeed.scrollTop = agentDesignFeed.scrollHeight;
    }, 450);

    showStudioToast(`Published journey "${title}" directly to chat session.`);
  }

  if (btnJourneyPublishTop) {
    btnJourneyPublishTop.addEventListener('click', publishActiveJourney);
  }
  if (btnJourneyPublishBottom) {
    btnJourneyPublishBottom.addEventListener('click', publishActiveJourney);
  }

  // ── Context Modal Triggers & Actions ──────────────────────────────────
  if (btnAgentAddContext) {
    btnAgentAddContext.addEventListener('click', (e) => {
      e.preventDefault();
      openContextModal();
    });
  }

  if (btnContextModalClose) btnContextModalClose.addEventListener('click', closeContextModal);
  if (btnCancelContextModal) btnCancelContextModal.addEventListener('click', closeContextModal);

  if (contextModal) {
    contextModal.addEventListener('click', (e) => {
      if (e.target === contextModal) closeContextModal();
    });
  }

  if (contextModalSearchInput) {
    contextModalSearchInput.addEventListener('input', (e) => {
      renderVaultChecklist(e.target.value);
    });
  }

  if (btnApplyContextModal) {
    btnApplyContextModal.addEventListener('click', () => {
      attachedDocIds = new Set(tempModalSelectedIds);
      renderAttachedContextChips();
      closeContextModal();
      showStudioToast(`Attached ${attachedDocIds.size} document(s) to agent context!`);
    });
  }

  if (btnAgentClearAllContext) {
    btnAgentClearAllContext.addEventListener('click', () => {
      attachedDocIds.clear();
      renderAttachedContextChips();
      showStudioToast('Cleared all attached context documents.');
    });
  }

  // ── Quick Upload Document inside Modal ────────────────────────────────
  if (btnQuickUploadModal && modalQuickFileInput) {
    btnQuickUploadModal.addEventListener('click', () => {
      modalQuickFileInput.click();
    });

    modalQuickFileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      files.forEach((file, idx) => {
        const ext = file.name.split('.').pop().toUpperCase();
        const newDoc = {
          id: `doc-upload-${Date.now()}-${idx}`,
          name: file.name,
          type: ext || 'DOC',
          size: `${Math.round(file.size / 1024) || 12} KB`,
          tokens: `${Math.round((file.size / 1024) * 25)} tokens`,
          date: 'Just now'
        };

        VAULT_DOCS.unshift(newDoc);
        tempModalSelectedIds.add(newDoc.id);
      });

      renderVaultChecklist(contextModalSearchInput?.value || '');
      modalQuickFileInput.value = '';
      showStudioToast(`Uploaded ${files.length} document(s) to vault.`);
    });
  }

  // ── Design Box Attachment Button (Direct Paperclip) ───────────────────
  if (btnDesignAttachFile && agentFileInputUpload) {
    btnDesignAttachFile.addEventListener('click', () => {
      agentFileInputUpload.click();
    });

    agentFileInputUpload.addEventListener('change', (e) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      files.forEach((file, idx) => {
        const ext = file.name.split('.').pop().toUpperCase();
        const newDoc = {
          id: `doc-direct-${Date.now()}-${idx}`,
          name: file.name,
          type: ext || 'DOC',
          size: `${Math.round(file.size / 1024) || 14} KB`,
          tokens: `${Math.round((file.size / 1024) * 28)} tokens`,
          date: 'Just now'
        };

        VAULT_DOCS.unshift(newDoc);
        attachedDocIds.add(newDoc.id);
      });

      renderAttachedContextChips();
      agentFileInputUpload.value = '';
      showStudioToast(`Attached ${files.length} document(s) directly to session.`);
    });
  }

  // ── Send Design Message (Left Column) ─────────────────────────────────
  if (btnDesignSend && designPromptInput) {
    function sendDesignPrompt() {
      const text = designPromptInput.value.trim();
      if (!text) return;

      const emptyState = document.getElementById('designFeedEmptyState');
      if (emptyState) emptyState.remove();

      const userMsg = document.createElement('div');
      userMsg.className = 'design-msg-user';
      userMsg.innerHTML = `
        <div class="msg-sender-tag user">You</div>
        <div class="msg-content-text">${escapeHtml(text)}</div>
      `;
      agentDesignFeed.appendChild(userMsg);

      designPromptInput.value = '';
      agentDesignFeed.scrollTop = agentDesignFeed.scrollHeight;

      setTimeout(() => {
        // Dynamically append requirement into YAML store and re-render
        let currentYaml = getActiveYamlString();
        if (!currentYaml.includes(text)) {
          currentYaml = currentYaml.replace(
            /metadata:/,
            `# Requirement added via Chat: "${escapeHtml(text)}"\nmetadata:`
          );
          AGENT_YAML_STORE[activeAgentSlug] = currentYaml;
          renderYamlDefinition();
        }

        const agentMsg = document.createElement('div');
        agentMsg.className = 'design-msg-assistant';
        agentMsg.innerHTML = `
          <div class="msg-sender-tag assistant">Claude Code · Specialist</div>
          <div class="msg-content-text">
            <p>Updated <span class="design-code-badge font-mono">agents/${activeAgentSlug}.yaml</span> with requirement: <em>"${escapeHtml(text)}"</em>.</p>
            <p>Scaffold definition re-compiled. Guardrails and model parameters synced. You can inspect the updated structure in the <strong>YAML</strong> tab.</p>
          </div>
        `;
        agentDesignFeed.appendChild(agentMsg);
        agentDesignFeed.scrollTop = agentDesignFeed.scrollHeight;
      }, 400);
    }

    btnDesignSend.addEventListener('click', sendDesignPrompt);
    designPromptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendDesignPrompt();
      }
    });
  }

  // ── Send Test Message (Right Column) ──────────────────────────────────
  if (btnTestSend && testPromptInput) {
    function sendTestPrompt() {
      const text = testPromptInput.value.trim();
      if (!text) return;

      const emptyState = document.getElementById('testFeedEmptyState');
      if (emptyState) emptyState.remove();

      const userMsg = document.createElement('div');
      userMsg.className = 'test-msg-user-bubble';
      userMsg.innerHTML = `
        <div class="msg-sender-tag user-chat">You</div>
        <div class="msg-content-text">${escapeHtml(text)}</div>
      `;
      agentTestFeed.appendChild(userMsg);

      testPromptInput.value = '';
      agentTestFeed.scrollTop = agentTestFeed.scrollHeight;

      setTimeout(() => {
        const agentMsg = document.createElement('div');
        agentMsg.className = 'test-msg-agent-card';

        let simulatedReply = '';
        const lowerText = text.toLowerCase();
        const lowerName = activeAgentName.toLowerCase();

        if (lowerText.includes('journey') || lowerText.includes('dispute') || lowerText.includes('alur') || lowerText.includes('charge')) {
          simulatedReply = `
            Memulai eksekusi Journey: <strong>Transaction Dispute</strong>
            <div style="margin-top: 8px; padding: 10px 14px; background: rgba(2,132,199,0.04); border: 1px solid #bae6fd; border-radius: 8px; font-size: 0.84rem; line-height: 1.6;">
              <div style="font-weight: 700; color: #0369a1; margin-bottom: 6px;">
                Active Journey Workflow Steps Execution:
              </div>
              <div style="display: flex; flex-direction: column; gap: 5px;">
                <div><strong>1.</strong> Menghubungi nasabah secara empatik terkait tagihan mencurigakan. ✓</div>
                <div><strong>2.</strong> Otentikasi identitas nasabah dengan <span class="tool-pill-badge">UserAuthentication</span> — <em>Status: Verified</em> ✓</div>
                <div><strong>3.</strong> Mengidentifikasi kartu kredit yang terdampak (Visa Platinum #4092). ✓</div>
                <div><strong>4.</strong> Query detail transaksi via <span class="tool-pill-badge">LookupTransaction</span> — <em>Tx: #TX-99023 Rp 1.450.000</em> ✓</div>
                <div><strong>5.</strong> Konfirmasi nasabah: Transaksi tidak dikenal. ✓</div>
                <div><strong>6.</strong> Evaluasi indikator fraud via <span class="tool-pill-badge">CheckForFraud</span> — <em>Risk Score: 0.88 (High Risk)</em> ✓</div>
                <div><strong>7.</strong> Dispute ticket #DSP-2026-88 dibuka dan kartu diblokir sementara. ✓</div>
              </div>
            </div>
          `;
        } else if (lowerText.includes('rps') || lowerText.includes('dosen') || lowerText.includes('gkm')) {
          simulatedReply = `Saya memahami kebutuhan tersebut. Sistem ini akan berfungsi sebagai <strong>Automated Reminder and Compliance Tracking Pipeline</strong> untuk Gugus Kendali Mutu (GKM) dalam memantau kepatuhan pembaruan Rencana Pembelajaran Semester (RPS) oleh dosen pengampu sebelum perkuliahan semester aktif dimulai.`;
        } else if (lowerText.includes('prd') || lowerText.includes('requirement')) {
          simulatedReply = `
            Berikut draft <strong>Product Requirements Document (PRD)</strong> awal yang telah distrukturkan:
            <div style="margin-top: 8px; padding: 10px 14px; background: rgba(37,99,235,0.04); border-left: 3px solid #2563eb; border-radius: 6px; font-size: 0.85rem; line-height: 1.6;">
              <strong style="color: #0f172a;">1. Problem Statement:</strong> Keterlambatan pengunggahan RPS menghambat audit mutu akademik GKM dan akreditasi.<br>
              <strong style="color: #0f172a;">2. Objectives:</strong> Memastikan 100% kepatuhan upload RPS oleh dosen pada H-3 sebelum perkuliahan dimulai.<br>
              <strong style="color: #0f172a;">3. Stakeholders:</strong> Tim GKM (Auditor), Dosen Pengampu (User), Ketua Program Studi (Eskalasi).<br>
              <strong style="color: #0f172a;">4. Core Capabilities:</strong> Multi-channel alert via WhatsApp &amp; Email, Dashboard audit log kepatuhan real-time.
            </div>
          `;
        } else if (lowerText.includes('gherkin') || lowerText.includes('bdd')) {
          simulatedReply = `
            Berikut spesifikasi <strong>Gherkin BDD Acceptance Criteria</strong>:
            <pre style="background: #0f172a; color: #f8fafc; padding: 10px 12px; border-radius: 8px; font-family: monospace; font-size: 0.78rem; line-height: 1.5; overflow-x: auto; margin-top: 6px;">Feature: RPS Reminder &amp; Compliance Tracking

  Scenario: Pengingat otomatis H-7 batas akhir upload RPS
    Given dosen terdaftar memiliki mata kuliah aktif dengan status RPS "Belum Diperbarui"
    And tanggal saat ini adalah H-7 sebelum batas akhir semester perkuliahan
    When sistem scheduler menjalankan evaluasi kepatuhan RPS harian pukul 08.00 WIB
    Then kirimkan notifikasi pengingat via Email resmi dan pesan bot WhatsApp dosen
    And perbarui status log pengiriman notifikasi pada dashboard monitoring GKM</pre>
          `;
        } else if (lowerName.includes('architect')) {
          simulatedReply = `Saya telah menyusun user story &amp; BDD criteria untuk <em>"${escapeHtml(text)}"</em>:<br><strong>Story:</strong> Sebagai pengguna sistem, saya ingin verifikasi requirement otomatis agar konsistensi arsitektur terjamin.<br><strong>Skenario:</strong> Happy Path Test Run<br><strong>Given:</strong> Definisi valid di <code>agents/${activeAgentSlug}.yaml</code><br><strong>When:</strong> Aksi dipicu<br><strong>Then:</strong> Mengembalikan status 200 OK dengan streamed trace.`;
        } else {
          simulatedReply = `Respon dari <strong>${escapeHtml(activeAgentName)}</strong>: Permintaan <em>"${escapeHtml(text)}"</em> berhasil diproses dengan 0 error.`;
        }

        const latency = Math.floor(Math.random() * 90) + 120;
        const tokens = Math.floor(Math.random() * 60) + 40;
        const traceId = Math.floor(Math.random() * 8999) + 1000;

        agentMsg.innerHTML = `
          <div class="test-msg-agent-header">
            <span class="test-msg-agent-title">${escapeHtml(activeAgentName)}</span>
            <span class="test-msg-badge-live">Run API Streamed</span>
          </div>
          <div class="test-msg-agent-body">${simulatedReply}</div>
          <div class="test-trace-pill">
            ${latency}ms · ${tokens} tokens · model: claude-3-7-sonnet · trace: #tr-${traceId}
          </div>
        `;
        agentTestFeed.appendChild(agentMsg);
        agentTestFeed.scrollTop = agentTestFeed.scrollHeight;
      }, 450);
    }

    btnTestSend.addEventListener('click', sendTestPrompt);
    testPromptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendTestPrompt();
      }
    });
  }

  // ── Bind All Table Rows for Direct Navigation ─────────────────────────
  function bindAgentTableRows() {
    document.querySelectorAll('.agent-table-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('.btn-table-action-menu')) return;
        const name = row.getAttribute('data-agent') || row.querySelector('.agent-table-name')?.textContent?.trim() || 'Zenith BA Architect';
        const status = row.getAttribute('data-status') || 'active';
        openTestPage(name, status);
      });
    });

    document.querySelectorAll('.btn-table-action-menu').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const row = btn.closest('.agent-table-row');
        const name = row?.getAttribute('data-agent') || 'Zenith BA Architect';
        const status = row?.getAttribute('data-status') || 'active';
        openTestPage(name, status);
      });
    });
  }

  // ── Filter and Search Table Rows ─────────────────────────────────────
  function initAgentTableFilters() {
    const searchInput = document.getElementById('inputFilterAgents');
    const statusFilter = document.getElementById('selectStatusFilter');
    const versionFilter = document.getElementById('selectVersionFilter');
    const sortFilter = document.getElementById('selectSortOrder');
    const tableBody = document.getElementById('agentsTableBody');

    if (!tableBody) return;

    function filterRows() {
      const query = (searchInput?.value || '').toLowerCase().trim();
      const status = statusFilter?.value || 'all';
      const version = versionFilter?.value || 'all';
      const rows = tableBody.querySelectorAll('.agent-table-row');

      rows.forEach(row => {
        const name = (row.querySelector('.agent-table-name')?.textContent || '').toLowerCase();
        const desc = (row.querySelector('.agent-table-desc')?.textContent || '').toLowerCase();
        const rowStatus = row.getAttribute('data-status') || 'active';
        const rowVersion = row.getAttribute('data-version') || '';

        const matchesQuery = !query || name.includes(query) || desc.includes(query);
        const matchesStatus = status === 'all' || rowStatus === status;
        const matchesVersion = version === 'all' || rowVersion === version;

        row.style.display = (matchesQuery && matchesStatus && matchesVersion) ? '' : 'none';
      });
    }

    if (searchInput) searchInput.addEventListener('input', filterRows);
    if (statusFilter) statusFilter.addEventListener('change', filterRows);
    if (versionFilter) versionFilter.addEventListener('change', filterRows);

    if (sortFilter) {
      sortFilter.addEventListener('change', () => {
        const val = sortFilter.value;
        const rows = Array.from(tableBody.querySelectorAll('.agent-table-row'));
        rows.sort((a, b) => {
          if (val === 'name') {
            const nameA = a.querySelector('.agent-table-name')?.textContent || '';
            const nameB = b.querySelector('.agent-table-name')?.textContent || '';
            return nameA.localeCompare(nameB);
          } else if (val === 'version') {
            const vA = a.getAttribute('data-version') || '';
            const vB = b.getAttribute('data-version') || '';
            return vB.localeCompare(vA);
          }
          return 0;
        });
        rows.forEach(r => tableBody.appendChild(r));
      });
    }

    const btnCreate = document.getElementById('btnCreateAgentPage');
    if (btnCreate) {
      btnCreate.addEventListener('click', () => {
        const modal = document.getElementById('createAgentModal');
        if (modal) modal.classList.add('active');
      });
    }
  }

  // ── Wire recent agent sidebar links ───────────────────────────────────
  document.querySelectorAll('.sec-agent-recent-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openTestPage(item.getAttribute('data-agent') || 'Agent');
    });
  });

  window.openTestPage = openTestPage;
  bindAgentTableRows();
  initAgentTableFilters();
}

/**
 * =========================================================================
 * WORKFLOWS & CANVAS CONTROLLER (Cards, Blank Builder, Search & Categories)
 * =========================================================================
 */
function initWorkflowAndToolActions() {
  const searchInput = document.getElementById('inputFilterWorkflows');
  const catSelect = document.getElementById('selectWorkflowCategory');
  const sortSelect = document.getElementById('selectWorkflowSort');
  const gridBtn = document.getElementById('btnWfGridView');
  const listBtn = document.getElementById('btnWfListView');
  const pillsBar = document.getElementById('wfCategoryPillsBar');
  const cardsGrid = document.getElementById('workflowsCardsGrid');
  const blankCard = document.getElementById('cardBlankWorkflow');
  const btnCreateTop = document.getElementById('btnCreateWorkflowTop');

  // Modals
  const createModalBackdrop = document.getElementById('createWorkflowModalBackdrop');
  const btnCreateClose = document.getElementById('btnCreateWorkflowClose');
  const btnCancelCreate = document.getElementById('btnCancelCreateWorkflow');
  const btnSubmitCreate = document.getElementById('btnSubmitCreateWorkflow');

  const manageCatBackdrop = document.getElementById('manageCategoriesModalBackdrop');
  const btnEditCat = document.getElementById('btnEditCategory');
  const btnCloseCat = document.getElementById('btnCloseManageCategories');
  const btnDoneCat = document.getElementById('btnDoneManageCategories');
  const inputNewCat = document.getElementById('inputNewCategoryName');
  const btnAddCatSubmit = document.getElementById('btnAddCategorySubmit');
  const manageCatList = document.getElementById('categoriesManageList');

  // Dynamic Categories State
  let categories = [
    { name: 'Architecture', color: '#2563eb' },
    { name: 'Operations', color: '#0284c7' },
    { name: 'Compliance', color: '#10b981' },
    { name: 'Automation', color: '#9333ea' }
  ];

  let currentCategory = 'all';
  let currentSearch = '';

  // ── 1. Search & Filter Cards ─────────────────────────────────────────
  function filterWorkflowCards() {
    if (!cardsGrid) return;
    const cards = cardsGrid.querySelectorAll('.workflow-canvas-card:not(.card-blank)');

    cards.forEach(card => {
      const title = card.querySelector('.wf-card-title')?.textContent.toLowerCase() || '';
      const cat = card.getAttribute('data-category') || '';
      const modified = card.getAttribute('data-modified')?.toLowerCase() || '';

      const matchesSearch = !currentSearch || title.includes(currentSearch) || cat.toLowerCase().includes(currentSearch) || modified.includes(currentSearch);
      const matchesCat = currentCategory === 'all' || cat.toLowerCase() === currentCategory.toLowerCase();

      if (matchesSearch && matchesCat) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });

    // Blank card is always visible so user can easily create from scratch
    if (blankCard) {
      blankCard.style.display = '';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      filterWorkflowCards();
    });
  }

  // ── 2. Category Select & Pills Sync ─────────────────────────────────
  function updateCategoryPillsAndDropdown() {
    if (!pillsBar) return;
    const cards = cardsGrid ? cardsGrid.querySelectorAll('.workflow-canvas-card:not(.card-blank)') : [];
    const totalCount = cards.length;

    // Build pills HTML
    let pillsHtml = `<button type="button" class="wf-category-pill ${currentCategory === 'all' ? 'active' : ''}" data-category="all">All (${totalCount})</button>`;

    categories.forEach(cat => {
      const count = Array.from(cards).filter(c => (c.getAttribute('data-category') || '').toLowerCase() === cat.name.toLowerCase()).length;
      const isActive = currentCategory.toLowerCase() === cat.name.toLowerCase();
      pillsHtml += `<button type="button" class="wf-category-pill ${isActive ? 'active' : ''}" data-category="${cat.name}">${cat.name} (${count})</button>`;
    });

    pillsBar.innerHTML = pillsHtml;

    // Rebind pill clicks
    pillsBar.querySelectorAll('.wf-category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        currentCategory = pill.getAttribute('data-category') || 'all';
        pillsBar.querySelectorAll('.wf-category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        if (catSelect) catSelect.value = currentCategory;
        filterWorkflowCards();
      });
    });

    // Sync Category Dropdown Options
    if (catSelect) {
      let optionsHtml = `<option value="all">All files</option>`;
      categories.forEach(cat => {
        optionsHtml += `<option value="${cat.name}">${cat.name}</option>`;
      });
      catSelect.innerHTML = optionsHtml;
      catSelect.value = currentCategory;
    }

    // Sync Modal Category Dropdown
    const modalCatSelect = document.getElementById('selectWorkflowModalCategory');
    if (modalCatSelect) {
      let modalOptionsHtml = '';
      categories.forEach(cat => {
        modalOptionsHtml += `<option value="${cat.name}">${cat.name}</option>`;
      });
      modalCatSelect.innerHTML = modalOptionsHtml;
    }

    // Update Secondary Sidebar Badge
    const secBadge = document.getElementById('secNavWorkflowsBadge');
    if (secBadge) secBadge.textContent = totalCount;
  }

  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      currentCategory = e.target.value;
      if (pillsBar) {
        pillsBar.querySelectorAll('.wf-category-pill').forEach(pill => {
          if (pill.getAttribute('data-category')?.toLowerCase() === currentCategory.toLowerCase()) {
            pill.classList.add('active');
          } else {
            pill.classList.remove('active');
          }
        });
      }
      filterWorkflowCards();
    });
  }

  // ── 3. Sort Workflows ────────────────────────────────────────────────
  if (sortSelect && cardsGrid) {
    sortSelect.addEventListener('change', () => {
      const sortVal = sortSelect.value;
      const cards = Array.from(cardsGrid.querySelectorAll('.workflow-canvas-card:not(.card-blank)'));

      cards.sort((a, b) => {
        const titleA = a.querySelector('.wf-card-title')?.textContent.trim() || '';
        const titleB = b.querySelector('.wf-card-title')?.textContent.trim() || '';

        if (sortVal === 'name') {
          return titleA.localeCompare(titleB);
        } else if (sortVal === 'modified') {
          return 0; // Default order in DOM is latest modified first
        }
        return 0;
      });

      // Blank card is always first
      cards.forEach(card => cardsGrid.appendChild(card));
    });
  }

  // ── 4. Grid vs List Mode Toggle ──────────────────────────────────────
  if (gridBtn && listBtn && cardsGrid) {
    gridBtn.addEventListener('click', () => {
      cardsGrid.classList.remove('list-view');
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
      cardsGrid.classList.add('list-view');
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
    });
  }

  // ── 5. Create New Workflow Modal ─────────────────────────────────────
  function openCreateWorkflowModal() {
    if (!createModalBackdrop) return;
    createModalBackdrop.classList.add('active');
    const inputName = document.getElementById('inputWorkflowName');
    if (inputName) {
      setTimeout(() => inputName.focus(), 150);
    }
  }

  function closeCreateWorkflowModal() {
    if (!createModalBackdrop) return;
    createModalBackdrop.classList.remove('active');
  }

  if (blankCard) {
    blankCard.addEventListener('click', openCreateWorkflowModal);
  }

  if (btnCreateTop) {
    btnCreateTop.addEventListener('click', openCreateWorkflowModal);
  }

  if (btnCreateClose) btnCreateClose.addEventListener('click', closeCreateWorkflowModal);
  if (btnCancelCreate) btnCancelCreate.addEventListener('click', closeCreateWorkflowModal);

  // Template radio cards selection visual toggle
  const templateCards = document.querySelectorAll('.wf-template-option-card');
  templateCards.forEach(card => {
    card.addEventListener('click', () => {
      templateCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  if (btnSubmitCreate && cardsGrid) {
    btnSubmitCreate.addEventListener('click', () => {
      const nameInput = document.getElementById('inputWorkflowName');
      const catSelectModal = document.getElementById('selectWorkflowModalCategory');
      const descInput = document.getElementById('inputWorkflowDesc');

      const name = nameInput?.value.trim() || 'New Workflow Canvas';
      const category = catSelectModal?.value || 'Architecture';
      const desc = descInput?.value.trim() || 'Visual canvas workflow';

      // Pick icon style based on category
      let iconColor = 'icon-blue';
      if (category === 'Operations') iconColor = 'icon-sky';
      if (category === 'Compliance') iconColor = 'icon-emerald';
      if (category === 'Automation') iconColor = 'icon-purple';

      // Create new Card element
      const newCard = document.createElement('div');
      newCard.className = 'workflow-canvas-card';
      newCard.setAttribute('data-workflow-id', name.toLowerCase().replace(/[^a-z0-9]/g, '-'));
      newCard.setAttribute('data-category', category);
      newCard.setAttribute('data-modified', 'Just now');

      newCard.innerHTML = `
        <div class="wf-canvas-thumbnail visual-canvas-thumb">
          <div class="mini-pipeline-scene">
            <div class="pipe-node-box ${iconColor}">
              <span class="pipe-node-title">Start Trigger</span>
            </div>
            <div class="pipe-arrow">→</div>
            <div class="pipe-node-box icon-blue">
              <span class="pipe-node-title">Zenith Agent</span>
            </div>
            <div class="pipe-arrow">→</div>
            <div class="pipe-node-box icon-emerald">
              <span class="pipe-node-title">Output</span>
            </div>
          </div>
        </div>
        <div class="wf-card-bottom-bar">
          <div class="wf-card-app-icon ${iconColor}">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <div class="wf-card-info-group">
            <h3 class="wf-card-title">${escapeHtml(name)}</h3>
            <span class="wf-card-subinfo">Edited just now</span>
          </div>
          <div class="wf-card-author-badge author-green" title="Collaborator: Venesa">V</div>
        </div>
      `;

      // Insert immediately after blankCard (as index 1)
      if (blankCard.nextSibling) {
        cardsGrid.insertBefore(newCard, blankCard.nextSibling);
      } else {
        cardsGrid.appendChild(newCard);
      }

      // Bind click on new card
      bindWorkflowCardClick(newCard);

      // Close modal
      closeCreateWorkflowModal();

      // Refresh category pills and counts
      updateCategoryPillsAndDropdown();

      // Toast feedback
      showWorkflowToast(`Workflow "${name}" berhasil dibuat!`);
    });
  }

  // ── 6. Manage Categories Modal (Edit Kategori) ────────────────────────
  function renderManageCategoriesList() {
    if (!manageCatList) return;
    const cards = cardsGrid ? cardsGrid.querySelectorAll('.workflow-canvas-card:not(.card-blank)') : [];

    let listHtml = '';
    categories.forEach((cat, index) => {
      const count = Array.from(cards).filter(c => (c.getAttribute('data-category') || '').toLowerCase() === cat.name.toLowerCase()).length;
      const isCustom = index >= 4; // allow deleting user-added categories

      listHtml += `
        <div class="category-manage-row">
          <div class="cat-row-left">
            <span class="cat-dot" style="background-color: ${cat.color};"></span>
            <span class="cat-name">${escapeHtml(cat.name)}</span>
            <span class="cat-count-pill">${count} workflows</span>
          </div>
          ${isCustom ? `
            <button type="button" class="btn-cat-delete" data-cat-index="${index}" title="Hapus kategori">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          ` : `
            <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 500;">Default</span>
          `}
        </div>
      `;
    });

    manageCatList.innerHTML = listHtml;

    // Bind delete buttons
    manageCatList.querySelectorAll('.btn-cat-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-cat-index') || '-1', 10);
        if (idx >= 0 && idx < categories.length) {
          const removed = categories.splice(idx, 1)[0];
          renderManageCategoriesList();
          updateCategoryPillsAndDropdown();
          showWorkflowToast(`Kategori "${removed.name}" dihapus.`);
        }
      });
    });
  }

  function openManageCategoriesModal() {
    if (!manageCatBackdrop) return;
    renderManageCategoriesList();
    manageCatBackdrop.classList.add('active');
    if (inputNewCat) {
      inputNewCat.value = '';
      setTimeout(() => inputNewCat.focus(), 150);
    }
  }

  function closeManageCategoriesModal() {
    if (!manageCatBackdrop) return;
    manageCatBackdrop.classList.remove('active');
  }

  if (btnEditCat) btnEditCat.addEventListener('click', openManageCategoriesModal);
  if (btnCloseCat) btnCloseCat.addEventListener('click', closeManageCategoriesModal);
  if (btnDoneCat) btnDoneCat.addEventListener('click', closeManageCategoriesModal);

  // Add new Category submit
  if (btnAddCatSubmit && inputNewCat) {
    const handleAddCategory = () => {
      const catName = inputNewCat.value.trim();
      if (!catName) return;

      // Avoid duplicates
      const exists = categories.some(c => c.name.toLowerCase() === catName.toLowerCase());
      if (exists) {
        showWorkflowToast(`Kategori "${catName}" sudah ada!`);
        return;
      }

      const colors = ['#f59e0b', '#ec4899', '#06b6d4', '#84cc16', '#6366f1'];
      const nextColor = colors[categories.length % colors.length];

      categories.push({ name: catName, color: nextColor });
      inputNewCat.value = '';
      renderManageCategoriesList();
      updateCategoryPillsAndDropdown();
      showWorkflowToast(`Kategori "${catName}" berhasil ditambahkan!`);
    };

    btnAddCatSubmit.addEventListener('click', handleAddCategory);
    inputNewCat.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddCategory();
      }
    });
  }

  // ── 7. Workflow Card Click Interactions & Detail Navigation ────────
  function bindWorkflowCardClick(card) {
    card.addEventListener('click', (e) => {
      if (card.classList.contains('card-blank')) return;
      const title = card.querySelector('.wf-card-title')?.textContent.trim() || 'Claim Processing Workflow';
      openWorkflowDetailPage(title);
    });
  }

  if (cardsGrid) {
    cardsGrid.querySelectorAll('.workflow-canvas-card:not(.card-blank)').forEach(bindWorkflowCardClick);
  }

  // Close modals on Escape or Backdrop click
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (createModalBackdrop && createModalBackdrop.classList.contains('active')) closeCreateWorkflowModal();
      if (manageCatBackdrop && manageCatBackdrop.classList.contains('active')) closeManageCategoriesModal();
    }
  });

  [createModalBackdrop, manageCatBackdrop].forEach(backdrop => {
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
        }
      });
    }
  });

  // Initial render of category pills
  updateCategoryPillsAndDropdown();

  // =========================================================================
  // ── 8. WORKFLOW DETAIL / VISUAL CANVAS BUILDER CONTROLLER ────────────────
  // =========================================================================
  const paneWorkflowDetail = document.getElementById('pane-workflow-detail');
  const paneWorkflows = document.getElementById('pane-workflows');
  const btnBackWorkflows = document.getElementById('btnBackToWorkflows');
  const wfTitleInput = document.getElementById('wfDetailTitleInput');
  const wfStatusBadge = document.getElementById('wfDetailStatusBadge');
  const wfAutosaveLabel = document.getElementById('wfDetailAutosaveLabel');
  const btnEditTitle = document.getElementById('btnEditWorkflowTitle');

  // Mode Switcher (Canvas vs Code)
  const btnModeCanvas = document.getElementById('btnModeCanvas');
  const btnModeCode = document.getElementById('btnModeCode');
  const wfCanvasContainer = document.getElementById('wfCanvasContainer');
  const wfCodeContainer = document.getElementById('wfCodeContainer');
  const btnCopyYaml = document.getElementById('btnCopyYaml');
  const btnViewYamlLink = document.getElementById('btnViewYamlLink');
  const wfYamlContent = document.getElementById('wfYamlContent');

  // Top sub-tabs
  const wfTopTabs = document.querySelectorAll('.wf-nav-tab');

  // Canvas floating controls
  const btnToolSelect = document.getElementById('btnToolSelect');
  const btnToolPan = document.getElementById('btnToolPan');
  const btnZoomIn = document.getElementById('btnCanvasZoomIn');
  const btnZoomOut = document.getElementById('btnCanvasZoomOut');
  const zoomPill = document.getElementById('canvasZoomPill');
  const btnFit = document.getElementById('btnCanvasFit');
  const chkShowLabels = document.getElementById('chkShowLabels');
  const wfCanvasSurface = document.getElementById('wfCanvasSurface');
  const wfNodesLayer = document.getElementById('wfNodesLayer');

  // Minimap buttons
  const btnMinimapFit = document.getElementById('btnMinimapFit');
  const btnMinimapZoomIn = document.getElementById('btnMinimapZoomIn');
  const btnMinimapZoomOut = document.getElementById('btnMinimapZoomOut');

  // Inspector Elements
  const inspectorWorkflowView = document.getElementById('inspectorWorkflowView');
  const inspectorNodeView = document.getElementById('inspectorNodeView');
  const tabInspWorkflow = document.getElementById('tabInspWorkflow');
  const tabInspRunHistory = document.getElementById('tabInspRunHistory');
  const bodyInspWorkflow = document.getElementById('bodyInspWorkflow');
  const bodyInspRunHistory = document.getElementById('bodyInspRunHistory');
  const inputWfNameInspector = document.getElementById('inputWfNameInspector');
  const inputWfDescInspector = document.getElementById('inputWfDescInspector');
  const btnAddVariable = document.getElementById('btnAddVariable');
  const wfVariablesList = document.getElementById('wfVariablesList');

  // Node Inspector Elements
  const tabNodeProps = document.getElementById('tabNodeProps');
  const tabNodeSettings = document.getElementById('tabNodeSettings');
  const nodeInspectorTitle = document.getElementById('nodeInspectorTitle');
  const nodeInspectorType = document.getElementById('nodeInspectorType');
  const nodeInspectorSub = document.getElementById('nodeInspectorSub');
  const nodeHeaderAvatar = document.getElementById('nodeHeaderAvatar');
  const selectNodeAgent = document.getElementById('selectNodeAgent');
  const selectNodeModel = document.getElementById('selectNodeModel');
  const textareaNodeInstructions = document.getElementById('textareaNodeInstructions');
  const btnDeleteSelectedNode = document.getElementById('btnDeleteSelectedNode');
  const btnDeselectNode = document.getElementById('btnDeselectNode');
  const btnAddToolToNode = document.getElementById('btnAddToolToNode');

  // Palette buttons
  const paletteBtns = document.querySelectorAll('.btn-palette-node');

  // Top action buttons
  const btnPublishWorkflow = document.getElementById('btnPublishWorkflow');
  const btnShareWorkflow = document.getElementById('btnShareWorkflow');
  const btnMoreOptions = document.getElementById('btnWorkflowMoreOptions');

  let currentCanvasZoom = 100;
  let activeWfNode = null;
  let autosaveTimer = null;

  /**
   * Open Workflow Detail Canvas Page
   */
  function openWorkflowDetailPage(title = 'Claim Processing Workflow') {
    if (!paneWorkflowDetail) return;

    // Update titles
    if (wfTitleInput) wfTitleInput.value = title;
    if (inputWfNameInspector) inputWfNameInspector.value = title;

    // Panes switch
    document.querySelectorAll('.studio-pane-section').forEach(p => p.classList.remove('active'));
    paneWorkflowDetail.classList.add('active');

    // Update secondary nav highlighting
    document.querySelectorAll('.studio-sec-nav-item').forEach(item => {
      if (item.getAttribute('data-view') === 'workflows') {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update breadcrumb
    const crumb = document.getElementById('studioCrumbSub');
    if (crumb) crumb.textContent = `Workflow: ${title}`;

    // Update URL hash
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'builder';
    window.location.hash = `#workflow-${slug}`;

    // Default to visual canvas mode
    setCanvasMode('canvas');

    // Auto-select Node 2 (Claim Document Analyzer) to match reference Image 2
    const defaultNode = document.getElementById('wfNodeAgent1');
    if (defaultNode) {
      selectNode(defaultNode);
    } else {
      deselectAllNodes();
    }
  }
  window.openWorkflowDetailPage = openWorkflowDetailPage;

  /**
   * Return back to Workflows List
   */
  if (btnBackWorkflows) {
    btnBackWorkflows.addEventListener('click', () => {
      document.querySelectorAll('.studio-pane-section').forEach(p => p.classList.remove('active'));
      if (paneWorkflows) paneWorkflows.classList.add('active');

      const crumb = document.getElementById('studioCrumbSub');
      if (crumb) crumb.textContent = 'Workflows';

      document.querySelectorAll('.studio-sec-nav-item').forEach(item => {
        if (item.getAttribute('data-view') === 'workflows') {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      window.location.hash = '#workflows';
    });
  }

  /**
   * Mode Switcher: Canvas vs Code
   */
  function setCanvasMode(mode) {
    if (mode === 'code') {
      if (wfCanvasContainer) wfCanvasContainer.style.setProperty('display', 'none', 'important');
      if (wfCodeContainer) wfCodeContainer.style.setProperty('display', 'flex', 'important');
      if (btnModeCode) btnModeCode.classList.add('active');
      if (btnModeCanvas) btnModeCanvas.classList.remove('active');
    } else {
      if (wfCanvasContainer) wfCanvasContainer.style.setProperty('display', 'flex', 'important');
      if (wfCodeContainer) wfCodeContainer.style.setProperty('display', 'none', 'important');
      if (btnModeCanvas) btnModeCanvas.classList.add('active');
      if (btnModeCode) btnModeCode.classList.remove('active');
    }
  }

  if (btnModeCanvas) btnModeCanvas.addEventListener('click', () => setCanvasMode('canvas'));
  if (btnModeCode) btnModeCode.addEventListener('click', () => setCanvasMode('code'));
  if (btnViewYamlLink) btnViewYamlLink.addEventListener('click', () => setCanvasMode('code'));

  if (btnCopyYaml && wfYamlContent) {
    btnCopyYaml.addEventListener('click', () => {
      const code = wfYamlContent.innerText || wfYamlContent.textContent;
      navigator.clipboard.writeText(code).then(() => {
        showWorkflowToast('YAML definition copied to clipboard!');
      });
    });
  }

  /**
   * Top sub-tabs: Builder, Runs, Versions, Settings
   */
  wfTopTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      wfTopTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-wf-tab');

      if (target === 'runs') {
        if (tabInspRunHistory) tabInspRunHistory.click();
        setCanvasMode('canvas');
        showWorkflowToast('Switched to Workflow Runs log');
      } else if (target === 'builder') {
        if (tabInspWorkflow) tabInspWorkflow.click();
        setCanvasMode('canvas');
      } else if (target === 'versions') {
        showWorkflowToast('Versions: 0.1.0 (Current Draft), 0.0.9, 0.0.8');
      } else if (target === 'settings') {
        showWorkflowToast('Workflow Settings: General, Variables, Triggers, Permissions');
      }
    });
  });

  /**
   * Canvas Zoom & Controls
   */
  function applyZoom(delta) {
    if (delta === 0) {
      currentCanvasZoom = 100;
    } else {
      currentCanvasZoom = Math.min(160, Math.max(50, currentCanvasZoom + delta));
    }
    if (zoomPill) zoomPill.textContent = `${currentCanvasZoom}%`;
    if (wfCanvasSurface) {
      wfCanvasSurface.style.transform = `scale(${currentCanvasZoom / 100})`;
      wfCanvasSurface.style.transformOrigin = 'top left';
    }
  }

  if (btnZoomIn) btnZoomIn.addEventListener('click', () => applyZoom(10));
  if (btnZoomOut) btnZoomOut.addEventListener('click', () => applyZoom(-10));
  if (btnFit) btnFit.addEventListener('click', () => applyZoom(0));

  if (btnMinimapZoomIn) btnMinimapZoomIn.addEventListener('click', () => applyZoom(10));
  if (btnMinimapZoomOut) btnMinimapZoomOut.addEventListener('click', () => applyZoom(-10));
  if (btnMinimapFit) btnMinimapFit.addEventListener('click', () => applyZoom(0));

  // Tool Select vs Pan
  if (btnToolSelect && btnToolPan) {
    btnToolSelect.addEventListener('click', () => {
      btnToolSelect.classList.add('active');
      btnToolPan.classList.remove('active');
      if (wfCanvasSurface) wfCanvasSurface.style.cursor = 'default';
    });
    btnToolPan.addEventListener('click', () => {
      btnToolPan.classList.add('active');
      btnToolSelect.classList.remove('active');
      if (wfCanvasSurface) wfCanvasSurface.style.cursor = 'grab';
    });
  }

  // Show / Hide labels toggle
  if (chkShowLabels) {
    chkShowLabels.addEventListener('change', () => {
      const badges = document.querySelectorAll('.wf-branch-label-badge');
      badges.forEach(b => {
        b.style.display = chkShowLabels.checked ? '' : 'none';
      });
    });
  }

  /**
   * Interactive Node Selection & Inspector Binding
   */
  function selectNode(nodeEl) {
    if (!nodeEl) return;

    // Deselect other nodes
    document.querySelectorAll('.wf-node-card, .wf-node-diamond-wrapper').forEach(n => n.classList.remove('selected'));
    nodeEl.classList.add('selected');
    activeWfNode = nodeEl;

    // Switch inspector to Node View (Image 2)
    if (inspectorWorkflowView) inspectorWorkflowView.style.display = 'none';
    if (inspectorNodeView) inspectorNodeView.style.display = 'flex';

    // Extract node data
    const title = nodeEl.getAttribute('data-title') || nodeEl.querySelector('.wf-node-title, .wf-diamond-title')?.textContent.trim() || 'Node';
    const type = (nodeEl.getAttribute('data-type') || 'Agent').toLowerCase();
    const sub = nodeEl.getAttribute('data-sub') || nodeEl.getAttribute('data-desc') || nodeEl.querySelector('.wf-node-desc')?.textContent.trim() || '';
    const model = nodeEl.getAttribute('data-model') || 'GPT-4o';
    const instructions = nodeEl.getAttribute('data-instructions') || `Baca dan ekstrak informasi klaim dari dokumen yang diberikan. Fokus pada detail penting seperti nomor klaim, tanggal, jenis klaim, dan nilai klaim.`;

    // Populate Inspector Fields
    if (nodeInspectorTitle) nodeInspectorTitle.textContent = title;
    if (nodeInspectorType) nodeInspectorType.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    if (nodeInspectorSub) nodeInspectorSub.textContent = sub;

    if (nodeHeaderAvatar) {
      nodeHeaderAvatar.className = 'node-header-avatar';
      if (type === 'agent') nodeHeaderAvatar.classList.add('icon-purple');
      else if (type === 'tool') nodeHeaderAvatar.classList.add('icon-blue');
      else if (type === 'decision') nodeHeaderAvatar.classList.add('icon-amber');
      else nodeHeaderAvatar.classList.add('icon-emerald');
    }

    if (selectNodeAgent) {
      let optionExists = false;
      for (let i = 0; i < selectNodeAgent.options.length; i++) {
        if (selectNodeAgent.options[i].value === title) {
          selectNodeAgent.selectedIndex = i;
          optionExists = true;
          break;
        }
      }
      if (!optionExists) {
        const newOpt = new Option(title, title, true, true);
        selectNodeAgent.add(newOpt);
      }
    }

    if (selectNodeModel) {
      selectNodeModel.value = model;
    }

    if (textareaNodeInstructions) {
      textareaNodeInstructions.value = instructions;
    }
  }

  function deselectAllNodes() {
    document.querySelectorAll('.wf-node-card, .wf-node-diamond-wrapper').forEach(n => n.classList.remove('selected'));
    activeWfNode = null;

    // Switch inspector to Workflow View (Image 1)
    if (inspectorWorkflowView) inspectorWorkflowView.style.display = 'flex';
    if (inspectorNodeView) inspectorNodeView.style.display = 'none';
  }

  function bindNodeInteractions(nodeEl) {
    nodeEl.addEventListener('click', (e) => {
      e.stopPropagation();
      selectNode(nodeEl);
    });
  }

  // Bind existing nodes on canvas
  document.querySelectorAll('.wf-node-card, .wf-node-diamond-wrapper').forEach(bindNodeInteractions);

  // Clicking on canvas background deselects node
  if (wfCanvasSurface) {
    wfCanvasSurface.addEventListener('click', (e) => {
      if (!e.target.closest('.wf-node-card') && !e.target.closest('.wf-node-diamond-wrapper') && !e.target.closest('.wf-add-node-palette')) {
        deselectAllNodes();
      }
    });
  }

  if (btnDeselectNode) {
    btnDeselectNode.addEventListener('click', deselectAllNodes);
  }

  // Delete selected node
  if (btnDeleteSelectedNode) {
    btnDeleteSelectedNode.addEventListener('click', () => {
      if (activeWfNode) {
        const title = activeWfNode.getAttribute('data-title') || 'Node';
        activeWfNode.remove();
        deselectAllNodes();
        showWorkflowToast(`Node "${title}" deleted`);
      }
    });
  }

  // Add Tool to Node button
  if (btnAddToolToNode) {
    btnAddToolToNode.addEventListener('click', () => {
      const checklist = document.querySelector('.node-tools-checklist');
      if (checklist) {
        const newToolItem = document.createElement('label');
        newToolItem.className = 'node-tool-check-item';
        newToolItem.innerHTML = `
          <input type="checkbox" checked />
          <div class="tool-check-icon icon-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
          </div>
          <div class="tool-check-info">
            <strong>CustomValidator</strong>
            <span>Validasi skema payload</span>
          </div>
        `;
        checklist.appendChild(newToolItem);
        showWorkflowToast('Tool "CustomValidator" ditambahkan ke Agent');
      }
    });
  }

  /**
   * Floating Add Node Palette (Agent, Tool, Decision, Trigger, Condition, Output)
   */
  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type') || 'agent';
      const nodeCount = document.querySelectorAll('.wf-node-card, .wf-node-diamond-wrapper').length + 1;
      const leftPos = 400 + ((nodeCount % 5) * 50);
      const topPos = 160 + ((nodeCount % 4) * 60);

      const newNode = document.createElement('div');

      if (type === 'decision') {
        newNode.className = 'wf-node-diamond-wrapper';
        newNode.id = `wfNodeCustom${nodeCount}`;
        newNode.setAttribute('data-node-id', `node-custom-${nodeCount}`);
        newNode.setAttribute('data-type', 'decision');
        newNode.setAttribute('data-title', `Decision ${nodeCount}`);
        newNode.setAttribute('data-sub', 'Condition Check');
        newNode.style.left = `${leftPos}px`;
        newNode.style.top = `${topPos}px`;

        newNode.innerHTML = `
          <div class="wf-diamond-shape">
            <div class="wf-diamond-content">
              <span class="wf-diamond-type-label">Decision</span>
              <h4 class="wf-diamond-title">Check ${nodeCount}?</h4>
            </div>
          </div>
          <div class="wf-port port-input" title="Input Port"></div>
          <div class="wf-port port-output-yes" title="Branch Yes"></div>
          <div class="wf-port port-output-no" title="Branch No"></div>
        `;
      } else {
        let typeClass = 'node-agent';
        let iconClass = 'icon-purple';
        let labelText = 'Agent';
        let defaultTitle = `Custom Agent ${nodeCount}`;
        let defaultDesc = 'Autonomous agent node';

        if (type === 'tool') {
          typeClass = 'node-tool';
          iconClass = 'icon-blue';
          labelText = 'Tool';
          defaultTitle = `API Tool ${nodeCount}`;
          defaultDesc = 'External execution connector';
        } else if (type === 'trigger') {
          typeClass = 'node-trigger';
          iconClass = 'icon-emerald';
          labelText = 'Trigger';
          defaultTitle = `Event Trigger ${nodeCount}`;
          defaultDesc = 'Incoming webhook or queue';
        } else if (type === 'output') {
          typeClass = 'node-output';
          iconClass = 'icon-emerald';
          labelText = 'Output';
          defaultTitle = `Response Output ${nodeCount}`;
          defaultDesc = 'Formatted JSON delivery';
        } else if (type === 'condition') {
          typeClass = 'node-subtool';
          iconClass = 'icon-sky';
          labelText = 'Condition';
          defaultTitle = `Rule Filter ${nodeCount}`;
          defaultDesc = 'Expression evaluation';
        }

        newNode.className = `wf-node-card ${typeClass}`;
        newNode.id = `wfNodeCustom${nodeCount}`;
        newNode.setAttribute('data-node-id', `node-custom-${nodeCount}`);
        newNode.setAttribute('data-type', type);
        newNode.setAttribute('data-title', defaultTitle);
        newNode.setAttribute('data-desc', defaultDesc);
        newNode.style.left = `${leftPos}px`;
        newNode.style.top = `${topPos}px`;

        newNode.innerHTML = `
          <div class="wf-node-header">
            <div class="wf-node-type-group">
              <div class="wf-node-type-icon ${iconClass}">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <span class="wf-node-type-label">${labelText}</span>
            </div>
          </div>
          <div class="wf-node-body">
            <h4 class="wf-node-title">${escapeHtml(defaultTitle)}</h4>
            <p class="wf-node-desc">${escapeHtml(defaultDesc)}</p>
          </div>
          <div class="wf-port port-input" title="Input Port"></div>
          <div class="wf-port port-output" title="Output Port"></div>
        `;
      }

      if (wfNodesLayer) {
        wfNodesLayer.appendChild(newNode);
        bindNodeInteractions(newNode);
        selectNode(newNode);
        showWorkflowToast(`Added new ${type} node to canvas`);
      }
    });
  });

  /**
   * Inspector View A Tabs (Workflow vs Run History)
   */
  if (tabInspWorkflow && tabInspRunHistory && bodyInspWorkflow && bodyInspRunHistory) {
    tabInspWorkflow.addEventListener('click', () => {
      tabInspWorkflow.classList.add('active');
      tabInspRunHistory.classList.remove('active');
      bodyInspWorkflow.style.display = 'block';
      bodyInspRunHistory.style.display = 'none';
    });
    tabInspRunHistory.addEventListener('click', () => {
      tabInspRunHistory.classList.add('active');
      tabInspWorkflow.classList.remove('active');
      bodyInspRunHistory.style.display = 'block';
      bodyInspWorkflow.style.display = 'none';
    });
  }

  /**
   * Inspector View B Tabs (Properties vs Settings)
   */
  if (tabNodeProps && tabNodeSettings) {
    tabNodeProps.addEventListener('click', () => {
      tabNodeProps.classList.add('active');
      tabNodeSettings.classList.remove('active');
    });
    tabNodeSettings.addEventListener('click', () => {
      tabNodeSettings.classList.add('active');
      tabNodeProps.classList.remove('active');
      showWorkflowToast('Advanced Node Settings (Timeout, Retries, Fallbacks)');
    });
  }

  /**
   * Title Synchronisation & Autosave
   */
  function triggerAutosave() {
    if (wfAutosaveLabel) wfAutosaveLabel.textContent = '• Saving...';
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => {
      if (wfAutosaveLabel) wfAutosaveLabel.textContent = '• Auto-saved just now';
    }, 700);
  }

  if (wfTitleInput) {
    wfTitleInput.addEventListener('input', (e) => {
      if (inputWfNameInspector) inputWfNameInspector.value = e.target.value;
      triggerAutosave();
    });
  }

  if (inputWfNameInspector) {
    inputWfNameInspector.addEventListener('input', (e) => {
      if (wfTitleInput) wfTitleInput.value = e.target.value;
      triggerAutosave();
    });
  }

  if (btnEditTitle && wfTitleInput) {
    btnEditTitle.addEventListener('click', () => {
      wfTitleInput.focus();
      wfTitleInput.select();
    });
  }

  if (textareaNodeInstructions) {
    textareaNodeInstructions.addEventListener('input', triggerAutosave);
  }

  // Add Variable Button
  if (btnAddVariable && wfVariablesList) {
    btnAddVariable.addEventListener('click', () => {
      const varName = prompt('Enter variable name:', 'customer_tier');
      if (varName) {
        const item = document.createElement('div');
        item.className = 'wf-variable-item';
        item.innerHTML = `
          <span class="var-name">${escapeHtml(varName.trim().toLowerCase())}</span>
          <span class="var-type">string</span>
        `;
        wfVariablesList.appendChild(item);
        showWorkflowToast(`Variable "${varName}" added!`);
      }
    });
  }

  // Publish & Share
  if (btnPublishWorkflow && wfStatusBadge) {
    btnPublishWorkflow.addEventListener('click', () => {
      wfStatusBadge.textContent = 'Published';
      wfStatusBadge.style.backgroundColor = 'rgba(16, 185, 129, 0.12)';
      wfStatusBadge.style.color = '#10b981';
      wfStatusBadge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
      showWorkflowToast('Workflow successfully published to Production!');
    });
  }

  if (btnShareWorkflow) {
    btnShareWorkflow.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      showWorkflowToast('Workflow share link copied to clipboard!');
    });
  }

  if (btnMoreOptions) {
    btnMoreOptions.addEventListener('click', () => {
      showWorkflowToast('Options: Export YAML, Clone workflow, View revision history');
    });
  }
}

/**
 * Toast Notification Helper for Workflows
 */
function showWorkflowToast(msg) {
  let toast = document.getElementById('zenithWorkflowToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'zenithWorkflowToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background-color: #0f172a;
      color: #ffffff;
      padding: 0.65rem 1.15rem;
      border-radius: 8px;
      font-size: 0.825rem;
      font-weight: 500;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      border: 1px solid #334155;
      z-index: 99999;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `;
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>${escapeHtml(msg)}</span>
  `;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 2800);
}

