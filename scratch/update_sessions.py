import re

new_sessions_html = """<!-- Pane 2: Sessions -->
            <div class="modal-pane-section" id="pane-sessions">
              <h1 class="section-main-heading">Sessions</h1>
              <p class="section-sub-desc" style="margin-bottom: 32px;">Every Claude Code session across every project, with what it cost.</p>
              
              <div class="modal-projects-section" style="margin-bottom: 40px;">
                <h2 class="modal-section-subtitle" style="font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 4px;">Conversation archive</h2>
                <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Click a row to read the conversation. Sidechains are sub-agent runs.</p>
                <div class="modal-mini-table-card" style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                  <table class="modal-mini-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
                    <thead style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                      <tr>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Session</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Project</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Ran by</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Model</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Messages</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Tools</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Tokens</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Cache<br>read</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Last active</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <td style="padding: 12px 16px; color: #0f172a;">Implementasi frontend Medical Cl...</td>
                        <td style="padding: 12px 16px;"><span style="color:#0f172a;">AMCIP</span> <span style="color: #94a3b8;">@jensri</span></td>
                        <td style="padding: 12px 16px; color: #0f172a;">@jensri</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">claude-opus-5</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">5,328</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">4,189</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">6.3M</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">3.4B</td>
                        <td style="padding: 12px 16px; color: #94a3b8; line-height: 1.4;">9/15/2026, 4:57:23<br>PM</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <td style="padding: 12px 16px; color: #0f172a;">UI design review</td>
                        <td style="padding: 12px 16px;"><span style="color:#0f172a;">AMCIP</span> <span style="color: #94a3b8;">@jensri</span></td>
                        <td style="padding: 12px 16px; color: #0f172a;">@jensri</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">claude-opus-5</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">2</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">0</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">1.3K</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">0</td>
                        <td style="padding: 12px 16px; color: #94a3b8; line-height: 1.4;">9/14/2026, 6:59:55<br>PM</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <td style="padding: 12px 16px; color: #0f172a;">Backend ERP PAD Fase 3 Sprint 2</td>
                        <td style="padding: 12px 16px;"><span style="color:#0f172a;">ERP</span> <span style="color: #94a3b8;">@angelita</span></td>
                        <td style="padding: 12px 16px; color: #0f172a;">@angelita</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">claude-opus-<br>4-8</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">3,024</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">1,649</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">6.3M</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">2B</td>
                        <td style="padding: 12px 16px; color: #94a3b8; line-height: 1.4;">9/13/2026, 10:53:40<br>PM</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <td style="padding: 12px 16px; color: #0f172a;">extract-rules-from-emp-docs</td>
                        <td style="padding: 12px 16px;"><span style="color:#0f172a;">AMCIP</span> <span style="color: #94a3b8;">@jensri</span></td>
                        <td style="padding: 12px 16px; color: #0f172a;">@jensri</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">claude-opus-<br>4-8</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">16,732</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">9,570</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">33.5M</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">11.7B</td>
                        <td style="padding: 12px 16px; color: #94a3b8; line-height: 1.4;">9/10/2026, 5:49:20<br>AM</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <td style="padding: 12px 16px; color: #0f172a;">Landing page</td>
                        <td style="padding: 12px 16px;"><span style="color:#0f172a;">zenith test</span> <span style="color: #94a3b8;">@johanes</span></td>
                        <td style="padding: 12px 16px; color: #0f172a;">@johanes</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">claude-opus-5</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">40</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">31</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">65K</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">3.5M</td>
                        <td style="padding: 12px 16px; color: #94a3b8; line-height: 1.4;">9/7/2026, 6:37:10<br>PM</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <td style="padding: 12px 16px; color: #0f172a;">Halaman login</td>
                        <td style="padding: 12px 16px;"><span style="color:#0f172a;">test</span> <span style="color: #94a3b8;">@johanes</span></td>
                        <td style="padding: 12px 16px; color: #0f172a;">@johanes</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">claude-opus-5</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">56</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">37</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">115.7K</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">5.9M</td>
                        <td style="padding: 12px 16px; color: #94a3b8; line-height: 1.4;">9/4/2026, 11:14:18<br>AM</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <td style="padding: 12px 16px; color: #0f172a;">Dashboard for sales</td>
                        <td style="padding: 12px 16px;"><span style="color:#0f172a;">zenith test</span> <span style="color: #94a3b8;">@johanes</span></td>
                        <td style="padding: 12px 16px; color: #0f172a;">@johanes</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">claude-opus-5</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">90</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">80</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">132K</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">11M</td>
                        <td style="padding: 12px 16px; color: #94a3b8; line-height: 1.4;">9/3/2026, 3:26:56<br>PM</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <td style="padding: 12px 16px; color: #0f172a;">&lt;local-command-caveat&gt;Caveat: ...</td>
                        <td style="padding: 12px 16px;"><span style="color:#0f172a;">MCU Reviewer</span> <span style="color: #94a3b8;">@charlie</span></td>
                        <td style="padding: 12px 16px; color: #0f172a;">@charlie</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">claude-opus-5</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">25</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">19</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">21.9K</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">2M</td>
                        <td style="padding: 12px 16px; color: #94a3b8; line-height: 1.4;">9/3/2026, 11:46:13<br>AM</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <td style="padding: 12px 16px; color: #0f172a;">Halaman login</td>
                        <td style="padding: 12px 16px;"><span style="color:#0f172a;">test</span> <span style="color: #94a3b8;">@johanes</span></td>
                        <td style="padding: 12px 16px; color: #0f172a;">@johanes</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">claude-opus-<br>4-8</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">14</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">9</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">8.3K</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">493.3K</td>
                        <td style="padding: 12px 16px; color: #94a3b8; line-height: 1.4;">9/1/2026, 5:25:21<br>PM</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9; cursor: pointer;">
                        <td style="padding: 12px 16px; color: #0f172a;">extract-rules-from-emp-docs</td>
                        <td style="padding: 12px 16px;"><span style="color:#0f172a;">AMCIP</span> <span style="color: #94a3b8;">@jensri</span></td>
                        <td style="padding: 12px 16px; color: #0f172a;">@jensri</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">claude-opus-<br>4-8</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">656</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">336</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">1.3M</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">321.8M</td>
                        <td style="padding: 12px 16px; color: #94a3b8; line-height: 1.4;">8/31/2026, 2:22:57<br>AM</td>
                      </tr>
                      <tr style="cursor: pointer;">
                        <td style="padding: 12px 16px; color: #0f172a;">Penyusunan PRD ERP Platform PA...</td>
                        <td style="padding: 12px 16px;"><span style="color:#0f172a;">ERP</span> <span style="color: #94a3b8;">@angelita</span></td>
                        <td style="padding: 12px 16px; color: #0f172a;">@angelita</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">claude-opus-<br>4-8</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">2,370</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">1,182</td>
                        <td style="padding: 12px 16px; text-align: right; color: #0f172a;">5.7M</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">1.4B</td>
                        <td style="padding: 12px 16px; color: #94a3b8; line-height: 1.4;">8/27/2026, 2:43:23<br>AM</td>
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

start_marker = '<!-- Pane 2: Sessions -->'
end_marker = '<!-- Pane 3: People -->'

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        start_idx = content.find(start_marker)
        end_idx = content.find(end_marker)
        
        if start_idx != -1 and end_idx != -1:
            content = content[:start_idx] + new_sessions_html + '\n            ' + content[end_idx:]
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated sessions pane in {filepath}")
        else:
            print(f"Markers not found in {filepath}")
            
    except Exception as e:
        print(f"Error updating {filepath}: {e}")
