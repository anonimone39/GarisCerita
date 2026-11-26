#!/usr/bin/env bash
# Buat folder video baru dari salah satu reel di _library/ (siap diedit dan di-render).
#   scripts/video-baru.sh <reel-library> <nama-video>
#   contoh: scripts/video-baru.sh paregreg perang-bubat-2
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
USAGE="pakai: video-baru.sh <reel-library> <nama-video>. Pilihan reel: $(cd "$ROOT/_library" && ls -d */ | tr -d / | grep -v fonts | tr '\n' ' ')"
SRC="$ROOT/_library/${1:?$USAGE}"
case "${2:?$USAGE}" in /*) DEST="$2" ;; *) DEST="$ROOT/$2" ;; esac
[ -d "$SRC/web" ] || { echo "$USAGE"; exit 1; }
[ -e "$DEST" ] && { echo "sudah ada: $DEST"; exit 1; }
mkdir -p "$DEST/audio" "$DEST/web"
cp -R "$SRC/web/." "$DEST/web/"
mkdir -p "$DEST/web/fonts"; cp "$ROOT/_library/fonts/"* "$DEST/web/fonts/"
for f in "$SRC"/*.py "$SRC"/*.json "$SRC"/*.sh; do [ -f "$f" ] && cp "$f" "$DEST/"; done
[ -f "$SRC/audio/words_ref.json" ] && cp "$SRC/audio/words_ref.json" "$DEST/audio/"
# subtitle terjemahan (kalau reel memakainya)
if [ -f "$DEST/captions_id.json" ]; then
  python3 -c 'import json,sys; d=sys.argv[1]; c=json.load(open(d+"/captions_id.json")); open(d+"/web/captions_id.js","w").write("const CAPS_ID="+json.dumps(c,ensure_ascii=False)+";")' "$DEST"
fi
echo "dibuat: $DEST"
