import numpy as np, soundfile as sf, json
from scipy import signal
SR = 44100
import json as _j, os as _os
WARP = _j.load(open('audio/warp.json')) if _os.path.exists('audio/warp.json') else None
def toNew(x):
    if not WARP: return x
    A = WARP['anchors']
    if x <= A[0][0]: return x - A[0][0] + A[0][1]
    for i in range(len(A) - 1):
        if x <= A[i + 1][0]: k = (x - A[i][0]) / (A[i + 1][0] - A[i][0]); return A[i][1] + k * (A[i + 1][1] - A[i][1])
    return x - A[-1][0] + A[-1][1]
DUR = 57.66
N = int(DUR * SR)
rng = np.random.default_rng(3)
def T(n): return np.arange(n) / SR
def env(n, a=.005, d=.2, curve=4):
    t = T(n); e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-np.maximum(0, t - a) * curve / max(d, 1e-4)); return e
def place(buf, x, at, g=1.0):
    i = int(toNew(at) * SR); j = min(len(buf), i + len(x))
    if i < 0 or i >= len(buf): return
    buf[i:j] += x[:j - i] * g
def bp(x, lo, hi, order=2):
    b, a = signal.butter(order, [lo / (SR / 2), min(hi / (SR / 2), .99)], 'band'); return signal.lfilter(b, a, x)
def lp(x, f, order=2):
    b, a = signal.butter(order, f / (SR / 2), 'low'); return signal.lfilter(b, a, x)
def hp(x, f, order=2):
    b, a = signal.butter(order, f / (SR / 2), 'high'); return signal.lfilter(b, a, x)

# ---------------- SFX ----------------
def whoosh(dur=.35, up=True):
    n = int(dur * SR); x = rng.standard_normal(n); t = T(n)
    lo, hi = bp(x, 250, 1200), bp(x, 1500, 6000); k = np.linspace(0, 1, n) if up else np.linspace(1, 0, n)
    e = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 1.5
    return (lo * (1 - k) + hi * k) * e * 1.6
def thud(f0=70, dur=.35, g=1):
    n = int(dur * SR); t = T(n); f = f0 * (1 + 1.5 * np.exp(-t * 30))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 12)
    x += lp(rng.standard_normal(n), 900) * np.exp(-t * 40) * .6
    return x * g
def clang(f0=520, dur=1.0):
    n = int(dur * SR); t = T(n); x = np.zeros(n)
    for k, (r, a, d) in enumerate([(1, 1, 5), (2.76, .6, 7), (5.4, .4, 10), (8.9, .25, 14), (1.5, .5, 6)]):
        x += a * np.sin(2 * np.pi * f0 * r * t + k) * np.exp(-t * d)
    x += hp(rng.standard_normal(n), 2000) * np.exp(-t * 60) * .8
    return x * .5 + thud(90, dur, .7)[:n]
def pluck(f, dur=.5, bright=.5):
    n = int(dur * SR); p = int(SR / f); buf = rng.uniform(-1, 1, p); out = np.zeros(n)
    for i in range(n):
        out[i] = buf[i % p]; buf[i % p] = bright * buf[i % p] + (1 - bright) * .5 * (buf[i % p] + buf[(i + 1) % p]) * .996 if False else .5 * (buf[i % p] + buf[(i + 1) % p]) * .995
    return out
def chime(f=1760, dur=.8):
    n = int(dur * SR); t = T(n)
    return (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 2.01 * t) + .3 * np.sin(2 * np.pi * f * 3 * t)) * np.exp(-t * 6) * np.minimum(1, t / .003) * .5
def sparkle_sfx():
    out = np.zeros(int(.7 * SR))
    for i, f in enumerate([2093, 2637, 3136, 4186]): place(out, chime(f, .5) * .5, i * .05)
    return out
def tick(): n = int(.04 * SR); t = T(n); return hp(rng.standard_normal(n), 3000) * np.exp(-t * 200) * .8 + np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 150) * .4
def pop(f=600):
    n = int(.12 * SR); t = T(n); fr = f * (1 + 2 * t * 10); return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 40)
def boing(f=220, dur=.5):
    n = int(dur * SR); t = T(n); fr = f * (1 + .35 * np.sin(2 * np.pi * 9 * t) * np.exp(-t * 3)) * (1 + t)
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 5) * .6
def tweet():
    out = np.zeros(int(1.2 * SR))
    for i in range(4):
        n = int(.1 * SR); t = T(n); fr = 3200 + 900 * np.sin(2 * np.pi * 30 * t)
        place(out, np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.sin(np.pi * t / .1) * .25, i * .25)
    return out
def scribble(dur=.18):
    n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 1500, 6000) * (0.5 + .5 * np.sin(2 * np.pi * 30 * t)) * np.sin(np.pi * t / dur) * .5
def riser(dur=2.8):
    n = int(dur * SR); t = T(n); f = 200 * (2 ** (t / dur * 2.5))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * .3 + bp(rng.standard_normal(n), 800, 5000) * .3 * (t / dur)
    return x * (t / dur) ** 2
def waves(dur):
    n = int(dur * SR); t = T(n); x = lp(rng.standard_normal(n), 700, 2)
    return x * (0.5 + .5 * np.sin(2 * np.pi * t / 4.5) ** 2) * .5
def heartbeat():
    out = np.zeros(int(.8 * SR)); place(out, thud(55, .3, .8), 0); place(out, thud(50, .3, .6), .22); return out


def crackle(dur, g=1.0):
    n = int(dur * SR); x = np.zeros(n)
    base = hp(lp(rng.standard_normal(n), 3000), 500) * .12
    pops = (rng.random(n) < 0.0009).astype(float) * rng.uniform(.4, 1, n)
    pops = signal.lfilter([1], [1, -.995], pops) * .5
    return (base + hp(pops, 300) * .8) * g
def horn(f=330, dur=.6):
    n = int(dur * SR); t = T(n); ph = 2 * np.pi * np.cumsum(f * (1 + .02 * np.sin(2 * np.pi * 6 * t))) / SR
    x = np.sign(np.sin(ph)) * .4 + np.sin(ph) * .5
    return lp(x, 1800) * np.minimum(1, t / .02) * np.minimum(1, (dur - t) / .08) * .6
def woo(dur=1.2):
    n = int(dur * SR); t = T(n); f = 380 + 160 * np.sin(2 * np.pi * 1.6 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / dur) * .35
def foot(n=1):
    return thud(95, .07, .35)

sfx = np.zeros(N)
sfx = np.zeros(N)
# ---------------- SFX cues (seconds of the voiceover) ----------------
for w in [5.51, 9.63, 14.49, 17.2, 22.85, 28.08, 33.16, 35.42, 42.51, 46.32, 49.23]: place(sfx, whoosh(.36), w - .22, .35)
# 1 leaves Europe
place(sfx, waves(5.5), 0, .3); place(sfx, pop(560), .99, .35); place(sfx, horn(220, .8), 2.2, .35); place(sfx, thud(55, .4, .8), 3.1); place(sfx, thud(60, .5, .9), 3.6)
# 2 Portugal
place(sfx, pop(560), 8.66, .4); place(sfx, chime(1318, .9), 8.7, .3); place(sfx, sparkle_sfx(), 8.95, .35)
# 3 1498, Vasco da Gama, the Cape, India
place(sfx, thud(55, .6, .9), 10.03); place(sfx, chime(1046, 1.2), 10.1, .35); place(sfx, pop(560), 13.61, .4)
place(sfx, waves(2.0), 14.49, .35); place(sfx, pop(560), 14.6, .4); place(sfx, pop(580), 15.9, .4); place(sfx, sparkle_sfx(), 16.1, .4)
# 4 the sea links three continents
for tt in (19.84, 20.79, 22.09): place(sfx, pop(560), tt, .4); place(sfx, chime(1175, .8), tt, .25)
place(sfx, riser(2.0), 17.6, .2)
# 5 chili to India, around 1542
place(sfx, pop(520), 23.56, .35); place(sfx, pop(580), 25.1, .35); place(sfx, pop(620), 25.67, .35); place(sfx, sparkle_sfx(), 26.2, .35)
place(sfx, thud(55, .6, .9), 26.88); place(sfx, chime(1046, 1.2), 26.9, .35)
# 6 farmers plant, spreads over Asia
for k in range(5): place(sfx, thud(130, .08, .35), 28.3 + k * .34, .5)
place(sfx, pop(560), 28.82, .35)
for i in range(7): place(sfx, pop(480 + i * 40), 30.3 + i * .3, .28)
place(sfx, pop(600), 31.97, .4); place(sfx, chime(1318, .9), 32.0, .3)
# 7 why so fast
place(sfx, pop(560), 33.3, .4); place(sfx, pop(700), 34.0, .35); place(sfx, pop(640), 34.3, .35)
# 8 three reasons
place(sfx, pop(560), 36.71, .4); place(sfx, whoosh(1.2), 36.0, .25); place(sfx, pop(580), 37.64, .4)
for i in range(8): place(sfx, pop(480 + (i % 4) * 50), 38.7 + i * .22, .2)
place(sfx, pop(600), 39.52, .4)
place(sfx, thud(70, .3, .6), 41.0); place(sfx, boing(300, .5), 41.15, .35); place(sfx, thud(55, .6, .9), 41.5); place(sfx, clang(900, .7), 41.5, .35)
# 9 merchants interested
place(sfx, pop(560), 42.94, .4)
for k in range(8): place(sfx, chime(1568 + (k % 3) * 200, .5), 43.1 + k * .28, .2)
place(sfx, sparkle_sfx(), 44.3, .35); place(sfx, thud(55, .5, .9), 45.7); place(sfx, chime(1318, 1.0), 45.72, .35)
# 10 not over yet
place(sfx, waves(2.9), 46.32, .3); place(sfx, thud(55, .5, .9), 47.85); place(sfx, chime(1046, 1.4), 48.2, .35)
# 11 Southeast Asia
place(sfx, riser(2.0), 50.4, .25); place(sfx, pop(560), 50.35, .4); place(sfx, pop(620), 52.51, .4); place(sfx, chime(1318, 1.2), 52.55, .35)
place(sfx, sparkle_sfx(), 53.7, .4); place(sfx, chime(1046, 1.4), 53.8, .3)
# ---------------- music (procedural sea-shanty jig, D minor, 6/8) ----------------
BPM = 132  # dotted-quarter = beat; eighth = 60/BPM/... use eighth duration
E8 = 60 / BPM / 2 * 1.0  # eighth note seconds (6/8 feel)
def midi(m): return 440 * 2 ** ((m - 69) / 12)
def saw_pad(f, dur, g=.2):
    n = int(dur * SR); t = T(n); vib = 1 + .004 * np.sin(2 * np.pi * 5.5 * t)
    ph = np.cumsum(f * vib) / SR; x = 2 * (ph % 1) - 1 + .6 * (2 * ((ph * 1.005) % 1) - 1)
    x = lp(x, 1400); e = np.minimum(1, t / .06) * np.minimum(1, (dur - t) / .08)
    return x * e * g
mel = [62, 65, 69, 67, 65, 64, 62, 64, 65, 64, 62, 61, 62, 65, 69, 72, 70, 69, 67, 65, 64, 62, 61, 62]  # 24 eighths = 4 bars of 6/8
chords = [(50, 57, 62, 65), (48, 55, 60, 64), (46, 53, 58, 62), (45, 52, 57, 61)]
plk_cache = {}
def plk(m, dur):
    k = (m, round(dur, 2))
    if k not in plk_cache: plk_cache[k] = pluck(midi(m), dur)
    return plk_cache[k]
music = np.zeros(N)
def jig(t0, t1, g=1.0, mel_on=True, bass_on=True, pad_on=True, drum=True, mel_g=.55):
    t = t0; i = 0
    while t < t1:
        bar = (i // 6) % 4; ch = chords[bar]
        if bass_on and i % 6 == 0: place(music, plk(ch[0] - 12, E8 * 6) * .7, t, g)
        if pad_on and i % 6 == 0:
            for m in ch[1:]: place(music, saw_pad(midi(m), min(E8 * 6, t1 - t)), t, g * .25)
        if mel_on and i % 3 == 0: place(music, plk(mel[i % 24], E8 * 3) * .8, t, g * mel_g)
        # light percussion: frame drum on 1 and 4
        if drum and i % 6 == 0: place(music, thud(100, .12, .15), t, g)
        t += E8; i += 1
def drone(t0, t1, g=1.0):
    n = int((t1 - t0) * SR); t = T(n)
    x = (np.sin(2 * np.pi * 73.4 * t) + .5 * np.sin(2 * np.pi * 110 * t + 1) + .3 * np.sin(2 * np.pi * 146.8 * t * 1.003)) * (0.7 + .3 * np.sin(2 * np.pi * .3 * t))
    x *= np.minimum(1, t / .4) * np.minimum(1, (t1 - t0 - t) / .4)
    place(music, x * .25, t0, g)
# ---- whimsical comedic underscore (replaces jig) ----
music = np.zeros(N)
BEAT = 60 / 104
def pizz(m, dur=.45, g=1.0):
    k = ('pz', m, round(dur, 2))
    if k not in plk_cache:
        x = pluck(midi(m), dur); n = len(x); t = T(n)
        x = bp(x, 180, 3500) * np.exp(-t * 7) + bp(rng.standard_normal(n), 1500, 5000) * np.exp(-t * 300) * .15
        plk_cache[k] = x / (np.max(np.abs(x)) + 1e-9)
    return plk_cache[k] * g
def glock(m, dur=1.2, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m)
    x = (np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 6) + .15 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t * 12))
    return x * np.exp(-t * 3.5) * np.minimum(1, t / .002) * .5 * g
def reed(m, dur=.22, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m); ph = (f * t) % 1
    x = lp(np.sign(np.sin(2 * np.pi * ph)) * .6 + (2 * ph - 1) * .4, 900)
    return x * np.minimum(1, t / .015) * np.exp(-t * 6) * np.minimum(1, (dur - t) / .03) * .5 * g
def strings(ms, dur, g=1.0):
    n = int(dur * SR); t = T(n); x = np.zeros(n)
    for m in ms:
        for d in (-.004, 0, .005):
            ph = np.cumsum(midi(m) * (1 + d) * (1 + .003 * np.sin(2 * np.pi * 5 * t))) / SR; x += 2 * (ph % 1) - 1
    x = lp(x / (len(ms) * 3), 1100); e = np.minimum(1, t / .5) * np.minimum(1, (dur - t) / .5)
    return x * e * g
# progressions (root, chord tones) in midi
DM = [(38, (62, 65, 69)), (43, (62, 67, 71)), (38, (62, 65, 69)), (45, (61, 64, 67))]   # Dm G Dm A7
DMAJ = [(38, (62, 66, 69)), (43, (62, 67, 71)), (45, (61, 64, 69)), (38, (62, 66, 69))]  # D G A D
motif = [(0, 74), (.5, 77), (1, 81), (2, 79), (2.5, 77), (3, 76)]  # glock line over 1 bar
def playful(t0, t1, prog, g=1.0, glock_on=True, stabs=True):
    t = t0; bar = 0
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        place(music, pizz(root, .5, .9), t, g); place(music, pizz(root + 7, .5, .7), t + 2 * BEAT, g)
        if stabs:
            for bt in (1, 3): 
                for m in ch: place(music, pizz(m - 12, .3, .28), t + bt * BEAT, g)
        if glock_on and bar % 2 == 0:
            for (bt, m) in motif:
                mm = m if prog is DM else m + (1 if m % 12 in (5,) else 0)
                if t + bt * BEAT < t1: place(music, glock(mm, 1.0, .35), t + bt * BEAT, g)
        t += 4 * BEAT; bar += 1
def sneak(t0, t1, g=1.0):
    steps = [38, 38, 41, 40, 39, 38, 36, 37]
    t = t0; i = 0
    while t < t1 - .05:
        place(music, reed(steps[i % 8] + 12, .2, .8), t, g); place(music, pizz(steps[i % 8], .35, .6), t, g)
        t += BEAT * (1 if i % 2 == 0 else 1); i += 1

# ---- Cabai Part 3 underscore ----
music = np.zeros(N)
def sec(t0, t1, prog, bpm, g=1.0, glock_on=False, stabs=True):
    global BEAT
    BEAT = 60 / bpm; playful(t0, t1, prog, g, glock_on=glock_on, stabs=stabs)
def beat_thuds(t0, t1, bpm, g=.5):
    b = 60 / bpm; t = t0
    while t < t1: place(music, thud(75, .2, .7), t, g); t += b
sec(0.0, 9.63, DMAJ, 104, .7, glock_on=True); place(music, strings((50, 57, 62, 66), 9.6, .3), 0.0)   # setting sail
sec(9.63, 17.2, DMAJ, 100, .75, glock_on=False)
place(music, strings((50, 57, 62, 66), 7.5, .4), 9.63)
sec(17.2, 28.08, DMAJ, 108, .75, glock_on=True)                                          # sea routes, India
sec(28.08, 33.16, DMAJ, 116, .8, glock_on=True)                                           # growing and spreading
place(music, strings((50, 57, 62), 2.3, .4), 33.16); beat_thuds(33.3, 35.4, 100, .4)       # why?
sec(35.42, 46.32, DMAJ, 112, .8, glock_on=True)                                           # reasons
sec(46.32, 49.23, DM, 96, .65, glock_on=False); place(music, strings((50, 57, 62), 3.0, .45), 46.32)
sec(49.23, 57.0, DMAJ, 100, .7, glock_on=True); place(music, strings((50, 57, 62, 66), 7.7, .4), 49.23)
for m in (62, 66, 69, 74): place(music, glock(m + 12, 1.5, .3), 53.7)
music = lp(music, 6000)

# ---------------- VO + mix ----------------
vo, vsr = sf.read('audio/vo.wav')
if vo.ndim > 1: vo = vo.mean(1)
vo = signal.resample_poly(vo, SR, vsr)
vo = hp(vo, 90)
# gentle compression
envv = np.abs(signal.hilbert(vo)); envv = lp(envv, 20)
gain = np.where(envv > .15, (.15 / np.maximum(envv, 1e-6)) ** .4, 1.0); vo = vo * gain
vo = vo / np.max(np.abs(vo)) * .9
VO = np.zeros(N); VO[:min(N, len(vo))] = vo[:N]
# duck music under VO
venv = lp(np.abs(VO), 6); vtrack = np.clip(venv / .05, 0, 1)
duck = 1 - .55 * vtrack
mixL = VO * 1.0 + music * .22 * duck + sfx * .7
mixR = mixL.copy()
out = np.stack([mixL, mixR], 1)
fade = np.ones(N); fl = int(.5 * SR); fade[-fl:] = np.linspace(1, 0, fl); out *= fade[:, None]
pk = np.max(np.abs(out)); out = out / pk * .89
sf.write('audio/mix.wav', out, SR)
print('done', out.shape, 'rms dB', 20 * np.log10(np.sqrt(np.mean(out ** 2))))
