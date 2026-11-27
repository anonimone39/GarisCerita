// ---------- props for Cabai Part 5: spices before the chili ----------
function longPepper(ctx, x, y, s, rot = 0, t = 0) {
  // Piper retrofractum: elongated, clustered fruit spikes on a vine
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, -110); ctx.quadraticCurveTo(-30, -190, 40, -170); ctx.lineWidth = 12; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = '#58a14a'; ctx.stroke();
  for (const [lx, ly, lr, k] of [[-70, -120, -.6, 1], [30, -178, .5, 1.05], [-10, -150, .1, .9]]) { ctx.save(); ctx.translate(lx, ly); ctx.rotate(lr); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(30 * k, -40 * k, 80 * k, -20 * k, 90 * k, 20 * k); ctx.bezierCurveTo(50 * k, 40 * k, 20 * k, 20 * k, 0, 0); ctx.closePath(); fillStroke(ctx, '#3fa35b', 5); line(ctx, 4, 0, 70 * k, 10 * k, 3, '#2b7d44'); ctx.restore(); }
  const R = rng(9);
  [[-50, -100, .12, 215], [-5, -105, -.06, 245], [40, -100, .04, 200]].forEach(([fx, fy, fr, len], i) => {
    ctx.save(); ctx.translate(fx, fy); ctx.rotate(fr + Math.sin(t * 1.3 + i) * .015);
    const w = 34; ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(-w / 2, len - w / 2); ctx.arc(0, len - w / 2, w / 2, Math.PI, 0, true); ctx.lineTo(w / 2, 0); ctx.closePath();
    const g = ctx.createLinearGradient(0, 0, 0, len); g.addColorStop(0, '#c9a14a'); g.addColorStop(.5, '#d9692a'); g.addColorStop(1, '#a8321a'); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke();
    ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(70,20,0,.28)'; for (let r = 0; r < len / 14; r++) for (let c = -1; c <= 1; c++) { circle(ctx, c * 10 + (r % 2) * 5, 10 + r * 14, 4.5); ctx.fill(); } ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.fillRect(-w / 2 + 4, 0, 6, len); ctx.restore();
    line(ctx, 0, 0, 0, -20, 7, '#58a14a'); ctx.restore();
  });
  ctx.restore();
}
function gingerRoot(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const lumps = [[-90, 10, 44, 30, -.2], [-30, -4, 52, 34, .1], [30, 6, 50, 32, -.1], [84, -10, 40, 28, .3], [-10, -44, 30, 26, -.5], [50, -42, 26, 22, .6]];
  for (const [lx, ly, rx, ry, rr] of lumps) { ellipse(ctx, lx, ly, rx, ry, rr); fillStroke(ctx, '#d9b27a', 6); }
  ctx.strokeStyle = 'rgba(120,80,30,.4)'; ctx.lineWidth = 4; for (const lx of [-70, -20, 30, 70]) { ctx.beginPath(); ctx.arc(lx, 8, 24, .5, 2.4); ctx.stroke(); }
  for (const [sx, sy] of [[-14, -62], [58, -56]]) { circle(ctx, sx, sy, 9); fillStroke(ctx, '#e8a0a0', 4); }
  ctx.restore();
}
function pepperVine(ctx, x, y, s, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  line(ctx, 0, 0, 0, -150, 10, '#6a4a2c');
  for (const [lx, ly, lr] of [[-4, -120, -.9], [4, -90, .9], [-4, -60, -.8], [4, -150, .5]]) { ctx.save(); ctx.translate(lx, ly); ctx.rotate(lr + Math.sin(t * 1.5 + ly) * .03); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(30, -30, 80, -14, 84, 18); ctx.bezierCurveTo(46, 34, 16, 18, 0, 0); ctx.closePath(); fillStroke(ctx, '#2f8f4b', 5); ctx.restore(); }
  for (const [cx, cy] of [[-30, -96], [34, -70], [-26, -40]]) { line(ctx, cx, cy - 6, cx, cy, 4, '#58a14a'); for (let i = 0; i < 7; i++) { circle(ctx, cx + (i % 2 ? 7 : -7), cy + 10 + i * 12, 8.5); fillStroke(ctx, i < 4 ? '#c0392b' : '#3fa35b', 3); } }
  ctx.restore();
}
function sambalBowl(ctx, x, y, s, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  steam(ctx, 0, -50, 1, t, .7);
  ctx.beginPath(); ctx.moveTo(-170, 0); ctx.bezierCurveTo(-160, 110, -80, 150, 0, 150); ctx.bezierCurveTo(80, 150, 160, 110, 170, 0); ctx.closePath(); fillStroke(ctx, '#a8693a', 7);
  ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(40,10,0,.22)'; ctx.fillRect(40, -10, 200, 200); ctx.restore();
  ellipse(ctx, 0, 0, 170, 44); fillStroke(ctx, '#c4844a', 7); ellipse(ctx, 0, 4, 148, 34); fillStroke(ctx, '#9e2a14', 4);
  ctx.save(); ellipse(ctx, 0, 4, 148, 34); ctx.clip(); for (const [px, py] of [[-80, -6], [-30, 8], [30, -4], [80, 6], [0, 12], [-110, 10], [110, 0]]) { circle(ctx, px, py, 7); ctx.fillStyle = '#d9692a'; ctx.fill(); } ctx.fillStyle = 'rgba(255,255,255,.35)'; ellipse(ctx, -50, -12, 34, 6, -.1); ctx.fill(); ctx.restore();
  ctx.restore();
}
function villageBG(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#ffb96a', o.bot || '#fff0c6', -300, 1000);
  applyCam(ctx, cam, .1); drawSun(ctx, 860, 330, 90, t, 1.1);
  applyCam(ctx, cam, .15); drawCloud(ctx, 190 + t * 5, 420, 110, 5); drawCloud(ctx, 960, 250, 80, 6);
  applyCam(ctx, cam, .3); drawPillars(ctx, 960, 'B', .15);
  applyCam(ctx, cam, .55); drawPalm(ctx, 90, 1090, .9, t); drawPalm(ctx, 1010, 1100, 1.0, t + 1);
  if (o.hut !== false) { const hx = o.hutX || 700; ctx.save(); ctx.translate(hx, 1100); rrect(ctx, -170, -190, 340, 190, 8); fillStroke(ctx, '#c9a064', 7); ctx.beginPath(); ctx.moveTo(-230, -180); ctx.lineTo(0, -380); ctx.lineTo(230, -180); ctx.closePath(); fillStroke(ctx, '#b07a3c', 7); ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(60,30,0,.3)'; ctx.lineWidth = 4; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-240, -180 + i * -22 + 60); ctx.lineTo(240, -180 + i * -22 + 60); ctx.stroke(); } ctx.restore(); rrect(ctx, -34, -120, 68, 120, [30, 30, 0, 0]); fillStroke(ctx, '#3a2418', 5); ctx.restore(); }
  applyCam(ctx, cam, 1); drawField(ctx, 1110, 2400);
}
