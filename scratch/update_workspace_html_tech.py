# coding: utf-8
with open('scratch/build_tech_design_doc.py', 'r', encoding='utf-8') as f:
    script_text = f.read()

# Let's write the workspace.html update directly
with open('workspace.html', 'r', encoding='utf-8') as f:
    content = f.read()

import importlib.util
spec = importlib.util.spec_from_file_location("tech_builder", "scratch/build_tech_design_doc.py")
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)

# 1. Insert techSubTabsBar into workspace.html
if 'id="techSubTabsBar"' not in content:
    subtabs_pos = content.find('id="docSubTabsBar"')
    if subtabs_pos != -1:
        end_div = content.find('</div>', subtabs_pos)
        if end_div != -1:
            insert_pos = end_div + len('</div>')
            content = content[:insert_pos] + '\n\n' + builder.tech_subtabs_bar_html + content[insert_pos:]
            print("Inserted techSubTabsBar into workspace.html")

# 2. Replace docPanelTechDesign in workspace.html
start_panel = content.find('<div class="doc-panel-section" id="docPanelTechDesign">')
if start_panel != -1:
    end_panel = content.find('<div class="doc-panel-section" id="docPanelUiSystem">', start_panel)
    if end_panel != -1:
        content = content[:start_panel] + builder.tech_panel_html + '\n\n          ' + content[end_panel:]
        print("Replaced docPanelTechDesign in workspace.html")

with open('workspace.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("workspace.html updated successfully.")
