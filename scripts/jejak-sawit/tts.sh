#!/usr/bin/env bash
# tts.sh <n> : buat suara dan ukur waktu kata dari script.json
set -euo pipefail
N=$1; D=/home/user/GarisCerita/jejak-sawit-part$N; cd $D
KIT=/home/user/GarisCerita/kit; PY=$KIT/.venv/bin/python; E=/home/user/GarisCerita/skills/stick-figure/engine; export NODE_PATH=$KIT/node_modules
rm -f audio/words_ref.json
$PY $E/tools/tts_edge.py id-ID-ArdiNeural -10% 2>&1 | tail -1
cp audio/vo_edge.wav audio/vo.wav
$PY $E/tools/align.py audio/vo.wav > /dev/null 2>&1
python3 - <<'P'
import json,itertools
w=json.load(open('audio/words_new.json'))
for li,g in itertools.groupby(w,key=lambda x:x['line']):
    g=list(g); print(f"L{li+1} {g[0]['s']:.2f}-{g[-1]['e']:.2f}: "+' '.join(f"{x['w']}@{x['s']:.2f}" for x in g))
P
