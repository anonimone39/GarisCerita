// ---------- Demak Part 1: Setelah Majapahit, Lahirnya Demak (times are voiceover seconds) ----------
const dust = (ctx, x, y, t, r = 40, seed = 3) => puff(ctx, x, y, r, t, '#e9dcc0', seed, .8);
const sk = (v, a, b) => clamp((v - a) / (b - a));
const SHOTS = [];
const RPATAH = { cols: ['#2f8f5b', '#f6f1e8'], hat: 'band', hatCol: '#f6f1e8', belt: false };
const PUTRI = { cols: ['#d8312b', '#d8312b'], hat: 'band', hatCol: '#f6c93a', belt: false };
const ADI = [{ cols: ['#3a8f6a', '#3a8f6a'], hat: 'blangkon', hatCol: '#7a4524', vest: '#f2c230' }, { cols: ['#2f63c9', '#2f63c9'], hat: 'blangkon', hatCol: '#5a3a1c' }, { cols: ['#e07a2f', '#e07a2f'], hat: 'blangkon', hatCol: '#7a4524', vest: '#f6f1e8' }];
const FOREIGN = { cols: ['#3a3f4a', '#f6f1e8'], hat: 'captain' };
const palace = (ctx, t, a = 1) => { gate(ctx, 540, 1040, 1.0, 1, '#b8553a'); flagProp(ctx, 110, 1130, .95, t, 'maja', 430); flagProp(ctx, 970, 1130, .95, t + 1, 'maja', 430); };

// 1 — hook: the great kingdom cracks
SHOTS.push({ start: 0, end: 4.88, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.88, z0: 1, z1: 1.08, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 860 }); applyCam(ctx, cam, 1);
  palace(ctx, t); cracks(ctx, 540, 1040, 1.4, sk(lt, 2.2, 3.4));
  ST(ctx, MAJA, 540, 1330, 520, { bob: Math.sin(t * 3) * .004, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: 'wide', mouth: 'o', look: [0, -.2], browUp: 1 }, shadow: true });
  qmark(ctx, 250, 880, 90, t, sk(lt, 2.4, 2.7), -.2); qmark(ctx, 850, 860, 100, t + 1, sk(lt, 2.8, 3.1), .2);
  overlay(ctx, () => { kinetic(ctx, 'KERAJAAN TERBESAR', 540, 330, 92, lt, { delay: .3, col: '#fff' }); kinetic(ctx, 'RUNTUH?', 540, 490, 170, lt, { delay: 2.1, col: '#ffd23a', pulse: true }); });
} });
// 2 — Paregreg and the fight over the throne
SHOTS.push({ start: 4.88, end: 10.49, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 5.6, z0: 1, z1: 1.07, y0: 940 });
  world(ctx, cam, t, { mood: 'dusk', hor: 860 }); applyCam(ctx, cam, 1);
  gate(ctx, 540, 1040, 1.0, 1, '#a8453a');
  const tug = Math.sin(lt * 6) * 40 * (lt < 4.6 ? 1 : 0), fall = sk(lt, 4.55, 5.1);
  const cx = 540 + tug, cy = lerp(1000, 1450, easeIn(fall)), cr = fall * 1.2;
  ST(ctx, KERT, 250, 1340, 520, { arms: { L: { ik: [(cx - 250) / 520 - .05, -.62], bend: -1 }, R: [.3, -.1] }, face: { eyes: 'squint', mouth: 'teeth', browAng: .3 }, lean: .06 });
  ST(ctx, JAYA, 830, 1340, 520, { flip: -1, arms: { L: { ik: [(830 - cx) / 520 - .05, -.62], bend: -1 }, R: [.3, -.1] }, face: { eyes: 'squint', mouth: 'teeth', browAng: .3 }, lean: -.06 });
  crownProp(ctx, cx, cy - 120, 1.3, cr);
  if (fall > .95) { const k = sk(lt, 5.1, 5.5); line(ctx, 505, 1440, 560, 1400, 8 * k, INK); dust(ctx, 540, 1460, t, 50 * k, 4); }
  nameTag(ctx, 'PERANG PAREGREG', 540, 620, '#e0392f', lt, .5, 38); nameTag(ctx, 'PEREBUTAN TAKHTA', 540, 720, '#7a4bc4', lt, 1.2, 38);
  if (lt > 4.6) { sweat(ctx, 330, 900, 30, 1); sweat(ctx, 760, 900, 30, 1); }
} });
// 3 — the north coast starts to go its own way
SHOTS.push({ start: 10.49, end: 16.69, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 6.2, z0: 1, z1: 1.06, y0: 960 });
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3fa6d8'); g.addColorStop(1, '#1a6fa6'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  applyCam(ctx, cam, 1);
  const pop = backOut(sk(lt, 0, .5));
  const marks = [[-.6, -.14, 'PESISIR UTARA', '#e0392f', sk(lt, .7, 1.0)], [-.28, -.2, '', '#e07a1a', sk(lt, 1.95, 2.2)], [.05, -.24, '', '#e07a1a', sk(lt, 2.6, 2.85)], [.38, -.24, '', '#e07a1a', sk(lt, 3.1, 3.35)], [.68, -.15, '', '#e07a1a', sk(lt, 3.6, 3.85)]];
  javaMap(ctx, 540, 900, 520 * pop, { marks });
  for (const [sx, sp] of [[170, 0], [540, 1.3], [880, 2.2]]) { const a = sk(lt, 2.0 + sp * .3, 2.4 + sp * .3); if (a > 0) { ctx.save(); ctx.globalAlpha = a; drawShip(ctx, sx, 1230, .33, t, { flag: '#e0392f', hull: '#7a4a2a', ph: sp }); ctx.restore(); } }
  coinBurst(ctx, 540, 1150, lt - 4.5, 16, 3); coinBurst(ctx, 300, 1180, lt - 4.7, 12, 5); coinBurst(ctx, 800, 1180, lt - 4.6, 12, 7);
  const sc = backOut(sk(lt, 4.0, 4.4)); if (sc > 0) { ctx.save(); ctx.translate(540, 1350); ctx.scale(sc, sc); drawChest(ctx, 0, 0, .7, 1); ctx.restore(); }
} });
// 4 — Demak: a small, busy harbor
SHOTS.push({ start: 16.69, end: 22.11, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 5.4, z0: 1, z1: 1.07, y0: 950, x0: 520, x1: 560 });
  world(ctx, cam, t, { mood: 'day', hor: 780, sea: true }); applyCam(ctx, cam, 1);
  const s1 = lerp(1000, 760, easeOut(sk(lt, 3.0, 4.6))); drawShip(ctx, 260, 1020, .55, t, { flag: '#e0392f', hull: '#7a4a2a', ph: 1 }); drawShip(ctx, s1, 1010, .5, t, { flag: '#2f63c9', hull: '#8a5a2c', ph: 2 });
  pier(ctx, 1150, t);
  drawCrate(ctx, 120, 1330, 180, 150, 0, 'TEH'); drawBarrel(ctx, 960, 1320, 1.0); drawBarrel(ctx, 880, 1340, 1.05);
  ST(ctx, ADI[0], 330 + Math.sin(t * 2) * 20, 1520, 460, { legs: walkLegs(t, 7, .3), arms: { L: [.5, -.4], R: [.5, -.4] }, face: { eyes: 'happy', mouth: 'smile' } });
  ST(ctx, ADI[2], 740, 1540, 480, { flip: -1, legs: walkLegs(t + 1, 7, .3), arms: { L: [.5, -.4], R: [.5, -.4] }, face: { eyes: 'happy', mouth: 'grin' } });
  nameTag(ctx, 'DEMAK', 540, 660, '#2f8f5b', lt, .95, 52);
  dust(ctx, 330, 1530, t, 20, 5);
} });
// 5a — Raden Patah and his father
SHOTS.push({ start: 22.11, end: 25.85, tr: 'cut', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 3.7, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  gate(ctx, 540, 1040, .9, 1, '#b8553a'); throneProp(ctx, 860, 1290, 1.1);
  const pop = backOut(sk(lt, 0, .4)), kp = backOut(sk(lt, 2.0, 2.5));
  ST(ctx, RPATAH, 330, 1340, 540 * pop, { bob: Math.sin(t * 3) * .004, arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'normal', mouth: 'smile' } });
  ST(ctx, KERT, 800, 1340, 520 * kp, { flip: -1, arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'normal', mouth: 'smile' } });
  nameTag(ctx, 'RADEN PATAH', 330, 700, '#2f8f5b', lt, .86, 36); nameTag(ctx, 'BRAWIJAYA V', 800, 700, '#d8a02a', lt, 2.4, 36);
} });
// 5b — the last king of Majapahit and a Chinese princess
SHOTS.push({ start: 25.85, end: 29.24, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 3.4, z0: 1, z1: 1.06, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  gate(ctx, 540, 1040, .9, 1, '#b8553a');
  ST(ctx, KERT, 250, 1340, 520, { arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'normal', mouth: 'smile' } });
  const pp = backOut(sk(lt, 1.6, 2.1)); ST(ctx, PUTRI, 830, 1340, 520 * pp, { flip: -1, arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'happy', mouth: 'smile' } });
  const hp = clamp(sk(lt, 2.4, 3.0)); if (hp > 0) { ctx.save(); ctx.globalAlpha = hp; ctx.translate(540, 1000 - hp * 40); ctx.scale(backOut(hp), backOut(hp)); text(ctx, '♥', 0, 0, 140, '#e0392f', INK, 20, 'Poppins', 700); ctx.restore(); }
  nameTag(ctx, 'RAJA TERAKHIR', 250, 690, '#d8a02a', lt, .38, 32); nameTag(ctx, 'MAJAPAHIT', 250, 760, '#d8a02a', lt, .5, 32);
  nameTag(ctx, 'PUTRI TIONGHOA', 830, 700, '#d8312b', lt, 2.3, 34);
} });
// 6 — the coastal lords back him, he steps out of Majapahit's shadow
SHOTS.push({ start: 29.24, end: 34.34, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 5.1, z0: 1, z1: 1.08, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  ctx.save(); ctx.globalAlpha = .55 * (1 - sk(lt, 3.0, 4.2)); gate(ctx, 280, 1030, 1.2, 1, '#2a2030'); ctx.restore();
  const up = sk(lt, .8, 1.2);
  crowd(ctx, ADI[0], 560, 1000, 1210, 2, 300, t, { per: 4, dy: 60, seed: 3, arms: up > 0 ? 'up' : undefined, bounce: up > 0, face: { eyes: 'happy', mouth: 'grin' } });
  crowd(ctx, ADI[1], 120, 460, 1230, 2, 300, t, { per: 3, dy: 60, seed: 8, arms: up > 0 ? 'up' : undefined, bounce: up > 0, face: { eyes: 'happy', mouth: 'grin' } });
  const stepx = kf(lt, [[0, 230], [2.0, 230], [3.4, 540, ease]]);
  ST(ctx, RPATAH, stepx, 1480, 560, { legs: lt > 2.0 && lt < 3.4 ? walkLegs(t, 8, .4) : undefined, bob: Math.sin(t * 3) * .004, arms: lt > 2.0 ? { L: [.5, -.2], R: [2.5, .3] } : { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'normal', mouth: 'grin' } });
  flagDemak(ctx, 940, 1130, .95, t, 430, sk(lt, 2.8, 3.8));
  nameTag(ctx, 'PARA ADIPATI PESISIR', 540, 640, '#3a8f6a', lt, .8, 34);
} });
// 7a — 1478: Majapahit falls
SHOTS.push({ start: 34.34, end: 38.44, tr: 'cut', draw(ctx, lt, t) {
  const col = sk(lt, 2.67, 3.6), cam = mkcam(t, lt, { dur: 4.1, z0: 1, z1: 1.1, y0: 950, shake: 3 + 16 * (lt > 2.67 && lt < 3.4 ? 1 : 0) });
  world(ctx, cam, t, { mood: 'fire', hor: 860 }); applyCam(ctx, cam, 1);
  gateCollapse(ctx, 540, 1040, 1.0, col, t);
  flagProp(ctx, 110, 1130 + col * 120, .95, t, 'maja', 430); flagProp(ctx, 970, 1130 + col * 120, .95, t + 1, 'maja', 430);
  if (col > 0) for (let i = 0; i < 5; i++) dust(ctx, 150 + i * 190, 1080 - sk(lt, 2.7, 3.7) * 20, t, 60 + i * 12, 3 + i);
  fireRow(ctx, 60, 1020, 1300, 1.2, t, 6);
  cracks(ctx, 540, 1040, 1.4, sk(lt, 1.9, 2.6));
  overlay(ctx, () => { kinetic(ctx, '1478', 540, 400, 260, lt, { delay: .4, col: '#ffd23a', pulse: true }); flash(ctx, sk(lt, 2.67, 2.75) * (1 - sk(lt, 2.75, 3.1)) * .8); });
} });
// 7b — Raden Patah founds Demak
SHOTS.push({ start: 38.44, end: 40.97, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 2.5, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  const rise = sk(lt, .7, 1.6); flagDemak(ctx, 790, 1300, 1.2, t, 600, rise);
  ST(ctx, Object.assign({}, RPATAH, { hat: 'crown', crownCol: '#2f8f5b', crownH: 1.0 }), 400, 1340, 560, { bob: Math.sin(t * 3) * .004, arms: { L: [.4, -.1], R: { ik: [.28, -.82 + Math.sin(t * 6) * .02], bend: 1 } }, face: { eyes: 'happy', mouth: 'grin' } });
  if (lt > 1.5) { confetti(ctx, t, 40, 6); }
  nameTag(ctx, 'KESULTANAN DEMAK', 540, 640, '#2f8f5b', lt, 1.43, 40);
} });
// 8 — first Islamic kingdom in Java
SHOTS.push({ start: 40.97, end: 43.84, tr: 'whip', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0f4a3a'); g.addColorStop(1, '#2a8a6a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 1000); ctx.rotate(t * .1); for (let i = 0; i < 14; i++) { ctx.rotate(TAU / 14); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-80, -1600); ctx.lineTo(80, -1600); ctx.closePath(); ctx.fillStyle = 'rgba(255,230,140,.10)'; ctx.fill(); } ctx.restore();
  const pop = backOut(sk(lt, 0, .4));
  javaMap(ctx, 540, 1020, 460 * pop, { glow: .5 + .3 * Math.sin(t * 5), marks: [[-.12, -.16, 'DEMAK', '#2f8f5b', sk(lt, .3, .6)]] });
  flagDemak(ctx, 470, 880, .6, t, 300, 1);
  overlay(ctx, () => { kinetic(ctx, 'KERAJAAN ISLAM', 540, 330, 94, lt, { delay: .5, col: '#fff' }); kinetic(ctx, 'PERTAMA DI JAWA', 540, 450, 86, lt, { delay: 1.4, col: '#ffd23a', pulse: true }); });
} });
// 9 — Wali Songo and the Great Mosque
SHOTS.push({ start: 43.84, end: 47.92, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.1, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 900 }); applyCam(ctx, cam, 1);
  const mp = backOut(sk(lt, 2.3, 3.0)), gl = sk(lt, 2.4, 3.4);
  masjidProp(ctx, 540, 1180, .95 * (lt < 2.3 ? .0001 : mp), t, gl);
  waliLine(ctx, 90, 990, 1560, 250, t, sk(lt, .2, 2.1));
  nameTag(ctx, 'WALI SONGO', 540, 640, '#7a4bc4', lt, .36, 40);
  if (lt > 2.7) nameTag(ctx, 'MASJID AGUNG DEMAK', 540, 740, '#2f8f5b', lt, 2.77, 36);
  if (gl > 0) sparkle(ctx, 540, 640, 40 * gl, .6 + .4 * Math.sin(t * 6));
} });
// 10 — foreign ships with cannons
SHOTS.push({ start: 47.92, end: 53.92, tr: 'cut', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 6, z0: 1, z1: 1.08, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 860, sea: true, seaPal: ['#a07ab0', '#4a5ea0', '#2a3470'] }); applyCam(ctx, cam, 1);
  drawShip(ctx, 270, 1070, .5, t, { flag: '#2f8f5b', hull: '#7a4a2a', ph: 1 });
  const fx = lerp(1400, 700, easeOut(sk(lt, 3.2, 5.2)));
  drawShip(ctx, fx, 1240, .85, t, { flag: '#1b1820', hull: '#3b2a2c', stripe: '#c9a14a', sail: '#e9dfc9', ph: 0, flip: 1, skull: false });
  const fa = sk(lt, 5.2, 5.4) * (1 - sk(lt, 5.6, 6.0));
  cannonFlash(ctx, fx - 330, 1180, 1.2, fa); if (fa > 0) puff(ctx, fx - 380, 1150, 90, t, '#d8d8e0', 6, fa);
  ST(ctx, WIJ, 270, 1250, 200, { shadow: false, face: { eyes: 'wide', mouth: 'o' }, arms: POSE.handsUp.arms });
  exclaim(ctx, 330, 1020, 90, sk(lt, 4.2, 4.5));
  overlay(ctx, () => flash(ctx, sk(lt, 5.2, 5.25) * (1 - sk(lt, 5.25, 5.6)) * .5));
} });
// 11 — end card
SHOTS.push({ start: 53.92, end: 60, tr: 'cut', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0f4a3a'); g.addColorStop(1, '#2a8a6a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 1010); ctx.rotate(t * .1); for (let i = 0; i < 16; i++) { ctx.rotate(TAU / 16); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-80, -1600); ctx.lineTo(80, -1600); ctx.closePath(); ctx.fillStyle = 'rgba(255,230,140,.10)'; ctx.fill(); } ctx.restore();
  javaMap(ctx, 540, 1060, 440, { glow: .5 + .3 * Math.sin(t * 5), marks: [[-.12, -.16, '', '#2f8f5b', 1]] });
  const pop = backOut(sk(lt, .3, .9));
  ST(ctx, Object.assign({}, RPATAH, { hat: 'crown', crownCol: '#2f8f5b' }), 540, 1150, 400 * pop, { bob: Math.sin(t * 3) * .004, arms: { L: [.4, -.1], R: [2.4 + Math.sin(t * 5) * .2, .3] }, face: { eyes: 'happy', mouth: 'grin' } });
  sparkle(ctx, 360, 900, 40, .5 + .5 * Math.sin(t * 5)); sparkle(ctx, 760, 820, 50, .5 + .5 * Math.sin(t * 5 + 2));
  overlay(ctx, () => { kinetic(ctx, 'KESULTANAN DEMAK', 540, 360, 96, lt, { delay: .4, col: '#fff', pulse: true }); kinetic(ctx, '(1478)', 540, 500, 100, lt, { delay: 1.1, col: '#ffd23a', stagger: .04 });
    const k = backOut(sk(lt, 2.4, 2.9)); ctx.save(); ctx.translate(540, 1470); ctx.scale(k, k); ctx.font = '700 36px Poppins'; const w = ctx.measureText('Bersambung ke Part 2').width + 60; rrect(ctx, -w / 2, -34, w, 68, 34); fillStroke(ctx, '#e0392f', 7); text(ctx, 'Bersambung ke Part 2', 0, 2, 36, '#fff', INK, 0, 'Poppins', 700); ctx.restore(); });
} });
