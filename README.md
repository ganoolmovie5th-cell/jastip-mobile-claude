# Jastipin Mobile

Aplikasi mobile untuk layanan jasa titip (jastip) belanja. Versi mobile dari situs web Jastipin, dengan penekanan pada kepercayaan dan transparansi.

**Tech Stack:** React Native · Expo SDK 54 · React Navigation 7 · AsyncStorage

## Features

- 4 tab utama: Beranda, Kategori, Lacak, Profil
- Pencarian kategori real-time
- Grid kategori (fashion, beauty, gadget, snack)
- Timeline status pesanan + pencarian by kode/nama
- Login Google (OAuth via WebBrowser, tanpa proxy Expo)
- Toggle bahasa (ID/EN)
- Dark/Light mode
- Pesanan saya (filter status, progress bar)
- Alamat pengiriman (CRUD, tersimpan lokal)
- Metode pembayaran (bank, e-wallet, VA, QRIS)
- Bantuan & FAQ
- Notifikasi otomatis (simulasi advance pesanan)

## Getting Started

```bash
npm install
npx expo start --go
```

Scan QR code dengan Expo Go. Pastikan HP dan komputer di Wi-Fi yang sama.

## Project Structure

```
src/
  theme.js              → Warna, spacing, radius (light + dark)
  data.js               → Data mock (kategori, pesanan, FAQ)
  context/
    AppContext.js           Dark mode + bahasa (ID/EN)
  auth/
    AuthContext.js          OAuth Google via WebBrowser
    googleConfig.js         Client ID Google
  store/
    StoreContext.js         State pesanan, alamat, pembayaran
  components/           → Button, SectionHeader, StatusBadge, OrderTimeline
  screens/
    HomeScreen.js           Tab Beranda
    CategoriesScreen.js     Tab Kategori
    TrackScreen.js          Tab Lacak
    ProfileScreen.js        Tab Profil
    LoginScreen.js          Login Google
    OrdersScreen.js         Daftar pesanan
    AddressScreen.js        Kelola alamat
    PaymentScreen.js        Kelola pembayaran
    HelpScreen.js           FAQ
    AboutScreen.js          Tentang Jastipin
```

## Testing

```bash
npx expo export --platform android
```

## License

MIT
