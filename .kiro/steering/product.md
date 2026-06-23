# Product Steering: Jastipin Mobile

## Inti produk

Aplikasi mobile Jastipin adalah versi genggam dari layanan jasa titip (jastip): pelanggan menitipkan pembelian barang kepada personal shopper, membayar harga barang plus biaya titip dan ongkir. Tujuan aplikasi: memudahkan pelanggan menjelajah kategori, memahami cara kerja, melacak pesanan, dan memulai titipan lewat WhatsApp.

## Konteks bisnis jastip (hasil riset)

- Jastip populer di Indonesia untuk barang sulit didapat lokal: skincare dan kosmetik Korea/Jepang, sneakers dan fashion rilisan terbatas, gadget belum rilis resmi, snack dan makanan impor.
- Pendapatan dari biaya titip (flat atau persentase per barang) di atas harga barang, plus ongkir.
- Hambatan konversi terbesar adalah risiko kepercayaan, karena pelanggan bayar di muka.
- Pemain yang menang adalah yang paling transparan dan komunikatif (update tiap tahap).

## Siapa penggunanya

- Pembeli Indonesia yang melek mobile dan banyak transaksi lewat ponsel.
- Rela bayar premium untuk barang yang tidak tersedia di sini, tapi hati-hati dan butuh bukti.

## Tujuan aplikasi

Mendorong pengguna membuka chat WhatsApp untuk mulai nitip, sambil membangun kepercayaan lewat:
1. Cara kerja yang jelas (empat langkah).
2. Kategori dengan contoh barang dan kisaran harga.
3. Pelacakan pesanan yang transparan.
4. Akses kontak yang gampang dari mana saja.

## Nada komunikasi

Hangat, jelas, meyakinkan, jujur. Bahasa Indonesia kasual-profesional. Hindari klaim berlebihan.

## Sudah masuk cakupan (keputusan produk Jun 2026)

- **Login Gmail (OAuth)** lewat `expo-auth-session`, kompatibel Expo Go, tanpa modul native kustom. Sesi disimpan lokal di AsyncStorage. Client ID diisi di `src/auth/googleConfig.js`.
- **Pesanan saya**, **Alamat pengiriman** (CRUD + simpan lokal), **Metode pembayaran** (CRUD + simpan lokal), **Bantuan & FAQ**, dan **Tentang Jastipin** sudah jadi layar fungsional, bukan lagi placeholder.

## Di luar cakupan (saat ini)

Belum ada keranjang, checkout, atau pemrosesan pembayaran nyata (gateway) di dalam aplikasi. Metode pembayaran hanya disimpan sebagai preferensi pengguna. Data pesanan masih contoh. Transaksi tetap terjadi lewat WhatsApp. Jangan menambah alur backend/pembayaran nyata tanpa keputusan produk yang jelas.
