# coding: utf-8
import re

tech_subtabs_bar_html = """            <!-- Sub-Navigation Tabs Bar (for Technical Design) -->
            <nav class="doc-sub-tabs-bar" id="techSubTabsBar" style="display: none;">
              <button type="button" class="doc-sub-tab-btn active" data-techsubtab="overview">Ringkasan</button>
              <button type="button" class="doc-sub-tab-btn" data-techsubtab="decisions">Keputusan Desain</button>
              <button type="button" class="doc-sub-tab-btn" data-techsubtab="architecture">Arsitektur Sistem</button>
              <button type="button" class="doc-sub-tab-btn" data-techsubtab="database">Skema Basis Data</button>
              <button type="button" class="doc-sub-tab-btn" data-techsubtab="api">Kontrak API</button>
              <button type="button" class="doc-sub-tab-btn" data-techsubtab="sequence">Alur Transaksi</button>
              <button type="button" class="doc-sub-tab-btn" data-techsubtab="security">Keamanan &amp; Infra</button>
              <button type="button" class="doc-sub-tab-btn" data-techsubtab="ui">UI Tokens</button>
              <button type="button" class="doc-sub-tab-btn" data-techsubtab="sprint">Sprint Backlog</button>
            </nav>"""

tech_panel_html = """            <!-- PANEL 4: Technical Design Panel -->
            <div class="doc-panel-section" id="docPanelTechDesign">
              <!-- SUBTAB 1: Ringkasan & Cetak Biru (Overview) -->
              <div class="tech-subtab-pane active" id="techSubtab-overview">
                <!-- Callout Quote Banner -->
                <div class="tech-callout-quote">
                  <div class="tech-callout-quote-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="tech-callout-quote-text">
                      &ldquo;Technical Design adalah cetak biru teknis lengkap yang menjelaskan bagaimana cara membangun sistem secara nyata, bukan lagi sekadar apa yang diinginkan bisnis.&rdquo;
                    </p>
                  </div>
                </div>

                <!-- Intro Header -->
                <div class="doc-summary-intro">
                  <h2 class="doc-section-headline">Phase 2 — Desain Teknis &amp; Cetak Biru Sistem: Website Salon &amp; Reservasi Perawatan</h2>
                  <p class="doc-section-desc">
                    Dokumen ini merinci arsitektur teknis, pemodelan basis data, kontrak antarmuka pemrograman aplikasi (API), tata kelola keamanan, pilihan desain visual, serta rencana pembagian kerja untuk <strong>GlowAura Salon &amp; Spa</strong>. Dokumen ini diturunkan langsung dari spesifikasi bisnis Phase 1.
                  </p>
                </div>

                <!-- Peran Tim & Tanggung Jawab -->
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <h3 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0;">Peran Tim &amp; Tanggung Jawab</h3>
                  <div class="prd-cards-grid">
                    <!-- software-architect -->
                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-purple">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 9 6 6"/><path d="m15 9-6 6"/>
                          </svg>
                        </div>
                        <div>
                          <h4 class="prd-card-title">software-architect</h4>
                          <span style="font-size: 0.7rem; color: #6366f1; font-weight: 600;">Pemilik Dokumen</span>
                        </div>
                      </div>
                      <p class="prd-card-content">
                        Bertanggung jawab atas desain arsitektur (Bagian A–E), model data, dan kontrak API.
                      </p>
                    </div>

                    <!-- security-architect -->
                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-amber">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                        </div>
                        <div>
                          <h4 class="prd-card-title">security-architect</h4>
                          <span style="font-size: 0.7rem; color: #b45309; font-weight: 600;">Keamanan &amp; Data Pribadi</span>
                        </div>
                      </div>
                      <p class="prd-card-content">
                        Memvalidasi model ancaman, perlindungan data pribadi pelanggan, dan kontrol akses (Bagian F).
                      </p>
                    </div>

                    <!-- ui-ux-designer -->
                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-blue">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/>
                          </svg>
                        </div>
                        <div>
                          <h4 class="prd-card-title">ui-ux-designer</h4>
                          <span style="font-size: 0.7rem; color: #1d4ed8; font-weight: 600;">Visual &amp; Antarmuka</span>
                        </div>
                      </div>
                      <p class="prd-card-content">
                        Merancang sistem visual, tata letak antarmuka, dan token warna Blush Elegance (Bagian H–K).
                      </p>
                    </div>

                    <!-- tech-lead / scrum master -->
                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-green">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/>
                          </svg>
                        </div>
                        <div>
                          <h4 class="prd-card-title">tech-lead / scrum master</h4>
                          <span style="font-size: 0.7rem; color: #15803d; font-weight: 600;">Sprint &amp; Mitigasi Risiko</span>
                        </div>
                      </div>
                      <p class="prd-card-content">
                        Menyusun estimasi waktu, pembagian sprint, dan mitigasi risiko teknis (Bagian L).
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Metrik & Status Proyek Callout -->
                <div class="tech-approval-banner">
                  <div>
                    <div class="tech-approval-title">STATUS: PHASE 2 DESIGN APPROVED — TIM SIAP MELANGKAH KE PEMBUATAN KODE (PHASE 3)</div>
                    <div class="tech-approval-sub">Target Eksekusi: 8 Minggu (6 Sprint) &bull; Arsitektur Modular Monolith &bull; Skala 1 Cabang (~800 booking/bulan)</div>
                  </div>
                  <span class="badge-doc-status-approved" style="padding: 0.4rem 0.9rem; font-size: 0.8rem;">Ready for Phase 3</span>
                </div>
              </div>

              <!-- SUBTAB 2: Catatan Keputusan Desain (Design Decisions / DD-n) -->
              <div class="tech-subtab-pane" id="techSubtab-decisions" style="display: none;">
                <div class="doc-summary-intro">
                  <h2 class="doc-section-headline">Catatan Keputusan Desain (Design Decisions / DD-n)</h2>
                  <p class="doc-section-desc">
                    Keputusan teknis kunci yang telah disepakati untuk menjamin integritas data, performa server, dan kenyamanan operasional kasir serta pelanggan.
                  </p>
                </div>

                <div class="tech-table-container">
                  <table class="tech-data-table">
                    <thead>
                      <tr>
                        <th style="width: 80px;">ID</th>
                        <th style="width: 100px;">Tanggal</th>
                        <th style="width: 250px;">Keputusan Teknis</th>
                        <th>Alasan &amp; Dampak</th>
                        <th style="width: 160px;">Diputuskan Oleh</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span class="tech-role-badge tech-role-architect">DD-1</span></td>
                        <td style="font-family: var(--font-mono), monospace; font-size: 0.775rem; color: #64748b;">2026-08-07</td>
                        <td><strong>Integrasi DP Midtrans Snap/Core API</strong> (QRIS dinamis + Virtual Account)</td>
                        <td>Memungkinkan verifikasi pembayaran masuk seketika melalui webhook tanpa membebani kasir.</td>
                        <td><span class="tech-role-badge tech-role-architect">software-architect</span></td>
                      </tr>
                      <tr>
                        <td><span class="tech-role-badge tech-role-security">DD-2</span></td>
                        <td style="font-family: var(--font-mono), monospace; font-size: 0.775rem; color: #64748b;">2026-08-07</td>
                        <td><strong>Autentikasi WhatsApp OTP</strong> (Fonnte/Waba) untuk pelanggan; email/password dengan enkripsi Argon2id untuk kasir dan pemilik</td>
                        <td>Pelanggan salon lebih cepat masuk tanpa mengingat sandi rumit; staf butuh pengamanan sesi kerja terpusat.</td>
                        <td><span class="tech-role-badge tech-role-security">security-architect</span></td>
                      </tr>
                      <tr>
                        <td><span class="tech-role-badge tech-role-architect">DD-3</span></td>
                        <td style="font-family: var(--font-mono), monospace; font-size: 0.775rem; color: #64748b;">2026-08-07</td>
                        <td><strong>Algoritma alokasi jadwal</strong> menggunakan penguncian transaksi basis data (Pessimistic Locking / <code>SELECT FOR UPDATE</code>) berdurasi 15 menit</td>
                        <td>Menghilangkan celah reservasi ganda (double booking) pada detik yang sama hingga 0%.</td>
                        <td><span class="tech-role-badge tech-role-architect">software-architect</span></td>
                      </tr>
                      <tr>
                        <td><span class="tech-role-badge tech-role-security">DD-4</span></td>
                        <td style="font-family: var(--font-mono), monospace; font-size: 0.775rem; color: #64748b;">2026-08-08</td>
                        <td><strong>Penyamaran data (masking)</strong> nomor kontak pelanggan di sisi peramban kasir umum (<code>0812****7890</code>); akses nomor lengkap hanya diizinkan untuk peran pemilik</td>
                        <td>Mencegah penyalahgunaan data pribadi pelanggan oleh staf operasional.</td>
                        <td><span class="tech-role-badge tech-role-security">security-architect</span></td>
                      </tr>
                      <tr>
                        <td><span class="tech-role-badge tech-role-architect">DD-5</span></td>
                        <td style="font-family: var(--font-mono), monospace; font-size: 0.775rem; color: #64748b;">2026-08-08</td>
                        <td><strong>Arsitektur monolit modular (modular monolith)</strong> berbasis Node.js/Fastify, React/TypeScript, dan PostgreSQL</td>
                        <td>Skala usaha salon (1 cabang, ~800 booking/bulan) sangat efisien dengan infrastruktur tunggal yang minim latensi dan hemat biaya sewa server.</td>
                        <td><span class="tech-role-badge tech-role-architect">software-architect</span></td>
                      </tr>
                      <tr>
                        <td><span class="tech-role-badge tech-role-lead">DD-6</span></td>
                        <td style="font-family: var(--font-mono), monospace; font-size: 0.775rem; color: #64748b;">2026-08-08</td>
                        <td><strong>Pengiriman pesan pengingat jadwal</strong> menggunakan antrean tugas (background worker) berbasis Redis/BullMQ</td>
                        <td>Mencegah antarmuka web melambat saat sistem mengirim pesan WhatsApp pengingat massal secara bersamaan.</td>
                        <td><span class="tech-role-badge tech-role-lead">tech-lead</span></td>
                      </tr>
                      <tr>
                        <td><span class="tech-role-badge tech-role-ui">DD-7</span></td>
                        <td style="font-family: var(--font-mono), monospace; font-size: 0.775rem; color: #64748b;">2026-08-09</td>
                        <td><strong>Tema tampilan Blush Elegance</strong> (latar pastel <code>#FFF8F8</code>, aksen primer mawar lembut <code>#D4838F</code>, kontras teks <code>#2D2627</code>)</td>
                        <td>Disetujui langsung oleh pemilik salon untuk menciptakan citra bersih, menenangkan, dan elegan.</td>
                        <td><span class="tech-role-badge tech-role-ui">ui-ux-designer</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- SUBTAB 3: Bagian A - Gambaran Arsitektur Sistem -->
              <div class="tech-subtab-pane" id="techSubtab-architecture" style="display: none;">
                <div class="doc-summary-intro">
                  <h2 class="doc-section-headline">Bagian A: Gambaran Arsitektur Sistem (Architecture Overview)</h2>
                  <p class="doc-section-desc">
                    Sistem dibangun sebagai satu kesatuan utuh (<em>modular monolith</em>) yang ringan, stabil, dan mudah dikelola tanpa kerumitan sistem terdistribusi.
                  </p>
                </div>

                <!-- 4-Tier Architecture Diagram Box -->
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: var(--radius-lg); padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                  <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #10b981;"></span>
                      <strong style="font-size: 0.9rem; color: #0f172a;">Topologi Sistem Utuh (End-to-End Topology)</strong>
                    </div>
                    <span class="tech-role-badge tech-role-architect">Modular Monolith</span>
                  </div>

                  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
                    <!-- Tier 1 -->
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
                      <div style="font-size: 0.75rem; font-weight: 700; color: #6366f1; text-transform: uppercase;">Tier 1: Client Peramban</div>
                      <div style="font-weight: 700; font-size: 0.85rem; color: #0f172a;">Web SPA / PWA</div>
                      <ul class="prd-card-bullets" style="margin-top: 0.25rem;">
                        <li>Layar Booking Pelanggan (Ponsel)</li>
                        <li>Kalender &amp; Kasir Walk-in (Tablet)</li>
                        <li>Dasbor Laporan Owner (Desktop)</li>
                      </ul>
                    </div>

                    <!-- Tier 2 -->
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
                      <div style="font-size: 0.75rem; font-weight: 700; color: #0284c7; text-transform: uppercase;">Tier 2: Jaringan &amp; Gateway</div>
                      <div style="font-weight: 700; font-size: 0.85rem; color: #0f172a;">HTTPS &amp; Nginx TLS</div>
                      <ul class="prd-card-bullets" style="margin-top: 0.25rem;">
                        <li>SSL/TLS Certificate Otomatis</li>
                        <li>Rate Limiting 3x per nomor WA</li>
                        <li>CORS &amp; Session Cookie Security</li>
                      </ul>
                    </div>

                    <!-- Tier 3 -->
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
                      <div style="font-size: 0.75rem; font-weight: 700; color: #8b5cf6; text-transform: uppercase;">Tier 3: Server Aplikasi</div>
                      <div style="font-weight: 700; font-size: 0.85rem; color: #0f172a;">Node.js + Fastify</div>
                      <ul class="prd-card-bullets" style="margin-top: 0.25rem;">
                        <li>Modul Akun, Katalog &amp; Staf</li>
                        <li>Modul Reservasi &amp; Kasir</li>
                        <li>BullMQ Background Worker</li>
                      </ul>
                    </div>

                    <!-- Tier 4 -->
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
                      <div style="font-size: 0.75rem; font-weight: 700; color: #10b981; text-transform: uppercase;">Tier 4: Storage &amp; External</div>
                      <div style="font-weight: 700; font-size: 0.85rem; color: #0f172a;">PostgreSQL &amp; API</div>
                      <ul class="prd-card-bullets" style="margin-top: 0.25rem;">
                        <li>12 Tabel Relasional (3NF + RLS)</li>
                        <li>Midtrans Snap &amp; QRIS Webhook</li>
                        <li>Gateway Notifikasi WhatsApp</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- 4 Komponen Utama Grid -->
                <div>
                  <h3 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0 0 0.75rem 0;">Detail 4 Komponen Sistem</h3>
                  <div class="prd-cards-grid">
                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-blue">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>
                          </svg>
                        </div>
                        <h4 class="prd-card-title">1. Frontend Web SPA</h4>
                      </div>
                      <p class="prd-card-content">
                        Menggunakan <strong>React + TypeScript + Vite</strong>. Responsif untuk peramban ponsel pelanggan (mobile booking) dan tablet kasir operasional.
                      </p>
                    </div>

                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-purple">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                          </svg>
                        </div>
                        <h4 class="prd-card-title">2. Backend Fastify API</h4>
                      </div>
                      <p class="prd-card-content">
                        Dibangun dengan <strong>Fastify (TypeScript)</strong> berkecepatan tinggi, validasi skema masukan ketat (<strong>Zod</strong>), dan pencatatan audit log transaksi (<strong>Pino Logger</strong>).
                      </p>
                    </div>

                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-green">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                          </svg>
                        </div>
                        <h4 class="prd-card-title">3. Penyimpanan Data PostgreSQL</h4>
                      </div>
                      <p class="prd-card-content">
                        <strong>PostgreSQL 16 Alpine</strong> dengan fitur <strong>Row-Level Security (RLS)</strong> aktif untuk membatasi akses isolasi data antar-peran (tamu, kasir, dan owner).
                      </p>
                    </div>

                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-amber">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                          </svg>
                        </div>
                        <h4 class="prd-card-title">4. Antrean Latar Belakang (Worker)</h4>
                      </div>
                      <p class="prd-card-content">
                        Menggunakan <strong>Redis + BullMQ</strong> untuk menjalankan pemeriksaan otomatis slot kedaluwarsa 15 menit dan pengiriman jadwal notifikasi pesan WhatsApp secara asinkron.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SUBTAB 4: Bagian B - Skema Basis Data & RLS -->
              <div class="tech-subtab-pane" id="techSubtab-database" style="display: none;">
                <div class="doc-summary-intro">
                  <h2 class="doc-section-headline">Bagian B: Model Data &amp; Skema Basis Data (Database Schema)</h2>
                  <p class="doc-section-desc">
                    Skema basis data dirancang dalam bentuk normal ketiga (3NF) guna mencegah redundansi data dan kesalahan kalkulasi pendapatan.
                  </p>
                </div>

                <!-- 7 Struktur Tabel Utama Grid -->
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <h3 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0;">7 Struktur Tabel Utama Relasional</h3>
                  <div class="prd-cards-grid">
                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <span class="erd-field-key erd-key-pk">TABEL 1</span>
                        <h4 class="prd-card-title">pengguna</h4>
                      </div>
                      <p class="prd-card-content">
                        Menyimpan akun kasir dan pemilik salon (email, sandi hash Argon2id, peran/role).
                      </p>
                    </div>

                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <span class="erd-field-key erd-key-pk">TABEL 2</span>
                        <h4 class="prd-card-title">pelanggan</h4>
                      </div>
                      <p class="prd-card-content">
                        Menyimpan profil tamu (nama, nomor WhatsApp, email, preferensi, riwayat alergi).
                      </p>
                    </div>

                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <span class="erd-field-key erd-key-pk">TABEL 3</span>
                        <h4 class="prd-card-title">kapster</h4>
                      </div>
                      <p class="prd-card-content">
                        Master data penata rambut, spesialisasi, jam kerja harian, dan hari libur mingguan.
                      </p>
                    </div>

                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <span class="erd-field-key erd-key-pk">TABEL 4</span>
                        <h4 class="prd-card-title">layanan</h4>
                      </div>
                      <p class="prd-card-content">
                        Daftar perawatan salon, kategori, harga resmi, dan durasi kerja (kelipatan 15 menit).
                      </p>
                    </div>

                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <span class="erd-field-key erd-key-pk">TABEL 5</span>
                        <h4 class="prd-card-title">reservasi</h4>
                      </div>
                      <p class="prd-card-content">
                        Menyimpan jadwal temu, penautan pelanggan-kapster-layanan, jam kedatangan, dan formula rambut.
                      </p>
                    </div>

                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <span class="erd-field-key erd-key-pk">TABEL 6</span>
                        <h4 class="prd-card-title">transaksi</h4>
                      </div>
                      <p class="prd-card-content">
                        Rincian biaya total, pembayaran DP via QRIS, sisa tagihan akhir, serta metode pelunasan kasir.
                      </p>
                    </div>

                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <span class="erd-field-key erd-key-pk">TABEL 7</span>
                        <h4 class="prd-card-title">audit_log</h4>
                      </div>
                      <p class="prd-card-content">
                        Catatan permanen sistem (siapa yang mengubah data, kapan terjadi, alasan, dan nilai sebelum/sesudah).
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Kebijakan Row-Level Security (RLS) -->
                <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
                  <h3 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0;">Kebijakan Keamanan Baris (Row-Level Security / RLS)</h3>
                  <div class="prd-cards-grid">
                    <div class="prd-box-card" style="border-left: 4px solid #6366f1;">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-indigo">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                          </svg>
                        </div>
                        <h4 class="prd-card-title">Peran Pelanggan</h4>
                      </div>
                      <p class="prd-card-content">
                        Hanya diizinkan melihat dan mengubah data reservasi yang terikat langsung dengan nomor akun/WhatsApp mereka sendiri.
                      </p>
                    </div>

                    <div class="prd-box-card" style="border-left: 4px solid #f59e0b;">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-amber">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                          </svg>
                        </div>
                        <h4 class="prd-card-title">Peran Kasir</h4>
                      </div>
                      <p class="prd-card-content">
                        Memiliki hak membaca semua reservasi hari berjalan dan membuat transaksi tamu baru; <em>dilarang keras mengakses tabel kalkulasi laba bersih bulanan</em>.
                      </p>
                    </div>

                    <div class="prd-box-card" style="border-left: 4px solid #10b981;">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-green">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <h4 class="prd-card-title">Peran Pemilik (Owner)</h4>
                      </div>
                      <p class="prd-card-content">
                        Memiliki hak penuh (<strong>Full Access</strong>) atas seluruh tabel, mutasi audit log, pembagian komisi, dan laporan pendapatan omzet salon.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SUBTAB 5: Bagian C - Desain Kontrak API -->
              <div class="tech-subtab-pane" id="techSubtab-api" style="display: none;">
                <div class="doc-summary-intro">
                  <h2 class="doc-section-headline">Bagian C: Desain Kontrak API (API Design)</h2>
                  <p class="doc-section-desc">
                    Seluruh komunikasi antarmuka menggunakan protokol HTTPS REST dengan format data JSON standar.
                  </p>
                </div>

                <div class="tech-table-container">
                  <table class="tech-data-table">
                    <thead>
                      <tr>
                        <th style="width: 80px;">Metode</th>
                        <th style="width: 230px;">Jalur Endpoint</th>
                        <th style="width: 140px;">Akses Peran</th>
                        <th>Fungsi &amp; Penjelasan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span class="api-method-badge api-method-post">POST</span></td>
                        <td><code class="api-endpoint-path">/api/auth/otp-minta</code></td>
                        <td><span class="tech-role-badge tech-role-ui">Publik</span></td>
                        <td>Mengirimkan kode OTP login ke nomor WhatsApp pelanggan.</td>
                      </tr>
                      <tr>
                        <td><span class="api-method-badge api-method-post">POST</span></td>
                        <td><code class="api-endpoint-path">/api/auth/otp-verifikasi</code></td>
                        <td><span class="tech-role-badge tech-role-ui">Publik</span></td>
                        <td>Memvalidasi OTP dan menerbitkan token sesi peramban.</td>
                      </tr>
                      <tr>
                        <td><span class="api-method-badge api-method-post">POST</span></td>
                        <td><code class="api-endpoint-path">/api/auth/staf-login</code></td>
                        <td><span class="tech-role-badge tech-role-ui">Publik</span></td>
                        <td>Pintu masuk kasir dan pemilik dengan verifikasi email dan sandi.</td>
                      </tr>
                      <tr>
                        <td><span class="api-method-badge api-method-get">GET</span></td>
                        <td><code class="api-endpoint-path">/api/layanan</code></td>
                        <td><span class="tech-role-badge tech-role-ui">Publik</span></td>
                        <td>Mengambil katalog daftar menu perawatan salon beserta harga dan durasi.</td>
                      </tr>
                      <tr>
                        <td><span class="api-method-badge api-method-get">GET</span></td>
                        <td><code class="api-endpoint-path">/api/kapster/slot-kosong</code></td>
                        <td><span class="tech-role-badge tech-role-ui">Publik</span></td>
                        <td>Memeriksa ketersediaan jam kosong kapster pada tanggal yang dipilih.</td>
                      </tr>
                      <tr>
                        <td><span class="api-method-badge api-method-post">POST</span></td>
                        <td><code class="api-endpoint-path">/api/reservasi/buat</code></td>
                        <td><span class="tech-role-badge tech-role-architect">Pelanggan</span></td>
                        <td>Mengunci sementara slot jam perawatan selama 15 menit.</td>
                      </tr>
                      <tr>
                        <td><span class="api-method-badge api-method-post">POST</span></td>
                        <td><code class="api-endpoint-path">/api/pembayaran/qris-dp</code></td>
                        <td><span class="tech-role-badge tech-role-architect">Pelanggan</span></td>
                        <td>Menerbitkan kode barcode QRIS resmi untuk pembayaran uang muka (30%).</td>
                      </tr>
                      <tr>
                        <td><span class="api-method-badge api-method-post">POST</span></td>
                        <td><code class="api-endpoint-path">/api/webhook/midtrans</code></td>
                        <td><span class="tech-role-badge tech-role-lead">Mesin Bank</span></td>
                        <td>Menerima sinyal uang masuk otomatis dari penyedia pembayaran.</td>
                      </tr>
                      <tr>
                        <td><span class="api-method-badge api-method-get">GET</span></td>
                        <td><code class="api-endpoint-path">/api/kasir/kalender</code></td>
                        <td><span class="tech-role-badge tech-role-security">Kasir / Owner</span></td>
                        <td>Mengambil seluruh jadwal reservasi harian dalam format kalender antrean.</td>
                      </tr>
                      <tr>
                        <td><span class="api-method-badge api-method-post">POST</span></td>
                        <td><code class="api-endpoint-path">/api/kasir/walk-in</code></td>
                        <td><span class="tech-role-badge tech-role-security">Kasir</span></td>
                        <td>Mendaftarkan tamu fisik yang hadir langsung tanpa reservasi web.</td>
                      </tr>
                      <tr>
                        <td><span class="api-method-badge api-method-post">POST</span></td>
                        <td><code class="api-endpoint-path">/api/kasir/pelunasan</code></td>
                        <td><span class="tech-role-badge tech-role-security">Kasir</span></td>
                        <td>Menutup transaksi akhir dan menerbitkan struk pembayaran digital.</td>
                      </tr>
                      <tr>
                        <td><span class="api-method-badge api-method-get">GET</span></td>
                        <td><code class="api-endpoint-path">/api/laporan/omzet</code></td>
                        <td><span class="tech-role-badge tech-role-architect">Pemilik</span></td>
                        <td>Menyajikan rekap omzet kotor, uang muka, dan perhitungan komisi kapster.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- SUBTAB 6: Bagian D - Alur Transaksi (Sequence Flow) -->
              <div class="tech-subtab-pane" id="techSubtab-sequence" style="display: none;">
                <div class="doc-summary-intro">
                  <h2 class="doc-section-headline">Bagian D: Alur Transaksi &amp; Skenario Urutan Data (Sequence Flow)</h2>
                  <p class="doc-section-desc">
                    Alur Reservasi Mandiri dan Pembayaran QRIS Otomatis: Menjamin konsistensi alur dari pemilihan menu hingga pengiriman notifikasi WhatsApp secara instan.
                  </p>
                </div>

                <div class="tech-seq-grid">
                  <!-- Steps 1-12 -->
                  <div class="tech-seq-card">
                    <div class="tech-seq-num">1</div>
                    <div class="tech-seq-content">
                      <div class="tech-seq-actors">Pelanggan &rarr; Antarmuka Web</div>
                      <div class="tech-seq-title">Pilih Jam &amp; Menu Layanan</div>
                      <div class="tech-seq-desc">Tamu memilih kapster, layanan salon, dan slot waktu kosong di kalender peramban.</div>
                    </div>
                  </div>

                  <div class="tech-seq-card">
                    <div class="tech-seq-num">2</div>
                    <div class="tech-seq-content">
                      <div class="tech-seq-actors">Antarmuka Web &rarr; Server API</div>
                      <div class="tech-seq-title">Kirim Permintaan Reservasi</div>
                      <div class="tech-seq-desc">Web mengirim HTTP POST <code>/api/reservasi/buat</code> membawa payload tamu dan jam.</div>
                    </div>
                  </div>

                  <div class="tech-seq-card">
                    <div class="tech-seq-num">3</div>
                    <div class="tech-seq-content">
                      <div class="tech-seq-actors">Server API &rarr; Database</div>
                      <div class="tech-seq-title">Kunci Slot Transaksi 15 Menit</div>
                      <div class="tech-seq-desc">Eksekusi <code>SELECT FOR UPDATE</code> untuk mengunci slot agar tidak diambil pelanggan lain.</div>
                    </div>
                  </div>

                  <div class="tech-seq-card">
                    <div class="tech-seq-num">4</div>
                    <div class="tech-seq-content">
                      <div class="tech-seq-actors">Database &rarr; Server API</div>
                      <div class="tech-seq-title">Status: Menunggu Bayar</div>
                      <div class="tech-seq-desc">Catatan reservasi disimpan dengan status awal 'Menunggu Bayar' dan timer kedaluwarsa 15 menit.</div>
                    </div>
                  </div>

                  <div class="tech-seq-card">
                    <div class="tech-seq-num">5</div>
                    <div class="tech-seq-content">
                      <div class="tech-seq-actors">Server API &rarr; Midtrans</div>
                      <div class="tech-seq-title">Minta Kode QRIS Uang Muka</div>
                      <div class="tech-seq-desc">Server API Fastify memanggil API Midtrans untuk meminta tagihan uang muka (DP 30%).</div>
                    </div>
                  </div>

                  <div class="tech-seq-card">
                    <div class="tech-seq-num">6</div>
                    <div class="tech-seq-content">
                      <div class="tech-seq-actors">Midtrans &rarr; Server API</div>
                      <div class="tech-seq-title">Penerbitan Barcode QRIS</div>
                      <div class="tech-seq-desc">Midtrans mengembalikan payload QRIS dinamis resmi bertanda tangan digital.</div>
                    </div>
                  </div>

                  <div class="tech-seq-card">
                    <div class="tech-seq-num">7</div>
                    <div class="tech-seq-content">
                      <div class="tech-seq-actors">Server API &rarr; Antarmuka Web</div>
                      <div class="tech-seq-title">Tampilkan Barcode QRIS</div>
                      <div class="tech-seq-desc">Web menampilkan QR barcode beserta hitung mundur 15 menit ke layar tamu.</div>
                    </div>
                  </div>

                  <div class="tech-seq-card">
                    <div class="tech-seq-num">8</div>
                    <div class="tech-seq-content">
                      <div class="tech-seq-actors">Pelanggan &rarr; Bank / E-Wallet</div>
                      <div class="tech-seq-title">Pelanggan Pindai &amp; Transfer</div>
                      <div class="tech-seq-desc">Tamu memindai QRIS melalui m-Banking / e-wallet dan pembayaran dinyatakan sukses.</div>
                    </div>
                  </div>

                  <div class="tech-seq-card">
                    <div class="tech-seq-num">9</div>
                    <div class="tech-seq-content">
                      <div class="tech-seq-actors">Midtrans &rarr; Server API</div>
                      <div class="tech-seq-title">Webhook Pembayaran Lunas</div>
                      <div class="tech-seq-desc">Midtrans mengirimkan sinyal HTTP POST webhook dengan verifikasi signature key check.</div>
                    </div>
                  </div>

                  <div class="tech-seq-card">
                    <div class="tech-seq-num">10</div>
                    <div class="tech-seq-content">
                      <div class="tech-seq-actors">Server API &rarr; Database</div>
                      <div class="tech-seq-title">Perbarui Status: Terkonfirmasi</div>
                      <div class="tech-seq-desc">Server memperbarui status reservasi menjadi 'Terkonfirmasi' dan merekam riwayat DP.</div>
                    </div>
                  </div>

                  <div class="tech-seq-card">
                    <div class="tech-seq-num">11</div>
                    <div class="tech-seq-content">
                      <div class="tech-seq-actors">Server API &rarr; Database</div>
                      <div class="tech-seq-title">Buat Bukti Booking Digital</div>
                      <div class="tech-seq-desc">Sistem menerbitkan nomor tiket digital unik dan tanda terima bukti pelunasan uang muka.</div>
                    </div>
                  </div>

                  <div class="tech-seq-card">
                    <div class="tech-seq-num">12</div>
                    <div class="tech-seq-content">
                      <div class="tech-seq-actors">Server &rarr; WhatsApp Tamu</div>
                      <div class="tech-seq-title">WhatsApp Konfirmasi Terkirim</div>
                      <div class="tech-seq-desc">Worker BullMQ mengirimkan pesan pengingat dan rincian janji temu ke WhatsApp tamu.</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SUBTAB 7: Bagian E & F - Keamanan & Infrastruktur -->
              <div class="tech-subtab-pane" id="techSubtab-security" style="display: none;">
                <div class="doc-summary-intro">
                  <h2 class="doc-section-headline">Bagian E &amp; F: Arsitektur Infrastruktur, Deployment &amp; Model Ancaman</h2>
                  <p class="doc-section-desc">
                    Pengemasan aplikasi dalam wadah terisolasi Docker Compose dan langkah mitigasi ancaman keamanan data.
                  </p>
                </div>

                <!-- Bagian E: Infrastruktur -->
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <h3 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0;">Bagian E: Arsitektur Infrastruktur &amp; Penerapan Server (Deployment)</h3>
                  <div class="prd-cards-grid">
                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-blue">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
                          </svg>
                        </div>
                        <h4 class="prd-card-title">Reverse Proxy (Nginx + TLS)</h4>
                      </div>
                      <ul class="prd-card-bullets">
                        <li>Sertifikat SSL/HTTPS Otomatis (Let's Encrypt)</li>
                        <li>Pembatasan Beban (Rate Limiting) per IP &amp; WA</li>
                        <li>Proteksi header HSTS &amp; HTTP/2 aktif</li>
                      </ul>
                    </div>

                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-purple">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
                          </svg>
                        </div>
                        <h4 class="prd-card-title">Container Aplikasi Node.js</h4>
                      </div>
                      <ul class="prd-card-bullets">
                        <li>Node.js + Fastify &amp; Aset Visual React</li>
                        <li>Worker Pengingat WA berbasis BullMQ</li>
                        <li>Penggunaan RAM rendah (&lt;1 GB RAM)</li>
                      </ul>
                    </div>

                    <div class="prd-box-card">
                      <div class="prd-card-header">
                        <div class="prd-icon-box icon-green">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                          </svg>
                        </div>
                        <h4 class="prd-card-title">Container Database PostgreSQL</h4>
                      </div>
                      <ul class="prd-card-bullets">
                        <li>PostgreSQL 16-Alpine dalam jaringan internal</li>
                        <li>Automated snapshot setiap hari jam 02.00 WIB</li>
                        <li>Terenkripsi ke penyimpanan cloud terpisah</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Bagian F: Threat Model -->
                <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
                  <h3 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0;">Bagian F: Model Ancaman &amp; Keamanan Data (Threat Model)</h3>
                  <div class="prd-cards-grid">
                    <div class="prd-box-card" style="border-top: 3px solid #ef4444;">
                      <h4 class="prd-card-title">1. Anti-Pemborongan Slot Iseng</h4>
                      <p class="prd-card-content">
                        <strong>Denial of Inventory</strong>: Pembatasan laju pemesanan maksimal 3 kali reservasi aktif per nomor WhatsApp. Slot otomatis dibuka kembali jika dalam 15 menit QRIS tidak dibayar.
                      </p>
                    </div>

                    <div class="prd-box-card" style="border-top: 3px solid #f59e0b;">
                      <h4 class="prd-card-title">2. Anti-Manipulasi Bukti Transfer</h4>
                      <p class="prd-card-content">
                        Transaksi hanya sah jika server menerima notifikasi webhook resmi bertanda tangan digital (<strong>signature key check</strong>) dari Midtrans, bukan dari unggahan foto struk.
                      </p>
                    </div>

                    <div class="prd-box-card" style="border-top: 3px solid #3b82f6;">
                      <h4 class="prd-card-title">3. Perlindungan Kontak Pelanggan</h4>
                      <p class="prd-card-content">
                        Penerapan penyembunyian angka telepon di layar tampilan kasir umum (<code>0812****7890</code>) mencegah pencurian data kontak tamu oleh pihak luar atau staf kasir.
                      </p>
                    </div>

                    <div class="prd-box-card" style="border-top: 3px solid #10b981;">
                      <h4 class="prd-card-title">4. Pencegahan Akun Terkunci</h4>
                      <p class="prd-card-content">
                        Pembatasan salah sandi akun kasir maksimal 5 kali berturut-turut sebelum akun dinonaktifkan sementara selama 15 menit untuk menangkal serangan brute-force.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SUBTAB 8: Bagian H-K - UI/UX Design System -->
              <div class="tech-subtab-pane" id="techSubtab-ui" style="display: none;">
                <div class="doc-summary-intro">
                  <h2 class="doc-section-headline">Bagian H–K: Sistem Desain Visual Antarmuka (UI/UX Design System)</h2>
                  <p class="doc-section-desc">
                    Mengadopsi tema <strong>Blush Elegance</strong> yang menenangkan, ramah mata, dan higienis sesuai citra salon modern.
                  </p>
                </div>

                <!-- Palet Warna Resmi -->
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <h3 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0;">Palet Warna Resmi (Official Tokens)</h3>
                  <div class="ui-tokens-grid">
                    <div class="ui-swatch-card">
                      <div class="ui-swatch-color" style="background-color: #FFF8F8; border-bottom: 1px solid #e2e8f0;"></div>
                      <div class="ui-swatch-info">
                        <span class="ui-swatch-name">--bg-salon</span>
                        <span class="ui-swatch-hex">#FFF8F8 (Pastel)</span>
                      </div>
                    </div>

                    <div class="ui-swatch-card">
                      <div class="ui-swatch-color" style="background-color: #FFFFFF; border-bottom: 1px solid #e2e8f0;"></div>
                      <div class="ui-swatch-info">
                        <span class="ui-swatch-name">--card-salon</span>
                        <span class="ui-swatch-hex">#FFFFFF (Putih Murni)</span>
                      </div>
                    </div>

                    <div class="ui-swatch-card">
                      <div class="ui-swatch-color" style="background-color: #D4838F;"></div>
                      <div class="ui-swatch-info">
                        <span class="ui-swatch-name">--primary-salon</span>
                        <span class="ui-swatch-hex">#D4838F (Mawar)</span>
                      </div>
                    </div>

                    <div class="ui-swatch-card">
                      <div class="ui-swatch-color" style="background-color: #9C4A57;"></div>
                      <div class="ui-swatch-info">
                        <span class="ui-swatch-name">--primary-dark</span>
                        <span class="ui-swatch-hex">#9C4A57 (Mawar Tua)</span>
                      </div>
                    </div>

                    <div class="ui-swatch-card">
                      <div class="ui-swatch-color" style="background-color: #2D2627;"></div>
                      <div class="ui-swatch-info">
                        <span class="ui-swatch-name">--text-main</span>
                        <span class="ui-swatch-hex">#2D2627 (Arang Gelap)</span>
                      </div>
                    </div>

                    <div class="ui-swatch-card">
                      <div class="ui-swatch-color" style="background-color: #2E8B57;"></div>
                      <div class="ui-swatch-info">
                        <span class="ui-swatch-name">Terkonfirmasi</span>
                        <span class="ui-swatch-hex">#2E8B57 (Hijau)</span>
                      </div>
                    </div>

                    <div class="ui-swatch-card">
                      <div class="ui-swatch-color" style="background-color: #C57A00;"></div>
                      <div class="ui-swatch-info">
                        <span class="ui-swatch-name">Menunggu Bayar</span>
                        <span class="ui-swatch-hex">#C57A00 (Kuning)</span>
                      </div>
                    </div>

                    <div class="ui-swatch-card">
                      <div class="ui-swatch-color" style="background-color: #C62828;"></div>
                      <div class="ui-swatch-info">
                        <span class="ui-swatch-name">Batal</span>
                        <span class="ui-swatch-hex">#C62828 (Merah)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Standar Tata Letak & Tipografi -->
                <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
                  <h3 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0;">Standar Tata Letak &amp; Tipografi</h3>
                  <div class="prd-cards-grid">
                    <div class="prd-box-card">
                      <h4 class="prd-card-title">Tipografi: Plus Jakarta Sans</h4>
                      <p class="prd-card-content">
                        Menggunakan angka tabular untuk harga dan jam agar tersusun rapi di tabel antrean dan struk kasir.
                      </p>
                    </div>

                    <div class="prd-box-card">
                      <h4 class="prd-card-title">Sudut Komponen (Border Radius)</h4>
                      <p class="prd-card-content">
                        <strong>12px</strong> untuk kartu ringkasan jadwal &amp; modal; <strong>8px</strong> untuk tombol aksi dan kolom isian form.
                      </p>
                    </div>

                    <div class="prd-box-card">
                      <h4 class="prd-card-title">Format Jam Interval 15 Menit</h4>
                      <p class="prd-card-content">
                        Kelipatan 15 menit tombol jam yang mudah dipilih: <code>[ 10:00 ]</code> <code>[ 10:15 ]</code> <code>[ 10:30 ]</code>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SUBTAB 9: Bagian L - Pembagian Kerja & Rencana Sprint -->
              <div class="tech-subtab-pane" id="techSubtab-sprint" style="display: none;">
                <div class="doc-summary-intro">
                  <h2 class="doc-section-headline">Bagian L: Pembagian Kerja Teknis &amp; Rencana Sprint (Sprint Backlog)</h2>
                  <p class="doc-section-desc">
                    Pekerjaan diselesaikan dalam waktu 8 Minggu (6 Sprint terstruktur) dengan target rilis stabil dan lolos audit exit gate.
                  </p>
                </div>

                <div class="prd-cards-grid">
                  <div class="prd-box-card" style="border-left: 4px solid #6366f1;">
                    <div style="font-size: 0.725rem; font-weight: 700; color: #6366f1;">Minggu 1 - 2</div>
                    <h4 class="prd-card-title">Sprint 1: Pondasi Basis Data &amp; Server</h4>
                    <p class="prd-card-content">
                      Pondasi basis data PostgreSQL 3NF, wadah server Docker Compose, dan uji coba pembayaran QRIS Sandbox Midtrans.
                    </p>
                  </div>

                  <div class="prd-box-card" style="border-left: 4px solid #3b82f6;">
                    <div style="font-size: 0.725rem; font-weight: 700; color: #3b82f6;">Minggu 3 - 4</div>
                    <h4 class="prd-card-title">Sprint 2: Katalog Layanan &amp; Mesin Slot</h4>
                    <p class="prd-card-content">
                      Menu layanan salon, profil kapster, dan mesin slot jadwal anti-bentrok menggunakan <code>SELECT FOR UPDATE</code>.
                    </p>
                  </div>

                  <div class="prd-box-card" style="border-left: 4px solid #10b981;">
                    <div style="font-size: 0.725rem; font-weight: 700; color: #10b981;">Minggu 4 - 5</div>
                    <h4 class="prd-card-title">Sprint 3: Alur Booking &amp; Notifikasi WA</h4>
                    <p class="prd-card-content">
                      Alur booking mandiri pelanggan, integrasi webhook QRIS riil, dan gateway notifikasi pesan WhatsApp otomatis via BullMQ.
                    </p>
                  </div>

                  <div class="prd-box-card" style="border-left: 4px solid #f59e0b;">
                    <div style="font-size: 0.725rem; font-weight: 700; color: #f59e0b;">Minggu 5 - 6</div>
                    <h4 class="prd-card-title">Sprint 4: Modul Kasir &amp; Laporan Omzet</h4>
                    <p class="prd-card-content">
                      Kalender antrean kasir tablet, modul tamu walk-in fisik, pelunasan sisa tagihan, dan rekonsiliasi laporan keuangan omzet.
                    </p>
                  </div>

                  <div class="prd-box-card" style="border-left: 4px solid #8b5cf6;">
                    <div style="font-size: 0.725rem; font-weight: 700; color: #8b5cf6;">Minggu 7</div>
                    <h4 class="prd-card-title">Sprint 5: Stress Test &amp; Keamanan</h4>
                    <p class="prd-card-content">
                      Simulasi 50 booking bersamaan (concurrency test), uji penetrasi keamanan ancaman data, dan verifikasi restore data snapshot.
                    </p>
                  </div>

                  <div class="prd-box-card" style="border-left: 4px solid #ec4899;">
                    <div style="font-size: 0.725rem; font-weight: 700; color: #ec4899;">Minggu 8</div>
                    <h4 class="prd-card-title">Sprint 6: UAT &amp; Peluncuran Resmi</h4>
                    <p class="prd-card-content">
                      User Acceptance Testing (UAT) bersama kasir dan owner salon, pelatihan staf, dan peluncuran resmi sistem produksi.
                    </p>
                  </div>
                </div>

                <!-- Bukti Kelulusan Desain (Exit Gate Checklist) -->
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: var(--radius-lg); padding: 1.25rem 1.5rem; margin-top: 0.5rem;">
                  <h3 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin: 0 0 0.75rem 0;">Bukti Kelulusan Desain (Exit Gate Checklist)</h3>
                  <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                    <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: #334155;">
                      <span style="color: #10b981; font-weight: 700; font-size: 1.1rem;">&#10003;</span>
                      <span>Arsitektur modular monolith memetakan seluruh kebutuhan fungsional Phase 1 tanpa ada fitur yang tertinggal.</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: #334155;">
                      <span style="color: #10b981; font-weight: 700; font-size: 1.1rem;">&#10003;</span>
                      <span>Skema database ternormalisasi 3NF dan dilengkapi aturan isolasi data antar-peran (Row-Level Security).</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: #334155;">
                      <span style="color: #10b981; font-weight: 700; font-size: 1.1rem;">&#10003;</span>
                      <span>Kontrak API terdefinisi lengkap dengan pembatasan hak akses per peran.</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: #334155;">
                      <span style="color: #10b981; font-weight: 700; font-size: 1.1rem;">&#10003;</span>
                      <span>Sistem penguncian jadwal 15 menit memecahkan risiko bentrok jadwal (double booking) hingga nol persen.</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: #334155;">
                      <span style="color: #10b981; font-weight: 700; font-size: 1.1rem;">&#10003;</span>
                      <span>Desain visual disetujui pemilik salon dengan palet warna yang memenuhi standar aksesibilitas dan kenyamanan visual.</span>
                    </div>
                  </div>
                </div>

                <div class="tech-approval-banner">
                  <div>
                    <div class="tech-approval-title">STATUS: PHASE 2 DESIGN APPROVED — TIM SIAP MELANGKAH KE PEMBUATAN KODE (PHASE 3)</div>
                    <div class="tech-approval-sub">Semua kriteria kelulusan desain telah diverifikasi dan siap diteruskan ke tahap implementasi backend &amp; frontend.</div>
                  </div>
                  <span class="badge-doc-status-approved" style="padding: 0.4rem 0.9rem; font-size: 0.8rem;">Ready for Code</span>
                </div>
              </div>
            </div>"""

for filepath in ['workspace_f6e.html', 'workspace.html']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Insert techSubTabsBar right after docSubTabsBar if not present
    if 'id="techSubTabsBar"' not in content:
        target_subtabs = '</nav>'
        subtabs_pos = content.find('id="docSubTabsBar"')
        if subtabs_pos != -1:
            end_nav = content.find('</nav>', subtabs_pos)
            if end_nav != -1:
                insert_pos = end_nav + len('</nav>')
                content = content[:insert_pos] + '\\n\\n' + tech_subtabs_bar_html + content[insert_pos:]
                print(f"Inserted techSubTabsBar into {filepath}")

    # 2. Replace docPanelTechDesign content
    start_panel = content.find('<div class="doc-panel-section" id="docPanelTechDesign">')
    if start_panel != -1:
        end_panel = content.find('<!-- PANEL 5: UI System Panel -->', start_panel)
        if end_panel != -1:
            content = content[:start_panel] + tech_panel_html + '\\n\\n            ' + content[end_panel:]
            print(f"Replaced docPanelTechDesign in {filepath}")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("HTML updates applied successfully.")
