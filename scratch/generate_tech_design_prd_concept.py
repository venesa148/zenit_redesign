# coding: utf-8
import re

html_tech_design_panel = """            <!-- PANEL 4: Technical Design Panel (PRD Concept with Outline Navigation Tabs & Paper View) -->
            <div class="doc-panel-section" id="docPanelTechDesign">
              <style>
                .tech-outline-link:hover { background-color: #f1f5f9; }
                .tech-outline-link.active { color: #2563eb !important; font-weight: 600 !important; background-color: #eff6ff !important; }
                .tech-doc-paper table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px; border: 1px solid #e2e8f0; margin: 16px 0 24px 0; }
                .tech-doc-paper th { background-color: #f8fafc; padding: 10px 14px; border: 1px solid #e2e8f0; font-weight: 700; color: #0f172a; }
                .tech-doc-paper td { padding: 10px 14px; border: 1px solid #e2e8f0; vertical-align: top; color: #334155; line-height: 1.5; }
                .tech-doc-paper tr:hover td { background-color: #fbfcfe; }
                .tech-code-badge { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; background-color: #f1f5f9; color: #0f172a; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0; font-weight: 600; }
                .tech-pill-badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 999px; font-size: 11.5px; font-weight: 600; }
                .tech-pill-blue { background-color: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
                .tech-pill-green { background-color: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
                .tech-pill-amber { background-color: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
                .tech-pill-purple { background-color: #faf5ff; color: #7e22ce; border: 1px solid #e9d5ff; }
              </style>

              <div class="prd-doc-layout tech-doc-layout" style="display: flex; height: calc(100vh - 120px); overflow: hidden; position: relative;">
                <!-- Floating Toggle Button -->
                <button id="btnTechOutlineToggle" style="position: absolute; top: 16px; left: 16px; width: 36px; height: 36px; border-radius: 50%; background-color: #f1f5f9; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; color: #475569; display: none;" title="Buka Tab Dokumen">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>

                <!-- Document Outline Sidebar (Navigation Tabs) -->
                <div id="techOutlineSidebar" style="width: 260px; background-color: #ffffff; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; flex-shrink: 0; transition: margin-left 0.3s ease;">
                  <div style="padding: 16px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between;">
                    <button id="btnTechOutlineClose" style="background: none; border: none; cursor: pointer; color: #475569; padding: 4px; border-radius: 4px; display: flex; align-items: center;" title="Tutup Tab Dokumen">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                      </svg>
                    </button>
                    <span style="font-weight: 600; color: #334155; font-size: 14px;">Tab dokumen</span>
                    <button style="background: none; border: none; cursor: pointer; color: #475569;" title="Opsi Dokumen">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>

                  <div class="outline-nav-list" style="flex: 1; overflow-y: auto; padding: 12px 8px;">
                    <a href="#tech-h-title" class="outline-item" style="display: flex; align-items: center; padding: 8px 12px; border-radius: 6px; background-color: #dbeafe; color: #1e3a8a; text-decoration: none; font-size: 13px; font-weight: 500; margin-bottom: 4px;">
                      <svg style="margin-right: 8px;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                      <span style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Technical Design</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </a>

                    <div style="border-left: 2px solid #e2e8f0; margin-left: 19px; padding-left: 12px; margin-top: 4px; display: flex; flex-direction: column; gap: 2px;">
                      <a href="#tech-h-title" class="tech-outline-link active" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Phase 2 — Design</a>
                      <a href="#tech-h-misi" class="tech-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">1. Ringkasan &amp; Misi Desain</a>
                      <a href="#tech-h-peran" class="tech-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">2. Peran Agent</a>
                      <a href="#tech-h-decisions" class="tech-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">3. Log Keputusan (&sect;DD)</a>
                      <a href="#tech-h-architecture" class="tech-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">4. Arsitektur &amp; Modul (&sect;A)</a>
                      <a href="#tech-h-database" class="tech-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">5. Model Data &amp; DB (&sect;B)</a>
                      <a href="#tech-h-security" class="tech-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">6. Keamanan &amp; Privasi (&sect;F)</a>
                      <a href="#tech-h-uiux" class="tech-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">7. Desain UI/UX (&sect;H–&sect;K)</a>
                    </div>
                  </div>
                </div>

                <!-- Paper Area -->
                <div id="techDocPaperContainer" class="doc-paper-container" style="background-color: #f1f5f9; padding: 16px 0 40px 0; height: 100%; overflow-y: auto; display: flex; justify-content: center; align-items: flex-start; flex: 1; scroll-behavior: smooth;">
                  <div class="doc-paper tech-doc-paper" style="background-color: #ffffff; width: 100%; max-width: 850px; padding: 60px 80px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); border: 1px solid #e2e8f0; border-radius: 4px; color: #334155; line-height: 1.6; font-size: 15px;">
                    
                    <!-- Cover / Header matching PDF Page 1 -->
                    <span id="tech-h-title" style="display: block; margin-top: -80px; padding-top: 80px;"></span>
                    <div style="font-size: 14px; font-weight: 700; color: #2563eb; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">GlowAura Salon &amp; Spa Platform</div>
                    <h1 style="font-size: 27px; font-weight: 800; color: #0f172a; margin-bottom: 12px; line-height: 1.3;">Dokumen Desain Teknis &amp; UI/UX (Phase 2 &mdash; Design)</h1>
                    <p style="font-size: 15px; color: #64748b; margin-bottom: 24px;">Spesifikasi Arsitektur, Keamanan, Model Data, dan Desain Antarmuka Sistem Manajemen Operational &amp; Booking GlowAura</p>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">

                    <!-- SECTION 1: Ringkasan Eksekutif & Misi Desain -->
                    <span id="tech-h-misi" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">1. Ringkasan Eksekutif &amp; Misi Desain</h2>
                    <p style="margin-bottom: 16px;">
                      Fase 2 (Design) dari platform GlowAura Salon &amp; Spa bertujuan mentransformasikan kebutuhan bisnis dari Phase 1 (PRD) menjadi cetak biru teknis dan antarmuka pengguna yang elegan, aman, terukur, dan siap diimplementasikan untuk layanan pemesanan serta manajemen perawatan kecantikan.
                    </p>

                    <ul style="margin-bottom: 20px; padding-left: 22px;">
                      <li style="margin-bottom: 10px;">
                        <strong>Misi Utama:</strong> Menghasilkan rancangan teknis terverifikasi (arsitektur modular, model data pelanggan &amp; reservasi, spesifikasi API integrasi pembayaran, serta keamanan data PII), sistem desain UI/UX bertema salon &amp; spa yang intuitif, serta sprint backlog terukur berbasis stack teknologi modern.
                      </li>
                      <li style="margin-bottom: 10px;">
                        <strong>Alur Kerja Fase 2:</strong>
                      </li>
                    </ul>

                    <!-- Flow Card Diagram matching PDF Page 1 -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 190px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px 12px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                          <div style="font-weight: 700; color: #1e293b; font-size: 13.5px;">[Technical Architecture]</div>
                          <div style="font-size: 12px; color: #2563eb; font-weight: 600; margin-top: 5px;">Software &amp; Cloud Architect</div>
                          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">(System Design &amp; Data)</div>
                        </div>
                        <div style="color: #94a3b8; font-weight: bold; font-size: 18px;">&rarr;</div>
                        <div style="flex: 1; min-width: 190px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px 12px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                          <div style="font-weight: 700; color: #1e293b; font-size: 13.5px;">[UI/UX Beauty Design]</div>
                          <div style="font-size: 12px; color: #ec4899; font-weight: 600; margin-top: 5px;">UI/UX Specialist</div>
                          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">(Spa &amp; Salon Experience)</div>
                        </div>
                        <div style="color: #94a3b8; font-weight: bold; font-size: 18px;">&rarr;</div>
                        <div style="flex: 1; min-width: 190px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px 12px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                          <div style="font-weight: 700; color: #1e293b; font-size: 13.5px;">[Sprint &amp; Backlog Planning]</div>
                          <div style="font-size: 12px; color: #059669; font-weight: 600; margin-top: 5px;">Tech Lead &amp; Project Manager</div>
                          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">(Execution Roadmap)</div>
                        </div>
                      </div>
                    </div>

                    <p style="margin-bottom: 24px;">
                      Setiap komponen dalam rancangan ini dipastikan memiliki ketertelusuran (<em>traceability</em>) langsung ke persyaratan fungsi dan non-fungsi bisnis GlowAura Salon &amp; Spa.
                    </p>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 36px 0;">

                    <!-- SECTION 2: Peran Agent & Tanggung Jawab -->
                    <span id="tech-h-peran" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">2. Peran Agent &amp; Tanggung Jawab</h2>
                    <p style="margin-bottom: 16px;">
                      Struktur eksekusi perancangan Fase 2 GlowAura dibagi berdasarkan spesialisasi domain teknis &amp; operasional:
                    </p>

                    <ul style="margin-bottom: 24px; padding-left: 22px;">
                      <li style="margin-bottom: 10px;">
                        <strong>Software Architect (Owner):</strong> Memimpin penyusunan arsitektur sistem, pemodelan data pelanggan/jadwal, serta spesifikasi API/kontrak integrasi gateway pembayaran.
                      </li>
                      <li style="margin-bottom: 10px;">
                        <strong>Security &amp; Privacy Specialist:</strong> Merancang skema perlindungan PII pelanggan, enkripsi data riwayat perawatan, threat model, serta mitigasi kebocoran informasi pribadi.
                      </li>
                      <li style="margin-bottom: 10px;">
                        <strong>UI/UX Designer (Beauty &amp; Wellness):</strong> Memimpin pembuatan design system &ldquo;GlowAura Visual Theme&rdquo;, alur pemesanan jadwal praktis, dan antarmuka manajemen kasir/terapis.
                      </li>
                      <li style="margin-bottom: 10px;">
                        <strong>Tech Lead / Scrum Master:</strong> Mengelola estimasi kerja, backlog fitur pemesanan &amp; inventaris produk salon, serta menyusun kriteria rilis (<em>Definition of Done</em>).
                      </li>
                      <li style="margin-bottom: 10px;">
                        <strong>Cloud Infrastructure Engineer:</strong> Merancang topologi penyiapan server, optimasi biaya operasional cloud, serta penyaluran continuous integration/deployment (CI/CD).
                      </li>
                    </ul>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 36px 0;">

                    <!-- SECTION 3: Log Keputusan Desain Utama (§DD) -->
                    <span id="tech-h-decisions" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">3. Log Keputusan Desain Utama (&sect;DD Design Decisions)</h2>
                    
                    <div style="overflow-x: auto;">
                      <table>
                        <thead>
                          <tr>
                            <th style="width: 105px;">Kode DD</th>
                            <th style="width: 160px;">Area Fokus</th>
                            <th>Keputusan Desain Utama</th>
                            <th>Rasional &amp; Dampak Teknis</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><span class="tech-code-badge" style="color: #2563eb; background: #eff6ff; border-color: #bfdbfe;">DD-GA-01</span></td>
                            <td><strong>Engine AI Recommendations</strong></td>
                            <td>Mengintegrasikan AI Recommendation Agent untuk analisis preferensi treatment dan rekomendasi produk pasca-spa.</td>
                            <td>Meningkatkan personalisasi layanan serta penjualan silang (<em>cross-selling</em>) produk perawatan rumah.</td>
                          </tr>
                          <tr>
                            <td><span class="tech-code-badge" style="color: #2563eb; background: #eff6ff; border-color: #bfdbfe;">DD-GA-02</span></td>
                            <td><strong>Sistem Otentikasi</strong></td>
                            <td>Otentikasi multi-peran (Pelanggan via OTP/Social Login, Terapis/Kasir via PIN/Credential Khusus).</td>
                            <td>Memudahkan akses pemesanan bagi pelanggan sekaligus menjaga keamanan operasional kasir &amp; staf internal.</td>
                          </tr>
                          <tr>
                            <td><span class="tech-code-badge" style="color: #2563eb; background: #eff6ff; border-color: #bfdbfe;">DD-GA-03</span></td>
                            <td><strong>Manajemen Reservasi</strong></td>
                            <td>Mesin alokasi jadwal terapis &amp; ruangan otomatis dengan penguncian slot sementara (<em>hold 10 menit</em>).</td>
                            <td>Mencegah jadwal bentrok (<em>double-booking</em>) dan optimasi kapasitas ruangan spa secara real-time.</td>
                          </tr>
                          <tr>
                            <td><span class="tech-code-badge" style="color: #2563eb; background: #eff6ff; border-color: #bfdbfe;">DD-GA-04</span></td>
                            <td><strong>Privasi Pelanggan</strong></td>
                            <td>Enkripsi kolom data PII (AES-256) dan anonimisasi data sensitif alergi/kondisi kulit untuk pengolahan analitik.</td>
                            <td>Menjamin kepatuhan aturan privasi data pribadi dan kenyamanan privasi pengunjung spa.</td>
                          </tr>
                          <tr>
                            <td><span class="tech-code-badge" style="color: #2563eb; background: #eff6ff; border-color: #bfdbfe;">DD-GA-05</span></td>
                            <td><strong>Arsitektur Aplikasi</strong></td>
                            <td>Arsitektur Modular Monolith (Fastify API, React SPA Admin Dashboard, &amp; React Native Mobile App).</td>
                            <td>Efisien dalam pemeliharaan sistem cabang salon tanpa overhead microservices yang tidak diperlukan.</td>
                          </tr>
                          <tr>
                            <td><span class="tech-code-badge" style="color: #2563eb; background: #eff6ff; border-color: #bfdbfe;">DD-GA-06</span></td>
                            <td><strong>Payment Gateway</strong></td>
                            <td>Integrasi multi-channel payment (QRIS, E-Wallet, Credit Card, &amp; Pay at Salon).</td>
                            <td>Proses transaksi lancar dengan konfirmasi status pembayaran otomatis via webhook terenkripsi.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 36px 0;">

                    <!-- SECTION 4: Arsitektur Sistem & Spesifikasi Modul (§A) -->
                    <span id="tech-h-architecture" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">4. Arsitektur Sistem &amp; Spesifikasi Modul (&sect;A)</h2>
                    
                    <h4 style="font-size: 15.5px; font-weight: 700; color: #1e293b; margin-top: 16px; margin-bottom: 10px;">Stack Teknologi Inti GlowAura</h4>
                    <ul style="margin-bottom: 20px; padding-left: 22px;">
                      <li style="margin-bottom: 6px;"><strong>Backend API:</strong> Node.js v20 LTS, Fastify Framework (TypeScript)</li>
                      <li style="margin-bottom: 6px;"><strong>Frontend &amp; Mobile:</strong> React v18 (Admin Dashboard) &amp; React Native / Expo (Aplikasi Pelanggan)</li>
                      <li style="margin-bottom: 6px;"><strong>Database &amp; Cache:</strong> PostgreSQL v16 (RLS Aktif) &amp; Redis (Queue &amp; Slot Locking)</li>
                      <li style="margin-bottom: 6px;"><strong>Queue Engine:</strong> BullMQ / Redis-based Job Queue untuk notifikasi pengingat &amp; sinkronisasi inventaris</li>
                      <li style="margin-bottom: 6px;"><strong>Infrastruktur:</strong> Docker Containerization, Nginx Reverse Proxy, Jenkins / GitHub Actions CI/CD Pipeline</li>
                    </ul>

                    <h4 style="font-size: 15.5px; font-weight: 700; color: #1e293b; margin-top: 24px; margin-bottom: 10px;">Komponen Pemrosesan Khusus</h4>
                    <ol style="margin-bottom: 20px; padding-left: 22px;">
                      <li style="margin-bottom: 8px;">
                        <strong>Scheduler &amp; Allocation Engine:</strong> Memproses ketersediaan jadwal terapis, alokasi bed/ruangan spa, serta penanganan konflik reservasi secara otomatis.
                      </li>
                      <li style="margin-bottom: 8px;">
                        <strong>AI Beauty Assistant Agent:</strong> Menganalisis preferensi perawatan masa lalu dan kondisi alergi pelanggan untuk memberikan rekomendasi perawatan yang dipersonalisasi.
                      </li>
                      <li style="margin-bottom: 8px;">
                        <strong>POS &amp; Payment Service:</strong> Mengelola transaksi pembayaran langsung di salon, voucher diskon, poin loyaltas, dan diterbitkannya struk digital.
                      </li>
                    </ol>

                    <h4 style="font-size: 15.5px; font-weight: 700; color: #1e293b; margin-top: 24px; margin-bottom: 12px;">Daftar Modul Utama (Modular Monolith)</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 12px; margin-bottom: 24px;">
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                        <span class="tech-code-badge" style="color: #0369a1; background: #e0f2fe;">mod-pelanggan</span>
                        <p style="font-size: 13px; color: #475569; margin-top: 6px; margin-bottom: 0;">Pengelolaan profil pelanggan, preferensi perawatan, dan riwayat alergi.</p>
                      </div>
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                        <span class="tech-code-badge" style="color: #0369a1; background: #e0f2fe;">mod-reservasi</span>
                        <p style="font-size: 13px; color: #475569; margin-top: 6px; margin-bottom: 0;">Pengaturan jadwal booking, pemilihan terapis/ruangan, dan manajemen antrean.</p>
                      </div>
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                        <span class="tech-code-badge" style="color: #0369a1; background: #e0f2fe;">mod-layanan-katalog</span>
                        <p style="font-size: 13px; color: #475569; margin-top: 6px; margin-bottom: 0;">Manajemen menu perawatan salon &amp; spa, durasi, paket promo, dan harga.</p>
                      </div>
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                        <span class="tech-code-badge" style="color: #0369a1; background: #e0f2fe;">mod-terapis-staf</span>
                        <p style="font-size: 13px; color: #475569; margin-top: 6px; margin-bottom: 0;">Penjadwalan jam kerja staf, keahlian treatment, komisi, dan performa terapis.</p>
                      </div>
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                        <span class="tech-code-badge" style="color: #0369a1; background: #e0f2fe;">mod-pos-kasir</span>
                        <p style="font-size: 13px; color: #475569; margin-top: 6px; margin-bottom: 0;">Modul kasir transaksi onsite, pembayaran via QRIS/Card, serta integrasi printer thermal/e-receipt.</p>
                      </div>
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                        <span class="tech-code-badge" style="color: #0369a1; background: #e0f2fe;">mod-inventaris-produk</span>
                        <p style="font-size: 13px; color: #475569; margin-top: 6px; margin-bottom: 0;">Pengelolaan stok bahan salon (shampoo, minyak essensial, cream) dan retail skincare.</p>
                      </div>
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                        <span class="tech-code-badge" style="color: #0369a1; background: #e0f2fe;">mod-loyalty-rewards</span>
                        <p style="font-size: 13px; color: #475569; margin-top: 6px; margin-bottom: 0;">Program poin reward, tier keanggotaan (Silver, Gold, Platinum), dan voucher ulang tahun.</p>
                      </div>
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                        <span class="tech-code-badge" style="color: #0369a1; background: #e0f2fe;">mod-notifikasi-reminder</span>
                        <p style="font-size: 13px; color: #475569; margin-top: 6px; margin-bottom: 0;">Pengiriman pengingat reservasi via WhatsApp/Push Notification secara otomatis.</p>
                      </div>
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                        <span class="tech-code-badge" style="color: #0369a1; background: #e0f2fe;">mod-auth-audit</span>
                        <p style="font-size: 13px; color: #475569; margin-top: 6px; margin-bottom: 0;">Keamanan akses RBAC (Admin, Receptionist, Therapist, Customer) dan pencatatan audit trail.</p>
                      </div>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 36px 0;">

                    <!-- SECTION 5: Model Data & Skema Database (§B) -->
                    <span id="tech-h-database" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">5. Model Data &amp; Skema Database (&sect;B)</h2>
                    
                    <h4 style="font-size: 15.5px; font-weight: 700; color: #1e293b; margin-top: 16px; margin-bottom: 10px;">Strategi Pengelolaan Skema Database</h4>
                    <p style="margin-bottom: 16px;">
                      Manajemen migrasi basis data GlowAura menggunakan <strong>Drizzle ORM / Drizzle-kit</strong> dengan pola <em>expand/contract</em> aman, dijalankan otomatis dalam alur CI/CD untuk mencegah downtime pada sistem reservasi live.
                    </p>

                    <h4 style="font-size: 15.5px; font-weight: 700; color: #1e293b; margin-top: 24px; margin-bottom: 12px;">Entitas Inti &amp; Relasi Data GlowAura</h4>
                    <ul style="margin-bottom: 24px; padding-left: 22px;">
                      <li style="margin-bottom: 8px;">
                        <strong class="tech-code-badge">pelanggan &amp; profil_kulit_preferensi:</strong> Menyimpan identitas pelanggan, riwayat perawatan, jenis kulit/rambut, serta catatan sensitivitas bahan.
                      </li>
                      <li style="margin-bottom: 8px;">
                        <strong class="tech-code-badge">layanan &amp; kategori_layanan:</strong> Katalog perawatan salon, massage, facial, manicure-pedicure lengkap dengan harga dan durasi.
                      </li>
                      <li style="margin-bottom: 8px;">
                        <strong class="tech-code-badge">reservasi &amp; detail_reservasi:</strong> Menyimpan data pemesanan, jam booking, terapis yang bertugas, ruangan/bed spa, dan status (<em>Booked, In-Progress, Completed, Canceled</em>).
                      </li>
                      <li style="margin-bottom: 8px;">
                        <strong class="tech-code-badge">terapis &amp; jadwal_staf:</strong> Master data staf terapis, spesialisasi keahlian, shift kerja, dan status ketersediaan.
                      </li>
                      <li style="margin-bottom: 8px;">
                        <strong class="tech-code-badge">transaksi &amp; pembayaran:</strong> Rekam data invoice kasir, metode pembayaran, e-receipt, komisi terapis, serta penggunaan poin loyaltas.
                      </li>
                      <li style="margin-bottom: 8px;">
                        <strong class="tech-code-badge">inventaris_produk &amp; penggunaan_bahan:</strong> Pelacakan stok retail skincare serta konsumsi bahan operasional per treatment.
                      </li>
                      <li style="margin-bottom: 8px;">
                        <strong class="tech-code-badge">membership_points:</strong> Riwayat akumulasi &amp; penukaran poin rewards keanggotaan pelanggan.
                      </li>
                      <li style="margin-bottom: 8px;">
                        <strong class="tech-code-badge">audit_log:</strong> Catatan aktivitas perubahan data sensitif &amp; transaksi keuangan yang bersifat immutable (<em>append-only</em>).
                      </li>
                    </ul>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 36px 0;">

                    <!-- SECTION 6: Keamanan & Privasi (§F) -->
                    <span id="tech-h-security" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">6. Keamanan &amp; Privasi (&sect;F)</h2>
                    
                    <h4 style="font-size: 15.5px; font-weight: 700; color: #1e293b; margin-top: 16px; margin-bottom: 8px;">Prinsip Utama: Perlindungan Data Pelanggan &amp; Privasi Spa</h4>
                    <p style="margin-bottom: 16px;">
                      Data personal pelanggan serta catatan kondisi fisik/kulit terlindungi secara konfidensial. Rekomendasi sistem berstatus Saran Layanan dan keputusan akhir treatment selalu berada di tangan konsultasi terapis/konsultan kecantikan bersama pelanggan.
                    </p>

                    <h4 style="font-size: 15.5px; font-weight: 700; color: #1e293b; margin-top: 24px; margin-bottom: 12px;">Klasifikasi Data &amp; Strategi Proteksi GlowAura</h4>
                    <ul style="margin-bottom: 20px; padding-left: 22px;">
                      <li style="margin-bottom: 10px;">
                        <span class="tech-pill-badge tech-pill-blue">K1</span> <strong>Identitas Pelanggan / PII:</strong> Nama, Nomor Telepon/WhatsApp, Email.
                        <div style="font-size: 13px; color: #475569; margin-top: 2px;">Proteksi: Terenkripsi AES-256 pada database; akses dibatasi hanya untuk staf kasir/resepsionis sesuai kepentingan transaksi.</div>
                      </li>
                      <li style="margin-bottom: 10px;">
                        <span class="tech-pill-badge tech-pill-amber">K2</span> <strong>Data Preferensi &amp; Sensitivitas Kulit:</strong> Catatan alergi minyak/cream, riwayat perawatan medis sebelumnya.
                        <div style="font-size: 13px; color: #475569; margin-top: 2px;">Proteksi: Hanya dapat diakses oleh terapis yang ditugaskan pada jam reservasi yang bersangkutan via enkripsi TLS 1.3 in-transit.</div>
                      </li>
                      <li style="margin-bottom: 10px;">
                        <span class="tech-pill-badge tech-pill-purple">K3</span> <strong>Kredensial &amp; API Key Pembayaran:</strong> PIN Staf, Password, Merchant Key Payment Gateway.
                        <div style="font-size: 13px; color: #475569; margin-top: 2px;">Proteksi: Hashing password dengan Argon2id; rahasia sistem dikelola aman via secret manager cloud.</div>
                      </li>
                      <li style="margin-bottom: 10px;">
                        <span class="tech-pill-badge tech-pill-green">K4</span> <strong>Data Transaksi &amp; Inventaris:</strong> Rekap penjualan bulanan, stok bahan, audit trail kasir.
                        <div style="font-size: 13px; color: #475569; margin-top: 2px;">Proteksi: Penyimpanan terproteksi dengan kontrol hak akses berbasis peran (RBAC).</div>
                      </li>
                    </ul>

                    <h4 style="font-size: 15.5px; font-weight: 700; color: #1e293b; margin-top: 24px; margin-bottom: 10px;">Skema Autentikasi &amp; Akses Otorisasi</h4>
                    
                    <!-- Auth Flow Card Diagram matching PDF Page 5 -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 18px; font-family: ui-monospace, monospace; font-size: 12.5px; color: #1e293b;">
                      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 8px 12px; border-radius: 6px;">[ Mobile/Web Client ]</div>
                        <div style="color: #94a3b8; font-weight: bold;">&mdash;&gt;</div>
                        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 8px 12px; border-radius: 6px;">[ Fastify Gateway &amp; Auth ]</div>
                        <div style="color: #94a3b8; font-weight: bold;">&mdash;&gt;</div>
                        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 8px 12px; border-radius: 6px;">[ Role-Based Access (RBAC) ]</div>
                      </div>
                      <div style="margin: 8px 0; color: #94a3b8; text-align: center;">&darr; &uarr;</div>
                      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 8px 12px; border-radius: 6px;">[ E-Receipt / Response ]</div>
                        <div style="color: #94a3b8; font-weight: bold;">&lt;&mdash;</div>
                        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 8px 12px; border-radius: 6px;">[ PostgreSQL Engine ]</div>
                        <div style="color: #94a3b8; font-weight: bold;">&lt;&mdash;</div>
                        <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 8px 12px; border-radius: 6px;">[ Row-Level Security Policy ]</div>
                      </div>
                    </div>

                    <ul style="margin-bottom: 24px; padding-left: 22px;">
                      <li style="margin-bottom: 6px;">
                        <strong>Sesi Aman:</strong> Sesi pengguna diproteksi cookie <code>HttpOnly</code>, <code>Secure</code>, <code>SameSite=Lax</code> serta auto-logout setelah masa idle.
                      </li>
                      <li style="margin-bottom: 6px;">
                        <strong>Otorisasi Berlapis:</strong> Pemeriksaan hak akses dijalankan pada API Fastify dan diperketat melalui PostgreSQL Row-Level Security (RLS) untuk pemisahan tenant/cabang salon.
                      </li>
                    </ul>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 36px 0;">

                    <!-- SECTION 7: Desain UI/UX & Sistem Visual (§H–§K) -->
                    <span id="tech-h-uiux" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">7. Desain UI/UX &amp; Sistem Visual (&sect;H&ndash;&sect;K)</h2>
                    
                    <h4 style="font-size: 15.5px; font-weight: 700; color: #1e293b; margin-top: 16px; margin-bottom: 8px;">Tema Visual GlowAura (Warm &amp; Elegant Spa Experience)</h4>
                    <p style="margin-bottom: 18px;">
                      Antarmuka mengusung konsep <strong>Modern Luxe &amp; Calm Wellness</strong> yang memanfaatkan warna hangat pastel (<em>Rose Gold, Soft Beige, Warm Emerald</em>) untuk menghadirkan kenyamanan visual saat melakukan booking maupun pengelolaan operasional salon.
                    </p>

                    <h4 style="font-size: 15.5px; font-weight: 700; color: #1e293b; margin-top: 20px; margin-bottom: 14px;">Komponen Utama UI/UX GlowAura</h4>
                    <ol style="margin-bottom: 24px; padding-left: 22px;">
                      <li style="margin-bottom: 14px;">
                        <strong>Glow Booking Stepper (Interactive 4-Step Booking):</strong><br>
                        Komponen alur pemesanan mudah bagi pelanggan: <span class="tech-pill-badge tech-pill-blue">Pilih Layanan</span> &rarr; <span class="tech-pill-badge tech-pill-blue">Pilih Terapis &amp; Jam</span> &rarr; <span class="tech-pill-badge tech-pill-blue">Konfirmasi Add-on Skincare</span> &rarr; <span class="tech-pill-badge tech-pill-green">Pembayaran DP/Lunas</span>.
                      </li>
                      <li style="margin-bottom: 14px;">
                        <strong>Therapist Schedule &amp; Bed Occupancy Grid:</strong><br>
                        Visualisasi matriks real-time untuk resepsionis/kasir yang menampilkan ketersediaan ruangan spa, bed massage, dan status terapis yang sedang melayani.
                      </li>
                      <li style="margin-bottom: 14px;">
                        <strong>Beauty Profile &amp; Treatment History Card:</strong><br>
                        Ringkasan kartu digital berisi preferensi pelanggan, catatan alergi minyak aromaterapi, serta perawatan favorit untuk panduan terapis sebelum treatment dimulai.
                        <ul style="margin-top: 6px; padding-left: 20px;">
                          <li style="margin-bottom: 4px;"><strong>Rekomendasi AI Auto-Suggest:</strong> Menampilkan rekomendasi paket perawatan kombo yang relevan berdasarkan riwayat pelanggan.</li>
                          <li style="margin-bottom: 4px;"><strong>Input Catatan Terapis:</strong> Formulir ringkas pasca-layanan untuk mencatat kondisi kulit/rambut serta masukan perawatan lanjutan.</li>
                        </ul>
                      </li>
                      <li style="margin-bottom: 14px;">
                        <strong>Layout Mobile-First &amp; Cashier Responsive UI:</strong><br>
                        Antarmuka teroptimasi penuh untuk perangkat smartphone pelanggan dan tablet kasir/resepsionis tanpa memerlukan scroll horizontal yang menyulitkan.
                      </li>
                    </ol>

                    <div style="margin-top: 40px; padding: 20px; background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; font-size: 13.5px; text-align: center; color: #64748b;">
                      <em>Dokumen Desain Teknis &amp; UI/UX GlowAura disetujui &bull; Phase 2 &bull; Siap dilanjutkan ke tahap implementasi (Phase 3 &mdash; Build).</em>
                    </div>

                  </div>
                </div>

                <!-- Inline Navigation Script for Technical Design -->
                <script>
                  (function() {
                    function initTechOutline() {
                      const sidebar = document.getElementById('techOutlineSidebar');
                      const btnClose = document.getElementById('btnTechOutlineClose');
                      const btnToggle = document.getElementById('btnTechOutlineToggle');
                      const paperContainer = document.getElementById('techDocPaperContainer');

                      if (sidebar && btnClose && btnToggle) {
                        btnClose.addEventListener('click', function() {
                          sidebar.style.marginLeft = '-260px';
                          setTimeout(function() { btnToggle.style.display = 'flex'; }, 300);
                        });

                        btnToggle.addEventListener('click', function() {
                          btnToggle.style.display = 'none';
                          sidebar.style.marginLeft = '0';
                        });
                      }

                      const outlineLinks = document.querySelectorAll('.tech-outline-link');
                      if (paperContainer && outlineLinks.length > 0) {
                        paperContainer.addEventListener('scroll', function() {
                          let currentId = '';
                          const scrollPosition = paperContainer.scrollTop + 100;
                          document.querySelectorAll('.tech-doc-paper span[id^="tech-h-"]').forEach(function(span) {
                            if (span.offsetTop <= scrollPosition) {
                              currentId = span.getAttribute('id');
                            }
                          });
                          if (currentId) {
                            outlineLinks.forEach(function(link) {
                              link.classList.remove('active');
                              if (link.getAttribute('href') === '#' + currentId) {
                                link.classList.add('active');
                              }
                            });
                          }
                        });

                        outlineLinks.forEach(function(link) {
                          link.addEventListener('click', function(e) {
                            e.preventDefault();
                            const targetId = link.getAttribute('href').substring(1);
                            const targetEl = document.getElementById(targetId);
                            if (targetEl && paperContainer) {
                              paperContainer.scrollTo({ top: targetEl.offsetTop, behavior: 'smooth' });
                              outlineLinks.forEach(function(l) { l.classList.remove('active'); });
                              link.classList.add('active');
                            }
                          });
                        });
                      }
                    }

                    if (document.readyState === 'loading') {
                      document.addEventListener('DOMContentLoaded', initTechOutline);
                    } else {
                      initTechOutline();
                    }
                  })();
                </script>
              </div>
            </div>"""

print("HTML template prepared. Size:", len(html_tech_design_panel))
