#!/bin/bash
# usage: sheet.sh name t1 t2 t3 t4 [t5 t6]  -> sheet_name.jpg (2 columns, 960x540 tiles)
out=$1; shift; args=(); f=""; n=0
for t in "$@"; do args+=(-i stills/s_$t.jpg); f="${f}[${n}:v]scale=960:540[v${n}];"; n=$((n+1)); done
ins=""; for i in $(seq 0 $((n-1))); do ins="${ins}[v${i}]"; done
rows=$(( (n+1)/2 ))
ffmpeg -v error -y "${args[@]}" -filter_complex "${f}${ins}xstack=inputs=${n}:layout=$(python3 - <<PY
n=$n
print('|'.join(f"{(i%2)*960}_{(i//2)*540}" for i in range(n)))
PY
)" sheet_$out.jpg
