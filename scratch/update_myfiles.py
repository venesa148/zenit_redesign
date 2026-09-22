import re

new_myfiles_html = """<!-- Pane 5: My Files -->
            <div class="modal-pane-section" id="pane-myfiles">
              
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
                <div>
                  <h1 class="section-main-heading">My files</h1>
                  <p class="section-sub-desc">Notes, drafts and references that do not belong to any one project.</p>
                </div>
                <button type="button" style="background: #1e293b; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Upload
                </button>
              </div>

              <div style="border: 1px dashed #cbd5e1; background: #f8fafc; padding: 16px; border-radius: 8px; color: #94a3b8; font-size: 13px; margin-bottom: 40px; line-height: 1.5;">
                Nothing here reaches a project, or the agent, until you copy it into one. Administrators can see these files, as they can everything else on this install — so this is your own area, not a private one.
              </div>

              <div class="modal-projects-section">
                <h2 class="modal-section-subtitle" style="font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 4px;">Files</h2>
                <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Drag files onto the page, or use Upload.</p>
                
                <div class="modal-mini-table-card" style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                  <table class="modal-mini-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
                    <thead style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                      <tr>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; width: 40%;">Name</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Type</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Size</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Uploaded</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; color: #0f172a; font-weight: 500; display: flex; align-items: center; gap: 8px;">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                          </svg>
                          architecture_draft_v2.pdf
                        </td>
                        <td style="padding: 12px 16px; color: #64748b;">Document</td>
                        <td style="padding: 12px 16px; text-align: right; color: #64748b;">1.2 MB</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">9/14/2026</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; color: #0f172a; font-weight: 500; display: flex; align-items: center; gap: 8px;">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <polyline points="9 15 12 18 15 15"/>
                            <line x1="12" y1="12" x2="12" y2="18"/>
                          </svg>
                          database_schema_prod.sql
                        </td>
                        <td style="padding: 12px 16px; color: #64748b;">SQL Source</td>
                        <td style="padding: 12px 16px; text-align: right; color: #64748b;">45 KB</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">9/10/2026</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; color: #0f172a; font-weight: 500; display: flex; align-items: center; gap: 8px;">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10 9 9 9 8 9"/>
                          </svg>
                          api_endpoints_notes.md
                        </td>
                        <td style="padding: 12px 16px; color: #64748b;">Markdown</td>
                        <td style="padding: 12px 16px; text-align: right; color: #64748b;">12 KB</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">9/05/2026</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>"""

html_files = [
    r'd:\intern\zenit_redesign\all-projects.html',
    r'd:\intern\zenit_redesign\dashboard.html',
    r'd:\intern\zenit_redesign\new-project.html',
    r'd:\intern\zenit_redesign\workspace.html'
]

start_marker = '<!-- Pane 5: My Files -->'
end_marker = '</main>'

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        start_idx = content.find(start_marker)
        # We need to find the specific </main> that follows pane 5.
        end_idx = content.find(end_marker, start_idx)
        
        if start_idx != -1 and end_idx != -1:
            content = content[:start_idx] + new_myfiles_html + '\n          ' + content[end_idx:]
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated my files pane in {filepath}")
        else:
            print(f"Markers not found in {filepath}")
            
    except Exception as e:
        print(f"Error updating {filepath}: {e}")
