// ---------- Majapahit props: hats, robes, Java world, weapons, kinetic text ----------
// hats are drawn in stick units (head centre hx,hy radius hr), after the head outline
const HATS = {
  blangkon(ctx, hx, hy, hr, lw, o) {
    const col = o.hatCol || '#3a2618';
    const cap = () => { ctx.beginPath(); ctx.arc(hx, hy, hr + .012, Math.PI + .28, -.28); ctx.quadraticCurveTo(hx, hy - hr * .02, hx - hr * 1.0, hy - hr * .26); ctx.closePath(); };
    // mondolan (the knot at the back)
    ellipse(ctx, hx - hr * .98, hy - hr * .12, .05, .042); fillStroke(ctx, col, lw);
    cap(); ctx.fillStyle = col; ctx.fill();
    ctx.save(); cap(); ctx.clip();
    ctx.fillStyle = o.hatPat || '#c9963a';
    for (let i = -3; i <= 3; i++) for (let j = 0; j < 3; j++) { const px = hx + i * .07 + (j % 2) * .035, py = hy - hr + .04 + j * .05; ctx.beginPath(); ctx.moveTo(px, py - .016); ctx.lineTo(px + .016, py); ctx.lineTo(px, py + .016); ctx.lineTo(px - .016, py); ctx.closePath(); ctx.fill(); }
    ctx.fillStyle = '#c9963a'; ctx.fillRect(hx - hr * 1.2, hy - hr * .42, hr * 2.4, .022);
    ctx.fillStyle = 'rgba(255,255,255,.18)'; ellipse(ctx, hx - hr * .3, hy - hr * .8, hr * .3, hr * .08, -.3); ctx.fill();
    ctx.restore();
    cap(); fillStroke(ctx, null, lw);
    // front fold
    ctx.beginPath(); ctx.moveTo(hx + hr * .55, hy - hr * .52); ctx.lineTo(hx + hr * .75, hy - hr * .38); ctx.lineWidth = .01; ctx.strokeStyle = INK; ctx.stroke();
  },
  udeng(ctx, hx, hy, hr, lw, o) {
    const col = o.hatCol || '#2c5e3a';
    ctx.save(); circle(ctx, hx, hy, hr + .004); ctx.clip();
    ctx.beginPath(); ctx.moveTo(hx - hr * 1.1, hy - hr * .58); ctx.quadraticCurveTo(hx, hy - hr * .72, hx + hr * 1.1, hy - hr * .58); ctx.lineTo(hx + hr * 1.1, hy - hr * .32); ctx.quadraticCurveTo(hx, hy - hr * .46, hx - hr * 1.1, hy - hr * .32); ctx.closePath();
    ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore();
    // front peak
    path(ctx, [[hx + hr * .2, hy - hr * .64], [hx + hr * .42, hy - hr * 1.08], [hx + hr * .6, hy - hr * .6]]); fillStroke(ctx, col, lw);
  },
  crown(ctx, hx, hy, hr, lw, o) { // Majapahit gold crown
    const b = hy - hr * .72, w = hr * .78;
    path(ctx, [[hx - w, b], [hx - w * 1.05, b - .11], [hx - w * .55, b - .05], [hx - w * .25, b - .16], [hx, b - .07], [hx + w * .25, b - .16], [hx + w * .55, b - .05], [hx + w * 1.05, b - .11], [hx + w, b]]);
    fillStroke(ctx, '#f2c230', lw);
    ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(160,90,0,.25)'; ctx.fillRect(hx + w * .2, b - .2, w, .25); ctx.restore();
    rrect(ctx, hx - w * 1.02, b - .035, w * 2.04, .045, .015); fillStroke(ctx, '#e0a91f', lw);
    for (const [gx, gc] of [[-.5, '#2f9e57'], [0, '#d8312b'], [.5, '#2f63c9']]) { circle(ctx, hx + w * gx, b - .012, .016); fillStroke(ctx, gc, .008); }
  },
  crownK(ctx, hx, hy, hr, lw, o) { // Jayakatwang's tall pointed mahkota
    const b = hy - hr * .7, w = hr * .7;
    ctx.beginPath(); ctx.moveTo(hx - w, b); ctx.lineTo(hx - w * .75, b - .12); ctx.lineTo(hx - w * .4, b - .17); ctx.lineTo(hx, b - .3); ctx.lineTo(hx + w * .4, b - .17); ctx.lineTo(hx + w * .75, b - .12); ctx.lineTo(hx + w, b); ctx.closePath();
    fillStroke(ctx, '#e8b62a', lw);
    ctx.save(); ctx.clip(); ctx.fillStyle = '#b3242f'; for (let i = 0; i < 3; i++) ctx.fillRect(hx - w, b - .09 - i * .075, w * 2, .03); ctx.fillStyle = 'rgba(120,40,0,.25)'; ctx.fillRect(hx + w * .15, b - .32, w, .35); ctx.restore();
    circle(ctx, hx, b - .3, .025); fillStroke(ctx, '#d8312b', .008);
    rrect(ctx, hx - w * 1.05, b - .03, w * 2.1, .045, .015); fillStroke(ctx, '#c9921c', lw);
  },
  mongol(ctx, hx, hy, hr, lw, o) { // pointed steel helmet, red tassel, fur brim
    const steel = o.hatCol || '#9aa3ad';
    ctx.beginPath(); ctx.moveTo(hx - hr * 1.02, hy - hr * .38); ctx.quadraticCurveTo(hx - hr * 1.0, hy - hr * 1.15, hx, hy - hr * 1.62); ctx.quadraticCurveTo(hx + hr * 1.0, hy - hr * 1.15, hx + hr * 1.02, hy - hr * .38); ctx.closePath();
    fillStroke(ctx, steel, lw);
    ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(20,30,50,.22)'; ctx.fillRect(hx + hr * .25, hy - hr * 2, hr, hr * 2); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(hx - hr * .55, hy - hr * 1.5, hr * .14, hr * 1.2); ctx.restore();
    // tassel
    ctx.beginPath(); ctx.moveTo(hx, hy - hr * 1.62); ctx.quadraticCurveTo(hx - hr * .5, hy - hr * 1.75, hx - hr * .75, hy - hr * 1.35); ctx.quadraticCurveTo(hx - hr * .3, hy - hr * 1.45, hx, hy - hr * 1.55); fillStroke(ctx, '#d8312b', lw * .8);
    circle(ctx, hx, hy - hr * 1.64, .022); fillStroke(ctx, '#c9a14a', lw * .8);
    // fur brim
    rrect(ctx, hx - hr * 1.12, hy - hr * .5, hr * 2.24, hr * .26, .03); fillStroke(ctx, o.brim || '#7a5230', lw);
    ctx.save(); rrect(ctx, hx - hr * 1.12, hy - hr * .5, hr * 2.24, hr * .26, .03); ctx.clip(); ctx.strokeStyle = 'rgba(40,20,10,.45)'; ctx.lineWidth = .006; for (let i = -10; i <= 10; i++) line(ctx, hx + i * .022, hy - hr * .5, hx + i * .022 + .01, hy - hr * .24, .006, 'rgba(40,20,10,.45)'); ctx.restore();
  },
  khan(ctx, hx, hy, hr, lw, o) { // Kublai: tall red hat, thick fur brim
    ctx.beginPath(); ctx.moveTo(hx - hr * .85, hy - hr * .5); ctx.quadraticCurveTo(hx - hr * .9, hy - hr * 1.7, hx, hy - hr * 1.75); ctx.quadraticCurveTo(hx + hr * .9, hy - hr * 1.7, hx + hr * .85, hy - hr * .5); ctx.closePath();
    fillStroke(ctx, '#c43b2b', lw);
    ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(60,0,0,.25)'; ctx.fillRect(hx + hr * .2, hy - hr * 2, hr, hr * 2); ctx.restore();
    circle(ctx, hx, hy - hr * 1.78, .035); fillStroke(ctx, '#f2c230', lw);
    rrect(ctx, hx - hr * 1.15, hy - hr * .62, hr * 2.3, hr * .36, .05); fillStroke(ctx, '#e9dcc0', lw);
  },
};
function drawRobe(ctx, col, trim, lw) {
  const robe = () => { ctx.beginPath(); ctx.moveTo(-.12, -.6); ctx.lineTo(.12, -.6); ctx.lineTo(.2, -.1); ctx.quadraticCurveTo(0, -.07, -.2, -.1); ctx.closePath(); };
  robe(); ctx.fillStyle = col; ctx.fill();
  ctx.save(); robe(); ctx.clip(); ctx.fillStyle = trim; ctx.fillRect(-.02, -.62, .04, .6); ctx.fillRect(-.3, -.14, .6, .03); ctx.fillStyle = 'rgba(30,0,10,.2)'; ctx.fillRect(.04, -.62, .3, .6); ctx.restore();
  robe(); fillStroke(ctx, null, lw);
}

// ---------- weapons and hand props (stick units, used as drawStick prop callbacks) ----------
const fdir = (b, side) => [side * Math.sin(b), Math.cos(b)];
function propSpear(hand = 'R') { return (ctx, k, p) => { if (k !== hand) return; line(ctx, p[0], p[1] + .22, p[0], p[1] - .5, .022, INK); line(ctx, p[0], p[1] + .22, p[0], p[1] - .5, .01, '#8a5a32'); path(ctx, [[p[0] - .03, p[1] - .49], [p[0] + .03, p[1] - .49], [p[0], p[1] - .63]]); fillStroke(ctx, '#d7dde4', .01); ctx.beginPath(); ctx.moveTo(p[0], p[1] - .48); ctx.quadraticCurveTo(p[0] - .06, p[1] - .44, p[0] - .05, p[1] - .38); ctx.lineWidth = .02; ctx.strokeStyle = '#d8312b'; ctx.stroke(); }; }
function propSword(hand = 'R', col = '#e3e8ee', len = .32) { return (ctx, k, p, b, side) => { if (k !== hand) return; const [dx, dy] = fdir(b, side); const ex = p[0] + dx * len, ey = p[1] + dy * len; line(ctx, p[0], p[1], ex, ey, .036, INK); line(ctx, p[0], p[1], ex, ey, .018, col); line(ctx, p[0] - dy * .05, p[1] + dx * .05, p[0] + dy * .05, p[1] - dx * .05, .022, '#c9a14a'); }; }
function propKeris(hand = 'R') { return (ctx, k, p, b, side) => { if (k !== hand) return; const [dx, dy] = fdir(b, side); ctx.beginPath(); ctx.moveTo(p[0], p[1]); for (let i = 1; i <= 8; i++) { const d = i / 8 * .26, w = Math.sin(i * 1.6) * .014; ctx.lineTo(p[0] + dx * d - dy * w, p[1] + dy * d + dx * w); } ctx.lineWidth = .03; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = .013; ctx.strokeStyle = '#cfd4da'; ctx.stroke(); circle(ctx, p[0], p[1], .022); fillStroke(ctx, '#9a5a2a', .008); }; }
function propCup(hand = 'R') { return (ctx, k, p) => { if (k !== hand) return; ctx.beginPath(); ctx.moveTo(p[0] - .035, p[1] - .06); ctx.lineTo(p[0] + .035, p[1] - .06); ctx.lineTo(p[0] + .025, p[1] + .02); ctx.lineTo(p[0] - .025, p[1] + .02); ctx.closePath(); fillStroke(ctx, '#c98b3a', .01); ellipse(ctx, p[0], p[1] - .06, .035, .01); ctx.fillStyle = '#f3e4b0'; ctx.fill(); }; }
function propScroll(hand = 'R', open = 0) { return (ctx, k, p) => { if (k !== hand) return; const h = .05 + open * .16; rrect(ctx, p[0] - .05, p[1] - .02, .1, h, .01); fillStroke(ctx, '#f3e6c4', .009); if (open > .3) for (let i = 0; i < 4; i++) line(ctx, p[0] - .03, p[1] + .02 + i * .03 * open, p[0] + .03, p[1] + .02 + i * .03 * open, .006, '#9a7a4a'); rrect(ctx, p[0] - .065, p[1] - .035, .13, .03, .012); fillStroke(ctx, '#c9a14a', .008); }; }
function propFruit(hand = 'R', bite = 0) { return (ctx, k, p) => { if (k !== hand) return; drawMajaUnit(ctx, p[0], p[1] - .03, .055, bite); }; }
function propBox(hand = 'R') { return (ctx, k, p) => { if (k !== hand) return; rrect(ctx, p[0] - .07, p[1] - .12, .14, .12, .01); fillStroke(ctx, '#d8312b', .01); line(ctx, p[0], p[1] - .12, p[0], p[1], .02, '#f2c230'); ctx.beginPath(); ctx.arc(p[0] - .025, p[1] - .135, .025, 0, TAU); ctx.arc(p[0] + .025, p[1] - .135, .025, 0, TAU); ctx.lineWidth = .012; ctx.strokeStyle = '#f2c230'; ctx.stroke(); }; }
function combo(...fs) { return (ctx, k, p, b, side) => fs.forEach(f => f && f(ctx, k, p, b, side)); }
function drawMajaUnit(ctx, x, y, r, bite = 0) {
  circle(ctx, x, y, r); fillStroke(ctx, '#7fb844', r * .16);
  ctx.save(); circle(ctx, x, y, r); ctx.clip(); ctx.fillStyle = 'rgba(40,70,10,.3)'; ctx.fillRect(x + r * .2, y - r, r, r * 2); ctx.fillStyle = 'rgba(255,255,255,.35)'; ellipse(ctx, x - r * .35, y - r * .4, r * .3, r * .18, -.5); ctx.fill(); ctx.restore();
  if (bite > 0) { circle(ctx, x + r * .85, y - r * .3, r * .45 * bite); ctx.fillStyle = '#f4e9b8'; ctx.fill(); ctx.lineWidth = r * .1; ctx.strokeStyle = INK; ctx.stroke(); }
  line(ctx, x, y - r, x + r * .1, y - r * 1.3, r * .14, '#6a4a2a');
}

// ---------- world ----------
function drawHills(ctx, base, cols = ['#9ccf8a', '#6fb46a', '#4f9a55'], t = 0) {
  const layers = [[base - 120, 260, cols[0], 1], [base - 60, 200, cols[1], 2], [base, 150, cols[2], 3]];
  for (const [y, amp, col, seed] of layers) {
    const R = rng(seed + 20); ctx.beginPath(); ctx.moveTo(-1200, y + 600);
    for (let x = -1200; x <= 2300; x += 140) ctx.lineTo(x, y - Math.abs(Math.sin(x * .004 + seed)) * amp * (.5 + R() * .5));
    ctx.lineTo(2300, y + 600); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  }
}
function drawVolcano(ctx, x, base, w, h, col = '#7f9cc0', smoke = true, t = 0) {
  ctx.beginPath(); ctx.moveTo(x - w, base); ctx.quadraticCurveTo(x - w * .35, base - h * .6, x - w * .12, base - h); ctx.lineTo(x + w * .12, base - h); ctx.quadraticCurveTo(x + w * .35, base - h * .6, x + w, base); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(x - w, base - h, w * .9, h); ctx.restore();
  if (smoke) for (let i = 0; i < 3; i++) { const k = ((t * .15 + i / 3) % 1); puff(ctx, x + k * 60, base - h - 30 - k * 160, 30 + k * 40, t, '#eef2f6', 30 + i, (1 - k) * .7); }
}
function drawGround(ctx, horizon, top = '#8fcf5e', bot = '#5fae45') {
  const g = ctx.createLinearGradient(0, horizon, 0, horizon + 1200); g.addColorStop(0, top); g.addColorStop(1, bot);
  ctx.fillStyle = g; ctx.fillRect(-2000, horizon, 5080, 3000);
  const R = rng(77); ctx.strokeStyle = 'rgba(40,90,30,.35)'; ctx.lineCap = 'round';
  for (let i = 0; i < 70; i++) { const d = R(); const y = horizon + 20 + d * d * 1100; const x = R() * 2400 - 650; const s = .4 + d * 1.5; ctx.lineWidth = 2 + s * 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 6 * s, y - 16 * s); ctx.moveTo(x, y); ctx.lineTo(x + 5 * s, y - 18 * s); ctx.stroke(); }
}
function drawSand(ctx, y0, y1 = 2600) { const g = ctx.createLinearGradient(0, y0, 0, y0 + 700); g.addColorStop(0, '#f4dc9c'); g.addColorStop(1, '#e2bd72'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-2000, y0 + 30); for (let x = -2000; x <= 3080; x += 120) ctx.lineTo(x, y0 + Math.sin(x * .01) * 14); ctx.lineTo(3080, y1); ctx.lineTo(-2000, y1); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(-2000, y0 - 6, 5080, 8); }
function drawTree(ctx, x, y, s, seed = 1, sway = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-22, 0); ctx.quadraticCurveTo(-14, -150, -10 + sway * 10, -300); ctx.lineTo(12 + sway * 10, -300); ctx.quadraticCurveTo(16, -150, 24, 0); ctx.closePath(); fillStroke(ctx, '#8a5a32', 5);
  ctx.translate(sway * 14, -330); const R = rng(seed);
  const blobs = []; for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + R(); blobs.push([Math.cos(a) * 85 * (.7 + R() * .4), Math.sin(a) * 60 * (.7 + R() * .4), 70 + R() * 30]); } blobs.push([0, -20, 95]);
  ctx.beginPath(); blobs.forEach(b => { ctx.moveTo(b[0] + b[2], b[1]); ctx.arc(b[0], b[1], b[2], 0, TAU); }); ctx.lineWidth = 10; ctx.strokeStyle = INK; ctx.stroke();
  ctx.beginPath(); blobs.forEach(b => { ctx.moveTo(b[0] + b[2], b[1]); ctx.arc(b[0], b[1], b[2], 0, TAU); }); ctx.fillStyle = '#3f9a4a'; ctx.fill();
  ctx.beginPath(); blobs.forEach(b => { ctx.moveTo(b[0] + b[2] * .6 - 15, b[1] - 20); ctx.arc(b[0] - 15, b[1] - 20, b[2] * .55, 0, TAU); }); ctx.fillStyle = 'rgba(160,230,120,.35)'; ctx.fill();
  if (seed % 2) for (let i = 0; i < 4; i++) drawMajaUnit(ctx, -60 + i * 40, 30 + (i % 2) * 25, 16);
  ctx.restore();
}
function drawStump(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -26, -40, 52, 40, 6); fillStroke(ctx, '#8a5a32', 5); ellipse(ctx, 0, -40, 26, 9); fillStroke(ctx, '#e3b878', 4); ctx.restore(); }
function drawHut(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const px of [-90, 90]) { rrect(ctx, px - 8, -60, 16, 60, 3); fillStroke(ctx, '#8a5a32', 4); }
  rrect(ctx, -110, -170, 220, 110, 6); fillStroke(ctx, '#d9b06a', 5);
  ctx.save(); rrect(ctx, -110, -170, 220, 110, 6); ctx.clip(); ctx.strokeStyle = 'rgba(120,80,30,.6)'; ctx.lineWidth = 3; for (let i = -100; i < 110; i += 22) line(ctx, i, -170, i, -60, 3, 'rgba(120,80,30,.6)'); ctx.restore();
  rrect(ctx, -25, -140, 50, 80, 4); fillStroke(ctx, '#5a3a22', 4);
  path(ctx, [[-150, -160], [0, -290], [150, -160]]); fillStroke(ctx, '#b8863e', 5);
  ctx.save(); path(ctx, [[-150, -160], [0, -290], [150, -160]]); ctx.clip(); for (let i = 0; i < 7; i++) line(ctx, -150, -165 - i * 18, 150, -165 - i * 18, 3, 'rgba(110,70,20,.5)'); ctx.restore();
  ctx.restore();
}
function drawGate(ctx, x, y, s, col = '#b5523a', fire = 0, t = 0) { // candi bentar: split red brick gate
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const side of [-1, 1]) {
    ctx.save(); ctx.scale(side, 1);
    const tiers = [[60, 260, 0], [80, 230, 70], [100, 190, 140], [120, 150, 200], [140, 110, 250], [160, 70, 290]];
    path(ctx, [[40, 0], [260, 0], [250, -70], [230, -70], [225, -140], [200, -140], [190, -200], [170, -200], [160, -250], [140, -250], [120, -300], [100, -330], [80, -300], [60, -250], [50, -140], [40, -70]]);
    fillStroke(ctx, col, 6);
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(80,20,10,.35)'; ctx.lineWidth = 3; for (let yy = -20; yy > -330; yy -= 24) line(ctx, 0, yy, 280, yy, 3, 'rgba(80,20,10,.35)'); ctx.fillStyle = 'rgba(60,10,0,.22)'; ctx.fillRect(160, -340, 140, 340); ctx.restore();
    ctx.restore();
  }
  if (fire > 0) { drawFire(ctx, -170, -60, 1.1 * fire, t, 1); drawFire(ctx, 190, -150, .9 * fire, t, 2); drawFire(ctx, 80, -280, .7 * fire, t, 3); }
  ctx.restore();
}
function drawFire(ctx, x, y, s, t, seed = 1) {
  if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const R = rng(seed);
  for (const [col, sc, lw] of [['#ff5a1f', 1, 6], ['#ffb12a', .7, 0], ['#fff1a0', .4, 0]]) {
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const ox = (i - 1.5) * 40 * sc, h = (140 + R() * 60) * sc * (1 + .18 * Math.sin(t * 13 + i * 2 + seed)), w = 46 * sc;
      ctx.moveTo(ox - w, 0); ctx.quadraticCurveTo(ox - w * .9, -h * .5, ox + Math.sin(t * 9 + i) * 10 * sc, -h); ctx.quadraticCurveTo(ox + w * .9, -h * .5, ox + w, 0); ctx.closePath();
    }
    ctx.fillStyle = col; ctx.fill(); if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = '#7a1a0a'; ctx.stroke(); ctx.fillStyle = col; ctx.fill(); }
  }
  ctx.restore();
}
function embers(ctx, t, n = 30, seed = 9, area = [0, 400, 1080, 1800]) {
  const R = rng(seed); ctx.save();
  for (let i = 0; i < n; i++) { const x0 = area[0] + R() * (area[2] - area[0]), sp = 60 + R() * 120, ph = R() * 10; const y = area[3] - ((t * sp + ph * 100) % (area[3] - area[1])); const x = x0 + Math.sin(t * 2 + ph) * 30; circle(ctx, x, y, 4 + R() * 6); ctx.fillStyle = `rgba(255,${150 + R() * 80 | 0},60,${.5 + R() * .4})`; ctx.fill(); }
  ctx.restore();
}
function drawJunk(ctx, x, y, s, t, o = {}) { // Yuan war junk
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.5 + (o.ph || 0)) * 5 * s); ctx.rotate(Math.sin(t * 1.1 + (o.ph || 0)) * .02); ctx.scale(s * (o.flip || 1), s);
  const sail = o.sail || '#c8553a';
  for (const [mx, top, w] of [[-90, -420, 170], [80, -500, 200]]) {
    rrect(ctx, mx - 7, top, 14, -top, 4); fillStroke(ctx, '#7a4a2a', 5);
    ctx.beginPath(); ctx.moveTo(mx - w * .45, top + 20); ctx.lineTo(mx + w * .55, top + 10); ctx.quadraticCurveTo(mx + w * .7, top + 200, mx + w * .55, -130); ctx.lineTo(mx - w * .45, -130); ctx.quadraticCurveTo(mx - w * .55, top + 200, mx - w * .45, top + 20); ctx.closePath(); fillStroke(ctx, sail, 5);
    ctx.save(); ctx.clip(); for (let yy = top + 60; yy < -130; yy += 50) line(ctx, mx - w, yy, mx + w, yy - 6, 5, '#5a2a1a'); ctx.fillStyle = 'rgba(60,10,0,.2)'; ctx.fillRect(mx + w * .1, top, w, 500); ctx.restore();
  }
  ctx.beginPath(); ctx.moveTo(-300, -170); ctx.lineTo(-220, -110); ctx.lineTo(220, -110); ctx.lineTo(320, -190); ctx.lineTo(290, -20); ctx.quadraticCurveTo(200, 50, 0, 50); ctx.quadraticCurveTo(-220, 50, -280, -30); ctx.closePath(); fillStroke(ctx, o.hull || '#6b3d24', 5);
  ctx.save(); ctx.clip(); ctx.fillStyle = '#d6a24a'; ctx.fillRect(-400, -60, 800, 14); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-400, 10, 800, 50); ctx.restore();
  circle(ctx, 240, -90, 22); fillStroke(ctx, '#f3ead4', 4); circle(ctx, 245, -90, 9); ctx.fillStyle = INK; ctx.fill(); // painted eye on the bow
  ctx.fillStyle = 'rgba(255,255,255,.75)'; ellipse(ctx, 0, 50, 330, 11); ctx.fill();
  ctx.restore();
}
function drawTent(ctx, x, y, s, col = '#f1ead8') { // Mongol ger
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -150, -150, 300, 150, 10); fillStroke(ctx, col, 6);
  ctx.beginPath(); ctx.moveTo(-165, -140); ctx.quadraticCurveTo(0, -300, 165, -140); ctx.closePath(); fillStroke(ctx, col, 6);
  ctx.save(); rrect(ctx, -150, -150, 300, 150, 10); ctx.clip(); ctx.fillStyle = '#2f63c9'; ctx.fillRect(-160, -120, 320, 14); ctx.fillStyle = 'rgba(40,30,20,.18)'; ctx.fillRect(40, -160, 200, 200); ctx.restore();
  rrect(ctx, -35, -110, 70, 110, 6); fillStroke(ctx, '#c43b2b', 5);
  circle(ctx, 0, -250, 14); fillStroke(ctx, '#c9a14a', 4);
  ctx.restore();
}
function drawSign(ctx, x, y, s, str, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = clamp(a);
  rrect(ctx, -10, -170, 20, 170, 4); fillStroke(ctx, '#8a5a32', 5);
  ctx.font = '700 46px Poppins'; const w = Math.max(200, ctx.measureText(str).width + 60);
  rrect(ctx, -w / 2, -250, w, 100, 10); fillStroke(ctx, '#d9a560', 6);
  ctx.save(); rrect(ctx, -w / 2, -250, w, 100, 10); ctx.clip(); ctx.fillStyle = 'rgba(120,70,20,.2)'; ctx.fillRect(-w, -205, w * 2, 6); ctx.restore();
  text(ctx, str, 0, -198, 46, '#4a2a12', null, 0, 'Poppins', 700);
  ctx.restore();
}
function drawBulb(ctx, x, y, r, on = 1, t = 0) {
  if (on > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, r * .3, x, y, r * 3.2); g.addColorStop(0, `rgba(255,240,150,${.7 * on})`); g.addColorStop(1, 'rgba(255,220,100,0)'); ctx.fillStyle = g; ctx.fillRect(x - r * 4, y - r * 4, r * 8, r * 8); ctx.restore();
    for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + t; line(ctx, x + Math.cos(a) * r * 1.35, y + Math.sin(a) * r * 1.35, x + Math.cos(a) * r * (1.6 + .2 * on), y + Math.sin(a) * r * (1.6 + .2 * on), r * .12, `rgba(255,200,40,${on})`); } }
  circle(ctx, x, y, r); fillStroke(ctx, on > 0 ? mix('#fffbe0', '#ffe36a', on) : '#e8eef2', r * .1);
  ctx.beginPath(); ctx.moveTo(x - r * .25, y + r * .1); ctx.lineTo(x - r * .1, y - r * .25); ctx.lineTo(x + r * .1, y + r * .1); ctx.lineTo(x + r * .25, y - r * .25); ctx.lineWidth = r * .07; ctx.strokeStyle = '#c98b2a'; ctx.stroke();
  rrect(ctx, x - r * .45, y + r * .82, r * .9, r * .5, r * .1); fillStroke(ctx, '#9aa3ad', r * .1);
}
function drawPouch(ctx, x, y, s, open = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-40, -70); ctx.quadraticCurveTo(-90, 0, -60, 40); ctx.quadraticCurveTo(0, 70, 60, 40); ctx.quadraticCurveTo(90, 0, 40, -70); ctx.closePath(); fillStroke(ctx, '#b07a44', 6);
  ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(60,20,0,.25)'; ctx.fillRect(10, -80, 100, 160); ctx.restore();
  ellipse(ctx, 0, -72, 44, 12 + open * 10); fillStroke(ctx, '#7a4a22', 5);
  line(ctx, -40, -60, 40, -60, 6, '#e8c04a');
  ctx.restore();
}
function drawMoth(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const f = Math.sin(t * 30) * .5 + .5; ellipse(ctx, -16, -4, 18, 10 + f * 6, -.4); fillStroke(ctx, '#cbb8a0', 3); ellipse(ctx, 16, -4, 18, 10 + f * 6, .4); fillStroke(ctx, '#cbb8a0', 3); ellipse(ctx, 0, 0, 5, 14); fillStroke(ctx, '#7a6250', 3); ctx.restore(); }
function drawCoin(ctx, x, y, r, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.cos(rot), 1); circle(ctx, 0, 0, r); fillStroke(ctx, '#f2c230', r * .14); rrect(ctx, -r * .25, -r * .25, r * .5, r * .5, 2); ctx.lineWidth = r * .1; ctx.strokeStyle = '#b8861a'; ctx.stroke(); ctx.restore(); }
function drawNet(ctx, x, y, w, h) { ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, w / 2, h / 2, 0, 0, TAU); ctx.clip(); ctx.strokeStyle = '#6b4a2a'; ctx.lineWidth = 7; for (let i = -12; i <= 12; i++) { line(ctx, x + i * 40 - h, y - h, x + i * 40 + h, y + h, 7, '#6b4a2a'); line(ctx, x + i * 40 + h, y - h, x + i * 40 - h, y + h, 7, '#6b4a2a'); } ctx.restore(); ctx.beginPath(); ctx.ellipse(x, y, w / 2, h / 2, 0, 0, TAU); ctx.lineWidth = 10; ctx.strokeStyle = '#6b4a2a'; ctx.stroke(); }

// ---------- maps ----------
const JAVA = [[0, .35], [.08, .25], [.2, .22], [.32, .28], [.45, .24], [.58, .3], [.7, .27], [.82, .32], [.92, .3], [1, .4], [.95, .5], [.85, .55], [.72, .52], [.6, .58], [.45, .55], [.3, .6], [.18, .56], [.06, .52]];
const MADURA = [[.76, .2], [.86, .19], [.93, .22], [.88, .25], [.78, .25]];
function islandPath(ctx, pts, x, y, w, h) { ctx.beginPath(); pts.forEach(([px, py], i) => { const X = x + px * w, Y = y + py * h; if (!i) ctx.moveTo(X, Y); else { const [qx, qy] = pts[i - 1]; ctx.quadraticCurveTo(x + qx * w, y + qy * h, (X + x + qx * w) / 2, (Y + y + qy * h) / 2); } }); ctx.closePath(); }
function drawJavaMap(ctx, x, y, w, o = {}) { // top-left x,y; markers in normalised coords
  const h = w * .7;
  rrect(ctx, x - 40, y - 40, w + 80, h + 80, 26); fillStroke(ctx, o.paper || '#f3e2b8', 8);
  ctx.save(); rrect(ctx, x - 40, y - 40, w + 80, h + 80, 26); ctx.clip(); ctx.fillStyle = 'rgba(80,160,200,.28)'; ctx.fillRect(x - 40, y - 40, w + 80, h + 80);
  ctx.strokeStyle = 'rgba(60,120,160,.25)'; ctx.lineWidth = 3; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(x - 40, y + i * h / 7); ctx.quadraticCurveTo(x + w / 2, y + i * h / 7 + 20, x + w + 40, y + i * h / 7); ctx.stroke(); } ctx.restore();
  for (const pts of [JAVA, MADURA]) { islandPath(ctx, pts, x, y, w, h); fillStroke(ctx, o.land || '#9ccf72', 7); }
  ctx.save(); islandPath(ctx, JAVA, x, y, w, h); ctx.clip(); ctx.fillStyle = 'rgba(40,90,20,.18)'; ctx.fillRect(x, y + h * .45, w, h); ctx.restore();
  for (const m of o.marks || []) {
    const mx = x + m.p[0] * w, my = y + m.p[1] * h, a = m.a == null ? 1 : m.a; if (a <= 0) continue;
    ctx.save(); ctx.globalAlpha = clamp(a); const sc = backOut(clamp(a));
    ctx.translate(mx, my); ctx.scale(sc, sc);
    if (m.x) { line(ctx, -26, -26, 26, 26, 12, '#d8312b'); line(ctx, 26, -26, -26, 26, 12, '#d8312b'); }
    else { ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-26, -30, -22, -48); ctx.arc(0, -48, 22, Math.PI, 0); ctx.quadraticCurveTo(26, -30, 0, 0); fillStroke(ctx, m.col || '#d8312b', 5); circle(ctx, 0, -48, 9); ctx.fillStyle = '#fff'; ctx.fill(); }
    if (m.label) text(ctx, m.label, 0, m.below ? 48 : -100, m.size || 38, '#fff', INK, 9, 'Poppins', 700);
    ctx.restore();
  }
}
const NUSA = {
  sumatra: [[0, .05], [.1, .12], [.2, .26], [.28, .4], [.31, .5], [.27, .52], [.18, .42], [.08, .28], [.01, .15]],
  java: [[.3, .55], [.38, .53], [.48, .56], [.52, .6], [.42, .62], [.32, .6]],
  nusa: [[.54, .6], [.6, .6], [.66, .62], [.72, .62], [.7, .65], [.6, .65], [.54, .64]],
  borneo: [[.35, .2], [.45, .12], [.55, .16], [.57, .28], [.52, .42], [.42, .44], [.35, .35]],
  sulawesi: [[.62, .2], [.68, .18], [.66, .28], [.72, .32], [.67, .34], [.68, .46], [.63, .42], [.6, .3]],
  maluku: [[.78, .3], [.82, .28], [.83, .36], [.79, .37]],
  papua: [[.85, .3], [.95, .33], [1, .42], [.98, .55], [.9, .5], [.86, .42]],
};
function drawNusantara(ctx, x, y, w, glow = 1, t = 0) {
  const h = w * .7, order = ['java', 'nusa', 'sumatra', 'borneo', 'sulawesi', 'maluku', 'papua'];
  order.forEach((k, i) => {
    const a = clamp(glow * order.length - i);
    islandPath(ctx, NUSA[k], x, y, w, h);
    if (a > 0) { ctx.save(); ctx.shadowColor = `rgba(255,210,80,${.9 * a})`; ctx.shadowBlur = 40 * a; ctx.fillStyle = mix('#7fae6a', '#ffd34d', a); ctx.fill(); ctx.restore(); }
    else { ctx.fillStyle = '#7fae6a'; ctx.fill(); }
    ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke();
  });
}

// ---------- on-screen text ----------
function nameTag(ctx, x, y, str, col = '#2f9e57', a = 1, size = 50) { // a: 0..1 appear progress
  if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(x, y); const sc = backOut(clamp(a)); ctx.scale(sc, sc); ctx.globalAlpha = clamp(a * 2);
  ctx.font = `700 ${size}px Poppins`; const w = ctx.measureText(str).width + size * 1.1, h = size * 1.6;
  path(ctx, [[-14, h / 2 - 2], [14, h / 2 - 2], [0, h / 2 + 22]]); fillStroke(ctx, col, 6);
  rrect(ctx, -w / 2, -h / 2, w, h, h / 2); fillStroke(ctx, col, 6);
  text(ctx, str, 0, 2, size, '#fff', null, 0, 'Poppins', 700);
  ctx.restore();
}
function kinetic(ctx, str, x, y, size, lt, t0, o = {}) { // pop-in headline in screen space
  const k = lt - t0; if (k < 0) return; const out = o.out != null ? clamp((lt - o.out) / .25) : 0; if (out >= 1) return;
  const sc = backOut(clamp(k / .35)) * (1 + .03 * Math.sin(k * 4)) * (1 - out * .4);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(x, y); ctx.rotate((o.rot || -.04) * (1 - clamp(k / .5) * .5)); ctx.scale(sc, sc); ctx.globalAlpha = 1 - out;
  if (o.burst) burst(ctx, 0, 0, size * 1.6, 14, o.burst, 21, .7);
  ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 8;
  text(ctx, str, 0, 0, size, o.fill || '#ffd23a', INK, size * .16, 'Poppins', 700);
  ctx.shadowColor = 'transparent'; text(ctx, str, 0, 0, size, o.fill || '#ffd23a', INK, 0, 'Poppins', 700);
  ctx.restore();
}
function qmark(ctx, x, y, s, t, a = 1, ch = '?') { if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y + Math.sin(t * 5) * 8); ctx.rotate(Math.sin(t * 3) * .15); text(ctx, ch, 0, 0, s, '#fff', INK, s * .14, 'Poppins', 700); ctx.restore(); }
function speedLines(ctx, a, t, dir = 1) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a * .5; const R = rng(5); for (let i = 0; i < 26; i++) { const y = R() * H, x = ((R() * W * 2 - t * 2600 * dir) % (W * 1.6) + W * 1.6) % (W * 1.6) - W * .3; line(ctx, x, y, x + 220 + R() * 200, y, 4 + R() * 6, '#fff'); } ctx.restore(); }
function confetti(ctx, t, a = 1, seed = 4) { if (a <= 0) return; const R = rng(seed); const cols = ['#ffd23a', '#d8312b', '#2f9e57', '#2f63c9', '#fff']; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); for (let i = 0; i < 70; i++) { const x = R() * W, sp = 200 + R() * 300, y = ((R() * H + t * sp) % (H + 100)) - 50; ctx.save(); ctx.translate(x + Math.sin(t * 3 + i) * 30, y); ctx.rotate(t * 4 + i); ctx.fillStyle = cols[i % 5]; ctx.fillRect(-10, -5, 20, 10); ctx.restore(); } ctx.restore(); }
function tintScreen(ctx, col, a) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function flash(ctx, a) { tintScreen(ctx, '#fff', a); }
