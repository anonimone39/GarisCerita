# Catatan serah terima (26 November 2026)

Dibuat sebelum sesi Claude Code lama ditutup, supaya pekerjaan bisa dilanjutkan dari sesi atau akun baru.

## Kalimat pembuka untuk sesi baru

Pindahkan sesi ke `~/reels/Project`, lalu kirim:

> Baca README.md, CATATAN-LANJUTAN.md, PEMASANGAN.md, dan docs/catatan-claude, lalu bantu saya lanjutkan proyek video stickman ini.

Cara pemasangan dan cek kesiapan ada di [PEMASANGAN.md](PEMASANGAN.md).

## Yang sudah selesai

- Skill `/stick-figure` terpasang di Mac (paket asli untuk Windows, sudah disesuaikan untuk macOS).
- Trilogi 9:16 dengan narasi Inggris dan subtitle Indonesia: Berdirinya Majapahit (1293), Perang Bubat (1357), Perang Paregreg (1404-1406).
- Versi narasi Indonesia (suara Ardi, edge-tts) untuk ketiga reel.
- Versi penuh 16:9 sekitar 6 menit untuk YouTube: narasi dan subtitle Indonesia (`majapahit_full_indo-upload.mp4`), ditambah trek audio Inggris terpisah (`majapahit_full_en-audio.m4a`). Sumbernya di `_library/majapahit_full`, cara pakainya di [README.md](README.md).
- Catatan memori Claude disalin ke [docs/catatan-claude](docs/catatan-claude). Sesi baru tidak memuatnya otomatis, jadi minta Claude membacanya.
- Proyek dirapikan dan diunggah ke repo private `TanyaPapa/video-majapahit`.
- Video jadi dicadangkan sebagai aset di halaman **Releases** repo.

## Cara kerja yang dipakai

1. Pengguna mengirim brief per video: durasi (maksimal 2 menit untuk reel), rasio, gaya visual, properti pembeda karakter, struktur scene, dan kata kunci untuk teks besar. Komunikasi dalam bahasa Indonesia.
2. Tulis naskah per kalimat, buat suara, lalu ukur waktunya.
3. Buat aset dan adegan, cek gambar contoh tiap adegan.
4. **Tampilkan ringkasan struktur file dan durasi tiap scene untuk ditinjau sebelum render final.**
5. Render, buat versi upload, cek frame hasil. Audio perlu didengarkan oleh pengguna.

## Keadaan di Mac

| Hal | Lokasi atau catatan |
|---|---|
| Skill | `~/.claude/skills/stick-figure` (tautan ke `~/.claude/skill-packages/stick-figure`) |
| Dependensi | di folder `kit/` paket tersebut: paket Node, `.venv` Python, model suara |
| Python 3.12 | dipasang lewat `uv` di folder pengguna. Python bawaan sistem (3.9) tidak cukup untuk paket suara |
| Proyek | `~/reels/Project` (repo ini) |
| Video jadi | `~/reels/Upload` |

File lokal tidak ikut hilang saat berganti akun Claude, selama Mac dan akun macOS-nya sama.

## Kendala yang pernah muncul

- **Render gagal karena Chromium tidak ada** (macOS membersihkan cache). Pasang ulang:
  ```bash
  cd ~/.claude/skill-packages/stick-figure/kit && npx playwright install chromium
  ```
- **`make.sh` gagal dengan `set: pipefail: invalid option name`**: akhir baris Windows (CRLF). Sudah diperbaiki di engine repo ini.
- **Suara terlalu panjang atau pendek**: atur kecepatan, misalnya `tts_kokoro.py am_michael 1.0`.

## Catatan isi yang masih terbuka

- Naskah versi penuh 16:9 sudah diperiksa ulang sejarahnya. Reel 9:16 lama masih memakai kalimat sebelum koreksi (antara lain jumlah pasukan Mongol, penyergapan, catatan sumber Bubat, detail Paregreg). Pengguna memutuskan **tidak** membuat ulang.
- Versi penuh belum ditonton utuh oleh Claude, dan sekitar 14 kalimat audio Inggrisnya terdengar agak cepat.
- Part 3 menyebut Majapahit runtuh "sekitar abad ke-16" sesuai brief. Sebagian sejarawan memakai 1478 (abad ke-15). Belum diputuskan apakah perlu diubah.
- Detail Perang Bubat bersumber dari kidung yang ditulis jauh setelah kejadian dan masih diperdebatkan.
- Pelafalan nama Jawa dan Sunda oleh suara Inggris kurang tepat di versi Inggris.

## Memulihkan di Mac lain

Ikuti [PEMASANGAN.md](PEMASANGAN.md) bagian B.
