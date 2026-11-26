#!/usr/bin/env bash
# macOS setup for the /stick-figure kit (written for this Mac; the original package ships only a Windows installer).
#   bash setup.sh [--voice]     safe to run again
set -euo pipefail
KIT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$KIT"
# ~/.npm on this Mac has root-owned files; keep npm's cache inside the kit instead
export npm_config_cache="$KIT/.npm-cache"

command -v ffmpeg >/dev/null || { echo "ffmpeg is missing (brew install ffmpeg)"; exit 1; }
command -v npm >/dev/null || { echo "Node.js is missing"; exit 1; }

echo "== npm packages + Chromium"
npm install --no-audit --no-fund --loglevel=error
npx --yes playwright install chromium

echo "== voice tools (Python venv + models)"
PYBASE=""
for c in python3.13 python3.12 python3.11 python3.10; do command -v "$c" >/dev/null && { PYBASE="$(command -v $c)"; break; }; done
if [ -z "$PYBASE" ]; then
  UV="$(command -v uv || echo "$HOME/Library/Python/3.9/bin/uv")"
  [ -x "$UV" ] || { python3 -m pip install --user -q uv; }
  "$UV" python install 3.12
  PYBASE="$("$UV" python find 3.12)"
fi
[ -x .venv/bin/python ] || "$PYBASE" -m venv .venv
.venv/bin/python -m pip install -q --upgrade pip
.venv/bin/python -m pip install -q numpy scipy soundfile kokoro-onnx sherpa-onnx edge-tts

M="$KIT/models"; mkdir -p "$M"
[ -s "$M/kokoro-v1.0.onnx" ] || curl -fL -# -o "$M/kokoro-v1.0.onnx" https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
[ -s "$M/voices-v1.0.bin" ] || curl -fL -# -o "$M/voices-v1.0.bin" https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
if ! ls -d "$M"/sherpa-onnx-nemo-parakeet* >/dev/null 2>&1; then
  curl -fL -# -o "$M/p.tar.bz2" https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-nemo-parakeet-tdt-0.6b-v2-int8.tar.bz2
  (cd "$M" && tar xjf p.tar.bz2 && rm -f p.tar.bz2)
fi
.venv/bin/python -c "import kokoro_onnx, sherpa_onnx, scipy, soundfile; print('voice tools OK')"
echo "SETUP DONE"
