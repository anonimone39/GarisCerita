#!/usr/bin/env bash
# chk.sh <n> t1 t2 ... : durasi dan lembar kontak dari video upload
N=$1; shift; U=/root/reels/Upload/jejak-sawit-part$N-upload.mp4; C=/tmp/claude-0/-home-user-GarisCerita/cf73e7e9-b71d-5d9d-9493-18ddbaa3cdae/scratchpad/chkS$N; rm -rf $C; mkdir -p $C
ffprobe -v error -show_entries stream=codec_name,duration -of compact $U | tr '\n' ' '; echo
i=0; for t in "$@"; do ffmpeg -v error -y -ss $t -i $U -frames:v 1 -vf scale=270:480 $C/f$(printf %02d $i).jpg; i=$((i+1)); done
python3 - <<P
from PIL import Image
import glob
fs=sorted(glob.glob('$C/f*.jpg'))
for n in range(0,len(fs),7):
    ch=fs[n:n+7]; s=Image.new('RGB',(270*len(ch),480))
    for i,f in enumerate(ch): s.paste(Image.open(f),(i*270,0))
    s.save('$C/sheet%d.jpg'%(n//7))
print(len(fs))
P
