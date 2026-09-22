import re

with open(r'd:\intern\zenit_redesign\js\workspace.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_logic = """
  // 6. Preview / Edit Mode Toggles
  const btnPreviewMode = document.getElementById('btnPreviewMode');
  const btnEditMode = document.getElementById('btnEditMode');
  const docEditSidebar = document.getElementById('docEditSidebar');
  const btnCloseEdit = document.getElementById('btnCloseEdit');

  if (btnPreviewMode && btnEditMode && docEditSidebar) {
    btnEditMode.addEventListener('click', () => {
      btnEditMode.classList.add('active');
      btnPreviewMode.classList.remove('active');
      docEditSidebar.style.display = 'flex';
    });

    btnPreviewMode.addEventListener('click', () => {
      btnPreviewMode.classList.add('active');
      btnEditMode.classList.remove('active');
      docEditSidebar.style.display = 'none';
    });

    if (btnCloseEdit) {
      btnCloseEdit.addEventListener('click', () => {
        btnPreviewMode.click();
      });
    }
  }
}"""

content = content.replace("\n}\n", new_logic + "\n")

with open(r'd:\intern\zenit_redesign\js\workspace.js', 'w', encoding='utf-8') as f:
    f.write(content)
