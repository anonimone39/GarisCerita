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
DUR = (WARP['new_end'] + 0.6 if WARP else 37.4) + 0.6 + 4.0  # + end card
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


# ---------------- Majapahit (full): cues anchored to the narration ----------------
import json as _json
REF = _json.load(open('audio/words_ref.json'))
SEN = {}
for _w in REF:
    _s = SEN.setdefault(_w['line'], [_w['s'], _w['e']]); _s[1] = max(_s[1], _w['e'])
def A(i, o=0): return SEN[i][0] + o
def Zz(i, o=0): return SEN[i][1] + o
def WT(i, key):
    for _w in REF:
        if _w['line'] == i and _w['w'].lower().startswith(key.lower()): return _w['s']
    return SEN[i][0]
def thunder(dur=1.8):
    n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 250) * np.exp(-t * 1.6) * (1 + .5 * np.sin(2 * np.pi * 7 * t)) * .9
def wind(dur):
    n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 200, 900) * (.4 + .6 * np.sin(np.pi * t / dur) ** 2) * .5
def waterfall_sfx(dur):
    n = int(dur * SR); return hp(lp(rng.standard_normal(n), 6000), 800) * .35
def toll(f=196, dur=2.2):
    n = int(dur * SR); t = T(n); x = np.zeros(n)
    for k, (r, a, d) in enumerate([(1, 1, 1.4), (2.4, .5, 2), (4.1, .3, 3), (5.9, .2, 4)]): x += a * np.sin(2 * np.pi * f * r * t) * np.exp(-t * d)
    return x * .6 * np.minimum(1, t / .003)
def crack_sfx():
    n = int(.9 * SR); t = T(n); x = hp(rng.standard_normal(n), 1200) * np.exp(-t * 14) * .9; th = thud(60, .5, .8); x[:len(th)] += th; return x
def coins(dur=1.2):
    out = np.zeros(int(dur * SR) + 4000)
    for i in range(14): place(out, chime(2400 + (i * 97) % 900, .25) * .5, i * dur / 16 + (i % 3) * .01)
    return out
def fanfare():
    out = np.zeros(int(3 * SR))
    for k, (m, at) in enumerate([(62, 0), (66, .25), (69, .5), (74, .8)]): place(out, glock(m + 12, 1.6, .5), at); place(out, strings((m - 12, m - 5), 2.2, .35), at)
    return out

sfx = np.zeros(N)
# soft whooshes where the picture dissolves to a new place
for i in [5, 6, 7, 9, 11, 14, 16, 17, 18, 21, 23, 24, 27, 29, 31, 32, 38, 39, 41, 42, 44, 45, 47, 49, 50, 55, 56, 57, 58, 60, 63, 64, 66, 67, 69]: place(sfx, whoosh(.55), A(i) - .35, .1)
# --- prologue
place(sfx, sparkle_sfx(), .5, .3); place(sfx, sparkle_sfx(), 2.2, .3); place(sfx, whoosh(.9, False), 5.2, .3)
place(sfx, thud(55, .6, 1.0), A(2, 2.7)); place(sfx, crack_sfx(), A(2, 2.6), .5); place(sfx, riser(3.2), A(3, -.4), .4); place(sfx, toll(110, 3.5), A(3, 1.0), .8); place(sfx, clang(170, 1.4), A(3, 1.1), .35)
for i in (4, 34, 54): place(sfx, thud(45, .8, 1.0), A(i), .8); place(sfx, toll(150, 3.0), A(i), .45); place(sfx, sparkle_sfx(), A(i, .6), .25)
# --- chapter I
place(sfx, pop(500), A(5, .4), .4); place(sfx, chime(1046, 1.2), A(5, .35), .25)
place(sfx, scribble(.5), A(6, 2.3), .6); place(sfx, thud(70, .3, .9), A(6, 3.1)); place(sfx, hp(rng.standard_normal(int(.15 * SR)), 1500) * np.exp(-T(int(.15 * SR)) * 30) * .5, A(6, 3.1))
place(sfx, thunder(2.2), A(7, 2.4), .7); place(sfx, wind(5), A(7), .25)
place(sfx, crackle(7.3), A(8), .45)
for i in range(10): place(sfx, foot(), A(8) + i * .3, .3)
place(sfx, thud(48, .7, 1.0), A(8, 3.3)); place(sfx, woo(1.6), A(8, 4.4), .4)
place(sfx, crackle(6.8), A(9), .4)
for i in range(22): place(sfx, foot(), A(9, .2) + i * .29, .45)
place(sfx, waves(3.1), A(10), .25); place(sfx, chime(784, 1.0), A(10, 1.6), .25)
place(sfx, chime(698, 1.0), A(11, 1.0), .3); place(sfx, whoosh(.5), A(12, .3), .3); place(sfx, pop(700), A(12, 1.5), .3)
place(sfx, boing(240, .5), A(12, 3.0), .35); place(sfx, tick(), A(12, 4.1), .6); place(sfx, tick(), A(12, 4.2), .5); place(sfx, pop(900), A(12, 4.15), .4)
for h in (.7, 1.2, 1.7, 2.2, 2.7): place(sfx, thud(150, .12, .8), A(14, h)); place(sfx, hp(rng.standard_normal(int(.08 * SR)), 1200) * np.exp(-T(int(.08 * SR)) * 60) * .4, A(14, h))
for k in range(7): place(sfx, thud(190, .08, .6), A(14, .5 + k * .6))
place(sfx, whoosh(.7, False), A(14, 2.8), .3); place(sfx, thud(48, .6, .9), A(14, 3.7))
place(sfx, boing(160, .7), A(14, 6.0), .45); place(sfx, pop(300), A(14, 7.0), .35)
place(sfx, pop(520), A(15, .2), .4); place(sfx, sparkle_sfx(), A(15, .7), .4); place(sfx, chime(1046, 1.4), A(15, .9), .3)
place(sfx, toll(130, 3.0), A(16, .3), .5); place(sfx, thud(60, .3, .8), A(16, 1.7))
place(sfx, waves(7.4), A(17), .3); place(sfx, horn(196, 1.2), A(17, 1.0), .4); place(sfx, thud(55, .6, 1.0), A(17, 1.8)); place(sfx, pop(560), A(17, 2.2), .35)
place(sfx, waves(8), A(18), .25)
for i in range(10): place(sfx, foot(), A(18, .4) + i * .3, .3)
place(sfx, pop(700), A(18, 4.9), .5); place(sfx, boing(300, .4), A(18, 5.0), .35); place(sfx, boing(220, .5), A(19, .4), .35); place(sfx, tick(), A(19, 2.2), .4); place(sfx, tick(), A(19, 3.1), .4)
place(sfx, chime(1568, 1.2), A(20, .9), .55); place(sfx, sparkle_sfx(), A(20, 1.8), .35)
place(sfx, thud(110, .15, .7), A(21, 2.6)); place(sfx, pop(600), A(21, 2.65), .3); place(sfx, pop(700), A(22, 1.7), .4); place(sfx, whoosh(.4), A(22, 1.3), .35)
for i in range(18): place(sfx, foot(), A(23, .3) + i * .3, .35)
place(sfx, pop(560), A(23, .4), .4); place(sfx, crackle(6.3), A(24), .4)
for i, f in enumerate([420, 560, 480, 640, 500, 700, 450, 600, 520, 660, 480, 620, 540, 700]): place(sfx, clang(f, .6), A(24, 2.2) + i * .2, .36 if i % 2 else .28)
for i in range(10): place(sfx, thud(120 + (i % 3) * 25, .09, .5), A(24, 2.3) + i * .27)
place(sfx, boing(330, .5), A(24, 4.3), .45); place(sfx, thud(55, .5, .9), A(24, 4.9))
for i in range(6): place(sfx, tick(), A(25, .2 + i * .45), .3)
place(sfx, thud(50, .8, 1.0), A(26, .2), .9); place(sfx, riser(2.2), A(26, -.2), .35)
place(sfx, chime(698, 1.0), A(27, 1.0), .25)
for i in range(9): place(sfx, clang(300 + (i % 4) * 90, .35), A(28, .2 + i * .25), .22)
place(sfx, riser(2.2), A(29, -.2), .3); place(sfx, thud(55, .5, 1.0), A(29, 2.0)); place(sfx, clang(240, .7), A(29, 2.0), .55); place(sfx, whoosh(.3), A(29, 1.95), .4)
place(sfx, crackle(2.0), A(29, 3.4), .5)
for i in range(7): place(sfx, clang(380 + (i % 3) * 120, .4), A(29, 3.5) + i * .22, .3)
for i in range(12): place(sfx, foot(), A(30, .2) + i * .3, .4)
place(sfx, crackle(5), A(30), .3); place(sfx, boing(280, .4), A(30, .6), .3); place(sfx, thud(50, .6, .9), A(30, .6))
place(sfx, waves(5), A(31), .3); place(sfx, horn(196, 1.5), A(31, 1.2), .4)
place(sfx, whoosh(.6, False), A(32, 3.9), .3); place(sfx, fanfare(), A(32, 4.5), .5); place(sfx, sparkle_sfx(), A(32, 5.1), .4)
for i in range(10): place(sfx, hp(rng.standard_normal(int(.3 * SR)), 1000) * np.sin(np.pi * T(int(.3 * SR)) / .3) * .3, A(32, 4.9 + i * .25), .35)
place(sfx, whoosh(.4), A(33, 2.7), .3); place(sfx, thud(55, .6, .9), A(33, 3.9)); place(sfx, boing(240, .5), A(33, 3.9), .4); place(sfx, chime(1568, 1.0), A(33, 4.0), .4); place(sfx, pop(620), A(33, 4.0), .4)
# --- chapter II
place(sfx, chime(784, 1.5), A(35, .3), .3); place(sfx, chime(1046, 1.5), A(35, .5), .3); place(sfx, sparkle_sfx(), A(35, 2.0), .3)
place(sfx, wind(7), A(36), .3); place(sfx, waves(7), A(36), .15); place(sfx, thud(70, .3, .9), A(36, 1.5)); place(sfx, chime(880, 1.2), A(36, 4.6), .3)
place(sfx, tick(), A(37, .5), .7); place(sfx, thud(110, .15, .8), A(37, .55)); place(sfx, toll(180, 2.5), A(37, .6), .4)
for k in range(7): place(sfx, pop(700 + k * 60), A(38, 1.0 + k * .35), .2)
place(sfx, chime(1318, 1.5), A(38, 1.1), .3); place(sfx, waves(7.9), A(39), .25); place(sfx, sparkle_sfx(), A(39, 3.0), .25)
for k in range(5): place(sfx, pop(520 + k * 40), A(40, .3 + k * .5), .25)
place(sfx, tweet(), A(41, .5), .35); place(sfx, sparkle_sfx(), A(41, 1.5), .25)
place(sfx, thud(110, .2, .9), WT(43, 'diserahkan')); place(sfx, hp(rng.standard_normal(int(.12 * SR)), 900) * np.exp(-T(int(.12 * SR)) * 40) * .5, WT(43, 'diserahkan'))
place(sfx, scribble(.5), A(44, 1.2), .6); place(sfx, thud(70, .3, .9), A(44, 1.4))
for i in range(16): place(sfx, thud(70, .2, .5 + i * .03), A(45, .2 + i * .45), .5)
place(sfx, riser(4.5), A(45, .5), .3)
place(sfx, crackle(5), A(47), .3)
for i in range(10): place(sfx, clang(300 + (i % 4) * 100, .5), A(47, .3 + i * .3), .2)
place(sfx, thud(45, 1.0, 1.0), A(47, 4.0)); place(sfx, toll(130, 4.0), A(47, 4.0), .5)
place(sfx, chime(698, 2.0), A(48, .5), .25); place(sfx, hp(rng.standard_normal(int(.3 * SR)), 900) * np.exp(-T(int(.3 * SR)) * 14) * .4, A(48, 3.5))
place(sfx, toll(98, 3.0), A(49), .4); place(sfx, wind(4), A(49), .2); place(sfx, waterfall_sfx(4.5), A(50), .3); place(sfx, waterfall_sfx(1), A(51), .12)
place(sfx, crack_sfx(), A(51, .5), .8); place(sfx, thud(50, .8, 1.0), A(51, .55)); place(sfx, wind(3), A(51), .2)
place(sfx, whoosh(.3), A(52, .2), .15)
for key in ('Kidung', 'Carita', 'Pararaton', 'Nagara'): place(sfx, chime(1046 if key != 'Nagara' else 523, 1.0), WT(52, key), .35 if key != 'Nagara' else .45)
place(sfx, boing(200, .6), WT(52, 'Nagara') + .2, .3); place(sfx, crack_sfx(), A(53, 1.5), .5); place(sfx, toll(140, 4.0), A(53, 0.2), .35)
# --- chapter III
for k in range(3): place(sfx, toll(110, 3.0), A(55, .3 + k * 1.4), .5)
place(sfx, crack_sfx(), A(55, 3.2), .7); place(sfx, thud(48, 1.0, 1.0), A(55, 3.3))
place(sfx, chime(698, 1.5), A(56, .6), .2); place(sfx, chime(587, 1.5), A(57, .6), .2)
place(sfx, crack_sfx(), A(58, 1.0), .5); place(sfx, thud(110, .2, .9), A(58, 4.5)); place(sfx, whoosh(.4), A(58, 3.7), .3)
place(sfx, thud(45, 1.0, 1.0), A(59), .9); place(sfx, crackle(3.6), A(59), .45)
for i in range(10): place(sfx, clang(380 + (i % 4) * 100, .5), A(59, .2 + i * .3), .3)
place(sfx, crackle(8), A(60), .35)
for i in range(22): place(sfx, clang(300 + (i % 5) * 80, .4), A(60, .3 + i * .35), .2); place(sfx, thud(110, .1, .5), A(60, .3 + i * .35))
for k in range(5): place(sfx, tick(), A(62, .6 + k * .7), .3)
place(sfx, boing(180, .6), A(62, 3.3), .25); place(sfx, crackle(7), A(63), .4)
for i in range(16): place(sfx, foot(), A(63, .2) + i * .26, .4)
for i in range(8): place(sfx, clang(380 + (i % 4) * 100, .5), A(63, 4.0) + i * .3, .3)
place(sfx, thud(50, .8, 1.0), A(63, 4.5)); place(sfx, waves(5.5), A(64), .3)
for i in range(10): place(sfx, hp(rng.standard_normal(int(.25 * SR)), 600) * np.sin(np.pi * T(int(.25 * SR)) / .25) * .3, A(64, .3 + i * .5), .3)
place(sfx, thud(55, .6, .9), A(64, 4.9)); place(sfx, wind(4), A(65), .3); place(sfx, toll(120, 3.5), A(65, .5), .35)
place(sfx, crackle(6), A(66), .35)
for i in range(8): place(sfx, boing(200 + i * 30, .4), A(66, .4 + i * .6), .2); place(sfx, thud(120, .1, .5), A(66, .4 + i * .6))
place(sfx, thud(110, .2, .9), A(67, .1)); place(sfx, coins(1.4), A(67, .6), .4); place(sfx, coins(1.4), A(67, 5.4), .3); place(sfx, thud(110, .2, .9), A(67, 7.4)); place(sfx, pop(700), A(67, 7.45), .4)
for k in range(6): place(sfx, whoosh(.5), A(68, .3 + k * .8), .15)
place(sfx, wind(11), A(69), .25); place(sfx, toll(98, 4.0), A(69, 5.5), .5)
# --- epilogue
place(sfx, sparkle_sfx(), A(70, .5), .3); place(sfx, chime(1046, 1.2), A(70, 1.0), .25)
place(sfx, chime(1568, 1.2), A(71, .3), .5); place(sfx, whoosh(.5), A(71, 1.4), .35); place(sfx, sparkle_sfx(), A(71, 2.0), .35)
place(sfx, crack_sfx(), A(72, 1.2), .7); place(sfx, thud(48, 1.0, 1.0), A(72, 1.3)); place(sfx, wind(5), A(72), .25)
place(sfx, chime(1046, 2.5), A(73, .4), .4); place(sfx, chime(1318, 2.5), A(73, .6), .35); place(sfx, sparkle_sfx(), A(73, 1.0), .4); place(sfx, toll(196, 4.0), A(73, .5), .3)

# ---------------- music: warm and sparse; minor for the conflicts, bright for the founding and the lessons ----------------
music = np.zeros(N)
def sec(t0, t1, prog, bpm, g=1.0, glock_on=False, stabs=True):
    global BEAT
    BEAT = 60 / bpm; playful(t0, t1, prog, g, glock_on=glock_on, stabs=stabs)
def beat_thuds(t0, t1, bpm, g=.5):
    b = 60 / bpm; t = t0
    while t < t1: place(music, thud(75, .2, .7), t, g); t += b
def pad(t0, t1, ms, g=.35):
    place(music, strings(ms, min(t1 - t0, 12), g), t0)
    if t1 - t0 > 12: pad(t0 + 11.5, t1, ms, g)
DMn, DMajn = (50, 57, 62), (50, 57, 62, 66)
# prologue
pad(0, A(3), (50, 57, 62, 65), .4); beat_thuds(1.0, A(3), 70, .4)
for k, m in enumerate([62, 65, 69, 74]): place(music, glock(m, 1.4, .3), 1.0 + k * 1.0)
pad(A(3), A(4), (50, 57, 62, 66), .5)
for k, m in enumerate([74, 81, 86, 90]): place(music, glock(m, 1.6, .25), A(3, 1.0 + k * .5))
pad(A(4), A(5), (50, 57, 62), .4)
# I: the fall, the escape
sec(A(5), A(7), DMAJ, 84, .55, glock_on=True); pad(A(5), A(7), DMajn, .3)
pad(A(7), A(10), DMn, .4); sec(A(7), A(10), DM, 92, .6)
beat_thuds(A(8), A(9), 100, .5)
# Madura, the false bow, the trick
sec(A(10), A(11), DMAJ, 84, .45); BEAT = 60 / 100; sneak(A(11), A(14), .8); pad(A(11), A(14), DMn, .25)
BEAT = 60 / 108; sneak(A(14), A(15), .75)
for k, m in enumerate([74, 77, 81, 79, 77]): place(music, glock(m, .9, .3), A(15, .1 + k * .22))
# Kubilai, the armada, the landing: broad and ominous, then comic confusion
pad(A(16), A(18), DMn, .45); beat_thuds(A(16, 1.5), A(18), 76, .5); sec(A(16), A(18), DM, 80, .45)
sec(A(18), A(20), DMAJ, 120, .5, glock_on=True)
place(music, strings((50, 57, 62, 65), 2.0, .45), A(20)); [place(music, glock(m, .9, .3 + k * .02), A(20, .6 + k * .2)) for k, m in enumerate([62, 66, 69, 74, 78, 81])]
sec(A(21), A(23), DMAJ, 116, .7, glock_on=True)
# the march and the battle
sec(A(23), A(24), DM, 128, .7); sec(A(24), A(25), DM, 144, .8); beat_thuds(A(23), A(25), 144, .5)
sec(A(25), A(26), DMAJ, 104, .5, glock_on=True)
pad(A(26), A(29), (50, 56, 62), .5); BEAT = 60 / 100; sneak(A(27), A(29, 1.9), .85); beat_thuds(A(28), A(29, 2.0), 100, .4)
sec(A(29, 2.0), A(31), DM, 152, .85); beat_thuds(A(29, 2.0), A(31), 152, .5)
pad(A(31), A(32), DMajn, .4)
# coronation: triumph
sec(A(32), A(33), DMAJ, 100, .85, glock_on=True); pad(A(32), A(33), DMajn, .5)
place(music, fanfare(), A(32, 4.5), .6)
sec(A(33), A(34), DMAJ, 112, .8, glock_on=True); pad(A(33), A(34), DMajn, .45)
# II: warm and romantic, then ominous
pad(A(34), A(35), (50, 57, 62, 66), .4)
sec(A(35), A(41), DMAJ, 92, .65, glock_on=True); pad(A(35), A(41), DMajn, .35)
sec(A(38), A(39), DMAJ, 88, .6, glock_on=True)
pad(A(42), A(45), (50, 56, 62), .5); beat_thuds(A(42, 1.0), A(45), 70, .4)
pad(A(45), A(47), (50, 56, 62, 65), .6); beat_thuds(A(45), A(47), 100, .55)
pad(A(47), A(48), (50, 56, 62), .6); beat_thuds(A(47), A(47, 4.2), 120, .55)
pad(A(48), A(52), (50, 57, 62), .45)
for k, m in enumerate([62, 65, 69, 65, 62, 57]): place(music, glock(m, 1.8, .22), A(48, .5 + k * 1.0))
for k, m in enumerate([62, 65, 62, 57, 53]): place(music, glock(m, 2.0, .2), A(50, .5 + k * .8))
pad(A(52), A(54), (50, 57, 62), .4)
# III: the split, the war, the decline
pad(A(54), A(55), (50, 56, 62), .45)
pad(A(55), A(59), (50, 56, 62, 65), .5); beat_thuds(A(55), A(59), 64, .45)
sec(A(59), A(60), DM, 150, .9); beat_thuds(A(59), A(66), 150, .55)
sec(A(60), A(66), DM, 134, .75, glock_on=False)
pad(A(62), A(63), (50, 56, 62), .5); pad(A(65), A(67), (50, 56, 62, 65), .5)
pad(A(67), A(69), (50, 57, 62, 65), .45); beat_thuds(A(67), A(68, 3), 72, .4)
pad(A(69), A(70), DMn, .5)
for k, m in enumerate([62, 65, 62, 57]): place(music, glock(m, 2.2, .22), A(69, 1.0 + k * 2.0))
# epilogue
pad(A(70), A(71), DMajn, .45); sec(A(70), A(72), DMAJ, 96, .7, glock_on=True); pad(A(71), A(72), DMajn, .5)
pad(A(72), A(73), (50, 56, 62, 65), .55); beat_thuds(A(72), A(72, 1.3), 80, .5)
pad(A(73), A(73, 14), (50, 57, 62, 66, 69), .55); sec(A(73), A(73, 12), DMAJ, 88, .7, glock_on=True)
for m in (62, 66, 69, 74): place(music, pizz(m - 12, .8, .5), A(73, 8)); place(music, glock(m + 12, 1.6, .28), A(73, 8))
music = lp(music, 6000)

# ---------------- VO + mix (Indonesian -> mix.wav; English -> mix_en.wav when audio/vo_en.wav exists) ----------------
import os as _os
def load_vo(path):
    vo, vsr = sf.read(path)
    if vo.ndim > 1: vo = vo.mean(1)
    vo = signal.resample_poly(vo, SR, vsr); vo = hp(vo, 90)
    envv = np.abs(signal.hilbert(vo)); envv = lp(envv, 20)
    gain = np.where(envv > .15, (.15 / np.maximum(envv, 1e-6)) ** .4, 1.0); vo = vo * gain; vo = vo / np.max(np.abs(vo)) * .9
    V = np.zeros(N); V[:min(N, len(vo))] = vo[:N]; return V
def mixdown(VO, outpath):
    venv = lp(np.abs(VO), 6); vtrack = np.clip(venv / .05, 0, 1); duck = 1 - .55 * vtrack
    mix_ = VO * 1.0 + music * .26 * duck + sfx * .7
    out = np.stack([mix_, mix_.copy()], 1); fade = np.ones(N); fl = int(1.5 * SR); fade[-fl:] = np.linspace(1, 0, fl); out *= fade[:, None]
    out = out / np.max(np.abs(out)) * .89; sf.write(outpath, out, SR); print('wrote', outpath, out.shape, 'rms dB', round(20 * np.log10(np.sqrt(np.mean(out ** 2))), 1))
mixdown(load_vo('audio/vo.wav'), 'audio/mix.wav')
if _os.path.exists('audio/vo_en.wav'): mixdown(load_vo('audio/vo_en.wav'), 'audio/mix_en.wav')
