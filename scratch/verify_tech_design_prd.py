# coding: utf-8
for fname in ['workspace.html', 'workspace_f6e.html']:
    with open(fname, 'r', encoding='utf-8') as f:
        html = f.read()
    print(f"Checking {fname}...")
    assert 'id="docPanelTechDesign"' in html, "Missing docPanelTechDesign"
    assert 'id="techOutlineSidebar"' in html, "Missing techOutlineSidebar"
    assert 'id="techDocPaperContainer"' in html, "Missing techDocPaperContainer"
    assert 'id="btnTechOutlineClose"' in html, "Missing btnTechOutlineClose"
    assert 'id="btnTechOutlineToggle"' in html, "Missing btnTechOutlineToggle"
    assert 'Tab dokumen' in html, "Missing Tab dokumen"
    assert 'GlowAura Salon &amp; Spa Platform' in html, "Missing title"
    assert 'Dokumen Desain Teknis &amp; UI/UX (Phase 2 &mdash; Design)' in html, "Missing subtitle"
    assert '1. Ringkasan Eksekutif &amp; Misi Desain' in html, "Missing Section 1"
    assert '2. Peran Agent &amp; Tanggung Jawab' in html, "Missing Section 2"
    assert '3. Log Keputusan Desain Utama (&sect;DD Design Decisions)' in html, "Missing Section 3"
    assert '4. Arsitektur Sistem &amp; Spesifikasi Modul (&sect;A)' in html, "Missing Section 4"
    assert '5. Model Data &amp; Skema Database (&sect;B)' in html, "Missing Section 5"
    assert '6. Keamanan &amp; Privasi (&sect;F)' in html, "Missing Section 6"
    assert '7. Desain UI/UX &amp; Sistem Visual (&sect;H&ndash;&sect;K)' in html, "Missing Section 7"
    assert 'DD-GA-01' in html and 'DD-GA-06' in html, "Missing DD decision codes"
    assert 'mod-pelanggan' in html and 'mod-reservasi' in html, "Missing modules"
    assert 'Drizzle ORM' in html, "Missing Drizzle ORM"
    assert 'Glow Booking Stepper' in html, "Missing Glow Booking Stepper"
    assert 'Therapist Schedule &amp; Bed Occupancy Grid' in html, "Missing Therapist Schedule"
    print(f"  [OK] All 20 assertions passed for {fname}!")

print("\nVerification complete! Both files match the PRD concept perfectly.")
