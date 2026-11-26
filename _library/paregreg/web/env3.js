// ---------- Bubat (Part 2) props: hats, hearts, keris, paper, maps, halls ----------
function flowerAt(ctx, x, y, r, col = '#ff8fb3') {
  for (let i = 0; i < 5; i++) { const a = i / 5 * TAU; circle(ctx, x + Math.cos(a) * r, y + Math.sin(a) * r, r * .7); fillStroke(ctx, col, Math.max(.003, r * .18)); }
  circle(ctx, x, y, r * .55); fillStroke(ctx, '#ffd23a', Math.max(.003, r * .15));
}
HATS.iketSunda = function (ctx, hx, hy, hr, lw, o) { // Sundanese iket: blue cloth with white stripes, knot at the front
  const main = o.hatCol || '#2f63c9', pat = o.hatPat || '#f6f1e8';
  const cap = () => { ctx.beginPath(); ctx.arc(hx, hy, hr + .01, Math.PI + .32, -.32); ctx.quadraticCurveTo(hx, hy - hr * .1, hx - hr * 1.0, hy - hr * .3); ctx.closePath(); };
  cap(); ctx.fillStyle = main; ctx.fill();
  ctx.save(); cap(); ctx.clip(); ctx.fillStyle = pat;
  for (let i = -5; i <= 5; i++) { ctx.save(); ctx.translate(hx + i * .07, hy - hr); ctx.rotate(.5); ctx.fillRect(-.011, -.1, .022, .36); ctx.restore(); }
  ctx.fillStyle = 'rgba(0,0,40,.2)'; ctx.fillRect(hx + hr * .3, hy - hr - .02, hr, hr); ctx.restore();
  cap(); fillStroke(ctx, null, lw);
  path(ctx, [[hx + hr * .28, hy - hr * .72], [hx + hr * .55, hy - hr * 1.3], [hx + hr * .8, hy - hr * .55]]); fillStroke(ctx, main, lw);
  line(ctx, hx + hr * .55, hy - hr * 1.2, hx + hr * .56, hy - hr * .75, .01, pat);
};
HATS.komandan = function (ctx, hx, hy, hr, lw, o) { // commander helmet: bronze dome, red band, plume
  const steel = o.hatCol || '#a9793a';
  const dome = () => { ctx.beginPath(); ctx.moveTo(hx - hr * 1.06, hy - hr * .3); ctx.quadraticCurveTo(hx - hr * 1.05, hy - hr * 1.3, hx, hy - hr * 1.36); ctx.quadraticCurveTo(hx + hr * 1.05, hy - hr * 1.3, hx + hr * 1.06, hy - hr * .3); ctx.closePath(); };
  ctx.beginPath(); ctx.moveTo(hx, hy - hr * 1.34); ctx.quadraticCurveTo(hx - hr * .15, hy - hr * 1.95, hx + hr * .55, hy - hr * 1.85); ctx.quadraticCurveTo(hx + hr * .2, hy - hr * 1.6, hx + hr * .16, hy - hr * 1.34); fillStroke(ctx, '#d8312b', lw * .9);
  dome(); fillStroke(ctx, steel, lw);
  ctx.save(); dome(); ctx.clip(); ctx.fillStyle = 'rgba(60,20,0,.28)'; ctx.fillRect(hx + hr * .25, hy - hr * 2, hr, hr * 2); ctx.fillStyle = 'rgba(255,240,200,.4)'; ctx.fillRect(hx - hr * .6, hy - hr * 1.3, hr * .13, hr); ctx.restore();
  rrect(ctx, hx - hr * 1.1, hy - hr * .58, hr * 2.2, hr * .22, .02); fillStroke(ctx, '#b3242f', lw);
  circle(ctx, hx, hy - hr * .47, .02); fillStroke(ctx, '#f2c230', lw * .7);
};
HATS.flowers = function (ctx, hx, hy, hr, lw, o) { // flower crown
  ctx.beginPath(); ctx.arc(hx, hy, hr + .012, Math.PI + .45, -.45); ctx.lineWidth = .03; ctx.strokeStyle = '#3f9a4a'; ctx.lineCap = 'round'; ctx.stroke();
  const cols = ['#ff8fb3', '#ffffff', '#ffd23a', '#ff6b9a', '#ffffff'];
  for (let i = 0; i < 7; i++) { const a = Math.PI + .55 + i * (Math.PI - 1.1) / 6; flowerAt(ctx, hx + Math.cos(a) * (hr + .012), hy + Math.sin(a) * (hr + .012), .03 + (i % 2) * .008, cols[i % 5]); }
};
function drawSash(ctx, col, lw) { // selendang across the torso
  path(ctx, [[-.13, -.6], [-.05, -.62], [.14, -.3], [.04, -.27]]); fillStroke(ctx, col, lw);
  path(ctx, [[.04, -.28], [.14, -.31], [.18, -.1], [.07, -.08]]); fillStroke(ctx, col, lw);
}
function propKerisBig(hand = 'R', len = .5) {
  return (ctx, k, p, b, side) => {
    if (k !== hand) return; const [dx, dy] = fdir(b, side);
    ctx.beginPath(); for (let i = 0; i <= 12; i++) { const d = i / 12 * len, w = Math.sin(i * 1.5) * .02; const X = p[0] + dx * d - dy * w, Y = p[1] + dy * d + dx * w; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
    ctx.lineWidth = .045; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = .022; ctx.strokeStyle = '#d6dbe2'; ctx.stroke();
    line(ctx, p[0] - dy * .05, p[1] + dx * .05, p[0] + dy * .05, p[1] - dx * .05, .03, '#c9a14a'); circle(ctx, p[0], p[1], .028); fillStroke(ctx, '#7a4a22', .01);
  };
}
function heartPath(ctx, s) {
  ctx.beginPath(); ctx.moveTo(0, .9 * s); ctx.bezierCurveTo(-.2 * s, .7 * s, -s, .2 * s, -s, -.3 * s); ctx.bezierCurveTo(-s, -.8 * s, -.3 * s, -.9 * s, 0, -.4 * s);
  ctx.bezierCurveTo(.3 * s, -.9 * s, s, -.8 * s, s, -.3 * s); ctx.bezierCurveTo(s, .2 * s, .2 * s, .7 * s, 0, .9 * s); ctx.closePath();
}
function drawHeart(ctx, x, y, s, col = '#ff5a8a', o = {}) {
  const crack = o.crack || 0, split = o.split || 0;
  const zig = [[0, -1.3], [.14, -.6], [-.12, -.15], [.16, .3], [-.1, .7], [0, 1.3]];
  ctx.save(); ctx.translate(x, y);
  const half = side => {
    ctx.save(); ctx.beginPath(); ctx.moveTo(side * 3 * s, -1.4 * s); zig.forEach(p => ctx.lineTo(p[0] * s, p[1] * s)); ctx.lineTo(side * 3 * s, 1.4 * s); ctx.closePath(); ctx.clip();
    ctx.translate(side * split * s * .55, side * split * s * .12); ctx.rotate(side * split * .4);
    heartPath(ctx, s); ctx.fillStyle = col; ctx.fill();
    ctx.save(); heartPath(ctx, s); ctx.clip(); ctx.fillStyle = 'rgba(60,0,20,.22)'; ctx.fillRect(s * .25, -s, s, s * 2); ctx.restore();
    ellipse(ctx, -s * .5, -s * .45, s * .22, s * .1, -.6); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fill();
    heartPath(ctx, s); ctx.lineWidth = s * .09; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.restore();
  };
  half(-1); half(1);
  if (crack > 0 && split === 0) {
    const n = crack * (zig.length - 1); ctx.beginPath();
    for (let i = 0; i <= Math.floor(n); i++) { const p = zig[i]; i ? ctx.lineTo(p[0] * s, p[1] * s) : ctx.moveTo(p[0] * s, p[1] * s); }
    const f = n % 1, a = zig[Math.floor(n)], b = zig[Math.min(zig.length - 1, Math.floor(n) + 1)]; if (f > 0) ctx.lineTo(lerp(a[0], b[0], f) * s, lerp(a[1], b[1], f) * s);
    ctx.lineWidth = s * .08; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  }
  ctx.restore();
}
function drawKerisShadow(ctx, x, y, len, rot = 0, col = 'rgba(10,0,10,.92)') { // blade points down from (x, y)
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const w = len * .085, n = 16;
  ctx.beginPath();
  for (let i = 0; i <= n; i++) { const tt = i / n, ww = w * (1 - tt * .94), off = Math.sin(tt * TAU * 1.5) * w * .5; i ? ctx.lineTo(-ww + off, tt * len) : ctx.moveTo(-ww + off, tt * len); }
  for (let i = n; i >= 0; i--) { const tt = i / n, ww = w * (1 - tt * .94), off = Math.sin(tt * TAU * 1.5) * w * .5; ctx.lineTo(ww + off, tt * len); }
  ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ctx.fillRect(-w * 1.7, -len * .035, w * 3.4, len * .045); rrect(ctx, -w * .45, -len * .2, w * .9, len * .17, w * .3); ctx.fill(); circle(ctx, 0, -len * .22, w * .7); ctx.fill();
  ctx.restore();
}
function drawPortrait(ctx, x, y, w, h) {
  ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2 - 22, -h / 2 - 22, w + 44, h + 44, 14); fillStroke(ctx, '#d9a83a', 8);
  rrect(ctx, -w / 2, -h / 2, w, h, 8); fillStroke(ctx, '#ffe3ec', 5);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 8); ctx.clip();
  drawStick(ctx, C(DYAH, { x: 0, y: h * .62, s: h * .95, shadow: false, face: { eyes: 'happy', mouth: 'smile' } }));
  ctx.restore(); ctx.restore();
}
function drawWeddingArch(ctx, x, y, s, dark = 0, t = 0) {
  const c = hx => mix(hx, '#2a0508', clamp(dark));
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const sx of [-1, 1]) { rrect(ctx, sx * 230 - 22, -520, 44, 520, 8); fillStroke(ctx, c('#d9a83a'), 6); }
  ctx.beginPath(); ctx.arc(0, -520, 230, Math.PI, TAU); ctx.lineWidth = 46; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = 34; ctx.strokeStyle = c('#d9a83a'); ctx.stroke();
  for (let i = 0; i < 11; i++) { const a = Math.PI + i / 10 * Math.PI; flowerAt(ctx, Math.cos(a) * 230, -520 + Math.sin(a) * 230, 20, c(i % 2 ? '#ff8fb3' : '#ffffff')); }
  for (const sx of [-1, 1]) for (let j = 0; j < 5; j++) flowerAt(ctx, sx * 230, -60 - j * 90, 17, c(j % 2 ? '#ffffff' : '#ff8fb3'));
  drawHeart(ctx, 0, -400 + Math.sin(t * 3) * 6, 64, c('#ff5a8a'), {});
  ctx.restore();
}
function drawSundaTent(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -170, -190, 340, 190, 8); fillStroke(ctx, '#f4f0e6', 6);
  ctx.save(); rrect(ctx, -170, -190, 340, 190, 8); ctx.clip(); ctx.fillStyle = '#2f63c9'; for (let i = -4; i <= 4; i += 2) ctx.fillRect(i * 38 - 19, -190, 38, 190); ctx.fillStyle = 'rgba(20,10,40,.2)'; ctx.fillRect(40, -200, 200, 220); ctx.restore();
  rrect(ctx, -40, -130, 80, 130, 6); fillStroke(ctx, '#1d3f8f', 5);
  path(ctx, [[-215, -180], [0, -340], [215, -180]]); fillStroke(ctx, '#2f63c9', 6);
  ctx.save(); path(ctx, [[-215, -180], [0, -340], [215, -180]]); ctx.clip(); ctx.fillStyle = '#f4f0e6'; ctx.fillRect(-60, -360, 120, 200); ctx.fillStyle = 'rgba(20,10,40,.22)'; ctx.fillRect(30, -360, 200, 200); ctx.restore();
  line(ctx, 0, -340, 0, -420, 6, '#6b4a2a'); path(ctx, [[0, -420], [64, -402], [0, -384]]); fillStroke(ctx, '#f4f0e6', 4);
  ctx.restore();
}
function spearRow(ctx, x0, x1, base, len, gap, t, seed = 1, shaft = '#7a4a2a', tip = '#cfd4da') {
  const R = rng(seed);
  for (let x = x0; x <= x1; x += gap) {
    const sw = Math.sin(t * 2 + x * .05) * 6, l = len * (.9 + R() * .2);
    line(ctx, x, base, x + sw, base - l, 9, INK); line(ctx, x, base, x + sw, base - l, 4, shaft);
    path(ctx, [[x + sw - 9, base - l + 4], [x + sw + 9, base - l + 4], [x + sw, base - l - 46]]); fillStroke(ctx, tip, 4);
    ctx.beginPath(); ctx.moveTo(x + sw, base - l + 6); ctx.quadraticCurveTo(x + sw - 16, base - l + 28, x + sw - 10, base - l + 58); ctx.lineWidth = 7; ctx.strokeStyle = '#d8312b'; ctx.stroke();
  }
}
function drawPaper(ctx, x, y, w, h, rot, str, o = {}) {
  const tear = o.tear || 0;
  const body = () => {
    rrect(ctx, -w / 2, -h / 2, w, h, 6); fillStroke(ctx, '#f3e6c4', 6);
    for (let i = 0; i < 3; i++) line(ctx, -w * .36, -h * .36 + i * h * .1, w * .36, -h * .36 + i * h * .1, 5, '#b8a070');
    text(ctx, str, 0, h * .05, h * .3, o.col || '#b3242f', null, 0, 'Poppins', 700);
    circle(ctx, w * .28, h * .33, h * .1); fillStroke(ctx, '#b3242f', 4);
  };
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  if (tear <= 0) body();
  else for (const side of [-1, 1]) {
    ctx.save(); ctx.beginPath(); ctx.moveTo(side * w, -h); for (let i = 0; i <= 8; i++) ctx.lineTo((i % 2 ? 14 : -14), -h * .6 + i * h * .15); ctx.lineTo(side * w, h); ctx.closePath(); ctx.clip();
    ctx.translate(side * tear * w * .5, tear * h * (side < 0 ? .9 : -.5)); ctx.rotate(side * tear * .9); body(); ctx.restore();
  }
  ctx.restore();
}
function petals(ctx, t, a = 1, seed = 3, area = [0, 0, W, H], n = 36) {
  const R = rng(seed); ctx.save(); ctx.globalAlpha = clamp(a);
  for (let i = 0; i < n; i++) { const x0 = area[0] + R() * (area[2] - area[0]), sp = 50 + R() * 80, ph = R() * 2000; const y = area[1] + ((t * sp + ph) % (area[3] - area[1])); const x = x0 + Math.sin(t * 1.6 + i) * 46; ctx.save(); ctx.translate(x, y); ctx.rotate(t * 2 + i); ellipse(ctx, 0, 0, 13, 7); ctx.fillStyle = i % 3 ? '#ff9fbf' : '#fff'; ctx.fill(); ctx.restore(); }
  ctx.restore();
}
function drawNoSign(ctx, x, y, r, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); const sc = backOut(clamp(a)); ctx.scale(sc, sc);
  circle(ctx, 0, 0, r); fillStroke(ctx, '#fff7e6', r * .06);
  line(ctx, 0, r * .6, 0, -r * .55, r * .06, INK); path(ctx, [[-r * .12, -r * .5], [r * .12, -r * .5], [0, -r * .85]]); fillStroke(ctx, '#cfd4da', r * .04);
  circle(ctx, 0, 0, r * .88); ctx.lineWidth = r * .14; ctx.strokeStyle = '#d8312b'; ctx.stroke(); line(ctx, -r * .62, -r * .62, r * .62, r * .62, r * .14, '#d8312b');
  ctx.restore();
}
function mapPin(ctx, x, y, col, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); const sc = backOut(clamp(a)); ctx.scale(sc, sc);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-26, -30, -22, -48); ctx.arc(0, -48, 22, Math.PI, 0); ctx.quadraticCurveTo(26, -30, 0, 0); fillStroke(ctx, col, 5); circle(ctx, 0, -48, 9); ctx.fillStyle = '#fff'; ctx.fill(); ctx.restore();
}
// Java in two colours: Majapahit gold (east) and Sunda blue (west). gold 0..1 spreads from the east, crack 0..1 splits the island.
function drawJavaRegions(ctx, x, y, w, o = {}) {
  const h = w * .7, cutX = x + w * .34, gold = o.gold == null ? 1 : o.gold, crack = o.crack || 0, pulse = o.pulse || 0;
  rrect(ctx, x - 40, y - 40, w + 80, h + 80, 26); fillStroke(ctx, o.paper || '#f3e2b8', 8);
  ctx.save(); rrect(ctx, x - 40, y - 40, w + 80, h + 80, 26); ctx.clip(); ctx.fillStyle = 'rgba(80,160,200,.28)'; ctx.fillRect(x - 40, y - 40, w + 80, h + 80);
  ctx.strokeStyle = 'rgba(60,120,160,.25)'; ctx.lineWidth = 3; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(x - 40, y + i * h / 7); ctx.quadraticCurveTo(x + w / 2, y + i * h / 7 + 20, x + w + 40, y + i * h / 7); ctx.stroke(); }
  if (crack > 0) { ctx.fillStyle = 'rgba(20,10,20,.55)'; ctx.beginPath(); ctx.moveTo(cutX - crack * 34, y - 60); for (let yy = y - 60; yy <= y + h + 60; yy += 20) ctx.lineTo(cutX + Math.sin(yy * .08) * 16 * Math.min(1, crack * 3) - crack * 34, yy); for (let yy = y + h + 60; yy >= y - 60; yy -= 20) ctx.lineTo(cutX + Math.sin(yy * .08) * 16 * Math.min(1, crack * 3) + crack * 34, yy); ctx.closePath(); ctx.fill(); }
  const half = side => {
    ctx.save(); ctx.beginPath(); const X0 = side < 0 ? x - 300 : x + w + 300; ctx.moveTo(X0, y - 120);
    for (let yy = y - 120; yy <= y + h + 120; yy += 20) ctx.lineTo(cutX + Math.sin(yy * .08) * 16 * Math.min(1, crack * 3), yy);
    ctx.lineTo(X0, y + h + 120); ctx.closePath(); ctx.clip(); ctx.translate(side * crack * 34, 0);
    for (const pts of [JAVA, MADURA]) {
      islandPath(ctx, pts, x, y, w, h); ctx.fillStyle = '#9ccf72'; ctx.fill();
      ctx.save(); islandPath(ctx, pts, x, y, w, h); ctx.clip();
      const gx = lerp(x + w * 1.1, cutX, clamp(gold)); ctx.fillStyle = '#f2c230'; ctx.fillRect(gx, y - 50, x + w * 1.3 - gx, h + 100);
      ctx.fillStyle = mix('#3b7be0', '#8ab4ff', clamp(pulse)); ctx.fillRect(x - 60, y - 50, cutX - x + 60, h + 100);
      ctx.fillStyle = 'rgba(40,60,20,.16)'; ctx.fillRect(x, y + h * .45, w, h); ctx.restore();
      islandPath(ctx, pts, x, y, w, h); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.stroke();
    }
    ctx.restore();
  };
  half(-1); half(1);
  ctx.restore();
}
// ---------- halls and stages ----------
function pendopoBG(ctx, cam, o = {}) { // royal hall: warm wood, gold, banners; o.dark 0..1, o.tint overrides the wall colour
  const d = o.dark || 0, m = hx => mix(hx, '#1a0a0c', d);
  applyCam(ctx, cam, .2); const g = ctx.createLinearGradient(0, -200, 0, 1500); g.addColorStop(0, m(o.wallTop || '#f4d28a')); g.addColorStop(1, m(o.wallBot || '#e29a50')); ctx.fillStyle = g; ctx.fillRect(-1000, -1000, 3080, 3800);
  for (const px of [80, 330, 750, 1000]) { rrect(ctx, px - 42, -200, 84, 1800, 10); fillStroke(ctx, m(o.pillar || '#a8642f'), 6); for (let yy = 120; yy < 1500; yy += 260) { rrect(ctx, px - 52, yy, 104, 26, 8); fillStroke(ctx, m('#e8b640'), 5); } }
  for (let i = 0; i < 4; i++) { const bx = 205 + i * 215; path(ctx, [[bx - 50, 60], [bx + 50, 60], [bx + 50, 360], [bx, 320], [bx - 50, 360]]); fillStroke(ctx, m(o.banner || '#b3242f'), 5); circle(ctx, bx, 170, 22); fillStroke(ctx, m('#f2c230'), 4); }
  applyCam(ctx, cam, 1); const f = ctx.createLinearGradient(0, 1500, 0, 2600); f.addColorStop(0, m(o.floor || '#8e3a2a')); f.addColorStop(1, m('#5a1f18')); ctx.fillStyle = f; ctx.fillRect(-1000, 1500, 3080, 1500);
  ctx.fillStyle = m('#e8b640'); ctx.fillRect(-1000, 1500, 3080, 14);
}
function drawThrone(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -150, -420, 300, 420, 30); fillStroke(ctx, '#e8b640', 7); rrect(ctx, -115, -380, 230, 300, 20); fillStroke(ctx, '#b3242f', 6);
  rrect(ctx, -170, -110, 340, 110, 14); fillStroke(ctx, '#e8b640', 7); rrect(ctx, -140, -150, 280, 60, 14); fillStroke(ctx, '#b3242f', 6);
  circle(ctx, 0, -450, 34); fillStroke(ctx, '#f2c230', 6);
  ctx.restore();
}
function longShadow(ctx, x, y, len, a = .35, dir = 1) {
  ctx.save(); ctx.fillStyle = `rgba(20,5,10,${a})`; ctx.beginPath(); ctx.moveTo(x - 70, y); ctx.lineTo(x + 70, y); ctx.lineTo(x + 70 + dir * len, y + 40); ctx.lineTo(x - 70 + dir * len, y + 40); ctx.closePath(); ctx.fill(); ctx.restore();
}
