// ---------- props for Demak Part 3: Malacca and the sea ----------
function fortGate(ctx, x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const wall = (x0, w, h) => { rrect(ctx, x0, -h, w, h, 6); fillStroke(ctx, '#d9cdb4', 6); ctx.save(); rrect(ctx, x0, -h, w, h, 6); ctx.clip(); ctx.strokeStyle = 'rgba(80,60,30,.25)'; ctx.lineWidth = 3; for (let i = 1; i < h / 40; i++) { ctx.beginPath(); ctx.moveTo(x0, -i * 40); ctx.lineTo(x0 + w, -i * 40); ctx.stroke(); } ctx.fillStyle = 'rgba(60,40,20,.15)'; ctx.fillRect(x0 + w * .6, -h, w, h); ctx.restore(); for (let i = 0; i < w / 50; i++) { rrect(ctx, x0 + i * 50 + 4, -h - 22, 34, 26, 4); fillStroke(ctx, '#d9cdb4', 5); } };
  wall(-330, 180, 220); wall(150, 180, 220);
  wall(-150, 300, 340);
  rrect(ctx, -70, -190, 140, 190, [70, 70, 0, 0]); fillStroke(ctx, '#3a2418', 6);
  line(ctx, 0, -340, 0, -520, 8, '#7a5230');
  if (o.flag !== false) { const w = 150, h = 90, top = -520, wave = i => Math.sin(t * 5 + i * .8) * 8 * (i / 8); ctx.beginPath(); for (let i = 0; i <= 8; i++) { const X = 4 + i * w / 8; i ? ctx.lineTo(X, top + wave(i)) : ctx.moveTo(X, top); } for (let i = 8; i >= 0; i--) ctx.lineTo(4 + i * w / 8, top + h + wave(i)); ctx.closePath(); fillStroke(ctx, o.flagCol || '#2a4f9e', 6); circle(ctx, 4 + w * .5, top + h / 2 + wave(4), 20); fillStroke(ctx, GOLD, 4); }
  ctx.restore();
}
function cannonBall(ctx, x, y, s = 1) { circle(ctx, x, y, 18 * s); fillStroke(ctx, '#3a3f4a', 5); ellipse(ctx, x - 6 * s, y - 7 * s, 6 * s, 3 * s, -.5); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fill(); }
function warship(ctx, x, y, s, t, flip = 1, firing = 0) {
  drawShip(ctx, x, y, s, t, { flag: '#1b1820', hull: '#3b2a2c', stripe: '#c9a14a', sail: '#e9dfc9', ph: 0, flip });
  if (firing > 0) for (let i = 0; i < 4; i++) { const px = x + flip * (-120 + i * 80) * s, py = y - 70 * s; const a = clamp(firing - i * .08) ; if (a > 0) { burst(ctx, px + flip * -50 * s, py, 55 * s * a + 15, 9, '#ffd23a', 3 + i, .5); puff(ctx, px + flip * -90 * s, py - 10, 55 * s, t + i, '#d8d8e0', 5 + i, a); } }
}
function stamp(ctx, str, x, y, a, rot = -.15, col = '#e0392f', size = 150) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const k = clamp(a); const sc = 1.6 - .6 * easeOut(k); ctx.scale(sc, sc); ctx.globalAlpha = clamp(k * 2.5);
  ctx.font = `700 ${size}px Poppins`; const w = ctx.measureText(str).width + 70; rrect(ctx, -w / 2, -size * .7, w, size * 1.4, 26); ctx.lineWidth = 16; ctx.strokeStyle = col; ctx.stroke(); text(ctx, str, 0, 4, size, col, 'transparent', 0, 'Poppins', 700); ctx.restore();
}
function sinkingShip(ctx, x, y, s, t, k, flip = 1) {
  ctx.save(); ctx.translate(x, y + k * 160 * s); ctx.rotate(flip * k * .45); ctx.beginPath(); ctx.rect(-600, -900, 1200, 900 + 90 * s - k * 90 * s + 40); ctx.clip();
  drawShip(ctx, 0, 0, s, t, { flag: '#2f8f5b', hull: '#7a4a2a', ph: 1, flip }); ctx.restore();
}
function ropeRoute(ctx, pts, p) {
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let d = clamp(p) * tot; ctx.save(); ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); let end = pts[0], ang = 0;
  for (let i = 0; i < L.length; i++) { const a = pts[i], b = pts[i + 1]; if (d >= L[i]) { ctx.lineTo(b[0], b[1]); d -= L[i]; end = b; ang = Math.atan2(b[1] - a[1], b[0] - a[0]); } else { const k = d / L[i]; end = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)]; ctx.lineTo(end[0], end[1]); ang = Math.atan2(b[1] - a[1], b[0] - a[0]); break; } }
  ctx.setLineDash([26, 18]); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 16; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = 9; ctx.strokeStyle = '#fff'; ctx.stroke(); ctx.restore();
  return [end[0], end[1], ang];
}
function signboard(ctx, str, x, y, s, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); const k = backOut(clamp(a)); ctx.scale(s * k, s * k);
  rrect(ctx, -14, -60, 28, 380, 8); fillStroke(ctx, '#7a5230', 6); ctx.font = '700 62px Poppins'; const w = ctx.measureText(str).width + 80; rrect(ctx, -w / 2, -170, w, 170, 24); fillStroke(ctx, '#2f8f5b', 8); text(ctx, str, 0, -84, 62, '#fff'); ctx.restore();
}
function ropePoint(pts, p) {
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let d = clamp(p) * tot;
  for (let i = 0; i < L.length; i++) { const a = pts[i], b = pts[i + 1]; if (d <= L[i] || i === L.length - 1) { const k = clamp(d / L[i]); return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), Math.atan2(b[1] - a[1], b[0] - a[0])]; } d -= L[i]; }
}

const LEAF = '#3fa35b', CHILI_RED = '#d92b1c';
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
function sack(ctx, x, y, s, col = '#d8b883') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.bezierCurveTo(-90, -70, -50, -110, -30, -140); ctx.lineTo(30, -140); ctx.bezierCurveTo(50, -110, 90, -70, 60, 0); ctx.closePath(); fillStroke(ctx, col, 6);
  line(ctx, -34, -128, 34, -128, 8, '#6a4a2c'); ctx.fillStyle = 'rgba(80,40,10,.16)'; ctx.save(); ctx.clip(); ctx.fillRect(10, -150, 100, 160); ctx.restore();
  ctx.restore();
}
