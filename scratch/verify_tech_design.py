for fname in ['workspace_f6e.html', 'workspace.html']:
    with open(fname, 'r', encoding='utf-8') as f:
        html = f.read()
    print('Checking ' + fname + '...')
    assert 'techSubTabsBar' in html, 'Missing techSubTabsBar'
    assert 'data-techsubtab="overview"' in html, 'Missing overview tab'
    assert 'data-techsubtab="decisions"' in html, 'Missing decisions tab'
    assert 'data-techsubtab="architecture"' in html, 'Missing architecture tab'
    assert 'data-techsubtab="database"' in html, 'Missing database tab'
    assert 'data-techsubtab="api"' in html, 'Missing api tab'
    assert 'data-techsubtab="sequence"' in html, 'Missing sequence tab'
    assert 'data-techsubtab="security"' in html, 'Missing security tab'
    assert 'data-techsubtab="ui"' in html, 'Missing ui tab'
    assert 'data-techsubtab="sprint"' in html, 'Missing sprint tab'
    assert 'docPanelTechDesign' in html, 'Missing docPanelTechDesign'
    assert 'techSubtab-overview' in html, 'Missing techSubtab-overview'
    assert 'techSubtab-decisions' in html, 'Missing techSubtab-decisions'
    assert 'techSubtab-architecture' in html, 'Missing techSubtab-architecture'
    assert 'techSubtab-database' in html, 'Missing techSubtab-database'
    assert 'techSubtab-api' in html, 'Missing techSubtab-api'
    assert 'techSubtab-sequence' in html, 'Missing techSubtab-sequence'
    assert 'techSubtab-security' in html, 'Missing techSubtab-security'
    assert 'techSubtab-ui' in html, 'Missing techSubtab-ui'
    assert 'techSubtab-sprint' in html, 'Missing techSubtab-sprint'
    assert 'Technical Design adalah cetak biru teknis lengkap' in html, 'Missing lead quote'
    print('  ✓ All 21 assertions passed for ' + fname + '!')

print('\nAll files verified successfully!')
