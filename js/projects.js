/**
 * Zenith AI - All Projects Page Logic & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectSearch();
  initFilterDropdown();
  initViewModeSwitcher();
  initRowNavigation();
});

let currentFilter = 'All';

/**
 * Real-time search input filtering
 */
function initProjectSearch() {
  const searchInput = document.getElementById('projectSearchInput');
  const tableRows = document.querySelectorAll('.project-row');
  const emptyState = document.getElementById('projectsEmptyState');
  const tableCard = document.getElementById('projectsTableCard');

  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    tableRows.forEach(row => {
      const name = row.querySelector('.project-title-link')?.textContent.toLowerCase() || '';
      const type = row.getAttribute('data-type') || '';

      const matchesSearch = name.includes(query);
      const matchesFilter = (currentFilter === 'All' || type.toLowerCase() === currentFilter.toLowerCase());

      if (matchesSearch && matchesFilter) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    // Also filter grid view cards
    const gridCards = document.querySelectorAll('.project-grid-card');
    gridCards.forEach(card => {
      const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const type = card.querySelector('.table-type-badge')?.textContent || '';
      
      const matchesSearch = name.includes(query);
      const matchesFilter = (currentFilter === 'All' || type.toLowerCase() === currentFilter.toLowerCase());

      if (matchesSearch && matchesFilter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    const isGridView = document.getElementById('btnGridView')?.classList.contains('active');
    const gridView = document.getElementById('projectsGridView');

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.add('show');
        if (tableCard) tableCard.style.display = 'none';
        if (gridView) gridView.style.display = 'none';
      } else {
        emptyState.classList.remove('show');
        if (tableCard && !isGridView) tableCard.style.display = '';
        if (gridView && isGridView) gridView.style.display = 'grid';
      }
    }
  });
}

/**
 * Filter dropdown (All / Project / Prototype)
 */
function initFilterDropdown() {
  const filterBtn = document.getElementById('btnFilterDropdown');
  const filterMenu = document.getElementById('filterDropdownMenu');
  const filterLabel = document.getElementById('filterLabel');
  const filterItems = document.querySelectorAll('.filter-menu-item');

  if (!filterBtn || !filterMenu) return;

  filterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    filterMenu.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    filterMenu.classList.remove('show');
  });

  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      filterItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const filterValue = item.getAttribute('data-filter') || 'All';
      currentFilter = filterValue;

      if (filterLabel) {
        filterLabel.textContent = `Filter: ${filterValue}`;
      }

      // Re-trigger search filter
      const searchInput = document.getElementById('projectSearchInput');
      if (searchInput) {
        searchInput.dispatchEvent(new Event('input'));
      }

      filterMenu.classList.remove('show');
    });
  });
}

/**
 * Switcher between List Table View and Grid View
 */
function initViewModeSwitcher() {
  const btnListView = document.getElementById('btnListView');
  const btnGridView = document.getElementById('btnGridView');
  const tableCard = document.getElementById('projectsTableCard');
  const gridView = document.getElementById('projectsGridView');

  if (!btnListView || !btnGridView) return;

  btnListView.addEventListener('click', () => {
    btnListView.classList.add('active');
    btnGridView.classList.remove('active');
    
    // Check if there are results
    const emptyState = document.getElementById('projectsEmptyState');
    const hasResults = !emptyState || !emptyState.classList.contains('show');
    
    if (tableCard && hasResults) tableCard.style.display = '';
    if (gridView) {
      gridView.classList.remove('active');
      gridView.style.display = '';
    }
  });

  btnGridView.addEventListener('click', () => {
    btnGridView.classList.add('active');
    btnListView.classList.remove('active');
    
    const emptyState = document.getElementById('projectsEmptyState');
    const hasResults = !emptyState || !emptyState.classList.contains('show');
    
    if (tableCard) tableCard.style.display = 'none';
    if (gridView) {
      gridView.classList.add('active');
      if (hasResults) gridView.style.display = 'grid';
    }
  });
}

/**
 * Row clicking navigation to workspace.html
 */
function initRowNavigation() {
  const rows = document.querySelectorAll('.project-row');
  rows.forEach(row => {
    row.addEventListener('click', () => {
      window.location.href = 'workspace.html';
    });
  });
}
