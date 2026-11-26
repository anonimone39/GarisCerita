#!/bin/bash
# assemble web/shots.js from web/parts/p*.js (+ a closing stub while chapters are still being written)
cd "$(dirname "$0")"; cat web/parts/p0.js $(ls web/parts/p[1-9]*.js | sort -V) > web/shots.js
if [ -n "$STUB" ]; then echo "SHOTS.push({ start: $STUB, end: $STUB + 6, tr: 'cut', tod: 'night', draw(ctx, lt, t) { ctx.fillStyle = '#123'; ctx.fillRect(0, 0, W, H); } });" >> web/shots.js; fi
