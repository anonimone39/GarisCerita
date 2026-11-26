// ===== BAB III: PERANG DI DALAM RUMAH SENDIRI (Paregreg, 1404 - 1406) =====
const TUMAPEL = { cols: ['#c8312b', '#c8312b'], hat: 'band', hatCol: GOLD, vest: '#f2c230' };
// 54: chapter card
SHOTS.push({ start: A(54), end: A(55), tr: 'dissolve', tod: 'storm', draw(ctx, lt, t) { cardBG(ctx, t, lt, 'storm', .6); }, over(ctx, lt) { chapterOver(ctx, lt, 'III', 'PERANG DI DALAM RUMAH SENDIRI', '1389  –  1406'); } });
// 55: Hayam Wuruk dies, the kingdom splits in two
SHOTS.push({ start: A(55), end: A(56), tr: 'dissolve', tod: 'palace', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5.8, z0: 1.0, z1: 1.1 });
  backdrop(ctx, cam, t, { tod: 'palace', hor: 640, volcano: false, cloudsA: 0 }); applyCam(ctx, cam, 1);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#3a1418'; ctx.fillRect(0, 0, W, 760); ctx.fillStyle = '#180808'; ctx.fillRect(0, 760, W, 400); applyCam(ctx, cam, 1);
  const open = 1 + easeOut(sk(lt, 3.2, 5.0)) * 2.2; gate(ctx, 960, 900, 1.5, open, '#8a3a2a');
  throneProp(ctx, 960, 960, 1.8); crownProp(ctx, 960, 600, 1.4, 0, GOLD);
  for (let i = 0; i < 4; i++) ST(ctx, { cols: ['#eee', '#eee'], hat: 'band', hatCol: '#fff' }, 360 + i * 130, 1010 + (i % 2) * 24, 380, { lean: .08, arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'half', mouth: 'frown' } });
  for (let i = 0; i < 4; i++) ST(ctx, { cols: ['#eee', '#eee'], hat: 'band', hatCol: '#fff' }, 1560 - i * 130, 1010 + (i % 2) * 24, 380, { flip: -1, lean: .08, arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'half', mouth: 'frown' } });
  lantern(ctx, 500, 400, 1.3, t); lantern(ctx, 1420, 400, 1.3, t + 1); lightPool(ctx, 960, 1000, 900, 110, '255,170,90', .25);
  if (lt > 3.2) { ctx.beginPath(); ctx.moveTo(960, 100); let y = 100; const R = rng(8); for (let i = 0; i < 12; i++) { y += 66 * easeOut(sk(lt, 3.2, 4.4)); ctx.lineTo(960 + (i % 2 ? 24 : -24) * (R() + .4), y); } ctx.lineWidth = 12; ctx.strokeStyle = '#0a0404'; ctx.stroke(); }
  motes(ctx, cam, t, { n: 24, col: '255,170,90', a: .5, up: .3 }); fgFrame(ctx, cam, t, 'palace', { a: .7 });
}, over(ctx, lt) { bigNum(ctx, '1389', 150, 140, 110, lt, { delay: .3, out: 5.2, sub: 'HAYAM WURUK WAFAT' }); } });
// 56: the western court
SHOTS.push({ start: A(56), end: A(57), tr: 'dissolve', tod: 'palace', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5.8, z0: 1.0, z1: 1.1, x0: 940, x1: 980 });
  backdrop(ctx, cam, t, { tod: 'palace', hor: 640, volcano: false, cloudsA: 0 }); applyCam(ctx, cam, 1);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#5a1a1e'; ctx.fillRect(0, 0, W, 760); ctx.fillStyle = '#2a0a0c'; ctx.fillRect(0, 760, W, 400); applyCam(ctx, cam, 1);
  for (let i = 0; i < 5; i++) { rrect(ctx, 100 + i * 430, 0, 60, 760, 4); fillStroke(ctx, '#8a2a2a', 5); }
  banner(ctx, 360, 100, 1.5, t, '#c8312b', '#f6f1e8', 440); banner(ctx, 1560, 100, 1.5, t + 1, '#c8312b', '#f6f1e8', 440); throneProp(ctx, 960, 980, 2.0); lightPool(ctx, 960, 1000, 900, 110, '255,170,90', .3);
  ST(ctx, TUMAPEL, 1240, 1030, 460, { flip: -1, bob: breathe(t), arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'normal', mouth: 'smile' } });
  ST(ctx, WIKRA, 960, 1040, 620, { bob: breathe(t, .004, 2.3), arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'half', mouth: 'smirk' } });
  nameTag(ctx, 'WIKRAMAWARDHANA', 960, 300, '#c8312b', lt, .6, 28); nameTag(ctx, 'BHRE TUMAPEL', 1240, 420, '#a8262b', lt, 2.4, 24); placeTag(ctx, 'KEDATON BARAT', 960, 120, lt, .2, '#ffd0c0');
  motes(ctx, cam, t, { n: 24, col: '255,170,90', a: .5, up: .3 }); fgFrame(ctx, cam, t, 'palace', { a: .7 });
} });
// 57: the eastern court
SHOTS.push({ start: A(57), end: A(58), tr: 'dissolve', tod: 'golden', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5, z0: 1.0, z1: 1.1, x0: 1000, x1: 940 });
  backdrop(ctx, cam, t, { tod: 'golden', hor: 600, sea: true, sun: [500, 440], sunR: 70, rays: .13, volX: 1600 }); applyCam(ctx, cam, 1);
  ctx.beginPath(); ctx.moveTo(-200, 780); ctx.quadraticCurveTo(500, 700, 1300, 790); ctx.lineTo(2300, 790); ctx.lineTo(2300, 1500); ctx.lineTo(-200, 1500); ctx.closePath(); fillStroke(ctx, '#c9a85a', 6);
  palm(ctx, 240, 820, 1.0, t, .12); palm(ctx, 1700, 830, .9, t + 1, -.1); throneProp(ctx, 1260, 970, 1.8); banner(ctx, 360, 200, 1.2, t, '#e08a2a', '#5a2a0a', 340);
  ST(ctx, WIRAB, 960, 1030, 620, { bob: breathe(t, .004, 2.4), arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'half', mouth: 'smirk', look: [1, 0] } });
  nameTag(ctx, 'BHRE WIRABHUMI', 960, 300, '#e08a2a', lt, .6, 28); placeTag(ctx, 'KEDATON TIMUR', 960, 120, lt, .2, '#ffe0b0'); placeTag(ctx, 'menurut Pararaton: putra selir', 960, 190, lt, 2.4, '#e8dcc0');
  motes(ctx, cam, t, { n: 30, col: '255,225,170', a: .5 }); fgFrame(ctx, cam, t, 'golden', { a: .6 });
} });
// 58: both feel they have the greater right; Wirabhumi turns to China
SHOTS.push({ start: A(58), end: A(59), tr: 'dissolve', tod: 'storm', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 6.6, z0: 1.0, z1: 1.1 });
  backdrop(ctx, cam, t, { tod: 'storm', hor: 600, volX: 1600 }); applyCam(ctx, cam, 1);
  const cr = easeOut(sk(lt, 1.0, 3.5)); ctx.beginPath(); ctx.moveTo(960, 760); let y = 760; const R = rng(2); for (let i = 0; i < 9; i++) { y += 40 * cr; ctx.lineTo(960 + (i % 2 ? 16 : -16) * (R() + .3), y); } ctx.lineWidth = 9; ctx.strokeStyle = '#0a0a0e'; ctx.stroke();
  const seal = sk(lt, 4.3, 5.2), env = easeOut(sk(lt, 3.8, 5.0));
  ST(ctx, WIKRA, 520, 1030, 600, { arms: { L: [.5, -.2], R: [.5, -.2] }, face: { eyes: 'squint', mouth: 'flat', browAng: .3 } });
  ST(ctx, WIRAB, 1180 - env * 80, 1030, 600, { flip: -1, arms: { L: [.5, -.2], R: seal > .5 ? [2.4, .3] : { ik: [.3, -.55], bend: 1 } }, face: { eyes: seal > .5 ? 'smug' : 'squint', mouth: seal > .5 ? 'grin' : 'flat', browAng: .3 } });
  ST(ctx, MING, lerp(2200, 1520, env), 1020, 520, { flip: -1, legs: env < 1 ? walkLegs(t, 7, .4) : undefined, arms: { L: [.4, -.2], R: { ik: [.4, -.5], bend: -1 } }, face: { eyes: 'half', mouth: 'smile' } });
  if (seal > 0) { ctx.save(); ctx.translate(1380, 760 - Math.sin(seal * Math.PI) * 40); rrect(ctx, -34, -34, 68, 68, 10); fillStroke(ctx, '#d8312b', 6); text(ctx, '印', 0, 4, 44, '#fff', 'transparent', 0, 'Poppins', 700); ctx.restore(); }
  nameTag(ctx, 'WIKRAMAWARDHANA', 520, 330, '#c8312b', lt, .2, 26); nameTag(ctx, 'BHRE WIRABHUMI', 1100, 330, '#e08a2a', lt, .2, 26); placeTag(ctx, 'DUKUNGAN KAISAR TIONGKOK', 1500, 330, lt, 4.4, '#cfe8e8');
  fgFrame(ctx, cam, t, 'storm', { a: .7 });
} });
// 59: 1404, the Paregreg War breaks out
SHOTS.push({ start: A(59), end: A(60), tr: 'dissolve', x: .5, tod: 'fire', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 3.6, z0: 1.12, z1: 1.0, shake: lt < .6 ? 14 : 6 });
  backdrop(ctx, cam, t, { tod: 'fire', hor: 620, volX: 1600 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 6; i++) ST(ctx, BARAT, 160 + i * 110, 980 + (i % 2) * 40, 400, { arms: { L: [2.0, .3], R: [1.2 + Math.sin(t * 10 + i), -.3] }, face: { eyes: 'squint', mouth: 'teeth' }, prop: hold('R', 400, 1, c => { c.rotate(.5 + Math.sin(t * 12 + i)); swordProp(c, 0, 0, 80, 0); }) });
  for (let i = 0; i < 6; i++) ST(ctx, TIMUR, 1760 - i * 110, 980 + (i % 2) * 40, 400, { flip: -1, arms: { L: [2.0, .3], R: [1.2 + Math.sin(t * 10 + i + 1), -.3] }, face: { eyes: 'squint', mouth: 'teeth' }, prop: hold('R', 400, -1, c => { c.rotate(.5 + Math.sin(t * 12 + i)); swordProp(c, 0, 0, 80, 0); }) });
  for (let i = 0; i < 6; i++) { const k = (t * 4 + i * .25) % 1; burst(ctx, 760 + (i % 3) * 200, 780 + (i % 2) * 140, 50 + k * 60, 9, ['#fff2a0', '#ffd23a'][i % 2], i + 2); } flash(ctx, (1 - sk(lt, 0, .4)) * .8); applyCam(ctx, cam, 1);
  motes(ctx, cam, t, { n: 60, col: '255,140,60', a: .85, up: 1.6, y0: 60, h: 1000, r: 3.5 });
}, over(ctx, lt) { bigNum(ctx, '1404', 960, 240, 200, lt, { delay: .2, align: 'center', sub: 'PERANG PAREGREG' }); } });
// 60-61: regreg, going back and forth
SHOTS.push({ start: A(60), end: A(62), tr: 'dissolve', tod: 'storm', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 8, z0: 1.0, z1: 1.06, shake: 4 });
  backdrop(ctx, cam, t, { tod: 'storm', hor: 620, volX: 1600 }); applyCam(ctx, cam, 1);
  const osc = Math.sin(lt * 1.5) * 260, front = 960 + osc;
  crowd(ctx, BARAT, front - 560, front - 120, 960, 2, 340, t, { per: 3, seed: 3, march: 8, face: { eyes: 'squint', mouth: 'teeth' }, extra: { prop: hold('R', 340, 1, c => { c.rotate(.5 + Math.sin(t * 11)); spearProp(c, 0, 0, 70, 0); }) } });
  crowd(ctx, TIMUR, front + 120, front + 560, 960, 2, 340, t, { per: 3, seed: 7, flip: -1, march: 8, face: { eyes: 'squint', mouth: 'teeth' }, extra: { prop: hold('R', 340, -1, c => { c.rotate(.5 + Math.sin(t * 11 + 1)); spearProp(c, 0, 0, 70, 0); }) } });
  for (let i = 0; i < 4; i++) { burst(ctx, front + (i - 1.5) * 40, 780 + (i % 2) * 120, 40 + ((t * 5 + i) % 1) * 50, 9, ['#fff2a0', '#ffd23a'][i % 2], i + 2); dust(ctx, front + (i - 1.5) * 70, 1020, t * 2 + i, 50, i + 1); }
  line(ctx, front, 700, front, 1060, 5, 'rgba(255,255,255,.6)');
  const ph = sk(lt, 5.2, 5.6), ph2 = sk(lt, 6.8, 7.1); placeTag(ctx, 'BARAT MENANG', 560, 330, lt, 5.2, '#ffd0c0'); placeTag(ctx, 'TIMUR MENANG', 1360, 330, lt, 6.6, '#ffe0b0');
  fgFrame(ctx, cam, t, 'storm', { a: .7 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'REGREG  =  TERSENDAT-SENDAT', size: 54, track: 12, y: 130 }], lt, { delay: .4, out: 4.4 }); } });
// 62: two years drain the treasury
SHOTS.push({ start: A(62), end: A(63), tr: 'dissolve', tod: 'storm', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 4.3, z0: 1.0, z1: 1.1 });
  backdrop(ctx, cam, t, { tod: 'storm', hor: 620, volcano: false }); applyCam(ctx, cam, 1);
  lightPool(ctx, 960, 990, 500, 90, '200,200,220', .2);
  ctx.save(); ctx.translate(960, 960); rrect(ctx, -130, -90, 260, 90, 12); fillStroke(ctx, '#a05a2a', 7); ctx.beginPath(); ctx.moveTo(-136, -90); ctx.quadraticCurveTo(-110, -190, -40, -230); ctx.lineTo(40, -130); ctx.lineTo(136, -90); ctx.closePath(); fillStroke(ctx, '#8a4a22', 7); ctx.fillStyle = '#140a06'; rrect(ctx, -110, -88, 220, 30, 8); ctx.fill(); text(ctx, 'KAS', 0, -30, 34, '#e8c04a', 'transparent', 0, 'Poppins', 700); ctx.restore();
  for (let i = 0; i < 3; i++) { const k = (t * .3 + i * .3) % 1; ctx.save(); ctx.translate(900 + i * 60 + Math.sin(t * 3 + i) * 30, 700 - k * 120); ctx.globalAlpha = 1 - k; ellipse(ctx, 0, 0, 14, 7); fillStroke(ctx, '#8a7a6a', 3); ctx.restore(); }
  for (let i = 0; i < 3; i++) ST(ctx, BARAT, 380 + i * 150, 1010 + (i % 2) * 30, 400, { lean: .12, legs: { L: [.9, -1.4], R: [.5, -1.2] }, arms: { L: [.6, -.3], R: [.6, -.3] }, face: { eyes: 'half', mouth: 'frown' }, headTilt: .15 });
  for (let i = 0; i < 3; i++) ST(ctx, TIMUR, 1500 - i * 150, 1010 + (i % 2) * 30, 400, { flip: -1, lean: .12, legs: { L: [.9, -1.4], R: [.5, -1.2] }, arms: { L: [.6, -.3], R: [.6, -.3] }, face: { eyes: 'half', mouth: 'frown' }, headTilt: .15 });
  sweat(ctx, 360, 640, 28, 1); sweat(ctx, 1560, 640, 28, 1); fgFrame(ctx, cam, t, 'storm', { a: .7 });
}, over(ctx, lt) { bigNum(ctx, '2 TAHUN', 960, 150, 90, lt, { delay: .3, align: 'center', sub: 'KAS KERAJAAN TERKURAS' }); } });
// 63: 1406, the western army breaks into the Eastern Court
SHOTS.push({ start: A(63), end: A(64), tr: 'dissolve', x: .5, tod: 'fire', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 7, z0: 1.0, z1: 1.1, x0: 800, x1: 1100, shake: 6 });
  backdrop(ctx, cam, t, { tod: 'fire', hor: 620, volX: 1600 }); applyCam(ctx, cam, 1);
  gate(ctx, 1500, 980, 1.2, 1 + sk(lt, 3, 4.5) * .9, '#9a4a2a'); fireProp(ctx, 1260, 800, 2, t, 3); fireProp(ctx, 1740, 800, 2, t + 1, 6); palm(ctx, 1000, 940, 1.1, t, .1);
  const adv = easeOut(sk(lt, 0, 4.0));
  crowd(ctx, BARAT, lerp(-200, 500, adv), lerp(200, 900, adv), 975, 3, 340, t, { per: 4, seed: 4, march: adv < 1 ? 9 : 0, arms: adv >= 1 ? 'up' : null, face: { eyes: 'squint', mouth: 'teeth' } });
  flagProp(ctx, lerp(200, 800, adv), 960, 1.3, t, 'maja', 420);
  ST(ctx, TUMAPEL, lerp(100, 850, adv), 1040, 560, { legs: adv < 1 ? walkLegs(t, 10, .7) : undefined, arms: { L: [.5, -.2], R: [2.4, .3] }, lean: .1 * (1 - adv), face: { eyes: 'squint', mouth: 'teeth', browAng: .3 } });
  nameTag(ctx, 'BHRE TUMAPEL', lerp(100, 850, adv), 330, '#a8262b', lt, .3, 28); motes(ctx, cam, t, { n: 60, col: '255,140,60', a: .85, up: 1.6, y0: 60, h: 1000, r: 3.5 });
}, over(ctx, lt) { bigNum(ctx, '1406', 150, 140, 110, lt, { delay: .3, out: 6.2 }); } });
// 64: Wirabhumi flees by boat at night
SHOTS.push({ start: A(64), end: A(65), tr: 'dissolve', tod: 'night', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5.5, x0: 800, x1: 1200, z0: 1.05, z1: 1.0 });
  backdrop(ctx, cam, t, { tod: 'night', hor: 560, sea: true, moon: [1450, 230], volX: 300 }); applyCam(ctx, cam, 1);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(0, 600, 0, 1100); g.addColorStop(0, 'rgba(190,210,255,.5)'); g.addColorStop(1, 'rgba(190,210,255,0)'); ctx.fillStyle = g; ctx.fillRect(1380, 600, 160, 500); ctx.restore();
  const bx = 560 + lt * 160; boatProp(ctx, bx, 900, 1.3, t, { ph: 1, hull: '#8a5a32', sail: '#e08a2a' });
  ST(ctx, WIRAB, bx - 20, 810, 330, { arms: { L: [2.2, .3], R: [.5, -.2] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] }, shadow: false });
  const chase = lt * 200 + 180; boatProp(ctx, bx - 500 + chase * .6, 960, 1.3, t, { ph: 2, hull: '#5a3a22' });
  ST(ctx, BARAT, bx - 500 + chase * .6 - 10, 870, 320, { arms: { L: [.5, -.2], R: [1.2, -.3] }, face: { eyes: 'squint', mouth: 'teeth' }, shadow: false, prop: hold('R', 320, 1, c => { c.rotate(.5); spearProp(c, 0, 0, 70, 0); }) });
  nameTag(ctx, 'RADEN GAJAH', bx - 500 + chase * .6, 600, '#a8262b', lt, 2.0, 24); for (let i = 0; i < 6; i++) { const k = (t * 2 + i * .2) % 1; ellipse(ctx, bx - 80 - k * 90 + i * 10, 980 + (i % 2) * 14, 18 * (1 - k), 6); ctx.fillStyle = `rgba(255,255,255,${.6 * (1 - k)})`; ctx.fill(); }
  motes(ctx, cam, t, { n: 24, col: '190,210,255', a: .5, y0: 300, h: 500 });
} });
// 65: a hollow victory
SHOTS.push({ start: A(65), end: A(66), tr: 'dissolve', tod: 'storm', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 4.1, z0: 1.08, z1: 1.0, y0: 600, y1: 540 });
  backdrop(ctx, cam, t, { tod: 'storm', hor: 600, volX: 1500 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 6; i++) fireProp(ctx, 200 + i * 300, 1000 + (i % 2) * 20, .8, t + i, i + 1); flagProp(ctx, 1380, 990, 1.8, t, 'maja', 520);
  ST(ctx, WIKRA, 640, 1030, 540, { lean: .05, arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'half', mouth: 'flat', look: [1, .3] }, headTilt: .08 });
  for (let i = 0; i < 12; i++) { const k = (t * .5 + i * .1) % 1; ctx.save(); ctx.translate(200 + ((i * 163 + t * 40) % 1600), 700 + (i % 4) * 60 + Math.sin(t + i) * 20); ctx.rotate(t * .5 + i); ellipse(ctx, 0, 0, 10, 4); ctx.fillStyle = 'rgba(140,130,120,.6)'; ctx.fill(); ctx.restore(); }
  fogBand(ctx, t, 950, 160, '#8e98a2', .5, 4); fgFrame(ctx, cam, t, 'storm', { a: .8 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'KEMENANGAN YANG SEMU', size: 62, track: 14, y: 140, col: '#d8d0c0' }], lt, { delay: .8 }); } });
// 66: about 170 Ming envoys are caught in the fighting
SHOTS.push({ start: A(66), end: A(67), tr: 'dissolve', tod: 'fire', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 6.4, z0: 1.0, z1: 1.1, shake: 5 });
  backdrop(ctx, cam, t, { tod: 'fire', hor: 620, volX: 1600 }); applyCam(ctx, cam, 1);
  fireProp(ctx, 240, 880, 1.6, t, 3); fireProp(ctx, 1700, 880, 1.6, t + 1, 6);
  for (let i = 0; i < 8; i++) { const x = 400 + (i % 4) * 340, y = 980 + Math.floor(i / 4) * 55; ST(ctx, MING, x, y, 400, { lean: Math.sin(t * 6 + i) * .15, arms: { L: [2.3, .3], R: [2.3, .3] }, face: { eyes: i % 2 ? 'spiral' : 'wide', mouth: 'o' }, t }); star5(ctx, x + Math.cos(t * 4 + i) * 60, y - 340, 16, t * 5); }
  for (let i = 0; i < 5; i++) { const k = (t * 3 + i * .27) % 1; burst(ctx, 360 + i * 300, 760 - k * 40, 36 + k * 40, 9, '#fff2a0', i + 2); }
  motes(ctx, cam, t, { n: 60, col: '255,140,60', a: .85, up: 1.6, y0: 60, h: 1000, r: 3.5 });
}, over(ctx, lt) { bigNum(ctx, '± 170', 960, 160, 130, lt, { delay: .5, out: 5.8, align: 'center', sub: 'UTUSAN DINASTI MING' }); } });
// 67: Emperor Yongle demands compensation
SHOTS.push({ start: A(67), end: A(68), tr: 'dissolve', tod: 'palace', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 9, z0: 1.0, z1: 1.1, x0: 1000, x1: 940 });
  backdrop(ctx, cam, t, { tod: 'palace', hor: 640, volcano: false, cloudsA: 0 }); applyCam(ctx, cam, 1);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#4a1218'; ctx.fillRect(0, 0, W, 760); ctx.fillStyle = '#2a0a0e'; ctx.fillRect(0, 760, W, 400); applyCam(ctx, cam, 1);
  for (let i = 0; i < 6; i++) { rrect(ctx, 80 + i * 340, 0, 70, 760, 4); fillStroke(ctx, '#8a1f2a', 5); }
  banner(ctx, 260, 100, 1.4, t, '#d8a02a', '#d8312b', 420); banner(ctx, 1660, 100, 1.4, t + 1, '#d8a02a', '#d8312b', 420); throneProp(ctx, 1300, 980, 2.0); lantern(ctx, 600, 360, 1.4, t); lantern(ctx, 1500, 360, 1.4, t + 1); lightPool(ctx, 960, 1000, 900, 110, '255,170,90', .3);
  const dem = sk(lt, 0, .6), paid = sk(lt, 5.4, 6.2), pardon = sk(lt, 7.4, 8.0);
  for (let i = 0; i < 6; i++) chestProp(ctx, 340 + (i % 3) * 150, 1000 - Math.floor(i / 3) * 90, 1.3, i === 0 ? 'EMAS' : '');
  ST(ctx, WIKRA, 560, 1040, 480, { lean: .15, arms: { L: { ik: [.2, -.58], bend: 1 }, R: { ik: [.2, -.6], bend: -1 } }, face: { eyes: 'wide', mouth: 'o' } });
  ST(ctx, YONGLE, 1180, 1040, 600, { flip: -1, bob: breathe(t), arms: { L: [.5, -.2], R: lt > 1 ? [2.3 + Math.sin(t * 7) * .1, -.4] : [.5, -.2] }, face: { eyes: 'squint', mouth: pardon > .3 ? 'smile' : 'teeth', browAng: pardon > .3 ? 0 : .35 } });
  nameTag(ctx, 'KAISAR YONGLE', 1180, 320, '#d8a02a', lt, .2, 28); stampMark(ctx, 'DIMAAFKAN', 960, 480, 1.0, pardon, '#3fa35b', -.08);
}, over(ctx, lt) { bigNum(ctx, '60.000 tahil emas', 150, 140, 90, lt, { delay: .4, out: 5.0, sub: 'GANTI RUGI YANG DITUNTUT' }); bigNum(ctx, '1408', 150, 140, 90, lt, { delay: 5.4, out: 7.2, sub: 'BARU 10.000 TAHIL TERBAYAR' }); } });
// 68: vassals break away
SHOTS.push({ start: A(68), end: A(69), tr: 'dissolve', tod: 'night', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5.4, z0: 1.0, z1: 1.08 });
  ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0a1230'); g.addColorStop(1, '#1d3a7a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); starField(ctx, t, 6);
  applyCam(ctx, cam, .5); javaMap(ctx, 960, 780, 420, { fill: '#e0645a', glow: .4 });
  const isl = [[-.55, -.28, '#8fcf5a', -1, -.7], [.5, -.3, '#8fcf5a', 1, -.8], [-.25, -.5, '#8fcf5a', -.2, -1], [.78, .0, '#8fcf5a', 1, .0], [-.8, .05, '#8fcf5a', -1, .05], [.1, .42, '#8fcf5a', .2, 1]];
  isl.forEach(([ix, iy, col, dx, dy], i) => { const d = easeOut(sk(lt, .4 + i * .3, 3.4 + i * .3)) * 380; ctx.save(); ctx.translate(960 + ix * 420 + dx * d, 560 + iy * 420 + dy * d); ctx.rotate(d * .0008 * (i % 2 ? 1 : -1)); ellipse(ctx, 0, 0, 90, 50); fillStroke(ctx, mixc(col, '#6a6f7a', d / 380), 7); ctx.restore(); });
  motes(ctx, cam, t, { n: 30, col: '200,220,255', a: .5 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'UPETI BERHENTI MENGALIR', size: 56, track: 12, y: 130 }], lt, { delay: .5 }); } });
// 69: the decline: a ruined gate in the dusk
SHOTS.push({ start: A(69), end: A(70), tr: 'dip', x: 1.0, tod: 'dusk', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 11, z0: 1.12, z1: 1.0, y0: 600, y1: 540 });
  backdrop(ctx, cam, t, { tod: 'dusk', hor: 600, sun: [960, 520], sunPow: .5, volX: 1500, trees: 8 }); applyCam(ctx, cam, 1);
  gate(ctx, 960, 960, 1.6, 1.5, '#7a4a3a'); for (let i = 0; i < 10; i++) { const x = 560 + i * 80; ctx.beginPath(); ctx.moveTo(x, 960); ctx.quadraticCurveTo(x + Math.sin(i) * 40, 760, x + Math.sin(i * 2) * 60, 560 - (i % 3) * 60); ctx.lineWidth = 7; ctx.strokeStyle = '#2f6a3a'; ctx.stroke(); }
  for (let i = 0; i < 18; i++) { const k = (t * .12 + i / 18) % 1; ctx.save(); ctx.translate(200 + ((i * 217 + t * 30) % 1600), 200 + k * 800); ctx.rotate(t + i); ellipse(ctx, 0, 0, 14, 6); ctx.fillStyle = ['#8a6a2a', '#a07a30', '#6a5a2a'][i % 3]; ctx.fill(); ctx.restore(); }
  fogBand(ctx, t, 940, 170, '#c88a7a', .5, 2); fgFrame(ctx, cam, t, 'dusk', { a: .8 });
}, over(ctx, lt) { bigNum(ctx, '± 1527', 960, 150, 110, lt, { delay: 5.5, align: 'center', sub: 'MAJAPAHIT BERAKHIR' }); } });
