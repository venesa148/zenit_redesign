import re

# 1. Update max-width in modal.css
css_file = r'd:\intern\zenit_redesign\css\modal.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()
css_content = css_content.replace('max-width: 1100px;', 'max-width: 1400px; /* Diperlebar sesuai permintaan */')
with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css_content)

# 2. Update icons to emoticons in html files
html_files = [
    r'd:\intern\zenit_redesign\all-projects.html',
    r'd:\intern\zenit_redesign\dashboard.html',
    r'd:\intern\zenit_redesign\new-project.html',
    r'd:\intern\zenit_redesign\workspace.html'
]

emoticons = {
    'monitoring': '📊',
    'sessions': '⏱️',
    'people': '👥',
    'system': '⚙️',
    'myfiles': '📁'
}

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            html_content = f.read()
            
        for tab, icon in emoticons.items():
            pattern = r'(<button type="button" class="modal-nav-item[^"]*" data-tab="' + tab + r'">\s*)<svg.*?</svg>(\s*<span>)'
            replacement = r'\1<span style="font-size: 18px; margin-right: 4px;">' + icon + r'</span>\2'
            html_content = re.sub(pattern, replacement, html_content, flags=re.DOTALL)
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Updated {filepath}")
    except Exception as e:
        print(f"Error on {filepath}: {e}")
