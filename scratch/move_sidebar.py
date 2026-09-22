import re

with open(r'd:\intern\zenit_redesign\workspace.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Remove lines 2280 to 2314 (0-indexed 2279 to 2313)
# But to be safe, let's find it dynamically
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if "<!-- Edit / Chat Sidebar (Hidden by default) -->" in line:
        start_idx = i
        break

if start_idx != -1:
    for i in range(start_idx, len(lines)):
        if "<!-- Right Document Reader Pane -->" in lines[i]:
            end_idx = i - 1
            break

if start_idx != -1 and end_idx != -1:
    del lines[start_idx:end_idx+1]
else:
    print("Could not find sidebar to delete")

# Find </main> of docViewContainer
# It should be before VIEW 4
insert_idx = -1
for i in range(len(lines)):
    if "VIEW 4: DEPLOYMENT (ENVIRONMENTS & CI/CD)" in lines[i]:
        # go back to find </main>
        for j in range(i, -1, -1):
            if "</main>" in lines[j]:
                insert_idx = j + 1
                break
        break

new_sidebar = """        <!-- Right Edit Sidebar (Hidden by default) -->
        <aside class="doc-edit-sidebar" id="docEditSidebar" style="display: none; width: 50%; border-left: 1px solid var(--border-color, #e2e8f0); background: #f8fafc; flex-direction: column; flex-shrink: 0; box-shadow: -4px 0 15px rgba(0,0,0,0.03); z-index: 10;">
          <div style="padding: 12px 24px; border-bottom: 1px solid var(--border-color, #e2e8f0); background: #ffffff; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 15px; color: var(--text-primary, #1e293b);">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              Document Editor
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <button type="button" style="background: #10b981; color: white; border: none; padding: 6px 16px; border-radius: 6px; font-weight: 500; font-size: 13px; cursor: pointer; transition: background 0.2s;">
                Save Changes
              </button>
              <button type="button" id="btnCloseEdit" style="background: none; border: none; cursor: pointer; color: var(--text-secondary, #64748b); display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='transparent'">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
          <div style="flex: 1; padding: 0; display: flex; flex-direction: column; overflow: hidden;">
            <textarea style="flex: 1; width: 100%; border: none; background: #ffffff; resize: none; outline: none; padding: 24px; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 14px; line-height: 1.6; color: #334155; box-sizing: border-box; overflow-y: auto;" spellcheck="false"># Module Explanation — Foundation & System Administration

## 1. Overview Modul
Bab ini menjelaskan ringkasan Foundation & System Administration, tujuan modul dalam ERP, serta posisinya dalam urutan implementasi sistem.

### 1.1 Ringkasan Modul
Foundation & System Administration adalah modul fondasi ERP yang menyiapkan struktur dasar sistem sebelum modul transaksi digunakan. Modul ini berperan sebagai layer pengendali lintas proses agar seluruh modul ERP bekerja dengan referensi data, konfigurasi, kewenangan, dan histori perubahan yang konsisten.

### 1.2 Tujuan Modul Dalam ERP
Tujuan modul Foundation & System Administration adalah memungkinkan PEPI/PAD menjalankan proses setup operasional ERP sebelum transaksi bisnis diproses. Melalui modul ini, user dapat membuat dan memelihara master data referensi, mengatur user dan role, menentukan permission dan authority, mengkonfigurasi approval serta notification, mencatat audit trail, dan mengelola parameter dasar sistem yang akan digunakan oleh proses customer / account management, sales, warehouse, logistics / delivery documentation, procurement, finance & accounting, integration, dashboard, dan reporting.

### 1.3 Posisi Modul Dalam Urutan Implementasi
Foundation & System Administration dikembangkan pada tahap pertama dalam urutan implementasi ERP karena seluruh modul berikutnya membutuhkan master data referensi, konfigurasi sistem, akses user, role permission, approval rule, notification rule, dan audit trail yang sudah tersedia.</textarea>
          </div>
        </aside>\n"""

if insert_idx != -1:
    lines.insert(insert_idx, new_sidebar)
    with open(r'd:\intern\zenit_redesign\workspace.html', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Success")
else:
    print("Could not find insertion point")
