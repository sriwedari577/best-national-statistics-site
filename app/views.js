// One render function per section. Every figure names its source and year
// in the text next to it; nothing here is placeholder text.
import { HEADLINE, TRENDS, DEMOGRAPHICS, ECONOMY, HEALTH, EDUCATION, EMPLOYMENT, PROVINCES, POVERTY, SOURCES, INDICATORS } from './data.js';
import { verticalBarChart, lineChart, horizontalBarChart, donutChart, CHART_COLORS, TEAL } from './charts.js';

function sourceNote(text) {
  return `<p class="source-note">Source: ${text}</p>`;
}

function kpiCards() {
  return `<div class="kpi-grid">${HEADLINE.map((h) => `<article class="kpi"><p class="kpi-label">${h.label}</p><p class="kpi-value">${h.value}</p><p class="kpi-note">${h.note}</p><p class="kpi-src">${h.source}</p></article>`).join('')}</div>`;
}

export function viewOverview() {
  const years = TRENDS.years.map(String);
  return `<section>
  <p class="eyebrow">Indonesia · National statistics · Figures checked November 2026</p>
  <h1>Indonesia in numbers</h1>
  <p class="lede">One country, 283.5 million people, 38 provinces and more than 17,000 islands. Every figure below is real, dated and sourced — from Statistics Indonesia (BPS), the United Nations and the World Bank.</p>
  ${kpiCards()}
  <div class="two-col">
    <article class="card"><h2>Growth held near 5% — except 2020</h2>
      ${verticalBarChart('Real GDP growth 2019 to 2024', years, TRENDS.gdpGrowth, '%', TEAL)}
      ${sourceNote('BPS / World Bank, real GDP growth 2019–2024. 2020 was the pandemic contraction.')}
      <p><a href="#/trends">See all annual trends →</a></p></article>
    <article class="card"><h2>Where people live</h2>
      ${horizontalBarChart('Population by island group, mid-2024', DEMOGRAPHICS.islands.map((d) => ({ label: d.island, value: d.population })), 'm', TEAL)}
      ${sourceNote('BPS province estimates, mid-2024; rest-of-Indonesia is the residual after Java and Sumatra.')}
      <p><a href="#/regions">All 10 largest provinces →</a></p></article>
  </div>
  <article class="card"><h2>Poverty fell to its lowest recorded level</h2>
    <p class="big-stat">8.57% <span>poor in September 2024 — 24.06 million people, down from 9.03% in March 2024. Urban poverty was 6.66%; rural poverty 11.34%. The poverty line was Rp595,242 per person per month.</span></p>
    ${sourceNote('BPS, Poverty Profile from Susenas, January 2025. The Gini ratio was 0.381 in September 2024.')}
    <p><a href="#/economy">Economy, poverty and inequality →</a></p></article>
  <nav class="section-links" aria-label="All sections">
    <a href="#/demographics">Demographics</a><a href="#/economy">Economy</a><a href="#/health">Health</a><a href="#/education">Education</a><a href="#/employment">Employment</a><a href="#/regions">Regions</a><a href="#/trends">Trends</a><a href="#/sources">Sources &amp; methods</a>
  </nav>
  </section>`;
}

export function viewDemographics(mode) {
  const rows = DEMOGRAPHICS.ageGroups.map((d) => ({ label: d.group, value: mode === 'count' ? d.millions : d.share }));
  const unit = mode === 'count' ? 'm' : '%';
  const title = mode === 'count' ? 'Age groups, millions of people, 2024' : 'Age groups, share of population, 2024';
  return `<section>
  <p class="eyebrow">Section · Demographics</p>
  <h1>Who lives in Indonesia</h1>
  <p class="lede">A young, fast-urbanising population: median age 30.1 in 2024, 59.0% urban, and growth of 0.82% a year.</p>
  <div class="controls" role="group" aria-label="Age chart display">
    <span class="control-label">Show:</span>
    <button type="button" class="pill ${mode === 'share' ? 'active' : ''}" data-age-mode="share">Share (%)</button>
    <button type="button" class="pill ${mode === 'count' ? 'active' : ''}" data-age-mode="count">Millions of people</button>
  </div>
  <div class="two-col">
    <article class="card"><h2>Age structure, 2024</h2>
      ${horizontalBarChart(title, rows, unit, TEAL)}
      ${sourceNote('UN World Population Prospects 2024. Shares: 0–14 24.6%, 15–64 68.1%, 65+ 7.3%.')}
    </article>
    <article class="card"><h2>Women and men, 2024</h2>
      ${donutChart('Population by sex, 2024', DEMOGRAPHICS.sexSplit.map((s) => ({ label: s.group, value: s.share })), CHART_COLORS)}
      ${sourceNote('UN World Population Prospects 2024: 140.6m women, 142.9m men (shares of the 283.5m total).')}
    </article>
  </div>
  <div class="table-wrap"><table class="data-table"><caption>Key demographic indicators</caption>
    <thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead><tbody>
    <tr><td>Population</td><td>283,487,931</td><td>2024</td><td>UN WPP 2024</td></tr>
    <tr><td>Population, 2020 Census</td><td>270,203,917</td><td>2020</td><td>BPS Census</td></tr>
    <tr><td>Median age</td><td>30.1 years</td><td>2024</td><td>UN WPP 2024</td></tr>
    <tr><td>Total fertility rate</td><td>2.12 children per woman</td><td>2024</td><td>UN WPP 2024</td></tr>
    <tr><td>Annual population growth</td><td>0.82%</td><td>2024</td><td>UN WPP 2024</td></tr>
    <tr><td>Population density</td><td>156 people per km²</td><td>2024</td><td>UN WPP 2024</td></tr>
    <tr><td>Urban population</td><td>59.0% — 167.2 million</td><td>2024</td><td>UN WPP 2024</td></tr>
    <tr><td>Provinces</td><td>38</td><td>2024</td><td>BPS</td></tr>
    </tbody></table></div>
  </section>`;
}

export function viewEconomy() {
  return `<section>
  <p class="eyebrow">Section · Economy</p>
  <h1>An economy of Rp22,139 trillion</h1>
  <p class="lede">Southeast Asia's largest economy grew 5.03% in real terms in 2024. GDP per person reached Rp78.62 million.</p>
  <div class="kpi-grid">
    <article class="kpi"><p class="kpi-label">GDP, nominal</p><p class="kpi-value">Rp22,139tn</p><p class="kpi-note">US$1,396bn · 2024</p><p class="kpi-src">BPS / World Bank</p></article>
    <article class="kpi"><p class="kpi-label">GDP per person</p><p class="kpi-value">Rp78.62m</p><p class="kpi-note">US$4,960 · 2024</p><p class="kpi-src">BPS, Feb 2025</p></article>
    <article class="kpi"><p class="kpi-label">GDP, PPP</p><p class="kpi-value">US$4,677bn</p><p class="kpi-note">2024</p><p class="kpi-src">World Bank WDI</p></article>
    <article class="kpi"><p class="kpi-label">Inflation, Dec yoy</p><p class="kpi-value">1.57%</p><p class="kpi-note">CPI 106.80 · Dec 2024</p><p class="kpi-src">BPS, Jan 2025</p></article>
  </div>
  <div class="two-col">
    <article class="card"><h2>GDP by sector, 2024 estimate</h2>
      ${donutChart('GDP by sector of origin, 2024 estimate', ECONOMY.gdpBySector.map((s) => ({ label: s.sector, value: s.share })), CHART_COLORS)}
      ${sourceNote('CIA World Factbook 2024 estimates, sector shares of GDP. The 4.3% unallocated slice is shown separately, so the chart totals 100%.')}
    </article>
    <article class="card"><h2>GDP per person, Rp million</h2>
      ${lineChart('GDP per person 2023 to 2024', ['2023', '2024'], [74.96, 78.62], '', TEAL)}
      ${sourceNote('BPS: Rp75.0m (US$4,919.7) in 2023; Rp78.62m (US$4,960.33) in 2024.')}
    </article>
  </div>
  <article class="card"><h2>Poverty and inequality</h2>
    <p class="big-stat">${POVERTY.national}% <span>poor in September 2024 — ${POVERTY.urban}% urban, ${POVERTY.rural}% rural. The poverty line was Rp${POVERTY.line.toLocaleString('en-US')} per person per month.</span></p>
    <p>Gini ratio: <strong>${POVERTY.giniSep}</strong> in September 2024 (0.379 in March 2024).</p>
    ${sourceNote('BPS, Poverty Profile from Susenas, January 2025.')}
  </article>
  </section>`;
}

export function viewHealth() {
  return `<section>
  <p class="eyebrow">Section · Health</p>
  <h1>Health: living longer, fewer child deaths</h1>
  <p class="lede">Life expectancy reached 71.3 years in 2024 on the World Bank measure; infant and under-5 mortality kept falling.</p>
  <div class="kpi-grid">${HEALTH.map((h) => `<article class="kpi"><p class="kpi-label">${h.label}</p><p class="kpi-value">${h.value}</p><p class="kpi-note">${h.detail}</p><p class="kpi-src">${h.source}</p></article>`).join('')}</div>
  <article class="card"><h2>Reading the two life-expectancy figures</h2>
  <p>BPS, using its own method for the Human Development Index, puts life expectancy at birth at <strong>74.15 years in 2024</strong>. The World Bank's internationally comparable series puts it at <strong>71.3 years</strong> (women 73.4, men 69.2). Both are shown, labelled, so the difference is visible rather than hidden. Health spending was 2.7% of GDP in 2023.</p>
  ${sourceNote('BPS HDI release, November 2024; World Bank World Development Indicators, 2023–2024.')}
  </article>
  </section>`;
}

export function viewEducation() {
  return `<section>
  <p class="eyebrow">Section · Education</p>
  <h1>Schooling: 8.85 years on average, 13.21 expected</h1>
  <p class="lede">Almost every primary-age child is enrolled on time, but average schooling for adults is still below nine years — and the gap between provinces is wide.</p>
  <div class="kpi-grid">${EDUCATION.map((e) => `<article class="kpi"><p class="kpi-label">${e.label}</p><p class="kpi-value">${e.value}</p><p class="kpi-note">${e.detail}</p><p class="kpi-src">${e.source}</p></article>`).join('')}</div>
  <article class="card"><h2>Schooling is improving, slowly</h2>
    ${lineChart('Mean and expected years of schooling, 2020 to 2024', ['2020', '2021', '2022', '2023', '2024'], [8.48, 8.54, 8.69, 8.77, 8.85], ' yrs', TEAL)}
    ${sourceNote('BPS HDI release, November 2024: mean years of schooling (age 25+) 2020–2024. Expected years rose from 12.98 (2020) to 13.21 (2024).')}
    <p>Mean schooling in Jakarta was 11.31 years in 2024, while some provinces remained below 7.5 years — a gap of nearly four school years within one country.</p>
  </article>
  </section>`;
}

export function viewEmployment() {
  return `<section>
  <p class="eyebrow">Section · Employment</p>
  <h1>Work: 144.64 million employed</h1>
  <p class="lede">The labour force was 152.11 million in August 2024. Agriculture still employs more people than any other industry; most workers are informal.</p>
  <div class="kpi-grid">
    <article class="kpi"><p class="kpi-label">Labour force</p><p class="kpi-value">152.11m</p><p class="kpi-note">Aug 2024</p><p class="kpi-src">BPS Sakernas</p></article>
    <article class="kpi"><p class="kpi-label">Employed</p><p class="kpi-value">144.64m</p><p class="kpi-note">+4.79m on Aug 2023</p><p class="kpi-src">BPS Sakernas</p></article>
    <article class="kpi"><p class="kpi-label">Unemployed</p><p class="kpi-value">7.47m</p><p class="kpi-note">4.91% · Aug 2024</p><p class="kpi-src">BPS Sakernas</p></article>
    <article class="kpi"><p class="kpi-label">Average wage</p><p class="kpi-value">Rp3.27m</p><p class="kpi-note">Per month, employees</p><p class="kpi-src">BPS Sakernas</p></article>
  </div>
  <div class="two-col">
    <article class="card"><h2>Employment by industry, Aug 2024</h2>
      ${horizontalBarChart('Employment by industry, August 2024', EMPLOYMENT.sectors.map((s) => ({ label: s.sector, value: s.share })), '%', TEAL)}
      ${sourceNote('BPS, Labour Situation (Sakernas), November 2024. Agriculture added the most workers (+1.31m).')}
    </article>
    <article class="card"><h2>Formal vs informal</h2>
      ${donutChart('Formal and informal employment, August 2024', [{ label: 'Formal', value: EMPLOYMENT.formalShare }, { label: 'Informal', value: EMPLOYMENT.informalShare }], CHART_COLORS)}
      <p>60.81 million people (42.05%) worked formally; 83.83 million (57.95%) informally. Employees were 38.80% of all workers.</p>
      ${sourceNote('BPS, Labour Situation (Sakernas), November 2024.')}
    </article>
  </div>
  </section>`;
}

export function viewRegions(filter, sortKey) {
  let rows = [...PROVINCES];
  if (filter && filter !== 'All') rows = rows.filter((p) => p.island === filter);
  if (sortKey === 'density') rows.sort((a, b) => b.density - a.density);
  else if (sortKey === 'name') rows.sort((a, b) => a.name.localeCompare(b.name));
  else rows.sort((a, b) => b.population - a.population);
  const tableRows = rows.map((p) => `<tr><td>${p.name}</td><td>${p.capital}</td><td>${p.island}</td><td>${p.population.toFixed(2)}m</td><td>${p.density.toLocaleString('en-US')}</td></tr>`).join('');
  return `<section>
  <p class="eyebrow">Section · Regions</p>
  <h1>Provinces: Java holds more than half the country</h1>
  <p class="lede">The 10 largest provinces hold about 203 million people. West Java alone (50.35m) is larger than most countries. Java's total was 156.93 million in mid-2024.</p>
  <div class="controls">
    <label class="control-label" for="island-filter">Island group:</label>
    <select id="island-filter" data-region-filter>
      <option ${filter === 'All' ? 'selected' : ''}>All</option>
      <option ${filter === 'Java' ? 'selected' : ''}>Java</option>
      <option ${filter === 'Sumatra' ? 'selected' : ''}>Sumatra</option>
      <option ${filter === 'Sulawesi' ? 'selected' : ''}>Sulawesi</option>
    </select>
    <span class="control-label">Sort by:</span>
    <button type="button" class="pill ${sortKey === 'population' ? 'active' : ''}" data-region-sort="population">Population</button>
    <button type="button" class="pill ${sortKey === 'density' ? 'active' : ''}" data-region-sort="density">Density</button>
    <button type="button" class="pill ${sortKey === 'name' ? 'active' : ''}" data-region-sort="name">Name</button>
  </div>
  <div class="two-col">
    <article class="card"><h2>Largest provinces, mid-2024</h2>
      ${horizontalBarChart('Population of the largest provinces, mid-2024', rows.map((p) => ({ label: p.name, value: p.population })), 'm', TEAL)}
      ${sourceNote('BPS province estimates, mid-2024.')}
    </article>
    <article class="card"><h2>Compare two provinces</h2>
      <div class="compare-controls">
        <label>First <select id="compare-a" data-compare>${PROVINCES.map((p) => `<option ${p.name === 'West Java' ? 'selected' : ''}>${p.name}</option>`).join('')}</select></label>
        <label>Second <select id="compare-b" data-compare>${PROVINCES.map((p) => `<option ${p.name === 'Jakarta' ? 'selected' : ''}>${p.name}</option>`).join('')}</select></label>
      </div>
      <div id="compare-result"></div>
      <p class="source-note">Population and density, BPS mid-2024 estimates. Jakarta's density (16,165/km²) dwarfs every other province.</p>
    </article>
  </div>
  <div class="table-wrap"><table class="data-table"><caption>10 largest provinces — population and density, mid-2024 (BPS estimates)</caption>
    <thead><tr><th>Province</th><th>Capital</th><th>Island</th><th>Population</th><th>Density /km²</th></tr></thead>
    <tbody>${tableRows || '<tr><td colspan="5">No provinces match this filter.</td></tr>'}</tbody></table></div>
  </section>`;
}

export function viewTrends(metric, range) {
  const allYears = TRENDS.years;
  const idx = range === 'recent' ? [2, 3, 4, 5] : range === 'early' ? [0, 1, 2, 3] : [0, 1, 2, 3, 4, 5];
  const years = idx.map((i) => String(allYears[i]));
  const series = {
    growth: { label: 'Real GDP growth (%)', values: idx.map((i) => TRENDS.gdpGrowth[i]), source: 'BPS / World Bank, 2019–2024.' },
    inflation: { label: 'Inflation, December year-on-year (%)', values: idx.map((i) => TRENDS.inflationDec[i]), source: 'BPS CPI releases. No December figure shown for 2019–2020: not verified for this series.' },
    poverty: { label: 'Poverty rate, March (%)', values: idx.map((i) => TRENDS.povertyMar[i]), source: 'BPS Susenas. September 2024: 8.57% — the lowest on record.' },
    unemployment: { label: 'Unemployment, August (%)', values: idx.map((i) => TRENDS.unemploymentAug[i]), source: 'BPS Sakernas. No August figure shown for 2019–2020: not verified for this series.' },
    population: { label: 'Population (millions)', values: idx.map((i) => TRENDS.population[i]), source: 'UN World Population Prospects 2024.' },
  };
  const s = series[metric] || series.growth;
  const btn = (key, label) => `<button type="button" class="pill ${metric === key ? 'active' : ''}" data-trend-metric="${key}">${label}</button>`;
  const rangeBtn = (key, label) => `<button type="button" class="pill ${range === key ? 'active' : ''}" data-trend-range="${key}">${label}</button>`;
  return `<section>
  <p class="eyebrow">Section · Annual trends</p>
  <h1>Six years, five stories</h1>
  <p class="lede">Pick an indicator and a period. Every point is a published figure; gaps mean the figure was not verified for that year, not zero.</p>
  <div class="controls" role="group" aria-label="Indicator">
    <span class="control-label">Indicator:</span>
    ${btn('growth', 'GDP growth')}${btn('inflation', 'Inflation')}${btn('poverty', 'Poverty')}${btn('unemployment', 'Unemployment')}${btn('population', 'Population')}
  </div>
  <div class="controls" role="group" aria-label="Period">
    <span class="control-label">Period:</span>
    ${rangeBtn('all', '2019–2024')}${rangeBtn('recent', '2021–2024')}${rangeBtn('early', '2019–2022')}
  </div>
  <article class="card"><h2>${s.label}</h2>
    ${lineChart(s.label, years, s.values, '', TEAL)}
    ${sourceNote(s.source)}
  </article>
  <div class="table-wrap"><table class="data-table"><caption>All five series together</caption>
    <thead><tr><th>Year</th><th>GDP growth %</th><th>Inflation (Dec) %</th><th>Poverty (Mar) %</th><th>Unemployment (Aug) %</th><th>Population (m)</th></tr></thead>
    <tbody>${TRENDS.years.map((y, i) => `<tr><td>${y}</td><td>${TRENDS.gdpGrowth[i]}</td><td>${TRENDS.inflationDec[i] ?? '—'}</td><td>${TRENDS.povertyMar[i]}</td><td>${TRENDS.unemploymentAug[i] ?? '—'}</td><td>${TRENDS.population[i]}</td></tr>`).join('')}</tbody></table></div>
  <p class="source-note">Sources: BPS (GDP, CPI, Susenas poverty, Sakernas unemployment), UN WPP 2024 (population), World Bank WDI. “—” means not shown: the figure was not verified for that year in that series.</p>
  </section>`;
}

export function viewSources() {
  return `<section>
  <p class="eyebrow">Section · Sources &amp; methods</p>
  <h1>Where every number comes from</h1>
  <p class="lede">No figure on this site is estimated by its author. Each one is published by the body named beside it. Where two reputable sources differ — life expectancy is the example — both are shown and labelled.</p>
  <div class="table-wrap"><table class="data-table"><caption>Sources used</caption>
  <thead><tr><th>Publisher</th><th>Publication / series</th><th>Used for</th></tr></thead><tbody>
  <tr><td>BPS — Statistics Indonesia</td><td>Population Census 2020</td><td>2020 population: 270,203,917</td></tr>
  <tr><td>BPS</td><td>Economic Growth release, 5 Feb 2025</td><td>GDP Rp22,138.96tn, GDP per person Rp78.62m, growth 5.03% (2024); 2023 comparatives</td></tr>
  <tr><td>BPS</td><td>Consumer Price Index release, 2 Jan 2025</td><td>Inflation 1.57% yoy, Dec 2024; 2.61% Dec 2023; 5.51% Dec 2022</td></tr>
  <tr><td>BPS</td><td>Labour Situation (Sakernas), 5 Nov 2024</td><td>Labour force, employment, unemployment 4.91%, wage Rp3.27m, sector shares, formal share</td></tr>
  <tr><td>BPS</td><td>Poverty Profile (Susenas), 15 Jan 2025</td><td>Poverty 8.57% Sep 2024, 24.06m people, poverty line, urban/rural split, Gini 0.381, poverty trend</td></tr>
  <tr><td>BPS</td><td>Human Development Index release, 15 Nov 2024</td><td>HDI 75.02, schooling 8.85 / 13.21 years, life expectancy 74.15 (HDI method)</td></tr>
  <tr><td>BPS</td><td>Province estimates, mid-2024</td><td>Province populations and densities; Java 156.93m, Sumatra 61.52m</td></tr>
  <tr><td>United Nations</td><td>World Population Prospects 2024</td><td>Population 283.49m, age shares, median age, fertility, urban share, density, population trend</td></tr>
  <tr><td>World Bank</td><td>World Development Indicators, 2024</td><td>GDP US$1,396bn, GDP PPP US$4,677bn, life expectancy 71.3, infant/under-5 mortality, maternal mortality, health spending</td></tr>
  <tr><td>CIA</td><td>World Factbook, 2024 estimates</td><td>GDP shares by sector of origin only, labelled as estimates</td></tr>
  </tbody></table></div>
  <article class="card"><h2>Methods &amp; limits</h2>
  <ul>
    <li>All figures are shown exactly as published, with the year and publisher beside them. Nothing is forecast by this site.</li>
    <li>Charts are drawn in the browser from the data files in this site; no data is fetched from the network at any point.</li>
    <li>Province populations are BPS mid-2024 estimates; the 2020 Census counted 270.2 million people, and later totals are estimates and projections, which is why totals differ slightly between sources.</li>
    <li>“Rest of Indonesia” in the island chart is the residual after Java and Sumatra, so the three bars sum to the national total.</li>
  </ul></article>
  </section>`;
}

export function viewSearch(query) {
  const q = query.trim().toLowerCase();
  const hits = q ? INDICATORS.filter((d) => (d.label + ' ' + d.value + ' ' + d.section + ' ' + d.source).toLowerCase().includes(q)) : [];
  return `<section>
  <p class="eyebrow">Search</p>
  <h1>${q ? `Results for “${query.trim()}”` : 'Search the indicators'}</h1>
  <p class="lede">Search every published figure on this site — by name, value, section or source.</p>
  ${q ? (hits.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>Indicator</th><th>Value</th><th>Section</th><th>Source</th></tr></thead><tbody>${hits.map((h) => `<tr><td>${h.label}</td><td>${h.value}</td><td>${h.section}</td><td>${h.source}</td></tr>`).join('')}</tbody></table></div>` : '<p class="empty">No indicator matches that search. Try “poverty”, “GDP”, “schooling” or “Java”.</p>') : '<p class="empty">Type in the search box above and press Enter.</p>'}
  </section>`;
}

export { SOURCES };
