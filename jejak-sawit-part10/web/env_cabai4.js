// ---------- props for Cabai Part 4: the Spice Islands ----------
function cloveTree(ctx, x, y, s, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-18, 0); ctx.quadraticCurveTo(-14, -140, -8, -230); ctx.lineTo(8, -230); ctx.quadraticCurveTo(14, -140, 18, 0); ctx.closePath(); fillStroke(ctx, '#8a5530', 6);
  const bl = [[-70, -300, 90], [60, -310, 95], [0, -380, 100], [-110, -240, 70], [110, -250, 72]];
  for (const [bx, by, br] of bl) { circle(ctx, bx, by + Math.sin(t * 1.4 + bx) * 3, br); fillStroke(ctx, '#3f9a45', 6); }
  ctx.fillStyle = 'rgba(20,60,20,.2)'; ctx.save(); circle(ctx, 0, -330, 190); ctx.clip(); ctx.fillRect(40, -560, 300, 400); ctx.restore();
  const R = rng(5); for (let i = 0; i < 16; i++) { const a = R() * TAU, d = 30 + R() * 130, px = Math.cos(a) * d, py = -310 + Math.sin(a) * d * .8; ctx.save(); ctx.translate(px, py); ctx.rotate(R() * 6); line(ctx, 0, 0, 0, 26, 7, '#7a4524'); circle(ctx, 0, -3, 11); fillStroke(ctx, '#e8587a', 4); ctx.restore(); }
  ctx.restore();
}
function nutmegFruit(ctx, x, y, s, open = 1, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 70, 82, 0, 0, TAU); fillStroke(ctx, '#e7d46a', 7);
  if (open > 0) { ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 70, 82, 0, 0, TAU); ctx.clip(); ctx.beginPath(); ctx.moveTo(-14 * open, -90); ctx.quadraticCurveTo(0, 0, -14 * open, 90); ctx.lineTo(14 * open, 90); ctx.quadraticCurveTo(0, 0, 14 * open, -90); ctx.closePath(); ctx.fillStyle = '#c0392b'; ctx.fill(); ctx.restore(); ellipse(ctx, 0, 0, 30 * open + 2, 40 * open + 2); fillStroke(ctx, '#7a4a24', 5); }
  ellipse(ctx, -26, -32, 18, 8, -.5); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fill(); ctx.restore();
}
function spiceSack(ctx, x, y, s, kind = 'clove') {
  sack(ctx, x, y, s, '#d8b883'); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (kind === 'clove') { for (let i = 0; i < 9; i++) { ctx.save(); ctx.translate(-42 + (i % 5) * 20, -142 - Math.floor(i / 5) * 14 + (i % 2) * 6); ctx.rotate(-.5 + i * .25); line(ctx, 0, 0, 0, 24, 7, '#6a3a1a'); circle(ctx, 0, -2, 8); fillStroke(ctx, '#8a4a24', 3); ctx.restore(); } }
  else { for (let i = 0; i < 5; i++) { ellipse(ctx, -34 + i * 17, -146 - (i % 2) * 10, 14, 11); fillStroke(ctx, '#8a5530', 4); } }
  ctx.restore();
}
function extraIslands(ctx, t, show = 1) {
  if (show <= 0) return; ctx.save(); ctx.translate(MAP_X0, MAP_Y0); ctx.scale(MAP_K, MAP_K); ctx.globalAlpha = clamp(show);
  const isl = [[[918, 282], [930, 274], [942, 284], [936, 300], [924, 304]], [[914, 306], [924, 308], [920, 318], [911, 314]], [[874, 205], [890, 198], [898, 222], [892, 250], [878, 242], [880, 222]], [[880, 258], [900, 262], [896, 276], [882, 272]]];
  for (const pts of isl) { path(ctx, pts); ctx.fillStyle = '#8fd16c'; ctx.fill(); ctx.lineWidth = 2.6; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.stroke(); }
  ctx.restore();
}
function scrollBig(ctx, x, y, w, h, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  rrect(ctx, -w / 2, -h / 2, w, h, 14); fillStroke(ctx, '#f3e3b8', 6);
  for (const sx of [-1, 1]) { rrect(ctx, sx * w / 2 - 12, -h / 2 - 10, 24, h + 20, 12); fillStroke(ctx, '#b0703a', 6); }
  ctx.strokeStyle = 'rgba(120,70,20,.4)'; ctx.lineWidth = 5; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-w * .38, -h * .3 + i * h * .2); ctx.lineTo(w * .38, -h * .3 + i * h * .2); ctx.stroke(); }
  ctx.restore();
}
function heart(ctx, x, y, s, col = '#e0392f', a = 1) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-70, -20, -40, -70, 0, -30); ctx.bezierCurveTo(40, -70, 70, -20, 0, 30); ctx.closePath(); fillStroke(ctx, col, 6);
  ellipse(ctx, -20, -26, 12, 7, -.5); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fill(); ctx.restore();
}
