# Structure Steering: Jastipin Mobile

## Peta file

```
jastip-mobile-claude/
├── App.js                  # Root: AppProvider + AuthProvider + StoreProvider + AppNavigator
├── index.js                # registerRootComponent(App)
├── app.json                # Konfigurasi Expo (owner: ganoolmovie5th, slug: jastip-mobile-claude, scheme: jastipin)
├── babel.config.js
├── package.json
├── eas.json
├── docs/
│   └── callback.html       # Callback page (GitHub Pages fallback, tidak aktif)
├── assets/
│   ├── icon.png  adaptive-icon.png  splash.png  favicon.png
│   └── hero.jpg  beauty.jpg  fashion.jpg  gadget.jpg  snacks.jpg
└── src/
    ├── theme.js             # lightColors, darkColors, radius, spacing, shadow, WHATSAPP_NUMBER
    ├── data.js              # Data mock: kategori, steps, stats, pesanan, FAQ, about, helpers
    ├── storage.js           # loadJSON / saveJSON / removeKey + STORAGE_KEYS
    ├── whatsapp.js          # openWhatsApp(message)
    ├── context/
    │   └── AppContext.js    # useAppTheme() → { colors, isDarkMode, toggleDarkMode,
    │                        #   language, setLanguage, t(key,vars), ready }
    ├── auth/
    │   ├── AuthContext.js   # useAuth() → { user, isSignedIn, signingIn, signInWithGoogle, signOut }
    │   └── googleConfig.js  # GOOGLE_CLIENT_IDS (web, android, ios) — isi di sini
    ├── store/
    │   └── StoreContext.js  # useStore() → pesanan, alamat, pembayaran, notifikasi
    │                        # Simulator setInterval(20s) untuk advance pesanan aktif
    ├── components/
    │   ├── Button.js        # <Button label variant icon onPress style> — dark-mode aware
    │   └── SectionHeader.js # <SectionHeader title action onAction> — dark-mode aware
    └── screens/
        ├── HomeScreen.js           # Tab Beranda — search real-time filter kategori
        ├── CategoriesScreen.js     # Tab Kategori — grid 2 kolom, CARD_W dari Dimensions
        ├── CategoryDetailScreen.js # Detail kategori (push dari grid atau Beranda)
        ├── TrackScreen.js          # Tab Lacak — search auto-select card
        ├── ProfileScreen.js        # Tab Profil — menu + toggle bahasa + toggle dark mode
        ├── LoginScreen.js          # Login Google (dari ProfileStack)
        ├── NotificationsScreen.js  # Notifikasi (dari HomeStack)
        ├── OrdersScreen.js         # Pesanan saya
        ├── OrderDetailScreen.js    # Detail satu pesanan
        ├── AddressScreen.js        # Daftar alamat
        ├── AddressFormScreen.js    # Form tambah/ubah alamat
        ├── PaymentScreen.js        # Metode pembayaran
        ├── HelpScreen.js           # Bantuan & FAQ
        └── AboutScreen.js          # Tentang Jastipin
```

## Navigasi — `App.js`

```
AppProvider (dark mode + bahasa)
└── AuthProvider (sesi Google)
    └── StoreProvider (pesanan, alamat, notifikasi)
        └── AppNavigator
            └── Tab.Navigator
                ├── Beranda  → HomeStack
                │              ├── BerandaScreen (HomeScreen, headerShown: false)
                │              └── Notifications
                ├── Kategori → CategoriesStack
                │              ├── CategoriesList
                │              └── CategoryDetail
                ├── Lacak    → TrackScreen (tab langsung, bukan stack)
                └── Profil   → ProfileStack
                               ├── ProfileHome (ProfileScreen, headerShown: false)
                               ├── Login
                               ├── Orders → OrderDetail
                               ├── Address → AddressForm
                               ├── Payment
                               ├── Help
                               └── About
```

**Back button**: semua stack pakai `headerBackButtonDisplayMode: 'generic'` → selalu tampil "Back".  
**Judul header**: menggunakan `t('nav.xxx')` dari `useAppTheme()` agar mengikuti bahasa aktif.

## STORAGE_KEYS (AsyncStorage)

| Key | Isi |
|-----|-----|
| `jastipin.user` | Sesi login Google |
| `jastipin.addresses` | Daftar alamat pengiriman |
| `jastipin.payments` | Daftar metode pembayaran |
| `jastipin.notifications` | Notifikasi (max 50) |
| `jastipin.app_settings` | Dark mode + bahasa |

## Aturan menambah layar atau fitur

1. Layar baru taruh di `src/screens`, daftarkan di `App.js`.
2. Selalu gunakan pola `makeStyles(colors)` + `useMemo` agar dark mode bekerja.
3. Ambil warna dari `useAppTheme()`, jangan import `colors` dari `theme.js` langsung.
4. Teks yang user-facing wajib ditambahkan ke `AppContext.js` (strings ID + EN).
5. Data baru taruh di `src/data.js` sebagai mock sampai ada backend.
6. Pakai komponen `Button` dan `SectionHeader` yang ada agar konsisten.

## Titik konfigurasi penting

| Apa | Di mana |
|-----|---------|
| Nomor WhatsApp | `src/theme.js` → `WHATSAPP_NUMBER` |
| Client ID Google | `src/auth/googleConfig.js` |
| Callback OAuth URL | `src/auth/AuthContext.js` → `CALLBACK_URL` |
| Data kategori & pesanan | `src/data.js` |
| Nama app, ikon, splash | `app.json` |
| Terjemahan ID/EN | `src/context/AppContext.js` → objek `strings` |

## Yang tidak boleh di-commit

`node_modules/`, `dist/`, `.expo/`, `ios/`, `android/` (hasil prebuild), `.preview/`.

## Komponen Pesanan (Juni 2026 — dedup)

Dua komponen reusable diekstrak dari duplikasi byte-per-byte antara `TrackScreen` dan `OrderDetailScreen`:

- `src/components/StatusBadge.js` — `<StatusBadge status />`. Warna dari `orderStatusMeta` (bukan tema), jadi `StyleSheet` statis (aman dark/light).
- `src/components/OrderTimeline.js` — `<OrderTimeline timeline currentStep />`. Dark-mode aware via `makeStyles(colors)` + `useMemo`.

Jika butuh menampilkan badge status atau timeline pesanan di layar lain, pakai dua komponen ini, jangan menyalin ulang JSX/style-nya.
