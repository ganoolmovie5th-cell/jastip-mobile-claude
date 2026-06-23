# CLAUDE.md

Steering file untuk Claude dan asisten berbasis Claude yang bekerja di repository ini.

Panduan utama ada di [`AGENTS.md`](AGENTS.md). Baca itu lebih dulu.

## Ringkas cepat

- Proyek: aplikasi mobile jasa titip (jastip) **Jastipin**, Expo + React Native, dites di Expo Go.
- SDK: Expo 54 (React Native 0.81, React 19.1). Tambah paket dengan `npx expo install`, bukan `npm install` versi bebas.
- Navigasi: React Navigation 7 (bottom tabs + native stack di tab Kategori).
- Harus kompatibel Expo Go: tanpa modul native kustom.
- Bahasa pengguna: Bahasa Indonesia natural, tanpa em-dash.
- Token desain hanya di `src/theme.js`.

## Steering terstruktur

- Konteks bisnis: `.kiro/steering/product.md`
- Stack & konvensi: `.kiro/steering/tech.md`
- Struktur file: `.kiro/steering/structure.md`

## Sebelum menyatakan selesai

Jalankan `npx expo export --platform android` dan pastikan bundling sukses tanpa error. Pastikan tidak ada paket native baru yang merusak kompatibilitas Expo Go.
