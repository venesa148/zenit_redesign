import os

svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1420 860" width="1420" height="860" style="display: block; width: 100%; height: 100%; font-family: 'Plus Jakarta Sans', Inter, system-ui, sans-serif;">
  <defs>
    <!-- Soft Table Drop Shadow -->
    <filter id="erd-table-shadow" x="-5%" y="-5%" width="112%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.07"/>
    </filter>

    <!-- Crow's foot (Many) marker -->
    <marker id="crows-foot" viewBox="0 0 18 18" refX="16" refY="9" markerWidth="14" markerHeight="14" orient="auto">
      <path d="M 2 2 L 16 9 L 2 16" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
      <line x1="16" y1="2" x2="16" y2="16" stroke="#6366f1" stroke-width="2"/>
    </marker>

    <!-- One and Only One marker -->
    <marker id="one-one" viewBox="0 0 16 16" refX="2" refY="8" markerWidth="12" markerHeight="12" orient="auto">
      <line x1="5" y1="2" x2="5" y2="14" stroke="#6366f1" stroke-width="2.2"/>
      <line x1="10" y1="2" x2="10" y2="14" stroke="#6366f1" stroke-width="2.2"/>
    </marker>

    <!-- Optional One (Zero or One) marker -->
    <marker id="zero-one" viewBox="0 0 20 16" refX="18" refY="8" markerWidth="14" markerHeight="12" orient="auto">
      <circle cx="6" cy="8" r="4" fill="#ffffff" stroke="#6366f1" stroke-width="2"/>
      <line x1="15" y1="2" x2="15" y2="14" stroke="#6366f1" stroke-width="2.2"/>
    </marker>

    <!-- Pill Badge Filter -->
    <filter id="label-shadow" x="-10%" y="-10%" width="120%" height="125%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- ==========================================
       RELATIONSHIP CONNECTOR LINES (CURVED BEZIERS)
       ========================================== -->

  <!-- 1. KATEGORI_LAYANAN (320, 105) -> LAYANAN (400, 105) [1 : N] -->
  <path d="M 320 105 L 400 105" stroke="#6366f1" stroke-width="2" fill="none" marker-start="url(#one-one)" marker-end="url(#crows-foot)"/>
  <g transform="translate(330, 93)" filter="url(#label-shadow)">
    <rect width="60" height="22" rx="4" fill="#ffffff" stroke="#c7d2fe" stroke-width="1"/>
    <text x="30" y="15" text-anchor="middle" font-size="10.5" font-weight="700" fill="#4338ca">1 : N</text>
  </g>

  <!-- 2. LAYANAN (690, 130) -> DETAIL_JANJI_TEMU (1050, 370) [1 : N] -->
  <path d="M 690 130 C 880 130, 910 370, 1050 370" stroke="#6366f1" stroke-width="2" fill="none" marker-start="url(#one-one)" marker-end="url(#crows-foot)"/>
  <g transform="translate(840, 225)" filter="url(#label-shadow)">
    <rect width="118" height="24" rx="4" fill="#ffffff" stroke="#c7d2fe" stroke-width="1"/>
    <text x="59" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="#4338ca">1 : N (layanan_id)</text>
  </g>

  <!-- 3. STAF_KAPSTER (1080, 130) -> JANJI_TEMU (840, 390) [1 : N] -->
  <path d="M 1080 130 C 960 130, 950 390, 840 390" stroke="#6366f1" stroke-width="2" fill="none" marker-start="url(#one-one)" marker-end="url(#crows-foot)"/>
  <g transform="translate(920, 295)" filter="url(#label-shadow)">
    <rect width="102" height="24" rx="4" fill="#ffffff" stroke="#c7d2fe" stroke-width="1"/>
    <text x="51" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="#4338ca">1 : N (staf_id)</text>
  </g>

  <!-- 4. PELANGGAN (330, 410) -> JANJI_TEMU (520, 410) [1 : N] -->
  <path d="M 330 410 L 520 410" stroke="#6366f1" stroke-width="2" fill="none" marker-start="url(#one-one)" marker-end="url(#crows-foot)"/>
  <g transform="translate(385, 398)" filter="url(#label-shadow)">
    <rect width="80" height="24" rx="4" fill="#ffffff" stroke="#c7d2fe" stroke-width="1"/>
    <text x="40" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="#4338ca">1 : N (booking)</text>
  </g>

  <!-- 5. JANJI_TEMU (840, 445) -> DETAIL_JANJI_TEMU (1050, 445) [1 : N] -->
  <path d="M 840 445 L 1050 445" stroke="#6366f1" stroke-width="2" fill="none" marker-start="url(#one-one)" marker-end="url(#crows-foot)"/>
  <g transform="translate(905, 433)" filter="url(#label-shadow)">
    <rect width="82" height="24" rx="4" fill="#ffffff" stroke="#c7d2fe" stroke-width="1"/>
    <text x="41" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="#4338ca">1 : N (item)</text>
  </g>

  <!-- 6. JANJI_TEMU (600, 540) -> PEMBAYARAN (520, 630) [1 : 1] -->
  <path d="M 600 540 C 600 585, 520 585, 520 630" stroke="#6366f1" stroke-width="2" fill="none" marker-start="url(#one-one)" marker-end="url(#one-one)"/>
  <g transform="translate(525, 570)" filter="url(#label-shadow)">
    <rect width="70" height="24" rx="4" fill="#ffffff" stroke="#c7d2fe" stroke-width="1"/>
    <text x="35" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="#4338ca">1 : 1 (bayar)</text>
  </g>

  <!-- 7. JANJI_TEMU (760, 540) -> ULASAN (920, 630) [1 : 0..1] -->
  <path d="M 760 540 C 760 585, 920 585, 920 630" stroke="#6366f1" stroke-width="2" fill="none" marker-start="url(#one-one)" marker-end="url(#zero-one)"/>
  <g transform="translate(805, 570)" filter="url(#label-shadow)">
    <rect width="78" height="24" rx="4" fill="#ffffff" stroke="#c7d2fe" stroke-width="1"/>
    <text x="39" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="#4338ca">1 : 0..1 (review)</text>
  </g>

  <!-- 8. PELANGGAN (185, 510) -> ULASAN (840, 750) [1 : N] -->
  <path d="M 185 510 C 185 760, 480 760, 840 760" stroke="#6366f1" stroke-width="2" fill="none" marker-start="url(#one-one)" marker-end="url(#crows-foot)"/>
  <g transform="translate(280, 748)" filter="url(#label-shadow)">
    <rect width="130" height="24" rx="4" fill="#ffffff" stroke="#c7d2fe" stroke-width="1"/>
    <text x="65" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="#4338ca">1 : N (pelanggan_ulasan)</text>
  </g>


  <!-- ==========================================
       ENTITY TABLES (SALON DATABASE)
       ========================================== -->

  <!-- TABLE 1: KATEGORI_LAYANAN -->
  <g transform="translate(40, 45)" filter="url(#erd-table-shadow)">
    <rect width="280" height="125" rx="8" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.6"/>
    <path d="M 0 8 Q 0 0 8 0 L 272 0 Q 280 0 280 8 L 280 36 L 0 36 Z" fill="#ede9fe"/>
    <rect x="12" y="10" width="16" height="16" rx="3" fill="#8b5cf6"/>
    <text x="16" y="22" font-size="10" font-weight="800" fill="#ffffff">T</text>
    <text x="36" y="23" font-size="12.5" font-weight="700" fill="#4338ca">KATEGORI_LAYANAN</text>
    <rect x="220" y="9" width="48" height="18" rx="3" fill="#f5f3ff" stroke="#c4b5fd"/>
    <text x="244" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6d28d9">MASTER</text>
    <line x1="0" y1="36" x2="280" y2="36" stroke="#c4b5fd" stroke-width="1"/>
    
    <!-- Row 1: id -->
    <text x="14" y="58" font-size="11" fill="#64748b">int</text>
    <text x="68" y="58" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">id</text>
    <rect x="236" y="47" width="32" height="16" rx="3" fill="#ede9fe" stroke="#c4b5fd"/>
    <text x="252" y="59" text-anchor="middle" font-size="9" font-weight="700" fill="#5b21b6">PK</text>
    <line x1="10" y1="68" x2="270" y2="68" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 2: nama_kategori -->
    <text x="14" y="86" font-size="11" fill="#64748b">varchar(60)</text>
    <text x="88" y="86" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">nama_kategori</text>
    <line x1="10" y1="96" x2="270" y2="96" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 3: deskripsi -->
    <text x="14" y="114" font-size="11" fill="#64748b">text</text>
    <text x="68" y="114" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">deskripsi</text>
    <text x="268" y="114" text-anchor="end" font-size="9.5" fill="#94a3b8">null</text>
  </g>


  <!-- TABLE 2: LAYANAN -->
  <g transform="translate(400, 45)" filter="url(#erd-table-shadow)">
    <rect width="290" height="175" rx="8" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.6"/>
    <path d="M 0 8 Q 0 0 8 0 L 282 0 Q 290 0 290 8 L 290 36 L 0 36 Z" fill="#ede9fe"/>
    <rect x="12" y="10" width="16" height="16" rx="3" fill="#8b5cf6"/>
    <text x="16" y="22" font-size="10" font-weight="800" fill="#ffffff">T</text>
    <text x="36" y="23" font-size="12.5" font-weight="700" fill="#4338ca">LAYANAN</text>
    <rect x="228" y="9" width="50" height="18" rx="3" fill="#f5f3ff" stroke="#c4b5fd"/>
    <text x="253" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6d28d9">KATALOG</text>
    <line x1="0" y1="36" x2="290" y2="36" stroke="#c4b5fd" stroke-width="1"/>
    
    <!-- Row 1: id -->
    <text x="14" y="58" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="58" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">id</text>
    <rect x="246" y="47" width="32" height="16" rx="3" fill="#ede9fe" stroke="#c4b5fd"/>
    <text x="262" y="59" text-anchor="middle" font-size="9" font-weight="700" fill="#5b21b6">PK</text>
    <line x1="10" y1="68" x2="280" y2="68" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 2: kategori_id -->
    <text x="14" y="86" font-size="11" fill="#64748b">int</text>
    <text x="74" y="86" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">kategori_id</text>
    <rect x="246" y="75" width="32" height="16" rx="3" fill="#e0f2fe" stroke="#7dd3fc"/>
    <text x="262" y="87" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">FK</text>
    <line x1="10" y1="96" x2="280" y2="96" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 3: nama_layanan -->
    <text x="14" y="114" font-size="11" fill="#64748b">varchar(100)</text>
    <text x="100" y="114" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">nama_layanan</text>
    <line x1="10" y1="124" x2="280" y2="124" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 4: durasi_menit -->
    <text x="14" y="142" font-size="11" fill="#64748b">int</text>
    <text x="74" y="142" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">durasi_menit</text>
    <line x1="10" y1="152" x2="280" y2="152" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 5: harga -->
    <text x="14" y="170" font-size="11" fill="#64748b">numeric(12,2)</text>
    <text x="100" y="170" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">harga</text>
  </g>


  <!-- TABLE 3: STAF_KAPSTER -->
  <g transform="translate(1080, 45)" filter="url(#erd-table-shadow)">
    <rect width="290" height="175" rx="8" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.6"/>
    <path d="M 0 8 Q 0 0 8 0 L 282 0 Q 290 0 290 8 L 290 36 L 0 36 Z" fill="#ede9fe"/>
    <rect x="12" y="10" width="16" height="16" rx="3" fill="#8b5cf6"/>
    <text x="16" y="22" font-size="10" font-weight="800" fill="#ffffff">T</text>
    <text x="36" y="23" font-size="12.5" font-weight="700" fill="#4338ca">STAF_KAPSTER</text>
    <rect x="228" y="9" width="50" height="18" rx="3" fill="#f5f3ff" stroke="#c4b5fd"/>
    <text x="253" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6d28d9">TEAM</text>
    <line x1="0" y1="36" x2="290" y2="36" stroke="#c4b5fd" stroke-width="1"/>
    
    <!-- Row 1: id -->
    <text x="14" y="58" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="58" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">id</text>
    <rect x="246" y="47" width="32" height="16" rx="3" fill="#ede9fe" stroke="#c4b5fd"/>
    <text x="262" y="59" text-anchor="middle" font-size="9" font-weight="700" fill="#5b21b6">PK</text>
    <line x1="10" y1="68" x2="280" y2="68" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 2: nama_kapster -->
    <text x="14" y="86" font-size="11" fill="#64748b">varchar(100)</text>
    <text x="100" y="86" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">nama_kapster</text>
    <line x1="10" y1="96" x2="280" y2="96" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 3: spesialisasi -->
    <text x="14" y="114" font-size="11" fill="#64748b">varchar(80)</text>
    <text x="100" y="114" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">spesialisasi</text>
    <line x1="10" y1="124" x2="280" y2="124" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 4: telepon -->
    <text x="14" y="142" font-size="11" fill="#64748b">varchar(20)</text>
    <text x="100" y="142" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">nomor_telepon</text>
    <line x1="10" y1="152" x2="280" y2="152" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 5: status_aktif -->
    <text x="14" y="170" font-size="11" fill="#64748b">boolean</text>
    <text x="74" y="170" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">status_aktif</text>
  </g>


  <!-- TABLE 4: PELANGGAN -->
  <g transform="translate(40, 310)" filter="url(#erd-table-shadow)">
    <rect width="290" height="200" rx="8" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.6"/>
    <path d="M 0 8 Q 0 0 8 0 L 282 0 Q 290 0 290 8 L 290 36 L 0 36 Z" fill="#ede9fe"/>
    <rect x="12" y="10" width="16" height="16" rx="3" fill="#8b5cf6"/>
    <text x="16" y="22" font-size="10" font-weight="800" fill="#ffffff">T</text>
    <text x="36" y="23" font-size="12.5" font-weight="700" fill="#4338ca">PELANGGAN</text>
    <rect x="228" y="9" width="50" height="18" rx="3" fill="#f5f3ff" stroke="#c4b5fd"/>
    <text x="253" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6d28d9">ENTITY</text>
    <line x1="0" y1="36" x2="290" y2="36" stroke="#c4b5fd" stroke-width="1"/>
    
    <!-- Row 1: id -->
    <text x="14" y="58" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="58" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">id</text>
    <rect x="246" y="47" width="32" height="16" rx="3" fill="#ede9fe" stroke="#c4b5fd"/>
    <text x="262" y="59" text-anchor="middle" font-size="9" font-weight="700" fill="#5b21b6">PK</text>
    <line x1="10" y1="68" x2="280" y2="68" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 2: nama_lengkap -->
    <text x="14" y="86" font-size="11" fill="#64748b">varchar(100)</text>
    <text x="100" y="86" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">nama_lengkap</text>
    <line x1="10" y1="96" x2="280" y2="96" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 3: nomor_telepon -->
    <text x="14" y="114" font-size="11" fill="#64748b">varchar(20)</text>
    <text x="100" y="114" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">nomor_telepon</text>
    <rect x="246" y="103" width="32" height="16" rx="3" fill="#fef3c7" stroke="#fde68a"/>
    <text x="262" y="115" text-anchor="middle" font-size="9" font-weight="700" fill="#b45309">UQ</text>
    <line x1="10" y1="124" x2="280" y2="124" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 4: email -->
    <text x="14" y="142" font-size="11" fill="#64748b">varchar(120)</text>
    <text x="100" y="142" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">email</text>
    <text x="278" y="142" text-anchor="end" font-size="9.5" fill="#94a3b8">null</text>
    <line x1="10" y1="152" x2="280" y2="152" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 5: poin_loyalitas -->
    <text x="14" y="170" font-size="11" fill="#64748b">int</text>
    <text x="74" y="170" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">poin_loyalitas</text>
    <line x1="10" y1="180" x2="280" y2="180" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 6: created_at -->
    <text x="14" y="196" font-size="11" fill="#64748b">timestamp</text>
    <text x="80" y="196" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">created_at</text>
  </g>


  <!-- TABLE 5: JANJI_TEMU (CENTER TRANSACTION HUB) -->
  <g transform="translate(520, 310)" filter="url(#erd-table-shadow)">
    <rect width="320" height="230" rx="8" fill="#ffffff" stroke="#6366f1" stroke-width="2"/>
    <path d="M 0 8 Q 0 0 8 0 L 312 0 Q 320 0 320 8 L 320 36 L 0 36 Z" fill="#ede9fe"/>
    <rect x="12" y="10" width="16" height="16" rx="3" fill="#6366f1"/>
    <text x="16" y="22" font-size="10" font-weight="800" fill="#ffffff">T</text>
    <text x="36" y="23" font-size="12.5" font-weight="700" fill="#4338ca">JANJI_TEMU</text>
    <rect x="238" y="9" width="70" height="18" rx="3" fill="#e0e7ff" stroke="#a5b4fc"/>
    <text x="273" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#4338ca">CORE TRANX</text>
    <line x1="0" y1="36" x2="320" y2="36" stroke="#c4b5fd" stroke-width="1.2"/>
    
    <!-- Row 1: id -->
    <text x="14" y="58" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="58" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">id</text>
    <rect x="276" y="47" width="32" height="16" rx="3" fill="#ede9fe" stroke="#c4b5fd"/>
    <text x="292" y="59" text-anchor="middle" font-size="9" font-weight="700" fill="#5b21b6">PK</text>
    <line x1="10" y1="68" x2="310" y2="68" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 2: kode_booking -->
    <text x="14" y="86" font-size="11" fill="#64748b">varchar(20)</text>
    <text x="100" y="86" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">kode_booking</text>
    <rect x="276" y="75" width="32" height="16" rx="3" fill="#fef3c7" stroke="#fde68a"/>
    <text x="292" y="87" text-anchor="middle" font-size="9" font-weight="700" fill="#b45309">UQ</text>
    <line x1="10" y1="96" x2="310" y2="96" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 3: pelanggan_id -->
    <text x="14" y="114" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="114" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">pelanggan_id</text>
    <rect x="276" y="103" width="32" height="16" rx="3" fill="#e0f2fe" stroke="#7dd3fc"/>
    <text x="292" y="115" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">FK</text>
    <line x1="10" y1="124" x2="310" y2="124" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 4: staf_id -->
    <text x="14" y="142" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="142" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">staf_id</text>
    <rect x="276" y="131" width="32" height="16" rx="3" fill="#e0f2fe" stroke="#7dd3fc"/>
    <text x="292" y="143" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">FK</text>
    <line x1="10" y1="152" x2="310" y2="152" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 5: tanggal_waktu -->
    <text x="14" y="170" font-size="11" fill="#64748b">timestamp</text>
    <text x="80" y="170" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">tanggal_waktu</text>
    <line x1="10" y1="180" x2="310" y2="180" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 6: status -->
    <text x="14" y="196" font-size="11" fill="#64748b">varchar(20)</text>
    <text x="100" y="196" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">status</text>
    <line x1="10" y1="206" x2="310" y2="206" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 7: total_biaya -->
    <text x="14" y="222" font-size="11" fill="#64748b">numeric(12,2)</text>
    <text x="100" y="222" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">total_biaya</text>
  </g>


  <!-- TABLE 6: DETAIL_JANJI_TEMU (JUNCTION TABLE) -->
  <g transform="translate(1050, 310)" filter="url(#erd-table-shadow)">
    <rect width="320" height="175" rx="8" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.6"/>
    <path d="M 0 8 Q 0 0 8 0 L 312 0 Q 320 0 320 8 L 320 36 L 0 36 Z" fill="#ede9fe"/>
    <rect x="12" y="10" width="16" height="16" rx="3" fill="#8b5cf6"/>
    <text x="16" y="22" font-size="10" font-weight="800" fill="#ffffff">T</text>
    <text x="36" y="23" font-size="12.5" font-weight="700" fill="#4338ca">DETAIL_JANJI_TEMU</text>
    <rect x="248" y="9" width="60" height="18" rx="3" fill="#f5f3ff" stroke="#c4b5fd"/>
    <text x="278" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6d28d9">JUNCTION</text>
    <line x1="0" y1="36" x2="320" y2="36" stroke="#c4b5fd" stroke-width="1"/>
    
    <!-- Row 1: id -->
    <text x="14" y="58" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="58" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">id</text>
    <rect x="276" y="47" width="32" height="16" rx="3" fill="#ede9fe" stroke="#c4b5fd"/>
    <text x="292" y="59" text-anchor="middle" font-size="9" font-weight="700" fill="#5b21b6">PK</text>
    <line x1="10" y1="68" x2="310" y2="68" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 2: janji_temu_id -->
    <text x="14" y="86" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="86" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">janji_temu_id</text>
    <rect x="276" y="75" width="32" height="16" rx="3" fill="#e0f2fe" stroke="#7dd3fc"/>
    <text x="292" y="87" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">FK</text>
    <line x1="10" y1="96" x2="310" y2="96" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 3: layanan_id -->
    <text x="14" y="114" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="114" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">layanan_id</text>
    <rect x="276" y="103" width="32" height="16" rx="3" fill="#e0f2fe" stroke="#7dd3fc"/>
    <text x="292" y="115" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">FK</text>
    <line x1="10" y1="124" x2="310" y2="124" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 4: harga_saat_pesan -->
    <text x="14" y="142" font-size="11" fill="#64748b">numeric(12,2)</text>
    <text x="100" y="142" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">harga_saat_pesan</text>
    <line x1="10" y1="152" x2="310" y2="152" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 5: catatan_khusus -->
    <text x="14" y="170" font-size="11" fill="#64748b">text</text>
    <text x="74" y="170" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">catatan_khusus</text>
    <text x="308" y="170" text-anchor="end" font-size="9.5" fill="#94a3b8">null</text>
  </g>


  <!-- TABLE 7: PEMBAYARAN -->
  <g transform="translate(360, 630)" filter="url(#erd-table-shadow)">
    <rect width="320" height="200" rx="8" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.6"/>
    <path d="M 0 8 Q 0 0 8 0 L 312 0 Q 320 0 320 8 L 320 36 L 0 36 Z" fill="#ede9fe"/>
    <rect x="12" y="10" width="16" height="16" rx="3" fill="#8b5cf6"/>
    <text x="16" y="22" font-size="10" font-weight="800" fill="#ffffff">T</text>
    <text x="36" y="23" font-size="12.5" font-weight="700" fill="#4338ca">PEMBAYARAN</text>
    <rect x="238" y="9" width="70" height="18" rx="3" fill="#f5f3ff" stroke="#c4b5fd"/>
    <text x="273" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6d28d9">FINANCIAL</text>
    <line x1="0" y1="36" x2="320" y2="36" stroke="#c4b5fd" stroke-width="1"/>
    
    <!-- Row 1: id -->
    <text x="14" y="58" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="58" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">id</text>
    <rect x="276" y="47" width="32" height="16" rx="3" fill="#ede9fe" stroke="#c4b5fd"/>
    <text x="292" y="59" text-anchor="middle" font-size="9" font-weight="700" fill="#5b21b6">PK</text>
    <line x1="10" y1="68" x2="310" y2="68" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 2: janji_temu_id -->
    <text x="14" y="86" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="86" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">janji_temu_id</text>
    <rect x="236" y="75" width="32" height="16" rx="3" fill="#e0f2fe" stroke="#7dd3fc"/>
    <text x="252" y="87" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">FK</text>
    <rect x="276" y="75" width="32" height="16" rx="3" fill="#fef3c7" stroke="#fde68a"/>
    <text x="292" y="87" text-anchor="middle" font-size="9" font-weight="700" fill="#b45309">UQ</text>
    <line x1="10" y1="96" x2="310" y2="96" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 3: metode_bayar -->
    <text x="14" y="114" font-size="11" fill="#64748b">varchar(30)</text>
    <text x="100" y="114" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">metode_bayar</text>
    <line x1="10" y1="124" x2="310" y2="124" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 4: jumlah_bayar -->
    <text x="14" y="142" font-size="11" fill="#64748b">numeric(12,2)</text>
    <text x="100" y="142" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">jumlah_bayar</text>
    <line x1="10" y1="152" x2="310" y2="152" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 5: status_bayar -->
    <text x="14" y="170" font-size="11" fill="#64748b">varchar(20)</text>
    <text x="100" y="170" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">status_bayar</text>
    <line x1="10" y1="180" x2="310" y2="180" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 6: waktu_bayar -->
    <text x="14" y="196" font-size="11" fill="#64748b">timestamp</text>
    <text x="80" y="196" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">waktu_bayar</text>
  </g>


  <!-- TABLE 8: ULASAN -->
  <g transform="translate(840, 630)" filter="url(#erd-table-shadow)">
    <rect width="320" height="200" rx="8" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.6"/>
    <path d="M 0 8 Q 0 0 8 0 L 312 0 Q 320 0 320 8 L 320 36 L 0 36 Z" fill="#ede9fe"/>
    <rect x="12" y="10" width="16" height="16" rx="3" fill="#8b5cf6"/>
    <text x="16" y="22" font-size="10" font-weight="800" fill="#ffffff">T</text>
    <text x="36" y="23" font-size="12.5" font-weight="700" fill="#4338ca">ULASAN</text>
    <rect x="238" y="9" width="70" height="18" rx="3" fill="#f5f3ff" stroke="#c4b5fd"/>
    <text x="273" y="22" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6d28d9">FEEDBACK</text>
    <line x1="0" y1="36" x2="320" y2="36" stroke="#c4b5fd" stroke-width="1"/>
    
    <!-- Row 1: id -->
    <text x="14" y="58" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="58" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">id</text>
    <rect x="276" y="47" width="32" height="16" rx="3" fill="#ede9fe" stroke="#c4b5fd"/>
    <text x="292" y="59" text-anchor="middle" font-size="9" font-weight="700" fill="#5b21b6">PK</text>
    <line x1="10" y1="68" x2="310" y2="68" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 2: janji_temu_id -->
    <text x="14" y="86" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="86" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">janji_temu_id</text>
    <rect x="276" y="75" width="32" height="16" rx="3" fill="#e0f2fe" stroke="#7dd3fc"/>
    <text x="292" y="87" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">FK</text>
    <line x1="10" y1="96" x2="310" y2="96" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 3: pelanggan_id -->
    <text x="14" y="114" font-size="11" fill="#64748b">uuid</text>
    <text x="74" y="114" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">pelanggan_id</text>
    <rect x="276" y="103" width="32" height="16" rx="3" fill="#e0f2fe" stroke="#7dd3fc"/>
    <text x="292" y="115" text-anchor="middle" font-size="9" font-weight="700" fill="#0369a1">FK</text>
    <line x1="10" y1="124" x2="310" y2="124" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 4: rating -->
    <text x="14" y="142" font-size="11" fill="#64748b">int (1-5)</text>
    <text x="80" y="142" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">rating</text>
    <line x1="10" y1="152" x2="310" y2="152" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 5: komentar -->
    <text x="14" y="170" font-size="11" fill="#64748b">text</text>
    <text x="74" y="170" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">komentar</text>
    <text x="308" y="170" text-anchor="end" font-size="9.5" fill="#94a3b8">null</text>
    <line x1="10" y1="180" x2="310" y2="180" stroke="#f1f5f9" stroke-width="1"/>

    <!-- Row 6: created_at -->
    <text x="14" y="196" font-size="11" fill="#64748b">timestamp</text>
    <text x="80" y="196" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="600" fill="#0f172a">created_at</text>
  </g>
</svg>"""

with open("scratch/erd_svg_snippet.txt", "w", encoding="utf-8") as f:
    f.write(svg_content)

print("SVG snippet successfully generated, length:", len(svg_content))
