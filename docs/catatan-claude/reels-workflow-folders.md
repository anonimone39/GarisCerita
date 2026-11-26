---
name: reels-workflow-folders
description: Where stick-figure videos are built (~/reels/Project) and where only the small upload versions go (~/reels/Upload); clean up big files afterwards
metadata:
  node_type: memory
  type: feedback
  originSessionId: ef1c90d2-ce5d-4f2a-b523-8b3672fc309e
  modified: 2026-11-23T17:24:30.304Z
---

Build every new stick-figure video inside `~/reels/Project/<video-name>/`. Only the small upload version (`<name>-upload.mp4`, `<name>_indo-upload.mp4` for Indonesian voice) is sent to `~/reels/Upload/`. After that, delete the big `<name>.mp4`, `silent.mp4`, `seg/`, `stills/`, `audio/*.wav` and other leftovers. Never delete `~/reels/Project/_library/` (reusable props, scenes, audio.py, fonts, README.md).

**Why:** the user (Steven) wants one clean place for uploads and does not want 200-350 MB intermediates piling up. They said to keep only what helps make the next topic's video.

**How to apply:** start from the closest reel in `_library/`, follow `~/reels/Project/README.md`. `make.sh` writes the upload version to `~/reels/Upload` by itself when that folder exists. Deleting needs the user to run `rm -rf` themselves if Claude Code's safety check blocks it (they have done it in the Terminal tab before). See [[stick-figure-indonesian-voice]].
