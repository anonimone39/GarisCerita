#!/usr/bin/env bash
# fin.sh <n>: bersihkan file besar, salin video upload ke folder part, commit dan push
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."
N="$1"; D="jejak-sawit-part$N"
rm -rf "$D/seg" "$D/silent.mp4" "$D/$D.mp4" "$D/stills"
cp "$HOME/reels/Upload/$D-upload.mp4" "$D/"
