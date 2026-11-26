// ---------- Majapahit (full, 16:9): helpers, cast, sentence anchors ----------
// A(i) / Z(i): start / end (seconds, reference voice timeline) of narration sentence i. Shots are timed with these, so they follow the voice.
const SEN = (() => { const d = {}; REFW.forEach(w => { const s = d[w.line] || (d[w.line] = { s: w.s, e: w.e }); s.e = Math.max(s.e, w.e); }); return d; })();
const A = (i, o = 0) => SEN[i].s + o, Z = (i, o = 0) => SEN[i].e + o;
const sk = (v, a, b) => clamp((v - a) / (b - a));
const mixc = (a, b, k) => mix(a, b, clamp(k));
const hold = (which, s, flip, fn) => (ctx, k, p) => { if (k !== which) return; ctx.save(); ctx.translate(p[0], p[1]); ctx.scale(flip / s, 1 / s); fn(ctx); ctx.restore(); };
const dust = (ctx, x, y, t, r = 40, seed = 3) => puff(ctx, x, y, r, t, '#e9dcc0', seed, .7);
const breathe = (t, a = .004, sp = 2.6) => Math.sin(t * sp) * a;
// ---- cast: every character keeps its colours and headgear in all chapters ----
const KERTN = { cols: ['#d8a02a', '#d8a02a'], hat: 'crown', crownCol: GOLD, crownH: 1.1, robe: '#c8872a', robeTrim: '#fff4d0', belt: false };
const HAYAM = { cols: ['#8a1f2a', '#8a1f2a'], hat: 'crown', makuta: true, crownCol: GOLD, crownH: 1.25, robe: '#8a1f2a', robeTrim: GOLD, belt: false };
const GAJAH = { cols: ['#2a2a34', '#2a2a34'], hat: 'turban', hatCol: '#7a1f1f', vest: '#e8c04a' };
const WIRA = { cols: ['#8a7a5a', '#8a7a5a'], hat: 'turban', hatCol: '#e9e6dc', robe: '#8a7a5a', robeTrim: '#d8c89a', belt: false };
const LINGGA = { cols: ['#2a4f9e', '#2a4f9e'], hat: 'crown', crownCol: '#dfe6ee', crownH: 1.1, robe: '#2a4f9e', robeTrim: '#dfe6ee', belt: false };
const PITA = { cols: ['#e86a9a', '#e86a9a'], hat: 'flower', robe: '#e86a9a', robeTrim: '#fff', belt: false };
const SUNDA = { cols: ['#2a4f9e', '#2a4f9e'], hat: 'band', hatCol: '#cfe0ff' };
const WIKRA = { cols: ['#c8312b', '#c8312b'], hat: 'crown', crownCol: GOLD, robe: '#a8262b', robeTrim: GOLD, belt: false };
const WIRAB = { cols: ['#e08a2a', '#e08a2a'], hat: 'crown', crownCol: GOLD, robe: '#c8721e', robeTrim: GOLD, belt: false };
const BARAT = { cols: PAL.red, hat: 'band', hatCol: '#f6f1e8' };
const TIMUR = { cols: ['#e08a2a', '#e08a2a'], hat: 'band', hatCol: '#5a2a0a' };
const MING = { cols: ['#1f8a8a', '#1f8a8a'], hat: 'ming', hatCol: '#1b1722', robe: '#1f7a8a', robeTrim: GOLD, belt: false };
const YONGLE = { cols: ['#e0b02a', '#e0b02a'], hat: 'ming', hatCol: '#d8a02a', robe: '#e0b02a', robeTrim: '#d8312b', belt: false };
const KUBILAI = { cols: ['#7a1f2a', '#7a1f2a'], hat: 'khan', robe: '#7a1f2a', robeTrim: GOLD, belt: false };
const ENVOY = { cols: ['#2a2a30', '#2a2a30'], hat: 'ming', hatCol: '#2a2a30', robe: '#3a3a44', robeTrim: '#8a8a94', belt: false };
const SCHOLAR = { cols: ['#7a5a3a', '#7a5a3a'], hat: 'band', hatCol: '#e9e6dc' };
const SINGA = { cols: ['#d8a02a', '#d8a02a'], hat: 'band', hatCol: '#fff4d0' };       // Singhasari courtiers
const WHITE = { eyes: 'normal', mouth: 'smile' };
const SHOTS = [];
// chapter / title card background: darkened scenery with drifting light
function cardBG(ctx, t, lt, tod, a = .55) {
  const cam = CAM(t, lt, { dur: 5, z0: 1, z1: 1.05 }); backdrop(ctx, cam, t, { tod, hor: 600, cloudsA: .5 }); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = `rgba(4,2,8,${a})`; ctx.fillRect(0, 0, W, H);
  motes(ctx, cam, t, { n: 50, col: tod === 'fire' ? '255,150,70' : '255,225,160', a: .55, h: 900, y0: 100, up: tod === 'fire' ? 1 : .2, vx: 4, r: 3 });
}
function chapterOver(ctx, lt, roman, title, sub) {
  cineTitle(ctx, [{ t: 'BAB ' + roman, size: 42, track: 22, y: 400, col: '#d9b86a', weight: 600 }, { t: title, size: title.length > 26 ? 66 : 100, track: title.length > 26 ? 5 : 8, y: 520 }, { t: sub || '', size: 32, track: 7, y: 650, col: '#e8dcc0', weight: 600, font: 'Poppins' }], lt, { stagger: .45 }); titleRule(ctx, lt, 584, .5);
}
// a single drifting spear/army block that moves, for marching crowds
function marchBlock(ctx, base, x, y, s, t, o = {}) { crowd(ctx, base, x - (o.w || 300), x + (o.w || 300), y, o.rows || 2, s, t, Object.assign({ per: o.per || 4, seed: o.seed || 3, march: o.march == null ? 8 : o.march, flip: o.flip || 1, dy: o.dy || 46, shrink: .07, face: o.face }, o.extra ? { extra: o.extra } : {})); }
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
