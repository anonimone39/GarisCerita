// ---------- props for "Sejarah Cabai" ----------
const CHILI_RED = '#d92b1c', CHILI_DK = '#9e1710', LEAF = '#3fa35b', LEAF_DK = '#2b7d44';

// extra hats (wired into drawStick in chars.js)
function drawPeci(ctx, hx, hy, hr, lw) {
  const top = hy - hr * .72;
  rrect(ctx, hx - hr * .8, top - .07, hr * 1.6, .1, [.04, .04, .01, .01]); fillStroke(ctx, '#1d1a22', lw);
  ctx.save(); rrect(ctx, hx - hr * .8, top - .07, hr * 1.6, .1, [.04, .04, .01, .01]); ctx.clip();
  ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.fillRect(hx - hr * .6, top - .08, hr * .35, .1); ctx.restore();
}
function drawFeatherBand(ctx, hx, hy, hr, lw) {
  const y = hy - hr * .5;
  ctx.beginPath(); ctx.moveTo(hx - hr * .98, y + .02); ctx.quadraticCurveTo(hx, y - .06, hx + hr * .98, y + .02); ctx.lineTo(hx + hr * .98, y + .07); ctx.quadraticCurveTo(hx, y, hx - hr * .98, y + .07); ctx.closePath();
  fillStroke(ctx, '#c4552b', lw);
  const cols = ['#e0392f', '#f2b52a', '#3fa35b', '#2f63c9', '#f2b52a'];
  for (let i = -2; i <= 2; i++) {
    ctx.save(); ctx.translate(hx + i * hr * .3, y - .03 + Math.abs(i) * .012); ctx.rotate(i * .24);
    ctx.beginPath(); ctx.ellipse(0, -.075, .025, .085, 0, 0, TAU); fillStroke(ctx, cols[i + 2], lw * .8); ctx.restore();
  }
}

// ---------- food ----------
function steam(ctx, x, y, s, t, a = 1) {
  ctx.save(); ctx.globalAlpha = .6 * a; ctx.strokeStyle = '#fff'; ctx.lineWidth = 9 * s; ctx.lineCap = 'round';
  for (let i = 0; i < 3; i++) {
    const ph = (t * .7 + i * .33) % 1; const bx = x + (i - 1) * 60 * s;
    ctx.globalAlpha = .6 * a * Math.sin(ph * Math.PI);
    ctx.beginPath(); ctx.moveTo(bx, y - ph * 110 * s); ctx.bezierCurveTo(bx + 24 * s, y - ph * 110 * s - 30 * s, bx - 24 * s, y - ph * 110 * s - 55 * s, bx + 6 * s, y - ph * 110 * s - 90 * s); ctx.stroke();
  }
  ctx.restore();
}
function drawChiliPod(ctx, x, y, s, rot = 0, col = CHILI_RED, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const body = () => { ctx.beginPath(); ctx.moveTo(-26, -10); ctx.bezierCurveTo(-10, -34, 40, -30, 70, 26); ctx.bezierCurveTo(78, 40, 66, 44, 56, 36); ctx.bezierCurveTo(24, 18, -14, 26, -26, 10); ctx.bezierCurveTo(-34, 4, -32, -4, -26, -10); ctx.closePath(); };
  body(); fillStroke(ctx, col, 5);
  ctx.save(); body(); ctx.clip(); ctx.fillStyle = 'rgba(80,0,0,.28)'; ctx.fillRect(-40, 4, 140, 40); ctx.fillStyle = 'rgba(255,255,255,.45)'; ellipse(ctx, 0, -14, 22, 5, .25); ctx.fill(); ctx.restore();
  // cap and stem
  ctx.beginPath(); ctx.moveTo(-22, -12); ctx.quadraticCurveTo(-34, -22, -40, -34); ctx.quadraticCurveTo(-28, -32, -20, -20); ctx.closePath(); fillStroke(ctx, LEAF, 4);
  ellipse(ctx, -26, -2, 9, 15, 0); fillStroke(ctx, LEAF, 4);
  ctx.restore();
}
function drawBowl(ctx, x, y, s, t, o = {}) {
  // x,y = centre of the rim; bowl hangs below
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  steam(ctx, 0, -60, 1, t, o.steam == null ? 1 : o.steam);
  ctx.beginPath(); ctx.moveTo(-170, 0); ctx.bezierCurveTo(-160, 120, -80, 160, 0, 160); ctx.bezierCurveTo(80, 160, 160, 120, 170, 0); ctx.closePath(); fillStroke(ctx, '#f7f3ea', 6);
  ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(40,20,60,.14)'; ctx.fillRect(40, -10, 200, 220); ctx.fillStyle = '#2f63c9'; ctx.fillRect(-200, 38, 400, 12); ctx.fillStyle = '#d92b1c'; for (let i = -4; i <= 4; i++) { circle(ctx, i * 38, 84, 8); ctx.fill(); } ctx.restore();
  ellipse(ctx, 0, 0, 170, 48); fillStroke(ctx, '#f7f3ea', 6);
  ellipse(ctx, 0, 4, 150, 38); fillStroke(ctx, '#d18a3c', 4);
  ctx.save(); ellipse(ctx, 0, 4, 150, 38); ctx.clip();
  ctx.strokeStyle = '#f0d68a'; ctx.lineWidth = 7; ctx.lineCap = 'round';
  for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-100 + i * 30, -10); ctx.quadraticCurveTo(-80 + i * 30, -34, -60 + i * 30, -10); ctx.stroke(); }
  for (const [bx, by, br] of [[-60, -14, 36], [20, -26, 40], [78, -6, 32], [-8, 6, 30]]) { circle(ctx, bx, by, br); fillStroke(ctx, '#b88257', 5); ellipse(ctx, bx - br * .3, by - br * .35, br * .3, br * .16, -.5); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fill(); }
  ctx.fillStyle = LEAF; for (const [lx, ly] of [[-100, 6], [100, 12], [30, 14]]) { ellipse(ctx, lx, ly, 14, 7, .4); ctx.fill(); }
  ctx.restore();
  const sa = o.sambal == null ? 1 : o.sambal;
  if (sa > 0) {
    ctx.save(); ctx.translate(-4, -30); ctx.scale(sa, sa);
    ellipse(ctx, 0, 0, 62, 34); fillStroke(ctx, CHILI_RED, 5);
    for (const [px, py] of [[-22, -8], [10, -12], [24, 6], [-8, 8], [34, -8]]) { circle(ctx, px, py, 4); ctx.fillStyle = '#ff7a52'; ctx.fill(); }
    ellipse(ctx, -16, -14, 20, 6, -.3); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}
function drawSpoon(ctx, len = .3, w = .02) {
  // handle along +y, scoop at the far end (local units of caller)
  ctx.beginPath(); ctx.moveTo(-w * .5, 0); ctx.lineTo(w * .5, 0); ctx.lineTo(w * .5, len * .75); ctx.lineTo(-w * .5, len * .75); ctx.closePath(); fillStroke(ctx, '#cfd5dd', w * .45);
  ctx.beginPath(); ctx.ellipse(0, len * .87, w * 1.7, len * .17, 0, 0, TAU); fillStroke(ctx, '#e6eaf0', w * .45);
}
function drawGeprek(ctx, x, y, s, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ellipse(ctx, 0, 14, 190, 52); fillStroke(ctx, '#f7f3ea', 6); ellipse(ctx, 0, 8, 160, 40); ctx.fillStyle = '#ece6d8'; ctx.fill();
  // rice
  ctx.beginPath(); ctx.ellipse(-90, -4, 58, 36, 0, Math.PI, 0); ctx.closePath(); fillStroke(ctx, '#fffdf5', 5);
  // chicken
  const ch = () => { ctx.beginPath(); ctx.moveTo(-10, -2); ctx.bezierCurveTo(-30, -60, 40, -90, 100, -56); ctx.bezierCurveTo(140, -34, 120, 6, 70, 8); ctx.bezierCurveTo(30, 14, 4, 8, -10, -2); ctx.closePath(); };
  ch(); fillStroke(ctx, '#d9962f', 6);
  ctx.save(); ch(); ctx.clip(); ctx.fillStyle = 'rgba(120,50,0,.28)'; ctx.fillRect(60, -100, 120, 140); ctx.fillStyle = '#f2c260'; for (const [px, py] of [[10, -30], [50, -62], [90, -30], [66, -4], [114, -50]]) { circle(ctx, px, py, 9); ctx.fill(); } ctx.restore();
  // sambal on top
  ellipse(ctx, 40, -42, 60, 26); fillStroke(ctx, CHILI_RED, 5);
  for (const [px, py] of [[20, -46], [52, -52], [64, -36], [36, -34]]) { circle(ctx, px, py, 4); ctx.fillStyle = '#ff7a52'; ctx.fill(); }
  // cucumber
  for (let i = 0; i < 3; i++) { ellipse(ctx, -150 + i * 20, 24 - i * 6, 22, 12, -.2); fillStroke(ctx, '#7fcf6a', 4); }
  ctx.restore();
}
function thoughtBubble(ctx, x, y, w, h, tx, ty, a = 1) {
  ctx.save(); ctx.globalAlpha = a;
  const dots = [[.22, .78], [.12, .9], [.04, .98]];
  const p = (u) => [lerp(tx, x, u), lerp(ty, y + h * .45, u)];
  [[.18, 14], [.42, 22], [.7, 30]].forEach(([u, r]) => { const [px, py] = p(u); circle(ctx, px, py, r); fillStroke(ctx, '#fff', 6); });
  ctx.beginPath(); ctx.ellipse(x, y, w / 2, h / 2, 0, 0, TAU);
  for (let i = 0; i < 9; i++) { const a2 = i / 9 * TAU; ctx.moveTo(x + Math.cos(a2) * w * .46 + w * .12, y + Math.sin(a2) * h * .44); ctx.arc(x + Math.cos(a2) * w * .46, y + Math.sin(a2) * h * .44, w * .1, 0, TAU); }
  fillStroke(ctx, '#fff', 8); ctx.fill();
  ctx.beginPath(); ctx.ellipse(x, y, w / 2 - 2, h / 2 - 2, 0, 0, TAU); ctx.fillStyle = '#fff'; ctx.fill();
  ctx.restore();
}
function drawCobek(ctx, x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-190, 0); ctx.quadraticCurveTo(-170, 70, -90, 80); ctx.lineTo(90, 80); ctx.quadraticCurveTo(170, 70, 190, 0); ctx.closePath(); fillStroke(ctx, '#8d8a93', 6);
  ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(30,20,50,.2)'; ctx.fillRect(40, -10, 200, 120); ctx.restore();
  ellipse(ctx, 0, 0, 190, 40); fillStroke(ctx, '#a8a5ae', 6);
  ellipse(ctx, 0, 2, 160, 30); fillStroke(ctx, CHILI_RED, 4);
  for (const [px, py] of [[-60, -4], [20, 6], [70, -2], [-20, 8], [100, 6]]) { circle(ctx, px, py, 7); ctx.fillStyle = '#ff7a52'; ctx.fill(); }
  // pestle
  const sw = Math.sin(t * 7) * (o.grind == null ? 1 : o.grind);
  ctx.save(); ctx.translate(20 + sw * 50, -6); ctx.rotate(-.7 + sw * .25);
  rrect(ctx, -22, -190, 44, 190, 16); fillStroke(ctx, '#a8a5ae', 6); ellipse(ctx, 0, 0, 30, 18); fillStroke(ctx, '#8d8a93', 5);
  ctx.restore();
  ctx.restore();
}
function drawChiliString(ctx, x, y, len, t, s = 1) {
  ctx.save(); ctx.translate(x, y); const sw = Math.sin(t * 1.3 + x) * .03; ctx.rotate(sw);
  line(ctx, 0, 0, 0, len, 5, '#6a4a2c');
  for (let i = 0; i < len / (46 * s); i++) drawChiliPod(ctx, (i % 2 ? 22 : -22) * s, 40 * s + i * 46 * s, .46 * s, Math.PI / 2 + (i % 2 ? .5 : -.5) + .1, CHILI_RED);
  ctx.restore();
}
function drawChiliPlant(ctx, x, y, s, grow = 1, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s * (.15 + .85 * grow));
  ctx.rotate(Math.sin(t * 1.6 + x * .01) * .02);
  ellipse(ctx, 0, 6, 70, 16); ctx.fillStyle = '#7a4a2a'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-8, 0); ctx.quadraticCurveTo(-4, -150, 0, -250); ctx.lineTo(8, -250); ctx.quadraticCurveTo(6, -150, 8, 0); ctx.closePath(); fillStroke(ctx, '#58a14a', 5);
  const leaves = [[-1, -60], [1, -95], [-1, -140], [1, -180], [-1, -215], [1, -245]];
  leaves.forEach(([sd, ly], i) => { ctx.save(); ctx.translate(sd * 4, ly); ctx.rotate(sd * (.9 - i * .06)); ctx.beginPath(); ctx.ellipse(sd * 38, 0, 44, 17, 0, 0, TAU); fillStroke(ctx, i % 2 ? LEAF : LEAF_DK, 4); ctx.restore(); });
  const ripe = clamp((grow - .55) * 2.4);
  if (ripe > 0) for (const [cx, cy, r] of [[-26, -118, 1.0], [30, -160, .9], [-30, -196, .8], [24, -80, 1.0]]) drawChiliPod(ctx, cx, cy, .55 * ripe * r, Math.PI / 2 - .3 + cx * .01, CHILI_RED);
  ctx.restore();
}

// ---------- places ----------
function warungBG(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .25);
  const g = ctx.createLinearGradient(0, -200, 0, 1300); g.addColorStop(0, o.top || '#f9d9a0'); g.addColorStop(1, o.bot || '#eba35a');
  ctx.fillStyle = g; ctx.fillRect(-1200, -1200, 3500, 3200);
  // wall planks
  ctx.strokeStyle = 'rgba(120,60,20,.15)'; ctx.lineWidth = 5; for (let i = -6; i < 14; i++) { ctx.beginPath(); ctx.moveTo(i * 120, -1200); ctx.lineTo(i * 120, 1500); ctx.stroke(); }
  // bunting
  ctx.beginPath(); ctx.moveTo(-100, 330); ctx.quadraticCurveTo(540, 470, 1180, 330); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke();
  const cols = ['#e0392f', '#f2b52a', '#3fa35b', '#2f63c9', '#7a4bc4'];
  for (let i = 0; i < 10; i++) { const u = i / 9; const bx = lerp(-60, 1140, u), by = 330 + Math.sin(u * Math.PI) * 62 + 2; ctx.beginPath(); ctx.moveTo(bx - 30, by); ctx.lineTo(bx + 30, by); ctx.lineTo(bx, by + 70 + Math.sin(t * 2 + i) * 4); ctx.closePath(); fillStroke(ctx, cols[i % 5], 4); }
  // shelf with jars
  rrect(ctx, 60, 860, 360, 20, 6); fillStroke(ctx, '#7a4a2a', 5);
  for (const [jx, jc] of [[110, '#d92b1c'], [190, '#f2b52a'], [270, '#3fa35b'], [350, '#d92b1c']]) { rrect(ctx, jx - 28, 780, 56, 80, 12); fillStroke(ctx, jc, 4); rrect(ctx, jx - 22, 766, 44, 16, 4); fillStroke(ctx, '#d6c29a', 4); }
  // lamp
  line(ctx, 880, 150, 880, 420, 5, INK); ellipse(ctx, 880, 440, 70, 40); fillStroke(ctx, '#e0392f', 5);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const lg = ctx.createRadialGradient(880, 470, 10, 880, 470, 360); lg.addColorStop(0, 'rgba(255,220,130,.5)'); lg.addColorStop(1, 'rgba(255,200,100,0)'); ctx.fillStyle = lg; ctx.fillRect(500, 100, 800, 800); ctx.restore();
  applyCam(ctx, cam, 1);
  // floor
  ctx.fillStyle = '#c98d56'; ctx.fillRect(-1200, 1500, 3500, 1200);
  ctx.fillStyle = 'rgba(90,40,10,.15)'; for (let i = 0; i < 12; i++) ctx.fillRect(-1200, 1520 + i * 90, 3500, 6);
}
function drawTable(ctx, x0, x1, top, bottom) {
  rrect(ctx, x0, top + 50, x1 - x0, bottom - top - 50, 0); fillStroke(ctx, '#9a5a2c', 6);
  ctx.save(); rrect(ctx, x0, top + 50, x1 - x0, bottom - top - 50, 0); ctx.clip(); ctx.strokeStyle = 'rgba(60,20,0,.2)'; ctx.lineWidth = 4; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(x0 + i * (x1 - x0) / 8, top + 50); ctx.lineTo(x0 + i * (x1 - x0) / 8, bottom); ctx.stroke(); } ctx.restore();
  rrect(ctx, x0 - 24, top, x1 - x0 + 48, 56, 14); fillStroke(ctx, '#d79a5a', 6);
  ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fillRect(x0 - 10, top + 8, x1 - x0 + 20, 8);
}

// ---------- world map ----------
const MAP = {
  na: [[30, 70], [90, 40], [170, 35], [250, 50], [300, 75], [285, 110], [260, 140], [240, 175], [215, 200], [225, 225], [250, 245], [262, 262], [240, 258], [215, 240], [190, 215], [170, 190], [130, 165], [95, 140], [60, 115]],
  gl: [[300, 25], [350, 20], [365, 45], [335, 65], [310, 50]],
  sa: [[255, 265], [295, 262], [335, 290], [345, 325], [320, 370], [295, 420], [275, 470], [262, 455], [258, 395], [245, 340], [238, 295]],
  eu: [[470, 60], [520, 45], [570, 55], [585, 85], [560, 115], [520, 125], [490, 140], [470, 125], [455, 100]],
  af: [[470, 150], [540, 145], [590, 170], [610, 215], [600, 265], [575, 330], [545, 385], [520, 375], [505, 320], [490, 260], [455, 215], [450, 175]],
  as: [[590, 60], [680, 40], [790, 45], [880, 70], [920, 110], [890, 150], [850, 180], [800, 215], [760, 250], [730, 240], [700, 205], [660, 185], [620, 170], [590, 150], [585, 100]],
  in: [[690, 200], [720, 215], [715, 260], [700, 285], [685, 250], [675, 215]],
  id: [[[745, 275], [790, 290], [805, 310], [775, 305]], [[800, 325], [860, 330], [870, 340], [805, 338]], [[815, 270], [865, 265], [880, 300], [840, 315], [815, 300]], [[885, 290], [915, 285], [905, 320]], [[935, 310], [995, 305], [995, 335], [950, 335]]],
  au: [[880, 380], [950, 365], [1000, 395], [985, 440], [920, 450], [880, 425]],
};
const MAP_K = 1.8, MAP_X0 = -300, MAP_Y0 = 560;
const mapPt = (mx, my) => [MAP_X0 + mx * MAP_K, MAP_Y0 + my * MAP_K];
function worldMap(ctx, t, o = {}) {
  ctx.save(); ctx.translate(MAP_X0, MAP_Y0); ctx.scale(MAP_K, MAP_K);
  // ocean
  const og = ctx.createLinearGradient(0, -200, 0, 700); og.addColorStop(0, '#59c2e6'); og.addColorStop(1, '#2f8fc9');
  ctx.fillStyle = og; ctx.fillRect(-900, -900, 2900, 2300);
  ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1.2;
  for (let i = -3; i <= 14; i++) { ctx.beginPath(); ctx.moveTo(i * 100, -500); ctx.lineTo(i * 100, 900); ctx.stroke(); }
  for (let j = -3; j <= 9; j++) { ctx.beginPath(); ctx.moveTo(-500, j * 100); ctx.lineTo(1500, j * 100); ctx.stroke(); }
  const land = (pts, fill) => { path(ctx, pts); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = 2.6; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.stroke(); };
  const base = '#8fd16c', alt = '#e8c46a';
  const hi = o.hiAmerica || 0, hiId = o.hiIndo || 0;
  const amCol = hi > 0 ? mix(base, '#f08a2c', hi) : base;
  land(MAP.gl, '#eef6f0'); land(MAP.eu, base); land(MAP.af, alt); land(MAP.as, base); land(MAP.in, base); land(MAP.au, alt);
  land(MAP.na, amCol); land(MAP.sa, amCol);
  const idCol = hiId > 0 ? mix(base, '#e0392f', hiId) : base;
  MAP.id.forEach(p => land(p, idCol));
  // shade
  ctx.restore();
}
function mapPin(ctx, mx, my, label, col, a = 1, t = 0, scale = 1) {
  const [x, y] = mapPt(mx, my); if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y - Math.abs(Math.sin(t * 4)) * 8); ctx.scale(scale, scale);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-34, -40, -34, -86, 0, -86); ctx.bezierCurveTo(34, -86, 34, -40, 0, 0); fillStroke(ctx, col, 6);
  circle(ctx, 0, -58, 12); ctx.fillStyle = '#fff'; ctx.fill();
  if (label) { ctx.font = '700 40px Poppins'; const w = ctx.measureText(label).width + 44; rrect(ctx, -w / 2, -170, w, 62, 31); fillStroke(ctx, col, 6); text(ctx, label, 0, -139, 36, '#fff'); }
  ctx.restore();
}
function tagPill(ctx, x, y, label, col, a = 1, size = 38) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y); const sc = .7 + .3 * backOut(clamp(a)); ctx.scale(sc, sc);
  ctx.font = `700 ${size}px Poppins`; const w = ctx.measureText(label).width + 52;
  rrect(ctx, -w / 2, -size * .85, w, size * 1.7, size * .85); fillStroke(ctx, col, 6); text(ctx, label, 0, 0, size, '#fff'); ctx.restore();
}

// ---------- ancient village ----------
function stepPyramid(ctx, x, base, w, steps = 5, h = 70, col = '#d9b98a') {
  for (let i = 0; i < steps; i++) {
    const ww = w * (1 - i * .17); rrect(ctx, x - ww / 2, base - (i + 1) * h, ww, h + 4, 4); fillStroke(ctx, mix(col, '#a98255', i * .08), 5);
    ctx.save(); rrect(ctx, x - ww / 2, base - (i + 1) * h, ww, h + 4, 4); ctx.clip(); ctx.fillStyle = 'rgba(60,30,10,.16)'; ctx.fillRect(x + ww * .15, base - (i + 1) * h, ww, h + 6); ctx.restore();
  }
  const ty = base - steps * h; const tw = w * (1 - steps * .17) * .8;
  rrect(ctx, x - tw / 2, ty - 90, tw, 94, 6); fillStroke(ctx, '#c9a06a', 5);
  rrect(ctx, x - tw * .22, ty - 66, tw * .44, 66, [20, 20, 0, 0]); fillStroke(ctx, '#3a2418', 4);
  rrect(ctx, x - tw / 2 - 8, ty - 108, tw + 16, 22, 6); fillStroke(ctx, '#b5651d', 5);
  // stairs
  ctx.beginPath(); ctx.moveTo(x - w * .07, base); ctx.lineTo(x + w * .07, base); ctx.lineTo(x + w * .035, ty); ctx.lineTo(x - w * .035, ty); ctx.closePath(); fillStroke(ctx, '#e8d2a8', 4);
}
function drawPalm(ctx, x, base, s, t) {
  ctx.save(); ctx.translate(x, base); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-14, 0); ctx.quadraticCurveTo(-20, -150, 18, -300); ctx.lineTo(34, -296); ctx.quadraticCurveTo(0, -150, 14, 0); ctx.closePath(); fillStroke(ctx, '#9a6a3a', 5);
  for (let i = 0; i < 6; i++) { ctx.save(); ctx.translate(26, -298); ctx.rotate(-1.2 + i * .5 + Math.sin(t * 1.5 + i) * .04); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(70, -40, 150, 6); ctx.quadraticCurveTo(70, -14, 0, 8); ctx.closePath(); fillStroke(ctx, i % 2 ? LEAF : LEAF_DK, 4); ctx.restore(); }
  ctx.restore();
}
function drawField(ctx, y0, y1, x0 = -400, x1 = 1500) {
  const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#c79a5a'); g.addColorStop(1, '#a8743c');
  ctx.fillStyle = g; ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
  ctx.strokeStyle = 'rgba(70,35,10,.28)'; ctx.lineWidth = 7;
  for (let i = 0; i < 6; i++) { const y = lerp(y0 + 60, y1, i / 5) ** 1; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); }
}
function sack(ctx, x, y, s, col = '#d8b883') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.bezierCurveTo(-90, -70, -50, -110, -30, -140); ctx.lineTo(30, -140); ctx.bezierCurveTo(50, -110, 90, -70, 60, 0); ctx.closePath(); fillStroke(ctx, col, 6);
  line(ctx, -34, -128, 34, -128, 8, '#6a4a2c'); ctx.fillStyle = 'rgba(80,40,10,.16)'; ctx.save(); ctx.clip(); ctx.fillRect(10, -150, 100, 160); ctx.restore();
  ctx.restore();
}
function questionMark(ctx, x, y, s, a = 1, t = 0, col = '#ffd23a') {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y + Math.sin(t * 5) * 8); ctx.rotate(Math.sin(t * 4) * .06); ctx.scale(s, s);
  text(ctx, '?', 0, 0, 200, col, INK, 22); ctx.restore();
}
function crown(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.lineTo(-76, -80); ctx.lineTo(-38, -40); ctx.lineTo(0, -96); ctx.lineTo(38, -40); ctx.lineTo(76, -80); ctx.lineTo(70, 0); ctx.closePath(); fillStroke(ctx, '#f2b52a', 6);
  for (const [cx, cy, c] of [[-38, -18, '#e0392f'], [0, -18, '#2f63c9'], [38, -18, '#3fa35b']]) { circle(ctx, cx, cy, 9); fillStroke(ctx, c, 3); }
  ctx.restore();
}
