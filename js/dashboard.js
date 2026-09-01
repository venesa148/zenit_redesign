/**
 * Zenith AI - Dashboard & Welcome Screen Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initOptionSelection();
  initDashboardActions();
});

/**
 * Handles switching between 'Prototype' and 'Project' options
 */
function initOptionSelection() {
  const optionPrototype = document.getElementById('optionPrototype');
  const optionProject = document.getElementById('optionProject');
  const btnContinue = document.getElementById('btnContinue');
  const indicator1 = document.getElementById('indicator1');
  const indicator2 = document.getElementById('indicator2');

  let selectedOption = 'Prototype';

  function selectOption(option) {
    selectedOption = option;

    if (option === 'Prototype') {
      optionPrototype.classList.add('active');
      optionPrototype.setAttribute('aria-checked', 'true');
      optionProject.classList.remove('active');
      optionProject.setAttribute('aria-checked', 'false');

      if (indicator1) indicator1.classList.add('active');
      if (indicator2) indicator2.classList.remove('active');

      btnContinue.textContent = 'Continue with Prototype';
    } else {
      optionProject.classList.add('active');
      optionProject.setAttribute('aria-checked', 'true');
      optionPrototype.classList.remove('active');
      optionPrototype.setAttribute('aria-checked', 'false');

      if (indicator1) indicator1.classList.remove('active');
      if (indicator2) indicator2.classList.add('active');

      btnContinue.textContent = 'Continue with Project';
    }
  }

  if (optionPrototype) {
    optionPrototype.addEventListener('click', () => selectOption('Prototype'));
    optionPrototype.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') selectOption('Prototype');
    });
  }

  if (optionProject) {
    optionProject.addEventListener('click', () => selectOption('Project'));
    optionProject.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') selectOption('Project');
    });
  }

  if (btnContinue) {
    btnContinue.addEventListener('click', () => {
      console.log(`Continuing with: ${selectedOption}`);
      btnContinue.style.transform = 'scale(0.98)';
      setTimeout(() => {
        window.location.href = 'new-project.html';
      }, 150);
    });
  }
}

/**
 * Miscellaneous actions
 */
function initDashboardActions() {
  const btnNewProject = document.getElementById('btnNewProject');
  if (btnNewProject) {
    btnNewProject.addEventListener('click', () => {
      console.log('New project clicked');
    });
  }
}
