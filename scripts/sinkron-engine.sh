#!/usr/bin/env bash
# Salin engine yang sedang terpasang (~/.claude/skills/stick-figure) ke repo ini, sebelum commit.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL="$(cd "$HOME/.claude/skills/stick-figure" && pwd -P)"
[ "$SKILL" = "$ROOT/skills/stick-figure" ] && { echo "skill sudah langsung dari repo ini, tidak ada yang disalin"; exit 0; }
rsync -a --delete --exclude kitpath.txt --exclude __pycache__ --exclude .DS_Store "$SKILL/" "$ROOT/skills/stick-figure/"
KIT="$SKILL/../../kit"
cp "$KIT/package.json" "$KIT/package-lock.json" "$KIT/setup.sh" "$ROOT/kit/"
cd "$ROOT" && git status --short skills kit
