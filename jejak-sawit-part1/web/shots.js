// ---------- Sejarah Cabai, Jejak Sawit Part 1: Empat Bibit yang Mengubah Sejarah Indonesia ----------
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
const SCI = { cols: ['#f6f1e8', '#f6f1e8'], hat: 'bandana', hatCol: '#2f63c9', dotCol: '#fff', belt: false };
const COLON = { cols: ['#2a3f8f', '#f6f1e8'], hat: 'captain' };
const colonShip = (ctx, x, y, s, t, ph = 1, flip = 1) => drawShip(ctx, x, y, s, t, { flag: '#e07a1a', hull: '#5a3a2a', sail: '#f2ead2', stripe: '#2f63c9', ph, flip });
const gardenBG = (ctx, t, cam) => { applyCam(ctx, cam, .08); drawSky(ctx, '#7ec8f0', '#e9f7d8', -300, 1000); applyCam(ctx, cam, .1); drawSun(ctx, 860, 300, 90, t, 1.0); applyCam(ctx, cam, .15); drawCloud(ctx, 190 + t * 4, 400, 110, 5); drawCloud(ctx, 880, 260, 80, 6); applyCam(ctx, cam, .3); drawPillars(ctx, 960, 'B', .15); applyCam(ctx, cam, 1); const g = ctx.createLinearGradient(0, 1050, 0, 2400); g.addColorStop(0, '#86cc52'); g.addColorStop(1, '#4f9a3a'); ctx.fillStyle = g; ctx.fillRect(-1200, 1050, 3500, 1500); ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.fillRect(-1200, 1050, 3500, 6); };
const ROUTE_MAU = [[650, 345], [730, 340], [812, 334]];
const ROUTE_AMS = [[505, 82], [455, 170], [470, 300], [540, 402], [640, 370], [740, 345], [812, 334]];
const spotlight = (ctx, t) => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(540, 1100, 80, 540, 1100, 900); g.addColorStop(0, 'rgba(255,240,170,.35)'); g.addColorStop(1, 'rgba(255,240,170,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); };

// 1 — hook: "did you know?"
SHOTS.push({ start: 0, end: 1.21, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); gardenBG(ctx, t, cam); applyCam(ctx, cam, 1); plantationRows(ctx, 1080, t, { rows: 4 });
  ST(ctx, BUDI, 540, 1740, 560, { bob: Math.sin(t * 3) * .004, arms: { L: [.5, -.3], R: { ik: [.05, -.66], bend: -1 } }, face: { eyes: 'wide', mouth: 'o', look: [0, -.3], browUp: 1 } });
  questionMark(ctx, 800, 900, 1.3, sk(lt, .3, .6), t);
} });
// 2 — oil palm is not native to the Nusantara
SHOTS.push({ start: 1.21, end: 6.21, tr: 'whip', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3fa6d8'); g.addColorStop(1, '#1a6fa6'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const cam = cam0(t, lt, { y: 960, dz: .01 }); applyCam(ctx, cam, 1);
  const pa = backOut(sk(lt, 0, .5)); oilPalm(ctx, 280, 1560, 1.5 * pa, t);
  nusantaraMap(ctx, 760, 1000, 560, t, 0);
  const x = backOut(sk(lt, 3.0, 3.4)); if (x > 0) { ctx.save(); ctx.translate(760, 1000); ctx.scale(x, x); text(ctx, 'X', 0, 0, 520, '#e0392f', INK, 36, 'Poppins', 700); ctx.restore(); }
  tagS(ctx, 'KELAPA SAWIT', 300, 330, '#e07a1a', t, 1.4, 44);
  overlay(ctx, () => { kinetic(ctx, 'BUKAN ASLI', 540, 470, 120, lt, { delay: 3.0, col: '#fff' }); kinetic(ctx, 'NUSANTARA', 540, 610, 130, lt, { delay: 3.7, col: '#ffd23a', pulse: true }); });
} });
// 3 — 1848
SHOTS.push({ start: 6.21, end: 10.02, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950 }); sunrise(ctx, t, cam);
  colonShip(ctx, lerp(150, 700, easeOut(sk(lt, 0, 3.6))), 1330, .95, t, 1, 1);
  overlay(ctx, () => kinetic(ctx, '1848', 540, 430, 300, lt, { delay: 1.56, col: '#ffd23a', pulse: true }));
} });
// 4 — four seedlings
SHOTS.push({ start: 10.02, end: 13.8, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); applyCam(ctx, cam, .08); drawSky(ctx, '#7ec8f0', '#fbe9c4', -300, 1000); applyCam(ctx, cam, .55); drawSea(ctx, 1000, t); applyCam(ctx, cam, 1);
  rrect(ctx, -300, 1500, 1700, 40, 10); fillStroke(ctx, '#8a5530', 6); rrect(ctx, -300, 1540, 1700, 900, 0); fillStroke(ctx, '#a9663a', 6);
  seedCrate(ctx, 540, 1560, 1.5, 1);
  [[11.1, 420], [11.39, 500], [11.68, 580], [11.93, 660]].forEach(([at, x], i) => seedIcon(ctx, 400 + i * 95, 1330, 1.1, clamp((t - at) / .3), t));
  ST(ctx, COLON, 170, 1610, 520, { arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'normal', mouth: 'smile' } }); ST(ctx, SCI, 930, 1610, 520, { flip: -1, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'happy', mouth: 'smile' } });
  tagS(ctx, 'EMPAT BIBIT', 540, 330, '#e07a1a', t, 11.1, 52);
} });
// 5a — Bourbon / Mauritius
SHOTS.push({ start: 13.8, end: 17.04, tr: 'whip', draw(ctx, lt, t) {
  const cam = mapCam(t, [[13.8, 640, 250, .75], [17.04, 700, 300, .95]]);
  applyCam(ctx, cam, 1); worldMap(ctx, t, {}); extraIslands(ctx, t, 1);
  const p = clamp((t - 14.6) / 2.2); mapRoute(ctx, ROUTE_MAU, p, '#fff', 8, [20, 14], true);
  const [sx, sy] = routePoint(ROUTE_MAU, p); colonShip(ctx, sx, sy, .1, t, 1, 1); seedIcon(ctx, sx - 30, sy - 70, .5, 1, t); seedIcon(ctx, sx + 6, sy - 70, .5, 1, t + 1);
  mapPin(ctx, 650, 345, 'MAURITIUS', '#2f63c9', backOut(clamp((t - 15.9) / .3)), t, .75); mapPin(ctx, 812, 334, 'BOGOR', '#e0392f', backOut(clamp((t - 16.2) / .3)), t, .75);
  ctx.setTransform(1, 0, 0, 1, 0, 0); tagPill(ctx, 540, 330, 'DUA BIBIT', '#e07a1a', (t - 13.96) / .3, 44); tagPill(ctx, 540, 450, 'BOURBON', '#2f63c9', (t - 14.93) / .3, 44);
} });
// 5b — Amsterdam
SHOTS.push({ start: 17.04, end: 19.97, tr: 'whip', draw(ctx, lt, t) {
  const cam = mapCam(t, [[17.04, 640, 230, .72], [19.97, 650, 215, .74]]);
  applyCam(ctx, cam, 1); worldMap(ctx, t, {}); extraIslands(ctx, t, 1);
  mapRoute(ctx, ROUTE_MAU, 1, 'rgba(255,255,255,.55)', 6, [20, 14], false);
  const p = clamp((t - 17.6) / 2.3); mapRoute(ctx, ROUTE_AMS, p, '#fff', 8, [20, 14], true);
  const [sx, sy] = routePoint(ROUTE_AMS, p); colonShip(ctx, sx, sy, .1, t, 2, 1); seedIcon(ctx, sx - 30, sy - 70, .5, 1, t); seedIcon(ctx, sx + 6, sy - 70, .5, 1, t + 1);
  mapPin(ctx, 505, 80, 'AMSTERDAM', '#e07a1a', backOut(clamp((t - 18.05) / .3)), t, .75); mapPin(ctx, 650, 345, 'MAURITIUS', '#2f63c9', 1, t, .6); mapPin(ctx, 812, 334, 'BOGOR', '#e0392f', 1, t, .75);
  ctx.setTransform(1, 0, 0, 1, 0, 0); tagPill(ctx, 540, 330, 'DUA LAINNYA', '#e07a1a', (t - 17.3) / .3, 44); tagPill(ctx, 540, 450, 'BELANDA', '#2f63c9', (t - 19.05) / .3, 44);
} });
// 6 — planted at the Bogor Botanical Gardens
SHOTS.push({ start: 19.97, end: 26.08, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); gardenBG(ctx, t, cam); applyCam(ctx, cam, 1);
  gardenGate(ctx, 540, 1150, 1.0);
  const pl = sk(t, 21.41, 24.0);
  [0, 1, 2, 3].forEach(i => dirtHole(ctx, 590 + i * 130, 1780, 1.0, clamp(pl * 4 - i), t));
  const bend = Math.max(0, Math.sin(lt * 3));
  ST(ctx, SCI, 330, 1700, 560, { arms: { L: [.5, -.2], R: { ik: [.28, lerp(-.6, -.22, bend)], bend: -1 } }, face: { eyes: 'happy', mouth: 'smile', look: [.7, .5] }, lean: bend * .08 });
  tagS(ctx, 'JAWA BARAT', 540, 330, '#2f8f5b', t, 23.29, 44); tagS(ctx, 'KOLEKSI TANAMAN', 540, 450, '#7a4bc4', t, 24.84, 40);
} });
// 7 — nobody expected it to become huge
SHOTS.push({ start: 26.08, end: 32.99, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); gardenBG(ctx, t, cam); applyCam(ctx, cam, 1);
  [0, 1, 2, 3].forEach(i => oilPalm(ctx, 150 + i * 250, 1560, .42, t + i, { age: .5, bunches: 0 }));
  ST(ctx, SCI, 300, 1780, 540, { bob: Math.sin(t * 3) * .004, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'normal', mouth: 'flat', look: [.6, -.4] } });
  ST(ctx, COLON, 780, 1790, 540, { flip: -1, bob: Math.sin(t * 3 + 1) * .004, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'normal', mouth: 'flat', look: [-.6, -.4] } });
  const bub = backOut(sk(t, 30.09, 30.5)); if (bub > 0) { ctx.save(); ctx.translate(540, 700); ctx.scale(bub, bub); ctx.translate(-540, -700); thoughtBubble(ctx, 540, 700, 640, 420, 540, 1000); ctx.save(); ctx.beginPath(); ctx.ellipse(540, 700, 290, 180, 0, 0, TAU); ctx.clip(); plantationRows(ctx, 650, t, { rows: 3 }); millProp(ctx, 760, 800, .5, t); ctx.restore(); ctx.restore(); }
  questionMark(ctx, 160, 780, .9, sk(lt, 1.0, 1.3), t); questionMark(ctx, 920, 760, 1.0, sk(lt, 1.3, 1.6), t + 1);
  tagS(ctx, 'TIDAK MENYANGKA', 540, 330, '#e07a1a', t, 27.09, 46);
} });
// 8 — a collection and ornamental plant
SHOTS.push({ start: 32.99, end: 37.6, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); gardenBG(ctx, t, cam); applyCam(ctx, cam, 1);
  [0, 1, 2, 3].forEach(i => oilPalm(ctx, 140 + i * 260, 1560, .62, t + i, { age: .7, bunches: 0 }));
  ST(ctx, SCI, 280, 1790, 480, { bob: Math.sin(t * 3) * .004, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'happy', mouth: 'smile' } });
  ST(ctx, IBU, 560, 1800, 480, { bob: Math.sin(t * 3 + 1) * .004, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'wide', mouth: 'o', look: [0, -.4] } });
  ST(ctx, LOCAL2, 840, 1800, 480, { flip: -1, bob: Math.sin(t * 3 + 2) * .004, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'happy', mouth: 'grin' } });
  tagS(ctx, 'TANAMAN KOLEKSI', 540, 330, '#7a4bc4', t, 35.72, 44); tagS(ctx, 'TANAMAN HIAS', 540, 450, '#3fa35b', t, 36.86, 44);
} });
// 9 — four small seedlings, the start of a long journey
SHOTS.push({ start: 37.6, end: 44.06, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); gardenBG(ctx, t, cam); applyCam(ctx, cam, 1);
  const grow = easeOut(sk(lt, .4, 4.0)); [0, 1, 2, 3].forEach(i => oilPalm(ctx, 160 + i * 250, 1600, 1.0, t + i, { age: .3 + .7 * grow, bunches: grow > .9 ? 1 : 0 }));
  spotlight(ctx, t);
  overlay(ctx, () => { kinetic(ctx, 'EMPAT BIBIT', 540, 330, 120, lt, { delay: .85, col: '#fff' }); kinetic(ctx, 'AWAL PERJALANAN', 540, 470, 96, lt, { delay: 2.95, col: '#ffd23a', pulse: true }); });
} });
// 10 — changing regions, people's lives and the economy
SHOTS.push({ start: 44.06, end: 50.42, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); gardenBG(ctx, t, cam); applyCam(ctx, cam, 1);
  const k = sk(lt, 0, 3.0); plantationRows(ctx, 1080, t, { rows: 1 + Math.floor(k * 3.99) });
  const m = backOut(sk(t, 47.0, 47.4)); if (m > 0) millProp(ctx, 840, 1500, .9 * m, t);
  const w = Math.sin(t * 4); ST(ctx, LOCAL, 280, 1780, 520, { arms: { L: [.5, -.3], R: { ik: [.25 + w * .05, -.55], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin' } });
  tandan(ctx, 560, 1760, .8, .3);
  tagS(ctx, 'WILAYAH', 300, 330, '#2f8f5b', t, 46.03, 40); tagS(ctx, 'MASYARAKAT', 760, 330, '#e07a1a', t, 47.46, 40); tagS(ctx, 'PEREKONOMIAN', 540, 450, '#2f63c9', t, 48.72, 42);
} });
// 11 — how did they spread across the Nusantara?
SHOTS.push({ start: 50.42, end: 60, tr: 'cut', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3fa6d8'); g.addColorStop(1, '#1a6fa6'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  nusantaraMap(ctx, 540, 1000, 760, t, sk(lt, .5, 2.0));
  [0, 1, 2, 3].forEach(i => seedIcon(ctx, 470 + i * 38 - 57, 1180, .5, clamp((t - 51.8 - i * .2) / .3), t + i));
  for (const [x, y, at] of [[160, 880, 53.4], [500, 740, 53.7], [740, 850, 54.0], [950, 900, 54.3]]) questionMark(ctx, x, y - 100, .7, sk(t, at, at + .3), t + x);
  overlay(ctx, () => { kinetic(ctx, 'MENYEBAR?', 540, 330, 150, lt, { delay: 2.6, col: '#ffd23a', pulse: true });
    const k = backOut(sk(lt, 4.3, 4.8)); ctx.save(); ctx.translate(540, 1620); ctx.scale(k, k); ctx.font = '700 36px Poppins'; const w = ctx.measureText('Bersambung ke Part 2').width + 60; rrect(ctx, -w / 2, -34, w, 68, 34); fillStroke(ctx, '#e0392f', 7); text(ctx, 'Bersambung ke Part 2', 0, 2, 36, '#fff', INK, 0, 'Poppins', 700); ctx.restore(); });
} });
