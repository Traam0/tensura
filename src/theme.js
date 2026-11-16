const root = document.documentElement;
const themeColor = document.querySelector('meta[name="theme-color"]');
const isNightfall = () => root.dataset.theme === 'nightfall';
const nextTheme = () => isNightfall()
  ? { name: 'Daybreak', icon: 'light_mode' }
  : { name: 'Nightfall', icon: 'dark_mode' };

export function renderThemeToggle() {
  const next = nextTheme();
  return `<button class="theme-toggle" type="button" aria-label="Switch to ${next.name} theme" title="Switch to ${next.name}">
    <span class="material-symbols-outlined" aria-hidden="true">${next.icon}</span>
    <span class="theme-toggle-label">${next.name}</span>
  </button>`;
}

export function bindThemeToggle(topbar) {
  const toggle = topbar.querySelector('.theme-toggle');
  const icon = toggle.querySelector('.material-symbols-outlined');
  const label = toggle.querySelector('.theme-toggle-label');
  toggle.addEventListener('click', () => {
    const nightfall = !isNightfall();
    const theme = nightfall ? 'nightfall' : 'daybreak';
    root.dataset.theme = theme;
    const next = nextTheme();
    toggle.setAttribute('aria-label', `Switch to ${next.name} theme`);
    toggle.title = `Switch to ${next.name}`;
    icon.textContent = next.icon;
    label.textContent = next.name;
    themeColor.content = nightfall ? '#101323' : '#f5f2fb';

    try {
      localStorage.setItem('tensura-theme', theme);
    } catch {
      // The current page can still switch themes if browser storage is unavailable.
    }
  });
}
