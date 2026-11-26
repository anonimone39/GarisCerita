#!/usr/bin/env bash
# Cek apakah Mac ini siap membuat video: alat, skill, dependensi, lalu uji suara dan satu gambar.
#   bash scripts/cek.sh
# Tidak memasang atau mengubah apa pun. File uji dibuat di folder sementara.
set -uo pipefail
GAGAL=0
ok()    { echo "  OK     $*"; }
kurang(){ echo "  KURANG $*"; GAGAL=1; }

echo "== alat"
for t in git node npm ffmpeg ffprobe; do command -v "$t" >/dev/null && ok "$t" || kurang "$t (lihat PEMASANGAN.md bagian B)"; done
command -v gh >/dev/null && ok "gh" || echo "  info   gh tidak ada (hanya perlu untuk unduh/unggah cadangan)"

echo "== skill dan dependensi"
LINK="$HOME/.claude/skills/stick-figure"
SKILL="$(cd "$LINK" 2>/dev/null && pwd -P)"
[ -n "$SKILL" ] && ok "skill /stick-figure -> $SKILL" || { kurang "skill /stick-figure belum terpasang: bash scripts/pasang.sh"; exit 1; }
KIT="$(cd "$SKILL/../../kit" 2>/dev/null && pwd)"
[ -d "$KIT/node_modules/playwright" ] && ok "paket Node" || kurang "paket Node: bash scripts/pasang.sh"
PY="$KIT/.venv/bin/python"
"$PY" -c "import kokoro_onnx, sherpa_onnx, scipy, soundfile, edge_tts" 2>/dev/null && ok "paket Python" || kurang "paket Python: bash scripts/pasang.sh"
[ -s "$KIT/models/kokoro-v1.0.onnx" ] && [ -s "$KIT/models/voices-v1.0.bin" ] && ls -d "$KIT"/models/sherpa-onnx-nemo-parakeet* >/dev/null 2>&1 \
  && ok "model suara" || kurang "model suara: bash scripts/pasang.sh"
[ -d "$HOME/reels/Upload" ] && ok "folder ~/reels/Upload" || kurang "folder ~/reels/Upload: mkdir -p ~/reels/Upload"
[ $GAGAL = 0 ] || { echo "BELUM SIAP"; exit 1; }

echo "== uji suara dan gambar (sekitar 1 menit)"
T="$(mktemp -d)"; E="$SKILL/engine"; cp -R "$E/template/." "$T/"; cd "$T" || exit 1
export NODE_PATH="$KIT/node_modules"
"$PY" "$E/tools/tts_kokoro.py" >kokoro.log 2>&1 && cp audio/vo_kokoro.wav audio/vo.wav && ok "suara Inggris (Kokoro)" || kurang "suara Inggris: lihat $T/kokoro.log"
"$PY" "$E/tools/align.py" audio/vo.wav >align.log 2>&1 && ok "timing kata (Parakeet)" || kurang "timing kata: lihat $T/align.log"
node "$E/tools/render.js" stills 1.5 >render.log 2>&1 && [ -s stills/s_1.50.jpg ] && ok "render gambar (Chromium)" || kurang "render: lihat $T/render.log"
"$PY" "$E/tools/tts_edge.py" >edge.log 2>&1 && [ -s audio/vo_edge.wav ] && ok "suara Indonesia (edge-tts, perlu internet)" || kurang "suara Indonesia: cek internet, lihat $T/edge.log"
[ $GAGAL = 0 ] && echo "SIAP. File uji: $T" || { echo "ADA YANG GAGAL. File uji: $T"; exit 1; }
