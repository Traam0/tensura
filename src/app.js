import { chapters, curseforge, wiki } from './journal.js';
import { renderEvolution } from './evolution.js';
import { renderSkills } from './skills.js';
import { renderItems } from './items.js';
import { evolutions } from './data/evolutions.js';
import { skills } from './data/skills.js';
import { items } from './data/items.js';
import { renderThemeToggle, bindThemeToggle } from './theme.js';
import { abilityCatalogs } from './ability-catalogs.js';
import { renderAbilities } from './abilities.js';

const pages = {
  overview: ['Overview', 'space_dashboard'],
  evolution: ['Evolution Trees', 'account_tree'],
  skills: ['Skill Library', 'auto_awesome'],
  battlewill: ['Battlewill', abilityCatalogs.battlewill.icon],
  magic: ['Magic', abilityCatalogs.magic.icon],
  items: ['Item Codex', 'inventory_2'],
  journal: ['Field Notes', 'menu_book'],
  tracker: ['My Progress', 'track_changes']
};

const catalogs = [
  { page: 'evolution', title: 'Evolution Trees', icon: 'account_tree', theme: 'green', text: 'Compare races, inspect branching paths, and pin an evolution to work toward.' },
  { page: 'skills', title: 'Skill Library', icon: 'auto_awesome', theme: 'purple', text: 'Look up ability effects, acquisition, mastery targets, and verified upgrades.' },
  { page: 'battlewill', title: 'Battlewill', icon: abilityCatalogs.battlewill.icon, theme: 'purple', text: 'Find Aura techniques, manuals, and mastery unlocks.' },
  { page: 'magic', title: 'Magic', icon: abilityCatalogs.magic.icon, theme: 'amber', text: 'Browse spells, spirit magic, and summoning rituals.' },
  { page: 'items', title: 'Item Codex', icon: 'inventory_2', theme: 'amber', text: 'Find equipment, crafting materials, recipes, and where to get them.' }
];

const views = { evolution: renderEvolution, skills: renderSkills, items: renderItems };
const pathSearchResults = [
  { name: 'Skill Paths', page: 'skills' },
  { name: 'Magic Paths', page: 'magic' },
  { name: 'Battlewill Paths', page: 'battlewill' },
].map(entry => ({ ...entry, meta: 'Guide', id: 'paths', extra: 'upgrades combinations prerequisites graph' }));

const main = document.querySelector('main');
const sidebar = document.querySelector('#sidebar');
const topbar = document.querySelector('#topbar');
const chrome = document.querySelector('#guide-chrome');
const dialog = document.querySelector('#search-dialog');
const toast = document.querySelector('#toast');
const storageKey = 'tensura-field-guide:profile:v1';
const defaultProfile = { ep: 0, epHistory: [], deathRate: 5, character: {}, goal: null, checks: {}, mastery: {}, abilityMastery: {}, pinnedSkills: [], items: {}, notes: {} };
let profile = { ...defaultProfile };
try {
  profile = { ...profile, ...JSON.parse(localStorage.getItem(storageKey)) };
} catch {
  // Access to browser storage varies across embedding contexts.
}
let toastTimer;
let activeRoute;

const icon = (name, detail = '') => '<span aria-hidden="true" class="material-symbols-outlined ' + detail + '">' + name + '</span>';
const escape = (value) => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);
const number = new Intl.NumberFormat('en-US');
const signedNumber = new Intl.NumberFormat('en-US', { signDisplay: 'exceptZero' });
const historyDate = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });
const forms = Array.from(new Map(evolutions.flatMap(race => race.nodes.map(node => [node.id, node.name]))))
  .sort(([, first], [, second]) => first.localeCompare(second));
const external = (name, url) => '<a href="' + escape(url) + '" target="_blank" rel="noopener noreferrer">' + escape(name) + ' ' + icon('north_east') + '</a>';
const path = (page, selection) => '#' + page + (selection ? '/' + encodeURIComponent(selection) : '');
const pageLink = (page, label, selection, className = '') => '<a class="' + className + '" href="' + path(page, selection) + '">' + label + '</a>';

function route() {
  const [page, selected] = location.hash.slice(1).split('/');
  let decoded;
  try { decoded = decodeURIComponent(selected || ''); } catch { decoded = ''; }
  return { page: Object.hasOwn(pages, page) ? page : 'overview', selected: decoded };
}

function navigate(page, selected) {
  const next = path(page, selected);
  if (location.hash !== next) location.hash = next;
}

function updateProfile(partial, reason = 'Set EP total') {
  if (Number.isSafeInteger(partial.ep) && partial.ep !== profile.ep && !Object.hasOwn(partial, 'epHistory')) {
    partial = { ...partial, epHistory: [{
      before: profile.ep, after: partial.ep, reason, date: new Date().toISOString()
    }, ...profile.epHistory] };
  }
  profile = { ...profile, ...partial };
  try {
    localStorage.setItem(storageKey, JSON.stringify(profile));
  } catch {
    notify('Progress is available for this session only.');
  }
  const badge = document.querySelector('.top-ep-value');
  if (badge) badge.textContent = number.format(profile.ep) + ' EP';
  return profile;
}

function notify(message) {
  toast.innerHTML = icon('check_circle') + '<span>' + escape(message) + '</span>';
  toast.classList.add('shown');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('shown'), 2600);
}

function renderShell(page) {
  const nav = (id) => '<a href="' + path(id) + '" class="nav-link' + (page === id ? ' active' : '') + '"' +
    (page === id ? ' aria-current="page"' : '') + '>' + icon(pages[id][1]) + '<span>' + pages[id][0] + '</span></a>';
  sidebar.innerHTML = `
    <a class="brand" href="#overview" aria-label="Tensura Field Guide home">
      <span class="brand-mark"><img src="public/guide-icon.png" alt="" width="43" height="43"></span>
      <span><strong>TENSURA</strong><small>FIELD GUIDE</small></span>
    </a>
    <nav aria-label="Guide navigation">
      <p class="nav-caption">GUIDE</p>
      ${['overview', 'evolution', 'skills', 'battlewill', 'magic', 'items', 'journal'].map(nav).join('')}
      <p class="nav-caption nav-caption-spaced">YOUR GAME</p>
      ${nav('tracker')}
    </nav>
    <div class="sidebar-bottom">
      <div class="version"><i></i><div><b>Minecraft 1.21.1</b><small>Reincarnated 2.0.1.5</small></div></div>
      <div class="sidebar-sources">${external('Wiki', wiki)} ${external('CurseForge', curseforge)}</div>
    </div>`;
  topbar.innerHTML = `
    <div class="breadcrumbs">${icon('book_2')} <span>Field Guide</span> ${icon('chevron_right')} <strong>${pages[page][0]}</strong>
      <a class="mobile-brand" href="#overview" aria-label="Tensura Field Guide home"><img src="public/guide-icon.png" alt="" width="32" height="32"></a>
    </div>
    <div class="top-controls">
      <button class="search-trigger" type="button" aria-label="Search the guide">${icon('search')}<span>Search the guide</span><kbd>/</kbd></button>
      ${pageLink('tracker', icon('bolt') + '<span class="top-ep-value">' + number.format(profile.ep) + ' EP</span>', '', 'ep-chip')}
      ${renderThemeToggle()}
    </div>`;
  topbar.querySelector('.search-trigger').addEventListener('click', openSearch);
  bindThemeToggle(topbar);
  document.querySelector('#footer').innerHTML = `<span>Unofficial companion for Tensura: Reincarnated</span><span>${external('Mod by ManasMods', curseforge)} ${external('Game data sources', wiki)}</span>`;
}

function getGoal() {
  const goal = profile.goal;
  if (!goal) return null;
  const race = evolutions.find(entry => entry.id === goal.race);
  const node = race?.nodes.find(entry => entry.id === goal.node);
  return node ? { race, node } : null;
}

function heading(label, title, summary, symbol) {
  return `<header class="page-heading">${symbol ? '<span class="feature-icon green">' + icon(symbol) + '</span>' : ''}
    <div><p class="eyebrow">${label}</p><h1>${title}</h1><p>${summary}</p></div></header>`;
}

function renderOverview() {
  const goal = getGoal();
  const counts = {
    evolution: evolutions.length + ' race trees',
    skills: skills.length + ' skills',
    battlewill: abilityCatalogs.battlewill.entries.length + ' techniques',
    magic: abilityCatalogs.magic.entries.length + ' spells',
    items: items.length + ' entries'
  };
  main.innerHTML = `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-content">
        <span class="hero-tag"><span></span> MINECRAFT MOD COMPANION</span>
        <h1 id="hero-title">TENSURA<br><em>FIELD GUIDE</em></h1>
        <p>Plan your next evolution, master your abilities, and find the gear you need in Tensura: Reincarnated.</p>
        <div class="hero-actions">
          ${pageLink('evolution', icon('account_tree') + ' Explore evolutions ' + icon('arrow_forward'), '', 'button primary')}
          ${pageLink('journal', 'Read field notes ' + icon('arrow_forward'), 'first-steps', 'button secondary')}
        </div>
      </div>
      <a class="hero-credit" href="${curseforge}/gallery" target="_blank" rel="noopener noreferrer">LABYRINTH TREE ${icon('north_east')}</a>
    </section>
    <section class="overview-section">
      <div class="section-head"><div><p class="eyebrow">REFERENCE</p><h2>Explore the guide</h2></div></div>
      <div class="catalog-grid">
        ${catalogs.map(entry => pageLink(entry.page, `<div class="feature-top"><span class="feature-icon ${entry.theme}">${icon(entry.icon)}</span>${icon('arrow_outward', 'feature-arrow')}</div>
          <div><h3>${entry.title}</h3><p>${entry.text}</p></div><span class="catalog-count">${counts[entry.page]}</span>`, '', 'feature-card')).join('')}
      </div>
    </section>
    <div class="overview-bottom">
      <section class="utility-card">
        <span class="feature-icon green">${icon('track_changes')}</span>
        <div><p class="eyebrow">YOUR GAME</p><h2>${goal ? escape(goal.node.name) : 'Keep track of your run'}</h2>
        <p>${goal ? escape(goal.race.name) + ' path · ' + number.format(profile.ep) + ' current EP' : 'Log your EP and review evolution and skill progress in one place.'}</p></div>
        ${pageLink('tracker', icon('arrow_forward'), '', 'round-link')}
      </section>
      <section class="utility-card">
        <span class="feature-icon amber">${icon('menu_book')}</span>
        <div><p class="eyebrow">FIELD NOTES</p><h2>New to Reincarnated?</h2><p>Start with race selection, skill slots, and how to earn EP.</p></div>
        ${pageLink('journal', icon('arrow_forward'), 'first-steps', 'round-link')}
      </section>
    </div>`;
  main.querySelectorAll('.round-link').forEach((link, index) => link.setAttribute('aria-label', index ? 'Read first steps' : 'Open my progress'));
}

function renderJournal(selected) {
  const chapter = chapters.find(entry => entry.id === selected) ?? chapters[0];
  main.innerHTML = heading('GUIDE', 'Field Notes', 'Progression, awakening, and exploration for your next session.', 'menu_book') + `
    <div class="notes-layout">
      <nav class="notes-nav" aria-label="Field notes chapters">
        ${chapters.map(entry => '<a class="notes-tab' + (entry === chapter ? ' active' : '') + '" href="' + path('journal', entry.id) + '"' +
          (entry === chapter ? ' aria-current="page"' : '') + '>' + icon(entry.icon) + escape(entry.name) + '</a>').join('')}
      </nav>
      <article class="notes-panel">
        <header><h2>${escape(chapter.name)}</h2><p>${escape(chapter.summary)}</p></header>
        <div class="note-steps">${chapter.steps.map(([title, body], index) => {
          const key = chapter.id + '/' + index;
          return `<div class="note-step"><label><input type="checkbox" data-key="${key}" ${profile.notes[key] ? 'checked' : ''}>
          <strong>${escape(title)}</strong></label><p>${escape(body)}</p></div>`;
        }).join('')}</div>
        <div class="notes-actions">${chapter.actions.map(([label, target]) => pageLink(target, escape(label) + ' ' + icon('arrow_forward'), '', 'button secondary')).join('')}</div>
        <p class="references">${chapter.links.map(([label, url]) => external(label, url)).join('')}</p>
      </article>
    </div>`;
  main.querySelectorAll('[data-key]').forEach(input => input.addEventListener('change', () =>
    updateProfile({ notes: { ...profile.notes, [input.dataset.key]: input.checked } })));
}

function renderTracker() {
  const goal = getGoal();
  const target = goal?.node.ep;
  const checks = goal?.node.requirements.filter((_, index) => profile.checks[`${goal.race.id}:${goal.node.id}:${index}`]).length ?? 0;
  const quota = goal?.node.requiredCount ?? goal?.node.requirements.length ?? 0;
  const mastery = skills.filter(skill => profile.mastery[skill.id] > 0 || profile.pinnedSkills.includes(skill.id));
  const trained = Object.values(abilityCatalogs).flatMap(catalog => catalog.entries.flatMap(entry => {
    const points = profile.abilityMastery[catalog.page + ':' + entry.id];
    return points > 0 ? [{ entry, page: catalog.page, points }] : [];
  }));
  const savedItems = items.filter(item => profile.items[item.id]);
  const bar = target > 0 ? Math.min(100, profile.ep * 100 / target) : 0;
  const lastChange = profile.epHistory[0];
  const canUndo = lastChange?.after === profile.ep;
  const recentDelta = lastChange ? lastChange.after - lastChange.before : 0;
  const { name = '', form = '', avatar = '' } = profile.character;
  const portrait = /^data:image\/(webp|png);base64,/.test(avatar) ? avatar : 'public/adventurer.png';
  const history = profile.epHistory.map(entry => {
    const delta = entry.after - entry.before;
    return `<li><span class="log-icon ${delta >= 0 ? 'ep-gain' : 'ep-loss'}">${icon(delta >= 0 ? 'north_east' : 'south_east')}</span>
      <div><strong>${escape(entry.reason)}</strong><time datetime="${escape(entry.date)}">${historyDate.format(new Date(entry.date))}</time></div>
      <div><strong class="${delta >= 0 ? 'ep-gain' : 'ep-loss'}">${signedNumber.format(delta)} EP</strong><small>${number.format(entry.after)} EP total</small></div></li>`;
  }).join('');
  main.innerHTML = `<div class="progress-page">
    <header class="progress-head">
      <div><p class="eyebrow">CHARACTER SHEET</p><h1>My Progress</h1></div>
      <button class="button secondary" id="edit-character" type="button">${icon('edit')} Edit character</button>
    </header>
    <div class="character-layout">
      <section class="character-card" aria-label="Character status">
        <div class="portrait-frame"><img src="${escape(portrait)}" alt="" width="320" height="320"><i></i></div>
        <div class="character-identity">
          <p class="eyebrow">${icon('person')} ${escape(forms.find(([id]) => id === form)?.[1] ?? 'Character')}</p>
          <h2>${escape(name || 'Adventurer')}</h2>
          <div class="character-ep"><span>${icon('bolt')} Existence points</span>
            <strong>${number.format(profile.ep)} <small>EP</small></strong>
            ${lastChange ? `<span class="character-change ${recentDelta >= 0 ? 'ep-gain' : 'ep-loss'}">${signedNumber.format(recentDelta)} latest change</span>` : ''}
          </div>
        </div>
      </section>
      <section class="tracker-card quest-card">
        <span class="progress-emblem">${icon('account_tree')}</span>
        <p class="eyebrow">EVOLUTION TARGET</p><h2>${goal ? escape(goal.node.name) : 'Choose a form'}</h2>
        <p>${goal ? escape(goal.race.name) + ' evolution tree' : 'Pin a form to track its EP and evolution requirements.'}</p>
        ${target > 0 ? `<progress value="${bar}" max="100" aria-label="Progress toward the EP requirement"></progress>
          <p>${profile.ep >= target ? 'EP requirement reached' : number.format(target - profile.ep) + ' EP remaining'} · ${number.format(target)} EP target</p>` : ''}
        ${quota ? `<p class="quest-checks">${icon('task_alt')} ${Math.min(checks, quota)} of ${quota} requirements met</p>` : ''}
        ${pageLink('evolution', (goal ? 'View requirements' : 'Browse evolution trees') + ' ' + icon('arrow_forward'), goal && goal.race.id + ':' + goal.node.id, 'button secondary')}
      </section>
    </div>
    <div class="progress-columns">
      <div class="progress-stack">
      <section class="tracker-card ep-tracker">
        <div class="progress-card-heading"><span class="progress-emblem">${icon('bolt')}</span><h2>Adjust EP</h2></div>
        <form class="ep-form" id="ep-adjust-form"><label for="ep-amount">EP change</label>
          <div><input id="ep-amount" type="number" inputmode="numeric" min="1" max="9007199254740991" step="1" placeholder="Amount" required>
          <button type="submit" class="button primary" value="gain">${icon('add')} Add EP</button>
          <button type="submit" class="button secondary ep-loss-action" value="loss">${icon('remove')} Log loss</button></div>
          <p class="ep-error" id="ep-error" role="alert"></p>
        </form>
        <details class="ep-options">
          <summary>Estimate a death loss</summary>
          <form class="ep-form" id="ep-death-form">
            <label for="death-rate">Death penalty (%)</label>
            <div><input id="death-rate" type="number" inputmode="numeric" min="0" max="100" step="1" value="${escape(profile.deathRate)}" required>
            <button type="submit" class="button secondary ep-loss-action">${icon('heart_broken')} Log death estimate</button></div>
          </form>
          <p>The default is 5%. Match your world’s gamerule. If you know the exact loss, use Log loss. ${external('Death penalty gamerule', wiki + 'Config/Gamerules')}</p>
        </details>
        <details class="ep-options">
          <summary>Set EP to the in-game total</summary>
          <form class="ep-form" id="ep-total-form"><label for="current-ep">Current character EP</label>
          <div><input id="current-ep" type="number" inputmode="numeric" min="0" max="9007199254740991" step="1" value="${escape(profile.ep)}" required>
          <button type="submit" class="button secondary">Set total</button></div></form>
        </details>
      </section>
      <section class="tracker-card ep-history">
        <div class="ep-history-heading"><div class="progress-card-heading"><span class="progress-emblem">${icon('timeline')}</span><h2>EP history</h2></div>
          ${canUndo ? `<button type="button" class="button secondary" id="undo-ep">${icon('undo')} Undo last</button>` : ''}</div>
        ${history ? `<ol class="ep-history-list" aria-label="EP changes, most recent first">${history}</ol>` : '<p>Add EP, log a loss, or set your in-game total to start the history.</p>'}
      </section>
      </div>
      <div class="progress-stack">
      <section class="tracker-card">
        <div class="progress-card-heading"><span class="progress-emblem">${icon('auto_awesome')}</span><h2>Skill mastery</h2><span class="progress-count">${mastery.length}</span></div>
        ${mastery.length ? '<ul class="tracked-list">' + mastery.map(skill =>
          '<li>' + pageLink('skills', '<img alt="" src="' + escape(skill.icon) + '" width="28" height="28"><span>' + escape(skill.name) + '</span><small>' + number.format(profile.mastery[skill.id] ?? 0) + ' mastery</small>' + icon('arrow_forward'), skill.id) + '</li>').join('') + '</ul>' : '<p>Pin a skill or log mastery from the skill library.</p>'}
        ${pageLink('skills', 'Find a skill ' + icon('arrow_forward'), '', 'button secondary')}
      </section>
      <section class="tracker-card">
        <div class="progress-card-heading"><span class="progress-emblem">${icon('auto_fix_high')}</span><h2>Battlewill &amp; Magic</h2><span class="progress-count">${trained.length}</span></div>
        ${trained.length ? '<ul class="tracked-list">' + trained.map(({ entry, page, points }) =>
          '<li>' + pageLink(page, '<span>' + escape(entry.name) + '</span><small>' + number.format(points) + ' mastery</small>' + icon('arrow_forward'), entry.id) + '</li>').join('') + '</ul>' : '<p>Record mastery from a Battlewill technique or spell to track it here.</p>'}
        <div class="ability-shortcuts">
          ${pageLink('battlewill', 'Battlewill ' + icon('arrow_forward'), '', 'button secondary')}
          ${pageLink('magic', 'Magic ' + icon('arrow_forward'), '', 'button secondary')}
        </div>
      </section>
      <section class="tracker-card">
        <div class="progress-card-heading"><span class="progress-emblem">${icon('inventory_2')}</span><h2>Saved items</h2><span class="progress-count">${savedItems.length}</span></div>
        ${savedItems.length ? '<ul class="tracked-list">' + savedItems.map(item => '<li>' + pageLink('items', escape(item.name) + icon('arrow_forward'), item.id) + '</li>').join('') + '</ul>' : '<p>Save an item in the codex to find it here.</p>'}
        ${pageLink('items', 'Find an item ' + icon('arrow_forward'), '', 'button secondary')}
      </section>
      </div>
    </div>
    <dialog class="character-dialog" aria-labelledby="character-dialog-title">
      <form id="character-form">
        <h2 id="character-dialog-title">Edit character</h2>
        <label>Character name<input name="name" maxlength="36" value="${escape(name)}" placeholder="Adventurer"></label>
        <label>Current form<select name="form"><option value="">Choose a form</option>
          ${forms.map(([id, title]) => `<option value="${escape(id)}"${id === form ? ' selected' : ''}>${escape(title)}</option>`).join('')}
        </select></label>
        <label>Portrait <span>PNG, JPEG, or WebP</span><input name="portrait" type="file" accept="image/png,image/jpeg,image/webp"></label>
        ${avatar ? '<label class="character-reset"><input name="reset" type="checkbox"> Restore default portrait</label>' : ''}
        <p id="portrait-error" role="alert"></p>
        <div class="character-actions">
          <button class="button secondary" id="cancel-character" type="button">Cancel</button>
          <button class="button primary" type="submit">Save character</button>
        </div>
      </form>
    </dialog>
  </div>`;
  bindEpForms();
  bindCharacterEditor();
}

function bindCharacterEditor() {
  const editor = main.querySelector('.character-dialog');
  const characterForm = main.querySelector('#character-form');
  main.querySelector('#edit-character').addEventListener('click', () => editor.showModal());
  main.querySelector('#cancel-character').addEventListener('click', () => editor.close());
  editor.addEventListener('close', () => {
    characterForm.reset();
    editor.querySelector('#portrait-error').textContent = '';
  });
  characterForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fields = new FormData(characterForm);
    const file = fields.get('portrait');
    const save = characterForm.querySelector('button[type="submit"]');
    let avatar = fields.has('reset') ? '' : profile.character.avatar;
    if (file?.size) {
      save.disabled = true;
      try {
        avatar = await resizePortrait(file);
      } catch {
        editor.querySelector('#portrait-error').textContent = 'Choose a PNG, JPEG, or WebP picture under 8 MB.';
        return;
      } finally {
        save.disabled = false;
      }
    }
    if (!editor.open || !editor.isConnected) return;
    updateProfile({ character: { name: fields.get('name').trim(), form: fields.get('form'), avatar } });
    editor.close();
    renderTracker();
    main.querySelector('#edit-character').focus({ preventScroll: true });
    notify('Character saved.');
  });
}

async function resizePortrait(file) {
  if (file.size > 8 * 1024 * 1024 || !['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) throw new Error('Invalid portrait');
  const image = await createImageBitmap(file);
  try {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 320;
    const size = Math.min(image.width, image.height);
    canvas.getContext('2d').drawImage(image, (image.width - size) / 2, (image.height - size) / 2, size, size, 0, 0, 320, 320);
    return canvas.toDataURL('image/webp', .88);
  } finally {
    image.close();
  }
}

function bindEpForms() {
  const refresh = (message, focusSelector) => {
    renderTracker();
    const focus = main.querySelector(focusSelector);
    const details = focus?.closest('details');
    if (details) details.open = true;
    focus?.focus({ preventScroll: true });
    notify(message);
  };
  const amount = main.querySelector('#ep-amount');
  const error = main.querySelector('#ep-error');
  main.querySelector('#ep-adjust-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const lost = event.submitter?.value === 'loss';
    const delta = amount.valueAsNumber * (lost ? -1 : 1);
    const total = profile.ep + delta;
    if (!Number.isSafeInteger(total) || total < 0) {
      error.textContent = lost ? 'You can only subtract up to your current EP.' : 'The total exceeds the supported EP range.';
      amount.focus();
      return;
    }
    updateProfile({ ep: total }, lost ? 'EP loss' : 'EP gain');
    refresh(signedNumber.format(delta) + ' EP recorded.', '#ep-amount');
  });
  amount.addEventListener('input', () => { error.textContent = ''; });
  main.querySelector('#ep-total-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const ep = main.querySelector('#current-ep').valueAsNumber;
    if (!Number.isSafeInteger(ep) || ep < 0) return;
    updateProfile({ ep });
    refresh('EP total saved.', '#current-ep');
  });
  main.querySelector('#ep-death-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const deathRate = main.querySelector('#death-rate').valueAsNumber;
    const loss = Math.round(profile.ep * (deathRate / 100));
    updateProfile({ ep: profile.ep - loss, deathRate }, 'Death estimate (' + deathRate + '%)');
    refresh(loss ? signedNumber.format(-loss) + ' EP estimated loss recorded.' : 'Estimated loss is 0 EP.', '#death-rate');
  });
  main.querySelector('#undo-ep')?.addEventListener('click', () => {
    const [entry, ...epHistory] = profile.epHistory;
    updateProfile({ ep: entry.before, epHistory });
    refresh('Last EP change undone.', '#ep-amount');
  });
}

function searchResults(query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [
    ...catalogs.map(entry => ({ name: entry.title, meta: 'Guide', page: entry.page })),
    ...pathSearchResults,
    ...chapters.slice(0, 2).map(entry => ({ name: entry.name, meta: 'Field Notes', page: 'journal', id: entry.id }))
  ];
  const entries = [
    ...catalogs.map(entry => ({ name: entry.title, meta: 'Guide', page: entry.page })),
    ...pathSearchResults,
    ...evolutions.flatMap(race => [
      { name: race.name, meta: 'Race tree', page: 'evolution', id: race.id, extra: race.summary },
      ...race.nodes.filter(node => node.name !== race.name).map(node => ({
        name: node.name, meta: 'Evolution · ' + race.name, page: 'evolution', id: race.id, detail: node.id, extra: node.requirements?.join(' ')
      }))
    ]),
    ...skills.map(skill => ({ name: skill.name, meta: 'Skill · ' + skill.type, page: 'skills', id: skill.id, extra: [skill.summary, skill.acquisition].join(' ') })),
    ...Object.values(abilityCatalogs).flatMap(catalog => catalog.entries.map(entry => ({
      name: entry.name, meta: catalog.title + ' · ' + entry.type, page: catalog.page, id: entry.id,
      extra: [entry.school, entry.subtitle, entry.summary, entry.acquisition].join(' '),
    }))),
    ...items.map(item => ({ name: item.name, meta: 'Item · ' + item.type, page: 'items', id: item.id, extra: item.summary })),
    ...chapters.map(entry => ({ name: entry.name, meta: 'Field Notes', page: 'journal', id: entry.id, extra: entry.summary }))
  ];
  return entries.map(entry => {
    const name = entry.name.toLowerCase();
    const fields = (entry.meta + ' ' + (entry.extra ?? '')).toLowerCase();
    if (!words.every(word => name.includes(word) || fields.includes(word))) return null;
    const score = (name === words.join(' ') ? 1000 : 0) + words.reduce((sum, word) =>
      sum + (name.startsWith(word) ? 50 : name.includes(word) ? 20 : 1), 0);
    return { ...entry, score };
  }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 12);
}

function openSearch() {
  if (dialog.open) return;
  dialog.innerHTML = `<div class="search-box">${icon('search')}<input type="search" placeholder="Search the field guide" aria-label="Search the field guide" autocomplete="off"><button class="search-close" type="button" aria-label="Close search">${icon('close')}</button></div>
    <div class="search-results"></div>`;
  const input = dialog.querySelector('input');
  const list = dialog.querySelector('.search-results');
  const find = () => {
    const hits = searchResults(input.value);
    list.innerHTML = hits.length ? hits.map(hit => pageLink(hit.page,
      `${icon(pages[hit.page][1])}<span><strong>${escape(hit.name)}</strong><small>${escape(hit.meta)}</small></span>${icon('arrow_forward')}`, hit.detail ? hit.id + ':' + hit.detail : hit.id, 'search-hit')).join('')
      : '<p class="empty-search">No matching entries found.</p>';
  };
  input.addEventListener('input', find);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') list.querySelector('a')?.click();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      list.querySelector('a')?.focus();
    }
  });
  list.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    (event.key === 'ArrowDown' ? event.target.nextElementSibling : event.target.previousElementSibling ?? input)?.focus();
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  list.addEventListener('click', (event) => { if (event.target.closest('a')) dialog.close(); });
  dialog.showModal();
  find();
  input.focus();
}

function render({ focus = false } = {}) {
  const current = route();
  const pageChanged = current.page !== activeRoute;
  activeRoute = current.page;
  document.title = current.page === 'overview' ? 'Tensura Field Guide' : pages[current.page][0] + ' · Tensura Field Guide';
  renderShell(current.page);
  if (pageChanged) window.scrollTo(0, 0);
  if (focus && pageChanged) main.focus({ preventScroll: true });
  if (current.page === 'overview') renderOverview();
  else if (current.page === 'journal') renderJournal(current.selected);
  else if (current.page === 'tracker') renderTracker();
  else {
    main.replaceChildren();
    const context = { ...current, profile, updateProfile, notify, navigate };
    if (Object.hasOwn(abilityCatalogs, current.page)) renderAbilities(main, context, abilityCatalogs[current.page]);
    else views[current.page](main, context);
  }
}

document.addEventListener('keydown', (event) => {
  const editing = event.target instanceof HTMLElement && (event.target.matches('input, textarea, select') || event.target.isContentEditable);
  if ((event.key === '/' && !editing) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
    event.preventDefault();
    openSearch();
  }
});
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
});
window.addEventListener('hashchange', () => render({ focus: true }));
new ResizeObserver(() => {
  document.documentElement.style.setProperty('--chrome-height', chrome.offsetHeight + 'px');
}).observe(chrome);
render();
