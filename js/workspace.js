/**
 * Zenith AI - Multi-level Workspace Interactions & Live Beauty Preview
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabsSwitchers();
  initChatPromptActions();
  initLivePreviewActions();
  initAgentPopover();
  initBeautyStoreInteractions();
});

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
