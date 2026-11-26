# Dub a reel into another language with the free Kokoro voice, sentence by sentence, fitted to the timing of the main narration.
# Run from the reel folder (needs audio/words_new.json of the main voice and audio/vo.wav):
#   tts_fit.py script_en.json [voice] [speed]        -> audio/vo_en.wav (same length as audio/vo.wav), audio/fit_report.json
# (sentence audio is cached in audio/en_cache, so a re-run only redoes what changed)
# Each sentence is placed at the start of the matching sentence of the main voice. If it would run past its slot it is re-spoken faster
# (up to 1.45x) and only then time-compressed a little, so the dub never drifts away from the picture.
import json, os, sys, shutil, tempfile, subprocess, numpy as np, soundfile as sf
ROOT = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
KIT = os.path.realpath(os.path.join(ROOT, "..", "..", "..", "kit"))
from kokoro_onnx import Kokoro, EspeakConfig
import espeakng_loader

data = espeakng_loader.get_data_path()
if len(data) > 100:
    short = os.path.join(tempfile.gettempdir(), "kokoro-espeak-ng-data")
    if not os.path.exists(os.path.join(short, "phontab")):
        shutil.rmtree(short, ignore_errors=True); shutil.copytree(data, short)
    data = short
espeak = EspeakConfig(lib_path=espeakng_loader.get_library_path(), data_path=data)
k = Kokoro(os.path.join(KIT, "models/kokoro-v1.0.onnx"), os.path.join(KIT, "models/voices-v1.0.bin"), espeak_config=espeak)

script = json.load(open(sys.argv[1]))
voice = sys.argv[2] if len(sys.argv) > 2 else "am_michael"
base_speed = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
ref = json.load(open("audio/words_new.json" if os.path.exists("audio/words_new.json") else "audio/words_ref.json"))   # timing of the voice that is actually in the video
slot = {}
for w in ref:
    s = slot.setdefault(w["line"], [w["s"], w["e"]]); s[1] = max(s[1], w["e"])
assert len(script) == len(slot), f"{len(script)} English sentences but the main voice has {len(slot)}"
vo, sr0 = sf.read("audio/vo.wav"); total = len(vo) / sr0
starts = [slot[i][0] for i in range(len(script))]

def trim(x, sr):
    idx = np.where(np.abs(x) > .01)[0]
    return x[max(0, idx[0] - int(.02 * sr)): idx[-1] + int(.05 * sr)] if len(idx) else x
def atempo(x, sr, f):  # time-compress by factor f (>1 = faster) with ffmpeg's atempo
    with tempfile.TemporaryDirectory() as d:
        sf.write(f"{d}/i.wav", x, sr)
        chain = []; r = f
        while r > 2.0: chain.append("atempo=2.0"); r /= 2.0
        chain.append(f"atempo={r:.4f}")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{d}/i.wav", "-af", ",".join(chain), f"{d}/o.wav"], check=True)
        y, _ = sf.read(f"{d}/o.wav"); return y

SR = 24000; out = np.zeros(int((total + 1) * SR), dtype=np.float32); report = []
for i, line in enumerate(script):
    nxt = starts[i + 1] if i + 1 < len(script) else total
    room = max(.8, nxt - starts[i] - .12)
    speed = base_speed
    for _ in range(4):
        cf = f"audio/en_cache/{i:02d}_{voice}_{speed:.3f}.npy"
        if os.path.exists(cf): x = np.load(cf); sr = 24000
        else:
            x, sr = k.create(line, voice=voice, speed=speed, lang="en-us"); os.makedirs("audio/en_cache", exist_ok=True); np.save(cf, x)
        x = trim(x, sr); d = len(x) / sr
        if d <= room or speed >= 1.45: break
        speed = min(1.45, speed * max(1.05, d / room))
    squeeze = 1.0
    if d > room: squeeze = d / room; x = atempo(x, sr, min(squeeze, 1.5)); d = len(x) / sr
    a = int(starts[i] * SR); out[a:a + len(x)] += x[: len(out) - a]
    report.append({"i": i, "slot": round(room, 2), "dur": round(d, 2), "speed": round(speed, 2), "squeeze": round(squeeze, 2), "overflow": round(max(0, d - room), 2)})
sf.write("audio/vo_en.wav", out[: int(total * SR)], SR)
json.dump(report, open("audio/fit_report.json", "w"), indent=1)
print(f"{voice}: {len(script)} sentences, total {total:.1f}s; sped up: {sum(1 for r in report if r['speed'] > base_speed + .01)}, squeezed: {sum(1 for r in report if r['squeeze'] > 1.01)}, overflow: {sum(1 for r in report if r['overflow'] > .05)}")
for r in report:
    if r["speed"] > 1.3 or r["squeeze"] > 1.01: print(r)
