// ---------- Paregreg (Part 3) props: hats, split crown, war maps, calendar, night boat, chest, bill, leaves ----------
HATS.crownSmall = function (ctx, hx, hy, hr, lw, o) { // Bhre Wirabhumi: small gold circlet over an orange band
  const b = hy - hr * .78, w = hr * .62;
  rrect(ctx, hx - hr * .95, b - .008, hr * 1.9, .058, .02); fillStroke(ctx, '#e8873a', lw);
  path(ctx, [[hx - w, b], [hx - w * .6, b - .09], [hx - w * .2, b - .04], [hx, b - .12], [hx + w * .2, b - .04], [hx + w * .6, b - .09], [hx + w, b]]); fillStroke(ctx, '#f2c230', lw);
  circle(ctx, hx, b - .05, .018); fillStroke(ctx, '#2f9e57', lw * .7);
};
HATS.ming = function (ctx, hx, hy, hr, lw, o) { // Ming official: blue cap with side wings and yellow trim
  const base = hy - hr * .6;
  for (const sx of [-1, 1]) { rrect(ctx, sx < 0 ? hx - hr * 1.8 : hx + hr * .6, base - hr * .46, hr * 1.2, hr * .2, .02); fillStroke(ctx, '#f2c230', lw); }
  ctx.beginPath(); ctx.moveTo(hx - hr * .88, base); ctx.quadraticCurveTo(hx - hr * .88, base - hr * 1.05, hx, base - hr * 1.05); ctx.quadraticCurveTo(hx + hr * .88, base - hr * 1.05, hx + hr * .88, base); ctx.closePath(); fillStroke(ctx, '#2a4fa8', lw);
  rrect(ctx, hx - hr * .95, base - hr * .2, hr * 1.9, hr * .22, .02); fillStroke(ctx, '#f2c230', lw);
  circle(ctx, hx, base - hr * .95, .016); fillStroke(ctx, '#f2c230', lw * .7);
};
function drawCrownSplit(ctx, x, y, s, split = 0, rot = 0, crack = 0) { // Majapahit crown that can crack and fall into two halves
  const zig = [[0, -.5], [.02, -.32], [-.025, -.24], [.025, -.17], [-.02, -.1], [0, .05]];
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const half = side => {
    ctx.save(); ctx.beginPath(); ctx.moveTo(side * .7, -.5); zig.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(side * .7, .05); ctx.closePath(); ctx.clip();
    ctx.translate(side * split * .16, side * split * .03); ctx.translate(0, -.2); ctx.rotate(side * split * .5); ctx.translate(0, .2);
    HATS.crown(ctx, 0, 0, .19, .017, {}); ctx.restore();
  };
  half(-1); half(1);
  if (crack > 0 && split === 0) {
    const n = crack * (zig.length - 1); ctx.beginPath();
    for (let i = 0; i <= Math.floor(n); i++) { const p = zig[i]; i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
    const f = n % 1, a = zig[Math.floor(n)], b = zig[Math.min(zig.length - 1, Math.floor(n) + 1)]; if (f > 0) ctx.lineTo(lerp(a[0], b[0], f), lerp(a[1], b[1], f));
    ctx.lineWidth = .012; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  }
  ctx.restore();
}
// Java split into a west colour and an east colour; front 0..1 moves the border; dash draws the dotted border line from the top
function drawJavaTwo(ctx, x, y, w, o = {}) {
  const h = w * .7, front = o.front == null ? .5 : o.front, fx = x + w * front;
  rrect(ctx, x - 40, y - 40, w + 80, h + 80, 26); fillStroke(ctx, o.paper || '#f3e2b8', 8);
  ctx.save(); rrect(ctx, x - 40, y - 40, w + 80, h + 80, 26); ctx.clip(); ctx.fillStyle = 'rgba(80,160,200,.28)'; ctx.fillRect(x - 40, y - 40, w + 80, h + 80);
  ctx.strokeStyle = 'rgba(60,120,160,.25)'; ctx.lineWidth = 3; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(x - 40, y + i * h / 7); ctx.quadraticCurveTo(x + w / 2, y + i * h / 7 + 20, x + w + 40, y + i * h / 7); ctx.stroke(); } ctx.restore();
  for (const pts of [JAVA, MADURA]) {
    islandPath(ctx, pts, x, y, w, h); ctx.fillStyle = '#9ccf72'; ctx.fill();
    ctx.save(); islandPath(ctx, pts, x, y, w, h); ctx.clip();
    ctx.fillStyle = o.west || '#d8312b'; ctx.fillRect(x - 60, y - 60, fx - x + 60, h + 120);
    ctx.fillStyle = o.east || '#e8873a'; ctx.fillRect(fx, y - 60, x + w + 80 - fx, h + 120);
    ctx.fillStyle = 'rgba(40,60,20,.16)'; ctx.fillRect(x, y + h * .45, w, h); ctx.restore();
    islandPath(ctx, pts, x, y, w, h); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.stroke();
  }
  const dp = o.dash || 0;
  if (dp > 0) { ctx.save(); ctx.setLineDash([24, 16]); ctx.beginPath(); ctx.moveTo(fx, y - 30); ctx.lineTo(fx, y - 30 + (h + 60) * dp); ctx.lineWidth = 9; ctx.strokeStyle = '#fff'; ctx.stroke(); ctx.restore(); }
}
function drawArrow(ctx, x0, y0, x1, y1, col, lw = 34, prog = 1) {
  if (prog < .12) return;
  const ex = lerp(x0, x1, prog), ey = lerp(y0, y1, prog), a = Math.atan2(y1 - y0, x1 - x0);
  const hx = ex - Math.cos(a) * lw * 1.2, hy = ey - Math.sin(a) * lw * 1.2, px = -Math.sin(a), py = Math.cos(a);
  line(ctx, x0, y0, hx, hy, lw + 12, INK); line(ctx, x0, y0, hx, hy, lw, col);
  path(ctx, [[ex, ey], [hx + px * lw * 1.3, hy + py * lw * 1.3], [hx - px * lw * 1.3, hy - py * lw * 1.3]]); fillStroke(ctx, col, 8);
}
function drawCalendar(ctx, x, y, s, year, flipT = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 6; i++) { const k = clamp((flipT - i * .22) / .6); if (k <= 0 || k >= 1) continue; ctx.save(); ctx.globalAlpha = 1 - k; ctx.translate(k * 420 * (i % 2 ? 1 : -1), -k * 260); ctx.rotate(k * 2.4 * (i % 2 ? 1 : -1)); rrect(ctx, -170, -190, 340, 380, 14); fillStroke(ctx, '#fff', 6); ctx.restore(); }
  rrect(ctx, -170, -190, 340, 380, 14); fillStroke(ctx, '#fffdf4', 7);
  rrect(ctx, -170, -190, 340, 100, 14); fillStroke(ctx, '#d8312b', 7);
  for (const sx of [-90, 90]) { rrect(ctx, sx - 10, -215, 20, 50, 8); fillStroke(ctx, '#6a6a72', 5); }
  text(ctx, year, 0, 30, 110, INK, null, 0, 'Poppins', 700);
  ctx.restore();
}
function bolt(ctx, x, y, s, col = '#ffd23a', rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); path(ctx, [[-10, -60], [26, -60], [4, -14], [30, -14], [-22, 60], [-6, 8], [-30, 8]]); fillStroke(ctx, col, 6); ctx.restore(); }
function drawBoat(ctx, x, y, s, t, ph = 0) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 2.2 + ph) * 6 * s); ctx.rotate(Math.sin(t * 1.7 + ph) * .04); ctx.scale(s, s);
  const hull = () => { ctx.beginPath(); ctx.moveTo(-230, -30); ctx.quadraticCurveTo(-190, 50, -80, 62); ctx.lineTo(120, 62); ctx.quadraticCurveTo(220, 50, 260, -50); ctx.lineTo(230, -30); ctx.closePath(); };
  hull(); fillStroke(ctx, '#8a5a32', 7); ctx.save(); hull(); ctx.clip(); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(-250, 10, 520, 60); line(ctx, -250, 0, 270, 0, 4, 'rgba(60,30,10,.5)'); ctx.restore();
  ctx.fillStyle = 'rgba(255,255,255,.5)'; ellipse(ctx, 0, 66, 260, 10); ctx.fill();
  ctx.restore();
}
function drawStars(ctx, t, seed = 5, maxY = 900, n = 60) { const R = rng(seed); ctx.save(); for (let i = 0; i < n; i++) { const x = R() * 1400 - 160, y = R() * maxY, r = 2 + R() * 3.5; ctx.globalAlpha = .5 + .5 * Math.sin(t * 3 + i); circle(ctx, x, y, r); ctx.fillStyle = '#fff'; ctx.fill(); } ctx.restore(); }
function drawMoon(ctx, x, y, r, a = 1) {
  ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, r * .5, x, y, r * 3.4); g.addColorStop(0, 'rgba(255,250,210,.5)'); g.addColorStop(1, 'rgba(255,250,210,0)'); ctx.fillStyle = g; ctx.fillRect(x - r * 4, y - r * 4, r * 8, r * 8); ctx.restore();
  ctx.save(); ctx.globalAlpha = a; circle(ctx, x, y, r); ctx.fillStyle = '#fffbe0'; ctx.fill(); circle(ctx, x - r * .3, y - r * .2, r * .22); ctx.fillStyle = 'rgba(180,170,130,.35)'; ctx.fill(); circle(ctx, x + r * .35, y + r * .3, r * .16); ctx.fill(); ctx.restore();
}
function nightSeaBG(ctx, t, cam, o = {}) {
  const h = o.h || 900, mx = o.moonX || 800, my = o.moonY || 340;
  applyCam(ctx, cam, .08); drawSky(ctx, '#050a20', '#1a2a5a', -300, h); drawStars(ctx, t, 5, h - 140);
  applyCam(ctx, cam, .1); drawMoon(ctx, mx, my, 90, o.moonA == null ? 1 : o.moonA);
  applyCam(ctx, cam, .5); drawSea(ctx, h, t, 2600, ['#2a4a8a', '#16306a', '#0a1a40']);
  ctx.save(); ctx.globalAlpha = .5; for (let i = 0; i < 12; i++) line(ctx, mx + Math.sin(t * 2 + i) * (20 + i * 8) - 40 - i * 4, h + 30 + i * 38, mx + Math.sin(t * 2 + i) * (20 + i * 8) + 40 + i * 4, h + 30 + i * 38, 5, '#fffbe0'); ctx.restore();
  applyCam(ctx, cam, 1);
}
function drawChestEmpty(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-135, -150); ctx.lineTo(-125, -330); ctx.quadraticCurveTo(0, -370, 125, -330); ctx.lineTo(135, -150); ctx.closePath(); fillStroke(ctx, '#8a4f24', 6);
  rrect(ctx, -140, -150, 280, 150, 10); fillStroke(ctx, '#9a5a2a', 6);
  ctx.save(); rrect(ctx, -140, -150, 280, 150, 10); ctx.clip(); ctx.fillStyle = 'rgba(40,10,0,.25)'; ctx.fillRect(40, -160, 200, 200); ctx.restore();
  for (const bx of [-110, 90]) { rrect(ctx, bx, -150, 22, 150, 4); fillStroke(ctx, '#d9a84a', 4); }
  ellipse(ctx, 0, -150, 128, 34); fillStroke(ctx, '#140a0a', 5);
  rrect(ctx, -22, -110, 44, 46, 6); fillStroke(ctx, '#e8c04a', 4);
  for (let i = 0; i < 3; i++) line(ctx, -130, -312 + i * 8, -130 + 60 - i * 12, -312 + 60 - i * 10, 3, 'rgba(255,255,255,.7)');
  ctx.restore();
}
function drawFly(ctx, x, y, t) { ctx.save(); ctx.translate(x, y); circle(ctx, 0, 0, 7); ctx.fillStyle = INK; ctx.fill(); const f = Math.sin(t * 60); ellipse(ctx, -7, -7, 9, 4 + f * 3, -.5); ctx.fillStyle = 'rgba(200,230,255,.85)'; ctx.fill(); ellipse(ctx, 7, -7, 9, 4 - f * 3, .5); ctx.fill(); ctx.restore(); }
function drawBill(ctx, x, y, w, h, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  rrect(ctx, -w / 2, -h / 2, w, h, 10); fillStroke(ctx, '#fffdf0', 7);
  for (let i = 0; i < 3; i++) line(ctx, -w * .38, h * .14 + i * h * .09, w * .38, h * .14 + i * h * .09, 6, '#b8a070');
  text(ctx, 'DENDA', 0, -h * .3, h * .2, '#b3242f', null, 0, 'Poppins', 700);
  text(ctx, 'EMAS!', 0, -h * .08, h * .2, '#b3242f', null, 0, 'Poppins', 700);
  circle(ctx, w * .3, h * .36, h * .08); fillStroke(ctx, '#d8312b', 5); drawCoin(ctx, -w * .3, h * .35, h * .07, 0);
  ctx.restore();
}
function drawNusantaraGray(ctx, x, y, w, gray = {}) {
  const h = w * .7;
  for (const k of ['sumatra', 'borneo', 'sulawesi', 'maluku', 'papua', 'nusa', 'java']) {
    const g = clamp(gray[k] || 0); islandPath(ctx, NUSA[k], x, y, w, h);
    if (g < 1) { ctx.save(); ctx.shadowColor = `rgba(255,210,80,${.9 * (1 - g)})`; ctx.shadowBlur = 40 * (1 - g); ctx.fillStyle = mix('#ffd34d', '#7a808a', g); ctx.fill(); ctx.restore(); } else { ctx.fillStyle = '#7a808a'; ctx.fill(); }
    ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke();
  }
}
function leafAt(ctx, x, y, r, rot, col) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ellipse(ctx, 0, 0, r, r * .5); fillStroke(ctx, col, Math.max(2, r * .1)); line(ctx, -r, 0, r, 0, Math.max(2, r * .08), 'rgba(60,30,10,.6)'); ctx.restore(); }
const LEAFC = ['#b8742a', '#9a5a22', '#d9902f', '#8a4a1a'];
function leaves(ctx, t, a = 1, seed = 3, area = [0, 0, W, H], n = 26) {
  const R = rng(seed); ctx.save(); ctx.globalAlpha = clamp(a);
  for (let i = 0; i < n; i++) { const x0 = area[0] + R() * (area[2] - area[0]), sp = 60 + R() * 90, ph = R() * 2000, y = area[1] + ((t * sp + ph) % (area[3] - area[1])); leafAt(ctx, x0 + Math.sin(t * 1.8 + i) * 50, y, 20 + R() * 14, t * 2 + i, LEAFC[i % 4]); }
  ctx.restore();
}
function drawLeafPile(ctx, x, y, w, h, cover, seed = 4) {
  const R = rng(seed), n = 110;
  for (let i = 0; i < n; i++) { const px = x + (R() - .5) * w, py = y + (R() - .5) * h, r = 22 + R() * 18, rot = R() * TAU; if (i / n < cover) leafAt(ctx, px, py, r, rot, LEAFC[i % 4]); }
}
function drawVines(ctx, x, y, s, grow = 1, seed = 2) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const R = rng(seed); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (let i = 0; i < 9; i++) {
    const sx = (R() - .5) * 560, len = (140 + R() * 260) * grow; ctx.beginPath(); ctx.moveTo(sx, 0); let cx = sx;
    for (let k = 1; k <= 6; k++) { cx += Math.sin(k * 1.3 + i) * 26; ctx.lineTo(cx, -len * k / 6); }
    ctx.lineWidth = 11; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = '#3f8f45'; ctx.stroke();
    for (let k = 2; k <= 6; k += 2) { ellipse(ctx, cx + Math.sin(k) * 14, -len * k / 6, 14, 8, k); fillStroke(ctx, '#4fa855', 3); }
  }
  ctx.restore();
}
function portraitOf(ctx, x, y, w, h, ch) {
  ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2 - 22, -h / 2 - 22, w + 44, h + 44, 14); fillStroke(ctx, '#d9a83a', 8);
  rrect(ctx, -w / 2, -h / 2, w, h, 8); fillStroke(ctx, '#f4ead0', 5);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 8); ctx.clip(); drawStick(ctx, C(ch, { x: 0, y: h * .62, s: h * .95, shadow: false, face: { eyes: 'normal', mouth: 'smile' } })); ctx.restore();
  ctx.restore();
}
function bandage(ctx, x, y, s) { const hy = y - .765 * s; line(ctx, x - .12 * s, hy - .12 * s, x + .12 * s, hy - .14 * s, .05 * s, INK); line(ctx, x - .12 * s, hy - .12 * s, x + .12 * s, hy - .14 * s, .03 * s, '#fff'); }
