#!/usr/bin/env bash
# Pemasangan di Mac baru: dependensi + model suara, lalu daftarkan skill /stick-figure ke Claude Code.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
bash "$ROOT/kit/setup.sh" --voice
DEST="$HOME/.claude/skills/stick-figure"
if [ -e "$DEST" ] || [ -L "$DEST" ]; then
  echo "skill sudah ada di $DEST, tidak diubah"
else
  mkdir -p "$HOME/.claude/skills"
  printf '%s\n' "$ROOT/kit" > "$ROOT/skills/stick-figure/engine/kitpath.txt"
  ln -s "$ROOT/skills/stick-figure" "$DEST"
  echo "skill terpasang: $DEST"
fi
mkdir -p "$HOME/reels/Upload"
