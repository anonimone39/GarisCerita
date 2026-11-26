// ---------- Majapahit 1293: shot list (seconds of the voiceover) ----------
// characters
const WIJ = { cols: ['#2f9e57', '#2f9e57'], hat: 'blangkon', vest: '#1f6e3c' };
const FOL = { cols: ['#62b874', '#62b874'], hat: 'udeng', hatCol: '#2c5e3a' };
const JAY = { cols: ['#a3232f', '#a3232f'], hat: 'crownK', robe: '#7a1624', mustache: true, belt: false };
const MON = { cols: ['#8a5a32', '#8a5a32'], hat: 'mongol', vest: '#5a3a22' };
const CMD = { cols: ['#5d3a8a', '#5d3a8a'], hat: 'mongol', hatCol: '#d9b04a', brim: '#4a3020', mustache: true, vest: '#3a2458' };
const KHAN = { cols: ['#c43b2b', '#c43b2b'], hat: 'khan', robe: '#9c2a20', mustache: true, belt: false };
const KED = { cols: ['#d0573a', '#d0573a'], hat: 'udeng', hatCol: '#8e1f2b' };
const ENVOY = { cols: ['#2f63c9', '#2f63c9'], hat: 'none', belt: false };
const C = (base, extra) => Object.assign({}, base, extra);
const walkLegs = (t, sp = 9, amp = .55) => ({ L: [Math.sin(t * sp) * amp + .05, -Math.max(0, Math.sin(t * sp + 1)) * .7], R: [-Math.sin(t * sp) * amp + .05, -Math.max(0, -Math.sin(t * sp + 1)) * .7] });
const walkArms = (t, sp = 9, amp = .6) => ({ L: [.3 - Math.sin(t * sp) * amp, -.3], R: [.3 + Math.sin(t * sp) * amp, -.3] });
const handheld = (t, a = 4) => shake(t * .35, a, 1, 2);
const loc = (wx, wy, x, y, s, flip = 1) => [(wx - x) / s * flip, (wy - y) / s];  // world point -> stick-local ik target
const ANGRY = { eyes: 'normal', mouth: 'teeth', browAng: -.35 };
function cam0(t, lt, o = {}) { const h = handheld(t, o.hand == null ? 3 : o.hand); return { x: (o.x || 540) + h[0] + (o.px || 0) * lt, y: (o.y || 960) + h[1] + (o.py || 0) * lt, z: (o.z || 1) + (o.pz == null ? .03 : o.pz) * lt, r: o.r || 0 }; }
let NOW = 0;

// Java landscape: sky, sun, clouds, volcano, hills, grass
function javaBG(ctx, t, cam, o = {}) {
  const h = o.h || 1000;
  applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#4fb0ee', o.bot || '#d8f0fb', -400, h);
  if (o.sun !== false) { applyCam(ctx, cam, .1); drawSun(ctx, o.sunX || 850, o.sunY || 300, o.sunR || 80, t, o.sunPow || .9); }
  applyCam(ctx, cam, .14);
  if (o.clouds !== false) { drawCloud(ctx, 160 + t * 6, 260, 110, 1, .95); drawCloud(ctx, 760 + t * 4, 170, 85, 2, .95); drawCloud(ctx, 1080 + t * 5, 440, 70, 3, .85); }
  applyCam(ctx, cam, .22); if (o.volcano !== false) drawVolcano(ctx, o.vx || 300, h - 40, 420, 360, o.vcol || '#86a6c8', true, t);
  applyCam(ctx, cam, .4); drawHills(ctx, h + 10, o.hills || ['#9ccf8a', '#6fb46a', '#4f9a55']);
  applyCam(ctx, cam, 1); drawGround(ctx, h + 60, o.g1 || '#8fcf5e', o.g2 || '#5fae45');
}
const DUSK = { top: '#3b2350', bot: '#ff9a52', hills: ['#8a5a7a', '#6a4566', '#4a3050'], g1: '#7a6a4a', g2: '#4a3a2a', vcol: '#5a3e66', sunY: 760, sunX: 760, sunR: 110, sunPow: 1.1, clouds: false };
const WAR = { top: '#7a5a7a', bot: '#ffb070', hills: ['#a07a7a', '#86606a', '#6a4a56'], g1: '#9a8a5a', g2: '#6a5a3a', sunX: 300, sunY: 500, vcol: '#8a6a86' };
const SUNRISE = { top: '#f2945a', bot: '#ffe0a0', sunY: 760, sunX: 540, sunR: 130, sunPow: 1.3, hills: ['#c88a6a', '#a8705a', '#7a5048'], g1: '#9ab05a', g2: '#6a8a3a', vcol: '#b07a7a', vx: 900 };
const EVENING = { top: '#f2a05a', bot: '#ffe3b0', sunY: 600, sunX: 900 };
function palaceBG(ctx, cam, col = '#8e2a22') { // Yuan throne hall
  applyCam(ctx, cam, .2); const g = ctx.createLinearGradient(0, -200, 0, 1500); g.addColorStop(0, '#5a1414'); g.addColorStop(1, col); ctx.fillStyle = g; ctx.fillRect(-1000, -1000, 3080, 3800);
  for (const px of [80, 1000]) { rrect(ctx, px - 50, -200, 100, 1800, 10); fillStroke(ctx, '#d9a83a', 6); ctx.save(); rrect(ctx, px - 50, -200, 100, 1800, 10); ctx.clip(); ctx.fillStyle = 'rgba(120,60,0,.3)'; ctx.fillRect(px + 10, -200, 60, 1800); ctx.restore(); }
  for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(80 + i * 115, 120, 70, 0, Math.PI); fillStroke(ctx, '#c4322a', 5); }
  applyCam(ctx, cam, 1); ctx.fillStyle = '#6a1a14'; ctx.fillRect(-1000, 1500, 3080, 1500);
  ctx.fillStyle = '#c9a14a'; ctx.fillRect(-1000, 1500, 3080, 14);
}
function campBG(ctx, t, cam, o = {}) {
  javaBG(ctx, t, cam, Object.assign({ vx: 820 }, o));
  applyCam(ctx, cam, .7); drawTent(ctx, 150, 1080, .9); drawTent(ctx, 930, 1060, .8, '#e9dfc6'); drawTent(ctx, 560, 1010, .55);
  applyCam(ctx, cam, 1);
}
function seaBG(ctx, t, cam, o = {}) {
  const h = o.h || 900;
  applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#4aaeea', o.bot || '#fbe9c4', -300, h);
  applyCam(ctx, cam, .1); drawSun(ctx, o.sunX || 800, o.sunY || 330, o.sunR || 90, t, o.sunPow || 1.1);
  applyCam(ctx, cam, .15); if (o.clouds !== false) { drawCloud(ctx, 150, 420, 110, 5); drawCloud(ctx, 1000, 560, 80, 6); }
  applyCam(ctx, cam, .5); drawSea(ctx, h, t, 2600, o.sea);
  applyCam(ctx, cam, 1);
}
function propFlag(hand = 'R', col = '#fff', stripes = false) {
  return (ctx, k, p) => {
    if (k !== hand) return; const tt = NOW;
    line(ctx, p[0], p[1] + .12, p[0], p[1] - .5, .02, '#6b4a2a');
    const flagPath = () => { ctx.beginPath(); ctx.moveTo(p[0], p[1] - .5); for (let i = 0; i <= 6; i++) ctx.lineTo(p[0] + i * .04, p[1] - .5 + Math.sin(tt * 8 + i) * .012); ctx.lineTo(p[0] + .24, p[1] - .34); for (let i = 6; i >= 0; i--) ctx.lineTo(p[0] + i * .04, p[1] - .34 + Math.sin(tt * 8 + i) * .012); ctx.closePath(); };
    flagPath(); ctx.fillStyle = col; ctx.fill();
    if (stripes) { ctx.save(); flagPath(); ctx.clip(); ctx.fillStyle = '#d8312b'; for (let i = 0; i < 5; i++) ctx.fillRect(p[0], p[1] - .52 + i * .036, .3, .018); ctx.restore(); }
    flagPath(); ctx.lineWidth = .01; ctx.strokeStyle = INK; ctx.stroke();
  };
}
function crownAt(ctx, x, y, s, rot = 0, kind = 'crown') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); HATS[kind](ctx, 0, 0, .19, .017, {}); ctx.restore(); }
function helmetAt(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); HATS.mongol(ctx, 0, 0, .19, .017, {}); ctx.restore(); }
function bush(ctx, x, y, s, seed = 2) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const R = rng(seed); const b = []; for (let i = 0; i < 6; i++) b.push([-140 + i * 56 + R() * 20, -50 - R() * 50, 70 + R() * 30]); const shape = () => { ctx.beginPath(); b.forEach(q => { ctx.moveTo(q[0] + q[2], q[1]); ctx.arc(q[0], q[1], q[2], 0, TAU); }); ctx.rect(-180, -60, 360, 60); }; shape(); ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.stroke(); shape(); ctx.fillStyle = '#3f8f45'; ctx.fill(); ctx.restore(); }
function fightCloud(ctx, x, y, r, t, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a);
  for (let i = 0; i < 5; i++) { const ang = t * 9 + i * 1.3; line(ctx, x + Math.cos(ang) * r * .6, y + Math.sin(ang) * r * .4, x + Math.cos(ang) * r * 1.15, y + Math.sin(ang) * r * .8, 16, INK); circle(ctx, x + Math.cos(ang) * r * 1.15, y + Math.sin(ang) * r * .8, 16); ctx.fillStyle = INK; ctx.fill(); }
  puff(ctx, x, y, r, t, '#f1e6cf', 8 + (t * 12 | 0) % 3, 1);
  for (let i = 0; i < 3; i++) star5(ctx, x + Math.cos(t * 6 + i * 2) * r * .9, y - r * .7 + Math.sin(t * 7 + i) * 30, 26, t * 3);
  ctx.restore();
}

// ---------- Part 2 cast ----------
const HAY = { cols: ['#d9a22a', '#d9a22a'], hat: 'crown', sash: '#a3232f', belt: false };
const GM = { cols: ['#4a4a5e', '#4a4a5e'], hat: 'komandan', vest: '#8a2a2a', mustache: true };
const LING = { cols: ['#f4f0e6', '#f4f0e6'], hat: 'iketSunda', robe: '#2f63c9', robeTrim: '#f4f0e6', mustache: '#9a9a9a', belt: false };
const DYAH = { cols: ['#e8779f', '#e8779f'], hat: 'flowers', sash: '#ffd23a', blush: true, belt: false };
const QUEEN = { cols: ['#9a5ac4', '#9a5ac4'], hat: 'flowers', sash: '#f4f0e6', belt: false };
const SUN = { cols: ['#2f63c9', '#2f63c9'], hat: 'iketSunda', hatCol: '#2f63c9' };
const MJT = { cols: ['#2f9e57', '#2f9e57'], hat: 'udeng', hatCol: '#1f6e3c' };
const ORG = { cols: ['#e8873a', '#e8873a'], hat: 'udeng', hatCol: '#8e3a1b' };
const SADF = { eyes: 'normal', mouth: 'frown', browAng: .45 };
const SIL_M = '#14060a', SIL_S = '#0a1030';
// palettes: warm (love) -> dusk (tension) -> blood (conflict) -> grey (grief) -> night
const WARM = { top: '#ffb3a0', bot: '#fff0c8', hills: ['#f2c6a0', '#e0a880', '#c88a6a'], g1: '#a8d06a', g2: '#78b04a', sunX: 840, sunY: 330, vcol: '#e8b6b0', vx: 260 };
const BLOOD = { top: '#1a0408', bot: '#c4322a', hills: ['#5a1a20', '#3a1018', '#240a10'], g1: '#4a2a22', g2: '#2a1612', sun: false, clouds: false, vcol: '#4a1a22' };
const GRAY = { top: '#2a3340', bot: '#8a97a4', hills: ['#56616e', '#46505c', '#363f4a'], g1: '#566058', g2: '#363f3a', sun: false, clouds: false, vcol: '#4a5562' };
const NIGHT = { top: '#08060e', bot: '#2a1226', hills: ['#2a1a2e', '#1e1222', '#140c18'], g1: '#2a2228', g2: '#18121a', sun: false, clouds: false, vcol: '#2a1a30' };
const DUSK2 = { top: '#4a2a5a', bot: '#ff9a5a', hills: ['#8a5a7a', '#6a4566', '#4a3050'], g1: '#7a6a4a', g2: '#4a3a2a', sunX: 700, sunY: 820, sunR: 130, sunPow: 1.1, vcol: '#6a4a76', clouds: false };
function sundaCampBG(ctx, t, cam, o = {}) {
  javaBG(ctx, t, cam, o);
  applyCam(ctx, cam, .75); drawSundaTent(ctx, 170, 1100, .85); drawSundaTent(ctx, 900, 1090, .8); drawSundaTent(ctx, 560, 1030, .55);
  applyCam(ctx, cam, 1);
}
function giftAt(ctx, x, y, s, col = '#d8312b') { rrect(ctx, x - s / 2, y - s * .7, s, s * .7, 6); fillStroke(ctx, col, 5); line(ctx, x, y - s * .7, x, y, 8, '#f2c230'); line(ctx, x - s / 2, y - s * .35, x + s / 2, y - s * .35, 8, '#f2c230'); }
function skyOnly(ctx, cam, a = '#0a1230', b = '#2a2a5a') { applyCam(ctx, cam, .2); drawSky(ctx, a, b, -400, 2400); applyCam(ctx, cam, 1); }
const IDLE = POSE.idle.arms, HIPS = POSE.hips.arms, UP = POSE.handsUp.arms;

// ---------- Part 3 cast ----------
const WIK = { cols: ['#d8312b', '#d8312b'], hat: 'crown', robe: '#a3232f', robeTrim: '#f2c230', mustache: true, belt: false };
const WIR = { cols: ['#e8873a', '#e8873a'], hat: 'crownSmall', robe: '#d9701f', robeTrim: '#2f9e57', belt: false };
const PRIN = { cols: ['#f08ab0', '#f08ab0'], hat: 'crown', sash: '#ffd23a', blush: true, belt: false };
const SELIR = { cols: ['#6cc08a', '#6cc08a'], hat: 'flowers', sash: '#ffffff', blush: true, belt: false };
const MING = { cols: ['#2a4fa8', '#2a4fa8'], hat: 'ming', robe: '#2a4fa8', robeTrim: '#f2c230', mustache: true, belt: false };
const REDS = { cols: ['#d8312b', '#d8312b'], hat: 'udeng', hatCol: '#7a1a1a' };
const WESTHALL = { wallTop: '#f6b8a8', wallBot: '#d8584a', pillar: '#8a2a2a', banner: '#d8312b', floor: '#7a2a2a' };
const EASTHALL = { wallTop: '#ffe6a8', wallBot: '#e8a050', pillar: '#2f7a4a', banner: '#2f9e57', floor: '#6a5a2a' };
function tugScene(ctx, t, o) {
  const f = o.fall || 0, pull = f ? 0 : Math.sin(t * 11) * 14, rot = f ? 0 : Math.sin(t * 11) * .05;
  drawCrownSplit(ctx, 540 + pull * .3, 1240 + f * f * 80, 1400, o.split || 0, rot, o.crack || 0);
  [[210, WIK, 1, 330], [870, WIR, -1, 750]].forEach(([bx, ch, fl, tx]) => {
    const x = bx + pull * fl - fl * f * 90, y = 1650 + f * f * 100;
    drawStick(ctx, C(ch, { x, y, s: 1150, flip: fl, lean: -.2 - f * .35, arms: f > 0 ? UP : { L: { ik: loc(tx, 960, x, y, 1150, fl) }, R: { ik: loc(tx, 1000, x, y, 1150, fl) } },
      face: f > 0 ? { eyes: 'wide', mouth: 'o', browAng: .5 } : { eyes: 'normal', mouth: 'teeth', browAng: -.4 } }));
  });
}
function crownGround(ctx, t, cam, cover) {
  javaBG(ctx, t, cam, GRAY); applyCam(ctx, cam, 1);
  drawCrownSplit(ctx, 540, 1680, 1000, .35, .12, 0);
  drawLeafPile(ctx, 540, 1560, 780, 420, cover, 4);
  leaves(ctx, t, 1, 3, [0, 200, W, 1800], 26);
  tintScreen(ctx, '#0a0a12', .25);
}

const SHOTS = [];
// ===== SCENE 1: HOOK =====
// 1: the biggest kingdom
SHOTS.push({ start: 0, end: 2.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .05 });
  skyOnly(ctx, cam, '#1a3a6a', '#3a7ab0');
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(540, 900); ctx.rotate(t * .1); for (let i = 0; i < 12; i++) { ctx.rotate(TAU / 12); path(ctx, [[0, 0], [-70, -1500], [70, -1500]]); ctx.fillStyle = 'rgba(255,210,90,.1)'; ctx.fill(); } ctx.restore();
  drawNusantara(ctx, 60, 520, 960, 1, t);
  for (let i = 0; i < 6; i++) sparkle(ctx, 200 + i * 130, 560 + Math.sin(i * 2) * 120, 30, (.5 + .5 * Math.sin(t * 5 + i)) * .9);
  kinetic(ctx, 'MAJAPAHIT', 540, 330, 140, lt, .3, { fill: '#ffd23a' });
} });
// 2: no enemy from outside can break the gate
SHOTS.push({ start: 2.8, end: 5.5, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  javaBG(ctx, t, cam, SUNRISE);
  applyCam(ctx, cam, .85); drawGate(ctx, 540, 1350, 1.55);
  applyCam(ctx, cam, 1);
  for (let i = 0; i < 6; i++) {
    const x = kf(lt, [[0, 1500 + i * 90], [1.1, 820 + i * 70], [1.35, 800 + i * 70], [2.6, 1600 + i * 110]]), back = lt > 1.3;
    drawStick(ctx, C(ORG, { sil: SIL_M, x, y: 1700 + (i % 3) * 50, s: 420, flip: back ? 1 : -1, legs: walkLegs(t + i, 14, .6), arms: back ? UP : { L: [2.4, .2], R: [2.6, .2] }, lean: back ? -.1 : .1 }));
  }
  if (lt > 1.1 && lt < 1.5) burst(ctx, 780, 1450, 120 * clamp(1 - (lt - 1.1) * 2.5), 10, '#fff', 3);
  puff(ctx, 800, 1650, 90, t, '#efe3cf', 4, lt > 1.2 ? clamp(1 - (lt - 1.2) * 1.2) : 0);
} });
// 3: two figures pull the crown, a crack grows
SHOTS.push({ start: 5.5, end: 7.8, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  skyOnly(ctx, cam, '#14102a', '#3a2a5a');
  tugScene(ctx, t, { crack: clamp((lt - .3) / 1.7) });
  for (let i = 0; i < 5; i++) sparkle(ctx, 360 + i * 90, 760 + Math.sin(i * 2) * 60, 26, .5 + .5 * Math.sin(t * 6 + i));
  sweat(ctx, 330, 840, 40, 1); sweat(ctx, 760, 850, 40, 1);
} });
// 4: it splits, both fall backwards holding nothing
SHOTS.push({ start: 7.8, end: 9.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  skyOnly(ctx, cam, '#14102a', '#3a2a5a');
  const f = clamp(lt / 1.1);
  tugScene(ctx, t, { split: easeOut(f) * 1.0, fall: f });
  if (lt < .3) flash(ctx, (.3 - lt) * 2.5);
  if (lt < .5) burst(ctx, 540, 960, 200 * (1 - lt * 2), 12, '#ffd23a', 6);
} });
// 5: title
SHOTS.push({ start: 9.6, end: 11.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  skyOnly(ctx, cam, '#1a0a2a', '#5a1a3a');
  drawCrownSplit(ctx, 540, 1350, 1100, .8 + Math.sin(t * 3) * .05, 0, 0);
  const b = Math.sin(t * 9) > .8;
  if (b) bolt(ctx, 340, 1000, 3, '#ffd23a', -.3); if (!b) bolt(ctx, 760, 980, 3, '#ffd23a', .3);
  kinetic(ctx, 'PAREGREG', 540, 560, 170, lt, .1, { burst: '#d8312b', fill: '#fff' });
} });
// ===== SCENE 2: THE INHERITANCE =====
// 6: Hayam Wuruk passes away (1389)
SHOTS.push({ start: 11.8, end: 15.4, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  pendopoBG(ctx, cam);
  applyCam(ctx, cam, 1);
  const rise = clamp((lt - 1.0) / 1.8), a = 1 - rise;
  [[170, WIK, 1], [910, WIR, -1]].forEach(([x, ch, f]) => drawStick(ctx, C(ch, { x, y: 1800, s: 560, flip: f, arms: IDLE, headTilt: .12, face: SADF })));
  drawStick(ctx, C(HAY, { x: 540, y: 1960 - rise * rise * 520, s: 960, alpha: a, arms: IDLE, face: { eyes: 'happy', mouth: 'smile' } }));
  for (let i = 0; i < 7; i++) { const k = (lt * .5 + i / 7) % 1; sparkle(ctx, 360 + i * 60, 1500 - k * 900, 28, (1 - k) * clamp(lt - .8)); }
  nameTag(ctx, 540, 760, 'Hayam Wuruk', '#d9a83a', clamp((lt - .2) / .35) * a);
  kinetic(ctx, '1389', 540, 520, 220, lt, 2.1, { burst: '#6a7a9a', fill: '#fff' });
  tintScreen(ctx, '#0a1020', .12 * rise);
} });
// 7: the map divides into West and East
SHOTS.push({ start: 15.4, end: 18.1, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  skyOnly(ctx, cam, '#1a2a4a', '#2a4a7a');
  drawJavaTwo(ctx, 150, 560, 780, { front: .5, dash: clamp((lt - .2) / 1.0) });
  nameTag(ctx, 330, 420, 'BARAT', '#d8312b', clamp((lt - .9) / .35), 52);
  nameTag(ctx, 750, 420, 'TIMUR', '#e8873a', clamp((lt - 1.2) / .35), 52);
} });
// 8: Wikramawardhana in the Western Palace
SHOTS.push({ start: 18.1, end: 21.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  pendopoBG(ctx, cam, WESTHALL);
  applyCam(ctx, cam, 1); drawThrone(ctx, 540, 1560, 1.15);
  drawStick(ctx, C(WIK, { x: 540, y: 1960, s: 960, arms: HIPS, bob: Math.sin(t * 2) * .004, face: { eyes: 'smug', mouth: 'smirk', browOne: 1 } }));
  nameTag(ctx, 540, 770, 'Wikramawardhana (Kedaton Barat)', '#d8312b', clamp((lt - .4) / .35), 40);
  for (let i = 0; i < 5; i++) sparkle(ctx, 300 + i * 120, 900 + Math.sin(i * 2) * 60, 26, clamp((lt - 1.2) * 3) * (.5 + .5 * Math.sin(t * 6 + i)));
} });
// 9: husband of the crown princess
SHOTS.push({ start: 21.8, end: 24.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .04 });
  pendopoBG(ctx, cam, WESTHALL);
  applyCam(ctx, cam, 1);
  drawStick(ctx, C(WIK, { x: 360, y: 1950, s: 900, arms: IDLE, face: { eyes: 'happy', mouth: 'smile' } }));
  drawStick(ctx, C(PRIN, { x: 770, y: 1900, s: 780, flip: -1, arms: IDLE, face: { eyes: 'happy', mouth: 'smile' } }));
  for (let i = 0; i < 5; i++) { const k = ((lt * .9 + i / 5) % 1); drawHeart(ctx, 540 + Math.sin(i * 2 + t * 3) * 60, 1000 - k * 380, 22 + (i % 3) * 8, '#ff5a8a'); }
  nameTag(ctx, 770, 760, 'Putri Mahkota', '#f08ab0', clamp((lt - .5) / .35), 42);
} });
// 10: Bhre Wirabhumi, the king's son by a concubine
SHOTS.push({ start: 24.6, end: 29.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  pendopoBG(ctx, cam, EASTHALL);
  applyCam(ctx, cam, 1);
  drawStick(ctx, C(WIR, { x: 380, y: 1950, s: 980, arms: HIPS, bob: Math.sin(t * 2) * .004, face: { eyes: 'smug', mouth: 'smirk', browOne: -1 } }));
  nameTag(ctx, 540, 400, 'Bhre Wirabhumi (Kedaton Timur)', '#e8873a', clamp((lt - .4) / .35), 40);
  const pa = backOut(clamp((lt - 2.5) / .35));
  if (pa > 0) {
    ctx.save(); ctx.translate(820, 680); ctx.scale(pa, pa); portraitOf(ctx, 0, 0, 340, 440, HAY); ctx.restore();
    drawStick(ctx, C(SELIR, { x: 830, y: 1950, s: 640, flip: -1, arms: IDLE, face: { eyes: 'happy', mouth: 'smile' } }));
    drawHeart(ctx, 830, 1250 - Math.sin(t * 3) * 10, 30, '#ff8fb3');
    nameTag(ctx, 820, 1010, 'putra dari selir', '#2f9e57', clamp((lt - 2.9) / .35), 40);
  }
} });
// 11: each believes he deserves it more
SHOTS.push({ start: 29.8, end: 32.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  skyOnly(ctx, cam, '#14102a', '#3a2a5a');
  crownAt(ctx, 540, 760, 700, Math.sin(t * 2) * .05, 'crown');
  sparkle(ctx, 540, 520, 50, .6 + .4 * Math.sin(t * 6));
  const meL = lt > 1.4 && lt < 2.0, meR = lt > 2.0;
  drawStick(ctx, C(WIK, { x: 240, y: 1900, s: 1050, arms: { L: HIPS.L, R: meL ? { ik: [.04, -.55], bend: -1 } : HIPS.R }, face: { eyes: 'normal', mouth: 'teeth', browAng: -.45, look: [1, 0] } }));
  drawStick(ctx, C(WIR, { x: 840, y: 1900, s: 1050, flip: -1, arms: { L: HIPS.L, R: meR ? { ik: [.04, -.55], bend: -1 } : HIPS.R }, face: { eyes: 'normal', mouth: 'teeth', browAng: -.45, look: [1, 0] } }));
  const b = Math.sin(t * 12) > 0 ? 1 : -1;
  bolt(ctx, 540, 1060, 2.6, '#ffd23a', b * .25);
  if (meL) qmark(ctx, 240, 800, 90, t, 1, 'AKU!'); if (meR) qmark(ctx, 840, 800, 90, t, 1, 'AKU!');
} });
// ===== SCENE 3: BACK AND FORTH =====
// 12: 1404, armies collide
SHOTS.push({ start: 32.8, end: 35.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const sh = shake(t, 5, 2); const cam = cam0(t, lt, { pz: .03, x: 540 + sh[0], y: 960 + sh[1] });
  javaBG(ctx, t, cam, WAR); applyCam(ctx, cam, 1);
  const k = ease(clamp(lt / 1.6));
  for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) {
    const y = 1300 + r * 110 + (i % 2) * 30;
    drawStick(ctx, C(REDS, { x: lerp(-200 - i * 90, 420 - r * 40, k), y, s: 360, lean: .12, legs: walkLegs(t + i, 14, .6), arms: { L: [2.4, .2], R: [2.6, .2] }, prop: propSpear('R'), face: ANGRY }));
    drawStick(ctx, C(ORG, { x: lerp(1280 + i * 90, 660 + r * 40, k), y, s: 360, flip: -1, lean: .12, legs: walkLegs(t + i + 1, 14, .6), arms: { L: [2.4, .2], R: [2.6, .2] }, prop: propSpear('R'), face: ANGRY }));
  }
  if (lt > 1.6) fightCloud(ctx, 540, 1180, 260, t, clamp((lt - 1.6) * 3));
  kinetic(ctx, '1404-1406', 540, 420, 150, lt, .2, { burst: '#d8312b', fill: '#fff' });
} });
// 13: Paregreg, the push of war
SHOTS.push({ start: 35.8, end: 38.1, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const sh = shake(t, 6, 2); const cam = cam0(t, lt, { pz: .03, x: 540 + sh[0], y: 960 + sh[1] });
  javaBG(ctx, t, cam, WAR); applyCam(ctx, cam, 1);
  const p = Math.sin(t * 9) * 16;
  drawStick(ctx, C(REDS, { x: 300 + p, y: 1950, s: 950, lean: .2, arms: { L: { ik: [.3, -.5] }, R: { ik: [.3, -.55] } }, face: { eyes: 'normal', mouth: 'teeth', browAng: -.5 } }));
  drawStick(ctx, C(ORG, { x: 780 + p, y: 1950, s: 950, flip: -1, lean: .2, arms: { L: { ik: [.3, -.5] }, R: { ik: [.3, -.55] } }, face: { eyes: 'normal', mouth: 'teeth', browAng: -.5 } }));
  fightCloud(ctx, 540, 1250, 150, t, 1);
  kinetic(ctx, 'PAREGREG', 540, 420, 170, lt, 1.4, { burst: '#d8312b', fill: '#fff' });
} });
// 14: back and forth until everyone is worn out
SHOTS.push({ start: 38.1, end: 43.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  javaBG(ctx, t, cam, WAR); applyCam(ctx, cam, 1);
  const mid = 540 + Math.sin(lt * 2.4) * 230, tired = lt > 2.6;
  for (let i = 0; i < 4; i++) {
    const tx = tired ? Math.sin(t * 3 + i) * .03 : 0;
    drawStick(ctx, C(REDS, { x: mid - 100 - i * 140, y: 1700 + (i % 2) * 60, s: 520, lean: tired ? .05 : .2, bob: tired ? .02 : 0, arms: { L: [1.5, -.2], R: [1.6, -.2] }, legs: walkLegs(t + i, tired ? 5 : 10, .35), face: tired ? { eyes: 'squint', mouth: 'flat', browAng: .3 } : ANGRY, headTilt: tx }));
    drawStick(ctx, C(ORG, { x: mid + 100 + i * 140, y: 1700 + (i % 2) * 60, s: 520, flip: -1, lean: tired ? .05 : .2, bob: tired ? .02 : 0, arms: { L: [1.5, -.2], R: [1.6, -.2] }, legs: walkLegs(t + i + 1, tired ? 5 : 10, .35), face: tired ? { eyes: 'squint', mouth: 'flat', browAng: .3 } : ANGRY, headTilt: tx }));
  }
  drawArrow(ctx, 360, 520, 620, 520, '#d8312b', 36, 1); drawArrow(ctx, 720, 700, 460, 700, '#e8873a', 36, 1);
  if (tired) for (let i = 0; i < 4; i++) sweat(ctx, 260 + i * 190, 1060 + ((lt * 90 + i * 30) % 90), 34, clamp((lt - 2.6) * 3));
} });
// 15: the East pushes forward on the map
SHOTS.push({ start: 43.6, end: 46.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  skyOnly(ctx, cam, '#1a2a4a', '#2a4a7a');
  const k = ease(clamp(lt / 2.6));
  drawJavaTwo(ctx, 150, 560, 780, { front: lerp(.5, .2, k) });
  drawArrow(ctx, 900, 820, lerp(860, 300, k), 820, '#e8873a', 38, 1); drawArrow(ctx, 880, 680, lerp(860, 320, k), 680, '#e8873a', 28, 1);
  drawArrow(ctx, 360, 760, 160, 760, '#d8312b', 26, clamp(k * 1.5));
  nameTag(ctx, 750, 420, 'TIMUR UNGGUL', '#e8873a', clamp((lt - .3) / .35), 48);
} });
// 16: they reach the centre of Majapahit
SHOTS.push({ start: 46.8, end: 49.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  javaBG(ctx, t, cam, WAR);
  applyCam(ctx, cam, .85); drawGate(ctx, 400, 1150, 1.2, '#b5523a', clamp((lt - 1) * .8), t);
  applyCam(ctx, cam, 1);
  for (let i = 0; i < 4; i++) drawStick(ctx, C(ORG, { x: 1180 - lt * 220 - i * 150, y: 1700 + (i % 2) * 50, s: 520, flip: -1, lean: .12, legs: walkLegs(t + i, 12, .6), arms: { L: [2.4, .2], R: [2.6, .2] }, prop: propFlag('R', '#e8873a'), face: { eyes: 'happy', mouth: 'grin' } }));
  for (let i = 0; i < 3; i++) drawStick(ctx, C(REDS, { x: 180 - lt * 60 - i * 130, y: 1750, s: 480, lean: -.12, legs: walkLegs(t + i, 14, .6), arms: UP, face: { eyes: 'wide', mouth: 'o', browAng: .4, look: [1, 0] } }));
  nameTag(ctx, 540, 640, 'Pusat Majapahit', '#d8312b', clamp((lt - .3) / .35), 44);
} });
// 17: the pages of the calendar fly
SHOTS.push({ start: 49.6, end: 52.0, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  javaBG(ctx, t, cam, DUSK2); applyCam(ctx, cam, 1);
  const yr = lt < .75 ? '1404' : lt < 1.5 ? '1405' : '1406';
  drawCalendar(ctx, 540, 820, 1.7, yr, lt * 2.2);
  drawStick(ctx, C(REDS, { x: 220, y: 1900, s: 900, arms: IDLE, bob: Math.abs(Math.sin(t * 4)) * .01, face: { eyes: 'squint', mouth: 'flat', browAng: .3 } }));
  drawStick(ctx, C(ORG, { x: 860, y: 1900, s: 900, flip: -1, arms: IDLE, bob: Math.abs(Math.sin(t * 4 + 1)) * .01, face: { eyes: 'squint', mouth: 'flat', browAng: .3 } }));
  for (let i = 0; i < 4; i++) { sweat(ctx, 330, 1250 + ((lt * 80 + i * 22) % 80), 30, 1); sweat(ctx, 750, 1250 + ((lt * 80 + i * 30) % 80), 30, 1); }
} });
// 18: exhausted soldiers
SHOTS.push({ start: 52.0, end: 54.0, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  javaBG(ctx, t, cam, DUSK2); applyCam(ctx, cam, 1);
  for (let i = 0; i < 6; i++) drawStick(ctx, C(i % 2 ? ORG : REDS, { x: 110 + i * 170, y: 1500 + (i % 3) * 120, s: 520, flip: i % 2 ? -1 : 1, squash: .78, lean: .1, arms: { L: [.2, -.1], R: [.2, -.1] }, headTilt: Math.sin(t * 2 + i) * .08, face: { eyes: 'squint', mouth: 'flat', browAng: .35 } }));
  for (let i = 0; i < 6; i++) sweat(ctx, 170 + i * 170, 1050 + ((lt * 80 + i * 25) % 80) + (i % 3) * 120, 28, 1);
  drawFly(ctx, 540 + Math.cos(t * 4) * 200, 1000 + Math.sin(t * 5) * 60, t);
} });
// ===== SCENE 4: THE TURNING POINT =====
// 19: fresh troops arrive
SHOTS.push({ start: 54.0, end: 57.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  javaBG(ctx, t, cam, WAR); applyCam(ctx, cam, 1);
  for (let i = 0; i < 6; i++) drawStick(ctx, C(REDS, { x: -250 + lt * 330 - i * 130 + 600, y: 1500 + (i % 3) * 70, s: 420, lean: .12, legs: walkLegs(t + i, 14, .6), arms: walkArms(t + i, 14, .5), prop: i % 2 ? propFlag('R', '#d8312b') : propSpear('R'), face: { eyes: 'happy', mouth: 'grin' } }));
  drawStick(ctx, C(WIK, { x: 380, y: 2050, s: 1200, armLen: 1.2, arms: { L: HIPS.L, R: lt > .6 ? [1.7, -.05] : HIPS.R }, face: { eyes: 'smug', mouth: 'smirk', browOne: 1, look: [1, 0] } }));
  nameTag(ctx, 380, 700, 'Pasukan bantuan tiba', '#d8312b', clamp((lt - .6) / .35), 42);
} });
// 20: 1406, the red arrow turns and smashes into the East
SHOTS.push({ start: 57.6, end: 60.4, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const sh = (lt > 1.9 && lt < 2.3) ? shake(t, 12, 3) : [0, 0]; const cam = cam0(t, lt, { pz: .02, x: 540 + sh[0], y: 960 + sh[1] });
  skyOnly(ctx, cam, '#1a2a4a', '#2a4a7a');
  const k = easeIn(clamp(lt / 2.0));
  drawJavaTwo(ctx, 150, 560, 780, { front: lerp(.2, .94, k) });
  drawArrow(ctx, 150, 820, lerp(250, 860, k), 820, '#d8312b', 40, 1); drawArrow(ctx, 160, 680, lerp(260, 840, k), 680, '#d8312b', 28, 1);
  if (lt > 1.9) burst(ctx, 900, 760, 150 * clamp(1 - (lt - 1.9) * 1.6), 12, '#ffd23a', 5);
  kinetic(ctx, '1406', 540, 380, 230, lt, .15, { burst: '#d8312b', fill: '#fff' });
} });
// 21: the Eastern Palace is stormed
SHOTS.push({ start: 60.4, end: 62.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const sh = shake(t, 7, 2); const cam = cam0(t, lt, { pz: .03, x: 540 + sh[0], y: 960 + sh[1] });
  javaBG(ctx, t, cam, BLOOD);
  applyCam(ctx, cam, .85); drawGate(ctx, 760, 1250, 1.3, '#9a3a2a', 1, t);
  applyCam(ctx, cam, 1);
  for (let i = 0; i < 4; i++) drawStick(ctx, C(REDS, { sil: SIL_M, x: -150 + lt * 450 - i * 150, y: 1700 + (i % 2) * 60, s: 520, lean: .12, legs: walkLegs(t + i, 14, .6), arms: { L: [2.4, .2], R: [2.6, .2] }, prop: propSpear('R') }));
  for (let i = 0; i < 3; i++) drawStick(ctx, C(ORG, { x: 1100 - lt * 150 + i * 120, y: 1750, s: 460, flip: -1, lean: -.12, legs: walkLegs(t + i, 16, .7), arms: UP, face: { eyes: 'wide', mouth: 'o', browAng: .4, look: [-1, 0] } }));
  embers(ctx, t, 30, 8, [0, 400, 1080, 1900]);
  tintScreen(ctx, '#5a0010', .15);
} });
// 22: Wirabhumi flees in a boat at night
SHOTS.push({ start: 62.6, end: 65.0, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03, hand: 5 });
  nightSeaBG(ctx, t, cam, {});
  for (let i = 0; i < 4; i++) drawFire(ctx, 90 + i * 80, 960 + (i % 2) * 20, .22 + lt * .08, t, i + 1);
  const bx = 460 + lt * 90, rowA = Math.sin(t * 9);
  drawBoat(ctx, bx, 1460, 1.0, t);
  drawStick(ctx, C(WIR, { x: bx, y: 1450, s: 680, legs: { L: [.2, -.2], R: [.2, -.2] }, arms: { L: [1.3 + rowA * .5, -.4], R: [1.3 - rowA * .5, -.4] }, face: { eyes: 'wide', mouth: 'o', browAng: .5, look: [-1, 0] } }));
  line(ctx, bx - 100, 1300, bx - 380, 1540, 12, '#6b4a2a'); line(ctx, bx + 100, 1300, bx + 380, 1540, 12, '#6b4a2a');
  puff(ctx, bx - 380, 1550, 40 + Math.abs(rowA) * 30, t, '#dfe8ff', 6, .8); puff(ctx, bx + 380, 1550, 40 + Math.abs(-rowA) * 30, t, '#dfe8ff', 7, .8);
  sweat(ctx, bx + 120, 960 + (lt * 70 % 60), 34, 1);
  tintScreen(ctx, '#050a20', .1);
} });
// 23: shadows close in, then only his small crown floats
SHOTS.push({ start: 65.0, end: 68.0, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  const second = lt > 1.5;
  nightSeaBG(ctx, t, cam, { moonA: second ? .6 : 1 });
  if (!second) {
    const k = ease(clamp(lt / 1.4));
    drawBoat(ctx, 540, 1480, 1.0, t);
    drawStick(ctx, C(WIR, { x: 540, y: 1470, s: 680, arms: UP, face: { eyes: 'wide', mouth: 'o', browAng: .5 } }));
    [[0, 1], [1, 1], [2, 1]].forEach(([i]) => { drawStick(ctx, C(REDS, { sil: SIL_M, x: lerp(-250 - i * 90, 90 + i * 110, k), y: 1700 + i * 40, s: 520, lean: .1, prop: propSpear('R'), legs: walkLegs(t + i, 8, .3) })); drawFire(ctx, lerp(-250 - i * 90, 90 + i * 110, k) + 60, 1250 + i * 40, .35, t, i + 1); });
    [[0], [1], [2]].forEach(([i]) => drawStick(ctx, C(REDS, { sil: SIL_M, x: lerp(1330 + i * 90, 990 - i * 110, k), y: 1700 + i * 40, s: 520, flip: -1, lean: .1, prop: propSpear('R'), legs: walkLegs(t + i, 8, .3) })));
  } else {
    const k = lt - 1.5;
    for (let i = 0; i < 3; i++) { const r = ((k * .7 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - r; ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(220,235,255,.8)'; ctx.beginPath(); ctx.ellipse(540, 1480, 60 + r * 260, 16 + r * 60, 0, 0, TAU); ctx.stroke(); ctx.restore(); }
    crownAt(ctx, 540, 1560 + Math.sin(t * 2) * 10, 1500, Math.sin(t * 1.4) * .1, 'crownSmall');
  }
  tintScreen(ctx, '#050a20', .15); tintScreen(ctx, '#000', clamp((lt - 2.5) / .5) * .6);
} });
// 24: 1406, the West wins
SHOTS.push({ start: 68.0, end: 69.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .04 });
  javaBG(ctx, t, cam, SUNRISE); applyCam(ctx, cam, 1);
  drawStick(ctx, C(WIK, { x: 540, y: 1960, s: 960, arms: { L: UP.L, R: [2.6 + Math.sin(t * 9) * .3, .3] }, prop: propFlag('R', '#d8312b'), face: { eyes: 'happy', mouth: 'grin' } }));
  confetti(ctx, t, clamp(lt * 3), 6);
  kinetic(ctx, '1406', 540, 340, 200, lt, .05, { fill: '#fff', burst: '#d8312b' });
  kinetic(ctx, 'KEDATON BARAT MENANG', 540, 620, 60, lt, .3, { fill: '#ffd23a', rot: 0 });
} });
// ===== SCENE 5: THE HOLLOW VICTORY =====
// 25: a hollow victory
SHOTS.push({ start: 69.6, end: 71.2, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  pendopoBG(ctx, cam, Object.assign({ dark: .35 }, WESTHALL)); applyCam(ctx, cam, 1);
  const sad = lt > .7;
  drawStick(ctx, C(WIK, { x: 540, y: 1960, s: 960, arms: sad ? IDLE : UP, face: sad ? { eyes: 'normal', mouth: 'flat', look: [Math.sin(t * 5) > 0 ? 1 : -1, 0] } : { eyes: 'happy', mouth: 'grin' } }));
  if (!sad) rrect(ctx, 540 + Math.sin(t * 4) * 30, 400 + lt * 400, 22, 11, 3), fillStroke(ctx, '#ffd23a', 3);
  if (sad) { sweat(ctx, 700, 1060, 34, 1); qmark(ctx, 800, 700, 90, t, clamp((lt - .8) * 4), '...'); }
  tintScreen(ctx, '#0a0510', .15);
} });
// 26: the treasury is empty
SHOTS.push({ start: 71.2, end: 73.2, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  pendopoBG(ctx, cam, Object.assign({ dark: .5 }, WESTHALL)); applyCam(ctx, cam, 1);
  drawChestEmpty(ctx, 540, 1650, 1.8);
  drawFly(ctx, 540 + Math.cos(t * 4) * 230, 1050 + Math.sin(t * 5) * 80, t);
  drawStick(ctx, C(WIK, { x: 190, y: 1900, s: 700, lean: .08, arms: IDLE, face: { eyes: 'wide', mouth: 'o', browAng: .4, look: [1, 0] } }));
  qmark(ctx, 540, 700, 130, t, clamp((lt - .4) * 3), '?');
  tintScreen(ctx, '#0a0510', .2);
} });
// 27: the shattered army
SHOTS.push({ start: 73.2, end: 74.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  javaBG(ctx, t, cam, GRAY); applyCam(ctx, cam, 1);
  for (let i = 0; i < 3; i++) { const x = 220 + i * 310 + lt * 40, y = 1850 - (i % 2) * 40; drawStick(ctx, C(REDS, { x, y, s: 760, lean: .22, squash: .95, legs: walkLegs(t * .5 + i, 5, .25), arms: { L: [.3, -.2], R: [.2, -.1] }, headTilt: .15, face: { eyes: 'squint', mouth: 'frown', browAng: .4 } })); bandage(ctx, x, y, 760); }
  tintScreen(ctx, '#0a0a12', .2);
} });
// 28: chaos, the envoys get caught in the middle
SHOTS.push({ start: 74.8, end: 78.0, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  javaBG(ctx, t, cam, WAR); applyCam(ctx, cam, 1);
  [[430, 0], [650, 1], [540, 2]].forEach(([x, i]) => { drawStick(ctx, C(MING, { x, y: 1680 + (i === 2 ? 40 : 0), s: 480, arms: IDLE, legs: walkLegs(t + i, 5, .2), prop: i === 0 ? propScroll('R', 0) : null, face: lt > 1.0 ? { eyes: 'wide', mouth: 'o', browAng: .4 } : { eyes: 'happy', mouth: 'smile' } }));
    if (lt > 1.0) qmark(ctx, x, 1180, 70, t + i, 1, '?'); });
  const k = ease(clamp(lt / 1.8));
  for (let i = 0; i < 4; i++) {
    drawStick(ctx, C(REDS, { x: lerp(-150 - i * 100, 330 + i * 30, k), y: 1740 + (i % 2) * 50, s: 470, lean: .12, legs: walkLegs(t + i, 14, .6), arms: { L: [2.4, .2], R: [2.6, .2] }, prop: propSpear('R'), face: ANGRY }));
    drawStick(ctx, C(ORG, { x: lerp(1230 + i * 100, 760 - i * 30, k), y: 1740 + (i % 2) * 50, s: 470, flip: -1, lean: .12, legs: walkLegs(t + i + 1, 14, .6), arms: { L: [2.4, .2], R: [2.6, .2] }, prop: propSpear('R'), face: ANGRY }));
  }
  fightCloud(ctx, 540, 1450, 340, t, clamp((lt - 1.8) * 2.5));
  if (lt > 2.4) qmark(ctx, 540, 850, 140, t, clamp((lt - 2.4) * 4), 'OOPS!');
} });
// 29: the aftermath, 170 envoys' hats
SHOTS.push({ start: 78.0, end: 81.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  javaBG(ctx, t, cam, DUSK2); applyCam(ctx, cam, 1);
  const n = Math.floor(clamp((lt - .1) / 1.6) * 48);
  for (let i = 0; i < 48; i++) if (i < n) crownAt(ctx, 150 + (i % 8) * 110, 1000 + Math.floor(i / 8) * 115, 150, (((i * 7) % 5) - 2) * .12, 'ming');
  [[110, 1], [970, -1]].forEach(([x, f], i) => { drawStick(ctx, C(REDS, { x, y: 1950, s: 700, flip: f, arms: i ? UP : { L: [.3, -.1], R: { ik: [.06, -.69], bend: -1 } }, face: { eyes: 'wide', mouth: 'o', browAng: .45 } })); sweat(ctx, x + f * 90, 1480 + (lt * 70 % 60), 30, 1); });
  kinetic(ctx, '170 UTUSAN', 540, 400, 150, lt, .4, { burst: '#2a4fa8', fill: '#fff' });
} });
// 30: Ming sends the bill
SHOTS.push({ start: 81.8, end: 84.7, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const sh = (lt > .3 && lt < .6) ? shake(t, 10, 3) : [0, 0]; const cam = cam0(t, lt, { pz: .03, x: 540 + sh[0], y: 960 + sh[1] });
  palaceBG(ctx, cam); applyCam(ctx, cam, 1);
  const bx = lerp(1500, 640, easeOut(clamp(lt / .3)));
  drawStick(ctx, C(MING, { x: 330, y: 2100, s: 1250, armLen: 1.2, arms: { L: HIPS.L, R: { ik: loc(560, 1000, 330, 2100, 1250) } }, face: { eyes: 'normal', mouth: 'teeth', browAng: -.5, look: [1, 0] } }));
  drawBill(ctx, bx, 980, 560, 720, .06);
  drawStick(ctx, C(WIK, { x: 940, y: 2000, s: 540, flip: -1, lean: -.08, arms: UP, face: { eyes: 'wide', mouth: 'o', browAng: .5 } })); sweat(ctx, 880, 1560, 30, 1);
  for (let i = 0; i < 5; i++) { const k = ((lt * .8 + i / 5) % 1); drawCoin(ctx, 940 + Math.sin(i * 2 + t * 3) * 60, 1500 - k * 600, 22, t * 6 + i); }
  nameTag(ctx, 330, 640, 'Utusan Dinasti Ming', '#2a4fa8', clamp((lt - .5) / .35), 40);
  if (lt > .3 && lt < .5) flash(ctx, (.5 - lt) * 2);
} });
// 31: the islands lose their colour, one by one
SHOTS.push({ start: 84.7, end: 87.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  skyOnly(ctx, cam, '#0a1020', '#1a2a3a');
  const g = {}; ['sumatra', 'borneo', 'sulawesi', 'maluku', 'papua', 'nusa'].forEach((k, i) => g[k] = clamp((lt - .2 - i * .38) / .5));
  drawNusantaraGray(ctx, 60, 520, 960, g);
  for (let i = 0; i < 6; i++) { const f = g[['sumatra', 'borneo', 'sulawesi', 'maluku', 'papua', 'nusa'][i]]; if (f > 0 && f < 1) burst(ctx, [210, 440, 640, 780, 930, 610][i], [760, 640, 700, 660, 800, 980][i], 40 * (1 - f), 8, '#fff', i + 3); }
} });
// 32: only Java stays gold
SHOTS.push({ start: 87.8, end: 90.9, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .05 });
  skyOnly(ctx, cam, '#0a1020', '#1a2a3a');
  drawNusantaraGray(ctx, 60, 480, 960, { sumatra: 1, borneo: 1, sulawesi: 1, maluku: 1, papua: 1, nusa: 1 });
  drawStick(ctx, C(WIK, { x: 540, y: 2150, s: 900, arms: IDLE, headTilt: .1, face: { eyes: 'normal', mouth: 'frown', browAng: .45, look: [0, -1] } }));
  tintScreen(ctx, '#0a0a12', .15);
} });
// ===== SCENE 6: CLOSING =====
// 33: the gate ages, vines grow
SHOTS.push({ start: 90.9, end: 93.3, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  javaBG(ctx, t, cam, GRAY);
  applyCam(ctx, cam, .85); const age = clamp(lt / 2.0);
  drawGate(ctx, 540, 1400, 1.5, mix('#b5523a', '#6a6a72', age), 0, t);
  drawVines(ctx, 330, 1400, 1.2, age, 2); drawVines(ctx, 760, 1400, 1.2, age, 5);
  applyCam(ctx, cam, 1); leaves(ctx, t, clamp(lt), 6, [0, 200, W, 1800], 24);
  tintScreen(ctx, '#0a0a12', .3);
} });
// 34: the cracked crown on the ground, leaves slowly cover it
SHOTS.push({ start: 93.3, end: 98.9, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  crownGround(ctx, t, cam, clamp(lt / 5.5) * .75);
} });
// 35: runtuh dari dalam, then the closing titles
SHOTS.push({ start: 98.9, end: 105.4, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .01 });
  crownGround(ctx, t, cam, .75 + clamp(lt / 4) * .25);
  kinetic(ctx, 'RUNTUH', 540, 330, 140, lt, .2, { fill: '#fff', rot: 0, out: 2.9 });
  kinetic(ctx, 'DARI DALAM', 540, 490, 130, lt, .5, { fill: '#ffd23a', rot: 0, out: 2.9 });
  kinetic(ctx, 'PERANG PAREGREG', 540, 330, 78, lt, 3.2, { fill: '#fff', rot: 0 });
  kinetic(ctx, '(1404-1406)', 540, 430, 70, lt, 3.5, { fill: '#ffd23a', rot: 0 });
  kinetic(ctx, 'TAMAT', 540, 640, 150, lt, 4.2, { fill: '#fff', rot: 0 });
  kinetic(ctx, 'Serial Sejarah Majapahit', 540, 800, 52, lt, 4.8, { fill: '#cfd4da', rot: 0 });
  tintScreen(ctx, '#000', clamp((lt - 5.7) / .7));
} });
