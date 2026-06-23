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
  { id: "orders", label: "Pesanan saya", icon: "bag-handle-outline" },
  { id: "address", label: "Alamat pengiriman", icon: "location-outline" },
  { id: "payment", label: "Metode pembayaran", icon: "card-outline" },
  { id: "help", label: "Bantuan & FAQ", icon: "help-circle-outline" },
  { id: "about", label: "Tentang Jastipin", icon: "information-circle-outline" },
];

export function formatRupiah(n) {
  return "Rp" + n.toLocaleString("id-ID");
}
