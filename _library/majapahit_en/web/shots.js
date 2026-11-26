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

const SHOTS = [];
// ===== SCENE 1: HOOK =====
// A: Wijaya calm in the fire, giant Mongols confused behind him
SHOTS.push({ start: 0, end: 3.3, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .045, py: -10 });
  javaBG(ctx, t, cam, DUSK);
  applyCam(ctx, cam, 1);
  const conf = lt > 1.1;
  [[120, 1], [330, 1], [760, -1], [960, -1]].forEach(([x, f], i) => {
    drawStick(ctx, C(MON, { x, y: 1180, s: 560, flip: f, bob: Math.sin(t * 3 + i) * .006, prop: propSpear('R'), arms: { L: conf ? { ik: [.08, -.98] } : [.3, -.1], R: [.4, -.3] },
      face: conf ? { eyes: 'wide', look: [Math.sin(t * 3 + i), 0], mouth: 'o', browAng: .3 } : ANGRY }));
    qmark(ctx, x + 30, 1180 - 560 * 1.05, 90, t + i, clamp((lt - 1.2 - i * .12) * 4));
  });
  drawFire(ctx, 70, 1260, 1.3, t, 1); drawFire(ctx, 1010, 1270, 1.2, t, 2);
  drawFire(ctx, 210, 1760, 1.8, t, 3); drawFire(ctx, 880, 1780, 1.7, t, 4);
  drawStick(ctx, C(WIJ, { x: 540, y: 1880, s: 900, arms: POSE.hips.arms, bob: Math.sin(t * 2) * .004, face: { eyes: lt > 2.2 ? 'smug' : 'normal', mouth: 'smirk', browOne: lt > 2.2 ? 1 : 0, look: [.2, 0] } }));
  embers(ctx, t, 34, 9, [-100, 300, 1180, 1900]);
  nameTag(ctx, 540, 920, 'Raden Wijaya', '#2f9e57', clamp((lt - .4) / .35));
} });
// B: the most feared army on Earth
SHOTS.push({ start: 3.3, end: 5.8, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const stomp = Math.abs(Math.sin(lt * 4.2)); const sh = shake(t, 10 * Math.pow(stomp, 6), 2);
  const cam = cam0(t, lt, { pz: .05, x: 540 + sh[0], y: 960 + sh[1] });
  javaBG(ctx, t, cam, { top: '#6a7d9a', bot: '#d9c7a8', hills: ['#a39070', '#8a7860', '#6e5f4a'], g1: '#a8946a', g2: '#7a6a4a', sun: false, vcol: '#7a7f90' });
  applyCam(ctx, cam, 1);
  for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) {
    const x = -120 + i * 160 + r * 80 + lt * 90, y = 1060 + r * 70;
    drawStick(ctx, C(MON, { x, y, s: 300 + r * 40, legs: walkLegs(t + i, 8, .4), arms: walkArms(t + i, 8, .3), prop: propSpear('R'), face: ANGRY }));
  }
  [[170, 1], [910, -1]].forEach(([x, f], i) => {
    drawStick(ctx, C(MON, { x: x + lt * 40 * f, y: 1650, s: 680, flip: f, legs: walkLegs(lt * 1.05 + i, 4.2, .45), arms: walkArms(lt + i, 4.2, .3), prop: propSpear('R'), face: { eyes: 'normal', mouth: 'teeth', browAng: -.45 } }));
    if (stomp > .97) puff(ctx, x, 1660, 70, t, '#e6d6b4', 3 + i, .8);
  });
  tintScreen(ctx, '#3a1a10', .12);
} });
// C: without spending a fortune (empty pouch, moth, one coin)
SHOTS.push({ start: 5.8, end: 7.3, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .04 });
  javaBG(ctx, t, cam, { volcano: false });
  applyCam(ctx, cam, 1);
  const op = kf(lt, [[.15, 0], [.4, 1, backOut]]);
  const px = 660, py = 1170;
  drawStick(ctx, C(WIJ, { x: 380, y: 1880, s: 900, armLen: 1.15, arms: { L: [1.3, -.4], R: { ik: loc(px - 20, py + 30, 380, 1880, 900), bend: -1 } },
    face: { eyes: lt > .6 ? 'happy' : 'normal', mouth: 'grin', browAng: .25 }, headTilt: .08 }));
  drawPouch(ctx, px, py, 1.1, op);
  if (lt > .35) { const k = lt - .35; drawMoth(ctx, px + k * 260, py - 90 - k * 360 + Math.sin(k * 14) * 20, 1.5, t); }
  if (lt > .55) { const k = lt - .55; drawCoin(ctx, px + 10, py + k * k * 1600, 26, k * 14); }
  sweat(ctx, 520, 1000, 34, clamp((lt - .6) * 4));
} });
// D: the story of how Majapahit was born
SHOTS.push({ start: 7.3, end: 10.24, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .05, py: -15 });
  javaBG(ctx, t, cam, Object.assign({}, SUNRISE, { sunY: 820, sunR: 140, g1: '#9a8a5a', g2: '#6a5a3a', vx: 860 }));
  applyCam(ctx, cam, 1);
  drawGate(ctx, 540, 1250, 1.5);
  drawStick(ctx, C(WIJ, { x: 540, y: 1240, s: 230, arms: POSE.handsUp.arms, face: { eyes: 'happy', mouth: 'grin' } }));
  for (let i = 0; i < 6; i++) sparkle(ctx, 200 + i * 140, 700 + Math.sin(i * 2) * 120, 26, clamp((lt - 1.3 - i * .08) * 3) * (.6 + .4 * Math.sin(t * 6 + i)));
  kinetic(ctx, 'MAJAPAHIT', 540, 430, 150, lt, 1.3, { burst: '#d8312b' });
} });
// ===== SCENE 2: BACKGROUND =====
// E: 1292 on the map
SHOTS.push({ start: 10.24, end: 12.4, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .04, hand: 2 });
  applyCam(ctx, cam, .2); drawSky(ctx, '#1f4a7a', '#3a7ab0', -400, 2400);
  applyCam(ctx, cam, 1);
  drawJavaMap(ctx, 110, 560, 860, { marks: [
    { p: [.66, .5], label: 'Kediri', col: '#d8312b', a: clamp((lt - .5) * 3) },
    { p: [.8, .53], label: 'Singhasari', col: '#2f63c9', a: clamp((lt - 1.0) * 3), below: true } ] });
  kinetic(ctx, '1292', 540, 400, 190, lt, .12, { burst: '#2f63c9' });
} });
// F: Jayakatwang attacks Singhasari and kicks away its crown
SHOTS.push({ start: 12.4, end: 17.44, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const kick = 4.0; const imp = lt > kick && lt < kick + .25; const sh = imp ? shake(t, 14, 3) : [0, 0];
  const cam = cam0(t, lt, { pz: .03, x: 540 + sh[0], y: 960 + sh[1] });
  javaBG(ctx, t, cam, WAR);
  applyCam(ctx, cam, .85);
  drawGate(ctx, 330, 1180, 1.25, '#b5523a', clamp((lt - 2.3) * 1.5), t);
  nameTag(ctx, 330, 600, 'Singhasari', '#2f63c9', clamp((lt - 2.7) / .35), 46);
  applyCam(ctx, cam, 1);
  for (let i = 0; i < 5; i++) { const k = lt - 1.7 - i * .18; if (k < 0 || k > 2.4) continue; const x = 1250 - k * 650; drawStick(ctx, C(KED, { x, y: 1250, s: 330, flip: -1, legs: walkLegs(t + i, 16, .7), arms: { L: [2.4, .2], R: [2.6, .2] }, prop: propSpear('R'), lean: -.12, face: ANGRY })); }
  if (lt > 2.4) embers(ctx, t, 22, 4, [0, 400, 800, 1300]);
  const legK = kf(lt, [[kick - .3, 0], [kick, 1, easeIn], [kick + .5, 0]]);
  drawStick(ctx, C(JAY, { x: 760, y: 1880, s: 880, flip: -1, legs: { L: [.1, -.04], R: [.1 + legK * 1.3, -.04 - legK * .2] }, lean: legK * .12,
    arms: lt < kick - .3 ? POSE.hips.arms : { L: [.5 + legK, -.4], R: [.6 + legK * .6, -.3] }, face: { eyes: lt > kick ? 'happy' : 'smug', mouth: 'grin', browAng: -.3 } }));
  const cx0 = 470, cy0 = 1840;
  if (lt < kick) crownAt(ctx, cx0, cy0, 380, .1);
  else { const k = lt - kick; crownAt(ctx, cx0 - k * 900, cy0 - k * 1500 + k * k * 900, 380, -k * 12); }
  if (imp) burst(ctx, 500, 1800, 130 * (1 - (lt - kick) * 2), 11, '#ffd23a', 5);
  nameTag(ctx, 760, 930, 'Jayakatwang (Kediri)', '#a3232f', clamp((lt - .2) / .35), 48);
} });
// G: Raden Wijaya escapes
SHOTS.push({ start: 17.44, end: 20.9, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const run = lt * 700; const cam = cam0(t, lt, { x: 540 + run, hand: 5, pz: 0 });
  javaBG(ctx, t, cam, WAR);
  applyCam(ctx, cam, .7); drawGate(ctx, 200, 1150, 1.0, '#b5523a', 1, t);
  applyCam(ctx, cam, 1);
  drawStick(ctx, C(FOL, { x: 540 + run - 330, y: 1290, s: 380, legs: walkLegs(t, 18, .8), arms: { L: [1.8 + Math.sin(t * 18) * .6, -.8], R: [1.8 - Math.sin(t * 18) * .6, -.8] }, lean: .15, face: { eyes: 'wide', mouth: 'o' } }));
  const wx = 540 + run;
  drawStick(ctx, C(WIJ, { x: wx, y: 1830, s: 860, legs: walkLegs(t, 16, .85), arms: { L: [1.6 + Math.sin(t * 16) * .9, -1.2], R: [1.6 - Math.sin(t * 16) * .9, -1.2] }, lean: .16, bob: -Math.abs(Math.sin(t * 16)) * .03,
    face: { eyes: 'wide', mouth: 'o', look: [-1, 0], browAng: .3 } }));
  for (let i = 0; i < 3; i++) { const k = ((lt * 3 + i / 3) % 1); puff(ctx, wx - 260 - k * 300, 1830, 60 + k * 50, t, '#e6d6b4', 10 + i, 1 - k); }
  sweat(ctx, wx + 170, 1000 + (lt * 200 % 120), 36, 1);
  speedLines(ctx, .8, t, 1);
  nameTag(ctx, 540, 930, 'Raden Wijaya', '#2f9e57', clamp((lt - .9) / .35));
} });
// H: bows to Jayakatwang, white flag, sly smirk to camera
SHOTS.push({ start: 20.9, end: 23.76, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .04 });
  javaBG(ctx, t, cam, { volcano: false, top: '#c97a5a', bot: '#ffe0b0', hills: ['#c0a080', '#a08068', '#806050'], g1: '#c9a46a', g2: '#a07a4a' });
  applyCam(ctx, cam, .9); drawGate(ctx, 800, 1150, .9);
  applyCam(ctx, cam, 1);
  rrect(ctx, 560, 1700, 520, 260, 10); fillStroke(ctx, '#a8542f', 6); rrect(ctx, 600, 1640, 440, 70, 10); fillStroke(ctx, '#c46a3a', 6);
  drawStick(ctx, C(JAY, { x: 830, y: 1650, s: 740, flip: -1, arms: POSE.hips.arms, face: { eyes: 'smug', mouth: 'smirk', browAng: -.2, look: [.5, .3] } }));
  const bow = kf(lt, [[0, 0], [.45, .5]]);
  const sly = lt > 1.6;
  drawStick(ctx, C(WIJ, { x: 320, y: 1860, s: 820, lean: bow, headTilt: -bow * .5, arms: { L: [.7, -1.2], R: [2.0, -.6] }, prop: propFlag('R'),
    face: sly ? { eyes: 'smug', mouth: 'smirk', look: [-.6, .2], turn: -.6, browOne: 1 } : { eyes: 'happy', mouth: 'smile' } }));
  if (sly) sparkle(ctx, 250, 1000, 40 * clamp((lt - 1.6) * 4), clamp((lt - 1.6) * 4));
} });
// I: a forest called Tarik
SHOTS.push({ start: 23.76, end: 27.0, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { y: kf(lt, [[0, 520], [1.4, 980]]), z: 1.05, pz: -.02 });
  javaBG(ctx, t, cam, { volcano: false, h: 1050 });
  applyCam(ctx, cam, .6); for (let i = 0; i < 7; i++) drawTree(ctx, -80 + i * 190, 1120, 1.1, 30 + i, Math.sin(t + i) * .5);
  applyCam(ctx, cam, 1);
  [[540, WIJ, 1], [330, FOL, 1], [760, FOL, -1]].forEach(([x, ch, f], i) => drawStick(ctx, C(ch, { x, y: 1230, s: 360, flip: f, arms: i ? POSE.idle.arms : POSE.hips.arms, face: { eyes: 'wide', look: [0, -1], mouth: i ? 'o' : 'smile' }, headTilt: -.1 })));
  drawTree(ctx, -40, 1900, 2.0, 41, Math.sin(t) * .4); drawTree(ctx, 1130, 1920, 2.1, 42, Math.sin(t + 1) * .4);
  drawSign(ctx, 540, 1080, 1.1 * backOut(clamp((lt - 2.0) / .35)), 'HUTAN TARIK', clamp((lt - 2.0) * 4));
} });
// J: bitter maja fruit
SHOTS.push({ start: 27.0, end: 29.84, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .05 });
  javaBG(ctx, t, cam, { volcano: false });
  applyCam(ctx, cam, .8); drawTree(ctx, 540, 1150, 1.6, 51);
  applyCam(ctx, cam, 1);
  const bite = 1.35, gag = 2.2; const toMouth = kf(lt, [[.9, 0], [bite, 1], [bite + .3, 0]]);
  const bitten = lt > bite ? 1 : 0;
  const g = lt > gag;
  drawStick(ctx, C(FOL, { x: 330, y: 1860, s: 860, lean: g ? -.12 + Math.sin(t * 20) * .02 : 0, armLen: 1.1,
    arms: { L: g ? { ik: [.05, -.75], bend: -1 } : [.3, -.1], R: { ik: [lerp(.3, .06, toMouth), lerp(-.42, -.66, toMouth)], bend: -1 } }, prop: lt < gag ? propFruit('R', bitten) : null,
    face: g ? { eyes: 'squint', mouth: 'teeth', browAng: .35 } : (lt > bite ? { eyes: 'wide', mouth: 'flat', browAng: .2 } : { eyes: 'happy', mouth: 'smile' }) }));
  if (g) { ctx.save(); ctx.globalAlpha = .4; circle(ctx, 330, 1860 - .765 * 860, .19 * 860); ctx.fillStyle = '#7fd04a'; ctx.fill(); ctx.restore();
    for (let i = 0; i < 3; i++) { const k = ((lt * 1.5 + i / 3) % 1); line(ctx, 200 + i * 60, 1030 - k * 160, 215 + i * 60, 990 - k * 160, 8, `rgba(110,170,40,${1 - k})`); } sweat(ctx, 480, 1060, 34, 1); }
  drawStick(ctx, C(WIJ, { x: 800, y: 1860, s: 820, flip: -1, arms: g ? { L: { ik: [.05, -.5] }, R: { ik: [.08, -.55] } } : POSE.idle.arms, bob: g ? Math.abs(Math.sin(t * 14)) * .015 : 0,
    face: g ? { eyes: 'happy', mouth: 'grin' } : { eyes: 'normal', look: [.6, 0], mouth: 'smile' } }));
  if (g) qmark(ctx, 900, 900, 70, t, clamp((lt - gag) * 4), 'HA!');
} });
// K1: quietly...
SHOTS.push({ start: 29.84, end: 31.3, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .06 });
  ctx.save(); ctx.filter = 'blur(6px)'; javaBG(ctx, t, cam, { volcano: false, h: 1050 }); applyCam(ctx, cam, .7); for (let i = 0; i < 6; i++) drawTree(ctx, -60 + i * 230, 1150, 1.3, 60 + i); ctx.restore();
  applyCam(ctx, cam, 1);
  drawStick(ctx, C(WIJ, { x: 540, y: 1960, s: 1050, armLen: 1.1, arms: { L: [.3, -.1], R: { ik: [.06, -.69], bend: -1 } }, face: { eyes: 'smug', mouth: 'flat', look: [.8, 0], browOne: -1 } }));
  qmark(ctx, 820, 900, 80, t, clamp(lt * 4), 'sst...');
} });
// K2: the base rises, named Majapahit
SHOTS.push({ start: 31.3, end: 34.56, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: -.03, z: 1.08 });
  javaBG(ctx, t, cam, { h: 980, vx: 820 });
  applyCam(ctx, cam, .75); for (let i = 0; i < 5; i++) drawTree(ctx, -100 + i * 320, 1080, .9, 70 + i);
  applyCam(ctx, cam, 1);
  [[160, 1180], [920, 1170], [400, 1120], [700, 1110]].forEach(([x, y], i) => { const k0 = lt - .1 - i * .3; const a = backOut(clamp(k0 / .3)); if (k0 <= 0) { drawStump(ctx, x, y, 1.2); return; } ctx.save(); ctx.translate(x, y); ctx.scale(a, a); drawHut(ctx, 0, 0, .9); ctx.restore(); puff(ctx, x, y, 80, t, '#e6d6b4', 20 + i, clamp(1 - k0 * 2)); });
  [[260, 1], [820, -1]].forEach(([x, f], i) => drawStick(ctx, C(FOL, { x: x + Math.sin(t * 2 + i) * 30, y: 1300, s: 340, flip: f, legs: walkLegs(t + i, 9, .4), arms: { L: [2.6, .3], R: [2.6, .3] }, face: { eyes: 'happy', mouth: 'grin' } })));
  kinetic(ctx, 'MAJAPAHIT', 540, 420, 140, lt, 2.1, { burst: '#2f9e57', fill: '#fff' });
} });
// ===== SCENE 3: THE MONGOLS ARRIVE =====
// L: a thousand ships
SHOTS.push({ start: 34.56, end: 37.15, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { px: 40, pz: .03 });
  seaBG(ctx, t, cam, { h: 820 });
  applyCam(ctx, cam, .6);
  for (let i = 0; i < 14; i++) drawJunk(ctx, -200 + i * 110 + lt * 20, 860, .16, t, { ph: i });
  applyCam(ctx, cam, .8);
  for (let i = 0; i < 8; i++) drawJunk(ctx, -150 + i * 190 + lt * 35, 980, .3, t, { ph: i + 3 });
  applyCam(ctx, cam, 1);
  drawJunk(ctx, 240 + lt * 60, 1300, .75, t, { ph: 1 }); drawJunk(ctx, 860 + lt * 60, 1420, .9, t, { ph: 2, sail: '#b8442f' });
  kinetic(ctx, '1.000 KAPAL', 540, 400, 120, lt, 1.0, { fill: '#fff', burst: '#2f63c9' });
} });
// M: twenty thousand Mongol troops land on Java
SHOTS.push({ start: 37.15, end: 40.16, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .04 });
  seaBG(ctx, t, cam, { h: 760, clouds: false });
  applyCam(ctx, cam, .6); for (let i = 0; i < 6; i++) drawJunk(ctx, -50 + i * 230, 820, .3, t, { ph: i });
  applyCam(ctx, cam, 1); drawSand(ctx, 980);
  for (let r = 0; r < 3; r++) for (let i = 0; i < 8; i++) { const x = -60 + i * 165 + (r % 2) * 80, y = 1050 + r * 70 + lt * 30; drawStick(ctx, C(MON, { x, y, s: 220 + r * 40, legs: walkLegs(t + i + r, 8, .4), arms: walkArms(t + i, 8, .3), prop: propSpear('R'), face: ANGRY })); }
  [[150, 1], [930, -1]].forEach(([x, f], i) => drawStick(ctx, C(MON, { x, y: 1600, s: 600, flip: f, legs: walkLegs(t + i, 6, .4), arms: walkArms(t, 6, .3), prop: propSpear('R'), face: { eyes: 'normal', mouth: 'teeth', browAng: -.45 } })));
  nameTag(ctx, 150, 1040, 'Mongol', '#8a5a32', clamp((lt - .8) / .35), 48);
  kinetic(ctx, '20.000 PASUKAN', 540, 400, 112, lt, .1, { burst: '#d8312b' });
} });
// N: Kublai Khan wants revenge for his envoy
SHOTS.push({ start: 40.16, end: 45.12, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  palaceBG(ctx, cam);
  applyCam(ctx, cam, 1);
  rrect(ctx, 300, 820, 520, 760, 60); fillStroke(ctx, '#e0b23a', 8); rrect(ctx, 350, 880, 420, 640, 40); fillStroke(ctx, '#c4322a', 6);
  const point = lt > 1.2; const mad = lt > 1.3;
  drawStick(ctx, C(KHAN, { x: 600, y: 1820, s: 860, flip: -1, armLen: 1.2, arms: { L: POSE.hips.arms.L, R: point ? [1.7, -.05] : [.4, -.3] },
    face: { eyes: 'normal', mouth: mad ? 'teeth' : 'frown', browAng: -.45, look: [.3, 0] }, bob: mad ? Math.sin(t * 25) * .006 : 0 }));
  if (mad) for (const sx of [-1, 1]) for (let i = 0; i < 2; i++) { const k = ((lt * 2 + i / 2) % 1); puff(ctx, 600 + sx * (180 + k * 80), 1150 - k * 160, 30 + k * 30, t, '#fff', 40 + i, 1 - k); }
  nameTag(ctx, 600, 760, 'Kubilai Khan', '#c43b2b', clamp((lt - .3) / .35) * clamp((3.3 - lt) / .2));
  const ba = clamp((lt - 3.3) / .3);
  if (ba > 0) { ctx.save(); ctx.translate(280, 470); ctx.scale(backOut(ba), backOut(ba)); circle(ctx, 0, 0, 200); fillStroke(ctx, '#fff7e6', 8); ctx.save(); circle(ctx, 0, 0, 196); ctx.clip();
    drawStick(ctx, C(ENVOY, { x: 0, y: 330, s: 380, shadow: false, face: { eyes: 'squint', mouth: 'frown', browAng: .4 } }));
    ctx.save(); ctx.translate(0, 330 - .765 * 380); ctx.rotate(-.5); rrect(ctx, -80, -18, 160, 36, 10); fillStroke(ctx, '#fff', 5); ctx.restore();
    ctx.restore(); circle(ctx, 210, 190, 26); fillStroke(ctx, '#fff7e6', 6); circle(ctx, 250, 240, 14); fillStroke(ctx, '#fff7e6', 5); ctx.restore(); }
} });
// O: the king is already dead, the Mongols have no idea
SHOTS.push({ start: 45.12, end: 51.33, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  campBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  const jx = kf(lt, [[3.8, -150], [4.2, 120, backOut]]);
  drawStick(ctx, C(JAY, { x: jx, y: 1340, s: 520, arms: { L: [.3, -.1], R: [2.5 + Math.sin(t * 10) * .3, .3] }, face: { eyes: 'smug', mouth: 'grin', look: [1, 0] } }));
  drawJavaMap(ctx, 150, 380, 780, { marks: [
    { p: [.8, .53], label: 'Singhasari', col: '#2f63c9', below: true },
    { p: [.8, .53], x: true, a: clamp((lt - 1.25) * 3) } ] });
  const scratch = lt > 2.1;
  drawStick(ctx, C(CMD, { x: 880, y: 1730, s: 720, flip: -1, armLen: 1.15, arms: { L: POSE.hips.arms.L, R: scratch ? { ik: [.05 + Math.sin(t * 18) * .03, -.98], bend: -1 } : [.4, -.2] },
    face: scratch ? { eyes: 'wide', mouth: 'o', look: [.4, -.4], browAng: .3 } : { eyes: 'normal', look: [.6, -.4], mouth: 'flat' } }));
  for (let i = 0; i < 3; i++) qmark(ctx, 820 + i * 70, 880 - i * 40, 70 + i * 10, t + i, clamp((lt - 2.2 - i * .2) * 4));
  nameTag(ctx, 820, 1000, 'Komandan Mongol', '#5d3a8a', clamp((lt - .3) / .35), 44);
  if (lt > 4.2) nameTag(ctx, 160, 760, 'Jayakatwang', '#a3232f', clamp((lt - 4.2) / .35), 42);
} });
// P: a golden opportunity
SHOTS.push({ start: 51.33, end: 53.76, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .08 });
  javaBG(ctx, t, cam, { volcano: false, top: '#f2b45a', bot: '#fff0c0', hills: ['#c8b070', '#a89058', '#7a6a40'] });
  applyCam(ctx, cam, 1);
  const on = clamp((lt - 1.2) / .2);
  drawStick(ctx, C(WIJ, { x: 540, y: 1880, s: 900, arms: { L: [.3, -.1], R: on > 0 ? [2.6, .3] : [.3, -.1] }, face: on > 0 ? { eyes: 'wide', mouth: 'grin', browUp: 1 } : { eyes: 'normal', look: [-.8, 0], mouth: 'flat' } }));
  bush(ctx, 540, 1880, 2.2, 3);
  drawBulb(ctx, 540, 830, 90, on, t);
  if (on > 0) for (let i = 0; i < 5; i++) sparkle(ctx, 300 + i * 120, 700 + Math.sin(i) * 80, 30, on * (.5 + .5 * Math.sin(t * 8 + i)));
  tintScreen(ctx, '#ffd23a', on * .12);
} });
// ===== SCENE 4: ALLIANCE =====
// Q: an offer they can't refuse
SHOTS.push({ start: 53.76, end: 57.52, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  campBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  const give = lt < 1.7;
  drawStick(ctx, C(WIJ, { x: 300, y: 1800, s: 800, armLen: 1.2, arms: { L: [.3, -.1], R: give ? { ik: [.3, -.52] } : [.3, -.1] }, prop: give ? propScroll('R') : null, face: { eyes: 'happy', mouth: 'grin' } }));
  const op = clamp((lt - 1.9) / .3);
  drawStick(ctx, C(CMD, { x: 790, y: 1800, s: 800, flip: -1, armLen: 1.2, arms: { L: [.3, -.1], R: give ? [.4, -.2] : { ik: [.22, -.62] } }, prop: give ? null : propScroll('R', op),
    face: lt > 2.6 ? { eyes: 'wide', mouth: 'grin', browUp: 1 } : { eyes: 'normal', look: [.5, .2], mouth: 'flat', browAng: .2 } }));
  if (lt > 2.6) sparkle(ctx, 700, 1100, 44, clamp((lt - 2.6) * 3));
} });
// R1: your enemy is in Kediri
SHOTS.push({ start: 57.52, end: 59.84, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  campBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  drawJavaMap(ctx, 150, 360, 780, { marks: [{ p: [.66, .5], label: 'Kediri', col: '#d8312b', a: clamp((lt - 1.1) * 3), size: 46 }] });
  drawStick(ctx, C(WIJ, { x: 240, y: 1800, s: 780, armLen: 1.25, arms: { L: POSE.hips.arms.L, R: { ik: [.3, -1.0] } }, prop: propKeris('R'), face: { eyes: 'normal', mouth: 'grin', look: [.6, -.6], browAng: -.2 } }));
  drawStick(ctx, C(CMD, { x: 860, y: 1780, s: 740, flip: -1, arms: POSE.hips.arms, headTilt: Math.sin(t * 6) * .05 * (lt > 1.4 ? 1 : 0), face: { eyes: 'normal', look: [-.3, -.6], mouth: lt > 1.4 ? 'grin' : 'flat' } }));
} });
// R2: let's take him down together (handshake)
SHOTS.push({ start: 59.84, end: 61.4, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .07 });
  campBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  const hy = 1390 + Math.sin(lt * 18) * 22 * clamp((lt - .8) * 3);
  if (lt > .85) burst(ctx, 540, hy, 170 * clamp((lt - .85) * 5), 12, '#ffd23a', 7);
  drawStick(ctx, C(WIJ, { x: 320, y: 1880, s: 900, arms: { L: [.3, -.1], R: { ik: loc(540, hy, 320, 1880, 900) } }, face: { eyes: 'happy', mouth: 'grin' } }));
  drawStick(ctx, C(CMD, { x: 760, y: 1880, s: 900, flip: -1, arms: { L: [.3, -.1], R: { ik: loc(540, hy, 760, 1880, 900, -1) } }, face: { eyes: 'happy', mouth: 'grin' } }));
  for (let i = 0; i < 4; i++) sparkle(ctx, 380 + i * 110, 1250 - (i % 2) * 90, 34, clamp((lt - .9) * 4));
} });
// S: side by side, storm Kediri
SHOTS.push({ start: 61.4, end: 66.32, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const charge = lt > 3.8;
  const cam = cam0(t, lt, { px: 160, hand: charge ? 7 : 3, pz: .015 });
  javaBG(ctx, t, cam, { vx: 1100 });
  applyCam(ctx, cam, .55); drawGate(ctx, 1500, 1060, .7, '#9a3a2a', charge ? 1 : 0, t);
  applyCam(ctx, cam, 1);
  const off = lt * 160 + (charge ? (lt - 3.8) * (lt - 3.8) * 250 : 0);
  for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) {
    const isM = (i + r) % 2 === 0; const x = -300 + i * 190 + r * 95 + off, y = 1180 + r * 90, s = 330 + r * 60;
    const legs = walkLegs(t + i * .3, charge ? 16 : 9, charge ? .7 : .45);
    const arms = charge ? { L: [2.4, .2], R: [2.6, .2] } : walkArms(t + i * .3, 9, .3);
    drawStick(ctx, C(isM ? MON : FOL, { x, y, s, legs, arms, lean: charge ? .14 : 0, prop: isM ? propSpear('R') : (i % 3 ? propKeris('R') : propFlag('R', '#fff', true)), face: charge ? ANGRY : { eyes: 'normal', mouth: 'smile', browAng: -.2 } }));
  }
  if (charge) { speedLines(ctx, .6, t, 1); for (let i = 0; i < 4; i++) puff(ctx, 100 + i * 260 + off * .2, 1420, 90, t, '#e6d6b4', 50 + i, .7); }
  nameTag(ctx, 540, 380, 'Majapahit + Mongol', '#5a7a3a', clamp((lt - .4) / .35), 50);
} });
// T: Kediri falls, Jayakatwang captured
SHOTS.push({ start: 66.32, end: 70.32, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const sh = shake(t, 9, 2); const cam = cam0(t, lt, { x: 540 + sh[0], y: 960 + sh[1], pz: .03 });
  javaBG(ctx, t, cam, Object.assign({}, WAR, { sun: false }));
  applyCam(ctx, cam, .8); drawGate(ctx, 540, 1150, 1.3, '#9a3a2a', 1, t);
  applyCam(ctx, cam, 1);
  for (let i = 0; i < 6; i++) { const k = (lt * .9 + i * .37) % 1.6; const x = 540 + Math.cos(i * 2.1) * (100 + k * 700), y = 1300 - Math.sin(k / 1.6 * Math.PI) * 600 - 100; drawStick(ctx, C(KED, { x, y, s: 260, shadow: false, lean: k * 9, legs: { L: [.6, -.9], R: [.4, -.4] }, arms: POSE.handsUp.arms, face: { eyes: 'x', mouth: 'o' } })); }
  for (let i = 0; i < 3; i++) { const k = (lt * 2 + i * .33) % 1; burst(ctx, 200 + i * 340, 1250 - i * 60, 80 * (1 - k), 9, i % 2 ? '#ffd23a' : '#fff', 8 + i); }
  const net = kf(lt, [[2.4, -700], [2.9, 0, easeIn]]); const caught = lt > 2.9;
  drawStick(ctx, C(JAY, { x: 540, y: 1820, s: 820, arms: caught ? POSE.handsUp.arms : { L: [1.2, -.5], R: [1.4, -.4] }, legs: caught ? { L: [.3, -.3], R: [.25, -.2] } : walkLegs(t, 14, .5), face: lt > 3.4 ? { eyes: 'spiral', mouth: 'o' } : { eyes: 'wide', mouth: 'o', browAng: .4 }, bob: caught ? Math.sin(t * 20) * .01 : 0 }));
  if (lt > 2.4) drawNet(ctx, 540, 1400 + net, 760, 900);
  if (lt > 2.9 && lt < 3.2) flash(ctx, (3.2 - lt) * 2);
  if (lt > 3.4) for (let i = 0; i < 3; i++) star5(ctx, 540 + Math.cos(t * 5 + i * 2.1) * 170, 1000 + Math.sin(t * 5 + i * 2.1) * 40, 30, t * 3);
} });
// U: the Mongols party and drop their weapons
SHOTS.push({ start: 70.32, end: 75.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  campBG(ctx, t, cam, EVENING);
  applyCam(ctx, cam, 1);
  ctx.beginPath(); for (let i = 0; i < 9; i++) ctx.lineTo(40 + i * 125, 300 + Math.sin(i * .7) * 40 - 30); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke();
  for (let i = 0; i < 9; i++) { const x = 40 + i * 125, y = 300 + Math.sin(i * .7) * 40; circle(ctx, x, y, 30); fillStroke(ctx, ['#d8312b', '#ffd23a', '#2f63c9'][i % 3], 5); }
  const drop = lt > 2.7, relax = lt > 4.4;
  const pile = clamp((lt - 2.7) / .5);
  if (pile > 0) for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(540 + (i - 2) * 30, 1520); ctx.rotate((i - 2) * .35 * pile); line(ctx, 0, 0, 0, -320, 12, '#8a5a32'); path(ctx, [[-14, -320], [14, -320], [0, -370]]); fillStroke(ctx, '#d7dde4', 5); ctx.restore(); }
  const dance = (i) => ({ L: [2.4 + Math.sin(t * 8 + i) * .4, .3], R: [2.0 - Math.sin(t * 8 + i) * .4, -.6] });
  drawStick(ctx, C(MON, { x: 540, y: 1430, s: 440, arms: dance(1), legs: walkLegs(t, 8, .3), prop: propCup('R'), bob: Math.abs(Math.sin(t * 8)) * -.03, face: { eyes: 'happy', mouth: 'grin' } }));
  if (relax) drawStick(ctx, C(MON, { x: 200, y: 1660, s: 540, lean: -1.45, shadow: false, arms: { L: { ik: [-.08, -.95] }, R: { ik: [.08, -.95] } }, legs: { L: [.1, 0], R: [.6, -.9] }, face: { eyes: 'happy', mouth: 'smile' } }));
  else drawStick(ctx, C(MON, { x: 200, y: 1600, s: 540, arms: dance(2), legs: walkLegs(t + 1, 8, .3), prop: drop ? propCup('R') : combo(propCup('R'), propSpear('L')), bob: Math.abs(Math.sin(t * 8 + 1)) * -.03, face: { eyes: 'happy', mouth: 'grin' } }));
  drawStick(ctx, C(MON, { x: 880, y: 1600, s: 540, flip: -1, arms: dance(3), legs: walkLegs(t + 2, 8, .3), prop: drop ? propCup('R') : combo(propCup('R'), propSpear('L')), bob: Math.abs(Math.sin(t * 8 + 2)) * -.03, face: { eyes: 'happy', mouth: 'grin' } }));
  if (relax) for (let i = 0; i < 3; i++) qmark(ctx, 300 + i * 40, 1200 - i * 50 - ((t * 40) % 40), 50 + i * 14, t, 1, 'z');
} });
// ===== SCENE 5: THE TWIST =====
// V: exactly what Wijaya was waiting for
SHOTS.push({ start: 75.6, end: 78.16, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .12 });
  javaBG(ctx, t, cam, { top: '#1e1a3a', bot: '#6a3a6a', hills: ['#3a2a4a', '#2a1e3a', '#1e162a'], g1: '#2a2a2a', g2: '#1a1a1a', sun: false, vcol: '#2e2440', clouds: false });
  applyCam(ctx, cam, 1);
  drawTree(ctx, 150, 2000, 2.6, 81);
  drawStick(ctx, C(WIJ, { x: 560, y: 2020, s: 1150, arms: { L: [.3, -.1], R: { ik: [.12, -.6], bend: -1 } }, prop: propKeris('R'), face: { eyes: 'smug', mouth: 'smirk', look: [.8, 0], browOne: 1, browAng: -.2 } }));
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createRadialGradient(560, 1150, 120, 560, 1150, 900); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(10,0,20,.6)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
  sparkle(ctx, 640, 1000, 40, clamp((lt - 1.2) * 4) * (lt < 1.8 ? 1 : 0));
} });
// W: going home to prepare gifts (with an unarmed escort)
SHOTS.push({ start: 78.16, end: 81.68, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  campBG(ctx, t, cam, EVENING);
  applyCam(ctx, cam, 1);
  const walk = lt > 2.2; const wx = 380 - (walk ? (lt - 2.2) * 260 : 0);
  [[620, 0], [760, 1]].forEach(([x, i]) => drawStick(ctx, C(MON, { x: x - (walk ? (lt - 2.2) * 260 : 0), y: 1300, s: 380, flip: -1, legs: walk ? walkLegs(t + i, 9, .4) : POSE.idle.legs, arms: walk ? walkArms(t + i) : POSE.idle.arms, face: { eyes: 'happy', mouth: 'smile' } })));
  drawStick(ctx, C(WIJ, { x: wx, y: 1780, s: 780, flip: walk ? -1 : 1, lean: walk ? 0 : kf(lt, [[0, 0], [.4, .35], [1.6, .35], [2.0, 0]]), legs: walk ? walkLegs(t, 9, .4) : POSE.idle.legs, armLen: 1.1, arms: { L: { ik: [.25, -.5] }, R: { ik: [.25, -.45] } }, prop: propBox('R'), face: { eyes: 'happy', mouth: 'grin' } }));
  drawStick(ctx, C(CMD, { x: 880, y: 1760, s: 740, flip: -1, arms: { L: [.3, -.1], R: [2.6 + Math.sin(t * 9) * .3, .3] }, face: { eyes: 'happy', mouth: 'grin' } }));
  nameTag(ctx, 690, 900, 'pengawal (tanpa senjata)', '#8a5a32', clamp((lt - 1.0) / .35), 42);
} });
// X: turns on his allies
SHOTS.push({ start: 81.68, end: 83.28, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .1, hand: 6 });
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createRadialGradient(540, 1000, 50, 540, 1000, 1200); g.addColorStop(0, '#ff7a3a'); g.addColorStop(1, '#5a0a14'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 18; i++) { ctx.save(); ctx.translate(540, 1000); ctx.rotate(i / 18 * TAU + t * .4); path(ctx, [[0, 0], [-60, -1600], [60, -1600]]); ctx.fillStyle = 'rgba(255,220,120,.12)'; ctx.fill(); ctx.restore(); } ctx.restore();
  applyCam(ctx, cam, 1);
  const k = clamp(lt / .35); const flip = -Math.cos(k * Math.PI);
  drawStick(ctx, C(WIJ, { x: 540, y: 2000, s: 1100, flip: Math.abs(flip) < .05 ? .05 : flip, arms: lt > .5 ? { L: [.3, -.1], R: [2.8, .2] } : POSE.idle.arms, prop: lt > .5 ? propKeris('R') : null, face: lt > .3 ? { eyes: 'normal', mouth: 'teeth', browAng: -.45 } : { eyes: 'happy', mouth: 'smile' } }));
  if (lt > .5 && lt < .75) flash(ctx, (.75 - lt) * 3);
  speedLines(ctx, clamp(1 - lt * 2), t, -1);
} });
// Y: ambush and surprise attack on the camp
SHOTS.push({ start: 83.28, end: 88.0, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const fight = lt > 3.1; const sh = fight ? shake(t, 8, 2) : [0, 0];
  const cam = cam0(t, lt, { x: 540 + sh[0], y: 960 + sh[1], pz: .03 });
  campBG(ctx, t, cam, { top: '#3a2a5a', bot: '#c86a5a', hills: ['#6a4a6a', '#5a3a5a', '#3a2a40'], g1: '#5a5a3a', g2: '#3a3a2a', sun: false, vcol: '#5a4466' });
  applyCam(ctx, cam, 1);
  const alarm = lt > .9;
  if (!fight) [[380, 1], [700, -1]].forEach(([x, f]) => { drawStick(ctx, C(MON, { x, y: 1320, s: 400, flip: f, legs: alarm ? { L: [.3, -.2], R: [.3, -.2] } : POSE.idle.legs, arms: alarm ? POSE.handsUp.arms : POSE.idle.arms, bob: alarm ? -.05 * Math.abs(Math.sin(t * 20)) : 0, face: alarm ? { eyes: 'wide', mouth: 'o', browAng: .4 } : { eyes: 'happy', mouth: 'smile' } })); qmark(ctx, x, 830, 90, t, clamp((lt - .9) * 4), '!'); });
  [[-1, 120], [1, 960]].forEach(([d, x0]) => {
    const k = clamp((lt - .7) / .5); const x = lerp(x0, 540 - d * 170, k), y = 1700 - Math.sin(k * Math.PI) * 420 - k * 340;
    if (!fight) drawStick(ctx, C(FOL, { x, y, s: 520, flip: -d, legs: k < 1 ? { L: [.8, -1.2], R: [.6, -1.0] } : POSE.idle.legs, arms: { L: [1.6, -.4], R: [2.6, .2] }, prop: propKeris('R'), face: ANGRY, shadow: k >= 1 }));
  });
  bush(ctx, 120, 1900, 1.6, 4); bush(ctx, 960, 1900, 1.6, 5);
  fightCloud(ctx, 540, 1150, 260, t, clamp((lt - 3.1) * 4));
  if (fight && lt < 3.35) flash(ctx, (3.35 - lt) * 3);
  kinetic(ctx, 'SERANGAN!', 540, 420, 130, lt, 3.1, { burst: '#d8312b', fill: '#fff' });
} });
// Z: shocked Mongols run for their ships
SHOTS.push({ start: 88.0, end: 93.12, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { px: -170, hand: 6, pz: 0 });
  seaBG(ctx, t, cam, { h: 820, clouds: false });
  applyCam(ctx, cam, .7); drawJunk(ctx, -250, 900, .5, t, { ph: 1 }); drawJunk(ctx, 150, 880, .35, t, { ph: 2 });
  applyCam(ctx, cam, 1); drawSand(ctx, 1000);
  for (let i = 0; i < 6; i++) { const x = 1100 - i * 150 - lt * 330 - (i % 2) * 60, y = 1200 + (i % 3) * 50; drawStick(ctx, C(MON, { x, y, s: 330, hat: i % 3 === 0 ? 'none' : 'mongol', flip: -1, legs: walkLegs(t + i, 20, .8), arms: POSE.handsUp.arms, lean: -.15, face: { eyes: 'wide', mouth: 'o', browAng: .45, look: [1, 0] } }));
    if (i % 3 === 0) helmetAt(ctx, x + 60 + ((t * 3 + i) % 1) * 80, y - 360 - ((t * 3 + i) % 1) * 140, 330, t * 8 + i); }
  for (let i = 0; i < 3; i++) { const x = 1500 - i * 170 - lt * 330, y = 1230 + i * 40; drawStick(ctx, C(FOL, { x, y, s: 340, flip: -1, legs: walkLegs(t + i, 16, .7), arms: { L: [.6, -.3], R: [2.7, .2] }, prop: propKeris('R'), lean: -.12, face: ANGRY })); }
  const fx = 1080 - lt * 330;
  drawStick(ctx, C(MON, { x: fx, y: 1720, s: 620, hat: 'none', flip: -1, legs: walkLegs(t, 18, .9), arms: POSE.handsUp.arms, lean: -.18, face: { eyes: 'wide', mouth: 'teeth', browAng: .5, look: [1, 0] } }));
  helmetAt(ctx, fx + 140, 1720 - 680 - (lt * 120 % 90), 620, Math.sin(t * 12) * .4);
  sweat(ctx, fx - 140, 1170, 40, 1);
} });
// AA1: sailing home empty handed
SHOTS.push({ start: 93.12, end: 96.6, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  seaBG(ctx, t, cam, { h: 900, top: '#3b2350', bot: '#ff9a52', sunY: 900, sunX: 760, sunR: 120, clouds: false, sea: ['#e08a6a', '#8a4a6a', '#3a2a4a'] });
  applyCam(ctx, cam, .7); for (let i = 0; i < 5; i++) drawJunk(ctx, 200 + i * 170 + lt * 60, 950, .16 - i * .015, t, { ph: i });
  applyCam(ctx, cam, 1);
  const jx = 520 + lt * 70;
  drawStick(ctx, C(MON, { x: jx + 60, y: 1180, s: 330, shadow: false, arms: { L: [1.5, -.2], R: [1.5, -.2] }, face: { eyes: 'squint', mouth: 'frown', browAng: .5 } }));
  for (let i = 0; i < 2; i++) { const k = ((lt * 2 + i / 2) % 1); circle(ctx, jx + 60 + (i ? 40 : -40) + (i ? 1 : -1) * k * 60, 1180 - .765 * 330 + k * 120, 10); ctx.fillStyle = `rgba(140,210,255,${1 - k})`; ctx.fill(); }
  drawJunk(ctx, jx, 1450, 1.0, t, { ph: 3 });
  kinetic(ctx, 'PULANG KE TIONGKOK', 540, 420, 90, lt, .8, { fill: '#fff' });
} });
// AA2: Kublai never conquers Java
SHOTS.push({ start: 96.6, end: 98.08, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .06 });
  palaceBG(ctx, cam);
  applyCam(ctx, cam, 1);
  drawStick(ctx, C(KHAN, { x: 540, y: 1880, s: 900, armLen: 1.15, arms: { L: POSE.hips.arms.L, R: lt > .2 ? { ik: [.06, -.78], bend: -1 } : [.4, -.3] }, face: { eyes: 'squint', mouth: 'frown', browAng: .4 }, headTilt: .1 }));
  sweat(ctx, 720, 1050, 40, clamp((lt - .3) * 4));
} });
// ===== SCENE 6: ENDING =====
// AB: 1293, Wijaya is crowned
SHOTS.push({ start: 98.08, end: 103.92, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  javaBG(ctx, t, cam, SUNRISE);
  applyCam(ctx, cam, .9); drawGate(ctx, 540, 1180, 1.25);
  applyCam(ctx, cam, 1);
  const land = 3.55; const crowned = lt > land;
  [[150, 1], [930, -1]].forEach(([x, f], i) => drawStick(ctx, C(FOL, { x, y: 1520, s: 500, flip: f, arms: crowned ? { L: [2.6 + Math.sin(t * 9 + i) * .2, .3], R: [2.6 - Math.sin(t * 9 + i) * .2, .3] } : POSE.idle.arms, bob: crowned ? -Math.abs(Math.sin(t * 9 + i)) * .04 : 0, prop: i ? null : propFlag('R', '#fff', true), face: crowned ? { eyes: 'happy', mouth: 'grin' } : { eyes: 'normal', look: [-f * .4, -.6], mouth: 'o' } })));
  drawStick(ctx, C(WIJ, { x: 540, y: 1860, s: 860, hat: crowned ? 'crown' : 'blangkon', arms: crowned ? POSE.hips.arms : POSE.idle.arms, face: crowned ? { eyes: 'happy', mouth: 'grin' } : { eyes: 'normal', look: [0, -1], mouth: 'smile' } }));
  if (!crowned && lt > 2.7) crownAt(ctx, 540, kf(lt, [[2.7, -100], [land, 1860 - .765 * 860, easeIn]]), 860, 0);
  if (crowned) { confetti(ctx, t, clamp((lt - land) * 3)); for (let i = 0; i < 4; i++) sparkle(ctx, 540 + Math.cos(i * 1.6) * 230, 1000 + Math.sin(i * 1.6) * 90, 40, clamp((lt - land) * 4) * (.5 + .5 * Math.sin(t * 7 + i))); }
  kinetic(ctx, '1293', 540, 420, 200, lt, .2, { burst: '#ffd23a', fill: '#fff', out: 2.6 });
  nameTag(ctx, 540, 780, 'Raja Pertama Majapahit', '#d9a83a', clamp((lt - 4.6) / .35), 40);
} });
// AC: one of the greatest empires of the archipelago
SHOTS.push({ start: 103.92, end: 109.28, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03, hand: 2 });
  applyCam(ctx, cam, .2); drawSky(ctx, '#1a3a6a', '#3a7ab0', -400, 2400);
  applyCam(ctx, cam, 1);
  drawNusantara(ctx, 60, 480, 960, clamp((lt - .4) / 3.6), t);
  drawStick(ctx, C(WIJ, { x: 470, y: 900, s: 200, hat: 'crown', shadow: false, arms: POSE.hips.arms, face: { eyes: 'happy', mouth: 'grin' } }));
  kinetic(ctx, 'MAJAPAHIT', 540, 330, 130, lt, 1.6, { fill: '#ffd23a' });
  kinetic(ctx, '(1293-1527)', 540, 1170, 70, lt, 3.4, { fill: '#fff', rot: 0 });
} });
// AD: not the biggest army, the smartest strategy
SHOTS.push({ start: 109.28, end: 114.04, tr: 'whip', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .03 });
  javaBG(ctx, t, cam, { volcano: false });
  applyCam(ctx, cam, 1);
  const flex = lt > 2.0 && lt < 3.6; const dumb = lt > 3.7;
  drawStick(ctx, C(MON, { x: 250, y: 2050, s: 1350, arms: flex ? { L: [2.0, -1.8], R: [2.0, -1.8] } : POSE.idle.arms, prop: flex ? null : propSpear('R'), face: dumb ? { eyes: 'wide', mouth: 'o', look: [1, 0], browAng: .3 } : { eyes: 'normal', mouth: 'grin', browAng: -.3 } }));
  if (dumb) qmark(ctx, 330, 560, 120, t, clamp((lt - 3.7) * 4));
  const on = clamp((lt - 3.6) / .2);
  drawStick(ctx, C(WIJ, { x: 830, y: 1620, s: 600, flip: -1, hat: 'crown', armLen: 1.1, arms: { L: [.3, -.1], R: on > 0 ? { ik: [.18, -.83], bend: -1 } : [.3, -.1] }, face: on > 0 ? { eyes: 'smug', mouth: 'smirk', browOne: 1 } : { eyes: 'normal', mouth: 'smile', look: [.5, -.6] } }));
  drawBulb(ctx, 830, 960, 60, on, t);
  kinetic(ctx, 'STRATEGI', 540, 330, 130, lt, 4.2, { burst: '#2f9e57', fill: '#fff' });
} });
// AE: part two, the Battle of Bubat?
SHOTS.push({ start: 114.04, end: 116.7, tr: 'cut', draw(ctx, lt, t) {
  NOW = t; const cam = cam0(t, lt, { pz: .02 });
  javaBG(ctx, t, cam, SUNRISE);
  applyCam(ctx, cam, .9); drawGate(ctx, 540, 1180, 1.25);
  applyCam(ctx, cam, 1);
  drawStick(ctx, C(WIJ, { x: 540, y: 1860, s: 860, hat: 'crown', arms: { L: POSE.hips.arms.L, R: [2.6 + Math.sin(t * 9) * .3, .3] }, face: { eyes: 'happy', mouth: 'grin' } }));
  kinetic(ctx, 'PART 2:', 540, 250, 90, lt, .3, { fill: '#fff', rot: 0 });
  kinetic(ctx, 'PERANG BUBAT?', 540, 450, 120, lt, .6, { burst: '#d8312b' });
} });
