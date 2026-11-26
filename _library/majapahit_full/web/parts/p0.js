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
