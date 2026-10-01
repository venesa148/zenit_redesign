# coding: utf-8

html_ui_system_panel = """            <!-- PANEL 5: UI System Panel (PRD Concept with Outline Navigation Tabs & Paper View) -->
            <div class="doc-panel-section" id="docPanelUiSystem">
              <style>
                .ui-outline-link:hover { background-color: #f1f5f9; }
                .ui-outline-link.active { color: #2563eb !important; font-weight: 600 !important; background-color: #eff6ff !important; }
                .ui-doc-paper table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px; border: 1px solid #e2e8f0; margin: 16px 0 24px 0; }
                .ui-doc-paper th { background-color: #f8fafc; padding: 10px 14px; border: 1px solid #e2e8f0; font-weight: 700; color: #0f172a; }
                .ui-doc-paper td { padding: 10px 14px; border: 1px solid #e2e8f0; vertical-align: top; color: #334155; line-height: 1.5; }
                .ui-doc-paper tr:hover td { background-color: #fbfcfe; }
                .ui-swatch-box { display: inline-block; width: 18px; height: 18px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.15); vertical-align: middle; margin-right: 6px; }
                .ui-token-code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; background-color: #f1f5f9; color: #0f172a; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0; font-weight: 600; }
                .ui-badge-check { color: #16a34a; font-weight: bold; }
                .ui-badge-cross { color: #dc2626; font-weight: bold; }
                .ui-do-box { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px 20px; margin-bottom: 16px; }
                .ui-dont-box { background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px 20px; margin-bottom: 16px; }
              </style>

              <div class="prd-doc-layout ui-doc-layout" style="display: flex; height: calc(100vh - 120px); overflow: hidden; position: relative;">
                <!-- Floating Toggle Button -->
                <button id="btnUiOutlineToggle" style="position: absolute; top: 16px; left: 16px; width: 36px; height: 36px; border-radius: 50%; background-color: #f1f5f9; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; color: #475569; display: none;" title="Buka Tab Dokumen">
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
                <div id="uiOutlineSidebar" style="width: 260px; background-color: #ffffff; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; flex-shrink: 0; transition: margin-left 0.3s ease;">
                  <div style="padding: 16px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between;">
                    <button id="btnUiOutlineClose" style="background: none; border: none; cursor: pointer; color: #475569; padding: 4px; border-radius: 4px; display: flex; align-items: center;" title="Tutup Tab Dokumen">
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
                    <a href="#ui-h-title" class="outline-item" style="display: flex; align-items: center; padding: 8px 12px; border-radius: 6px; background-color: #dbeafe; color: #1e3a8a; text-decoration: none; font-size: 13px; font-weight: 500; margin-bottom: 4px;">
                      <svg style="margin-right: 8px;" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m4.93 4.93 4.24 4.24" />
                        <path d="m14.83 9.17 4.24-4.24" />
                        <path d="m14.83 14.83 4.24 4.24" />
                        <path d="m9.17 14.83-4.24 4.24" />
                      </svg>
                      <span style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">UI System</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </a>

                    <div style="border-left: 2px solid #e2e8f0; margin-left: 19px; padding-left: 12px; margin-top: 4px; display: flex; flex-direction: column; gap: 2px;">
                      <a href="#ui-h-title" class="ui-outline-link active" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">GlowAura — Design System</a>
                      <a href="#ui-h-warna" class="ui-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">1. Token Warna</a>
                      <a href="#ui-h-tipografi" class="ui-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">2. Tipografi</a>
                      <a href="#ui-h-spacing" class="ui-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">3. Spacing &amp; Elevasi</a>
                      <a href="#ui-h-komponen" class="ui-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">4. Komponen Inti</a>
                      <a href="#ui-h-ia" class="ui-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">5. Arsitektur Informasi</a>
                      <a href="#ui-h-a11y" class="ui-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">6. Aksesibilitas &amp; Keamanan</a>
                      <a href="#ui-h-dodont" class="ui-outline-link" style="padding: 6px 8px; color: #475569; text-decoration: none; font-size: 13px; border-radius: 4px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">7. Aturan (Do &amp; Don't)</a>
                    </div>
                  </div>
                </div>

                <!-- Paper Area -->
                <div id="uiDocPaperContainer" class="doc-paper-container" style="background-color: #f1f5f9; padding: 16px 0 40px 0; height: 100%; overflow-y: auto; display: flex; justify-content: center; align-items: flex-start; flex: 1; scroll-behavior: smooth;">
                  <div class="doc-paper ui-doc-paper" style="background-color: #ffffff; width: 100%; max-width: 850px; padding: 60px 80px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); border: 1px solid #e2e8f0; border-radius: 4px; color: #334155; line-height: 1.6; font-size: 15px;">
                    
                    <!-- Cover / Header matching PDF Page 1 -->
                    <span id="ui-h-title" style="display: block; margin-top: -80px; padding-top: 80px;"></span>
                    <div style="font-size: 14px; font-weight: 700; color: #1E6F5C; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">Design System Specification</div>
                    <h1 style="font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 14px; line-height: 1.3;">GlowAura &mdash; Design System</h1>
                    
                    <p style="margin-bottom: 12px;">
                      <strong>Arah terpilih: Clean Modern Salon &amp; Spa Management</strong> &mdash; modern, tenang, teratur, terpercaya, dan profesional; mengadopsi pola operational dashboard kasir/staf dan booking flow mandiri yang intuitif (bukan eksperimental/editorial).
                    </p>
                    <p style="font-size: 13.5px; color: #64748b; margin-bottom: 12px;">
                      <strong>Disetujui manajemen:</strong> 2026-09-30 &middot; <strong>Sumber pratinjau:</strong> <code>docs/design/previews/salon-pos.html</code> (+ <code>booking.html</code>)<br>
                      <strong>Keputusan pengikat:</strong> DD-GA-01 s.d. DD-GA-06, DD-1 s.d. DD-6.
                    </p>
                    <div style="background-color: #f8fafc; border-left: 3px solid #1E6F5C; padding: 12px 16px; font-size: 13.5px; color: #475569; margin-bottom: 24px; border-radius: 0 6px 6px 0;">
                      <em>Dokumen ini mengikat untuk Phase 3 (Development): setiap layar wajib mengikuti token warna, tipografi, batas radius, komponen, dan tata kelola informasi di bawah ini. Setiap deviasi atau penambahan token/gaya baru wajib melalui DD-n baru.</em>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">

                    <!-- SECTION 1: Token Warna -->
                    <span id="ui-h-warna" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 21px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">1. Token Warna</h2>
                    
                    <h4 style="font-size: 16px; font-weight: 700; color: #1e293b; margin-top: 20px; margin-bottom: 8px;">Aksen Brand (Rose Gold &amp; Warm Emerald)</h4>
                    <p style="margin-bottom: 14px;">
                      Primary brand menggunakan <strong>Warm Emerald (#1E6F5C)</strong> untuk aksi operasional dan <strong>Rose Gold / Blush Accent (#C88A78)</strong> sebagai penanda estetika dan sorotan interaktif.
                    </p>

                    <div style="overflow-x: auto;">
                      <table>
                        <thead>
                          <tr>
                            <th style="width: 150px;">Token</th>
                            <th style="width: 130px;">Hex</th>
                            <th>Peruntukan</th>
                            <th style="width: 140px;">Rasio Kontras vs Putih</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><span class="ui-token-code">--primary</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #1E6F5C;"></span><code>#1E6F5C</code></td>
                            <td>Aksen brand utama: tab aktif, border fokus, ikon utama, garis navigasi aktif</td>
                            <td>5,42:1 <span class="ui-badge-check">&#10003;</span></td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--primary-deep</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #144D40;"></span><code>#144D40</code></td>
                            <td>Teks warna brand, latar tombol primer (teks putih di atasnya), tautan aktif</td>
                            <td>8,25:1 <span class="ui-badge-check">&#10003;</span></td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--primary-hover</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #0E382E;"></span><code>#0E382E</code></td>
                            <td>State hover tombol primer dan tautan</td>
                            <td>11,10:1 <span class="ui-badge-check">&#10003;</span></td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--primary-wash</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #EDF6F3;"></span><code>#EDF6F3</code></td>
                            <td>Latar menu aktif, seleksi baris reservasi, tag/badge netral</td>
                            <td>&mdash;</td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--accent-luxe</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #C88A78;"></span><code>#C88A78</code></td>
                            <td>Aksen estetika: indikator promo/add-on, rating bintang, garis penanda reservasi VIP</td>
                            <td>3,12:1 (Garis/Isian)</td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--accent-deep</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #8D4D3D;"></span><code>#8D4D3D</code></td>
                            <td>Teks aksen penanda treatment favorit, teks tombol promo berlatar terang</td>
                            <td>5,28:1 <span class="ui-badge-check">&#10003;</span></td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--accent-wash</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #FDF3F0;"></span><code>#FDF3F0</code></td>
                            <td>Latar badge promo, kartu treatment unggulan</td>
                            <td>&mdash;</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 style="font-size: 16px; font-weight: 700; color: #1e293b; margin-top: 28px; margin-bottom: 8px;">Netral &amp; Permukaan (Bersih, Sejuk, Tanpa Efek Kusam)</h4>
                    <p style="margin-bottom: 14px;">
                      Mencegah warna krem kotor; netral dibangun dari abu-abu lembut sejuk (<em>cool slate</em>) untuk menjaga keterbacaan data inventaris dan jadwal staf.
                    </p>

                    <div style="overflow-x: auto;">
                      <table>
                        <thead>
                          <tr>
                            <th style="width: 150px;">Token</th>
                            <th style="width: 130px;">Hex</th>
                            <th>Peruntukan</th>
                            <th style="width: 140px;">Rasio Kontras vs Putih</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><span class="ui-token-code">--bg</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #FFFFFF;"></span><code>#FFFFFF</code></td>
                            <td>Latar kartu, panel formulir, modal kasir</td>
                            <td>&mdash;</td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--canvas</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #F8FAFC;"></span><code>#F8FAFC</code></td>
                            <td>Latar belakang seluruh halaman kanvas</td>
                            <td>&mdash;</td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--muted</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #F1F5F9;"></span><code>#F1F5F9</code></td>
                            <td>Latar kepala tabel kalender, input search, kartu sekunder</td>
                            <td>&mdash;</td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--muted-hover</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #E2E8F0;"></span><code>#E2E8F0</code></td>
                            <td>Hover baris tabel dan slot jam kosong</td>
                            <td>&mdash;</td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--fg</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #0F172A;"></span><code>#0F172A</code></td>
                            <td>Teks judul, nilai invoice, metrik kasir utama</td>
                            <td>16,11:1 <span class="ui-badge-check">&#10003;</span></td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--fg-2</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #475569;"></span><code>#475569</code></td>
                            <td>Teks sekunder, label formulir, keterangan durasi</td>
                            <td>7,24:1 <span class="ui-badge-check">&#10003;</span></td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--fg-3</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #64748B;"></span><code>#64748B</code></td>
                            <td>Placeholder, teks meta riwayat alergi, label jam</td>
                            <td>4,68:1 <span class="ui-badge-check">&#10003;</span></td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--fg-4</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #94A3B8;"></span><code>#94A3B8</code></td>
                            <td>Ikon dekoratif saja (chevron, garis pandu). Tidak pernah untuk teks</td>
                            <td>2,52:1 <span class="ui-badge-cross">&#10007;</span></td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--border</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #E2E8F0;"></span><code>#E2E8F0</code></td>
                            <td>Border pembungkus kartu, grid jam kalender</td>
                            <td>&mdash;</td>
                          </tr>
                          <tr>
                            <td><span class="ui-token-code">--border-soft</span></td>
                            <td><span class="ui-swatch-box" style="background-color: #F1F5F9;"></span><code>#F1F5F9</code></td>
                            <td>Garis pembatas internal antar-tamu atau rincian item invoice</td>
                            <td>&mdash;</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 style="font-size: 16px; font-weight: 700; color: #1e293b; margin-top: 28px; margin-bottom: 8px;">Semantik Status Operasional (Hanya Bermakna Status)</h4>
                    <div style="overflow-x: auto;">
                      <table>
                        <thead>
                          <tr>
                            <th style="width: 170px;">Makna Operasional</th>
                            <th>Teks (Pekat)</th>
                            <th>Latar (Pastel)</th>
                            <th>Keterangan &amp; Kontras</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Batal / No-Show</strong></td>
                            <td><span class="ui-token-code">--status-danger</span> (<code>#B91C1C</code>)</td>
                            <td><span class="ui-token-code">--danger-bg</span> (<code>#FEF2F2</code>)</td>
                            <td>Pembatalan sepihak, batas bayar DP habis (5,61:1 <span class="ui-badge-check">&#10003;</span>)</td>
                          </tr>
                          <tr>
                            <td><strong>Menunggu DP / Hold Slot</strong></td>
                            <td><span class="ui-token-code">--status-warn</span> (<code>#B45309</code>)</td>
                            <td><span class="ui-token-code">--warn-bg</span> (<code>#FFFBEB</code>)</td>
                            <td>Slot terkunci (TTL 15 menit), menunggu verifikasi kasir (5,12:1 <span class="ui-badge-check">&#10003;</span>)</td>
                          </tr>
                          <tr>
                            <td><strong>Sedang Dikerjakan</strong></td>
                            <td><span class="ui-token-code">--status-info</span> (<code>#1D4ED8</code>)</td>
                            <td><span class="ui-token-code">--info-bg</span> (<code>#EFF6FF</code>)</td>
                            <td>Tamu di kursi/ruang perawatan (5,84:1 <span class="ui-badge-check">&#10003;</span>)</td>
                          </tr>
                          <tr>
                            <td><strong>Selesai / Lunas</strong></td>
                            <td><span class="ui-token-code">--status-success</span> (<code>#15803D</code>)</td>
                            <td><span class="ui-token-code">--success-bg</span> (<code>#F0FDF4</code>)</td>
                            <td>Perawatan tuntas &amp; lunas (5,32:1 <span class="ui-badge-check">&#10003;</span>)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 36px 0;">

                    <!-- SECTION 2: Tipografi -->
                    <span id="ui-h-tipografi" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 21px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">2. Tipografi</h2>
                    
                    <ul style="margin-bottom: 18px; padding-left: 22px;">
                      <li style="margin-bottom: 6px;">
                        <strong>Font Family:</strong> <code>system-ui, -apple-system, "Segoe UI", Roboto, Inter, Helvetica, Arial, sans-serif</code>
                      </li>
                      <li style="margin-bottom: 6px;">
                        <strong>Format Angka:</strong> Menggunakan <code>font-variant-numeric: tabular-nums</code> (kelas <code>.num</code>) untuk seluruh jam, nominal rupiah, dan durasi menit agar sejajar sempurna di tabel kasir.
                      </li>
                    </ul>

                    <div style="overflow-x: auto;">
                      <table>
                        <thead>
                          <tr>
                            <th style="width: 170px;">Peran</th>
                            <th style="width: 150px;">Ukuran</th>
                            <th style="width: 90px;">Bobot</th>
                            <th>Keterangan</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Body Utama</strong></td>
                            <td>14 px</td>
                            <td>400</td>
                            <td>Teks umum, deskripsi perawatan, catatan terapis</td>
                          </tr>
                          <tr>
                            <td><strong>Body Tebal / Subhead</strong></td>
                            <td>16 px</td>
                            <td>600</td>
                            <td>Label kartu ringkasan, nama treatment di katalog</td>
                          </tr>
                          <tr>
                            <td><strong>Sel Tabel / Kalender</strong></td>
                            <td>13 px</td>
                            <td>400 / 500</td>
                            <td>Blok reservasi, data antrean tamu</td>
                          </tr>
                          <tr>
                            <td><strong>Judul Halaman (H1)</strong></td>
                            <td>28 px (ls: -0.025em)</td>
                            <td>700</td>
                            <td>Judul navigasi utama kasir/owner</td>
                          </tr>
                          <tr>
                            <td><strong>Judul Kartu (H3)</strong></td>
                            <td>16 px (ls: -0.02em)</td>
                            <td>600</td>
                            <td>Kepala panel jadwal, kartu detail pembayaran</td>
                          </tr>
                          <tr>
                            <td><strong>Label / Jam Sumbu</strong></td>
                            <td>11 px (ls: 0.05em)</td>
                            <td>600</td>
                            <td>Format uppercase untuk label durasi dan jam shift</td>
                          </tr>
                          <tr>
                            <td><strong>Pil / Badge Status</strong></td>
                            <td>11,5 px</td>
                            <td>600</td>
                            <td>Teks label status reservasi dan kategori layanan</td>
                          </tr>
                          <tr>
                            <td><strong>Metrik Utama (KPI)</strong></td>
                            <td>36 px (ls: -0.03em)</td>
                            <td>700</td>
                            <td>Angka total booking, omzet harian, sisa deposit</td>
                          </tr>
                          <tr>
                            <td><strong>Total Pembayaran / Kasir</strong></td>
                            <td>22 px</td>
                            <td>700</td>
                            <td>Nominal tagihan invoice pelunasan</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 36px 0;">

                    <!-- SECTION 3: Spacing, Bentuk, dan Elevasi -->
                    <span id="ui-h-spacing" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 21px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">3. Spacing, Bentuk, dan Elevasi</h2>
                    
                    <ul style="margin-bottom: 20px; padding-left: 22px;">
                      <li style="margin-bottom: 10px;">
                        <strong>Grid Spacing:</strong> Menggunakan kelipatan 4px (<code>gap-2 = 8px</code>, <code>gap-3.5 = 14px</code>, <code>gap-4 = 16px</code>).
                      </li>
                      <li style="margin-bottom: 10px;">
                        <strong>Padding:</strong> Kartu operasional 16px, padding kalender 12px 14px, padding kanvas layar 20px 24px.
                      </li>
                      <li style="margin-bottom: 10px;">
                        <strong>Radius Sudut Bersistem:</strong>
                        <ul style="margin-top: 6px; padding-left: 20px;">
                          <li style="margin-bottom: 4px;"><strong>Shell &amp; Navigasi:</strong> <code>--radius-shell: 8px</code> (menu samping, bilah aksi).</li>
                          <li style="margin-bottom: 4px;"><strong>Kartu Konten:</strong> <code>--radius-card: 12px</code> (wadah utama kalender, kartu treatment).</li>
                          <li style="margin-bottom: 4px;"><strong>Blok Reservasi Jam:</strong> <code>--radius-slot: 6px</code> (blok jadwal terapis pada grid).</li>
                          <li style="margin-bottom: 4px;"><strong>Elemen Kontrol &amp; Status:</strong> Berbentuk pil <code>--radius-pill: 999px</code> (tombol status, chip kapster, filter kategori). Input teks menggunakan <code>--radius-input: 8px</code>.</li>
                        </ul>
                      </li>
                      <li style="margin-bottom: 10px;">
                        <strong>Elevasi &amp; Garis:</strong>
                        <ul style="margin-top: 6px; padding-left: 20px;">
                          <li style="margin-bottom: 4px;">Kartu mengandalkan garis border <code>1px solid var(--border)</code> dan bayangan lembut <code>--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)</code>.</li>
                          <li style="margin-bottom: 4px;">Efek bayangan sentuh (hover): <code>--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.08)</code>.</li>
                          <li style="margin-bottom: 4px;"><em>Dilarang keras menggunakan bayangan gelap bertumpuk atau ornamen grafis floral yang mengganggu keterbacaan jadwal.</em></li>
                        </ul>
                      </li>
                    </ul>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 36px 0;">

                    <!-- SECTION 4: Komponen Inti -->
                    <span id="ui-h-komponen" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 21px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">4. Komponen Inti</h2>
                    
                    <div style="overflow-x: auto;">
                      <table>
                        <thead>
                          <tr>
                            <th style="width: 220px;">Komponen</th>
                            <th>Aturan Teknis &amp; Desain</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Sidebar Kasir / Staf</strong></td>
                            <td>Lebar 240px (ciut 72px pada tablet). Latar belakang putih (<code>--bg</code>), border kanan 1px. Menu aktif berupa pil <code>--primary-wash</code> dengan teks <code>--primary-deep</code> tebal dan ikon serona. Bagian kaki memuat kartu profil kasir bertugas dan tombol tutup kasir/logout.</td>
                          </tr>
                          <tr>
                            <td><strong>Kalender Multi-Kapster Grid</strong></td>
                            <td>Sumbu Y = pembagian waktu (interval 15/30 menit). Sumbu X = nama-nama kapster yang bertugas hari ini. Slot waktu kosong dapat langsung diklik untuk registrasi <em>walk-in</em>. Blok jadwal terisi memuat: nama tamu, nama layanan, durasi, dan ikon status bayar DP.</td>
                          </tr>
                          <tr>
                            <td><strong>Booking Stepper (Pelanggan)</strong></td>
                            <td>Alur 3 langkah tanpa reload: (1) Layanan &amp; Add-on &rarr; (2) Pilih Kapster &amp; Jam &rarr; (3) Rincian &amp; Bayar DP. Wajib menampilkan penghitung waktu mundur (<em>countdown 15 menit</em>) saat pembayaran QRIS aktif.</td>
                          </tr>
                          <tr>
                            <td><strong>Kartu Metrik KPI</strong></td>
                            <td>Menampilkan angka utama tabular (<code>.num</code>), label deskriptif, dan chip status di pojok kanan atas. Angka perbandingan (<em>growth</em>) hanya ditampilkan jika ada basis data periode sebelumnya.</td>
                          </tr>
                          <tr>
                            <td><strong>Drawer Pembayaran Kasir</strong></td>
                            <td>Panel geser (<em>slide-over</em>) dari kanan saat reservasi diklik. Memuat rincian: Biaya Total, DP Terbayar (via Gateway), Sisa Tagihan, pilihan metode bayar sisa (Tunai/Debit/QRIS), dan tombol &ldquo;Selesaikan Perawatan&rdquo;.</td>
                          </tr>
                          <tr>
                            <td><strong>Badge Data Sensitif Masked</strong></td>
                            <td>Wadah penampil data kontak pelanggan: selalu menampilkan format tersamar (misal: <code>0812****8901</code>). Hanya akun ber-role owner yang memiliki tombol aksi pengungkap (<em>reveal</em>).</td>
                          </tr>
                          <tr>
                            <td><strong>Catatan Alergi &amp; Formula</strong></td>
                            <td>Blok peringatan di dalam detail tamu berlatar <code>--accent-wash</code> dengan border <code>--accent-luxe</code>. Menampilkan catatan khusus kimia rambut (misal: &ldquo;Sensitif bleaching amonia 9%&rdquo;).</td>
                          </tr>
                          <tr>
                            <td><strong>Notifikasi Toast Sistem</strong></td>
                            <td>Wadah di kanan bawah layar berstatus <code>aria-live="polite"</code>. Pesan wajib menyebutkan nama aksi secara spesifik (contoh: &ldquo;Slot booking Sari (Hair Spa) berhasil dipindahkan ke Kapster Rian&rdquo;). Durasi tampil 5 detik.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 36px 0;">

                    <!-- SECTION 5: Arsitektur Informasi & Alur Peran -->
                    <span id="ui-h-ia" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 21px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">5. Arsitektur Informasi &amp; Alur Peran</h2>
                    <h4 style="font-size: 16px; font-weight: 700; color: #1e293b; margin-top: 16px; margin-bottom: 12px;">Navigasi Berdasarkan Peran</h4>
                    
                    <ol style="margin-bottom: 24px; padding-left: 22px;">
                      <li style="margin-bottom: 12px;">
                        <strong>Kasir / Resepsionis:</strong>
                        <ul style="margin-top: 4px; padding-left: 20px;">
                          <li>Kalender &amp; Jadwal (Tampilan harian/mingguan staf &amp; penanganan bentrok)</li>
                          <li>Tamu Walk-in &amp; Antrean (Pendaftaran langsung &amp; panggilan kursi)</li>
                          <li>Kasir &amp; Pelunasan (Invoice, pembayaran sisa, pencetakan struk digital)</li>
                          <li>Data Pelanggan (Catatan formula &amp; alergi bertopeng)</li>
                        </ul>
                      </li>
                      <li style="margin-bottom: 12px;">
                        <strong>Pemilik (Owner):</strong>
                        <ul style="margin-top: 4px; padding-left: 20px;">
                          <li>Dashboard Omzet (Total pendapatan harian/bulanan, rasio pembatalan/no-show)</li>
                          <li>Performa &amp; Komisi Staf (Jumlah perawatan per kapster, komisi tercatat)</li>
                          <li>Katalog Layanan &amp; Tarif (Pengaturan harga dasar, nominal DP, estimasi durasi)</li>
                          <li>Jejak Audit &amp; Refund (Otorisasi pengembalian dana dan verifikasi denda)</li>
                        </ul>
                      </li>
                      <li style="margin-bottom: 12px;">
                        <strong>Portal Reservasi Mandiri (Pelanggan):</strong>
                        <ul style="margin-top: 4px; padding-left: 20px;">
                          <li>Halaman Pemilihan Perawatan &amp; Estimasi Waktu &rarr; Pemilihan Jadwal Staf Kosong &rarr; Halaman Pembayaran DP Instan &rarr; Tiket Konfirmasi WhatsApp.</li>
                        </ul>
                      </li>
                    </ol>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 36px 0;">

                    <!-- SECTION 6: Aksesibilitas & Kaidah Keamanan -->
                    <span id="ui-h-a11y" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 21px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">6. Aksesibilitas &amp; Kaidah Keamanan (Wajib)</h2>
                    
                    <ul style="margin-bottom: 24px; padding-left: 22px;">
                      <li style="margin-bottom: 10px;">
                        <strong>Kepatuhan Rasio Kontras:</strong> Semua teks utama dan sekunder wajib memenuhi standar WCAG AA (minimal rasio 4,5:1 terhadap latar).
                      </li>
                      <li style="margin-bottom: 10px;">
                        <strong>Indikator Fokus Keyboard:</strong> Seluruh kontrol input, tombol, dan slot jadwal interaktif wajib memiliki ring fokus terlihat: <code>outline: 2px solid var(--primary); outline-offset: 2px;</code>.
                      </li>
                      <li style="margin-bottom: 10px;">
                        <strong>Prinsip Non-Color Reliance:</strong> Status reservasi tidak boleh hanya dibedakan lewat warna kotak. Setiap blok wajib memuat label teks status atau ikon status yang representatif.
                      </li>
                      <li style="margin-bottom: 10px;">
                        <strong>Keamanan Data Kontak:</strong> Kasir dan kapster tidak diizinkan mengekspor atau melihat nomor kontak pelanggan tanpa enkripsi untuk mematuhi regulasi privasi konsumen.
                      </li>
                    </ul>

                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 36px 0;">

                    <!-- SECTION 7: Aturan Implementasi (Do & Don't) -->
                    <span id="ui-h-dodont" style="display: block; margin-top: -60px; padding-top: 60px;"></span>
                    <h2 style="font-size: 21px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">7. Aturan Implementasi (Do &amp; Don't)</h2>
                    
                    <!-- DO Box -->
                    <div class="ui-do-box">
                      <h4 style="font-size: 15px; font-weight: 700; color: #166534; margin: 0 0 10px 0; display: flex; align-items: center; gap: 6px;">
                        <span style="font-size: 18px;">&#10004;</span> DO (Wajib Dilakukan)
                      </h4>
                      <ul style="margin: 0; padding-left: 20px; color: #14532d; font-size: 13.5px;">
                        <li style="margin-bottom: 6px;">Gunakan tata letak fleksibel lebar penuh (<em>full-width grid</em>) untuk tabel kalender kasir agar jadwal seluruh kapster terlihat tanpa tumpang tindih.</li>
                        <li style="margin-bottom: 6px;">Sertakan durasi menit yang jelas pada setiap nama layanan di katalog pemesanan mandiri.</li>
                        <li style="margin-bottom: 6px;">Sajikan slot waktu yang terkunci (<em>hold</em>) dengan transparan disertai waktu kedaluwarsa yang akurat.</li>
                        <li style="margin-bottom: 6px;">Gunakan dialog konfirmasi modal saat kasir membatalkan reservasi atau mengubah status menjadi <em>no-show</em>.</li>
                      </ul>
                    </div>

                    <!-- DON'T Box -->
                    <div class="ui-dont-box">
                      <h4 style="font-size: 15px; font-weight: 700; color: #991b1b; margin: 0 0 10px 0; display: flex; align-items: center; gap: 6px;">
                        <span style="font-size: 18px;">&#10008;</span> DON'T (Dilarang Keras)
                      </h4>
                      <ul style="margin: 0; padding-left: 20px; color: #7f1d1d; font-size: 13.5px;">
                        <li style="margin-bottom: 6px;">Dilarang menggunakan nuansa warna krem/cokelat bernoda yang membuat teks buram dan menurunkan kontras.</li>
                        <li style="margin-bottom: 6px;">Dilarang menampilkan foto dekoratif berukuran masif di aplikasi kasir yang memakan area kerja layar tablet.</li>
                        <li style="margin-bottom: 6px;">Dilarang membiarkan tombol jadwal dapat diklik jika slot kapster tersebut telah terisi (<em>double booking prevention</em>).</li>
                        <li style="margin-bottom: 6px;">Dilarang menampilkan nomor telepon atau email pelanggan secara utuh pada layar publik atau staf biasa.</li>
                        <li style="margin-bottom: 6px;">Dilarang menggunakan animasi transisi yang lambat (&gt;250ms) pada antarmuka kasir yang menuntut respons cepat.</li>
                      </ul>
                    </div>

                    <div style="margin-top: 36px; padding: 18px; background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; font-size: 13.5px; text-align: center; color: #64748b;">
                      <em>Dokumen UI System &amp; Design Tokens GlowAura &bull; Phase 2 &bull; Referensi Mengikat untuk Pengembangan Front-End Phase 3.</em>
                    </div>

                  </div>
                </div>

                <!-- Inline Navigation Script for UI System -->
                <script>
                  (function() {
                    function initUiOutline() {
                      const sidebar = document.getElementById('uiOutlineSidebar');
                      const btnClose = document.getElementById('btnUiOutlineClose');
                      const btnToggle = document.getElementById('btnUiOutlineToggle');
                      const paperContainer = document.getElementById('uiDocPaperContainer');

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

                      const outlineLinks = document.querySelectorAll('.ui-outline-link');
                      if (paperContainer && outlineLinks.length > 0) {
                        paperContainer.addEventListener('scroll', function() {
                          let currentId = '';
                          const scrollPosition = paperContainer.scrollTop + 100;
                          document.querySelectorAll('.ui-doc-paper span[id^="ui-h-"]').forEach(function(span) {
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
                      document.addEventListener('DOMContentLoaded', initUiOutline);
                    } else {
                      initUiOutline();
                    }
                  })();
                </script>
              </div>
            </div>"""

print("UI System Panel prepared. Length:", len(html_ui_system_panel))
