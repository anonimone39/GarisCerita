// ---------- props for Cabai Part 3: Portuguese ships take chili to Asia ----------
function pierFront(ctx, y0) {
  ctx.fillStyle = '#b07a44'; ctx.fillRect(-1200, y0, 3500, 140); ctx.fillStyle = 'rgba(60,25,5,.25)'; for (let i = 0; i < 40; i++) ctx.fillRect(-1200 + i * 90, y0, 6, 140);
  ctx.fillStyle = '#8a5a2c'; ctx.fillRect(-1200, y0 + 140, 3500, 24); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-1200, y0, 3500, 8);
  for (let i = 0; i < 9; i++) { rrect(ctx, -100 + i * 180, y0 + 140, 26, 120, 6); fillStroke(ctx, '#6a4524', 5); }
}
function basketChili(ctx, x, y, s, n = 8, t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < n; i++) drawChiliPod(ctx, -70 + (i % 6) * 28, -34 - (i % 2) * 12 - Math.floor(i / 6) * 16, .62, -.5 + i * .31, CHILI_RED);
  ctx.beginPath(); ctx.moveTo(-100, -30); ctx.quadraticCurveTo(-98, 80, 0, 90); ctx.quadraticCurveTo(98, 80, 100, -30); ctx.closePath(); fillStroke(ctx, '#c98d56', 6);
  ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(90,50,10,.4)'; ctx.lineWidth = 4; for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(i * 22, -30); ctx.lineTo(i * 22 * .6, 90); ctx.stroke(); } for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.moveTo(-100, j * 28); ctx.lineTo(100, j * 28); ctx.stroke(); } ctx.restore();
  ellipse(ctx, 0, -30, 100, 20); fillStroke(ctx, '#d9a066', 6);
  ctx.restore();
}
function capeProp(ctx, x, y, s, t) {
  // Tanjung Harapan: a rocky headland with waves breaking at its foot
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-420, 0); ctx.lineTo(-380, -120); ctx.lineTo(-300, -170); ctx.lineTo(-250, -300); ctx.lineTo(-120, -380); ctx.lineTo(60, -400); ctx.lineTo(150, -330); ctx.lineTo(210, -230); ctx.lineTo(300, -150); ctx.lineTo(400, 0); ctx.closePath(); fillStroke(ctx, '#8d8a93', 8);
  ctx.save(); ctx.clip(); ctx.fillStyle = '#6fa85a'; ctx.beginPath(); ctx.moveTo(-300, -170); ctx.lineTo(-250, -300); ctx.lineTo(-120, -380); ctx.lineTo(60, -400); ctx.lineTo(150, -330); ctx.lineTo(210, -230); ctx.lineTo(60, -260); ctx.lineTo(-150, -260); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(30,20,50,.22)'; ctx.fillRect(40, -420, 420, 440); ctx.restore();
  ctx.strokeStyle = 'rgba(40,30,60,.35)'; ctx.lineWidth = 5; for (const [a, b, c, d] of [[-250, -120, -200, -40], [-60, -220, -30, -90], [90, -150, 120, -30]]) { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); }
  // lighthouse-style marker on top
  rrect(ctx, -40, -520, 80, 120, 8); fillStroke(ctx, '#f6f1e8', 6); ctx.beginPath(); ctx.moveTo(-52, -520); ctx.lineTo(0, -580); ctx.lineTo(52, -520); ctx.closePath(); fillStroke(ctx, '#e0392f', 6);
  rrect(ctx, -12, -490, 24, 34, 6); fillStroke(ctx, '#ffe14d', 4);
  for (let i = 0; i < 5; i++) { const ph = (t * .8 + i * .21) % 1; ctx.save(); ctx.globalAlpha = Math.sin(ph * Math.PI); circle(ctx, -380 + i * 70 + ph * 20, 20 - ph * 50, 26 + ph * 20); ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fill(); ctx.restore(); }
  ctx.restore();
}
function coinShower(ctx, t, a = 1, n = 18, seed = 3) {
  if (a <= 0) return; const R = rng(seed); ctx.save(); ctx.globalAlpha = clamp(a);
  for (let i = 0; i < n; i++) { const k = (t * (.4 + R() * .3) + R()) % 1, x = 80 + R() * 920, y = -40 + k * 1500; ctx.save(); ctx.translate(x, y); ctx.rotate(t * 4 + i); circle(ctx, 0, 0, 22); fillStroke(ctx, '#f6c93a', 5); text(ctx, '$', 0, 1, 24, '#b9861a', 'transparent', 0, 'Poppins', 700); ctx.restore(); }
  ctx.restore();
}
function indiaPalm(ctx, x, y, s, t) { drawPalm(ctx, x, y, s, t); }

const overlay = (ctx, fn) => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); fn(); ctx.restore(); };
const ST = (ctx, base, x, y, s, extra = {}) => drawStick(ctx, Object.assign({}, base, { x, y, s }, extra));
function kinetic(ctx, str, x, y, size, lt, o = {}) {
  const d = o.delay || 0, col = o.col || '#ffd23a', st = o.stagger == null ? .05 : o.stagger; ctx.font = `700 ${size}px Poppins`;
  const ws = [...str].map(ch => ctx.measureText(ch).width), tot = ws.reduce((a, b) => a + b, 0); let px = -tot / 2;
  let ex = 1; if (o.exit != null) ex = 1 - easeIn(clamp((lt - o.exit) / .25)); if (ex <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(ex, ex);
  [...str].forEach((ch, i) => {
    const k = clamp((lt - d - i * st) / .38); if (k > 0) {
      const sc = backOut(k) * (1 + (o.pulse ? Math.sin(lt * 7 + i) * .03 : 0)); ctx.save(); ctx.translate(px + ws[i] / 2, (1 - easeOut(k)) * -size * .6 + Math.sin(lt * 5 + i) * 2); ctx.rotate((1 - k) * (i % 2 ? .5 : -.5)); ctx.scale(sc, sc);
      ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 8; text(ctx, ch, 0, 0, size, col, INK, size * .2, 'Poppins', 700); ctx.shadowColor = 'transparent'; text(ctx, ch, 0, 0, size, col, INK, 0, 'Poppins', 700); ctx.restore();
    } px += ws[i];
  });
  ctx.restore();
}
