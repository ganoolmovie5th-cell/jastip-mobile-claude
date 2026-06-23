# Tech Steering: Jastipin Mobile

## Stack

- **Expo SDK 55** (managed workflow), **React Native 0.83**, **React 19.2**.
- **React Navigation 7**: `@react-navigation/native`, `bottom-tabs`, `native-stack`, dengan `react-native-screens` dan `react-native-safe-area-context`.
- Ikon: `@expo/vector-icons` (Ionicons), ikut dengan paket `expo`.
- JavaScript murni (bukan TypeScript). Entry `index.js` -> `App.js`.

## Aturan kompatibilitas Expo Go (kritis)

- **Jangan tambah modul native kustom** yang butuh dev build. Hanya paket Expo SDK, React Navigation, dan JS murni.
- Tambah paket selalu dengan `npx expo install <paket>` agar versinya cocok dengan SDK 55. Jangan `npm install` versi bebas untuk paket ekosistem RN/Expo.
- Kalau perlu ganti SDK, ubah `expo` di `package.json`, lalu `npx expo install --fix` untuk menyelaraskan semua dependensi.

## Design system (sumber kebenaran: `src/theme.js`)

| Token | Nilai |
|-------|-------|
| `brand` | `#0f5c4a` (teal hijau) |
| `brandStrong` | `#0a4537` |
| `accent` | `#e8762f` (oranye, satu-satunya warna aksi) |
| `bg` | `#faf6ee` (krem) |
| `tint` | `#f1ece0` |
| `ink` | `#1b2420` (teks) |
| `muted` | `#5d6b63` (teks sekunder) |
| `radius` | sm 12, md 18, lg 24, pill 999 |

Aturan: satu warna aksen, satu sistem radius, jangan hardcode warna di komponen (ambil dari `theme.js`).

## Konvensi kode

- Komponen fungsional + hooks. `StyleSheet.create` per file, di bawah komponen.
- Layar di `src/screens`, komponen pakai-ulang di `src/components`, data contoh di `src/data.js`.
- Layar tanpa header (tab) wajib `useSafeAreaInsets` untuk padding atas. Layar dalam stack pakai header bawaan.
- Tombol titip/kontak memanggil `openWhatsApp()` dari `src/whatsapp.js`.

## Verifikasi sebelum selesai

Jalankan `npx expo export --platform android`. Harus selesai dengan "Exported: dist" tanpa error bundling. Ini membuktikan semua import dan aset valid sebelum dites di Expo Go.
