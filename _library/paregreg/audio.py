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
DUR = (WARP['new_end'] + 0.6 if WARP else 37.4) + 0.6
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

sfx = np.zeros(N)
import re as _re
_src = open('web/shots.js').read()
_shots = [(float(s), float(e), tr) for s, e, tr in _re.findall(r"start: ([\d.]+), end: ([\d.]+), tr: '(\w+)'", _src)]
for s, e, tr in _shots[:-1]:
    if tr == 'whip': place(sfx, whoosh(.36), e - .22, .3)
def noiseburst(dur=.08, lo=1500, hi=7000):
    n = int(dur * SR); return bp(rng.standard_normal(n), lo, hi) * np.exp(-T(n) * 40)
def steps(t0, t1, every, f=140, g=.22):
    t = t0
    while t < t1: place(sfx, thud(f, .07, 1), t, g); t += every
def glass(g=1.0):
    out = np.zeros(int(.9 * SR))
    for k in range(9): place(out, noiseburst(.04, 2500, 9000) * (.9 - k * .07), k * .018 + rng.random() * .01)
    for f in (2637, 3520, 4186): place(out, chime(f, .6) * .35, .02)
    return out * g
def shing(g=1.0):
    n = int(.7 * SR); t = T(n); return (hp(rng.standard_normal(n), 4500) * np.exp(-t * 9) * .5 + np.sin(2 * np.pi * (2800 + 900 * np.exp(-t * 12)) * t) * np.exp(-t * 7) * .35) * g
def paper_flap(dur=.2):
    n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 1200, 7000) * np.sin(np.pi * t / dur) ** .6 * .6
def gust(dur):
    n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 1400) * np.sin(np.pi * t / dur) ** 2 * .6
def rumble(dur):
    n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 140, 2) * np.sin(np.pi * t / dur) ** .7 * 2.2
def buzz(dur):
    n = int(dur * SR); t = T(n); f = 190 + 25 * np.sin(2 * np.pi * 7 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * (.5 + .5 * np.sin(2 * np.pi * 31 * t)) * np.sin(np.pi * t / dur) * .3
def splash(g=1.0):
    n = int(.25 * SR); t = T(n); return bp(rng.standard_normal(n), 300, 3000) * np.exp(-t * 14) * g
def sad_wah():
    n = int(1.1 * SR); t = T(n); f = 330 * (1 - .35 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.6) * (.8 + .2 * np.sin(2 * np.pi * 6 * t)) * .5
# 1 hook: the biggest kingdom, the gate holds, the crown cracks
place(sfx, sparkle_sfx(), .3, .35); place(sfx, chime(1760, 1.2), .35, .3)
place(sfx, thud(55, .5, 1), 3.9, .7); place(sfx, clang(200, 1.0) * .5, 3.9, .5); place(sfx, gust(.6), 4.3, .3)
for tt, g in [(5.9, .35), (6.7, .55), (7.3, .85)]: place(sfx, glass(g), tt, .5)
place(sfx, riser(2.0), 5.7, .3)
place(sfx, thud(45, .9, 1), 7.8, .9); place(sfx, shing(), 7.8, .6); place(sfx, glass(), 7.82, .9); place(sfx, clang(150, 1.2) * .5, 7.8, .6)
place(sfx, thud(42, 1.0, 1), 9.7, .9); place(sfx, clang(170, 1.3) * .6, 9.7, .6); place(sfx, shing(), 9.75, .5)
# 2 the inheritance
place(sfx, chime(784, 2.5), 12.8, .35); place(sfx, sparkle_sfx(), 13.0, .3); place(sfx, thud(50, .8, 1), 13.9, .7)
for k in range(14): place(sfx, tick(), 15.6 + k * .07, .3)
place(sfx, pop(700), 16.3, .35); place(sfx, pop(560), 16.6, .35)
place(sfx, pop(600), 18.5, .3); place(sfx, sparkle_sfx(), 19.3, .3); place(sfx, chime(1318, 1.0), 22.3, .3)
place(sfx, pop(650), 27.1, .4); place(sfx, sparkle_sfx(), 27.15, .35)
for k in range(6): place(sfx, noiseburst(.05, 2500, 9000), 29.9 + k * .5, .25)
place(sfx, pop(500), 31.2, .4); place(sfx, pop(520), 31.8, .4)
# 3 back and forth
place(sfx, thud(50, .7, 1), 33.0, .8); place(sfx, clang(220, 1.0) * .5, 33.0, .5); steps(32.9, 34.4, .12, 140, .2)
for k in range(5): place(sfx, clang(300 + k * 70, .5) * .6, 34.4 + k * .2, .4)
for k in range(9): place(sfx, clang(260 + (k * 53) % 300, .4) * .5, 36.0 + k * .24, .35); place(sfx, thud(70, .15, 1), 36.0 + k * .24, .25)
steps(38.2, 40.7, .45, 110, .14); place(sfx, sad_wah(), 41.0, .3); place(sfx, gust(2.0), 41.5, .25)
place(sfx, riser(2.4), 43.8, .3); place(sfx, thud(52, .5, 1), 46.2, .6)
t = 46.8
while t < 49.5: place(sfx, noiseburst(.03, 2000, 8000), t, .08 * (.5 + rng.random())); t += .05 + rng.random() * .12
steps(47.0, 49.0, .13, 150, .15)
for k in range(6): place(sfx, paper_flap(), 49.6 + k * .22 * .9, .4)
place(sfx, gust(1.8), 52.1, .25); place(sfx, buzz(1.8), 52.3, .25)
# 4 the turn
steps(54.0, 57.0, .13, 150, .18); place(sfx, clang(250, 1.0) * .5, 55.8, .4)
place(sfx, thud(48, .8, 1), 57.8, .8); place(sfx, riser(1.8), 57.7, .4)
place(sfx, thud(45, .9, 1), 59.5, .95); place(sfx, clang(160, 1.2) * .6, 59.5, .6); place(sfx, glass(.8), 59.52, .5); place(sfx, rumble(1.0), 59.5, .4)
t = 60.4
while t < 62.5: place(sfx, noiseburst(.03, 2000, 8000), t, .08 * (.5 + rng.random())); t += .05 + rng.random() * .12
steps(60.4, 62.4, .13, 150, .18)
for k in range(7): place(sfx, splash(.55), 62.8 + k * .35, .5)
place(sfx, gust(2.0), 62.7, .25)
place(sfx, heartbeat(), 65.0, .55); place(sfx, heartbeat(), 65.8, .55); steps(65.0, 66.3, .35, 70, .3)
place(sfx, chime(587, 3.0), 66.6, .4); place(sfx, chime(698, 2.5), 67.3, .3); place(sfx, splash(.3), 66.9, .4)
# 5 the hollow victory
place(sfx, sparkle_sfx(), 68.0, .4); place(sfx, chime(1568, 1.0), 68.02, .4)
for k in range(8): place(sfx, pop(500 + (k * 97) % 400), 68.2 + k * .15, .14)
place(sfx, sad_wah(), 70.3, .35); place(sfx, gust(1.2), 70.5, .25)
place(sfx, paper_flap(.5) * .6, 71.4, .4); place(sfx, buzz(1.7), 71.5, .3)
steps(73.4, 74.7, .45, 90, .2)
steps(74.8, 76.6, .12, 150, .16); place(sfx, riser(1.4), 75.4, .25)
for k in range(8): place(sfx, clang(300 + (k * 61) % 400, .4) * .5, 76.6 + k * .17, .3); place(sfx, thud(70, .12, 1), 76.6 + k * .17, .25)
place(sfx, boing(220, .5), 77.2, .4)
for k in range(48): place(sfx, pop(420 + (k * 13) % 120), 78.1 + k * .035, .06)
place(sfx, thud(55, .6, 1), 78.4, .6); place(sfx, chime(932, 1.4), 78.45, .35)
place(sfx, thud(46, .8, 1), 82.1, .9); place(sfx, paper_flap(.4) * .8, 82.15, .5)
for k in range(7): place(sfx, chime(2093 + (k * 211) % 900, .4) * .5, 82.5 + k * .3, .25)
for i in range(6): place(sfx, chime([784, 740, 698, 659, 622, 587][i], 1.4), 84.9 + i * .38, .28); place(sfx, thud(60, .3, 1), 84.9 + i * .38, .3)
# 6 closing
place(sfx, heartbeat(), 88.2, .45); place(sfx, gust(3.0), 88.0, .25)
place(sfx, gust(2.4), 91.0, .3); place(sfx, riser(2.2), 91.0, .18)
place(sfx, chime(587, 3.0), 93.5, .35); place(sfx, gust(5.5), 93.4, .22)
place(sfx, thud(42, 1.0, 1), 99.1, .8); place(sfx, shing(.7), 99.12, .4); place(sfx, riser(2.2), 99.9, .22)
place(sfx, chime(698, 3.0), 102.2, .3); place(sfx, chime(587, 3.5), 102.9, .3)
place(sfx, thud(40, 1.4, 1), 103.2, .6); place(sfx, thud(38, 1.4, 1), 104.4, .5)

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
def drums(t0, t1, g=1.0, every=.5):
    t = t0; i = 0
    while t < t1 - .05:
        place(music, thud(85, .2, .9), t, g)
        if i % 2: place(music, noiseburst(.04, 3000, 9000) * .6, t + BEAT * .5, g)
        t += BEAT * every; i += 1
def lowpulse(t0, t1, g=.6, root=38):
    t = t0
    while t < t1 - .05: place(music, pizz(root, .8, g), t); t += BEAT * 2
# 0-5.5 dramatic hook, then dry irony
drone(0, 5.5, .9); place(music, strings((50, 53, 57), 5.4, .45), 0)
for k, m in enumerate([62, 65, 69, 74]): place(music, glock(m, 1.4, .26), .4 + k * .6)
playful(2.8, 5.5, DM, .35, glock_on=False)
# 5.5-9.6 the crack
drums(5.5, 7.8, .55, 1); drums(7.0, 7.8, .7, .5); place(music, strings((50, 53, 57, 60), 2.2, .5), 5.6)
place(music, strings((50, 56, 62), 2.0, .5), 7.8); drone(7.8, 11.8, 1.0)
# 11.8-32.8 the inheritance: dry, ironic, then tense
place(music, strings((50, 57, 62, 65), 3.5, .4), 11.8); playful(15.4, 29.8, DM, .4, glock_on=True)
place(music, strings((50, 53, 57), 3.0, .45), 29.8); lowpulse(29.8, 32.8, .5)
# 32.8-54 war: back and forth
drums(32.8, 54.0, .7, .5); lowpulse(32.8, 54.0, .5); drone(32.8, 54.0, .8)
place(music, strings((50, 53, 57), 21.0, .4), 32.8); sneak(40.7, 43.6, .5)
# 54-68 the turn and the night
drone(54.0, 68.0, 1.0); place(music, strings((50, 53, 57), 8.6, .45), 54.0); drums(54.0, 62.6, .65, .5)
place(music, strings((48, 55, 60, 63), 5.5, .4), 62.6)
for k, m in enumerate([74, 72, 69, 65, 62]): place(music, glock(m, 2.0, .26), 66.2 + k * .35)
# 68-90.9 hollow victory, irony, then the fall
playful(68.0, 69.6, DMAJ, .5, glock_on=False)
place(music, strings((50, 53, 57), 3.4, .4), 69.6); lowpulse(71.2, 74.8, .4); sneak(73.2, 74.8, .4)
playful(74.8, 78.0, DM, .45, glock_on=False)
place(music, strings((50, 53, 57), 4.0, .4), 78.0); lowpulse(78.0, 84.7, .45)
place(music, strings((50, 56, 62), 6.2, .45), 84.7)
for k, m in enumerate([74, 71, 69, 66, 62, 59]): place(music, glock(m, 1.8, .25), 84.9 + k * .38)
place(music, strings((48, 55, 60, 64), 4.0, .4), 87.8)
# 90.9-105.4 reflective close
place(music, strings((50, 57, 62, 65), 5.0, .5), 90.9); place(music, strings((48, 55, 60, 64), 5.5, .5), 95.0)
for k, m in enumerate([74, 72, 69, 65, 62]): place(music, glock(m, 2.2, .25), 93.4 + k * 1.1)
place(music, strings((50, 56, 62), 3.5, .5), 99.0); place(music, strings((50, 57, 62, 66), 3.9, .55), 102.4)
for k, m in enumerate([62, 66, 69, 74]): place(music, glock(m, 2.4, .26), 102.6 + k * .5)
place(music, pizz(38, 1.4, .8), 104.2)
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
