# Steering: Jastipin Mobile

Panduan untuk setiap AI agent atau kontributor yang bekerja di repository ini. Baca ini sebelum mengubah kode.

## Apa ini

Aplikasi mobile **Expo + React Native** untuk layanan jasa titip (jastip) belanja bernama **Jastipin**, dites lewat **Expo Go**. Inti konversinya adalah kepercayaan: pelanggan membayar di muka untuk barang yang belum dipegang.

## Prinsip yang tidak boleh dilanggar

1. **Harus tetap jalan di Expo Go.** Jangan menambah modul native kustom yang butuh dev build (mis. paket dengan kode native di luar Expo SDK). Pakai paket dari Expo SDK, React Navigation, dan JS murni saja.
2. **Kunci versi ke satu Expo SDK.** Proyek ini di SDK 55. Kalau menambah paket, pakai `npx expo install <paket>` supaya versinya cocok dengan SDK, jangan `npm install` versi sembarang.
3. **Kepercayaan di atas segalanya.** Setiap fitur atau copy harus memperkuat transparansi harga, bukti proses, dan kemudahan kontak.
4. **Bahasa Indonesia natural** untuk semua teks pengguna. Tanpa em-dash.
5. **Satu sistem desain.** Token ada di `src/theme.js` (teal, aksen oranye, krem). Jangan hardcode warna di luar theme.
6. **Hormati safe area.** Layar tanpa header navigasi harus pakai `useSafeAreaInsets`. Layar di dalam stack memakai header bawaan.

## Alur kerja yang diharapkan

- Sebelum kerja kreatif, pahami dulu maksud perubahan, baru implementasi.
- Setelah mengubah kode, verifikasi bundle dengan `npx expo export --platform android` (harus sukses) sebelum menyatakan selesai.
- Commit kecil dan deskriptif.
- Jangan commit `node_modules/`, `dist/`, `.expo/`, atau folder native hasil prebuild.

## Detail lebih lanjut

- Konteks produk: `.kiro/steering/product.md`
- Tech stack dan konvensi: `.kiro/steering/tech.md`
- Peta struktur file: `.kiro/steering/structure.md`
