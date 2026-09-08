/**
 * Zenith AI - Agent Studio Controller (Secondary Sidebar & Multi-View Navigation)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStudioViewSwitcher();
  initAgentFiltersAndSearch();
  initTestRunDrawer();
  initCreateAgentModal();
  initAgentCreationWizard();
  initTestAgentPage();
  initWorkflowAndToolActions();
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
    settings: 'Studio Settings'
  };

  function switchView(target) {
    if (!target) target = 'agents';

    // Update secondary nav active state
    navItems.forEach(item => {
      if (item.getAttribute('data-view') === target) {
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
      switchView('agents');
      const agentName = item.getAttribute('data-agent');
      if (agentName) {
        setTimeout(() => openTestDrawer(agentName), 150);
      }
    });
  });

  // Handle URL hash on load & hashchange
  function applyHash() {
    const hash = window.location.hash.replace('#', '');
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

  // 1. Business Analyst (BA) Specification & Requirements
  if (p.includes('prd') || p.includes('story') || p.includes('requirement') || p.includes('analyst') || p.includes('spec') || p.includes('flow') || p.includes('ba')) {
    return `
      <div style="font-size: 0.85rem; line-height: 1.5;">
        <strong style="color: #2563eb; display: block; margin-bottom: 4px;">📊 Zenith BA Architect — Spec Generated</strong>
        <strong>Feature:</strong> ${escapeHtml(prompt)}<br>
        <div style="margin-top: 6px; padding: 6px 10px; background: rgba(37,99,235,0.06); border-radius: 6px; border-left: 3px solid #2563eb;">
          <strong>User Story:</strong> As an authenticated developer, I want to execute chat-to-code synthesis so that I can prototype fullstack SaaS apps without manual scaffolding.
        </div>
        <div style="margin-top: 6px;">
          <strong>Acceptance Criteria (Gherkin):</strong><br>
          • <code>Given</code> user sends valid prompt in workspace<br>
          • <code>When</code> AST parser validates symbol schema<br>
          • <code>Then</code> live preview updates via WebContainer in &lt; 250ms
        </div>
      </div>
    `;
  }

  // 2. Full-Stack Developer & Code Synthesis
  if (p.includes('code') || p.includes('api') || p.includes('component') || p.includes('react') || p.includes('backend') || p.includes('database') || p.includes('schema') || p.includes('dev')) {
    return `
      <div style="font-size: 0.85rem; line-height: 1.5;">
        <strong style="color: #7c3aed; display: block; margin-bottom: 4px;">💻 DevCore Synthesizer — Synthesis Complete</strong>
        Synthesized React 19 + TypeScript component &amp; REST route in <strong>0.32s</strong>:
        <pre style="margin-top: 6px; padding: 8px; background: #0f172a; color: #38bdf8; border-radius: 6px; font-size: 0.75rem; overflow-x: auto; font-family: monospace;"><code>export async function POST(req: Request) {
  const { prompt, context } = await req.json();
  const session = await prisma.agentSession.create({
    data: { prompt, status: 'SYNTHESIZING', tokens: 1840 }
  });
  return Response.json({ success: true, session });
}</code></pre>
        <span style="font-size: 0.75rem; color: #16a34a;">✔ WebContainer hot-reloaded (14 modules updated)</span>
      </div>
    `;
  }

  // 3. Product Manager (PM) Sprint & Backlog
  if (p.includes('pm') || p.includes('sprint') || p.includes('roadmap') || p.includes('backlog') || p.includes('milestone') || p.includes('ticket')) {
    return `
      <div style="font-size: 0.85rem; line-height: 1.5;">
        <strong style="color: #db2777; display: block; margin-bottom: 4px;">📋 Omni PM Orchestrator — Sprint Roadmap</strong>
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
        <strong style="color: #0284c7; display: block; margin-bottom: 4px;">🎨 PixelCraft UI/UX — Tokens Generated</strong>
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
        <strong style="color: #ea580c; display: block; margin-bottom: 4px;">🚀 DeployGuard QA — Pipeline Passed</strong>
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
      <strong style="color: #2563eb;">⚡ Zenith Multi-Role Synthesis Output</strong><br>
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
function initCreateAgentModal() {
  const modalBackdrop = document.getElementById('createAgentModal');
  const openBtns = document.querySelectorAll('#btnNewAgentTop, #btnNewAgentSidebar, #btnNewAgentCard');
  const closeBtn = document.getElementById('btnCancelCreateAgent');
  const form = document.getElementById('formCreateAgent');

  if (!modalBackdrop) return;

  function openModal() {
    modalBackdrop.classList.add('active');
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('newAgentName')?.value.trim();
      const desc = document.getElementById('newAgentDesc')?.value.trim();
      const model = document.getElementById('newAgentModel')?.value || 'xai/grok-4.3';

      if (!name) return;

      // Add to cards grid
      const grid = document.querySelector('.agents-rich-grid');
      const createCard = document.querySelector('.create-agent-dashed-card');

      if (grid && createCard) {
        const newCard = document.createElement('div');
        newCard.className = 'agent-rich-card';
        newCard.setAttribute('data-status', 'draft');
        newCard.setAttribute('data-model', model);
        newCard.setAttribute('data-tags', '#custom');

        newCard.innerHTML = `
          <div class="agent-card-top">
            <div class="agent-card-header">
              <div class="agent-avatar-title">
                <div class="agent-icon-box robot">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="12" x="3" y="6" rx="2" />
                    <line x1="9" x2="9" y1="12" y2="12" />
                    <line x1="15" x2="15" y1="12" y2="12" />
                    <path d="M12 2v4" />
                  </svg>
                </div>
                <div class="agent-header-meta">
                  <h3 class="agent-card-name">${escapeHtml(name)}</h3>
                  <span class="agent-status-badge draft">
                    <span style="width: 5px; height: 5px; border-radius: 50%; background-color: #d97706;"></span>
                    Draft
                  </span>
                </div>
              </div>
            </div>
            <p class="agent-card-desc">${escapeHtml(desc || 'Declarative agent in development.')}</p>
            <div class="agent-card-runtime-row">
              <span class="runtime-model-tag">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                </svg>
                ${escapeHtml(model)}
              </span>
              <span class="runtime-stats-text">just created</span>
            </div>
          </div>
          <div class="agent-card-footer">
            <div class="agent-tags-list">
              <span class="agent-tag-item">#custom</span>
            </div>
            <div class="agent-card-actions">
              <button type="button" class="btn-agent-action-secondary btn-test-agent">Test Run</button>
              <button type="button" class="btn-agent-action-primary">Deploy</button>
            </div>
          </div>
        `;

        // Bind test run to the newly added card
        const newTestBtn = newCard.querySelector('.btn-test-agent');
        if (newTestBtn) {
          newTestBtn.addEventListener('click', () => openTestDrawer(name));
        }

        grid.insertBefore(newCard, createCard);
      }

      form.reset();
      closeModal();
      showStudioToast(`Agent "${name}" successfully created!`);
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
 * AGENT CREATION WIZARD — 3-Step Controller
 * Steps: 1. Customize  →  2. Definition & Topics  →  3. Test & Preview
 * ===================================================================== */
function initAgentCreationWizard() {
  // ── Element refs ──────────────────────────────────────────────────────
  const wizardBackdrop   = document.getElementById('createAgentModal');
  const btnNext          = document.getElementById('btnWizardNext');
  const btnBack          = document.getElementById('btnWizardBack');
  const btnCancel        = document.getElementById('btnCancelModal');
  const btnActivate      = document.getElementById('btnActivateAgent');
  const cancelWizardBtn  = document.getElementById('btnCancelCreateAgent');

  // Stepper nodes & lines
  const stepNodes  = [
    document.getElementById('stepNode1'),
    document.getElementById('stepNode2'),
    document.getElementById('stepNode3'),
  ];
  const stepLines  = [
    document.getElementById('stepLine1'),
    document.getElementById('stepLine2'),
  ];
  const stepPanes  = [
    document.getElementById('wizardStep1'),
    document.getElementById('wizardStep2'),
    document.getElementById('wizardStep3'),
  ];
  const footerDots = document.querySelectorAll('.footer-step-dot');

  if (!wizardBackdrop || !btnNext) return;  // not on agent-studio page

  let currentStep = 1;
  const TOTAL_STEPS = 3;

  // ── Step transition helpers ───────────────────────────────────────────
  function goToStep(targetStep) {
    if (targetStep < 1 || targetStep > TOTAL_STEPS) return;

    // Validate step 1 before proceeding
    if (currentStep === 1 && targetStep > 1) {
      const nameInput = document.getElementById('wizardAgentName');
      if (nameInput && !nameInput.value.trim()) {
        nameInput.classList.add('input-error');
        nameInput.focus();
        showStudioToast('Please enter an agent name before continuing.');
        return;
      }
      if (nameInput) nameInput.classList.remove('input-error');
    }

    // Sync step 3 summary from step 1 & 2 data
    if (targetStep === 3) {
      syncWizardTestSummary();
    }

    currentStep = targetStep;

    // Update panes
    stepPanes.forEach((pane, idx) => {
      if (!pane) return;
      pane.classList.toggle('active', idx + 1 === currentStep);
    });

    // Update stepper nodes
    stepNodes.forEach((node, idx) => {
      if (!node) return;
      const step = idx + 1;
      node.classList.remove('active', 'completed');
      if (step < currentStep) node.classList.add('completed');
      else if (step === currentStep) node.classList.add('active');
    });

    // Update connector lines
    stepLines.forEach((line, idx) => {
      if (!line) return;
      line.classList.toggle('filled', idx + 1 < currentStep);
    });

    // Update footer dots
    footerDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx + 1 === currentStep);
    });

    // Update footer buttons
    if (btnBack)     btnBack.style.display     = currentStep > 1 ? 'inline-flex' : 'none';
    if (btnNext)     btnNext.style.display     = currentStep < TOTAL_STEPS ? 'inline-flex' : 'none';
    if (btnActivate) btnActivate.style.display = currentStep === TOTAL_STEPS ? 'inline-flex' : 'none';
  }

  // ── Open / close wizard ───────────────────────────────────────────────
  function openWizard() {
    wizardBackdrop.classList.add('active');
    goToStep(1);
    resetWizardChat();
  }

  function closeWizard() {
    wizardBackdrop.classList.remove('active');
  }

  // Buttons to open wizard
  const openBtns = document.querySelectorAll('#btnNewAgentTop, #btnNewAgentSidebar, #btnNewAgentCard');
  openBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => { e.preventDefault(); openWizard(); });
  });

  // Cancel / close buttons
  [btnCancel, cancelWizardBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', closeWizard);
  });

  wizardBackdrop.addEventListener('click', (e) => {
    if (e.target === wizardBackdrop) closeWizard();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && wizardBackdrop.classList.contains('active')) closeWizard();
  });

  // ── Next / Back navigation ────────────────────────────────────────────
  if (btnNext) btnNext.addEventListener('click', () => goToStep(currentStep + 1));
  if (btnBack) btnBack.addEventListener('click', () => goToStep(currentStep - 1));

  // ── Activate Agent (Step 3 CTA) ───────────────────────────────────────
  if (btnActivate) {
    btnActivate.addEventListener('click', () => {
      const agentName = document.getElementById('wizardAgentName')?.value.trim() || 'New Agent';
      const agentDesc = document.getElementById('wizardAgentDesc')?.value.trim() || 'AI agent.';
      createAgentCardFromWizard(agentName, agentDesc);
      closeWizard();
      showStudioToast(`Agent "${agentName}" activated successfully! 🎉`);
    });
  }

  // ── Step 1 UX helpers ─────────────────────────────────────────────────
  // Auto-slugify API Name from Agent Name
  const nameInput    = document.getElementById('wizardAgentName');
  const apiNameInput = document.getElementById('wizardAgentApiName');
  if (nameInput && apiNameInput) {
    nameInput.addEventListener('input', () => {
      const slug = nameInput.value
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_]/g, '');
      apiNameInput.value = slug || 'Agentforce_Service_Agent';
    });
  }

  // Char counter for description textarea
  const descArea     = document.getElementById('wizardAgentDesc');
  const descCounter  = document.getElementById('descCharCounter');
  const MAX_CHARS    = 1000;
  if (descArea && descCounter) {
    function updateCharCount() {
      const remaining = MAX_CHARS - descArea.value.length;
      descCounter.textContent = `${remaining} characters remaining`;
      descCounter.style.color = remaining < 100 ? '#ef4444' : '';
    }
    descArea.addEventListener('input', updateCharCount);
    updateCharCount();
  }

  // ── Step 2 Instruction management ────────────────────────────────────
  const addInstructionBtn = document.getElementById('btnAddInstructionRow');
  if (addInstructionBtn) {
    addInstructionBtn.addEventListener('click', addInstructionRow);
  }

  // Delegate delete & edit on instruction list
  const instructionList = document.getElementById('instructionsCardsList');
  if (instructionList) {
    instructionList.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.btn-delete-instruction');
      if (deleteBtn) {
        const row = deleteBtn.closest('.instruction-card-row');
        if (row && instructionList.querySelectorAll('.instruction-card-row').length > 1) {
          row.style.opacity = '0';
          row.style.transform = 'translateX(-8px)';
          row.style.transition = 'all 0.2s ease';
          setTimeout(() => row.remove(), 200);
        } else {
          showStudioToast('At least one instruction is required.');
        }
        return;
      }
      // Edit button: just focus the text field
      const editBtn = e.target.closest('.btn-instruction-action:not(.btn-delete-instruction)');
      if (editBtn) {
        const field = editBtn.closest('.instruction-card-row')?.querySelector('.instruction-text-field');
        if (field) { field.focus(); field.select(); }
      }
    });
  }

  function addInstructionRow(prefillText = '') {
    if (!instructionList) return;
    const row = document.createElement('div');
    row.className = 'instruction-card-row';
    row.style.opacity = '0';
    row.style.transform = 'translateY(6px)';
    row.innerHTML = `
      <div class="instruction-input-wrap">
        <span class="instruction-dot-label">* Instruction</span>
        <input type="text" class="instruction-text-field" value="${escapeHtml(prefillText)}"
          placeholder="Enter a clear instruction for this agent…" />
      </div>
      <div class="instruction-row-actions">
        <button type="button" class="btn-instruction-action" title="Edit Instruction">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
        </button>
        <button type="button" class="btn-instruction-action btn-delete-instruction" title="Delete Instruction">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>
    `;
    instructionList.appendChild(row);
    // Animate in
    requestAnimationFrame(() => {
      row.style.transition = 'all 0.25s ease';
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    });
    row.querySelector('.instruction-text-field')?.focus();
  }

  // ── Step 3 summary sync ───────────────────────────────────────────────
  function syncWizardTestSummary() {
    const agentNameSummary = document.getElementById('testSummaryAgentName');
    const topicNameSummary = document.getElementById('testSummaryTopicName');
    const agentName = document.getElementById('wizardAgentName')?.value.trim() || 'Agentforce Service Agent';
    const topicName = document.getElementById('wizardTopicName')?.value.trim() || 'Case Management';
    if (agentNameSummary) agentNameSummary.textContent = agentName;
    if (topicNameSummary) topicNameSummary.textContent = topicName;
  }

  // ── Wizard Chat (Step 3 Conversation Preview) ─────────────────────────
  let wizardTurnCount = 0;
  let debugMode = false;

  const chatFeed        = document.getElementById('wizardChatFeed');
  const promptInput     = document.getElementById('wizardPromptInput');
  const sendBtn         = document.getElementById('btnWizardSendPrompt');
  const telemetryBar    = document.getElementById('convTelemetryBar');
  const telTurn         = document.getElementById('telemTurn');
  const telTokens       = document.getElementById('telemTokens');
  const telLatency      = document.getElementById('telemLatency');
  const telStatus       = document.getElementById('telemStatus');
  const pillsRow        = document.getElementById('convSamplePills');
  const mascotHero      = document.getElementById('convMascotHero');
  const resetBtn        = document.getElementById('btnResetConversation');
  const debugBtn        = document.getElementById('btnToggleDebugView');

  function wizardSendMessage(text) {
    if (!text || !chatFeed) return;

    // Hide mascot & pills on first message
    if (mascotHero) mascotHero.style.display = 'none';
    if (pillsRow)   pillsRow.style.display   = 'none';

    // Show telemetry bar
    if (telemetryBar) telemetryBar.style.display = 'flex';

    // Append user message
    const userBubble = document.createElement('div');
    userBubble.className = 'drawer-chat-message user';
    userBubble.innerHTML = `<div class="drawer-bubble">${escapeHtml(text)}</div>`;
    chatFeed.appendChild(userBubble);
    chatFeed.scrollTop = chatFeed.scrollHeight;

    // Show typing dots
    const typingBubble = document.createElement('div');
    typingBubble.className = 'drawer-chat-message assistant';
    typingBubble.innerHTML = `
      <div class="drawer-bubble" style="display:flex;gap:5px;align-items:center;padding:0.75rem 1rem;">
        <span style="width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:pulse 1s infinite;"></span>
        <span style="width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:pulse 1s infinite 0.2s;"></span>
        <span style="width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:pulse 1s infinite 0.4s;"></span>
      </div>
    `;
    chatFeed.appendChild(typingBubble);
    chatFeed.scrollTop = chatFeed.scrollHeight;

    const latencyMs = 420 + Math.floor(Math.random() * 300);
    const startTime = Date.now();

    setTimeout(() => {
      typingBubble.remove();
      wizardTurnCount++;

      const response = generateWizardResponse(text, wizardTurnCount);
      const tokenCount = Math.floor(text.length * 0.8 + response.raw.length * 0.6);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

      // Append agent response
      const agentBubble = document.createElement('div');
      agentBubble.className = 'drawer-chat-message assistant';
      agentBubble.innerHTML = `<div class="drawer-bubble">${response.html}</div>`;
      if (debugMode) {
        const trace = document.createElement('div');
        trace.style.cssText = 'font-size:0.7rem;color:#64748b;margin:2px 0 0 0;font-family:monospace;padding:0 2px;';
        trace.textContent = `[trace] turn:${wizardTurnCount} tokens:${tokenCount} latency:${elapsed}s`;
        agentBubble.appendChild(trace);
      }
      chatFeed.appendChild(agentBubble);
      chatFeed.scrollTop = chatFeed.scrollHeight;

      // Update telemetry
      if (telTurn)    telTurn.textContent    = `Turn: ${wizardTurnCount}`;
      if (telTokens)  telTokens.textContent  = `${tokenCount} tokens`;
      if (telLatency) telLatency.textContent = `${elapsed}s`;
      if (telStatus)  telStatus.textContent  = response.passed ? 'Rules: Passed 4/4' : 'Rules: Partial';
      if (telStatus)  telStatus.className    = `telem-badge ${response.passed ? 'success' : 'warn'}`;
    }, latencyMs);

    if (promptInput) promptInput.value = '';
  }

  function generateWizardResponse(text, turn) {
    const isSmokeTest = text.toLowerCase().includes('smoke test') || text.toLowerCase().includes('probe');
    const agentName = document.getElementById('wizardAgentName')?.value.trim() || 'Agentforce Service Agent';

    // Smoke test probe → strict 4-line format
    if (isSmokeTest) {
      const truncated = text.length > 200 ? text.slice(0, 200) : text;
      const raw = `OK\nreceived: ${truncated}\nlength: ${text.length}\nturn: ${turn}`;
      return {
        html: `<pre style="font-family:monospace;font-size:0.8rem;line-height:1.6;margin:0;">${escapeHtml(raw)}</pre>`,
        raw,
        passed: true,
      };
    }

    // Case status query
    if (/case|status|cs-\d+/i.test(text)) {
      const raw = `Hello! I'm ${agentName}. I found case #CS-8924.\n\nStatus: In Progress — Assigned to Senior Support\nLast Updated: Today at 10:42 AM\nExpected Resolution: Within 24 hours\n\nWould you like me to escalate or send you an update via email?`;
      return {
        html: raw.replace(/\n/g, '<br>'),
        raw,
        passed: true,
      };
    }

    // No case number
    if (/don't have|no case|without case/i.test(text)) {
      const raw = `No problem! I can help locate your case with the following alternatives:\n• Email address used during registration\n• Phone number linked to your account\n• Order reference number\n\nPlease share any of these and I'll retrieve your case right away.`;
      return {
        html: raw.replace(/\n/g, '<br>'),
        raw,
        passed: true,
      };
    }

    // Greeting / generic
    const raw = `Hi there! I'm ${agentName}, your AI service assistant.\n\nI can help you with:\n• Case status inquiries\n• Updating your case information\n• Escalating urgent issues to human agents\n\nHow can I assist you today?`;
    return {
      html: raw.replace(/\n/g, '<br>'),
      raw,
      passed: true,
    };
  }

  function resetWizardChat() {
    wizardTurnCount = 0;
    if (chatFeed) {
      // Remove all messages but keep mascot + pills
      const messages = chatFeed.querySelectorAll('.drawer-chat-message');
      messages.forEach(m => m.remove());
      if (mascotHero) mascotHero.style.display = 'flex';
      if (pillsRow)   pillsRow.style.display   = 'flex';
    }
    if (telemetryBar) telemetryBar.style.display = 'none';
    if (promptInput)  promptInput.value = '';
  }

  // Send button
  if (sendBtn && promptInput) {
    sendBtn.addEventListener('click', () => wizardSendMessage(promptInput.value.trim()));
    promptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); wizardSendMessage(promptInput.value.trim()); }
    });
  }

  // Sample pill shortcuts
  if (pillsRow) {
    pillsRow.addEventListener('click', (e) => {
      const pill = e.target.closest('.btn-conv-pill');
      if (pill) {
        const prompt = pill.getAttribute('data-prompt');
        if (prompt) wizardSendMessage(prompt);
      }
    });
  }

  // Reset conversation
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetWizardChat();
      showStudioToast('Conversation reset.');
    });
  }

  // Toggle debug traces
  if (debugBtn) {
    debugBtn.addEventListener('click', () => {
      debugMode = !debugMode;
      debugBtn.style.opacity = debugMode ? '1' : '0.5';
      showStudioToast(debugMode ? 'Debug traces enabled.' : 'Debug traces hidden.');
    });
  }

  // ── Create agent card from wizard data ────────────────────────────────
  function createAgentCardFromWizard(name, desc) {
    const grid = document.querySelector('.agents-rich-grid');
    const createCard = document.querySelector('.create-agent-dashed-card');
    if (!grid || !createCard) return;

    const newCard = document.createElement('div');
    newCard.className = 'agent-rich-card';
    newCard.setAttribute('data-status', 'active');
    newCard.setAttribute('data-model', 'xai/grok-4.3');
    newCard.setAttribute('data-tags', '#custom #wizard');
    newCard.innerHTML = `
      <div class="agent-card-top">
        <div class="agent-card-header">
          <div class="agent-avatar-title">
            <div class="agent-icon-box robot" style="background:linear-gradient(135deg,#2563eb,#7c3aed);">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="12" x="3" y="6" rx="2"/>
                <line x1="9" x2="9" y1="12" y2="12"/><line x1="15" x2="15" y1="12" y2="12"/>
                <path d="M12 2v4"/>
              </svg>
            </div>
            <div class="agent-header-meta">
              <h3 class="agent-card-name">${escapeHtml(name)}</h3>
              <span class="agent-status-badge active">
                <span style="width:5px;height:5px;border-radius:50%;background:#16a34a;"></span>
                Active
              </span>
            </div>
          </div>
        </div>
        <p class="agent-card-desc">${escapeHtml(desc)}</p>
        <div class="agent-card-runtime-row">
          <span class="runtime-model-tag">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
            </svg>
            xAI Grok-4.3
          </span>
          <span class="runtime-stats-text">just created via wizard</span>
        </div>
      </div>
      <div class="agent-card-footer">
        <div class="agent-tags-list">
          <span class="agent-tag-item">#custom</span>
          <span class="agent-tag-item">#wizard</span>
        </div>
        <div class="agent-card-actions">
          <button type="button" class="btn-agent-action-secondary btn-test-agent">Test Run</button>
          <button type="button" class="btn-agent-action-primary">Deploy</button>
        </div>
      </div>
    `;

    // Bind test button
    const testBtn = newCard.querySelector('.btn-test-agent');
    if (testBtn) testBtn.addEventListener('click', () => openTestDrawer(name));

    grid.insertBefore(newCard, createCard);

    // Brief highlight animation
    newCard.style.outline = '2px solid #2563eb';
    newCard.style.transition = 'outline 0.6s ease';
    setTimeout(() => { newCard.style.outline = '2px solid transparent'; }, 1200);
  }
}

/* =====================================================================
 * FULL-PAGE TEST AGENT VIEW — initTestAgentPage()
 * Opens #pane-test-agent when clicking "Test Run" on any agent card
 * or clicking a recent agent link in the secondary sidebar.
 * ===================================================================== */
function initTestAgentPage() {

  // ── Agent knowledge base ──────────────────────────────────────────────
  const AGENT_DATA = {
    'Zenith BA Architect': {
      subtitle:    'Business Analyst · claude-3-5-sonnet',
      iconBg:      'rgba(37,99,235,0.12)', iconColor: '#2563eb',
      welcomeTitle:'Hi, I\'m the Zenith BA Architect!',
      welcomeSub:  'Send me a feature idea and I\'ll generate a PRD, user stories, and Gherkin criteria.',
      chips: ['Generate a PRD for a user authentication module', 'Write BDD test cases for the checkout flow', 'Create a sequence diagram for the order lifecycle'],
      topics: [{
        name: 'PRD & Requirements', apiName: 'PRD_Requirements',
        desc: 'Generates formal Product Requirement Documents, user stories and acceptance criteria from chat descriptions.',
        instructions: ['Parse the user\'s idea and identify core functional requirements.', 'Structure output as: Overview, User Stories, Acceptance Criteria (Gherkin), and Success Metrics.', 'Always ask for the target user persona if not provided.', 'If the request is ambiguous, generate 2 interpretations and ask the user to confirm.'],
        reasoning: 'REQUIREMENTS_SPEC: Input analyzed. Extracting functional + non-functional requirements. Structuring as IEEE 830 partial spec. No scope creep detected.',
      }, {
        name: 'Off Topic', apiName: 'Off_Topic',
        desc: 'Used when a user asks about subjects outside business analysis, requirements, or system design.',
        instructions: ['Politely inform the user this topic is outside BA Architect\'s scope.', 'Redirect to relevant capability — PRD generation, user stories, or flow diagrams.'],
        reasoning: 'OFF_TOPIC: Prompt does not match requirements or specification scope. Redirecting.',
      }],
    },
    'DevCore Code Synthesizer': {
      subtitle:    'Full-Stack Developer · claude-3-5-sonnet · Deployed',
      iconBg:      'rgba(16,185,129,0.12)', iconColor: '#059669',
      welcomeTitle:'DevCore ready to synthesize!',
      welcomeSub:  'Describe a component, API endpoint, or database schema and I\'ll generate production-ready code.',
      chips: ['Generate a React auth form with Zod validation', 'Write a Prisma schema for a SaaS multi-tenant app', 'Create a REST endpoint for user profile updates'],
      topics: [{
        name: 'Code Generation', apiName: 'Code_Generation',
        desc: 'Generates TypeScript/React components, REST/GraphQL APIs, Prisma schemas, and live hot-reload patches.',
        instructions: ['Always use TypeScript with strict mode and explicit return types.', 'Prefer functional components with hooks over class components.', 'Include inline JSDoc comments for all exported functions.', 'Validate inputs using Zod schemas before processing.'],
        reasoning: 'CODE_SYNTHESIS: AST graph built. Module dependency resolved. Generating TypeScript + JSX output. 0 lint errors projected.',
      }, {
        name: 'Debugging & Refactor', apiName: 'Debug_Refactor',
        desc: 'Identifies runtime errors, code smells, and refactoring opportunities in existing codebases.',
        instructions: ['Reproduce the error scenario before suggesting a fix.', 'Explain root cause using a 3-line summary before the fix.', 'Apply SOLID principles when refactoring.'],
        reasoning: 'DEBUG_TRACE: Stack trace parsed. Identifying root cause pattern. Proposing minimal-diff fix.',
      }],
    },
    'Omni PM & Sprint Orchestrator': {
      subtitle:    'Product Manager · gpt-4o',
      iconBg:      'rgba(245,158,11,0.12)', iconColor: '#d97706',
      welcomeTitle:'Omni PM at your service!',
      welcomeSub:  'Share a project goal and I\'ll decompose it into a milestone roadmap and sprint tickets.',
      chips: ['Break down a SaaS MVP into 4-week sprints', 'Prioritize these backlog items by business value', 'Generate a release checklist for v1.0'],
      topics: [{
        name: 'Sprint Planning', apiName: 'Sprint_Planning',
        desc: 'Decomposes project goals into sprint tickets, estimates story points, and sets milestone dependencies.',
        instructions: ['Use MoSCoW method to prioritize features.', 'Estimate story points using Fibonacci sequence (1, 2, 3, 5, 8, 13).', 'Identify and flag cross-team dependencies before sprint start.', 'Always include a Definition of Done for each epic.'],
        reasoning: 'SPRINT_DECOMP: Project scope parsed. Fibonacci SP estimates applied. Critical path identified. 0 circular dependencies.',
      }, {
        name: 'Risk & Scope', apiName: 'Risk_Scope',
        desc: 'Flags scope creep, estimates delay risk, and suggests MVP cuts to protect deadlines.',
        instructions: ['Score each risk item: Probability (1-5) x Impact (1-5).', 'Recommend mitigation for any risk with score >= 12.', 'Always propose a scope reduction path for deadline-critical scenarios.'],
        reasoning: 'RISK_MATRIX: 2 high-impact risks identified. Mitigation strategies computed. Scope reduction path available.',
      }],
    },
    'PixelCraft UI/UX Agent': {
      subtitle:    'UI/UX Designer · Gemini 2.5',
      iconBg:      'rgba(168,85,247,0.12)', iconColor: '#9333ea',
      welcomeTitle:'PixelCraft ready to design!',
      welcomeSub:  'Describe your interface and I\'ll generate CSS tokens, component wireframes, or glassmorphic themes.',
      chips: ['Generate a dark glassmorphic dashboard theme', 'Create CSS design tokens for a SaaS product', 'Write accessible color palette with WCAG AA contrast'],
      topics: [{
        name: 'Design System', apiName: 'Design_System',
        desc: 'Generates CSS tokens, color palettes, typography scales, and component-level style sheets.',
        instructions: ['Always define tokens as CSS custom properties on :root.', 'Apply WCAG AA (4.5:1) contrast ratio as minimum for text colors.', 'Use cubic-bezier(0.16, 1, 0.3, 1) as the default easing for all transitions.', 'Document every token with a comment describing its semantic meaning.'],
        reasoning: 'DESIGN_TOKENS: Color palette generated. Contrast ratios validated (min 4.5:1). Animation curve standardized. Token naming: --color-{role}-{scale}.',
      }, {
        name: 'Component Wireframe', apiName: 'Component_Wireframe',
        desc: 'Produces annotated HTML/CSS wireframes for UI components based on text description.',
        instructions: ['Output clean, semantic HTML5 with ARIA attributes.', 'Use BEM naming convention for CSS classes.', 'Include focus state styles for keyboard accessibility.'],
        reasoning: 'WIREFRAME_GEN: Component decomposed into atoms/molecules. BEM schema applied. ARIA labels included.',
      }],
    },
    'DeployGuard & QA Agent': {
      subtitle:    'DevOps & QA · xAI Grok-4.3 · Deployed',
      iconBg:      'rgba(239,68,68,0.12)', iconColor: '#dc2626',
      welcomeTitle:'DeployGuard online!',
      welcomeSub:  'Ask me to build Docker images, run QA test suites, or check your CI/CD pipeline status.',
      chips: ['Build a Docker image for the Node.js API service', 'Run E2E test suite for the checkout module', 'Check CI/CD pipeline status for main branch'],
      topics: [{
        name: 'Container Build', apiName: 'Container_Build',
        desc: 'Compiles standalone Docker images, validates Dockerfiles, and pushes to container registry.',
        instructions: ['Always use Alpine Linux base images for minimal surface area.', 'Run docker scan after each build and fail if critical CVEs found.', 'Tag images with both :latest and the Git commit SHA.', 'Output build logs in structured JSON for downstream parsing.'],
        reasoning: 'CONTAINER_BUILD: Dockerfile validated. Multi-stage build applied. Alpine 3.19 base. CVE scan: 0 critical. Image tagged: zenith-api:a3f9d21.',
      }, {
        name: 'QA Test Suite', apiName: 'QA_Test_Suite',
        desc: 'Executes Playwright E2E tests, Jest unit tests, and reports coverage statistics.',
        instructions: ['Run unit tests first; stop E2E execution if unit coverage < 80%.', 'Mark any flaky test (fails < 20% of runs) as quarantined and report it.', 'Generate HTML coverage report and attach to pipeline artifacts.'],
        reasoning: 'QA_SUITE: Unit tests: 48/48 passed. Coverage: 94%. E2E: 16/16 passed. 0 flaky tests. Artifacts uploaded.',
      }],
    },
    'E-Commerce Growth Architect': {
      subtitle:    'Custom Agent · xAI Grok-4.3',
      iconBg:      'rgba(14,165,233,0.12)', iconColor: '#0284c7',
      welcomeTitle:'Hi, I\'m the Growth Architect!',
      welcomeSub:  'Ask me about checkout optimization, payment webhooks, or cart analytics.',
      chips: ['Analyze our cart abandonment rate and suggest fixes', 'Set up a Stripe webhook for subscription renewals', 'Generate a dynamic pricing model for flash sales'],
      topics: [{
        name: 'Checkout Optimization', apiName: 'Checkout_Optimization',
        desc: 'Identifies checkout friction points, A/B test opportunities, and conversion rate improvements.',
        instructions: ['Benchmark the current funnel against industry average (68% abandonment).', 'Suggest 3 high-ROI A/B tests ranked by expected lift.', 'Identify payment method gaps that may be causing drop-offs.', 'Always recommend a guest checkout option if not present.'],
        reasoning: 'CHECKOUT_AUDIT: Funnel stages analyzed. 3 high-friction points identified. Stripe + Midtrans coverage gaps flagged. Guest checkout: MISSING.',
      }, {
        name: 'Payment Webhooks', apiName: 'Payment_Webhooks',
        desc: 'Sets up Stripe and Midtrans payment event webhooks with retry logic and idempotency keys.',
        instructions: ['Always validate webhook signatures before processing events.', 'Use idempotency keys to prevent duplicate event processing.', 'Implement exponential backoff for failed webhook deliveries.'],
        reasoning: 'WEBHOOK_SETUP: Stripe signature validation applied. Idempotency keys generated. Retry policy: exponential backoff (max 5 attempts).',
      }],
    },
  };

  function resolveAgentKey(name) {
    if (!name) return null;
    if (AGENT_DATA[name]) return name;
    const lower = name.toLowerCase();
    return Object.keys(AGENT_DATA).find(k => k.toLowerCase().includes(lower) || lower.includes(k.toLowerCase())) || null;
  }

  // ── DOM refs ──────────────────────────────────────────────────────────
  const paneTestAgent    = document.getElementById('pane-test-agent');
  const paneAgents       = document.getElementById('pane-agents');
  const btnBack          = document.getElementById('btnBackToAgents');
  const btnClearChat     = document.getElementById('btnClearTestChat');
  const btnToggleTrace   = document.getElementById('btnToggleFullTrace');
  const splitLayout      = document.querySelector('.test-agent-split-layout');
  const testAgentNameEl  = document.getElementById('testAgentName');
  const testAgentMetaEl  = document.getElementById('testAgentMeta');
  const testAgentIconWrap= document.getElementById('testAgentIconWrap');
  const testConvBody     = document.getElementById('testConvBody');
  const testConvWelcome  = document.getElementById('testConvWelcome');
  const testWelcomeTitle = document.getElementById('testWelcomeTitle');
  const testWelcomeSub   = document.getElementById('testWelcomeSubtitle');
  const testQuickChips   = document.getElementById('testQuickChips');
  const testWelcomeAvatar= document.getElementById('testWelcomeAvatar');
  const traceScrollBody  = document.getElementById('traceScrollBody');
  const traceEmptyState  = document.getElementById('traceEmptyState');
  const testTelemetryBar = document.getElementById('testTelemetryBar');
  const taTurn           = document.getElementById('taTurn');
  const taTokens         = document.getElementById('taTokens');
  const taLatency        = document.getElementById('taLatency');
  const taStatus         = document.getElementById('taStatus');
  const taModel          = document.getElementById('taModel');
  const testPromptInput  = document.getElementById('testPromptInput');
  const btnTestSend      = document.getElementById('btnTestSend');

  if (!paneTestAgent) return;

  let currentAgent = null;
  let turnCount    = 0;
  let traceVisible = true;

  // ── Open test page ────────────────────────────────────────────────────
  function openTestPage(agentName) {
    const key  = resolveAgentKey(agentName);
    const data = key ? AGENT_DATA[key] : null;
    currentAgent = data || {
      subtitle: 'Active · Agent', iconBg: 'rgba(37,99,235,0.12)', iconColor: '#2563eb',
      welcomeTitle: `Hi, I\'m ${agentName}!`, welcomeSub: 'How can I help you today?',
      chips: ['Say hello', 'Run a quick test'], topics: [],
    };

    if (testAgentNameEl) testAgentNameEl.textContent = key || agentName;
    if (testAgentMetaEl) testAgentMetaEl.textContent  = currentAgent.subtitle;
    if (testAgentIconWrap) {
      testAgentIconWrap.style.background = currentAgent.iconBg;
      testAgentIconWrap.style.color      = currentAgent.iconColor;
    }
    if (testWelcomeAvatar) {
      testWelcomeAvatar.style.background = currentAgent.iconBg;
      testWelcomeAvatar.style.color      = currentAgent.iconColor;
    }
    if (testWelcomeTitle) testWelcomeTitle.textContent = currentAgent.welcomeTitle;
    if (testWelcomeSub)   testWelcomeSub.textContent   = currentAgent.welcomeSub;
    if (taModel) taModel.textContent = (currentAgent.subtitle.split('·')[1] || '').trim();

    // Chips
    if (testQuickChips) {
      testQuickChips.innerHTML = '';
      (currentAgent.chips || []).forEach(chip => {
        const btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'btn-quick-chip';
        btn.textContent = chip;
        btn.addEventListener('click', () => sendTestMessage(chip));
        testQuickChips.appendChild(btn);
      });
    }

    resetTestChat();
    document.querySelectorAll('.studio-pane-section').forEach(p => p.classList.remove('active'));
    paneTestAgent.classList.add('active');
    const crumb = document.getElementById('studioCrumbSub');
    if (crumb) crumb.textContent = `Test: ${key || agentName}`;
  }

  function backToAgents() {
    document.querySelectorAll('.studio-pane-section').forEach(p => p.classList.remove('active'));
    if (paneAgents) paneAgents.classList.add('active');
    const crumb = document.getElementById('studioCrumbSub');
    if (crumb) crumb.textContent = 'Agents';
  }
  if (btnBack) btnBack.addEventListener('click', backToAgents);

  function resetTestChat() {
    turnCount = 0;
    if (testConvBody) {
      testConvBody.querySelectorAll('.test-msg-user, .test-msg-agent').forEach(m => m.remove());
    }
    if (testConvWelcome) testConvWelcome.style.display = 'flex';
    if (testQuickChips)  testQuickChips.style.display  = 'flex';
    if (testTelemetryBar) testTelemetryBar.style.display = 'none';
    if (traceScrollBody) traceScrollBody.querySelectorAll('.trace-block').forEach(b => b.remove());
    if (traceEmptyState) traceEmptyState.style.display = 'flex';
    if (testPromptInput) { testPromptInput.value = ''; testPromptInput.style.height = 'auto'; }
  }

  if (btnClearChat) btnClearChat.addEventListener('click', () => { resetTestChat(); showStudioToast('Conversation reset.'); });

  if (btnToggleTrace && splitLayout) {
    btnToggleTrace.addEventListener('click', () => {
      traceVisible = !traceVisible;
      splitLayout.classList.toggle('trace-hidden', !traceVisible);
    });
  }

  // ── Send message ──────────────────────────────────────────────────────
  function sendTestMessage(text) {
    if (!text || !text.trim()) return;
    text = text.trim();
    if (testConvWelcome) testConvWelcome.style.display = 'none';
    if (testQuickChips)  testQuickChips.style.display  = 'none';
    appendConvMessage('user', text);
    appendTraceBlock('user-prompt', text);
    const latencyMs = 520 + Math.floor(Math.random() * 380);
    const startTime = Date.now();
    const typingEl  = appendTypingIndicator();
    setTimeout(() => {
      typingEl.remove();
      turnCount++;
      const resp      = generateTestResponse(text, currentAgent, turnCount);
      appendConvMessage('agent', resp.text);
      if (currentAgent && currentAgent.topics && currentAgent.topics.length > 0) {
        const topic = currentAgent.topics[Math.abs(text.length % currentAgent.topics.length)];
        appendTraceBlock('topic', text, topic);
        appendTraceBlock('reasoning', text, topic);
      }
      const elapsed    = ((Date.now() - startTime) / 1000).toFixed(2);
      const tokenCount = Math.floor(text.length * 0.75 + resp.text.length * 0.6);
      if (testTelemetryBar) testTelemetryBar.style.display = 'flex';
      if (taTurn)    taTurn.textContent    = `Turn: ${turnCount}`;
      if (taTokens)  taTokens.textContent  = `${tokenCount} tokens`;
      if (taLatency) taLatency.textContent = `${elapsed}s`;
      if (taStatus)  { taStatus.textContent = 'Passed'; taStatus.className = 'telem-badge success'; }
    }, latencyMs);
    if (testPromptInput) { testPromptInput.value = ''; testPromptInput.style.height = 'auto'; }
  }

  // ── Response generator ────────────────────────────────────────────────
  function generateTestResponse(prompt, agent, turn) {
    const p   = prompt.toLowerCase();
    const key = resolveAgentKey(agent?.welcomeTitle || '');

    if (!key) return { text: `Received: "${prompt}". Turn ${turn} complete.` };

    if (key === 'Zenith BA Architect') {
      if (p.includes('prd') || p.includes('requirement') || p.includes('feature') || p.includes('module'))
        return { text: `**PRD Generated**\n\nFeature: ${prompt}\n\nUser Story: As an authenticated user, I want to use this feature so that I achieve my goal efficiently.\n\nAcceptance Criteria (Gherkin):\n• Given: user is authenticated\n• When: user triggers the feature\n• Then: system responds within 200ms\n\nSuccess Metrics: 95% task completion rate, < 3s p99 latency.` };
      if (p.includes('bdd') || p.includes('gherkin') || p.includes('test case'))
        return { text: `**BDD Test Cases Generated**\n\nScenario: Successful flow\n  Given I am logged in\n  When I initiate the action\n  Then the system returns HTTP 200\n  And the response matches the expected schema\n\nScenario: Invalid input\n  Given I am logged in\n  When I submit invalid data\n  Then the system returns HTTP 422 with an error message` };
      return { text: `**Analysis Complete** (Turn ${turn})\n\nI've parsed your request and identified the following:\n• Core entities: User, System, Action\n• Primary actor: Authenticated Developer\n• Functional requirements: 3 identified\n• Non-functional requirements: Performance < 200ms, Availability 99.9%\n\nWould you like me to generate the full PRD or user stories first?` };
    }

    if (key === 'DevCore Code Synthesizer') {
      if (p.includes('react') || p.includes('component') || p.includes('form'))
        return { text: `**Component Generated** (TypeScript + React 19)\n\n\`\`\`tsx\nexport const AuthForm: React.FC = () => {\n  const form = useForm<AuthSchema>({ resolver: zodResolver(authSchema) });\n  return (\n    <form onSubmit={form.handleSubmit(onSubmit)}>\n      <Input {...form.register('email')} placeholder="Email" />\n      <Button type="submit">Sign In</Button>\n    </form>\n  );\n};\n\`\`\`\n\nHot-reloaded in WebContainer (0.38s). 0 TypeScript errors.` };
      if (p.includes('prisma') || p.includes('schema') || p.includes('database'))
        return { text: `**Prisma Schema Generated**\n\n\`\`\`prisma\nmodel User {\n  id        String   @id @default(cuid())\n  email     String   @unique\n  tenantId  String\n  createdAt DateTime @default(now())\n}\n\`\`\`\n\nMigration created: 20261204_add_user. ✔ Applied to dev DB.` };
      return { text: `**Synthesis Complete** (Turn ${turn})\n\nGenerated: TypeScript module with 4 exports\nLines: 84 | Size: 2.4 KB | Lint: 0 errors\n\nHot-reload applied to WebContainer in 0.31s. What would you like to modify?` };
    }

    if (key === 'Omni PM & Sprint Orchestrator') {
      if (p.includes('sprint') || p.includes('mvp') || p.includes('backlog') || p.includes('roadmap'))
        return { text: `**Sprint Plan Generated**\n\nSprint 1 (Wk 1-2): Core Auth + DB Schema — 13 SP\nSprint 2 (Wk 3-4): API Layer + Unit Tests — 8 SP\nSprint 3 (Wk 5-6): UI Components + E2E Tests — 13 SP\nSprint 4 (Wk 7-8): Performance + Security Audit — 5 SP\n\nRisk: Sprint 2 has external API dependency. Mitigation: mock adapter ready.` };
      return { text: `**Analysis Complete** (Turn ${turn})\n\nGoal parsed. Suggested epic structure:\n• Epic 1: Foundation (Auth, DB, CI/CD) — 21 SP\n• Epic 2: Core Features — 34 SP\n• Epic 3: Launch Readiness — 13 SP\n\nEstimated velocity: 34 SP/sprint. MVP target: 8 weeks. Shall I generate sprint tickets?` };
    }

    if (key === 'PixelCraft UI/UX Agent') {
      if (p.includes('token') || p.includes('css') || p.includes('theme') || p.includes('color'))
        return { text: `**Design Tokens Generated**\n\n\`\`\`css\n:root {\n  --color-primary-500: hsl(217, 91%, 60%);\n  --color-surface-glass: rgba(255,255,255,0.85);\n  --backdrop-blur: blur(16px);\n  --radius-card: 16px;\n  --transition-default: cubic-bezier(0.16,1,0.3,1) 200ms;\n}\n\`\`\`\n\nWCAG AA contrast verified: 6.8:1 on white. All tokens documented.` };
      return { text: `**Wireframe Generated** (Turn ${turn})\n\nComponent: ${prompt.slice(0, 40)}\nHTML: 28 lines | CSS: 64 lines\nARIA: 3 labels added\nContrast: Passed AA\n\nBEM classes applied. Focus states included. Ready for Figma export.` };
    }

    if (key === 'DeployGuard & QA Agent') {
      if (p.includes('docker') || p.includes('build') || p.includes('image'))
        return { text: `**Docker Build Complete**\n\nImage: zenith-api:v2.4.1-alpine\nBase: Alpine 3.19 | Size: 148 MB\nCVE Scan: 0 critical, 0 high\n\nPushed to: registry.zenith.dev/api:v2.4.1\nDeploy SHA: a3f9d21` };
      if (p.includes('test') || p.includes('qa') || p.includes('e2e'))
        return { text: `**QA Suite Complete**\n\nUnit Tests: 48 / 48 passed (0 failures)\nE2E Tests: 16 / 16 passed (0 flaky)\nCoverage: 94.2% (threshold: 80%)\n\nReport: /artifacts/coverage-report.html\nArtifacts uploaded to pipeline #pipe-4821` };
      return { text: `**Pipeline Status** (Turn ${turn})\n\nmain branch: GREEN\nLast deploy: 2 minutes ago\nEnvironment: Production\nHealth: HTTP 200 — All 4 services healthy\n\nCD pipeline #pipe-4821 passed all gates.` };
    }

    if (key === 'E-Commerce Growth Architect') {
      if (p.includes('cart') || p.includes('abandon') || p.includes('checkout'))
        return { text: `**Checkout Audit Complete**\n\nCurrent Abandonment Rate: 72% (industry avg: 68%)\n\nTop 3 Friction Points:\n1. No guest checkout (est. +12% conversion)\n2. 4-step checkout form (consolidate to 2)\n3. Missing local payment: DANA, GoPay (-8% mobile)\n\nRecommended A/B Tests:\n• One-click checkout (est. +8% lift)\n• Progress indicator bar (est. +4% lift)` };
      if (p.includes('stripe') || p.includes('webhook') || p.includes('payment'))
        return { text: `**Stripe Webhook Setup Complete**\n\nEvents: payment_intent.succeeded, invoice.payment_failed, customer.subscription.updated\n\nIdempotency keys: enabled\nSignature validation: HMAC-SHA256\nRetry policy: exponential backoff (5 attempts)\n\nEndpoint: https://api.yoursite.com/webhooks/stripe` };
      return { text: `**Growth Analysis** (Turn ${turn})\n\nKey metrics identified:\n• Avg order value: $48 (target: $65)\n• Repeat purchase rate: 34% (target: 50%)\n• Mobile conversion: 2.1% (desktop: 4.8%)\n\nTop opportunity: Mobile UX optimization. Want me to generate an action plan?` };
    }

    return { text: `Received your message (Turn ${turn}): "${prompt}"\n\nProcessing through primary topic module. Analysis complete. How else can I help?` };
  }

  // ── DOM helpers ───────────────────────────────────────────────────────
  function appendConvMessage(role, text) {
    if (!testConvBody) return;
    const isUser = role === 'user';
    const div = document.createElement('div');
    div.className = isUser ? 'test-msg-user' : 'test-msg-agent';
    const avatarSvg = isUser
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="12" x="3" y="6" rx="2"/><path d="M12 2v4"/></svg>`;
    const formatted = escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`\n]+)`/g, '<code style="background:#f1f5f9;padding:1px 5px;border-radius:3px;font-size:0.8em;font-family:monospace">$1</code>')
      .replace(/\n/g, '<br>');
    div.innerHTML = `<div class="test-msg-avatar">${avatarSvg}</div><div class="test-msg-bubble">${formatted}</div>`;
    testConvBody.appendChild(div);
    testConvBody.scrollTop = testConvBody.scrollHeight;
  }

  function appendTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'test-msg-agent';
    div.innerHTML = `
      <div class="test-msg-avatar" style="background:rgba(37,99,235,0.1);color:#2563eb;">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="12" x="3" y="6" rx="2"/><path d="M12 2v4"/></svg>
      </div>
      <div class="test-msg-bubble test-typing-bubble">
        <span class="test-typing-dot" style="animation:pulse 1s infinite"></span>
        <span class="test-typing-dot" style="animation:pulse 1s infinite 0.2s"></span>
        <span class="test-typing-dot" style="animation:pulse 1s infinite 0.4s"></span>
      </div>`;
    if (testConvBody) { testConvBody.appendChild(div); testConvBody.scrollTop = testConvBody.scrollHeight; }
    return div;
  }

  function appendTraceBlock(type, prompt, topic) {
    if (!traceScrollBody) return;
    if (traceEmptyState) traceEmptyState.style.display = 'none';
    const block = document.createElement('div');
    block.className = 'trace-block';

    if (type === 'user-prompt') {
      block.innerHTML = `
        <div class="trace-block-header"><span class="trace-block-icon">👤</span><span>User Prompt</span></div>
        <div class="trace-block-body"><div class="trace-user-prompt">"${escapeHtml(prompt)}"</div></div>`;
    } else if (type === 'topic' && topic) {
      const instrHtml = (topic.instructions || []).map((instr, i) => `
        <div class="trace-instruction-item">
          <span class="trace-instruction-idx">${i+1}</span>
          <span>${escapeHtml(instr)}</span>
        </div>`).join('');
      block.innerHTML = `
        <div class="trace-block-header"><span class="trace-block-icon">🧭</span><span>Select Topic</span></div>
        <div class="trace-block-body" style="padding:0;">
          <div class="trace-topic-card">
            <div class="trace-topic-name">
              <span class="trace-topic-name-hash">#</span>
              <span>${escapeHtml(topic.name)} <span style="font-weight:400;opacity:0.6;font-style:italic">(${escapeHtml(topic.apiName)})</span></span>
            </div>
            <div class="trace-topic-desc">${escapeHtml(topic.desc)}</div>
            <div class="trace-expand-row" data-expanded="false">
              <svg class="trace-expand-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              Instructions
              <span style="background:#dbeafe;color:#1d4ed8;font-size:0.65rem;padding:1px 6px;border-radius:10px;margin-left:4px;">${(topic.instructions||[]).length}</span>
            </div>
            <div class="trace-instructions-body" style="display:none;">${instrHtml}</div>
            <div class="trace-expand-row" style="margin-top:2px;" data-expanded="false">
              <svg class="trace-expand-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              Actions
              <span style="background:#f1f5f9;color:#64748b;font-size:0.65rem;padding:1px 6px;border-radius:10px;margin-left:4px;">0</span>
            </div>
          </div>
        </div>`;
      block.querySelectorAll('.trace-expand-row').forEach(row => {
        row.addEventListener('click', () => {
          const expanded = row.getAttribute('data-expanded') === 'true';
          row.setAttribute('data-expanded', String(!expanded));
          row.classList.toggle('open', !expanded);
          const next = row.nextElementSibling;
          if (next && next.classList.contains('trace-instructions-body')) next.style.display = !expanded ? 'flex' : 'none';
        });
      });
    } else if (type === 'reasoning' && topic) {
      block.innerHTML = `
        <div class="trace-block-header"><span class="trace-block-icon">✨</span><span>Reasoning</span></div>
        <div class="trace-block-body">
          <div class="trace-reasoning-pill">✨ Deterministic Probe</div>
          <div class="trace-reasoning-text">${escapeHtml(topic.reasoning || 'REASONING: Analyzing prompt. Selecting topic. Generating response.')}</div>
        </div>`;
    }
    traceScrollBody.appendChild(block);
    traceScrollBody.scrollTop = traceScrollBody.scrollHeight;
  }

  // ── Wire "Test Run" buttons on agent cards ────────────────────────────
  function bindTestRunButtons() {
    document.querySelectorAll('.btn-test-agent').forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = newBtn.closest('.agent-rich-card');
        const name = card?.querySelector('.agent-card-name')?.textContent?.trim() || 'Agent';
        openTestPage(name);
      });
    });
  }

  // ── Wire recent agent sidebar links ───────────────────────────────────
  document.querySelectorAll('.sec-agent-recent-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openTestPage(item.getAttribute('data-agent') || 'Agent');
    });
  });

  // ── Send button & Enter key ───────────────────────────────────────────
  if (btnTestSend && testPromptInput) {
    btnTestSend.addEventListener('click', () => sendTestMessage(testPromptInput.value));
    testPromptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendTestMessage(testPromptInput.value); }
    });
  }

  window.openTestPage = openTestPage;
  bindTestRunButtons();

  const agentsGrid = document.querySelector('.agents-rich-grid');
  if (agentsGrid) new MutationObserver(() => bindTestRunButtons()).observe(agentsGrid, { childList: true });
}

