with open('workspace.html', 'r', encoding='utf-8') as f:
    w1 = f.read()

pos_arch1 = w1.find('id="docPanelArchitecture"')
print('w1 docPanelArchitecture pos:', pos_arch1)

with open('workspace_f6e.html', 'r', encoding='utf-8') as f:
    w2 = f.read()

pos_arch2 = w2.find('id="docPanelArchitecture"')
print('w2 docPanelArchitecture pos:', pos_arch2)
