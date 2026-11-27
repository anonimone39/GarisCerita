// ---------- Sejarah Cabai, Part 7: Tanaman Amerika yang Menjadi Identitas Indonesia ----------
const SHOTS = [];
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 4) => shake(t * .35, a, 1, 2);
const BUDI = { cols: ['#2f8f5b', '#f6f1e8'], hat: 'peci', belt: false };
const SITI = { cols: ['#e07a2f', '#f6f1e8'], hat: 'bandana', hatCol: '#7a4bc4', dotCol: '#fff', belt: false };
const PAK = { cols: ['#2f63c9', '#f6f1e8'], hat: 'peci', belt: false, vest: '#f2b52a' };
const ANCIENT = { cols: ['#b9712f', '#b9712f'], hat: 'feather', belt: false };
const ANCIENT2 = { cols: ['#3a8f6a', '#3a8f6a'], hat: 'feather', belt: false };
const EXPLORER = { cols: PAL.navy, hat: 'captain' };
const spoonProp = (c, k, h, a, side) => { if (k === 'R') { c.save(); c.translate(h[0], h[1]); c.rotate(-side * a); drawSpoon(c, .22, .022); c.restore(); } };
const podProp = (c, k, h, a, side) => { if (k === 'R') { c.save(); c.translate(h[0], h[1]); c.rotate(-side * a); drawChiliPod(c, 0, .02, .0016, 1.2, CHILI_RED); c.restore(); } };

// eating cycle: right hand goes bowl -> mouth -> bowl
function eatPose(lt, period, bowlRel, mouthRel = [.03, -.66], off = 0) {
  const p = ((lt + off) % period) / period;
  const tgt = kf(p, [[0, bowlRel], [.3, bowlRel], [.55, mouthRel], [.8, mouthRel], [1, bowlRel]]);
  const chew = p > .55 && p < .88 ? 1 : 0;
  return { arms: { L: [.45, -.3], R: { ik: tgt, bend: -1 } }, chew };
}
const chewFace = (chew, lt, extra = {}) => Object.assign({ eyes: chew ? 'happy' : 'normal', mouth: chew ? (Math.sin(lt * 20) > 0 ? 'grin' : 'smile') : 'smile', look: [-.3, .5] }, extra);

const SAILOR2 = { cols: PAL.blue, hat: 'sailor', belt: false };
// ancient village backdrop
function ancientBG(ctx, t, cam) {
  applyCam(ctx, cam, .08); drawSky(ctx, '#ffb96a', '#fff0c6', -300, 1000);
  applyCam(ctx, cam, .1); drawSun(ctx, 860, 330, 90, t, 1.1);
  applyCam(ctx, cam, .15); drawCloud(ctx, 190 + t * 5, 420, 110, 5); drawCloud(ctx, 960, 250, 80, 6);
  applyCam(ctx, cam, .3); drawPillars(ctx, 960, 'B', .15);
  applyCam(ctx, cam, .55); drawPalm(ctx, 90, 1090, .9, t); drawPalm(ctx, 1010, 1100, 1.0, t + 1); stepPyramid(ctx, 600, 1110, 640, 5, 74);
  applyCam(ctx, cam, 1); drawField(ctx, 1110, 2400);
}

// map camera helper: pan/zoom over the world map. keys: [[t, mapX, mapY, z], ...]
function mapCam(t, keys) {
  const k = (i) => keys.map(a => [a[0], a[i]]);
  const mx = kf(t, k(1)), my = kf(t, k(2)), z = kf(t, k(3));
  const [x, y] = mapPt(mx, my); return { x, y, z, r: Math.sin(t * .6) * .004 };
}
const ROUTE_ATL = [[478, 125], [410, 150], [330, 190], [268, 226]];            // Iberia -> Caribbean
const ROUTE_EU = [[250, 232], [330, 190], [410, 150], [478, 125]];             // Americas -> Europe
const ROUTE_ONWARD = [[478, 125], [520, 220], [545, 380], [700, 292], [780, 300], [835, 305]]; // the rest: still to come


const sk = (v, a, b) => clamp((v - a) / (b - a));
const PORT = { cols: ['#2a3f8f', '#f6f1e8'], hat: 'captain' };
const SAIL = { cols: PAL.blue, hat: 'sailor', belt: false };
const VASCO = { cols: ['#8a1f2a', '#f6f1e8'], hat: 'captain' };
const INDIAN = { cols: ['#e07a2f', '#e07a2f'], hat: 'bandana', hatCol: '#f2b52a', dotCol: '#fff', belt: false };
const INDIAN2 = { cols: ['#3a8f6a', '#3a8f6a'], hat: 'bandana', hatCol: '#e0392f', dotCol: '#fff', belt: false };
const ROUTE_VASCO = [[478, 125], [430, 190], [450, 270], [500, 380], [560, 402], [640, 345], [686, 258]];
const ROUTE_ASEAN = [[686, 258], [740, 285], [790, 300], [835, 305]];
const cam0 = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x0 == null ? 540 : o.x0) + (o.dx || 0) * lt + hh[0], y: (o.y == null ? 960 : o.y) + hh[1], z: (o.z0 || 1) + (o.dz == null ? .02 : o.dz) * lt, r: o.r || 0 }; };
const sunrise = (ctx, t, cam, hor = 930) => {
  applyCam(ctx, cam, .08); drawSky(ctx, '#ff9d6b', '#ffe9c4', -300, hor + 20);
  applyCam(ctx, cam, .1); drawSun(ctx, 820, 520, 90, t, 1.1);
  applyCam(ctx, cam, .15); drawCloud(ctx, 200 + t * 5, 400, 110, 11); drawCloud(ctx, 900, 300, 80, 12);
  applyCam(ctx, cam, .55); drawSea(ctx, hor, t, 2600, ['#9fd8e8', '#2a9cc0', '#13739f']); applyCam(ctx, cam, 1);
};
const daySea = (ctx, t, cam, hor = 930) => {
  applyCam(ctx, cam, .08); drawSky(ctx, '#4aaeea', '#fbe9c4', -300, hor + 20);
  applyCam(ctx, cam, .1); drawSun(ctx, 240, 300, 80, t, 1.1);
  applyCam(ctx, cam, .15); drawCloud(ctx, 700 + t * 4, 330, 120, 7); drawCloud(ctx, 150, 560, 80, 8);
  applyCam(ctx, cam, .55); drawSea(ctx, hor, t); applyCam(ctx, cam, 1);
};
const redShip = (ctx, x, y, s, t, ph = 1, flip = 1) => drawShip(ctx, x, y, s, t, { flag: '#e0392f', hull: '#7a4a2a', ph, flip });
const tagS = (ctx, str, x, y, col, t, at, size = 40) => tagPill(ctx, x, y, str, col, (t - at) / .3, size);

const LOCAL = { cols: ['#c4552b', '#c4552b'], hat: 'blangkon', hatCol: '#5a3a1c', belt: false };
const LOCAL2 = { cols: ['#2f8f5b', '#f6f1e8'], hat: 'band', hatCol: '#f6f1e8', belt: false };
const ARAB = { cols: ['#f6f1e8', '#f6f1e8'], hat: 'band', hatCol: '#f6f1e8', vest: '#2f63c9', belt: false };
const CHIN = { cols: ['#d8312b', '#d8312b'], hat: 'band', hatCol: '#f6c93a', vest: '#f2b52a', belt: false };
const spanShip = (ctx, x, y, s, t, ph = 2, flip = 1) => drawShip(ctx, x, y, s, t, { flag: '#f2b52a', hull: '#6a3a2a', sail: '#f6e8c0', ph, flip });
const flagShip = (ctx, x, y, s, t, col, ph = 1, flip = 1) => drawShip(ctx, x, y, s, t, { flag: col, hull: '#7a4a2a', ph, flip });
const rays = (ctx, t, c0 = '#ffcf6a', c1 = '#c4521a', cy = 900) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0); const bg = ctx.createRadialGradient(540, cy, 50, 540, cy, 1400); bg.addColorStop(0, c0); bg.addColorStop(1, c1); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, cy); ctx.rotate(t * .12); ctx.fillStyle = 'rgba(255,240,150,.15)'; for (let i = 0; i < 14; i++) { ctx.rotate(TAU / 14); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-90, -1500); ctx.lineTo(90, -1500); ctx.closePath(); ctx.fill(); } ctx.restore();
};
const COOK = { cols: ['#c4552b', '#c4552b'], hat: 'blangkon', hatCol: '#5a3a1c', belt: false };

const IBU = { cols: ['#d8312b', '#f6f1e8'], hat: 'bandana', hatCol: '#f6c93a', dotCol: '#fff', belt: false };
const island = (ctx, x, y, s, t) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ellipse(ctx, 0, 0, 260, 50); fillStroke(ctx, '#f0d896', 6); ctx.fillStyle = '#6fa85a'; ellipse(ctx, 0, -22, 200, 32); ctx.fill(); drawPalm(ctx, -90, -10, .5, t); drawPalm(ctx, 20, -6, .6, t + 1); drawPalm(ctx, 110, -8, .45, t + 2); ctx.restore(); };
const kebunBG = (ctx, t, cam) => { villageBG(ctx, t, cam, { hut: false }); sawah(ctx, t, 1130); };
const pinAt = (ctx, x, y, label, col, a = 1, t = 0, sc = 1) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y - Math.abs(Math.sin(t * 4)) * 6); ctx.scale(sc * backOut(clamp(a)), sc * backOut(clamp(a))); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-30, -36, -30, -76, 0, -76); ctx.bezierCurveTo(30, -76, 30, -36, 0, 0); fillStroke(ctx, col, 6); circle(ctx, 0, -52, 10); ctx.fillStyle = '#fff'; ctx.fill(); if (label) { ctx.font = '700 34px Poppins'; const w = ctx.measureText(label).width + 40; rrect(ctx, -w / 2, -150, w, 56, 28); fillStroke(ctx, col, 6); text(ctx, label, 0, -122, 32, '#fff'); } ctx.restore(); };
const ROUTE_AM_EU = [[250, 232], [330, 190], [410, 150], [478, 125]];
const ROUTE_EU_IN = [[478, 125], [430, 190], [450, 270], [500, 380], [560, 402], [640, 345], [686, 258]];
const ROUTE_IN_NU = [[686, 258], [740, 285], [790, 300], [835, 305]];

// 1 — the long journey so far
SHOTS.push({ start: 0, end: 3.32, tr: 'whip', draw(ctx, lt, t) {
  const cam = mapCam(t, [[0, 520, 235, .62], [3.32, 520, 235, .66]]);
  applyCam(ctx, cam, 1); worldMap(ctx, t, {}); extraIslands(ctx, t, 1);
  const p = clamp((t - .6) / 2.4); mapRoute(ctx, ROUTE_AM_EU, p, '#fff', 8, [20, 14], false);
  overlay(ctx, () => { kinetic(ctx, 'PERJALANAN', 540, 330, 130, lt, { delay: .3, col: '#fff' }); kinetic(ctx, 'PANJANG CABAI', 540, 470, 100, lt, { delay: 1.39, col: '#ffd23a', pulse: true }); });
} });
// 2a — from America, cultivated for thousands of years
SHOTS.push({ start: 3.32, end: 7.48, tr: 'cut', draw(ctx, lt, t) {
  const cam = mapCam(t, [[3.32, 520, 235, .8], [4.8, 240, 215, 1.5], [7.48, 235, 220, 1.6]]);
  applyCam(ctx, cam, 1); worldMap(ctx, t, { hiAmerica: sk(lt, .9, 1.6) });
  mapPin(ctx, 235, 225, 'AMERIKA', '#e07a1a', backOut(clamp((t - 4.46) / .3)), t, .8);
  for (let i = 0; i < 5; i++) { const a = backOut(clamp((t - 5.3 - i * .2) / .3)); if (a > 0) { const [px, py] = mapPt(120 + i * 34, 105 + (i % 2) * 24); drawChiliPod(ctx, px, py - 20, .9 * a, -.4 + i * .4, CHILI_RED); } }
  ctx.setTransform(1, 0, 0, 1, 0, 0); tagPill(ctx, 540, 330, 'RIBUAN TAHUN', '#7a4bc4', (t - 7.48 + .8) / .3, 46);
} });
// 2b — explorers and merchants carry it to Europe and Asia
SHOTS.push({ start: 7.48, end: 13.42, tr: 'whip', draw(ctx, lt, t) {
  const cam = mapCam(t, [[7.48, 340, 215, 1.0], [10.0, 520, 230, .78], [13.42, 560, 235, .7]]);
  applyCam(ctx, cam, 1); worldMap(ctx, t, { hiAmerica: 1 });
  const p1 = clamp((t - 8.6) / 1.5), p2 = clamp((t - 9.9) / 2.8);
  mapRoute(ctx, ROUTE_AM_EU, p1, '#fff', 8, [20, 14], false); mapRoute(ctx, ROUTE_EU_IN, p2, '#fff', 8, [20, 14], false);
  const [x1, y1] = routePoint(ROUTE_AM_EU, p1); if (p1 < 1) redShip(ctx, x1, y1, .1, t, 1, -1);
  if (p2 > 0) { const [x2, y2] = routePoint(ROUTE_EU_IN, p2); redShip(ctx, x2, y2, .1, t, 2, 1); }
  mapPin(ctx, 490, 112, 'EROPA', '#2f63c9', backOut(clamp((t - 9.53) / .3)), t, .75); mapPin(ctx, 760, 170, 'ASIA', '#e0392f', backOut(clamp((t - 10.11) / .3)), t, .75);
  ctx.setTransform(1, 0, 0, 1, 0, 0); tagPill(ctx, 300, 330, 'PENJELAJAH', '#2a3f8f', (t - 11.65) / .3, 40); tagPill(ctx, 780, 330, 'PEDAGANG', '#e07a1a', (t - 12.57) / .3, 40);
} });
// 3 — 16th century: Portuguese and Spanish routes to the Nusantara
SHOTS.push({ start: 13.42, end: 19.42, tr: 'whip', draw(ctx, lt, t) {
  const cam = mapCam(t, [[13.42, 600, 235, .7], [15.8, 780, 270, 1.05], [19.42, 860, 280, 1.15]]);
  applyCam(ctx, cam, 1); worldMap(ctx, t, { hiAmerica: 1 }); extraIslands(ctx, t, 1);
  mapRoute(ctx, ROUTE_EU_IN, 1, 'rgba(255,255,255,.7)', 7, [20, 14], false);
  const p = clamp((t - 15.4) / 1.8); mapRoute(ctx, ROUTE_IN_NU, p, '#fff', 8, [20, 14], true);
  const q = clamp((t - 17.9) / 1.4); const sp = [[998, 160], [940, 195], [890, 228], [870, 270], [845, 298]]; mapRoute(ctx, sp, q, '#ffe14d', 8, [20, 14], true);
  if (q > 0) { const [sx, sy] = routePoint(sp, q); spanShip(ctx, sx, sy, .1, t, 2, -1); }
  mapPin(ctx, 835, 305, 'NUSANTARA', '#e0392f', backOut(clamp((t - 16.46) / .3)), t, .9);
  overlay(ctx, () => { kinetic(ctx, 'ABAD KE-16', 540, 330, 110, lt, { delay: .4, col: '#ffd23a', pulse: true }); tagPill(ctx, 300, 470, 'PORTUGIS', '#e0392f', (t - 17.74) / .3, 40); tagPill(ctx, 780, 470, 'SPANYOL', '#e0a52a', (t - 18.58) / .3, 40); });
} });
// 4 — before the chili: Java long pepper, black pepper, ginger
SHOTS.push({ start: 19.42, end: 27.07, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); villageBG(ctx, t, cam); applyCam(ctx, cam, 1);
  const a = backOut(sk(t, 23.92, 24.22)), b = backOut(sk(t, 25.17, 25.47)), c = backOut(sk(t, 26.32, 26.62));
  if (a > 0) longPepper(ctx, 250, 1130, .95 * a, 0, t); if (b > 0) pepperVine(ctx, 560, 1130, .95 * b, t); if (c > 0) gingerRoot(ctx, 880, 1000, .95 * c, -.2);
  const st = Math.sin(t * 6); ST(ctx, COOK, 250, 1620, 520, { bob: Math.abs(st) * .004, arms: { L: [.5, -.3], R: { ik: [.3, -.5], bend: -1 } }, face: { eyes: 'happy', mouth: 'smile' } });
  ST(ctx, LOCAL2, 850, 1630, 520, { flip: -1, bob: Math.sin(t * 3) * .004, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'happy', mouth: 'smile' } });
  tagS(ctx, 'CABAI JAWA', 250, 330, '#e07a1a', t, 24.25, 38); tagS(ctx, 'LADA', 560, 330, '#2f8f4b', t, 25.17, 40); tagS(ctx, 'JAHE', 880, 330, '#d9a21e', t, 26.32, 40);
  overlay(ctx, () => { kinetic(ctx, 'SEBELUM', 540, 470, 120, lt, { delay: .1, col: '#fff' }); kinetic(ctx, 'CABAI DATANG', 540, 610, 110, lt, { delay: .55, col: '#ffd23a' }); });
} });
// 5a — the American chili is welcomed
SHOTS.push({ start: 27.07, end: 29.32, tr: 'cut', draw(ctx, lt, t) {
  rays(ctx, t, '#ffd0a0', '#c4231a');
  ctx.save(); ctx.globalAlpha = .55; longPepper(ctx, 250, 1100, .8, 0, t); gingerRoot(ctx, 850, 1000, .8, .2); ctx.restore();
  const k = backOut(sk(lt, .5, 1.0)); ctx.save(); ctx.translate(540, 1050); ctx.scale(k * 3.2, k * 3.2); ctx.rotate(Math.sin(t * 3) * .06); drawChiliPod(ctx, 0, 0, 1, -.5, CHILI_RED); ctx.restore();
  tagS(ctx, 'CABAI AMERIKA', 540, 330, '#e0392f', t, 28.3, 52);
} });
// 5b — becoming a core part of Nusantara food culture
SHOTS.push({ start: 29.32, end: 34.32, tr: 'whip', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3fa6d8'); g.addColorStop(1, '#1a6fa6'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  nusantaraMap(ctx, 540, 960, 760, t, sk(lt, 1.5, 3.0));
  [['SUMATRA', 160, 880, 'rendang', 29.9], ['KALIMANTAN', 494, 740, 'soto', 30.6], ['JAWA', 464, 1110, 'gado', 31.3], ['BALI', 640, 1150, 'matah', 32.0], ['SULAWESI', 740, 850, 'rica', 32.7]].forEach(([lab, x, y, k, at]) => {
    const a = clamp((t - at) / .35); if (a <= 0) return; pinAt(ctx, x, y, lab, '#e0392f', a, t, .8);
    const d = backOut(a); if (k === 'matah') sambalType(ctx, x, y - 260, .42 * d, 'matah', t); else if (k === 'rica') sambalType(ctx, x, y - 260, .42 * d, 'plain', t); else dish(ctx, x, y - 250, .38 * d, k, t);
  });
  overlay(ctx, () => { tagPill(ctx, 540, 330, 'BUDAYA KULINER', '#2f8f5b', (t - 32.53) / .3, 44); });
} });
// 6 — one interesting thing
SHOTS.push({ start: 34.32, end: 36.36, tr: 'whip', draw(ctx, lt, t) {
  rays(ctx, t, '#ffe9a0', '#d4721a');
  const k = backOut(sk(lt, 0, .4)); ctx.save(); ctx.translate(540, 1060); ctx.scale(k * 2.6, k * 2.6); ctx.rotate(Math.sin(t * 3) * .06); drawChiliPod(ctx, 0, 0, 1, -.5, CHILI_RED); ctx.restore();
  questionMark(ctx, 220, 720, 1.1, sk(lt, .4, .7), t); questionMark(ctx, 860, 700, 1.3, sk(lt, .6, .9), t + 1);
  overlay(ctx, () => { kinetic(ctx, 'HAL MENARIK', 540, 330, 130, lt, { delay: .5, col: '#fff' }); });
} });
// 7 — a plant from a far-away continent, now identical with Indonesia
SHOTS.push({ start: 36.36, end: 43.55, tr: 'whip', draw(ctx, lt, t) {
  const cam = mapCam(t, [[36.36, 520, 235, .62], [40.0, 520, 235, .66], [43.55, 840, 290, 1.4]]);
  applyCam(ctx, cam, 1); worldMap(ctx, t, { hiAmerica: 1, hiIndo: sk(lt, 3.0, 4.0) }); extraIslands(ctx, t, 1);
  mapPin(ctx, 235, 225, 'AMERIKA', '#e07a1a', backOut(clamp((t - 37.7) / .3)), t, .75); mapPin(ctx, 835, 305, 'INDONESIA', '#e0392f', backOut(clamp((t - 39.33) / .3)), t, .75);
  const p = clamp((t - 38.3) / 2.2); const arc = [[250, 232], [330, 190], [410, 150], [478, 125], [430, 190], [450, 270], [500, 380], [560, 402], [640, 345], [686, 258], [790, 300], [835, 305]];
  mapRoute(ctx, arc, p, '#fff', 8, [20, 14], true); const [cx, cy] = routePoint(arc, p); drawChiliPod(ctx, cx, cy - 40 - Math.abs(Math.sin(t * 5)) * 14, .9, -.4, CHILI_RED);
  overlay(ctx, () => { kinetic(ctx, 'IDENTIK', 540, 330, 130, lt, { delay: 5.45, col: '#fff' }); kinetic(ctx, 'DENGAN INDONESIA', 540, 470, 90, lt, { delay: 5.9, col: '#ffd23a', pulse: true }); });
} });
// 8 — from America to the Nusantara
SHOTS.push({ start: 43.55, end: 45.61, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950 }); sunrise(ctx, t, cam); redShip(ctx, lerp(200, 760, lt / 2.1), 1330, .9, t, 1, 1);
  overlay(ctx, () => { kinetic(ctx, 'DARI AMERIKA', 540, 380, 120, lt, { delay: .2, col: '#fff' }); kinetic(ctx, 'HINGGA NUSANTARA', 540, 530, 92, lt, { delay: 1.1, col: '#ffd23a', pulse: true }); });
} });
// 9 — a mortar of sambal on every dining table
SHOTS.push({ start: 45.61, end: 49.17, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); warungBG(ctx, t, cam, {}); applyCam(ctx, cam, 1);
  const z = backOut(sk(lt, 0, .4)); ST(ctx, BUDI, 540, 1640, 640 * z, { bob: Math.sin(t * 3) * .004, armLen: 1.9, arms: { L: { ik: [-.1, -1.04], bend: 1 }, R: { ik: [.1, -1.04], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin' }, shadow: true });
  const cob = backOut(sk(lt, .5, 1.0)); drawCobek(ctx, 540, 1640 - 1.12 * 640 * z, .55 * cob, t, { grind: 0 });
  for (let i = 0; i < 6; i++) { const ph = (lt * .5 + i * .17) % 1; heart(ctx, 160 + i * 150, 1000 - ph * 260, .7, '#e0392f', Math.sin(ph * Math.PI) * sk(lt, 1.0, 1.4)); }
  tagS(ctx, 'SETIAP MEJA MAKAN', 540, 330, '#e0392f', t, 47.68, 40);
} });
// 10 — the finale title over a tropical landscape
SHOTS.push({ start: 49.17, end: 60, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000, dz: .008 }); villageBG(ctx, t, cam, { hut: false }); sawah(ctx, t, 1130); applyCam(ctx, cam, 1);
  for (const [px, py, sc] of [[190, 1560, 1.0], [540, 1600, 1.2], [890, 1560, 1.0]]) drawChiliPlant(ctx, px, py, sc, 1, t);
  for (let i = 0; i < 6; i++) { const ph = (lt * .4 + i * .17) % 1; heart(ctx, 130 + i * 170, 1150 - ph * 300, .8, '#e0392f', Math.sin(ph * Math.PI) * sk(lt, 1.0, 1.4)); }
  overlay(ctx, () => { kinetic(ctx, 'DARI AMERIKA,', 540, 330, 110, lt, { delay: .2, col: '#fff' }); kinetic(ctx, 'MENJADI CINTA', 540, 480, 120, lt, { delay: 1.1, col: '#ffd23a', pulse: true }); kinetic(ctx, 'NUSANTARA', 540, 640, 130, lt, { delay: 2.0, col: '#ffd23a', pulse: true });
    const k = backOut(sk(lt, 4.4, 4.9)); ctx.save(); ctx.translate(540, 1780); ctx.scale(k, k); rrect(ctx, -330, -50, 660, 100, 50); fillStroke(ctx, '#e0392f', 7); text(ctx, 'SEJARAH CABAI - TAMAT', 0, 0, 40, '#fff'); ctx.restore(); });
} });
