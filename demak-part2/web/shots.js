// ---------- Demak Part 2: Wali Songo dan Masjid Agung Demak (times are voiceover seconds) ----------
const dust = (ctx, x, y, t, r = 40, seed = 3) => puff(ctx, x, y, r, t, '#e9dcc0', seed, .8);
const sk = (v, a, b) => clamp((v - a) / (b - a));
const SHOTS = [];
const RPATAH = { cols: ['#2f8f5b', '#f6f1e8'], hat: 'band', hatCol: '#f6f1e8', belt: false };
const KALI = { cols: ['#2f8f5b', '#2f8f5b'], hat: 'blangkon', hatCol: '#5a3a1c', vest: '#f6f1e8', belt: false };
const BONANG = { cols: ['#f6f1e8', '#f6f1e8'], hat: 'band', hatCol: '#f6f1e8', vest: '#7a4bc4', belt: false };
const WALI = { cols: ['#f6f1e8', '#f6f1e8'], hat: 'band', hatCol: '#f6f1e8', vest: '#2f8f5b', belt: false };
const PUTRI = { cols: ['#d8312b', '#d8312b'], hat: 'band', hatCol: '#f6c93a', belt: false };
const ADI = [{ cols: ['#3a8f6a', '#3a8f6a'], hat: 'blangkon', hatCol: '#7a4524', vest: '#f2c230' }, { cols: ['#2f63c9', '#2f63c9'], hat: 'blangkon', hatCol: '#5a3a1c' }, { cols: ['#e07a2f', '#e07a2f'], hat: 'blangkon', hatCol: '#7a4524', vest: '#f6f1e8' }];
const FOREIGN = { cols: ['#3a3f4a', '#f6f1e8'], hat: 'captain' };

// 1 — Demak grows from within
SHOTS.push({ start: 0, end: 4.89, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.89, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 800, sea: true, seaPal: ['#a07ab0', '#4a5ea0', '#2a3470'] }); applyCam(ctx, cam, 1);
  const fa = 1 - sk(lt, 2.2, 2.9);
  if (fa > 0) { ctx.save(); ctx.globalAlpha = fa; drawShip(ctx, lerp(820, 1250, sk(lt, 1.4, 2.9)), 960, .42, t, { flag: '#1b1820', hull: '#3b2a2c', ph: 0, flip: 1 }); ctx.restore(); qmark(ctx, 820, 640, 80, t, sk(lt, .7, 1.0) * fa, .2); }
  pier(ctx, 1250, t); flagDemak(ctx, 140, 1270, 1.0, t, 520, 1);
  const flex = sk(lt, 3.1, 3.4);
  ST(ctx, Object.assign({}, RPATAH, { hat: 'crown', crownCol: '#2f8f5b' }), 470, 1400, 560, { bob: Math.sin(t * 3) * .004, arms: flex > 0 ? { L: [2.2, -1.1], R: [2.2, -1.1] } : { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: flex > 0 ? 'happy' : 'normal', mouth: flex > 0 ? 'grin' : 'smile' } });
  ST(ctx, ADI[0], 800, 1420, 440, { arms: flex > 0 ? { L: [2.2, -1.1], R: [2.2, -1.1] } : { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'happy', mouth: 'grin' } });
  overlay(ctx, () => { kinetic(ctx, 'KUAT', 540, 380, 190, lt, { delay: 3.2, col: '#ffd23a', pulse: true }); kinetic(ctx, 'DARI DALAM', 540, 560, 120, lt, { delay: 3.7, col: '#fff' }); });
} });
// 2 — nine saints
SHOTS.push({ start: 4.89, end: 8.66, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 3.8, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 900 }); applyCam(ctx, cam, 1);
  waliLine(ctx, 90, 990, 1480, 250, t, sk(lt, 1.0, 2.8));
  overlay(ctx, () => { kinetic(ctx, 'SEMBILAN ULAMA', 540, 360, 98, lt, { delay: .9, col: '#fff' }); });
  nameTag(ctx, 'WALI SONGO', 540, 520, '#7a4bc4', lt, 2.82, 58);
  const n = Math.floor(sk(lt, 1.0, 2.8) * 9); if (n > 0) overlay(ctx, () => { ctx.save(); ctx.translate(540, 1730); text(ctx, String(n), 0, 0, 150, '#ffd23a', INK, 24, 'Poppins', 700); ctx.restore(); });
} });
// 3a — not by war
SHOTS.push({ start: 8.66, end: 11.42, tr: 'cut', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 2.8, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  const a = backOut(sk(lt, 1.1, 1.5)), x = sk(lt, 1.7, 2.0);
  ctx.save(); ctx.translate(540, 760); ctx.scale(a, a); swordProp(ctx, 0, 0, 340, .8); swordProp(ctx, 0, 0, 340, -.8); ctx.restore();
  if (x > 0) { ctx.save(); ctx.translate(540, 760); ctx.scale(backOut(x) * 1.2, backOut(x) * 1.2); text(ctx, 'X', 0, 0, 520, '#e0392f', INK, 36, 'Poppins', 700); ctx.restore(); }
  ST(ctx, BONANG, 300, 1400, 520, { bob: Math.sin(t * 3) * .004, arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'happy', mouth: 'smile' } });
  ST(ctx, WALI, 780, 1400, 520, { flip: -1, bob: Math.sin(t * 3 + 1) * .004, arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'happy', mouth: 'smile' } });
  nameTag(ctx, 'BUKAN PERANG', 540, 330, '#e0392f', lt, 2.0, 50);
} });
// 3b — trade
SHOTS.push({ start: 11.42, end: 13.32, tr: 'cut', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 1.9, z0: 1, z1: 1.06, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 780, sea: true }); applyCam(ctx, cam, 1);
  drawShip(ctx, 770, 1000, .5, t, { flag: '#e0392f', hull: '#7a4a2a', ph: 1 }); pier(ctx, 1200, t);
  drawCrate(ctx, 110, 1380, 180, 150, 0, 'KAIN'); drawBarrel(ctx, 960, 1370, 1.0);
  ST(ctx, KALI, 400, 1500, 540, { bob: Math.sin(t * 3) * .004, arms: { L: [.5, -.4], R: [.5, -.4] }, face: { eyes: 'happy', mouth: 'grin' } });
  ST(ctx, ADI[1], 760, 1520, 500, { flip: -1, arms: { L: [.5, -.4], R: [.5, -.4] }, face: { eyes: 'happy', mouth: 'smile' } });
  coinBurst(ctx, 580, 1180, lt - .8, 14, 4); nameTag(ctx, 'PERDAGANGAN', 540, 640, '#e07a1a', lt, .8, 46);
} });
// 3c — marriage
SHOTS.push({ start: 13.32, end: 14.4, tr: 'cut', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 1.1, z0: 1, z1: 1.05, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  ST(ctx, WALI, 380, 1400, 540, { bob: Math.sin(t * 3) * .004, arms: { L: [.4, -.1], R: [.6, -.3] }, face: { eyes: 'happy', mouth: 'smile' } });
  ST(ctx, PUTRI, 700, 1400, 540, { flip: -1, bob: Math.sin(t * 3 + 1) * .004, arms: { L: [.4, -.1], R: [.6, -.3] }, face: { eyes: 'happy', mouth: 'smile' } });
  for (let i = 0; i < 4; i++) { const ph = (lt * .9 + i * .25) % 1; heart(ctx, 460 + i * 60 + Math.sin(i * 2) * 20, 900 - ph * 280, .8 + i * .06, '#e0392f', 1 - ph); }
  nameTag(ctx, 'PERNIKAHAN', 540, 640, '#e0392f', lt, .12, 46);
} });
// 3d — education
SHOTS.push({ start: 14.4, end: 15.69, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 1.3, z0: 1, z1: 1.05, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  ST(ctx, BONANG, 300, 1380, 540, { bob: Math.sin(t * 3) * .004, arms: { L: [.5, -.3], R: { ik: [.2, -.5], bend: -1 } }, face: { eyes: 'happy', mouth: 'smile' } });
  kitab(ctx, 440, 1010, 1.2, -.1);
  for (let i = 0; i < 3; i++) ST(ctx, ADI[i], 640 + i * 150, 1430 - (i % 2) * 20, 330, { flip: -1, bob: Math.sin(t * 3 + i) * .006, arms: { L: [.4, -.2], R: [.4, -.2] }, face: { eyes: 'normal', mouth: 'smile', look: [-.7, -.2] } });
  nameTag(ctx, 'PENDIDIKAN', 540, 640, '#2f63c9', lt, .3, 46);
} });
// 4a — Sunan Kalijaga and wayang
SHOTS.push({ start: 15.69, end: 18.36, tr: 'whip', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3a1f4a'); g.addColorStop(1, '#8a4a3a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const cam = mkcam(t, lt, { dur: 2.7, z0: 1, z1: 1.05, y0: 960 }); applyCam(ctx, cam, 1);
  kelir(ctx, 540, 860, 1.15 * backOut(sk(lt, 0, .4)), t);
  ST(ctx, KALI, 300, 1600, 560, { bob: Math.sin(t * 3) * .004, arms: { L: [.5, -.2], R: [2.2, -.9] }, face: { eyes: 'happy', mouth: 'grin' } });
  nameTag(ctx, 'SUNAN KALIJAGA', 540, 430, '#2f8f5b', lt, .25, 42); nameTag(ctx, 'WAYANG', 540, 1450, '#e07a1a', lt, 1.22, 46);
} });
// 4b — Sunan Bonang and gamelan
SHOTS.push({ start: 18.36, end: 22.36, tr: 'whip', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#3a1f4a'); g.addColorStop(1, '#8a4a3a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const cam = mkcam(t, lt, { dur: 4.0, z0: 1, z1: 1.05, y0: 960 }); applyCam(ctx, cam, 1);
  const play = sk(lt, .9, 1.3);
  gamelan(ctx, 600, 1330, 1.25, t, play);
  const hit = Math.abs(Math.sin(t * 9)) * play;
  ST(ctx, BONANG, 250, 1620, 560, { bob: Math.sin(t * 3) * .004, arms: { L: [.4, -.2], R: { ik: [.34, -.5 + hit * .1], bend: -1 } }, prop: mallet, face: { eyes: 'happy', mouth: 'grin' } });
  for (let i = 0; i < 5; i++) { const ph = (t * .6 + i * .2) % 1; note(ctx, 450 + i * 120 + Math.sin(t * 3 + i) * 30, 700 - ph * 300, .8 + (i % 2) * .3, ['#ffd23a', '#fff', '#ff9a8a'][i % 3], play * Math.sin(ph * Math.PI), Math.sin(t * 3 + i) * .3); }
  nameTag(ctx, 'SUNAN BONANG', 540, 360, '#7a4bc4', lt, .28, 42); nameTag(ctx, 'GAMELAN', 300, 560, '#e07a1a', lt, .98, 40); nameTag(ctx, 'TEMBANG', 780, 560, '#e0392f', lt, 1.62, 40);
} });
// 5 — accepted without losing culture
SHOTS.push({ start: 22.36, end: 27.2, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.84, z0: 1, z1: 1.07, y0: 950 });
  world(ctx, cam, t, { mood: 'day', hor: 850 }); applyCam(ctx, cam, 1);
  gate(ctx, 190, 1040, .62, 1, '#b8553a'); masjidProp(ctx, 850, 1180, .5, t, 0);
  crowd(ctx, ADI[0], 140, 560, 1300, 2, 330, t, { per: 3, dy: 70, seed: 3, face: { eyes: 'happy', mouth: 'grin' } });
  crowd(ctx, ADI[1], 520, 960, 1310, 2, 330, t, { per: 3, dy: 70, seed: 6, face: { eyes: 'happy', mouth: 'grin' } });
  for (let i = 0; i < 6; i++) { const ph = (lt * .6 + i * .17) % 1; heart(ctx, 160 + i * 150, 1000 - ph * 300, .7, '#e0392f', Math.sin(ph * Math.PI) * sk(lt, .8, 1.2)); }
  overlay(ctx, () => { kinetic(ctx, 'TANPA MENGHAPUS', 540, 350, 94, lt, { delay: 2.7, col: '#fff' }); kinetic(ctx, 'BUDAYA', 540, 510, 160, lt, { delay: 3.4, col: '#ffd23a', pulse: true }); });
} });
// 6 — the mosque is built
SHOTS.push({ start: 27.2, end: 30.95, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 3.75, z0: 1, z1: 1.06, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 900 }); applyCam(ctx, cam, 1);
  const k = easeOut(sk(lt, .5, 3.0));
  ctx.save(); ctx.beginPath(); ctx.rect(0, 1190 - k * 780, W, k * 780 + 20); ctx.clip(); masjidProp(ctx, 540, 1180, .95, t, 0); ctx.restore();
  const hm = Math.sin(t * 11);
  ST(ctx, KALI, 140, 1420, 400, { arms: { L: [.5, -.2], R: { ik: [.28, -.7 + Math.abs(hm) * .14], bend: -1 } }, prop: hammerProp, face: { eyes: 'happy', mouth: 'grin' } });
  ST(ctx, WALI, 920, 1430, 400, { flip: -1, arms: { L: [.5, -.2], R: { ik: [.28, -.7 + Math.abs(Math.sin(t * 11 + 1)) * .14], bend: -1 } }, prop: hammerProp, face: { eyes: 'happy', mouth: 'grin' } });
  if (Math.abs(hm) > .97) dust(ctx, 190, 1100, t, 20, 4);
  nameTag(ctx, 'MASJID AGUNG DEMAK', 540, 560, '#2f8f5b', lt, 1.27, 40);
  const rp = backOut(sk(lt, 2.7, 3.2)); if (rp > 0) { ST(ctx, Object.assign({}, RPATAH, { hat: 'crown', crownCol: '#2f8f5b' }), 540, 1700, 420 * rp, { arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'happy', mouth: 'smile' } }); nameTag(ctx, 'RADEN PATAH', 540, 1340, '#2f8f5b', lt, 2.9, 32); }
} });
// 7 — three roofs
SHOTS.push({ start: 30.95, end: 36.12, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 5.2, z0: 1, z1: 1.05, y0: 960 });
  world(ctx, cam, t, { mood: 'dusk', hor: 940 }); applyCam(ctx, cam, 1);
  masjidProp(ctx, 400, 1560, 1.5, t, .35);
  const sp = (a, y, lab, col) => { const k = sk(lt, a, a + .3); if (k <= 0) return; arrowTo(ctx, 840, y, 640 + (y - 900) * .1, y, '#fff', 8, k); nameTag(ctx, lab, 910, y, col, lt, a, 42); };
  sp(2.31, 780, 'IMAN', '#e0392f'); sp(3.14, 960, 'ISLAM', '#2f63c9'); sp(4.34, 1140, 'IHSAN', '#3fa35b');
  overlay(ctx, () => kinetic(ctx, 'ATAP BERSUSUN TIGA', 540, 330, 82, lt, { delay: .6, col: '#fff' }));
} });
// 8 — a pillar of wood scraps
SHOTS.push({ start: 36.12, end: 40.8, tr: 'whip', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 4.7, z0: 1, z1: 1.06, y0: 960 });
  world(ctx, cam, t, { mood: 'dusk', hor: 900 }); applyCam(ctx, cam, 1);
  const k = sk(lt, 2.4, 4.3);
  tiangTatal(ctx, 700, 1560, 950, k, t);
  ST(ctx, KALI, 300, 1620, 540, { bob: Math.sin(t * 3) * .004, arms: { L: [.5, -.3], R: { ik: [.3, -.55 - Math.sin(t * 6) * .05], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin' } });
  const R = rng(5); for (let i = 0; i < 8; i++) { const ph = (lt * .8 + i * .13) % 1, a = sk(lt, 1.6, 2.0) * (1 - sk(lt, 4.2, 4.5)); const sx = 330 + R() * 120, sy = 1330 - ph * 50; ctx.save(); ctx.globalAlpha = a * Math.sin(ph * Math.PI); ctx.translate(sx + ph * (700 - sx), sy - ph * 120); ctx.rotate(ph * 6); rrect(ctx, -22, -9, 44, 18, 4); fillStroke(ctx, '#c98d56', 3.5); ctx.restore(); }
  nameTag(ctx, 'SUNAN KALIJAGA', 540, 440, '#2f8f5b', lt, 1.8, 42);
  overlay(ctx, () => kinetic(ctx, 'SERPIHAN KAYU', 540, 290, 100, lt, { delay: 2.5, col: '#ffd23a', pulse: true }));
} });
// 9a — consultation in the mosque
SHOTS.push({ start: 40.8, end: 44.26, tr: 'cut', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#5a3a1c'); g.addColorStop(1, '#a9753a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const cam = mkcam(t, lt, { dur: 3.5, z0: 1, z1: 1.05, y0: 960 }); applyCam(ctx, cam, 1);
  for (const px of [120, 420, 660, 960]) { rrect(ctx, px - 38, 300, 76, 1300, 8); fillStroke(ctx, '#8a5530', 7); }
  ctx.fillStyle = 'rgba(255,225,150,.5)'; ctx.beginPath(); ctx.moveTo(500, 0); ctx.lineTo(580, 0); ctx.lineTo(760, 1500); ctx.lineTo(330, 1500); ctx.closePath(); ctx.fill();
  const talk = sk(lt, 1.4, 1.7);
  const ps = [[160, 1250, 1], [420, 1180, 1], [660, 1180, -1], [920, 1250, -1]];
  ps.forEach(([x, y, f], i) => ST(ctx, i % 2 ? KALI : (i === 0 ? BONANG : WALI), x, y + 80, 380, { flip: f, bob: Math.sin(t * 3 + i) * .006, arms: { L: [.4, -.2], R: i === Math.floor(lt * 1.6) % 4 ? [2.1, -.6] : [.4, -.2] }, face: { eyes: 'normal', mouth: i === Math.floor(lt * 1.6) % 4 ? 'o' : 'smile', look: [f * .6, 0] } }));
  ST(ctx, Object.assign({}, RPATAH, { hat: 'crown', crownCol: '#2f8f5b' }), 540, 1790, 440, { bob: Math.sin(t * 3) * .004, arms: { L: [.4, -.1], R: [.4, -.1] }, face: { eyes: 'happy', mouth: 'smile' } });
  bubble(ctx, 290, 780, 260, 120, '...', 190, 1020, 52, sk(lt, 1.2, 1.5)); bubble(ctx, 790, 780, 260, 120, '...', 880, 1020, 52, sk(lt, 1.9, 2.2));
  nameTag(ctx, 'BERMUSYAWARAH', 540, 430, '#7a4bc4', lt, 2.19, 44);
} });
// 9b — Demak becomes the centre, Islam spreads over Java
SHOTS.push({ start: 44.26, end: 47.35, tr: 'whip', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0f4a3a'); g.addColorStop(1, '#2a8a6a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 1050); ctx.rotate(t * .1); for (let i = 0; i < 14; i++) { ctx.rotate(TAU / 14); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-80, -1600); ctx.lineTo(80, -1600); ctx.closePath(); ctx.fillStyle = 'rgba(255,230,140,.10)'; ctx.fill(); } ctx.restore();
  const pop = backOut(sk(lt, 0, .4)), S = 470;
  const mk = [[-.12, -.16, 'DEMAK', '#2f8f5b', sk(lt, .4, .7)], [-.55, -.1, '', '#ffd23a', sk(lt, 1.4, 1.65)], [-.85, 0, '', '#ffd23a', sk(lt, 1.7, 1.95)], [.3, -.28, '', '#ffd23a', sk(lt, 1.55, 1.8)], [.6, -.16, '', '#ffd23a', sk(lt, 1.85, 2.1)], [.9, -.04, '', '#ffd23a', sk(lt, 2.1, 2.35)], [.05, .1, '', '#ffd23a', sk(lt, 1.95, 2.2)]];
  javaMap(ctx, 540, 1050, S * pop, { glow: .5 + .3 * Math.sin(t * 5), marks: mk });
  const rr = sk(lt, 1.2, 3.0); ctx.save(); ctx.translate(540 - .12 * S, 1050 - .16 * S); for (let i = 0; i < 3; i++) { const p = (rr * 1.4 - i * .25); if (p > 0 && p < 1) { ctx.globalAlpha = 1 - p; circle(ctx, 0, 0, 40 + p * 520); fillStroke(ctx, null, 8, '#ffd23a'); } } ctx.restore();
  overlay(ctx, () => { kinetic(ctx, 'PUSAT PENYEBARAN', 540, 330, 88, lt, { delay: .9, col: '#fff' }); kinetic(ctx, 'ISLAM DI JAWA', 540, 460, 100, lt, { delay: 1.6, col: '#ffd23a', pulse: true }); });
} });
// 10 — to the sea, toward the Strait of Malacca
SHOTS.push({ start: 47.35, end: 52.48, tr: 'cut', draw(ctx, lt, t) {
  const cam = mkcam(t, lt, { dur: 5.1, z0: 1, z1: 1.08, y0: 950 });
  world(ctx, cam, t, { mood: 'dusk', hor: 860, sea: true, seaPal: ['#a07ab0', '#4a5ea0', '#2a3470'] }); applyCam(ctx, cam, 1);
  const fa = sk(lt, 2.6, 3.2); if (fa > 0) { ctx.save(); ctx.globalAlpha = fa; drawShip(ctx, 210, 990, .5 + fa * .1, t, { flag: '#1b1820', hull: '#3b2a2c', stripe: '#c9a14a', sail: '#e9dfc9', ph: 0 }); ctx.restore(); }
  drawShip(ctx, lerp(900, 640, easeOut(sk(lt, 0, 5))), 1290, .85, t, { flag: '#2f8f5b', hull: '#7a4a2a', ph: 1, flip: -1 });
  exclaim(ctx, 260, 700, 90, sk(lt, 3.4, 3.7));
  nameTag(ctx, 'SELAT MALAKA', 300, 1500, '#e0392f', lt, 4.06, 42);
} });
// 11 — end card
SHOTS.push({ start: 52.48, end: 60, tr: 'cut', draw(ctx, lt, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0f4a3a'); g.addColorStop(1, '#2a8a6a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 1010); ctx.rotate(t * .1); for (let i = 0; i < 16; i++) { ctx.rotate(TAU / 16); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-80, -1600); ctx.lineTo(80, -1600); ctx.closePath(); ctx.fillStyle = 'rgba(255,230,140,.10)'; ctx.fill(); } ctx.restore();
  const pop = backOut(sk(lt, .3, .9)); masjidProp(ctx, 540, 1330, .95 * pop, t, .6);
  waliLine(ctx, 130, 950, 1560, 190, t, sk(lt, .5, 1.8));
  sparkle(ctx, 300, 800, 40, .5 + .5 * Math.sin(t * 5)); sparkle(ctx, 800, 760, 50, .5 + .5 * Math.sin(t * 5 + 2));
  overlay(ctx, () => { kinetic(ctx, 'WALI SONGO', 540, 330, 140, lt, { delay: .4, col: '#ffd23a', pulse: true }); kinetic(ctx, 'MASJID AGUNG DEMAK', 540, 470, 62, lt, { delay: 1.1, col: '#fff', stagger: .03 });
    const k = backOut(sk(lt, 2.4, 2.9)); ctx.save(); ctx.translate(540, 1740); ctx.scale(k, k); ctx.font = '700 36px Poppins'; const w = ctx.measureText('Bersambung ke Part 3').width + 60; rrect(ctx, -w / 2, -34, w, 68, 34); fillStroke(ctx, '#e0392f', 7); text(ctx, 'Bersambung ke Part 3', 0, 2, 36, '#fff', INK, 0, 'Poppins', 700); ctx.restore(); });
} });
