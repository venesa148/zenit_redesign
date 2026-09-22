import re

with open(r'd:\intern\zenit_redesign\workspace.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_script = """  <script>
    const phaseData = [
      {
        id: 1,
        title: "Business & Planning",
        owner: "business-analyst",
        status: "Pending",
        gates: 5,
        items: [
          "Define product goals and key success metrics.",
          "Identify target audience and user personas.",
          "Draft initial product requirements document (PRD).",
          "Create a high-level project roadmap and timeline.",
          "Conduct competitor analysis and market research."
        ]
      },
      {
        id: 2,
        title: "Design",
        owner: "software-architect",
        status: "Pending",
        gates: 5,
        items: [
          "Create wireframes for all core screens.",
          "Finalize user interface (UI) and user experience (UX) mockups.",
          "Define system architecture and technology stack.",
          "Create database schema and API documentation.",
          "Review design with stakeholders and get approval."
        ]
      },
      {
        id: 3,
        title: "Development",
        owner: "frontend-engineer + backend-engineer",
        status: "Pending",
        gates: 5,
        items: [
          "Set up development environment and source control.",
          "Implement frontend components based on UI mockups.",
          "Develop backend APIs and integrate with database.",
          "Connect frontend and backend systems.",
          "Perform code reviews and run unit tests."
        ]
      },
      {
        id: 4,
        title: "Validation & Acceptance",
        owner: "qa-engineer",
        status: "Pending",
        gates: 5,
        items: [
          "Conduct end-to-end (E2E) functional testing.",
          "Perform security vulnerability scanning.",
          "Run load testing to ensure performance standards.",
          "Execute user acceptance testing (UAT) with real users.",
          "Resolve all critical bugs and defects."
        ]
      },
      {
        id: 5,
        title: "Release",
        owner: "release-manager",
        status: "Pending",
        gates: 5,
        items: [
          "Prepare release notes and user documentation.",
          "Deploy application to the staging environment.",
          "Verify staging deployment and perform smoke tests.",
          "Deploy application to production servers.",
          "Monitor production logs for any immediate issues."
        ]
      },
      {
        id: 6,
        title: "Operations",
        owner: "sre",
        status: "Pending",
        gates: 5,
        items: [
          "Configure automated monitoring and alerts.",
          "Set up daily database backups and test restoration.",
          "Establish incident response and on-call schedules.",
          "Monitor system performance and server health.",
          "Handle any post-launch support tickets."
        ]
      },
      {
        id: 7,
        title: "Continuous Improvement",
        owner: "product-manager",
        status: "Pending",
        gates: 5,
        items: [
          "Analyze user feedback and usage analytics.",
          "Identify areas for feature enhancement.",
          "Plan the next sprint backlog based on priorities.",
          "Update project documentation with new learnings.",
          "Conduct a post-mortem review with the team."
        ]
      }
    ];
  
    function renderPhase(id) {
      const phase = phaseData.find(p => p.id === id);
      if (!phase) return;
  
      // Update active state on sidebar
      document.querySelectorAll('.phase-nav-item').forEach(el => {
        el.classList.toggle('active', parseInt(el.getAttribute('data-phase')) === id);
      });
  
      const root = document.getElementById('phaseContentRoot');
      
      let itemsHtml = phase.items.map(item => `
        <label class="gate-item" style="display: flex; align-items: center; gap: 16px; padding: 16px 20px; border: 1px solid var(--border-color, #e2e8f0); border-radius: 8px; background: #ffffff; cursor: pointer; transition: all 0.2s ease;">
          <input type="checkbox" class="gate-checkbox" disabled style="width: 18px; height: 18px; border-radius: 4px; border: 2px solid #cbd5e1; flex-shrink: 0;" />
          <span class="gate-text" style="font-size: 15px; color: var(--text-primary, #1e293b); font-weight: 400; line-height: 1.5;">${item}</span>
        </label>
      `).join('');
  
      root.innerHTML = `
        <div class="phase-content-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; border-bottom: 1px solid var(--border-color, #e2e8f0); padding-bottom: 24px;">
          <div>
            <h3 class="section-main-heading" style="font-size: 32px; margin-bottom: 16px; font-weight: 700;">${phase.id}. ${phase.title}</h3>
            <div style="display: flex; align-items: center; gap: 12px; color: var(--text-secondary, #64748b); font-size: 15px;">
              Owner: 
              <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background: rgba(0,0,0,0.04); border-radius: 16px; border: 1px solid rgba(0,0,0,0.08); font-weight: 500; color: var(--text-primary, #1e293b);">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> 
                ${phase.owner}
              </span>
              <span style="padding: 4px 12px; background: rgba(226, 232, 240, 0.6); color: #64748b; border-radius: 16px; font-weight: 500;">
                ${phase.status}
              </span>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 42px; font-weight: 700; color: var(--text-primary, #1e293b); line-height: 1;">0<span style="font-size: 20px; color: var(--text-secondary, #64748b); font-weight: 600;">/${phase.gates}</span></div>
            <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary, #64748b); letter-spacing: 0.5px; margin-top: 8px; text-transform: uppercase;">GATES CLEARED</div>
          </div>
        </div>
        
        <div class="phase-gates-list" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px;">
          ${itemsHtml}
        </div>
        
        <div class="phase-action-bar" style="display: flex; align-items: center; gap: 24px; margin-top: 32px; padding-top: 24px;">
          <button class="btn-modal-dark-cta phase-advance-btn" disabled style="background: #8e959f; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 15px; display: flex; align-items: center; gap: 8px; cursor: not-allowed;">
            Advance Phase <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
          <div style="color: var(--text-secondary, #64748b); font-size: 15px;">
            Only the owner agent (<strong>${phase.owner}</strong>) can advance this phase after clearing all gates.
          </div>
        </div>
      `;
    }
  
    // Add click listeners
    document.querySelectorAll('.phase-nav-item').forEach(el => {
      el.addEventListener('click', () => {
        renderPhase(parseInt(el.getAttribute('data-phase')));
      });
    });
  
    // Initial render
    if (document.getElementById('phaseContentRoot')) {
      renderPhase(1);
    }
  </script>"""

start_marker = "  <script>\n    const phaseData ="
end_marker = "  </script>\n</body>"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    # Need to replace the actual placeholder in JS string back to JS expressions
    new_script = new_script.replace('${item}', '${item}').replace('${phase.id}', '${phase.id}').replace('${phase.title}', '${phase.title}').replace('${phase.owner}', '${phase.owner}').replace('${phase.status}', '${phase.status}').replace('${phase.gates}', '${phase.gates}')
    
    new_content = content[:start_idx] + new_script + "\n</body>" + content[end_idx + len(end_marker):]
    with open(r'd:\intern\zenit_redesign\workspace.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Success")
else:
    print("Markers not found")
