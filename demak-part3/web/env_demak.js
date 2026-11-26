// ---------- props for the Demak reel ----------
function masjidProp(ctx, x, y, s, t = 0, glow = 0) {
  // Masjid Agung Demak: a pavilion with three stacked (meru) roofs. x,y = centre of the ground line
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (glow > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(0, -200, 20, 0, -200, 520); g.addColorStop(0, `rgba(255,235,150,${.55 * glow})`); g.addColorStop(1, 'rgba(255,235,150,0)'); ctx.fillStyle = g; ctx.fillRect(-600, -800, 1200, 1000); ctx.restore(); }
  // wide base
  rrect(ctx, -250, -70, 500, 70, 6); fillStroke(ctx, '#b99a6a', 6);
  rrect(ctx, -215, -190, 430, 125, 6); fillStroke(ctx, '#f3e3c0', 6);
  ctx.save(); rrect(ctx, -215, -190, 430, 125, 6); ctx.clip(); ctx.fillStyle = 'rgba(80,40,10,.12)'; ctx.fillRect(60, -200, 200, 160); ctx.restore();
  for (const px of [-165, -85, 85, 165]) { rrect(ctx, px - 11, -190, 22, 125, 4); fillStroke(ctx, '#8a5530', 5); }
  rrect(ctx, -42, -165, 84, 100, [42, 42, 0, 0]); fillStroke(ctx, '#2f8f5b', 5);
  // three roofs
  const roof = (yy, w, h, col) => { ctx.beginPath(); ctx.moveTo(-w, yy); ctx.lineTo(-w * .62, yy - h); ctx.lineTo(w * .62, yy - h); ctx.lineTo(w, yy); ctx.closePath(); fillStroke(ctx, col, 6); ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(40,10,0,.2)'; ctx.fillRect(w * .1, yy - h - 4, w, h + 8); ctx.strokeStyle = 'rgba(40,10,0,.25)'; ctx.lineWidth = 3; for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(i * w * .22, yy); ctx.lineTo(i * w * .14, yy - h); ctx.stroke(); } ctx.restore(); };
  roof(-190, 290, 110, '#7a4a2a'); roof(-300, 210, 100, '#8a5530'); roof(-400, 135, 90, '#9a6038');
  line(ctx, 0, -490, 0, -560, 8, '#8a5530'); circle(ctx, 0, -566, 14); fillStroke(ctx, GOLD, 5);
  ctx.restore();
}
function pier(ctx, y0, t) {
  // wooden jetty across the screen, front edge at y0+120
  ctx.fillStyle = '#b07a44'; ctx.fillRect(-1200, y0, 3500, 140); ctx.fillStyle = 'rgba(60,25,5,.25)'; for (let i = 0; i < 40; i++) ctx.fillRect(-1200 + i * 90, y0, 6, 140);
  ctx.fillStyle = '#8a5a2c'; ctx.fillRect(-1200, y0 + 140, 3500, 24); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-1200, y0, 3500, 8);
  for (let i = 0; i < 9; i++) { rrect(ctx, -100 + i * 180, y0 + 140, 26, 120, 6); fillStroke(ctx, '#6a4524', 5); }
}
function coinBurst(ctx, x, y, lt, n = 14, seed = 3) {
  if (lt < 0 || lt > 1.4) return; const R = rng(seed); ctx.save();
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (R() - .5) * 2.2, v = 320 + R() * 380, px = x + Math.cos(a) * v * lt, py = y + Math.sin(a) * v * lt + 900 * lt * lt; ctx.globalAlpha = 1 - clamp((lt - .9) / .5); circle(ctx, px, py, 18); fillStroke(ctx, GOLD, 5); ctx.save(); ctx.translate(px, py); text(ctx, '$', 0, 1, 20, GOLD2, 'transparent', 0, 'Poppins', 700); ctx.restore(); }
  ctx.restore();
}
function cracks(ctx, x, y, s, a) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const paths = [[[0, -320], [-20, -250], [14, -190], [-18, -120], [8, -50]], [[-14, -190], [-80, -160], [-120, -90]], [[14, -190], [70, -150], [110, -100]], [[-20, -250], [-70, -280]]];
  paths.forEach((p, i) => { const k = clamp(a * 1.4 - i * .2); if (k <= 0) return; ctx.beginPath(); const n = Math.max(2, Math.ceil(p.length * k)); p.slice(0, n).forEach(([px, py], j) => j ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.lineWidth = 16; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = '#ffd9a0'; ctx.stroke(); });
  ctx.restore();
}
function flagDemak(ctx, x, y, s, t, hgt = 360, rise = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -6, -hgt, 12, hgt, 5); fillStroke(ctx, '#7a5230', 5);
  const w = 200, h = 115, top = -hgt + 10 + (1 - rise) * (hgt - 120), wave = i => Math.sin(t * 5 + i * .8) * 9 * (i / 8);
  ctx.beginPath(); for (let i = 0; i <= 8; i++) { const X = 6 + i * w / 8; i ? ctx.lineTo(X, top + wave(i)) : ctx.moveTo(X, top); } for (let i = 8; i >= 0; i--) ctx.lineTo(6 + i * w / 8, top + h + wave(i)); ctx.closePath(); fillStroke(ctx, '#2f8f5b', 6);
  circle(ctx, 6 + w * .5, top + h / 2 + wave(4), 24); fillStroke(ctx, GOLD, 4);
  ctx.restore();
}
function waliLine(ctx, x0, x1, y, s, t, a = 1, n = 9) {
  const hats = ['band', 'blangkon', 'band'];
  for (let i = 0; i < n; i++) {
    const k = clamp(a * (n + 2) - i - 1); if (k <= 0) continue;
    const px = lerp(x0, x1, i / (n - 1)), cols = [['#f6f1e8', '#f6f1e8'], ['#2f8f5b', '#2f8f5b']][i % 2];
    ST(ctx, { cols, hat: hats[i % 3], hatCol: i % 3 === 1 ? '#f6f1e8' : '#f6f1e8', belt: false }, px, y + (1 - backOut(k)) * 120, s, { arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'normal', mouth: 'smile' }, bob: Math.sin(t * 2 + i) * .004, alpha: clamp(k * 2) });
  }
}
function gateCollapse(ctx, x, y, s, k, t) {
  // k 0..1: the gate tilts, shakes and sinks
  ctx.save(); ctx.translate(x, y + k * 130 * s); const sh = k > 0 && k < 1 ? shake(t * 14, 12 * (1 - k), 3) : [0, 0]; ctx.translate(sh[0], sh[1]); ctx.scale(1, 1 - k * .55); ctx.rotate(k * .05);
  gate(ctx, 0, 0, s, 1, '#b8553a'); ctx.restore();
}
function cannonFlash(ctx, x, y, s, a) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = clamp(a);
  burst(ctx, 0, 0, 120, 12, '#ffd23a', 9, .5); burst(ctx, 0, 0, 70, 10, '#fff6c4', 4, .5); ctx.restore();
}
