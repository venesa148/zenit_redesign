import re

# 1. Extract the new monitoring HTML from workspace.html
with open(r'd:\intern\zenit_redesign\workspace.html', 'r', encoding='utf-8') as f:
    workspace_content = f.read()

start_marker = '<!-- Pane 1: Monitoring -->'
end_marker = '<!-- Pane 2: Sessions -->'

idx1 = workspace_content.find(start_marker)
idx2 = workspace_content.find(end_marker)

if idx1 == -1 or idx2 == -1:
    print("Could not extract from workspace.html")
    exit(1)

new_monitoring = workspace_content[idx1:idx2]

files_to_update = [
    r'd:\intern\zenit_redesign\all-projects.html',
    r'd:\intern\zenit_redesign\dashboard.html',
    r'd:\intern\zenit_redesign\new-project.html'
]

for filepath in files_to_update:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        start_idx = content.find(start_marker)
        end_idx = content.find(end_marker)
        
        if start_idx != -1 and end_idx != -1:
            content = content[:start_idx] + new_monitoring + content[end_idx:]
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filepath}")
        else:
            print(f"Markers not found in {filepath}")
            
    except Exception as e:
        print(f"Error updating {filepath}: {e}")
