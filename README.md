# Jastipin Mobile

Aplikasi mobile untuk layanan **jasa titip (jastip)** belanja, dibangun dengan **Expo + React Native** dan siap dites di **Expo Go**. Konsep, alur, dan desainnya melanjutkan situs web Jastipin: pembeli menitipkan barang yang sulit didapat (skincare, fashion, gadget, snack impor), dengan penekanan utama pada kepercayaan dan transparansi.

## Cara menjalankan di Expo Go

> Penting: proyek ini memakai **Expo SDK 54** supaya cocok dengan Expo Go versi 54.x yang ada di App Store / Play Store. Jangan naikkan ke SDK 55/56 selama Expo Go di HP kamu masih versi 54.

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan dev server
npx expo start

# 3. Scan QR code dengan:
#    - Android: aplikasi Expo Go
#    - iOS: aplikasi Kamera, lalu buka di Expo Go
```

Pastikan HP dan komputer berada di jaringan Wi-Fi yang sama. Kalau jaringannya bermasalah, jalankan dengan tunnel:

```bash
npx expo start --tunnel
```

## Fitur

Aplikasi punya empat tab utama:

- **Beranda** - sapaan, pencarian, hero, statistik, cara kerja, kategori populer, promo, dan testimoni.
- **Kategori** - grid kategori (fashion, beauty, gadget, snack). Ketuk untuk lihat contoh barang dan tombol titip.
- **Lacak** - timeline status pesanan contoh, dari dikonfirmasi sampai diantar.
- **Profil** - kartu profil dan menu akun.

Tombol titip dan kontak membuka **WhatsApp** lewat deep link.

## Tech stack

- Expo SDK 54 (React Native 0.81, React 19.1)
- React Navigation 7 (bottom tabs + native stack)
- `@expo/vector-icons` (Ionicons), tanpa modul native kustom (kompatibel Expo Go)
- JavaScript murni, tanpa TypeScript

## Struktur proyek

```
jastip-mobile-claude/
├── App.js                     # Root navigasi (tabs + stack kategori)
├── index.js                   # Entry point
├── app.json                   # Konfigurasi Expo (nama, ikon, splash)
├── babel.config.js
├── package.json
├── assets/                    # Ikon, splash, dan gambar produk
│   ├── icon.png  adaptive-icon.png  splash.png  favicon.png
│   └── hero.jpg  beauty.jpg  fashion.jpg  gadget.jpg  snacks.jpg
├── src/
│   ├── theme.js               # Token warna, radius, spacing + nomor WhatsApp
│   ├── data.js                # Data contoh (kategori, langkah, pesanan)
│   ├── whatsapp.js            # Helper deep link WhatsApp
│   ├── components/            # Button, SectionHeader
│   └── screens/               # Home, Categories, CategoryDetail, Track, Profile
├── README.md
├── AGENTS.md                  # Steering untuk semua AI agent
├── CLAUDE.md                  # Steering khusus Claude
└── .kiro/steering/            # product.md, tech.md, structure.md
```

## Yang perlu kamu ganti

| Lokasi | Nilai contoh | Ganti dengan |
|--------|--------------|--------------|
| `src/theme.js` -> `WHATSAPP_NUMBER` | `6281200000000` | Nomor WhatsApp bisnis (format `62...`) |
| `src/data.js` | kategori, barang, harga, pesanan, testimoni | Data asli dari backend kamu |

## Catatan

- Semua data masih contoh (mock) di `src/data.js`. Belum ada backend, keranjang, atau pembayaran on-app. Transaksi terjadi lewat WhatsApp.
- Gambar produk dibagikan dengan versi web Jastipin agar brand konsisten.
- Kalau Expo Go kamu memakai SDK berbeda, sesuaikan versi di `package.json` lalu jalankan `npx expo install --fix`.
