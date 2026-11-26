// Hand-drawn SVG charts: no library, no fetch, data passed in by views.

const TEAL = '#0e6b62';
const AMBER = '#d97b1e';
const SLATE = '#5b6b72';
const LIGHT = '#d9e8e5';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

export function verticalBarChart(title, labels, values, unit, color) {
  const W = 560, H = 240, padL = 44, padB = 34, padT = 18;
  const plotW = W - padL - 16, plotH = H - padT - padB;
  const shown = values.map((v, i) => ({ v, i })).filter((d) => d.v !== null);
  const max = Math.max(...shown.map((d) => d.v), 0);
  const min = Math.min(0, ...shown.map((d) => d.v));
  const range = max - min || 1;
  const zeroY = padT + ((max - 0) / range) * plotH;
  const bw = Math.min(52, plotW / values.length - 10);
  let bars = '';
  values.forEach((v, i) => {
    if (v === null) return;
    const x = padL + (i + 0.5) * (plotW / values.length) - bw / 2;
    const h = (Math.abs(v) / range) * plotH;
    const y = v >= 0 ? zeroY - h : zeroY;
    const labelY = v >= 0 ? y - 5 : y + h / 2 + 4;
    const labelFill = v >= 0 ? '#17323a' : '#ffffff';
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw}" height="${Math.max(h, 2).toFixed(1)}" rx="3" fill="${v < 0 ? AMBER : color}"><title>${esc(labels[i])}: ${v}${unit}</title></rect><text x="${(x + bw / 2).toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${labelFill}">${v}</text><text x="${(x + bw / 2).toFixed(1)}" y="${H - 12}" text-anchor="middle" font-size="11" fill="${SLATE}">${esc(labels[i])}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}" class="chart"><line x1="${padL}" y1="${zeroY}" x2="${W - 10}" y2="${zeroY}" stroke="#9db4b0" stroke-width="1"/><line x1="${padL}" y1="${padT}" x2="${padL}" y2="${H - padB}" stroke="#9db4b0" stroke-width="1"/>${bars}</svg>`;
}

export function lineChart(title, labels, values, unit, color) {
  const W = 560, H = 240, padL = 44, padB = 34, padT = 18;
  const plotW = W - padL - 16, plotH = H - padT - padB;
  const pts = [];
  values.forEach((v, i) => {
    if (v !== null) pts.push({ i, v });
  });
  const max = Math.max(...pts.map((p) => p.v));
  const min = Math.min(...pts.map((p) => p.v));
  const pad = (max - min) * 0.15 || 1;
  const top = max + pad, bot = min - pad;
  const x = (i) => padL + (i / (values.length - 1)) * plotW;
  const y = (v) => padT + ((top - v) / (top - bot)) * plotH;
  const d = pts.map((p, k) => `${k === 0 ? 'M' : 'L'}${x(p.i).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ');
  let dots = '';
  pts.forEach((p) => {
    const py = y(p.v);
    const low = py > H - 56;
    const labelY = low ? py - 8 : py - 10;
    const labelX = low ? x(p.i) - 12 : x(p.i);
    const anchor = low ? 'end' : 'middle';
    dots += `<circle cx="${x(p.i).toFixed(1)}" cy="${py.toFixed(1)}" r="4.5" fill="${color}" stroke="#fff" stroke-width="1.5"><title>${esc(labels[p.i])}: ${p.v}${unit}</title></circle><text x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="${anchor}" font-size="12" font-weight="700" fill="#17323a">${p.v}</text>`;
  });
  let xlabels = '';
  labels.forEach((l, i) => { xlabels += `<text x="${x(i).toFixed(1)}" y="${H - 12}" text-anchor="middle" font-size="11" fill="${SLATE}">${esc(l)}</text>`; });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}" class="chart"><path d="${d}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>${dots}${xlabels}</svg>`;
}

export function horizontalBarChart(title, rows, unit, color) {
  const W = 560, rowH = 34, padL = 190, padT = 8;
  const H = padT + rows.length * rowH + 8;
  const max = Math.max(...rows.map((r) => r.value));
  let out = '';
  rows.forEach((r, i) => {
    const y = padT + i * rowH;
    const w = (r.value / max) * (W - padL - 80);
    out += `<text x="0" y="${y + 19}" font-size="12.5" fill="#17323a">${esc(r.label)}</text><rect x="${padL}" y="${y + 5}" width="${Math.max(w, 2).toFixed(1)}" height="18" rx="3" fill="${color}"><title>${esc(r.label)}: ${r.value}${unit}</title></rect><text x="${(padL + w + 6).toFixed(1)}" y="${y + 19}" font-size="12" font-weight="700" fill="#17323a">${r.value}${unit}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}" class="chart">${out}</svg>`;
}

export function donutChart(title, rows, colors) {
  const total = rows.reduce((s, r) => s + r.value, 0);
  const R = 62, C = 2 * Math.PI * R;
  let offset = 0;
  let segs = '';
  rows.forEach((r, i) => {
    const frac = r.value / total;
    segs += `<circle cx="80" cy="80" r="${R}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="26" stroke-dasharray="${(frac * C).toFixed(1)} ${(C - frac * C).toFixed(1)}" stroke-dashoffset="${(-offset * C).toFixed(1)}" transform="rotate(-90 80 80)"><title>${esc(r.label)}: ${r.value}%</title></circle>`;
    offset += frac;
  });
  const legend = rows.map((r, i) => `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span>${esc(r.label)} — <strong>${r.value}%</strong></li>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 160 160" role="img" aria-label="${esc(title)}" class="donut">${segs}<text x="80" y="76" text-anchor="middle" font-size="20" font-weight="800" fill="#17323a">${total.toFixed(0)}%</text><text x="80" y="94" text-anchor="middle" font-size="10" fill="${SLATE}">of total</text></svg><ul class="legend">${legend}</ul></div>`;
}

export const CHART_COLORS = [TEAL, AMBER, '#2a9d8f', '#e9c46a', '#7a5c9e', '#4a7fa5'];
export { TEAL, AMBER };
