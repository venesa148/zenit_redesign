/**
 * Zenith AI - Ghostwriter & 4-Layer Agent Studio Architecture
 * Layer 1: Global Navigation (Royal Blue Sidebar)
 * Layer 2: Secondary Navigation (Agent Studio: Agents, Tools, Runs, etc.)
 * Layer 3: Third Bar (BUILD: Ghostwriter, Journeys, Knowledge, Tools, Guardrails, Tests)
 * Layer 4: Content Viewport (Ghostwriter Chat / Journeys / Knowledge / Tools)
 *          + Simulation Rightbar Drawer on-demand
 */

document.addEventListener('DOMContentLoaded', () => {
  try {
    initGhostwriterBuildWorkspace();
  } catch (err) {
    console.error('Error initializing Ghostwriter Build Workspace:', err);
  }
});

function initGhostwriterBuildWorkspace() {
  // Elements
  const thirdBarItems = document.querySelectorAll('.third-bar-item');
  const resourcePanes = document.querySelectorAll('.resource-view-pane');
  const gwChatFeed = document.getElementById('gwChatFeed');
  const gwTextInput = document.getElementById('gwComposerTextarea') || document.getElementById('gwTextInput');
  const btnGwSend = document.getElementById('btnComposerSend') || document.getElementById('btnGwSend');
  const gwSuggestions = document.querySelectorAll('.gw-suggestion-chip');
  const btnReviewAgentPill = document.getElementById('btnReviewAgentPill');
  const btnRunSimFromReview = document.getElementById('btnRunSimFromReview');
  const btnComposerAttach = document.getElementById('btnComposerAttach');
  
  // Simulation Rightbar Elements
  const simDrawer = document.getElementById('simulationRightbarDrawer');
  const btnSimRbClose = document.getElementById('btnSimRbClose');
  const btnSimRbRunDirect = document.getElementById('btnSimRbRunDirect');
  const btnSimRunPrimary = document.getElementById('btnSimRunPrimary');
  const btnTopSimulation = document.getElementById('btnTopSimulation');
  const btnGwOpenSimulation = document.getElementById('btnGwOpenSimulation');
  const simStateConfig = document.getElementById('simStateConfig');
  const simStateRunning = document.getElementById('simStateRunning');
  const simStateCompleted = document.getElementById('simStateCompleted');
  const simProgressBar = document.getElementById('simProgressBar');
  const simProgressText = document.getElementById('simProgressText');
  const simCurrentScenario = document.getElementById('simCurrentScenario');
  const simPassedCount = document.getElementById('simPassedCount');
  const simFailedCount = document.getElementById('simFailedCount');
  const btnDiagnoseGhostwriter = document.getElementById('btnDiagnoseGhostwriter');
  const btnSimRunAgain = document.getElementById('btnSimRunAgain');
  const simScenarioRows = document.querySelectorAll('.sim-scenario-row-item');

  // ── 1. THIRD BAR NAVIGATION SWITCHER ─────────────────────────────────
  if (thirdBarItems.length > 0) {
    thirdBarItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetView = item.getAttribute('data-res-view');
        switchResourceView(targetView);
      });
    });
  }

  function switchResourceView(viewKey) {
    if (!viewKey) viewKey = 'ghostwriter';

    thirdBarItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-res-view') === viewKey);
    });

    resourcePanes.forEach(pane => {
      const isMatch = pane.id === `resView${capitalize(viewKey)}`;
      pane.classList.toggle('active', isMatch);
    });

    const crumb = document.getElementById('resourceActiveCrumb');
    if (crumb) {
      crumb.textContent = capitalize(viewKey);
    }
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ── 2. GHOSTWRITER "SATU KEPALA" CHAT CONTROLLER ─────────────────────
  if (btnGwSend && gwTextInput) {
    btnGwSend.addEventListener('click', () => {
      handleUserSend();
    });

    gwTextInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserSend();
      }
    });
  }

  if (btnComposerAttach) {
    btnComposerAttach.addEventListener('click', () => {
      showNotificationToast('Pilih dokumen pendukung (.zip, .pdf, .json) untuk Ghostwriter.');
    });
  }

  // Quick suggestion chips
  if (gwSuggestions.length > 0) {
    gwSuggestions.forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.trim();
        if (gwTextInput) {
          gwTextInput.value = text;
          handleUserSend();
        }
      });
    });
  }

  function handleUserSend() {
    if (!gwTextInput) return;
    const text = gwTextInput.value.trim();
    if (!text) return;

    // Append User Message
    appendUserMessage(text);
    gwTextInput.value = '';

    // Scroll to bottom
    scrollChatToBottom();

    // Generate Contextual AI Response
    setTimeout(() => {
      processGhostwriterResponse(text);
    }, 600);
  }

  function appendUserMessage(text) {
    if (!gwChatFeed) return;
    const msgEl = document.createElement('div');
    msgEl.className = 'gw-msg-user-bubble';
    msgEl.textContent = text;
    gwChatFeed.appendChild(msgEl);
    scrollChatToBottom();
  }

  function appendAssistantHtml(htmlContent) {
    if (!gwChatFeed) return;
    const msgEl = document.createElement('div');
    msgEl.className = 'gw-msg-system-card';
    msgEl.innerHTML = `
      <div class="gw-system-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>GHOSTWRITER</span>
      </div>
      <div class="gw-system-body">
        ${htmlContent}
      </div>
    `;
    gwChatFeed.appendChild(msgEl);
    scrollChatToBottom();
    wireGhostwriterActionButtons();
  }

  function scrollChatToBottom() {
    if (gwChatFeed) {
      gwChatFeed.scrollTop = gwChatFeed.scrollHeight;
    }
  }

  function processGhostwriterResponse(userPrompt) {
    const p = userPrompt.toLowerCase();

    if (p.includes('validasi') || p.includes('validation')) {
      const html = `
        <p class="gw-assistant-text">Saya menganalisis agent secara menyeluruh. Perubahan ini berdampak pada 3 komponen utama:</p>
        <div class="gw-impacts-card">
          <div class="gw-impact-title">I found 3 related changes:</div>
          <div class="gw-impact-item">
            <span class="gw-impact-badge journey">Journey</span>
            <span>+ Add data validation step (verifikasi status kelengkapan profil siswa)</span>
          </div>
          <div class="gw-impact-item">
            <span class="gw-impact-badge tools">Tools</span>
            <span>+ Student Profile requires validation check pre-call</span>
          </div>
          <div class="gw-impact-item">
            <span class="gw-impact-badge tests">Test Cases</span>
            <span>+ Add incomplete-data edge scenario (#28 Missing validation)</span>
          </div>
        </div>
        <div class="gw-actions-row">
          <button type="button" class="btn-gw-apply-draft" id="btnApplyValidationChanges">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Apply Changes</span>
          </button>
          <button type="button" class="btn-gw-review-diff" id="btnReviewChanges">Review Changes</button>
          <button type="button" class="btn-gw-inline-sim" id="btnSimFromChat">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>Simulation</span>
          </button>
        </div>
      `;
      appendAssistantHtml(html);
    } else if (p.includes('hidrokarbon') || p.includes('knowledge')) {
      const html = `
        <p class="gw-assistant-text">Saya telah menyiapkan dokumen kurikulum spesifik untuk materi Hidrokarbon:</p>
        <div class="gw-impacts-card">
          <div class="gw-impact-title">Knowledge Update:</div>
          <div class="gw-impact-item">
            <span class="gw-impact-badge journey">Knowledge</span>
            <span>+ <strong>Hydrocarbon Study Module.pdf</strong> (3.8 MB, 210 vector chunks)</span>
          </div>
          <div class="gw-impact-item">
            <span class="gw-impact-badge tools">Embedding</span>
            <span>+ Indexing via text-embedding-3-large</span>
          </div>
        </div>
        <div class="gw-actions-row">
          <button type="button" class="btn-gw-apply-draft" id="btnApplyKnowledgeChanges">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Apply Changes</span>
          </button>
          <button type="button" class="btn-gw-inline-sim" id="btnSimFromChat">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>Simulation</span>
          </button>
        </div>
      `;
      appendAssistantHtml(html);
    } else if (p.includes('mencari materi') || p.includes('tool')) {
      const html = `
        <p class="gw-assistant-text">Saya telah merancang definisi tool baru untuk pencarian materi belajar siswa:</p>
        <div class="gw-impacts-card">
          <div class="gw-impact-title">New Tool Definition:</div>
          <div class="gw-impact-item">
            <span class="gw-impact-badge tools">Tool</span>
            <span><code>SearchLearningMaterials(topic, grade, difficulty)</code></span>
          </div>
          <div class="gw-impact-item">
            <span class="gw-impact-badge journey">Connector</span>
            <span>+ Connected to Vector DB &amp; Syllabus Index</span>
          </div>
        </div>
        <div class="gw-actions-row">
          <button type="button" class="btn-gw-apply-draft" id="btnApplyToolChanges">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Create Tool Definition</span>
          </button>
          <button type="button" class="btn-gw-inline-sim" id="btnSimFromChat">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>Simulation</span>
          </button>
        </div>
      `;
      appendAssistantHtml(html);
    } else if (p.includes('benar') || p.includes('menurutmu') || p.includes('review')) {
      const html = `
        <p class="gw-assistant-text">Saya telah menganalisis kondisi konfigurasi spesifikasi terkini pada agent:</p>
        <div class="gw-impacts-card">
          <div class="gw-impact-title">Specification Check Report:</div>
          <div class="gw-impact-item">
            <span class="gw-impact-badge journey">Journey</span>
            <span>Alur validasi data aktif dan sesuai sebelum proses evaluasi kompetensi.</span>
          </div>
          <div class="gw-impact-item">
            <span class="gw-impact-badge tools">Coverage</span>
            <span>Semua tool terhubung dan memiliki fallback guardrail.</span>
          </div>
        </div>
        <p class="gw-assistant-text" style="margin-top: 6px;">Kondisi draft siap diverifikasi melalui Simulation Suite untuk memastikan tingkat kelulusan skenario.</p>
        <div class="gw-actions-row">
          <button type="button" class="btn-gw-apply-draft" id="btnSimFromChat">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>Buka Simulation Suite</span>
          </button>
        </div>
      `;
      appendAssistantHtml(html);
    } else if (p.includes('simulasi') || p.includes('simulation')) {
      openSimulationDrawer();
      const html = `
        <p class="gw-assistant-text">Simulation Rightbar telah dibuka. Anda dapat menjalankan 100 skenario pengujian.</p>
      `;
      appendAssistantHtml(html);
    } else {
      const html = `
        <p class="gw-assistant-text">Saya siap membantu mengonfigurasi agent <strong>Student Learning Advisor</strong>. Saya dapat:</p>
        <ul style="margin: 0.35rem 0 0.85rem 1.25rem; padding: 0; font-size: 0.875rem; line-height: 1.6; color: #334155;">
          <li>Membuat Journey dan alur bimbingan siswa</li>
          <li>Menyarankan &amp; menghubungkan Tools (REST/Vector DB)</li>
          <li>Mengelola dokumen kurikulum di Knowledge Base</li>
          <li>Menjalankan Simulation 100 skenario dan mendiagnosis kegagalan</li>
        </ul>
        <div class="gw-actions-row">
          <button type="button" class="btn-gw-apply-draft" id="btnSimFromChat">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>Simulation</span>
          </button>
        </div>
      `;
      appendAssistantHtml(html);
    }
  }

  // Wire action buttons inside dynamically created Ghostwriter cards
  function wireGhostwriterActionButtons() {
    const btnVal = document.getElementById('btnApplyValidationChanges');
    if (btnVal) {
      btnVal.addEventListener('click', () => {
        showNotificationToast('Perubahan berhasil diterapkan ke Draft Journey & Tools.');
        btnVal.innerHTML = 'Applied';
        btnVal.style.backgroundColor = '#16a34a';
        btnVal.disabled = true;
      });
    }

    const btnKnow = document.getElementById('btnApplyKnowledgeChanges');
    if (btnKnow) {
      btnKnow.addEventListener('click', () => {
        switchResourceView('knowledge');
        showNotificationToast('Dokumen "Hydrocarbon Study Module.pdf" berhasil ditambahkan ke Knowledge Base.');
        btnKnow.innerHTML = 'Applied';
        btnKnow.style.backgroundColor = '#16a34a';
        btnKnow.disabled = true;
      });
    }

    const btnTool = document.getElementById('btnApplyToolChanges');
    if (btnTool) {
      btnTool.addEventListener('click', () => {
        switchResourceView('tools');
        showNotificationToast('Tool "Search Learning Materials" berhasil dikonfigurasi & terhubung.');
        btnTool.innerHTML = 'Connected';
        btnTool.style.backgroundColor = '#16a34a';
        btnTool.disabled = true;
      });
    }

    document.querySelectorAll('#btnSimFromChat').forEach(btn => {
      btn.addEventListener('click', () => {
        openSimulationDrawer();
      });
    });

    const btnRev = document.getElementById('btnReviewChanges');
    if (btnRev) {
      btnRev.addEventListener('click', () => {
        showNotificationToast('Menampilkan preview diff pada Journey dan Test Cases.');
      });
    }
  }

  // Review agent pill button (Screenshot 1 top right)
  if (btnReviewAgentPill) {
    btnReviewAgentPill.addEventListener('click', () => {
      const html = `
        <div class="gw-assistant-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span>Ghostwriter Review</span>
        </div>
        <p class="gw-assistant-text"><strong>Architectural Review for Student Learning Advisor:</strong></p>
        <div class="gw-impacts-card">
          <div class="gw-impact-item">
            <span class="gw-impact-badge journey">Readiness</span>
            <span>Score: <strong>94/100</strong> (Ready for Simulation)</span>
          </div>
          <div class="gw-impact-item">
            <span class="gw-impact-badge tools">Guardrails</span>
            <span>Validasi data aktif · Anti-hallucination guardrail aktif</span>
          </div>
          <div class="gw-impact-item">
            <span class="gw-impact-badge tests">Coverage</span>
            <span>100 test scenarios configured across 7 categories</span>
          </div>
        </div>
        <div class="gw-actions-row">
          <button type="button" class="btn-gw-apply-draft" id="btnSimFromChat">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>Jalankan Simulation Suite</span>
          </button>
        </div>
      `;
      appendAssistantHtml(html);
    });
  }

  // ── 3. SIMULATION RIGHTBAR DRAWER CONTROLLER ─────────────────────────
  const simTestcasesPanel = document.getElementById('simTestcasesPanel');
  const btnSimViewResults = document.getElementById('btnSimViewResults');
  const btnSimViewFailures = document.getElementById('btnSimViewFailures');

  if (btnRunSimFromReview) {
    btnRunSimFromReview.addEventListener('click', () => {
      openSimulationDrawer();
      resetSimulationTestcases();
    });
  }

  if (btnTopSimulation) {
    btnTopSimulation.addEventListener('click', () => {
      openSimulationDrawer();
      resetSimulationTestcases();
    });
  }

  if (btnGwOpenSimulation) {
    btnGwOpenSimulation.addEventListener('click', () => {
      openSimulationDrawer();
      resetSimulationTestcases();
    });
  }

  if (btnSimRbClose) {
    btnSimRbClose.addEventListener('click', () => {
      closeSimulationDrawer();
    });
  }

  function openSimulationDrawer() {
    if (simDrawer) {
      simDrawer.classList.add('open');
    }
  }

  function closeSimulationDrawer() {
    if (simDrawer) {
      simDrawer.classList.remove('open');
    }
  }

  // Reset all testcase indicators to un-checked dashed circle
  function resetSimulationTestcases() {
    for (let i = 0; i < 8; i++) {
      const ind = document.getElementById(`simCaseInd_${i}`);
      if (ind) {
        ind.className = 'sim-case-indicator';
        ind.innerHTML = '';
      }
    }
    if (btnSimRbRunDirect) {
      btnSimRbRunDirect.classList.remove('running');
      btnSimRbRunDirect.disabled = false;
    }
    if (btnSimRunPrimary) {
      btnSimRunPrimary.disabled = false;
      const text = document.getElementById('btnSimRunPrimaryText');
      if (text) text.textContent = 'Run All Simulations';
    }
    if (simStateCompleted) {
      simStateCompleted.style.display = 'none';
    }
  }

  // Run Simulation triggers
  if (btnSimRbRunDirect) {
    btnSimRbRunDirect.addEventListener('click', () => {
      startSequentialSimulation();
    });
  }

  if (btnSimRunPrimary) {
    btnSimRunPrimary.addEventListener('click', () => {
      startSequentialSimulation();
    });
  }

  if (btnSimRunAgain) {
    btnSimRunAgain.addEventListener('click', () => {
      resetSimulationTestcases();
      const simRbBody = document.getElementById('simRbBody');
      if (simRbBody) simRbBody.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (btnSimViewResults) {
    btnSimViewResults.addEventListener('click', () => {
      showNotificationToast('91 of 100 test cases passed with valid guardrails and verified schema.');
    });
  }

  if (btnSimViewFailures) {
    btnSimViewFailures.addEventListener('click', () => {
      showNotificationToast('Menampilkan 9 skenario gagal (kasus #12, #28, #45, #58).');
    });
  }

  // Global event delegation for any "Jalankan Simulation Suite" button
  document.addEventListener('click', (e) => {
    const simTrigger = e.target.closest('#btnRunSimFromReview, #btnSimFromChat, .btn-run-sim-suite, [data-action="open-simulation"]');
    if (simTrigger) {
      e.preventDefault();
      openSimulationDrawer();
      resetSimulationTestcases();
    }
  });

  // Enable clicking individual testcase rows
  const allCaseRows = document.querySelectorAll('.sim-case-row');
  allCaseRows.forEach((row, idx) => {
    row.addEventListener('click', () => {
      if (isSimRunning) return;
      const ind = document.getElementById(`simCaseInd_${idx}`);
      if (!ind) return;
      if (ind.classList.contains('success')) {
        ind.className = 'sim-case-indicator';
        ind.innerHTML = '';
      } else {
        ind.className = 'sim-case-indicator running';
        ind.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>`;
        setTimeout(() => {
          ind.className = 'sim-case-indicator success';
          ind.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>`;
        }, 400);
      }
    });
  });

  let isSimRunning = false;

  function startSequentialSimulation() {
    if (isSimRunning) return;
    isSimRunning = true;

    // Reset view first
    resetSimulationTestcases();

    // Set header play button & bottom button to running state
    if (btnSimRbRunDirect) {
      btnSimRbRunDirect.classList.add('running');
      btnSimRbRunDirect.disabled = true;
    }
    if (btnSimRunPrimary) {
      btnSimRunPrimary.disabled = true;
      const text = document.getElementById('btnSimRunPrimaryText');
      if (text) text.textContent = 'Running simulations...';
    }

    const totalCases = 8;
    const spinnerSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
    `;

    const checkSvg = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    // 1. Immediately put all test cases into spinning rays (matching Image 2)
    for (let i = 0; i < totalCases; i++) {
      const ind = document.getElementById(`simCaseInd_${i}`);
      if (ind) {
        ind.className = 'sim-case-indicator running';
        ind.innerHTML = spinnerSvg;
      }
    }

    // 2. Sequentially turn each case into a solid green checkmark one by one ("bergulir")
    let currentCase = 0;
    const stepDuration = 320; // ms per checkmark roll

    function resolveNextCase() {
      if (currentCase >= totalCases) {
        // All test cases are now checked green!
        isSimRunning = false;
        if (btnSimRbRunDirect) {
          btnSimRbRunDirect.classList.remove('running');
          btnSimRbRunDirect.disabled = false;
        }
        if (btnSimRunPrimary) {
          btnSimRunPrimary.disabled = false;
          const text = document.getElementById('btnSimRunPrimaryText');
          if (text) text.textContent = 'All Simulations Complete';
        }

        // Smoothly reveal the evaluation result card below the completed cases
        setTimeout(() => {
          if (simStateCompleted) {
            simStateCompleted.style.display = 'flex';
            simStateCompleted.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 300);
        return;
      }

      const ind = document.getElementById(`simCaseInd_${currentCase}`);
      if (ind) {
        ind.className = 'sim-case-indicator success';
        ind.innerHTML = checkSvg;
      }

      currentCase++;
      setTimeout(resolveNextCase, stepDuration);
    }

    // Start rolling after initial 300ms
    setTimeout(resolveNextCase, 350);
  }

  // Diagnose with Ghostwriter
  if (btnDiagnoseGhostwriter) {
    btnDiagnoseGhostwriter.addEventListener('click', () => {
      // Close simulation drawer
      closeSimulationDrawer();

      // Switch to Ghostwriter tab in content pane
      switchResourceView('ghostwriter');

      // Post diagnostic failure analysis in Ghostwriter chat
      const html = `
        <div class="gw-assistant-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span>Simulation Failure Diagnosis</span>
        </div>
        <p class="gw-assistant-text">Saya telah menganalisis <strong>9 kegagalan simulasi</strong> dari 100 skenario:</p>
        <div class="gw-impacts-card">
          <div class="gw-impact-title">Diagnosis Penyebab Utama:</div>
          <div class="gw-impact-item">
            <span class="gw-impact-badge tests">#28 Missing Validation</span>
            <span>Siswa tanpa data prasyarat langsung dialihkan ke materi lanjutan tanpa pre-test.</span>
          </div>
          <div class="gw-impact-item">
            <span class="gw-impact-badge journey">#12 Wrong Recommendation</span>
            <span>Format skor kompetensi di bawah 60 belum memicu fallback modul dasar.</span>
          </div>
        </div>
        <p class="gw-assistant-text" style="margin-top: 6px;">
          <strong>Usulan Perbaikan Otomatis:</strong><br>
          1. Tambahkan pengecekan nilai prasyarat pada langkah Journey <code>Validate Data</code>.<br>
          2. Tetapkan fallback tool <code>SearchLearningMaterials</code> ke modul Remedial jika skor &lt; 60.
        </p>
        <div class="gw-actions-row">
          <button type="button" class="btn-gw-apply-draft" id="btnApplyDiagnosticFix">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Apply Fixes to Draft</span>
          </button>
        </div>
      `;
      appendAssistantHtml(html);

      // Wire apply fix button
      setTimeout(() => {
        const btnFix = document.getElementById('btnApplyDiagnosticFix');
        if (btnFix) {
          btnFix.addEventListener('click', () => {
            showNotificationToast('Perbaikan diterapkan! Guardrail fallback dan validasi prasyarat berhasil diperbarui.');
            btnFix.innerHTML = 'Fixes Applied';
            btnFix.style.backgroundColor = '#16a34a';
            btnFix.disabled = true;
          });
        }
      }, 100);
    });
  }

  // ── 4. INTEGRATION HOOK WITH openTestPage ────────────────────────────
  const origOpenTestPage = window.openTestPage;
  window.openTestPage = function (agentName, status = 'ACTIVE') {
    if (typeof origOpenTestPage === 'function') {
      try { origOpenTestPage(agentName, status); } catch (e) {}
    }

    const testAgentNameEl = document.getElementById('testAgentName');
    const gwActiveAgentName = document.getElementById('gwActiveAgentName');
    const journeyTitle = document.getElementById('journeyTitle');

    const name = agentName || 'Student Learning Advisor';
    if (testAgentNameEl) testAgentNameEl.textContent = name.toUpperCase();
    if (gwActiveAgentName) gwActiveAgentName.textContent = name;
    if (journeyTitle) journeyTitle.textContent = `${name} Journey`;

    const paneTest = document.getElementById('pane-test-agent');
    if (paneTest) {
      document.querySelectorAll('.studio-pane-section').forEach(p => p.classList.remove('active'));
      paneTest.classList.add('active');
    }
  };

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function showNotificationToast(msg) {
    let toast = document.getElementById('gwGlobalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'gwGlobalToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #0f172a;
        color: #ffffff;
        padding: 10px 20px;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 600;
        box-shadow: 0 4px 16px rgba(0,0,0,0.25);
        z-index: 9999;
        opacity: 0;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
        display: flex;
        align-items: center;
        gap: 8px;
      `;
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${escapeHtml(msg)}</span>
    `;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2800);
  }
}
