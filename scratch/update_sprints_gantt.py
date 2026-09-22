import re
import os

file_path = r'd:\intern\zenit_redesign\workspace.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to replace
pattern = re.compile(
    r'<!-- Gantt Table / Matrix -->.*?</div>\s*</div>\s*(?=<!-- \----------------------------------------\s*VIEW 3: DOCUMENTS)',
    re.DOTALL
)

new_html = """<!-- Gantt Table / Matrix -->
            <div id="ganttFullscreenContainer" class="pm-gantt-scrollable" style="transition: all 0.3s ease; background: white; z-index: 100;">
              <table class="pm-gantt-table">
                <thead>
                  <tr style="background: #f8fafc;">
                    <th class="col-phase-label" style="min-width: 280px; border-bottom: 2px solid #e2e8f0; position: sticky; left: 0; background: #f8fafc; z-index: 10;">Sprint / Task</th>
                    <!-- Jan 2027 -->
                    <th class="col-month" colspan="6" style="text-align: center; border-left: 1px solid #e2e8f0; font-weight: 600; color: #1e293b; padding: 8px;">Januari 2027</th>
                    <!-- Feb 2027 -->
                    <th class="col-month" colspan="6" style="text-align: center; border-left: 1px solid #e2e8f0; font-weight: 600; color: #1e293b; padding: 8px;">Februari 2027</th>
                    <!-- Mar 2027 -->
                    <th class="col-month" colspan="6" style="text-align: center; border-left: 1px solid #e2e8f0; font-weight: 600; color: #1e293b; padding: 8px;">Maret 2027</th>
                  </tr>
                  <tr style="font-size: 11px; color: #64748b; background: #f1f5f9;">
                    <th style="position: sticky; left: 0; background: #f1f5f9; z-index: 10; border-bottom: 1px solid #e2e8f0;"></th>
                    <!-- Jan Days -->
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">1-5</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">6-10</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">11-15</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">16-20</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">21-25</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">26-31</th>
                    <!-- Feb Days -->
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #cbd5e1;">1-5</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">6-10</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">11-15</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">16-20</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">21-25</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">26-28</th>
                    <!-- Mar Days -->
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #cbd5e1;">1-5</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">6-10</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">11-15</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">16-20</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">21-25</th>
                    <th style="padding: 4px; text-align: center; border-left: 1px solid #e2e8f0;">26-31</th>
                  </tr>
                </thead>
                <tbody id="ganttTbody">
                  <!-- JS Rendered -->
                </tbody>
              </table>
            </div>
          </div>

          <!-- Bottom Row: Phase Details Overview -->
          <div class="pm-phases-list">
            <div class="pm-tasks-header" style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
              <div class="pm-tasks-title-group" style="display: flex; align-items: baseline; gap: 12px;">
                <h2 class="pm-card-title" style="margin: 0; font-size: 20px; color: #1e293b;">Sprint Overview</h2>
                <span class="sprint-sub-name" style="color: #64748b; font-size: 14px; font-weight: 500;">(3 / 6 Selesai)</span>
              </div>
            </div>

            <div id="sprintOverviewRoot" style="display: flex; flex-direction: column; gap: 24px;">
              <!-- JS Rendered Sprints -->
            </div>
          </div>
          
          <script>
            const sprintData = [
              {
                id: 1,
                title: "Foundations",
                desc: "Keamanan dasar & bukti awal pembayaran digital",
                status: "Selesai",
                completed: 5,
                total: 5,
                start: 0,
                duration: 3,
                tasks: [
                  {text: "Kerangka dasar website salon dibuat (tampilan pelanggan & dasbor admin) dan disiapkan lingkungan server lokal yang terisolasi.", tag: "Frontend & Backend", start: 0, duration: 1},
                  {text: "Database dirancang dengan keamanan ketat — pelanggan hanya bisa melihat riwayat reservasinya sendiri, catatan kasir dan omzet salon terkunci rapat.", tag: "Backend", start: 0, duration: 1},
                  {text: "Akses login diamankan: pembatasan percobaan kata sandi staf, verifikasi nomor kontak untuk pelanggan, dan sesi otomatis keluar saat tidak aktif.", tag: "Backend", start: 1, duration: 1},
                  {text: "Tampilan visual dasar (halaman masuk, menu navigasi, kartu layanan perawatan, tombol booking) dibuat dengan tema warna salon yang bersih dan elegan.", tag: "Frontend", start: 1, duration: 1},
                  {text: "Uji coba integrasi pembayaran digital (QRIS) berhasil membuktikan bahwa sistem dapat menerima konfirmasi pembayaran lunas secara otomatis tanpa perlu cek rekening manual.", tag: "Backend", start: 2, duration: 1}
                ]
              },
              {
                id: 2,
                title: "Manajemen layanan, master kapster, reservasi jadwal & jejak transaksi",
                desc: "",
                status: "Selesai",
                completed: 5,
                total: 5,
                start: 3,
                duration: 4,
                tasks: [
                  {text: "Fitur kelola menu perawatan dan data kapster — admin bisa menambah, mengubah harga/durasi, serta mengatur jadwal kerja staf.", tag: "Backend", start: 3, duration: 2},
                  {text: "Alur reservasi mandiri oleh pelanggan — bisa pilih jenis perawatan, pilih kapster favorit, dan tentukan jam kedatangan.", tag: "Frontend & Backend", start: 4, duration: 2},
                  {text: "Sistem penguncian slot jadwal otomatis — mencegah dua pelanggan memesan kapster yang sama di jam yang bersamaan.", tag: "Backend", start: 5, duration: 1},
                  {text: "Manajemen akun kasir dan pelanggan — pengaturan profil, riwayat kunjungan, dan pembaruan data kontak.", tag: "Frontend & Backend", start: 5, duration: 2},
                  {text: "Jejak transaksi terekam otomatis — setiap pemesanan baru, pembatalan jadwal, atau pengubahan harga tercatat permanen tanpa bisa dimanipulasi.", tag: "Backend", start: 6, duration: 1}
                ]
              },
              {
                id: 3,
                title: "Integrasi pembayaran nyata, notifikasi otomatis, proteksi data & jalur uji coba",
                desc: "",
                status: "Selesai",
                completed: 5,
                total: 5,
                start: 7,
                duration: 4,
                tasks: [
                  {text: "Integrasi pembayaran QRIS dan transfer bank langsung — pelanggan menerima kode bayar instan saat reservasi selesai dibuat.", tag: "Backend", start: 7, duration: 2},
                  {text: "Notifikasi otomatis via WhatsApp dan Email — pengingat jadwal dan bukti bayar terkirim langsung ke pelanggan serta kasir.", tag: "Backend", start: 8, duration: 1},
                  {text: "Perlindungan privasi pelanggan — nomor telepon dan riwayat transaksi disamarkan pada tampilan umum kasir untuk menjaga kerahasiaan data.", tag: "Backend", start: 8, duration: 1},
                  {text: "Sistem pembatalan otomatis — slot jam otomatis dilepas kembali jika pelanggan tidak menyelesaikan pembayaran dalam batas waktu 15 menit.", tag: "Backend", start: 9, duration: 1},
                  {text: "Layar kasir diperbarui otomatis — status reservasi berubah menjadi 'Lunas' secara seketika tanpa perlu memuat ulang halaman.", tag: "Frontend & Backend", start: 10, duration: 1}
                ]
              },
              {
                id: 4,
                title: "Dasbor kasir, laporan omzet, riwayat pelanggan & persiapan rilis",
                desc: "",
                status: "Belum Tuntas",
                completed: 0,
                total: 5,
                start: 11,
                duration: 3,
                tasks: [
                  {text: "Dasbor kasir dan admin selesai penuh — kalender antrean harian, aksi konfirmasi kedatangan, dan penanganan pelanggan yang hadir langsung (walk-in).", tag: "Frontend & Backend", start: 11, duration: 2},
                  {text: "Rekap pendapatan dan performa salon — grafik omzet harian/bulanan, komisi kapster, serta daftar layanan yang paling laris.", tag: "Backend", start: 12, duration: 1},
                  {text: "Profil riwayat pelanggan terpadu — admin dan kasir bisa melihat catatan preferensi gaya rambut, riwayat perawatan terdahulu, dan total kunjungan.", tag: "Frontend & Backend", start: 12, duration: 1},
                  {text: "Portal mandiri pelanggan lengkap — bisa memantau status pesanan, mengubah jadwal (reschedule) sesuai batas waktu, dan mengunduh struk digital.", tag: "Frontend & Backend", start: 13, duration: 1},
                  {text: "Penyiapan jalur rilis resmi — konfigurasi server produksi dikunci dan pengujian otomatis dipasang agar website siap diluncurkan tanpa galat.", tag: "DevOps", start: 13, duration: 1}
                ]
              },
              {
                id: 5,
                title: "Uji coba sistem menyeluruh, ketahanan & keamanan data salon",
                desc: "",
                status: "Belum Tuntas",
                completed: 0,
                total: 5,
                start: 14,
                duration: 2,
                tasks: [
                  {text: "Pengujian beban dan kecepatan sistem — simulasi puluhan pelanggan memesan jadwal dan memindai QRIS secara serentak di jam sibuk tanpa ada sistem yang macet.", tag: "QA", start: 14, duration: 1},
                  {text: "Audit keamanan data dan hak akses — memastikan data pribadi pelanggan (nomor WhatsApp, riwayat transaksi) terlindungi dan staf tidak bisa melihat menu keuangan rahasia pemilik.", tag: "Security", start: 14, duration: 1},
                  {text: "Uji coba pencegahan jadwal bentrok ekstrem — verifikasi otomatis bahwa dua orang yang mengklik slot kapster yang sama di detik yang persis sama tidak akan menimbulkan reservasi ganda.", tag: "QA", start: 15, duration: 1},
                  {text: "Simulasi pemulihan data cadangan (backup & restore) — membuktikan data kasir dan jadwal yang hilang bisa dipulihkan utuh dalam hitungan menit jika server utama mengalami kendala.", tag: "DevOps", start: 15, duration: 1},
                  {text: "Penyiapan paket data uji coba dan panduan skenario pemesanan untuk sesi uji coba nyata bersama staf salon.", tag: "Business", start: 15, duration: 1}
                ]
              },
              {
                id: 6,
                title: "Uji coba langsung (UAT), pelatihan staf, perbaikan akhir & serah terima",
                desc: "",
                status: "Belum Tuntas",
                completed: 0,
                total: 5,
                start: 16,
                duration: 2,
                tasks: [
                  {text: "Uji coba nyata (User Acceptance Testing) bersama pemilik salon, kasir, dan kapster — mencoba alur reservasi, pembayaran QRIS, hingga cetak struk dari sudut pandang pemakai asli.", tag: "UAT", start: 16, duration: 1},
                  {text: "Penanganan dan perbaikan temuan akhir — merapikan tombol yang membingungkan atau kendala tampilan yang dilaporkan staf saat sesi uji coba.", tag: "Frontend & Backend", start: 16, duration: 1},
                  {text: "Penyusunan buku panduan penggunaan aplikasi — panduan ringkas cara kasir mengatur kalender jadwal, membatalkan pesanan, dan membaca rekap omzet harian.", tag: "Doc", start: 17, duration: 1},
                  {text: "Pelatihan operasional staf salon — sesi pengenalan sistem agar kasir dan kapster terbiasa mengelola antrean tanpa kendala di hari peluncuran.", tag: "Training", start: 17, duration: 1},
                  {text: "Serah terima resmi proyek — penandatanganan berita acara, penyerahan akses akun utama kepada pemilik salon, dan persiapan masuk ke operasional harian.", tag: "Business", start: 17, duration: 1}
                ]
              }
            ];

            function renderSprints() {
              const root = document.getElementById('sprintOverviewRoot');
              if (!root) return;
              
              let html = '';
              sprintData.forEach(sprint => {
                const isCompleted = sprint.status === "Selesai";
                const bgHeader = isCompleted ? '#f0fdf4' : '#f8fafc';
                const circleBg = isCompleted ? '#10b981' : '#fcd34d';
                const textStatus = isCompleted ? 'Selesai' : 'Belum Selesai';
                const statusColor = isCompleted ? '#059669' : '#d97706';
                const iconPath = isCompleted ? 
                  '<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' : 
                  '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';

                let tasksHtml = '';
                sprint.tasks.forEach((task, tIdx) => {
                  const taskChecked = tIdx < sprint.completed;
                  tasksHtml += `
                    <div style="display: flex; align-items: flex-start; gap: 16px; padding: 12px 16px; border-top: 1px solid #f1f5f9; background: white;">
                      <div style="padding-top: 2px;">
                        <input type="checkbox" disabled ${taskChecked ? 'checked' : ''} style="width: 16px; height: 16px; accent-color: #10b981;">
                      </div>
                      <div style="flex: 1; font-size: 14px; color: #475569; line-height: 1.5;">
                        ${task.text}
                      </div>
                      <div style="font-size: 12px; color: #94a3b8; background: #f8fafc; padding: 4px 8px; border-radius: 4px; border: 1px solid #e2e8f0; white-space: nowrap;">
                        ${task.tag}
                      </div>
                    </div>
                  `;
                });

                html += `
                  <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: white; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                    <div style="padding: 16px 20px; background: ${bgHeader}; display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
                      <div style="display: flex; align-items: center; gap: 16px;">
                        <div style="width: 32px; height: 32px; border-radius: 50%; background: ${circleBg}; color: white; display: flex; justify-content: center; align-items: center; font-weight: bold; font-size: 14px;">
                          ${sprint.id}
                        </div>
                        <div>
                          <div style="font-weight: 600; color: #1e293b; font-size: 16px;">${sprint.title}</div>
                          ${sprint.desc ? `<div style="font-size: 13px; color: #64748b; margin-top: 2px;">${sprint.desc}</div>` : ''}
                        </div>
                      </div>
                      <div style="display: flex; align-items: center; gap: 24px;">
                        <div style="display: flex; align-items: center; gap: 6px; color: ${statusColor}; font-weight: 500; font-size: 13px; background: white; padding: 4px 10px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05);">
                          <svg width="14" height="14" viewBox="0 0 24 24">${iconPath}</svg>
                          ${textStatus}
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; width: 140px;">
                          <span style="font-size: 13px; color: #64748b; font-weight: 500;">${sprint.completed}/${sprint.total}</span>
                          <div style="flex: 1; height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden;">
                            <div style="height: 100%; background: #10b981; width: ${(sprint.completed / sprint.total) * 100}%;"></div>
                          </div>
                        </div>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(90deg);"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </div>
                    </div>
                    <div style="display: block;">
                      ${tasksHtml}
                    </div>
                  </div>
                `;
              });
              root.innerHTML = html;
            }

            function renderGantt() {
              const tbody = document.getElementById('ganttTbody');
              if (!tbody) return;
              
              let html = '';
              const totalCols = 18; // 6 cols per month * 3 months
              
              sprintData.forEach((sprint, sIdx) => {
                const sColor = sprint.status === 'Selesai' ? '#10b981' : '#3b82f6';
                
                // Sprint Row
                html += `
                  <tr style="cursor: pointer; background: white;" onclick="toggleGanttSprint('sprint-child-${sIdx}')">
                    <td class="col-phase-label" style="position: sticky; left: 0; background: white; z-index: 5; font-weight: 600; color: #1e293b; padding: 12px 16px; border-bottom: 1px solid #f1f5f9;">
                      <span style="display:inline-block; margin-right: 8px;">+</span> S${sprint.id}: ${sprint.title.substring(0,25)}...
                    </td>
                `;
                for(let i=0; i<totalCols; i++) {
                  if (i === sprint.start) {
                    html += `<td colspan="${sprint.duration}" style="padding: 0 4px; border-bottom: 1px solid #f1f5f9; border-left: 1px solid #f1f5f9;"><div style="height: 12px; background: ${sColor}; border-radius: 6px; opacity: 0.8;"></div></td>`;
                    i += sprint.duration - 1;
                  } else {
                    html += `<td style="border-bottom: 1px solid #f1f5f9; border-left: 1px solid #f1f5f9;"></td>`;
                  }
                }
                html += `</tr>`;
                
                // Task Rows
                sprint.tasks.forEach((task, tIdx) => {
                  const tColor = tIdx < sprint.completed ? '#10b981' : '#cbd5e1';
                  html += `
                    <tr class="sprint-child-${sIdx}" style="display: none; background: #fafafa;">
                      <td class="col-phase-label" style="position: sticky; left: 0; background: #fafafa; z-index: 5; padding: 8px 16px 8px 32px; font-size: 12px; color: #475569; border-bottom: 1px solid #f1f5f9;">
                        - ${task.text.substring(0,35)}...
                      </td>
                  `;
                  for(let i=0; i<totalCols; i++) {
                    if (i === task.start) {
                      html += `<td colspan="${task.duration}" style="padding: 0 4px; border-bottom: 1px solid #f1f5f9; border-left: 1px solid #f1f5f9;"><div style="height: 8px; background: ${tColor}; border-radius: 4px;"></div></td>`;
                      i += task.duration - 1;
                    } else {
                      html += `<td style="border-bottom: 1px solid #f1f5f9; border-left: 1px solid #f1f5f9;"></td>`;
                    }
                  }
                  html += `</tr>`;
                });
              });
              
              tbody.innerHTML = html;
            }

            function toggleGanttSprint(className) {
              const rows = document.querySelectorAll('.' + className);
              rows.forEach(row => {
                row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
              });
            }

            // Fullscreen logic
            const btnFullscreen = document.getElementById('btnTimelineExpand');
            if (btnFullscreen) {
              btnFullscreen.addEventListener('click', () => {
                const container = document.getElementById('ganttFullscreenContainer');
                if (container) {
                  if (container.classList.contains('fullscreen')) {
                    container.classList.remove('fullscreen');
                    container.style.position = 'relative';
                    container.style.width = '100%';
                    container.style.height = 'auto';
                    container.style.top = 'auto';
                    container.style.left = 'auto';
                    container.style.padding = '0';
                    container.style.boxShadow = 'none';
                  } else {
                    container.classList.add('fullscreen');
                    container.style.position = 'fixed';
                    container.style.top = '20px';
                    container.style.left = '20px';
                    container.style.width = 'calc(100% - 40px)';
                    container.style.height = 'calc(100vh - 40px)';
                    container.style.padding = '20px';
                    container.style.borderRadius = '12px';
                    container.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                  }
                }
              });
            }

            renderSprints();
            renderGantt();
          </script>
"""

new_content = pattern.sub(new_html, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated workspace.html!")
