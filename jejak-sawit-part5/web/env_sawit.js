// ---------- props for "Jejak Sawit Indonesia" ----------
const PALMG = '#3f9a45', PALMD = '#2b7d44', TBS = '#e8662a';
function tandan(ctx, x, y, s, rot = 0) {
  // fresh fruit bunch (TBS)
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); ctx.ellipse(0, 0, 70, 90, 0, 0, TAU); fillStroke(ctx, '#d9531a', 7);
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 70, 90, 0, 0, TAU); ctx.clip();
  for (let r = -4; r <= 4; r++) for (let c = -3; c <= 3; c++) { const px = c * 22 + (r % 2) * 11, py = r * 22; if (Math.hypot(px / 70, py / 90) < 1.05) { circle(ctx, px, py, 11); ctx.fillStyle = (r + c) % 3 === 0 ? '#2a1a14' : TBS; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = INK; ctx.stroke(); } }
  ctx.fillStyle = 'rgba(60,10,0,.2)'; ctx.fillRect(10, -100, 100, 200); ctx.restore();
  for (let i = -3; i <= 3; i++) line(ctx, i * 12, -86, i * 16, -118 - (i % 2) * 8, 5, '#6a4a2c');
  ctx.restore();
}
function oilPalm(ctx, x, y, s, t = 0, o = {}) {
  // x,y = foot of the trunk; s = scale (1 ~ 520px tall); o.age 0..1 growth; o.bunches
  const age = o.age == null ? 1 : o.age; ctx.save(); ctx.translate(x, y); ctx.scale(s * (.25 + .75 * age), s * (.25 + .75 * age));
  const H = 320;
  ctx.beginPath(); ctx.moveTo(-26, 0); ctx.quadraticCurveTo(-20, -H * .5, -14, -H); ctx.lineTo(14, -H); ctx.quadraticCurveTo(20, -H * .5, 26, 0); ctx.closePath(); fillStroke(ctx, '#8a5a34', 7);
  ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(50,25,5,.3)'; ctx.lineWidth = 5; for (let i = 1; i < 12; i++) { ctx.beginPath(); ctx.moveTo(-34, -i * 28); ctx.lineTo(34, -i * 28 + 8); ctx.stroke(); } ctx.restore();
  if (o.bunches !== 0) { tandan(ctx, -42, -H + 20, .42, .4); tandan(ctx, 44, -H + 26, .4, -.4); }
  for (let i = 0; i < 9; i++) { const a = -2.7 + i * .42 + Math.sin(t * 1.6 + i) * .03; ctx.save(); ctx.translate(0, -H); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(110, -80, 230, -20); ctx.quadraticCurveTo(120, -40, 0, 14); ctx.closePath(); fillStroke(ctx, i % 2 ? PALMG : PALMD, 6); ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(20,60,20,.35)'; ctx.lineWidth = 3; for (let k = 1; k < 10; k++) { ctx.beginPath(); ctx.moveTo(k * 22, -40 + k * 3); ctx.lineTo(k * 22 + 8, 12); ctx.stroke(); } ctx.restore(); ctx.restore(); }
  circle(ctx, 0, -H, 22); fillStroke(ctx, '#6a8a3a', 6);
  ctx.restore();
}
function seedIcon(ctx, x, y, s, a = 1, t = 0) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y + Math.sin(t * 4 + x) * 5); ctx.scale(s * backOut(clamp(a)), s * backOut(clamp(a)));
  ctx.beginPath(); ctx.ellipse(0, 0, 34, 44, 0, 0, TAU); fillStroke(ctx, '#7a4a24', 6); ellipse(ctx, -10, -14, 10, 6, -.5); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, -42); ctx.quadraticCurveTo(-4, -70, 14, -82); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineWidth = 4; ctx.strokeStyle = '#58a14a'; ctx.stroke(); ctx.restore();
}
function seedCrate(ctx, x, y, s, open = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -150, -90, 300, 130, 10); fillStroke(ctx, '#b07a44', 7); ctx.save(); rrect(ctx, -150, -90, 300, 130, 10); ctx.clip(); ctx.strokeStyle = 'rgba(60,25,5,.3)'; ctx.lineWidth = 5; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 60, -90); ctx.lineTo(i * 60, 40); ctx.stroke(); } ctx.fillStyle = 'rgba(40,15,0,.2)'; ctx.fillRect(40, -100, 200, 160); ctx.restore();
  ctx.beginPath(); ctx.ellipse(0, -90, 150, 22, 0, 0, TAU); fillStroke(ctx, open > .5 ? '#3a2418' : '#c08a54', 6);
  ctx.restore();
}
function millProp(ctx, x, y, s, t = 0, smoke = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -230, -190, 300, 190, 8); fillStroke(ctx, '#cfd5dd', 7); rrect(ctx, 60, -280, 140, 280, 8); fillStroke(ctx, '#b9c0ca', 7);
  ctx.save(); rrect(ctx, -230, -190, 300, 190, 8); ctx.clip(); ctx.fillStyle = 'rgba(30,40,60,.18)'; ctx.fillRect(-80, -200, 200, 220); ctx.restore();
  ctx.beginPath(); ctx.moveTo(-250, -190); ctx.lineTo(-80, -260); ctx.lineTo(90, -190); ctx.closePath(); fillStroke(ctx, '#8a929e', 7);
  for (const wx of [-190, -120, -50]) { rrect(ctx, wx, -150, 44, 50, 6); fillStroke(ctx, '#ffe9a0', 4); }
  rrect(ctx, 120, -420, 50, 150, 6); fillStroke(ctx, '#7a5a4a', 7); rrect(ctx, 114, -432, 62, 24, 6); fillStroke(ctx, '#e0392f', 5);
  if (smoke > 0) for (let i = 0; i < 4; i++) { const ph = (t * .5 + i * .25) % 1; puff(ctx, 145 + ph * 70, -460 - ph * 200, 36 + ph * 30, t, '#e8e8f0', 3 + i, (1 - ph) * .8 * smoke); }
  ctx.restore();
}
function plantationRows(ctx, y0, t, o = {}) {
  // receding rows of oil palms across the field
  const rows = o.rows || 4; for (let r = rows - 1; r >= 0; r--) { const k = r / Math.max(1, rows - 1), yy = y0 + (1 - k) * 330, sc = .25 + (1 - k) * .42, n = 7 - Math.floor(k * 2); for (let i = 0; i < n; i++) oilPalm(ctx, -40 + i * (1160 / (n - 1)) + (r % 2) * 40, yy, sc, t + i, { age: o.age == null ? 1 : o.age, bunches: 1 }); }
}
function gardenGate(ctx, x, y, s, label = 'KEBUN RAYA BOGOR') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const sx of [-1, 1]) { rrect(ctx, sx * 230 - 36, -260, 72, 260, 6); fillStroke(ctx, '#d9cdb4', 7); rrect(ctx, sx * 230 - 46, -290, 92, 36, 8); fillStroke(ctx, '#b9ac90', 6); }
  rrect(ctx, -230, -300, 460, 90, 12); fillStroke(ctx, '#2f8f5b', 7); ctx.font = '700 40px Poppins'; text(ctx, label, 0, -254, 40, '#fff');
  ctx.restore();
}
function dirtHole(ctx, x, y, s, planted = 0, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ellipse(ctx, 0, 0, 70, 20); fillStroke(ctx, '#5a3a22', 6); if (planted > 0) { ctx.save(); ctx.scale(clamp(planted), clamp(planted)); line(ctx, 0, 0, 0, -50, 8, INK); line(ctx, 0, 0, 0, -50, 4, '#58a14a'); ellipse(ctx, 16, -48, 20, 9, -.5); fillStroke(ctx, PALMG, 4); ellipse(ctx, -16, -42, 20, 9, .5); fillStroke(ctx, PALMD, 4); ctx.restore(); } ctx.restore(); }
