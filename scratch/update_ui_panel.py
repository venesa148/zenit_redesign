import re

with open(r'd:\intern\zenit_redesign\workspace.html', 'r', encoding='utf-8') as f:
    content = f.read()

# CSS for tooltips and layout
custom_css = """
<style>
.design-system-container {
    background-color: #f4f7fb;
    padding: 40px;
    font-family: 'Inter', sans-serif;
    color: #1e293b;
    height: 100%;
    overflow-y: auto;
}
.ds-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
}
.ds-title {
    font-size: 28px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 8px 0;
}
.ds-subtitle {
    font-size: 14px;
    color: #64748b;
    margin: 0;
}
.ds-badge {
    background-color: #e2f4eb;
    color: #15803d;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
}
.ds-card {
    background: #ffffff;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    border: 1px solid #e2e8f0;
}
.ds-card-title {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 20px 0;
    color: #0f172a;
}
.ds-color-groups {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
}
.ds-color-group {
    flex: 1;
    min-width: 250px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
}
.ds-group-title {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 16px 0;
}
.ds-swatches {
    display: flex;
    gap: 12px;
}
.ds-swatch {
    flex: 1;
    display: flex;
    flex-direction: column;
}
.ds-color-box {
    height: 48px;
    border-radius: 6px;
    margin-bottom: 8px;
    position: relative;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.05);
}
/* Tooltip logic */
.ds-color-box::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%);
    background: #1e293b;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    z-index: 10;
}
.ds-color-box:hover::after {
    opacity: 1;
}
.ds-swatch-name {
    font-size: 11px;
    font-weight: 600;
    color: #475569;
}
.ds-swatch-hex {
    font-size: 11px;
    color: #94a3b8;
}
.ds-bottom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}
.ds-typo-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f1f5f9;
    font-size: 13px;
}
.ds-typo-label { font-weight: 700; width: 120px; }
.ds-typo-size { color: #64748b; width: 100px; }
.ds-typo-desc { color: #94a3b8; flex: 1; text-align: left; }
</style>
"""

new_ui_system = """<!-- PANEL 5: UI System Panel -->
            <div class="doc-panel-section" id="docPanelUiSystem" style="padding:0;">
              <div class="design-system-container">
                <div class="ds-header">
                  <div>
                    <h1 class="ds-title">Design System</h1>
                    <p class="ds-subtitle">Panduan desain dan komponen utama yang digunakan di seluruh aplikasi AMCIP.</p>
                  </div>
                  <div class="ds-badge">Phase 3 - UI/UX Design</div>
                </div>

                <!-- Colors Card -->
                <div class="ds-card">
                  <h2 class="ds-card-title">Warna</h2>
                  <div class="ds-color-groups">
                    <!-- Brand -->
                    <div class="ds-color-group">
                      <h3 class="ds-group-title">Brand</h3>
                      <div class="ds-swatches">
                        <div class="ds-swatch">
                          <div class="ds-color-box" style="background-color: #41ab5d;" data-tooltip="Primary: #41ab5d"></div>
                          <span class="ds-swatch-name">Primary</span>
                          <span class="ds-swatch-hex">#41ab5d</span>
                        </div>
                        <div class="ds-swatch">
                          <div class="ds-color-box" style="background-color: #1F753B;" data-tooltip="Primary Deep: #1F753B"></div>
                          <span class="ds-swatch-name">Primary Deep</span>
                          <span class="ds-swatch-hex">#1F753B</span>
                        </div>
                        <div class="ds-swatch">
                          <div class="ds-color-box" style="background-color: #17612D;" data-tooltip="Primary Darker: #17612D"></div>
                          <span class="ds-swatch-name">Primary Darker</span>
                          <span class="ds-swatch-hex">#17612D</span>
                        </div>
                        <div class="ds-swatch">
                          <div class="ds-color-box" style="background-color: #EDF7F0;" data-tooltip="Wash: #EDF7F0"></div>
                          <span class="ds-swatch-name">Wash</span>
                          <span class="ds-swatch-hex">#EDF7F0</span>
                        </div>
                      </div>
                    </div>

                    <!-- Netral -->
                    <div class="ds-color-group">
                      <h3 class="ds-group-title">Netral</h3>
                      <div class="ds-swatches">
                        <div class="ds-swatch">
                          <div class="ds-color-box" style="background-color: #FFFFFF;" data-tooltip="Background: #FFFFFF"></div>
                          <span class="ds-swatch-name">Background</span>
                          <span class="ds-swatch-hex">#FFFFFF</span>
                        </div>
                        <div class="ds-swatch">
                          <div class="ds-color-box" style="background-color: #F6F8FC;" data-tooltip="Muted: #F6F8FC"></div>
                          <span class="ds-swatch-name">Muted</span>
                          <span class="ds-swatch-hex">#F6F8FC</span>
                        </div>
                        <div class="ds-swatch">
                          <div class="ds-color-box" style="background-color: #EDF1F9;" data-tooltip="Hover: #EDF1F9"></div>
                          <span class="ds-swatch-name">Hover</span>
                          <span class="ds-swatch-hex">#EDF1F9</span>
                        </div>
                        <div class="ds-swatch">
                          <div class="ds-color-box" style="background-color: #1D2536;" data-tooltip="Text: #1D2536"></div>
                          <span class="ds-swatch-name">Text</span>
                          <span class="ds-swatch-hex">#1D2536</span>
                        </div>
                      </div>
                    </div>

                    <!-- Status -->
                    <div class="ds-color-group">
                      <h3 class="ds-group-title">Status</h3>
                      <div class="ds-swatches">
                        <div class="ds-swatch">
                          <div class="ds-color-box" style="background-color: #CB3B3B;" data-tooltip="Critical: #CB3B3B"></div>
                          <span class="ds-swatch-name">Critical</span>
                          <span class="ds-swatch-hex">#CB3B3B</span>
                        </div>
                        <div class="ds-swatch">
                          <div class="ds-color-box" style="background-color: #856313;" data-tooltip="Warning: #856313"></div>
                          <span class="ds-swatch-name">Warning</span>
                          <span class="ds-swatch-hex">#856313</span>
                        </div>
                        <div class="ds-swatch">
                          <div class="ds-color-box" style="background-color: #3A5FB5;" data-tooltip="Info: #3A5FB5"></div>
                          <span class="ds-swatch-name">Info</span>
                          <span class="ds-swatch-hex">#3A5FB5</span>
                        </div>
                        <div class="ds-swatch">
                          <div class="ds-color-box" style="background-color: #177552;" data-tooltip="OK: #177552"></div>
                          <span class="ds-swatch-name">OK</span>
                          <span class="ds-swatch-hex">#177552</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bottom Grid -->
                <div class="ds-bottom-grid">
                  <!-- Tipografi -->
                  <div class="ds-card" style="display: flex; gap: 24px;">
                    <div style="flex: 1;">
                      <h2 class="ds-card-title">Tipografi</h2>
                      <div class="ds-typo-row"><span class="ds-typo-label">H1</span><span class="ds-typo-size">33px / 700</span><span class="ds-typo-desc">Page title</span></div>
                      <div class="ds-typo-row"><span class="ds-typo-label">H3</span><span class="ds-typo-size">17px / 700</span><span class="ds-typo-desc">Card title</span></div>
                      <div class="ds-typo-row"><span class="ds-typo-label">Body</span><span class="ds-typo-size">13.5-14px / 400</span><span class="ds-typo-desc">Body text</span></div>
                      <div class="ds-typo-row"><span class="ds-typo-label">Label</span><span class="ds-typo-size">11px / 600</span><span class="ds-typo-desc">Label (uppercase)</span></div>
                      <div class="ds-typo-row"><span class="ds-typo-label">Table header</span><span class="ds-typo-size">10.5px / 700</span><span class="ds-typo-desc">Table header (uppercase)</span></div>
                      <div class="ds-typo-row" style="border:none;"><span class="ds-typo-label">KPI number</span><span class="ds-typo-size">42px / 700</span><span class="ds-typo-desc">KPI number</span></div>
                    </div>
                    <div style="flex: 1; border-left: 1px solid #f1f5f9; padding-left: 24px;">
                      <h3 style="font-size: 13px; font-weight: 700; margin: 0 0 8px 0;">Font</h3>
                      <p style="font-size: 12px; color: #64748b; margin: 0 0 24px 0;">System-ui, -apple-system, Segoe UI, Roboto, Arial</p>
                      <div style="font-size: 48px; font-weight: 700; margin-bottom: 16px; color: #0f172a;">Aa</div>
                      <div style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Inter / System UI</div>
                      <p style="font-size: 12px; color: #475569; line-height: 1.6; word-break: break-all;">
                        Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm<br>
                        Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz<br>
                        0123456789
                      </p>
                    </div>
                  </div>

                  <!-- Spacing & Shapes -->
                  <div class="ds-card">
                    <h2 class="ds-card-title">Spacing, Bentuk & Elevasi</h2>
                    
                    <div style="display: flex; gap: 40px; margin-bottom: 32px;">
                      <div style="display: flex; gap: 16px; align-items: flex-end;">
                        <div style="text-align: center;"><div style="width:16px; height:16px; background:#e2e8f0; border-radius: 4px; margin:0 auto 8px auto;"></div><span style="font-size:11px; color:#64748b;">4px</span></div>
                        <div style="text-align: center;"><div style="width:24px; height:24px; background:#e2e8f0; border-radius: 4px; margin:0 auto 8px auto;"></div><span style="font-size:11px; color:#64748b;">8px</span></div>
                        <div style="text-align: center;"><div style="width:32px; height:32px; background:#e2e8f0; border-radius: 4px; margin:0 auto 8px auto;"></div><span style="font-size:11px; color:#64748b;">12px</span></div>
                        <div style="text-align: center;"><div style="width:40px; height:40px; background:#e2e8f0; border-radius: 4px; margin:0 auto 8px auto;"></div><span style="font-size:11px; color:#64748b;">16px</span></div>
                        <div style="text-align: center;"><div style="width:48px; height:48px; background:#e2e8f0; border-radius: 4px; margin:0 auto 8px auto;"></div><span style="font-size:11px; color:#64748b;">20px</span></div>
                      </div>
                      <div>
                        <h3 style="font-size: 13px; font-weight: 700; margin: 0 0 12px 0;">Radius</h3>
                        <div style="display: flex; gap: 16px;">
                           <div style="width:40px; height:40px; background:#e2e8f0; border-radius: 8px;"></div>
                           <div style="width:40px; height:40px; background:#e2e8f0; border-radius: 12px;"></div>
                           <div style="width:40px; height:40px; background:#e2e8f0; border-radius: 999px;"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div style="display: flex; gap: 40px;">
                      <div>
                        <h3 style="font-size: 13px; font-weight: 700; margin: 0 0 12px 0;">Warna Latar & Elevasi</h3>
                        <div style="display: flex; gap: 16px;">
                          <div>
                            <div style="width: 80px; height: 48px; background: #073E22; border-radius: 6px; margin-bottom: 8px;"></div>
                            <div style="font-size:11px; color:#475569;">Shell (Sidebar)</div>
                            <div style="font-size:10px; color:#94a3b8;">#073E22</div>
                          </div>
                          <div>
                            <div style="width: 80px; height: 48px; background: #F4F6F8; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 8px;"></div>
                            <div style="font-size:11px; color:#475569;">Halaman (Canvas)</div>
                            <div style="font-size:10px; color:#94a3b8;">#F4F6F8</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 style="font-size: 13px; font-weight: 700; margin: 0 0 12px 0;">Kartu (elevasi 1-2)</h3>
                        <div style="display: flex; gap: 16px;">
                          <div>
                            <div style="width: 80px; height: 48px; background: #FFFFFF; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 8px;"></div>
                            <div style="font-size:11px; color:#475569;">Level 1</div>
                          </div>
                          <div>
                            <div style="width: 80px; height: 48px; background: #FFFFFF; border-radius: 6px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 8px;"></div>
                            <div style="font-size:11px; color:#475569;">Level 2</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>"""

start_marker = '            <!-- PANEL 5: UI System Panel -->'
end_marker = '            <!-- PANEL 6: README.md Panel -->'

idx1 = content.find(start_marker)
idx2 = content.find(end_marker)

if idx1 != -1 and idx2 != -1:
    content = custom_css + content[:idx1] + new_ui_system + '\n' + content[idx2:]

with open(r'd:\intern\zenit_redesign\workspace.html', 'w', encoding='utf-8') as f:
    f.write(content)
