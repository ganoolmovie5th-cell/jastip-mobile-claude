# Jastipin Mobile

Aplikasi mobile untuk layanan **jasa titip (jastip)** belanja, dibangun dengan **Expo + React Native** dan siap dites di **Expo Go**. Konsep, alur, dan desainnya melanjutkan situs web Jastipin: pembeli menitipkan barang yang sulit didapat (skincare, fashion, gadget, snack impor), dengan penekanan utama pada kepercayaan dan transparansi.

## Cara menjalankan di Expo Go

> Penting: proyek ini memakai **Expo SDK 54** agar cocok dengan Expo Go versi 54.x di App Store / Play Store.

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan dev server (wajib pakai --go agar QR kompatibel Expo Go)
npx expo start --go

# 3. Scan QR code dengan:
#    - Android: aplikasi Expo Go
#    - iOS: aplikasi Kamera, lalu buka di Expo Go
```

Pastikan HP dan komputer berada di jaringan Wi-Fi yang sama. Kalau jaringannya bermasalah:

```bash
npx expo start --go --tunnel
```

## Fitur

Empat tab utama:

| Tab | Konten |
|-----|--------|
| **Beranda** | Sapaan personal, pencarian kategori real-time, hero, statistik, cara kerja, kategori populer, promo, testimoni |
| **Kategori** | Grid 2 kolom kategori (fashion, beauty, gadget, snack). Ketuk untuk detail barang & tombol titip |
| **Lacak** | Timeline status pesanan, pencarian by kode / nama barang, auto-update card saat search |
| **Profil** | Login Google, menu akun, toggle bahasa (ID/EN), toggle mode gelap/terang |

### Fitur akun (tab Profil)

- **Login Gmail (OAuth)** — via `WebBrowser.openAuthSessionAsync` dengan callback page di Vercel, tanpa proxy `auth.expo.io` yang deprecated di SDK 50+.
- **Pilih Bahasa** — toggle Indonesia / English. Teks tab, navigasi, beranda, profil, lacak, dan login ikut berganti. Preferensi tersimpan lokal.
- **Mode Gelap / Terang** — switch seluruh aplikasi antara light dan dark theme. Preferensi tersimpan lokal di AsyncStorage.
- **Pesanan saya** — daftar pesanan dengan filter status dan progress bar tahapan.
- **Alamat pengiriman** — tambah, ubah, hapus, dan pilih alamat utama. Tersimpan lokal.
- **Metode pembayaran** — kelola bank, e-wallet, virtual account, QRIS. Tersimpan lokal.
- **Bantuan & FAQ** — pencarian, filter kategori, tombol chat WhatsApp.
- **Tentang Jastipin** — profil layanan, nilai, statistik, dan tautan Website.

## Mengaktifkan login Gmail

Login Gmail memerlukan setup OAuth di Google Cloud Console dan satu halaman callback di Vercel.

### 1. Google Cloud Console

1. Buka [Google Cloud Console - Credentials](https://console.cloud.google.com/apis/credentials).
2. Buat **OAuth client ID** untuk tiga platform:
   - **Web** (dipakai Expo Go)
   - **Android** — package `id.jastipin.app` + SHA-1 debug key
   - **iOS** — bundle `id.jastipin.app`
3. Tempel client ID-nya di `src/auth/googleConfig.js`.
4. Di client **Web**, tambahkan **Authorized redirect URI**:
   ```
   https://jastip-claude.vercel.app/callback.html
   ```
5. Tambahkan email tester di **OAuth consent screen → Test users**.

### 2. Callback page (sudah tersedia)

File `callback.html` sudah ada di repo `jastip-claude` (Vercel) dan aktif di:
```
https://jastip-claude.vercel.app/callback.html
```
Tidak perlu setup tambahan selama Vercel auto-deploy dari branch main.

### 3. Cara kerja OAuth (tanpa proxy Expo)

```
App → Google OAuth (redirect_uri = Vercel callback)
         ↓ login berhasil
      jastip-claude.vercel.app/callback.html
         ↓ baca access_token dari URL hash
         ↓ redirect ke exp://IP:PORT?access_token=xxx
      Expo Go intercept exp:// URL
         ↓
      App → fetch profil Google → login selesai ✓
```

## Tech stack

| Komponen | Detail |
|----------|--------|
| Framework | Expo SDK 54, React Native 0.81, React 19.1 |
| Navigasi | React Navigation 7 (bottom tabs + native stack) |
| Ikon | `@expo/vector-icons` (Ionicons) |
| Auth | `expo-web-browser` + `expo-linking` (OAuth manual, tanpa proxy) |
| Storage | `@react-native-async-storage/async-storage` |
| Tema & i18n | `src/context/AppContext.js` (dark mode + bahasa ID/EN) |
| Bahasa | JavaScript murni (bukan TypeScript) |

## Struktur proyek

```
jastip-mobile-claude/
├── App.js                     # Root navigasi + AppNavigator (dark/light theme dinamis)
├── index.js                   # Entry point
├── app.json                   # Konfigurasi Expo (owner: ganoolmovie5th, scheme: jastipin)
├── docs/
│   └── callback.html          # Fallback callback page (GitHub Pages, opsional)
├── assets/                    # Ikon, splash, gambar produk
├── src/
│   ├── theme.js               # lightColors, darkColors, radius, spacing, shadow
│   ├── data.js                # Data mock (kategori, pesanan, FAQ, about links)
│   ├── storage.js             # Helper AsyncStorage (loadJSON, saveJSON, STORAGE_KEYS)
│   ├── whatsapp.js            # Helper deep link WhatsApp
│   ├── context/
│   │   └── AppContext.js      # Dark mode + bahasa (ID/EN) + terjemahan
│   ├── auth/
│   │   ├── AuthContext.js     # OAuth Google via WebBrowser langsung
│   │   └── googleConfig.js    # Client ID Google (isi di sini)
│   ├── store/
│   │   └── StoreContext.js    # State pesanan, alamat, pembayaran, notifikasi
│   ├── components/
│   │   ├── Button.js          # Tombol solid/ghost, dark-mode aware
│   │   └── SectionHeader.js   # Header seksi dengan aksi opsional
│   └── screens/
│       ├── HomeScreen.js          # Tab Beranda (search filter real-time)
│       ├── CategoriesScreen.js    # Tab Kategori (grid, fix gambar dengan Dimensions)
│       ├── CategoryDetailScreen.js
│       ├── TrackScreen.js         # Tab Lacak (auto-select saat search)
│       ├── ProfileScreen.js       # Tab Profil + toggle bahasa + toggle dark mode
│       ├── LoginScreen.js
│       ├── NotificationsScreen.js
│       ├── OrdersScreen.js
│       ├── OrderDetailScreen.js
│       ├── AddressScreen.js
│       ├── AddressFormScreen.js
│       ├── PaymentScreen.js
│       ├── HelpScreen.js
│       └── AboutScreen.js
```

## Yang perlu kamu ganti

| Lokasi | Nilai contoh | Ganti dengan |
|--------|--------------|--------------|
| `src/theme.js` → `WHATSAPP_NUMBER` | `6281200000000` | Nomor WhatsApp bisnis (`62...`) |
| `src/auth/googleConfig.js` | Client ID placeholder | Client ID dari Google Cloud Console |
| `src/data.js` | Kategori, barang, harga, pesanan | Data asli dari backend |

## Dark mode

Semua layar menggunakan pola `makeStyles(colors)` + `useMemo` sehingga warna berubah secara reaktif. Toggle ada di **tab Profil → Pengaturan**.

Token warna dark mode ada di `src/theme.js` sebagai `darkColors`.

## Catatan

- Semua data masih mock di `src/data.js`. Belum ada backend, keranjang, atau payment gateway.
- `StoreContext` punya simulator `setInterval(20 detik)` yang auto-advance pesanan aktif — ini sumber notifikasi yang muncul otomatis.
- Transaksi tetap lewat WhatsApp sampai ada backend.
- Untuk production, ganti OAuth ke EAS Build dengan native Google Sign-In.

## Pembersihan Kode / Ponytail Audit (Juni 2026)

Hapus over-engineering tanpa mengubah perilaku. Verifikasi `npx expo export --platform android` sukses ("Exported: dist"):
- Lepas dependency tak terpakai: `expo-auth-session`, `expo-crypto` (auth di-hand-roll pakai `WebBrowser`+`fetch`), `expo-dev-client` (workflow Expo Go).
- `App.js`: satukan `screenOpts` 3× → `makeScreenOpts(colors)`; buang key ICONS Inggris (`Home`/`Categories`/`Track`/`Profile`) yang tak match route Indonesia.
- `src/theme.js`: hapus alias mati `export const colors = lightColors` (0 importer; semua pakai `useAppTheme`).

## Dedup Komponen Pesanan (Juni 2026)

Timeline pengiriman & badge status yang sebelumnya disalin identik di `TrackScreen` dan `OrderDetailScreen` diekstrak jadi komponen reusable:
- `src/components/StatusBadge.js`
- `src/components/OrderTimeline.js`

Verifikasi: `npx expo export --platform android` sukses ("Exported: dist").

## Pembersihan Kode / Ponytail Audit (Juli 2026)

Merge efek storage yang tersebar. Verifikasi: `npx expo export --platform android` sukses.
- `src/store/StoreContext.js`: merge 3 `useEffect` terpisah (addresses, payments, notifications masing-masing trigger `saveJSON`) → 1 `useEffect` gabungan; ketiganya disimpan setiap ada perubahan salah satu
