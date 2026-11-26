// ---------- Sejarah Cabai, Part 1: Cabai Ternyata Bukan Asli Indonesia ----------
const SHOTS = [];
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 4) => shake(t * .35, a, 1, 2);
const BUDI = { cols: ['#2f8f5b', '#f6f1e8'], hat: 'peci', belt: false };
const SITI = { cols: ['#e07a2f', '#f6f1e8'], hat: 'bandana', hatCol: '#7a4bc4', dotCol: '#fff', belt: false };
const PAK = { cols: ['#2f63c9', '#f6f1e8'], hat: 'peci', belt: false, vest: '#f2b52a' };
const ANCIENT = { cols: ['#b9712f', '#b9712f'], hat: 'feather', belt: false };
const ANCIENT2 = { cols: ['#3a8f6a', '#3a8f6a'], hat: 'feather', belt: false };
const EXPLORER = { cols: PAL.navy, hat: 'captain' };
const spoonProp = (c, k, h, a, side) => { if (k === 'R') { c.save(); c.translate(h[0], h[1]); c.rotate(-side * a); drawSpoon(c, .22, .022); c.restore(); } };
const podProp = (c, k, h, a, side) => { if (k === 'R') { c.save(); c.translate(h[0], h[1]); c.rotate(-side * a); drawChiliPod(c, 0, .02, .0016, 1.2, CHILI_RED); c.restore(); } };

// eating cycle: right hand goes bowl -> mouth -> bowl
function eatPose(lt, period, bowlRel, mouthRel = [.03, -.66], off = 0) {
  const p = ((lt + off) % period) / period;
  const tgt = kf(p, [[0, bowlRel], [.3, bowlRel], [.55, mouthRel], [.8, mouthRel], [1, bowlRel]]);
  const chew = p > .55 && p < .88 ? 1 : 0;
  return { arms: { L: [.45, -.3], R: { ik: tgt, bend: -1 } }, chew };
}
const chewFace = (chew, lt, extra = {}) => Object.assign({ eyes: chew ? 'happy' : 'normal', mouth: chew ? (Math.sin(lt * 20) > 0 ? 'grin' : 'smile') : 'smile', look: [-.3, .5] }, extra);

// ---- A1: Budi eats bakso with sambal (S1) ----
SHOTS.push({ start: 0, end: 2.95, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .03, r: Math.sin(t * .5) * .004 };
  warungBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  const e = eatPose(lt, 1.3, [.22, -.27]);
  drawStick(ctx, C(BUDI, { x: 460, y: 1560, s: 780, arms: e.arms, face: chewFace(e.chew, lt), prop: spoonProp, bob: Math.sin(t * 6) * .003 * e.chew, headTilt: e.chew * Math.sin(lt * 14) * .03, shadow: false, legs: { L: [.1, -.04], R: [.1, -.04] } }));
  drawTable(ctx, -200, 1300, 1330, 1800);
  drawBowl(ctx, 650, 1335, 1.1, t, { sambal: 1 });
  // sambal bottle
  rrect(ctx, 930, 1190, 70, 140, 14); fillStroke(ctx, CHILI_RED, 5); rrect(ctx, 945, 1160, 40, 40, 6); fillStroke(ctx, '#f2f2f2', 4);
} });
// ---- A2: dreams of ayam geprek (S2) ----
SHOTS.push({ start: 2.95, end: 5.43, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: 1.03 + lt * .03, r: -Math.sin(t * .5) * .004 };
  warungBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  const bub = backOut(clamp((lt - .5) / .35));
  drawStick(ctx, C(BUDI, { x: 400, y: 1560, s: 780, arms: { L: [.45, -.3], R: [.6, -.5] }, face: { eyes: 'wide', mouth: lt > 1.0 ? 'o' : 'smile', look: [.7, -.7], browUp: 1 }, shadow: false, headTilt: .05 }));
  drawTable(ctx, -200, 1300, 1330, 1800);
  drawBowl(ctx, 650, 1335, 1.1, t, { sambal: 1 });
  if (bub > 0) {
    ctx.save(); ctx.translate(780, 620); ctx.scale(bub, bub); ctx.translate(-780, -620);
    thoughtBubble(ctx, 780, 620, 520, 400, 560, 900);
    const gp = backOut(clamp((lt - .76) / .3)); ctx.save(); ctx.translate(780, 650); ctx.scale(.95 * gp, .95 * gp); drawGeprek(ctx, 0, 0, 1, t); ctx.restore();
    ctx.restore();
  }
  const cp = backOut(clamp((lt - 1.6) / .3));
  if (cp > 0) { drawChiliPod(ctx, 930, 360, .95 * cp, -.5 + Math.sin(t * 5) * .1, CHILI_RED); sparkle(ctx, 880, 300, 50 * cp, cp); }
} });

// ---- B1: everybody eats with chili (S3 first half) ----
SHOTS.push({ start: 5.43, end: 8.9, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0] - lt * 8, y: 1020 + hh[1], z: 1.0 + lt * .02, r: 0 };
  warungBG(ctx, t, cam, { top: '#f6e0a6', bot: '#e8964a' });
  applyCam(ctx, cam, 1);
  const e1 = eatPose(lt, 1.2, [.2, -.26], undefined, 0), e2 = eatPose(lt, 1.0, [.2, -.26], undefined, .3), e3 = eatPose(lt, 1.4, [.2, -.26], undefined, .6);
  drawStick(ctx, C(SITI, { x: 190, y: 1560, s: 660, arms: e2.arms, face: chewFace(e2.chew, lt), prop: podProp, shadow: false }));
  drawStick(ctx, C(BUDI, { x: 560, y: 1560, s: 700, arms: e1.arms, face: chewFace(e1.chew, lt), prop: spoonProp, shadow: false }));
  drawStick(ctx, C(PAK, { x: 920, y: 1560, s: 660, arms: e3.arms, face: chewFace(e3.chew, lt + 1), prop: spoonProp, shadow: false }));
  drawTable(ctx, -300, 1400, 1340, 1800);
  drawGeprek(ctx, 330, 1340, .7, t); drawBowl(ctx, 700, 1345, .95, t); drawBowl(ctx, 1040, 1345, .85, t);
  // chilies popping
  for (let i = 0; i < 6; i++) { const ph = (lt * .8 + i * .17) % 1; const px = 120 + i * 170 + Math.sin(i * 2.1) * 40, py = lerp(700, 380, ph); drawChiliPod(ctx, px, py, .55, -.6 + i * .5 + ph * 2, CHILI_RED); }
} });
// ---- B2: kitchen, grinding sambal (S3 second half) ----
SHOTS.push({ start: 8.9, end: 12.55, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0] + lt * 10, y: 1020 + hh[1], z: 1.02 + lt * .025, r: 0 };
  warungBG(ctx, t, cam, { top: '#fbdca0', bot: '#e98f45' });
  applyCam(ctx, cam, 1);
  for (const [cx, len] of [[90, 520], [230, 420], [850, 480], [990, 560]]) drawChiliString(ctx, cx, 180, len, t, 1);
  const g = Math.sin(lt * 7);
  drawStick(ctx, C(SITI, { x: 520, y: 1580, s: 780, arms: { L: [.5, -.4], R: { ik: [.2 + g * .05, -.34 + Math.abs(g) * .04], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin', look: [0, .6] }, shadow: false, headTilt: g * .02 }));
  drawTable(ctx, -200, 1300, 1340, 1800);
  drawCobek(ctx, 560, 1330, .95, t);
  sack(ctx, 1010, 1340, .9, '#d8b883'); for (let i = 0; i < 3; i++) drawChiliPod(ctx, 960 + i * 38, 1215 - i * 4, .5, -.2 + i * .4, CHILI_RED);
  drawChiliPod(ctx, 120, 1300, .8, .3, CHILI_RED); drawChiliPod(ctx, 220, 1310, .75, -.6, CHILI_RED);
} });

// ---- C: "tahukah kamu?" (S4) ----
SHOTS.push({ start: 12.55, end: 14.59, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 4);
  const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0, r: 0 };
  ctx.save(); ctx.filter = 'blur(7px)'; warungBG(ctx, t, cam); ctx.restore();
  applyCam(ctx, cam, 1);
  const z = kf(lt, [[0, 1], [.4, 1.18, easeOut], [2.04, 1.28]]);
  const bz = kf(lt, [[0, 0], [.35, 1, backOut]]);
  drawStick(ctx, C(BUDI, { x: 540, y: 2060 + (1 - bz) * 120, s: 1500, bob: Math.sin(t * 3) * .004, arms: { L: [.3, -.1], R: { ik: [.05, -.7], bend: -1 } },
    face: { eyes: 'normal', look: [0, 0], mouth: lt > .6 ? 'smirk' : 'flat', browOne: 1, browUp: 1 }, headTilt: Math.sin(t * 2) * .04 + .04, shadow: false }));
  const q1 = backOut(clamp((lt - .5) / .3)), q2 = backOut(clamp((lt - .85) / .3)), q3 = backOut(clamp((lt - 1.2) / .3));
  questionMark(ctx, 880, 380, 1.1 * q1, q1, t); questionMark(ctx, 160, 520, .8 * q2, q2, t + 1); questionMark(ctx, 700, 190, .7 * q3, q3, t + 2);
} });
// ---- D: "Ternyata cabai bukan tanaman asli Indonesia!" (S5) ----
SHOTS.push({ start: 14.59, end: 17.46, tr: 'whip', draw(ctx, lt, t) {
  // red rays
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const bg = ctx.createRadialGradient(540, 900, 50, 540, 900, 1400); bg.addColorStop(0, '#ff7a3d'); bg.addColorStop(1, '#c4231a'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 900); ctx.rotate(t * .12); ctx.fillStyle = 'rgba(255,230,120,.16)'; for (let i = 0; i < 14; i++) { ctx.rotate(TAU / 14); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-90, -1500); ctx.lineTo(90, -1500); ctx.closePath(); ctx.fill(); } ctx.restore();
  const sh = lt < .5 ? shake(t * 8, (1 - lt * 2) * 14, 3) : [0, 0];
  ctx.translate(sh[0], sh[1]);
  // title
  const lines = [['CABAI', .1], ['BUKAN ASLI', .35], ['INDONESIA?', .65]];
  lines.forEach(([s, d], i) => { const p = elastic(clamp((lt - d) / .5)); ctx.save(); ctx.translate(540, 360 + i * 175); ctx.scale(p, p); text(ctx, s, 0, 0, 150, i === 2 ? '#ffe14d' : '#fff', INK, 28); ctx.restore(); });
  // Budi shocked, spoon falls
  const jump = kf(lt, [[.25, 0], [.4, -90, easeOut], [.75, 0, easeIn]]);
  drawStick(ctx, C(BUDI, { x: 540, y: 1840 + jump, s: 1000, arms: { L: [2.6, .5], R: [2.5, .4] }, legs: { L: [.2, -.1], R: [.2, -.1] }, face: { eyes: 'wide', mouth: 'o', look: [0, 0], browUp: 1, pupil: .3 }, shadow: false, headTilt: Math.sin(t * 20) * .03 * (lt < 1 ? 1 : .3) }));
  // spoon falling
  const sp0 = .3; if (lt > sp0) { const d = lt - sp0; ctx.save(); ctx.translate(250 - d * 20, 1000 + d * d * 2400); ctx.rotate(d * 7); ctx.scale(520, 520); drawSpoon(ctx, .22, .022); ctx.restore(); }
  const sw = clamp((lt - 1.0) * 3); if (sw > 0) { sweat(ctx, 760, 1080, 40, sw); sweat(ctx, 330, 1100, 32, sw); }
} });

// ---- E: world map (S6) ----
SHOTS.push({ start: 17.46, end: 24.2, tr: 'whip', draw(ctx, lt, t) {
  const gt = t;
  const [ix, iy] = mapPt(850, 300), [ax, ay] = mapPt(185, 190), [cx0, cy0] = mapPt(500, 250);
  const cam = {
    x: kf(gt, [[17.46, cx0], [19.6, cx0 * .6 + ix * .4], [21.2, ix], [22.2, ix], [23.35, ax, ease], [24.2, ax - 20]]),
    y: kf(gt, [[17.46, cy0], [19.6, cy0 * .5 + iy * .5], [21.2, iy], [22.2, iy], [23.35, ay, ease], [24.2, ay]]),
    z: kf(gt, [[17.46, .6], [19.6, .9], [21.2, 1.6], [22.2, 1.6], [22.8, .85, ease], [23.5, 1.5, easeOut], [24.2, 1.6]]), r: Math.sin(t * .6) * .004,
  };
  applyCam(ctx, cam, 1);
  const hiI = clamp((gt - 21.45) * 4) * (gt < 22.5 ? 1 : clamp(1 - (gt - 22.5) * 2));
  const hiA = clamp((gt - 23.0) * 2.5);
  worldMap(ctx, t, { hiIndo: hiI, hiAmerica: hiA });
  // Indonesia: dapur Indonesia
  const ip = backOut(clamp((gt - 21.52) / .3)) * (gt < 22.6 ? 1 : clamp(1 - (gt - 22.6) * 3));
  mapPin(ctx, 835, 305, 'INDONESIA', '#e0392f', ip, t, 1);
  if (ip > 0) drawChiliPod(ctx, ...mapPt(835, 305).map((v, i) => i ? v - 240 : v + 70), .8 * ip, -.4, CHILI_RED);
  // Amerika
  const ap = backOut(clamp((gt - 23.34) / .3));
  mapPin(ctx, 185, 200, 'AMERIKA', '#e07a1a', ap, t, 1);
  if (ap > 0) { const [px, py] = mapPt(185, 200); drawChiliPod(ctx, px + 70, py - 250, .9 * ap, -.5, CHILI_RED); sparkle(ctx, px - 20, py - 280, 40 * ap, ap); }
} });

// ---- F1: ancient America, chili starts to grow (S7 first half) ----
function ancientBG(ctx, t, cam) {
  applyCam(ctx, cam, .08); drawSky(ctx, '#ffb96a', '#fff0c6', -300, 1000);
  applyCam(ctx, cam, .1); drawSun(ctx, 860, 330, 90, t, 1.1);
  applyCam(ctx, cam, .15); drawCloud(ctx, 190 + t * 5, 420, 110, 5); drawCloud(ctx, 960, 250, 80, 6);
  applyCam(ctx, cam, .3); drawPillars(ctx, 960, 'B', .15);
  applyCam(ctx, cam, .55); drawPalm(ctx, 90, 1090, .9, t); drawPalm(ctx, 1010, 1100, 1.0, t + 1); stepPyramid(ctx, 600, 1110, 640, 5, 74);
  applyCam(ctx, cam, 1); drawField(ctx, 1110, 2400);
}
SHOTS.push({ start: 24.2, end: 28.2, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0] + lt * 6, y: 1000 + hh[1], z: 1.0 + lt * .03, r: 0 };
  ancientBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  const grow = kf(lt, [[2.2, 0], [3.9, 1]]);
  for (const [px, py, sc, d] of [[200, 1360, .85, 0], [520, 1400, .9, .15], [830, 1360, .85, .3], [1000, 1480, .9, .45]]) {
    drawChiliPlant(ctx, px, py, sc, clamp(grow * 1.3 - d * .3));
  }
  const bend = kf(lt, [[1.7, 0], [2.0, 1, easeOut], [3.0, 1], [3.3, 0]]);
  drawStick(ctx, C(ANCIENT, { x: 360, y: 1800, s: 760, arms: { L: [.5, -.2], R: { ik: [.1, lerp(-.6, -.22, bend)], bend: -1 } }, face: { eyes: 'normal', mouth: 'smile', look: [0, .6] }, lean: bend * .1, shadow: true }));
  if (lt > 2.0 && lt < 3.3) { for (let i = 0; i < 4; i++) { const dd = (lt - 2.0 + i * .12) % .5; puff(ctx, 400 + Math.sin(i) * 30, 1790 - dd * 60, 22, t, '#e9c58e', i + 3, 1 - dd * 2); } }
} });
// ---- F2: people cultivate across the Americas (S7 second half) ----
SHOTS.push({ start: 28.2, end: 32.94, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0] - lt * 5, y: 1010 + hh[1], z: 1.08 + lt * .02, r: 0 };
  ancientBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  for (const [px, py, sc] of [[130, 1480, 1.05], [450, 1520, 1.15], [800, 1470, 1.05], [1060, 1520, 1.1]]) drawChiliPlant(ctx, px, py, sc, 1, t);
  const pick = Math.sin(lt * 4);
  drawStick(ctx, C(ANCIENT, { x: 250, y: 1760, s: 740, arms: { L: [.5, -.3], R: { ik: [.25 + pick * .05, -.62 + Math.abs(pick) * .06], bend: -1 } }, face: { eyes: 'happy', mouth: 'grin' }, shadow: true, headTilt: pick * .02 }));
  const wv = Math.sin(lt * 3);
  drawStick(ctx, C(ANCIENT2, { x: 820, y: 1770, s: 740, arms: { L: [.4, -.2], R: [1.4 + wv * .2, -.8] }, face: { eyes: 'normal', mouth: 'smile', look: [-.5, .3] }, shadow: true, flip: -1,
    prop: (c, k, h, a, side) => { if (k === 'R') { c.save(); c.translate(h[0], h[1]); circle(c, 0, .02, .07); fillStroke(c, '#c98d56', .016); ellipse(c, 0, .005, .03, .012); c.fillStyle = '#6a4a2c'; c.fill(); c.restore(); } } }));
  // basket with chilies
  ellipse(ctx, 540, 1740, 100, 28); fillStroke(ctx, '#b5651d', 6); ctx.beginPath(); ctx.moveTo(440, 1740); ctx.quadraticCurveTo(445, 1860, 540, 1870); ctx.quadraticCurveTo(635, 1860, 640, 1740); fillStroke(ctx, '#c98d56', 6);
  for (let i = 0; i < 5; i++) drawChiliPod(ctx, 490 + i * 26, 1722 - (i % 2) * 10, .55, -.5 + i * .3, CHILI_RED);
  // region tags
  const tg = [['AMERIKA TENGAH', 29.36, '#e07a1a'], ['AMERIKA SELATAN', 30.5, '#3fa35b'], ['MEKSIKO', 32.06, '#2f63c9']];
  tg.forEach(([s, at, col], i) => { const a = clamp((t - at) / .3); tagPill(ctx, 540, 330 + i * 120, s, col, a, 44); });
} });

// ---- G: across the ocean (S8) ----
SHOTS.push({ start: 32.94, end: 37.57, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 900 + hh[1], z: 1.0 + lt * .02, r: Math.sin(t * .8) * .006 };
  applyCam(ctx, cam, .08); drawSky(ctx, '#4aaeea', '#fbe9c4', -300, 950);
  applyCam(ctx, cam, .1); drawSun(ctx, 240, 300, 80, t, 1.1);
  applyCam(ctx, cam, .15); drawCloud(ctx, 700, 330, 120, 7); drawCloud(ctx, 150, 560, 80, 8);
  applyCam(ctx, cam, .55); drawSea(ctx, 930, t);
  applyCam(ctx, cam, 1);
  const sx = lerp(760, 360, lt / 4.63);
  drawShip(ctx, sx, 1330, .95, t, { flag: '#e0392f', hull: '#7a4a2a', ph: 1 });
  for (let i = 0; i < 3; i++) { const ph = (t * .5 + i * .3) % 1; drawChiliPod(ctx, 150 + i * 330 + Math.sin(t * 2 + i) * 20, 1560 + Math.sin(t * 2.5 + i) * 14, .75, Math.sin(t + i) * .3 + .2, CHILI_RED); }
  const q = backOut(clamp((lt - 1.6) / .35)); questionMark(ctx, 780, 520, 1.3 * q, q, t);
  const q2 = backOut(clamp((lt - 2.8) / .35)); questionMark(ctx, 260, 700, .9 * q2, q2, t + 1.5);
} });
// ---- H: who first? (S9) ----
SHOTS.push({ start: 37.57, end: 39.68, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .04, r: 0 };
  applyCam(ctx, cam, .1); drawSky(ctx, '#0b1230', '#3b2b66', -300, 1100);
  applyCam(ctx, cam, .12); circle(ctx, 800, 360, 120); ctx.fillStyle = '#fff2c2'; ctx.fill();
  const rg = ctx.createRadialGradient(800, 360, 120, 800, 360, 520); rg.addColorStop(0, 'rgba(255,240,180,.35)'); rg.addColorStop(1, 'rgba(255,240,180,0)'); ctx.fillStyle = rg; ctx.fillRect(200, -200, 1200, 1200);
  applyCam(ctx, cam, .55); drawSea(ctx, 1000, t, 2600, ['#27386e', '#172552', '#0c1432']);
  applyCam(ctx, cam, 1);
  drawShip(ctx, 700, 1330, .85, t, { flag: '#0c1030', hull: '#0e1330', stripe: '#202b5c', sail: '#27325e', ph: 2 });
  drawStick(ctx, C(EXPLORER, { x: 330, y: 1800, s: 900, sil: '#090d24', eyesGlow: true, arms: { L: [.5, -.2], R: [2.4, .5] }, face: { eyes: 'wide', mouth: 'flat' }, shadow: false,
    prop: (c, k, h, a, side) => { if (k === 'R') { c.save(); c.translate(h[0], h[1]); c.scale(side, 1); drawChiliPod(c, 0, -.03, .0018, -.9, '#1a2354'); c.restore(); } } }));
  const q = backOut(clamp((lt - .1) / .35)); questionMark(ctx, 540, 400, 1.7 * q, q, t, '#ffe14d');
} });

// ---- I: teaser of what comes next (S10) ----
function card(ctx, y, a, label, drawIcon, col) {
  if (a <= 0) return; ctx.save(); ctx.translate(540, y); const sc = .6 + .4 * backOut(clamp(a)); ctx.globalAlpha = clamp(a * 2); ctx.scale(sc, sc);
  rrect(ctx, -420, -100, 840, 200, 40); fillStroke(ctx, '#fff8e6', 7);
  ctx.save(); rrect(ctx, -420, -100, 840, 200, 40); ctx.clip(); ctx.fillStyle = col; ctx.fillRect(-420, -100, 230, 200); ctx.restore();
  rrect(ctx, -420, -100, 840, 200, 40); fillStroke(ctx, null, 7);
  ctx.save(); ctx.translate(-305, 0); drawIcon(ctx); ctx.restore();
  text(ctx, label, 100, 0, 40, INK, '#fff8e6', 0, 'Poppins', 700);
  ctx.restore();
}
SHOTS.push({ start: 39.68, end: 48.0, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#f6dfa7'); g.addColorStop(1, '#e2a95a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540 + hh[0], 1000 + hh[1]); ctx.strokeStyle = 'rgba(120,70,20,.16)'; ctx.lineWidth = 8;
  circle(ctx, 0, 0, 520); ctx.stroke(); circle(ctx, 0, 0, 380); ctx.stroke(); ctx.rotate(t * .05);
  for (let i = 0; i < 8; i++) { ctx.rotate(TAU / 8); ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(26, 0); ctx.lineTo(0, 150); ctx.lineTo(-26, 0); ctx.closePath(); ctx.stroke(); } ctx.restore();
  const T1 = 41.11, T2 = 42.66, T3 = 43.9, T4 = 45.88;
  card(ctx, 330, (t - T1) / .35, 'PENJELAJAH SAMUDRA', c => { drawStick(c, C(EXPLORER, { x: 0, y: 88, s: 150, shadow: false, arms: { L: [.4, -.2], R: [2.3, -.3] }, face: { eyes: 'normal', mouth: 'smile', look: [.8, 0] } })); }, '#2f63c9');
  card(ctx, 580, (t - T2) / .35, 'KAPAL DAGANG', c => { c.save(); c.translate(0, 70); drawShip(c, 0, 0, .2, t, { flag: '#e0392f', hull: '#7a4a2a' }); c.restore(); }, '#2f8fc9');
  card(ctx, 830, (t - T3) / .35, 'KERAJAAN', c => { crown(c, 0, 40, 1.1); }, '#7a4bc4');
  card(ctx, 1080, (t - T4) / .35, 'REMPAH-REMPAH', c => { sack(c, -20, 70, .5); drawChiliPod(c, 20, 28, .75, -.5, CHILI_RED); drawChiliPod(c, 46, 40, .6, .3, CHILI_RED); }, '#e07a1a');
  const bs = backOut(clamp((t - 46.3) / .4)); if (bs > 0) { ctx.save(); ctx.translate(540, 1560); ctx.scale(bs, bs); ctx.font = '700 52px Poppins'; const w = 760; rrect(ctx, -w / 2, -60, w, 120, 60); fillStroke(ctx, '#e0392f', 7); text(ctx, 'BERSAMBUNG KE PART 2', 0, 0, 50, '#fff'); ctx.restore(); }
} });
