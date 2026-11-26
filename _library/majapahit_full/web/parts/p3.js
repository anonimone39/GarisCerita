const GAOXING = Object.assign({}, MONG, { cols: ['#2a4f9e', '#2a4f9e'], plume: true, vest: '#c9d4e6' });
const PRIN = { cols: ['#e86a9a', '#e86a9a'], hat: 'flower', robe: '#d8588a', robeTrim: '#fff', belt: false };
function beach(ctx, y0, col = '#e6d28a') { ctx.beginPath(); ctx.moveTo(-800, y0 + 40); ctx.quadraticCurveTo(500, y0 - 40, 1200, y0 + 20); ctx.quadraticCurveTo(1900, y0 - 30, 2900, y0 + 30); ctx.lineTo(2900, 1500); ctx.lineTo(-800, 1500); ctx.closePath(); fillStroke(ctx, col, 6); }
// 18: landing on Java, the confusing news
SHOTS.push({ start: A(18), end: A(19), tr: 'dissolve', tod: 'day', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 8, x0: 1150, x1: 800, z0: 1.0, z1: 1.08 });
  backdrop(ctx, cam, t, { tod: 'day', hor: 540, sea: true, sun: [1500, 210], rays: .09, volX: 300 }); applyCam(ctx, cam, 1);
  beach(ctx, 760); palm(ctx, 300, 800, .9, t, .1); palm(ctx, 520, 830, .7, t + 1, -.1); junk(ctx, 1500, 700, .6, t, { ph: 1 }); junk(ctx, 1860, 690, .45, t, { ph: 2 });
  const arr = easeOut(sk(lt, 0, 3.6)); marchBlock(ctx, MONG, lerp(2200, 1380, arr), 940, 330, t, { per: 4, march: arr < 1 ? 8 : 0, flip: -1, w: 320, seed: 6, rows: 2 });
  const run = sk(lt, 3.2, 4.8);
  ST(ctx, MAJA, lerp(-200, 560, easeOut(run)), 960, 440, { legs: run < 1 ? walkLegs(t, 13, .8) : undefined, arms: run < 1 ? walkArms(t, 13, .6) : { L: [2.3 + Math.sin(t * 9) * .3, .3], R: [.5, -.2] }, lean: run < 1 ? .12 : 0, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } });
  ST(ctx, MONGC, 900, 990, 520, { flip: lt > 4.8 ? -1 : -1, bob: breathe(t), arms: { L: [.4, -.1], R: lt > 5.2 ? { ik: [.1, -.93 + Math.sin(t * 13) * .02], bend: -1 } : [.4, -.1] }, face: lt > 4.8 ? { eyes: 'wide', look: [-1, 0], mouth: 'o', browUp: 1 } : { eyes: 'normal', mouth: 'smile', look: [1, 0] } });
  nameTag(ctx, 'KOMANDAN MONGOL', 900, 330, '#2a4f9e', lt, 1, 28);
  if (lt > 4.9) { exclaim(ctx, 760, 300, 90, sk(lt, 4.9, 5.1)); qmark(ctx, 1040, 300, 100, t, sk(lt, 5.6, 5.9)); }
  motes(ctx, cam, t, { n: 20, col: '255,255,255', a: .3, y0: 500, h: 400 });
}, over(ctx, lt) { placeTag(ctx, 'PANTAI JAWA', 200, 130, lt, .4); } });
// 19: lost commander
SHOTS.push({ start: A(19), end: A(20), tr: 'dissolve', tod: 'day', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 4.7, z0: 1.0, z1: 1.14, y0: 560 });
  backdrop(ctx, cam, t, { tod: 'day', hor: 580, sea: true, sun: [1500, 210], volX: 300, cloudsA: .6 }); applyCam(ctx, cam, 1); beach(ctx, 800);
  crowd(ctx, MONG, 100, 1820, 900, 2, 300, t, { per: 7, seed: 11, face: { eyes: 'wide', mouth: 'o', look: [Math.sin(t * 2), 0] } });
  ST(ctx, MONGC, 960, 1080, 700, { bob: breathe(t), arms: { L: { ik: [-.3, -.5], bend: -1 }, R: { ik: [.1, -.93 + Math.sin(t * 13) * .025], bend: -1 } }, face: { eyes: 'wide', look: [Math.sin(t * 3) * .9, -.2], mouth: 'o', browUp: 1 }, prop: hold('L', 700, 1, c => { c.translate(-90, -40); c.rotate(-.15); rrect(c, -120, -90, 240, 180, 12); fillStroke(c, '#f3e3b8', 6); javaMap(c, 0, 0, 82, { marks: [[.2, -.1, '', '#e0392f']] }); text(c, '???', 0, -62, 40, '#a03a2a', 'transparent', 0, 'Poppins', 700); }) });
  qmark(ctx, 520, 360, 140, t, sk(lt, .3, .6), -.3); qmark(ctx, 1380, 330, 170, t + 1, sk(lt, .7, 1.0), .25); qmark(ctx, 800, 220, 110, t + 2, sk(lt, 1.2, 1.5));
  sweat(ctx, 800, 560, 40, sk(lt, .6, .9));
} });
// 20: the golden opportunity (night, torchlight)
SHOTS.push({ start: A(20), end: A(21), tr: 'dissolve', tod: 'night', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 3.5, z0: 1.0, z1: 1.15, y0: 540 });
  backdrop(ctx, cam, t, { tod: 'night', hor: 600, trees: 14, volcano: false }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 7; i++) treeProp(ctx, -60 + i * 340, 760 + (i % 2) * 30, 1.1, 0, '#17402a', t);
  lightPool(ctx, 960, 960, 600, 110, '255,215,120', .45);
  ST(ctx, WIJ, 960, 1040, 640, { bob: breathe(t), arms: POSE.hips.arms, face: lt < 1.0 ? { eyes: 'half', mouth: 'smirk', look: [1, 0] } : { eyes: 'wide', mouth: lt > 2.3 ? 'grin' : 'o', browUp: 1 } });
  bulb(ctx, 960, 400 + Math.sin(t * 4) * 8, 1.7, sk(lt, .9, 1.3), t); nameTag(ctx, 'RADEN WIJAYA', 960, 150, '#25a06a', lt, .1, 28);
  motes(ctx, cam, t, { n: 40, col: '255,240,150', a: .8, r: 2.5, up: .3 }); fgFrame(ctx, cam, t, 'night', { a: .85 });
} });
// 21-22: the alliance, then "your enemy is in Kediri"
SHOTS.push({ start: A(21), end: A(23), tr: 'dissolve', tod: 'dusk', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 7, z0: 1.0, z1: 1.1, x0: 940, x1: 980 });
  backdrop(ctx, cam, t, { tod: 'dusk', hor: 600, sun: [1500, 530], sunPow: .7, volX: 500 }); applyCam(ctx, cam, 1);
  tentProp(ctx, 1600, 940, 1.9, '#c9a14a'); flagProp(ctx, 250, 960, 1.2, t, 'mongol', 420);
  rrect(ctx, 760, 800, 400, 150, 10); fillStroke(ctx, '#8a5a32', 6); rrect(ctx, 790, 770, 340, 40, 8); fillStroke(ctx, '#f3e3b8', 5); javaMap(ctx, 960, 790, 130, { marks: [[-.45, .1, 'MAJAPAHIT', '#2f9a5a', sk(lt, .5, .9)], [.35, -.2, 'KEDIRI', '#e0392f', sk(lt, 4.1, 4.4)]] });
  const bow = kf(lt, [[0, .45], [1.8, .45], [2.6, 0, easeOut]]), shake_ = lt > 2.7 && lt < 3.8 ? Math.sin(t * 22) * .02 : 0, fist = sk(lt, 5.4, 5.7);
  ST(ctx, WIJ, 600, 1000, 540, { lean: bow, arms: lt < 2.0 ? { L: { ik: [.2, -.58], bend: 1 }, R: { ik: [.2, -.6], bend: -1 } } : lt < 5.4 ? { L: [.4, -.1], R: { ik: [.3, -.5 + shake_], bend: -1 } } : { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: lt < 2.0 ? 'smug' : 'happy', mouth: 'smirk', look: [1, 0] }, bob: fist * -Math.abs(Math.sin(t * 9)) * .02 });
  ST(ctx, MONGC, 1320, 1000, 540, { flip: -1, arms: lt < 2.0 ? { L: [.4, -.1], R: [.4, -.1] } : lt < 5.4 ? { L: [.4, -.1], R: { ik: [.3, -.5 + shake_], bend: -1 } } : { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: fist > 0 ? 'happy' : 'normal', mouth: fist > 0 ? 'grin' : 'smile', look: [-1, 0] }, bob: fist * -Math.abs(Math.sin(t * 9)) * .02 });
  nameTag(ctx, 'RADEN WIJAYA', 600, 300, '#25a06a', lt, .1, 28); nameTag(ctx, 'KOMANDAN', 1320, 300, '#2a4f9e', lt, .1, 28);
  if (lt > 4.1) { ctx.save(); ctx.translate(1050, 700); ctx.strokeStyle = '#ff4a3a'; ctx.lineWidth = 6; const r = 30 + Math.sin(t * 9) * 4; circle(ctx, 0, 0, r); ctx.stroke(); ctx.restore(); }
  motes(ctx, cam, t, { n: 30, col: '255,190,110', a: .5 }); fgFrame(ctx, cam, t, 'dusk', { a: .7 });
} });
// 23: army marches on Daha
SHOTS.push({ start: A(23), end: A(24), tr: 'dissolve', tod: 'golden', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 6, x0: 800, x1: 1250, z0: 1.05, z1: 1.0 });
  backdrop(ctx, cam, t, { tod: 'golden', hor: 600, rays: .12, sun: [500, 360], volX: 1500, trees: 6 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 5; i++) hutProp(ctx, 1500 + i * 190, 940 - (i % 2) * 40, 1.1, 1); gate(ctx, 1700, 980, 1.1, 1, '#9a4a8a');
  const cx = cam.x - 250;
  marchBlock(ctx, MAJA, cx - 150, 950, 330, t, { per: 4, march: 8, w: 250, seed: 3, rows: 2 }); marchBlock(ctx, MONG, cx + 520, 940, 340, t, { per: 4, march: 8, w: 280, seed: 9, rows: 2 });
  flagProp(ctx, cx + 80, 920, 1.2, t, 'maja', 380); flagProp(ctx, cx + 340, 920, 1.2, t + 1, 'mongol', 380);
  for (let i = 0; i < 4; i++) dust(ctx, cx - 450 + i * 260, 980, t * 2 + i, 40, i + 1);
  motes(ctx, cam, t, { n: 24, col: '255,225,170', a: .4 });
}, over(ctx, lt) { bigNum(ctx, 'April 1293', 120, 150, 110, lt, { delay: .3, out: 5.2, sub: 'SERBUAN KE DAHA, IBU KOTA KEDIRI' }); } });
// 24: the battle, Kediri falls, Jayakatwang surrenders
SHOTS.push({ start: A(24), end: A(25), tr: 'dissolve', x: .5, tod: 'fire', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 6.3, z0: 1.0, z1: 1.1, shake: 6 });
  backdrop(ctx, cam, t, { tod: 'fire', hor: 620, volX: 1500 }); applyCam(ctx, cam, 1);
  gate(ctx, 1600, 980, 1.1, 1, '#7a2a24'); fireProp(ctx, 1380, 800, 2, t, 3); fireProp(ctx, 1840, 800, 2, t + 1, 6);
  const adv = easeOut(sk(lt, 0, 2.2)), fight = lt > 2.2;
  crowd(ctx, MAJA, lerp(-100, 350, adv), lerp(300, 750, adv), 960, 2, 330, t, { per: 3, seed: 2, march: fight ? 0 : 12, arms: fight ? 'up' : null, face: { eyes: 'squint', mouth: 'grin' }, extra: { prop: hold('R', 330, 1, c => { c.rotate(fight ? Math.sin(t * 14) * .8 : .5); spearProp(c, 0, 0, 70, 0); }) } });
  crowd(ctx, MONG, lerp(-250, 200, adv), lerp(150, 600, adv), 1010, 2, 350, t, { per: 3, seed: 6, march: fight ? 0 : 12, face: { eyes: 'squint', mouth: 'grin' }, extra: { prop: hold('R', 350, 1, c => { c.rotate(fight ? Math.sin(t * 16) * .8 : .5); swordProp(c, 0, 0, 70, 0); }) } });
  crowd(ctx, KEDI, lerp(2000, 1150, adv), lerp(2200, 1450, adv), 965, 3, 330, t, { per: 3, seed: 9, flip: -1, march: fight ? 0 : 12, face: { eyes: 'wide', mouth: 'o' } });
  if (fight) for (let i = 0; i < 5; i++) { const k = (t * 5 + i * .27) % 1; burst(ctx, lerp(700, 1150, ((i * 37) % 10) / 10), 800 + (i % 2) * 150, 50 + k * 50, 9, ['#fff2a0', '#ffd23a'][i % 2], i + 2); }
  const sur = sk(lt, 4.3, 5.0);
  ST(ctx, JAYA, 1500, 990, 520, { flip: -1, lean: sur * .5, headTilt: sur * -.2, legs: sur > .5 ? { L: [.5, -1.2], R: [.5, -1.2] } : undefined, arms: { L: [2.4, .3], R: [2.4, .3] }, face: sur > 0 ? { eyes: 'x', mouth: 'o' } : { eyes: 'wide', mouth: 'o' }, t });
  if (sur > .2) { ctx.save(); ctx.translate(1380, 560); ctx.rotate(Math.sin(t * 6) * .1); line(ctx, 0, 0, 0, 160, 8, '#7a5230'); rrect(ctx, 0, 0, 110, 70, 6); fillStroke(ctx, '#fff', 5); ctx.restore(); }
  nameTag(ctx, 'JAYAKATWANG', 1500, 330, '#7a4bc4', lt, 3.9, 28); motes(ctx, cam, t, { n: 60, col: '255,140,60', a: .85, up: 1.6, y0: 60, h: 1000, r: 3.5 });
} });
// 25: the Mongols relax
SHOTS.push({ start: A(25), end: A(26, 0.2), tr: 'dissolve', tod: 'night', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 3.1, z0: 1.0, z1: 1.08, x0: 900, x1: 1000 });
  backdrop(ctx, cam, t, { tod: 'night', hor: 600, trees: 8, volcano: false }); applyCam(ctx, cam, 1);
  tentProp(ctx, 250, 940, 1.7, '#8a7a4a'); tentProp(ctx, 1700, 940, 1.7, '#8a7a4a'); lightPool(ctx, 960, 990, 760, 150, '255,170,80', .5); fireProp(ctx, 960, 980, 1.7, t, 4);
  for (let i = 0; i < 6; i++) { const x = 480 + i * 190; ST(ctx, MONG, x, 1000 + (i % 2) * 50, 380, { flip: i < 3 ? 1 : -1, arms: { L: [.4, -.1], R: [2.2 + Math.sin(t * 3 + i) * .2, .3] }, face: { eyes: 'happy', mouth: 'smile' }, prop: hold('R', 380, i < 3 ? 1 : -1, c => mugProp(c, 0, -10, .8)) }); }
  ST(ctx, WIJ, 1690, 1000, 460, { flip: -1, arms: { L: [.4, -.1], R: [.4, -.1] }, sil: undefined, face: { eyes: 'half', mouth: 'smirk', look: [-1, 0] }, alpha: .9 });
  motes(ctx, cam, t, { n: 40, col: '255,170,90', a: .8, up: 1.2, h: 800, y0: 150 }); fgFrame(ctx, cam, t, 'night', { a: .85 });
} });
// 26-27: the turning point, a request to go home with tribute and two princesses
SHOTS.push({ start: A(26, .2), end: A(28), tr: 'dissolve', tod: 'dusk', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 7, z0: 1.0, z1: 1.1, x0: 1000, x1: 900 });
  backdrop(ctx, cam, t, { tod: 'dusk', hor: 600, sun: [1450, 560], sunPow: .6, volX: 500 }); applyCam(ctx, cam, 1);
  tentProp(ctx, 1650, 940, 1.9, '#c9a14a'); flagProp(ctx, 220, 960, 1.2, t, 'mongol', 420);
  const bow = kf(lt, [[0, 0], [1.8, .35, easeOut]]);
  chestProp(ctx, 380, 1000, 1.7, 'UPETI');
  for (let i = 0; i < 2; i++) ST(ctx, PRIN, 520 + i * 150, 1000 - i * 20, 420, { arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'happy', mouth: 'smile', blush: true } });
  ST(ctx, WIJ, 860, 1000, 540, { lean: bow, arms: { L: { ik: [.2, -.58], bend: 1 }, R: { ik: [.2, -.6], bend: -1 } }, face: { eyes: 'smug', mouth: 'smirk', look: [1, 0] } });
  ST(ctx, MONGC, 1230, 1000, 540, { flip: -1, bob: breathe(t), arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'happy', mouth: 'smile' } });
  ST(ctx, GAOXING, 1480, 960, 400, { flip: -1, arms: { L: [.4, -.1], R: { ik: [.1, -.5], bend: 1 } }, face: { eyes: 'half', mouth: 'frown', browAng: .35, look: [-1, 0] } });
  nameTag(ctx, 'RADEN WIJAYA', 860, 310, '#25a06a', lt, .1, 28); nameTag(ctx, 'GAO XING', 1480, 400, '#2a4f9e', lt, 1.0, 24); placeTag(ctx, 'DUA PUTRI PERSEMBAHAN', 640, 470, lt, 1.2);
  motes(ctx, cam, t, { n: 24, col: '255,190,110', a: .5 }); fgFrame(ctx, cam, t, 'dusk', { a: .7 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'TITIK BALIK', size: 76, track: 18, y: 150 }], lt, { delay: .1, out: 1.3 }); } });
// 28: unarmed escort
SHOTS.push({ start: A(28), end: A(29), tr: 'dissolve', tod: 'dusk', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5, z0: 1.0, z1: 1.08, x0: 1100, x1: 900 });
  backdrop(ctx, cam, t, { tod: 'dusk', hor: 600, sun: [1450, 560], sunPow: .6, volX: 500, trees: 6 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 9; i++) { const k = sk(lt, .2 + i * .25, .8 + i * .25); swordProp(ctx, 360 + (i % 3) * 70, lerp(900, 1010 - (i % 3) * 10, easeOut(k)) - (1 - k) * 200, 80, .5 + i * .3); }
  for (let i = 0; i < 5; i++) ST(ctx, MONG, 840 + i * 190, 985 + (i % 2) * 36, 400, { legs: lt > 2.4 ? walkLegs(t + i, 8, .45) : undefined, arms: lt > 2.4 ? { L: [2.2, .3], R: [.4, -.1] } : { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'happy', mouth: 'smile' } });
  stampMark(ctx, 'TANPA SENJATA', 960, 330, 1.0, sk(lt, 1.5, 1.8), '#e0392f', -.08);
  ST(ctx, PRIN, 560, 1010, 440, { arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'happy', mouth: 'smile', blush: true } });
  motes(ctx, cam, t, { n: 24, col: '255,190,110', a: .5 }); fgFrame(ctx, cam, t, 'dusk', { a: .7 });
} });
// 29a: the ambush on the forest road
SHOTS.push({ start: A(29), end: A(29, 3.4), tr: 'dissolve', x: .4, tod: 'dusk', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 3.4, z0: 1.0, z1: 1.1, shake: lt > 2.0 ? 9 : 3 });
  backdrop(ctx, cam, t, { tod: 'dusk', hor: 560, trees: 16, volcano: false, sun: [1500, 560], sunPow: .5 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 9; i++) treeProp(ctx, -40 + i * 250, 780 + (i % 2) * 30, 1.0, 0, '#1f5a2e', t);
  const amb = lt > 2.0, pop = easeOut(sk(lt, 2.0, 2.4));
  crowd(ctx, MONG, lerp(100, 900, sk(lt, 0, 2.0)), lerp(700, 1500, sk(lt, 0, 2.0)), 990, 2, 380, t, { per: 4, seed: 13, march: amb ? 0 : 7, face: amb ? { eyes: 'wide', mouth: 'o' } : { eyes: 'happy', mouth: 'smile' }, extra: amb ? { arms: { L: [2.4, .3], R: [2.4, .3] } } : {} });
  if (amb) for (const [bx, by, bf] of [[120, 960, 1], [1800, 960, -1], [960, 880, 1], [520, 900, 1], [1400, 900, -1]]) ST(ctx, MAJA, bx + bf * (1 - pop) * -200, by, 400, { flip: bf, arms: { L: [2.4, .3], R: [1.0, -.3] }, face: { eyes: 'squint', mouth: 'grin' }, prop: hold('R', 400, bf, c => { c.rotate(.5); spearProp(c, 0, 0, 80, 0); }) });
  if (amb) { burst(ctx, 960, 760, 190 * pop, 12, '#fff2a0', 4); flash(ctx, (1 - sk(lt, 2.0, 2.4)) * .6); applyCam(ctx, cam, 1); }
  fgFrame(ctx, cam, t, 'dusk', { a: .8 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'DISERGAP!', size: 120, track: 12, y: 220, col: '#ff7a5a', glow: 'rgba(255,60,30,.7)' }], lt, { delay: 2.0, out: 3.2, fade: .25 }); } });
// 29b: the main camp is attacked
SHOTS.push({ start: A(29, 3.4), end: A(30), tr: 'dissolve', x: .4, tod: 'fire', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 2.0, z0: 1.05, z1: 1.0, shake: 8 });
  backdrop(ctx, cam, t, { tod: 'fire', hor: 600, volX: 1500 }); applyCam(ctx, cam, 1);
  tentProp(ctx, 400, 960, 1.8, '#8a6a3a'); tentProp(ctx, 1500, 960, 1.8, '#8a6a3a'); fireProp(ctx, 400, 760, 2, t, 3); fireProp(ctx, 1500, 760, 2, t + 1, 5); fireProp(ctx, 960, 900, 1.6, t + 2, 8);
  for (let i = 0; i < 5; i++) ST(ctx, MAJA, 200 + i * 360 - lt * 60, 990, 380, { legs: walkLegs(t + i, 14, .7), arms: { L: [2.4, .3], R: [1.0 + Math.sin(t * 12 + i), -.3] }, lean: .1, face: { eyes: 'squint', mouth: 'grin' }, prop: hold('R', 380, 1, c => { c.rotate(.5); swordProp(c, 0, 0, 70, 0); }) });
  for (let i = 0; i < 4; i++) ST(ctx, MONG, 330 + i * 400, 1010, 360, { lean: Math.sin(t * 8 + i) * .3, arms: { L: [2.4, .3], R: [2.2, .3] }, face: { eyes: 'wide', mouth: 'o' } });
  motes(ctx, cam, t, { n: 60, col: '255,140,60', a: .9, up: 1.6, y0: 60, h: 1000, r: 3.5 });
} });
// 30: more than 3,000 fall, the rest flee to the ships
SHOTS.push({ start: A(30), end: A(31), tr: 'dissolve', tod: 'night', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5, z0: 1.0, z1: 1.08, x0: 800, x1: 1100, shake: 4 });
  backdrop(ctx, cam, t, { tod: 'night', hor: 600, sea: true, volcano: false }); applyCam(ctx, cam, 1); beach(ctx, 820, '#6a6a5a');
  junk(ctx, 1600, 760, .75, t, { ph: 1, hull: '#5a1f1a', sail: '#8a3a2a' }); junk(ctx, 1980, 740, .55, t, { ph: 2, hull: '#5a1f1a', sail: '#8a3a2a' });
  fireProp(ctx, 300, 900, 1.6, t, 4); lightPool(ctx, 400, 960, 600, 100, '255,150,70', .35);
  for (let i = 0; i < 7; i++) { const x = lerp(180 + i * 130, 1250 + i * 60, easeIn(sk(lt, 0, 4.6))), hop = Math.abs(Math.sin(t * 10 + i)) * 40; ST(ctx, MONG, x, 1000 + (i % 2) * 60 - hop, 360, { lean: .15, legs: walkLegs(t + i, 14, .8), arms: { L: [2.4 + Math.sin(t * 14 + i) * .4, .3], R: [2.4 - Math.sin(t * 14 + i) * .4, .3] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } }); sweat(ctx, x - 80, 700 + (i % 2) * 60 - hop, 24, 1); }
  for (let i = 0; i < 4; i++) ST(ctx, MAJA, lerp(-200, 700, easeOut(sk(lt, 0, 4.5))) + i * 140, 1010, 340, { legs: walkLegs(t + i, 13, .8), arms: { L: [2.4, .3], R: [1.0 + Math.sin(t * 12), -.3] }, lean: .12, face: { eyes: 'squint', mouth: 'grin' } });
  motes(ctx, cam, t, { n: 30, col: '255,140,60', a: .7, up: 1.2 });
}, over(ctx, lt) { bigNum(ctx, '+ 3.000', 120, 160, 120, lt, { delay: .4, out: 4.4, sub: 'PRAJURIT MONGOL TEWAS' }); } });
// 31: the fleet sails home
SHOTS.push({ start: A(31), end: A(32), tr: 'dissolve', tod: 'golden', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5, x0: 960, x1: 1000, z0: 1.05, z1: 1.0 });
  backdrop(ctx, cam, t, { tod: 'golden', hor: 560, sea: true, sun: [1100, 440], sunR: 76, rays: .15, volX: 300 }); applyCam(ctx, cam, 1);
  ctx.beginPath(); ctx.moveTo(-800, 760); ctx.quadraticCurveTo(200, 640, 780, 780); ctx.lineTo(780, 1500); ctx.lineTo(-800, 1500); ctx.closePath(); fillStroke(ctx, '#8a7a4a', 6);
  junk(ctx, 1200 + lt * 80, 740, .62, t, { ph: 1 }); junk(ctx, 1560 + lt * 65, 710, .48, t, { ph: 2 }); junk(ctx, 1860 + lt * 50, 690, .38, t, { ph: 3 });
  flagProp(ctx, 480, 960, 1.4, t, 'maja', 440); ST(ctx, WIJ, 330, 975, 520, { bob: breathe(t), arms: { L: [.4, -.1], R: [2.4 + Math.sin(t * 4) * .1, .3] }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } });
  for (let i = 0; i < 4; i++) ST(ctx, MAJA, 130 + i * 70, 1030, 300, { face: { eyes: 'happy', mouth: 'grin' }, arms: { L: [2.4, .3], R: [2.4, .3] } });
  motes(ctx, cam, t, { n: 30, col: '255,220,150', a: .5, y0: 300, h: 600 });
}, over(ctx, lt) { bigNum(ctx, 'Mei 1293', 1800, 150, 100, lt, { delay: .4, out: 4.4, align: 'right', sub: 'PASUKAN MONGOL ANGKAT SAUH' }); } });
// 32: coronation, November 1293
SHOTS.push({ start: A(32), end: A(33), tr: 'dissolve', tod: 'golden', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 10.5, z0: 1.0, z1: 1.12, y0: 540 });
  backdrop(ctx, cam, t, { tod: 'golden', hor: 600, rays: .16, sun: [960, 300], sunPow: .9, volX: 1500 }); applyCam(ctx, cam, 1);
  gate(ctx, 960, 800, 1.4, 1, '#c8553a'); flagProp(ctx, 200, 960, 1.4, t, 'maja', 450); flagProp(ctx, 1720, 960, 1.4, t + 1, 'maja', 450); banner(ctx, 560, 230, 1.1, t, '#d8312b', '#f6f1e8', 340); banner(ctx, 1360, 230, 1.1, t + 1, '#d8312b', '#f6f1e8', 340);
  crowd(ctx, MAJA, 80, 760, 960, 2, 340, t, { per: 4, seed: 5, arms: 'up', bounce: true, face: { eyes: 'happy', mouth: 'grin' } }); crowd(ctx, MAJA, 1160, 1840, 960, 2, 340, t, { per: 4, seed: 7, arms: 'up', bounce: true, flip: -1, face: { eyes: 'happy', mouth: 'grin' } });
  const cr = sk(lt, 4.6, 5.8), on = cr >= 1;
  ST(ctx, Object.assign({}, WIJ, on ? { hat: 'crown', makuta: true, crownCol: GOLD, crownH: 1.3, robe: '#2a8a5a', robeTrim: GOLD } : {}), 960, 1010, 560, { bob: breathe(t), arms: on ? { L: [2.4, .3], R: [2.4, .3] } : POSE.hips.arms, face: { eyes: on ? 'happy' : 'normal', mouth: 'grin' } });
  if (!on && lt > 3.4) crownProp(ctx, 960, lerp(-100, 400, easeIn(cr)), 1.2, 0, GOLD);
  lightPool(ctx, 960, 980, 520, 90, '255,210,120', .4);
  if (on) { sparkle(ctx, 1060, 480, 56, .7 + .3 * Math.sin(t * 6)); sparkle(ctx, 860, 460, 40, .6 + .4 * Math.sin(t * 5 + 1)); }
  motes(ctx, cam, t, { n: 50, col: '255,225,170', a: .6 });
  if (on) petalsRain(ctx, t, 34, 5, '#ffd0a0');
}, over(ctx, lt) { bigNum(ctx, 'November 1293', 960, 140, 100, lt, { delay: .3, out: 4.2, align: 'center' }); cineTitle(ctx, [{ t: 'KERTARAJASA JAYAWARDHANA', size: 62, track: 14, y: 150 }, { t: 'RAJA PERTAMA MAJAPAHIT', size: 30, track: 9, y: 220, col: '#e8dcc0', weight: 600, font: 'Poppins' }], lt, { delay: 5.2, stagger: .5 }); } });
// 33: strategy beats the biggest army (seesaw)
SHOTS.push({ start: A(33), end: A(34), tr: 'dissolve', tod: 'day', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 7, z0: 1.0, z1: 1.06 });
  backdrop(ctx, cam, t, { tod: 'day', hor: 580, rays: .09, sun: [1500, 220] }); applyCam(ctx, cam, 1);
  const a = kf(lt, [[0, -.12], [3.2, -.12], [4.0, .12, backOut]]), px = 960, py = 940, L = 560;
  ctx.beginPath(); ctx.moveTo(px, py + 10); ctx.lineTo(px - 90, py + 160); ctx.lineTo(px + 90, py + 160); ctx.closePath(); fillStroke(ctx, '#8a5a32', 7);
  ctx.save(); ctx.translate(px, py); ctx.rotate(a); rrect(ctx, -L - 60, -16, 2 * L + 120, 32, 10); fillStroke(ctx, '#c9a064', 7); ctx.restore();
  const lx = px - L * Math.cos(a), ly = py - L * Math.sin(a), rx = px + L * Math.cos(a), ry = py + L * Math.sin(a);
  for (let i = 0; i < 24; i++) ST(ctx, { cols: ['#6a6f7a', '#6a6f7a'], hat: 'mongol' }, lx - 200 + (i % 8) * 56, ly - 20 - Math.floor(i / 8) * 66, 150, { face: { eyes: 'normal', mouth: 'flat' } });
  ST(ctx, WIJ, rx, ry - 20, 400, { arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'smug', mouth: 'smirk' } });
  const bs = sk(lt, 3.0, 3.6); bulb(ctx, rx, ry - 560 - 60 * bs, 1.2 + .7 * bs, sk(lt, 2.8, 3.2), t);
  nameTag(ctx, 'PASUKAN TERBESAR', lx, 330, '#6a6f7a', lt, .4, 28); nameTag(ctx, 'STRATEGI', rx, 330, '#25a06a', lt, 3.6, 30);
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'STRATEGI PALING CERDAS', size: 66, track: 12, y: 140 }], lt, { delay: 4.4 }); } });
