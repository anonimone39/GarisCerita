// ===== PROLOGUE =====
// 0: a kingdom of the whole archipelago
SHOTS.push({ start: 0, end: A(1), tr: 'dissolve', tod: 'night', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 4.3, z0: 1, z1: 1.1 });
  ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#040a1c'); g.addColorStop(1, '#14337a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  starField(ctx, t, 3);
  applyCam(ctx, cam, .5); nusantaraMap(ctx, 960, 560, 1250, t, easeOut(sk(lt, .2, 2.6)));
  motes(ctx, cam, t, { n: 70, col: '255,220,120', a: .7, h: 900, y0: 80, r: 3 });
} });
// 1: the strongest army pushed back
SHOTS.push({ start: A(1), end: A(2), tr: 'dissolve', tod: 'dusk', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 3.5, x0: 780, x1: 1120, z0: 1.05, z1: 1.0 });
  backdrop(ctx, cam, t, { tod: 'dusk', hor: 560, sea: true, sun: [1300, 470], sunR: 80, rays: .14, volX: 400 });
  applyCam(ctx, cam, 1);
  ctx.beginPath(); ctx.moveTo(-700, 700); ctx.quadraticCurveTo(200, 610, 900, 720); ctx.lineTo(900, 1400); ctx.lineTo(-700, 1400); ctx.closePath(); fillStroke(ctx, '#c9a85a', 6);
  palm(ctx, 120, 760, .9, t, .1); palm(ctx, 330, 790, .7, t + 1, -.1); flagProp(ctx, 560, 840, 1.1, t, 'maja', 380);
  for (let i = 0; i < 5; i++) ST(ctx, MAJA, 120 + i * 120, 920 + (i % 2) * 36, 270, { arms: { L: [2.4 + Math.sin(t * 6 + i) * .3, .3], R: [2.4 + Math.sin(t * 6 + i + 1) * .3, .3] }, face: { eyes: 'happy', mouth: 'grin' } });
  junk(ctx, 1020 + lt * 120, 760, .7, t, { ph: 1 }); junk(ctx, 1380 + lt * 90, 720, .5, t, { ph: 2 }); junk(ctx, 1680 + lt * 70, 700, .4, t, { ph: 3 });
  motes(ctx, cam, t, { n: 24, col: '255,200,120', a: .4, y0: 300, h: 500 });
} });
// 2: it falls from inside: two rulers pull a crown apart in front of a cracking gate
SHOTS.push({ start: A(2), end: A(3), tr: 'dissolve', tod: 'palace', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 4.7, z0: 1, z1: 1.12, shake: lt > 2.6 ? 6 : 2 });
  backdrop(ctx, cam, t, { tod: 'palace', hor: 600, volcano: false }); applyCam(ctx, cam, 1);
  gate(ctx, 960, 900, 1.45, 1, '#b8553a');
  const pull = easeOut(sk(lt, 1.6, 3.4)), cr = easeOut(sk(lt, 2.6, 3.6));
  if (cr > 0) { ctx.beginPath(); ctx.moveTo(960, 250); let y = 250; const R = rng(4); for (let i = 0; i < 14; i++) { y += 42 * cr; ctx.lineTo(960 + (i % 2 ? 22 : -22) * (R() + .3), y); } ctx.lineWidth = 11; ctx.strokeStyle = '#1a0a08'; ctx.stroke(); for (let i = 0; i < 6; i++) dust(ctx, 960 + (i - 3) * 40, 300 + i * 90, t * 2 + i, 24, i + 1); }
  const sep = pull * 48;
  ST(ctx, WIKRA, 560 - sep, 950, 520, { lean: .12 * pull, arms: { L: { ik: [.55, -.62], bend: -1 }, R: { ik: [.55, -.55], bend: -1 } }, face: { eyes: 'squint', mouth: 'teeth', browAng: .3 } });
  ST(ctx, WIRAB, 1360 + sep, 950, 520, { flip: -1, lean: .12 * pull, arms: { L: { ik: [.55, -.62], bend: -1 }, R: { ik: [.55, -.55], bend: -1 } }, face: { eyes: 'squint', mouth: 'teeth', browAng: .3 } });
  const cx = 960; for (const sd of [-1, 1]) { ctx.save(); ctx.beginPath(); ctx.rect(sd < 0 ? -2000 : cx, 0, 2000, 2000); ctx.clip(); crownProp(ctx, cx + sd * sep, 650 + Math.sin(t * 20) * 3 * pull, 1.5, sd * .1 * pull, GOLD); ctx.restore(); }
  fireProp(ctx, 240, 880, 1.4, t, 2); fireProp(ctx, 1700, 880, 1.4, t + 2, 6); motes(ctx, cam, t, { n: 40, col: '255,160,80', a: .7, up: 1.2, y0: 100, h: 900 });
} });
// 3: title card
SHOTS.push({ start: A(3), end: A(4), tr: 'dip', x: .9, tod: 'fire', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 9, z0: 1, z1: 1.1, y0: 560 });
  backdrop(ctx, cam, t, { tod: 'fire', hor: 640, cloudsA: .8, volX: 1500 }); applyCam(ctx, cam, 1);
  gate(ctx, 960, 960, 1.9, 1, '#2a1214'); fireRow(ctx, 160, 1760, 900, 1.5, t, 8); fireProp(ctx, 960, 880, 2.2, t + 1, 3);
  motes(ctx, cam, t, { n: 70, col: '255,150,70', a: .8, up: 1.4, y0: 80, h: 1000, r: 3.5 });
  ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(.55, 'rgba(0,0,0,.25)'); g.addColorStop(1, 'rgba(0,0,0,.55)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}, over(ctx, lt, t) { cineTitle(ctx, [{ t: 'MAJAPAHIT', size: 210, track: 30, y: 450, glow: 'rgba(255,150,50,.7)' }, { t: 'LAHIR DARI API, RUNTUH DARI DALAM', size: 34, track: 9, y: 610, col: '#e8dcc0', weight: 600, font: 'Poppins' }], lt, { delay: 1.1, stagger: .9, fade: 1.2 }); titleRule(ctx, lt, 548, 1.6, 640); } });

// ===== BAB I: API DI SINGHASARI =====
SHOTS.push({ start: A(4), end: A(5), tr: 'dissolve', tod: 'fire', draw(ctx, lt, t) { cardBG(ctx, t, lt, 'fire', .6); }, over(ctx, lt) { chapterOver(ctx, lt, 'I', 'API DI SINGHASARI', '1292'); } });
// 5: Singhasari at its peak under Kertanegara
SHOTS.push({ start: A(5), end: A(6), tr: 'dissolve', tod: 'golden', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 7, z0: 1, z1: 1.12, x0: 860, x1: 960 });
  backdrop(ctx, cam, t, { tod: 'golden', hor: 600, rays: .13, sun: [1380, 330] }); applyCam(ctx, cam, 1);
  gate(ctx, 960, 760, 1.35, 1, '#c8553a'); banner(ctx, 420, 250, 1.2, t, '#d8a02a', '#fff4d0', 380); banner(ctx, 1500, 250, 1.2, t + 1, '#d8a02a', '#fff4d0', 380);
  marchBlock(ctx, SINGA, 560, 900, 330, t, { per: 3, march: 0, w: 200, face: { eyes: 'normal', mouth: 'smile', look: [1, 0] } }); marchBlock(ctx, SINGA, 1380, 900, 330, t, { per: 3, march: 0, w: 200, flip: -1, seed: 8, face: { eyes: 'normal', mouth: 'smile', look: [-1, 0] } });
  ST(ctx, KERTN, 960, 980, 540, { bob: breathe(t), arms: { L: [.5, -.2], R: [.5, -.2] }, face: { eyes: 'normal', mouth: 'smile', browAng: -.05 } });
  nameTag(ctx, 'KERTANEGARA', 960, 330, '#d8a02a', lt, .6, 30); lightPool(ctx, 960, 940, 420, 80, '255,210,120', .4);
  motes(ctx, cam, t, { n: 40, col: '255,225,170', a: .5, y0: 150, h: 700, vx: 5 }); fgFrame(ctx, cam, t, 'golden', { a: .8 });
}, over(ctx, lt) { bigNum(ctx, '1292', 150, 150, 120, lt, { delay: .3, out: 5.4, align: 'left' }); } });
// 6: Kertanegara refuses the Khan and shames the envoy
SHOTS.push({ start: A(6), end: A(7), tr: 'dissolve', tod: 'golden', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5.7, z0: 1.02, z1: 1.1, x0: 1000, x1: 900 });
  backdrop(ctx, cam, t, { tod: 'golden', hor: 600, rays: .1, sun: [1500, 380] }); applyCam(ctx, cam, 1);
  gate(ctx, 1300, 780, 1.1, 1, '#c8553a'); flagProp(ctx, 380, 900, 1.2, t, 'mongol', 400);
  const tear = sk(lt, 2.2, 3.2), shk = lt > 3 ? Math.sin(t * 30) * .02 : 0;
  ST(ctx, ENVOY, 520, 950, 480, { lean: .05 + .08 * tear, headTilt: -.1 * tear, arms: { L: [.4, -.1], R: [lt < 2.2 ? 1.1 : 2.4, .3] }, face: tear > 0 ? { eyes: 'wide', mouth: 'o', browUp: 1 } : { eyes: 'normal', mouth: 'flat', look: [1, 0] }, prop: hold('R', 480, 1, c => { if (lt < 2.4) scrollProp(c, 0, -30, 120, 60, '', .3); }) });
  if (lt >= 2.2) for (let i = 0; i < 6; i++) { const k = lt - 2.2; ctx.save(); ctx.translate(780 + i * 22 + k * (30 + i * 25), 690 + k * (60 + i * 30) + Math.sin(k * 5 + i) * 20); ctx.rotate(k * (3 + i)); rrect(ctx, -20, -12, 40, 24, 3); fillStroke(ctx, '#f3e3b8', 3); ctx.restore(); }
  stampMark(ctx, 'DITOLAK', 520, 380, 1.1, sk(lt, 3.0, 3.35));
  ST(ctx, KERTN, 1180, 950, 540, { flip: -1, bob: breathe(t), arms: { L: [.5, -.2], R: lt > 1.8 ? [2.5, -.4] : [.5, -.2] }, face: { eyes: 'smug', mouth: 'smirk', browAng: .2 } });
  nameTag(ctx, 'KERTANEGARA', 1180, 300, '#d8a02a', lt, .2, 28); placeTag(ctx, 'UTUSAN KUBILAI KHAN', 520, 330, lt, .5, '#e0d4c0');
  motes(ctx, cam, t, { n: 24, col: '255,225,170', a: .4 }); fgFrame(ctx, cam, t, 'golden', { sides: ['l'], a: .7 });
} });
// 7: Jayakatwang of Kediri, old grudge
SHOTS.push({ start: A(7), end: A(8), tr: 'dissolve', tod: 'dusk', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5, z0: 1.08, z1: 1.0, x0: 1150, x1: 1000 });
  backdrop(ctx, cam, t, { tod: 'dusk', hor: 620, sun: [420, 560], sunPow: .6, cloudsA: .8 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = .65; ctx.fillStyle = '#2a1830'; rrect(ctx, 130 + i * 120, 700 - (i % 3) * 30, 90, 160 + (i % 3) * 30, 6); ctx.fill(); ctx.restore(); }
  const fl = lt > 2.4 && lt < 2.7 ? .35 : 0; if (fl) flash(ctx, fl, '230,220,255');
  applyCam(ctx, cam, 1); rrect(ctx, 1040, 930, 700, 60, 10); fillStroke(ctx, '#4a3a5a', 6); for (let i = 0; i < 8; i++) { rrect(ctx, 1060 + i * 86, 880, 22, 55, 5); fillStroke(ctx, '#5a4a6a', 4); }
  ST(ctx, JAYA, 1380, 940, 560, { flip: -1, bob: breathe(t), arms: { L: { ik: [.25, -.45], bend: 1 }, R: { ik: [.18, -.4], bend: -1 } }, face: { eyes: 'half', mouth: 'smirk', browAng: .28, look: [-1, 0] } });
  nameTag(ctx, 'JAYAKATWANG', 1380, 300, '#7a4bc4', lt, .4, 30); placeTag(ctx, 'KEDIRI', 420, 560, lt, .6);
  motes(ctx, cam, t, { n: 30, col: '200,170,255', a: .4 }); fgFrame(ctx, cam, t, 'dusk', { a: .7 });
} });
// 8: the night attack, Kertanegara falls, palace burns
SHOTS.push({ start: A(8), end: A(9), tr: 'dissolve', tod: 'fire', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 7.3, z0: 1.0, z1: 1.1, x0: 1100, x1: 800, shake: 3.5 });
  backdrop(ctx, cam, t, { tod: 'fire', hor: 620, volX: 1700 }); applyCam(ctx, cam, 1);
  gate(ctx, 520, 930, 1.3, 1, '#7a2a24'); fireRow(ctx, 250, 800, 760, 1.6, t, 5); const burn = sk(lt, 4.5, 6.5); if (burn > 0) fireRow(ctx, 330, 760, 560, 1.4 + burn, t + 3, 4);
  const adv = easeOut(sk(lt, 0, 3.0));
  marchBlock(ctx, KEDI, lerp(1850, 1330, adv), 940, 330, t, { per: 4, march: adv < 1 ? 8 : 0, flip: -1, w: 300, seed: 5, extra: { prop: hold('R', 330, -1, c => { c.rotate(.2); spearProp(c, 0, 0, 80, 0); }) } });
  const fall = easeIn(sk(lt, 3.3, 4.3));
  ST(ctx, KERTN, 900, 975, 520, { lean: -1.35 * fall, legs: { L: [.1, -.04], R: [.1, -.04] }, arms: { L: [.5 + fall, -.2], R: [.5 + fall, -.2] }, face: lt > 3.3 ? { eyes: 'x', mouth: 'o' } : { eyes: 'wide', mouth: 'o' }, t });
  if (lt > 4.3) { const k = sk(lt, 4.3, 6.0); ghost(ctx, 880, 880 - k * 220, 1.6, t); ctx.globalAlpha = 1; }
  nameTag(ctx, 'KERTANEGARA', 900, 330 + 0, '#d8a02a', lt, .1, 28);
  motes(ctx, cam, t, { n: 60, col: '255,140,60', a: .85, up: 1.6, y0: 60, h: 1000, r: 3.5 });
} });
