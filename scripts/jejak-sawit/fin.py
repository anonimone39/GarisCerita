#!/usr/bin/env python3
"""fin.py <n> "<judul>" "<durasi>" <notes.md> : tulis docs/naskah, bersihkan, commit dan push"""
import sys, json, subprocess, shutil, os
n, title, dur, notes = sys.argv[1], sys.argv[2], sys.argv[3], open(sys.argv[4]).read()
R = '/home/user/GarisCerita'
L = json.load(open(f'{R}/jejak-sawit-part{n}/script.json'))
body = "\n".join(f"{i+1}. {s}" for i, s in enumerate(L))
open(f'{R}/docs/naskah/sawit_part{n}.md', 'w').write(f"# JEJAK SAWIT Part {n} – {title}\n\nDurasi: {dur}, 9:16, suara Ardi.\n\n## Narasi voice-over\n\n{body}\n\n## Catatan fakta\n\n{notes}\n")
shutil.copy(f'/tmp/claude-0/-home-user-GarisCerita/cf73e7e9-b71d-5d9d-9493-18ddbaa3cdae/scratchpad/sw/spec{n}.py', f'{R}/scripts/jejak-sawit/spec{n}.py')
for f in ('build.py', 'engine.js', 'head.js', 'env_sawit2.js', 'tts.sh', 'chk.sh', 'fin.py'): shutil.copy(f'/tmp/claude-0/-home-user-GarisCerita/cf73e7e9-b71d-5d9d-9493-18ddbaa3cdae/scratchpad/sw/{f}', f'{R}/scripts/jejak-sawit/{f}')
subprocess.run(['bash', f'{R}/scripts/jejak-sawit/fin.sh', n], check=True)
msg = f"Tambahkan video Jejak Sawit Part {n}: {title}\n\nSuara Indonesia (Ardi), 9:16, {dur}.\n\nCo-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01Lf7zNd5ApK6aoar897cisp"
subprocess.run(['git', 'add', 'scripts/jejak-sawit', f'jejak-sawit-part{n}', f'docs/naskah/sawit_part{n}.md'], cwd=R, check=True)
subprocess.run(['git', 'commit', '-q', '-m', msg], cwd=R, check=True)
subprocess.run(['git', 'push', '-q', 'origin', 'claude/gifted-shannon-x1cal6'], cwd=R)
print(subprocess.run(['git', 'status', '--short'], cwd=R, capture_output=True, text=True).stdout or 'git bersih')
