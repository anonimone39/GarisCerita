// ---------- Sejarah Cabai, Part 5: Sebelum Ada Cabai, Orang Indonesia Makan Apa? ----------
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

// 1 — an interesting question
SHOTS.push({ start: 0, end: 1.73, tr: 'cut', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); villageBG(ctx, t, cam); applyCam(ctx, cam, 1);
  cookPot(ctx, 300, 1690, 1.0, t);
  const st = Math.sin(t * 6);
  ST(ctx, COOK, 700, 1610, 520, { bob: Math.abs(st) * .004, arms: { L: [.5, -.3], R: { ik: [-.3 + st * .05, -.4], bend: 1 } }, face: { eyes: 'normal', mouth: 'smile', look: [-.7, .2] } });
  questionMark(ctx, 760, 780, 1.3, sk(lt, .45, .8), t);
} });
// 2a — the chili arrives in the 16th century
SHOTS.push({ start: 1.73, end: 5.01, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 950 }); daySea(ctx, t, cam, 900);
  redShip(ctx, lerp(200, 640, easeOut(sk(lt, 0, 3.2))), 1330, .92, t, 1, 1);
  const cp = backOut(sk(lt, .5, .9)); ctx.save(); ctx.translate(760, 800); ctx.scale(cp, cp); ctx.rotate(Math.sin(t * 3) * .1); drawChiliPod(ctx, 0, 0, 2.2, -.5, CHILI_RED); ctx.restore();
  tagS(ctx, 'AMERIKA', 540, 330, '#e07a1a', t, 3.02, 48);
  overlay(ctx, () => kinetic(ctx, 'ABAD KE-16', 540, 480, 110, lt, { delay: 1.98, col: '#ffd23a', pulse: true }));
} });
// 2b — and before that?
SHOTS.push({ start: 5.01, end: 8.78, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); villageBG(ctx, t, cam); applyCam(ctx, cam, 1);
  drawBowl(ctx, 760, 1620, .9, t, { sambal: 0 });
  ST(ctx, COOK, 330, 1610, 540, { bob: Math.sin(t * 3) * .004, arms: { L: [.5, -.3], R: { ik: [.1, -.7], bend: -1 } }, face: { eyes: 'wide', mouth: 'flat', look: [.7, .3], browOne: 1 } });
  questionMark(ctx, 190, 800, .9, sk(lt, 1.5, 1.8), t); questionMark(ctx, 480, 760, 1.0, sk(lt, 1.9, 2.2), t + 1);
  if (lt > 2.4) sweat(ctx, 450, 1090, 30, 1);
  overlay(ctx, () => kinetic(ctx, 'SEBELUMNYA?', 540, 380, 130, lt, { delay: 2.82, col: '#ffd23a', pulse: true }));
} });
// 3 — spicy ingredients, centuries ago
SHOTS.push({ start: 8.78, end: 14.35, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); villageBG(ctx, t, cam); applyCam(ctx, cam, 1);
  const a = backOut(sk(t, 11.55, 11.85)), b = backOut(sk(t, 11.98, 12.28)), c = backOut(sk(t, 12.25, 12.55));
  if (a > 0) gingerRoot(ctx, 250, 1000, 1.0 * a, -.2); if (b > 0) longPepper(ctx, 570, 1150, 1.0 * b, 0, t); if (c > 0) pepperVine(ctx, 880, 1130, 1.0 * c, t);
  const st = Math.sin(t * 6);
  ST(ctx, COOK, 250, 1620, 520, { bob: Math.abs(st) * .004, arms: { L: [.5, -.3], R: { ik: [.3, -.5], bend: -1 } }, face: { eyes: 'happy', mouth: 'smile' } });
  ST(ctx, LOCAL2, 850, 1630, 520, { flip: -1, bob: Math.sin(t * 3) * .004, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'happy', mouth: 'smile' } });
  tagS(ctx, 'BAHAN PEDAS', 540, 330, '#e0392f', t, 11.98, 46);
  overlay(ctx, () => { kinetic(ctx, 'BERABAD-ABAD', 540, 470, 100, lt, { delay: 4.19, col: '#fff' }); kinetic(ctx, 'LALU', 540, 590, 150, lt, { delay: 4.8, col: '#ffd23a', pulse: true }); });
} });
// 4 — Javanese long pepper revealed
SHOTS.push({ start: 14.35, end: 17.91, tr: 'whip', draw(ctx, lt, t) {
  rays(ctx, t); const z = backOut(sk(lt, 0, .45));
  ctx.save(); ctx.translate(540, 1180); ctx.scale(2.3 * z, 2.3 * z); ctx.rotate(Math.sin(t * 2) * .03); longPepper(ctx, 0, 0, 1, 0, t); ctx.restore();
  const sp = sk(lt, .6, .9); sparkle(ctx, 360, 760, 60 * sp, sp); sparkle(ctx, 740, 700, 44 * sp, sp);
  tagS(ctx, 'CABAI JAWA', 540, 330, '#e07a1a', t, 15.32, 58); tagS(ctx, 'PIPER RETROFRACTUM', 540, 450, '#7a4bc4', t, 16.37, 38);
} });
// 5a — modern chilies
SHOTS.push({ start: 17.91, end: 21.91, tr: 'cut', draw(ctx, lt, t) {
  rays(ctx, t, '#ffb3a0', '#c4231a');
  for (const [x, y, s, r, d] of [[330, 1050, 3.2, -.6, 0], [740, 1100, 3.0, .5, .2]]) { const k = backOut(sk(lt, d, d + .4)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(Math.sin(t * 2 + x) * .06); drawChiliPod(ctx, 0, 0, s, r, CHILI_RED); ctx.restore(); }
  for (let i = 0; i < 6; i++) { const k = backOut(sk(lt, 1.1 + i * .1, 1.5 + i * .1)); if (k > 0) drawChiliPod(ctx, 220 + i * 120, 1560 + (i % 2) * 40, 1.3 * k, -.4 + i * .5, i % 2 ? '#3fa35b' : '#e0392f'); }
  tagS(ctx, 'CABAI MERAH', 330, 330, '#e0392f', t, 18.55, 40); tagS(ctx, 'CABAI RAWIT', 760, 330, '#e07a1a', t, 19.34, 40); tagS(ctx, 'SEKARANG', 540, 470, '#2f63c9', t, 20.87, 46);
} });
// 5b — what makes the long pepper different
SHOTS.push({ start: 21.91, end: 26.69, tr: 'whip', draw(ctx, lt, t) {
  rays(ctx, t, '#ffd89a', '#a8581c');
  ctx.save(); ctx.translate(540, 1250); ctx.scale(2.6, 2.6); longPepper(ctx, 0, 0, 1, Math.sin(t * 1.5) * .02, t); ctx.restore();
  tagS(ctx, 'CABAI JAWA', 540, 300, '#e07a1a', t, 22.23, 50);
  tagS(ctx, 'KECIL', 200, 640, '#3fa35b', t, 23.59, 42); tagS(ctx, 'MEMANJANG', 840, 760, '#2f63c9', t, 24.41, 42); tagS(ctx, 'BERGEROMBOL', 300, 900, '#e0392f', t, 25.7, 42);
  const sp = sk(lt, 1.0, 1.3); sparkle(ctx, 380, 820, 50 * sp, sp);
} });
// 6 — ginger and pepper too
SHOTS.push({ start: 26.69, end: 33.88, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); villageBG(ctx, t, cam, { hut: false }); applyCam(ctx, cam, 1);
  rrect(ctx, -100, 1500, 1300, 360, 0); fillStroke(ctx, '#9a5a2c', 6); rrect(ctx, -120, 1450, 1340, 70, 14); fillStroke(ctx, '#d79a5a', 6);
  longPepper(ctx, 220, 1440, .9, 0, t); gingerRoot(ctx, 540, 1430, .95, 0); pepperVine(ctx, 860, 1450, .95, t);
  ST(ctx, COOK, 540, 1380, 460, { bob: Math.sin(t * 3) * .004, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'happy', mouth: 'grin' }, shadow: false });
  tagS(ctx, 'CABAI JAWA', 220, 330, '#e07a1a', t, 27.27, 36); tagS(ctx, 'JAHE', 540, 330, '#d9a21e', t, 29.52, 44); tagS(ctx, 'LADA', 760, 330, '#2f8f4b', t, 30.12, 40); tagS(ctx, 'MERICA', 900, 450, '#2f8f4b', t, 30.61, 36);
  tagS(ctx, 'HANGAT', 340, 560, '#e0a52a', t, 31.92, 44); tagS(ctx, 'PEDAS', 700, 600, '#e0392f', t, 32.49, 48);
  if (t > 31.9) for (let i = 0; i < 4; i++) { const ph = (t * .7 + i * .25) % 1; flame(ctx, 220 + i * 210, 1380 - ph * 60, .45, t + i, Math.sin(ph * Math.PI) * .7); }
} });
// 7a — the 10th century records
SHOTS.push({ start: 33.88, end: 38.06, tr: 'cut', draw(ctx, lt, t) {
  rays(ctx, t, '#d9c9a0', '#6a5a3a');
  const k = backOut(sk(lt, .2, .7)); ctx.save(); ctx.translate(540, 1050); ctx.scale(k, k);
  ctx.beginPath(); ctx.moveTo(-250, 420); ctx.lineTo(-250, -150); ctx.arc(0, -150, 250, Math.PI, 0); ctx.lineTo(250, 420); ctx.closePath(); fillStroke(ctx, '#a9a49a', 9);
  ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(30,25,20,.2)'; ctx.fillRect(60, -420, 300, 900); ctx.restore();
  ctx.strokeStyle = '#5a554c'; ctx.lineWidth = 9; ctx.lineCap = 'round'; for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++) { const x = -150 + c * 75, y = -190 + r * 85; ctx.beginPath(); if ((r + c) % 3 === 0) { ctx.moveTo(x - 22, y); ctx.lineTo(x + 22, y); } else if ((r + c) % 3 === 1) { ctx.arc(x, y, 18, 0, TAU); } else { ctx.moveTo(x - 18, y - 18); ctx.lineTo(x, y + 18); ctx.lineTo(x + 18, y - 18); } ctx.stroke(); }
  ctx.restore();
  tagS(ctx, 'MENURUT CATATAN SEJARAH', 540, 330, '#7a4bc4', t, 34.84, 36);
  overlay(ctx, () => kinetic(ctx, 'ABAD KE-10', 540, 520, 120, lt, { delay: 3.13, col: '#ffd23a', pulse: true }));
} });
// 7b — grinding a traditional sambal
SHOTS.push({ start: 38.06, end: 42.33, tr: 'whip', draw(ctx, lt, t) {
  const cam = cam0(t, lt, { y: 1000 }); villageBG(ctx, t, cam); applyCam(ctx, cam, 1);
  longPepper(ctx, 160, 1640, .8, .3, t); gingerRoot(ctx, 920, 1700, .8, .2);
  const g = Math.sin(t * 7);
  ST(ctx, COOK, 540, 1560, 540, { bob: Math.abs(g) * .004, arms: { L: [.5, -.4], R: { ik: [.2 + g * .05, -.33], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin' } });
  drawCobek(ctx, 540, 1700, .85, t);
  steam(ctx, 540, 1560, 1.1, t, .6);
  tagS(ctx, 'SAMBAL', 540, 330, '#e0392f', t, 39.69, 56); tagS(ctx, 'CABAI JAWA', 540, 450, '#e07a1a', t, 41.6, 42);
} });
// 8 — chili culture already existed
SHOTS.push({ start: 42.33, end: 48.35, tr: 'whip', draw(ctx, lt, t) {
  rays(ctx, t, '#ffcf6a', '#c4521a');
  sambalBowl(ctx, 540, 1100, 1.6, t); longPepper(ctx, 220, 1450, 1.0, .2, t); gingerRoot(ctx, 860, 1480, .9, -.1);
  const sh = sk(lt, 4.4, 4.9); if (sh > 0) { ctx.save(); ctx.globalAlpha = sh * .7; redShip(ctx, 930, 1740, .3, t, 1, -1); ctx.restore(); tagPill(ctx, 760, 1620, 'AMERIKA', '#e07a1a', sh, 30); }
  overlay(ctx, () => { kinetic(ctx, 'BUDAYA PEDAS', 540, 330, 120, lt, { delay: 1.01, col: '#fff' }); kinetic(ctx, 'SUDAH ADA', 540, 480, 150, lt, { delay: 3.56, col: '#ffd23a', pulse: true }); });
} });
// 9 — America's chili was not the beginning
SHOTS.push({ start: 48.35, end: 51.91, tr: 'whip', draw(ctx, lt, t) {
  rays(ctx, t, '#ffb3a0', '#c4231a');
  const k = backOut(sk(lt, 0, .4)); ctx.save(); ctx.translate(540, 1150); ctx.scale(k * 3.6, k * 3.6); ctx.rotate(Math.sin(t * 3) * .06); drawChiliPod(ctx, 0, 0, 1, -.5, CHILI_RED); ctx.restore();
  tagS(ctx, 'RASA PEDAS', 540, 1560, '#e0392f', t, 50.22, 46);
  overlay(ctx, () => { kinetic(ctx, 'BUKAN', 540, 330, 140, lt, { delay: .8, col: '#fff' }); kinetic(ctx, 'AWAL MULA', 540, 480, 130, lt, { delay: 1.3, col: '#ffd23a', pulse: true }); });
} });
// 10 — it changed Indonesian cuisine forever
SHOTS.push({ start: 51.91, end: 60, tr: 'cut', draw(ctx, lt, t) {
  rays(ctx, t, '#ffd89a', '#c4521a');
  const k = backOut(sk(lt, 0, .5)); ctx.save(); ctx.translate(540, 1050); ctx.scale(k * 2.4, k * 2.4); ctx.rotate(Math.sin(t * 3) * .06); drawChiliPod(ctx, 0, 0, 1, -.5, CHILI_RED); ctx.restore();
  const b = backOut(sk(lt, 1.6, 2.1)); ctx.save(); ctx.translate(250, 1560); ctx.scale(b, b); drawBowl(ctx, 0, 0, .8, t, { sambal: 1 }); ctx.restore();
  const g = backOut(sk(lt, 2.0, 2.5)); ctx.save(); ctx.translate(820, 1600); ctx.scale(g, g); drawGeprek(ctx, 0, 0, .8, t); ctx.restore();
  overlay(ctx, () => { kinetic(ctx, 'MENGUBAH WAJAH', 540, 330, 100, lt, { delay: 1.96, col: '#fff' }); kinetic(ctx, 'KULINER INDONESIA', 540, 460, 84, lt, { delay: 2.7, col: '#ffd23a', pulse: true });
    const p = backOut(sk(lt, 5.2, 5.7)); ctx.save(); ctx.translate(540, 1760); ctx.scale(p, p); rrect(ctx, -380, -60, 760, 120, 60); fillStroke(ctx, '#e0392f', 7); text(ctx, 'BERSAMBUNG KE PART 6', 0, 0, 44, '#fff'); ctx.restore(); });
} });
