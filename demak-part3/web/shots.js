// ---------- Demak Part 3: Pati Unus melawan Portugis di Malaka (times are voiceover seconds) ----------
const dust = (ctx, x, y, t, r = 40, seed = 3) => puff(ctx, x, y, r, t, '#e9dcc0', seed, .8);
const sk = (v, a, b) => clamp((v - a) / (b - a));
const SHOTS = [];
const RPATAH = { cols: ['#2f8f5b', '#f6f1e8'], hat: 'crown', crownCol: '#2f8f5b', belt: false };
const UNUS = { cols: ['#2f63c9', '#2f63c9'], hat: 'blangkon', hatCol: '#5a3a1c', vest: '#f2c230' };
const TRENG = { cols: ['#2f8f5b', '#2f8f5b'], hat: 'crown', crownCol: '#2f8f5b', robe: '#2f8f5b', robeTrim: GOLD, belt: false };
const FATA = { cols: ['#f6f1e8', '#f6f1e8'], hat: 'band', hatCol: '#f6f1e8', vest: '#7a4bc4', belt: false };
const PORT = { cols: ['#3a3f4a', '#f6f1e8'], hat: 'captain' };
const ADI = [{ cols: ['#3a8f6a', '#3a8f6a'], hat: 'blangkon', hatCol: '#7a4524', vest: '#f2c230' }, { cols: ['#2f63c9', '#2f63c9'], hat: 'blangkon', hatCol: '#5a3a1c' }, { cols: ['#e07a2f', '#e07a2f'], hat: 'blangkon', hatCol: '#7a4524', vest: '#f6f1e8' }];
const DUSKSEA = ['#a07ab0', '#4a5ea0', '#2a3470'];
const demakShip = (ctx, x, y, s, t, ph = 1, flip = -1) => drawShip(ctx, x, y, s, t, { flag: '#2f8f5b', hull: '#7a4a2a', ph, flip });

// 1a — 1511: the Portuguese arrive at Malacca
SHOTS.push({ start: 0, end: 3.62, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 3.6, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 800, sea: true }); applyCam(ctx, cam, 1);
  warship(ctx, lerp(1450, 760, easeOut(sk(lt, .3, 3.2))), 1060, .62, t, -1);
  pier(ctx, 1230, t); fortGate(ctx, 240, 1250, .75, t, { flagCol: '#e0a52a' });
  ST(ctx, ADI[0], 700, 1470, 440, { arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'wide', mouth: 'o', look: [.8, 0] } });
  ST(ctx, ADI[2], 900, 1480, 420, { flip: -1, arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'wide', mouth: 'o', look: [-.8, 0] } });
  nameTag(ctx, 'PORTUGIS', 760, 600, '#3a3f4a', lt, 1.83, 40); nameTag(ctx, 'MALAKA', 240, 560, '#e0a52a', lt, 2.67, 40);
  overlay(ctx, () => kinetic(ctx, '1511', 540, 360, 230, lt, { delay: .2, col: '#ffd23a', pulse: true }));
} });
// 1b — the busiest port, then cannons
SHOTS.push({ start: 3.62, end: 7.88, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.3, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 800, sea: true }); applyCam(ctx, cam, 1);
  const fire = sk(lt, 3.35, 3.5) * (1 - sk(lt, 3.9, 4.25));
  demakShip(ctx, 250, 1000, .45, t, 2); drawShip(ctx, 520, 1010, .42, t, { flag: '#e0392f', hull: '#8a5a2c', ph: 3 });
  warship(ctx, lerp(1450, 880, easeOut(sk(lt, 2.1, 3.3))), 1090, .8, t, -1, fire);
  pier(ctx, 1230, t); drawCrate(ctx, 90, 1380, 170, 140, 0, 'LADA'); drawBarrel(ctx, 560, 1370, 1.0);
  for (let i = 0; i < 4; i++) ST(ctx, ADI[i % 3], 150 + i * 190 + Math.sin(t * 2 + i) * 12, 1500 + (i % 2) * 40, 380, { legs: walkLegs(t + i, 7, .3), arms: { L: [.5, -.4], R: [.5, -.4] }, face: { eyes: 'happy', mouth: 'smile' } });
  if (lt > 3.35) { const k = sk(lt, 3.4, 4.2); cannonBall(ctx, lerp(640, 160, k), 1010 - Math.sin(k * Math.PI) * 120 + k * 120, 1.2); }
  nameTag(ctx, 'PELABUHAN TERRAMAI', 400, 620, '#2f8f5b', lt, .2, 38); nameTag(ctx, 'MERIAM', 780, 700, '#e0392f', lt, 3.4, 44);
  overlay(ctx, () => flash(ctx, sk(lt, 3.38, 3.42) * (1 - sk(lt, 3.42, 3.8)) * .45));
} });
// 2a — spice route falls into their hands
SHOTS.push({ start: 7.88, end: 10.77, tr: 'cut', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 2.9, z0: 1, z1: 1.06, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  arrowTo(ctx, 200, 1000, 840, 1000, '#fff', 12, sk(lt, .5, .9));
  for (let i = 0; i < 3; i++) { const k = clamp((lt - .7 - i * .45) / 1.4); if (k > 0) sack(ctx, lerp(180, 780, k), 1000 + 70 + Math.sin(k * 6) * 10, .55, '#d8b883'); }
  ST(ctx, PORT, 900, 1500, 520, { flip: -1, arms: { L: [2.3, .3], R: [.4, -.2] }, face: { eyes: 'smug', mouth: 'grin' } });
  ST(ctx, ADI[0], 170, 1500, 500, { arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'wide', mouth: 'o', look: [.5, -.2] } });
  if (lt > 1.65) sweat(ctx, 270, 1100, 30, 1);
  nameTag(ctx, 'JALUR REMPAH', 540, 640, '#e07a1a', lt, .86, 46);
} });
// 2b — merchants are threatened
SHOTS.push({ start: 10.77, end: 13.3, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 2.5, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 800, sea: true, seaPal: DUSKSEA }); applyCam(ctx, cam, 1);
  warship(ctx, 800, 1090, .85, t, -1);
  pier(ctx, 1260, t);
  for (let i = 0; i < 3; i++) ST(ctx, ADI[i], 160 + i * 250, 1520, 420, { bob: Math.sin(t * 4 + i) * .01, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'wide', mouth: 'o', browUp: 1 } });
  exclaim(ctx, 270, 900, 100, sk(lt, .8, 1.1)); exclaim(ctx, 520, 860, 120, sk(lt, 1.0, 1.3));
  nameTag(ctx, 'PEDAGANG NUSANTARA', 540, 560, '#2f63c9', lt, .85, 40);
  overlay(ctx, () => kinetic(ctx, 'TERANCAM', 540, 360, 150, lt, { delay: 1.67, col: '#ffd23a', pulse: true }));
} });
// 3a — Demak will not stay silent; Raden Patah and Adipati Unus
SHOTS.push({ start: 13.3, end: 19.17, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 5.9, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  flagDemak(ctx, 130, 1300, 1.0, t, 520, 1); flagDemak(ctx, 960, 1300, 1.0, t + 1, 520, 1);
  const pop = backOut(sk(lt, 0, .4)), fist = lt > .27 && lt < 2.4;
  ST(ctx, RPATAH, 410, 1400, 560 * pop, { bob: Math.sin(t * 3) * .004, arms: fist ? { L: [.4, -.1], R: { ik: [.2, -.8], bend: 1 } } : { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: fist ? 'squint' : 'normal', mouth: fist ? 'teeth' : 'smile', browAng: fist ? .25 : 0 } });
  const up = backOut(sk(lt, 2.4, 3.0)); if (up > 0) ST(ctx, UNUS, 740, 1400, 540 * up, { flip: -1, bob: Math.sin(t * 3 + 1) * .004, arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'normal', mouth: 'grin' } });
  nameTag(ctx, 'RADEN PATAH', 410, 700, '#2f8f5b', lt, 2.74, 36); nameTag(ctx, 'ADIPATI UNUS', 740, 700, '#2f63c9', lt, 4.38, 36); nameTag(ctx, 'JEPARA', 740, 770, '#e07a1a', lt, 4.88, 32);
  overlay(ctx, () => kinetic(ctx, 'TIDAK DIAM', 540, 360, 150, lt, { delay: .4, col: '#ffd23a', exit: 2.4, pulse: true }));
} });
// 3b — Unus leads the fleet
SHOTS.push({ start: 19.17, end: 21.27, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 2.1, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 800, sea: true }); applyCam(ctx, cam, 1);
  for (const [x, y, s, ph] of [[170, 990, .38, 1], [450, 1000, .36, 2], [900, 985, .38, 3]]) demakShip(ctx, x, y, s, t, ph);
  demakShip(ctx, 560, 1330, .95, t, 0);
  ST(ctx, UNUS, 380, 1130, 330, { shadow: false, flip: -1, arms: { L: [.4, -.1], R: { ik: [-.4, -.85], bend: 1 } }, face: { eyes: 'squint', mouth: 'grin' } });
  nameTag(ctx, 'MALAKA', 300, 640, '#e0a52a', lt, 1.2, 40);
} });
// 4a — 1513
SHOTS.push({ start: 21.27, end: 23.28, tr: 'cut', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 2.0, z0: 1, z1: 1.06, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 800, sea: true }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 5; i++) demakShip(ctx, 120 + i * 220, 1000 + (i % 2) * 30, .36, t, i);
  pier(ctx, 1230, t); flagDemak(ctx, 120, 1250, .9, t, 450, 1);
  overlay(ctx, () => { kinetic(ctx, '1513', 540, 360, 250, lt, { delay: .2, col: '#ffd23a', pulse: true }); });
} });
// 4b — the voyage on the map
const RT = [[650, 1060], [560, 930], [400, 840], [250, 770], [120, 740]];
SHOTS.push({ start: 23.28, end: 27.72, tr: 'whip', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3fa6d8'); g.addColorStop(1, '#1a6fa6'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const cam = mkcam(t, lt, { dur: 4.4, z0: 1, z1: 1.06, y0: 960 }); applyCam(ctx, cam, 1);
  nusantaraMap(ctx, 700, 960, 800, t, 0);
  const p = easeOut(sk(lt, .8, 3.7)); const [ex, ey, ea] = ropeRoute(ctx, RT, p);
  for (let i = 1; i < 5; i++) { const q = clamp(p - i * .05); if (q > 0) { const a = ropePoint(RT, q); demakShip(ctx, a[0], a[1] + (i % 2 ? 22 : -22), .13, t + i, i); } }
  demakShip(ctx, ex, ey, .2, t, 0);
  const mp = backOut(sk(lt, 3.3, 3.7)); if (mp > 0) { ctx.save(); ctx.translate(120, 740); ctx.scale(mp, mp); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-34, -40, -34, -86, 0, -86); ctx.bezierCurveTo(34, -86, 34, -40, 0, 0); fillStroke(ctx, '#e0392f', 6); circle(ctx, 0, -58, 12); ctx.fillStyle = '#fff'; ctx.fill(); ctx.restore(); }
  nameTag(ctx, 'SEKITAR 100 KAPAL', 540, 330, '#2f8f5b', lt, .44, 46); nameTag(ctx, 'SELAT MALAKA', 330, 600, '#e0392f', lt, 3.4, 40);
} });
// 5 — the battle: brave ships against cannons
SHOTS.push({ start: 27.72, end: 32.82, tr: 'cut', draw(ctx, lt, t) {
  const shk = lt > 3.3 ? shake(t * 9, 8 * (1 - sk(lt, 3.3, 5)), 3) : [0, 0];
  const cam = mkcam(t, lt, { dur: 5.1, z0: 1, z1: 1.07, y0: 950, shake: 3 + (lt > 3.3 ? 8 : 0) });
  world(ctx, cam, t, { mood: 'dusk', hor: 820, sea: true, seaPal: DUSKSEA }); applyCam(ctx, cam, 1);
  const adv = sk(lt, 0, 1.5);
  for (const [x, y, s, ph] of [[170 + adv * 90, 1020, .42, 1], [400 + adv * 90, 1090, .46, 2]]) { demakShip(ctx, x, y, s, t, ph); ST(ctx, { cols: ['#3a8f6a', '#3a8f6a'], hat: 'blangkon', hatCol: '#7a4524' }, x + 20, y - 60, 100 * (s / .42), { shadow: false, flip: -1, arms: { L: [2.4, .3], R: [2.4 + Math.sin(t * 10) * .3, .3] }, face: { eyes: 'squint', mouth: 'grin' } }); }
  const fire = sk(lt, 1.9, 2.1) * (1 - sk(lt, 2.6, 3.0)), fire2 = sk(lt, 3.3, 3.5) * (1 - sk(lt, 4.0, 4.4));
  warship(ctx, 880, 1250, .95, t, -1, Math.max(fire, fire2));
  for (const [a0, tx] of [[1.95, 330], [3.3, 560]]) if (lt > a0) { const k = sk(lt, a0, a0 + .8); cannonBall(ctx, lerp(720, tx, k), 1160 - Math.sin(k * Math.PI) * 160 + k * 60, 1.3); }
  const hit = sk(lt, 3.9, 4.0) * (1 - sk(lt, 4.4, 4.9)); if (hit > 0) { burst(ctx, 560, 1120, 120 * hit + 40, 12, '#ffd23a', 6, .5); puff(ctx, 560, 1080, 90, t, '#d8d8e0', 4, hit); }
  nameTag(ctx, 'MERIAM', 760, 640, '#e0392f', lt, 3.48, 44); nameTag(ctx, 'PASUKAN DEMAK', 300, 640, '#2f8f5b', lt, .4, 38);
  overlay(ctx, () => flash(ctx, sk(lt, 3.3, 3.34) * (1 - sk(lt, 3.34, 3.7)) * .4));
} });
// 6 — failure, ships go down
SHOTS.push({ start: 32.82, end: 36.48, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 3.6, z0: 1, z1: 1.06, y0: 950, shake: 3 + (lt < 1.2 ? 8 : 0) });
  world(ctx, cam, t, { mood: 'fire', hor: 820, sea: true, seaPal: ['#8a4a58', '#4a3050', '#2a1a3a'] }); applyCam(ctx, cam, 1);
  const k1 = sk(lt, 1.4, 3.3), k2 = sk(lt, 1.9, 3.5);
  sinkingShip(ctx, 300, 1140, .6, t, k1, -1); sinkingShip(ctx, 700, 1190, .55, t + 1, k2, 1);
  fireProp(ctx, 300, 1100 + k1 * 90, 1.3 * (1 - k1 * .6), t, 3); fireProp(ctx, 700, 1150 + k2 * 90, 1.2 * (1 - k2 * .6), t + 1, 5);
  for (let i = 0; i < 4; i++) dust(ctx, 200 + i * 220, 900 - lt * 20, t, 60, 3 + i);
  const st = sk(lt, .5, .7); stamp(ctx, 'GAGAL', 540, 520, st, -.1, '#e0392f', 200);
} });
// 7 — Pangeran Sabrang Lor
SHOTS.push({ start: 36.48, end: 44.19, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 7.7, z0: 1, z1: 1.09, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 840, sea: true, seaPal: DUSKSEA }); applyCam(ctx, cam, 1);
  demakShip(ctx, 760, 1170, .75, t, 1);
  const sw = Math.sin(t * 3) * .01;
  ST(ctx, UNUS, 360, 1740, 640, { bob: sw, arms: lt > 4.6 ? { L: [.4, -.1], R: { ik: [.34, -.9], bend: 1 } } : { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: lt > 4.6 ? 'squint' : 'half', mouth: lt > 4.6 ? 'grin' : 'flat', browAng: -.05 }, headTilt: sw * 3 });
  nameTag(ctx, 'ADIPATI UNUS', 360, 640, '#2f63c9', lt, 1.55, 38);
  overlay(ctx, () => { kinetic(ctx, 'PANGERAN', 540, 330, 120, lt, { delay: 2.59, col: '#fff' }); kinetic(ctx, 'SABRANG LOR', 540, 480, 130, lt, { delay: 3.0, col: '#ffd23a', pulse: true }); });
  if (lt > 5.3) for (let i = 0; i < 3; i++) { const ph = (t * .5 + i * .3) % 1; ctx.save(); ctx.globalAlpha = Math.sin(ph * Math.PI) * .6; ctx.strokeStyle = '#fff'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(120 + i * 70 - ph * 60, 1500 + i * 55); ctx.lineTo(260 + i * 70 - ph * 60, 1500 + i * 55); ctx.stroke(); ctx.restore(); }
} });
// 8a — Sultan of Demak
SHOTS.push({ start: 44.19, end: 46.65, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 2.5, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  gate(ctx, 540, 1040, .9, 1, '#b8553a'); throneProp(ctx, 540, 1330, 1.3);
  const pop = backOut(sk(lt, 0, .4));
  ST(ctx, Object.assign({}, UNUS, { hat: 'crown', crownCol: '#2f8f5b' }), 540, 1330, 560 * pop, { bob: Math.sin(t * 3) * .004, arms: { L: [.5, -.2], R: [.5, -.2] }, face: { eyes: 'happy', mouth: 'smile' } });
  nameTag(ctx, 'SULTAN DEMAK KEDUA', 540, 640, '#2f8f5b', lt, .85, 40);
  sparkle(ctx, 380, 880, 40, .5 + .5 * Math.sin(t * 5)); sparkle(ctx, 720, 840, 50, .5 + .5 * Math.sin(t * 5 + 2));
} });
// 8b — 1521
SHOTS.push({ start: 46.65, end: 51.05, tr: 'whip', draw(ctx, lt, t) {
  const dim = sk(lt, 2.1, 3.6);
  const cam = mkcam(t, lt, { dur: 4.4, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 840, sea: true, seaPal: DUSKSEA }); applyCam(ctx, cam, 1);
  const bx = lerp(900, 640, easeOut(sk(lt, 0, 2.0)));
  demakShip(ctx, bx, 1250, .85, t, 1);
  flagDemak(ctx, bx - 20, 1170, .7, t, 360, 1 - sk(lt, 2.2, 3.4) * .5);
  warship(ctx, 190, 1020, .5, t, 1);
  overlay(ctx, () => { kinetic(ctx, '1521', 540, 360, 230, lt, { delay: .7, col: '#ffd23a', exit: 3.8 }); darkness(ctx, dim * .55); });
  if (dim > .4) sparkle(ctx, bx, 1000 - dim * 120, 50, Math.sin(clamp((dim - .4) * 1.7) * Math.PI));
  nameTag(ctx, 'MALAKA', 190, 650, '#e0a52a', lt, 3.5, 36);
} });
// 9a — Trenggana continues the struggle
SHOTS.push({ start: 51.05, end: 55.91, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.9, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  gate(ctx, 540, 1040, .9, 1, '#b8553a'); throneProp(ctx, 540, 1330, 1.3);
  flagDemak(ctx, 110, 1300, 1.0, t, 520, 1); flagDemak(ctx, 970, 1300, 1.0, t + 1, 520, 1);
  const pop = backOut(sk(lt, 0, .4));
  ST(ctx, TRENG, 540, 1330, 560 * pop, { bob: Math.sin(t * 3) * .004, arms: { L: [.5, -.2], R: [.5, -.2] }, face: { eyes: 'normal', mouth: 'grin' } });
  nameTag(ctx, 'SULTAN TRENGGANA', 540, 640, '#2f8f5b', lt, 1.5, 40);
  overlay(ctx, () => kinetic(ctx, '1527', 540, 330, 220, lt, { delay: 3.33, col: '#ffd23a', pulse: true }));
} });
// 9b — Fatahillah takes Sunda Kelapa, it becomes Jayakarta
SHOTS.push({ start: 55.91, end: 61.1, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 5.2, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 800, sea: true }); applyCam(ctx, cam, 1);
  const win = sk(lt, 2.5, 3.2);
  for (const [x, y, s, ph] of [[190, 1000, .42, 1], [470, 1010, .4, 2], [740, 995, .42, 3]]) demakShip(ctx, x, y, s, t, ph);
  pier(ctx, 1230, t);
  fortGate(ctx, 880, 1250, .7, t, { flag: win < .5, flagCol: '#e0a52a' }); flagDemak(ctx, 880, 1010, .55, t, 330, sk(lt, 2.6, 3.4));
  ST(ctx, FATA, 330, 1500, 500, { bob: Math.sin(t * 3) * .004, arms: { L: [.4, -.1], R: lt > 1.0 ? { ik: [.3, -.8], bend: 1 } : [.4, -.1] }, face: { eyes: 'squint', mouth: 'grin' } });
  nameTag(ctx, 'FATAHILLAH', 330, 760, '#7a4bc4', lt, 1.09, 36); nameTag(ctx, 'SUNDA KELAPA', 700, 640, '#2f63c9', lt, 1.91, 36);
  signboard(ctx, 'JAYAKARTA', 540, 1000, 1.0, sk(lt, 4.17, 4.5));
  if (lt > 4.2) confetti(ctx, t, 30, 5);
} });
// 10 — the lesson: who controls the sea controls the spice trade
SHOTS.push({ start: 61.1, end: 67.23, tr: 'cut', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0f3a5a'); g.addColorStop(1, '#2a8a9a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 1010); ctx.rotate(t * .1); for (let i = 0; i < 16; i++) { ctx.rotate(TAU / 16); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-80, -1600); ctx.lineTo(80, -1600); ctx.closePath(); ctx.fillStyle = 'rgba(255,230,140,.10)'; ctx.fill(); } ctx.restore();
  nusantaraMap(ctx, 540, 1020, 760, t, sk(lt, 3.6, 5.0));
  for (const [x, y, s, ph] of [[190, 1300, .3, 1], [880, 1260, .3, 2]]) demakShip(ctx, x, y, s, t, ph);
  const sp = backOut(sk(lt, 3.9, 4.5)); if (sp > 0) { sack(ctx, 300, 1200, .6 * sp, '#d8b883'); sack(ctx, 800, 1190, .6 * sp, '#d8b883'); drawChiliPod(ctx, 540, 1140, 1.0 * sp, -.4, '#d92b1c'); }
  overlay(ctx, () => { kinetic(ctx, 'MENGUASAI LAUT', 540, 330, 98, lt, { delay: 1.4, col: '#fff' }); kinetic(ctx, 'MENGUASAI REMPAH', 540, 470, 84, lt, { delay: 3.6, col: '#ffd23a', pulse: true }); });
} });
// 11 — end card
SHOTS.push({ start: 67.23, end: 73, tr: 'cut', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0f4a3a'); g.addColorStop(1, '#2a8a6a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 1010); ctx.rotate(t * .1); for (let i = 0; i < 16; i++) { ctx.rotate(TAU / 16); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-80, -1600); ctx.lineTo(80, -1600); ctx.closePath(); ctx.fillStyle = 'rgba(255,230,140,.10)'; ctx.fill(); } ctx.restore();
  const pop = backOut(sk(lt, .3, .9));
  flagDemak(ctx, 540, 1400, 1.6 * pop, t, 620, 1);
  ST(ctx, UNUS, 300, 1500, 420 * pop, { arms: { L: [.4, -.1], R: [2.4 + Math.sin(t * 5) * .2, .3] }, face: { eyes: 'happy', mouth: 'grin' } });
  ST(ctx, Object.assign({}, FATA), 800, 1500, 420 * pop, { flip: -1, arms: { L: [.4, -.1], R: [2.4 + Math.sin(t * 5 + 1) * .2, .3] }, face: { eyes: 'happy', mouth: 'grin' } });
  sparkle(ctx, 360, 900, 40, .5 + .5 * Math.sin(t * 5)); sparkle(ctx, 760, 820, 50, .5 + .5 * Math.sin(t * 5 + 2));
  overlay(ctx, () => { kinetic(ctx, 'KESULTANAN DEMAK', 540, 330, 92, lt, { delay: .4, col: '#fff', pulse: true }); kinetic(ctx, 'SERI DEMAK', 540, 470, 100, lt, { delay: 1.1, col: '#ffd23a', stagger: .04 });
    const k = backOut(sk(lt, 2.4, 2.9)); ctx.save(); ctx.translate(540, 1760); ctx.scale(k, k); ctx.font = '700 34px Poppins'; const w = ctx.measureText('Lanjut: Perebutan Rempah?').width + 60; rrect(ctx, -w / 2, -34, w, 68, 34); fillStroke(ctx, '#e0392f', 7); text(ctx, 'Lanjut: Perebutan Rempah?', 0, 2, 34, '#fff', INK, 0, 'Poppins', 700); ctx.restore(); });
} });
