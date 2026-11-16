import { itemRelease, items } from './data/items.js';

const categories = {
  Workstations: 'construction',
  Materials: 'diamond',
  Consumables: 'science',
  Gear: 'swords',
  'Mob Drops': 'pets',
  Progression: 'auto_stories',
};
const itemIndex = new Map(items.map(item => [item.id, item]));
const filters = { query: '', category: 'All items', savedOnly: false };
const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);
const icon = name => `<span class="material-symbols-outlined" aria-hidden="true">${name}</span>`;
const link = (label, url) => `<a class="codex-source" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)} ${icon('north_east')}</a>`;
const emblem = item => `<span class="codex-emblem" data-category="${escape(item.type)}">${icon(categories[item.type])}</span>`;

function recipeCard(recipe) {
  const pieces = recipe.pattern?.flatMap(row => Array.from(row).map(cell =>
    `<span class="${cell.trim() ? 'filled' : ''}">${escape(cell)}</span>`));
  return `<div class="codex-recipe">
    <div class="codex-recipe-header">
      <h4>${escape(recipe.station)}</h4>
      ${recipe.count ? `<span>Yields ${recipe.count}</span>` : ''}
    </div>
    ${recipe.schematic ? `<p>Requires ${escape(recipe.schematic)}</p>` : ''}
    <div class="codex-ingredients">
      ${pieces ? `<div class="codex-pattern" aria-label="Crafting grid: ${escape(recipe.pattern.map(row => row.trim().split('').join(' ')).join(', '))}" role="img" style="--recipe-columns:${recipe.pattern[0].length}">${pieces.join('')}</div>` : ''}
      <ul>${recipe.ingredients.map(ingredient => `<li>${escape(ingredient)}</li>`).join('')}</ul>
    </div>
  </div>`;
}

function detail(item, saved) {
  const related = (item.related ?? []).map(id => itemIndex.get(id)).filter(Boolean);
  return `<header class="codex-detail-heading">
    ${emblem(item)}
    <div><span class="codex-item-type">${escape(item.type)}</span><h2>${escape(item.name)}</h2></div>
    <button type="button" class="codex-save${saved ? ' is-saved' : ''}" data-save aria-pressed="${saved}">
      ${icon(saved ? 'bookmark_added' : 'bookmark_add')} <span>${saved ? 'Saved' : 'Save item'}</span>
    </button>
  </header>
  <section class="codex-detail-section"><h3>What it does</h3><p>${escape(item.summary)}</p></section>
  <section class="codex-detail-section"><h3>How to get it</h3><p>${escape(item.obtain)}</p></section>
  ${item.recipes?.length ? `<section class="codex-detail-section"><h3>${item.recipes.length === 1 ? 'Recipe' : 'Recipes'}</h3>
    ${item.recipes.map(recipeCard).join('')}${item.note ? `<p class="codex-detail-note">${escape(item.note)}</p>` : ''}
  </section>` : ''}
  ${related.length ? `<section class="codex-detail-section"><h3>Related items</h3>
    <div class="codex-related">${related.map(entry => `<a href="#items/${encodeURIComponent(entry.id)}">${escape(entry.name)} ${icon('arrow_forward')}</a>`).join('')}</div>
  </section>` : ''}
  <footer class="codex-sources">
    ${link('Wiki reference', item.source)}
    ${(item.references ?? []).map(ref => link(ref.label, ref.url)).join('')}
  </footer>`;
}

function normalize(value) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f’']/g, '').trim();
}

export function renderItems(root, { selected, profile, updateProfile, notify }) {
  let savedItems = { ...profile.items };
  let current = itemIndex.get(selected);

  root.innerHTML = `<section class="item-codex" aria-labelledby="codex-title">
    <header class="page-heading codex-heading">
      <span class="feature-icon amber">${icon('inventory_2')}</span>
      <div>
        <h1 id="codex-title">Item Codex</h1>
        <p>Find equipment, materials, and recipes for your next upgrade.</p>
      </div>
    </header>
    <div class="codex-toolbar">
      <label class="codex-search">${icon('search')}<input type="search" aria-label="Search items" placeholder="Search items, materials, or recipes" value="${escape(filters.query)}"></label>
      <label class="codex-category"><span>Category</span>
        <select aria-label="Filter item category">${['All items', ...Object.keys(categories)].map(category =>
          `<option ${category === filters.category ? 'selected' : ''}>${escape(category)}</option>`).join('')}</select>
      </label>
      <button type="button" class="codex-saved-filter" aria-pressed="${filters.savedOnly}">${icon('bookmark')} Saved</button>
    </div>
    <div class="codex-layout">
      <section class="codex-browse" aria-label="Item results">
        <p class="codex-count" aria-live="polite"></p>
        <ul class="codex-list"></ul>
      </section>
      <article class="codex-detail" tabindex="-1" aria-label="Item details"></article>
    </div>
    <p class="codex-version">Recipes reference the NeoForge 2.0.1.5 release for Minecraft 1.21.1. Older releases and modpacks can differ. ${link('Release notes', itemRelease)}</p>
  </section>`;

  const list = root.querySelector('.codex-list');
  const count = root.querySelector('.codex-count');
  const panel = root.querySelector('.codex-detail');
  const search = root.querySelector('.codex-search input');
  const category = root.querySelector('.codex-category select');
  const savedFilter = root.querySelector('.codex-saved-filter');
  const focusListItem = () => {
    const visible = list.querySelector('a[aria-current="page"]');
    if (visible && !window.matchMedia('(max-width: 730px)').matches) {
      const rowTop = visible.offsetTop;
      if (rowTop + visible.offsetHeight > list.clientHeight) list.scrollTop = rowTop;
    }
  };

  function paint(keepSelection = false) {
    const words = normalize(filters.query).split(/\s+/).filter(Boolean);
    const filtered = items.filter(item => {
      if (filters.category !== 'All items' && item.type !== filters.category) return false;
      if (filters.savedOnly && !savedItems[item.id]) return false;
      const ingredients = (item.recipes ?? []).flatMap(recipe => recipe.ingredients);
      const searchText = normalize([item.name, item.type, item.summary, item.obtain, ...ingredients].join(' '));
      return words.every(word => searchText.includes(word));
    });
    if (!current || (!keepSelection && !filtered.includes(current))) current = filtered[0];
    count.textContent = `${filtered.length} ${filtered.length === 1 ? 'item' : 'items'}`;
    list.innerHTML = filtered.length
      ? filtered.map(item => `<li><a href="#items/${encodeURIComponent(item.id)}" ${item === current ? 'aria-current="page"' : ''}>
          ${emblem(item)}
          <span class="codex-list-label"><strong>${escape(item.name)}</strong><small>${escape(item.type)}</small></span>
          <span class="codex-list-end">${savedItems[item.id] ? icon('bookmark') : icon('chevron_right')}</span>
        </a></li>`).join('')
      : '<li class="codex-empty">No matching items.</li>';
    panel.innerHTML = current
      ? detail(current, Boolean(savedItems[current.id]))
      : '<p class="codex-empty">Adjust your filters to find an item.</p>';
  }

  search.addEventListener('input', () => { filters.query = search.value; paint(); });
  category.addEventListener('change', () => { filters.category = category.value; paint(); });
  savedFilter.addEventListener('click', () => {
    filters.savedOnly = !filters.savedOnly;
    savedFilter.setAttribute('aria-pressed', String(filters.savedOnly));
    paint();
  });
  panel.addEventListener('click', event => {
    if (!event.target.closest('[data-save]') || !current) return;
    const name = current.name;
    const wasSaved = Boolean(savedItems[current.id]);
    savedItems = { ...savedItems };
    if (wasSaved) delete savedItems[current.id];
    else savedItems[current.id] = true;
    updateProfile({ items: savedItems });
    paint();
    (panel.querySelector('[data-save]') ?? savedFilter).focus({ preventScroll: true });
    notify(wasSaved ? `${name} removed from saved items` : `${name} saved to My Progress`);
  });
  paint(Boolean(current));
  if (selected) {
    focusListItem();
    if (window.matchMedia('(max-width: 730px)').matches) {
      requestAnimationFrame(() => panel.scrollIntoView({ block: 'start' }));
    }
  }
}
