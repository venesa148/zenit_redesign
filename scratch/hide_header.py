import re

with open(r'd:\intern\zenit_redesign\js\workspace.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_logic = """      // Toggle Sub-Tabs Bar (Show for PRD, hide or adapt for others)
      if (subTabsBar) {
        if (targetId === 'docPanelPrd') {
          subTabsBar.style.display = 'flex';
        } else {
          subTabsBar.style.display = 'none';
        }
      }"""

new_logic = """      // Toggle Sub-Tabs Bar (Show for PRD, hide or adapt for others)
      if (subTabsBar) {
        if (targetId === 'docPanelPrd') {
          subTabsBar.style.display = 'flex';
        } else {
          subTabsBar.style.display = 'none';
        }
      }

      // Hide Edit Header and Sidebar when not in PRD/BRD
      const docHeaderTop = document.querySelector('.doc-header-top');
      const docEditSidebar = document.getElementById('docEditSidebar');
      
      if (targetId === 'docPanelPrd' || targetId === 'docPanelBRD') {
        if (docHeaderTop) docHeaderTop.style.display = 'flex';
      } else {
        if (docHeaderTop) docHeaderTop.style.display = 'none';
        if (docEditSidebar) docEditSidebar.style.display = 'none';
        
        // Reset preview mode buttons
        const btnPreviewMode = document.getElementById('btnPreviewMode');
        const btnEditMode = document.getElementById('btnEditMode');
        if (btnPreviewMode) {
            btnPreviewMode.classList.add('active');
            btnPreviewMode.style.background = '#e2e8f0';
            btnPreviewMode.style.color = 'var(--text-primary)';
        }
        if (btnEditMode) {
            btnEditMode.classList.remove('active');
            btnEditMode.style.background = 'transparent';
            btnEditMode.style.color = 'var(--text-secondary)';
        }
      }"""

content = content.replace(old_logic, new_logic)

with open(r'd:\intern\zenit_redesign\js\workspace.js', 'w', encoding='utf-8') as f:
    f.write(content)
