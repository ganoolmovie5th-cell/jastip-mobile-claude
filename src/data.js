// Data contoh (mock). Ganti dengan data asli dari backend kamu.

export const categories = [
  {
    id: "fashion",
    name: "Fashion & Sneakers",
    blurb: "Rilisan terbatas, tas branded, koleksi sold out",
    image: require("../assets/fashion.jpg"),
    items: [
      { id: "f1", name: "Sneakers rilisan terbatas", origin: "Jepang", price: 2450000 },
      { id: "f2", name: "Tas kulit branded", origin: "Italia", price: 8900000 },
      { id: "f3", name: "Hoodie streetwear", origin: "Korea", price: 1150000 },
    ],
  },
  {
    id: "beauty",
    name: "Skincare & Beauty",
    blurb: "Produk Korea & Jepang langsung dari sumbernya",
    image: require("../assets/beauty.jpg"),
    items: [
      { id: "b1", name: "Serum hyaluronic", origin: "Korea", price: 350000 },
      { id: "b2", name: "Cushion compact", origin: "Korea", price: 420000 },
      { id: "b3", name: "Set sheet mask (10)", origin: "Jepang", price: 180000 },
    ],
  },
  {
    id: "gadget",
    name: "Gadget & Elektronik",
    blurb: "Earbuds, jam pintar, kamera belum rilis resmi",
    image: require("../assets/gadget.jpg"),
    items: [
      { id: "g1", name: "Wireless earbuds", origin: "Amerika", price: 3200000 },
      { id: "g2", name: "Jam pintar seri baru", origin: "Amerika", price: 6500000 },
      { id: "g3", name: "Kamera mirrorless", origin: "Jepang", price: 14900000 },
    ],
  },
  {
    id: "snacks",
    name: "Snack & Makanan",
    blurb: "Camilan dan oleh-oleh impor favorit",
    image: require("../assets/snacks.jpg"),
    items: [
      { id: "s1", name: "Paket cokelat matcha", origin: "Jepang", price: 240000 },
      { id: "s2", name: "Ramen instan premium (5)", origin: "Korea", price: 165000 },
      { id: "s3", name: "Biskuit & permen mix", origin: "Jepang", price: 210000 },
    ],
  },
];

export const steps = [
  { id: "1", title: "Kirim link atau foto", desc: "Tempel link produk atau foto barang lewat chat." },
  { id: "2", title: "Terima penawaran", desc: "Total harga, biaya titip, dan ongkir dalam Rupiah." },
  { id: "3", title: "Kami belanjakan", desc: "Personal shopper beli dan kirim bukti pembelian." },
  { id: "4", title: "Diantar ke rumah", desc: "Dikemas rapi dengan resi yang bisa dilacak." },
];

export const testimonial = {
  quote:
    "Pesan toner yang selalu sold out, dikabarin tiap tahap. Sampai dalam 9 hari, packing rapi banget.",
  name: "Rani Pratiwi",
  city: "Bandung",
  initials: "RP",
};

// Tahapan pesanan, dipakai bersama oleh layar "Pesanan saya" dan "Lacak".
export const ORDER_STAGES = [
  "Pesanan dikonfirmasi",
  "Dibelanjakan personal shopper",
  "Dikirim dari luar negeri",
  "Tiba di gudang Indonesia",
  "Diantar ke alamat kamu",
];

// Sumber data pesanan awal (di-seed ke StoreContext, lalu jadi state hidup).
// Status: diproses | dikirim | selesai | dibatalkan
// stageDates sejajar dengan ORDER_STAGES; status "done" dihitung dari currentStep.
export const seedOrders = [
  {
    id: "JTP-204815",
    item: "Serum hyaluronic + cushion compact",
    category: "Skincare & Beauty",
    origin: "Seoul, Korea Selatan",
    date: "12 Jun 2026",
    status: "dikirim",
    itemPrice: 770000,
    serviceFee: 75000,
    shipping: 95000,
    currentStep: 3,
    eta: "2 hari lagi",
    stageDates: ["12 Jun, 09:20", "12 Jun, 16:05", "14 Jun, 11:30", "Estimasi 24 Jun", "Estimasi 25 Jun"],
  },
  {
    id: "JTP-203190",
    item: "Sneakers rilisan terbatas",
    category: "Fashion & Sneakers",
    origin: "Tokyo, Jepang",
    date: "28 Mei 2026",
    status: "selesai",
    itemPrice: 2450000,
    serviceFee: 180000,
    shipping: 210000,
    currentStep: 5,
    eta: null,
    stageDates: ["26 Mei, 10:00", "26 Mei, 18:20", "28 Mei, 09:15", "1 Jun, 14:40", "4 Jun, 11:05"],
  },
  {
    id: "JTP-205622",
    item: "Wireless earbuds",
    category: "Gadget & Elektronik",
    origin: "California, Amerika",
    date: "20 Jun 2026",
    status: "diproses",
    itemPrice: 3200000,
    serviceFee: 220000,
    shipping: 240000,
    currentStep: 1,
    eta: "Sedang diproses",
    stageDates: ["20 Jun, 10:15", "Estimasi 22 Jun", "Estimasi 25 Jun", "Estimasi 2 Jul", "Estimasi 4 Jul"],
  },
  {
    id: "JTP-201044",
    item: "Paket cokelat matcha",
    category: "Snack & Makanan",
    origin: "Kyoto, Jepang",
    date: "3 Mei 2026",
    status: "selesai",
    itemPrice: 240000,
    serviceFee: 35000,
    shipping: 80000,
    currentStep: 5,
    eta: null,
    stageDates: ["3 Mei, 08:30", "3 Mei, 15:10", "5 Mei, 12:00", "9 Mei, 16:25", "11 Mei, 10:40"],
  },
];

export const orderStatusMeta = {
  diproses: { label: "Diproses", color: "#e8762f", soft: "#fbeadd", icon: "time-outline" },
  dikirim: { label: "Dikirim", color: "#0f5c4a", soft: "#e4efe9", icon: "airplane-outline" },
  selesai: { label: "Selesai", color: "#2f7d4f", soft: "#e3f1e8", icon: "checkmark-done-outline" },
  dibatalkan: { label: "Dibatalkan", color: "#b3261e", soft: "#f7e2e0", icon: "close-circle-outline" },
};

// Total tahapan (dipakai progress bar di "Pesanan saya" dan timeline di "Lacak").
export const ORDER_TOTAL_STEPS = ORDER_STAGES.length;

// Alamat awal (contoh). Pengguna bisa tambah / ubah / hapus, tersimpan di perangkat.
export const seedAddresses = [
  {
    id: "addr-1",
    label: "Rumah",
    recipient: "Tukang Boong",
    phone: "081200000000",
    detail: "Jl. Melati No. 12, RT 03 / RW 05",
    city: "Bandung",
    province: "Jawa Barat",
    postal: "40123",
    isDefault: true,
  },
];

// Metode pembayaran awal (contoh).
export const seedPayments = [
  { id: "pay-1", type: "bank", title: "BCA", subtitle: "a.n. Tukang Boong", number: "1234567890", isDefault: true },
  { id: "pay-2", type: "ewallet", title: "GoPay", subtitle: "Terhubung", number: "0812-0000-0000", isDefault: false },
];

export const faqs = [
  {
    id: "f1",
    cat: "Umum",
    q: "Apa itu jasa titip (jastip)?",
    a: "Jastip adalah layanan menitipkan pembelian barang ke personal shopper. Kamu kirim link atau foto barang, kami belanjakan, lalu kirim sampai ke rumah. Cocok untuk barang impor yang sulit didapat di Indonesia.",
  },
  {
    id: "f2",
    cat: "Biaya",
    q: "Bagaimana hitungan biayanya?",
    a: "Total = harga barang + biaya titip + ongkir. Biaya titip bisa flat atau persentase, dan semuanya kami sampaikan transparan dalam Rupiah sebelum kamu setuju.",
  },
  {
    id: "f3",
    cat: "Pembayaran",
    q: "Kenapa harus bayar di muka?",
    a: "Karena personal shopper membelanjakan uang kamu lebih dulu di luar negeri. Kami kirim bukti pembelian tiap tahap supaya kamu tenang dan bisa pantau prosesnya.",
  },
  {
    id: "f4",
    cat: "Pengiriman",
    q: "Berapa lama barang sampai?",
    a: "Tergantung negara asal dan jenis barang, umumnya 7 sampai 21 hari. Kamu bisa pantau status di tab Lacak, dari dikonfirmasi sampai diantar.",
  },
  {
    id: "f5",
    cat: "Pengiriman",
    q: "Bisa lacak pesanan saya?",
    a: "Bisa. Buka tab Lacak atau menu Pesanan saya untuk melihat timeline tiap tahap beserta estimasi tibanya.",
  },
  {
    id: "f6",
    cat: "Pembayaran",
    q: "Metode pembayaran apa saja yang didukung?",
    a: "Transfer bank, e-wallet (GoPay, OVO, Dana, ShopeePay), virtual account, dan QRIS. Atur di menu Metode pembayaran.",
  },
  {
    id: "f7",
    cat: "Umum",
    q: "Bagaimana kalau barang tidak sesuai?",
    a: "Hubungi kami lewat WhatsApp secepatnya. Kami bantu cek bukti pembelian dan cari solusi terbaik bersama personal shopper.",
  },
];

export const aboutContent = {
  tagline: "Titip barang impor favoritmu, tanpa ribet.",
  description:
    "Jastipin menghubungkan kamu dengan personal shopper tepercaya untuk membeli barang yang sulit didapat di Indonesia: skincare Korea/Jepang, sneakers rilisan terbatas, gadget belum rilis resmi, sampai snack impor. Fokus kami satu: transparan dan bisa dipercaya.",
  values: [
    { icon: "shield-checkmark-outline", title: "Transparan", desc: "Harga, biaya titip, dan ongkir jelas sejak awal." },
    { icon: "chatbubbles-outline", title: "Komunikatif", desc: "Update tiap tahap, dari belanja sampai diantar." },
    { icon: "ribbon-outline", title: "Tepercaya", desc: "Bukti pembelian nyata untuk tiap pesanan." },
  ],
  stats: [
    { label: "Negara asal", value: "38" },
    { label: "Pesanan", value: "52rb+" },
    { label: "Rating", value: "4,9" },
  ],
  links: [
    { id: "ig", label: "Instagram", icon: "logo-instagram", url: "https://instagram.com", disabled: true },
    { id: "tiktok", label: "TikTok", icon: "logo-tiktok", url: "https://tiktok.com", disabled: true },
    { id: "web", label: "Website", icon: "globe-outline", url: "https://jastip-in.web.id/" },
  ],
  version: "1.0.0",
};

export const formatRupiah = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

// Notifikasi awal (contoh), nyambung dengan data pesanan di seedOrders.
const _now = Date.now();
const _min = 60 * 1000;
const _day = 24 * 60 * _min;
export const seedNotifications = [
  {
    id: "n1",
    orderId: "JTP-205622",
    read: false,
    icon: "time-outline",
    title: "Pesanan sedang diproses",
    time: "Baru saja",
    ts: _now - 2 * _min,
    body: "JTP-205622 (Wireless earbuds) sedang kami siapkan. Kami kabari di tiap tahap.",
  },
  {
    id: "n2",
    orderId: "JTP-204815",
    read: false,
    icon: "airplane-outline",
    title: "Pesanan dikirim dari luar negeri",
    time: "2 hari lalu",
    ts: _now - 2 * _day,
    body: "JTP-204815 sudah dikirim dari Seoul. Estimasi tiba di gudang Indonesia 24 Jun.",
  },
  {
    id: "n3",
    orderId: "JTP-203190",
    read: true,
    icon: "checkmark-done-outline",
    title: "Pesanan selesai",
    time: "4 Jun",
    ts: _now - 19 * _day,
    body: "JTP-203190 (Sneakers rilisan terbatas) sudah diterima. Terima kasih sudah nitip!",
  },
  {
    id: "n4",
    orderId: null,
    read: true,
    icon: "pricetag-outline",
    title: "Promo ongkir hemat",
    time: "1 Mei",
    ts: _now - 53 * _day,
    body: "Diskon ongkir 20% untuk titipan dari Jepang & Korea sepanjang bulan ini.",
  },
];
