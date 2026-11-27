// ---------- props for Cabai Parts 6 and 7: sambal, dishes, paddy fields ----------
function sambalType(ctx, x, y, s, type = 'terasi', t = 0, steamOn = 0) {
  const P = { terasi: ['#8a2a14', '#5a1a0c'], bawang: ['#d92b1c', '#f2b8c0'], ijo: ['#4a9a3a', '#2f6f2a'], matah: ['#f0a030', '#fff0c0'], plain: ['#d92b1c', '#ff7a52'] }[type];
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (steamOn) steam(ctx, 0, -40, 1, t, steamOn);
  ctx.beginPath(); ctx.moveTo(-150, 0); ctx.bezierCurveTo(-140, 100, -70, 135, 0, 135); ctx.bezierCurveTo(70, 135, 140, 100, 150, 0); ctx.closePath(); fillStroke(ctx, '#a8693a', 7);
  ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(40,10,0,.22)'; ctx.fillRect(30, -10, 200, 200); ctx.restore();
  ellipse(ctx, 0, 0, 150, 40); fillStroke(ctx, '#c4844a', 7); ellipse(ctx, 0, 4, 130, 30); fillStroke(ctx, P[0], 4);
  ctx.save(); ellipse(ctx, 0, 4, 130, 30); ctx.clip();
  if (type === 'terasi') { rrect(ctx, 30, -16, 56, 28, 6); fillStroke(ctx, '#3a2a22', 4); for (const [px, py] of [[-70, 2], [-30, 12], [-5, -4], [-100, 8]]) { circle(ctx, px, py, 6); ctx.fillStyle = '#d9692a'; ctx.fill(); } }
  else if (type === 'bawang') { for (const [px, py] of [[-80, 0], [-40, 12], [0, -2], [40, 10], [80, 0]]) { ellipse(ctx, px, py, 16, 9, .2); fillStroke(ctx, P[1], 3); } }
  else if (type === 'ijo') { for (const [px, py] of [[-70, 4], [-20, -4], [30, 8], [75, 0]]) { ellipse(ctx, px, py, 26, 6, px * .01); fillStroke(ctx, '#7fcf4a', 3); } }
  else if (type === 'matah') { for (const [px, py] of [[-90, 4], [-50, -2], [-10, 8], [30, -2], [70, 6], [100, 0]]) { circle(ctx, px, py, 9); fillStroke(ctx, P[1], 3); } for (const [px, py] of [[-70, 12], [10, -8], [60, 12]]) { ellipse(ctx, px, py, 12, 4, .3); fillStroke(ctx, '#d92b1c', 3); } line(ctx, -30, -10, 50, 12, 5, '#cfd96a'); }
  ctx.fillStyle = 'rgba(255,255,255,.3)'; ellipse(ctx, -50, -12, 30, 5, -.1); ctx.fill(); ctx.restore();
  ctx.restore();
}
function dish(ctx, x, y, s, type = 'rendang', t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ellipse(ctx, 0, 12, 170, 44); fillStroke(ctx, '#f7f3ea', 6); ellipse(ctx, 0, 8, 140, 32); ctx.fillStyle = '#ece6d8'; ctx.fill();
  if (type === 'rendang') { for (const [px, py, r] of [[-70, -6, 34], [0, -16, 38], [70, -4, 32], [-20, 6, 26]]) { ellipse(ctx, px, py, r, r * .7, px * .01); fillStroke(ctx, '#5a2a14', 5); } ctx.fillStyle = 'rgba(255,255,255,.2)'; ellipse(ctx, -10, -26, 20, 6, -.2); ctx.fill(); }
  else if (type === 'sate') { for (let i = 0; i < 3; i++) { line(ctx, -120, -20 + i * 18, 110, -50 + i * 18, 6, '#c9a064'); for (let j = 0; j < 3; j++) { ellipse(ctx, -40 + j * 34, -32 + i * 18 - j * 7, 17, 11, -.2); fillStroke(ctx, '#8a4a24', 4); } } ellipse(ctx, 110, 12, 40, 14); fillStroke(ctx, '#c4552b', 4); }
  else if (type === 'gado') { for (const [px, py, c] of [[-70, -4, '#3fa35b'], [-20, -14, '#e8c04a'], [40, -8, '#d9a066'], [90, 0, '#3fa35b']]) { ellipse(ctx, px, py, 36, 22); fillStroke(ctx, c, 5); } ellipse(ctx, 0, -20, 60, 22); fillStroke(ctx, '#b5773f', 5); }
  else if (type === 'nasi') { ctx.beginPath(); ctx.ellipse(0, -16, 90, 52, 0, Math.PI, 0); fillStroke(ctx, '#d9a066', 5); ctx.fillStyle = 'rgba(120,50,10,.25)'; for (let i = 0; i < 12; i++) { circle(ctx, -60 + (i * 37) % 120, -20 - (i * 13) % 30, 4); ctx.fill(); } ellipse(ctx, 40, -50, 30, 14); fillStroke(ctx, '#fffdf5', 4); circle(ctx, 40, -50, 8); ctx.fillStyle = '#f2c230'; ctx.fill(); }
  else if (type === 'soto') { ctx.restore(); drawBowl(ctx, x, y - 10, s * .85, t, { sambal: 0 }); return; }
  ctx.restore();
}
function waterGlass(ctx, x, y, s, fill = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-34, -80); ctx.lineTo(34, -80); ctx.lineTo(26, 0); ctx.lineTo(-26, 0); ctx.closePath(); ctx.fillStyle = 'rgba(200,235,255,.35)'; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = '#8fd8ff'; ctx.fillRect(-40, -80 * fill, 80, 80 * fill); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(-26, -76, 8, 70); ctx.restore();
  ctx.beginPath(); ctx.moveTo(-34, -80); ctx.lineTo(34, -80); ctx.lineTo(26, 0); ctx.lineTo(-26, 0); ctx.closePath(); fillStroke(ctx, null, 6);
  ctx.restore();
}
function glassProp(c, k, h, a, side) { if (k === 'R') { c.save(); c.translate(h[0], h[1]); waterGlass(c, 0, .08, .0013 * 900 / 900 * 1, 1); c.restore(); } }
function sawah(ctx, t, y0 = 1120) {
  // paddy terraces and water
  for (let r = 0; r < 5; r++) { const yy = y0 + r * 120, h = 110; ctx.fillStyle = r % 2 ? '#7fc44a' : '#9bd65a'; ctx.beginPath(); ctx.moveTo(-200, yy); for (let x = -200; x <= 1300; x += 100) ctx.lineTo(x, yy + Math.sin(x * .01 + r) * 14); ctx.lineTo(1300, yy + h); ctx.lineTo(-200, yy + h); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(40,90,20,.4)'; ctx.lineWidth = 5; ctx.stroke();
    ctx.strokeStyle = 'rgba(40,110,30,.5)'; ctx.lineWidth = 4; for (let x = 0; x < 1100; x += 38) { const px = x + (r % 2) * 19, py = yy + 40 + Math.sin(x) * 6; ctx.beginPath(); ctx.moveTo(px, py + 18); ctx.lineTo(px - 6, py); ctx.moveTo(px, py + 18); ctx.lineTo(px + 6, py - 2); ctx.stroke(); } }
}
function sunRain(ctx, t, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(180,225,255,.8)'; ctx.lineWidth = 6; ctx.lineCap = 'round'; const R = rng(4); for (let i = 0; i < 40; i++) { const x = R() * 1200 - 60, ph = (t * 1.3 + R()) % 1, y = -80 + ph * 1900; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 18, y + 60); ctx.stroke(); } ctx.restore(); }

const JAVA_PTS = [[-1, .05], [-.85, -.1], [-.6, -.12], [-.35, -.2], [-.1, -.18], [.1, -.24], [.3, -.3], [.5, -.2], [.75, -.18], [.95, -.1], [1, .04], [.85, .12], [.5, .14], [.1, .18], [-.3, .14], [-.65, .15], [-.9, .14]];
function blobPath(ctx, pts, sx, sy) {
  const P = pts.map(([x, y]) => [x * sx, y * sy]); ctx.beginPath();
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; const m0 = mid(P[P.length - 1], P[0]); ctx.moveTo(m0[0], m0[1]);
  for (let i = 0; i < P.length; i++) { const m = mid(P[i], P[(i + 1) % P.length]); ctx.quadraticCurveTo(P[i][0], P[i][1], m[0], m[1]); } ctx.closePath();
}
function nusantaraMap(ctx, x, y, s, t, glow = 0) {
  ctx.save(); ctx.translate(x, y);
  const isl = [
    [-.5, -.12, .52, [[-.2, -.12], [-.05, -.1], [.15, .02], [.3, .2], [.32, .3], [.22, .3], [0, .14], [-.18, -.02], [-.26, -.1]]],
    [-.06, -.3, .5, [[-.2, -.1], [0, -.18], [.2, -.12], [.25, .05], [.18, .2], [-.02, .22], [-.2, .12], [-.25, 0]]],
    [.24, -.16, .44, [[-.02, -.2], [.05, -.18], [.04, -.02], [.15, .04], [.2, 0], [.12, .12], [.05, .1], [.05, .2], [-.02, .2], [-.02, .05], [-.1, .1], [-.12, .05], [-.02, -.05]]],
    [.55, -.08, .55, [[-.25, -.05], [-.1, -.15], [.05, -.12], [.2, -.06], [.28, .04], [.15, .1], [0, .08], [-.1, .12], [-.2, .1], [-.22, .02]]],
    [-.1, .18, .32, JAVA_PTS.map(([a, b]) => [a * 1.2, b * 1.2])],
    [.4, .2, .12, [[-.5, 0], [0, -.4], [.5, 0], [0, .4]]],
  ];
  for (const pass of [0, 1]) for (const [ix, iy, k, pts] of isl) {
    ctx.save(); ctx.translate(ix * s, iy * s);
    if (pass === 0 && glow) { ctx.shadowColor = `rgba(255,220,90,${.95 * glow})`; ctx.shadowBlur = 70 * glow; }
    blobPath(ctx, pts, s * k, s * k);
    if (pass === 0) { ctx.fillStyle = '#ffe68a'; ctx.globalAlpha = glow; ctx.fill(); ctx.globalAlpha = 1; } else fillStroke(ctx, mix('#8fcf5a', '#d8ec7a', glow * .6), 7);
    ctx.restore();
  }
  ctx.restore();
}
