import os
import glob

workspace_dir = r"d:\intern\zenit_redesign"

modal_html = """
<!-- Feedback Modal -->
<div id="feedbackModal" class="feedback-modal-overlay">
  <div class="feedback-modal">
    <div class="feedback-modal-header">
      <h2>Report a bug or suggest an improvement</h2>
      <button class="feedback-close-btn" id="feedbackCloseBtn">&times;</button>
    </div>
    <p class="feedback-modal-desc">Goes straight to the people building this. Where you are, which version you are on and any errors are attached automatically — you do not need to describe them.</p>
    
    <div class="feedback-type-toggles">
      <button class="feedback-type-btn active" data-type="bug">Bug</button>
      <button class="feedback-type-btn" data-type="improvement">Improvement</button>
      <button class="feedback-type-btn" data-type="question">Question</button>
    </div>
    
    <div class="feedback-form-group">
      <label>Title</label>
      <input type="text" placeholder="What happened, in one line" class="feedback-input">
    </div>
    
    <div class="feedback-form-group">
      <label>Details</label>
      <textarea placeholder="What you expected, what happened instead. Paste a screenshot straight into this box." class="feedback-textarea"></textarea>
    </div>
    
    <div class="feedback-modal-footer">
      <div class="feedback-image-upload">
        <button class="feedback-add-img-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          Add image
        </button>
        <span class="feedback-upload-hint">Paste, drag, or browse &middot; up to 4</span>
      </div>
      <button class="feedback-send-btn">Send report</button>
    </div>
  </div>
</div>
"""

modal_css = """
/* Feedback Modal Styles */
.feedback-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.feedback-modal-overlay.active {
  display: flex;
  opacity: 1;
}
.feedback-modal {
  background: #F6F5F3;
  width: 520px;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  font-family: inherit;
  color: #333;
}
.feedback-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}
.feedback-modal-header h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
}
.feedback-close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  line-height: 1;
  padding: 0;
}
.feedback-modal-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}
.feedback-type-toggles {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}
.feedback-type-btn {
  flex: 1;
  padding: 8px 0;
  background: transparent;
  border: 1px solid #E5E5E5;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #666;
  transition: all 0.2s;
}
.feedback-type-btn.active {
  background: #E5E5E5;
  color: #1a1a1a;
  border-color: #333;
}
.feedback-form-group {
  margin-bottom: 16px;
}
.feedback-form-group label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #1a1a1a;
}
.feedback-input, .feedback-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E5E5;
  border-radius: 6px;
  font-size: 13px;
  background: transparent;
  box-sizing: border-box;
}
.feedback-input {
  border-color: #333;
}
.feedback-textarea {
  height: 100px;
  resize: vertical;
}
.feedback-textarea:focus, .feedback-input:focus {
  border-color: #333;
  outline: none;
}
.feedback-modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10px;
}
.feedback-image-upload {
  display: flex;
  align-items: center;
  gap: 12px;
}
.feedback-add-img-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #fff;
  border: 1px solid #E5E5E5;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: #1a1a1a;
}
.feedback-upload-hint {
  font-size: 12px;
  color: #888;
}
.feedback-send-btn {
  padding: 8px 16px;
  background: #888;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 500;
}
.feedback-send-btn:hover {
  background: #666;
}
"""

modal_js = """
// Feedback modal logic
document.addEventListener('DOMContentLoaded', () => {
  const feedbackLinks = document.querySelectorAll('#feedbackLink, .global-sb-feedback-link');
  const modal = document.getElementById('feedbackModal');
  if (!modal) return;
  
  const closeBtn = document.getElementById('feedbackCloseBtn');
  const typeBtns = document.querySelectorAll('.feedback-type-btn');
  const sendBtn = document.querySelector('.feedback-send-btn');
  
  feedbackLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
  
  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      // Ideally send data
      alert('Feedback sent! Thank you.');
      modal.classList.remove('active');
    });
  }
});
"""

html_files = glob.glob(os.path.join(workspace_dir, "*.html"))
for html_file in html_files:
    with open(html_file, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "id=\"feedbackModal\"" not in content:
        content = content.replace("</body>", f"{modal_html}\n</body>")
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Added HTML to {os.path.basename(html_file)}")

css_file = os.path.join(workspace_dir, "css", "sidebar.css")
if os.path.exists(css_file):
    with open(css_file, "r", encoding="utf-8") as f:
        css_content = f.read()
    if ".feedback-modal-overlay" not in css_content:
        with open(css_file, "a", encoding="utf-8") as f:
            f.write(f"\n{modal_css}")
        print("Added CSS to sidebar.css")

js_file = os.path.join(workspace_dir, "js", "sidebar.js")
if os.path.exists(js_file):
    with open(js_file, "r", encoding="utf-8") as f:
        js_content = f.read()
    if "feedbackModal" not in js_content:
        with open(js_file, "a", encoding="utf-8") as f:
            f.write(f"\n{modal_js}")
        print("Added JS to sidebar.js")
