# coding: utf-8
from generate_ui_system_prd_concept import html_ui_system_panel

# 1. Update workspace.html
with open('workspace.html', 'r', encoding='utf-8') as f:
    w1 = f.read()

start_ui1 = w1.find('<div class="doc-panel-section" id="docPanelUiSystem">')
if start_ui1 != -1:
    end_ui1 = w1.find('<div class="doc-panel-section" id="docPanelReadme">', start_ui1)
    if end_ui1 != -1:
        # Check if there's a comment before
        comment_pos = w1.rfind('<!-- PANEL 5:', 0, start_ui1)
        if comment_pos != -1 and (start_ui1 - comment_pos) < 100:
            replace_start = comment_pos
        else:
            replace_start = start_ui1

        w1 = w1[:replace_start] + html_ui_system_panel.strip() + '\n\n          ' + w1[end_ui1:]
        with open('workspace.html', 'w', encoding='utf-8') as f:
            f.write(w1)
        print("Successfully updated docPanelUiSystem in workspace.html")
    else:
        print("ERROR: end_ui1 not found in workspace.html")
else:
    print("ERROR: start_ui1 not found in workspace.html")

# 2. Update workspace_f6e.html
with open('workspace_f6e.html', 'r', encoding='utf-8') as f:
    w2 = f.read()

start_ui2 = w2.find('<div class="doc-panel-section" id="docPanelUiSystem">')
if start_ui2 != -1:
    end_ui2 = w2.find('<div class="doc-panel-section" id="docPanelReadme">', start_ui2)
    if end_ui2 != -1:
        comment_pos2 = w2.rfind('<!-- PANEL 5:', 0, start_ui2)
        if comment_pos2 != -1 and (start_ui2 - comment_pos2) < 100:
            replace_start2 = comment_pos2
        else:
            replace_start2 = start_ui2

        w2 = w2[:replace_start2] + html_ui_system_panel.strip() + '\n\n            ' + w2[end_ui2:]
        with open('workspace_f6e.html', 'w', encoding='utf-8') as f:
            f.write(w2)
        print("Successfully updated docPanelUiSystem in workspace_f6e.html")
    else:
        print("ERROR: end_ui2 not found in workspace_f6e.html")
else:
    print("ERROR: start_ui2 not found in workspace_f6e.html")

print("Both files updated!")
