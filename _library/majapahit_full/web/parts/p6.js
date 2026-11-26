// ===== PENUTUP =====
// 70: two lessons
SHOTS.push({ start: A(70), end: A(71), tr: 'dissolve', tod: 'night', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5, z0: 1.0, z1: 1.06 });
  ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#050b22'); g.addColorStop(1, '#14337a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); starField(ctx, t, 4);
  applyCam(ctx, cam, .6); fireProp(ctx, 560, 880, 2.4, t, 3); const k = easeOut(sk(lt, 1.6, 2.6)); ctx.save(); ctx.globalAlpha = k; gate(ctx, 1360, 900, .9, 1 + k, '#8a3a2a'); ctx.restore();
  motes(ctx, cam, t, { n: 50, col: '255,200,120', a: .7, h: 900, y0: 80 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'DUA PELAJARAN', size: 84, track: 20, y: 220 }], lt, { delay: .3 }); } });
// 71: clever strategy beats the biggest army
SHOTS.push({ start: A(71), end: A(72), tr: 'dissolve', tod: 'day', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 3.2, z0: 1.0, z1: 1.1 });
  backdrop(ctx, cam, t, { tod: 'day', hor: 580, rays: .08, sun: [1500, 220] }); applyCam(ctx, cam, 1);
  const k = sk(lt, 1.0, 2.4);
  for (let i = 0; i < 28; i++) ST(ctx, { cols: ['#6a6f7a', '#6a6f7a'], hat: 'mongol' }, 200 + (i % 10) * 70 + k * (i % 3 + 1) * 260 * (i % 2 ? 1 : 1), 960 - Math.floor(i / 10) * 50, 200, { lean: k * .3, face: { eyes: k > 0 ? 'wide' : 'normal', mouth: k > 0 ? 'o' : 'flat' } });
  ST(ctx, WIJ, 1500 - k * 240, 1030, 560, { bob: breathe(t), arms: { L: [.4, -.1], R: [2.4, .3] }, face: { eyes: 'smug', mouth: 'smirk' } });
  bulb(ctx, 1500 - k * 240, 440, 1.8 + k * 1.2, sk(lt, .3, .7), t); flash(ctx, k > .1 ? (1 - k) * .4 : 0, '255,250,200'); applyCam(ctx, cam, 1);
} });
// 72: the deadliest enemy often comes from within
SHOTS.push({ start: A(72), end: A(73), tr: 'dip', x: 1.0, tod: 'storm', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5.5, z0: 1.0, z1: 1.1 });
  backdrop(ctx, cam, t, { tod: 'storm', hor: 600, volX: 1600 }); applyCam(ctx, cam, 1);
  gate(ctx, 960, 920, 1.5, 1, '#8a3a2a'); const cr = easeOut(sk(lt, 1.0, 3.5)); ctx.beginPath(); ctx.moveTo(960, 740); let y = 740; const R = rng(6); for (let i = 0; i < 9; i++) { y += 44 * cr; ctx.lineTo(960 + (i % 2 ? 18 : -18) * (R() + .3), y); } ctx.lineWidth = 10; ctx.strokeStyle = '#0a0a0e'; ctx.stroke();
  const sep = cr * 30;
  ST(ctx, BARAT, 640 - sep, 1020, 560, { lean: .08 * cr, arms: { L: [.5, -.2], R: [1.0 + Math.sin(t * 9) * .2, -.3] }, face: { eyes: 'squint', mouth: 'teeth', browAng: .3 } });
  ST(ctx, BARAT, 1280 + sep, 1020, 560, { flip: -1, lean: .08 * cr, arms: { L: [.5, -.2], R: [1.0 + Math.sin(t * 9 + 1) * .2, -.3] }, face: { eyes: 'squint', mouth: 'teeth', browAng: .3 } });
  crownProp(ctx, 960, 780 + Math.sin(t * 3) * 6, 1.4, 0, GOLD); fgFrame(ctx, cam, t, 'storm', { a: .8 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'MUSUH TERBESAR DATANG DARI DALAM', size: 56, track: 11, y: 130, col: '#e8dcc0' }], lt, { delay: 2.6 }); } });
// 73: final card
SHOTS.push({ start: A(73), end: A(73) + 14, tr: 'cut', tod: 'golden', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 8, z0: 1.0, z1: 1.06 });
  ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0a1230'); g.addColorStop(1, '#2a3a7a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); starField(ctx, t, 8);
  ctx.save(); ctx.translate(960, 760); ctx.rotate(t * .08); for (let i = 0; i < 16; i++) { ctx.rotate(TAU / 16); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-90, -1700); ctx.lineTo(90, -1700); ctx.closePath(); ctx.fillStyle = 'rgba(255,225,140,.07)'; ctx.fill(); } ctx.restore();
  applyCam(ctx, cam, .6); nusantaraMap(ctx, 960, 930, 820, t, easeOut(sk(lt, .3, 2.2)));
  motes(ctx, cam, t, { n: 70, col: '255,220,120', a: .7, h: 900, y0: 80 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'MAJAPAHIT', size: 190, track: 28, y: 400 }, { t: '1293  –  ± 1527', size: 62, track: 14, y: 560, col: '#ffffff', weight: 500 }], lt, { delay: .8, stagger: .8, fade: 1.2 }); titleRule(ctx, lt, 480, 1.4, 600); } });
