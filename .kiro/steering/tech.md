# Tech Steering: Jastipin Mobile

## Stack

- **Expo SDK 54** (managed workflow), **React Native 0.81**, **React 19.1**.
- **React Navigation 7**: `@react-navigation/native`, `bottom-tabs`, `native-stack`.
- Ikon: `@expo/vector-icons` (Ionicons).
- Auth: `expo-web-browser` + `expo-linking` (OAuth manual tanpa proxy).
- Storage: `@react-native-async-storage/async-storage`.
- JavaScript murni (bukan TypeScript). Entry `index.js` → `App.js`.

## Aturan kompatibilitas Expo Go (kritis)

- **Jangan tambah modul native kustom** yang butuh dev build.
- Tambah paket selalu dengan `npx expo install <paket>`, bukan `npm install` bebas.
- Kunci ke SDK 54. Untuk ganti SDK: ubah `expo` di `package.json`, lalu `npx expo install --fix`.
- Jalankan dengan `npx expo start --go` (bukan `npx expo start` biasa) agar QR code kompatibel.

## Design system — `src/theme.js`

### Light mode (`lightColors`)

| Token | Nilai |
|-------|-------|
| `brand` | `#0f5c4a` (teal hijau) |
| `brandStrong` | `#0a4537` |
| `brandSoft` | `#e4efe9` |
| `accent` | `#e8762f` (oranye, satu-satunya warna aksi) |
| `bg` | `#faf6ee` (krem) |
| `surface` | `#ffffff` |
| `tint` | `#f1ece0` |
| `ink` | `#1b2420` (teks) |
| `muted` | `#5d6b63` (teks sekunder) |
| `line` | `#e6ddcd` |

### Dark mode (`darkColors`)

| Token | Nilai |
|-------|-------|
| `bg` | `#111916` |
| `surface` | `#182420` |
| `tint` | `#1e2e29` |
| `ink` | `#eeeae3` |
| `muted` | `#7d9189` |
| `line` | `#263530` |
| `brand` | `#1fb789` |
| `brandSoft` | `#162d26` |
| `accent` | `#e8762f` (sama) |

**Aturan**: jangan hardcode warna di komponen. Selalu ambil dari `useAppTheme()` (bukan import langsung dari `theme.js`).

## AppContext — `src/context/AppContext.js`

Context global untuk dark mode dan bahasa. Wajib dipakai di semua komponen yang butuh warna atau teks terjemahan.

```js
const { colors, isDarkMode, toggleDarkMode, language, setLanguage, t } = useAppTheme();
```

- `colors` — objek warna aktif (light atau dark)
- `t(key, vars)` — fungsi terjemahan ID/EN
- Preferensi disimpan di `AsyncStorage` key `jastipin.app_settings`

## Pola dark mode di komponen/layar

Semua layar menggunakan pola `makeStyles(colors)` + `useMemo`:

```js
// Di luar komponen:
function makeStyles(colors) {
  return StyleSheet.create({
    container: { backgroundColor: colors.bg },
    text: { color: colors.ink },
    // ...
  });
}

// Di dalam komponen:
const { colors } = useAppTheme();
const styles = useMemo(() => makeStyles(colors), [colors]);
```

Jangan buat `StyleSheet.create` di level modul (statis) kalau file tersebut perlu dark mode.

## Navigasi — `App.js`

- **Semua stack** punya `headerBackButtonDisplayMode: 'generic'` di `screenOptions` → back button selalu tampil "Back" (iOS).
- Judul navigasi menggunakan `t('nav.xxx')` dari `useAppTheme()` agar mengikuti bahasa aktif.
- Warna tab bar dan header mengikuti `colors` dari `AppContext` secara reaktif.

## Auth Google — `src/auth/AuthContext.js`

OAuth tanpa proxy `auth.expo.io`:
1. App generate `appUrl = Linking.createURL("")` (= `exp://IP:PORT` di Expo Go).
2. Buka Google OAuth dengan `redirectUri = https://jastip-claude.vercel.app/callback.html` dan `state = appUrl`.
3. Callback page membaca `access_token` dari hash, redirect ke `appUrl?access_token=xxx`.
4. `WebBrowser.openAuthSessionAsync` memonitor `appUrl` dan intercept redirect.
5. App ekstrak token, fetch profil via `https://www.googleapis.com/userinfo/v2/me`.

**Client ID yang dipakai**: selalu `GOOGLE_CLIENT_IDS.web` (bukan iOS/Android) karena redirect URI adalah HTTPS.

## Konvensi kode

- Komponen fungsional + hooks.
- Layar di `src/screens`, komponen reusable di `src/components`, data mock di `src/data.js`, context di `src/context/`.
- Layar tanpa header (tab root) wajib `useSafeAreaInsets` untuk padding atas.
- Tombol titip/kontak memanggil `openWhatsApp()` dari `src/whatsapp.js`.

## Verifikasi sebelum selesai

```bash
npx expo export --platform android
```

Harus selesai dengan "Exported: dist" tanpa error bundling.

## Pembersihan Kode / Ponytail Audit (Juni 2026)

Audit over-engineering — penghapusan aman, verifikasi `npx expo export --platform android` sukses:
- **Dependency dihapus** (`package.json`): `expo-auth-session`, `expo-crypto` (auth di-hand-roll via `WebBrowser`+`fetch`, bukan AuthSession), `expo-dev-client` (tidak relevan untuk Expo Go `--go`). Jangan tambahkan kembali kecuali pindah ke dev build.
- **`App.js`**: tiga objek `screenOpts` identik di HomeStack/CategoriesStack/ProfileStack → satu helper `makeScreenOpts(colors)`. Key ICONS Inggris (`Home`/`Categories`/`Track`/`Profile`) tak pernah match karena route bernama Indonesia (`Beranda`/`Kategori`/`Lacak`/`Profil`) → dihapus.
- **`src/theme.js`**: `export const colors = lightColors` (alias dark-mode-unaware) 0 importer → dihapus. Semua komponen ambil warna dari `useAppTheme()`.
