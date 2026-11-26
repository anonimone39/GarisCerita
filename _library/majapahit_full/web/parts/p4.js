// ===== BAB II: PESTA YANG BERUBAH JADI TRAGEDI (Bubat, 1357) =====
const WT = (line, txt) => (REFW.find(w => w.line === line && w.w.toLowerCase().startsWith(txt.toLowerCase())) || { s: SEN[line].s }).s;
function heart(ctx, x, y, s, col = '#ff5a8a', a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -30, -50, 0, -18); ctx.bezierCurveTo(30, -50, 60, -10, 0, 30); fillStroke(ctx, col, 5); ctx.restore(); }
function weddingArch(ctx, x, y, s, t, broken = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const cols = ['#ff8fb0', '#ffe066', '#fff', '#ff9a5a', '#c9a0ff'];
  for (const sd of [-1, 1]) { rrect(ctx, sd * 150 - 14, -300 + broken * (sd > 0 ? 60 : 0), 28, 300 - broken * (sd > 0 ? 60 : 0), 8); fillStroke(ctx, '#8a5a32', 6); }
  ctx.beginPath(); ctx.arc(0, -300, 150, Math.PI, 0); ctx.lineWidth = 22; ctx.strokeStyle = '#3f9a4a'; ctx.stroke();
  for (let i = 0; i < 14; i++) { const a = Math.PI + (i + .5) * Math.PI / 14, fx = Math.cos(a) * 150, fy = -300 + Math.sin(a) * 150; if (broken && fx > 0 && i > 8) continue; circle(ctx, fx, fy, 15); fillStroke(ctx, cols[i % 5], 4); circle(ctx, fx, fy, 5); ctx.fillStyle = '#f6b83a'; ctx.fill(); }
  ctx.restore();
}
function portrait(ctx, x, y, w, h, base, extra = {}) { // framed portrait of a character
  ctx.save(); rrect(ctx, x - w / 2, y - h / 2, w, h, 16); fillStroke(ctx, '#f6d8e2', 8); ctx.clip(); ST(ctx, base, x, y + h * .62, h * 1.15, Object.assign({ shadow: false, face: { eyes: 'happy', mouth: 'smile', blush: true } }, extra)); ctx.restore(); rrect(ctx, x - w / 2, y - h / 2, w, h, 16); fillStroke(ctx, null, 12, GOLD2);
}
// 34: chapter card
SHOTS.push({ start: A(34), end: A(35), tr: 'dissolve', tod: 'golden', draw(ctx, lt, t) { cardBG(ctx, t, lt, 'golden', .62); }, over(ctx, lt) { chapterOver(ctx, lt, 'II', 'PESTA YANG BERUBAH JADI TRAGEDI', '1357'); } });
// 35: Majapahit at its peak
SHOTS.push({ start: A(35), end: A(36), tr: 'dissolve', tod: 'golden', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 7.4, z0: 1.12, z1: 1.0, y0: 640, y1: 540 });
  backdrop(ctx, cam, t, { tod: 'golden', hor: 560, rays: .17, sun: [960, 280], sunPow: 1, volX: 1500, trees: 8 }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 7; i++) hutProp(ctx, 120 + i * 270, 790 - (i % 3) * 22, .8, 1); gate(ctx, 960, 900, 1.7, 1, '#c8553a');
  for (let i = 0; i < 5; i++) { banner(ctx, 240 + i * 360, 160, 1.0, t + i, i % 2 ? '#d8312b' : '#f6f1e8', i % 2 ? '#f6f1e8' : '#d8312b', 280); }
  crowd(ctx, MAJA, 40, 760, 960, 2, 300, t, { per: 5, seed: 5, arms: 'up', face: { eyes: 'happy', mouth: 'grin' } }); crowd(ctx, MAJA, 1160, 1880, 960, 2, 300, t, { per: 5, seed: 7, arms: 'up', flip: -1, face: { eyes: 'happy', mouth: 'grin' } });
  ST(ctx, HAYAM, 740, 1030, 600, { bob: breathe(t), arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'happy', mouth: 'smile' } });
  ST(ctx, GAJAH, 1190, 1030, 600, { flip: -1, bob: breathe(t, .004, 2.2), arms: { L: { ik: [.3, -.45], bend: 1 }, R: { ik: [.3, -.5], bend: -1 } }, face: { eyes: 'half', mouth: 'smirk', browAng: -.1 } });
  nameTag(ctx, 'HAYAM WURUK', 740, 330, '#8a1f2a', lt, 2.0, 30); nameTag(ctx, 'GAJAH MADA', 1190, 330, '#2a2a34', lt, 2.4, 30);
  motes(ctx, cam, t, { n: 50, col: '255,225,170', a: .6 }); fgFrame(ctx, cam, t, 'golden', { a: .7 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: '64 TAHUN KEMUDIAN', size: 58, track: 16, y: 130 }], lt, { delay: .3, out: 3.8 }); } });
// 36: the Palapa Oath
SHOTS.push({ start: A(36), end: A(37), tr: 'dissolve', tod: 'dusk', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 7, z0: 1.0, z1: 1.12, y0: 540 });
  backdrop(ctx, cam, t, { tod: 'dusk', hor: 600, sea: true, sun: [960, 560], sunR: 90, rays: .16, volX: 300 }); applyCam(ctx, cam, 1);
  ctx.beginPath(); ctx.moveTo(500, 1200); ctx.lineTo(560, 780); ctx.quadraticCurveTo(960, 700, 1360, 790); ctx.lineTo(1500, 1200); ctx.closePath(); fillStroke(ctx, '#5a4a4a', 7);
  const spill = sk(lt, WT(36, 'tidak') - A(36), WT(36, 'tidak') - A(36) + .9), fist = sk(lt, 1.2, 1.6);
  const gl = easeOut(sk(lt, 4.6, 6.5)); if (gl > 0) { ctx.save(); ctx.globalAlpha = .4 * gl; nusantaraMap(ctx, 960, 250, 700, t, gl); ctx.restore(); }
  ST(ctx, GAJAH, 960, 830, 560, { bob: breathe(t), arms: { L: spill > 0 ? [1.0 + spill * .8, .3] : { ik: [-.35, -.55], bend: 1 }, R: [2.45 + Math.sin(t * 7) * .06 * fist, .3] }, face: { eyes: 'squint', mouth: 'teeth', browAng: .3 }, prop: hold('L', 560, 1, c => { if (spill < 1) { c.rotate(spill * 1.5); rrect(c, -34, -10, 68, 40, 8); fillStroke(c, '#c9a064', 5); circle(c, 0, -14, 22); c.fillStyle = '#d8312b'; c.fill(); } }) });
  if (spill > 0) for (let i = 0; i < 16; i++) { const k = (spill * 1.2 + i * .05) % 1; circle(ctx, 880 + (i % 5) * 8 - k * 60, 700 + k * 260 + (i % 3) * 10, 6); ctx.fillStyle = ['#d8312b', '#f2a62a', '#8a2a1a'][i % 3]; ctx.fill(); }
  nameTag(ctx, 'GAJAH MADA', 960, 260, '#2a2a34', lt, .2, 30);
  motes(ctx, cam, t, { n: 30, col: '255,190,110', a: .5 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'SUMPAH PALAPA', size: 74, track: 18, y: 100 }], lt, { delay: .2, out: 6.4 }); } });
// 37: only Sunda has not bowed
SHOTS.push({ start: A(37), end: A(38), tr: 'dissolve', tod: 'night', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 3.7, z0: 1.0, z1: 1.08 });
  ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#040a1c'); g.addColorStop(1, '#14337a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); starField(ctx, t, 3);
  applyCam(ctx, cam, .5); nusantaraMap(ctx, 960, 560, 1250, t, 1);
  const k = easeOut(sk(lt, .5, 1.4)); ctx.save(); ctx.globalAlpha = k * .92; circle(ctx, 470, 800, 125); fillStroke(ctx, '#4a5262', 8); ctx.restore(); ctx.save(); ctx.globalAlpha = k; ctx.translate(470, 800); rrect(ctx, -26, -6, 52, 44, 8); fillStroke(ctx, '#c9c9d4', 5); ctx.beginPath(); ctx.arc(0, -8, 16, Math.PI, 0); ctx.lineWidth = 7; ctx.strokeStyle = '#c9c9d4'; ctx.stroke(); ctx.restore();
  placeTag(ctx, 'SUNDA', 470, 650, lt, .8, '#fff');
  motes(ctx, cam, t, { n: 50, col: '255,220,120', a: .6, h: 900, y0: 80 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'BELUM TUNDUK', size: 64, track: 16, y: 150, col: '#e8dcc0' }], lt, { delay: 1.4 }); } });
// 38: Hayam Wuruk falls in love
SHOTS.push({ start: A(38), end: A(39), tr: 'dissolve', tod: 'palace', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 6, z0: 1.0, z1: 1.1, x0: 900, x1: 960 });
  backdrop(ctx, cam, t, { tod: 'palace', hor: 640, volcano: false, cloudsA: 0 }); applyCam(ctx, cam, 1);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#4a1a22'; ctx.fillRect(0, 0, W, 760); ctx.fillStyle = '#2a0c12'; ctx.fillRect(0, 760, W, 400); applyCam(ctx, cam, 1);
  for (let i = 0; i < 5; i++) { rrect(ctx, 100 + i * 430, 0, 60, 760, 4); fillStroke(ctx, '#7a2a2a', 5); }
  banner(ctx, 280, 100, 1.2, t, '#8a1f2a', GOLD, 400); lantern(ctx, 700, 300, 1.3, t); lantern(ctx, 1500, 300, 1.3, t + 1); lightPool(ctx, 960, 1000, 900, 120, '255,170,90', .3);
  portrait(ctx, 1380, 470, 380, 500, PITA);
  const hh = sk(lt, 1.0, 2.0);
  ST(ctx, HAYAM, 760, 1030, 620, { bob: breathe(t), arms: { L: [.4, -.1], R: { ik: [.2, -.4], bend: 1 } }, face: { eyes: 'happy', mouth: 'smile', blush: true, look: [1, -.3] }, headTilt: -.08 });
  for (let i = 0; i < 7; i++) { const k = (t * .35 + i / 7) % 1; heart(ctx, 920 + Math.sin(i * 2 + t) * 70 + i * 28, 560 - k * 240, .7 + (i % 3) * .2, '#ff5a8a', Math.min(hh, 1 - k)); }
  nameTag(ctx, 'HAYAM WURUK', 760, 320, '#8a1f2a', lt, .1, 28); nameTag(ctx, 'DYAH PITALOKA', 1380, 190, '#d8588a', lt, .6, 28);
  motes(ctx, cam, t, { n: 24, col: '255,190,110', a: .5, up: .4 }); fgFrame(ctx, cam, t, 'palace', { a: .6 });
}, over(ctx, lt) { bigNum(ctx, '1357', 150, 130, 110, lt, { delay: .3, out: 5.3 }); } });
// 39: the Sunda party sails to Majapahit
SHOTS.push({ start: A(39), end: A(40), tr: 'dissolve', tod: 'golden', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 7.9, x0: 700, x1: 1200, z0: 1.05, z1: 1.0 });
  backdrop(ctx, cam, t, { tod: 'golden', hor: 560, sea: true, sun: [1500, 400], sunR: 76, rays: .15, volX: 300 }); applyCam(ctx, cam, 1);
  const bx = 640 + lt * 90; boatProp(ctx, bx, 900, 2.0, t, { sail: '#dfe6ee', hull: '#6a4a2a' });
  ST(ctx, LINGGA, bx - 120, 840, 360, { arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'happy', mouth: 'smile' }, shadow: false });
  ST(ctx, PITA, bx + 40, 850, 330, { arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'happy', mouth: 'smile', blush: true }, shadow: false });
  for (let i = 0; i < 3; i++) ST(ctx, SUNDA, bx - 230 + i * 85, 880, 230, { arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'normal', mouth: 'smile' }, shadow: false });
  nameTag(ctx, 'RAJA LINGGABUANA', bx - 120, 520, '#2a4f9e', lt, .5, 26); nameTag(ctx, 'DYAH PITALOKA', bx + 40, 580, '#d8588a', lt, .9, 26);
  junk(ctx, 1800, 640, .3, t, { ph: 4, sail: '#e9dfc9', hull: '#6a4a2a' }); motes(ctx, cam, t, { n: 24, col: '255,220,150', a: .5, y0: 300, h: 500 });
}, over(ctx, lt) { placeTag(ctx, 'KERAJAAN SUNDA  →  MAJAPAHIT', 960, 130, lt, .4); } });
// 40: a wedding party, not an army
SHOTS.push({ start: A(40), end: A(41), tr: 'dissolve', tod: 'golden', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 3.9, z0: 1.0, z1: 1.08 });
  backdrop(ctx, cam, t, { tod: 'golden', hor: 600, rays: .1, sun: [1450, 420], trees: 8 }); applyCam(ctx, cam, 1);
  flagProp(ctx, 240, 960, 1.4, t, 'sunda', 440); flagProp(ctx, 1680, 960, 1.4, t + 1, 'sunda', 440);
  for (let i = 0; i < 6; i++) { ST(ctx, SUNDA, 480 + i * 190, 985 + (i % 2) * 36, 400, { legs: walkLegs(t + i, 7, .4), arms: { L: [.5, -.2], R: [.5, -.2] }, face: { eyes: 'happy', mouth: 'smile' }, prop: hold('R', 400, 1, c => { rrect(c, -22, -10, 44, 34, 5); fillStroke(c, ['#e0392f', '#f2b52a', '#3fa35b'][i % 3], 4); line(c, 0, -10, 0, 24, 4, '#fff'); }) }); }
  stampMark(ctx, 'HAJATAN', 960, 330, 1.0, sk(lt, 1.2, 1.5), '#3fa35b', -.05); petalsRain(ctx, t, 24, 3);
  motes(ctx, cam, t, { n: 24, col: '255,225,170', a: .5 }); fgFrame(ctx, cam, t, 'golden', { a: .6 });
} });
// 41: camp at Bubat Field, at dawn
SHOTS.push({ start: A(41), end: A(42), tr: 'dissolve', tod: 'mist', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5.8, z0: 1.0, z1: 1.1 });
  backdrop(ctx, cam, t, { tod: 'mist', hor: 580, rays: .13, sun: [1100, 340], volX: 400, trees: 6 }); applyCam(ctx, cam, 1);
  paddy(ctx, 0, 1920, 760, t); tentProp(ctx, 360, 940, 1.7, '#5a7ac9'); tentProp(ctx, 1520, 940, 1.7, '#5a7ac9'); tentProp(ctx, 1800, 900, 1.3, '#5a7ac9'); weddingArch(ctx, 960, 960, 1.5, t);
  fogBand(ctx, t, 900, 160, '#e4e6e0', .5, 3);
  ST(ctx, PITA, 700, 1010, 540, { bob: breathe(t), arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'happy', mouth: 'smile', blush: true, look: [1, -.1] } });
  ST(ctx, LINGGA, 1180, 1010, 560, { flip: -1, bob: breathe(t, .004, 2.2), arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } });
  nameTag(ctx, 'DYAH PITALOKA', 700, 330, '#d8588a', lt, .6, 28); petalsRain(ctx, t, 36, 6, '#ffd0e0'); motes(ctx, cam, t, { n: 30, col: '255,245,215', a: .5 }); fgFrame(ctx, cam, t, 'mist', { a: .6 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'LAPANGAN BUBAT', size: 60, track: 16, y: 120 }, { t: 'TAK JAUH DARI IBU KOTA MAJAPAHIT', size: 28, track: 7, y: 190, col: '#e8dcc0', weight: 600, font: 'Poppins' }], lt, { delay: .3, stagger: .5, out: 5.2 }); } });
// 42-43: Gajah Mada has other plans
SHOTS.push({ start: A(42), end: A(44), tr: 'dissolve', tod: 'palace', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 8, z0: 1.0, z1: 1.12, x0: 1000, x1: 900 });
  backdrop(ctx, cam, t, { tod: 'palace', hor: 640, volcano: false, cloudsA: 0 }); applyCam(ctx, cam, 1);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#2a1014'; ctx.fillRect(0, 0, W, 760); ctx.fillStyle = '#140608'; ctx.fillRect(0, 760, W, 400); applyCam(ctx, cam, 1);
  for (let i = 0; i < 5; i++) { rrect(ctx, 100 + i * 430, 0, 60, 760, 4); fillStroke(ctx, '#5a2222', 5); } lantern(ctx, 600, 300, 1.4, t); lantern(ctx, 1400, 300, 1.4, t + 1);
  portrait(ctx, 400, 440, 320, 440, PITA); lightPool(ctx, 960, 1000, 900, 110, '255,150,80', .28);
  const pt = sk(lt, 3.4, 4.2);
  ST(ctx, GAJAH, 1250, 1030, 620, { flip: -1, bob: breathe(t), arms: { L: [.4, -.2], R: { ik: [.5, -.7], bend: 1 } }, face: { eyes: 'squint', mouth: 'smirk', browAng: .3 } });
  ST(ctx, SUNDA, 700, 1000, 460, { lean: -.05, arms: { L: [.9, -.3], R: [.9, -.3] }, face: { eyes: 'wide', mouth: 'o' } });
  nameTag(ctx, 'GAJAH MADA', 1250, 330, '#2a2a34', lt, .1, 28); stampMark(ctx, 'PERSEMBAHAN', 960, 250, 1.0, sk(lt, WT(43, 'diserahkan') - A(42), WT(43, 'diserahkan') - A(42) + .3), '#d8312b', -.06);
  motes(ctx, cam, t, { n: 24, col: '255,170,90', a: .5, up: .4 }); fgFrame(ctx, cam, t, 'palace', { a: .7 });
} });
// 44: King Linggabuana is furious
SHOTS.push({ start: A(44), end: A(45), tr: 'dissolve', tod: 'dusk', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 6.4, z0: 1.0, z1: 1.1 });
  backdrop(ctx, cam, t, { tod: 'dusk', hor: 600, sun: [1500, 540], sunPow: .6, volX: 400 }); applyCam(ctx, cam, 1);
  tentProp(ctx, 380, 940, 1.7, '#5a7ac9'); tentProp(ctx, 1560, 940, 1.7, '#5a7ac9');
  const tearK = sk(lt, 1.2, 2.2), turn = sk(lt, 3.4, 4.2);
  ST(ctx, PITA, 400, 1010, 420, { arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'wide', mouth: 'o' } }); for (const sd of [0, 1]) ST(ctx, SUNDA, 1500 + sd * 150, 1000, 380, { flip: -1, arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'normal', mouth: 'flat' } });
  ST(ctx, LINGGA, 980, 1030, 620, { flip: turn > .3 ? -1 : 1, bob: breathe(t), arms: { L: [.5, -.2], R: [2.4 * (1 - tearK) + .6, .3] }, face: { eyes: 'squint', mouth: 'teeth', browAng: .35 } });
  if (tearK > 0) for (let i = 0; i < 8; i++) { ctx.save(); ctx.translate(1100 + i * 22 + tearK * (30 + i * 28), 560 + tearK * (80 + i * 30)); ctx.rotate(tearK * (3 + i)); rrect(ctx, -18, -12, 36, 24, 3); fillStroke(ctx, '#f3e3b8', 3); ctx.restore(); }
  nameTag(ctx, 'RAJA LINGGABUANA', 980, 320, '#2a4f9e', lt, .1, 28); flash(ctx, (lt > 1.4 && lt < 1.6 ? .15 : 0), '255,80,60');
  motes(ctx, cam, t, { n: 24, col: '255,170,90', a: .5 }); fgFrame(ctx, cam, t, 'dusk', { a: .7 });
} });
// 45-46: Bubat is surrounded
SHOTS.push({ start: A(45), end: A(47), tr: 'dissolve', tod: 'fire', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 6, z0: 1.05, z1: 1.0, y0: 520, y1: 560 });
  backdrop(ctx, cam, t, { tod: 'fire', hor: 600, volX: 1500, sun: [960, 500] }); applyCam(ctx, cam, 1);
  paddy(ctx, 0, 1920, 760, t); tentProp(ctx, 880, 880, 1.0, '#5a7ac9'); tentProp(ctx, 1040, 890, .9, '#5a7ac9'); weddingArch(ctx, 960, 940, .6, t);
  for (let i = 0; i < 4; i++) ST(ctx, SUNDA, 880 + i * 60, 960 + (i % 2) * 14, 110, { face: { eyes: 'wide', mouth: 'o' }, shadow: false });
  const close = easeOut(sk(lt, 0, 3.4)), N = 30;
  for (let i = 0; i < N; i++) { const a = i / N * TAU, rx = lerp(900, 330, close), ry = lerp(250, 110, close), x = 960 + Math.cos(a) * rx, y = 910 + Math.sin(a) * ry; if (y > 860) ST(ctx, MAJA, x, y + 70, 150 + (y - 800) * .25, { flip: x < 960 ? 1 : -1, arms: { L: [.4, -.1], R: [.9, -.3] }, face: { eyes: 'squint', mouth: 'flat' }, prop: hold('R', 150, x < 960 ? 1 : -1, c => spearProp(c, 0, 0, 60, 0)) }); }
  placeTag(ctx, 'PULUHAN ORANG', 960, 620, lt, 3.6, '#cfe0ff'); placeTag(ctx, 'RIBUAN PRAJURIT', 960, 330, lt, 4.2, '#ffb0a0');
  motes(ctx, cam, t, { n: 60, col: '255,140,60', a: .85, up: 1.4, y0: 60, h: 1000, r: 3.5 });
} });
// 47: the last stand, in silhouette
SHOTS.push({ start: A(47), end: A(48), tr: 'dissolve', tod: 'fire', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 5, z0: 1.0, z1: 1.08, shake: 4 });
  ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2a0a14'); g.addColorStop(.6, '#c8421e'); g.addColorStop(1, '#2a0a10'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  applyCam(ctx, cam, .1); drawSun(ctx, 960, 520, 150, t, 1.2); applyCam(ctx, cam, .5); ctx.fillStyle = '#1a0608'; ctx.fillRect(-500, 820, 3000, 600); applyCam(ctx, cam, 1);
  const SIL = '#12060a', fall = easeIn(sk(lt, 2.6, 4.2));
  for (let i = 0; i < 9; i++) ST(ctx, MAJA, 160 + i * 110, 960, 360, { sil: SIL, arms: { L: [2.0, .3], R: [1.2 + Math.sin(t * 8 + i) * .7, -.3] }, prop: hold('R', 360, 1, c => { c.rotate(.5); spearProp(c, 0, 0, 70, 0); }) });
  for (let i = 0; i < 9; i++) ST(ctx, MAJA, 1760 - i * 110, 960, 360, { flip: -1, sil: SIL, arms: { L: [2.0, .3], R: [1.2 + Math.sin(t * 8 + i + 1) * .7, -.3] }, prop: hold('R', 360, -1, c => { c.rotate(.5); spearProp(c, 0, 0, 70, 0); }) });
  ST(ctx, LINGGA, 960, 1000, 640, { sil: SIL, lean: -1.3 * fall, arms: { L: [1.4, .2], R: [1.6, .2] }, shadow: false });
  for (let i = 0; i < 6; i++) { const k = (t * 3 + i * .3) % 1; burst(ctx, 640 + i * 130, 820 - k * 40, 36 + k * 36, 9, '#ffb060', i + 3); }
  motes(ctx, cam, t, { n: 70, col: '255,140,60', a: .85, up: 1.4, y0: 60, h: 1000, r: 3.5 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'RAJA LINGGABUANA GUGUR', size: 54, track: 14, y: 130, col: '#e8dcc0' }], lt, { delay: 2.0, out: 4.4 }); } });
// 48: Dyah Pitaloka, told with restraint
SHOTS.push({ start: A(48), end: A(49), tr: 'dissolve', tod: 'night', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 4.9, z0: 1.0, z1: 1.1, y0: 540 });
  ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0a0e22'); g.addColorStop(1, '#1a2040'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); applyCam(ctx, cam, 1);
  ctx.beginPath(); ctx.moveTo(100, 1100); ctx.lineTo(960, 120); ctx.lineTo(1820, 1100); ctx.closePath(); ctx.fillStyle = '#243064'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = '#0e1430'; ctx.stroke(); ctx.beginPath(); ctx.moveTo(760, 1100); ctx.lineTo(960, 520); ctx.lineTo(1160, 1100); ctx.closePath(); ctx.fillStyle = '#0a0e22'; ctx.fill();
  const flame = 1 - easeIn(sk(lt, 3.4, 4.4)); lightPool(ctx, 960, 960, 560, 160, '255,200,110', .5 * flame);
  rrect(ctx, 930, 960, 60, 90, 6); fillStroke(ctx, '#f6f1e8', 5); if (flame > .05) { ctx.save(); ctx.translate(960, 930); ctx.scale(flame, flame); ctx.beginPath(); ctx.moveTo(0, -46); ctx.quadraticCurveTo(26, -10, 0, 20); ctx.quadraticCurveTo(-26, -10, 0, -46); fillStroke(ctx, '#ffd23a', 4); ctx.restore(); }
  ST(ctx, PITA, 700, 1010, 520, { lean: .06, arms: { L: [.5, -.2], R: [.5, -.2] }, face: { eyes: 'half', mouth: 'frown', look: [1, .3] }, headTilt: -.1 });
  for (let i = 0; i < 6; i++) { const k = (t * .25 + i * .17) % 1; ctx.save(); ctx.translate(1100 + Math.sin(i * 3 + t) * 80, 420 + k * 640); ctx.rotate(t + i); ellipse(ctx, 0, 0, 12, 6); ctx.fillStyle = '#fff'; ctx.globalAlpha = .85; ctx.fill(); ctx.restore(); }
  starField(ctx, t, 9);
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'MENJAGA KEHORMATAN', size: 52, track: 14, y: 130, col: '#e8dcc0', weight: 500 }], lt, { delay: .8, out: 3.6 }); } });
// 49: Hayam Wuruk grieves
SHOTS.push({ start: A(49), end: A(50), tr: 'dissolve', tod: 'night', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 3.3, z0: 1.0, z1: 1.1, y0: 540 });
  backdrop(ctx, cam, t, { tod: 'night', hor: 600, volcano: false, trees: 6 }); applyCam(ctx, cam, 1);
  weddingArch(ctx, 520, 960, 1.4, t, 1); tentProp(ctx, 1550, 940, 1.5, '#324a8a'); lightPool(ctx, 980, 990, 460, 90, '255,200,110', .4);
  ST(ctx, HAYAM, 980, 1030, 560, { lean: .35, legs: { L: [.9, -1.5], R: [.4, -1.2] }, arms: { L: [.7, -.3], R: { ik: [.3, -.4], bend: 1 } }, face: { eyes: 'half', mouth: 'frown', browAng: .3, look: [-1, .5] }, headTilt: .15 });
  lantern(ctx, 1120, 930, 1.1, t); petalsRain(ctx, t, 20, 4, '#e8c0d0'); motes(ctx, cam, t, { n: 40, col: '255,230,150', a: .8, r: 2.4 });
} });
// 50: Gajah Mada is retired to Madakaripura
SHOTS.push({ start: A(50), end: A(51), tr: 'dissolve', tod: 'mist', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 4.2, x0: 900, x1: 1100, z0: 1.05, z1: 1.0 });
  backdrop(ctx, cam, t, { tod: 'mist', hor: 580, volcano: false, trees: 10, rays: .1, sun: [500, 260] }); applyCam(ctx, cam, 1);
  waterfall(ctx, 1500, 150, 220, 760, t); for (let i = 0; i < 4; i++) treeProp(ctx, 1200 + i * 170, 880 + (i % 2) * 20, 1.1, 0, '#2a6a3a', t);
  const wx = lerp(700, 1280, easeInOutS(sk(lt, 0, 4)));
  ST(ctx, GAJAH, wx, 1010, 520, { legs: walkLegs(t, 7, .45), arms: walkArms(t, 7, .35), lean: .06, face: { eyes: 'half', mouth: 'flat', look: [1, 0] } });
  nameTag(ctx, 'GAJAH MADA', wx, 330, '#2a2a34', lt, .1, 28); placeTag(ctx, 'MADAKARIPURA', 1500, 90, lt, .5);
  fogBand(ctx, t, 900, 140, '#e4e6e0', .5, 5); motes(ctx, cam, t, { n: 30, col: '255,255,255', a: .5 }); fgFrame(ctx, cam, t, 'mist', { a: .6 });
} });
function easeInOutS(k) { return ease(clamp(k)); }
// 51: Majapahit and Sunda break apart
SHOTS.push({ start: A(51), end: A(52), tr: 'dissolve', tod: 'night', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 3.3, z0: 1.0, z1: 1.06 });
  ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0a1230'); g.addColorStop(1, '#1d3a7a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); starField(ctx, t, 6);
  const sep = easeOut(sk(lt, .5, 2.2)) * 110;
  for (const sd of [-1, 1]) { applyCam(ctx, cam, .5); ctx.save(); ctx.beginPath(); ctx.rect(sd < 0 ? -3000 : 800, -500, sd < 0 ? 3800 : 3000, 2500); ctx.clip(); ctx.translate(sd * sep, 0); javaMap(ctx, 800, 600, 600, { fill: sd < 0 ? '#5a8ae0' : '#e0645a', glow: .5 }); ctx.restore(); }
  applyCam(ctx, cam, .5); ctx.beginPath(); ctx.moveTo(800, 380); let y = 380; const R = rng(3); for (let i = 0; i < 9; i++) { y += 40; ctx.lineTo(800 + (i % 2 ? 18 : -18) * (R() + .3), y); } ctx.lineWidth = 8; ctx.strokeStyle = '#fff'; ctx.stroke();
  placeTag(ctx, 'SUNDA', 800 - 300 - sep, 420, lt, 1.0, '#cfe0ff'); placeTag(ctx, 'MAJAPAHIT', 800 + 300 + sep, 420, lt, 1.0, '#ffd0c0');
  motes(ctx, cam, t, { n: 30, col: '200,220,255', a: .5 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'BERABAD-ABAD', size: 56, track: 16, y: 130 }], lt, { delay: 1.2 }); } });
// 52: historians debate: the sources
SHOTS.push({ start: A(52), end: A(53), tr: 'dissolve', tod: 'palace', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 8.8, z0: 1.0, z1: 1.08, x0: 960, x1: 900 });
  backdrop(ctx, cam, t, { tod: 'palace', hor: 640, volcano: false, cloudsA: 0 }); applyCam(ctx, cam, 1);
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#2a1a10'; ctx.fillRect(0, 0, W, 800); ctx.fillStyle = '#140a06'; ctx.fillRect(0, 800, W, 300); applyCam(ctx, cam, 1);
  for (let r = 0; r < 3; r++) { rrect(ctx, 80, 180 + r * 190, 1760, 18, 4); fillStroke(ctx, '#6a4a2a', 4); for (let i = 0; i < 26; i++) { rrect(ctx, 100 + i * 66, 100 + r * 190 + (i % 3) * 6, 40, 80 - (i % 3) * 6, 3); fillStroke(ctx, ['#8a5a32', '#6a3a22', '#a06a3a'][i % 3], 3); } }
  lantern(ctx, 400, 480, 1.3, t); lantern(ctx, 1520, 480, 1.3, t + 1); lightPool(ctx, 960, 1000, 900, 110, '255,190,100', .28);
  const items = [['KIDUNG SUNDA', 'Kidung', 520, 640, 1], ['CARITA PARAHYANGAN', 'Carita', 960, 760, 1], ['PARARATON', 'Pararaton', 1400, 640, 1], ['NAGARAKRETAGAMA', 'Nagara', 960, 520, 0]];
  for (const [lab, key, x, y, ok] of items) { const k = clamp((lt - (WT(52, key) - A(52))) / .5); if (k <= 0) continue; lontar(ctx, x, y + Math.sin(t * 2 + x) * 6, 1.25 * backOut(k), lab, Math.sin(t + x) * .03); if (ok) { circle(ctx, x + 190, y - 30, 22 * backOut(k)); fillStroke(ctx, '#3fa35b', 5); line(ctx, x + 180, y - 30, x + 188, y - 20, 6, '#fff'); line(ctx, x + 188, y - 20, x + 204, y - 42, 6, '#fff'); } else qmark(ctx, x + 200, y - 30, 80, t, k); }
  ST(ctx, SCHOLAR, 960, 1030, 520, { bob: breathe(t), arms: { L: [.4, -.1], R: { ik: [.1, -.93 + Math.sin(t * 13) * .02], bend: 1 } }, face: { eyes: 'wide', look: [Math.sin(t * 2), -.2], mouth: 'flat', browUp: 1 } });
  motes(ctx, cam, t, { n: 24, col: '255,190,110', a: .5, up: .3 }); fgFrame(ctx, cam, t, 'palace', { a: .6 });
}, over(ctx, lt) { cineTitle(ctx, [{ t: 'SEJARAWAN MASIH MEMPERDEBATKANNYA', size: 44, track: 10, y: 80, weight: 600 }], lt, { delay: .3, out: 3 }); } });
// 53: one ambition turned a party into a scar
SHOTS.push({ start: A(53), end: A(54), tr: 'dip', x: 1.0, tod: 'dusk', draw(ctx, lt, t) {
  const cam = CAM(t, lt, { dur: 8.4, z0: 1.2, z1: 1.0, y0: 600, y1: 540 });
  backdrop(ctx, cam, t, { tod: 'dusk', hor: 600, sun: [1500, 520], sunPow: .6, volX: 400 }); applyCam(ctx, cam, 1);
  paddy(ctx, 0, 1920, 780, t); weddingArch(ctx, 960, 960, 1.7, t, sk(lt, 1.5, 3.0)); tentProp(ctx, 260, 960, 1.4, '#5a7ac9'); tentProp(ctx, 1680, 960, 1.4, '#5a7ac9');
  petalsRain(ctx, t, 30, 8, '#e8c0d0'); fogBand(ctx, t, 940, 160, '#c88a7a', .45, 2); motes(ctx, cam, t, { n: 30, col: '255,190,140', a: .6 }); fgFrame(ctx, cam, t, 'dusk', { a: .7 });
} });
