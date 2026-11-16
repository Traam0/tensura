import { getAbilityPath, makeAbilityGraph, routeRule } from './ability-graph.js';

const format = new Intl.NumberFormat('en-US');
const savedFilters = new Map();
const usageWiki = 'https://tensura.wiki.gg/wiki/Mechanics/Ability_Usage';
let returnFocus;
let pathNavigation;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function symbol(name) {
  const node = element('span', 'material-symbols-outlined', name);
  node.setAttribute('aria-hidden', 'true');
  return node;
}

function reference(name, url, className = 'ability-reference') {
  const link = element('a', className, name);
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.append(symbol('north_east'));
  return link;
}

function badge(entry, fallback) {
  const frame = element('span', 'ability-badge');
  if (entry.icon) {
    const image = element('img');
    image.src = entry.icon;
    image.alt = '';
    image.width = image.height = 32;
    image.loading = 'lazy';
    frame.append(image);
  } else {
    frame.append(symbol(fallback));
  }
  return frame;
}

function detailsSection(title, description) {
  const section = element('section', 'ability-section');
  section.append(element('h3', '', title));
  if (description) section.append(element('p', '', description));
  return section;
}

function classification(entry) {
  return [...new Set([entry.type, entry.school, entry.subtitle].filter(Boolean))].join(' · ');
}

function pathClassification(entry, mastery) {
  const label = classification(entry);
  return entry.masteryTarget > 0 && Number(mastery) >= entry.masteryTarget ? `${label} · Mastered` : label;
}

function pathSelection(focusId, activeId = focusId) {
  return focusId ? `paths:${focusId}:${activeId}` : 'paths';
}

function pathLink(className, label, href, focusKey, scroller) {
  const link = element('a', className, label);
  link.href = href;
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || location.hash === link.hash) return;
    pathNavigation = { hash: link.hash, focusKey, scrollLeft: scroller?.scrollLeft };
  });
  return link;
}

function renderPathGraph({ title, icon, page, pathIds, path, byId, active, focusId, href, context }) {
  const graph = element('section', 'skill-path-graph');
  const header = element('header', 'skill-path-header');
  const copy = element('div');
  copy.append(element('h2', '', title + ' paths'), element('p', '', 'Select an ability to see its prerequisites and what it leads to.'));
  const label = element('label', 'skill-path-picker', 'Focus ability');
  const picker = element('select');
  picker.dataset.abilityControl = 'path-picker';
  const choices = [...pathIds].map(id => byId.get(id)).sort((left, right) => left.name.localeCompare(right.name));
  for (const entry of choices) {
    const option = element('option', '', entry.name);
    option.value = entry.id;
    picker.append(option);
  }
  picker.value = focusId;
  picker.addEventListener('change', () => {
    const selection = pathSelection(picker.value);
    pathNavigation = { hash: href(selection), focusKey: 'path-picker' };
    context.navigate(page, selection);
  });
  label.append(picker);
  header.append(copy, label);
  const scroller = element('div', 'skill-path-scroller');
  scroller.tabIndex = 0;
  scroller.setAttribute('role', 'region');
  scroller.setAttribute('aria-label', title + ' prerequisite graph');
  const { board, controls } = makeAbilityGraph(path, active.id, id => {
    const entry = byId.get(id);
    const key = `path-${id}`;
    const link = pathLink('', '', href(pathSelection(focusId, id)), key, scroller);
    link.dataset.abilityControl = key;
    const identity = element('span', 'skill-path-identity');
    const points = context.profile.abilityMastery?.[page + ':' + entry.id];
    identity.append(element('strong', '', entry.name), element('small', '', pathClassification(entry, points)));
    link.append(badge(entry, icon), identity);
    return link;
  });
  scroller.append(board);
  graph.append(header, scroller);
  return { graph, scroller, activeControl: controls.get(active.id) };
}

function showAbilityNode(scroller, node) {
  const bounds = scroller.getBoundingClientRect();
  const control = node.getBoundingClientRect();
  if (control.right > bounds.right) scroller.scrollLeft += control.right - bounds.right + 16;
  if (control.left < bounds.left) scroller.scrollLeft -= bounds.left - control.left + 16;
}

function renderRouteGroups(detail, active, routes, byId, linkTo) {
  for (const [heading, group, incoming] of [
    ['Prerequisite routes', routes.filter(route => route.to === active.id), true],
    ['Leads to', routes.filter(route => route.from.includes(active.id)), false],
  ]) {
    if (!group.length) continue;
    const section = detailsSection(heading);
    if (incoming && group.length > 1) section.append(element('p', 'skill-path-route-note', 'Each route is an alternative.'));
    const records = element('div', 'ability-path-records');
    for (const route of group) {
      const record = element('div', 'skill-path-record');
      const sources = element('div', 'skill-path-source-list');
      if (!incoming) sources.append(linkTo(byId.get(route.to), 'skill-source-chip'));
      sources.append(element('strong', '', routeRule(route, 'ability')));
      for (const id of route.from) sources.append(linkTo(byId.get(id), 'skill-source-chip'));
      record.append(sources, element('p', '', route.requirement));
      records.append(record);
    }
    section.append(records);
    detail.append(section);
  }
}

function renderMastery(panel, entry, page, context, onSave) {
  if (!Number.isFinite(entry.masteryTarget) || entry.masteryTarget <= 0) return;
  const key = page + ':' + entry.id;
  let records = { ...context.profile.abilityMastery };
  const max = entry.masteryTarget;
  const section = detailsSection('Mastery', entry.masteryTip);
  const meter = element('progress', 'ability-mastery-meter');
  meter.max = max;
  meter.setAttribute('aria-label', entry.name + ' mastery');
  const status = element('p', 'ability-mastery-status');
  status.setAttribute('aria-live', 'polite');
  const form = element('form', 'ability-mastery-form');
  const label = element('label', '', 'Current points');
  const input = element('input');
  input.type = 'number';
  input.min = '0';
  input.max = String(max);
  input.step = 'any';
  input.required = true;
  const save = element('button', 'button primary', 'Save mastery');
  save.type = 'submit';
  const mastered = element('button', 'button secondary', 'Mark mastered');
  mastered.type = 'button';

  function reflect(value) {
    meter.value = value;
    input.value = String(value);
    status.textContent = format.format(value) + ' / ' + format.format(max) + ' points';
  }

  function record(value) {
    if (!Number.isFinite(value) || value < 0 || value > max) return;
    records = { ...records, [key]: value };
    context.updateProfile({ abilityMastery: records });
    reflect(value);
    onSave?.(value);
    context.notify('Mastery saved.');
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    record(input.valueAsNumber);
  });
  mastered.addEventListener('click', () => record(max));
  reflect(Math.max(0, Math.min(max, Number(records[key]) || 0)));
  label.append(input);
  form.append(label, save, mastered);
  section.append(meter, status, form);
  panel.append(section);
}

export function renderAbilities(root, context, options) {
  const { entries, title, icon, description, page, guide, release, guideLabel, contextNote, pathEntries = [] } = options;
  const byId = new Map([...pathEntries, ...entries].map(entry => [entry.id, entry]));
  const catalogIds = new Set(entries.map(entry => entry.id));
  const routes = (options.routes ?? entries.filter(entry => entry.requires?.length).map(entry => ({
    to: entry.id,
    from: entry.requires,
    requirement: entry.prerequisites?.join(' ') || entry.acquisition,
  }))).filter(route => byId.has(route.to) && route.from.length && route.from.every(id => byId.has(id)));
  const pathIds = new Set(routes.flatMap(route => [...route.from, route.to]));
  const [viewName, requestedFocus, requestedActive] = (context.selected ?? '').split(':');
  const showingPaths = viewName === 'paths' && pathIds.size > 0;
  const defaultFocus = pathIds.has(options.defaultPath)
    ? options.defaultPath
    : routes.find(route => route.from.length > 1)?.to ?? routes[0]?.from[0];
  const focusId = pathIds.has(requestedFocus) ? requestedFocus : defaultFocus;
  const path = showingPaths ? getAbilityPath(routes, focusId) : undefined;
  const active = showingPaths
    ? byId.get(path.ids.has(requestedActive) ? requestedActive : focusId)
    : entries.find(entry => entry.id === context.selected) ?? entries[0];
  const href = id => '#' + page + '/' + encodeURIComponent(id);
  const filter = savedFilters.get(page) ?? { type: '', query: '' };
  savedFilters.set(page, filter);
  const types = [...new Set(entries.map(entry => entry.type))].sort();
  const view = element('div', 'ability-library');

  const head = element('header', 'ability-header');
  const titleBlock = element('div', '');
  titleBlock.append(element('h1', '', title), element('p', '', description));
  head.append(badge({}, icon), titleBlock);
  const views = element('nav', 'skill-views ability-views');
  views.setAttribute('aria-label', title + ' views');
  if (pathIds.size) {
    const index = pathLink('skill-view', 'Ability index', href(catalogIds.has(active.id) ? active.id : entries[0].id), 'ability-title');
    index.prepend(symbol(icon));
    const targetPath = pathIds.has(active.id) ? pathSelection(active.id) : 'paths';
    const graphLink = pathLink('skill-view', title + ' paths', showingPaths ? location.hash : href(targetPath), 'path-picker');
    graphLink.prepend(symbol('account_tree'));
    (showingPaths ? graphLink : index).setAttribute('aria-current', 'page');
    views.append(index, graphLink);
  }

  const renderedPath = showingPaths ? renderPathGraph({
    title, icon, page, pathIds, path, byId, active, focusId, href, context,
  }) : undefined;
  const pathNodeLink = (entry, className) => {
    const visible = path?.ids.has(entry.id);
    return pathLink(className, entry.name, href(pathSelection(visible ? focusId : entry.id, entry.id)),
      visible ? `path-${entry.id}` : 'path-picker', visible ? renderedPath.scroller : undefined);
  };
  const filters = element('div', 'ability-filters');
  const searchLabel = element('label', 'ability-search');
  const search = element('input');
  search.type = 'search';
  search.placeholder = 'Search ' + title.toLowerCase() + '…';
  search.setAttribute('aria-label', 'Search ' + title.toLowerCase());
  search.value = filter.query;
  searchLabel.append(symbol('search'), search);
  const typeLabel = element('label', 'ability-type-filter', 'Category');
  const type = element('select');
  for (const category of ['', ...types]) {
    const option = element('option', '', category || 'All categories');
    option.value = category;
    type.append(option);
  }
  type.value = filter.type;
  typeLabel.append(type);
  filters.append(searchLabel, typeLabel);

  const layout = element('div', 'ability-layout');
  const results = element('section', 'ability-results');
  results.setAttribute('aria-label', title + ' results');
  const count = element('p', 'ability-count');
  count.setAttribute('aria-live', 'polite');
  const list = element('div', 'ability-list');
  results.append(count, list);
  const detail = element('article', 'ability-detail');
  detail.setAttribute('aria-label', title + ' details');
  const pathRoutes = element('aside', 'ability-path-route-panel');
  pathRoutes.setAttribute('aria-label', 'Ability routes');

  function drawList() {
    const words = filter.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const matching = entries.filter(entry => {
      if (filter.type && entry.type !== filter.type) return false;
      const haystack = [entry.name, entry.type, entry.school, entry.subtitle, entry.acquisition, entry.summary].filter(Boolean).join(' ').toLowerCase();
      return words.every(word => haystack.includes(word));
    });
    count.textContent = format.format(matching.length) + ' ' + (matching.length === 1 ? 'ability' : 'abilities');
    list.replaceChildren();
    if (!matching.length) list.append(element('p', 'ability-empty', 'No abilities match your search.'));
    for (const entry of matching) {
      const link = element('a', 'ability-row');
      link.href = href(entry.id);
      link.addEventListener('click', event => {
        if (event.detail === 0 && link.hash !== location.hash) returnFocus = link.hash;
      });
      if (active === entry) link.setAttribute('aria-current', 'true');
      const content = element('span', 'ability-row-content');
      content.append(element('strong', '', entry.name), element('small', '', classification(entry)));
      link.append(badge(entry, icon), content, symbol('chevron_right'));
      list.append(link);
    }
    const selectedRow = list.querySelector('[aria-current]');
    if (selectedRow && context.selected) list.scrollTop = Math.max(0, selectedRow.offsetTop - list.clientHeight / 2);
  }

  search.addEventListener('input', () => {
    filter.query = search.value;
    drawList();
  });
  type.addEventListener('change', () => {
    filter.type = type.value;
    drawList();
  });

  if (active) {
    const detailHeader = element('header', 'ability-detail-header');
    const identity = element('div', '');
    const detailTitle = element('h2', '', active.name);
    detailTitle.tabIndex = -1;
    detailTitle.dataset.abilityControl = 'ability-title';
    identity.append(element('p', 'eyebrow', classification(active)), detailTitle);
    detailHeader.append(badge(active, icon), identity);
    detail.append(detailHeader);
    if (active.summary) detail.append(element('p', 'ability-summary', active.summary));

    const facts = [
      ['Cost', typeof active.cost === 'number' ? format.format(active.cost) + (page === 'magic' ? ' MP' : ' AP') : active.cost],
      ['Cast time', active.castTime],
      ['Learning target', active.learningTarget && format.format(active.learningTarget) + ' pts'],
      ['Mastery target', active.masteryTarget && format.format(active.masteryTarget) + ' pts'],
    ].filter(([, value]) => value || value === 0);
    if (facts.length) {
      const stats = element('dl', 'ability-stats');
      for (const [label, value] of facts) {
        const item = element('div');
        item.append(element('dt', '', label), element('dd', '', String(value)));
        stats.append(item);
      }
      detail.append(stats);
    }
    if (active.acquisition || active.source) {
      const acquisition = detailsSection('How to acquire', active.acquisition);
      if (active.source) acquisition.append(reference(active.sourceLabel ?? 'Check wiki reference', active.source, 'button secondary ability-reference'));
      detail.append(acquisition);
    }
    if (active.prerequisites?.length || active.details?.length) {
      const info = detailsSection('Usage and requirements');
      const notes = element('ul', 'ability-notes');
      for (const note of [...(active.prerequisites ?? []), ...(active.details ?? [])]) notes.append(element('li', '', note));
      info.append(notes);
      detail.append(info);
    }
    if (pathIds.has(active.id)) {
      const actions = element('div', 'ability-links ability-path-actions');
      if (!showingPaths || active.id !== focusId) {
        const link = pathLink('button secondary', showingPaths ? 'Focus this ability' : 'View prerequisite and upgrade paths',
          href(pathSelection(active.id)), 'path-picker');
        link.prepend(symbol(showingPaths ? 'center_focus_strong' : 'account_tree'));
        actions.append(link);
      }
      if (active.href) {
        const link = element('a', 'button secondary', 'View ' + active.name + ' details');
        link.href = active.href;
        link.append(symbol('arrow_forward'));
        actions.append(link);
      }
      if (actions.childElementCount) detail.append(actions);
      renderRouteGroups(showingPaths ? pathRoutes : detail, active, routes, byId, showingPaths ? pathNodeLink : (entry, className) => {
        const link = element('a', className, entry.name);
        link.href = entry.href ?? href(entry.id);
        return link;
      });
    }
    if (catalogIds.has(active.id)) {
      const nodeStatus = renderedPath?.activeControl.querySelector('.skill-path-identity small');
      renderMastery(detail, active, page, context, nodeStatus && (points => {
        nodeStatus.textContent = pathClassification(active, points);
      }));
    }
  }
  layout.append(results, detail);
  const footer = element('section', 'ability-guide');
  footer.append(element('p', '', contextNote), reference(guideLabel, guide), reference('Ability usage', usageWiki), reference('2.0.1.5 release', release));
  view.append(head);
  if (views.childElementCount) view.append(views);
  if (showingPaths) {
    const pathDetails = element('div', 'ability-path-details');
    pathDetails.append(detail, pathRoutes);
    view.append(renderedPath.graph, pathDetails);
  } else {
    view.append(filters, layout);
  }
  view.append(footer);
  root.replaceChildren(view);
  if (!showingPaths) drawList();

  const pathChange = pathNavigation?.hash === location.hash ? pathNavigation : undefined;
  pathNavigation = undefined;
  if (renderedPath) {
    const { graph, scroller, activeControl } = renderedPath;
    if (pathChange?.scrollLeft !== undefined) scroller.scrollLeft = pathChange.scrollLeft;
    showAbilityNode(scroller, activeControl);
    if (pathChange?.focusKey === 'path-picker') graph.querySelector('header').scrollIntoView({ block: 'nearest' });
  }
  if (pathChange?.focusKey) {
    view.querySelector(`[data-ability-control="${CSS.escape(pathChange.focusKey)}"]`)?.focus({ preventScroll: true });
  }

  if (!showingPaths && context.selected === active?.id && window.matchMedia('(max-width: 650px)').matches) {
    detail.scrollIntoView({ block: 'start' });
  } else if (returnFocus === location.hash) {
    list.querySelector('[aria-current]')?.focus({ preventScroll: true });
  }
  returnFocus = undefined;
}
