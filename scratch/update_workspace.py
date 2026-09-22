import re

file_path = r'd:\intern\zenit_redesign\workspace.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace sidebar nav items
sidebar_html = """
          <div class="modal-inner-sidebar phase-modal-sidebar">
            <button type="button" class="modal-nav-item active phase-nav-item" data-phase="1">
              <span class="phase-nav-number">1</span>
              <div class="phase-nav-text">
                <span class="phase-nav-title">Perencanaan & Kebutuhan</span>
                <span class="phase-nav-meta" style="color: #10b981;">9/9 Selesai</span>
              </div>
            </button>
            <button type="button" class="modal-nav-item phase-nav-item" data-phase="2">
              <span class="phase-nav-number">2</span>
              <div class="phase-nav-text">
                <span class="phase-nav-title">Desain & Cetak Biru</span>
                <span class="phase-nav-meta" style="color: #10b981;">15/15 Selesai</span>
              </div>
            </button>
            <button type="button" class="modal-nav-item phase-nav-item" data-phase="3">
              <span class="phase-nav-number">3</span>
              <div class="phase-nav-text">
                <span class="phase-nav-title">Pembuatan Kode</span>
                <span class="phase-nav-meta" style="color: #f59e0b;">0/11 Sedang Berjalan</span>
              </div>
            </button>
            <button type="button" class="modal-nav-item phase-nav-item" data-phase="4">
              <span class="phase-nav-number">4</span>
              <div class="phase-nav-text">
                <span class="phase-nav-title">Uji Kelayakan</span>
                <span class="phase-nav-meta">0/9 Menunggu</span>
              </div>
            </button>
            <button type="button" class="modal-nav-item phase-nav-item" data-phase="5">
              <span class="phase-nav-number">5</span>
              <div class="phase-nav-text">
                <span class="phase-nav-title">Peluncuran Resmi</span>
                <span class="phase-nav-meta">0/9 Menunggu</span>
              </div>
            </button>
            <button type="button" class="modal-nav-item phase-nav-item" data-phase="6">
              <span class="phase-nav-number">6</span>
              <div class="phase-nav-text">
                <span class="phase-nav-title">Operasional & Perawatan</span>
                <span class="phase-nav-meta">0/7 Menunggu</span>
              </div>
            </button>
            <button type="button" class="modal-nav-item phase-nav-item" data-phase="7">
              <span class="phase-nav-number">7</span>
              <div class="phase-nav-text">
                <span class="phase-nav-title">Evaluasi & Pengembangan</span>
                <span class="phase-nav-meta">0/6 Menunggu</span>
              </div>
            </button>
          </div>
"""
content = re.sub(
    r'<div class="modal-inner-sidebar phase-modal-sidebar">.*?</div>\s*<!-- Content \(Rendered by JS\) -->',
    sidebar_html.strip() + '\n\n          <!-- Content (Rendered by JS) -->',
    content,
    flags=re.DOTALL
)

# New Phase Data
new_phase_data_js = """
      const phaseData = [
        {
          id: 1,
          title: "Phase 1: Perencanaan & Kebutuhan Bisnis — Website Salon",
          owner: "Business Analyst",
          status: "Disetujui Penuh",
          gates: 9,
          completed: 9,
          items: [
            "Alur Pengguna Jelas: Skenario pesan perawatan, pilih kapster, kunci jam, hingga bayar QRIS disepakati dari sudut pandang pemakai.",
            "Aturan Operasional Pasti: Kebijakan uang muka (DP), batas pembatalan, dan denda terlambat sudah diputuskan sejak awal.",
            "Kesepakatan Tercatat Rapi: Seluruh keputusan bersama pemilik salon, kasir, dan kapster didokumentasikan lengkap beserta alasannya.",
            "Kamus Istilah Baku: Definisi istilah kerja diseragamkan (seperti kapster, slot waktu, dan no-show) agar tim tidak salah paham.",
            "Fitur Utama Terkunci: Rilis awal difokuskan pada pemesanan, katalog layanan, bayar QRIS, dan kalender kasir; fitur promo/poin ditunda.",
            "Jadwal 8 Minggu Disepakati: Waktu pengerjaan ditetapkan tuntas dalam 2 bulan, mencakup pengumpulan foto layanan dan data uji coba.",
            "Fokus Aturan Bisnis: Kebutuhan murni mengatur proses kerja salon tanpa membatasi pilihan teknis pemrograman.",
            "Lolos Verifikasi Akhir: Rencana kerja disetujui pemeriksa independen tanpa ada persyaratan yang menggantung.",
            "Izin Masuk Phase 2 Terbuka: Seluruh syarat terpenuhi, tim resmi lanjut ke tahap perancangan desain layar dan skema database."
          ]
        },
        {
          id: 2,
          title: "Phase 2: Desain & Cetak Biru Sistem — Website Salon",
          owner: "Software Architect",
          status: "Disetujui Penuh",
          gates: 15,
          completed: 15,
          items: [
            "Arsitektur & Skema Selaras: 5 modul utama (akun, layanan, booking, bayar, notifikasi) terhubung rapi ke 12 tabel database tanpa risiko konflik data.",
            "Cakupan Kebutuhan 100%: Seluruh fitur wajib Phase 1 terpetakan lengkap ke rancangan antarmuka dan struktur data.",
            "Isolasi Privasi Pelanggan: Akses data dikunci ketat; pelanggan hanya dapat melihat reservasi dan bukti bayar miliknya sendiri.",
            "Pemisahan Hak Akses Tiga Peran: Kewenangan dibatasi tegas antara Pelanggan (pesan & bayar), Kasir (kelola jadwal), dan Pemilik (akses laporan keuangan).",
            "Integrasi Pihak Ketiga Resmi: Layanan pembayaran otomatis QRIS dan gateway notifikasi WhatsApp disepakati untuk digunakan.",
            "Struktur Sistem Efisien: Aplikasi dirancang monolitik dan ringan guna menghemat biaya server serta mempermudah pemeliharaan berkala.",
            "Lingkungan Pengujian Siap: Tempat simulasi pengembangan dan pengecekan kode otomatis disiapkan sebelum pemasangan ke server asli.",
            "Keamanan Transaksi Terjamin: Mekanisme anti-kecurangan diterapkan untuk mencegah bukti transfer palsu dan penimbunan slot booking.",
            "Target Kinerja Terukur: Waktu muat halaman dipatok di bawah 1,5 detik di ponsel dan stabil menampung 50 pemesanan serentak.",
            "Konsep Desain Disetujui: Pemilik salon menetapkan tema visual elegan dari opsi alternatif yang diajukan.",
            "Standar UI & Palet Dikunci: Tema warna pink pastel lembut, tipografi jelas, dan ukuran tombol ramah sentuhan layar resmi dibakukan.",
            "Jadwal 6 Sprint Disahkan: Waktu 8 minggu dibagi tuntas: pembuatan fitur inti (S1–S4), uji ketahanan (S5), dan gladi bersih operasional (S6).",
            "Aturan Sistem Pasti: Logika pembatalan otomatis (hangus bila tak dibayar dalam 15 menit) dan penguncian jadwal tuntas disepakati.",
            "Lolos Verifikasi Ahli Independen: Cetak biru divalidasi aman dari celah jadwal ganda (double booking) oleh perancang sistem independen.",
            "Izin Masuk Phase 3 Terbuka: Seluruh 15 syarat teknis terpenuhi; tim resmi melangkah ke tahap pembuatan kode program (Development)."
          ]
        },
        {
          id: 3,
          title: "Phase 3: Pembuatan Kode Program — Website Salon",
          owner: "Frontend & Backend Engineer",
          status: "Sedang Berjalan",
          gates: 11,
          completed: 0,
          items: [
            "Tugas S1–S4 Tuntas 100%: Seluruh daftar fitur utama selesai dikerjakan atau resmi ditunda atas izin pemilik salon.",
            "Bukti Fitur Berfungsi Nyata: Setiap putaran kerja wajib menunjukkan fungsi yang benar-benar hidup saat dicoba di layar.",
            "Lolos Tes Manual Bebas Eror: Semua fitur dapat dijalankan lancar tanpa adanya kerusakan sistem yang macet atau fatal.",
            "Persetujuan Kode Antar-Tim (Code Review): Setiap baris kode baru wajib dicek dan disetujui programmer lain sebelum digabungkan.",
            "Pengecekan Otomatis Hijau: Mesin penguji otomatis menyatakan kode bebas salah ketik, bebas galat, dan aman dirakit.",
            "Label Pembagian Tugas Rapi: Setiap pekerjaan terdata jelas tanggung jawabnya, apakah bagian tampilan (Frontend) atau mesin (Backend).",
            "Dokumentasi Sesuai Hasil: Catatan teknis cara kerja sistem selalu disinkronkan persis dengan kode yang sudah jadi.",
            "Server Percobaan Aktif Lancar: Website versi latihan berjalan stabil di komputer tim sehingga perubahan langsung terlihat seketika.",
            "Semua Ketidakpastian Tuntas Diputuskan: Tidak ada fitur yang dikira-kira; seluruh detail teknis langsung diputuskan dan dicatat resmi.",
            "Disiplin Mengikuti Desain Phase 2: Proses koding taat pada aturan alur dan warna yang sudah disahkan, tanpa melenceng.",
            "Kunci Menuju Phase 4 Terbuka: Seluruh 11 kriteria wajib hijau penuh sebelum sistem melangkah ke tahap pengujian menyeluruh."
          ]
        },
        {
          id: 4,
          title: "Phase 4: Uji Kelayakan & Penerimaan — Website Salon",
          owner: "Pengguna Langsung / Tim Medis",
          status: "Menunggu Giliran",
          gates: 9,
          completed: 0,
          items: [
            "Hasil Uji Manual Terekam Nyata: Setiap putaran pengerjaan dicoba langsung oleh manusia dengan catatan hasil berstatus lulus.",
            "Fitur Utama Lolos Uji 100%: Seluruh fitur penting (booking, bayar QRIS, kalender kasir) terbukti berfungsi normal lewat bukti uji coba.",
            "Pengecekan Anti-Rusak (Regression): Fitur yang sudah selesai diuji ulang agar penambahan kode baru tidak merusak fungsi lama.",
            "Target Kecepatan Terpenuhi: Waktu buka halaman diukur pasti dengan batas waktu di bawah 1,5 detik di ponsel.",
            "Audit Keamanan Ketat: Sistem terbukti aman dari kebocoran nomor kontak pelanggan dan manipulasi status pembayaran.",
            "Semua Masalah (Bug) Tuntas: Kendala teknis yang ditemukan saat pengujian selesai diperbaiki atau resmi ditunda atas izin pemilik salon.",
            "Laporan Evaluasi Rapi: Seluruh catatan hasil uji sistem dan riwayat perbaikan masalah tercatat lengkap di dokumen resmi.",
            "Gladi Bersih Staf Salon (UAT): Pemilik salon, kasir, dan kapster mencoba langsung alur kerja harian dan resmi menandatangani persetujuan.",
            "Kunci Menuju Phase 5 Terbuka: Seluruh 9 syarat pengujian wajib terpenuhi sebelum tombol peluncuran resmi ditekan."
          ]
        },
        {
          id: 5,
          title: "Phase 5: Peluncuran Resmi — Website Salon",
          owner: "Release Manager",
          status: "Menunggu Giliran",
          gates: 9,
          completed: 0,
          items: [
            "Label Versi & Catatan Jelas: Nomor rilis website ditetapkan resmi (misal: Versi 1.0.0) beserta daftar fitur dan perbaikan terkini.",
            "Lolos Pasang di Server Latihan: Sistem terpasang dan berjalan mulus di server simulasi (staging) tanpa adanya galat.",
            "Latihan Darurat Mundur (Rollback): Prosedur darurat terbukti siap mengembalikan sistem ke versi lama jika peluncuran terkendala.",
            "Titik Cadangan Data Aman: Salinan data (backup) terakhir dipastikan tersimpan aman sebelum proses migrasi dijalankan.",
            "Alarm Pemantau Siap Siaga: Sensor otomatis aktif untuk memberi peringatan jika website mendadak lambat atau tidak bisa dibuka.",
            "Riwayat Pemasangan Terekam Rapi: Semua catatan proses pemasangan sistem ke server tersimpan lengkap dan tertata.",
            "Pemeriksaan Kesiapan Akhir Sah: Daftar cek keamanan dan kelaikan server tuntas diverifikasi sebelum tombol rilis ditekan.",
            "Tes Transaksi Kilat Usai Rilis: Pengecekan kilat dan tes pembayaran riil sekali langsung di domain resmi salon untuk memastikan fungsi normal.",
            "Izin Masuk Phase 6 Terbuka: Seluruh 9 syarat peluncuran berstatus hijau, pengelolaan resmi dialihkan ke tahap operasional harian."
          ]
        },
        {
          id: 6,
          title: "Phase 6: Operasional & Perawatan Harian — Website Salon",
          owner: "Tim Keandalan Sistem (SRE)",
          status: "Menunggu Giliran",
          gates: 7,
          completed: 0,
          items: [
            "Radar Pemantau & Alarm 24 Jam: Sensor otomatis mengawasi kecepatan, beban pengunjung, sisa memori, serta langsung mengirim peringatan jika website macet.",
            "Catatan Riwayat Gangguan Rapi: Setiap kendala teknis (seperti halaman booking sempat melambat) dicatat penyebab utama dan solusinya.",
            "Evaluasi Insiden Fatal Tuntas: Laporan resmi dibuat jika terjadi gangguan besar (website mati atau koneksi QRIS terputus) agar masalah tidak terulang.",
            "Simulasi Sedot Data Cadangan (Restore Backup): Pemulihan data cadangan dipraktikkan langsung untuk memastikan data booking dan kas salon aman dari risiko hilang.",
            "Servis Rutin & Tambalan Keamanan: Jadwal perawatan berkala dijalankan tepat waktu dan pembaruan sistem keamanan selalu terpasang.",
            "Rekap Performa Siap Saji: Laporan bulanan untuk pemilik salon memuat persentase website aktif (uptime), rekap masalah, dan rincian biaya server.",
            "Izin Masuk Phase 7 Terbuka: Seluruh 7 syarat operasional terpenuhi stabil sebagai dasar melangkah ke evaluasi dan pengembangan fitur berikutnya."
          ]
        },
        {
          id: 7,
          title: "Phase 7: Evaluasi & Pengembangan Berkelanjutan — Website Salon",
          owner: "Engineering Manager",
          status: "Menunggu Giliran",
          gates: 6,
          completed: 0,
          items: [
            "Laporan Rapat Evaluasi Lengkap: Catatan evaluasi berkala disusun untuk meninjau hal yang berjalan lancar dan kendala teknis selama sebulan pemakaian.",
            "Tiap Saran Perbaikan Berpemilik: Setiap usulan perbaikan (seperti memperjelas tombol bayar atau simplifikasi jadwal) dicatat dan diberi penanggung jawab.",
            "Pembaruan Pedoman Kerja Tim: Pola kerja yang menghambat proses diperbarui agar pengembangan fitur selanjutnya berjalan lebih cepat.",
            "Dokumentasi & Memori Teknis Diperbarui: Panduan teknis dan solusi masalah dicatat agar kesalahan serupa tidak terulang di masa mendatang.",
            "Rencana Fitur Lanjutan atau Serah Terima Tuntas: Menyiapkan daftar fitur baru (sistem poin dan voucer diskon), atau menyelesaikan masa pendampingan serta serah terima kunci sistem.",
            "Siklus Proyek Resmi Ditutup: Seluruh 6 syarat terpenuhi, versi saat ini resmi ditutup dengan stabil dan siap masuk ke siklus pengembangan baru."
          ]
        }
      ];

      function renderPhase(id) {
        const phase = phaseData.find(p => p.id === id);
        if (!phase) return;

        // Update active state on sidebar
        document.querySelectorAll('.phase-nav-item').forEach(el => {
          el.classList.toggle('active', parseInt(el.getAttribute('data-phase')) === id);
        });

        const root = document.getElementById('phaseContentRoot');
        
        let statusColor = "#64748b"; // default
        let statusBg = "rgba(226, 232, 240, 0.6)"; // default
        let indicatorColor = "#94a3b8";
        
        if (phase.status.includes("Disetujui")) {
            statusColor = "#059669";
            statusBg = "rgba(16, 185, 129, 0.1)";
            indicatorColor = "#10b981"; // green
        } else if (phase.status.includes("Sedang Berjalan")) {
            statusColor = "#d97706";
            statusBg = "rgba(245, 158, 11, 0.1)";
            indicatorColor = "#f59e0b"; // yellow
        }

        let itemsHtml = phase.items.map((item, index) => {
            let isChecked = index < phase.completed;
            let checkIcon = isChecked ? 'checked' : '';
            let checkBoxStyle = isChecked ? `background-color: #10b981; border-color: #10b981;` : `border-color: #cbd5e1;`;
            return `
        <label class="gate-item" style="display: flex; align-items: center; gap: 16px; padding: 16px 20px; border: 1px solid var(--border-color, #e2e8f0); border-radius: 8px; background: #ffffff; cursor: default; transition: all 0.2s ease;">
          <input type="checkbox" class="gate-checkbox" disabled ${checkIcon} style="width: 18px; height: 18px; border-radius: 4px; border: 2px solid #cbd5e1; flex-shrink: 0; appearance: none; ${checkBoxStyle} background-image: ${isChecked ? 'url(\\'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%223%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%2220 6 9 17 4 12%22%3E%3C/polyline%3E%3C/svg%3E\\')' : 'none'}; background-size: 80%; background-position: center; background-repeat: no-repeat;" />
          <span class="gate-text" style="font-size: 15px; color: var(--text-primary, #1e293b); font-weight: 400; line-height: 1.5; ${isChecked ? 'text-decoration: line-through; opacity: 0.7;' : ''}">${item}</span>
        </label>
      `}).join('');

        root.innerHTML = `
        <div class="phase-content-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; border-bottom: 1px solid var(--border-color, #e2e8f0); padding-bottom: 24px; position: relative;">
          <!-- Progress Indicator Top Right/Left -->
          <div style="position: absolute; top: 0; right: 0; width: 12px; height: 12px; border-radius: 50%; background-color: ${indicatorColor};"></div>
          
          <div style="padding-right: 20px;">
            <h3 class="section-main-heading" style="font-size: 32px; margin-bottom: 16px; font-weight: 700;">${phase.title}</h3>
            <div style="display: flex; align-items: center; gap: 12px; color: var(--text-secondary, #64748b); font-size: 15px;">
              Role: 
              <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background: rgba(0,0,0,0.04); border-radius: 16px; border: 1px solid rgba(0,0,0,0.08); font-weight: 500; color: var(--text-primary, #1e293b);">
                ${phase.owner}
              </span>
              <span style="padding: 4px 12px; background: ${statusBg}; color: ${statusColor}; border-radius: 16px; font-weight: 500;">
                ${phase.status}
              </span>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 42px; font-weight: 700; color: var(--text-primary, #1e293b); line-height: 1;">${phase.completed}<span style="font-size: 20px; color: var(--text-secondary, #64748b); font-weight: 600;">/${phase.gates}</span></div>
            <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary, #64748b); letter-spacing: 0.5px; margin-top: 8px; text-transform: uppercase;">TASK PROGRESS COUNT</div>
          </div>
        </div>
        
        <div class="phase-gates-list" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px;">
          ${itemsHtml}
        </div>
      `;
      }
"""

content = re.sub(
    r'const phaseData = \[.*?\}\s*\];\s*function renderPhase\(id\) \{.*?\n      \}\n',
    new_phase_data_js,
    content,
    flags=re.DOTALL
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated workspace.html successfully.")
