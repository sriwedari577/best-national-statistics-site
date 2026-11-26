// Indonesia in Numbers — every figure carries its source and year.
// Sources are named in full on each view and in the Sources section.
// Figures were checked against BPS (Statistics Indonesia), the UN World
// Population Prospects 2024 revision, and the World Bank WDI in Nov 2026.

export const SOURCES = {
  bpsPop: 'BPS, Population Census 2020',
  unPop: 'UN World Population Prospects 2024',
  bpsGdp: 'BPS, Economic Growth release, Feb 2025',
  wbGdp: 'World Bank, World Development Indicators 2024',
  bpsCpi: 'BPS, Consumer Price Index release, Jan 2025',
  bpsLab: 'BPS, Labour Situation (Sakernas), Nov 2024',
  bpsPov: 'BPS, Poverty Profile (Susenas), Jan 2025',
  bpsHdi: 'BPS, Human Development Index release, Nov 2024',
  wbHealth: 'World Bank, World Development Indicators 2024',
  bpsProv: 'BPS province estimates, mid-2024',
  bpsGini: 'BPS, Poverty Profile (Susenas), Jan 2025',
};

export const HEADLINE = [
  { label: 'Population', value: '283.5m', note: '2024 · 4th largest in the world', source: 'UN WPP 2024' },
  { label: 'GDP (nominal)', value: 'Rp22,139tn', note: 'US$1,396bn · 2024', source: 'BPS / World Bank' },
  { label: 'GDP per person', value: 'Rp78.62m', note: 'US$4,960 · 2024', source: 'BPS, Feb 2025' },
  { label: 'Economic growth', value: '5.03%', note: 'Real GDP growth · 2024', source: 'BPS, Feb 2025' },
  { label: 'Inflation (Dec, yoy)', value: '1.57%', note: 'CPI 106.80 · Dec 2024', source: 'BPS, Jan 2025' },
  { label: 'Unemployment', value: '4.91%', note: 'Aug 2024 · 7.47m people', source: 'BPS Sakernas' },
  { label: 'Poverty rate', value: '8.57%', note: 'Sep 2024 · 24.06m people', source: 'BPS Susenas' },
  { label: 'Human Development Index', value: '75.02', note: '2024 · up from 74.39 in 2023', source: 'BPS, Nov 2024' },
];

export const TRENDS = {
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  gdpGrowth: [5.02, -2.07, 3.70, 5.31, 5.05, 5.03],
  inflationDec: [null, null, 1.87, 5.51, 2.61, 1.57],
  povertyMar: [9.41, 9.78, 10.14, 9.54, 9.36, 9.03],
  povertySep2024: 8.57,
  unemploymentAug: [null, null, 6.49, 5.86, 5.32, 4.91],
  population: [272.49, 274.81, 276.76, 278.83, 281.19, 283.49],
  hdi: [null, null, null, null, 74.39, 75.02],
};

export const DEMOGRAPHICS = {
  ageGroups: [
    { group: '0–14 years', share: 24.6, millions: 69.7 },
    { group: '15–64 years', share: 68.1, millions: 193.1 },
    { group: '65+ years', share: 7.3, millions: 20.7 },
  ],
  medianAge: 30.1,
  fertility: 2.12,
  growthRate: 0.82,
  density: 156,
  urbanShare: 59.0,
  urbanPop: 167.2,
  sexSplit: [
    { group: 'Female', share: 49.6, millions: 140.6 },
    { group: 'Male', share: 50.4, millions: 142.9 },
  ],
  islands: [
    { island: 'Java', population: 156.93, share: 55.4 },
    { island: 'Sumatra', population: 61.52, share: 21.7 },
    { island: 'Rest of Indonesia (residual)', population: 65.04, share: 22.9 },
  ],
};

export const ECONOMY = {
  gdpBySector: [
    { sector: 'Services', share: 43.8 },
    { sector: 'Industry', share: 39.3 },
    { sector: 'Agriculture', share: 12.6 },
    { sector: 'Other / unallocated', share: 4.3 },
  ],
  gdpPerCapitaRp: [null, null, null, null, 74.96, 78.62],
  exportsNote: 'GDP in purchasing-power-parity terms was US$4,677bn in 2024 (World Bank WDI).',
};

export const HEALTH = [
  { label: 'Life expectancy at birth', value: '71.3 years', detail: 'Women 73.4 · Men 69.2', source: 'World Bank WDI, 2024' },
  { label: 'Life expectancy (BPS HDI measure)', value: '74.15 years', detail: 'HDI component, BPS method', source: 'BPS HDI release, 2024' },
  { label: 'Infant mortality', value: '15.2', detail: 'Deaths per 1,000 live births', source: 'World Bank WDI, 2024' },
  { label: 'Under-5 mortality', value: '17.7', detail: 'Deaths per 1,000 live births', source: 'World Bank WDI, 2024' },
  { label: 'Maternal mortality ratio', value: '140', detail: 'Deaths per 100,000 live births', source: 'World Bank WDI, 2023' },
  { label: 'Health spending', value: '2.7% of GDP', detail: 'Current health expenditure', source: 'World Bank WDI, 2023' },
];

export const EDUCATION = [
  { label: 'Mean years of schooling', value: '8.85 years', detail: 'Population aged 25+', source: 'BPS HDI release, 2024' },
  { label: 'Expected years of schooling', value: '13.21 years', detail: 'From age 7', source: 'BPS HDI release, 2024' },
  { label: 'Primary net enrolment', value: '97.89%', detail: 'Children aged 7–12, on time', source: 'BPS Susenas, 2024' },
  { label: 'Mean schooling, 2023', value: '8.77 years', detail: 'Up 0.08 years in one year', source: 'BPS HDI release, 2023' },
  { label: 'Expected schooling, 2023', value: '13.15 years', detail: 'Up 0.06 years in one year', source: 'BPS HDI release, 2023' },
  { label: 'Jakarta mean schooling', value: '11.31 years', detail: 'Highest province; some provinces below 7.5', source: 'BPS, 2024' },
];

export const EMPLOYMENT = {
  labourForce: 152.11,
  employed: 144.64,
  unemployed: 7.47,
  formalShare: 42.05,
  informalShare: 57.95,
  avgWage: 3.27,
  sectors: [
    { sector: 'Agriculture, forestry & fishing', share: 28.18 },
    { sector: 'Wholesale & retail trade', share: 18.89 },
    { sector: 'Manufacturing', share: 13.83 },
    { sector: 'Accommodation & food service', share: 7.79 },
    { sector: 'Construction', share: 6.55 },
    { sector: 'Education', share: 4.95 },
    { sector: 'Other services', share: 4.56 },
    { sector: 'Transportation', share: 4.29 },
    { sector: 'Public administration', share: 3.52 },
    { sector: 'All other industries', share: 7.44 },
  ],
  status: [
    { status: 'Employees', share: 38.80 },
    { status: 'All other employment statuses', share: 61.20 },
  ],
};

export const PROVINCES = [
  { name: 'West Java', capital: 'Bandung', island: 'Java', population: 50.35, density: 1359 },
  { name: 'East Java', capital: 'Surabaya', island: 'Java', population: 41.81, density: 870 },
  { name: 'Central Java', capital: 'Semarang', island: 'Java', population: 37.89, density: 1104 },
  { name: 'North Sumatra', capital: 'Medan', island: 'Sumatra', population: 15.59, density: 215 },
  { name: 'Banten', capital: 'Serang', island: 'Java', population: 12.43, density: 1329 },
  { name: 'Jakarta', capital: 'Jakarta', island: 'Java', population: 10.68, density: 16165 },
  { name: 'South Sulawesi', capital: 'Makassar', island: 'Sulawesi', population: 9.5, density: 207 },
  { name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatra', population: 9.4, density: 275 },
  { name: 'South Sumatra', capital: 'Palembang', island: 'Sumatra', population: 8.8, density: 101 },
  { name: 'Riau', capital: 'Pekanbaru', island: 'Sumatra', population: 6.7, density: 77 },
];

export const POVERTY = {
  urban: 6.66,
  rural: 11.34,
  national: 8.57,
  line: 595242,
  giniSep: 0.381,
  giniMar: 0.379,
};

// Every indicator in one searchable index: label, value, section, source + year.
export const INDICATORS = [
  ...HEADLINE.map((h) => ({ label: h.label, value: h.value, section: 'Overview', source: h.source + ' · ' + h.note })),
  { label: 'Median age', value: '30.1 years', section: 'Demographics', source: 'UN WPP 2024' },
  { label: 'Total fertility rate', value: '2.12 children per woman', section: 'Demographics', source: 'UN WPP 2024' },
  { label: 'Urban population', value: '59.0% (167.2m)', section: 'Demographics', source: 'UN WPP 2024' },
  { label: 'Population density', value: '156 people per km²', section: 'Demographics', source: 'UN WPP 2024' },
  { label: 'Share aged 0–14', value: '24.6%', section: 'Demographics', source: 'UN WPP 2024' },
  { label: 'Share aged 65+', value: '7.3%', section: 'Demographics', source: 'UN WPP 2024' },
  ...HEALTH.map((h) => ({ label: h.label, value: h.value, section: 'Health', source: h.source })),
  ...EDUCATION.map((e) => ({ label: e.label, value: e.value, section: 'Education', source: e.source })),
  { label: 'Labour force', value: '152.11 million', section: 'Employment', source: 'BPS Sakernas, Aug 2024' },
  { label: 'Employed people', value: '144.64 million', section: 'Employment', source: 'BPS Sakernas, Aug 2024' },
  { label: 'Average monthly wage (employees)', value: 'Rp3.27 million', section: 'Employment', source: 'BPS Sakernas, Aug 2024' },
  { label: 'Formal employment share', value: '42.05%', section: 'Employment', source: 'BPS Sakernas, Aug 2024' },
  { label: 'Informal employment share', value: '57.95%', section: 'Employment', source: 'BPS Sakernas, Aug 2024' },
  { label: 'Poverty line', value: 'Rp595,242 per person per month', section: 'Overview', source: 'BPS Susenas, Sep 2024' },
  { label: 'Gini ratio', value: '0.381', section: 'Overview', source: 'BPS Susenas, Sep 2024' },
  { label: 'Provinces', value: '38 provinces', section: 'Regions', source: 'BPS, 2024' },
  { label: 'Java population share', value: '55.4% (156.93m)', section: 'Regions', source: 'BPS province estimates, mid-2024' },
];
