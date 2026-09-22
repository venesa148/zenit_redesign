import re

# 1. Remove display: block; from workspace.html inline style
with open(r'd:\intern\zenit_redesign\workspace.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

old_style = 'box-sizing: border-box; display: block;"'
new_style = 'box-sizing: border-box;"'
html_content = html_content.replace(old_style, new_style)

with open(r'd:\intern\zenit_redesign\workspace.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

# 2. Add #docPanelPrd.active { display: block !important; } to documents.css
with open(r'd:\intern\zenit_redesign\css\documents.css', 'a', encoding='utf-8') as f:
    f.write('\n\n/* Fix for docPanelPrd flex overflow bug while allowing it to be hidden */\n#docPanelPrd.active {\n  display: block !important;\n}\n')
