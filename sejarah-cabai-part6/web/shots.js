// ---------- Sejarah Cabai, Part 6: Bagaimana Cabai Menguasai Dapur Indonesia? ----------
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
// 1 — shortly after arriving in the Nusantara
SHOTS.push({ start: 0, end: 2.22, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950 }); daySea(ctx, t, cam, 900); island(ctx, 820, 930, 1.0, t);
  redShip(ctx, lerp(150, 520, easeOut(sk(lt, 0, 1.8))), 1330, .9, t, 1, 1);
  const cp = backOut(sk(lt, .6, 1.0)); ctx.save(); ctx.translate(330, 760); ctx.scale(cp, cp); ctx.rotate(Math.sin(t * 3) * .1); drawChiliPod(ctx, 0, 0, 2.0, -.5, CHILI_RED); ctx.restore();
  tagS(ctx, 'NUSANTARA', 700, 540, '#2f8f5b', t, 1.0, 44);
} });
// 2 — farmers plant chili in paddies and gardens, quickly popular
SHOTS.push({ start: 2.22, end: 6.51, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); kebunBG(ctx, t, cam); applyCam(ctx, cam, 1);
  const grow = sk(lt, .6, 3.0);
  for (const [px, py, sc, d] of [[150, 1480, .8, 0], [400, 1500, .85, .1], [650, 1480, .8, .2], [900, 1500, .85, .3]]) drawChiliPlant(ctx, px, py, sc, clamp(grow * 1.3 - d), t);
  const bend = Math.max(0, Math.sin(lt * 4));
  ST(ctx, LOCAL, 280, 1740, 560, { arms: { L: [.5, -.2], R: { ik: [.1, lerp(-.6, -.22, bend)], bend: -1 } }, face: { eyes: 'happy', mouth: 'smile', look: [0, .6] }, lean: bend * .1 });
  ST(ctx, LOCAL2, 800, 1750, 560, { flip: -1, arms: { L: [.4, -.2], R: { ik: [.1, lerp(-.6, -.22, Math.max(0, Math.sin(lt * 4 + 2)))], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin' } });
  tagS(ctx, 'SAWAH DAN KEBUN', 540, 330, '#3fa35b', t, 2.4, 42);
  overlay(ctx, () => { kinetic(ctx, 'TIDAK LAMA', 540, 470, 110, lt, { delay: 1.0, col: '#fff', exit: 3.2 }); kinetic(ctx, 'POPULER!', 540, 470, 140, lt, { delay: 3.37, col: '#ffd23a', pulse: true }); });
} });
// 3 — tropical climate
SHOTS.push({ start: 6.51, end: 9.85, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); applyCam(ctx, cam, .08); drawSky(ctx, '#3ea6ee', '#fff0c6', -300, 1000); applyCam(ctx, cam, .1); drawSun(ctx, 820, 300, 120, t, 1.5);
  applyCam(ctx, cam, .15); drawCloud(ctx, 200, 420, 130, 5); drawCloud(ctx, 560, 300, 100, 7); applyCam(ctx, cam, .55); drawPalm(ctx, 90, 1090, 1.0, t); drawPalm(ctx, 990, 1100, 1.1, t + 1);
  applyCam(ctx, cam, 1); sawah(ctx, t, 1130);
  const grow = easeOut(sk(lt, .3, 2.6)); for (const [px, py, sc] of [[190, 1480, 1.0], [540, 1530, 1.15], [890, 1480, 1.0]]) drawChiliPlant(ctx, px, py, sc, grow, t);
  sunRain(ctx, t, .5 * sk(lt, .5, 1.0));
  tagS(ctx, 'IKLIM TROPIS', 540, 330, '#e07a1a', t, 6.75, 48);
  overlay(ctx, () => kinetic(ctx, 'COCOK!', 540, 480, 150, lt, { delay: 1.45, col: '#ffd23a', pulse: true }));
} });
// 4 — easy to grow, lots of fruit, harvest
SHOTS.push({ start: 9.85, end: 14.82, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); kebunBG(ctx, t, cam); applyCam(ctx, cam, 1);
  for (const [px, py, sc] of [[130, 1500, 1.1], [450, 1530, 1.2], [800, 1500, 1.1], [1060, 1530, 1.1]]) drawChiliPlant(ctx, px, py, sc, 1, t);
  const pick = Math.sin(lt * 4);
  ST(ctx, LOCAL, 250, 1760, 600, { arms: { L: [.5, -.3], R: { ik: [.25 + pick * .05, -.62 + Math.abs(pick) * .06], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin' }, headTilt: pick * .02 });
  basketChili(ctx, 700, 1790, 1.2, Math.min(12, 4 + Math.floor(lt * 2.4)), t);
  tagS(ctx, 'MUDAH DITANAM', 330, 330, '#3fa35b', t, 11.35, 40); tagS(ctx, 'BANYAK BUAH', 760, 450, '#e0392f', t, 13.31, 44);
} });
// 5 — regional dishes
SHOTS.push({ start: 14.82, end: 19.14, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); villageBG(ctx, t, cam); applyCam(ctx, cam, 1);
  const st = Math.sin(t * 6); ST(ctx, IBU, 540, 1620, 560, { bob: Math.abs(st) * .004, arms: { L: [.5, -.3], R: { ik: [.25 + st * .05, -.4], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin' } });
  cookPot(ctx, 150, 1700, .8, t);
  [['nasi', 330, 1160, 16.11], ['sate', 770, 1120, 16.68], ['rendang', 270, 880, 17.27], ['gado', 790, 860, 17.92]].forEach(([k, x, y, at]) => { const a = backOut(clamp((t - at) / .35)); if (a > 0) dish(ctx, x, y, .62 * a, k, t); });
  tagS(ctx, 'MASAKAN DAERAH', 540, 330, '#e07a1a', t, 17.92, 44);
} });
// 6 — grinding sambal, different ingredients
SHOTS.push({ start: 19.14, end: 23.7, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); villageBG(ctx, t, cam); applyCam(ctx, cam, 1);
  const g = Math.sin(t * 7); ST(ctx, IBU, 540, 1560, 540, { bob: Math.abs(g) * .004, arms: { L: [.5, -.4], R: { ik: [.2 + g * .05, -.33], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin' } });
  drawCobek(ctx, 540, 1700, .85, t); sambalType(ctx, 170, 1730, .5, 'ijo', t); sambalType(ctx, 910, 1730, .5, 'matah', t);
  steam(ctx, 540, 1560, 1.1, t, .6);
  tagS(ctx, 'SAMBAL', 540, 330, '#e0392f', t, 20.55, 56);
  overlay(ctx, () => kinetic(ctx, 'BERBEDA-BEDA', 540, 470, 100, lt, { delay: 3.52, col: '#ffd23a', pulse: true }));
} });
// 7 — a few of the many sambals
SHOTS.push({ start: 23.7, end: 30.43, tr: 'whip', draw(ctx, lt, t) {
  rays(ctx, t, '#ffcf6a', '#c4521a', 800);
  [['terasi', 300, 760, 24.2, 'SAMBAL TERASI', '#8a2a14'], ['bawang', 790, 760, 25.55, 'SAMBAL BAWANG', '#d92b1c'], ['ijo', 300, 1130, 26.78, 'SAMBAL IJO', '#4a9a3a'], ['matah', 790, 1130, 28.05, 'SAMBAL MATAH', '#e08a1e']].forEach(([k, x, y, at, lab, col]) => { const a = backOut(clamp((t - at) / .4)); if (a > 0) { sambalType(ctx, x, y, 1.05 * a, k, t, .5); tagPill(ctx, x, y - 200, lab, col, a, 34); } });
  tagS(ctx, 'DAN MASIH BANYAK LAGI', 540, 1560, '#2f63c9', t, 29.13, 40);
} });
// 8 — 212 kinds of sambal
SHOTS.push({ start: 30.43, end: 35.84, tr: 'whip', draw(ctx, lt, t) {
  rays(ctx, t, '#ffd89a', '#b8501a', 950);
  const kinds = ['terasi', 'bawang', 'ijo', 'matah', 'plain']; let n = 0;
  for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++, n++) { const a = backOut(clamp((lt - .5 - n * .06) / .3)); if (a > 0) sambalType(ctx, 130 + c * 205 + (r % 2) * 40, 760 + r * 190, .34 * a, kinds[(r + c) % 5], t); }
  tagS(ctx, 'PENELITIAN KULINER', 540, 330, '#7a4bc4', t, 30.88, 40);
  overlay(ctx, () => { kinetic(ctx, '212', 540, 520, 280, lt, { delay: 2.9, col: '#ffd23a', pulse: true }); kinetic(ctx, 'JENIS SAMBAL', 540, 1560, 100, lt, { delay: 3.8, col: '#fff' }); });
} });
// 9 — chili in the era of forced cultivation
SHOTS.push({ start: 35.84, end: 40.71, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); kebunBG(ctx, t, cam); applyCam(ctx, cam, 1);
  for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) drawChiliPlant(ctx, 100 + i * 190 + r * 60, 1440 + r * 140, .8, 1, t);
  for (let i = 0; i < 3; i++) { const w = Math.sin(t * 4 + i); ST(ctx, i % 2 ? LOCAL : LOCAL2, 200 + i * 340, 1780, 430, { arms: { L: [.5, -.3], R: { ik: [.25 + w * .05, -.5 + Math.abs(w) * .06], bend: -1 } }, face: { eyes: 'normal', mouth: 'flat', look: [0, .5] }, shadow: true }); }
  tagS(ctx, 'DIBUDIDAYAKAN', 540, 330, '#3fa35b', t, 38.27, 44);
  overlay(ctx, () => { kinetic(ctx, 'MASA', 540, 470, 120, lt, { delay: 3.52, col: '#fff' }); kinetic(ctx, 'TANAM PAKSA', 540, 610, 130, lt, { delay: 3.8, col: '#ffd23a', pulse: true }); });
} });
// 10 — a foreign plant arriving by sea trade
SHOTS.push({ start: 40.71, end: 43.87, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950 }); daySea(ctx, t, cam, 900);
  redShip(ctx, lerp(900, 560, easeOut(sk(lt, 0, 3))), 1330, .95, t, 1, -1);
  spiceSack(ctx, 200, 1600, .7, 'clove'); basketChili(ctx, 900, 1620, 1.0, 10, t);
  tagS(ctx, 'TANAMAN ASING', 540, 330, '#e0392f', t, 41.26, 46); tagS(ctx, 'PERDAGANGAN LAUT', 540, 450, '#2f63c9', t, 42.41, 40);
} });
// 11 — part of everyday family life
SHOTS.push({ start: 43.87, end: 48.33, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); warungBG(ctx, t, cam, {}); applyCam(ctx, cam, 1);
  ST(ctx, LOCAL, 200, 1560, 520, { bob: Math.sin(t * 3) * .005, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'happy', mouth: 'grin' }, shadow: false });
  ST(ctx, IBU, 540, 1580, 520, { bob: Math.sin(t * 3 + 1) * .005, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'happy', mouth: 'smile' }, shadow: false });
  ST(ctx, LOCAL2, 870, 1620, 400, { flip: -1, bob: Math.sin(t * 3 + 2) * .006, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'happy', mouth: 'grin' }, shadow: false });
  drawTable(ctx, -200, 1300, 1330, 1800); dish(ctx, 200, 1350, .5, 'nasi', t); dish(ctx, 880, 1350, .5, 'sate', t); sambalType(ctx, 540, 1345, .6, 'terasi', t, .5);
  for (let i = 0; i < 5; i++) { const ph = (lt * .5 + i * .2) % 1; heart(ctx, 200 + i * 170, 1000 - ph * 260, .7, '#e0392f', Math.sin(ph * Math.PI) * sk(lt, .8, 1.2)); }
  tagS(ctx, 'KEHIDUPAN MASYARAKAT', 540, 330, '#e07a1a', t, 46.37, 36);
} });
// 12 — hard to imagine without chili; funny finish
SHOTS.push({ start: 48.33, end: 60, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); warungBG(ctx, t, cam, {}); applyCam(ctx, cam, 1);
  const hot = sk(t, 51.2, 51.5), shk = hot > 0 && t < 53.5 ? shake(t * 9, 8 * hot, 3) : [0, 0];
  const e = eatPose(lt, 1.4, [.22, -.27]);
  ctx.save(); ctx.translate(shk[0], shk[1]);
  ST(ctx, BUDI, 460, 1560, 780, { arms: hot > 0 ? { L: [2.5, .3], R: [2.5, .3] } : e.arms, face: hot > 0 ? { eyes: 'wide', mouth: 'o', pupil: .3, browUp: 1 } : chewFace(e.chew, lt), prop: hot > 0 ? undefined : spoonProp, shadow: false });
  if (hot > 0) { circle(ctx, 460, 1560 - .765 * 780, .19 * 780); ctx.fillStyle = `rgba(255,50,35,${.4 * hot})`; ctx.fill(); flame(ctx, 460, 1560 - .68 * 780 + 30, 1.0 * hot, t, hot, 0); sweat(ctx, 330, 1000, 40, hot); sweat(ctx, 600, 1010, 34, hot); }
  ctx.restore();
  drawTable(ctx, -200, 1300, 1330, 1800); sambalType(ctx, 650, 1345, .8, 'terasi', t, hot > 0 ? 0 : .7);
  if (hot > 0) { const w = sk(t, 52.0, 52.3); waterGlass(ctx, 900, 1330 - w * 120, 1.2, 1 - w * .5); }
  const bp = backOut(sk(t, 51.5, 51.8)) * (1 - sk(t, 53.0, 53.3)); if (bp > 0) { ctx.save(); ctx.translate(560, 700); ctx.rotate(-.08); ctx.scale(bp, bp); burst(ctx, 0, 0, 300, 13, '#ffd23a', 5); text(ctx, 'PEDAS!', 0, 0, 110, '#e0392f', INK, 20); ctx.restore(); }
  const k = backOut(sk(lt, 5.0, 5.5)); if (k > 0) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.save(); ctx.translate(540, 450); ctx.scale(k, k); ctx.font = '700 36px Poppins'; const w = ctx.measureText('Bersambung ke Part 7').width + 60; rrect(ctx, -w / 2, -34, w, 68, 34); fillStroke(ctx, '#e0392f', 7); text(ctx, 'Bersambung ke Part 7', 0, 2, 36, '#fff', INK, 0, 'Poppins', 700); ctx.restore(); }
} });
