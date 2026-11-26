// ---------- cinematic 16:9 toolkit: camera, layered backdrops, light, atmosphere, titles ----------
// frame is W x H = 1920 x 1080 (see lib.js). Characters: drawStick, s about 420-520, feet y about 880-960.

function applyCam(ctx, cam, depth = 1) { // overrides env.js (portrait) with a 16:9 version
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const z = 1 + (cam.z - 1) * depth;
  ctx.translate(W / 2, H / 2); ctx.rotate((cam.r || 0) * depth); ctx.scale(z, z);
  ctx.translate(-(W / 2 + (cam.x - W / 2) * depth), -(H / 2 + (cam.y - H / 2) * depth));
}
// camera move over a shot. o: x0,y0,z0 -> x1,y1,z1 across dur, eased; shake = handheld amount
function CAM(t, lt, o = {}) {
  const k = ease(clamp(lt / (o.dur || 5))), hh = shake(t * .3, o.shake == null ? 2.2 : o.shake, 1, 2);
  const x0 = o.x0 == null ? W / 2 : o.x0, y0 = o.y0 == null ? H / 2 : o.y0, z0 = o.z0 || 1;
  return { x: lerp(x0, o.x1 == null ? x0 : o.x1, k) + hh[0], y: lerp(y0, o.y1 == null ? y0 : o.y1, k) + hh[1], z: lerp(z0, o.z1 || z0, k), r: (o.r || 0) + Math.sin(t * .4) * .0025 };
}

// ---- time-of-day palettes ----
const TOD = {
  day:    { sky: ['#4d9fe0', '#cfeaf6'], hz: '#fff1c8', sun: [1450, 230], mt: ['#8fb4cf', '#7aa3bf', '#5f8fa8'], hill: ['#5fa356', '#46913f'], ground: ['#8cc55a', '#4a8f3a'], fog: '#e8f4f8', fg: '#15321a', tint: 'rgba(255,226,170,.10)', shade: 'rgba(10,40,90,.16)', vig: .38 },
  golden: { sky: ['#3d5fae', '#ffc77a'], hz: '#ffd9a0', sun: [1380, 360], mt: ['#9a7fa8', '#7d6a98', '#5d5688'], hill: ['#7a9a4a', '#5f8340'], ground: ['#c9a85a', '#7a6a34'], fog: '#ffd9aa', fg: '#2a1a14', tint: 'rgba(255,170,80,.20)', shade: 'rgba(40,10,70,.22)', vig: .42 },
  dusk:   { sky: ['#2c2a6e', '#f08a5a'], hz: '#ffb070', sun: [1500, 520], mt: ['#7a5a8a', '#5f4a7e', '#3f3a66'], hill: ['#5a6a46', '#43563a'], ground: ['#9a7a4a', '#5a4630'], fog: '#e8a07a', fg: '#160e20', tint: 'rgba(255,120,60,.18)', shade: 'rgba(20,10,60,.30)', vig: .48 },
  fire:   { sky: ['#1a0a22', '#c8421e'], hz: '#ff8a3a', sun: null, mt: ['#5a2a3a', '#40202f', '#2a1626'], hill: ['#3a2220', '#2a1818'], ground: ['#4a2a22', '#1e100e'], fog: '#c8602a', fg: '#0c0508', tint: 'rgba(255,90,30,.22)', shade: 'rgba(20,0,20,.40)', vig: .55 },
  night:  { sky: ['#050b22', '#1c2f66'], hz: '#2f4a8a', sun: null, moon: [420, 200], mt: ['#1d2c58', '#16224a', '#101a3a'], hill: ['#14213a', '#0f1a2e'], ground: ['#1b2c3a', '#0b141c'], fog: '#2a3f78', fg: '#04060e', tint: 'rgba(60,100,220,.26)', shade: 'rgba(0,0,30,.40)', vig: .55, stars: true },
  mist:   { sky: ['#7d94b0', '#e9e4d8'], hz: '#f4ecd8', sun: [900, 360], mt: ['#a9b3bd', '#97a3b0', '#808e9e'], hill: ['#7f9a78', '#6a8766'], ground: ['#98ad78', '#617a50'], fog: '#e4e6e0', fg: '#1d2a22', tint: 'rgba(235,225,205,.14)', shade: 'rgba(30,50,80,.18)', vig: .36 },
  storm:  { sky: ['#2a3140', '#7c8794'], hz: '#a9b0b6', sun: null, mt: ['#56606e', '#444e5c', '#323c4a'], hill: ['#46564a', '#364438'], ground: ['#566046', '#2e382a'], fog: '#8e98a2', fg: '#0c1014', tint: 'rgba(150,170,200,.16)', shade: 'rgba(10,20,40,.34)', vig: .5 },
  palace: { sky: ['#4a1a1e', '#c8803a'], hz: '#ffb060', sun: null, mt: ['#6a3a2a', '#4a2820', '#2e1812'], hill: ['#4a2a1e', '#321c14'], ground: ['#7a4a2a', '#2a160e'], fog: '#c88a50', fg: '#140808', tint: 'rgba(255,150,60,.20)', shade: 'rgba(30,5,10,.36)', vig: .5 },
};
const tint = (a, b, k) => mix(a, b, k);

function ridge(ctx, base, amp, seed, col, hz, fogK = .5, x0 = -900, x1 = 2900) {
  const R = rng(seed); ctx.beginPath(); ctx.moveTo(x0, base + 900);
  for (let x = x0; x <= x1; x += 70) ctx.lineTo(x, base - (Math.sin(x * .0035 + seed) * .55 + Math.sin(x * .011 + seed * 2) * .3 + .15 * R()) * amp);
  ctx.lineTo(x1, base + 900); ctx.closePath();
  const g = ctx.createLinearGradient(0, base - amp, 0, base + 40); g.addColorStop(0, col); g.addColorStop(1, mix(col, hz, fogK));
  ctx.fillStyle = g; ctx.fill();
}
function moon(ctx, x, y, r, t) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, r * .3, x, y, r * 5); g.addColorStop(0, 'rgba(210,225,255,.55)'); g.addColorStop(1, 'rgba(150,180,255,0)'); ctx.fillStyle = g; ctx.fillRect(x - r * 5, y - r * 5, r * 10, r * 10); ctx.restore();
  circle(ctx, x, y, r); ctx.fillStyle = '#f4f7ff'; ctx.fill(); ctx.fillStyle = 'rgba(150,170,210,.45)'; for (const [dx, dy, rr] of [[-.3, -.2, .22], [.25, .1, .16], [-.1, .35, .12]]) { circle(ctx, x + dx * r, y + dy * r, rr * r); ctx.fill(); }
}
function starField(ctx, t, seed = 5) {
  const R = rng(seed); for (let i = 0; i < 140; i++) { const x = R() * 2200 - 150, y = R() * 600, r = .8 + R() * 1.8; ctx.globalAlpha = .4 + .6 * Math.abs(Math.sin(t * (.5 + R()) + i)); circle(ctx, x, y, r); ctx.fillStyle = '#fff'; ctx.fill(); } ctx.globalAlpha = 1;
}
function fogBand(ctx, t, y, h, col, a = .35, seed = 1) {
  ctx.save(); for (let i = 0; i < 3; i++) { const x = ((t * (8 + i * 5) + i * 700 + seed * 130) % 2600) - 500; const g = ctx.createRadialGradient(x, y, 20, x, y, 700); g.addColorStop(0, col); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.globalAlpha = a / (1 + i * .5); ctx.fillStyle = g; ctx.fillRect(x - 700, y - h, 1400, h * 2); } ctx.restore();
}
function godRays(ctx, x, y, t, a = .16, col = '255,236,180') {
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(x, y);
  for (let i = 0; i < 9; i++) { const ang = .35 + i * .16 + Math.sin(t * .3 + i) * .02, len = 2200, w = 70 + (i % 3) * 40; ctx.save(); ctx.rotate(ang); const g = ctx.createLinearGradient(0, 0, len, 0); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, -w * .1); ctx.lineTo(len, -w); ctx.lineTo(len, w); ctx.lineTo(0, w * .1); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.restore();
}
// layered scenery. o: tod, hor, sea, volcano, trees(n), cloudsA, rays, seaPal, volX
function backdrop(ctx, cam, t, o = {}) {
  const P = TOD[o.tod || 'day'], hor = o.hor || 600;
  applyCam(ctx, cam, .03);
  const g = ctx.createLinearGradient(0, -500, 0, hor + 60); g.addColorStop(0, P.sky[0]); g.addColorStop(1, P.sky[1]); ctx.fillStyle = g; ctx.fillRect(-1500, -700, 5000, hor + 900);
  if (P.stars) { applyCam(ctx, cam, .03); starField(ctx, t); }
  const sun = o.sun || P.sun;
  if (sun && o.sun !== false) { applyCam(ctx, cam, .05); drawSun(ctx, sun[0], sun[1], o.sunR || 62, t, o.sunPow == null ? .85 : o.sunPow); }
  if (P.moon && o.moon !== false) { applyCam(ctx, cam, .05); moon(ctx, o.moon ? o.moon[0] : P.moon[0], o.moon ? o.moon[1] : P.moon[1], 62, t); }
  applyCam(ctx, cam, .07);
  const ca = o.cloudsA == null ? 1 : o.cloudsA; if (ca > 0) { ctx.save(); ctx.filter = 'blur(1.5px)'; const cc = o.tod === 'night' ? .25 : o.tod === 'fire' ? .35 : .95; drawCloud(ctx, 260 + t * 6, 190, 170, 1, cc * ca); drawCloud(ctx, 1000 + t * 4, 120, 130, 2, cc * ca); drawCloud(ctx, 1650 + t * 5, 260, 150, 3, cc * ca * .9); drawCloud(ctx, -300 + t * 4, 330, 120, 4, cc * ca * .8); ctx.restore(); }
  if (o.rays && sun) { applyCam(ctx, cam, .06); godRays(ctx, sun[0], sun[1], t, o.rays); }
  applyCam(ctx, cam, .12); ctx.save(); ctx.filter = 'blur(2px)'; ridge(ctx, hor + 20, 150, 3, P.mt[0], P.hz, .6); ctx.restore();
  if (o.volcano !== false) { applyCam(ctx, cam, .16); ctx.save(); ctx.filter = 'blur(1.5px)'; mountain(ctx, o.volX || 1350, hor + 30, 760, 430, P.mt[1], false, true, t); mountain(ctx, (o.volX || 1350) - 900, hor + 30, 560, 300, P.mt[0], false, false, t); ctx.restore(); }
  applyCam(ctx, cam, .24); ridge(ctx, hor + 40, 90, 7, P.mt[2], P.hz, .45);
  applyCam(ctx, cam, .34); ridge(ctx, hor + 60, 55, 11, P.hill[0], P.hz, .3);
  applyCam(ctx, cam, .5); ctx.save(); ctx.globalAlpha = .55; fogBand(ctx, t, hor + 40, 90, P.fog, .5, 1); ctx.restore();
  if (o.trees) { applyCam(ctx, cam, .55); const R = rng(8); for (let i = 0; i < o.trees; i++) { const x = -200 + (i / o.trees) * 2400 + R() * 60; treeProp(ctx, x, hor + 120 + R() * 40, .55 + R() * .2, 0, mix(P.hill[1], '#2a6a32', .4), t); } }
  applyCam(ctx, cam, 1);
  if (o.sea) drawSea(ctx, hor + 40, t, 2600, o.seaPal || (o.tod === 'night' ? ['#1d3a6a', '#12284a', '#0a1830'] : o.tod === 'fire' ? ['#d8602a', '#8a3a30', '#3a1a2a'] : o.tod === 'dusk' ? ['#f2a06a', '#7a6a9a', '#2a3a6a'] : ['#7fd3e0', '#18a3c0', '#0d7fa6']));
  else groundPlane(ctx, hor + 70, P.ground[0], P.ground[1], t);
}
// dark foreground silhouettes with strong parallax + blur (depth of field)
function fgFrame(ctx, cam, t, tod = 'day', o = {}) {
  const P = TOD[tod]; applyCam(ctx, cam, 1.55); ctx.save(); ctx.filter = 'blur(5px)'; ctx.fillStyle = P.fg; ctx.globalAlpha = o.a == null ? .92 : o.a;
  const R = rng(o.seed || 4);
  for (const side of o.sides || ['l', 'r']) { for (let i = 0; i < 9; i++) { const x = side === 'l' ? -120 + i * 38 + R() * 20 : 1990 - i * 38 - R() * 20; const h = 120 + R() * 220 + (i < 3 ? 90 : 0); ctx.beginPath(); ctx.moveTo(x - 24, 1140); ctx.quadraticCurveTo(x + (side === 'l' ? 40 : -40) + Math.sin(t * 1.2 + i) * 6, 1140 - h * .6, x + (side === 'l' ? 26 : -26), 1140 - h); ctx.quadraticCurveTo(x + (side === 'l' ? 10 : -10), 1140 - h * .5, x + 24, 1140); ctx.fill(); } }
  ctx.restore();
}
function motes(ctx, cam, t, o = {}) { // floating dust / pollen / fireflies / embers in world space at depth 1
  applyCam(ctx, cam, 1); const R = rng(o.seed || 7), n = o.n || 40, col = o.col || '255,240,200', up = o.up || 0;
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) { const ph = R(), x = ((R() * 2400 + t * (o.vx == null ? 8 : o.vx) * (.4 + R())) % 2400) - 240 + Math.sin(t * .8 + i) * 18, y = (o.y0 == null ? 150 : o.y0) + ((R() * (o.h || 800) - t * up * (.5 + R()) * 60) % (o.h || 800) + (o.h || 800)) % (o.h || 800), r = (o.r || 3) * (.4 + R()), a = (o.a || .5) * (.4 + .6 * Math.abs(Math.sin(t * (.6 + ph) + i)));
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = g; ctx.fillRect(x - r * 4, y - r * 4, r * 8, r * 8); }
  ctx.restore();
}
function petalsRain(ctx, t, n = 30, seed = 3, col = '#ffd0e0') {
  const R = rng(seed); ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  for (let i = 0; i < n; i++) { const k = (t * (.07 + R() * .08) + R()) % 1, x = R() * W + Math.sin(t * 1.2 + i) * 60, y = -40 + k * (H + 80); ctx.save(); ctx.translate(x, y); ctx.rotate(t * 2 + i); ellipse(ctx, 0, 0, 12, 6); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
  ctx.restore();
}
function lightPool(ctx, x, y, rx, ry, col = '255,220,150', a = .35) { // warm light on the ground / lantern glow
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.translate(x, y); ctx.scale(1, ry / rx); const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = g; ctx.fillRect(-rx, -rx, rx * 2, rx * 2); ctx.restore();
}
// ---- titles ----
function cineTitle(ctx, lines, lt, o = {}) { // lines: [{t, size, col, track, y}] screen space, fades and tracks in
  const d = o.delay || 0, out = o.out;
  lines.forEach((L, i) => {
    const k = clamp((lt - d - i * (o.stagger == null ? .35 : o.stagger)) / (o.fade || .9)); let a = easeOut(k); if (out != null) a *= 1 - clamp((lt - out) / .6);
    if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `${L.weight || 700} ${L.size || 90}px ${L.font || 'Lora'}`; ctx.letterSpacing = `${(L.track == null ? 14 : L.track) * (1.4 - .4 * easeOut(k))}px`;
    const x = W / 2 + (L.dx || 0), y = (L.y || H / 2) + (1 - easeOut(k)) * 14;
    ctx.shadowColor = 'rgba(0,0,0,.65)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 6; ctx.lineWidth = (L.size || 90) * .06; ctx.strokeStyle = 'rgba(20,10,5,.55)'; ctx.strokeText(L.t, x, y);
    ctx.shadowColor = (L.glow || 'rgba(255,200,90,.55)'); ctx.shadowBlur = 40; ctx.shadowOffsetY = 0; ctx.fillStyle = L.col || '#f6e2a8'; ctx.fillText(L.t, x, y); ctx.restore();
  });
}
function titleRule(ctx, lt, y, d = .6, w = 520) { // thin gold line that draws outward
  const k = easeOut(clamp((lt - d) / .9)); if (k <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(W / 2 - w, 0, W / 2 + w, 0); g.addColorStop(0, 'rgba(246,226,168,0)'); g.addColorStop(.5, 'rgba(246,226,168,.95)'); g.addColorStop(1, 'rgba(246,226,168,0)'); ctx.fillStyle = g; ctx.fillRect(W / 2 - w * k, y, 2 * w * k, 3); ctx.restore();
}
// big gold number / date that pops in the upper-left or any anchor (screen space)
function bigNum(ctx, str, x, y, size, lt, o = {}) {
  const d = o.delay || 0, k = clamp((lt - d) / .7); let a = easeOut(k); if (o.out != null) a *= 1 - clamp((lt - o.out) / .5); if (a <= 0) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.textAlign = o.align || 'left'; ctx.textBaseline = 'middle'; ctx.font = `700 ${size}px Lora`; ctx.letterSpacing = `${size * .03}px`;
  const sc = .9 + .1 * easeOut(k); ctx.translate(x, y + (1 - easeOut(k)) * 18); ctx.scale(sc, sc);
  ctx.shadowColor = 'rgba(0,0,0,.7)'; ctx.shadowBlur = 28; ctx.shadowOffsetY = 8; ctx.lineWidth = size * .07; ctx.strokeStyle = 'rgba(25,12,5,.7)'; ctx.strokeText(str, 0, 0);
  ctx.shadowColor = 'rgba(255,190,70,.7)'; ctx.shadowBlur = 34; ctx.shadowOffsetY = 0; ctx.fillStyle = o.col || '#ffd25a'; ctx.fillText(str, 0, 0);
  if (o.sub) { ctx.shadowBlur = 0; ctx.font = `600 ${size * .3}px Poppins`; ctx.letterSpacing = '4px'; ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.fillText(o.sub, 0, size * .72); }
  ctx.restore();
}
// small caption tag pinned in world space (place names, dates)
function placeTag(ctx, str, x, y, lt, d = 0, col = '#f6e2a8') {
  const k = clamp((lt - d) / .5); if (k <= 0) return; ctx.save(); ctx.translate(x, y - (1 - easeOut(k)) * 12); ctx.globalAlpha = easeOut(k); ctx.font = '600 30px Poppins'; ctx.letterSpacing = '3px'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const w = ctx.measureText(str).width + 44; rrect(ctx, -w / 2, -26, w, 52, 26); ctx.fillStyle = 'rgba(14,10,20,.62)'; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(246,226,168,.75)'; ctx.stroke(); ctx.fillStyle = col; ctx.fillText(str, 0, 2); ctx.restore();
}

// ---- extra hats ----
Object.assign(HATS2, {
  flower(ctx, hx, hy, hr, o, lw) {
    const cols = ['#ff8fb0', '#ffe066', '#fff', '#ff9a5a', '#c9a0ff']; ctx.beginPath(); ctx.arc(hx, hy - hr * .12, hr * 1.04, Math.PI + .42, -.42); ctx.lineWidth = .05; ctx.strokeStyle = '#3f9a4a'; ctx.lineCap = 'round'; ctx.stroke();
    for (let i = 0; i < 9; i++) { const a = Math.PI + .5 + i * (Math.PI - 1) / 8, x = hx + Math.cos(a) * hr * 1.04, y = hy - hr * .12 + Math.sin(a) * hr * 1.04; circle(ctx, x, y, .033); fillStroke(ctx, cols[i % 5], lw * .5); circle(ctx, x, y, .012); ctx.fillStyle = '#f6b83a'; ctx.fill(); }
  },
  ming(ctx, hx, hy, hr, o, lw) { // Chinese official's cap with side wings
    const by = hy - hr * .55; for (const s of [-1, 1]) { rrect(ctx, hx + s * hr * .85 - (s > 0 ? 0 : .26), by - .035, .26, .03, .015); fillStroke(ctx, '#1b1722', lw * .8); }
    ctx.beginPath(); ctx.moveTo(hx - hr * .9, by + .02); ctx.quadraticCurveTo(hx - hr * .9, by - .2, hx, by - .21); ctx.quadraticCurveTo(hx + hr * .9, by - .2, hx + hr * .9, by + .02); ctx.closePath(); fillStroke(ctx, o.hatCol || '#1b1722', lw);
    rrect(ctx, hx - hr * .92, by - .005, hr * 1.84, .045, .02); fillStroke(ctx, GOLD2, lw * .8);
  },
  khan(ctx, hx, hy, hr, o, lw) { // great khan: fur hat with gold crown band
    const by = hy - hr * .5; ctx.beginPath(); ctx.moveTo(hx - hr * 1.05, by + .02); ctx.quadraticCurveTo(hx - hr * .9, hy - hr * 1.5, hx, hy - hr * 1.45); ctx.quadraticCurveTo(hx + hr * .9, hy - hr * 1.5, hx + hr * 1.05, by + .02); ctx.closePath(); fillStroke(ctx, '#7a1f2a', lw);
    ctx.beginPath(); for (let i = 0; i <= 10; i++) ctx.arc(hx - hr * 1.1 + i * hr * .22, by + (i % 2) * .008, .04, 0, TAU); ctx.fillStyle = '#4a3226'; ctx.fill(); ctx.lineWidth = lw * .8; ctx.strokeStyle = INK; ctx.stroke();
    rrect(ctx, hx - hr * .8, by - .06, hr * 1.6, .04, .015); fillStroke(ctx, GOLD, lw * .8); circle(ctx, hx, hy - hr * 1.47, .03); fillStroke(ctx, '#e0392f', lw * .6);
  },
  turban(ctx, hx, hy, hr, o, lw) { // wrapped head cloth
    const c = o.hatCol || '#f6f1e8'; ctx.beginPath(); ctx.moveTo(hx - hr * 1.0, hy - hr * .45); ctx.quadraticCurveTo(hx - hr * 1.05, hy - hr * 1.25, hx, hy - hr * 1.18); ctx.quadraticCurveTo(hx + hr * 1.05, hy - hr * 1.25, hx + hr * 1.0, hy - hr * .45); ctx.quadraticCurveTo(hx, hy - hr * .6, hx - hr * 1.0, hy - hr * .45); ctx.closePath(); fillStroke(ctx, c, lw);
    ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = .01; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(hx - hr * .9, hy - hr * (.55 + i * .15)); ctx.quadraticCurveTo(hx, hy - hr * (.7 + i * .15), hx + hr * .9, hy - hr * (.55 + i * .15)); ctx.stroke(); }
  },
});
// ---- extra props ----
function lontar(ctx, x, y, s, label, rot = 0) { // palm-leaf manuscript
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  for (let i = 0; i < 4; i++) { rrect(ctx, -150, -22 + i * 11 - 22, 300, 20, 8); fillStroke(ctx, i % 2 ? '#e3c98a' : '#d8bc78', 4); }
  line(ctx, -120, -50, -120, 40, 4, '#7a4a2a'); line(ctx, 120, -50, 120, 40, 4, '#7a4a2a');
  if (label) text(ctx, label, 0, -2, 26, '#5a3a1a', 'transparent', 0, 'Lora', 700);
  ctx.restore();
}
function lantern(ctx, x, y, s, t, glow = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); lightPool(ctx, 0, 40, 220, 220, '255,200,110', .45 * glow);
  line(ctx, 0, -80, 0, -40, 4, INK); rrect(ctx, -22, -40, 44, 70, 14); fillStroke(ctx, '#e0392f', 5); ctx.fillStyle = `rgba(255,220,120,${.55 + .15 * Math.sin(t * 9)})`; ellipse(ctx, 0, -5, 11, 22); ctx.fill(); rrect(ctx, -16, 28, 32, 10, 4); fillStroke(ctx, GOLD2, 4); ctx.restore();
}
function boatProp(ctx, x, y, s, t, o = {}) { // small wooden boat
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.8 + (o.ph || 0)) * 5); ctx.rotate(Math.sin(t * 1.3 + (o.ph || 0)) * .03); ctx.scale(s * (o.flip || 1), s);
  ctx.beginPath(); ctx.moveTo(-160, -40); ctx.quadraticCurveTo(-120, 40, 0, 44); ctx.quadraticCurveTo(120, 40, 170, -50); ctx.lineTo(120, -30); ctx.lineTo(-120, -30); ctx.closePath(); fillStroke(ctx, o.hull || '#8a5a32', 6);
  if (o.sail) { line(ctx, 0, -30, 0, -230, 7, '#6a4a2a'); ctx.beginPath(); ctx.moveTo(4, -220); ctx.quadraticCurveTo(110, -150, 4, -60); ctx.closePath(); fillStroke(ctx, o.sail, 5); }
  ctx.fillStyle = 'rgba(255,255,255,.7)'; ellipse(ctx, 0, 46, 200, 10); ctx.fill(); ctx.restore();
}
function waterfall(ctx, x, y, w, h, t) { // Madakaripura
  ctx.save(); ctx.translate(x, y); rrect(ctx, -w / 2 - 40, 0, w + 80, h, 20); ctx.fillStyle = '#3a4a3a'; ctx.fill(); ctx.fillStyle = '#2f3f2f'; rrect(ctx, -w / 2 - 40, 0, 80, h, 20); ctx.fill();
  const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#e8f6ff'); g.addColorStop(1, '#9ed4f0'); ctx.fillStyle = g; ctx.fillRect(-w / 2, 0, w, h);
  ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 5; for (let i = 0; i < 14; i++) { const xx = -w / 2 + 10 + i * (w - 20) / 13, yy = ((t * 260 + i * 53) % h); ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx, yy + 60); ctx.stroke(); }
  ctx.fillStyle = 'rgba(255,255,255,.6)'; ellipse(ctx, 0, h, w * .7, 36); ctx.fill(); ctx.restore();
}
function stampMark(ctx, str, x, y, s, a = 1, col = '#d8312b', rot = -.2) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * (1.4 - .4 * easeOut(clamp(a))), s * (1.4 - .4 * easeOut(clamp(a)))); ctx.globalAlpha = clamp(a * 1.5); ctx.font = '700 64px Poppins'; ctx.letterSpacing = '6px'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const w = ctx.measureText(str).width + 50; ctx.lineWidth = 10; ctx.strokeStyle = col; rrect(ctx, -w / 2, -54, w, 108, 14); ctx.stroke(); ctx.fillStyle = col; ctx.fillText(str, 0, 4); ctx.restore();
}
function banner(ctx, x, y, s, t, col = '#d8312b', col2 = '#f6f1e8', len = 360) { // hanging cloth banner
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(ctx, -50, 0, 50, 0, 8, '#7a5230');
  ctx.beginPath(); ctx.moveTo(-42, 0); for (let i = 0; i <= 8; i++) ctx.lineTo(-42 + 0 + Math.sin(t * 2 + i * .5) * 5, i * len / 8); for (let i = 8; i >= 0; i--) ctx.lineTo(42 + Math.sin(t * 2 + i * .5) * 5, i * len / 8); ctx.closePath(); fillStroke(ctx, col, 6);
  ctx.save(); ctx.clip(); ctx.fillStyle = col2; ctx.fillRect(-60, len * .4, 120, len * .2); ctx.restore(); ctx.restore();
}
function paddy(ctx, x0, x1, y, t) { // rows of crop for fields
  ctx.save(); ctx.strokeStyle = 'rgba(30,90,20,.5)'; ctx.lineWidth = 4; for (let r = 0; r < 6; r++) for (let i = x0; i < x1; i += 28) { ctx.beginPath(); ctx.moveTo(i, y + r * 34); ctx.lineTo(i + Math.sin(t * 2 + i) * 3, y + r * 34 - 18); ctx.stroke(); } ctx.restore();
}
function charSlot(ctx, x, y, s) { return [x, y, s]; }
