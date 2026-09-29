import re

# Read SVG snippet
with open("scratch/erd_svg_snippet.txt", "r", encoding="utf-8") as f:
    svg_markup = f.read()

erd_panel_content = f"""            <div class="doc-panel-section" id="docPanelErd">
              <div class="erd-canvas-card" id="erdCanvasCard">
                <!-- Floating Toolbar -->
                <div class="erd-canvas-toolbar">
                  <button type="button" class="erd-tool-icon" id="erdBtnZoomOut" title="Zoom out">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </button>
                  <span class="erd-zoom-text" id="erdZoomValue">100%</span>
                  <button type="button" class="erd-tool-icon" id="erdBtnZoomIn" title="Zoom in">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </button>
                  <div class="erd-toolbar-sep"></div>
                  <button type="button" class="erd-tool-icon" id="erdBtnReset" title="Reset Zoom">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                      <path d="M3 3v5h5"/>
                    </svg>
                  </button>
                  <div class="erd-toolbar-sep"></div>
                  <button type="button" class="erd-tool-icon" id="erdBtnExpand" title="Full screen view popup">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="15 3 21 3 21 9"/>
                      <polyline points="9 21 3 21 3 15"/>
                      <line x1="21" y1="3" x2="14" y2="10"/>
                      <line x1="3" y1="21" x2="10" y2="14"/>
                    </svg>
                  </button>
                </div>

                <!-- Canvas Viewport -->
                <div class="erd-canvas-viewport" id="erdCanvasViewport">
                  <div class="erd-canvas-status" id="erdStatusText">Drag to pan &middot; 100%</div>
                  <div class="erd-canvas-surface" id="erdCanvasSurface">
                    <div class="erd-diagram-wrapper" id="erdDiagramContainer">
{svg_markup}
                    </div>
                  </div>
                </div>
              </div>
            </div>"""

erd_modal_markup = """
    <!-- ==========================================
         ERD FULLSCREEN POPUP MODAL
         ========================================== -->
    <div class="erd-fullscreen-modal" id="erdFullscreenModal" role="dialog" aria-modal="true" style="display: none;">
      <div class="erd-modal-window">
        <!-- Modal Header -->
        <div class="erd-modal-header">
          <div class="erd-modal-title-group">
            <div class="erd-modal-icon-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
            </div>
            <div>
              <h2 class="erd-modal-title" id="erdModalTitle">Data Model (ERD) — Salon Management Database</h2>
              <p class="erd-modal-subtitle">Interactive Relational Schema &middot; One-to-Many &amp; One-to-One Relationships &middot; Hand tool aktif</p>
            </div>
          </div>

          <!-- Modal Toolbar & Close -->
          <div class="erd-modal-actions">
            <button type="button" class="erd-tool-icon" id="erdModalBtnZoomOut" title="Zoom out">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <span class="erd-zoom-text" id="erdModalZoomValue">100%</span>
            <button type="button" class="erd-tool-icon" id="erdModalBtnZoomIn" title="Zoom in">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <div class="erd-toolbar-sep"></div>
            <button type="button" class="erd-tool-icon" id="erdModalBtnReset" title="Reset Zoom">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            </button>
            <div class="erd-toolbar-sep"></div>
            <button type="button" class="erd-btn-close-modal" id="btnErdModalClose" title="Tutup Fullscreen (Esc)" onclick="if(window.closeErdModal){window.closeErdModal();}else{document.getElementById('erdFullscreenModal').style.display='none';}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Canvas Body -->
        <div class="erd-modal-body" id="erdModalViewport">
          <div class="erd-modal-surface" id="erdModalSurface"></div>
          <div class="erd-modal-footer-pill">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
              <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
              <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
            </svg>
            <span>Hand Tool Aktif &middot; Drag canvas untuk menggeser &middot; Scroll wheel untuk zoom &middot; Tekan Esc untuk keluar</span>
          </div>
        </div>
      </div>
    </div>
"""

# Update workspace.html
with open("workspace.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace docPanelErd
erd_pattern = re.compile(r'<div class="doc-panel-section" id="docPanelErd">[\s\S]*?</div>\s*</div>\s*</div>\s*(?=<div class="doc-panel-section" id="docPanelTechDesign">)', re.MULTILINE)
if erd_pattern.search(content):
    content = erd_pattern.sub(erd_panel_content + "\n", content, count=1)
    print("Replaced docPanelErd in workspace.html with regex")
else:
    # Alternative replace
    target = """            <div class="doc-panel-section" id="docPanelErd">"""
    print("Trying substring replace for docPanelErd in workspace.html")
    start_pos = content.find(target)
    if start_pos != -1:
        end_pos = content.find("""<div class="doc-panel-section" id="docPanelTechDesign">""", start_pos)
        if end_pos != -1:
            content = content[:start_pos] + erd_panel_content + "\n" + content[end_pos:]
            print("Successfully replaced docPanelErd by index range in workspace.html")

# Insert erdFullscreenModal before archFullscreenModal
if 'id="erdFullscreenModal"' not in content:
    arch_pos = content.find('<!-- ==========================================\n         ARCHITECTURE FULLSCREEN POPUP MODAL')
    if arch_pos != -1:
        content = content[:arch_pos] + erd_modal_markup + "\n    " + content[arch_pos:]
        print("Inserted erdFullscreenModal into workspace.html")

with open("workspace.html", "w", encoding="utf-8") as f:
    f.write(content)

# Update workspace_f6e.html
with open("workspace_f6e.html", "r", encoding="utf-8") as f:
    f6e_content = f.read()

start_pos = f6e_content.find("""<div class="doc-panel-section" id="docPanelErd">""")
if start_pos != -1:
    end_pos = f6e_content.find("""<div class="doc-panel-section" id="docPanelTechDesign">""", start_pos)
    if end_pos != -1:
        f6e_content = f6e_content[:start_pos] + erd_panel_content + "\n" + f6e_content[end_pos:]
        print("Successfully replaced docPanelErd by index range in workspace_f6e.html")

if 'id="erdFullscreenModal"' not in f6e_content:
    arch_pos = f6e_content.find('<!-- ==========================================\n         ARCHITECTURE FULLSCREEN POPUP MODAL')
    if arch_pos != -1:
        f6e_content = f6e_content[:arch_pos] + erd_modal_markup + "\n    " + f6e_content[arch_pos:]
        print("Inserted erdFullscreenModal into workspace_f6e.html")

with open("workspace_f6e.html", "w", encoding="utf-8") as f:
    f6e_content = f6e_content.replace('css/documents.css?v=21', 'css/documents.css?v=22')
    f6e_content = f6e_content.replace('js/workspace.js?v=21', 'js/workspace.js?v=22')
    f.write(f6e_content)

print("Applied ERD panel and modal updates successfully!")
