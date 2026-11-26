// ---------- compositor: shots, dissolves, grade, bloom, grain, Indonesian subtitles ----------
const canvas = document.getElementById('c'); canvas.width = W; canvas.height = H;
const out = canvas.getContext('2d');
const mkbuf = () => { const b = document.createElement('canvas'); b.width = W; b.height = H; return b; };
const bufA = mkbuf(), bufB = mkbuf(), actx = bufA.getContext('2d'), bctx = bufB.getContext('2d');
const bloomC = document.createElement('canvas'); bloomC.width = 480; bloomC.height = 270; const blctx = bloomC.getContext('2d');
const WARP = window.WARP || null;
function warpMap(x, from, to) { const A = WARP.anchors; if (x <= A[0][from]) return x - A[0][from] + A[0][to]; for (let i = 0; i < A.length - 1; i++) if (x <= A[i + 1][from]) { const k = (x - A[i][from]) / (A[i + 1][from] - A[i][from]); return A[i][to] + k * (A[i + 1][to] - A[i][to]); } const L = A[A.length - 1]; return x - L[from] + L[to]; }
const toOld = t => WARP ? warpMap(t, 1, 0) : t, toNew = t => WARP ? warpMap(t, 0, 1) : t;
const OUTRO = 4.0; // end card after the voice
const DUR = (WARP ? WARP.new_end + 0.6 : SHOTS[SHOTS.length - 1].end) + OUTRO;
window.SHOT_SPANS = SHOTS.map((s, i) => [toNew(s.start), i === SHOTS.length - 1 ? DUR : toNew(s.end)]);
const TOTAL_FRAMES = Math.round(DUR * FPS);

const grains = [];
for (let k = 0; k < 4; k++) { const g = document.createElement('canvas'); g.width = g.height = 256; const gc = g.getContext('2d'); const id = gc.createImageData(256, 256); const R = rng(k + 11); for (let i = 0; i < id.data.length; i += 4) { const v = 128 + (R() - .5) * 120; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; } gc.putImageData(id, 0, 0); grains.push(g); }

// subtitles: phrase chunks (<= 7 words), timed by the real word times of the narration
const CHUNKS = (() => {
  const ch = []; let cur = null;
  WORDS.forEach((w, i) => {
    const prev = WORDS[i - 1];
    const brk = !cur || cur.n >= 7 || (cur.n >= 3 && /[,.?!:;]$/.test(prev ? prev.w : '')) || (cur.text + ' ' + w.w).length > 52 || (prev && prev.line !== w.line && cur.n >= 2) || (w.s - (prev ? prev.e : 0)) > .9;
    if (brk) { cur = { n: 1, text: w.w, s: w.s, e: w.e }; ch.push(cur); } else { cur.n++; cur.text += ' ' + w.w; cur.e = w.e; }
  });
  ch.forEach((c, i) => { const n = ch[i + 1]; c.e = n && n.s - c.e < .6 ? n.s : c.e + .35; c.text = c.text.replace(/[.,]+$/, ''); });
  return ch;
})();
function drawSubtitle(ctx, t) {
  const c = CHUNKS.find(c => t >= c.s && t < c.e); if (!c) return;
  const a = Math.min(clamp((t - c.s) / .18), clamp((c.e - t) / .15));
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const g = ctx.createLinearGradient(0, H - 260, 0, H); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${.5 * a})`); ctx.fillStyle = g; ctx.fillRect(0, H - 260, W, 260);
  ctx.globalAlpha = a; ctx.font = '600 50px Poppins'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.letterSpacing = '0.5px';
  let lines = [c.text]; if (ctx.measureText(c.text).width > 1560) { const w = c.text.split(' '); const m = Math.ceil(w.length / 2); lines = [w.slice(0, m).join(' '), w.slice(m).join(' ')]; }
  lines.forEach((L, i) => { const y = H - 92 + (i - (lines.length - 1)) * 62 + (1 - easeOut(clamp((t - c.s) / .2))) * 8; ctx.shadowColor = 'rgba(0,0,0,.85)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 3; ctx.lineWidth = 9; ctx.strokeStyle = 'rgba(0,0,0,.75)'; ctx.lineJoin = 'round'; ctx.strokeText(L, W / 2, y); ctx.shadowColor = 'transparent'; ctx.fillStyle = '#fff'; ctx.fillText(L, W / 2, y); });
  ctx.restore();
}
function gradeShot(ctx, tod) {
  const P = TOD[tod || 'day']; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'soft-light'; let g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, P.tint); g.addColorStop(1, P.shade); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = 'multiply'; const v = ctx.createRadialGradient(W / 2, H * .5, H * .45, W / 2, H * .5, H * 1.15); v.addColorStop(0, 'rgba(255,255,255,1)'); v.addColorStop(1, `rgba(${tod === 'night' ? '120,130,170' : '90,70,90'},${1 - P.vig * .65})`); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  ctx.restore();
}
function renderShot(ctx, i, t) {
  const s = SHOTS[i];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none'; ctx.shadowColor = 'transparent'; ctx.letterSpacing = '0px';
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  ctx.save(); s.draw(ctx, t - s.start, t); ctx.restore();
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none';
  gradeShot(ctx, s.tod);
  if (s.over) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); s.over(ctx, t - s.start, t); ctx.restore(); } // titles/numbers: drawn after grading so they stay bright
}
function renderFrame(f) {
  const tNew = f / FPS; const t = Math.min(toOld(tNew), SHOTS[SHOTS.length - 1].end - 1e-3);
  let i = SHOTS.findIndex(s => t >= s.start && t < s.end); if (i < 0) i = SHOTS.length - 1;
  const s = SHOTS[i], X = s.x || .7, last = i === SHOTS.length - 1;
  out.setTransform(1, 0, 0, 1, 0, 0); out.globalAlpha = 1; out.globalCompositeOperation = 'source-over'; out.fillStyle = '#000'; out.fillRect(0, 0, W, H);
  renderShot(actx, i, t); out.drawImage(bufA, 0, 0);
  if (!last && s.tr !== 'cut' && t > s.end - X) {
    const p = ease(clamp((t - (s.end - X)) / X));
    if (s.tr === 'dip') { out.globalAlpha = p; out.fillStyle = '#000'; out.fillRect(0, 0, W, H); out.globalAlpha = 1; }
    else { renderShot(bctx, i + 1, t); out.globalAlpha = p; out.drawImage(bufB, 0, 0); out.globalAlpha = 1; }
  }
  const prev = SHOTS[i - 1]; if (prev && prev.tr === 'dip' && t < s.start + (prev.x || .7)) { out.globalAlpha = 1 - ease(clamp((t - s.start) / (prev.x || .7))); out.fillStyle = '#000'; out.fillRect(0, 0, W, H); out.globalAlpha = 1; }
  // bloom (cheap: blur on a 480px copy, add back softly)
  blctx.filter = 'blur(5px)'; blctx.drawImage(canvas, 0, 0, 480, 270); blctx.filter = 'none';
  out.save(); out.globalCompositeOperation = 'screen'; out.globalAlpha = .2; out.drawImage(bloomC, 0, 0, W, H); out.restore();
  // grain
  out.save(); out.globalCompositeOperation = 'overlay'; out.globalAlpha = .06; out.fillStyle = out.createPattern(grains[f % 4], 'repeat'); out.translate((f * 37) % 256, (f * 91) % 256); out.fillRect(-256, -256, W + 512, H + 512); out.restore();
  // open / close fades
  if (tNew < .9) { out.fillStyle = `rgba(0,0,0,${1 - ease(tNew / .9)})`; out.fillRect(0, 0, W, H); }
  if (tNew > DUR - 1.6) { out.fillStyle = `rgba(0,0,0,${ease((tNew - (DUR - 1.6)) / 1.6)})`; out.fillRect(0, 0, W, H); }
  if (!(s.nosub)) drawSubtitle(out, tNew);
}
window.renderFrame = renderFrame; window.TOTAL_FRAMES = TOTAL_FRAMES; window.DUR = DUR;
window.grab = (q = .93) => canvas.toDataURL('image/jpeg', q);
