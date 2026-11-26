// 9: Raden Wijaya escapes through the burning night
SHOTS.push({ start: A(9), end: A(10), tr: 'dissolve', x: .5, tod: 'fire', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 6.8, x0: 700, x1: 1500, z0: 1.05, z1: 1.0, shake: 5 });
  backdrop(ctx, cam, t, { tod: 'fire', hor: 620, trees: 12 }); applyCam(ctx, cam, 1);
  gate(ctx, 420, 930, 1.2, 1, '#7a2a24'); fireRow(ctx, 200, 640, 740, 1.7, t, 5);
  const cx = cam.x;
  for (let i = 0; i < 3; i++) dust(ctx, cx - 250 - i * 90, 975, t * 3 + i, 36 + i * 10, i + 1);
  ST(ctx, MAJA, cx - 520, 940, 330, { legs: walkLegs(t + 1, 12, .7), arms: walkArms(t + 1, 12, .6), lean: .1, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } });
  ST(ctx, MAJA, cx - 330, 960, 340, { legs: walkLegs(t + 2, 12, .7), arms: walkArms(t + 2, 12, .6), lean: .1, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } });
  ST(ctx, WIJ, cx - 40, 985, 520, { legs: walkLegs(t, 12, .8), arms: { L: [.6 + Math.sin(t * 12) * .5, -.4], R: [.6 - Math.sin(t * 12) * .5, -.4] }, lean: .12, bob: -Math.abs(Math.sin(t * 12)) * .012, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } });
  sweat(ctx, cx - 120, 650 - Math.sin(t * 8) * 8, 34, 1); nameTag(ctx, 'RADEN WIJAYA', cx - 40, 400, '#25a06a', lt, .2, 30);
  motes(ctx, cam, t, { n: 60, col: '255,140,60', a: .85, up: 1.6, y0: 60, h: 1000, r: 3.5, vx: -30 }); fgFrame(ctx, cam, t, 'fire', { a: .8 });
} });
// 10: Madura, Arya Wiraraja gives shelter
SHOTS.push({ start: A(10), end: A(11), tr: 'dissolve', tod: 'dusk', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 3.1, x0: 800, x1: 1000, z0: 1.04, z1: 1 });
  backdrop(ctx, cam, t, { tod: 'dusk', hor: 600, sea: true, sun: [520, 520], sunR: 70, rays: .12, volX: 1500 }); applyCam(ctx, cam, 1);
  ctx.beginPath(); ctx.moveTo(1100, 760); ctx.quadraticCurveTo(1500, 690, 2300, 740); ctx.lineTo(2300, 1500); ctx.lineTo(1100, 1500); ctx.closePath(); fillStroke(ctx, '#c9a85a', 6);
  palm(ctx, 1500, 800, .9, t, -.1); palm(ctx, 1750, 820, .8, t + 1, .1);
  boatProp(ctx, kf(lt, [[0, 560], [3.1, 1000]]), 860, 1.1, t, { sail: '#e9dfc9' });
  ST(ctx, WIJ, kf(lt, [[0, 520], [3.1, 960]]), 800, 300, { arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'half', mouth: 'flat', look: [1, 0] } });
  ST(ctx, MAJA, kf(lt, [[0, 640], [3.1, 1080]]), 810, 260, { face: { eyes: 'wide', mouth: 'o' } });
  ST(ctx, WIRA, 1460, 975, 500, { flip: -1, bob: breathe(t), arms: { L: [.4, -.2], R: [2.3 + Math.sin(t * 5) * .3, .3] }, face: { eyes: 'happy', mouth: 'smile' } });
  nameTag(ctx, 'ARYA WIRARAJA', 1460, 370, '#8a7a5a', lt, .6, 28); placeTag(ctx, 'MADURA', 960, 230, lt, .2);
} });
// 11: the bow: pretending to surrender
SHOTS.push({ start: A(11), end: A(12), tr: 'dissolve', tod: 'golden', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5, z0: 1, z1: 1.1, x0: 960, x1: 760 });
  backdrop(ctx, cam, t, { tod: 'golden', hor: 600, rays: .1, sun: [1500, 420] }); applyCam(ctx, cam, 1);
  gate(ctx, 960, 780, 1.1, 1, '#b8553a'); throneProp(ctx, 1420, 960, 1.9); banner(ctx, 700, 240, 1.1, t, '#7a4bc4', '#f2c230', 340);
  const bow = kf(lt, [[0, 0], [.8, .42, easeOut]]);
  ST(ctx, JAYA, 1400, 985, 540, { flip: -1, bob: breathe(t), arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'happy', mouth: 'smile' } });
  ST(ctx, WIRA, 560, 975, 480, { arms: { L: [.4, -.2], R: { ik: [.35, -.55], bend: 1 } }, face: { eyes: 'half', mouth: 'flat', look: [1, 0] } });
  ST(ctx, WIJ, 880, 985, 520, { lean: bow, headTilt: bow * .3, arms: { L: { ik: [.2, -.6], bend: 1 }, R: { ik: [.2, -.62], bend: -1 } }, face: lt > 1.5 ? { eyes: 'smug', mouth: 'smirk', browAng: -.25, look: [1, .5] } : { eyes: 'normal', mouth: 'frown', browAng: .2, look: [1, .5] } });
  nameTag(ctx, 'RADEN WIJAYA', 840, 330, '#25a06a', lt, .1, 28); nameTag(ctx, 'JAYAKATWANG', 1400, 300, '#7a4bc4', lt, .3, 28);
  motes(ctx, cam, t, { n: 30, col: '255,225,170', a: .45 }); fgFrame(ctx, cam, t, 'golden', { a: .7 });
} });
// 12-13: the Tarik forest, then "it was only an act"
SHOTS.push({ start: A(12), end: A(14), tr: 'dissolve', tod: 'golden', draw(ctx, lt, t) {
  const zoom = sk(lt, 3.3, 4.6), cam = { x: lerp(960, 880, easeOut(zoom)) + shake(t * .3, 2, 1, 2)[0], y: lerp(540, 520, easeOut(zoom)), z: lerp(1.02, 1.55, easeOut(zoom)), r: 0 };
  backdrop(ctx, cam, t, { tod: 'golden', hor: 600, rays: .1, sun: [1500, 420] }); applyCam(ctx, cam, 1);
  gate(ctx, 960, 780, 1.1, 1, '#b8553a'); throneProp(ctx, 1480, 960, 1.9);
  ST(ctx, JAYA, 1330, 985, 540, { flip: -1, bob: breathe(t), armLen: 1.2, arms: { L: [.4, -.2], R: { ik: [.45, -.5], bend: 1 } }, face: { eyes: 'happy', mouth: 'smile' } });
  const lift = 1 - zoom * .5;
  ST(ctx, WIJ, 800, 985, 520, { lean: .4 * (1 - zoom), headTilt: .1 * (1 - zoom), arms: { L: { ik: [.2, -.55], bend: 1 }, R: { ik: [.3, -.5], bend: -1 } }, face: zoom > .2 ? { eyes: 'smug', mouth: 'smirk', browAng: -.3, browOne: 1 } : { eyes: 'normal', mouth: 'frown', look: [1, .6] } });
  const sp = kf(lt, [[.4, [1150, 700]], [1.6, [1000, 850], easeOut]]); if (lt > .4) scrollProp(ctx, sp[0], sp[1] + Math.sin(t * 3) * 4, 330, 150, 'HUTAN TARIK', Math.sin(t * 2) * .04);
  if (lt > 3.4) clapper(ctx, 1060, 700, 1.4 * backOut(sk(lt, 4.1, 4.4)), sk(lt, 4.1, 4.3), sk(lt, 4.4, 4.5));
  if (lt > 3.2 && lt < 4.5) text(ctx, 'hehe...', 650, 560 - sk(lt, 3.6, 4.1) * 20, 52, '#fff', INK, 12, 'Poppins', 700);
} });
// 14a: building the secret base
SHOTS.push({ start: A(14), end: A(14, 4.6), tr: 'dissolve', tod: 'day', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 4.6, z0: 1.02, z1: 1.1, x0: 900, x1: 1020 });
  backdrop(ctx, cam, t, { tod: 'day', hor: 560, trees: 16, rays: .12, sun: [200, 120], volcano: false, cloudsA: .4 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 6; i++) treeProp(ctx, 120 + i * 160, 760 + (i % 2) * 26, 1.0, 0, '#2f8a3c', t);
  hutProp(ctx, 1330, 960, 2.1, sk(lt, .3, 4.2));
  const hit = [.7, 1.2, 1.7, 2.2, 2.7].map(h => Math.max(0, 1 - Math.abs(lt - h) * 8)).reduce((a, b) => a + b, 0), fall = lt < 2.6 ? Math.sin(lt * 40) * .03 * hit : kf(lt, [[2.6, 0], [3.5, -1.4, easeIn]]);
  treeProp(ctx, 420, 980, 1.5, fall, '#3a9a44', t);
  const sw = kf(lt % .5, [[0, 2.0], [.25, .8, easeIn], [.5, 2.0]]);
  ST(ctx, MAJA, 620, 970, 400, { flip: -1, arms: { L: [.5, -.2], R: [lt < 2.8 ? sw : .5, -.2] }, face: { eyes: 'squint', mouth: 'grin' }, prop: hold('R', 400, -1, c => { c.rotate(lt < 2.8 ? -(sw - 1.4) * .8 : 0); axeProp(c, 0, 0, 90, 0); }) });
  ST(ctx, MAJA, 1010, 985, 380, { arms: { L: [2.3 + Math.sin(t * 8) * .3, .3], R: [.4, -.2] }, face: { eyes: 'happy', mouth: 'smile' } });
  ST(ctx, WIJ, 830, 995, 520, { bob: breathe(t), arms: { L: [.4, -.1], R: { ik: [.28, -.62], bend: 1 } }, face: { eyes: 'half', look: [1, 0], mouth: 'smirk', browAng: -.2 } });
  nameTag(ctx, 'RADEN WIJAYA', 830, 340, '#25a06a', lt, .2, 28); placeTag(ctx, 'HUTAN TARIK', 960, 190, lt, .4);
  for (const [bx, by, bt] of [[470, 880, .75], [450, 860, 1.25], [490, 890, 1.75]]) if (lt > bt && lt < bt + .3) burst(ctx, bx, by, 50, 8, '#fff2a0', 3);
  motes(ctx, cam, t, { n: 34, col: '255,240,190', a: .5 }); fgFrame(ctx, cam, t, 'day', { a: .8 });
} });
// 14b: the bitter maja fruit
SHOTS.push({ start: A(14, 4.6), end: A(15), tr: 'dissolve', tod: 'day', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 3.3, z0: 1.0, z1: 1.18, y0: 520 });
  backdrop(ctx, cam, t, { tod: 'day', hor: 560, trees: 16, rays: .1, sun: [200, 120], volcano: false, cloudsA: .4 }); applyCam(ctx, cam, 1);
  const sick = sk(lt, 1.2, 2.3);
  ST(ctx, MAJA, 430, 1000, 520, { headCol: mixc('#f6f2ea', '#b8e07a', sick), arms: { L: [.4, -.1], R: { ik: [.07, -.64], bend: -1 } }, face: sick > .3 ? { eyes: 'squint', mouth: 'wavy', browAng: .3 } : { eyes: 'normal', mouth: 'o' }, prop: hold('R', 520, 1, c => majaFruit(c, 0, -4, .75)) });
  ST(ctx, MAJA, 1500, 1000, 520, { flip: -1, headCol: mixc('#f6f2ea', '#b8e07a', sk(lt, 1.6, 2.6)), arms: { L: [.4, -.1], R: { ik: [.07, -.64], bend: -1 } }, face: { eyes: 'squint', mouth: 'wavy', browAng: .3 }, prop: hold('R', 520, -1, c => majaFruit(c, 0, -4, .75)) });
  ST(ctx, WIJ, 960, 1040, 620, { headCol: mixc('#f6f2ea', '#b8e07a', sick), bob: breathe(t), arms: { L: [.4, -.1], R: { ik: [.07, -.66], bend: 1 } }, face: sick > .1 ? { eyes: 'squint', mouth: 'wavy', browAng: .35 } : { eyes: 'normal', mouth: 'grin', look: [0, 0] }, prop: hold('R', 620, 1, c => majaFruit(c, 0, -4, .8)) });
  if (sick > .5) { sweat(ctx, 1040, 560, 40, sick); text(ctx, 'pahit!', 960, 300 + Math.sin(t * 9) * 5, 80, '#c9f06a', INK, 16, 'Poppins', 700); }
  fgFrame(ctx, cam, t, 'day', { a: .7 });
} });
// 15: the name is born
SHOTS.push({ start: A(15), end: A(16), tr: 'dissolve', tod: 'golden', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 3, z0: 1.06, z1: 1.0, y0: 560 });
  backdrop(ctx, cam, t, { tod: 'golden', hor: 600, rays: .16, sun: [1400, 330], trees: 10 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 4; i++) hutProp(ctx, 380 + i * 300, 960 - (i % 2) * 50, 1.6, 1);
  const up = easeOut(sk(lt, .2, 1.6)); gate(ctx, 960, 1040 + (1 - up) * 300, 1.0 + .5 * up, 1, '#c8553a'); flagProp(ctx, 560, 960, 1.3, t, 'maja', 420); flagProp(ctx, 1380, 960, 1.3, t + 1, 'maja', 420);
  motes(ctx, cam, t, { n: 50, col: '255,225,160', a: .6, y0: 150, h: 800 });
  sparkle(ctx, 700, 430, 40, sk(lt, 1.4, 1.7) * (.6 + .4 * Math.sin(t * 6))); sparkle(ctx, 1240, 380, 50, sk(lt, 1.8, 2.1) * (.6 + .4 * Math.sin(t * 7)));
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'MAJAPAHIT', size: 130, track: 22, y: 200, glow: 'rgba(255,190,70,.7)' }, { t: 'MAJA  +  PAHIT', size: 34, track: 10, y: 300, col: '#e8dcc0', weight: 600, font: 'Poppins' }], lt, { delay: .3, stagger: .5 }); } });
// 16: Kubilai Khan has not forgotten
SHOTS.push({ start: A(16), end: A(17), tr: 'dissolve', tod: 'palace', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5.6, z0: 1.0, z1: 1.1, x0: 1000, x1: 900 });
  backdrop(ctx, cam, t, { tod: 'palace', hor: 640, volcano: false, cloudsA: 0 }); applyCam(ctx, cam, 1);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#4a1218'; ctx.fillRect(0, 0, W, 720); ctx.fillStyle = '#2a0a0e'; ctx.fillRect(0, 720, W, 400);
  applyCam(ctx, cam, 1); for (let i = 0; i < 6; i++) { rrect(ctx, 80 + i * 340, 0, 70, 720, 4); fillStroke(ctx, '#8a1f2a', 5); rrect(ctx, 78 + i * 340, 640, 74, 90, 4); fillStroke(ctx, GOLD2, 4); }
  banner(ctx, 300, 120, 1.4, t, '#7a1f2a', '#e8c04a', 420); banner(ctx, 1620, 120, 1.4, t + 1, '#7a1f2a', '#e8c04a', 420); throneProp(ctx, 1300, 960, 2.0);
  lantern(ctx, 520, 380, 1.4, t); lantern(ctx, 1480, 380, 1.4, t + 1); lightPool(ctx, 960, 960, 900, 120, '255,170,90', .3);
  ST(ctx, ENVOY, 460, 985, 470, { lean: .08, arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'half', mouth: 'frown', look: [1, 0] }, prop: hold('R', 470, 1, c => { rrect(c, -18, -2, 36, 22, 6); }) });
  rrect(ctx, 400, 600, 60, 52, 8); // bandage over the envoy's cheek
  ST(ctx, KUBILAI, 1050, 995, 560, { flip: -1, bob: breathe(t), arms: { L: [.5, -.2], R: lt > 1.6 ? [2.3 + Math.sin(t * 7) * .15, -.5] : [.5, -.2] }, face: { eyes: 'squint', mouth: 'teeth', browAng: .35 }, headTilt: Math.sin(t * 6) * .02 });
  nameTag(ctx, 'KUBILAI KHAN', 1050, 300, '#7a1f2a', lt, .3, 30); nameTag(ctx, 'UTUSAN', 460, 410, '#555', lt, .5, 26);
  motes(ctx, cam, t, { n: 30, col: '255,190,110', a: .5, up: .4 }); fgFrame(ctx, cam, t, 'palace', { sides: ['l', 'r'], a: .6 });
} });
// 17: the armada
SHOTS.push({ start: A(17), end: A(18), tr: 'dissolve', tod: 'day', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 7.4, x0: 700, x1: 1200, z0: 1.03, z1: 1.0 });
  backdrop(ctx, cam, t, { tod: 'day', hor: 520, sea: true, sun: [1500, 220], rays: .1, volX: 300 }); applyCam(ctx, cam, 1);
  const L = [[.38, 700, -200, 90, 1], [.42, 740, -500, 100, 2], [.5, 790, -820, 120, 3], [.56, 830, -1100, 130, 4], [.66, 890, -150, 170, 5], [.74, 940, -600, 190, 6], [.88, 1010, -950, 220, 7]];
  for (const [s_, y_, x0, sp, ph] of L) junk(ctx, x0 + lt * sp + 1200, y_, s_, t, { ph });
  motes(ctx, cam, t, { n: 20, col: '255,255,255', a: .3, y0: 500, h: 400 });
}, over(ctx, lt) { bigNum(ctx, '20.000 – 30.000', 120, 170, 120, lt, { delay: 1.8, out: 6.8, sub: 'PASUKAN  ·  RATUSAN KAPAL' }); } });
