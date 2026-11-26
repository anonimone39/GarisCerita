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

const SHOTS = [];
// ===== SCENE 1: HOOK =====
// 1: two crowned figures, a heart between them, the heart cracks under a keris shadow
SHOTS.push({ start: 0, end: 3.4, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const hit = lt > 2.5; const sh = (lt > 2.5 && lt < 2.9) ? shake(t, 16, 3) : [0, 0];
  const cam = cam0(t, lt, { pz: .035, x: 540 + sh[0], y: 960 + sh[1] });
  javaBG(ctx, t, cam, WARM);
  applyCam(ctx, cam, 1);
  const crack = clamp((lt - 1.7) / .7), split = clamp((lt - 2.55) / .5);
  drawStick(ctx, C(HAY, { x: 270, y: 1800, s: 840, arms: IDLE, bob: Math.sin(t * 3) * .004, headTilt: hit ? 0 : .08, face: hit ? { eyes: 'wide', mouth: 'o', browAng: .45 } : { eyes: 'happy', mouth: 'smile' } }));
  drawStick(ctx, C(DYAH, { x: 810, y: 1800, s: 840, flip: -1, arms: IDLE, bob: Math.sin(t * 3 + 1) * .004, headTilt: hit ? 0 : .08, face: hit ? { eyes: 'wide', mouth: 'o', browAng: .45 } : { eyes: 'happy', mouth: 'smile' } }));
  ctx.save(); ctx.globalAlpha = 1 - clamp((lt - 1.9) / .5);
  for (let i = 0; i < 6; i++) drawHeart(ctx, 330 + i * 80 + Math.sin(t * 2 + i) * 30, 1250 - ((lt * 150 + i * 130) % 640), 24 + (i % 3) * 8, '#ff8fb3');
  ctx.restore();
  drawHeart(ctx, 540, 1000 + Math.sin(t * 4) * 8, 170 * (1 + .03 * Math.sin(t * 9)), '#ff5a8a', { crack, split });
  if (lt > 1.9) { const k = clamp((lt - 1.9) / .6); drawKerisShadow(ctx, 540, lerp(-1500, 1000 - 1150, easeIn(k)), 1150, 0); }
  if (lt > 2.5 && lt < 2.75) burst(ctx, 540, 1000, 220 * (1 - (lt - 2.5) * 3.2), 12, '#fff', 4);
  if (lt > 2.5 && lt < 2.7) flash(ctx, (2.7 - lt) * 3);
  tintScreen(ctx, '#2a0508', clamp((lt - 2.5) / .7) * .5);
} });
// 2: Sunda party walks to the wedding arch, still bright
SHOTS.push({ start: 3.4, end: 7.0, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03, px: 20 });
  javaBG(ctx, t, cam, WARM);
  applyCam(ctx, cam, .85); drawWeddingArch(ctx, 760, 1250, 1.0, clamp((lt - 2.2) / 1.4) * .35, t);
  applyCam(ctx, cam, 1);
  [[LING, 620], [DYAH, 560], [SUN, 520], [SUN, 520]].forEach(([ch, s], i) => drawStick(ctx, C(ch, { x: 450 + lt * 200 - i * 230, y: 1780, s, legs: walkLegs(t + i, 8, .4), arms: walkArms(t + i, 8, .3), prop: i > 1 ? propBox('R') : null, face: { eyes: 'happy', mouth: 'smile' } })));
  for (let i = 0; i < 5; i++) drawHeart(ctx, 200 + i * 180, 520 - ((lt * 60 + i * 70) % 260) + 200, 26, '#ff8fb3');
  petals(ctx, t, .8, 3, [0, 300, W, 1500], 22);
} });
// 3: the same place turns dark red: ruined arch, spear silhouettes behind
SHOTS.push({ start: 7.0, end: 10.6, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .04 });
  javaBG(ctx, t, cam, BLOOD);
  applyCam(ctx, cam, .75); spearRow(ctx, -100, 1200, 1250, 380, 80, t, 1, '#14060a', '#5a4a50');
  applyCam(ctx, cam, 1);
  drawWeddingArch(ctx, 540, 1700, 1.2, 1, t);
  drawHeart(ctx, 540, 1780, 100, '#8a1a30', { crack: 1, split: .3 });
  crownAt(ctx, 260, 1830, 700, .5, 'flowers'); crownAt(ctx, 830, 1840, 700, -.4, 'iketSunda');
  embers(ctx, t, 26, 7, [0, 500, 1080, 1900]); petals(ctx, t, .6, 5, [0, 300, W, 1800], 14);
  tintScreen(ctx, '#5a0010', .2 + clamp(lt / 3) * .15);
} });
// 4: title
SHOTS.push({ start: 10.6, end: 13.1, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  javaBG(ctx, t, cam, BLOOD);
  applyCam(ctx, cam, 1);
  drawKerisShadow(ctx, 330, 300, 1500, .35, 'rgba(10,0,10,.9)'); drawKerisShadow(ctx, 750, 300, 1500, -.35, 'rgba(10,0,10,.9)');
  spearRow(ctx, -60, 1200, 1900, 420, 90, t, 9, '#14060a', '#5a4a50');
  embers(ctx, t, 30, 5, [0, 500, 1080, 1900]);
  kinetic(ctx, 'PERANG BUBAT', 540, 640, 124, lt, .1, { burst: '#d8312b', fill: '#fff' });
  tintScreen(ctx, '#5a0010', .15);
} });
// ===== SCENE 2: BACKGROUND =====
// 5a: 1357, Majapahit in glory
SHOTS.push({ start: 13.1, end: 16.4, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .045 });
  javaBG(ctx, t, cam, SUNRISE);
  applyCam(ctx, cam, .85); drawGate(ctx, 540, 1250, 1.45);
  applyCam(ctx, cam, 1);
  for (let i = 0; i < 9; i++) drawStick(ctx, C(MJT, { x: 80 + i * 115, y: 1560 + (i % 3) * 40, s: 320, arms: { L: [2.6 + Math.sin(t * 9 + i) * .3, .3], R: [2.6 - Math.sin(t * 9 + i) * .3, .3] }, bob: -Math.abs(Math.sin(t * 7 + i)) * .05, prop: i % 4 === 0 ? propFlag('R', '#fff', true) : null, face: { eyes: 'happy', mouth: 'grin' } }));
  confetti(ctx, t, clamp(lt * 2), 6);
  kinetic(ctx, '1357', 540, 420, 230, lt, .2, { burst: '#ffd23a', fill: '#fff' });
} });
// 5b: Hayam Wuruk at the peak of glory
SHOTS.push({ start: 16.4, end: 20.0, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  pendopoBG(ctx, cam);
  applyCam(ctx, cam, 1); drawThrone(ctx, 540, 1560, 1.15);
  [[130, 1], [950, -1]].forEach(([x, f], i) => drawStick(ctx, C(MJT, { x, y: 1700, s: 520, flip: f, arms: { L: [2.6 + Math.sin(t * 8 + i) * .3, .3], R: [2.6 - Math.sin(t * 8 + i) * .3, .3] }, face: { eyes: 'happy', mouth: 'grin' } })));
  drawStick(ctx, C(HAY, { x: 540, y: 1960, s: 960, arms: HIPS, bob: Math.sin(t * 2) * .004, face: { eyes: 'happy', mouth: 'grin' } }));
  for (let i = 0; i < 6; i++) sparkle(ctx, 280 + i * 100, 700 + Math.sin(i * 2) * 90, 30, clamp((lt - .4 - i * .1) * 3) * (.5 + .5 * Math.sin(t * 6 + i)));
  confetti(ctx, t, .8, 8);
  nameTag(ctx, 540, 790, 'Hayam Wuruk', '#d9a83a', clamp((lt - .5) / .35));
} });
// 6: he falls in love with the portrait of Dyah Pitaloka
SHOTS.push({ start: 20.0, end: 23.2, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .04 });
  pendopoBG(ctx, cam);
  applyCam(ctx, cam, 1); drawPortrait(ctx, 790, 820, 380, 500);
  const lean = kf(lt, [[0, 0], [.9, .1]]);
  drawStick(ctx, C(HAY, { x: 290, y: 1930, s: 980, lean, arms: { L: HIPS.L, R: { ik: [.2, -.7], bend: -1 } }, headTilt: .08, face: { eyes: 'wide', mouth: 'smile', look: [1, -.3], browUp: 1 } }));
  for (let i = 0; i < 6; i++) { const k = ((lt * .9 + i / 6) % 1); drawHeart(ctx, 400 + i * 40 + Math.sin(t * 3 + i) * 30, 1060 - k * 420, 22 + (i % 3) * 9, '#ff5a8a'); }
  sparkle(ctx, 790, 560, 44, clamp((lt - .6) * 3) * (.6 + .4 * Math.sin(t * 8)));
  nameTag(ctx, 790, 1190, 'Dyah Pitaloka', '#e8779f', clamp((lt - 1.4) / .35));
} });
// 7: the princess of Sunda reads the proposal
SHOTS.push({ start: 23.2, end: 26.4, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .04 });
  javaBG(ctx, t, cam, WARM);
  applyCam(ctx, cam, 1); bush(ctx, 140, 1900, 1.8, 3); bush(ctx, 960, 1900, 1.8, 5);
  const open = kf(lt, [[.3, 0], [1.0, 1]]), read = lt > 1.3;
  drawStick(ctx, C(DYAH, { x: 540, y: 1950, s: 1000, armLen: 1.1, arms: { L: IDLE.L, R: { ik: [.28, -.5], bend: -1 } }, prop: propScroll('R', open), headTilt: read ? .1 : 0, face: read ? { eyes: 'happy', mouth: 'grin' } : { eyes: 'normal', look: [.6, .3], mouth: 'smile' } }));
  if (read) for (let i = 0; i < 6; i++) { const k = ((lt * .8 + i / 6) % 1); drawHeart(ctx, 620 + Math.sin(i * 2 + t * 3) * 120, 1120 - k * 500, 20 + (i % 3) * 8, '#ff5a8a'); }
  nameTag(ctx, 540, 760, 'Putri Kerajaan Sunda', '#2f63c9', clamp((lt - .3) / .35), 40);
  petals(ctx, t, .7, 4, [0, 300, W, 1700], 16);
} });
// 8: King Linggabuana agrees
SHOTS.push({ start: 26.4, end: 29.2, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .04 });
  pendopoBG(ctx, cam, { wallTop: '#cfe0ff', wallBot: '#7fa6e8', pillar: '#2f4f8f', banner: '#2f63c9', floor: '#3a4f8f' });
  applyCam(ctx, cam, 1);
  const nod = lt > 1.5 ? Math.sin((lt - 1.5) * 9) * .05 : 0;
  drawStick(ctx, C(LING, { x: 410, y: 1950, s: 1000, armLen: 1.1, arms: { L: HIPS.L, R: { ik: [.26, -.5], bend: -1 } }, prop: propScroll('R', 1), headTilt: nod, face: lt > 1.5 ? { eyes: 'happy', mouth: 'grin' } : { eyes: 'normal', mouth: 'smile', look: [.4, .2] } }));
  drawStick(ctx, C(DYAH, { x: 820, y: 1850, s: 800, flip: -1, arms: IDLE, face: { eyes: 'happy', mouth: 'smile' } }));
  if (lt > 1.6) { sparkle(ctx, 520, 1180, 46 * clamp((lt - 1.6) * 4), clamp((lt - 1.6) * 4)); burst(ctx, 470, 1150, 70 * clamp(1 - (lt - 1.6) * 3), 9, '#2f63c9', 6); }
  nameTag(ctx, 410, 770, 'Prabu Linggabuana', '#2f63c9', clamp((lt - .3) / .35), 44);
} });
// 9: they set off with family and a small escort
SHOTS.push({ start: 29.2, end: 33.3, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { px: 140, pz: 0, hand: 4 });
  javaBG(ctx, t, cam, WARM);
  applyCam(ctx, cam, 1); for (let i = 0; i < 8; i++) drawTree(ctx, -300 + i * 420, 1180, .9, 100 + i, Math.sin(t + i) * .4);
  const base = 540 + lt * 140;
  [[LING, 620], [DYAH, 560], [QUEEN, 560], [SUN, 520], [SUN, 520], [SUN, 520]].forEach(([ch, s], i) => drawStick(ctx, C(ch, { x: base + 330 - i * 190, y: 1760, s, legs: walkLegs(t + i, 8, .4), arms: walkArms(t + i, 8, .3), prop: i > 2 ? propBox('R') : null, face: { eyes: 'happy', mouth: 'smile' } })));
  nameTag(ctx, 540, 640, 'Rombongan kecil Sunda', '#2f63c9', clamp((lt - 1.5) / .35), 40);
} });
// 10: no war army, just gifts
SHOTS.push({ start: 33.3, end: 36.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  javaBG(ctx, t, cam, WARM);
  applyCam(ctx, cam, 1);
  drawNoSign(ctx, 540, 640, 240, clamp((lt - .3) / .35));
  for (let i = 0; i < 4; i++) { const a = backOut(clamp((lt - 1.5 - i * .2) / .3)); if (a > 0) giftAt(ctx, 220 + i * 210, 1780, 150 * a, ['#d8312b', '#2f63c9', '#ffd23a', '#2f9e57'][i]); }
  [[330, 1], [760, -1]].forEach(([x, f], i) => drawStick(ctx, C(SUN, { x, y: 1700, s: 800, flip: f, armLen: 1.1, arms: { L: IDLE.L, R: { ik: [.25, -.5], bend: -1 } }, prop: propBox('R'), bob: Math.sin(t * 3 + i) * .006, face: { eyes: 'happy', mouth: 'smile' } })));
} });
// 11: camp at Bubat Field
SHOTS.push({ start: 36.8, end: 40.2, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  sundaCampBG(ctx, t, cam, { top: '#8a5a9a', bot: '#ffb070', hills: ['#c08a8a', '#a06a7a', '#7a4a5a'], g1: '#a8b060', g2: '#78803a', sunX: 540, sunY: 780, sunR: 120, sunPow: 1.2, clouds: false, vcol: '#b08aa0' });
  drawFire(ctx, 800, 1660, .7, t, 2);
  drawStick(ctx, C(LING, { x: 300, y: 1780, s: 700, arms: IDLE, face: { eyes: 'happy', mouth: 'smile' } }));
  drawStick(ctx, C(DYAH, { x: 560, y: 1800, s: 640, arms: IDLE, face: { eyes: 'happy', mouth: 'smile', look: [.6, 0] } }));
  drawSign(ctx, 900, 1500, 1.0 * backOut(clamp((lt - .5) / .35)), 'BUBAT', clamp((lt - .5) * 4));
  kinetic(ctx, 'LAPANGAN BUBAT', 540, 420, 108, lt, .6, { burst: '#2f63c9', fill: '#fff' });
  tintScreen(ctx, '#ff7a2a', .06);
} });
// ===== SCENE 3: GAJAH MADA =====
// 12: trouble comes
SHOTS.push({ start: 40.2, end: 43.4, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .04 });
  javaBG(ctx, t, cam, DUSK2);
  applyCam(ctx, cam, 1);
  const s = lerp(1100, 1380, ease(clamp(lt / 3)));
  longShadow(ctx, 540, 2060, 600, .3, 1);
  drawStick(ctx, C(GM, { x: 540, y: 2100, s, armLen: 1.1, arms: { L: HIPS.L, R: { ik: [.24, -.62], bend: -1 } }, prop: propKerisBig('R', .4), face: { eyes: 'normal', mouth: 'flat', browAng: -.45, look: [.3, 0] } }));
  nameTag(ctx, 540, 720, 'Mahapatih Gajah Mada', '#8a2a2a', clamp((lt - 1.3) / .35), 44);
  tintScreen(ctx, '#1a0508', .2 + clamp(lt / 3) * .1);
} });
// 13a: obsessed with the Palapa Oath
SHOTS.push({ start: 43.4, end: 46.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  javaBG(ctx, t, cam, DUSK2);
  applyCam(ctx, cam, 1);
  drawStick(ctx, C(GM, { x: 350, y: 2050, s: 1250, armLen: 1.1, arms: { L: HIPS.L, R: { ik: [.24, -.62], bend: -1 } }, prop: propKerisBig('R', .4), face: { eyes: 'normal', mouth: 'flat', browAng: -.4, look: [.8, -.5] } }));
  const ba = backOut(clamp((lt - .5) / .35));
  circle(ctx, 640, 1010, 26 * ba); fillStroke(ctx, '#fff7e6', 5); circle(ctx, 700, 900, 38 * ba); fillStroke(ctx, '#fff7e6', 6);
  ctx.save(); ctx.translate(770, 560); ctx.scale(ba, ba);
  circle(ctx, 0, 0, 280); fillStroke(ctx, '#fff7e6', 8);
  ctx.save(); circle(ctx, 0, 0, 270); ctx.clip(); ctx.translate(-250, -170); drawNusantara(ctx, 0, 0, 500, clamp((lt - 1.0) / 2.2), t); ctx.restore();
  ctx.restore();
  kinetic(ctx, 'SUMPAH PALAPA', 540, 230, 100, lt, 1.9, { burst: '#d9a83a', fill: '#fff' });
  tintScreen(ctx, '#1a0508', .18);
} });
// 13b: the map slowly turns gold
SHOTS.push({ start: 46.8, end: 50.0, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  skyOnly(ctx, cam, '#1a2a4a', '#2a4a7a');
  drawJavaRegions(ctx, 150, 420, 780, { gold: clamp(lt / 3.0) * .98 });
  drawStick(ctx, C(GM, { x: 290, y: 2080, s: 1200, arms: { L: HIPS.L, R: { ik: loc(700, 720, 290, 2080, 1200) } }, prop: null, face: { eyes: 'normal', mouth: 'smirk', browAng: -.35, look: [.8, -.6] } }));
  nameTag(ctx, 760, 330, 'MAJAPAHIT', '#d9a83a', clamp((lt - 1.0) / .35), 44);
} });
// 14: Sunda, the one that never bowed
SHOTS.push({ start: 50.0, end: 52.9, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03, x: 540 - lt * 20 });
  skyOnly(ctx, cam, '#1a2a4a', '#2a4a7a');
  drawJavaRegions(ctx, 150, 420, 780, { gold: .98, pulse: .5 + .5 * Math.sin(t * 7) });
  mapPin(ctx, 267, 700, '#2f63c9', clamp((lt - .3) * 3));
  nameTag(ctx, 270, 330, 'SUNDA', '#2f63c9', clamp((lt - .5) / .35), 52);
  drawStick(ctx, C(GM, { x: 900, y: 2100, s: 1150, flip: -1, arms: HIPS, face: { eyes: 'normal', mouth: 'teeth', browAng: -.45, look: [-1, -.3] } }));
} });
// 15: rejects an equal marriage
SHOTS.push({ start: 52.9, end: 55.9, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const slam = lt > 1.2; const sh = (lt > 1.2 && lt < 1.6) ? shake(t, 14, 3) : [0, 0];
  const cam = cam0(t, lt, { pz: .03, x: 540 + sh[0], y: 960 + sh[1] });
  pendopoBG(ctx, cam, { dark: .25 });
  applyCam(ctx, cam, 1);
  drawPaper(ctx, 650, 930, 640, 440, -.03, '');
  drawHeart(ctx, 650, 900, 90, '#ff5a8a');
  const k = clamp((lt - 1.2) / .2); if (k > 0) { line(ctx, 650 - 230 * k, 900 - 230 * k, 650 + 230 * k, 900 + 230 * k, 46, INK); line(ctx, 650 - 230 * k, 900 - 230 * k, 650 + 230 * k, 900 + 230 * k, 32, '#d8312b'); line(ctx, 650 + 230 * k, 900 - 230 * k, 650 - 230 * k, 900 + 230 * k, 46, INK); line(ctx, 650 + 230 * k, 900 - 230 * k, 650 - 230 * k, 900 + 230 * k, 32, '#d8312b'); }
  drawStick(ctx, C(GM, { x: 280, y: 2100, s: 1250, armLen: 1.1, arms: { L: HIPS.L, R: slam ? { ik: loc(500, 1010, 280, 2100, 1250) } : [2.6, .3] }, face: { eyes: 'normal', mouth: 'teeth', browAng: -.5, look: [.6, 0] } }));
  if (lt > 1.2 && lt < 1.45) flash(ctx, (1.45 - lt) * 1.6);
  tintScreen(ctx, '#3a0510', clamp((lt - 1.2) * 2) * .2);
} });
// 16a: blocks the Sunda envoy
SHOTS.push({ start: 55.9, end: 58.9, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  sundaCampBG(ctx, t, cam, DUSK2);
  const back = kf(lt, [[0, 0], [1.2, 80]]);
  drawStick(ctx, C(SUN, { x: 260 - back, y: 1850, s: 900, lean: -.12, arms: { L: [2.2, .2], R: [2.2, .2] }, face: { eyes: 'wide', mouth: 'o', browAng: .45, look: [1, 0] } }));
  nameTag(ctx, 260, 660, 'Utusan Sunda', '#2f63c9', clamp((lt - .3) / .35), 42);
  drawStick(ctx, C(GM, { x: 800, y: 2100, s: 1250, flip: -1, armLen: 1.2, arms: { L: HIPS.L, R: [1.75, -.05] }, prop: null, face: { eyes: 'normal', mouth: 'teeth', browAng: -.5, look: [-1, 0] } }));
  tintScreen(ctx, '#1a0508', .22);
} });
// 16b: UPETI
SHOTS.push({ start: 58.9, end: 62.1, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const sh = (lt > .3 && lt < .7) ? shake(t, 16, 3) : [0, 0];
  const cam = cam0(t, lt, { pz: .03, x: 540 + sh[0], y: 960 + sh[1] });
  sundaCampBG(ctx, t, cam, BLOOD);
  const px = lerp(1500, 540, easeOut(clamp(lt / .3)));
  drawStick(ctx, C(LING, { x: 240, y: 1900, s: 620, arms: UP, face: { eyes: 'wide', mouth: 'o', browAng: .45 } }));
  drawStick(ctx, C(DYAH, { x: 850, y: 1900, s: 620, flip: -1, arms: { L: [1.4, -.4], R: [1.4, -.4] }, face: { eyes: 'wide', mouth: 'o', browAng: .5 } }));
  drawPaper(ctx, px, 1080, 540, 400, -.06, 'UPETI');
  if (lt > .3 && lt < .55) flash(ctx, (.55 - lt) * 2);
  kinetic(ctx, 'UPETI', 540, 560, 230, lt, .3, { burst: '#d8312b', fill: '#fff' });
  tintScreen(ctx, '#5a0010', .2 + clamp(lt) * .1);
} });
// ===== SCENE 4: BUBAT =====
// 17: Linggabuana tears up the demand
SHOTS.push({ start: 62.1, end: 65.4, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const tr = clamp((lt - 1.3) / .9); const sh = (lt > 1.3 && lt < 1.8) ? shake(t, 12, 3) : [0, 0];
  const cam = cam0(t, lt, { pz: .03, x: 540 + sh[0], y: 960 + sh[1] });
  javaBG(ctx, t, cam, BLOOD);
  applyCam(ctx, cam, 1);
  drawStick(ctx, C(LING, { x: 540, y: 2060, s: 1250, arms: UP, face: { eyes: 'normal', mouth: 'teeth', browAng: -.5 } }));
  drawPaper(ctx, 540, 980, 420, 300, -.04, 'UPETI', { tear: tr });
  if (lt > 1.3 && lt < 1.6) burst(ctx, 540, 980, 130 * clamp(1 - (lt - 1.3) * 3.5), 10, '#ffd23a', 4);
  tintScreen(ctx, '#5a0010', .25);
} });
// 18: Majapahit surrounds Bubat Field
SHOTS.push({ start: 65.4, end: 68.0, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  javaBG(ctx, t, cam, BLOOD);
  applyCam(ctx, cam, .85); drawSundaTent(ctx, 360, 1180, .6); drawSundaTent(ctx, 740, 1160, .55);
  applyCam(ctx, cam, 1);
  const k = ease(clamp(lt / 2.4));
  for (let i = 0; i < 7; i++) {
    drawStick(ctx, C(MJT, { sil: SIL_M, x: lerp(-250 - i * 80, 150 + i * 70, k), y: 1480 + (i % 3) * 40, s: 420, legs: walkLegs(t + i, 9, .4), arms: walkArms(t + i, 9, .3), prop: propSpear('R') }));
    drawStick(ctx, C(MJT, { sil: SIL_M, x: lerp(1330 + i * 80, 930 - i * 70, k), y: 1480 + (i % 3) * 40, s: 420, flip: -1, legs: walkLegs(t + i, 9, .4), arms: walkArms(t + i, 9, .3), prop: propSpear('R') }));
  }
  spearRow(ctx, -100, 1200, lerp(2500, 2050, k), 560, 130, t, 5, '#14060a', '#5a4a50');
  tintScreen(ctx, '#5a0010', .15);
} });
// 19a: hopelessly outnumbered
SHOTS.push({ start: 68.0, end: 70.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { z: 1.15, pz: -.05 });
  javaBG(ctx, t, cam, BLOOD);
  applyCam(ctx, cam, 1);
  [[420, SUN], [660, SUN], [300, SUN], [780, SUN]].forEach(([x, ch], i) => drawStick(ctx, C(ch, { x, y: 1600 + (i % 2) * 30, s: 420, arms: IDLE, prop: propFlag('R', '#f4f0e6'), face: { eyes: 'wide', mouth: 'o', browAng: .4 } })));
  drawStick(ctx, C(LING, { x: 540, y: 1540, s: 440, arms: IDLE, face: { eyes: 'normal', mouth: 'flat', browAng: -.2 } }));
  spearRow(ctx, -120, 200, 1750, 520, 70, t, 2, '#14060a', '#5a4a50'); spearRow(ctx, 880, 1200, 1750, 520, 70, t, 3, '#14060a', '#5a4a50');
  spearRow(ctx, -100, 1200, 2050, 700, 100, t, 4, '#14060a', '#5a4a50');
  tintScreen(ctx, '#5a0010', .15);
} });
// 19b: a lone ceremonial guard
SHOTS.push({ start: 70.6, end: 72.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .05 });
  javaBG(ctx, t, cam, BLOOD);
  applyCam(ctx, cam, 1);
  spearRow(ctx, -100, 1200, 1500, 500, 130, t, 6, '#14060a', '#5a4a50');
  drawStick(ctx, C(SUN, { x: 540, y: 2250, s: 1500, arms: { L: IDLE.L, R: { ik: [.22, -.6], bend: -1 } }, prop: propFlag('R', '#f4f0e6'), face: { eyes: 'wide', mouth: 'flat', browAng: .35 } }));
  sweat(ctx, 700, 1050 + (lt * 90 % 80), 40, 1);
  tintScreen(ctx, '#5a0010', .2);
} });
// 20: silhouette fight
SHOTS.push({ start: 72.8, end: 75.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const sh = shake(t, 8, 2); const cam = cam0(t, lt, { pz: .03, x: 540 + sh[0], y: 960 + sh[1] });
  javaBG(ctx, t, cam, BLOOD);
  applyCam(ctx, cam, 1);
  for (let i = 0; i < 5; i++) {
    const bx = 100 + i * 210, by = 1560 + (i % 2) * 90, cl = Math.sin(t * 7 + i * 1.7);
    drawStick(ctx, C(MJT, { sil: SIL_M, x: bx, y: by, s: 540, lean: .1, legs: walkLegs(t + i, 10, .5), arms: { L: [.5, -.3], R: [2.0 + cl * .5, -.4] }, prop: propSpear('R') }));
    drawStick(ctx, C(SUN, { sil: SIL_S, x: bx + 170, y: by, s: 540, flip: -1, lean: .1, legs: walkLegs(t + i + 1, 10, .5), arms: { L: [.5, -.3], R: [2.2 - cl * .5, -.4] }, prop: propKeris('R') }));
    if (cl > .75) burst(ctx, bx + 85, by - 560, 50, 8, '#ffd23a', 3 + i);
  }
  embers(ctx, t, 36, 6, [0, 400, 1080, 1900]);
  tintScreen(ctx, '#5a0010', .15);
} });
// 21: Linggabuana falls
SHOTS.push({ start: 75.6, end: 77.8, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  javaBG(ctx, t, cam, BLOOD);
  applyCam(ctx, cam, 1);
  spearRow(ctx, -100, 1200, 1900, 600, 120, t, 8, '#14060a', '#5a4a50');
  const f = clamp(lt / 1.6);
  drawStick(ctx, C(LING, { sil: SIL_S, x: 540 - f * 80, y: 1900 + f * 30, s: 1100, lean: -f * .55, squash: 1 - f * .18, arms: { L: [.8 + f * 1.5, -.3], R: [1.4 + f, -.3] }, legs: { L: [.2, -.2], R: [.1 + f * .4, -.4] } }));
  crownAt(ctx, 540 + lt * 70, 1060 + lt * lt * 190, 1100, lt * 1.4, 'iketSunda');
  embers(ctx, t, 20, 4, [0, 500, 1080, 1900]);
  tintScreen(ctx, '#5a0010', .2);
} });
// 22a: Dyah Pitaloka, alone
SHOTS.push({ start: 77.8, end: 79.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .04 });
  javaBG(ctx, t, cam, BLOOD);
  applyCam(ctx, cam, 1);
  spearRow(ctx, -120, 240, 1750, 520, 80, t, 2, '#14060a', '#5a4a50'); spearRow(ctx, 840, 1200, 1750, 520, 80, t, 3, '#14060a', '#5a4a50');
  drawStick(ctx, C(DYAH, { x: 540, y: 1980, s: 1150, arms: { L: [.2, -.1], R: [.2, -.1] }, headTilt: .15, face: { eyes: 'normal', mouth: 'flat', browAng: .5, look: [0, 1] } }));
  petals(ctx, t, .8, 7, [0, 300, W, 1800], 18);
  tintScreen(ctx, '#3a0510', .3);
} });
// 22b: the blue iket and the flower crown fall slowly
SHOTS.push({ start: 79.6, end: 82.3, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .01 });
  javaBG(ctx, t, cam, BLOOD);
  applyCam(ctx, cam, 1);
  crownAt(ctx, 450, kf(lt, [[0, 260], [2.4, 1760]]), 900, Math.sin(lt * 1.6) * .5, 'iketSunda');
  crownAt(ctx, 640, kf(lt, [[.3, 160], [2.5, 1780]]), 900, Math.sin(lt * 1.3 + 1) * .5, 'flowers');
  petals(ctx, t, 1, 9, [0, 100, W, 1850], 34);
  tintScreen(ctx, '#3a0510', .3);
  tintScreen(ctx, '#000', clamp((lt - 2.0) / .7));
} });
// ===== SCENE 5: AFTERMATH =====
// 23: Hayam Wuruk runs, too late
SHOTS.push({ start: 82.3, end: 84.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const stop = lt > 1.5; const cam = cam0(t, lt, { px: stop ? 0 : 160, hand: stop ? 3 : 6, pz: .04 });
  javaBG(ctx, t, cam, GRAY);
  applyCam(ctx, cam, 1);
  drawStick(ctx, C(HAY, { x: 540, y: 1950, s: 1050, legs: stop ? { L: [.3, -.2], R: [.1, -.1] } : walkLegs(t, 18, .9), lean: stop ? -.06 : .18, arms: stop ? { L: [.3, -.1], R: { ik: [.3, -.78], bend: -1 } } : { L: [1.4 + Math.sin(t * 18) * .8, -.6], R: [1.4 - Math.sin(t * 18) * .8, -.6] }, face: stop ? { eyes: 'wide', mouth: 'o', browAng: .5 } : { eyes: 'wide', mouth: 'o', browAng: .3, look: [1, 0] } }));
  if (!stop) speedLines(ctx, .6, t, 1);
  if (stop) sweat(ctx, 700, 1060, 36, clamp((lt - 1.5) * 4));
  tintScreen(ctx, '#0a1020', .2);
} });
// 24: kneeling alone, then fury
SHOTS.push({ start: 84.6, end: 86.7, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const fury = lt > 1.4; const sh = (lt > 1.4 && lt < 1.75) ? shake(t, 12, 3) : [0, 0];
  const cam = cam0(t, lt, { pz: .03, x: 540 + sh[0], y: 960 + sh[1] });
  javaBG(ctx, t, cam, GRAY);
  applyCam(ctx, cam, 1);
  line(ctx, 880, 1100, 880, 1850, 12, INK); line(ctx, 880, 1100, 880, 1850, 6, '#7a4a2a'); path(ctx, [[880, 1110], [1040, 1170], [960, 1230], [1020, 1300], [880, 1280]]); fillStroke(ctx, '#2f63c9', 5);
  for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(120 + i * 140, 1880); ctx.rotate(-1.2 + i * .5); line(ctx, 0, 0, 0, -260, 9, '#3a2a1a'); ctx.restore(); }
  drawStick(ctx, C(HAY, { x: 480, y: 1980, s: 1000, squash: .82, lean: .08, headTilt: .15, arms: fury ? { L: [.5, -.2], R: { ik: [.25, -.2] } } : { L: [.2, -.1], R: [.2, -.1] }, face: fury ? { eyes: 'normal', mouth: 'teeth', browAng: -.5, look: [0, 1] } : { eyes: 'normal', mouth: 'frown', browAng: .5, look: [0, 1] } }));
  if (!fury) { sweat(ctx, 400, 1180 + ((lt * 120) % 120), 32, 1); sweat(ctx, 620, 1200 + (((lt + .5) * 120) % 120), 28, 1); }
  if (lt > 1.4 && lt < 1.8) puff(ctx, 640, 1960, 70 * (1 + (lt - 1.4)), t, '#cfc8b8', 4, 1 - (lt - 1.4) * 2.5);
  tintScreen(ctx, '#0a1020', .2);
} });
// 25: the map cracks between west and east
SHOTS.push({ start: 86.7, end: 90.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const crack = ease(clamp((lt - .7) / 2.4)); const sh = (crack > 0 && crack < .95) ? shake(t, 7, 3) : [0, 0];
  const cam = cam0(t, lt, { pz: .02, x: 540 + sh[0], y: 960 + sh[1] });
  skyOnly(ctx, cam, '#0a0a18', '#2a1a2a');
  drawJavaRegions(ctx, 150, 560, 780, { gold: 1, crack });
  nameTag(ctx, 270 - crack * 30, 480, 'SUNDA', '#2f63c9', clamp((lt - .2) / .35), 48);
  nameTag(ctx, 780 + crack * 30, 480, 'MAJAPAHIT', '#d9a83a', clamp((lt - .4) / .35), 48);
  tintScreen(ctx, '#3a0510', crack * .2);
} });
// 26: Gajah Mada pushed out
SHOTS.push({ start: 90.6, end: 93.4, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  javaBG(ctx, t, cam, DUSK2);
  applyCam(ctx, cam, 1);
  longShadow(ctx, 760, 1510, 700, .35, -1);
  const off = lt > 1.6;
  drawStick(ctx, C(GM, { x: 760, y: 1500, s: 560, hat: off ? 'none' : 'komandan', lean: .1, headTilt: .18, arms: { L: [.15, -.05], R: [.15, -.05] }, face: { eyes: 'normal', mouth: 'frown', browAng: .4, look: [0, 1] } }));
  if (off) { const k = lt - 1.6; crownAt(ctx, 760 + k * 40, 1072 + k * k * 600, 560, k * 3, 'komandan'); }
  tintScreen(ctx, '#0a0510', .35);
} });
// ===== SCENE 6: CLOSING =====
// 27: Tragedi Bubat (1357)
SHOTS.push({ start: 93.4, end: 98.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  javaBG(ctx, t, cam, NIGHT);
  applyCam(ctx, cam, 1);
  drawWeddingArch(ctx, 540, 1880, 1.05, 1, t);
  drawHeart(ctx, 540, 1930, 90, '#8a1a30', { crack: 1, split: .35 });
  petals(ctx, t, .7, 3, [0, 300, W, 1800], 22);
  kinetic(ctx, 'TRAGEDI BUBAT', 540, 520, 118, lt, .2, { fill: '#fff', rot: 0, out: 4.4 });
  kinetic(ctx, '(1357)', 540, 690, 100, lt, .7, { fill: '#ffd23a', rot: 0, out: 4.4 });
  tintScreen(ctx, '#000', clamp((lt - 4.6) / .6) * .3);
} });
// 28: what finally brought down Majapahit?
SHOTS.push({ start: 98.6, end: 102.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  skyOnly(ctx, cam, '#0a1230', '#2a2a5a');
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(540, 940); ctx.rotate(t * .15); for (let i = 0; i < 14; i++) { ctx.rotate(TAU / 14); path(ctx, [[0, 0], [-60, -1500], [60, -1500]]); ctx.fillStyle = 'rgba(255,210,90,.1)'; ctx.fill(); } ctx.restore();
  crownAt(ctx, 540, 1260, 1700, Math.sin(t * 2) * .03, 'crown');
  line(ctx, 500, 770, 548, 880, 16, INK); line(ctx, 548, 880, 520, 950, 16, INK); line(ctx, 520, 950, 590, 1080, 16, INK);
  line(ctx, 500, 770, 548, 880, 8, '#fff'); line(ctx, 548, 880, 520, 950, 8, '#fff'); line(ctx, 520, 950, 590, 1080, 8, '#fff');
  for (let i = 0; i < 5; i++) sparkle(ctx, 320 + i * 100, 700 + Math.sin(i * 2) * 120, 30, (.4 + .6 * Math.sin(t * 5 + i)) * .8);
  qmark(ctx, 540, 520, 260, t, clamp((lt - .5) * 3), '?');
} });
// 29: Paregreg teaser, two sides pull the crown
SHOTS.push({ start: 102.6, end: 106.9, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .015 });
  skyOnly(ctx, cam, '#14102a', '#3a2a5a');
  const pull = Math.sin(t * 11) * 14, rot = Math.sin(t * 11) * .05;
  crownAt(ctx, 540 + pull * .3, 1240, 1400, rot, 'crown');
  drawStick(ctx, C(MJT, { x: 210 + pull, y: 1650, s: 1150, lean: -.2, arms: { L: { ik: loc(330, 960, 210 + pull, 1650, 1150) }, R: { ik: loc(330, 1000, 210 + pull, 1650, 1150) } }, face: { eyes: 'normal', mouth: 'teeth', browAng: -.4 } }));
  drawStick(ctx, C(ORG, { x: 870 + pull, y: 1650, s: 1150, flip: -1, lean: -.2, arms: { L: { ik: loc(750, 960, 870 + pull, 1650, 1150, -1) }, R: { ik: loc(750, 1000, 870 + pull, 1650, 1150, -1) } }, face: { eyes: 'normal', mouth: 'teeth', browAng: -.4 } }));
  kinetic(ctx, 'NEXT:', 540, 250, 90, lt, 1.0, { fill: '#fff', rot: 0 });
  kinetic(ctx, 'PERANG PAREGREG', 540, 450, 100, lt, 1.4, { burst: '#d8312b', fill: '#fff' });
  tintScreen(ctx, '#000', clamp((lt - 3.7) / .6));
} });
