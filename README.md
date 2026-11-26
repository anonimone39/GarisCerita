# Video Stickman Sejarah Majapahit

Video animasi edukasi stickman tentang sejarah Kerajaan Majapahit. Gambar, animasi, musik, dan efek suara dibuat dengan kode, lalu dirender di komputer sendiri.

## Daftar video

| Reel (`_library/`) | Isi | Format | Narasi | Naskah | Pratinjau |
|---|---|---|---|---|---|
| `majapahit_en` | Part 1: Berdirinya Majapahit (1293) | 9:16 | Inggris, subtitle Indonesia | [naskah](docs/naskah/majapahit_en.md) | [gambar](docs/preview/majapahit_en.jpg) |
| `majapahit_indo` | Part 1 versi bahasa Indonesia | 9:16 | Indonesia | [naskah](docs/naskah/majapahit_indo.md) | [gambar](docs/preview/majapahit_indo.jpg) |
| `bubat` | Part 2: Tragedi Perang Bubat (1357) | 9:16 | Inggris, subtitle Indonesia | [naskah](docs/naskah/bubat.md) | [gambar](docs/preview/bubat.jpg) |
| `paregreg` | Part 3: Perang Paregreg (1404-1406) | 9:16 | Inggris, subtitle Indonesia | [naskah](docs/naskah/paregreg.md) | [gambar](docs/preview/paregreg.jpg) |
| `majapahit_full` | Majapahit versi penuh (sinematik, sekitar 6 menit) | 16:9 | Indonesia dan Inggris | [naskah](docs/naskah/majapahit_full.md) | [gambar](docs/preview/majapahit_full.jpg) |

File video tidak disimpan di dalam repo. Video versi upload ada di `~/reels/Upload/`, dan cadangannya di halaman [Releases](https://github.com/TanyaPapa/video-majapahit/releases). Untuk melanjutkan pekerjaan, baca [CATATAN-LANJUTAN.md](CATATAN-LANJUTAN.md).

## Struktur

```
.
├── _library/              sumber tiap reel (jangan dihapus, dipakai ulang)
│   ├── <reel>/            script.json, captions*.json, audio.py, web/, audio/words_ref.json
│   └── fonts/             Poppins Bold dan Lora
├── skills/stick-figure/   skill /stick-figure: SKILL.md dan engine render
├── kit/                   daftar paket Node dan setup.sh (Python, model suara, Chromium)
├── scripts/
│   ├── pasang.sh          pemasangan di Mac baru
│   ├── video-baru.sh      folder video baru dari reel di _library
│   └── sinkron-engine.sh  salin engine terpasang ke repo sebelum commit
├── docs/                  naskah dan pratinjau
└── <nama-video>/          satu folder per video baru
```

## Pemasangan di Mac baru

Butuh macOS, Node.js, ffmpeg, dan Python 3 (setup mengambil Python 3.12 lewat `uv` kalau perlu). Unduhan model suara sekitar 1 GB.

```bash
git clone https://github.com/TanyaPapa/video-majapahit.git ~/reels/Project
bash ~/reels/Project/scripts/pasang.sh
```

Tutup lalu buka lagi Claude Code, kemudian pakai `/stick-figure`.

## Membuat video baru

1. Buat folder dari reel yang topiknya paling mirip:
   ```bash
   scripts/video-baru.sh paregreg nama-video
   ```
2. Ubah `script.json` (satu kalimat per baris), subtitle, `web/shots.js`, dan `audio.py`. Kalau naskahnya diganti, hapus `audio/words_ref.json`, lalu atur ulang waktu adegan.
3. Render:
   ```bash
   bash ~/.claude/skills/stick-figure/engine/make.sh nama-video kokoro
   ```
   - `kokoro`: suara Inggris gratis.
   - `edge`: suara Indonesia gratis (Ardi), butuh internet. Contoh: `EDGE_RATE=-10% bash .../make.sh nama-video edge`.
4. Menerjemahkan reel yang sudah ada: taruh kalimat terjemahan di `script.json` (jumlah kalimat harus sama), simpan `audio/words_ref.json` reel asli, lalu jalankan dengan `edge`. Animasi disinkronkan per kalimat.

Subtitle terpisah (`captions_id.json`) dibaca lewat `web/captions_id.js`. Kalau isinya diubah, buat ulang file `.js` itu dari dalam folder video:

```bash
python3 -c 'import json; c=json.load(open("captions_id.json")); open("web/captions_id.js","w").write("const CAPS_ID="+json.dumps(c,ensure_ascii=False)+";")'
```

## Aturan kerja

- Semua pembuatan video dimulai di folder ini, satu folder per video.
- Yang dikirim keluar hanya video versi upload (sekitar 30 sampai 70 MB) di `~/reels/Upload/`, dengan nama `<nama>-upload.mp4` atau `<nama>_indo-upload.mp4`.
- Setelah video upload jadi, hapus `<nama>.mp4`, `silent.mp4`, `seg/`, `stills/`, dan `audio/*.wav`.
- Folder `_library/` jangan dihapus.

## Video panjang 16:9 untuk YouTube

Mulai dari `_library/majapahit_full` (70 shot).

- Ukuran frame 1920x1080: jalankan dengan `REEL_W=1920 REEL_H=1080`.
- `web/cine.js`: kamera `CAM`, latar berlapis `backdrop` (siang, golden, senja, api, malam, kabut, badai, istana), `fgFrame`, sinar matahari, partikel, judul `cineTitle`, angka `bigNum`, label `placeTag`, topi dan props.
- `web/main.js`: transisi dissolve/dip, tata warna, bloom, grain, subtitle frasa dengan waktu kata asli.
- Shot ditulis per bagian di `web/parts/p*.js`, lalu `./build_shots.sh` merakitnya jadi `web/shots.js`. Waktu shot memakai `A(i)` / `Z(i)` (awal dan akhir kalimat ke-i), jadi ikut bergeser kalau suara dibuat ulang.
- Jeda judul bab: `gaps.json` (`{"3": 3.5}` berarti 3,5 detik hening setelah kalimat 3).
- Narasi Indonesia: `make.sh <folder> edge` dengan `EDGE_RATE=+4%`.
- Audio Inggris terpisah (trek alternatif YouTube): tulis `script_en.json` dengan jumlah kalimat yang sama, jalankan `tts_fit.py script_en.json am_michael 1.12`, lalu `audio.py` membuat `audio/mix_en.wav`. Ekspor dengan `ffmpeg -t <durasi video> -af loudnorm=I=-15:TP=-3:LRA=11 -c:a aac -b:a 192k`. Jangan pakai `alimiter` setelah normalisasi karena menaikkan puncak.

## Menyimpan perubahan

```bash
scripts/sinkron-engine.sh
```

```bash
git add -A && git commit -m "pesan perubahan" && git push
```

## Catatan sejarah

Naskah disusun dari ringkasan sumber populer yang merujuk pada *Pararaton*, *Nagarakretagama*, *Kidung Sunda*, serta catatan Dinasti Yuan dan Ming. Sebagian detail masih diperdebatkan sejarawan (misalnya kisah Bubat dan tahun runtuhnya Majapahit), jadi periksa lagi sebelum dipakai sebagai rujukan.

## Kredit dan lisensi

- Engine `/stick-figure` dibuat oleh **Artem Novitckii** ([claude-animation-skills](https://github.com/artemnovitckii/claude-animation-skills)), lisensi MIT. Lihat [LICENSE](LICENSE).
- Font Poppins dan Lora: SIL Open Font License (file `OFL-*.txt` di folder font).
- Suara: [Kokoro](https://github.com/thewh1teagle/kokoro-onnx) dan Microsoft Edge TTS. Timing kata: Parakeet lewat [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx).
