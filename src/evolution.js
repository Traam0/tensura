import { evolutions, evolutionGuide, evolutionRelease } from './data/evolutions.js';

const formatEP = new Intl.NumberFormat('en-US');
const selectedForms = new Map();
const awakeningRequirement = 'Awaken as a True Demon Lord or True Hero';
const routeTypes = {
  evolution: 'Evolution',
  awakening: 'Awakening',
  festival: 'Higher-tier Naming / Harvest Festival gift',
};

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function button(className, label, onClick) {
  const node = element('button', className, label);
  node.type = 'button';
  node.addEventListener('click', onClick);
  return node;
}

function sourceLink(url, text) {
  const link = element('a', 'evolution-source', text);
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

function condensedRequirements(node) {
  if (!node.parents.length) return 'Starting form';
  if (node.ep) return `${formatEP.format(node.ep)} EP${node.requirements.length ? ' + condition' : ''}`;
  if (node.requiredCount) return `${node.requiredCount} of ${node.requirements.length} conditions`;
  if (node.requirements.length > 1) return `${node.requirements.length} conditions`;
  return node.requirements[0] === awakeningRequirement ? 'Awakening' : node.requirements[0];
}

function layoutGraph(nodes) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const depths = new Map();

  function depth(node) {
    if (depths.has(node.id)) return depths.get(node.id);
    const value = node.parents.length ? 1 + Math.max(...node.parents.map((id) => depth(byId.get(id)))) : 0;
    depths.set(node.id, value);
    return value;
  }

  const columns = [];
  for (const node of nodes) {
    const column = depth(node);
    columns[column] ??= [];
    columns[column].push(node);
  }
  return { columns, depths };
}

function lineageRoutes(nodes, byId) {
  const routes = nodes.flatMap((node) => node.parents.map((from) => ({
    from,
    to: node.id,
    type: node.requirements.length === 1 && node.requirements[0] === awakeningRequirement ? 'awakening' : 'evolution',
    required: true,
  })));
  for (const node of nodes) {
    for (const type of ['awakening', 'festival']) {
      const to = node[type];
      if (byId.has(to) && !routes.some((route) => route.from === node.id && route.to === to && route.type === type)) {
        routes.push({ from: node.id, to, type, required: false });
      }
    }
  }
  return routes;
}

function requiredPath(routes, target) {
  const path = new Set();
  function visit(to) {
    for (const route of routes) {
      if (!route.required || route.to !== to || path.has(route)) continue;
      path.add(route);
      visit(route.from);
    }
  }
  visit(target);
  return path;
}

function drawGraph(canvas, board, routes, controls, depths, selected, tracked) {
  const { left, top, width, height } = board.getBoundingClientRect();
  if (!width || !height) return;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.ceil(width * ratio);
  canvas.height = Math.ceil(height * ratio);
  const pen = canvas.getContext('2d');
  if (!pen) return;
  pen.scale(ratio, ratio);
  const theme = getComputedStyle(board);
  const color = (name) => theme.getPropertyValue(name).trim();
  const accent = color('--evo-accent');
  const selectedPath = requiredPath(routes, selected);
  const goalPath = requiredPath(routes, tracked);
  const rectangles = new Map([...controls].map(([id, node]) => [id, node.getBoundingClientRect()]));
  let shortcutLane = 0;
  const visible = routes.filter(({ required, from, to }) => required || from === selected || to === selected);
  for (const route of visible) {
      const { from, to, type, required } = route;
    const start = rectangles.get(from);
    const end = rectangles.get(to);
    const stageDifference = depths.get(to) - depths.get(from);
    const forward = stageDifference > 0;
    const offset = required ? 0 : type === 'awakening' ? 10 : -10;
    const x1 = (forward ? start.right : start.left) - left;
    const y1 = start.top + start.height / 2 - top + offset;
    const x2 = (forward ? end.left : end.right) - left;
    const y2 = end.top + end.height / 2 - top + offset;
    const highlighted = selectedPath.has(route) || goalPath.has(route) || from === selected;
    const evolutionColor = highlighted ? accent : color('--evo-connector');
    pen.strokeStyle = type === 'evolution' ? evolutionColor : color(`--evo-${type}`);
    pen.fillStyle = pen.strokeStyle;
    pen.lineWidth = highlighted ? 2.2 : 1.5;
    pen.setLineDash(type === 'awakening' ? [6, 4] : type === 'festival' ? [2, 4] : []);
    pen.beginPath();
    pen.moveTo(x1, y1);
    const direction = forward ? 1 : -1;
    if (stageDifference === 1) {
      const mid = (x1 + x2) / 2;
      pen.bezierCurveTo(mid, y1, mid, y2, x2, y2);
    } else {
      const lane = required ? 49 : height - 14 - shortcutLane++ * 7;
      const exit = x1 + direction * (required ? 13 : 28);
      const entry = x2 - direction * (required ? 13 : 28);
      const bend = lane > y1 ? 6 : -6;
      const endBend = lane > y2 ? 6 : -6;
      pen.lineTo(exit - direction * 6, y1);
      pen.quadraticCurveTo(exit, y1, exit, y1 + bend);
      pen.lineTo(exit, lane - bend);
      pen.quadraticCurveTo(exit, lane, exit + direction * 6, lane);
      pen.lineTo(entry - direction * 6, lane);
      pen.quadraticCurveTo(entry, lane, entry, lane - endBend);
      pen.lineTo(entry, y2 + endBend);
      pen.quadraticCurveTo(entry, y2, entry + direction * 6, y2);
      pen.lineTo(x2, y2);
    }
    pen.stroke();
    pen.beginPath();
    pen.moveTo(x2, y2);
    pen.lineTo(x2 - direction * 7, y2 - 4);
    pen.lineTo(x2 - direction * 7, y2 + 4);
    pen.fill();
  }
}

export function renderEvolution(root, context) {
  const { selected, profile, updateProfile, notify, navigate } = context;
  const [raceId, nodeId] = (selected ?? '').split(':');
  const race = evolutions.find(({ id }) => id === raceId) ?? evolutions[0];
  const { columns, depths } = layoutGraph(race.nodes);
  const nodeById = new Map(race.nodes.map((node) => [node.id, node]));
  const routes = lineageRoutes(race.nodes, nodeById);
  const savedGoal = profile.goal?.race === race.id ? profile.goal.node : '';
  const remembered = selectedForms.get(race.id);
  const initial = [nodeId, savedGoal, remembered, race.nodes[1]?.id, race.id];
  let selectedId = initial.find((id) => nodeById.has(id));
  let currentProfile = profile;

  const page = element('section', 'evolution-page');
  const header = element('div', 'evolution-header');
  header.append(
    element('h1', 'evolution-heading', 'Evolution trees'),
    element('p', 'evolution-intro', 'Explore every playable race and track the requirements for your next form.'),
  );

  const picker = element('nav', 'evolution-picker');
  picker.setAttribute('aria-label', 'Starting race');
  for (const option of evolutions) {
    const choice = button('evolution-choice', option.name, () => navigate('evolution', option.id));
    choice.setAttribute('aria-pressed', option.id === race.id);
    picker.append(choice);
  }

  const columnsWrapper = element('div', 'evolution-columns');
  const graph = element('section', 'evolution-graph');
  const graphHeader = element('div', 'evolution-graph-header');
  const graphTitle = element('div');
  graphTitle.append(element('h2', '', `${race.name} lineage`), element('p', '', race.summary));
  graphHeader.append(graphTitle, element('span', 'evolution-alignment', race.group));
  const toolbar = element('div', 'evolution-toolbar');
  const legend = element('ul', 'evolution-legend');
  legend.setAttribute('aria-label', 'Route types');
  for (const [type, label] of Object.entries(routeTypes)) {
    if (!routes.some((route) => route.type === type)) continue;
    const item = element('li', '', label);
    item.dataset.route = type;
    legend.append(item);
  }
  const viewControls = element('div', 'evolution-view-controls');
  viewControls.setAttribute('role', 'group');
  viewControls.setAttribute('aria-label', 'Display mode');
  const treeView = button('evolution-view', 'Tree', () => setView('tree', true));
  const listView = button('evolution-view', 'List', () => setView('list', true));
  viewControls.append(treeView, listView);
  toolbar.append(legend, viewControls);
  const scroller = element('div', 'evolution-scroller');
  scroller.setAttribute('role', 'region');
  scroller.setAttribute('aria-label', `${race.name} evolution forms`);
  const board = element('div', 'evolution-board');
  board.style.setProperty('--evo-column-count', columns.length);
  const canvas = element('canvas', 'evolution-lines');
  canvas.setAttribute('aria-hidden', 'true');
  board.append(canvas);
  scroller.append(board);
  const footer = element('div', 'evolution-graph-footer');
  const graphHints = element('div', 'evolution-graph-hints');
  const scrollHint = element('span', 'evolution-scroll-hint', 'Scroll sideways to see more forms');
  graphHints.append(scrollHint);
  if (routes.some((route) => !route.required)) {
    graphHints.append(element('span', 'evolution-shortcut-hint', 'Shortcut arrows follow the selected form'));
  }
  const showRequirements = button('evolution-parent', 'View requirements ↓', () => {
    details.querySelector('h2').focus({ preventScroll: true });
    details.scrollIntoView({ block: 'nearest' });
  });
  footer.append(graphHints, showRequirements);
  graph.append(graphHeader, toolbar, scroller, footer);

  const details = element('aside', 'evolution-details');
  details.setAttribute('aria-label', 'Selected evolution');
  const controls = new Map();
  for (const [index, column] of columns.entries()) {
    const stage = element('div', 'evolution-stage');
    const stageLabel = element('h3', 'evolution-stage-label', index ? `Stage ${index}` : 'Starting form');
    const stageNodes = element('div', 'evolution-stage-nodes');
    stage.append(stageLabel, stageNodes);
    for (const node of column) {
      const control = button('evolution-node', '', () => selectNode(node.id));
      control.setAttribute('aria-controls', 'evolution-details');
      const statuses = element('span', 'evolution-node-status');
      const routeSummary = element('span', 'evolution-node-routes');
      for (const [type, label] of Object.entries(routeTypes)) {
        const from = routes.filter((route) => route.to === node.id && route.type === type)
          .map((route) => nodeById.get(route.from).name);
        if (from.length) routeSummary.append(element('span', '', `${label} from ${from.join(' or ')}`));
      }
      control.append(element('b', '', node.name), element('span', 'evolution-node-condition', condensedRequirements(node)), statuses, routeSummary);
      controls.set(node.id, control);
      stageNodes.append(control);
    }
    board.append(stage);
  }

  const sources = element('div', 'evolution-sources');
  sources.append(
    element('span', '', 'Default values can be changed by server configuration.'),
    sourceLink(race.source, 'Race wiki'),
    sourceLink(evolutionGuide, 'Evolution guide'),
    sourceLink(evolutionRelease, 'Mod release 2.0.1.5'),
  );

  details.id = 'evolution-details';
  columnsWrapper.append(graph, details);
  page.append(header, picker, columnsWrapper, sources);
  root.replaceChildren(page);

  function save(partial) {
    currentProfile = { ...currentProfile, ...partial };
    updateProfile(partial);
  }

  function renderDetails() {
    const node = nodeById.get(selectedId);
    const tracked = currentProfile.goal?.race === race.id && currentProfile.goal?.node === node.id;
    const isStart = !node.parents.length;
    const title = element('div', 'evolution-detail-title');
    const heading = element('h2', '', node.name);
    heading.tabIndex = -1;
    title.append(heading);
    const statuses = formStatuses(node.id);
    title.append(element('span', 'evolution-label', [isStart ? 'Starting form' : `Stage ${depths.get(node.id)}`, ...statuses].join(' · ')));
    const overview = element('div', 'evolution-detail-group');
    const requirements = element('div', 'evolution-detail-group');
    overview.append(title);
    details.replaceChildren(overview, requirements);

    for (const incoming of [true, false]) {
      for (const [type, label] of Object.entries(routeTypes)) {
        const connections = routes.filter((route) => route.type === type && (incoming ? route.to === node.id : route.from === node.id));
        if (!connections.length) continue;
        const row = element('div', 'evolution-route');
        row.dataset.route = type;
        row.append(element('span', 'evolution-label', `${label} ${incoming ? 'from' : 'to'}`));
        for (const connection of connections) {
          const id = incoming ? connection.from : connection.to;
          row.append(button('evolution-parent', nodeById.get(id).name, () => selectNode(id, true)));
        }
        overview.append(row);
      }
    }

    if (node.ep) {
      const epForm = element('form', 'evolution-ep');
      const total = Math.max(0, currentProfile.ep ?? 0);
      const epLabel = element('label', '', 'Your current EP');
      const input = element('input');
      input.type = 'number';
      input.min = '0';
      input.max = String(Number.MAX_SAFE_INTEGER);
      input.step = '1';
      input.required = true;
      input.value = total;
      epLabel.append(input);
      const submit = element('button', 'evolution-ep-save', 'Save');
      submit.type = 'submit';
      epForm.append(epLabel, submit);
      epForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!Number.isSafeInteger(input.valueAsNumber)) return;
        save({ ep: input.valueAsNumber });
        notify?.('Current EP updated');
        renderDetails();
        details.querySelector('input[type="number"]')?.focus();
      });

      const bar = element('progress', 'evolution-progress');
      bar.max = node.ep;
      bar.value = Math.min(total, node.ep);
      bar.setAttribute('aria-label', 'EP requirement progress');
      requirements.append(epForm, bar, element('p', 'evolution-ep-total', `${formatEP.format(total)} / ${formatEP.format(node.ep)} EP`));
    }

    if (node.requirements.length) {
      const checklist = element('fieldset', 'evolution-checklist');
      const quota = node.requiredCount ?? node.requirements.length;
      const completion = element('p', 'evolution-check-progress');
      completion.setAttribute('aria-live', 'polite');
      const requirementKeys = node.requirements.map((_, index) => `${race.id}:${node.id}:${index}`);
      const updateCompletion = () => {
        const checked = requirementKeys.filter((key) => currentProfile.checks?.[key]).length;
        completion.textContent = checked >= quota ? 'Checklist complete' : `${checked} of ${quota} requirements met`;
      };
      checklist.append(element('legend', 'evolution-label', node.requiredCount ? `Complete any ${quota}` : 'Other requirements'));
      for (const [index, requirement] of node.requirements.entries()) {
        const key = requirementKeys[index];
        const label = element('label', 'evolution-check');
        const check = element('input');
        check.type = 'checkbox';
        check.checked = Boolean(currentProfile.checks?.[key]);
        check.addEventListener('change', () => {
          save({ checks: { ...currentProfile.checks, [key]: check.checked } });
          updateCompletion();
        });
        label.append(check, element('span', '', requirement));
        checklist.append(label);
      }
      updateCompletion();
      requirements.append(checklist, completion);
    }

    if (!isStart) {
      const track = button('evolution-track', tracked ? 'Clear tracked goal' : 'Track this evolution', () => {
        save({ goal: tracked ? null : { race: race.id, node: node.id } });
        notify?.(tracked ? 'Evolution goal cleared' : `Tracking ${node.name}`);
        updateGraph();
        renderDetails();
        details.querySelector('.evolution-track')?.focus();
      });
      track.dataset.tracked = String(tracked);
      requirements.append(track);
    }

    if (node.notes) overview.append(element('p', 'evolution-note', node.notes));
    if (node.skills?.length) {
      const skills = element('p', 'evolution-note');
      skills.append(element('b', '', 'Featured abilities'), document.createElement('br'), node.skills.join(' · '));
      overview.append(skills);
    }

    if (isStart) requirements.append(element('p', 'evolution-note', 'Select an evolution to see its requirements.'));
  }

  function formStatuses(id) {
    const statuses = [];
    if (currentProfile.character?.form === id) statuses.push('Current form');
    if (currentProfile.goal?.race === race.id && currentProfile.goal.node === id) statuses.push('Tracked goal');
    return statuses;
  }

  function updateGraph() {
    for (const [id, control] of controls) {
      control.setAttribute('aria-pressed', String(selectedId === id));
      control.querySelector('.evolution-node-status').textContent = formStatuses(id).join(' · ');
    }
    showRequirements.textContent = `View ${nodeById.get(selectedId).name} details ↓`;
    redrawGraph();
  }

  function selectNode(id, moveFocus = false) {
    selectedForms.set(race.id, id);
    selectedId = id;
    history.replaceState(history.state, '', `#evolution/${encodeURIComponent(`${race.id}:${id}`)}`);
    updateGraph();
    renderDetails();
    if (moveFocus) {
      controls.get(id).focus({ preventScroll: true });
      revealSelected();
      controls.get(id).scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  function revealSelected() {
    const visible = scroller.getBoundingClientRect();
    const control = controls.get(selectedId).getBoundingClientRect();
    if (control.right > visible.right) scroller.scrollLeft += control.right - visible.right + 16;
    if (control.left < visible.left) scroller.scrollLeft -= visible.left - control.left + 16;
  }

  function redrawGraph() {
    if (!board.isConnected) {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      return;
    }
    if (graph.dataset.view !== 'tree') return;
    scrollHint.hidden = scroller.scrollWidth <= scroller.clientWidth + 1;
    const tracked = currentProfile.goal?.race === race.id ? currentProfile.goal.node : '';
    drawGraph(canvas, board, routes, controls, depths, selectedId, tracked);
  }

  function setView(view, reveal = false) {
    graph.dataset.view = view;
    treeView.setAttribute('aria-pressed', String(view === 'tree'));
    listView.setAttribute('aria-pressed', String(view === 'list'));
    scroller.tabIndex = view === 'tree' ? 0 : -1;
    redrawGraph();
    if (reveal && view === 'tree') revealSelected();
  }

  const resizeObserver = new ResizeObserver(redrawGraph);
  const themeObserver = new MutationObserver(redrawGraph);
  resizeObserver.observe(board);
  resizeObserver.observe(scroller);
  for (const control of controls.values()) resizeObserver.observe(control);
  themeObserver.observe(document.documentElement, { attributeFilter: ['data-theme'] });
  setView(window.matchMedia('(max-width: 640px)').matches ? 'list' : 'tree');
  updateGraph();
  renderDetails();
  if (nodeById.has(nodeId) || savedGoal === selectedId) revealSelected();
}
