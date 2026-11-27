// ---------- Sejarah Cabai, Part 3: Kapal Portugis Membawa Cabai ke Asia ----------
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

// 1 — the ship leaves Europe
SHOTS.push({ start: 0, end: 5.51, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950, dz: .015 }); sunrise(ctx, t, cam);
  redShip(ctx, lerp(640, 1350, easeIn(sk(lt, 2.0, 5.5))), 1250, .85, t, 1, 1);
  pierFront(ctx, 1420);
  basketChili(ctx, 120, 1470, 1.0, 10, t); sack(ctx, 900, 1430, .8, '#d8b883');
  for (let i = 0; i < 3; i++) ST(ctx, SAIL, 250 + i * 230, 1590, 460, { shadow: false, arms: { L: [.4, -.2], R: [2.3 + Math.sin(t * 6 + i) * .3, .3] }, face: { eyes: 'happy', mouth: 'grin' } });
  tagS(ctx, 'EROPA', 540, 380, '#2f63c9', t, .99, 48);
  overlay(ctx, () => { kinetic(ctx, 'PERJALANAN', 540, 480, 110, lt, { delay: 3.06, col: '#fff' }); kinetic(ctx, 'PANJANG', 540, 620, 150, lt, { delay: 3.6, col: '#ffd23a', pulse: true }); });
} });
// 2 — the Portuguese
SHOTS.push({ start: 5.51, end: 9.63, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950 }); daySea(ctx, t, cam);
  redShip(ctx, 540, 1330, .98, t, 1, 1);
  for (let i = 0; i < 3; i++) ST(ctx, i === 1 ? PORT : SAIL, 360 + i * 180, 1190, 270, { shadow: false, arms: { L: [.4, -.2], R: [2.3 + Math.sin(t * 6 + i) * .3, .3] }, face: { eyes: 'happy', mouth: 'grin' } });
  tagS(ctx, 'PORTUGIS', 540, 520, '#e0392f', t, 8.66, 52);
  const sp = clamp((t - 8.9) / .3); sparkle(ctx, 760, 700, 50 * sp, sp);
} });
// 3a — 1498
SHOTS.push({ start: 9.63, end: 12.21, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950 }); sunrise(ctx, t, cam);
  redShip(ctx, lerp(380, 760, lt / 2.6), 1300, .92, t, 1, 1);
  overlay(ctx, () => kinetic(ctx, '1498', 540, 430, 280, lt, { delay: .4, col: '#ffd23a', pulse: true }));
} });
// 3b — Vasco da Gama
SHOTS.push({ start: 12.21, end: 14.49, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950 }); daySea(ctx, t, cam, 900);
  const z = backOut(sk(lt, 0, .4));
  ST(ctx, VASCO, 400, 1790 + (1 - z) * 120, 900, { bob: Math.sin(t * 3) * .004, arms: { L: [.4, -.1], R: { ik: [.2, -.74], bend: -1 } }, prop: telescopeProp, face: { eyes: 'normal', mouth: 'smile', look: [.8, -.2], browUp: 1 }, shadow: false });
  tagS(ctx, 'VASCO DA GAMA', 540, 330, '#8a1f2a', t, 13.61, 42);
} });
// 3c — Cape of Good Hope
SHOTS.push({ start: 14.49, end: 15.86, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950 }); daySea(ctx, t, cam, 900);
  capeProp(ctx, 330, 1330, 1.05, t); redShip(ctx, lerp(1250, 760, easeOut(sk(lt, 0, 1.3))), 1390, .75, t, 1, -1);
  tagS(ctx, 'TANJUNG HARAPAN', 540, 330, '#2f8f5b', t, 14.6, 40);
} });
// 3d — India in sight
SHOTS.push({ start: 15.86, end: 17.2, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); beachBG(ctx, t, cam, { ship: [760, .7] }); applyCam(ctx, cam, 1);
  sparkle(ctx, 540, 640, 70, sk(lt, .2, .5)); tagS(ctx, 'INDIA', 540, 520, '#e07a2f', t, 15.9, 52);
} });
// 4 — Europe, Africa, Asia linked by the sea
SHOTS.push({ start: 17.2, end: 22.85, tr: 'whip', draw(ctx, lt, t) {
  const cam = mapCam(t, [[17.2, 520, 230, .7], [20.0, 560, 230, .66], [22.85, 580, 240, .66]]);
  applyCam(ctx, cam, 1); worldMap(ctx, t, {});
  const p = easeOut(sk(lt, .3, 4.2)); mapRoute(ctx, ROUTE_VASCO, p, '#fff', 8, [22, 16], true);
  const [sx, sy, sa] = routePoint(ROUTE_VASCO, p); drawShip(ctx, sx, sy, .1, t, { flag: '#e0392f', hull: '#7a4a2a', ph: 1, flip: 1 });
  const pe = backOut(clamp((t - 19.84) / .3)), pa = backOut(clamp((t - 20.79) / .3)), ps = backOut(clamp((t - 22.09) / .3));
  mapPin(ctx, 490, 115, 'EROPA', '#2f63c9', pe, t, .9); mapPin(ctx, 545, 270, 'AFRIKA', '#e0a52a', pa, t, .9); mapPin(ctx, 760, 170, 'ASIA', '#e0392f', ps, t, .9);
} });
// 5 — Portuguese merchants bring chili to India (around 1542)
SHOTS.push({ start: 22.85, end: 28.08, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); beachBG(ctx, t, cam, { ship: [770, .6] }); applyCam(ctx, cam, 1);
  basketChili(ctx, 330, 1790, 1.1, 12, t); basketChili(ctx, 620, 1810, 1.0, 10, t);
  ST(ctx, SAIL, 180, 1650, 560, { arms: { L: [.5, -.4], R: [.5, -.4] }, face: { eyes: 'happy', mouth: 'smile' } });
  ST(ctx, PORT, 470, 1650, 560, { arms: { L: [.5, -.4], R: [.5, -.4] }, face: { eyes: 'smug', mouth: 'grin' } });
  ST(ctx, INDIAN, 900, 1650, 560, { flip: -1, arms: { L: [.4, -.1], R: lt > 1.5 ? { ik: [.2, -.5], bend: -1 } : [.4, -.1] }, face: { eyes: 'wide', mouth: 'smile', look: [-.7, .3], browUp: 1 } });
  tagS(ctx, 'DIDUGA', 540, 330, '#7a4bc4', t, 23.56, 44); tagS(ctx, 'PEDAGANG PORTUGIS', 330, 440, '#2a3f8f', t, 25.1, 36); tagS(ctx, 'INDIA', 800, 440, '#e07a2f', t, 25.67, 40);
  overlay(ctx, () => { tagPill(ctx, 540, 560, 'SEKITAR', '#e0392f', (t - 26.13) / .3, 40); kinetic(ctx, '1542', 540, 720, 220, lt, { delay: 4.03, col: '#ffd23a', pulse: true }); });
} });
// 6a — Indian farmers plant chili
SHOTS.push({ start: 28.08, end: 29.97, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); applyCam(ctx, cam, .08); drawSky(ctx, '#ffb96a', '#fff0c6', -300, 1000); applyCam(ctx, cam, .1); drawSun(ctx, 860, 330, 90, t, 1.1);
  applyCam(ctx, cam, .15); drawCloud(ctx, 190, 420, 110, 5); applyCam(ctx, cam, .55); drawPalm(ctx, 90, 1090, .9, t); drawPalm(ctx, 1010, 1100, 1.0, t + 1);
  applyCam(ctx, cam, 1); drawField(ctx, 1110, 2400);
  const grow = sk(lt, .4, 1.8);
  for (const [px, py, sc, d] of [[190, 1380, .85, 0], [500, 1420, .9, .15], [830, 1380, .85, .3]]) drawChiliPlant(ctx, px, py, sc, clamp(grow * 1.3 - d * .3), t);
  const bend = Math.max(0, Math.sin(lt * 4));
  ST(ctx, INDIAN, 340, 1700, 700, { arms: { L: [.5, -.2], R: { ik: [.1, lerp(-.6, -.22, bend)], bend: -1 } }, face: { eyes: 'happy', mouth: 'smile', look: [0, .6] }, lean: bend * .1 });
  ST(ctx, INDIAN2, 800, 1710, 700, { flip: -1, arms: { L: [.4, -.2], R: { ik: [.1, lerp(-.6, -.22, Math.max(0, Math.sin(lt * 4 + 2)))], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin' } });
  tagS(ctx, 'PETANI INDIA', 540, 320, '#e07a2f', t, 28.82, 44);
} });
// 6b — it spreads across Asia
SHOTS.push({ start: 29.97, end: 33.16, tr: 'whip', draw(ctx, lt, t) {
  const cam = mapCam(t, [[29.97, 700, 260, 1.1], [33.16, 740, 215, .8]]);
  applyCam(ctx, cam, 1); worldMap(ctx, t, {});
  const pts = [[690, 252], [760, 190], [830, 140], [740, 290], [830, 300], [880, 200], [700, 150]];
  pts.forEach(([mx, my], i) => { const a = backOut(clamp((t - 30.3 - i * .3) / .3)); if (a > 0) { const [px, py] = mapPt(mx, my); drawChiliPod(ctx, px, py - 20, 1.0 * a, -.4 + i * .3, CHILI_RED); sparkle(ctx, px + 40, py - 60, 26 * a, a * (1 - clamp((t - 31.0 - i * .3) / .5))); } });
  mapRoute(ctx, [[686, 258], [760, 190], [830, 140]], clamp((t - 30.3) / 1.6), '#fff', 8, [20, 14], true);
  mapRoute(ctx, [[686, 258], [740, 290], [830, 300]], clamp((t - 30.6) / 1.6), '#fff', 8, [20, 14], true);
  mapPin(ctx, 688, 255, 'INDIA', '#e07a2f', backOut(clamp((t - 29.97) / .3)), t, .9);
  ctx.setTransform(1, 0, 0, 1, 0, 0); tagPill(ctx, 540, 330, 'WILAYAH ASIA', '#e0392f', (t - 31.97) / .3, 46);
} });
// 7 — why so fast?
SHOTS.push({ start: 33.16, end: 35.42, tr: 'whip', draw(ctx, lt, t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const bg = ctx.createRadialGradient(540, 900, 50, 540, 900, 1400); bg.addColorStop(0, '#ffb33d'); bg.addColorStop(1, '#d4521a'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 900); ctx.rotate(t * .12); ctx.fillStyle = 'rgba(255,240,150,.15)'; for (let i = 0; i < 14; i++) { ctx.rotate(TAU / 14); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-90, -1500); ctx.lineTo(90, -1500); ctx.closePath(); ctx.fill(); } ctx.restore();
  const pop = backOut(sk(lt, 0, .4)); ctx.save(); ctx.translate(540, 1060); ctx.scale(pop, pop); ctx.rotate(Math.sin(t * 4) * .06); drawChiliPod(ctx, 0, 0, 3.4, -.5, CHILI_RED); ctx.restore();
  ST(ctx, INDIAN, 190, 1790, 560, { arms: { L: [.5, -.3], R: [2.3, .3] }, face: { eyes: 'wide', mouth: 'o', look: [.8, -.3], browUp: 1 } });
  ST(ctx, SAIL, 890, 1790, 560, { flip: -1, arms: { L: [.5, -.3], R: [2.3, .3] }, face: { eyes: 'wide', mouth: 'o', look: [-.8, -.3], browUp: 1 } });
  questionMark(ctx, 160, 560, .9, sk(lt, .8, 1.1), t); questionMark(ctx, 920, 540, 1.0, sk(lt, 1.1, 1.4), t + 1);
  overlay(ctx, () => { kinetic(ctx, 'KENAPA CEPAT', 540, 330, 110, lt, { delay: .1, col: '#fff' }); kinetic(ctx, 'DITERIMA?', 540, 480, 150, lt, { delay: .7, col: '#ffd23a', pulse: true }); });
} });
// 8a — easy to grow in the tropics
SHOTS.push({ start: 35.42, end: 38.56, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); applyCam(ctx, cam, .08); drawSky(ctx, '#3ea6ee', '#fff0c6', -300, 1000); applyCam(ctx, cam, .1); drawSun(ctx, 820, 300, 110, t, 1.4);
  applyCam(ctx, cam, .15); drawCloud(ctx, 200, 420, 110, 5); applyCam(ctx, cam, .55); drawPalm(ctx, 90, 1090, 1.0, t); drawPalm(ctx, 990, 1100, 1.1, t + 1);
  applyCam(ctx, cam, 1); drawField(ctx, 1110, 2400);
  const grow = easeOut(sk(lt, .6, 2.6));
  for (const [px, py, sc] of [[190, 1400, 1.0], [540, 1450, 1.15], [890, 1400, 1.0]]) drawChiliPlant(ctx, px, py, sc, grow, t);
  tagS(ctx, 'MUDAH TUMBUH', 540, 320, '#3fa35b', t, 36.71, 46); tagS(ctx, 'DAERAH TROPIS', 540, 440, '#e07a1a', t, 37.64, 42);
} });
// 8b — lots of fruit
SHOTS.push({ start: 38.56, end: 40.59, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); applyCam(ctx, cam, .08); drawSky(ctx, '#3ea6ee', '#fff0c6', -300, 1000); applyCam(ctx, cam, .55); drawPalm(ctx, 90, 1090, 1.0, t);
  applyCam(ctx, cam, 1); drawField(ctx, 1110, 2400);
  for (const [px, py, sc] of [[190, 1420, 1.15], [540, 1470, 1.3], [890, 1420, 1.15]]) drawChiliPlant(ctx, px, py, sc, 1, t);
  for (let i = 0; i < 14; i++) { const a = backOut(clamp((lt - .1 - i * .1) / .25)); if (a > 0) drawChiliPod(ctx, 120 + (i % 7) * 140 + Math.sin(i) * 20, 1250 + Math.floor(i / 7) * 110, .8 * a, -.5 + i * .4, CHILI_RED); }
  tagS(ctx, 'BANYAK BUAH', 540, 330, '#e0392f', t, 39.52, 48);
} });
// 8c — strong heat
SHOTS.push({ start: 40.59, end: 42.51, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 980 }); ctx.save(); ctx.filter = 'blur(7px)'; applyCam(ctx, cam, .08); drawSky(ctx, '#ffb96a', '#fff0c6', -300, 1000); applyCam(ctx, cam, 1); drawField(ctx, 1110, 2400); ctx.restore();
  applyCam(ctx, cam, 1);
  const hot = sk(lt, .9, 1.15), shk = hot > 0 ? shake(t * 9, 10 * hot, 3) : [0, 0];
  ctx.save(); ctx.translate(shk[0], shk[1]);
  ST(ctx, INDIAN, 540, 2180, 1300, { arms: { L: hot > 0 ? [2.5, .3] : [.3, -.1], R: { ik: [.02, -.68], bend: -1 } }, prop: bigPodProp(.0019), face: hot > 0 ? { eyes: 'wide', mouth: 'o', pupil: .3, browUp: 1 } : { eyes: 'squint', mouth: 'grin' }, shadow: false });
  if (hot > 0) { circle(ctx, 540, 2180 - .765 * 1300, .19 * 1300); ctx.fillStyle = `rgba(255,50,35,${.45 * hot})`; ctx.fill(); flame(ctx, 540, 2180 - .68 * 1300 + 40, 1.5 * hot, t, hot, 0); flame(ctx, 470, 2180 - .67 * 1300 + 30, 1.0 * hot, t + 1, hot, -.5); flame(ctx, 610, 2180 - .67 * 1300 + 30, 1.0 * hot, t + 2, hot, .5); sweat(ctx, 330, 960, 52, hot); sweat(ctx, 760, 980, 44, hot); }
  ctx.restore();
  const bp = backOut(clamp((t - 41.49) / .25)); if (bp > 0) { ctx.save(); ctx.translate(540, 420); ctx.rotate(-.08); ctx.scale(bp, bp); burst(ctx, 0, 0, 320, 13, '#ffd23a', 5); text(ctx, 'PEDAS!', 0, 0, 120, '#e0392f', INK, 20); ctx.restore(); }
} });
// 9 — the merchants are interested
SHOTS.push({ start: 42.51, end: 46.32, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); beachBG(ctx, t, cam, { ship: [780, .55] }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 3; i++) ST(ctx, i === 1 ? PORT : SAIL, 220 + i * 320, 1690, 600, { bob: Math.sin(t * 4 + i) * .008, arms: { L: [.5, -.3], R: { ik: [.2, -.6], bend: -1 } }, prop: podProp, face: { eyes: 'wide', mouth: 'grin', browUp: 1 }, shadow: true });
  overlay(ctx, () => coinShower(ctx, t, sk(lt, .6, 1.0), 16, 4));
  tagS(ctx, 'PEDAGANG', 540, 330, '#2a3f8f', t, 42.94, 46);
  overlay(ctx, () => kinetic(ctx, 'MENARIK!', 540, 470, 140, lt, { delay: 3.19, col: '#ffd23a', pulse: true }));
  const sp = sk(lt, 1.6, 1.9); sparkle(ctx, 300, 1000, 50 * sp, sp); sparkle(ctx, 640, 960, 40 * sp, sp); sparkle(ctx, 940, 1010, 46 * sp, sp);
} });
// 10 — the journey is not over
SHOTS.push({ start: 46.32, end: 49.23, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950 }); sunrise(ctx, t, cam);
  redShip(ctx, lerp(300, 880, easeIn(sk(lt, .2, 2.9))), 1300, .9, t, 1, 1);
  overlay(ctx, () => { kinetic(ctx, 'BELUM', 540, 420, 190, lt, { delay: 1.5, col: '#fff' }); kinetic(ctx, 'SELESAI', 540, 600, 190, lt, { delay: 1.9, col: '#ffd23a', pulse: true }); });
} });
// 11 — next stop: Southeast Asia, the Nusantara
SHOTS.push({ start: 49.23, end: 60, tr: 'cut', draw(ctx, lt, t) {
  const cam = mapCam(t, [[49.23, 700, 250, .9], [51.0, 770, 280, 1.2], [52.8, 835, 300, 1.5], [60, 835, 300, 1.5]]);
  applyCam(ctx, cam, 1); worldMap(ctx, t, {});
  mapPin(ctx, 688, 255, 'INDIA', '#e07a1a', 1, t, .8);
  const p = clamp((t - 49.5) / 3.0); mapRoute(ctx, ROUTE_ASEAN, p, '#fff', 8, [20, 14], true);
  const [px, py] = routePoint(ROUTE_ASEAN, p); drawChiliPod(ctx, px, py - 50 - Math.abs(Math.sin(t * 5)) * 18, 1.0, -.4 + Math.sin(t * 5) * .2, CHILI_RED);
  const ip = backOut(clamp((t - 52.51) / .35)); mapPin(ctx, 835, 305, 'NUSANTARA', '#e0392f', ip, t, 1.0);
  if (ip > 0) { const [ix, iy] = mapPt(835, 305); questionMark(ctx, ix + 10, iy - 320, .8 * ip, ip, t); }
  ctx.setTransform(1, 0, 0, 1, 0, 0); tagPill(ctx, 540, 330, 'ASIA TENGGARA', '#e0392f', (t - 50.35) / .3, 46);
  const bs = backOut(clamp((t - 53.6) / .4)); if (bs > 0) { ctx.save(); ctx.translate(540, 1560); ctx.scale(bs, bs); rrect(ctx, -380, -60, 760, 120, 60); fillStroke(ctx, '#e0392f', 7); text(ctx, 'BERSAMBUNG KE PART 4', 0, 0, 50, '#fff'); ctx.restore(); }
} });
