# coding: utf-8
import re

from generate_tech_design_prd_concept import html_tech_design_panel

# 1. Update workspace.html
with open('workspace.html', 'r', encoding='utf-8') as f:
    w1 = f.read()

start_td1 = w1.find('<div class="doc-panel-section" id="docPanelTechDesign">')
if start_td1 != -1:
    end_td1 = w1.find('<div class="doc-panel-section" id="docPanelUiSystem">', start_td1)
    if end_td1 != -1:
        # Check if there is a comment before docPanelTechDesign
        comment_pos = w1.rfind('<!-- PANEL 4: Technical Design Panel', 0, start_td1)
        if comment_pos != -1 and (start_td1 - comment_pos) < 150:
            replace_start = comment_pos
        else:
            replace_start = start_td1
        
        w1 = w1[:replace_start] + html_tech_design_panel.strip() + '\n\n          ' + w1[end_td1:]
        print("Successfully replaced docPanelTechDesign in workspace.html")
    else:
        print("ERROR: Could not find end of docPanelTechDesign in workspace.html")
else:
    print("ERROR: Could not find start of docPanelTechDesign in workspace.html")

with open('workspace.html', 'w', encoding='utf-8') as f:
    f.write(w1)

# 2. Extract docPanelPrd from workspace.html to sync to workspace_f6e.html if needed
start_prd1 = w1.find('<div class="doc-panel-section active" id="docPanelPrd">')
if start_prd1 == -1:
    start_prd1 = w1.find('id="docPanelPrd"')
    start_prd1 = w1.rfind('<div', 0, start_prd1)

end_prd1 = w1.find('<div class="doc-panel-section" id="docPanelArchitecture">', start_prd1)
prd_panel_w1 = w1[start_prd1:end_prd1].strip()

# 3. Update workspace_f6e.html
with open('workspace_f6e.html', 'r', encoding='utf-8') as f:
    w2 = f.read()

# Update docPanelPrd in workspace_f6e.html
start_prd2 = w2.find('id="docPanelPrd"')
if start_prd2 != -1:
    start_prd2_div = w2.rfind('<div', 0, start_prd2)
    end_prd2 = w2.find('<div class="doc-panel-section" id="docPanelArchitecture">', start_prd2)
    if end_prd2 != -1:
        w2 = w2[:start_prd2_div] + prd_panel_w1 + '\n\n            ' + w2[end_prd2:]
        print("Successfully synced modern docPanelPrd into workspace_f6e.html")

# Update docPanelTechDesign in workspace_f6e.html
start_td2 = w2.find('id="docPanelTechDesign"')
if start_td2 != -1:
    start_td2_div = w2.rfind('<div', 0, start_td2)
    end_td2 = w2.find('<div class="doc-panel-section" id="docPanelUiSystem">', start_td2)
    if end_td2 != -1:
        comment_pos2 = w2.rfind('<!-- PANEL 4: Technical Design Panel', 0, start_td2_div)
        if comment_pos2 != -1 and (start_td2_div - comment_pos2) < 150:
            replace_start2 = comment_pos2
        else:
            replace_start2 = start_td2_div
        w2 = w2[:replace_start2] + html_tech_design_panel.strip() + '\n\n            ' + w2[end_td2:]
        print("Successfully replaced docPanelTechDesign in workspace_f6e.html")
    else:
        print("ERROR: Could not find end of docPanelTechDesign in workspace_f6e.html")
else:
    print("ERROR: Could not find start of docPanelTechDesign in workspace_f6e.html")

with open('workspace_f6e.html', 'w', encoding='utf-8') as f:
    f.write(w2)

print("Done updating workspace files.")
