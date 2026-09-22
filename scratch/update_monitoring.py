import re

with open(r'd:\intern\zenit_redesign\workspace.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_monitoring = """<!-- Pane 1: Monitoring -->
            <div class="modal-pane-section active" id="pane-monitoring">
              <h1 class="section-main-heading">Monitoring</h1>
              <p class="section-sub-desc">Every project on this install, across all accounts.</p>

              <!-- Metrics Grid -->
              <div class="manage-metrics-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
                <div class="metric-stat-card" style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                  <span class="metric-card-label" style="font-size: 13px; color: #64748b; font-weight: 500; display: block; margin-bottom: 8px;">Projects</span>
                  <div class="metric-card-value" style="font-size: 28px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">13</div>
                  <span class="metric-card-subinfo" style="font-size: 13px; color: #64748b;">13 active</span>
                </div>

                <div class="metric-stat-card" style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                  <span class="metric-card-label" style="font-size: 13px; color: #64748b; font-weight: 500; display: block; margin-bottom: 8px;">Sessions</span>
                  <div class="metric-card-value" style="font-size: 28px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">30</div>
                  <span class="metric-card-subinfo" style="font-size: 13px; color: #64748b;">33,350 messages</span>
                </div>

                <div class="metric-stat-card" style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                  <span class="metric-card-label" style="font-size: 13px; color: #64748b; font-weight: 500; display: block; margin-bottom: 8px;">Tokens</span>
                  <div class="metric-card-value" style="font-size: 28px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">63.2M</div>
                  <span class="metric-card-subinfo" style="font-size: 13px; color: #64748b;">93.1K in · 63.1M out</span>
                </div>

                <div class="metric-stat-card" style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                  <span class="metric-card-label" style="font-size: 13px; color: #64748b; font-weight: 500; display: block; margin-bottom: 8px;">Commits</span>
                  <div class="metric-card-value" style="font-size: 28px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">297</div>
                  <span class="metric-card-subinfo" style="font-size: 13px; color: #64748b;">+208.6K / -18.7K</span>
                </div>
              </div>

              <!-- Credits Notice -->
              <p class="credit-notice-text" style="font-size: 13px; color: #64748b; margin-bottom: 32px;">
                Subscription usage at 9/15/2026, 4:37:10 PM: 7.00000000000001% of the 5-hour window, 18% of the 7-day window · Opus 5
              </p>

              <!-- Token Spend Bar Chart Card -->
              <div class="token-chart-card" style="background: #fff; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 40px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <h3 class="chart-card-title" style="font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 24px;">Token spend — last 30 days</h3>
                <div class="bars-graph-container" style="display: flex; align-items: flex-end; gap: 4px; height: 120px; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0;">
                  <div class="chart-bar-item" style="height: 2%; background: #64748b; flex: 1; border-radius: 2px 2px 0 0;"></div>
                  <div class="chart-bar-item" style="height: 3%; background: #64748b; flex: 1; border-radius: 2px 2px 0 0;"></div>
                  <div class="chart-bar-item" style="height: 2%; background: #64748b; flex: 1; border-radius: 2px 2px 0 0;"></div>
                  <div class="chart-bar-item" style="height: 15%; background: #64748b; flex: 1; border-radius: 2px 2px 0 0;"></div>
                  <div class="chart-bar-item" style="height: 3%; background: #64748b; flex: 1; border-radius: 2px 2px 0 0;"></div>
                  <div class="chart-bar-item" style="height: 2%; background: #64748b; flex: 1; border-radius: 2px 2px 0 0;"></div>
                  <div class="chart-bar-item" style="height: 2%; background: #64748b; flex: 1; border-radius: 2px 2px 0 0;"></div>
                  <div class="chart-bar-item" style="height: 2%; background: #64748b; flex: 1; border-radius: 2px 2px 0 0;"></div>
                  <div class="chart-bar-item" style="height: 100%; background: #64748b; flex: 1; border-radius: 2px 2px 0 0;"></div>
                  <div class="chart-bar-item" style="height: 12%; background: #64748b; flex: 1; border-radius: 2px 2px 0 0;"></div>
                  <div class="chart-bar-item" style="height: 2%; background: #64748b; flex: 1; border-radius: 2px 2px 0 0;"></div>
                  <div class="chart-bar-item" style="height: 15%; background: #64748b; flex: 1; border-radius: 2px 2px 0 0;"></div>
                </div>
              </div>

              <!-- Projects Table -->
              <div class="modal-projects-section" style="margin-bottom: 40px;">
                <h2 class="modal-section-subtitle" style="font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 4px;">Projects</h2>
                <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Delivery position, spend, and lifecycle.</p>
                <div class="modal-mini-table-card" style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                  <table class="modal-mini-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
                    <thead style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                      <tr>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Project</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Owner</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Phase</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Sprints</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Tasks</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Tokens</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Last active</th>
                        <th style="padding: 12px 16px;"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">AMCIP</td>
                        <td style="padding: 12px 16px; color: #475569;">@jensri</td>
                        <td style="padding: 12px 16px; color: #475569;">3 Development <span style="color:#94a3b8;">(in_progress)</span></td>
                        <td style="padding: 12px 16px; color: #475569;">0/6</td>
                        <td style="padding: 12px 16px; color: #475569;">415/633</td>
                        <td style="padding: 12px 16px; color: #475569; text-align: right;">49M</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">9/15/2026, 4:37:15 PM</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">
                          <span style="cursor:pointer; margin-right:8px;">🗑️</span>
                          <span style="cursor:pointer;">❌</span>
                        </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">ERP</td>
                        <td style="padding: 12px 16px; color: #475569;">@angelita</td>
                        <td style="padding: 12px 16px; color: #475569;">3 Development <span style="color:#94a3b8;">(in_progress)</span></td>
                        <td style="padding: 12px 16px; color: #475569;">0/8</td>
                        <td style="padding: 12px 16px; color: #475569;">43/248</td>
                        <td style="padding: 12px 16px; color: #475569; text-align: right;">12M</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">9/13/2026, 10:53:40 PM</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">
                          <span style="cursor:pointer; margin-right:8px;">🗑️</span>
                          <span style="cursor:pointer;">❌</span>
                        </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">zenith test</td>
                        <td style="padding: 12px 16px; color: #475569;">@johanes</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">—</td>
                        <td style="padding: 12px 16px; color: #475569;">0/0</td>
                        <td style="padding: 12px 16px; color: #475569;">0/0</td>
                        <td style="padding: 12px 16px; color: #475569; text-align: right;">196.9K</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">9/7/2026, 6:37:10 PM</td>
                        <td style="padding: 12px 16px; text-align: right; color: #94a3b8;">
                          <span style="cursor:pointer; margin-right:8px;">🗑️</span>
                          <span style="cursor:pointer;">❌</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Code output Table -->
              <div class="modal-projects-section" style="margin-bottom: 40px;">
                <h2 class="modal-section-subtitle" style="font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 4px;">Code output</h2>
                <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Commits by author. Platform-identity commits are the scaffolding the daemon writes.</p>
                <div class="modal-mini-table-card" style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                  <table class="modal-mini-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
                    <thead style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                      <tr>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Author</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Commits</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Added</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Removed</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px;"><span style="color: #0f172a; font-weight: 500;">AMCIP backend-engineer</span> <span style="color:#94a3b8;">angelita@inaai.ai</span></td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">125</td>
                        <td style="padding: 12px 16px; text-align: right; color: #10b981;">+131,466</td>
                        <td style="padding: 12px 16px; text-align: right; color: #ef4444;">-13,733</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px;"><span style="color: #0f172a; font-weight: 500;">Agent Platform</span> <span style="color:#94a3b8;">platform@agent-platform.local</span> <span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 11px; margin-left: 4px;">platform</span></td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">99</td>
                        <td style="padding: 12px 16px; text-align: right; color: #10b981;">+15,021</td>
                        <td style="padding: 12px 16px; text-align: right; color: #ef4444;">-3,788</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px;"><span style="color: #0f172a; font-weight: 500;">angelita</span> <span style="color:#94a3b8;">angelita@inaai.ai</span></td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">61</td>
                        <td style="padding: 12px 16px; text-align: right; color: #10b981;">+40,102</td>
                        <td style="padding: 12px 16px; text-align: right; color: #ef4444;">-1,165</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px;"><span style="color: #0f172a; font-weight: 500;">Agent Platform</span> <span style="color:#94a3b8;">scaffold@agent-platform.local</span> <span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 11px; margin-left: 4px;">platform</span></td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">12</td>
                        <td style="padding: 12px 16px; text-align: right; color: #10b981;">+21,988</td>
                        <td style="padding: 12px 16px; text-align: right; color: #ef4444;">-0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Accounts Table -->
              <div class="modal-projects-section">
                <h2 class="modal-section-subtitle" style="font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 4px;">Accounts</h2>
                <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">Members only ever see the projects they created; admins see everything.</p>
                <div class="modal-mini-table-card" style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                  <table class="modal-mini-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
                    <thead style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                      <tr>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">User</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Role</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: center;">Projects</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: center;">Sessions</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b; text-align: right;">Tokens</th>
                        <th style="padding: 12px 16px; font-weight: 500; color: #64748b;">Last sign-in</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">Charlie <span style="color:#94a3b8; font-weight:400;">@charlie</span></td>
                        <td style="padding: 12px 16px;"><span style="background: #e2e8f0; color: #475569; padding: 2px 8px; border-radius: 4px; font-size: 11px;">admin</span></td>
                        <td style="padding: 12px 16px; text-align: center; color: #475569;">2</td>
                        <td style="padding: 12px 16px; text-align: center; color: #475569;">4</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">946.4K</td>
                        <td style="padding: 12px 16px; color: #64748b;">9/14/2026, 11:02:02 AM</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">Johanes <span style="color:#94a3b8; font-weight:400;">@johanes</span></td>
                        <td style="padding: 12px 16px;"><span style="background: #e2e8f0; color: #475569; padding: 2px 8px; border-radius: 4px; font-size: 11px;">admin</span></td>
                        <td style="padding: 12px 16px; text-align: center; color: #475569;">5</td>
                        <td style="padding: 12px 16px; text-align: center; color: #475569;">9</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">890.7K</td>
                        <td style="padding: 12px 16px; color: #64748b;">9/7/2026, 9:39:27 PM</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 12px 16px; font-weight: 600; color: #0f172a;">Owner <span style="color:#94a3b8; font-weight:400;">@local-owner</span></td>
                        <td style="padding: 12px 16px;"><span style="background: #f1f5f9; border: 1px solid #e2e8f0; color: #64748b; padding: 2px 8px; border-radius: 4px; font-size: 11px;">system</span></td>
                        <td style="padding: 12px 16px; text-align: center; color: #475569;">1</td>
                        <td style="padding: 12px 16px; text-align: center; color: #475569;">1</td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569;">10</td>
                        <td style="padding: 12px 16px; color: #94a3b8;">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Refresh Text -->
              <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">Generated 9/15/2026, 4:38:56 PM · refreshes every 30s</p>

            </div>"""

# Replace in workspace.html
start_marker = '<!-- Pane 1: Monitoring -->'
end_marker = '<!-- Pane 2: Sessions -->'

idx1 = content.find(start_marker)
idx2 = content.find(end_marker)

if idx1 != -1 and idx2 != -1:
    content = content[:idx1] + new_monitoring + '\n            ' + content[idx2:]

with open(r'd:\intern\zenit_redesign\workspace.html', 'w', encoding='utf-8') as f:
    f.write(content)

