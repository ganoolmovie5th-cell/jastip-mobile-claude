// Konfigurasi Google OAuth untuk login Gmail.
//
// Cara mengisi (gratis, lewat Google Cloud Console):
// 1. Buka https://console.cloud.google.com/apis/credentials
// 2. Buat OAuth client ID untuk tiap platform yang kamu pakai:
//    - Web client (dipakai Expo Go dan web)
//    - Android client (isi package id.jastipin.app + SHA-1)
//    - iOS client (isi bundle id.jastipin.app)
// 3. Tempel client ID-nya di bawah ini.
//
// Selama masih placeholder, tombol "Lanjut dengan Google" akan menampilkan
// pesan ramah bahwa OAuth belum dikonfigurasi (aplikasi tetap jalan di Expo Go).

export const GOOGLE_CLIENT_IDS = {
  // Web client dipakai untuk web build dan tes login lewat web.
  web: "524436876503-h0d7sj52jv84b4krpo0g4318hbbs5c59.apps.googleusercontent.com",
  android: "524436876503-2ml79rghoaqc8n9t5ofjcemntb9rpb5o.apps.googleusercontent.com",
  ios: "524436876503-q4gmv41p02sef3nk1rvtcoa91lfa8o34.apps.googleusercontent.com",
};

// True kalau minimal satu client ID sudah benar-benar diisi.
export function isGoogleConfigured() {
  return Object.values(GOOGLE_CLIENT_IDS).some(
    (v) => typeof v === "string" && v.length > 0 && !v.startsWith("YOUR_")
  );
}
