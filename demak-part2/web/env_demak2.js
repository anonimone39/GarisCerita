// ---------- props for Demak Part 2: Wali Songo and the Great Mosque ----------
function heart(ctx, x, y, s, col = '#e0392f', a = 1) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-70, -20, -40, -70, 0, -30); ctx.bezierCurveTo(40, -70, 70, -20, 0, 30); ctx.closePath(); fillStroke(ctx, col, 6);
  ellipse(ctx, -20, -26, 12, 7, -.5); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fill(); ctx.restore();
}
function note(ctx, x, y, s, col = '#ffd23a', a = 1, rot = 0) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  line(ctx, 14, 20, 14, -50, 9, INK); ellipse(ctx, 0, 24, 22, 15, -.4); fillStroke(ctx, col, 6); ctx.beginPath(); ctx.moveTo(14, -50); ctx.quadraticCurveTo(44, -40, 38, -4); ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore();
}
function kitab(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  for (const sd of [-1, 1]) { ctx.save(); ctx.scale(sd, 1); ctx.beginPath(); ctx.moveTo(0, -40); ctx.quadraticCurveTo(50, -60, 110, -40); ctx.lineTo(110, 50); ctx.quadraticCurveTo(50, 30, 0, 50); ctx.closePath(); fillStroke(ctx, '#f6edd0', 6); ctx.strokeStyle = 'rgba(120,70,20,.5)'; ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(20, -28 + i * 20); ctx.lineTo(95, -30 + i * 20); ctx.stroke(); } ctx.restore(); }
  line(ctx, 0, -40, 0, 50, 6, '#6a3a1a'); ctx.restore();
}
function wayangFig(ctx, x, y, s, rot = 0, col = '#241a2a') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineCap = 'round';
  circle(ctx, 0, -100, 22); ctx.fill(); ctx.beginPath(); ctx.moveTo(-16, -118); ctx.lineTo(0, -150); ctx.lineTo(16, -118); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-26, -78); ctx.lineTo(26, -78); ctx.lineTo(34, 40); ctx.lineTo(-34, 40); ctx.closePath(); ctx.fill();
  ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(24, -70); ctx.lineTo(80, -10); ctx.lineTo(96, -50); ctx.moveTo(-24, -70); ctx.lineTo(-56, 0); ctx.stroke();
  ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(-12, 40); ctx.lineTo(-18, 110); ctx.moveTo(12, 40); ctx.lineTo(18, 110); ctx.stroke();
  line(ctx, 80, 110, 80, -120, 5, col); ctx.restore();
}
function kelir(ctx, x, y, s, t, a = 1) {
  ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -380, -240, 760, 480, 18); fillStroke(ctx, '#fff3c4', 0);
  const g = ctx.createRadialGradient(0, 40, 20, 0, 40, 420); g.addColorStop(0, 'rgba(255,214,120,.95)'); g.addColorStop(1, 'rgba(255,160,60,.25)'); ctx.fillStyle = g; ctx.fillRect(-380, -240, 760, 480);
  ctx.save(); rrect(ctx, -380, -240, 760, 480, 18); ctx.clip(); wayangFig(ctx, -150 + Math.sin(t * 1.4) * 40, 90, .9, Math.sin(t * 2) * .08); wayangFig(ctx, 150 - Math.sin(t * 1.4) * 40, 90, .9, -Math.sin(t * 2.2) * .08); ctx.restore();
  rrect(ctx, -380, -240, 760, 480, 18); fillStroke(ctx, null, 14, '#7a4a2a'); rrect(ctx, -396, 226, 792, 38, 10); fillStroke(ctx, '#8a5530', 8);
  ctx.restore();
}
function gamelan(ctx, x, y, s, t, play = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  // frame and big gong
  rrect(ctx, -330, -460, 24, 460, 8); fillStroke(ctx, '#7a4a2a', 6); rrect(ctx, 306, -460, 24, 460, 8); fillStroke(ctx, '#7a4a2a', 6); rrect(ctx, -350, -480, 700, 30, 10); fillStroke(ctx, '#8a5530', 6);
  const sw = Math.sin(t * 9) * .06 * play; ctx.save(); ctx.translate(-120, -450); ctx.rotate(sw); line(ctx, 0, 0, 0, 70, 7, '#5a3a1c'); circle(ctx, 0, 190, 130); fillStroke(ctx, '#e0b13a', 8); circle(ctx, 0, 190, 100); fillStroke(ctx, '#f2c94c', 5); circle(ctx, 0, 190, 40); fillStroke(ctx, '#c9971f', 6); ctx.restore();
  ctx.save(); ctx.translate(150, -450); ctx.rotate(-sw); line(ctx, 0, 0, 0, 90, 7, '#5a3a1c'); circle(ctx, 0, 190, 95); fillStroke(ctx, '#e0b13a', 8); circle(ctx, 0, 190, 30); fillStroke(ctx, '#c9971f', 6); ctx.restore();
  // bonang row
  rrect(ctx, -300, -90, 600, 36, 12); fillStroke(ctx, '#7a4a2a', 6);
  for (let i = 0; i < 6; i++) { const bx = -230 + i * 92, hit = Math.max(0, Math.sin(t * 9 + i * 1.3)) * play; ctx.save(); ctx.translate(bx, -108 - hit * 8); ellipse(ctx, 0, 0, 40, 32); fillStroke(ctx, '#e0b13a', 6); circle(ctx, 0, -4, 12); fillStroke(ctx, '#c9971f', 4); ctx.restore(); }
  ctx.restore();
}
function tiangTatal(ctx, x, base, h, k, t) {
  // a pillar made of many small wood strips bound together. k 0..1 = how much is built
  ctx.save(); ctx.translate(x, base); const w = 120, rows = 26, rh = h / rows, R = rng(11);
  for (let r = 0; r < rows; r++) {
    const kk = clamp(k * rows - r); if (kk <= 0) continue; const yy = -(r + 1) * rh, off = (1 - backOut(kk)) * (r % 2 ? 160 : -160);
    ctx.save(); ctx.globalAlpha = clamp(kk * 2); ctx.translate(off, 0);
    for (let c = 0; c < 4; c++) { const cw = w / 4, col = ['#c98d56', '#b5773f', '#d6a066', '#a96a36'][(r + c + Math.floor(R() * 2)) % 4]; rrect(ctx, -w / 2 + c * cw, yy, cw + 2, rh + 2, 4); fillStroke(ctx, col, 3.5); }
    ctx.restore();
  }
  if (k > .9) for (const r of [4, 11, 18, 24]) { ctx.fillStyle = '#6a3a1a'; ctx.fillRect(-w / 2 - 6, -(r + 1) * rh, w + 12, 12); }
  ctx.restore();
}
function hammerProp(c, k, h, a, side) { if (k === 'R') { c.save(); c.translate(h[0], h[1]); c.rotate(-side * a); rrect(c, -.012, -.02, .024, .2, .008); fillStroke(c, '#8a5530', .012); rrect(c, -.07, .15, .14, .07, .01); fillStroke(c, '#8a929e', .012); c.restore(); } }
function mallet(c, k, h, a, side) { if (k === 'R') { c.save(); c.translate(h[0], h[1]); c.rotate(-side * a); rrect(c, -.008, -.01, .016, .16, .006); fillStroke(c, '#8a5530', .01); circle(c, 0, .17, .028); fillStroke(c, '#f6edd0', .01); c.restore(); } }
function arrowTo(ctx, x0, y0, x1, y1, col = '#fff', lw = 8, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); const ang = Math.atan2(y1 - y0, x1 - x0); line(ctx, x0, y0, x1 - Math.cos(ang) * 18, y1 - Math.sin(ang) * 18, lw + 6, INK); line(ctx, x0, y0, x1 - Math.cos(ang) * 18, y1 - Math.sin(ang) * 18, lw, col);
  ctx.translate(x1, y1); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(-22, -20); ctx.lineTo(-22, 20); ctx.closePath(); fillStroke(ctx, col, 6); ctx.restore();
}
