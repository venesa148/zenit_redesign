import re

with open(r'd:\intern\zenit_redesign\workspace.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Insert docEditSidebar after doc-sidebar-pane
sidebar_end_marker = "        </aside>\n\n        <!-- Right Document Reader Pane -->"
edit_sidebar = """        </aside>

        <!-- Edit / Chat Sidebar (Hidden by default) -->
        <aside class="doc-edit-sidebar" id="docEditSidebar" style="display: none; width: 400px; border-right: 1px solid var(--border-color, #e2e8f0); background: #f8fafc; flex-direction: column; flex-shrink: 0;">
          <div style="padding: 16px; border-bottom: 1px solid var(--border-color, #e2e8f0); background: #ffffff; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; color: var(--text-primary, #1e293b);">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              AI Assistant Editor
            </div>
            <button type="button" id="btnCloseEdit" style="background: none; border: none; cursor: pointer; color: var(--text-secondary, #64748b);">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div style="flex: 1; padding: 16px; overflow-y: auto;">
            <!-- Dummy Chat interface -->
            <div style="margin-bottom: 16px; display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 12px; font-weight: 600; color: var(--text-secondary, #64748b);">User</span>
              <div style="background: #ffffff; border: 1px solid var(--border-color, #e2e8f0); padding: 12px; border-radius: 8px; font-size: 14px; color: var(--text-primary, #1e293b);">
                Tolong perbaiki bagian 1.2, buat lebih ringkas.
              </div>
            </div>
            <div style="margin-bottom: 16px; display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 12px; font-weight: 600; color: #3b82f6;">AI Agent</span>
              <div style="background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); padding: 12px; border-radius: 8px; font-size: 14px; color: var(--text-primary, #1e293b);">
                Baik, saya telah meringkas bagian 1.2 Tujuan Modul. Anda bisa melihat perubahannya di editor sebelah kanan.
              </div>
            </div>
          </div>
          <div style="padding: 16px; border-top: 1px solid var(--border-color, #e2e8f0); background: #ffffff;">
            <div style="display: flex; align-items: center; background: #f1f5f9; border-radius: 20px; padding: 8px 16px;">
              <input type="text" placeholder="Berikan instruksi edit..." style="flex: 1; border: none; background: transparent; outline: none; font-size: 14px;" />
              <button style="background: #3b82f6; color: white; border: none; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </aside>

        <!-- Right Document Reader Pane -->"""
content = content.replace(sidebar_end_marker, edit_sidebar)

# 2. Replace doc-header-top to docPanelArchitecture
start_marker = "            <!-- Top Header Bar -->"
end_marker = "            <!-- PANEL 2: Architecture Document Panel -->"

new_reader = """            <!-- Top Header Bar -->
            <header class="doc-header-top" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; border-bottom: 1px solid var(--border-color, #e2e8f0); background: #fafafa;">
              <div style="display: flex; gap: 8px;">
                <button type="button" class="btn-doc-mode active" id="btnPreviewMode" style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 6px; border: none; background: #e2e8f0; color: var(--text-primary, #1e293b); font-weight: 500; font-size: 13px; cursor: pointer;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  Preview
                </button>
                <button type="button" class="btn-doc-mode" id="btnEditMode" style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 6px; border: none; background: transparent; color: var(--text-secondary, #64748b); font-weight: 500; font-size: 13px; cursor: pointer; transition: background 0.2s;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  Edit
                </button>
              </div>
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--text-secondary, #64748b); opacity: 0.7;">
                /home/app/platform-data/projects/PRD-Foundation-System-Admin.md
              </div>
            </header>

            <!-- ==========================================
             DOCUMENT VIEW PANELS
             ========================================== -->

            <!-- PANEL 1: PRD Document (Markdown style) -->
            <div class="doc-panel-section active" id="docPanelPrd" style="padding: 40px; max-width: 800px; margin: 0 auto; color: var(--text-primary, #1e293b); overflow-y: auto; flex: 1;">
              <h1 style="font-size: 28px; font-weight: 700; margin-bottom: 24px; color: #1e293b; line-height: 1.3;">Module Explanation — Foundation & System Administration</h1>
              
              <h2 style="font-size: 20px; font-weight: 600; margin-top: 32px; margin-bottom: 16px; border-bottom: 1px solid var(--border-color, #e2e8f0); padding-bottom: 8px;">1. Overview Modul</h2>
              <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
                Bab ini menjelaskan ringkasan Foundation & System Administration, tujuan modul dalam ERP, serta posisinya dalam urutan implementasi sistem.
              </p>

              <h3 style="font-size: 17px; font-weight: 600; margin-top: 24px; margin-bottom: 12px;">1.1 Ringkasan Modul</h3>
              <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
                Foundation & System Administration adalah modul fondasi ERP yang menyiapkan struktur dasar sistem sebelum modul transaksi digunakan. Modul ini berperan sebagai layer pengendali lintas proses agar seluruh modul ERP bekerja dengan referensi data, konfigurasi, kewenangan, dan histori perubahan yang konsisten.
              </p>

              <h3 style="font-size: 17px; font-weight: 600; margin-top: 24px; margin-bottom: 12px;">1.2 Tujuan Modul Dalam ERP</h3>
              <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
                Tujuan modul Foundation & System Administration adalah memungkinkan PEPI/PAD menjalankan proses setup operasional ERP sebelum transaksi bisnis diproses. Melalui modul ini, user dapat membuat dan memelihara master data referensi, mengatur user dan role, menentukan permission dan authority, mengkonfigurasi approval serta notification, mencatat audit trail, dan mengelola parameter dasar sistem yang akan digunakan oleh proses customer / account management, sales, warehouse, logistics / delivery documentation, procurement, finance & accounting, integration, dashboard, dan reporting.
              </p>

              <h3 style="font-size: 17px; font-weight: 600; margin-top: 24px; margin-bottom: 12px;">1.3 Posisi Modul Dalam Urutan Implementasi</h3>
              <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
                Foundation & System Administration dikembangkan pada tahap pertama dalam urutan implementasi ERP karena seluruh modul berikutnya membutuhkan master data referensi, konfigurasi sistem, akses user, role permission, approval rule, notification rule, dan audit trail yang sudah tersedia.
              </p>
            </div>

"""
idx1 = content.find(start_marker)
idx2 = content.find(end_marker)
if idx1 != -1 and idx2 != -1:
    content = content[:idx1] + new_reader + content[idx2:]

with open(r'd:\intern\zenit_redesign\workspace.html', 'w', encoding='utf-8') as f:
    f.write(content)
