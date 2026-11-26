# Free Indonesian (or any Edge-TTS language) voiceover, run from a reel folder.
# Reads script.json (a list of sentences), writes audio/vo_edge.wav and audio/edge_words.json
# (exact word times straight from the TTS service, so align.py needs no speech recognition).
#   tts_edge.py [voice] [rate]     defaults: id-ID-ArdiNeural +10%   (female: id-ID-GadisNeural)
# Needs internet. Retries each line a few times because the service sometimes returns no audio.
import asyncio, json, os, subprocess, sys, tempfile, numpy as np, soundfile as sf
import edge_tts

voice = sys.argv[1] if len(sys.argv) > 1 else "id-ID-ArdiNeural"
rate = sys.argv[2] if len(sys.argv) > 2 else "+10%"
GAP = 0.12
EXTRA = json.load(open("gaps.json")) if os.path.exists("gaps.json") else {}
os.makedirs("audio", exist_ok=True)
lines = json.load(open("script.json"))
REPL = json.load(open("captions.json")) if os.path.exists("captions.json") else {}


async def speak(text, mp3):
    last = None
    for attempt in range(5):
        try:
            words, got = [], False
            com = edge_tts.Communicate(text, voice, rate=rate, boundary="WordBoundary")
            with open(mp3, "wb") as f:
                async for ch in com.stream():
                    if ch["type"] == "audio":
                        f.write(ch["data"]); got = True
                    elif ch["type"] == "WordBoundary":
                        words.append((ch["text"], ch["offset"] / 1e7))
            if got: return words
        except Exception as e:
            last = e
        await asyncio.sleep(1.5 * (attempt + 1))
    sys.exit(f"edge-tts failed for: {text!r} ({last})")


out, edge_words, meta, t = [], [], [], 0.0
tmp = tempfile.mkdtemp()
for i, line in enumerate(lines):
    mp3, wav = f"{tmp}/l{i}.mp3", f"{tmp}/l{i}.wav"
    words = asyncio.run(speak(line, mp3))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", mp3, "-ac", "1", "-ar", "44100", wav], check=True)
    samples, sr = sf.read(wav, dtype="float32")
    idx = np.where(np.abs(samples) > 0.01)[0]
    lead = max(0, idx[0] - int(0.02 * sr))                      # trim leading silence, shift word times with it
    samples = samples[lead: idx[-1] + int(0.05 * sr)]
    shift = lead / sr
    for w, s in words:
        edge_words.append([w, round(t + max(0.0, s - shift), 3), i])
    sf.write(f"audio/line_{i:02d}.wav", samples, sr)
    meta.append({"i": i, "text": line, "start": round(t, 3), "dur": round(len(samples) / sr, 3)})
    out.append(samples)
    gap = GAP + (0.12 if i == 0 or line.rstrip().endswith(("?", "!")) else 0) + EXTRA.get(str(i), 0)   # gaps.json: {"3": 3.5} = 3.5 s of extra silence after sentence 3 (title cards, chapter breaks)
    out.append(np.zeros(int(gap * sr), dtype=samples.dtype))
    t += len(samples) / sr + gap
vo = np.concatenate(out)
sf.write("audio/vo_edge.wav", vo, sr)
json.dump(edge_words, open("audio/edge_words.json", "w"))
json.dump(meta, open("audio/lines.json", "w"), indent=1)
print(f"{voice} {rate} total {len(vo)/sr:.2f}s, {len(edge_words)} words")
