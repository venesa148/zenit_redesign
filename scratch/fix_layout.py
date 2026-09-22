import re

with open(r'd:\intern\zenit_redesign\workspace.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Update the layout of docPanelPrd to fix the chopped off top ("mencong")
old_div_start = """<div class="doc-panel-section active" id="docPanelPrd" style="background-color: #f1f5f9; padding: 40px 0; height: 100%; width: 100%; display: flex; justify-content: center; overflow-y: auto; flex: 1; box-sizing: border-box;">
              <div style="background: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); width: 850px; max-width: 90%; padding: 60px 80px; margin-bottom: 40px; height: max-content; color: var(--text-primary, #1e293b); font-family: 'Inter', system-ui, sans-serif; box-sizing: border-box;">"""

new_div_start = """<div class="doc-panel-section active" id="docPanelPrd" style="background-color: #f1f5f9; padding: 40px; height: 100%; width: 100%; overflow-y: auto; flex: 1; box-sizing: border-box; display: block;">
              <div style="background: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); width: 850px; max-width: 100%; padding: 60px 80px; margin: 0 auto 40px auto; color: var(--text-primary, #1e293b); font-family: 'Inter', system-ui, sans-serif; box-sizing: border-box;">"""

content = content.replace(old_div_start, new_div_start)

with open(r'd:\intern\zenit_redesign\workspace.html', 'w', encoding='utf-8') as f:
    f.write(content)
