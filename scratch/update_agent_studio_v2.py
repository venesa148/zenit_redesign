import re

html_path = r"d:\intern\zenit_redesign\agent-studio.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update top bar right to include Simulation button if not present
if 'id="btnTopSimulation"' not in content:
    target_topbar_right = '<div class="agent-design-topbar-right">'
    sim_button_top = '''<div class="agent-design-topbar-right">
              <button type="button" class="btn-design-action-ghost" id="btnTopSimulation" title="Open Simulation Suite">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <span>Simulation</span>
              </button>'''
    content = content.replace(target_topbar_right, sim_button_top, 1)
    print("Added Simulation button to topbar")

# 2. Find start of agent-build-workspace-layout and end before </section> of pane-test-agent
start_marker = '<div class="agent-build-workspace-layout" id="agentBuildWorkspaceLayout">'
end_marker = '</section>\n\n        <!-- ========================================\n             PANE 2: WORKFLOWS'

start_pos = content.find(start_marker)
end_pos = content.find(end_marker)

if start_pos == -1 or end_pos == -1:
    print(f"Error finding markers: start_pos={start_pos}, end_pos={end_pos}")
    exit(1)

new_layout = '''<div class="agent-build-workspace-layout" id="agentBuildWorkspaceLayout">
            <!-- ── LEVEL 3: THIRD BAR (BUILD / CONFIGURE) ── -->
            <aside class="agent-third-bar" id="agentThirdBar" aria-label="Build Navigation">
              <div class="third-bar-header">
                <span class="third-bar-overline">BUILD</span>
                <h2 class="third-bar-title">Configure</h2>
              </div>
              <div class="third-bar-nav-list" id="thirdBarNavList">
                <!-- Ghostwriter tab is placed ABOVE Journeys -->
                <button type="button" class="third-bar-item active" data-res-view="ghostwriter" id="thirdBarItemGhostwriter" title="Ghostwriter Specification Chat">
                  <span class="third-bar-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      <circle cx="9" cy="10" r="1"></circle>
                      <circle cx="15" cy="10" r="1"></circle>
                    </svg>
                  </span>
                  <span class="third-bar-item-text">Ghostwriter</span>
                </button>

                <button type="button" class="third-bar-item" data-res-view="journeys" id="thirdBarItemJourneys" title="Configure Journeys">
                  <span class="third-bar-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </span>
                  <span class="third-bar-item-text">Journeys</span>
                </button>

                <button type="button" class="third-bar-item" data-res-view="knowledge" id="thirdBarItemKnowledge" title="Configure Knowledge">
                  <span class="third-bar-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                  </span>
                  <span class="third-bar-item-text">Knowledge</span>
                  <span class="third-bar-badge-count">3</span>
                </button>

                <button type="button" class="third-bar-item" data-res-view="tools" id="thirdBarItemTools" title="Configure Tools">
                  <span class="third-bar-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                  </span>
                  <span class="third-bar-item-text">Tools</span>
                  <span class="third-bar-badge-count">4</span>
                </button>

                <button type="button" class="third-bar-item" data-res-view="guardrails" id="thirdBarItemGuardrails" title="Configure Guardrails">
                  <span class="third-bar-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </span>
                  <span class="third-bar-item-text">Guardrails</span>
                </button>

                <button type="button" class="third-bar-item" data-res-view="testcases" id="thirdBarItemTestCases" title="Configure Test Cases">
                  <span class="third-bar-item-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M10 2v7.31"></path>
                      <path d="M14 9.3V2"></path>
                      <path d="M8.5 2h7"></path>
                      <path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path>
                      <path d="M5.52 16h12.96"></path>
                    </svg>
                  </span>
                  <span class="third-bar-item-text">Test Cases</span>
                  <span class="third-bar-badge-count">100</span>
                </button>
              </div>
            </aside>

            <!-- ── LEVEL 4: MAIN CONTENT VIEWPORT (GHOSTWRITER / JOURNEYS / KNOWLEDGE / TOOLS) ── -->
            <div class="agent-workspace-flex">
              <main class="agent-resource-viewport" id="agentResourceViewport" aria-label="Agent Content Viewport">
                <!-- Top subbar matching Screenshot 3 -->
                <div class="resource-top-bar">
                  <div class="resource-breadcrumb">
                    <span id="resourceActiveCrumb">Ghostwriter</span>
                    <span>/</span>
                    <span class="resource-crumb-active" id="gwActiveAgentName">Student Learning Advisor</span>
                  </div>
                  <div class="resource-top-actions">
                    <button type="button" class="btn-publish-outline" id="btnResPublish">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                      </svg>
                      <span>Publish</span>
                    </button>
                  </div>
                </div>

                <!-- VIEW 1: GHOSTWRITER (MAIN CONTENT PANE - HIERARCHY MATCHES JOURNEYS, TOOLS, KNOWLEDGE) -->
                <div class="resource-view-pane active" id="resViewGhostwriter">
                  <div class="gw-content-container">
                    <div class="gw-content-header">
                      <div class="gw-content-header-left">
                        <svg class="gw-content-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          <circle cx="9" cy="10" r="1"></circle>
                          <circle cx="15" cy="10" r="1"></circle>
                        </svg>
                        <h2 class="gw-content-title">Ghostwriter</h2>
                      </div>
                      <div class="gw-content-header-right">
                        <button type="button" class="btn-review-agent-pill" id="btnReviewAgentPill" title="Review agent specification">
                          Review agent
                        </button>
                      </div>
                    </div>

                    <!-- Ghostwriter Feed -->
                    <div class="gw-feed-stream" id="gwChatFeed">
                      <!-- Assistant Builder Card matching Screenshot 1 -->
                      <div class="gw-agent-build-card">
                        <div class="gw-prompt-banner">
                          Create a student learning advisor agent to recommend personalized materials
                        </div>

                        <div class="gw-progress-bars">
                          <div class="gw-skeleton-bar"></div>
                          <div class="gw-skeleton-bar short"></div>
                        </div>

                        <div class="gw-generation-meta">
                          <span>Using</span>
                          <span class="gw-generation-tag">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                            Journey generation
                          </span>,
                          <span class="gw-generation-tag">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                            Tool generation
                          </span>, and
                          <span class="gw-generation-tag">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            Integration generation...
                          </span>
                        </div>

                        <div class="gw-status-sentence">
                          The agent is built. I'm running the Composer validation/deploy step so...
                        </div>

                        <!-- Stepper Checklist with vertical connecting line matching Screenshot 1 -->
                        <div class="gw-stepper-list">
                          <div class="gw-stepper-line"></div>

                          <div class="gw-stepper-item">
                            <div class="gw-step-icon done">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div class="gw-step-text">
                              Updating agent · <span class="gw-step-link" onclick="document.getElementById('thirdBarItemJourneys').click()">View changes</span>
                            </div>
                          </div>

                          <div class="gw-stepper-item">
                            <div class="gw-step-icon done">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div class="gw-step-text">Researching</div>
                          </div>

                          <div class="gw-stepper-item">
                            <div class="gw-step-icon done">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div class="gw-step-text">Creating tests</div>
                          </div>

                          <div class="gw-stepper-item">
                            <div class="gw-step-icon done">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div class="gw-step-text">Running tests</div>
                          </div>
                        </div>
                      </div>

                      <!-- User Turn 1 -->
                      <div class="gw-msg-user">
                        Tambahkan langkah validasi data.
                      </div>

                      <!-- Assistant Turn 1 ("Satu Kepala" Multi-Impact) -->
                      <div class="gw-msg-assistant">
                        <div class="gw-assistant-header">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                          <span>Ghostwriter</span>
                        </div>
                        <div class="gw-assistant-body">
                          <p class="gw-assistant-text">Saya menganalisis keseluruhan agent. Perubahan ini berdampak pada 3 bagian konfigurasi:</p>
                          
                          <div class="gw-impacts-card">
                            <div class="gw-impact-title">I found 3 related changes:</div>
                            <div class="gw-impact-item">
                              <span class="gw-impact-badge journey">Journey</span>
                              <span>+ Add data validation step (verifikasi kelengkapan profil siswa)</span>
                            </div>
                            <div class="gw-impact-item">
                              <span class="gw-impact-badge tools">Tools</span>
                              <span>+ Student Profile requires validation check</span>
                            </div>
                            <div class="gw-impact-item">
                              <span class="gw-impact-badge tests">Test Cases</span>
                              <span>+ Add incomplete-data scenario (#28 Missing validation)</span>
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
                        </div>
                      </div>
                    </div>

                    <!-- Quick Suggestions (no emojis) -->
                    <div class="gw-quick-suggestions">
                      <button type="button" class="gw-suggestion-chip">Tambahkan langkah validasi data.</button>
                      <button type="button" class="gw-suggestion-chip">Tambahkan knowledge tentang hidrokarbon.</button>
                      <button type="button" class="gw-suggestion-chip">Tambahkan tool untuk mencari materi.</button>
                      <button type="button" class="gw-suggestion-chip">Menurutmu perubahan ini sudah benar?</button>
                      <button type="button" class="gw-suggestion-chip">Jalankan simulation 100 test cases.</button>
                    </div>

                    <!-- Bottom Input Area matching Screenshot 1 -->
                    <div class="gw-input-wrapper">
                      <input type="text" class="gw-text-input" id="gwTextInput" placeholder="What can I help you with?" autocomplete="off" />
                      <button type="button" class="btn-gw-send-arrow" id="btnGwSend" title="Send message to Ghostwriter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="12" y1="19" x2="12" y2="5"></line>
                          <polyline points="5 12 12 5 19 12"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- VIEW 2: JOURNEYS (matching Screenshot 3, Visual Journey Flow removed per request) -->
                <div class="resource-view-pane" id="resViewJourneys">
                  <div class="journey-header-card">
                    <h2 class="journey-main-title" id="journeyTitle">Student Learning Recommendation</h2>
                    
                    <div class="journey-field-group">
                      <span class="journey-field-label">Description</span>
                      <p class="journey-field-text">The agent analyzes student competencies, validates prerequisite test data, and recommends targeted study materials.</p>
                    </div>

                    <div class="journey-field-group">
                      <span class="journey-field-label">Criteria</span>
                      <p class="journey-field-text">Help the student identify skill gaps and provide personalized study modules with verified prerequisites.</p>
                    </div>

                    <!-- GUIDANCE SECTION (matching Screenshot 3 with clean SVG inline pills) -->
                    <div class="journey-field-group" style="margin-top: 2rem;">
                      <span class="journey-field-label">Guidance</span>
                      <ol class="journey-guidance-list">
                        <li class="journey-guidance-item">
                          Greet the student empathetically and ask about the topic or subject they want to master.
                        </li>
                        <li class="journey-guidance-item">
                          Authenticate the user with <span class="pill-tag-inline"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg> UserAuthentication</span>.
                        </li>
                        <li class="journey-guidance-item">
                          Retrieve profile and past test history using <span class="pill-tag-inline tool"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg> GetStudentProfile</span>.
                        </li>
                        <li class="journey-guidance-item">
                          Validate student prerequisite data with <span class="pill-tag-inline guardrail"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> ValidateData</span>.
                        </li>
                        <li class="journey-guidance-item">
                          Analyze competency score and diagnose specific concept misunderstandings.
                        </li>
                        <li class="journey-guidance-item">
                          Find tailored learning materials using <span class="pill-tag-inline tool"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg> SearchLearningMaterials</span>.
                        </li>
                        <li class="journey-guidance-item">
                          Confirm with student that the recommended pace suits their timeline and schedule practice quiz.
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>

                <!-- VIEW 3: KNOWLEDGE (User Prompt Section 8) -->
                <div class="resource-view-pane" id="resViewKnowledge">
                  <div class="journey-header-card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                      <div>
                        <h2 class="journey-main-title" style="margin-bottom: 0.35rem;">Learning Materials</h2>
                        <p class="journey-field-text" style="color: #64748b;">Domain curriculums, syllabi, and reference documents vectorized for this agent.</p>
                      </div>
                      <button type="button" class="btn-create-agent-blue" style="padding: 0.5rem 1rem; font-size: 0.825rem;" onclick="alert('Buka dialog unggah dokumen PDF / URL kurikulum baru')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span>+ Add Knowledge</span>
                      </button>
                    </div>

                    <div class="resource-cards-list">
                      <!-- Chemistry Curriculum.pdf -->
                      <div class="resource-card-item">
                        <div class="resource-card-left">
                          <div class="resource-card-icon pdf">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          </div>
                          <div>
                            <h4 class="resource-card-title">Chemistry Curriculum.pdf</h4>
                            <div class="resource-card-meta">
                              <span class="badge-indexed">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <span>Indexed</span>
                              </span>
                              <span>2.4 MB</span>
                              <span>142 chunks</span>
                              <span>Updated today</span>
                            </div>
                          </div>
                        </div>
                        <button type="button" class="btn-publish-outline" style="font-size: 0.78rem; padding: 4px 10px;">Inspect Chunks</button>
                      </div>

                      <!-- Competency Guide.pdf -->
                      <div class="resource-card-item">
                        <div class="resource-card-left">
                          <div class="resource-card-icon pdf">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          </div>
                          <div>
                            <h4 class="resource-card-title">Competency Guide.pdf</h4>
                            <div class="resource-card-meta">
                              <span class="badge-indexed">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <span>Indexed</span>
                              </span>
                              <span>1.1 MB</span>
                              <span>86 chunks</span>
                              <span>Updated 2 days ago</span>
                            </div>
                          </div>
                        </div>
                        <button type="button" class="btn-publish-outline" style="font-size: 0.78rem; padding: 4px 10px;">Inspect Chunks</button>
                      </div>

                      <!-- Hydrocarbon Study Module.pdf -->
                      <div class="resource-card-item">
                        <div class="resource-card-left">
                          <div class="resource-card-icon pdf">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          </div>
                          <div>
                            <h4 class="resource-card-title">Hydrocarbon Study Module.pdf</h4>
                            <div class="resource-card-meta">
                              <span class="badge-indexed">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <span>Indexed</span>
                              </span>
                              <span>3.8 MB</span>
                              <span>210 chunks</span>
                              <span>Added via Ghostwriter</span>
                            </div>
                          </div>
                        </div>
                        <button type="button" class="btn-publish-outline" style="font-size: 0.78rem; padding: 4px 10px;">Inspect Chunks</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- VIEW 4: TOOLS (User Prompt Section 9) -->
                <div class="resource-view-pane" id="resViewTools">
                  <div class="journey-header-card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                      <div>
                        <h2 class="journey-main-title" style="margin-bottom: 0.35rem;">Agent Tools &amp; Connectors</h2>
                        <p class="journey-field-text" style="color: #64748b;">Executable function calling APIs and database connectors bound to this agent.</p>
                      </div>
                      <button type="button" class="btn-create-agent-blue" style="padding: 0.5rem 1rem; font-size: 0.825rem;" onclick="alert('Buka wizard pembuatan definisi Tool baru')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <span>+ Add Tool</span>
                      </button>
                    </div>

                    <div class="resource-cards-list">
                      <div class="resource-card-item">
                        <div class="resource-card-left">
                          <div class="resource-card-icon tool">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                          </div>
                          <div>
                            <h4 class="resource-card-title">Get Student Profile</h4>
                            <div class="resource-card-meta">
                              <span class="badge-connected">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <span>Connected</span>
                              </span>
                              <span>REST API</span>
                              <code>GET /api/v1/students/{id}</code>
                            </div>
                          </div>
                        </div>
                        <button type="button" class="btn-publish-outline" style="font-size: 0.78rem; padding: 4px 10px;">Test Tool</button>
                      </div>

                      <div class="resource-card-item">
                        <div class="resource-card-left">
                          <div class="resource-card-icon tool">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                          </div>
                          <div>
                            <h4 class="resource-card-title">Get Learning History</h4>
                            <div class="resource-card-meta">
                              <span class="badge-connected">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <span>Connected</span>
                              </span>
                              <span>PostgreSQL</span>
                              <code>SELECT * FROM learning_records</code>
                            </div>
                          </div>
                        </div>
                        <button type="button" class="btn-publish-outline" style="font-size: 0.78rem; padding: 4px 10px;">Test Tool</button>
                      </div>

                      <div class="resource-card-item">
                        <div class="resource-card-left">
                          <div class="resource-card-icon tool">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                          </div>
                          <div>
                            <h4 class="resource-card-title">Search Learning Materials</h4>
                            <div class="resource-card-meta">
                              <span class="badge-connected">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <span>Connected</span>
                              </span>
                              <span>Vector RAG</span>
                              <code>Milvus / PGVector similarity</code>
                            </div>
                          </div>
                        </div>
                        <button type="button" class="btn-publish-outline" style="font-size: 0.78rem; padding: 4px 10px;">Test Tool</button>
                      </div>

                      <div class="resource-card-item">
                        <div class="resource-card-left">
                          <div class="resource-card-icon tool">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                          </div>
                          <div>
                            <h4 class="resource-card-title">Validate Student Data</h4>
                            <div class="resource-card-meta">
                              <span class="badge-connected">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <span>Connected</span>
                              </span>
                              <span>Logic Validator</span>
                              <code>Pre-check rule: completeness &gt; 90%</code>
                            </div>
                          </div>
                        </div>
                        <button type="button" class="btn-publish-outline" style="font-size: 0.78rem; padding: 4px 10px;">Test Tool</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- VIEW 5: GUARDRAILS -->
                <div class="resource-view-pane" id="resViewGuardrails">
                  <div class="journey-header-card">
                    <h2 class="journey-main-title">Guardrails &amp; Safety Checks</h2>
                    <p class="journey-field-text" style="color: #64748b; margin-bottom: 1.5rem;">Policy rules preventing hallucinations, prompt injections, and invalid outputs.</p>

                    <div class="resource-cards-list">
                      <div class="resource-card-item">
                        <div class="resource-card-left">
                          <div class="resource-card-icon" style="background: #fef3c7; color: #b45309;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                          </div>
                          <div>
                            <h4 class="resource-card-title">Anti-Hallucination &amp; Grounding Check</h4>
                            <div class="resource-card-meta">
                              <span class="badge-indexed">Active</span>
                              <span>Enforces responses strictly reference indexed learning materials</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="resource-card-item">
                        <div class="resource-card-left">
                          <div class="resource-card-icon" style="background: #fef3c7; color: #b45309;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                          </div>
                          <div>
                            <h4 class="resource-card-title">Prerequisite Data Completeness</h4>
                            <div class="resource-card-meta">
                              <span class="badge-indexed">Active</span>
                              <span>Rejects recommendation if diagnostic score data is missing</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- VIEW 6: TEST CASES -->
                <div class="resource-view-pane" id="resViewTestcases">
                  <div class="journey-header-card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                      <div>
                        <h2 class="journey-main-title" style="margin-bottom: 0.35rem;">Simulation Test Cases</h2>
                        <p class="journey-field-text" style="color: #64748b;">100 automated test scenarios prepared for simulation execution.</p>
                      </div>
                      <button type="button" class="btn-create-agent-blue" style="padding: 0.5rem 1rem; font-size: 0.825rem;" onclick="document.getElementById('btnTopSimulation').click()">
                        <span>Open Simulation Suite</span>
                      </button>
                    </div>

                    <div class="resource-cards-list">
                      <div class="resource-card-item">
                        <div class="resource-card-left">
                          <div class="resource-card-icon" style="background: #eff6ff; color: #2563eb;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.31"></path><path d="M14 9.3V2"></path><path d="M8.5 2h7"></path><path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path><path d="M5.52 16h12.96"></path></svg>
                          </div>
                          <div>
                            <h4 class="resource-card-title">Curriculum Edge Cases Suite (100 Scenarios)</h4>
                            <div class="resource-card-meta">
                              <span class="badge-indexed">Ready</span>
                              <span>Evaluator: Default (LLM-as-Judge &amp; Rule Evaluator)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              <!-- ── SIMULATION RIGHTBAR DRAWER (ON DEMAND, NOT PARALLEL WITH GHOSTWRITER) ── -->
              <aside class="simulation-rightbar-drawer" id="simulationRightbarDrawer" aria-label="Simulation Suite">
                <!-- Simulation Header matching Screenshot 2 -->
                <div class="sim-rb-header">
                  <div class="sim-rb-header-left">
                    <span class="sim-badge-header-pill">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M7 8h10"></path><path d="M7 12h10"></path><path d="M7 16h10"></path></svg>
                      <span>Simulations</span>
                    </span>
                  </div>

                  <div class="sim-rb-header-actions">
                    <button type="button" class="btn-sim-rb-action" id="btnSimRbRunDirect" title="Run Simulation">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                    </button>
                    <button type="button" class="btn-sim-rb-action" id="btnSimRbMore" title="Options">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                    </button>
                    <button type="button" class="btn-sim-rb-close" id="btnSimRbClose" title="Close Simulation Drawer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                </div>

                <!-- Simulation Body -->
                <div class="sim-rb-body" id="simRbBody">
                  <!-- STATE 1: CONFIGURATION (User Prompt Section 11 & Screenshot 2) -->
                  <div class="sim-state-config" id="simStateConfig">
                    <div class="sim-config-section-title">Select Scenario</div>
                    
                    <!-- Scenario list matching Screenshot 2 with circular indicators -->
                    <div class="sim-scenarios-list-box">
                      <div class="sim-scenario-row-item selected">
                        <span class="sim-scenario-name">Learning Recommendation Flow</span>
                        <span class="sim-scenario-indicator"></span>
                      </div>
                      <div class="sim-scenario-row-item">
                        <span class="sim-scenario-name">Account authentication flow</span>
                        <span class="sim-scenario-indicator"></span>
                      </div>
                      <div class="sim-scenario-row-item">
                        <span class="sim-scenario-name">Lost or stolen card report</span>
                        <span class="sim-scenario-indicator"></span>
                      </div>
                      <div class="sim-scenario-row-item">
                        <span class="sim-scenario-name">Phishing/scam reporting</span>
                        <span class="sim-scenario-indicator"></span>
                      </div>
                      <div class="sim-scenario-row-item">
                        <span class="sim-scenario-name">Balance and transaction history requests</span>
                        <span class="sim-scenario-indicator"></span>
                      </div>
                      <div class="sim-scenario-row-item">
                        <span class="sim-scenario-name">Transfer funds between accounts</span>
                        <span class="sim-scenario-indicator"></span>
                      </div>
                      <div class="sim-scenario-row-item">
                        <span class="sim-scenario-name">Bill payment or auto-pay setup</span>
                        <span class="sim-scenario-indicator"></span>
                      </div>
                    </div>

                    <!-- Configuration inputs -->
                    <div class="sim-form-group">
                      <label class="sim-form-label" for="simTestCasesInput">Test Cases</label>
                      <input type="number" class="sim-form-input" id="simTestCasesInput" value="100" min="10" max="500" />
                    </div>

                    <div class="sim-form-group">
                      <label class="sim-form-label" for="simEvaluatorSelect">Evaluator</label>
                      <select class="sim-form-select" id="simEvaluatorSelect">
                        <option value="default" selected>Default (LLM-as-Judge &amp; Rule Evaluator)</option>
                        <option value="strict">Strict Guardrail &amp; Deterministic Test</option>
                        <option value="full">Full Reasoning &amp; Semantic Coverage</option>
                      </select>
                    </div>

                    <button type="button" class="btn-sim-run-primary" id="btnSimRunPrimary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                      <span>Run Simulation</span>
                    </button>
                  </div>

                  <!-- STATE 2: RUNNING (User Prompt Section 12) -->
                  <div class="sim-state-running" id="simStateRunning" style="display: none;">
                    <div class="sim-running-header">
                      <div class="sim-running-badge">
                        <span class="sim-pulse-dot"></span>
                        <span>Running Simulation...</span>
                      </div>
                      <span id="simProgressText" style="font-weight: 700; color: #2563eb;">78%</span>
                    </div>

                    <div class="sim-running-progress-wrap">
                      <div class="sim-running-progress-bar" id="simProgressBar"></div>
                    </div>

                    <div class="sim-running-stats-row">
                      <span style="font-weight: 600;">78 / 100 scenarios</span>
                      <div class="sim-stats-badges">
                        <span class="sim-badge-pass" id="simPassedCount">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          <span>71 Passed</span>
                        </span>
                        <span class="sim-badge-fail" id="simFailedCount">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          <span>7 Failed</span>
                        </span>
                      </div>
                    </div>

                    <div class="sim-current-scenario-card">
                      <div class="sim-current-scenario-label">Current Scenario</div>
                      <div class="sim-current-scenario-name" id="simCurrentScenario">#79 Validating student competency diagnostic</div>
                    </div>

                    <div class="sim-running-actions">
                      <button type="button" class="btn-sim-view-trace" onclick="alert('Viewing trace logs for scenario #79')">View Trace</button>
                      <button type="button" class="btn-sim-stop" onclick="alert('Simulation stopped.')">Stop Simulation</button>
                    </div>
                  </div>

                  <!-- STATE 3: COMPLETED (User Prompt Section 13) -->
                  <div class="sim-state-completed" id="simStateCompleted" style="display: none;">
                    <div class="sim-complete-banner">
                      <div class="sim-complete-title">Simulation Complete</div>
                      <div class="sim-success-stat">91%</div>
                      <div class="sim-complete-sub">100 Scenarios · <strong>91 Passed</strong> · <strong style="color: #dc2626;">9 Failed</strong></div>
                    </div>

                    <div class="sim-failures-box">
                      <div class="sim-failures-header">Failures (9 Cases)</div>
                      <div class="sim-failure-item">
                        <span class="sim-failure-id">#12</span>
                        <span>Wrong recommendation (Diagnostic score below threshold)</span>
                      </div>
                      <div class="sim-failure-item">
                        <span class="sim-failure-id">#28</span>
                        <span>Missing validation (Prerequisites data missing)</span>
                      </div>
                      <div class="sim-failure-item">
                        <span class="sim-failure-id">#45</span>
                        <span>Wrong tool (Query timed out in vector index)</span>
                      </div>
                      <div class="sim-failure-item">
                        <span class="sim-failure-id">#58</span>
                        <span>Wrong journey (Skipped mandatory auth step)</span>
                      </div>
                    </div>

                    <div class="sim-completed-actions">
                      <button type="button" class="btn-diagnose-ghostwriter" id="btnDiagnoseGhostwriter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        <span>Diagnose with Ghostwriter</span>
                      </button>

                      <div class="sim-secondary-btn-row">
                        <button type="button" class="btn-sim-secondary" onclick="alert('Displaying 91 passing execution traces')">View Results</button>
                        <button type="button" class="btn-sim-secondary" onclick="alert('Filtering 9 failure stack traces')">View Failures</button>
                        <button type="button" class="btn-sim-secondary" id="btnSimRunAgain">Run Again</button>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

            </div>
          </div>'''

content = content[:start_pos] + new_layout + '\n        ' + content[end_pos:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated agent-studio.html successfully with Ghostwriter content pane and without visual flow or emojis!")
