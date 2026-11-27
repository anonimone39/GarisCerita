// ---------- Sejarah Cabai, Jejak Sawit (generic scene engine) ----------
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

// ---------- generic scene engine: renders SCENES (data) ----------
const WORK = { cols: ['#e07a2f', '#e07a2f'], hat: 'bandana', hatCol: '#f2b52a', dotCol: '#fff', belt: false };
const FARM = { cols: ['#3a8f6a', '#3a8f6a'], hat: 'blangkon', hatCol: '#7a4524', vest: '#f2c230' };
const PEJ = { cols: ['#5a4a3a', '#5a4a3a'], hat: 'peci', belt: false, vest: '#f6f1e8' };
const BOSS = { cols: ['#2a2f3a', '#f6f1e8'], hat: 'peci', belt: false };
const KID = { cols: ['#2f63c9', '#f6f1e8'], hat: 'bandana', hatCol: '#e0392f', dotCol: '#fff', belt: false };
const PRESET = { SCI, COLON, BUDI, LOCAL, LOCAL2, IBU, COOK, WORK, FARM, PEJ, BOSS, KID };
const FACE = { happy: { eyes: 'happy', mouth: 'grin' }, smile: { eyes: 'normal', mouth: 'smile' }, wow: { eyes: 'wide', mouth: 'o', browUp: 1 }, flat: { eyes: 'normal', mouth: 'flat' }, sad: { eyes: 'normal', mouth: 'frown', browAng: -.2 }, think: { eyes: 'normal', mouth: 'flat', look: [.6, -.4], browOne: 1 }, worry: { eyes: 'wide', mouth: 'flat', browAng: -.3 }, grin: { eyes: 'normal', mouth: 'grin' }, tired: { eyes: 'half', mouth: 'flat' } };
const NAMED_ROUTES = {
  MAU: [[650, 345], [730, 340], [812, 334]],
  AMS: [[505, 82], [455, 170], [470, 300], [540, 402], [640, 370], [740, 345], [812, 334]],
};
const armsFor = (k, lt, t) => {
  const w = Math.sin(t * 4);
  switch (k) {
    case 'up': return { L: [2.5, .3], R: [2.5, .3] };
    case 'cheer': return { L: [2.4 + Math.sin(t * 8) * .25, .3], R: [2.4 + Math.sin(t * 8 + 1) * .25, .3] };
    case 'work': return { L: [.5, -.3], R: { ik: [.25 + w * .05, -.55 + Math.abs(w) * .05], bend: -1 } };
    case 'plant': { const b = Math.max(0, Math.sin(t * 3)); return { L: [.5, -.2], R: { ik: [.28, lerp(-.6, -.22, b)], bend: -1 } }; }
    case 'wave': return { L: [.5, -.3], R: [2.3 + Math.sin(t * 6) * .3, .3] };
    case 'point': return { L: [.5, -.3], R: { ik: [.3, -.62], bend: -1 } };
    case 'think': return { L: [.5, -.3], R: { ik: [.05, -.66], bend: -1 } };
    case 'hold': return { L: { ik: [-.2, -.45], bend: 1 }, R: { ik: [.2, -.45], bend: -1 } };
    case 'cross': return { L: { ik: [.1, -.4], bend: 1 }, R: { ik: [-.1, -.4], bend: -1 } };
    default: return { L: [.5, -.3], R: [.5, -.3] };
  }
};
const inRange = (t, it) => (it.at == null || t >= it.at) && (it.until == null || t <= it.until);
const popK = (t, it) => it.at == null ? 1 : backOut(clamp((t - it.at) / .35));
const mv = (t, it) => { if (!it.m) return [it.x, it.y]; const [x1, y1, t0, t1] = it.m, k = ease(clamp((t - t0) / (t1 - t0))); return [lerp(it.x, x1, k), lerp(it.y, y1, k)]; };
const shipOf = (ctx, it, x, y, s, t) => {
  const f = it.f == null ? 1 : it.f, ph = it.ph || 1;
  if (it.kind === 'colon') drawShip(ctx, x, y, s, t, { flag: '#e07a1a', hull: '#5a3a2a', sail: '#f2ead2', stripe: '#2f63c9', ph, flip: f });
  else if (it.kind === 'red') drawShip(ctx, x, y, s, t, { flag: '#e0392f', hull: '#7a4a2a', ph, flip: f });
  else if (it.kind === 'tanker') tankerProp(ctx, x, y, s, t, f);
  else drawShip(ctx, x, y, s, t, { flag: it.flag || '#2f8f5b', hull: '#7a4a2a', ph, flip: f });
};
const ITEM = {
  palm: (c, i, t, x, y, k) => oilPalm(c, x, y, (i.s || 1) * k, t, { age: Array.isArray(i.age) ? lerp(i.age[0], i.age[1], ease(clamp((t - i.age[2]) / (i.age[3] - i.age[2])))) : (i.age == null ? 1 : i.age), bunches: i.b == null ? 1 : i.b }),
  pin: (c, i, t, x, y, k) => pinAt(c, x, y, i.label || '', i.col || '#e0392f', k, t, i.sc || .8),
  road: (c, i) => { c.save(); c.beginPath(); c.moveTo(-100, i.y); c.lineTo(1180, i.y); c.lineTo(1180, i.y + (i.h || 160)); c.lineTo(-100, i.y + (i.h || 160)); c.closePath(); fillStroke(c, '#c9a064', 6); c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 6; c.setLineDash([40, 30]); c.beginPath(); c.moveTo(-100, i.y + (i.h || 160) / 2); c.lineTo(1180, i.y + (i.h || 160) / 2); c.stroke(); c.restore(); },
  tandan: (c, i, t, x, y, k) => tandan(c, x, y, (i.s || 1) * k, i.r || 0),
  mill: (c, i, t, x, y, k) => millProp(c, x, y, (i.s || 1) * k, t, i.smoke == null ? 1 : i.smoke),
  rows: (c, i, t) => plantationRows(c, i.y, t, { rows: i.rows || 4, age: i.age }),
  ship: (c, i, t, x, y, k) => shipOf(c, i, x, y, (i.s || 1) * k, t),
  seed: (c, i, t, x, y, k) => seedIcon(c, x, y, (i.s || 1), k, t),
  crate: (c, i, t, x, y, k) => seedCrate(c, x, y, (i.s || 1) * k, 1),
  gate: (c, i, t, x, y, k) => gardenGate(c, x, y, (i.s || 1) * k, i.label || 'KEBUN RAYA BOGOR'),
  hole: (c, i, t, x, y, k) => dirtHole(c, x, y, (i.s || 1), i.planted == null ? 0 : i.planted, t),
  sack: (c, i, t, x, y, k) => sack(c, x, y, (i.s || 1) * k, '#d8b883'),
  basket: (c, i, t, x, y, k) => basketChili(c, x, y, (i.s || 1) * k, i.n || 8, t),
  barrel: (c, i, t, x, y, k) => barrelOil(c, x, y, (i.s || 1) * k),
  train: (c, i, t, x, y, k) => trainProp(c, x, y, (i.s || 1) * k, t),
  truck: (c, i, t, x, y, k) => truckProp(c, x, y, (i.s || 1) * k, t, i.load == null ? 1 : i.load),
  house: (c, i, t, x, y, k) => houseProp(c, x, y, (i.s || 1) * k),
  product: (c, i, t, x, y, k) => productProp(c, x, y, (i.s || 1) * k, i.type || 'oil'),
  orang: (c, i, t, x, y, k) => orangutan(c, x, y, (i.s || 1) * k, t),
  ftree: (c, i, t, x, y, k) => forestTree(c, x, y, (i.s || 1) * k, t, i.dark),
  stump: (c, i, t, x, y, k) => stumpProp(c, x, y, (i.s || 1) * k),
  seal: (c, i, t, x, y, k) => sealBadge(c, x, y, (i.s || 1) * k, i.label || 'ISPO', t),
  cal: (c, i, t, x, y, k) => calendarCard(c, x, y, (i.s || 1), i.year || '1911', k),
  sheet: (c, i, t, x, y, k) => mapSheet(c, x, y, (i.w || 500) * k, (i.h || 380) * k, i.dots == null ? 6 : i.dots, t),
  office: (c, i, t, x, y, k) => officeProp(c, x, y, (i.s || 1) * k, i.label || ''),
  plots: (c, i, t, x, y, k) => plotsProp(c, x, y, (i.s || 1) * k, t),
  drone: (c, i, t, x, y, k) => droneProp(c, x, y, (i.s || 1) * k, t),
  tablet: (c, i, t, x, y, k) => tabletProp(c, x, y, (i.s || 1) * k, t),
  flag: (c, i, t, x, y, k) => flagProp(c, x, y, (i.s || 1) * k, t, 'maja', i.h || 430),
  pod: (c, i, t, x, y, k) => drawChiliPod(c, x, y, (i.s || 1) * k, i.r || 0, CHILI_RED),
  haze: (c, i, t) => hazeProp(c, t, i.a == null ? 1 : i.a),
  flame: (c, i, t, x, y, k) => flame(c, x, y, (i.s || 1) * k, t, 1, 0),
  q: (c, i, t, x, y, k) => questionMark(c, x, y, (i.s || 1), k, t),
  heart: (c, i, t, x, y, k) => heart(c, x, y, (i.s || 1), '#e0392f', k),
  coins: (c, i, t) => coinShower(c, t, 1, i.n || 14, i.seed || 3),
  sparkle: (c, i, t, x, y, k) => sparkle(c, x, y, (i.s || 40) * k, k),
  pier: (c, i) => pierFront(c, i.y),
  field: (c, i) => drawField(c, i.y, 2400),
  seedbag: (c, i, t, x, y, k) => { sack(c, x, y, (i.s || 1) * k, '#d8b883'); seedIcon(c, x, y - 150 * (i.s || 1), .5 * (i.s || 1), 1, t); },
};
const bgDraw = (ctx, spec, t, cam) => {
  const b = spec.bg || {}; const k = b.k || 'garden';
  if (k === 'garden') gardenBG(ctx, t, cam);
  else if (k === 'sea') daySea(ctx, t, cam, b.hor || 900);
  else if (k === 'sunrise') sunrise(ctx, t, cam, b.hor || 930);
  else if (k === 'village') villageBG(ctx, t, cam, { hut: b.hut !== false });
  else if (k === 'sawah') { villageBG(ctx, t, cam, { hut: false }); sawah(ctx, t, 1130); }
  else if (k === 'dusk') { applyCam(ctx, cam, .08); drawSky(ctx, '#6a4aa0', '#ffc27a', -300, 950); applyCam(ctx, cam, .1); drawSun(ctx, 820, 560, 90, t, 1.2); applyCam(ctx, cam, .55); drawSea(ctx, 930, t, 2600, ['#a07ab0', '#4a5ea0', '#2a3470']); applyCam(ctx, cam, 1); }
};
function makeScene(sp) {
  return { start: sp.s, end: sp.e, tr: sp.tr || 'whip', draw(ctx, lt, t) {
    const b = sp.bg || {}, k = b.k || 'garden', cam = cam0(t, lt, { y: sp.cy || 1000, dz: sp.dz == null ? .02 : sp.dz, x0: 540 + (sp.cx || 0) });
    const flat = k === 'rays' || k === 'plain' || k === 'nus' || k === 'map';
    if (k === 'rays') rays(ctx, t, b.a || '#ffcf6a', b.b || '#c4521a', b.cy || 900);
    else if (k === 'plain' || k === 'nus') { ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, b.a || '#3fa6d8'); g.addColorStop(1, b.b || '#1a6fa6'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
    else if (k === 'map') { const m = sp.map, mc = mapCam(t, m.cam); applyCam(ctx, mc, 1); worldMap(ctx, t, { hiAmerica: m.hiA || 0, hiIndo: m.hiI || 0 }); if (m.extra) extraIslands(ctx, t, 1);
      (m.routes || []).forEach(r => { const pts = typeof r[0] === 'string' ? NAMED_ROUTES[r[0]] : r[0]; const p = clamp((t - r[1]) / r[2]); mapRoute(ctx, pts, p, r[3] || '#fff', 8, [20, 14], !!r[4]); if (r[5] && p > 0) { const q = routePoint(pts, p); shipOf(ctx, { kind: r[5], f: 1, ph: 1 }, q[0], q[1], .1, t); if (r[6]) { seedIcon(ctx, q[0] - 30, q[1] - 70, .5, 1, t); seedIcon(ctx, q[0] + 6, q[1] - 70, .5, 1, t + 1); } } });
      (m.pins || []).forEach(p => mapPin(ctx, p[0], p[1], p[2], p[3], backOut(clamp((t - p[4]) / .3)), t, p[5] || .8));
      (m.seeds || []).forEach(p => { const a = backOut(clamp((t - p[2]) / .3)); if (a > 0) { const [px, py] = mapPt(p[0], p[1]); seedIcon(ctx, px, py - 30, .7, a, t); } }); }
    else { applyCam(ctx, cam, 1); bgDraw(ctx, sp, t, cam); applyCam(ctx, cam, 1); }
    if (k === 'nus') nusantaraMap(ctx, b.x || 540, b.y || 1000, b.s || 760, t, sp.glow == null ? 0 : sk(t, sp.glow[0], sp.glow[1]));
    // items
    (sp.items || []).forEach(it => { if (!inRange(t, it)) return; const [x, y] = mv(t, it); const kk = popK(t, it); if (kk <= 0) return; if (it.fade) ctx.save(), ctx.globalAlpha = it.fade; (ITEM[it.k] || (() => { }))(ctx, it, t, x, y, kk); if (it.fade) ctx.restore(); });
    // characters
    (sp.chars || []).forEach(ch => { if (!inRange(t, ch)) return; const [x, y] = mv(t, ch); const kk = popK(t, ch); if (kk <= 0) return; const w = Math.sin(t * 3 + (ch.x || 0)) * .004; ST(ctx, PRESET[ch.c] || SCI, x, y, ch.s * kk, { flip: ch.f || 1, bob: w, arms: armsFor(ch.a || 'idle', lt, t), face: FACE[ch.fc || 'smile'], shadow: true, lean: ch.a === 'plant' ? Math.max(0, Math.sin(t * 3)) * .08 : 0 }); });
    // overlay: sparkles, tags, kinetic text, pill
    if (flat) ctx.setTransform(1, 0, 0, 1, 0, 0);
    (sp.tags || []).forEach(g => tagS(ctx, g[0], g[1], g[2], g[3], t, g[4], g[5] || 42));
    overlay(ctx, () => { (sp.kin || []).forEach(q => { if (q[6] != null && t > q[6] + .3) return; kinetic(ctx, q[0], 540, q[1], q[2], lt, { delay: q[3] - sp.s, col: q[4] || '#ffd23a', pulse: q[5] !== 0, exit: q[6] != null ? q[6] - sp.s : undefined }); });
      if (sp.pill) { const kk = backOut(sk(t, sp.pill[1], sp.pill[1] + .5)); if (kk > 0) { ctx.save(); ctx.translate(540, sp.pill[2] || 1620); ctx.scale(kk, kk); ctx.font = '700 36px Poppins'; const w = ctx.measureText(sp.pill[0]).width + 60; rrect(ctx, -w / 2, -34, w, 68, 34); fillStroke(ctx, '#e0392f', 7); text(ctx, sp.pill[0], 0, 2, 36, '#fff', INK, 0, 'Poppins', 700); ctx.restore(); } }
      (sp.flash || []).forEach(f => flash(ctx, sk(t, f[0], f[0] + .05) * (1 - sk(t, f[0] + .05, f[1])) * (f[2] || .6))); });
    if (sp.spot) spotlight(ctx, t);
  } };
}
if (typeof SCENES !== 'undefined') SCENES.forEach(sp => SHOTS.push(makeScene(sp)));
function spotlight(ctx, t) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(540, 1100, 80, 540, 1100, 900); g.addColorStop(0, 'rgba(255,240,170,.35)'); g.addColorStop(1, 'rgba(255,240,170,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }

// SHOTS.push (scene 0)
// SHOTS.push (scene 1)
// SHOTS.push (scene 2)
// SHOTS.push (scene 3)
// SHOTS.push (scene 4)
// SHOTS.push (scene 5)
// SHOTS.push (scene 6)
// SHOTS.push (scene 7)
// SHOTS.push (scene 8)
// SHOTS.push (scene 9)
