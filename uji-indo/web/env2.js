// ---------- Majapahit: hats, robe, props, backgrounds, text helpers ----------
const GOLD = '#f6c93a', GOLD2 = '#d9a21e';

// ---- hats (called from drawStick, character space; hr = head radius) ----
const HATS2 = {
  band(ctx, hx, hy, hr, o, lw) {
    const c = o.hatCol || '#f6f1e8';
    ctx.beginPath(); ctx.moveTo(hx - hr * .9, hy - hr * .5); ctx.quadraticCurveTo(hx, hy - hr * .88, hx + hr * .9, hy - hr * .5);
    ctx.lineCap = 'round'; ctx.lineWidth = .058; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = .036; ctx.strokeStyle = c; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(hx - hr * .9, hy - hr * .5); ctx.lineTo(hx - hr * 1.45, hy - hr * .3); ctx.lineTo(hx - hr * 1.2, hy - hr * .62); ctx.closePath(); fillStroke(ctx, c, lw);
    ctx.beginPath(); ctx.moveTo(hx - hr * .9, hy - hr * .5); ctx.lineTo(hx - hr * 1.4, hy - hr * .62); ctx.lineTo(hx - hr * 1.2, hy - hr * .35); ctx.closePath(); fillStroke(ctx, c, lw);
  },
  blangkon(ctx, hx, hy, hr, o, lw) {
    const col = o.hatCol || '#7a4524', by = hy - hr * .5;
    // back bump (mondolan)
    ellipse(ctx, hx - hr * 1.02, by - hr * .22, hr * .3, hr * .38); fillStroke(ctx, col, lw);
    const cap = () => { ctx.beginPath(); ctx.moveTo(hx - hr * .98, by + .01); ctx.arc(hx, hy, hr + .008, Math.PI + .3, -.3); ctx.quadraticCurveTo(hx + hr * .4, by + .045, hx, by + .03); ctx.quadraticCurveTo(hx - hr * .5, by + .02, hx - hr * .98, by + .01); ctx.closePath(); };
    cap(); ctx.fillStyle = col; ctx.fill();
    ctx.save(); cap(); ctx.clip();
    ctx.fillStyle = '#e8c04a'; ctx.fillRect(hx - hr * 1.2, by - .02, hr * 2.4, .035);
    ctx.fillStyle = 'rgba(40,10,0,.25)'; ctx.fillRect(hx + hr * .3, hy - hr * 1.2, hr, hr);
    ctx.fillStyle = 'rgba(255,230,160,.35)'; for (let i = -3; i <= 3; i++) { circle(ctx, hx + i * .05, by - .06 - Math.abs(i) * .004, .009); ctx.fill(); }
    ctx.restore(); cap(); fillStroke(ctx, null, lw);
  },
  crown(ctx, hx, hy, hr, o, lw) {
    const c = o.crownCol || GOLD, y0 = hy - hr * .6, h = (o.crownH || 1);
    const pts = o.makuta
      ? [[-.8, 0], [-.78, -.07], [-.5, -.1], [-.42, -.22], [-.2, -.2], [-.12, -.36], [0, -.5], [.12, -.36], [.2, -.2], [.42, -.22], [.5, -.1], [.78, -.07], [.8, 0]]
      : [[-.8, 0], [-.85, -.18], [-.45, -.08], [-.4, -.3], [0, -.12], [.4, -.3], [.45, -.08], [.85, -.18], [.8, 0]];
    ctx.beginPath(); pts.forEach(([px, py], i) => { const X = hx + px * hr * 1.05, Y = y0 + py * hr * 1.5 * h; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.closePath(); fillStroke(ctx, c, lw);
    ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(120,70,0,.22)'; ctx.fillRect(hx + hr * .25, y0 - hr * 2, hr, hr * 2.4); ctx.restore();
    rrect(ctx, hx - hr * .85, y0 - .012, hr * 1.7, .05, .02); fillStroke(ctx, GOLD2, lw);
    for (const [gx, gc] of [[-.4, '#e0392f'], [0, '#2f63c9'], [.4, '#e0392f']]) { circle(ctx, hx + gx * hr, y0 + .013, .016); fillStroke(ctx, gc, lw * .5); }
  },
  mongol(ctx, hx, hy, hr, o, lw) {
    const by = hy - hr * .5;
    if (o.plume) { ctx.beginPath(); ctx.moveTo(hx, hy - hr - .23); ctx.quadraticCurveTo(hx + .13, hy - hr - .3, hx + .15, hy - hr - .13); ctx.quadraticCurveTo(hx + .06, hy - hr - .2, hx, hy - hr - .15); ctx.closePath(); fillStroke(ctx, '#d8312b', lw); }
    // cone helmet
    const cone = () => { ctx.beginPath(); ctx.moveTo(hx - hr * 1.0, by); ctx.quadraticCurveTo(hx - hr * .75, hy - hr * 1.25, hx, hy - hr - .22); ctx.quadraticCurveTo(hx + hr * .75, hy - hr * 1.25, hx + hr * 1.0, by); ctx.closePath(); };
    cone(); ctx.fillStyle = '#a9b4c2'; ctx.fill();
    ctx.save(); cone(); ctx.clip(); ctx.fillStyle = 'rgba(40,50,80,.28)'; ctx.fillRect(hx + hr * .1, hy - hr * 2, hr, hr * 2); ctx.fillStyle = 'rgba(255,255,255,.4)'; ellipse(ctx, hx - hr * .35, hy - hr * 1.05, hr * .1, hr * .4, .3); ctx.fill(); ctx.restore();
    cone(); fillStroke(ctx, null, lw);
    circle(ctx, hx, hy - hr - .225, .018); fillStroke(ctx, '#e8c04a', lw * .6);
    // fur trim
    ctx.beginPath(); for (let i = 0; i <= 9; i++) { const px = hx - hr * 1.08 + i * hr * .24; ctx.arc(px, by + (i % 2) * .008, .036, 0, TAU); }
    ctx.fillStyle = '#6b4a33'; ctx.fill(); ctx.lineWidth = lw * .8; ctx.strokeStyle = INK; ctx.stroke();
    // ear flaps
    for (const sx of [-1, 1]) { rrect(ctx, hx + sx * hr * 1.02 - .025, by + .02, .05, .12, .02); fillStroke(ctx, '#6b4a33', lw * .8); }
  },
};
function drawRobe(ctx, o, lw) {
  const c = o.robe, trim = o.robeTrim || GOLD;
  const shape = () => { ctx.beginPath(); ctx.moveTo(-.16, -.62); ctx.lineTo(.16, -.62); ctx.quadraticCurveTo(.3, -.3, .31, -.05); ctx.lineTo(-.31, -.05); ctx.quadraticCurveTo(-.3, -.3, -.16, -.62); ctx.closePath(); };
  shape(); ctx.fillStyle = c; ctx.fill();
  ctx.save(); shape(); ctx.clip();
  ctx.fillStyle = trim; ctx.fillRect(-.4, -.09, .8, .045); ctx.fillRect(-.018, -.7, .036, .7);
  ctx.fillStyle = 'rgba(20,0,40,.22)'; ctx.fillRect(.05, -.7, .4, .8);
  ctx.restore(); shape(); fillStroke(ctx, null, lw);
}

// ---------- scene helpers ----------
const mkcam = (t, lt, o = {}) => {
  const d = o.dur || 3, k = clamp(lt / d), hh = shake(t * .35, o.shake == null ? 3 : o.shake, 1, 2);
  return { x: lerp(o.x0 == null ? 540 : o.x0, o.x1 == null ? (o.x0 == null ? 540 : o.x0) : o.x1, k) + hh[0], y: lerp(o.y0 || 960, o.y1 == null ? (o.y0 || 960) : o.y1, k) + hh[1], z: lerp(o.z0 || 1, o.z1 || (o.z0 || 1) + .05, k), r: (o.r || 0) + Math.sin(t * .5) * .004 };
};
const overlay = (ctx, fn) => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); fn(); ctx.restore(); };

function mountain(ctx, x, base, w, h, col, snow, smoke, t = 0) {
  ctx.beginPath(); ctx.moveTo(x - w / 2, base); ctx.quadraticCurveTo(x - w * .18, base - h * .35, x - w * .05, base - h); ctx.lineTo(x + w * .05, base - h); ctx.quadraticCurveTo(x + w * .18, base - h * .35, x + w / 2, base); ctx.closePath();
  fillStroke(ctx, col, 5, 'rgba(34,28,34,.55)');
  ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(20,10,50,.2)'; ctx.fillRect(x, base - h - 10, w, h + 20); ctx.restore();
  if (smoke) for (let i = 0; i < 4; i++) { const k = ((t * .25 + i * .25) % 1); puff(ctx, x + k * 40 + Math.sin(i) * 10, base - h - 20 - k * 160, 24 + k * 40, 3 + i, '#efe9e2', 3 + i, 1 - k); }
}
function hills(ctx, base, col, amp, seed, x0 = -600, x1 = 1700) {
  const R = rng(seed); ctx.beginPath(); ctx.moveTo(x0, base + 900);
  for (let x = x0; x <= x1; x += 90) ctx.lineTo(x, base - Math.sin(x * .004 + seed) * amp - R() * amp * .3);
  ctx.lineTo(x1, base + 900); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ctx.strokeStyle = 'rgba(34,28,34,.35)'; ctx.lineWidth = 4; ctx.stroke();
}
function palm(ctx, x, y, s, t = 0, lean = .15, col = '#3d9a45') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-14, 0); ctx.quadraticCurveTo(-30 + lean * 200, -150, lean * 340, -300); ctx.lineTo(lean * 340 + 14, -300); ctx.quadraticCurveTo(-4 + lean * 200, -150, 14, 0); ctx.closePath(); fillStroke(ctx, '#9a6a3a', 6);
  const tx = lean * 340 + 7, ty = -300;
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI / 2 + (i - 3) * .52 + Math.sin(t * 2 + i) * .04;
    ctx.save(); ctx.translate(tx, ty); ctx.rotate(a + Math.PI / 2);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(40, -90, 20, -170); ctx.quadraticCurveTo(-8, -90, 0, 0); ctx.closePath(); fillStroke(ctx, col, 5); ctx.restore();
  }
  circle(ctx, tx - 8, ty + 8, 11); fillStroke(ctx, '#7a4a24', 4); circle(ctx, tx + 12, ty + 10, 11); fillStroke(ctx, '#7a4a24', 4);
  ctx.restore();
}
function treeProp(ctx, x, y, s, fall = 0, col = '#3a9a44', t = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(fall); ctx.scale(s, s);
  rrect(ctx, -22, -230, 44, 230, 8); fillStroke(ctx, '#8a5a32', 6);
  for (const [bx, by, br] of [[0, -300, 100], [-70, -250, 70], [70, -250, 75], [-30, -360, 70], [40, -350, 65]]) { circle(ctx, bx + Math.sin(t * 2 + bx) * 2, by, br); fillStroke(ctx, col, 6); }
  ctx.save(); circle(ctx, 0, -300, 100); ctx.clip(); ctx.fillStyle = 'rgba(0,40,0,.18)'; ctx.fillRect(10, -420, 160, 260); ctx.restore();
  ctx.restore();
}
function groundPlane(ctx, y0, c0 = '#86cc52', c1 = '#4f9a3a', t = 0) {
  const g = ctx.createLinearGradient(0, y0, 0, y0 + 1100); g.addColorStop(0, c0); g.addColorStop(1, c1);
  ctx.fillStyle = g; ctx.fillRect(-2000, y0, 5080, 2800);
  ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.fillRect(-2000, y0, 5080, 6);
  const R = rng(9); ctx.strokeStyle = 'rgba(30,80,20,.35)'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  for (let i = 0; i < 60; i++) { const d = R(), x = R() * 2400 - 600, y = y0 + 30 + d * d * 900, s = 6 + d * 22; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x - s * .4, y - s * 1.2); ctx.moveTo(x, y); ctx.lineTo(x, y - s * 1.5); ctx.moveTo(x + s, y); ctx.lineTo(x + s * .4, y - s * 1.2); ctx.stroke(); }
}
// full outdoor backdrop. o.mood: day | fire | dusk ; o.hor horizon y; o.sea true for water instead of ground
function world(ctx, cam, t, o = {}) {
  const mood = o.mood || 'day', hor = o.hor || 880;
  const P = {
    day: ['#4fb4ee', '#d9f3fb', '#86cc52', '#4f9a3a', '#6fb1d6', '#5aa65e', '#3f8a4a'],
    dusk: ['#6a4aa0', '#ffc27a', '#c9a45a', '#8a6a34', '#a07ab0', '#8a7a4a', '#6a6a3a'],
    fire: ['#3a1238', '#ff8c3e', '#5e3a2a', '#2e1a1a', '#7a3a58', '#5a3a3a', '#3a2424'],
  }[mood];
  applyCam(ctx, cam, .08); drawSky(ctx, P[0], P[1], -500, hor + 120);
  if (mood !== 'fire') { applyCam(ctx, cam, .1); drawSun(ctx, o.sunX || 820, o.sunY || 330, 80, t, mood === 'dusk' ? 1.2 : .9); }
  applyCam(ctx, cam, .14);
  if (mood === 'fire') { for (let i = 0; i < 6; i++) drawCloud(ctx, 100 + i * 220 + t * 8, 200 + (i % 3) * 120, 130, 20 + i, .5); }
  else { drawCloud(ctx, 160 + t * 6, 280, 120, 1); drawCloud(ctx, 780 + t * 4, 170, 90, 2); drawCloud(ctx, 1100 + t * 5, 430, 70, 3, .9); }
  applyCam(ctx, cam, .25);
  mountain(ctx, 230, hor + 20, 760, 420, P[4], false, true, t); mountain(ctx, 900, hor + 20, 640, 330, mix(P[4], '#ffffff', .12), false, false);
  applyCam(ctx, cam, .4); hills(ctx, hor - 10, P[5], 50, 3);
  applyCam(ctx, cam, .6);
  if (!o.sea) { hills(ctx, hor + 40, P[6], 38, 7); }
  applyCam(ctx, cam, 1);
  if (o.sea) drawSea(ctx, hor + 20, t, 2600, o.seaPal); else groundPlane(ctx, hor + 50, P[2], P[3], t);
}
function fireProp(ctx, x, y, s, t, seed = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const R = rng(seed);
  for (let layer = 0; layer < 3; layer++) {
    const col = ['#e8481f', '#ff9a24', '#ffe14d'][layer], k = 1 - layer * .3;
    for (let i = 0; i < 3; i++) {
      const ox = (i - 1) * 34 * k, ph = R() * 6 + t * (6 + i), h = (150 + i % 2 * 50 + Math.sin(ph) * 22) * k, w = 40 * k;
      ctx.beginPath(); ctx.moveTo(ox - w, 0); ctx.quadraticCurveTo(ox - w * 1.1, -h * .5, ox + Math.sin(ph * .7) * 14, -h); ctx.quadraticCurveTo(ox + w * 1.1, -h * .5, ox + w, 0); ctx.closePath();
      fillStroke(ctx, col, layer === 0 ? 6 : 0);
    }
  }
  ctx.restore();
}
function fireRow(ctx, x0, x1, y, s, t, n = 6) { for (let i = 0; i < n; i++) fireProp(ctx, lerp(x0, x1, i / (n - 1)), y + (i % 2) * 14, s * (.8 + (i % 3) * .2), t + i, i + 1); }
function embers(ctx, t, x0, x1, y0, n = 26, seed = 4) {
  const R = rng(seed); ctx.save();
  for (let i = 0; i < n; i++) { const k = (t * (.25 + R() * .3) + R()) % 1, x = lerp(x0, x1, R()) + Math.sin(t * 2 + i) * 20; circle(ctx, x, y0 - k * 700, 3 + R() * 4); ctx.fillStyle = `rgba(255,${150 + R() * 80 | 0},60,${1 - k})`; ctx.fill(); }
  ctx.restore();
}
function bulb(ctx, x, y, s, a = 1, t = 0) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * (.6 + .4 * backOut(clamp(a))), s * (.6 + .4 * backOut(clamp(a)))); ctx.globalAlpha = clamp(a * 2);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(0, 0, 10, 0, 0, 160); g.addColorStop(0, 'rgba(255,240,150,.9)'); g.addColorStop(1, 'rgba(255,220,100,0)'); ctx.fillStyle = g; ctx.fillRect(-170, -170, 340, 340); ctx.restore();
  for (let i = 0; i < 9; i++) { const ang = i / 9 * TAU + t * .5; line(ctx, Math.cos(ang) * 74, Math.sin(ang) * 74, Math.cos(ang) * (96 + Math.sin(t * 9 + i) * 8), Math.sin(ang) * (96 + Math.sin(t * 9 + i) * 8), 7, '#ffcf2e'); }
  circle(ctx, 0, 0, 50); fillStroke(ctx, '#fff2a0', 7); ctx.beginPath(); ctx.moveTo(-14, 26); ctx.lineTo(-14, 6); ctx.lineTo(-6, -8); ctx.lineTo(0, 6); ctx.lineTo(6, -8); ctx.lineTo(14, 6); ctx.lineTo(14, 26); ctx.lineWidth = 5; ctx.strokeStyle = '#c98a1a'; ctx.stroke();
  rrect(ctx, -22, 48, 44, 34, 8); fillStroke(ctx, '#8a929e', 6); ctx.restore();
}
function qmark(ctx, x, y, s, t, a = 1, rot = 0) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y + Math.sin(t * 6) * 6); ctx.rotate(rot + Math.sin(t * 5) * .1); ctx.globalAlpha = clamp(a);
  text(ctx, '?', 0, 0, s, '#ffd23a', INK, s * .2, 'Poppins', 700); ctx.restore();
}
function exclaim(ctx, x, y, s, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); text(ctx, '!', x, y, s, '#ff4a3a', INK, s * .2, 'Poppins', 700); ctx.restore(); }
function crownProp(ctx, x, y, s, rot = 0, col = GOLD) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); [[-60, 0], [-70, -70], [-30, -35], [0, -90], [30, -35], [70, -70], [60, 0]].forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.closePath(); fillStroke(ctx, col, 7);
  rrect(ctx, -64, -4, 128, 26, 8); fillStroke(ctx, GOLD2, 6); for (const gx of [-35, 0, 35]) { circle(ctx, gx, 9, 7); fillStroke(ctx, gx ? '#e0392f' : '#2f63c9', 3); }
  ctx.restore();
}
function scrollProp(ctx, x, y, w, h, label, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  rrect(ctx, -w / 2, -h / 2, w, h, 14); fillStroke(ctx, '#f3e3b8', 6);
  for (const sx of [-1, 1]) { rrect(ctx, sx * w / 2 - 12, -h / 2 - 10, 24, h + 20, 12); fillStroke(ctx, '#b0703a', 6); }
  if (label) text(ctx, label, 0, 0, h * .3, '#6a3a1a', 'transparent', 0, 'Poppins', 700);
  ctx.restore();
}
function swordProp(ctx, x, y, len, ang, col = '#dfe6ee') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(-7, -len); ctx.lineTo(0, -len - 24); ctx.lineTo(7, -len); ctx.lineTo(9, 0); ctx.closePath(); fillStroke(ctx, col, 5);
  rrect(ctx, -26, -2, 52, 12, 5); fillStroke(ctx, GOLD2, 5); rrect(ctx, -6, 8, 12, 34, 5); fillStroke(ctx, '#6a3a22', 5);
  ctx.restore();
}
function keris(ctx, x, y, len, ang) { // wavy Javanese dagger
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(-8, 0);
  for (let i = 0; i <= 6; i++) ctx.lineTo((i % 2 ? 9 : -9) * (1 - i / 8), -len * i / 6); ctx.lineTo(0, -len - 20);
  for (let i = 6; i >= 0; i--) ctx.lineTo((i % 2 ? 1 : -1) * 9 * (1 - i / 8) * .3, -len * i / 6);
  ctx.closePath(); fillStroke(ctx, '#cfd6df', 5); rrect(ctx, -6, 4, 12, 30, 5); fillStroke(ctx, '#6a3a22', 5); ctx.restore();
}
function spearProp(ctx, x, y, len, ang) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); rrect(ctx, -5, -len, 10, len + 70, 4); fillStroke(ctx, '#8a5a32', 5);
  ctx.beginPath(); ctx.moveTo(0, -len - 60); ctx.lineTo(16, -len); ctx.lineTo(-16, -len); ctx.closePath(); fillStroke(ctx, '#dfe6ee', 5); ctx.restore();
}
function axeProp(ctx, x, y, len, ang) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); rrect(ctx, -5, -len, 10, len + 40, 4); fillStroke(ctx, '#8a5a32', 5);
  ctx.beginPath(); ctx.moveTo(5, -len + 6); ctx.quadraticCurveTo(70, -len - 20, 62, -len + 62); ctx.quadraticCurveTo(30, -len + 40, 5, -len + 44); ctx.closePath(); fillStroke(ctx, '#cfd6df', 5); ctx.restore();
}
function mugProp(ctx, x, y, s, ang = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  ctx.beginPath(); ctx.arc(26, -4, 20, -1.2, 1.2); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.stroke();
  rrect(ctx, -26, -34, 52, 60, 8); fillStroke(ctx, '#e9b44c', 6); ctx.fillStyle = '#fff'; rrect(ctx, -26, -44, 52, 18, 9); fillStroke(ctx, '#fff', 5); ctx.restore();
}
function majaFruit(ctx, x, y, s, bite = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); circle(ctx, 0, 0, 34); fillStroke(ctx, '#8ec23a', 6);
  ctx.save(); circle(ctx, 0, 0, 34); ctx.clip(); ctx.fillStyle = 'rgba(50,70,0,.22)'; ctx.fillRect(8, -40, 40, 80); ctx.fillStyle = 'rgba(60,90,0,.4)'; for (const [px, py] of [[-12, -10], [10, 12], [-6, 16], [14, -14]]) { circle(ctx, px, py, 4); ctx.fill(); } ctx.restore();
  if (bite) { circle(ctx, 30, -14, 18); ctx.fillStyle = 'rgba(0,0,0,0)'; } ctx.restore();
}
function tentProp(ctx, x, y, s, col = '#c9a14a') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-170, 0); ctx.lineTo(0, -210); ctx.lineTo(170, 0); ctx.closePath(); fillStroke(ctx, col, 7);
  ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(0, -110); ctx.lineTo(50, 0); ctx.closePath(); fillStroke(ctx, '#3a2418', 6);
  ctx.save(); ctx.beginPath(); ctx.moveTo(-170, 0); ctx.lineTo(0, -210); ctx.lineTo(170, 0); ctx.closePath(); ctx.clip(); ctx.fillStyle = 'rgba(40,10,0,.2)'; ctx.fillRect(0, -220, 200, 230); ctx.restore(); ctx.restore();
}
function hutProp(ctx, x, y, s, built = 1) { // simple Javanese hut
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const b = clamp(built); if (b <= 0) { ctx.restore(); return; }
  ctx.globalAlpha = Math.min(1, b * 2);
  rrect(ctx, -110, -130 * b, 220, 130 * b, 6); fillStroke(ctx, '#c9a064', 7);
  ctx.beginPath(); ctx.moveTo(-150, -130 * b); ctx.lineTo(0, -240 * b - 10); ctx.lineTo(150, -130 * b); ctx.closePath(); fillStroke(ctx, '#d9b14a', 7);
  rrect(ctx, -30, -90 * b, 60, 90 * b, 6); fillStroke(ctx, '#3a2418', 5); ctx.restore();
}
function flagProp(ctx, x, y, s, t, kind = 'maja', hgt = 360) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -6, -hgt, 12, hgt, 5); fillStroke(ctx, '#7a5230', 5);
  const w = 190, h = 110, top = -hgt + 10;
  const wave = i => Math.sin(t * 5 + i * .8) * 9 * (i / 8);
  const band = (y0, y1, col) => { ctx.beginPath(); for (let i = 0; i <= 8; i++) { const X = 6 + i * w / 8; i ? ctx.lineTo(X, top + y0 + wave(i)) : ctx.moveTo(X, top + y0); } for (let i = 8; i >= 0; i--) ctx.lineTo(6 + i * w / 8, top + y1 + wave(i)); ctx.closePath(); fillStroke(ctx, col, 5); };
  if (kind === 'maja') { band(0, h / 2, '#d8312b'); band(h / 2, h, '#f6f1e8'); }
  else if (kind === 'mongol') { band(0, h, '#2a4f9e'); circle(ctx, 6 + w * .5, top + h / 2 + wave(4), 24); fillStroke(ctx, GOLD, 4); }
  else { band(0, h, '#7a4bc4'); circle(ctx, 6 + w * .5, top + h / 2 + wave(4), 20); fillStroke(ctx, GOLD, 4); }
  ctx.restore();
}
// Singhasari / Majapahit split gate (candi bentar) in red brick
function gate(ctx, x, y, s, open = 1, col = '#c8553a') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const side of [-1, 1]) {
    ctx.save(); ctx.scale(side, 1);
    const g = 70 * open + 10;
    ctx.beginPath(); ctx.moveTo(g, 0); ctx.lineTo(g, -170); ctx.lineTo(g + 30, -190); ctx.lineTo(g + 30, -260); ctx.lineTo(g + 70, -280); ctx.lineTo(g + 70, -340); ctx.lineTo(g + 120, -380); ctx.lineTo(g + 160, -330); ctx.lineTo(g + 200, -300); ctx.lineTo(g + 230, -200); ctx.lineTo(g + 260, 0); ctx.closePath(); fillStroke(ctx, col, 7);
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(80,20,10,.35)'; ctx.lineWidth = 3; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(g - 10, -i * 34); ctx.lineTo(g + 300, -i * 34); ctx.stroke(); } ctx.fillStyle = 'rgba(40,0,20,.2)'; ctx.fillRect(g + 120, -420, 200, 440); ctx.restore();
    ctx.restore();
  }
  ctx.restore();
}
function throneProp(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -90, -300, 180, 300, 30); fillStroke(ctx, '#8a1f2a', 7); rrect(ctx, -110, -110, 220, 110, 14); fillStroke(ctx, GOLD, 7);
  rrect(ctx, -100, -40, 200, 40, 10); fillStroke(ctx, GOLD2, 6); circle(ctx, 0, -300, 22); fillStroke(ctx, GOLD, 6); ctx.restore();
}
function tomb(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-60, -110); ctx.arc(0, -110, 60, Math.PI, 0); ctx.lineTo(60, 0); ctx.closePath(); fillStroke(ctx, '#b9bfc8', 7);
  text(ctx, 'RIP', 0, -90, 38, '#4a5260', 'transparent', 0, 'Poppins', 700); ctx.restore();
}
function ghost(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 3) * 10); ctx.scale(s, s); ctx.globalAlpha = .85;
  ctx.beginPath(); ctx.moveTo(-50, 0); ctx.quadraticCurveTo(-60, -110, 0, -110); ctx.quadraticCurveTo(60, -110, 50, 0); for (let i = 0; i < 4; i++) ctx.lineTo(50 - (i + 1) * 25, (i % 2 ? 0 : 20)); ctx.closePath(); fillStroke(ctx, '#f2f6ff', 6);
  circle(ctx, -18, -70, 7); ctx.fillStyle = INK; ctx.fill(); circle(ctx, 18, -70, 7); ctx.fill(); ellipse(ctx, 0, -45, 9, 12); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, -128, 34, 9, 0, 0, TAU); ctx.lineWidth = 7; ctx.strokeStyle = GOLD; ctx.stroke(); ctx.restore();
}
function clapper(ctx, x, y, s, a = 1, open = 0) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = clamp(a);
  rrect(ctx, -70, -10, 140, 90, 8); fillStroke(ctx, '#2a2a30', 6); text(ctx, 'AKSI!', 0, 36, 30, '#fff', 'transparent', 0, 'Poppins', 700);
  ctx.save(); ctx.translate(-70, -10); ctx.rotate(-open * .5); rrect(ctx, 0, -34, 140, 34, 6); fillStroke(ctx, '#2a2a30', 6);
  ctx.save(); rrect(ctx, 0, -34, 140, 34, 6); ctx.clip(); ctx.fillStyle = '#fff'; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(i * 28, 0); ctx.lineTo(i * 28 + 14, 0); ctx.lineTo(i * 28 + 28, -34); ctx.lineTo(i * 28 + 14, -34); ctx.closePath(); if (i % 2 === 0) ctx.fill(); } ctx.restore(); ctx.restore(); ctx.restore();
}
function chestProp(ctx, x, y, s, label) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -60, -60, 120, 60, 8); fillStroke(ctx, '#a05a2a', 6);
  ctx.beginPath(); ctx.moveTo(-64, -60); ctx.quadraticCurveTo(0, -120, 64, -60); ctx.closePath(); fillStroke(ctx, '#8a4a22', 6); rrect(ctx, -10, -66, 20, 24, 4); fillStroke(ctx, GOLD, 4);
  if (label) text(ctx, label, 0, 26, 22, '#fff', INK, 5, 'Poppins', 700); ctx.restore();
}
// Mongol junk ship (batwing sails)
function junk(ctx, x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.6 + (o.ph || 0)) * 5 * s); ctx.rotate(Math.sin(t * 1.2 + (o.ph || 0)) * .02); ctx.scale(s * (o.flip || 1), s);
  const sail = o.sail || '#e0603a';
  for (const [mx, top, sw, sh] of [[-130, -430, 140, 200], [30, -520, 170, 250], [170, -400, 120, 170]]) {
    rrect(ctx, mx - 7, top, 14, -top, 4); fillStroke(ctx, '#7a4a2a', 5);
    ctx.beginPath(); ctx.moveTo(mx + 7, top + 20); ctx.lineTo(mx + 7 + sw, top + 30); for (let i = 0; i < 4; i++) ctx.quadraticCurveTo(mx + 7 + sw - i * sw / 4 - sw / 8, top + sh + 14, mx + 7 + sw - (i + 1) * sw / 4, top + sh); ctx.lineTo(mx + 7, top + sh - 6); ctx.closePath(); fillStroke(ctx, sail, 5);
    ctx.strokeStyle = 'rgba(90,30,10,.55)'; ctx.lineWidth = 4; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(mx + 7, top + 20 + i * sh / 5.2); ctx.lineTo(mx + 7 + sw - 4, top + 30 + i * sh / 5.2); ctx.stroke(); }
  }
  ctx.beginPath(); ctx.moveTo(-290, -150); ctx.lineTo(-210, -150); ctx.lineTo(-200, -92); ctx.lineTo(250, -92); ctx.quadraticCurveTo(330, -110, 340, -170); ctx.lineTo(320, -40); ctx.quadraticCurveTo(250, 40, 120, 46); ctx.lineTo(-180, 46); ctx.quadraticCurveTo(-270, 30, -300, -60); ctx.closePath(); fillStroke(ctx, o.hull || '#8f2e24', 6);
  ctx.save(); ctx.clip(); ctx.fillStyle = '#e8c04a'; ctx.fillRect(-400, -48, 800, 14); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-400, 6, 800, 60); ctx.restore();
  flagProp(ctx, -230, -150, .5, t, 'mongol', 200);
  ctx.fillStyle = 'rgba(255,255,255,.8)'; ellipse(ctx, 0, 48, 340, 12); ctx.fill(); ctx.restore();
}
// simplified Java (wide) as a smooth blob. glow 0..1 gold halo
const JAVA_PTS = [[-1, .05], [-.85, -.1], [-.6, -.12], [-.35, -.2], [-.1, -.18], [.1, -.24], [.3, -.3], [.5, -.2], [.75, -.18], [.95, -.1], [1, .04], [.85, .12], [.5, .14], [.1, .18], [-.3, .14], [-.65, .15], [-.9, .14]];
function blobPath(ctx, pts, sx, sy) {
  const P = pts.map(([x, y]) => [x * sx, y * sy]); ctx.beginPath();
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; const m0 = mid(P[P.length - 1], P[0]); ctx.moveTo(m0[0], m0[1]);
  for (let i = 0; i < P.length; i++) { const m = mid(P[i], P[(i + 1) % P.length]); ctx.quadraticCurveTo(P[i][0], P[i][1], m[0], m[1]); } ctx.closePath();
}
function javaMap(ctx, x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y);
  if (o.glow) { ctx.shadowColor = `rgba(255,215,80,${o.glow})`; ctx.shadowBlur = 60 * o.glow; }
  blobPath(ctx, JAVA_PTS, s, s); fillStroke(ctx, o.fill || '#8fcf5a', 8); ctx.shadowBlur = 0;
  ctx.save(); blobPath(ctx, JAVA_PTS, s, s); ctx.clip(); ctx.fillStyle = 'rgba(30,80,20,.25)'; ctx.fillRect(-s, s * .02, s * 2, s * .4); ctx.restore();
  const mk = (px, py, lab, col, a = 1) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; circle(ctx, px * s, py * s, 14); fillStroke(ctx, col, 5); if (lab) text(ctx, lab, px * s, py * s - 36, 30, '#fff', INK, 8, 'Poppins', 700); ctx.restore(); };
  (o.marks || []).forEach(m => mk(m[0], m[1], m[2], m[3], m[4] == null ? 1 : m[4]));
  ctx.restore();
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
function bubble(ctx, x, y, w, h, str, tx, ty, size = 40, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); const sc = .85 + .15 * backOut(clamp(a)); ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 36); ctx.moveTo(-30, h / 2 - 4); ctx.lineTo(tx - x, ty - y); ctx.lineTo(10, h / 2 - 4); fillStroke(ctx, '#fff', 7);
  rrect(ctx, -w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 32); ctx.fillStyle = '#fff'; ctx.fill();
  const lines = str.split('\n'); lines.forEach((L, i) => text(ctx, L, 0, (i - (lines.length - 1) / 2) * size * 1.15, size, INK, 'transparent', 0, 'Poppins', 700)); ctx.restore();
}
function nameTag(ctx, name, x, y, col, lt, delay = 0, size = 34) {
  const k = clamp((lt - delay) / .3); if (k <= 0) return; ctx.save(); ctx.translate(x, y); const sc = backOut(k); ctx.scale(sc, sc); ctx.font = `700 ${size}px Poppins`; const w = ctx.measureText(name).width + 40;
  rrect(ctx, -w / 2, -size * .8, w, size * 1.6, size * .8); fillStroke(ctx, col, 7); text(ctx, name, 0, 2, size, '#fff', INK, 0, 'Poppins', 700); ctx.restore();
}
// kinetic typography: letters pop in one by one. call inside overlay() (screen space)
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
function speedLines(ctx, t, a = 1, col = 'rgba(255,255,255,.5)') {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.strokeStyle = col; ctx.lineCap = 'round'; const R = rng(Math.floor(t * 18) + 3);
  for (let i = 0; i < 26; i++) { const ang = R() * TAU, r0 = 520 + R() * 200, r1 = r0 + 160 + R() * 240; ctx.lineWidth = 3 + R() * 6; ctx.globalAlpha = a * (.4 + R() * .6); ctx.beginPath(); ctx.moveTo(540 + Math.cos(ang) * r0, 960 + Math.sin(ang) * r0 * 1.4); ctx.lineTo(540 + Math.cos(ang) * r1, 960 + Math.sin(ang) * r1 * 1.4); ctx.stroke(); }
  ctx.restore();
}
function flash(ctx, a, col = '255,255,255') { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(${col},${clamp(a)})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function confetti(ctx, t, n = 40, seed = 2) {
  const R = rng(seed); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  for (let i = 0; i < n; i++) { const k = (t * (.3 + R() * .4) + R()) % 1, x = R() * W + Math.sin(t * 3 + i) * 30, y = -50 + k * 1700; ctx.save(); ctx.translate(x, y); ctx.rotate(t * 4 + i); ctx.fillStyle = ['#ffd23a', '#e0392f', '#3fa35b', '#2f63c9', '#fff'][i % 5]; ctx.fillRect(-9, -5, 18, 10); ctx.restore(); }
  ctx.restore();
}
// ---- presets ----
const WIJ = { cols: ['#25a06a', '#25a06a'], hat: 'blangkon', vest: '#f2c230' };
const JAYA = { cols: ['#7a4bc4', '#7a4bc4'], hat: 'crown', crownCol: '#9a5fe0', crownH: 1.15, robe: '#6a3bb0', robeTrim: GOLD, belt: false };
const MONG = { cols: ['#e7892b', '#e7892b'], hat: 'mongol', vest: '#7a3b12' };
const MONGC = Object.assign({}, MONG, { cols: ['#2a4f9e', '#2a4f9e'], plume: true, vest: '#e8c04a' });
const KEDI = { cols: ['#7a4bc4', '#7a4bc4'], hat: 'band', hatCol: '#3d2270' };
const MAJA = { cols: PAL.red, hat: 'band', hatCol: '#f6f1e8' };
const KERT = { cols: ['#d8a02a', '#d8a02a'], hat: 'crown', crownCol: GOLD, robe: '#d8a02a', robeTrim: '#fff', belt: false, headCol: '#eaf2ff' };
const C = (base, extra) => Object.assign({}, base, extra);
const walkLegs = (t, sp = 9, amp = .55) => ({ L: [Math.sin(t * sp) * amp + .05, -Math.max(0, Math.sin(t * sp + 1)) * .7], R: [-Math.sin(t * sp) * amp + .05, -Math.max(0, -Math.sin(t * sp + 1)) * .7] });
const walkArms = (t, sp = 9, amp = .6) => ({ L: [.3 - Math.sin(t * sp) * amp, -.3], R: [.3 + Math.sin(t * sp) * amp, -.3] });
const ST = (ctx, base, x, y, s, extra = {}) => drawStick(ctx, Object.assign({}, base, { x, y, s }, extra));
// a block of small soldiers. n per row, rows going back. Returns nothing.
function crowd(ctx, base, x0, x1, y, rows, s, t, o = {}) {
  const per = o.per || 6, R = rng(o.seed || 5);
  for (let r = rows - 1; r >= 0; r--) {
    const ry = y - r * (o.dy || 55), rs = s * (1 - r * (o.shrink == null ? .08 : o.shrink));
    for (let i = 0; i < per; i++) {
      const px = lerp(x0, x1, per === 1 ? .5 : i / (per - 1)) + (r % 2) * (x1 - x0) / per / 2 + (R() - .5) * 20, ph = R() * 6;
      const m = o.march ? walkLegs(t + ph, o.march, .4) : null;
      const arm = o.arms === 'up' ? { L: [2.4 + Math.sin(t * 8 + ph) * .3, .3], R: [2.4 + Math.sin(t * 8 + ph + 1) * .3, .3] } : (o.march ? walkArms(t + ph, o.march, .4) : null);
      ST(ctx, base, px, ry + (o.bounce ? -Math.abs(Math.sin(t * 7 + ph)) * 22 : 0), rs, Object.assign({ flip: o.flip || 1, legs: m || undefined, arms: arm || undefined, face: o.face || { eyes: 'normal', mouth: o.mouth || 'smile', look: [.5, 0] }, shadowScale: 1 }, o.extra || {}));
    }
  }
}
