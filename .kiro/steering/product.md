# Product Steering: Jastipin Mobile

## Inti produk

Aplikasi mobile Jastipin adalah versi genggam dari layanan jasa titip (jastip): pelanggan menitipkan pembelian barang kepada personal shopper, membayar harga barang plus biaya titip dan ongkir. Tujuan aplikasi: memudahkan pelanggan menjelajah kategori, memahami cara kerja, melacak pesanan, dan memulai titipan lewat WhatsApp.

## Konteks bisnis jastip

- Jastip populer di Indonesia untuk barang sulit didapat lokal: skincare/kosmetik Korea & Jepang, sneakers dan fashion rilisan terbatas, gadget belum rilis resmi, snack dan makanan impor.
- Pendapatan dari biaya titip (flat atau persentase) di atas harga barang, plus ongkir.
- Hambatan konversi terbesar adalah risiko kepercayaan — pelanggan bayar di muka.
- Pemain yang menang adalah yang paling transparan dan komunikatif.

## Siapa penggunanya

Pembeli Indonesia yang melek mobile, rela bayar premium untuk barang yang tidak tersedia lokal, tapi butuh bukti dan transparansi proses.

## Tujuan aplikasi

Mendorong pengguna membuka chat WhatsApp untuk mulai nitip, sambil membangun kepercayaan lewat:
1. Cara kerja yang jelas (empat langkah).
2. Kategori dengan contoh barang dan kisaran harga.
3. Pelacakan pesanan yang transparan.
4. Akses kontak yang gampang dari mana saja.

## Nada komunikasi

Hangat, jelas, meyakinkan, jujur. Bahasa Indonesia kasual-profesional. Hindari klaim berlebihan. Teks UI tersedia dalam dua bahasa (Indonesia default, English opsional).

## Sudah masuk cakupan (keputusan produk Jun 2026)

- **Login Gmail (OAuth)** lewat `WebBrowser.openAuthSessionAsync` dengan callback page di Vercel (`https://jastip-claude.vercel.app/callback.html`). Sesi disimpan lokal di AsyncStorage. Client ID diisi di `src/auth/googleConfig.js`. Tidak pakai proxy `auth.expo.io` (deprecated SDK 50+).
- **Pilih Bahasa (ID/EN)** — toggle di tab Profil, preferensi tersimpan lokal.
- **Mode Gelap/Terang** — switch di tab Profil, berlaku seluruh app, preferensi tersimpan lokal.
- **Pesanan saya**, **Alamat pengiriman** (CRUD + simpan lokal), **Metode pembayaran** (CRUD + simpan lokal), **Bantuan & FAQ**, dan **Tentang Jastipin** sudah jadi layar fungsional.
- **Notifikasi real-time** — disimulasikan lewat `StoreContext` dengan `setInterval(20 detik)` yang auto-advance pesanan aktif.
- **Tentang — sosial media**: Instagram dan TikTok dinonaktifkan (badge "Segera"), hanya Website aktif di `https://jastip-claude.vercel.app/`.

## Di luar cakupan (saat ini)

Belum ada keranjang, checkout, atau pemrosesan pembayaran nyata di dalam aplikasi. Metode pembayaran hanya disimpan sebagai preferensi. Data pesanan masih mock. Transaksi tetap lewat WhatsApp. Jangan menambah alur backend/pembayaran nyata tanpa keputusan produk yang jelas.
