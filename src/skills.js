import { skills, skillRoutes, skillSources } from './data/skills.js';
import { getAbilityPath, makeAbilityGraph, routeRule } from './ability-graph.js';

const types = ['All', 'Unique', 'Extra', 'Common', 'Intrinsic', 'Resistance', 'Ultimate'];
const amount = new Intl.NumberFormat('en-US');
const skillById = new Map(skills.map(skill => [skill.id, skill]));
const filters = { query: '', type: 'All', pinnedOnly: false };
const pathIds = new Set(skillRoutes.flatMap(route => [...route.from, route.to]));
const pathSkills = skills.filter(skill => pathIds.has(skill.id));
const defaultPathId = pathIds.has('gluttony') ? 'gluttony' : pathSkills[0]?.id;
let nextFocus;

function el(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function button(className, label, callback) {
  const node = el('button', className, label);
  node.type = 'button';
  node.addEventListener('click', callback);
  return node;
}

function link(label, url, className = 'skill-link') {
  const node = el('a', className, label);
  node.href = url;
  node.target = '_blank';
  node.rel = 'noopener noreferrer';
  node.append(icon('north_east'));
  return node;
}

function icon(name) {
  const node = el('span', 'material-symbols-outlined', name);
  node.ariaHidden = 'true';
  return node;
}

function mark(skill, large = false) {
  const node = el('span', 'skill-mark' + (large ? ' skill-mark-large' : ''));
  const image = el('img');
  image.alt = '';
  image.src = skill.icon;
  image.width = 32;
  image.height = 32;
  if (!large) image.loading = 'lazy';
  node.append(image);
  return node;
}

function section(title, text) {
  const node = el('section', 'skill-subsection');
  node.append(el('h3', '', title));
  if (text) node.append(el('p', '', text));
  return node;
}

function pathSelection(focusId, selectedId = focusId) {
  return `paths:${focusId}:${selectedId}`;
}

function skillHref(selection) {
  return '#skills/' + encodeURIComponent(selection);
}

function skillPageLink(className, label, selection, focusKey, scroller) {
  const node = el('a', className, label);
  node.href = skillHref(selection);
  node.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || location.hash === node.hash) return;
    nextFocus = { selection, key: focusKey, scrollLeft: scroller?.scrollLeft };
  });
  return node;
}

function skillHeader(activeId, showingPaths) {
  const header = el('header', 'skill-heading');
  header.append(
    el('h1', '', 'Skill Library'),
    el('p', '', showingPaths
      ? 'Follow the prerequisites, upgrades, and combinations between skills.'
      : 'Browse base-mod skills, trace their upgrade routes, and track your mastery.'),
  );
  const views = el('nav', 'skill-views');
  views.setAttribute('aria-label', 'Skill Library views');
  const index = skillPageLink('skill-view', 'Skill index', activeId, 'skill-title');
  index.prepend(icon('auto_awesome'));
  const pathRoute = pathIds.has(activeId) ? pathSelection(activeId) : 'paths';
  const paths = skillPageLink('skill-view', 'Skill paths', pathRoute, 'path-picker');
  paths.prepend(icon('account_tree'));
  (showingPaths ? paths : index).setAttribute('aria-current', 'page');
  if (showingPaths) paths.href = location.hash;
  if (pathSkills.length) views.append(index, paths);
  header.append(views);
  return header;
}

function restoreSkillFocus(view, selected) {
  if (nextFocus?.selection !== selected) return;
  const { key } = nextFocus;
  nextFocus = undefined;
  view.querySelector(`[data-skill-control="${key}"]`)?.focus({ preventScroll: true });
}

function makeSkillGraph(scroller, path, focusId, activeId, profile) {
  return makeAbilityGraph(path, activeId, id => {
    const skill = skillById.get(id);
    const control = skillPageLink('', '', pathSelection(focusId, id), `path-${id}`, scroller);
    control.dataset.skillControl = `path-${id}`;
    const identity = el('span', 'skill-path-identity');
    const mastered = Number(profile?.mastery?.[id]) >= skill.masteryTarget;
    identity.append(el('strong', '', skill.name), el('small', '', mastered ? `${skill.type} · Mastered` : skill.type));
    control.append(mark(skill), identity);
    if (Array.isArray(profile?.pinnedSkills) && profile.pinnedSkills.includes(id)) {
      const star = el('span', 'skill-path-star', '★');
      star.setAttribute('aria-label', 'Pinned');
      control.append(star);
    }
    return control;
  });
}

function pathRequirements(active, focusId, visibleIds, scroller) {
  const details = el('article', 'skill-path-details');
  const identity = el('div', 'skill-path-details-title');
  const names = el('div');
  names.append(el('p', 'skill-detail-type', active.type), el('h2', '', active.name));
  identity.append(mark(active, true), names);
  const acquisition = el('div', 'skill-path-acquisition');
  acquisition.append(identity, section('How to acquire', active.acquisition));
  const actions = el('div', 'skill-path-actions');
  const skillDetails = skillPageLink('skill-control skill-action', 'Skill details & mastery', active.id, 'skill-title');
  skillDetails.append(icon('arrow_forward'));
  actions.append(skillDetails);
  if (active.id !== focusId) {
    const refocus = skillPageLink('skill-control skill-action', 'Focus this skill', pathSelection(active.id), 'path-picker');
    refocus.prepend(icon('center_focus_strong'));
    actions.append(refocus);
  }
  acquisition.append(actions);

  const requirements = el('div', 'skill-path-requirements');
  const incoming = skillRoutes.filter(route => route.to === active.id);
  const outgoing = skillRoutes.filter(route => route.from.includes(active.id));
  for (const [title, routes, isIncoming] of [
    ['Prerequisite routes', incoming, true],
    ['Leads to', outgoing, false],
  ]) {
    if (!routes.length) continue;
    const group = el('section', 'skill-path-route-group');
    group.append(el('h3', '', title));
    for (const route of routes) {
      const record = el('div', 'skill-path-record');
      const rule = routeRule(route);
      if (isIncoming) {
        const sources = el('div', 'skill-path-source-list');
        sources.append(el('strong', '', rule));
        for (const id of route.from) {
          const showing = visibleIds.has(id);
          sources.append(skillPageLink('skill-source-chip', skillById.get(id).name,
            pathSelection(showing ? focusId : id, id), showing ? `path-${id}` : 'path-picker', showing ? scroller : undefined));
        }
        record.append(sources);
      } else {
        const target = skillById.get(route.to);
        const showing = visibleIds.has(target.id);
        const result = skillPageLink('skill-source-chip', target.name,
          pathSelection(showing ? focusId : target.id, target.id), showing ? `path-${target.id}` : 'path-picker', showing ? scroller : undefined);
        const lead = el('div', 'skill-path-source-list');
        lead.append(result, el('strong', '', rule));
        record.append(lead);
      }
      record.append(el('p', '', route.requirement));
      group.append(record);
    }
    if (isIncoming && routes.length > 1) {
      group.insertBefore(el('p', 'skill-path-route-note', 'Each route is an alternative.'), group.children[1]);
    }
    requirements.append(group);
  }
  details.append(acquisition, requirements);
  return details;
}

function renderSkillPaths(root, { selected, profile, navigate }) {
  const [, requestedFocus, requestedActive] = selected.split(':');
  const focusId = pathIds.has(requestedFocus) ? requestedFocus : defaultPathId;
  const path = getAbilityPath(skillRoutes, focusId);
  const activeId = path.ids.has(requestedActive) ? requestedActive : focusId;
  const active = skillById.get(activeId);
  const view = el('section', 'skill-library');
  const graph = el('section', 'skill-path-graph');
  const heading = el('div', 'skill-path-header');
  const title = el('div');
  title.append(el('h2', '', 'Skill paths'), el('p', '', 'Select a skill to see its requirements and other ways to acquire it.'));
  const label = el('label', 'skill-path-picker', 'Focus skill');
  const picker = el('select');
  picker.dataset.skillControl = 'path-picker';
  for (const skill of pathSkills) {
    const option = el('option', '', skill.name);
    option.value = skill.id;
    picker.append(option);
  }
  picker.value = focusId;
  picker.addEventListener('change', () => {
    const selection = pathSelection(picker.value);
    nextFocus = { selection, key: 'path-picker', scrollLeft: 0 };
    navigate('skills', selection);
  });
  label.append(picker);
  heading.append(title, label);

  const scroller = el('div', 'skill-path-scroller');
  scroller.tabIndex = 0;
  scroller.setAttribute('role', 'region');
  scroller.setAttribute('aria-label', 'Skill prerequisite graph');
  const { board, controls } = makeSkillGraph(scroller, path, focusId, activeId, profile);
  scroller.append(board);
  graph.append(heading, scroller);
  view.append(skillHeader(active.id, true), graph, pathRequirements(active, focusId, path.ids, scroller));
  root.replaceChildren(view);

  const restoreScroll = nextFocus?.selection === selected ? nextFocus.scrollLeft : undefined;
  if (restoreScroll !== undefined) scroller.scrollLeft = restoreScroll;
  const control = controls.get(activeId);
  const bounds = scroller.getBoundingClientRect();
  const node = control.getBoundingClientRect();
  if (nextFocus?.key !== 'path-picker' || restoreScroll === undefined) {
    if (node.right > bounds.right) scroller.scrollLeft += node.right - bounds.right + 16;
    if (node.left < bounds.left) scroller.scrollLeft -= bounds.left - node.left + 16;
  }
  restoreSkillFocus(view, selected);
}

export function renderSkills(root, { selected, profile, updateProfile, notify, navigate }) {
  if ((selected === 'paths' || selected?.startsWith('paths:')) && pathSkills.length) {
    renderSkillPaths(root, { selected, profile, navigate });
    return;
  }
  let active = skillById.get(selected) ?? skillById.get('predator');
  const view = el('section', 'skill-library');
  const header = skillHeader(active.id, false);

  const toolbar = el('div', 'skill-toolbar');
  const searchLabel = el('label', 'skill-search');
  const searchIcon = icon('search');
  const search = el('input');
  search.type = 'search';
  search.value = filters.query;
  search.placeholder = 'Search skills…';
  search.setAttribute('aria-label', 'Search skills');
  searchLabel.append(searchIcon, search);
  const pinFilter = button('skill-control', '☆ Pinned only', () => {
    filters.pinnedOnly = !filters.pinnedOnly;
    drawList();
  });
  toolbar.append(searchLabel, pinFilter);

  const categories = el('div', 'skill-categories');
  categories.setAttribute('role', 'group');
  categories.setAttribute('aria-label', 'Skill types');
  const typeButtons = new Map();
  for (const type of types) {
    const item = button('skill-filter', type, () => {
      filters.type = type;
      drawList();
    });
    typeButtons.set(type, item);
    categories.append(item);
  }

  const columns = el('div', 'skill-columns');
  const browser = el('section', 'skill-browser');
  browser.setAttribute('aria-label', 'Skill results');
  const count = el('p', 'skill-count');
  count.setAttribute('aria-live', 'polite');
  const list = el('div', 'skill-list');
  browser.append(count, list);
  const detail = el('article', 'skill-detail');
  detail.setAttribute('aria-label', 'Skill details');
  columns.append(browser, detail);

  const help = el('details', 'skill-help');
  help.append(
    el('summary', '', 'How learning and mastery work'),
    el('p', '', 'Equip an eligible ability and use its slot key to earn learning points. Most Common and Extra skills need 100 learning points. Successful use after learning builds mastery. Damaging or defeating enemies with an ability can award extra points. Sage, Great Sage, and certain other skills boost gains.'),
    link('Ability usage', skillSources.usage),
  );

  const footer = el('p', 'skill-footnote');
  footer.append(
    document.createTextNode('Skill icons, mastery targets, and MP costs come from the base mod. Acquisition routes follow the wiki. '),
    link('2.0.1.5 release', skillSources.release),
    document.createTextNode(' · '),
    link('Wiki skill index', skillSources.index),
  );

  view.append(header, toolbar, categories, columns, help, footer);
  root.replaceChildren(view);

  let pinned = Array.isArray(profile?.pinnedSkills) ? profile.pinnedSkills : [];
  let mastery = { ...profile?.mastery };

  function goToSkill(id) {
    active = skillById.get(id);
    drawList();
    drawDetail();
    if (location.hash === skillHref(id)) {
      detail.querySelector('[data-skill-control="skill-title"]').focus({ preventScroll: true });
    } else {
      nextFocus = { selection: id, key: 'skill-title' };
      navigate('skills', id);
    }
    if (matchMedia('(max-width: 720px)').matches) {
      root.querySelector('.skill-detail')?.scrollIntoView({ block: 'start' });
    }
  }

  function drawList() {
    for (const [type, item] of typeButtons) {
      item.setAttribute('aria-pressed', String(filters.type === type));
    }
    pinFilter.setAttribute('aria-pressed', String(filters.pinnedOnly));
    const query = filters.query.toLowerCase().trim().split(/[^a-z0-9]+/).filter(Boolean);
    const matching = skills.filter(skill => {
      if (filters.type !== 'All' && filters.type !== skill.type) return false;
      if (filters.pinnedOnly && !pinned.includes(skill.id)) return false;
      const searchable = [skill.name, skill.type, skill.summary, skill.acquisition, skill.masteryTip].join(' ').toLowerCase();
      return query.every(term => searchable.includes(term));
    });

    count.textContent = amount.format(matching.length) + (matching.length === 1 ? ' skill' : ' skills');
    const listScroll = list.scrollTop;
    list.replaceChildren();
    if (filters.type === 'Ultimate') {
      const empty = el('div', 'skill-empty');
      empty.append(
        el('p', '', 'Ultimate Skills are listed as planned by the wiki. The base 2.0.1.5 release has no registered Ultimate Skills.'),
        link('Ultimate Skills reference', skillSources.ultimate),
      );
      list.append(empty);
      return;
    }
    if (!matching.length) {
      list.append(el('p', 'skill-empty', filters.pinnedOnly ? 'No pinned skills match.' : 'No skills match this search.'));
      return;
    }

    for (const skill of matching) {
      const item = button('skill-row', '', () => goToSkill(skill.id));
      if (skill === active) item.setAttribute('aria-current', 'true');
      const identity = el('span', 'skill-row-identity');
      identity.append(el('strong', '', skill.name), el('span', 'skill-row-type', skill.type));
      item.append(mark(skill), identity);
      if (pinned.includes(skill.id)) {
        const star = el('span', 'skill-row-star', '★');
        star.setAttribute('aria-label', 'Pinned');
        item.append(star);
      }
      list.append(item);
    }
    list.scrollTop = listScroll;
  }

  function drawDetail() {
    if (!active) return;
    const skill = active;
    const isPinned = pinned.includes(skill.id);
    detail.replaceChildren();

    const heading = el('div', 'skill-detail-heading');
    const title = el('div', 'skill-detail-title');
    const name = el('h2', '', skill.name);
    name.tabIndex = -1;
    name.dataset.skillControl = 'skill-title';
    title.append(el('p', 'skill-detail-type', skill.type + (skill.type === 'Resistance' ? '' : ' skill')), name);
    const pin = button('skill-control skill-pin', isPinned ? '★ Pinned' : '☆ Pin skill', () => {
      pinned = isPinned ? pinned.filter(id => id !== skill.id) : [...pinned, skill.id];
      drawList();
      drawDetail();
      updateProfile({ pinnedSkills: pinned });
      notify?.(isPinned ? 'Skill unpinned' : 'Skill pinned');
      root.querySelector('.skill-pin')?.focus();
    });
    pin.setAttribute('aria-pressed', String(isPinned));
    heading.append(mark(skill, true), title, pin);
    detail.append(heading);
    if (skill.summary) detail.append(el('p', 'skill-summary', skill.summary));

    const stats = el('dl', 'skill-stats');
    for (const [label, value] of [
      ['Acquisition cost', amount.format(skill.cost) + ' MP'],
      ['Mastery target', amount.format(skill.masteryTarget) + ' pts'],
    ]) {
      const cell = el('div');
      cell.append(el('dt', '', label), el('dd', '', value));
      stats.append(cell);
    }
    const acquisition = section('How to acquire', skill.acquisition);
    acquisition.classList.add('skill-acquisition');
    const references = el('div', 'skill-acquisition-links');
    references.append(link('Check wiki reference', skill.source, 'button skill-wiki-button'));
    if (skill.type === 'Resistance' && skill.source !== skillSources.resistances) {
      references.append(link('Resistance acquisition rules', skillSources.resistances));
    }
    acquisition.append(references);

    detail.append(stats, acquisition);
    if (pathIds.has(skill.id)) {
      const paths = section('Skill paths');
      const open = skillPageLink('skill-control skill-action', 'View prerequisite and upgrade paths', pathSelection(skill.id), `path-${skill.id}`);
      open.prepend(icon('account_tree'));
      open.append(icon('arrow_forward'));
      paths.append(open);
      detail.append(paths);
    }

    const tracker = section('Track mastery', skill.masteryTip ?? 'Use the ability to gain mastery after learning it.');
    const current = Math.max(0, Math.min(skill.masteryTarget, Number(mastery[skill.id]) || 0));
    const meter = el('progress', 'skill-meter');
    meter.max = skill.masteryTarget;
    meter.value = current;
    meter.setAttribute('aria-label', skill.name + ' mastery');
    const progressLabel = el('p', 'skill-meter-label', amount.format(current) + ' / ' + amount.format(skill.masteryTarget) + ' points');
    const form = el('form', 'skill-mastery-form');
    const label = el('label', 'skill-mastery-input', 'Current points');
    const points = el('input');
    points.type = 'number';
    points.min = '0';
    points.max = String(skill.masteryTarget);
    points.step = 'any';
    points.required = true;
    points.value = String(current);
    label.append(points);
    const apply = button('skill-control skill-save', 'Save');
    apply.type = 'submit';
    const max = button('skill-control', 'Mark mastered', () => saveMastery(skill.masteryTarget, max));
    form.append(label, apply, max);
    form.addEventListener('submit', event => {
      event.preventDefault();
      saveMastery(points.valueAsNumber, apply);
    });

    function saveMastery(value, trigger) {
      if (!Number.isFinite(value) || value < 0 || value > skill.masteryTarget) return;
      mastery = { ...mastery, [skill.id]: value };
      points.value = String(value);
      meter.value = value;
      progressLabel.textContent = amount.format(value) + ' / ' + amount.format(skill.masteryTarget) + ' points';
      updateProfile({ mastery });
      notify?.('Mastery saved');
      if (!trigger.isConnected) root.querySelector('.skill-save')?.focus();
    }

    tracker.append(meter, progressLabel, form);
    detail.append(tracker);
  }

  search.addEventListener('input', () => {
    filters.query = search.value;
    drawList();
  });
  drawList();
  drawDetail();
  restoreSkillFocus(view, selected);
}
