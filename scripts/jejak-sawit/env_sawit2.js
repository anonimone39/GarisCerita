// ---------- more props for Jejak Sawit (generic scene library) ----------
function wheel(ctx, x, y, r, t = 0) { circle(ctx, x, y, r); fillStroke(ctx, '#3a3f4a', 6); circle(ctx, x, y, r * .35); fillStroke(ctx, '#9aa1ac', 4); for (let i = 0; i < 4; i++) { const a = t * 3 + i * Math.PI / 2; line(ctx, x, y, x + Math.cos(a) * r * .85, y + Math.sin(a) * r * .85, 4, '#3a3f4a'); } }
function trainProp(ctx, x, y, s, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  line(ctx, -420, 0, 520, 0, 8, '#6a5a4a'); for (let i = -8; i < 10; i++) rrect(ctx, i * 50 - 10, -4, 20, 24, 3), fillStroke(ctx, '#8a6a44', 3);
  for (const wx of [-300, -80]) { rrect(ctx, wx - 100, -140, 200, 110, 8); fillStroke(ctx, '#8a5a34', 6); for (let k = 0; k < 4; k++) tandan(ctx, wx - 66 + k * 44, -150 - (k % 2) * 12, .3, .2 * k); wheel(ctx, wx - 55, -10, 24, t); wheel(ctx, wx + 55, -10, 24, t); }
  rrect(ctx, 60, -180, 150, 150, 10); fillStroke(ctx, '#e0392f', 6); rrect(ctx, 120, -240, 100, 70, 8); fillStroke(ctx, '#e0392f', 6); rrect(ctx, 140, -226, 60, 36, 6); fillStroke(ctx, '#bfe6f8', 4);
  rrect(ctx, 80, -230, 30, 70, 6); fillStroke(ctx, '#3a3f4a', 6); for (let i = 0; i < 3; i++) { const ph = (t * .6 + i * .33) % 1; puff(ctx, 95 + ph * 40, -250 - ph * 120, 22 + ph * 22, t, '#e8e8f0', 3 + i, (1 - ph) * .8); }
  wheel(ctx, 110, -10, 30, t); wheel(ctx, 190, -10, 30, t);
  ctx.restore();
}
function truckProp(ctx, x, y, s, t = 0, load = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -260, -170, 330, 120, 8); fillStroke(ctx, '#8a5a34', 6); if (load) for (let k = 0; k < 6; k++) tandan(ctx, -220 + k * 52, -184 - (k % 2) * 14, .34, .2 * k);
  rrect(ctx, 80, -170, 130, 120, 10); fillStroke(ctx, '#2f63c9', 6); rrect(ctx, 150, -150, 50, 44, 6); fillStroke(ctx, '#bfe6f8', 4); rrect(ctx, 70, -60, 160, 22, 6); fillStroke(ctx, '#3a3f4a', 5);
  wheel(ctx, -170, -34, 36, t); wheel(ctx, -70, -34, 36, t); wheel(ctx, 150, -34, 36, t);
  ctx.restore();
}
function tankerProp(ctx, x, y, s, t = 0, flip = 1) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.4) * 4 * s); ctx.scale(s * flip, s);
  ctx.beginPath(); ctx.moveTo(-420, -70); ctx.lineTo(380, -70); ctx.lineTo(330, 40); ctx.lineTo(-380, 40); ctx.closePath(); fillStroke(ctx, '#3a4a6a', 7);
  ctx.save(); ctx.clip(); ctx.fillStyle = '#e0392f'; ctx.fillRect(-420, 10, 800, 30); ctx.restore();
  for (let i = 0; i < 4; i++) { rrect(ctx, -330 + i * 150, -130, 120, 62, 20); fillStroke(ctx, '#e7ecf2', 6); }
  rrect(ctx, 250, -190, 100, 124, 8); fillStroke(ctx, '#f6f1e8', 6); for (let i = 0; i < 3; i++) rrect(ctx, 262 + i * 28, -170, 20, 24, 4), fillStroke(ctx, '#bfe6f8', 3);
  rrect(ctx, 280, -230, 40, 44, 6); fillStroke(ctx, '#e0392f', 5);
  ctx.fillStyle = 'rgba(255,255,255,.7)'; ellipse(ctx, 0, 44, 440, 12); ctx.fill();
  ctx.restore();
}
function barrelOil(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -50, -130, 100, 130, 14); fillStroke(ctx, '#e8a02a', 6); for (const yy of [-100, -66, -32]) line(ctx, -50, yy, 50, yy, 5, '#a8681a'); ellipse(ctx, 0, -130, 50, 14); fillStroke(ctx, '#f2c25a', 5); circle(ctx, 0, -66, 20); fillStroke(ctx, '#fff3c4', 4); ctx.restore(); }
function houseProp(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -130, -150, 260, 150, 6); fillStroke(ctx, '#d9b27a', 7); ctx.save(); rrect(ctx, -130, -150, 260, 150, 6); ctx.clip(); ctx.strokeStyle = 'rgba(90,50,10,.3)'; ctx.lineWidth = 4; for (let i = -6; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(i * 22, -150); ctx.lineTo(i * 22, 0); ctx.stroke(); } ctx.restore();
  ctx.beginPath(); ctx.moveTo(-160, -148); ctx.lineTo(0, -250); ctx.lineTo(160, -148); ctx.closePath(); fillStroke(ctx, '#b0502c', 7);
  rrect(ctx, -26, -100, 52, 100, [24, 24, 0, 0]); fillStroke(ctx, '#5a3a22', 5); rrect(ctx, 54, -110, 52, 46, 6); fillStroke(ctx, '#bfe6f8', 5);
  ctx.restore();
}
function productProp(ctx, x, y, s, type = 'oil') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (type === 'oil') { rrect(ctx, -40, -150, 80, 150, 20); fillStroke(ctx, '#f2c25a', 6); rrect(ctx, -22, -190, 44, 46, 8); fillStroke(ctx, '#e0392f', 5); rrect(ctx, -30, -100, 60, 50, 6); fillStroke(ctx, '#fff3c4', 4); }
  else if (type === 'margarine') { rrect(ctx, -80, -80, 160, 80, 14); fillStroke(ctx, '#f6e27a', 6); rrect(ctx, -84, -100, 168, 34, 10); fillStroke(ctx, '#e0392f', 6); ellipse(ctx, 0, -40, 34, 18); fillStroke(ctx, '#fff3c4', 4); }
  else if (type === 'soap') { rrect(ctx, -70, -70, 140, 70, 24); fillStroke(ctx, '#f2b8d8', 6); ellipse(ctx, 0, -35, 36, 16); fillStroke(ctx, '#fff', 4); for (const [bx, by, br] of [[-50, -90, 16], [-20, -116, 12], [24, -98, 18]]) { circle(ctx, bx, by, br); fillStroke(ctx, 'rgba(200,235,255,.7)', 3); } }
  else if (type === 'lipstick') { rrect(ctx, -26, -90, 52, 90, 8); fillStroke(ctx, '#2a2530', 6); rrect(ctx, -22, -130, 44, 44, 10); fillStroke(ctx, '#d92b6a', 5); ctx.beginPath(); ctx.moveTo(-22, -130); ctx.lineTo(0, -154); ctx.lineTo(22, -130); ctx.closePath(); fillStroke(ctx, '#d92b6a', 5); }
  else if (type === 'noodle') { rrect(ctx, -70, -110, 140, 110, 10); fillStroke(ctx, '#e0392f', 6); ctx.font = '700 28px Poppins'; ellipse(ctx, 0, -60, 40, 30); fillStroke(ctx, '#f6e27a', 4); for (let i = -2; i <= 2; i++) line(ctx, i * 14, -80, i * 14 + 6, -40, 4, '#c9a14a'); }
  ctx.restore();
}
function orangutan(ctx, x, y, s, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const sw = Math.sin(t * 2) * .05; ctx.rotate(sw);
  line(ctx, -80, -60, -130, 40, 22, '#c4551b'); line(ctx, 80, -60, 130, 40, 22, '#c4551b');
  ellipse(ctx, 0, -40, 80, 90); fillStroke(ctx, '#d9692a', 7); circle(ctx, 0, -150, 64); fillStroke(ctx, '#d9692a', 7); ellipse(ctx, 0, -138, 42, 38); fillStroke(ctx, '#f0c48a', 5);
  circle(ctx, -18, -148, 6); ctx.fillStyle = INK; ctx.fill(); circle(ctx, 18, -148, 6); ctx.fill(); ctx.beginPath(); ctx.arc(0, -126, 14, .2, Math.PI - .2); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke();
  ctx.restore();
}
function forestTree(ctx, x, y, s, t = 0, dark = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-22, 0); ctx.quadraticCurveTo(-18, -140, -10, -230); ctx.lineTo(10, -230); ctx.quadraticCurveTo(18, -140, 22, 0); ctx.closePath(); fillStroke(ctx, '#7a4a2a', 6);
  const c = dark ? '#2a6a34' : '#3f9a45'; for (const [bx, by, br] of [[-70, -270, 80], [70, -280, 84], [0, -350, 96], [-100, -220, 60], [100, -230, 62]]) { circle(ctx, bx, by + Math.sin(t * 1.3 + bx) * 3, br); fillStroke(ctx, c, 6); }
  ctx.restore();
}
function stumpProp(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -40, -50, 80, 50, 8); fillStroke(ctx, '#8a5a34', 6); ellipse(ctx, 0, -50, 40, 12); fillStroke(ctx, '#d9b27a', 5); ellipse(ctx, 0, -50, 22, 6); fillStroke(ctx, null, 3); ctx.restore(); }
function hazeProp(ctx, t, a = 1) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a) * .55; const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(120,90,70,.9)'); g.addColorStop(1, 'rgba(230,140,60,.5)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function sealBadge(ctx, x, y, s, label = 'ISPO', t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t * 2) * .03);
  ctx.beginPath(); for (let i = 0; i < 24; i++) { const a = i / 24 * TAU, r = i % 2 ? 130 : 150; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); fillStroke(ctx, '#f2c230', 7);
  circle(ctx, 0, 0, 112); fillStroke(ctx, '#2f8f4b', 7); ctx.beginPath(); ctx.moveTo(-50, -4); ctx.lineTo(-14, 34); ctx.lineTo(54, -40); ctx.lineWidth = 18; ctx.strokeStyle = '#fff'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  text(ctx, label, 0, 74, 34, '#fff', INK, 6, 'Poppins', 700); ctx.restore();
}
function calendarCard(ctx, x, y, s, year = '1911', a = 1) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.globalAlpha = clamp(a); ctx.scale(s * backOut(clamp(a)), s * backOut(clamp(a)));
  rrect(ctx, -200, -180, 400, 360, 24); fillStroke(ctx, '#fff8e6', 8); rrect(ctx, -200, -180, 400, 90, [24, 24, 0, 0]); fillStroke(ctx, '#e0392f', 8); for (const cx of [-110, 110]) { rrect(ctx, cx - 10, -210, 20, 60, 8); fillStroke(ctx, '#6a5a4a', 5); }
  text(ctx, year, 0, 40, String(year).length > 5 ? 84 : 140, INK, 'transparent', 0, 'Poppins', 700); ctx.restore();
}
function mapSheet(ctx, x, y, w, h, dots = 6, t = 0) {
  ctx.save(); ctx.translate(x, y); rrect(ctx, -w / 2, -h / 2, w, h, 14); fillStroke(ctx, '#f3e3b8', 7);
  ctx.strokeStyle = 'rgba(120,70,20,.35)'; ctx.lineWidth = 3; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2 + i * h / 5); ctx.lineTo(w / 2, -h / 2 + i * h / 5); ctx.stroke(); }
  const R = rng(7); for (let i = 0; i < dots; i++) { const px = (R() - .5) * w * .8, py = (R() - .5) * h * .7; circle(ctx, px, py, 12 + Math.sin(t * 5 + i) * 2); fillStroke(ctx, '#3fa35b', 4); }
  ctx.restore();
}
function officeProp(ctx, x, y, s, label = '') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -200, -300, 400, 300, 8); fillStroke(ctx, '#d9cdb4', 7); ctx.beginPath(); ctx.moveTo(-220, -300); ctx.lineTo(0, -380); ctx.lineTo(220, -300); ctx.closePath(); fillStroke(ctx, '#8a5a34', 7);
  for (const [wx, wy] of [[-130, -240], [-30, -240], [70, -240], [-130, -150], [70, -150]]) { rrect(ctx, wx, wy, 60, 60, 6); fillStroke(ctx, '#bfe6f8', 5); } rrect(ctx, -30, -110, 60, 110, [30, 30, 0, 0]); fillStroke(ctx, '#3a2418', 5);
  if (label) { rrect(ctx, -150, -330, 300, 46, 10); fillStroke(ctx, '#2f8f4b', 6); text(ctx, label, 0, -307, 28, '#fff'); }
  ctx.restore();
}
function plotsProp(ctx, x, y, s, t = 0) {
  // nucleus estate (big) beside smallholder plasma plots (small)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -330, -200, 380, 260, 12); fillStroke(ctx, '#7fc44a', 7); for (let i = 0; i < 12; i++) oilPalm(ctx, -300 + (i % 4) * 100, -140 + Math.floor(i / 4) * 80, .09, t + i, { age: 1, bunches: 0 });
  for (let k = 0; k < 4; k++) { const px = 90 + (k % 2) * 130, py = -190 + Math.floor(k / 2) * 130; rrect(ctx, px, py, 112, 110, 10); fillStroke(ctx, '#9bd65a', 6); for (let i = 0; i < 4; i++) oilPalm(ctx, px + 22 + (i % 2) * 56, py + 52 + Math.floor(i / 2) * 44, .08, t + i, { age: 1, bunches: 0 }); }
  text(ctx, 'INTI', -140, 100, 44, '#fff', INK, 8, 'Poppins', 700); text(ctx, 'PLASMA', 215, 100, 44, '#fff', INK, 8, 'Poppins', 700);
  ctx.restore();
}
function droneProp(ctx, x, y, s, t = 0) { ctx.save(); ctx.translate(x, y + Math.sin(t * 3) * 6); ctx.scale(s, s); rrect(ctx, -40, -14, 80, 28, 10); fillStroke(ctx, '#3a3f4a', 6); for (const sx of [-1, 1]) { line(ctx, sx * 40, -4, sx * 90, -30, 6, '#3a3f4a'); ellipse(ctx, sx * 90, -34, 44, 8 + Math.abs(Math.sin(t * 30)) * 6); fillStroke(ctx, 'rgba(180,200,220,.8)', 4); } circle(ctx, 0, 22, 10); fillStroke(ctx, '#2f63c9', 4); ctx.restore(); }
function tabletProp(ctx, x, y, s, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -90, -120, 180, 240, 18); fillStroke(ctx, '#3a3f4a', 7); rrect(ctx, -76, -104, 152, 208, 8); fillStroke(ctx, '#bfe6f8', 3); const bars = [.4, .7, .5, .9]; bars.forEach((b, i) => { rrect(ctx, -56 + i * 30, 70 - b * 120 * (.8 + .2 * Math.sin(t * 2 + i)), 20, b * 120, 4); fillStroke(ctx, i % 2 ? '#3fa35b' : '#e07a1a', 3); }); ctx.restore(); }
function flagProp(ctx, x, y, s, t, kind = 'maja', hgt = 360) {
  // Merah Putih on a pole
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -6, -hgt, 12, hgt, 5); fillStroke(ctx, '#7a5230', 5);
  const w = 190, h = 110, top = -hgt + 10, wave = i => Math.sin(t * 5 + i * .8) * 9 * (i / 8);
  const band = (y0, y1, col) => { ctx.beginPath(); for (let i = 0; i <= 8; i++) { const X = 6 + i * w / 8; i ? ctx.lineTo(X, top + y0 + wave(i)) : ctx.moveTo(X, top + y0); } for (let i = 8; i >= 0; i--) ctx.lineTo(6 + i * w / 8, top + y1 + wave(i)); ctx.closePath(); fillStroke(ctx, col, 5); };
  band(0, h / 2, '#d8312b'); band(h / 2, h, '#f6f1e8');
  ctx.restore();
}
