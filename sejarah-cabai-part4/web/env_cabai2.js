// ---------- extra props for Part 2 ----------
function flame(ctx, x, y, s, t, a = 1, rot = 0) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha = clamp(a);
  for (let k = 0; k < 3; k++) {
    const sw = Math.sin(t * 18 + k * 2) * 8, h = 150 - k * 36, w = 62 - k * 14;
    ctx.beginPath(); ctx.moveTo(-w, 0); ctx.bezierCurveTo(-w, -h * .5, -w * .3 + sw, -h * .6, sw, -h); ctx.bezierCurveTo(w * .3 + sw, -h * .6, w, -h * .5, w, 0); ctx.closePath();
    fillStroke(ctx, ['#e0392f', '#ff9a2e', '#ffe14d'][k], k === 0 ? 5 : 0);
  }
  ctx.restore();
}
function drawCorn(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 26, 64, 0, 0, TAU); fillStroke(ctx, '#f4c93a', 5);
  ctx.save(); ctx.clip(); ctx.fillStyle = '#d9a626'; for (let i = -3; i <= 3; i++) for (let j = -5; j <= 5; j++) { circle(ctx, i * 9, j * 11, 3.5); ctx.fill(); } ctx.restore();
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(0, 62); ctx.quadraticCurveTo(sd * 52, 20, sd * 30, -34); ctx.quadraticCurveTo(sd * 12, 10, 0, 62); ctx.closePath(); fillStroke(ctx, sd < 0 ? LEAF_DK : LEAF, 5); }
  ctx.restore();
}
function drawPotato(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 52, 36, 0, 0, TAU); fillStroke(ctx, '#c79556', 5);
  ctx.fillStyle = '#8a5f2c'; for (const [px, py] of [[-20, -8], [14, 6], [26, -12], [-6, 14]]) { circle(ctx, px, py, 4); ctx.fill(); }
  ellipse(ctx, -16, -16, 16, 6, -.4); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fill();
  ctx.restore();
}
function drawCow(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const lx of [-50, -22, 30, 58]) { rrect(ctx, lx - 8, 20, 16, 52, 6); fillStroke(ctx, '#f6f1e8', 5); rrect(ctx, lx - 8, 62, 16, 12, 4); fillStroke(ctx, '#3a2a2a', 4); }
  line(ctx, -84, -10, -104, 40, 6, INK);
  rrect(ctx, -84, -44, 170, 82, 36); fillStroke(ctx, '#f6f1e8', 6);
  ctx.save(); rrect(ctx, -84, -44, 170, 82, 36); ctx.clip(); ctx.fillStyle = '#2d2530'; ellipse(ctx, -30, -20, 30, 20, .3); ctx.fill(); ellipse(ctx, 40, 12, 26, 22, -.2); ctx.fill(); ctx.restore();
  rrect(ctx, 66, -64, 62, 62, 24); fillStroke(ctx, '#f6f1e8', 6); rrect(ctx, 90, -28, 40, 28, 12); fillStroke(ctx, '#f2b8b8', 5);
  circle(ctx, 92, -44, 5); ctx.fillStyle = INK; ctx.fill();
  ctx.beginPath(); ctx.moveTo(74, -62); ctx.lineTo(70, -84); ctx.lineTo(86, -70); fillStroke(ctx, '#f6f1e8', 4);
  ctx.restore();
}
function drawWheat(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  line(ctx, 0, 70, 0, -40, 7, '#c9a34a');
  for (let i = 0; i < 5; i++) for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * 9, -38 + i * 17); ctx.rotate(sd * .5); ctx.beginPath(); ctx.ellipse(0, 0, 8, 17, 0, 0, TAU); fillStroke(ctx, '#f2c94c', 3.5); ctx.restore(); }
  ctx.restore();
}
function cookPot(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const sd of [-1, 1]) { ctx.save(); ctx.rotate(sd * .5); rrect(ctx, -90, 10, 180, 26, 12); fillStroke(ctx, '#7a4a2a', 5); ctx.restore(); }
  flame(ctx, -40, 14, .9, t); flame(ctx, 10, 18, 1.1, t + 1); flame(ctx, 56, 14, .8, t + 2);
  steam(ctx, 0, -120, 1.1, t);
  ctx.beginPath(); ctx.moveTo(-105, -70); ctx.bezierCurveTo(-125, 40, -60, 70, 0, 70); ctx.bezierCurveTo(60, 70, 125, 40, 105, -70); ctx.closePath(); fillStroke(ctx, '#3b3440', 6);
  ellipse(ctx, 0, -70, 105, 26); fillStroke(ctx, '#2a2430', 6); ellipse(ctx, 0, -68, 90, 18); fillStroke(ctx, '#d6451f', 4);
  for (const [px, py] of [[-40, -70], [10, -66], [44, -72]]) drawChiliPod(ctx, px, py, .32, px * .02, CHILI_RED);
  ctx.save(); ctx.beginPath(); ctx.moveTo(-105, -70); ctx.bezierCurveTo(-125, 40, -60, 70, 0, 70); ctx.lineTo(0, -70); ctx.closePath(); ctx.clip(); ctx.restore();
  ctx.restore();
}
function beachBG(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#3ea6ee', o.bot || '#fdeccb', -300, 1000);
  applyCam(ctx, cam, .1); drawSun(ctx, 230, 300, 80, t, 1.1);
  applyCam(ctx, cam, .15); drawCloud(ctx, 650 + t * 4, 320, 110, 9); drawCloud(ctx, 100, 540, 80, 10);
  applyCam(ctx, cam, .5); drawSea(ctx, 940, t);
  if (o.ship) drawShip(ctx, o.ship[0], 1010, o.ship[1], t, { flag: '#e0392f', hull: '#7a4a2a', ph: 1 });
  applyCam(ctx, cam, 1);
  // sand
  const g = ctx.createLinearGradient(0, 1180, 0, 2400); g.addColorStop(0, '#f5e0a8'); g.addColorStop(1, '#d9b46c');
  ctx.beginPath(); ctx.moveTo(-1200, 1230); ctx.quadraticCurveTo(540, 1160, 2300, 1260); ctx.lineTo(2300, 2600); ctx.lineTo(-1200, 2600); ctx.closePath(); fillStroke(ctx, g, 0);
  ctx.beginPath(); ctx.moveTo(-1200, 1230); ctx.quadraticCurveTo(540, 1160, 2300, 1260); ctx.lineWidth = 16; ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.stroke();
  drawPalm(ctx, 90, 1290, 1.0, t); drawPalm(ctx, 1000, 1300, 1.1, t + 1);
}
// route along map points (map coordinates). returns the end point
function routeLen(pts) { let L = 0, seg = []; for (let i = 1; i < pts.length; i++) { const a = mapPt(...pts[i - 1]), b = mapPt(...pts[i]); const d = Math.hypot(b[0] - a[0], b[1] - a[1]); seg.push(d); L += d; } return [L, seg]; }
function routePoint(pts, p) {
  const [L, seg] = routeLen(pts); let d = clamp(p) * L;
  for (let i = 0; i < seg.length; i++) { if (d <= seg[i] || i === seg.length - 1) { const a = mapPt(...pts[i]), b = mapPt(...pts[i + 1]); const k = clamp(d / seg[i]); return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), Math.atan2(b[1] - a[1], b[0] - a[0])]; } d -= seg[i]; }
}
function mapRoute(ctx, pts, p, col = '#fff', lw = 9, dash = [26, 18], head = true) {
  if (p <= 0) return; const [L, seg] = routeLen(pts); let d = clamp(p) * L;
  ctx.save(); ctx.beginPath(); const s0 = mapPt(...pts[0]); ctx.moveTo(s0[0], s0[1]);
  for (let i = 0; i < seg.length; i++) { const b = mapPt(...pts[i + 1]), a = mapPt(...pts[i]); if (d >= seg[i]) { ctx.lineTo(b[0], b[1]); d -= seg[i]; } else { const k = d / seg[i]; ctx.lineTo(lerp(a[0], b[0], k), lerp(a[1], b[1], k)); d = 0; break; } }
  ctx.lineWidth = lw + 6; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.setLineDash(dash); ctx.stroke();
  ctx.lineWidth = lw; ctx.strokeStyle = col; ctx.stroke(); ctx.restore();
  if (head && p > .04) { const [x, y, a] = routePoint(pts, p); ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(34, 0); ctx.lineTo(-14, -28); ctx.lineTo(-14, 28); ctx.closePath(); fillStroke(ctx, col, 6); ctx.restore(); }
}
function telescopeProp(c, k, h, a, side) { if (k === 'R') { c.save(); c.translate(h[0], h[1]); c.rotate(-side * a); rrect(c, -.022, -.02, .044, .26, .01); fillStroke(c, '#8a5530', .012); rrect(c, -.03, .16, .06, .1, .01); fillStroke(c, '#e2b84a', .012); c.restore(); } }
function bigPodProp(sc) { return (c, k, h, a, side) => { if (k === 'R') { c.save(); c.translate(h[0] + .02, h[1] - .01); drawChiliPod(c, 0, 0, sc, -.55, CHILI_RED); c.restore(); } }; }
function exclaim(ctx, x, y, s, a = 1, t = 0) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y + Math.sin(t * 7) * 6); ctx.scale(s, s); text(ctx, '!', 0, 0, 200, '#ffe14d', INK, 22); ctx.restore(); }
