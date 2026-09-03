/**
 * Zenith AI - New Project Form Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initFileUpload();
  initCreateProject();
});

function initFileUpload() {
  const dropzone = document.getElementById('uploadDropzone');
  const fileInput = document.getElementById('fileUploadInput');
  const preview = document.getElementById('fileUploadedPreview');
  const fileNameSpan = document.getElementById('uploadedFileName');

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (fileNameSpan && preview) {
        fileNameSpan.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        preview.style.display = 'inline-flex';
      }
    }
  });

  // Drag & drop visual feedback
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = '#2d5584';
    dropzone.style.backgroundColor = '#f0f4f9';
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = '';
    dropzone.style.backgroundColor = '';

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (fileNameSpan && preview) {
        fileNameSpan.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        preview.style.display = 'inline-flex';
      }
    }
  });
}

function initCreateProject() {
  const btnCreate = document.getElementById('btnCreateProject');
  const titleInput = document.getElementById('projectTitleInput');

  if (!btnCreate) return;

  btnCreate.addEventListener('click', () => {
    const title = titleInput?.value.trim();
    if (!title) {
      // Focus on input if empty
      titleInput?.focus();
    }

    const originalContent = btnCreate.innerHTML;
    btnCreate.innerHTML = `
      <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12" />
      </svg>
      <span>Creating Project...</span>
    `;

    setTimeout(() => {
      btnCreate.innerHTML = `<span>Redirecting to Build view...</span>`;
      console.log('Project created successfully');
      setTimeout(() => {
        window.location.href = 'workspace.html#build';
      }, 500);
    }, 1000);
  });
}
