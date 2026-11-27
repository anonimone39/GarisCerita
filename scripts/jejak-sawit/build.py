#!/usr/bin/env python3
"""Jejak Sawit builder: setup <n> | scenes <n> <spec.py> (writes scenes.js, scenes.json, audio.py)"""
import sys, os, json, shutil, re, importlib.util
ROOT = '/home/user/GarisCerita'; SW = os.path.dirname(os.path.abspath(__file__))
def part_dir(n): return f'{ROOT}/jejak-sawit-part{n}'
def setup(n):
    d = part_dir(n); os.makedirs(d + '/audio', exist_ok=True)
    if not os.path.exists(d + '/web'):
        shutil.copytree(f'{ROOT}/jejak-sawit-part1/web', d + '/web')
        for f in ('words.js', 'warp.js'):
            p = f'{d}/web/{f}'
            if os.path.exists(p): os.remove(p)
    shutil.copy(f'{SW}/env_sawit2.js', d + '/web/env_sawit2.js')
    shutil.copy(f'{ROOT}/sejarah-cabai-part7/captions.json', d + '/captions.json')
    idx = open(d + '/web/index.html').read()
    if 'env_sawit2.js' not in idx: idx = idx.replace('<script src="env_sawit.js"></script>', '<script src="env_sawit.js"></script><script src="env_sawit2.js"></script>')
    if 'scenes.js' not in idx: idx = idx.replace('<script src="shots.js"></script>', '<script src="scenes.js"></script><script src="shots.js"></script>')
    open(d + '/web/index.html', 'w').write(idx)
    open(d + '/web/shots.js', 'w').write(open(f'{SW}/head.js').read() + '\n' + open(f'{SW}/engine.js').read())
    print('setup ok', d)
SFX = {
 'pop': lambda t, g, p=560: f"place(sfx, pop({p}), {t}, {g})",
 'thud': lambda t, g, p=0: f"place(sfx, thud(55, .6, .9), {t}, {g}); place(sfx, chime(1046, 1.2), {t + .03}, .3)",
 'chime': lambda t, g, p=1318: f"place(sfx, chime({p}, 1.0), {t}, {g})",
 'sparkle': lambda t, g, p=0: f"place(sfx, sparkle_sfx(), {t}, {g})",
 'horn': lambda t, g, p=200: f"place(sfx, horn({p}, .8), {t}, {g})",
 'waves': lambda t, g, p=3.0: f"place(sfx, waves({p}), {t}, {g})",
 'riser': lambda t, g, p=1.6: f"place(sfx, riser({p}), {t}, {g})",
 'boom': lambda t, g, p=0: f"place(sfx, thud(45, 1.0, 1.0), {t}, {g}); place(sfx, crackle(1.0, 1.2), {t}, .5)",
 'crackle': lambda t, g, p=2.0: f"place(sfx, crackle({p}, 1.0), {t}, {g})",
 'clang': lambda t, g, p=300: f"place(sfx, clang({p}, 1.0), {t}, {g})",
 'boing': lambda t, g, p=300: f"place(sfx, boing({p}, .5), {t}, {g})",
 'heart': lambda t, g, p=0: f"place(sfx, heartbeat(), {t}, {g})",
 'tap': lambda t, g, p=0: f"place(sfx, thud(130, .08, .35), {t}, {g})",
}
def audio(n, scenes, end_card_t):
    lines = ["sfx = np.zeros(N)", "# ---- auto cues from the scene list ----"]
    for sp in scenes:
        if sp.get('tr', 'whip') == 'whip': lines.append(SFX['whoosh'](sp['e']) if 'whoosh' in SFX else f"place(sfx, whoosh(.36), {sp['e'] - .22}, .35)")
        for g in sp.get('tags', []): lines.append(SFX['pop'](g[4], .38, 520 + (int(g[4] * 10) % 6) * 40))
        for q in sp.get('kin', []): lines.append(SFX['thud'](q[3], .8)); 
        if sp.get('pill'): lines.append(SFX['sparkle'](sp['pill'][1], .4)); lines.append(SFX['chime'](sp['pill'][1] + .05, .3, 1046))
        for c in sp.get('sfx', []):
            nm = c[1]; g = c[2] if len(c) > 2 else .35; p = c[3] if len(c) > 3 else None
            lines.append(SFX[nm](c[0], g) if p is None else SFX[nm](c[0], g, p))
        for it in sp.get('items', []):
            if it.get('at') is not None and it['k'] in ('seed', 'tandan', 'palm', 'product', 'cal', 'seal', 'q'): lines.append(SFX['pop'](it['at'], .3, 600))
    # music
    mood = {'calm': ('DMAJ', 92, True, '(50, 57, 62, 66)', .65), 'bright': ('DMAJ', 108, True, None, .75), 'tense': ('DM', 88, False, '(50, 56, 62)', .6), 'sad': ('DM', 80, False, '(50, 57, 62)', .55), 'triumph': ('DMAJ', 112, True, '(50, 57, 62, 66)', .85)}
    mus = ["music = np.zeros(N)", "def sec(t0, t1, prog, bpm, g=1.0, glock_on=False, stabs=True):", "    global BEAT", "    BEAT = 60 / bpm; playful(t0, t1, prog, g, glock_on=glock_on, stabs=stabs)", "def beat_thuds(t0, t1, bpm, g=.5):", "    b = 60 / bpm; t = t0", "    while t < t1: place(music, thud(75, .2, .7), t, g); t += b"]
    segs = []
    for sp in scenes:
        m = sp.get('m', 'calm')
        if segs and segs[-1][2] == m: segs[-1][1] = sp['e']
        else: segs.append([sp['s'], sp['e'], m])
    for a, b, m in segs:
        prog, bpm, gl, st, g = mood[m]
        mus.append(f"sec({a}, {min(b, end_card_t + 4)}, {prog}, {bpm}, {g}, glock_on={gl})")
        if st: mus.append(f"place(music, strings({st}, {max(.5, min(b, end_card_t + 4) - a)}, .32), {a})")
        if m == 'tense': mus.append(f"beat_thuds({a + .2}, {b - .1}, 84, .4)")
    mus.append(f"for m in (62, 66, 69, 74): place(music, glock(m + 12, 1.6, .3), {end_card_t})")
    mus.append("music = lp(music, 6000)")
    src = open(f'{ROOT}/_library/majapahit_indo/audio.py').read()
    a = src.index("ENDS = ["); b = src.index("# ---------------- music (procedural"); c = src.index("# ---- Majapahit underscore"); d = src.index("# ---------------- VO + mix")
    head, defs, tail = src[:a], src[b:c], src[d:]
    open(part_dir(n) + '/audio.py', 'w').write(head + "\n".join(lines) + "\n" + defs + "\n".join(mus) + "\n\n" + tail)
def scenes(n, specpath):
    spec = importlib.util.spec_from_file_location('spec', specpath); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    d = part_dir(n)
    json.dump(m.LINES, open(d + '/script.json', 'w'), ensure_ascii=False, indent=1)
    if hasattr(m, 'SCENES'):
        json.dump(m.SCENES, open(d + '/scenes.json', 'w'), ensure_ascii=False)
        open(d + '/web/scenes.js', 'w').write('const SCENES = ' + json.dumps(m.SCENES, ensure_ascii=False) + ';')
        audio(n, m.SCENES, m.END_CARD)
        # make.sh counts scenes with: grep -c "SHOTS.push" web/shots.js, so pad the count with comments
        sp = d + '/web/shots.js'; t = [l for l in open(sp).read().split('\n') if not l.startswith('// SHOTS.push (scene')]
        t += [f'// SHOTS.push (scene {i})' for i in range(len(m.SCENES) - 1)]
        open(sp, 'w').write('\n'.join(t) + '\n')
    print('scenes ok', len(m.SCENES) if hasattr(m, 'SCENES') else 0)
if __name__ == '__main__':
    if sys.argv[1] == 'setup': setup(int(sys.argv[2]))
    elif sys.argv[1] == 'scenes': scenes(int(sys.argv[2]), sys.argv[3])
