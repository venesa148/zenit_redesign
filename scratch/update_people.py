import re

new_people_html = """<!-- Pane 3: People -->
            <div class="modal-pane-section" id="pane-people">
              <h1 class="section-main-heading">People</h1>
              <p class="section-sub-desc" style="margin-bottom: 32px;">Who has access, what they own, and what has been done on this install.</p>
              
              <!-- Accounts Section -->
              <div class="modal-projects-section" style="margin-bottom: 40px;">
                <h2 class="modal-section-subtitle" style="font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 4px;">Accounts</h2>
                <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Roles are set when the account is seeded — <code>pnpm --filter server users:seed</code>.</p>
                <div class="modal-mini-table-card" style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                  <table class="modal-mini-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
                    <thead style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                      <tr>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">User</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Role</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Sees</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Projects</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Sessions</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Tokens</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Last sign-in</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px;"><span style="color: #0f172a; font-weight: 600;">Charlie</span> <span style="color: #94a3b8;">charlie@inaai.ai</span></td>
                        <td style="padding: 12px 16px;"><span style="background: #e2e8f0; color: #475569; padding: 2px 8px; border-radius: 4px; font-size: 12px;">admin</span></td>
                        <td style="padding: 12px 16px; color: #64748b;">every project + monitoring</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">2</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">4</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">946.4K</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">9/14/2026, 11:02:02 AM</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px;"><span style="color: #0f172a; font-weight: 600;">Johanes</span> <span style="color: #94a3b8;">johanes@inaai.ai</span></td>
                        <td style="padding: 12px 16px;"><span style="background: #e2e8f0; color: #475569; padding: 2px 8px; border-radius: 4px; font-size: 12px;">admin</span></td>
                        <td style="padding: 12px 16px; color: #64748b;">every project + monitoring</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">5</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">9</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">890.7K</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">9/7/2026, 9:39:27 PM</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px;"><span style="color: #0f172a; font-weight: 600;">Owner</span> <span style="color: #94a3b8;">@local-owner</span></td>
                        <td style="padding: 12px 16px;"><span style="background: #f1f5f9; border: 1px solid #e2e8f0; color: #94a3b8; padding: 2px 8px; border-radius: 4px; font-size: 12px;">system</span></td>
                        <td style="padding: 12px 16px; color: #94a3b8;">nobody signs in as this</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">1</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">1</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">10</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">—</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px;"><span style="color: #0f172a; font-weight: 600;">Angelita</span> <span style="color: #94a3b8;">angelita@inaai.ai</span></td>
                        <td style="padding: 12px 16px;"><span style="background: #f1f5f9; border: 1px solid #e2e8f0; color: #94a3b8; padding: 2px 8px; border-radius: 4px; font-size: 12px;">member</span></td>
                        <td style="padding: 12px 16px; color: #94a3b8;">only projects they created</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">2</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">6</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">12.4M</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">8/28/2026, 10:10:27 AM</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px;"><span style="color: #0f172a; font-weight: 600;">Jensri</span> <span style="color: #94a3b8;">jensri@inaai.ai</span></td>
                        <td style="padding: 12px 16px;"><span style="background: #f1f5f9; border: 1px solid #e2e8f0; color: #94a3b8; padding: 2px 8px; border-radius: 4px; font-size: 12px;">member</span></td>
                        <td style="padding: 12px 16px; color: #94a3b8;">only projects they created</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">3</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">10</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">49M</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">8/29/2026, 10:43:35 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Audit log Section -->
              <div class="modal-projects-section" style="margin-bottom: 40px;">
                <h2 class="modal-section-subtitle" style="font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 4px;">Audit log</h2>
                <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Append-only: sign-ins and every project lifecycle action, newest first.</p>
                <div class="modal-mini-table-card" style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                  <table class="modal-mini-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
                    <thead style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                      <tr>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">When</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Who</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Action</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; color: #94a3b8;">9/15/2026, 4:59:31 PM</td>
                        <td style="padding: 12px 16px; color: #0f172a; font-weight: 500;">@johanes</td>
                        <td style="padding: 12px 16px;"><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #475569; font-size: 12px;">project.unarchive</code></td>
                        <td style="padding: 12px 16px; color: #94a3b8; font-family: monospace;">3bc18078-214d-479f-8659-e6e7da4fe2a5</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; color: #94a3b8;">9/15/2026, 4:59:25 PM</td>
                        <td style="padding: 12px 16px; color: #0f172a; font-weight: 500;">@johanes</td>
                        <td style="padding: 12px 16px;"><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #475569; font-size: 12px;">project.archive</code></td>
                        <td style="padding: 12px 16px; color: #94a3b8; font-family: monospace;">3bc18078-214d-479f-8659-e6e7da4fe2a5</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; color: #94a3b8;">9/14/2026, 11:02:02 AM</td>
                        <td style="padding: 12px 16px; color: #0f172a; font-weight: 500;">@charlie</td>
                        <td style="padding: 12px 16px;"><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #475569; font-size: 12px;">auth.login</code></td>
                        <td style="padding: 12px 16px; color: #94a3b8;">—</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; color: #94a3b8;">9/7/2026, 9:39:27 PM</td>
                        <td style="padding: 12px 16px; color: #0f172a; font-weight: 500;">@johanes</td>
                        <td style="padding: 12px 16px;"><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #475569; font-size: 12px;">auth.login</code></td>
                        <td style="padding: 12px 16px; color: #94a3b8;">—</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; color: #94a3b8;">9/4/2026, 11:13:47 AM</td>
                        <td style="padding: 12px 16px; color: #0f172a; font-weight: 500;">@johanes</td>
                        <td style="padding: 12px 16px;"><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #475569; font-size: 12px;">session.delete</code></td>
                        <td style="padding: 12px 16px; color: #94a3b8; font-family: monospace;">4dbb5ba5-c00b-4d1f-b0f2-b7c1ab763d6e</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; color: #94a3b8;">9/4/2026, 11:13:42 AM</td>
                        <td style="padding: 12px 16px; color: #0f172a; font-weight: 500;">@johanes</td>
                        <td style="padding: 12px 16px;"><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #475569; font-size: 12px;">session.delete</code></td>
                        <td style="padding: 12px 16px; color: #94a3b8; font-family: monospace;">4dbb5ba5-c00b-4d1f-b0f2-b7c1ab763d6e</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; color: #94a3b8;">9/3/2026, 1:31:22 PM</td>
                        <td style="padding: 12px 16px; color: #0f172a; font-weight: 500;">@johanes</td>
                        <td style="padding: 12px 16px;"><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #475569; font-size: 12px;">project.create</code></td>
                        <td style="padding: 12px 16px; color: #94a3b8;">zenith test</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; color: #94a3b8;">9/3/2026, 11:40:42 AM</td>
                        <td style="padding: 12px 16px; color: #0f172a; font-weight: 500;">@johanes</td>
                        <td style="padding: 12px 16px;"><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #475569; font-size: 12px;">auth.login</code></td>
                        <td style="padding: 12px 16px; color: #94a3b8;">—</td>
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

start_marker = '<!-- Pane 3: People -->'
end_marker = '<!-- Pane 4: System -->'

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        start_idx = content.find(start_marker)
        end_idx = content.find(end_marker)
        
        if start_idx != -1 and end_idx != -1:
            content = content[:start_idx] + new_people_html + '\n            ' + content[end_idx:]
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated people pane in {filepath}")
        else:
            print(f"Markers not found in {filepath}")
            
    except Exception as e:
        print(f"Error updating {filepath}: {e}")
