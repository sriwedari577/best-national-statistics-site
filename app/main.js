// Router and controls: hash routes, working search, toggles, filters,
// province comparison, and a light/dark theme switch. No network use.
import { PROVINCES } from './data.js';
import { viewOverview, viewDemographics, viewEconomy, viewHealth, viewEducation, viewEmployment, viewRegions, viewTrends, viewSources, viewSearch } from './views.js';

const app = document.getElementById('app');
const state = {
  ageMode: 'share',
  regionFilter: 'All',
  regionSort: 'population',
  trendMetric: 'growth',
  trendRange: 'all',
  compareA: 'West Java',
  compareB: 'Jakarta',
};

const ROUTES = {
  '': viewOverview,
  '/': viewOverview,
  '/demographics': () => viewDemographics(state.ageMode),
  '/economy': viewEconomy,
  '/health': viewHealth,
  '/education': viewEducation,
  '/employment': viewEmployment,
  '/regions': () => viewRegions(state.regionFilter, state.regionSort),
  '/trends': () => viewTrends(state.trendMetric, state.trendRange),
  '/sources': viewSources,
};

function renderCompare() {
  const box = document.getElementById('compare-result');
  if (!box) return;
  const a = PROVINCES.find((p) => p.name === state.compareA);
  const b = PROVINCES.find((p) => p.name === state.compareB);
  if (!a || !b) { box.innerHTML = '<p>Pick two provinces to compare.</p>'; return; }
  const ratio = (a.population / b.population).toFixed(1);
  const denser = a.density >= b.density ? a : b;
  box.innerHTML = `<div class="table-wrap"><table class="data-table"><thead><tr><th></th><th>${a.name}</th><th>${b.name}</th></tr></thead><tbody>
    <tr><td>Population</td><td>${a.population.toFixed(2)}m</td><td>${b.population.toFixed(2)}m</td></tr>
    <tr><td>Capital</td><td>${a.capital}</td><td>${b.capital}</td></tr>
    <tr><td>Island</td><td>${a.island}</td><td>${b.island}</td></tr>
    <tr><td>Density</td><td>${a.density.toLocaleString('en-US')}/km²</td><td>${b.density.toLocaleString('en-US')}/km²</td></tr></tbody></table></div>
    <p>${a.name} has <strong>${ratio}×</strong> the population of ${b.name}. ${denser.name} is the denser of the two.</p>`;
}

function render() {
  const hash = window.location.hash.replace(/^#/, '');
  const [path, queryString] = hash.split('?');
  const params = new URLSearchParams(queryString || '');
  let html;
  if (path === '/search') {
    html = viewSearch(params.get('q') || '');
  } else {
    const fn = ROUTES[path] || viewOverview;
    html = fn();
  }
  app.innerHTML = html;
  document.querySelectorAll('.nav-link').forEach((link) => {
    const target = link.getAttribute('href').replace(/^#/, '');
    link.setAttribute('aria-current', target === path || (target === '#/' && (path === '' || path === '/')) ? 'page' : 'false');
  });
  const searchInput = document.getElementById('site-search');
  if (searchInput && path === '/search') searchInput.value = params.get('q') || '';
  renderCompare();
  window.scrollTo(0, 0);
}

document.addEventListener('click', (event) => {
  const ageBtn = event.target.closest('[data-age-mode]');
  if (ageBtn) { state.ageMode = ageBtn.dataset.ageMode; render(); return; }
  const sortBtn = event.target.closest('[data-region-sort]');
  if (sortBtn) { state.regionSort = sortBtn.dataset.regionSort; render(); return; }
  const metricBtn = event.target.closest('[data-trend-metric]');
  if (metricBtn) { state.trendMetric = metricBtn.dataset.trendMetric; render(); return; }
  const rangeBtn = event.target.closest('[data-trend-range]');
  if (rangeBtn) { state.trendRange = rangeBtn.dataset.trendRange; render(); return; }
  if (event.target.id === 'theme-toggle') {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    event.target.textContent = next === 'dark' ? 'Light mode' : 'Dark mode';
    event.target.setAttribute('aria-pressed', String(next === 'dark'));
  }
});

document.addEventListener('change', (event) => {
  const filter = event.target.closest('[data-region-filter]');
  if (filter) { state.regionFilter = filter.value; render(); return; }
  const compare = event.target.closest('[data-compare]');
  if (compare) {
    if (compare.id === 'compare-a') state.compareA = compare.value;
    if (compare.id === 'compare-b') state.compareB = compare.value;
    renderCompare();
  }
});

document.addEventListener('submit', (event) => {
  if (event.target.id === 'search-form') {
    event.preventDefault();
    const q = document.getElementById('site-search').value.trim();
    window.location.hash = '#/search?q=' + encodeURIComponent(q);
  }
});

window.addEventListener('hashchange', render);
render();
