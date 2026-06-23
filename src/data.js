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

export const stats = [
  { label: "Negara asal", value: "38" },
  { label: "Pesanan", value: "52rb+" },
  { label: "Rating", value: "4,9" },
];

export const testimonial = {
  quote:
    "Pesan toner yang selalu sold out, dikabarin tiap tahap. Sampai dalam 9 hari, packing rapi banget.",
  name: "Rani Pratiwi",
  city: "Bandung",
  initials: "RP",
};

// Pesanan contoh untuk layar Lacak
export const sampleOrder = {
  code: "JTP-204815",
  item: "Serum hyaluronic + cushion compact",
  origin: "Seoul, Korea Selatan",
  eta: "2 hari lagi",
  currentStep: 3,
  timeline: [
    { id: 1, title: "Pesanan dikonfirmasi", date: "12 Jun, 09:20", done: true },
    { id: 2, title: "Dibelanjakan personal shopper", date: "12 Jun, 16:05", done: true },
    { id: 3, title: "Dikirim dari luar negeri", date: "14 Jun, 11:30", done: true },
    { id: 4, title: "Tiba di gudang Indonesia", date: "Estimasi 24 Jun", done: false },
    { id: 5, title: "Diantar ke alamat kamu", date: "Estimasi 25 Jun", done: false },
  ],
};

export const profileMenu = [
  { id: "orders", label: "Pesanan saya", icon: "bag-handle-outline", route: "Orders" },
  { id: "address", label: "Alamat pengiriman", icon: "location-outline", route: "Address" },
  { id: "payment", label: "Metode pembayaran", icon: "card-outline", route: "Payment" },
  { id: "help", label: "Bantuan & FAQ", icon: "help-circle-outline", route: "Help" },
  { id: "about", label: "Tentang Jastipin", icon: "information-circle-outline", route: "About" },
];

// Pesanan contoh untuk layar "Pesanan saya".
// Status: diproses | dikirim | selesai | dibatalkan
export const myOrders = [
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
    steps: 5,
    currentStep: 3,
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
    steps: 5,
    currentStep: 5,
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
    steps: 5,
    currentStep: 1,
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
    steps: 5,
    currentStep: 5,
  },
];

export const orderStatusMeta = {
  diproses: { label: "Diproses", color: "#e8762f", soft: "#fbeadd", icon: "time-outline" },
  dikirim: { label: "Dikirim", color: "#0f5c4a", soft: "#e4efe9", icon: "airplane-outline" },
  selesai: { label: "Selesai", color: "#2f7d4f", soft: "#e3f1e8", icon: "checkmark-done-outline" },
  dibatalkan: { label: "Dibatalkan", color: "#b3261e", soft: "#f7e2e0", icon: "close-circle-outline" },
};

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

// Tipe metode pembayaran yang bisa ditambahkan pengguna.
export const paymentTypes = [
  { id: "bank", label: "Transfer Bank", icon: "business-outline", hint: "BCA, Mandiri, BNI, BRI" },
  { id: "ewallet", label: "E-Wallet", icon: "wallet-outline", hint: "GoPay, OVO, Dana, ShopeePay" },
  { id: "va", label: "Virtual Account", icon: "card-outline", hint: "VA bank pilihan" },
  { id: "qris", label: "QRIS", icon: "qr-code-outline", hint: "Scan untuk bayar" },
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
    { id: "ig", label: "Instagram", icon: "logo-instagram", url: "https://instagram.com" },
    { id: "tiktok", label: "TikTok", icon: "logo-tiktok", url: "https://tiktok.com" },
    { id: "web", label: "Situs web", icon: "globe-outline", url: "https://jastipin.example" },
  ],
  version: "1.0.0",
};

export function formatRupiah(n) {
  return "Rp" + n.toLocaleString("id-ID");
}
