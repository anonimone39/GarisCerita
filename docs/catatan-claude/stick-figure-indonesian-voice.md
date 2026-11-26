---
name: stick-figure-indonesian-voice
description: "How the stick-figure skill makes Indonesian videos (edge-tts Ardi, sentence-level sync) and which series exists"
metadata:
  node_type: memory
  type: project
  originSessionId: ef1c90d2-ce5d-4f2a-b523-8b3672fc309e
  modified: 2026-11-24T05:36:46.870Z
---

The user makes Indonesian stick-figure history reels (9:16, about 95-110 s), a series on Majapahit: Part 1 Majapahit's founding (Raden Wijaya vs Jayakatwang and the Mongols, 1293), Part 2 Perang Bubat, Part 3 Perang Paregreg. All three exist with English voice and Indonesian voice (done 2026-11-24).

**How to apply:** Indonesian voice is `bash ~/.claude/skills/stick-figure/engine/make.sh <folder> edge` with `EDGE_RATE=-10%` (edge-tts `id-ID-ArdiNeural`, free, needs internet). Kokoro and the Parakeet aligner are English only. When translating an existing reel, put the translated sentences in `script.json` (same sentence count) and keep `audio/words_ref.json` of the original: `align.py` then syncs per sentence. For a brand-new Indonesian script, write the script, make the voice, then time `shots.js` to `audio/words_new.json`. Library of props and scenes: `~/reels/Project/_library` (see [[reels-workflow-folders]]). A fact-checked 6-minute 16:9 YouTube edition combining all three parts exists (2026-11-24): Indonesian narration with Indonesian burned-in subtitles in `~/reels/Upload/majapahit_full_indo-upload.mp4`, plus a separate English audio track `majapahit_full_en-audio.m4a` (same length, for YouTube multi-audio). Sources and the cinematic toolkit are in `_library/majapahit_full`; the fact-check corrected the older reels (Mongol force 20-30 thousand, the unarmed-escort ambush, Bubat source caveats, Paregreg details), so the old 9:16 videos still carry the outdated wording. Next possible topic: whatever the user names next after Paregreg (the series ends the Majapahit arc at its fall).
