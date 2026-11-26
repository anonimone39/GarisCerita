// ---------- Majapahit reel: shots (times are voiceover seconds) ----------
// hand-held prop: draws fn() in the hand's local, unflipped, pixel-sized space
const hold = (which, s, flip, fn) => (ctx, k, p) => { if (k !== which) return; ctx.save(); ctx.translate(p[0], p[1]); ctx.scale(flip / s, 1 / s); fn(ctx); ctx.restore(); };
const dust = (ctx, x, y, t, r = 40, seed = 3) => puff(ctx, x, y, r, t, '#e9dcc0', seed, .8);
const sk = (v, a, b) => clamp((v - a) / (b - a));
const mixc = (a, b, k) => mix(a, b, clamp(k));
const SHOTS = [];

// 1 — hook: Raden Wijaya calm in the fire, Mongol army confused behind him
SHOTS.push({ start: 0, end: 4.9, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.9, z0: 1, z1: 1.1, y0: 940 });
  world(ctx, cam, t, { mood: 'fire', hor: 840 }); applyCam(ctx, cam, 1);
  fireRow(ctx, 60, 1020, 1010, 1.5, t, 7);
  crowd(ctx, MONG, 90, 990, 1130, 3, 190, t, { per: 7, dy: 48, shrink: .1, seed: 3, face: { eyes: 'wide', mouth: 'o', look: [Math.sin(t * 2) * .8, 0] } });
  qmark(ctx, 250, 850, 80, t, sk(lt, .8, 1.1), -.2); qmark(ctx, 820, 830, 96, t + 1, sk(lt, 1.4, 1.7), .2); qmark(ctx, 560, 800, 70, t + 2, sk(lt, 2.2, 2.5));
  sweat(ctx, 330, 960, 26, sk(lt, 1, 1.3)); sweat(ctx, 760, 940, 26, sk(lt, 1.8, 2.1));
  fireProp(ctx, 190, 1230, 1.8, t + 2, 5); fireProp(ctx, 890, 1230, 1.8, t + 4, 7);
  ST(ctx, WIJ, 540, 1300, 520, Object.assign({ bob: Math.sin(t * 3) * .004, headTilt: Math.sin(t * 1.5) * .03, face: { eyes: 'half', mouth: 'smirk', browAng: -.08 } }, POSE.hips));
  fireProp(ctx, 70, 1360, 1.5, t + 1, 4); fireProp(ctx, 1015, 1350, 1.4, t + 3, 6);
  nameTag(ctx, 'RADEN WIJAYA', 540, 745, '#25a06a', lt, .3);
  embers(ctx, t, 0, 1080, 1300);
} });

// 2 — Mongol commander, confused (close up)
SHOTS.push({ start: 4.9, end: 7.3, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 2.4, z0: 1, z1: 1.1, y0: 960 });
  world(ctx, cam, t, { mood: 'fire', hor: 840 }); applyCam(ctx, cam, 1);
  fireRow(ctx, 40, 1040, 1000, 1.4, t, 7);
  crowd(ctx, MONG, 60, 1020, 1030, 2, 230, t, { per: 5, seed: 8, face: { eyes: 'wide', mouth: 'o', look: [Math.sin(t * 3), 0] } });
  ST(ctx, MONGC, 540, 1560, 760, { bob: Math.sin(t * 3) * .004, arms: { L: [.3, -.1], R: { ik: [.1, -.93 + Math.sin(t * 14) * .02], bend: -1 } }, face: { eyes: 'wide', look: [Math.sin(t * 3.5) * .9, -.3], mouth: lt > 1.3 ? 'frown' : 'o', browUp: 1 }, headTilt: .05 * Math.sin(t * 6) });
  qmark(ctx, 330, 640, 120, t, sk(lt, .3, .6), -.3); qmark(ctx, 760, 600, 150, t + 1, sk(lt, .6, .9), .25); qmark(ctx, 560, 500, 100, t + 2, sk(lt, 1.1, 1.4));
  sweat(ctx, 400, 900, 44, sk(lt, .5, .8));
  nameTag(ctx, 'KOMANDAN MONGOL', 540, 700, '#2a4f9e', lt, .15, 38);
} });

// 3 — title: "Majapahit" on a glowing map of Java
SHOTS.push({ start: 7.3, end: 9.1, tr: 'whip', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0f3a4a'); g.addColorStop(1, '#1f8a6a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 820); ctx.rotate(t * .2); for (let i = 0; i < 14; i++) { ctx.rotate(TAU / 14); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-90, -1500); ctx.lineTo(90, -1500); ctx.closePath(); ctx.fillStyle = 'rgba(255,230,140,.10)'; ctx.fill(); } ctx.restore();
  const pop = backOut(clamp(lt / .5));
  javaMap(ctx, 540, 900, 500 * pop, { glow: .55 + .35 * Math.sin(t * 5), marks: [[.58, -.1, 'MAJAPAHIT', '#e0392f', sk(lt, .8, 1.1)]] });
  sparkle(ctx, 300 + Math.sin(t * 4) * 20, 640, 40, sk(lt, .5, .8)); sparkle(ctx, 800, 960, 50, sk(lt, .9, 1.2));
  overlay(ctx, () => kinetic(ctx, 'MAJAPAHIT', 540, 420, 148, lt, { delay: 1.0 - .2, col: GOLD, pulse: true }));
} });

// 4 — 1292: Singhasari falls, Jayakatwang kicks the crown
SHOTS.push({ start: 9.1, end: 14.5, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 5.4, z0: 1, z1: 1.08, y0: 950 });
  world(ctx, cam, t, { mood: 'fire', hor: 860 }); applyCam(ctx, cam, 1);
  gate(ctx, 540, 1040, 1.05); fireProp(ctx, 290, 830, 2.1, t, 2); fireProp(ctx, 790, 830, 2.1, t + 2, 5); fireProp(ctx, 540, 960, 1.4, t + 1, 8);
  flagProp(ctx, 100, 1120, .9, t, 'kediri', 420); flagProp(ctx, 960, 1120, .9, t + 1, 'kediri', 420);
  crowd(ctx, KEDI, 120, 960, 1135, 2, 175, t, { per: 6, seed: 4, arms: 'up', mouth: 'grin', face: { eyes: 'happy', mouth: 'grin' } });
  const kick = kf(lt, [[2.1, 0], [2.5, 1], [2.9, 0]]);
  // crown
  let cx = 470, cy = 1245, cr = 0;
  if (lt >= 2.5) { const k = lt - 2.5; cx = 470 - k * 280; cy = Math.min(1290, 1245 - k * 760 + k * k * 980); cr = k * 9; if (cy >= 1290) cr = 9 * 1.1; }
  crownProp(ctx, cx, cy, .95, cr, GOLD);
  if (lt > 2.45 && lt < 3.0) burst(ctx, 560, 1180, 70 * (1 + (lt - 2.5)), 9, '#fff2a0', 5);
  ST(ctx, JAYA, 770, 1275, 440, { flip: -1, bob: Math.sin(t * 3) * .004, legs: { L: [.1, -.04], R: [.14 + kick * 1.15, -kick * .5] }, lean: -kick * .08, arms: { L: [.5, -.2], R: [2.2 + Math.sin(t * 6) * .2, .3] }, face: { eyes: 'smug', mouth: 'grin', browAng: .2 } });
  nameTag(ctx, 'JAYAKATWANG', 770, 690, '#7a4bc4', lt, .5);
  embers(ctx, t, 0, 1080, 1300, 20, 7);
  overlay(ctx, () => kinetic(ctx, '1292', 540, 400, 210, lt, { delay: .15, col: '#ffd23a', exit: 4.3, pulse: true }));
} });

// 5 — Raden Wijaya runs away from the burning city
SHOTS.push({ start: 14.5, end: 17.9, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 3.4, x0: 300, x1: 900, z0: 1.05, z1: 1.0, shake: 6 });
  world(ctx, cam, t, { mood: 'fire', hor: 860 }); applyCam(ctx, cam, 1);
  gate(ctx, 120, 1020, .9); fireRow(ctx, 20, 240, 780, 1.6, t, 3);
  const cx = cam.x;
  for (let i = 0; i < 3; i++) dust(ctx, cx - 130 - i * 70, 1250, t * 3 + i, 30 + i * 10, i + 1);
  ST(ctx, MAJA, cx - 330, 1245, 240, { legs: walkLegs(t + 1, 12, .7), arms: walkArms(t + 1, 12, .6), lean: .1, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } });
  ST(ctx, MAJA, cx - 190, 1215, 230, { legs: walkLegs(t + 2, 12, .7), arms: walkArms(t + 2, 12, .6), lean: .1, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } });
  ST(ctx, WIJ, cx + 20, 1265, 430, { legs: walkLegs(t, 12, .8), arms: { L: [.6 + Math.sin(t * 12) * .5, -.4], R: [.6 - Math.sin(t * 12) * .5, -.4] }, lean: .12, bob: Math.abs(Math.sin(t * 12)) * -.012, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } });
  sweat(ctx, cx - 60, 905 - Math.sin(t * 8) * 8, 30, 1); sweat(ctx, cx - 100, 950, 22, 1);
  nameTag(ctx, 'RADEN WIJAYA', cx + 30, 720, '#25a06a', lt, .15);
  embers(ctx, t, cx - 600, cx + 600, 1300, 24, 3);
  speedLines(ctx, t, .35);
} });

// 6 — pretending to surrender: bows to Jayakatwang, gets the Tarik forest
SHOTS.push({ start: 17.9, end: 22.4, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.5, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 860 }); applyCam(ctx, cam, 1);
  gate(ctx, 540, 1040, .9, 1, '#b8553a'); throneProp(ctx, 840, 1290, 1.25);
  ST(ctx, JAYA, 810, 1265, 430, { flip: -1, bob: Math.sin(t * 3) * .004, arms: { L: [.4, -.2], R: lt > 1.7 ? { ik: [.3, -.5], bend: 1 } : [.4, -.2] }, face: { eyes: 'happy', mouth: 'smile' } });
  const bow = kf(lt, [[0, 0], [.6, .4, easeOut]]);
  ST(ctx, WIJ, 380, 1265, 430, { lean: bow, headTilt: bow * .3, arms: { L: { ik: [.2, -.6], bend: 1 }, R: { ik: [.2, -.62], bend: -1 } }, face: { eyes: lt > .8 ? 'smug' : 'normal', mouth: lt > .8 ? 'smirk' : 'frown', browAng: lt > .8 ? -.25 : .2, look: [1, .5] } });
  bubble(ctx, 360, 560, 540, 150, 'Hamba menyerah,\nPaduka!', 440, 790, 38, sk(lt, .9, 1.2) * (1 - sk(lt, 2.2, 2.5)));
  const sp = kf(lt, [[1.7, [700, 1060]], [2.7, [640, 1075], easeOut]]);
  if (lt > 1.7) scrollProp(ctx, sp[0], sp[1] + Math.sin(t * 4) * 5, 300, 130, 'HUTAN TARIK', Math.sin(t * 3) * .05);
  nameTag(ctx, 'JAYAKATWANG', 840, 690, '#7a4bc4', lt, .1); nameTag(ctx, 'RADEN WIJAYA', 340, 720, '#25a06a', lt, .1);
} });

// 7 — "Padahal, itu cuma akting": the sly face behind the bow
SHOTS.push({ start: 22.4, end: 27.3, tr: 'whip', draw(ctx, lt, t) {
  const z = kf(lt, [[0, 1], [2.4, 1.0], [3.3, 1.8, easeOut]]), cxm = kf(lt, [[0, 540], [2.4, 540], [3.3, 450, easeOut]]), cym = kf(lt, [[0, 960], [2.4, 960], [3.3, 900, easeOut]]);
  const cam = { x: cxm + shake(t * .35, 3, 1, 2)[0], y: cym, z, r: 0 };
  world(ctx, cam, t, { mood: 'dusk', hor: 860 }); applyCam(ctx, cam, 1);
  gate(ctx, 540, 1040, .9, 1, '#b8553a'); throneProp(ctx, 860, 1290, 1.2);
  const up = sk(lt, 2.5, 3.0), pat = Math.sin(t * 9) * .02;
  ST(ctx, JAYA, 660, 1265, 430, { flip: -1, bob: Math.sin(t * 9) * .006, armLen: 1.3, arms: { L: [.4, -.2], R: { ik: [.4, -.93 + pat], bend: 1 } }, face: { eyes: 'happy', mouth: 'grin' }, headTilt: Math.sin(t * 9) * .04 });
  ST(ctx, WIJ, 470, 1265, 430, { lean: .5 * (1 - up), headTilt: .1 - up * .1, arms: { L: [.2, -.1], R: [.25, -.1] }, face: lt < 2.6 ? { eyes: 'normal', mouth: 'frown', look: [0, .6], browAng: .25 } : { eyes: 'smug', mouth: 'smirk', browAng: -.3, browOne: 1 } });
  if (lt > 2.4 && lt < 4.6) { const k = sk(lt, 2.8, 3.1); text(ctx, 'hehe', 590, 700 - k * 20, 54, '#fff', INK, 12, 'Poppins', 700); }
  clapper(ctx, 640, 790, 1.15 * backOut(sk(lt, 4.1, 4.4)), sk(lt, 4.1, 4.3), sk(lt, 4.3, 4.45) * (lt > 4.45 ? 0 : 1));
} });

// 8 — the secret base in the Tarik forest
SHOTS.push({ start: 27.3, end: 31.4, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.1, z0: 1, z1: 1.08, y0: 960 });
  world(ctx, cam, t, { mood: 'day', hor: 800 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 9; i++) treeProp(ctx, -40 + i * 140, 1010 + (i % 2) * 30, .8 + (i % 3) * .08, 0, ['#2f8a3c', '#3a9a44', '#2a7a38'][i % 3], t);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = 'rgba(10,50,30,.2)'; ctx.fillRect(0, 0, W, H); ctx.restore(); applyCam(ctx, cam, 1);
  hutProp(ctx, 820, 1150, 1.5, sk(lt, .3, 3.6));
  const sw = Math.sin(t * 8);
  ST(ctx, MAJA, 650, 1220, 250, { flip: -1, arms: { L: [.6, -.3], R: [1.2 + sw * .7, -.4] }, face: { eyes: 'normal', mouth: 'smile', look: [-1, 0] }, prop: hold('R', 250, -1, c => { c.rotate(-.6 + sw * .5); axeProp(c, 0, 0, 55, 0); }) });
  ST(ctx, MAJA, 960, 1190, 230, { flip: -1, arms: { L: [2.3 + sw * .2, .3], R: [.4, -.2] }, face: { eyes: 'happy', mouth: 'smile' } });
  const sn = Math.sin(t * 6);
  ST(ctx, WIJ, 300, 1270, 430, { lean: .12, legs: { L: [.5 + sn * .15, -.5], R: [.05, -.15 - Math.max(0, sn) * .3] }, arms: { L: [.3, -.1], R: { ik: [.05, -.68], bend: 1 } }, face: { eyes: 'half', look: [1, 0], mouth: 'smirk', browAng: -.2 } });
  text(ctx, 'ssst...', 470, 880 + Math.sin(t * 4) * 6, 46, '#fff', INK, 11, 'Poppins', 700);
  nameTag(ctx, 'RADEN WIJAYA', 300, 720, '#25a06a', lt, .1);
} });

// 9 — chopping trees, eating the bitter maja fruit
SHOTS.push({ start: 31.4, end: 35.5, tr: 'whip', draw(ctx, lt, t) {
  const z1 = 1 + .14 * sk(lt, 2.4, 4.1), cam = { x: lerp(540, 700, sk(lt, 2.4, 4.1)) + shake(t * .35, 3, 1, 2)[0], y: 960, z: z1, r: 0 };
  world(ctx, cam, t, { mood: 'day', hor: 800 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 4; i++) treeProp(ctx, 760 + i * 130, 1010 + (i % 2) * 30, .8, 0, '#2f8a3c', t);
  const hit = [.55, .95, 1.35].map(h => Math.max(0, 1 - Math.abs(lt - h) * 8)).reduce((a, b) => a + b, 0);
  const fall = lt < 1.5 ? Math.sin(lt * 40) * .03 * hit : kf(lt, [[1.5, 0], [2.4, -1.45, easeIn]]);
  treeProp(ctx, 330, 1170, 1.2, fall, '#3a9a44', t);
  const swing = kf(lt % .4, [[0, 2.0], [.2, .8, easeIn], [.4, 2.0]]);
  ST(ctx, MAJA, 470, 1230, 300, { flip: -1, arms: { L: [.5, -.2], R: [lt < 1.6 ? swing : .5, -.2] }, face: { eyes: 'squint', mouth: 'grin' }, prop: hold('R', 300, -1, c => { c.rotate(lt < 1.6 ? -(swing - 1.4) * .8 : 0); axeProp(c, 0, 0, 70, 0); }) });
  if (lt < 1.6 && lt % .4 > .17 && lt % .4 < .3) burst(ctx, 380, 1090, 40, 8, '#fff2a0', 3);
  const sick = sk(lt, 2.7, 3.4), bite = lt > 2.0;
  ST(ctx, WIJ, 800, 1270, 430, { flip: -1, headCol: mixc('#f6f2ea', '#b8e07a', sick), arms: { L: [.3, -.1], R: lt > 1.4 ? { ik: [.07, -.66], bend: -1 } : [.3, -.1] }, face: sick > .1 ? { eyes: 'squint', mouth: 'wavy', browAng: .3 } : { eyes: 'normal', mouth: bite ? 'grin' : 'smile', look: [-1, 0] }, prop: hold('R', 430, -1, c => { if (lt > 1.4) majaFruit(c, 0, -4, .6); }) });
  if (sick > .4) { sweat(ctx, 850, 880, 26, sick); text(ctx, 'blek!', 700, 780 + Math.sin(t * 9) * 4, 54, '#c9f06a', INK, 12, 'Poppins', 700); }
  nameTag(ctx, 'RADEN WIJAYA', 800, 720, '#25a06a', lt, .1);
  overlay(ctx, () => kinetic(ctx, 'PAHIT!', 540, 400, 150, lt, { delay: 3.5 - .0, col: '#b8e04a', exit: 4.05, rot: -.06 }));
} });

// 10 — maja + pahit = Majapahit
SHOTS.push({ start: 35.5, end: 37.8, tr: 'whip', draw(ctx, lt, t) {
  const g = ctx.createRadialGradient(540, 900, 100, 540, 900, 1300); g.addColorStop(0, '#2f9a5a'); g.addColorStop(1, '#0d3a2a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const p = backOut(sk(lt, 0, .45));
  ctx.save(); ctx.translate(230, 640); ctx.rotate(Math.sin(t * 4) * .08); majaFruit(ctx, 0, 0, 3.2 * p); ctx.restore();
  overlay(ctx, () => { kinetic(ctx, '+', 540, 640, 130, lt, { delay: .5, col: '#fff' }); kinetic(ctx, 'PAHIT', 830, 640, 110, lt, { delay: .6, col: '#ffb84a' }); kinetic(ctx, 'MAJAPAHIT', 540, 1050, 150, lt, { delay: 1.05, col: GOLD, pulse: true }); });
  sparkle(ctx, 200, 520, 44, sk(lt, 1.1, 1.4)); sparkle(ctx, 920, 900, 50, sk(lt, 1.3, 1.6));
} });

// 11 — 20.000 Mongol soldiers land on Java
SHOTS.push({ start: 37.8, end: 42.6, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.8, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 780, sea: true }); applyCam(ctx, cam, 1);
  ctx.beginPath(); ctx.moveTo(880, 800); ctx.quadraticCurveTo(1000, 700, 1300, 790); ctx.lineTo(1300, 900); ctx.lineTo(880, 900); ctx.closePath(); fillStroke(ctx, '#d9c07a', 6);
  ctx.beginPath(); ctx.moveTo(910, 800); ctx.quadraticCurveTo(1010, 735, 1300, 800); ctx.lineTo(1300, 790); ctx.lineTo(910, 790); ctx.closePath(); ctx.fillStyle = '#5ab04a'; ctx.fill();
  palm(ctx, 980, 830, .6, t, .12); palm(ctx, 1060, 840, .5, t + 1, -.1);
  junk(ctx, kf(lt, [[0, 600], [4.8, 740]]), 960, .36, t, { ph: 1 }); junk(ctx, kf(lt, [[0, 330], [4.8, 500]]), 1070, .45, t, { ph: 2 });
  junk(ctx, kf(lt, [[0, 40], [4.8, 280]]), 1200, .56, t, { ph: 0 });
  nameTag(ctx, 'ARMADA MONGOL', 300, 760, '#2a4f9e', lt, .2);
  overlay(ctx, () => { kinetic(ctx, '20.000', 540, 330, 200, lt, { delay: 1.2, col: '#ffd23a', exit: 4.5, pulse: true }); kinetic(ctx, 'PASUKAN', 540, 510, 96, lt, { delay: 1.9, col: '#fff', exit: 4.5 }); });
} });

// 12 — Kubilai Khan wants to punish Kertanegara (Singhasari)
SHOTS.push({ start: 42.6, end: 46.0, tr: 'whip', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#16335a'); g.addColorStop(1, '#2d6a9a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 3; for (let i = 0; i < 20; i++) { ctx.beginPath(); ctx.moveTo(i * 60, 0); ctx.lineTo(i * 60, H); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, i * 100); ctx.lineTo(W, i * 100); ctx.stroke(); }
  const pop = backOut(sk(lt, 0, .4)); javaMap(ctx, 690, 860, 300 * pop, { marks: [[.25, -.05, 'SINGHASARI', '#e0392f', sk(lt, .3, .6)]] });
  if (lt > .6) { const r = 26 + Math.sin(t * 9) * 4; ctx.save(); ctx.translate(690 + .25 * 300, 860 - .05 * 300); ctx.strokeStyle = '#ff4a3a'; ctx.lineWidth = 7; circle(ctx, 0, 0, r + 16); ctx.stroke(); line(ctx, -r - 30, 0, r + 30, 0, 6, '#ff4a3a'); line(ctx, 0, -r - 30, 0, r + 30, 6, '#ff4a3a'); ctx.restore(); }
  ctx.setLineDash([22, 16]); ctx.lineDashOffset = -t * 40; ctx.strokeStyle = '#ff8a3a'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(330, 760); ctx.quadraticCurveTo(480, 560, 740 * Math.min(1, sk(lt, .4, 1.4) + .001) + 0, 830); ctx.stroke(); ctx.setLineDash([]);
  ST(ctx, MONGC, 230, 1250, 440, { bob: Math.sin(t * 5) * .006, arms: { L: [.3, -.2], R: { ik: [.34, -.7], bend: 1 } }, face: { eyes: 'squint', mouth: 'teeth', browAng: .35 }, headTilt: Math.sin(t * 8) * .03 });
  bubble(ctx, 330, 520, 420, 120, 'Hukum dia!', 290, 740, 46, sk(lt, 1.0, 1.3));
  nameTag(ctx, 'KUBILAI KHAN', 230, 700, '#2a4f9e', lt, .1);
  nameTag(ctx, 'KERTANEGARA', 700, 1020, '#d8a02a', lt, 1.6);
} });

// 13 — Kertanegara is gone, Jayakatwang took the throne
SHOTS.push({ start: 46.0, end: 50.8, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.8, z0: 1, z1: 1.08, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 860 }); applyCam(ctx, cam, 1);
  gate(ctx, 540, 1040, .9, 1, '#b8553a'); throneProp(ctx, 780, 1290, 1.25); tomb(ctx, 250, 1240, 1.5);
  const gh = sk(lt, 1.1, 2.0); if (gh > 0) ghost(ctx, 250 + Math.sin(t * 2) * 12, 1030 - gh * 210, 1.7, t);
  if (gh > 0) nameTag(ctx, 'KERTANEGARA', 250, 1030 - gh * 210 - 300, '#d8a02a', lt, 1.3);
  const win = sk(lt, 3.0, 3.3);
  ST(ctx, JAYA, 780, 1265, 440, { flip: -1, bob: Math.sin(t * 3) * .004 + win * Math.abs(Math.sin(t * 9)) * -.02, arms: { L: [.4, -.2], R: win > 0 ? [2.3 + Math.sin(t * 10) * .3, .3] : [.4, -.2] }, face: { eyes: win > 0 ? 'happy' : 'smug', mouth: win > 0 ? 'grin' : 'smirk', browAng: .15 } });
  nameTag(ctx, 'JAYAKATWANG', 780, 700, '#7a4bc4', lt, 2.9);
  if (win > 0) sparkle(ctx, 700, 760, 40, win);
} });

// 14 — the Mongol commander is lost
SHOTS.push({ start: 50.8, end: 53.9, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 3.1, z0: 1, z1: 1.1, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 840 }); applyCam(ctx, cam, 1);
  crowd(ctx, MONG, 80, 1000, 1050, 2, 200, t, { per: 6, seed: 11, face: { eyes: 'wide', mouth: 'o', look: [Math.sin(t * 2), 0] } });
  ST(ctx, MONGC, 540, 1280, 480, { bob: Math.sin(t * 3) * .004, arms: { L: { ik: [-.3, -.5], bend: -1 }, R: { ik: [.1, -.95 + Math.sin(t * 13) * .025], bend: 1 } }, face: { eyes: 'wide', look: [Math.sin(t * 3) * .9, -.2], mouth: 'o', browUp: 1 }, prop: hold('L', 480, 1, c => { c.translate(-70, -30); c.rotate(-.15); rrect(c, -90, -70, 180, 140, 10); fillStroke(c, '#f3e3b8', 6); javaMap(c, 0, 0, 62, { marks: [[.2, -.1, '', '#e0392f']] }); text(c, '???', 0, -50, 30, '#a03a2a', 'transparent', 0, 'Poppins', 700); }) });
  qmark(ctx, 330, 700, 120, t, sk(lt, .2, .5), -.3); qmark(ctx, 780, 660, 140, t + 1, sk(lt, .5, .8), .25); qmark(ctx, 600, 560, 90, t + 2, sk(lt, .9, 1.2));
  sweat(ctx, 440, 900, 34, sk(lt, .4, .7));
} });

// 15 — "peluang emas": the light bulb
SHOTS.push({ start: 53.9, end: 56.0, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 2.1, z0: 1, z1: 1.16, y0: 960 });
  world(ctx, cam, t, { mood: 'dusk', hor: 860 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 7; i++) treeProp(ctx, -60 + i * 190, 1000 + (i % 2) * 30, .9, 0, '#2a7a38', t);
  const g = sk(lt, 1.4, 1.6);
  ST(ctx, WIJ, 540, 1520, 700, { bob: Math.sin(t * 3) * .004, arms: POSE.hips.arms, face: lt < .6 ? { eyes: 'half', mouth: 'smirk', look: [1, 0] } : { eyes: 'wide', mouth: lt > 1.3 ? 'grin' : 'o', browUp: 1 }, headTilt: .05 });
  bulb(ctx, 540, 520 + Math.sin(t * 4) * 8, 1.8, sk(lt, .55, .9), t);
  if (g > 0) { for (let i = 0; i < 9; i++) { const a = i / 9 * TAU + t, r = 160 + g * 260; circle(ctx, 540 + Math.cos(a) * r, 860 + Math.sin(a) * r * .8, 12 * (1 - g * .4)); fillStroke(ctx, GOLD, 4); } }
  nameTag(ctx, 'RADEN WIJAYA', 540, 340, '#25a06a', lt, .05);
} });

// 16 — the offer: handshake, then "let's attack Kediri"
SHOTS.push({ start: 56.0, end: 61.5, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 5.5, z0: 1, z1: 1.08, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  flagProp(ctx, 90, 1160, .9, t, 'maja', 420); flagProp(ctx, 990, 1160, .9, t + 1, 'mongol', 420);
  const hs = sk(lt, .8, 1.1), shk = lt > 1.0 && lt < 2.2 ? Math.sin(t * 22) * .02 : 0, pump = sk(lt, 4.0, 4.2);
  const jump = pump * Math.abs(Math.sin(t * 9)) * -.03;
  ST(ctx, WIJ, 430, 1270, 430, { bob: jump, arms: { L: pump > 0 ? [2.4, .3] : [.4, -.15], R: hs > 0 && pump === 0 ? { ik: [.27, -.42 + shk], bend: -1 } : (pump > 0 ? [2.4, .3] : [.4, -.1]) }, face: { eyes: pump > 0 ? 'happy' : 'normal', mouth: pump > 0 ? 'grin' : 'smile', look: [1, 0] } });
  ST(ctx, MONGC, 650, 1270, 430, { flip: -1, bob: jump, arms: { L: pump > 0 ? [2.4, .3] : [.4, -.15], R: hs > 0 && pump === 0 ? { ik: [.27, -.42 + shk], bend: -1 } : (pump > 0 ? [2.4, .3] : [.4, -.1]) }, face: { eyes: pump > 0 ? 'happy' : 'normal', mouth: pump > 0 ? 'grin' : 'smile', look: [1, 0] }, headTilt: lt > 2.4 && lt < 3.6 ? Math.sin(t * 8) * .08 : 0 });
  bubble(ctx, 380, 560, 540, 160, 'Musuh kalian\ndi Kediri!', 420, 790, 42, sk(lt, 2.3, 2.6) * (1 - sk(lt, 3.8, 4.0)));
  bubble(ctx, 700, 560, 480, 160, 'Ayo serang\nbareng!', 660, 790, 42, sk(lt, 4.1, 4.4));
  nameTag(ctx, 'RADEN WIJAYA', 340, 700, '#25a06a', lt, .1); nameTag(ctx, 'KOMANDAN', 740, 700, '#2a4f9e', lt, .1);
  if (lt > 4.0 && lt < 4.6) speedLines(ctx, t, .4);
} });

// 17 — the joint attack on Kediri
SHOTS.push({ start: 61.5, end: 66.2, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.7, z0: 1, z1: 1.1, y0: 940, shake: 7 });
  world(ctx, cam, t, { mood: 'fire', hor: 850 }); applyCam(ctx, cam, 1);
  gate(ctx, 860, 1000, .8, 1, '#a8453a'); fireProp(ctx, 700, 880, 1.8, t, 3); fireProp(ctx, 1000, 880, 1.8, t + 1, 6);
  const adv = easeOut(sk(lt, 0, 2.4));
  const lx = lerp(-60, 300, adv), rx = lerp(1000, 700, adv), fight = lt > 2.4;
  crowd(ctx, MAJA, lx - 90, lx + 190, 1230, 3, 230, t, { per: 3, seed: 2, march: fight ? 0 : 12, arms: fight ? 'up' : null, face: { eyes: 'squint', mouth: 'grin' }, extra: { prop: hold('R', 230, 1, c => { c.rotate(fight ? Math.sin(t * 14) * .8 : .5); spearProp(c, 0, 0, 60, 0); }) } });
  crowd(ctx, MONG, lx - 150, lx + 130, 1290, 2, 260, t, { per: 3, seed: 6, march: fight ? 0 : 12, face: { eyes: 'squint', mouth: 'grin' }, extra: { prop: hold('R', 260, 1, c => { c.rotate(fight ? Math.sin(t * 16) * .8 : .5); swordProp(c, 0, 0, 60, 0); }) } });
  crowd(ctx, KEDI, rx - 110, rx + 100, 1235, 3, 230, t, { per: 3, seed: 9, flip: -1, march: fight ? 0 : 12, face: { eyes: 'wide', mouth: 'o' } });
  if (fight) for (let i = 0; i < 4; i++) { const k = (t * 5 + i * .27) % 1; burst(ctx, lerp(430, 640, ((i * 37) % 10) / 10), 1020 + (i % 2) * 150, 40 + k * 40, 9, ['#fff2a0', '#ffd23a'][i % 2], i + 2); }
  if (fight) for (let i = 0; i < 3; i++) dust(ctx, 520 + i * 70, 1290, t * 2 + i, 50, i + 2);
  const jy = sk(lt, 3.5, 3.9), jf = sk(lt, 3.9, 4.6);
  ST(ctx, JAYA, 880, 1275 - Math.sin(jf * Math.PI) * 120, 400, { flip: -1, lean: jy * -1.2, arms: { L: [2.2, .3], R: [2.4, .3] }, face: jy > 0 ? { eyes: 'spiral', mouth: 'o' } : { eyes: 'wide', mouth: 'o' }, t });
  if (jy > 0) { for (let i = 0; i < 4; i++) { const a = t * 6 + i * 1.6; star5(ctx, 880 + Math.cos(a) * 90, 840 + Math.sin(a) * 25, 22, a); } }
  if (jy > 0) text(ctx, 'KALAH!', 700, 700, 80, '#ffd23a', INK, 16, 'Poppins', 700);
  embers(ctx, t, 0, 1080, 1300, 20, 9);
} });

// 18 — the Mongols party
SHOTS.push({ start: 66.2, end: 69.0, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 2.8, z0: 1, z1: 1.08, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 850 }); applyCam(ctx, cam, 1);
  flagProp(ctx, 120, 1100, .8, t, 'mongol', 400); flagProp(ctx, 960, 1100, .8, t + 1, 'mongol', 400);
  drawBarrel(ctx, 160, 1290, 1.2); drawBarrel(ctx, 940, 1300, 1.2);
  for (const [sx, sy, a] of [[320, 1330, .6], [680, 1340, -1.0], [820, 1310, 1.4], [460, 1350, -.4]]) swordProp(ctx, sx, sy, 80, a);
  crowd(ctx, MONG, 100, 980, 1190, 2, 270, t, { per: 4, seed: 12, arms: 'up', bounce: true, face: { eyes: 'happy', mouth: 'grin' }, extra: { prop: hold('R', 270, 1, c => { c.rotate(-.2); mugProp(c, 0, -10, .8); }) } });
  ST(ctx, MONGC, 540, 1310, 450, { bob: -Math.abs(Math.sin(t * 7)) * .03, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin', blush: true }, blush: true, prop: hold('R', 450, 1, c => { mugProp(c, 0, -20, 1); }) });
  nameTag(ctx, 'KOMANDAN', 540, 740, '#2a4f9e', lt, .1);
  confetti(ctx, t, 36, 3); applyCam(ctx, cam, 1);
} });

// 19 — plot twist
SHOTS.push({ start: 69.0, end: 71.8, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 2.8, z0: 1, z1: 1.12, y0: 960 });
  const g = ctx.createRadialGradient(540, 900, 100, 540, 900, 1300); g.addColorStop(0, '#5a2a7a'); g.addColorStop(1, '#10061a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  applyCam(ctx, cam, 1);
  const sw = lt * 40; ctx.save(); ctx.globalAlpha = .5; for (let i = 0; i < 5; i++) ST(ctx, MONG, 120 + i * 210, 760, 120, { sil: '#1a0c2a', alpha: .7 }); ctx.restore();
  ST(ctx, WIJ, 540, 1700, 950, { bob: Math.sin(t * 3) * .004, arms: { L: [.4, -.1], R: { ik: [.08, -.7], bend: 1 } }, face: { eyes: 'smug', mouth: 'smirk', browAng: -.35, browOne: -1 }, headTilt: -.06 });
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const s2 = sk(lt, .5, .9); sparkle(ctx, 540 - 70, 700, 70 * s2, s2); ctx.restore();
  overlay(ctx, () => { const sh = shake(t, 5, 3); ctx.translate(sh[0], sh[1]); kinetic(ctx, 'PLOT TWIST!', 540, 380, 128, lt, { delay: .2, col: '#ff5a3a', rot: -.05, pulse: true }); });
} });

// 20 — "I need to fetch the tribute for Kubilai Khan"
SHOTS.push({ start: 71.8, end: 75.7, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 3.9, z0: 1, z1: 1.08, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 850 }); applyCam(ctx, cam, 1);
  flagProp(ctx, 980, 1100, .8, t, 'mongol', 400); tentProp(ctx, 900, 1130, 1.2, '#c9a14a');
  const bow = kf(lt, [[0, 0], [.5, .45, easeOut], [1.8, .45], [2.4, 0]]), walk = sk(lt, 2.6, 3.9);
  ST(ctx, MONGC, 700, 1280, 440, { flip: -1, arms: { L: [.4, -.15], R: [.4, -.15] }, face: { eyes: 'happy', mouth: 'smile' }, bob: Math.sin(t * 3) * .004 });
  const wx = lerp(400, 160, walk);
  chestProp(ctx, wx + 140, 1250, 1.2, 'UPETI');
  ST(ctx, WIJ, wx, 1270, 430, { lean: bow - walk * .1, legs: walk > 0 ? walkLegs(t, 10, .6) : undefined, arms: lt < 2.5 ? { L: { ik: [.2, -.6], bend: 1 }, R: { ik: [.2, -.62], bend: -1 } } : { L: [.3, -.1], R: [2.3 + Math.sin(t * 9) * .4, .3] }, face: lt < 2.4 ? { eyes: 'normal', mouth: 'smile', look: [1, 0] } : { eyes: 'smug', mouth: 'smirk', browAng: -.3 } });
  bubble(ctx, 330, 600, 560, 150, 'Izinkan hamba\nmengambil upeti!', 400, 800, 36, sk(lt, .5, .8) * (1 - sk(lt, 1.5, 1.7)));
  bubble(ctx, 740, 600, 360, 130, 'Silakan!', 700, 840, 44, sk(lt, 1.7, 2.0) * (1 - sk(lt, 2.7, 2.9)));
} });

// 21 — the ambush
SHOTS.push({ start: 75.7, end: 79.3, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 3.6, z0: 1, z1: 1.1, y0: 950, shake: lt > 2.4 ? 9 : 3 });
  world(ctx, cam, t, { mood: 'day', hor: 800 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 9; i++) treeProp(ctx, -40 + i * 140, 1010 + (i % 2) * 30, .85, 0, ['#2f8a3c', '#3a9a44', '#2a7a38'][i % 3], t);
  const amb = lt > 2.4, pop = easeOut(sk(lt, 2.4, 2.8));
  crowd(ctx, MONG, lerp(-100, 330, sk(lt, 0, 2.5)), lerp(500, 860, sk(lt, 0, 2.5)), 1230, 2, 260, t, { per: 4, seed: 13, march: amb ? 0 : 7, face: amb ? { eyes: 'wide', mouth: 'o' } : { eyes: 'half', mouth: 'smile' }, extra: amb ? { arms: { L: [2.4, .3], R: [2.4, .3] } } : {} });
  if (amb) { for (const [bx, by, bf] of [[60, 1200, 1], [1030, 1200, -1], [540, 1120, 1]]) { ST(ctx, MAJA, bx + (bf > 0 ? 1 : -1) * (1 - pop) * -160, by, 280, { flip: bf, arms: { L: [2.4, .3], R: [1.0, -.3] }, face: { eyes: 'squint', mouth: 'grin' }, prop: hold('R', 280, bf, c => { c.rotate(.5); spearProp(c, 0, 0, 70, 0); }) }); } }
  if (amb) { burst(ctx, 540, 1000, 160 * pop, 12, '#fff2a0', 4); flash(ctx, (1 - sk(lt, 2.4, 2.7)) * .7); applyCam(ctx, cam, 1); }
  overlay(ctx, () => kinetic(ctx, 'SERGAP!', 540, 420, 160, lt, { delay: 2.4, col: '#ff5a3a', rot: -.06, exit: 3.5 }));
} });

// 22 — chaos: thousands lost
SHOTS.push({ start: 79.3, end: 82.8, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 3.5, z0: 1.06, z1: 1, y0: 950, shake: 8 });
  world(ctx, cam, t, { mood: 'day', hor: 800 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 9; i++) treeProp(ctx, -40 + i * 140, 1010 + (i % 2) * 30, .85, 0, '#2a7a38', t);
  const R = rng(21);
  for (let i = 0; i < 6; i++) { const ph = R() * 4, k = (lt * .8 + ph) % 3, fly = k < 1 ? k : 1, x = 150 + i * 150 + R() * 40; const y = 1250 - Math.sin(fly * Math.PI) * (160 + R() * 120);
    ST(ctx, MONG, x, y, 250, { lean: Math.sin(t * 8 + i) * .3, arms: { L: [2.4, .3], R: [2.2, .3] }, face: { eyes: i % 2 ? 'spiral' : 'x', mouth: 'o' }, t }); star5(ctx, x + Math.cos(t * 6 + i) * 70, y - 210, 18, t * 5); }
  for (let i = 0; i < 3; i++) ST(ctx, MAJA, 220 + i * 320, 1290, 280, { arms: { L: [2.3, .3], R: [1.0 + Math.sin(t * 12 + i) * .6, -.3] }, face: { eyes: 'squint', mouth: 'grin' }, prop: hold('R', 280, 1, c => { c.rotate(.5 + Math.sin(t * 12 + i) * .6); swordProp(c, 0, 0, 60, 0); }) });
  for (let i = 0; i < 5; i++) { const k = (t * 1.2 + i * .2) % 1; burst(ctx, 150 + i * 200, 900 - k * 80, 30 + k * 50, 9, '#fff2a0', i + 1); }
  for (let i = 0; i < 4; i++) dust(ctx, 200 + i * 230, 1300, t * 2 + i, 50, i + 1);
} });

// 23 — they flee back to the ships
SHOTS.push({ start: 82.8, end: 85.3, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 2.5, z0: 1, z1: 1.06, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 780, sea: true }); applyCam(ctx, cam, 1);
  ctx.beginPath(); ctx.moveTo(-100, 1000); ctx.quadraticCurveTo(300, 900, 700, 1010); ctx.lineTo(700, 1500); ctx.lineTo(-100, 1500); ctx.closePath(); fillStroke(ctx, '#e6d28a', 7);
  junk(ctx, kf(lt, [[0, 880], [2.5, 1040]]), 1150, .75, t, { ph: 1, flip: -1 }); junk(ctx, kf(lt, [[0, 1180], [2.5, 1300]]), 1000, .5, t, { ph: 2, flip: -1 });
  for (let i = 0; i < 6; i++) { const x = lerp(-100 + i * 100, 640 + i * 20, easeIn(sk(lt, 0, 2.3))), hop = Math.abs(Math.sin(t * 10 + i)) * 40;
    ST(ctx, MONG, x, 1200 + (i % 2) * 70 - hop, 260, { lean: .15, legs: walkLegs(t + i, 14, .8), arms: { L: [2.4 + Math.sin(t * 14 + i) * .4, .3], R: [2.4 - Math.sin(t * 14 + i) * .4, .3] }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }); sweat(ctx, x - 70, 1000 + (i % 2) * 70 - hop, 20, 1); }
  speedLines(ctx, t, .3);
} });

// 24 — the strongest army beaten by a clever prince
SHOTS.push({ start: 85.3, end: 89.4, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.1, z0: 1, z1: 1.08, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 850 }); applyCam(ctx, cam, 1);
  ST(ctx, MONGC, 600, 1330, 420, { lean: -1.35, legs: { L: [.2, -.1], R: [.1, -.1] }, arms: { L: [1.2, .2], R: [1.6, .2] }, face: { eyes: 'spiral', mouth: 'o' }, t });
  for (let i = 0; i < 3; i++) star5(ctx, 600 + Math.cos(t * 5 + i * 2.1) * 120, 1140 + Math.sin(t * 5 + i * 2.1) * 30, 24, t * 4);
  ST(ctx, WIJ, 850, 1250 - Math.abs(Math.sin(t * 6)) * 14, 430, { flip: -1, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } });
  bulb(ctx, 850, 650 + Math.sin(t * 4) * 8, 1.6, sk(lt, .2, .6), t);
  overlay(ctx, () => kinetic(ctx, 'AKAL LICIK', 540, 330, 120, lt, { delay: 2.3, col: '#ffd23a', exit: 3.8, rot: .04 }));
} });

// 25 — 1293: coronation
SHOTS.push({ start: 89.4, end: 95.2, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 5.8, z0: 1, z1: 1.1, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  gate(ctx, 540, 1050, 1.0, 1, '#c8553a'); flagProp(ctx, 110, 1130, .95, t, 'maja', 430); flagProp(ctx, 970, 1130, .95, t + 1, 'maja', 430);
  crowd(ctx, MAJA, 70, 1010, 1255, 2, 235, t, { per: 6, seed: 5, arms: 'up', bounce: true, face: { eyes: 'happy', mouth: 'grin' } });
  const cr = sk(lt, 2.8, 3.5), on = cr >= 1;
  ST(ctx, Object.assign({}, WIJ, on ? { hat: 'crown', makuta: true, hatCol: GOLD, crownCol: GOLD, crownH: 1.3 } : {}), 540, 1300, 450, { bob: Math.sin(t * 3) * .004, arms: on ? { L: [2.4, .3], R: [2.4, .3] } : POSE.hips.arms, face: { eyes: on ? 'happy' : 'normal', mouth: 'grin' } });
  if (!on && lt > 2.0) crownProp(ctx, 540, lerp(-100, 835, easeIn(cr)), 1.1, 0, GOLD);
  nameTag(ctx, 'RADEN WIJAYA', 540, 700, '#25a06a', lt, .1);
  if (on) { confetti(ctx, t, 50, 4); applyCam(ctx, cam, 1); sparkle(ctx, 640, 860, 50, 1); }
  overlay(ctx, () => { kinetic(ctx, '1293', 540, 400, 210, lt, { delay: .2, col: '#ffd23a', exit: 4.5, pulse: true }); kinetic(ctx, 'MAJAPAHIT', 540, 420, 140, lt, { delay: 5.0, col: GOLD, pulse: true }); });
} });

// 26 — the seesaw: biggest army vs smartest strategy
SHOTS.push({ start: 95.2, end: 100.4, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 5.2, z0: 1, z1: 1.05, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  const a = kf(lt, [[0, -.13], [3.0, -.13], [3.8, .13, backOut]]), px = 540, py = 1200, L = 350;
  ctx.beginPath(); ctx.moveTo(px, py + 10); ctx.lineTo(px - 70, py + 150); ctx.lineTo(px + 70, py + 150); ctx.closePath(); fillStroke(ctx, '#8a5a32', 7);
  ctx.save(); ctx.translate(px, py); ctx.rotate(a); rrect(ctx, -L - 50, -14, 2 * L + 100, 28, 10); fillStroke(ctx, '#c9a064', 7); ctx.restore();
  const lx = px - L * Math.cos(a), ly = py - L * Math.sin(a), rx = px + L * Math.cos(a), ry = py + L * Math.sin(a);
  const R = rng(4);
  for (let i = 0; i < 18; i++) ST(ctx, { cols: ['#6a6f7a', '#6a6f7a'], hat: 'mongol' }, lx - 120 + (i % 6) * 48, ly - 14 - Math.floor(i / 6) * 56, 120, { face: { eyes: 'normal', mouth: 'flat' }, sil: undefined, bob: 0 });
  ST(ctx, WIJ, rx, ry - 14, 330, { arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'smug', mouth: 'smirk' } });
  const bs = sk(lt, 2.8, 3.4); bulb(ctx, rx, ry - 480 - 60 * bs, 1.1 + .6 * bs, sk(lt, 2.6, 3.0), t);
  overlay(ctx, () => { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); nameTag(ctx, 'PASUKAN TERBESAR', 260, 560, '#6a6f7a', lt, .3, 32); nameTag(ctx, 'STRATEGI', 820, 560, '#25a06a', lt, 3.5, 36); ctx.restore(); });
  overlay(ctx, () => kinetic(ctx, 'STRATEGI', 540, 380, 140, lt, { delay: 3.6, col: '#ffd23a', pulse: true }));
} });

// 27 — end card: crowned Raden Wijaya on the glowing Nusantara map
SHOTS.push({ start: 100.4, end: 108, tr: 'cut', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0f3a5a'); g.addColorStop(1, '#2a8a9a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 1010); ctx.rotate(t * .1); for (let i = 0; i < 16; i++) { ctx.rotate(TAU / 16); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-80, -1600); ctx.lineTo(80, -1600); ctx.closePath(); ctx.fillStyle = 'rgba(255,230,140,.10)'; ctx.fill(); } ctx.restore();
  const gl = sk(lt, .2, 1.6); nusantaraMap(ctx, 540, 1010, 760, t, gl);
  const pop = backOut(sk(lt, .3, .9));
  ST(ctx, Object.assign({}, WIJ, { hat: 'crown', makuta: true, crownCol: GOLD, crownH: 1.3 }), 540, 1150, 420 * pop, { bob: Math.sin(t * 3) * .004, arms: { L: [.4, -.1], R: [2.4 + Math.sin(t * 5) * .2, .3] }, face: { eyes: 'happy', mouth: 'grin' } });
  sparkle(ctx, 360, 900, 40, .5 + .5 * Math.sin(t * 5)); sparkle(ctx, 760, 820, 50, .5 + .5 * Math.sin(t * 5 + 2)); sparkle(ctx, 640, 1010, 36, .5 + .5 * Math.sin(t * 5 + 4));
  overlay(ctx, () => { kinetic(ctx, 'MAJAPAHIT', 540, 380, 150, lt, { delay: .4, col: GOLD, pulse: true }); kinetic(ctx, '(1293 – 1527)', 540, 540, 86, lt, { delay: 1.1, col: '#fff', stagger: .04 });
    const k = backOut(sk(lt, 2.4, 2.9)); ctx.save(); ctx.translate(540, 1470); ctx.scale(k, k); ctx.font = '700 36px Poppins'; const w = ctx.measureText('Lanjut: Perang Bubat?').width + 60; rrect(ctx, -w / 2, -34, w, 68, 34); fillStroke(ctx, '#e0392f', 7); text(ctx, 'Lanjut: Perang Bubat?', 0, 2, 36, '#fff', INK, 0, 'Poppins', 700); ctx.restore(); });
} });
