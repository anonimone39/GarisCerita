# Panduan pemasangan

Baca ini di awal sesi baru. Pilih bagian sesuai keadaan.

| Keadaan | Kerjakan |
|---|---|
| Mac yang sama, hanya ganti sesi chat | **A** saja. Tidak perlu instal ulang |
| Mac baru atau habis instal ulang | **B**, lalu **A** |

## A. Mulai sesi baru

1. Buka sesi Claude Code dengan folder `~/reels/Project`.
2. Cek kesiapan (tidak memasang atau mengubah apa pun):
   ```bash
   bash ~/reels/Project/scripts/cek.sh
   ```
3. Kalau hasilnya `SIAP`, kirim ke Claude:
   > Baca README.md, CATATAN-LANJUTAN.md, PEMASANGAN.md, dan docs/catatan-claude, lalu bantu saya lanjutkan proyek video stickman ini.
4. Kalau ada yang `KURANG` atau gagal, lihat bagian [Kendala](#kendala).

## B. Pasang di Mac baru

Perlu internet dan ruang kosong sekitar 3 GB (dependensi dan model suara sekitar 1,3 GB, sisanya Chromium, alat, dan video).

### 1. Alat dasar

Pasang Homebrew dari https://brew.sh (perlu akun admin), lalu:

```bash
brew install git gh node ffmpeg python@3.12
```

### 2. Login GitHub

Repo ini private. Login dengan akun `TanyaPapa`:

```bash
gh auth login
```

Kalau ada lebih dari satu akun:

```bash
gh auth switch --user TanyaPapa
```

```bash
gh auth setup-git
```

### 3. Ambil proyek

Folder `~/reels/Project` harus belum ada atau masih kosong.

```bash
git clone https://github.com/TanyaPapa/video-majapahit.git ~/reels/Project
```

### 4. Pasang dependensi dan skill

```bash
bash ~/reels/Project/scripts/pasang.sh
```

Skrip ini aman dijalankan ulang. Yang dipasang:

| Bagian | Isi | Lokasi |
|---|---|---|
| Paket Node | playwright 1.49.1, three 0.169.0, font Montserrat | `kit/node_modules` |
| Browser render | Chromium milik Playwright | `~/Library/Caches/ms-playwright` |
| Paket Python | numpy, scipy, soundfile, kokoro-onnx, sherpa-onnx, edge-tts | `kit/.venv` |
| Model suara Inggris | Kokoro (sekitar 350 MB) | `kit/models` |
| Model timing kata | Parakeet (sekitar 660 MB setelah diekstrak) | `kit/models` |
| Skill | tautan `/stick-figure` ke `skills/stick-figure` di repo | `~/.claude/skills/stick-figure` |
| Folder hasil | tempat video upload | `~/reels/Upload` |

Versi yang terbukti jalan (26 November 2026, macOS 26, Apple Silicon): Node 22, ffmpeg 8.1, Python 3.12, kokoro-onnx 0.6.1, sherpa-onnx 2.0.3, edge-tts 7.3.1, numpy 2.5.5, scipy 1.18.1, soundfile 0.14.0. Versi paket Python tidak dikunci di `kit/setup.sh`; kalau rilis baru bermasalah, pasang versi di atas.

### 5. Unduh video cadangan

```bash
gh release download backup-2026-11-26 --repo TanyaPapa/video-majapahit --dir ~/reels/Upload --skip-existing
```

### 6. Tutup lalu buka lagi Claude Code

Supaya skill `/stick-figure` terbaca. Lanjut ke bagian **A**.

## Membuat video

Aturan folder dan cara lengkap ada di [README.md](README.md). Ringkasnya:

1. Buat folder dari reel yang paling mirip:
   ```bash
   bash ~/reels/Project/scripts/video-baru.sh majapahit_indo nama-video
   ```
2. Claude menulis naskah, memeriksa fakta, dan menunjukkannya dulu. Untuk naskah baru, hapus `audio/words_ref.json` di folder video, lalu atur ulang waktu adegan.
3. Suara Indonesia (Ardi):
   ```bash
   EDGE_RATE=-10% bash ~/.claude/skills/stick-figure/engine/make.sh ~/reels/Project/nama-video edge
   ```
4. Hasil kecil masuk ke `~/reels/Upload`. File besar di folder video dihapus setelah dicek.

## Menyimpan pekerjaan ke GitHub

Sekali saja di Mac baru, atur identitas commit di repo ini:

```bash
cd ~/reels/Project && git config user.name TanyaPapa && git config user.email 361372270+TanyaPapa@users.noreply.github.com
```

Setiap selesai bekerja (skrip pertama menyalin perubahan engine skill ke repo):

```bash
bash ~/reels/Project/scripts/sinkron-engine.sh
```

```bash
cd ~/reels/Project && git add -A && git status --short
```

```bash
cd ~/reels/Project && git commit -m "Jelaskan perubahan" && git push
```

Video tidak ikut `git` (diabaikan oleh `.gitignore`). Unggah video baru ke Releases:

```bash
gh release upload backup-2026-11-26 ~/reels/Upload/nama-video-upload.mp4 --repo TanyaPapa/video-majapahit
```

## Kendala

| Gejala | Penyelesaian |
|---|---|
| `ffmpeg is missing` atau `Node.js is missing` | `brew install ffmpeg node` |
| Render gagal, Chromium tidak ditemukan (cache dibersihkan macOS) | Di folder `kit` yang dipakai skill: `npx playwright install chromium` |
| `the voice tools aren't set up` | `bash ~/reels/Project/scripts/pasang.sh`. Kalau skill sudah menunjuk ke paket lain, jalankan `setup.sh --voice` di folder `kit` paket itu |
| `brew` atau `npm` menolak karena izin | Folder `/opt/homebrew` atau `~/.npm` dimiliki akun lain. Minta admin Mac mengembalikan kepemilikannya |
| `pip` macet atau paket suara gagal dipasang | Pastikan `python3.12` ada (Python bawaan 3.9 tidak cukup), hapus `kit/.venv`, lalu pasang ulang |
| Suara Indonesia gagal (`NoAudioReceived`) | edge-tts perlu internet. Ulangi beberapa saat lagi |
| Skill `/stick-figure` tidak muncul | Tutup dan buka lagi Claude Code, cek `ls -l ~/.claude/skills/` |

**Catatan untuk Mac yang sekarang:** skill menunjuk ke `~/.claude/skill-packages/stick-figure` (bukan ke repo), jadi `kit` yang dipakai ada di sana. Setelah mengubah engine, jalankan `scripts/sinkron-engine.sh` sebelum commit.
