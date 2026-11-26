// ---------- Sejarah Cabai, Part 2: Ribuan Tahun Sebelum Indonesia Mengenal Cabai ----------
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

// ---- 1a: 5,000 years ago, farmers plant (S1, first part) ----
SHOTS.push({ start: 0, end: 4.59, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0] + lt * 5, y: 1000 + hh[1], z: 1.0 + lt * .025, r: 0 };
  ancientBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  const grow = kf(lt, [[.4, 0], [3.8, 1]]);
  for (const [px, py, sc, d] of [[190, 1380, .85, 0], [500, 1420, .9, .15], [830, 1380, .85, .3], [1010, 1500, .9, .45]]) drawChiliPlant(ctx, px, py, sc, clamp(grow * 1.3 - d * .3), t);
  const bend = Math.max(0, Math.sin(lt * 2.4));
  drawStick(ctx, C(ANCIENT, { x: 340, y: 1790, s: 760, arms: { L: [.5, -.2], R: { ik: [.1, lerp(-.6, -.22, bend)], bend: -1 } }, face: { eyes: 'normal', mouth: 'smile', look: [0, .6] }, lean: bend * .1, shadow: true }));
  const wv = Math.sin(lt * 3);
  drawStick(ctx, C(ANCIENT2, { x: 800, y: 1800, s: 760, arms: { L: [.4, -.2], R: [1.5 + wv * .2, -.8] }, flip: -1, face: { eyes: 'happy', mouth: 'smile' }, shadow: true }));
  const a = backOut(clamp((lt - .15) / .35)); tagPill(ctx, 540, 290, 'SEKITAR 5.000 TAHUN LALU', '#c4551b', a, 48);
} });
// ---- 1b: map of Mesoamerica (S1, second part) ----
SHOTS.push({ start: 4.59, end: 8.62, tr: 'whip', draw(ctx, lt, t) {
  const cam = mapCam(t, [[4.59, 500, 250, .62], [5.3, 330, 230, 1.2], [6.2, 235, 225, 2.0], [8.62, 235, 225, 2.2]]);
  applyCam(ctx, cam, 1);
  worldMap(ctx, t, { hiAmerica: clamp((t - 5.0) * 2) });
  const p1 = backOut(clamp((t - 5.56) / .3)), p2 = backOut(clamp((t - 6.44) / .3));
  mapPin(ctx, 248, 246, '', '#e07a1a', p1, t, 1); mapPin(ctx, 205, 200, '', '#e0392f', p2, t, 1);
  const cp = backOut(clamp((t - 7.2) / .3)); if (cp > 0) { const [px, py] = mapPt(228, 228); drawChiliPod(ctx, px, py - 300, 1.1 * cp, -.4, CHILI_RED); sparkle(ctx, px - 60, py - 340, 40 * cp, cp); }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  tagPill(ctx, 540, 330, 'AMERIKA TENGAH', '#e07a1a', (t - 5.56) / .3, 46); tagPill(ctx, 540, 450, 'MEKSIKO', '#e0392f', (t - 6.44) / .3, 46);
} });

// ---- 2: "bukan sekadar tanaman biasa" ----
SHOTS.push({ start: 8.62, end: 12.03, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 980 + hh[1], z: 1.0, r: 0 };
  ctx.save(); ctx.filter = 'blur(6px)'; ancientBG(ctx, t, cam); ctx.restore();
  applyCam(ctx, cam, 1);
  const z = backOut(clamp(lt / .4));
  drawStick(ctx, C(ANCIENT, { x: 400, y: 2140 + (1 - z) * 100, s: 1300, arms: { L: [.3, -.1], R: { ik: [.12, -.72], bend: -1 } }, prop: bigPodProp(.0021),
    face: { eyes: lt > 1.0 ? 'wide' : 'normal', mouth: lt > 1.0 ? 'grin' : 'smile', look: [.5, -.2], browUp: lt > 1.0 ? 1 : 0 }, headTilt: Math.sin(t * 2) * .03 + .05, shadow: false }));
  drawStick(ctx, C(ANCIENT2, { x: 900, y: 1960, s: 800, arms: { L: [.4, -.2], R: [.5, -.2] }, flip: -1, face: { eyes: 'happy', mouth: 'smile' }, shadow: false, headTilt: Math.sin(t * 3) * .04 }));
  const s1 = clamp((lt - 1.1) / .3); sparkle(ctx, 520, 760, 90 * s1, s1 * (1 - clamp((lt - 2.2) / .8)));
  const s2 = clamp((lt - 1.5) / .3); sparkle(ctx, 640, 680, 55 * s2, s2 * (1 - clamp((lt - 2.4) / .8)));
} });

// ---- 3a: harvest (food, spice) ----
SHOTS.push({ start: 12.03, end: 15.74, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0] - lt * 5, y: 1010 + hh[1], z: 1.08 + lt * .02, r: 0 };
  ancientBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  for (const [px, py, sc] of [[130, 1480, 1.05], [450, 1520, 1.15], [800, 1470, 1.05], [1060, 1520, 1.1]]) drawChiliPlant(ctx, px, py, sc, 1, t);
  const pick = Math.sin(lt * 4);
  drawStick(ctx, C(ANCIENT, { x: 250, y: 1760, s: 740, arms: { L: [.5, -.3], R: { ik: [.25 + pick * .05, -.62 + Math.abs(pick) * .06], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin' }, shadow: true, headTilt: pick * .02 }));
  drawStick(ctx, C(ANCIENT2, { x: 830, y: 1770, s: 740, arms: { L: [.4, -.2], R: { ik: [.28 - Math.abs(Math.sin(lt * 3.3)) * .05, -.6 + Math.abs(Math.sin(lt * 3.3)) * .06], bend: -1 } }, flip: -1, face: { eyes: 'happy', mouth: 'smile', look: [-.5, .3] }, shadow: true }));
  ellipse(ctx, 540, 1740, 100, 28); fillStroke(ctx, '#b5651d', 6); ctx.beginPath(); ctx.moveTo(440, 1740); ctx.quadraticCurveTo(445, 1860, 540, 1870); ctx.quadraticCurveTo(635, 1860, 640, 1740); fillStroke(ctx, '#c98d56', 6);
  const n = Math.min(8, Math.floor(lt * 2.4)); for (let i = 0; i < 4 + n; i++) drawChiliPod(ctx, 470 + (i % 6) * 26, 1722 - (i % 2) * 10 - Math.floor(i / 6) * 14, .55, -.5 + i * .3, CHILI_RED);
  tagPill(ctx, 540, 300, 'BAHAN MAKANAN', '#3fa35b', (t - 13.43) / .3, 46); tagPill(ctx, 540, 420, 'BUMBU MASAKAN', '#e07a1a', (t - 14.67) / .3, 46);
} });
// ---- 3b: village life around the pot ----
SHOTS.push({ start: 15.74, end: 18.81, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 1010 + hh[1], z: 1.0 + lt * .03, r: 0 };
  ancientBG(ctx, t, cam);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = 'rgba(255,120,40,.18)'; ctx.fillRect(0, 0, W, H); ctx.restore();
  applyCam(ctx, cam, 1);
  line(ctx, 80, 900, 80, 1500, 12, '#6a4a2c'); line(ctx, 1000, 900, 1000, 1500, 12, '#6a4a2c'); line(ctx, 80, 920, 1000, 920, 8, '#6a4a2c');
  for (const cx of [260, 420, 600, 760, 900]) drawChiliString(ctx, cx, 920, 260 + (cx % 3) * 40, t, .9);
  const e1 = eatPose(lt, 1.2, [.2, -.3]);
  drawStick(ctx, C(ANCIENT, { x: 230, y: 1800, s: 720, arms: { L: [.4, -.3], R: { ik: e1.arms.R.ik, bend: -1 } }, prop: podProp, face: chewFace(e1.chew, lt), shadow: true }));
  const st = Math.sin(lt * 5);
  drawStick(ctx, C(ANCIENT2, { x: 850, y: 1800, s: 720, flip: -1, arms: { L: [.4, -.2], R: { ik: [.2 + st * .06, -.34], bend: -1 } }, prop: spoonProp, face: { eyes: 'happy', mouth: 'grin' }, shadow: true }));
  cookPot(ctx, 540, 1640, 1.15, t);
  tagPill(ctx, 540, 330, 'KEHIDUPAN SEHARI HARI', '#7a4bc4', (t - 17.07) / .3, 42);
} });

// ---- 4: the first hot bite (S4) ----
SHOTS.push({ start: 18.81, end: 24.34, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 980 + hh[1], z: 1.0, r: 0 };
  ctx.save(); ctx.filter = 'blur(7px)'; ancientBG(ctx, t, cam); ctx.restore();
  applyCam(ctx, cam, 1);
  const bite = clamp((t - 22.95) / .2), hot = clamp((t - 23.1) / .25);
  const shk = hot > 0 ? shake(t * 9, 10 * hot, 3) : [0, 0];
  const tgt = t < 22.0 ? [.12, -.62 + Math.sin(lt * 2) * .03] : t < 22.95 ? kf(t, [[22.0, [.12, -.62]], [22.9, [.02, -.68]]]) : [.02, -.68];
  const zz = kf(lt, [[0, 0], [.4, 1, backOut]]);
  ctx.save(); ctx.translate(shk[0], shk[1]);
  drawStick(ctx, C(ANCIENT, { x: 540, y: 2180 + (1 - zz) * 80, s: 1300, arms: { L: hot > 0 ? [2.5, .3] : [.3, -.1], R: { ik: tgt, bend: -1 } }, prop: bigPodProp(.0019),
    face: hot > 0 ? { eyes: 'wide', mouth: 'o', pupil: .3, browUp: 1 } : bite > 0 ? { eyes: 'squint', mouth: 'grin' } : { eyes: 'normal', mouth: 'smile', look: [.3, -.2], browUp: lt > 1.6 ? 1 : 0 }, shadow: false, headTilt: Math.sin(t * 2) * .03 }));
  if (hot > 0) {
    ctx.save(); circle(ctx, 540, 2180 - .765 * 1300, .19 * 1300); ctx.fillStyle = `rgba(255,50,35,${.45 * hot})`; ctx.fill(); ctx.restore();
    flame(ctx, 540, 2180 - .68 * 1300 + 40, 1.5 * hot, t, hot, 0); flame(ctx, 470, 2180 - .67 * 1300 + 30, 1.0 * hot, t + 1, hot, -.5); flame(ctx, 610, 2180 - .67 * 1300 + 30, 1.0 * hot, t + 2, hot, .5);
    sweat(ctx, 330, 960, 52, hot); sweat(ctx, 760, 980, 44, hot);
  }
  ctx.restore();
  const bp = backOut(clamp((t - 23.3) / .25)); if (bp > 0) { ctx.save(); ctx.translate(540, 420); ctx.rotate(-.08); ctx.scale(bp, bp); burst(ctx, 0, 0, 330, 13, '#ffd23a', 5); text(ctx, 'PEDAS!', 0, 0, 120, '#e0392f', INK, 20); ctx.restore(); }
  const mp = backOut(clamp((t - 21.28) / .3)) * (1 - clamp((t - 22.2) / .3)); if (mp > 0) { ctx.save(); ctx.translate(850, 560); ctx.scale(mp, mp); drawChiliPod(ctx, 0, 0, 1.5, -.5, CHILI_RED); ctx.restore(); sparkle(ctx, 780, 480, 50 * mp, mp); }
} });

// ---- 5: chili spreads across the Americas (S5) ----
SHOTS.push({ start: 24.34, end: 27.81, tr: 'whip', draw(ctx, lt, t) {
  const cam = mapCam(t, [[24.34, 235, 225, 1.0], [26.0, 215, 230, .85], [27.81, 215, 235, .8]]);
  applyCam(ctx, cam, 1);
  worldMap(ctx, t, { hiAmerica: 1 });
  const pts = [[248, 246], [205, 200], [160, 150], [115, 100], [280, 300], [300, 360], [285, 425], [330, 300]];
  pts.forEach(([mx, my], i) => { const a = backOut(clamp((t - 24.7 - i * .3) / .3)); if (a > 0) { const [px, py] = mapPt(mx, my); drawChiliPod(ctx, px, py - 20, 1.0 * a, -.4 + i * .3, CHILI_RED); sparkle(ctx, px + 40, py - 60, 28 * a, a * (1 - clamp((t - 25.4 - i * .3) / .5))); } });
  mapRoute(ctx, [[248, 246], [205, 200], [160, 150], [115, 100]], clamp((t - 24.7) / 1.4), '#fff', 8, [20, 14], true);
  mapRoute(ctx, [[248, 246], [280, 300], [300, 360], [285, 425]], clamp((t - 24.9) / 1.4), '#fff', 8, [20, 14], true);
  ctx.setTransform(1, 0, 0, 1, 0, 0); tagPill(ctx, 540, 330, 'BENUA AMERIKA', '#e07a1a', (t - 26.97) / .3, 46);
} });

// ---- 6a: 1492, the voyage (S6, first part) ----
SHOTS.push({ start: 27.81, end: 31.7, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 900 + hh[1], z: 1.0 + lt * .02, r: Math.sin(t * .8) * .006 };
  applyCam(ctx, cam, .08); drawSky(ctx, '#ff9d6b', '#ffe9c4', -300, 950);
  applyCam(ctx, cam, .1); drawSun(ctx, 820, 520, 90, t, 1.1);
  applyCam(ctx, cam, .15); drawCloud(ctx, 200, 400, 110, 11); drawCloud(ctx, 900, 300, 80, 12);
  applyCam(ctx, cam, .55); drawSea(ctx, 930, t, 2600, ['#9fd8e8', '#2a9cc0', '#13739f']);
  applyCam(ctx, cam, 1);
  drawShip(ctx, lerp(820, 300, lt / 3.89), 1330, .95, t, { flag: '#e0392f', hull: '#7a4a2a', ph: 1 });
  const p = elastic(clamp((t - 29.56) / .6)); if (p > 0) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(540, 440); ctx.scale(p, p); text(ctx, '1492', 0, 0, 300, '#fff', INK, 38); ctx.restore(); }
} });
// ---- 6b: Columbus looks for land ----
SHOTS.push({ start: 31.7, end: 35.18, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 4);
  const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0, r: Math.sin(t * .9) * .008 };
  applyCam(ctx, cam, .08); drawSky(ctx, '#4aaeea', '#fbe9c4', -300, 950);
  applyCam(ctx, cam, .1); drawSun(ctx, 860, 330, 85, t, 1.1);
  applyCam(ctx, cam, .15); drawCloud(ctx, 160, 440, 100, 13);
  applyCam(ctx, cam, .5); drawSea(ctx, 900, t);
  // island rises on the horizon at "benua Amerika"
  const isl = clamp((t - 33.9) / 1.2); if (isl > 0) { ctx.save(); ctx.globalAlpha = isl; ctx.translate(790, 905); ellipse(ctx, 0, 0, 230, 46); fillStroke(ctx, '#f0d896', 5); drawPalm(ctx, -70, 0, .5, t); drawPalm(ctx, 40, 4, .62, t + 1); ctx.restore(); }
  applyCam(ctx, cam, 1);
  rrect(ctx, -300, 1500, 1700, 40, 10); fillStroke(ctx, '#8a5530', 6);
  rrect(ctx, -300, 1540, 1700, 900, 0); fillStroke(ctx, '#a9663a', 6);
  const sc = backOut(clamp(lt / .4));
  drawStick(ctx, C(EXPLORER, { x: 380, y: 1780, s: 1000, arms: { L: [.4, -.2], R: { ik: [.2, -.74], bend: -1 } }, prop: telescopeProp, face: { eyes: 'normal', mouth: lt > 2.2 ? 'o' : 'smile', look: [.8, -.2], browUp: lt > 2.2 ? 1 : 0 }, shadow: false, lean: .02 + Math.sin(t) * .01 }));
  ctx.setTransform(1, 0, 0, 1, 0, 0); tagPill(ctx, 540, 280, 'CHRISTOPHER COLUMBUS', '#2f63c9', (t - 31.7) / .3, 40);
} });

// ---- 7a: Europeans meet the new plants (S7, first part) ----
SHOTS.push({ start: 35.18, end: 38.91, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .025, r: 0 };
  beachBG(ctx, t, cam, { ship: [760, .6] });
  applyCam(ctx, cam, 1);
  // new-world plants on the sand
  drawChiliPlant(ctx, 700, 1560, .8, 1, t); drawChiliPlant(ctx, 900, 1590, .7, 1, t);
  const pop = (a, f) => { const k = backOut(clamp((t - a) / .3)); if (k > 0) f(k); };
  pop(37.1, k => { drawCorn(ctx, 640, 1830, 1.1 * k, .3); }); pop(37.4, k => { drawPotato(ctx, 800, 1860, 1.2 * k, .2); }); pop(37.7, k => { drawPotato(ctx, 900, 1850, 1.0 * k, -.3); });
  drawStick(ctx, C(EXPLORER, { x: 250, y: 1770, s: 720, arms: { L: [.4, -.2], R: [.5, -.2] }, face: { eyes: 'wide', mouth: 'o', look: [.7, 0], browUp: 1 }, shadow: true }));
  drawStick(ctx, C(SAILOR2, { x: 470, y: 1810, s: 640, arms: { L: [.4, -.2], R: [.5, -.2] }, face: { eyes: 'wide', mouth: 'o', look: [.7, 0], browUp: 1 }, shadow: true }));
  drawStick(ctx, C(ANCIENT, { x: 980, y: 1760, s: 720, flip: -1, arms: { L: [.4, -.2], R: [1.4 + Math.sin(lt * 3) * .15, -.7] }, face: { eyes: 'happy', mouth: 'grin' }, shadow: true }));
  tagPill(ctx, 540, 320, 'DUNIA BARU', '#2f8fc9', (t - 37.72) / .3, 50);
} });
// ---- 7b: the chili catches their eye ----
SHOTS.push({ start: 38.91, end: 42.17, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 980 + hh[1], z: 1.0, r: 0 };
  ctx.save(); ctx.filter = 'blur(6px)'; beachBG(ctx, t, cam, { ship: [760, .6] }); ctx.restore();
  applyCam(ctx, cam, 1);
  const z = backOut(clamp(lt / .4));
  drawStick(ctx, C(SAILOR2, { x: 930, y: 1980, s: 820, arms: { L: [.4, -.2], R: [.5, -.2] }, flip: -1, face: { eyes: 'wide', mouth: 'o', look: [-.7, 0], browUp: 1 }, shadow: false, headTilt: -.05 }));
  drawStick(ctx, C(EXPLORER, { x: 420, y: 2160 + (1 - z) * 100, s: 1300, arms: { L: [.3, -.1], R: { ik: [.12, -.74], bend: -1 } }, prop: bigPodProp(.0021),
    face: { eyes: 'wide', mouth: lt > 1.3 ? 'grin' : 'o', look: [.6, -.1], browUp: 1 }, headTilt: Math.sin(t * 2) * .03 + .04, shadow: false }));
  const s1 = clamp((lt - .6) / .3); sparkle(ctx, 560, 770, 90 * s1, s1 * (1 - clamp((lt - 2.0) / .8)));
  exclaim(ctx, 800, 520, 1.1, backOut(clamp((lt - 1.0) / .3)), t);
} });

// ---- 8a: the exchange begins on the map (S8, first part) ----
function exItem(ctx, kind, x, y, s, rot) { ({ chili: () => drawChiliPod(ctx, x, y, 1.0 * s, rot, CHILI_RED), corn: () => drawCorn(ctx, x, y, .9 * s, rot), potato: () => drawPotato(ctx, x, y, 1.0 * s, rot), cow: () => drawCow(ctx, x, y, .8 * s), wheat: () => drawWheat(ctx, x, y, 1.0 * s, rot), sack: () => sack(ctx, x, y + 50, .55 * s) })[kind](); }
function exchangeMap(ctx, t, t0, o = {}) {
  worldMap(ctx, t, { hiAmerica: 1 });
  const east = ROUTE_EU, west = [[470, 130], [400, 160], [330, 200], [262, 228]];
  const pa = clamp((t - t0 - .3) / 1.0); mapRoute(ctx, east, pa, '#fff', 8, [20, 14], true);
  const pb = clamp((t - t0 - 1.8) / 1.0); mapRoute(ctx, west, pb, '#ffe14d', 8, [20, 14], true);
  const items = [['chili', 43.07], ['corn', 43.5], ['potato', 43.9]];
  items.forEach(([k, at], i) => { const q = clamp((t - at) / 2.2); if (q > 0 && q < 1) { const [x, y] = routePoint(east, q); exItem(ctx, k, x, y - 50 - Math.sin(q * Math.PI) * 30, 1.0, Math.sin(t * 4 + i) * .3); } else if (q >= 1) { const [x, y] = routePoint(east, 1); exItem(ctx, k, x + (i - 1) * 55, y - 50, .9, .2 * i); } });
  const items2 = [['cow', 44.02], ['wheat', 44.9], ['sack', 45.63]];
  items2.forEach(([k, at], i) => { const q = clamp((t - at) / 2.0); if (q > 0 && q < 1) { const [x, y] = routePoint(west, q); exItem(ctx, k, x, y - 50 - Math.sin(q * Math.PI) * 30, 1.0, Math.sin(t * 4 + i) * .3); } else if (q >= 1) { const [x, y] = routePoint(west, 1); exItem(ctx, k, x + (i - 1) * 55, y - 50, .9, .2 * i); } });
}
SHOTS.push({ start: 42.17, end: 46.53, tr: 'cut', draw(ctx, lt, t) {
  const cam = mapCam(t, [[42.17, 360, 190, .8], [43.5, 360, 190, .95], [46.53, 360, 190, 1.0]]);
  applyCam(ctx, cam, 1); exchangeMap(ctx, t, 42.17);
} });
// ---- 8b: Old World / New World, Columbian Exchange ----
SHOTS.push({ start: 46.53, end: 50.71, tr: 'whip', draw(ctx, lt, t) {
  const cam = mapCam(t, [[46.53, 360, 190, 1.0], [50.71, 360, 190, .88]]);
  applyCam(ctx, cam, 1); exchangeMap(ctx, t, 42.17);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  tagPill(ctx, 760, 330, 'DUNIA LAMA', '#7a4bc4', (t - 46.53) / .3, 48); tagPill(ctx, 330, 460, 'DUNIA BARU', '#e07a1a', (t - 47.35) / .3, 48);
  const p = elastic(clamp((t - 49.32) / .5)); if (p > 0) { ctx.save(); ctx.translate(540, 1560); ctx.scale(p, p); rrect(ctx, -440, -70, 880, 140, 70); fillStroke(ctx, '#e0392f', 8); text(ctx, 'COLUMBIAN EXCHANGE', 0, 0, 56, '#fff'); ctx.restore(); }
} });

// ---- 9: the journey has only just begun (S9) ----
SHOTS.push({ start: 50.71, end: 57.0, tr: 'cut', draw(ctx, lt, t) {
  const cam = mapCam(t, [[50.71, 360, 200, .86], [53.0, 480, 220, .66], [55.0, 560, 230, .56], [57.0, 560, 230, .54]]);
  applyCam(ctx, cam, 1);
  worldMap(ctx, t, { hiAmerica: 1 });
  const p = clamp((t - 51.2) / 1.6); mapRoute(ctx, ROUTE_EU, p, '#fff', 9, [22, 16], true);
  const rest = clamp((t - 52.8) / 2.4); mapRoute(ctx, ROUTE_ONWARD, rest, 'rgba(255,255,255,.85)', 7, [8, 20], false);
  const q = clamp((t - 51.2) / 1.6), pos = q < 1 ? routePoint(ROUTE_EU, q) : routePoint(ROUTE_ONWARD, clamp((t - 52.8) / 2.4));
  const [px, py] = pos; drawChiliPod(ctx, px, py - 50 - Math.abs(Math.sin(t * 5)) * 18, 1.15, -.4 + Math.sin(t * 5) * .2, CHILI_RED);
  const ip = backOut(clamp((t - 55.07) / .35)); mapPin(ctx, 835, 305, 'INDONESIA', '#e0392f', ip, t, 1.15);
  if (ip > 0) { const [ix, iy] = mapPt(835, 305); questionMark(ctx, ix + 10, iy - 300, .9 * ip, ip, t); }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const bs = backOut(clamp((t - 55.8) / .4)); if (bs > 0) { ctx.save(); ctx.translate(540, 1560); ctx.scale(bs, bs); rrect(ctx, -380, -60, 760, 120, 60); fillStroke(ctx, '#e0392f', 7); text(ctx, 'BERSAMBUNG KE PART 3', 0, 0, 50, '#fff'); ctx.restore(); }
} });
