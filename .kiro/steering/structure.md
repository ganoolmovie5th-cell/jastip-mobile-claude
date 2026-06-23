# Structure Steering: Jastipin Mobile

## Peta file

```
jastip-mobile-claude/
├── App.js                  # Root: SafeAreaProvider + NavigationContainer + Tab.Navigator
├── index.js                # registerRootComponent(App)
├── app.json                # Konfigurasi Expo (nama, slug, ikon, splash, bundle id)
├── babel.config.js         # preset babel-preset-expo
├── package.json            # Dependensi terkunci ke SDK 55
├── assets/
│   ├── icon.png            # Ikon aplikasi (parcel mark di kotak teal)
│   ├── adaptive-icon.png   # Ikon adaptif Android (sama dengan icon)
│   ├── splash.png          # Splash (logo + wordmark di latar teal)
│   ├── favicon.png         # Favicon web
│   └── hero/beauty/fashion/gadget/snacks.jpg  # Gambar produk
├── src/
│   ├── theme.js            # Token desain + WHATSAPP_NUMBER
│   ├── data.js             # Data contoh + formatRupiah()
│   ├── whatsapp.js         # openWhatsApp(message)
│   ├── components/
│   │   ├── Button.js       # Tombol solid/ghost dengan ikon opsional
│   │   └── SectionHeader.js
│   └── screens/
│       ├── HomeScreen.js           # Tab Beranda
│       ├── CategoriesScreen.js     # Tab Kategori (grid)
│       ├── CategoryDetailScreen.js # Detail kategori (push dari grid/Home)
│       ├── TrackScreen.js          # Tab Lacak (timeline pesanan)
│       └── ProfileScreen.js        # Tab Profil
├── README.md
├── AGENTS.md / CLAUDE.md
└── .kiro/steering/         # product.md, tech.md, structure.md
```

## Navigasi

- **Tab bawah**: Beranda, Kategori, Lacak, Profil (ikon Ionicons, aktif/non-aktif).
- Tab **Kategori** berisi native stack: `CategoriesList` -> `CategoryDetail`.
- Dari Beranda, ketuk kategori akan `navigate("Kategori", { screen: "CategoryDetail", params })`.

## Aturan menambah layar atau fitur

- Layar baru taruh di `src/screens`, daftarkan di `App.js` (tab atau stack yang sesuai).
- Pakai komponen `Button` dan `SectionHeader` yang ada agar konsisten.
- Ambil warna/ukuran dari `src/theme.js`, jangan hardcode.
- Data baru taruh di `src/data.js` sebagai mock sampai ada backend.
- Layar scroll panjang pakai `ScrollView`/`FlatList` dengan `showsVerticalScrollIndicator={false}` dan padding bawah yang cukup.

## Yang tidak boleh di-commit

- `node_modules/`, `dist/`, `.expo/`, folder `ios/` dan `android/` hasil prebuild.
- File QA sementara (`.preview/`) dan file sistem.

## Titik konfigurasi penting

- Nomor WhatsApp: `src/theme.js` (`WHATSAPP_NUMBER`).
- Data kategori, barang, pesanan, testimoni: `src/data.js`.
- Nama aplikasi, ikon, splash, bundle id: `app.json`.
