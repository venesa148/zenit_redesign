import re

# 1. Update max-width in modal.css
css_file = r'd:\intern\zenit_redesign\css\modal.css'
try:
    with open(css_file, 'r', encoding='utf-8') as f:
        css_content = f.read()
    css_content = re.sub(r'max-width:\s*\d+px.*?;', 'max-width: 1600px;', css_content)
    # Also adjust the inner body width if necessary.
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(css_content)
    print("Updated modal.css to 1600px")
except Exception as e:
    print(f"Error on modal.css: {e}")

# 2. Update cache buster in HTML files
html_files = [
    r'd:\intern\zenit_redesign\all-projects.html',
    r'd:\intern\zenit_redesign\dashboard.html',
    r'd:\intern\zenit_redesign\new-project.html',
    r'd:\intern\zenit_redesign\workspace.html'
]

import random
new_v = random.randint(100, 999)

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            html_content = f.read()
            
        # Replace href="css/modal.css?v=..." with href="css/modal.css?v=NEW_V"
        html_content = re.sub(r'css/modal\.css(\?v=\d+)?', f'css/modal.css?v={new_v}', html_content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Updated cache buster in {filepath}")
    except Exception as e:
        print(f"Error on {filepath}: {e}")
