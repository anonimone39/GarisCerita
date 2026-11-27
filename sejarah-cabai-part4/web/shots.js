// ---------- Sejarah Cabai, Part 4: Cabai Akhirnya Tiba di Nusantara ----------
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
const island = (ctx, x, y, s, t) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ellipse(ctx, 0, 0, 260, 50); fillStroke(ctx, '#f0d896', 6); ctx.fillStyle = '#6fa85a'; ellipse(ctx, 0, -22, 200, 32); ctx.fill(); drawPalm(ctx, -90, -10, .5, t); drawPalm(ctx, 20, -6, .6, t + 1); drawPalm(ctx, 110, -8, .45, t + 2); ctx.restore(); };

// 1 — 16th century: the Nusantara, centre of world trade
SHOTS.push({ start: 0, end: 5.76, tr: 'whip', draw(ctx, lt, t) {
  const cam = mapCam(t, [[0, 520, 230, .62], [1.8, 780, 285, 1.0], [5.76, 850, 290, 1.1]]);
  applyCam(ctx, cam, 1); worldMap(ctx, t, {}); extraIslands(ctx, t, 1);
  const trade = [[[686, 258], [760, 285], [820, 300]], [[880, 170], [870, 240], [850, 285]], [[478, 125], [600, 200], [700, 260], [800, 295]]];
  trade.forEach((r, i) => mapRoute(ctx, r, clamp((t - 3.7 - i * .35) / 1.2), '#fff', 8, [20, 14], true));
  mapPin(ctx, 835, 300, 'NUSANTARA', '#e0392f', backOut(clamp((t - 1.53) / .3)), t, .9);
  overlay(ctx, () => { kinetic(ctx, 'ABAD KE-16', 540, 330, 120, lt, { delay: .1, col: '#ffd23a', pulse: true }); tagPill(ctx, 540, 470, 'PALING PENTING', '#2f63c9', (t - 3.7) / .3, 42); });
} });
// 2a — Maluku: the spice islands
SHOTS.push({ start: 5.76, end: 9.71, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); beachBG(ctx, t, cam, { ship: [790, .5] }); applyCam(ctx, cam, 1);
  cloveTree(ctx, 140, 1330, .95, t); cloveTree(ctx, 960, 1340, 1.0, t + 1);
  spiceSack(ctx, 560, 1790, .9, 'clove');
  const pick = Math.sin(lt * 4);
  ST(ctx, LOCAL, 380, 1680, 560, { arms: { L: [.5, -.3], R: { ik: [.28, -.62 + Math.abs(pick) * .06], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin' } });
  ST(ctx, LOCAL2, 760, 1690, 560, { flip: -1, arms: { L: [.4, -.2], R: { ik: [.28, -.6 + Math.abs(Math.sin(lt * 3.4)) * .06], bend: -1 } }, face: { eyes: 'happy', mouth: 'smile' } });
  tagS(ctx, 'MALUKU', 540, 330, '#e0392f', t, 6.18, 56); tagS(ctx, 'REMPAH-REMPAH', 540, 450, '#e07a1a', t, 7.84, 42);
} });
// 2b — cloves and nutmeg
SHOTS.push({ start: 9.71, end: 11.46, tr: 'whip', draw(ctx, lt, t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const bg = ctx.createRadialGradient(540, 900, 50, 540, 900, 1400); bg.addColorStop(0, '#ffcf6a'); bg.addColorStop(1, '#c4521a'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 900); ctx.rotate(t * .12); ctx.fillStyle = 'rgba(255,240,150,.15)'; for (let i = 0; i < 14; i++) { ctx.rotate(TAU / 14); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-90, -1500); ctx.lineTo(90, -1500); ctx.closePath(); ctx.fill(); } ctx.restore();
  const a = backOut(sk(lt, 0, .3)), b = backOut(sk(lt, .4, .7));
  ctx.save(); ctx.translate(290, 1150); ctx.scale(1.6 * a, 1.6 * a); spiceSack(ctx, 0, 0, 1, 'clove'); ctx.restore();
  ctx.save(); ctx.translate(790, 1150); ctx.scale(1.6 * b, 1.6 * b); spiceSack(ctx, 0, 0, 1, 'pala'); ctx.restore();
  nutmegFruit(ctx, 790, 760, 1.5 * b, 1, Math.sin(t * 3) * .1);
  tagS(ctx, 'CENGKIH', 290, 560, '#e8587a', t, 10.12, 46); tagS(ctx, 'PALA', 790, 560, '#c0392b', t, 10.79, 46);
  const sp = sk(lt, .9, 1.2); sparkle(ctx, 460, 700, 60 * sp, sp); sparkle(ctx, 640, 640, 40 * sp, sp);
} });
// 3 — merchants of many nations
SHOTS.push({ start: 11.46, end: 16.09, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950 }); daySea(ctx, t, cam, 900);
  flagShip(ctx, 160, 1000, .36, t, '#2f8f5b', 1); flagShip(ctx, 430, 1010, .38, t, '#2f63c9', 2); flagShip(ctx, 700, 1005, .36, t, '#e0392f', 3); spanShip(ctx, 960, 1000, .34, t, 4);
  pierFront(ctx, 1420);
  const who = [PORT, ARAB, CHIN, LOCAL];
  who.forEach((c, i) => ST(ctx, c, 170 + i * 250, 1580, 450, { bob: Math.sin(t * 3 + i) * .006, arms: { L: [.5, -.3], R: [2.3 + Math.sin(t * 5 + i) * .25, .3] }, face: { eyes: 'happy', mouth: 'grin' } }));
  tagS(ctx, 'BERBAGAI BANGSA', 540, 330, '#2f63c9', t, 12.24, 46);
  overlay(ctx, () => coinShower(ctx, t, sk(t, 14.0, 14.4), 16, 5));
  tagS(ctx, 'REMPAH', 540, 450, '#e07a1a', t, 15.38, 46);
} });
// 4 — in the market, chili appears
SHOTS.push({ start: 16.09, end: 21.74, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); beachBG(ctx, t, cam, {}); applyCam(ctx, cam, 1);
  rrect(ctx, -100, 1500, 1300, 360, 0); fillStroke(ctx, '#9a5a2c', 6); rrect(ctx, -120, 1450, 1340, 70, 14); fillStroke(ctx, '#d79a5a', 6);
  spiceSack(ctx, 170, 1490, .75, 'clove'); spiceSack(ctx, 930, 1490, .75, 'pala');
  const pp = backOut(clamp((t - 19.25) / .35)); if (pp > 0) { drawChiliPlant(ctx, 540, 1500, 1.25 * pp, 1, t); sparkle(ctx, 640, 1000, 60 * pp, pp); }
  ST(ctx, LOCAL, 250, 1430, 520, { bob: Math.sin(t * 3) * .005, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'normal', mouth: 'smile', look: [.7, .3] }, shadow: false });
  ST(ctx, ARAB, 830, 1440, 520, { flip: -1, bob: Math.sin(t * 3 + 1) * .005, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'wide', mouth: 'o', look: [-.7, .3], browUp: 1 }, shadow: false });
  questionMark(ctx, 250, 760, .8, sk(lt, 3.5, 3.8), t); questionMark(ctx, 840, 740, .8, sk(lt, 3.7, 4.0), t + 1);
  tagS(ctx, 'CABAI', 540, 330, '#e0392f', t, 19.25, 56); tagS(ctx, 'NUSANTARA', 540, 450, '#2f8f5b', t, 20.79, 42);
} });
// 5a — a Portuguese ship enters the waters of Maluku
SHOTS.push({ start: 21.74, end: 23.05, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950 }); daySea(ctx, t, cam, 900);
  island(ctx, 820, 930, 1.0, t); redShip(ctx, lerp(150, 520, easeOut(sk(lt, 0, 1.3))), 1330, .9, t, 1, 1);
  tagS(ctx, 'PORTUGIS', 300, 520, '#e0392f', t, 22.03, 46); tagS(ctx, 'DIDUGA', 780, 620, '#7a4bc4', t, 22.64, 44);
} });
// 5b — merchants meet the locals
SHOTS.push({ start: 23.05, end: 25.91, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); beachBG(ctx, t, cam, { ship: [770, .5] }); applyCam(ctx, cam, 1);
  basketChili(ctx, 540, 1790, 1.3, 12, t);
  ST(ctx, PORT, 230, 1660, 560, { arms: { L: [.5, -.3], R: { ik: [.3, -.55], bend: -1 } }, face: { eyes: 'smug', mouth: 'grin' } });
  ST(ctx, LOCAL, 850, 1660, 560, { flip: -1, arms: { L: [.5, -.3], R: { ik: [.3, -.55], bend: -1 } }, face: { eyes: 'wide', mouth: 'smile', look: [-.6, .4], browUp: 1 } });
  const sp = sk(lt, .35, .65); sparkle(ctx, 540, 1470, 60 * sp, sp * (1 - sk(lt, 1.6, 2.2)));
  tagS(ctx, 'JALUR PERDAGANGAN ASIA', 540, 330, '#2a3f8f', t, 24.61, 38);
} });
// 6 — Spain also played a part
SHOTS.push({ start: 25.91, end: 30.72, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950 }); daySea(ctx, t, cam, 900);
  const a = 1 - sk(lt, .4, 1.2) * .55; ctx.save(); ctx.globalAlpha = a; redShip(ctx, 210, 1060, .5, t, 1, 1); ctx.restore();
  spanShip(ctx, lerp(900, 640, easeOut(sk(lt, 1.0, 4.8))), 1330, .95, t, 2, -1);
  tagS(ctx, 'SELAIN PORTUGIS', 300, 520, '#e0392f', t, 26.19, 38); tagS(ctx, 'SPANYOL', 700, 620, '#e0a52a', t, 27.66, 50);
  const sp = sk(lt, 2.2, 2.5); sparkle(ctx, 760, 760, 55 * sp, sp);
} });
// 7 — via the Philippines
SHOTS.push({ start: 30.72, end: 35.25, tr: 'whip', draw(ctx, lt, t) {
  const cam = mapCam(t, [[30.72, 830, 250, 1.0], [35.25, 880, 262, 1.35]]);
  applyCam(ctx, cam, 1); worldMap(ctx, t, {}); extraIslands(ctx, t, 1);
  mapPin(ctx, 886, 232, 'FILIPINA', '#e0a52a', backOut(clamp((t - 31.36) / .3)), t, .8);
  mapRoute(ctx, [[998, 160], [940, 195], [890, 228]], clamp((t - 31.4) / 1.3), '#ffe14d', 8, [20, 14], true);
  mapRoute(ctx, [[890, 232], [884, 266], [860, 296]], clamp((t - 33.0) / 1.5), '#ffe14d', 8, [20, 14], true);
  const [sx, sy] = routePoint([[998, 160], [940, 195], [890, 228]], clamp((t - 31.4) / 1.3)); spanShip(ctx, sx, sy, .1, t, 2, -1);
  ctx.setTransform(1, 0, 0, 1, 0, 0); tagPill(ctx, 540, 330, 'PENGARUH SPANYOL', '#e0a52a', (t - 32.5) / .3, 44); tagPill(ctx, 540, 450, 'ASIA TENGGARA', '#e0392f', (t - 34.44) / .3, 44);
} });
// 8a — Minahasa on the map
SHOTS.push({ start: 35.25, end: 38.03, tr: 'cut', draw(ctx, lt, t) {
  const cam = mapCam(t, [[35.25, 880, 262, 1.35], [38.03, 905, 285, 2.4]]);
  applyCam(ctx, cam, 1); worldMap(ctx, t, {}); extraIslands(ctx, t, 1);
  mapPin(ctx, 902, 288, 'MINAHASA', '#e0392f', backOut(clamp((t - 35.35) / .3)), t, .7);
  ctx.setTransform(1, 0, 0, 1, 0, 0); tagPill(ctx, 540, 330, 'SULAWESI UTARA', '#2f63c9', (t - 36.49) / .3, 46);
} });
// 8b — "rica"
SHOTS.push({ start: 38.03, end: 40.65, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 980 }); ctx.save(); ctx.filter = 'blur(6px)'; beachBG(ctx, t, cam, {}); ctx.restore(); applyCam(ctx, cam, 1);
  const z = backOut(sk(lt, 0, .4));
  ST(ctx, LOCAL, 420, 2160 + (1 - z) * 100, 1300, { bob: Math.sin(t * 3) * .004, arms: { L: [.3, -.1], R: { ik: [.12, -.74], bend: -1 } }, prop: bigPodProp(.0021), face: { eyes: 'wide', mouth: 'o', look: [.6, -.1], browUp: 1 }, headTilt: Math.sin(t * 2) * .03 + .04, shadow: false });
  questionMark(ctx, 880, 500, 1.1, sk(lt, .6, .9), t); const sp = sk(lt, .5, .8); sparkle(ctx, 560, 770, 80 * sp, sp * (1 - sk(lt, 1.8, 2.4)));
  tagS(ctx, 'MINAHASA', 540, 330, '#e0392f', t, 38.1, 46);
  overlay(ctx, () => kinetic(ctx, 'RICA', 540, 560, 230, lt, { delay: 1.9, col: '#ffd23a', pulse: true }));
} });
// 9 — who brought it first? The records differ
SHOTS.push({ start: 40.65, end: 47.49, tr: 'whip', draw(ctx, lt, t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#f6dfa7'); g.addColorStop(1, '#e2a95a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const cam = cam0(t, lt, { y: 960 }); applyCam(ctx, cam, 1);
  const sp = backOut(sk(lt, .3, .8)); scrollBig(ctx, 540, 820, 760 * sp, 360 * sp, Math.sin(t * 2) * .02);
  const cp = backOut(sk(lt, 3.0, 3.5)); if (cp > 0) { ctx.save(); ctx.translate(540, 820); ctx.scale(cp, cp); drawChiliPod(ctx, 0, 0, 2.2, -.5, CHILI_RED); ctx.restore(); }
  redShip(ctx, 150, 1260, .36, t, 1, 1); spanShip(ctx, 930, 1260, .36, t, 2, -1);
  questionMark(ctx, 150, 1000, .9, sk(lt, 2.4, 2.7), t); questionMark(ctx, 930, 1000, .9, sk(lt, 2.7, 3.0), t + 1); questionMark(ctx, 540, 520, 1.1, sk(lt, 3.5, 3.8), t + 2);
  ST(ctx, LOCAL2, 540, 1790, 420, { bob: Math.sin(t * 3) * .004, arms: { L: [.4, -.1], R: { ik: [.05, -.66], bend: -1 } }, face: { eyes: 'normal', mouth: 'flat', look: [0, -.3], browOne: 1 }, shadow: true });
  tagS(ctx, 'CATATAN SEJARAH', 540, 330, '#7a4bc4', t, 41.96, 44); tagS(ctx, 'SIAPA PEMBAWA PERTAMA?', 540, 1050, '#e0392f', t, 43.16, 36);
  overlay(ctx, () => kinetic(ctx, 'BERBEDA', 540, 1170, 120, lt, { delay: 5.8, col: '#e0392f', pulse: true }));
} });
// 10 — chili becomes part of life in the Nusantara
SHOTS.push({ start: 47.49, end: 60, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); beachBG(ctx, t, cam, { ship: [790, .45] }); applyCam(ctx, cam, 1);
  ST(ctx, LOCAL, 190, 1620, 520, { bob: Math.sin(t * 3) * .005, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'happy', mouth: 'grin' } });
  ST(ctx, LOCAL2, 880, 1620, 520, { flip: -1, bob: Math.sin(t * 3 + 1) * .005, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'happy', mouth: 'grin' } });
  const g = Math.sin(lt * 7); ST(ctx, LOCAL, 540, 1620, 560, { bob: Math.abs(g) * .004, arms: { L: [.5, -.4], R: { ik: [.2 + g * .05, -.32], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin' } });
  drawCobek(ctx, 540, 1780, .7, t);
  for (let i = 0; i < 5; i++) { const ph = (lt * .5 + i * .2) % 1; heart(ctx, 200 + i * 170, 1050 - ph * 260, .7, '#e0392f', Math.sin(ph * Math.PI) * sk(lt, 1.0, 1.4)); }
  overlay(ctx, () => { kinetic(ctx, 'ABAD KE-16', 540, 330, 120, lt, { delay: 1.39, col: '#ffd23a', pulse: true });
    const k = backOut(sk(lt, 6.4, 6.9)); ctx.save(); ctx.translate(540, 480); ctx.scale(k, k); rrect(ctx, -380, -60, 760, 120, 60); fillStroke(ctx, '#e0392f', 7); text(ctx, 'SEJARAH CABAI - PART 4', 0, 0, 44, '#fff'); ctx.restore(); });
} });
