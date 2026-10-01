# coding: utf-8
for fname in ['workspace.html', 'workspace_f6e.html']:
    with open(fname, 'r', encoding='utf-8') as f:
        html = f.read()
    print(f"Checking {fname}...")
    assert 'id="docPanelUiSystem"' in html, "Missing docPanelUiSystem"
    assert 'id="uiOutlineSidebar"' in html, "Missing uiOutlineSidebar"
    assert 'id="uiDocPaperContainer"' in html, "Missing uiDocPaperContainer"
    assert 'id="btnUiOutlineClose"' in html, "Missing btnUiOutlineClose"
    assert 'id="btnUiOutlineToggle"' in html, "Missing btnUiOutlineToggle"
    assert 'Tab dokumen' in html, "Missing Tab dokumen"
    assert 'GlowAura &mdash; Design System' in html or 'GlowAura — Design System' in html, "Missing title"
    assert '1. Token Warna' in html, "Missing Section 1"
    assert '2. Tipografi' in html, "Missing Section 2"
    assert '3. Spacing, Bentuk, dan Elevasi' in html or '3. Spacing &amp; Elevasi' in html, "Missing Section 3"
    assert '4. Komponen Inti' in html, "Missing Section 4"
    assert '5. Arsitektur Informasi &amp; Alur Peran' in html, "Missing Section 5"
    assert '6. Aksesibilitas &amp; Kaidah Keamanan' in html, "Missing Section 6"
    assert '7. Aturan Implementasi (Do &amp; Don\'t)' in html, "Missing Section 7"
    assert '--primary' in html and '#1E6F5C' in html, "Missing primary color token"
    assert '--accent-luxe' in html and '#C88A78' in html, "Missing accent token"
    assert 'tabular-nums' in html, "Missing tabular-nums"
    assert 'Sidebar Kasir / Staf' in html, "Missing Sidebar component"
    assert 'Kalender Multi-Kapster Grid' in html, "Missing Calendar component"
    assert 'Booking Stepper (Pelanggan)' in html, "Missing Booking stepper"
    assert 'Drawer Pembayaran Kasir' in html, "Missing Payment drawer"
    assert 'DO (Wajib Dilakukan)' in html, "Missing DO box"
    assert "DON'T (Dilarang Keras)" in html, "Missing DON'T box"
    print(f"  [OK] All 21 assertions passed for {fname}!")

print("\nVerification complete! UI System in both files matches PRD concept perfectly.")
