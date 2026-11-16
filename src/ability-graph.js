function el(tag, className, content) {
  const node = document.createElement(tag);
  node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

export function getAbilityPath(availableRoutes, focusId) {
  const ids = new Set([focusId]);
  const routes = new Set();
  function visitPrerequisites(id) {
    for (const route of availableRoutes) {
      if (route.to !== id || routes.has(route)) continue;
      routes.add(route);
      for (const sourceId of route.from) {
        ids.add(sourceId);
        visitPrerequisites(sourceId);
      }
    }
  }

  visitPrerequisites(focusId);
  const visited = new Set();
  function visitResults(id) {
    if (visited.has(id)) return;
    visited.add(id);
    for (const route of availableRoutes) {
      if (!route.from.includes(id)) continue;
      routes.add(route);
      ids.add(route.to);
      for (const sourceId of route.from) ids.add(sourceId);
      visitResults(route.to);
    }
  }
  visitResults(focusId);
  return { ids, routes: [...routes] };
}

export function routeRule(route, entryLabel = 'skill') {
  if (route.from.length === 1) return `1 ${entryLabel}`;
  if (route.match === 'any') return `Any ${route.requiredCount ?? 1}`;
  return `All ${route.from.length}`;
}

export function makeAbilityGraph(path, activeId, makeNode) {
  const board = el('div', 'skill-path-board');
  const namespace = 'http://www.w3.org/2000/svg';
  const lines = document.createElementNS(namespace, 'svg');
  lines.classList.add('skill-path-lines');
  lines.setAttribute('aria-hidden', 'true');
  board.append(lines);

  const depths = new Map();
  function depth(id) {
    if (depths.has(id)) return depths.get(id);
    const upstream = path.routes.filter(route => route.to === id).flatMap(route => route.from);
    const level = upstream.length ? Math.max(...upstream.map(depth)) + 1 : 0;
    depths.set(id, level);
    return level;
  }

  const lastColumn = Math.max(...Array.from(path.ids, depth)) * 2;
  const columns = Array.from({ length: lastColumn + 1 }, (_, index) => {
    const column = el('div', 'skill-path-column');
    column.dataset.kind = index % 2 ? 'route' : 'node';
    return column;
  });
  board.style.gridTemplateColumns = columns.map((_, index) => index % 2 ? '4.6rem' : '10rem').join(' ');
  board.append(...columns);

  const controls = new Map();
  for (const id of path.ids) {
    const control = makeNode(id);
    control.classList.add('skill-path-node');
    if (id === activeId) control.setAttribute('aria-current', 'true');
    controls.set(id, control);
    columns[depth(id) * 2].append(control);
  }

  const edges = [];
  for (const route of path.routes) {
    const related = route.to === activeId || route.from.includes(activeId);
    const junction = el('span', 'skill-path-junction', route.from.length > 1 ? routeRule(route) : '');
    junction.dataset.related = String(related);
    if (route.from.length === 1) {
      const arrow = el('span', 'material-symbols-outlined', 'arrow_forward');
      junction.append(arrow);
    }
    junction.setAttribute('aria-hidden', 'true');
    columns[depth(route.to) * 2 - 1].append(junction);
    for (const id of route.from) edges.push([controls.get(id), junction, related, false]);
    edges.push([junction, controls.get(route.to), related, true]);
  }

  function drawEdges() {
    const bounds = board.getBoundingClientRect();
    const paths = edges.map(([origin, target, related, arrow]) => {
      const from = origin.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const x1 = from.right - bounds.left;
      const y1 = from.top + from.height / 2 - bounds.top;
      const x2 = to.left - bounds.left - (arrow ? 3 : 0);
      const y2 = to.top + to.height / 2 - bounds.top;
      const curve = Math.max(0, (x2 - x1) * .5);
      const path = document.createElementNS(namespace, 'path');
      const head = arrow ? ` M${x2 - 4} ${y2 - 3} L${x2} ${y2} L${x2 - 4} ${y2 + 3}` : '';
      path.setAttribute('d', `M${x1} ${y1} C${x1 + curve} ${y1} ${x2 - curve} ${y2} ${x2} ${y2}${head}`);
      path.dataset.related = String(related);
      return path;
    });
    lines.replaceChildren(...paths);
  }

  const size = new ResizeObserver(() => {
    if (board.isConnected) drawEdges();
    else size.disconnect();
  });
  size.observe(board);
  for (const control of controls.values()) size.observe(control);
  return { board, controls };
}
