import re

with open(r'd:\intern\zenit_redesign\workspace.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the buttons to use inline onclick handlers
old_buttons = """              <div style="display: flex; gap: 8px;">
                <button type="button" class="btn-doc-mode active" id="btnPreviewMode" style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 6px; border: none; background: #e2e8f0; color: var(--text-primary, #1e293b); font-weight: 500; font-size: 13px; cursor: pointer;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  Preview
                </button>
                <button type="button" class="btn-doc-mode" id="btnEditMode" style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 6px; border: none; background: transparent; color: var(--text-secondary, #64748b); font-weight: 500; font-size: 13px; cursor: pointer; transition: background 0.2s;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  Edit
                </button>
              </div>"""

new_buttons = """              <div style="display: flex; gap: 8px;">
                <button type="button" class="btn-doc-mode active" id="btnPreviewMode" onclick="document.getElementById('docEditSidebar').style.display='none'; this.classList.add('active'); this.style.background='#e2e8f0'; this.style.color='var(--text-primary)'; document.getElementById('btnEditMode').classList.remove('active'); document.getElementById('btnEditMode').style.background='transparent'; document.getElementById('btnEditMode').style.color='var(--text-secondary)';" style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 6px; border: none; background: #e2e8f0; color: var(--text-primary, #1e293b); font-weight: 500; font-size: 13px; cursor: pointer;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  Preview
                </button>
                <button type="button" class="btn-doc-mode" id="btnEditMode" onclick="document.getElementById('docEditSidebar').style.display='flex'; this.classList.add('active'); this.style.background='#e2e8f0'; this.style.color='var(--text-primary)'; document.getElementById('btnPreviewMode').classList.remove('active'); document.getElementById('btnPreviewMode').style.background='transparent'; document.getElementById('btnPreviewMode').style.color='var(--text-secondary)';" style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 6px; border: none; background: transparent; color: var(--text-secondary, #64748b); font-weight: 500; font-size: 13px; cursor: pointer; transition: background 0.2s;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  Edit
                </button>
              </div>"""

content = content.replace(old_buttons, new_buttons)

# 2. Update docPanelPrd styling so it's not empty/plain
old_doc_panel = """            <!-- PANEL 1: PRD Document (Markdown style) -->
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
            </div>"""

new_doc_panel = """            <!-- PANEL 1: PRD Document (Markdown style) -->
            <div class="doc-panel-section active" id="docPanelPrd" style="background-color: #f1f5f9; padding: 40px 0; height: 100%; width: 100%; display: flex; justify-content: center; overflow-y: auto; flex: 1; box-sizing: border-box;">
              <div style="background: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); width: 850px; max-width: 90%; padding: 60px 80px; margin-bottom: 40px; height: max-content; color: var(--text-primary, #1e293b); font-family: 'Inter', system-ui, sans-serif; box-sizing: border-box;">
                <h1 style="font-size: 32px; font-weight: 800; margin-bottom: 32px; color: #0f172a; line-height: 1.3; letter-spacing: -0.02em;">Module Explanation — Foundation & System Administration</h1>
                
                <h2 style="font-size: 22px; font-weight: 700; margin-top: 40px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; color: #1e293b;">1. Overview Modul</h2>
                <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; color: #334155;">
                  Bab ini menjelaskan ringkasan Foundation & System Administration, tujuan modul dalam ERP, serta posisinya dalam urutan implementasi sistem.
                </p>

                <h3 style="font-size: 18px; font-weight: 600; margin-top: 32px; margin-bottom: 16px; color: #1e293b;">1.1 Ringkasan Modul</h3>
                <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; color: #334155;">
                  Foundation & System Administration adalah modul fondasi ERP yang menyiapkan struktur dasar sistem sebelum modul transaksi digunakan. Modul ini berperan sebagai layer pengendali lintas proses agar seluruh modul ERP bekerja dengan referensi data, konfigurasi, kewenangan, dan histori perubahan yang konsisten.
                </p>

                <h3 style="font-size: 18px; font-weight: 600; margin-top: 32px; margin-bottom: 16px; color: #1e293b;">1.2 Tujuan Modul Dalam ERP</h3>
                <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; color: #334155;">
                  Tujuan modul Foundation & System Administration adalah memungkinkan PEPI/PAD menjalankan proses setup operasional ERP sebelum transaksi bisnis diproses. Melalui modul ini, user dapat membuat dan memelihara master data referensi, mengatur user dan role, menentukan permission dan authority, mengkonfigurasi approval serta notification, mencatat audit trail, dan mengelola parameter dasar sistem yang akan digunakan oleh proses customer / account management, sales, warehouse, logistics / delivery documentation, procurement, finance & accounting, integration, dashboard, dan reporting.
                </p>

                <h3 style="font-size: 18px; font-weight: 600; margin-top: 32px; margin-bottom: 16px; color: #1e293b;">1.3 Posisi Modul Dalam Urutan Implementasi</h3>
                <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; color: #334155;">
                  Foundation & System Administration dikembangkan pada tahap pertama dalam urutan implementasi ERP karena seluruh modul berikutnya membutuhkan master data referensi, konfigurasi sistem, akses user, role permission, approval rule, notification rule, dan audit trail yang sudah tersedia.
                </p>
              </div>
            </div>"""

content = content.replace(old_doc_panel, new_doc_panel)

# Update btnCloseEdit in the sidebar to use inline onclick
old_close = """<button type="button" id="btnCloseEdit" style="background: none; border: none; cursor: pointer; color: var(--text-secondary, #64748b); display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='transparent'">"""
new_close = """<button type="button" id="btnCloseEdit" onclick="document.getElementById('btnPreviewMode').click();" style="background: none; border: none; cursor: pointer; color: var(--text-secondary, #64748b); display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='transparent'">"""
content = content.replace(old_close, new_close)


with open(r'd:\intern\zenit_redesign\workspace.html', 'w', encoding='utf-8') as f:
    f.write(content)
