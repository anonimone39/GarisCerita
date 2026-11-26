#!/usr/bin/env bash
# Gabungkan demak-part1, demak-part2, demak-part3 menjadi satu video (tanpa render ulang adegan).
# Kartu akhir "Bersambung" di Part 1 dan 2 dibuang, kartu akhir Part 3 dipertahankan.
# Titik potong = akhir kalimat terakhir narasi tiap part (53.92 dan 52.48 detik), lalu diberi jeda 0,4 detik.
#   bash scripts/gabung-demak.sh
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/demak-lengkap"; mkdir -p "$OUT"
ffmpeg -v error -y \
 -i "$ROOT/demak-part1/demak-part1-upload.mp4" -i "$ROOT/demak-part2/demak-part2-upload.mp4" -i "$ROOT/demak-part3/demak-part3-upload.mp4" \
 -filter_complex "\
[0:v]trim=0:53.92,setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration=0.4,fps=30,format=yuv420p[v0];\
[0:a]atrim=0:53.92,asetpts=PTS-STARTPTS,afade=t=out:st=53.8:d=0.12,apad=pad_dur=0.4,aresample=48000[a0];\
[1:v]trim=0:52.48,setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration=0.4,fps=30,format=yuv420p[v1];\
[1:a]atrim=0:52.48,asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.08,afade=t=out:st=52.36:d=0.12,apad=pad_dur=0.4,aresample=48000[a1];\
[2:v]setpts=PTS-STARTPTS,fps=30,format=yuv420p[v2];\
[2:a]asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.08,aresample=48000[a2];\
[v0][a0][v1][a1][v2][a2]concat=n=3:v=1:a=1[v][a]" \
 -map "[v]" -map "[a]" -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "$OUT/demak-lengkap-upload.mp4"
echo "selesai: $OUT/demak-lengkap-upload.mp4"
