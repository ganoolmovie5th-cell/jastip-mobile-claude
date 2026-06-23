// Konteks global untuk tema (light/dark) dan bahasa (ID/EN).
// Preferensi disimpan lokal di AsyncStorage agar persisten antar sesi.

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { loadJSON, saveJSON, STORAGE_KEYS } from "../storage";
import { lightColors, darkColors } from "../theme";

// ---------------------------------------------------------------------------
// Teks terjemahan
// ---------------------------------------------------------------------------
const strings = {
  id: {
    // Tab
    "tab.home": "Beranda",
    "tab.categories": "Kategori",
    "tab.track": "Lacak",
    "tab.profile": "Profil",
    // Navigasi
    "nav.notifications": "Notifikasi",
    "nav.categories": "Kategori",
    "nav.orders": "Pesanan saya",
    "nav.order_detail": "Detail pesanan",
    "nav.address": "Alamat pengiriman",
    "nav.address_form": "Alamat",
    "nav.payment": "Metode pembayaran",
    "nav.help": "Bantuan & FAQ",
    "nav.about": "Tentang Jastipin",
    "nav.login": "Masuk",
    // Beranda
    "home.greeting_guest": "Mau titip apa hari ini?",
    "home.greeting": "Halo, {{name}} \uD83D\uDC4B",
    "home.search_placeholder": "Cari barang atau tempel link toko",
    "home.signin_title": "Masuk biar lebih cepat",
    "home.signin_desc": "Simpan pesanan, alamat, dan pembayaran otomatis.",
    "home.google_btn": "Lanjut dengan Google",
    "home.how_it_works": "Cara kerja",
    "home.popular_categories": "Kategori populer",
    "home.see_all": "Lihat semua",
    "home.promo_title": "Ada barang incaran?",
    "home.promo_sub": "Chat kami, dapatkan rincian harga tanpa komitmen.",
    "home.chat_btn": "Chat",
    "home.no_results": "Tidak ada kategori yang cocok.",
    "home.hero_btn": "Mulai Nitip",
    // Profil
    "profile.title": "Profil",
    "profile.guest_name": "Tamu Jastipin",
    "profile.guest_hint": "Masuk untuk simpan pesanan",
    "profile.signin_btn": "Masuk",
    "profile.signout_title": "Keluar",
    "profile.signout_msg": "Yakin mau keluar dari akun?",
    "profile.signout_cancel": "Batal",
    "profile.signout_confirm": "Keluar",
    "profile.whatsapp_btn": "Hubungi kami di WhatsApp",
    "profile.settings_title": "Pengaturan",
    "profile.dark_mode": "Mode gelap",
    "profile.language": "Bahasa",
    "profile.version": "Jastipin v1.0.0",
    // Menu profil
    "menu.orders": "Pesanan saya",
    "menu.address": "Alamat pengiriman",
    "menu.payment": "Metode pembayaran",
    "menu.help": "Bantuan & FAQ",
    "menu.about": "Tentang Jastipin",
    // Lacak
    "track.title": "Lacak pesanan",
    "track.placeholder": "Cari kode atau nama barang",
    "track.not_found": "Pesanan tidak ditemukan.",
    "track.total": "Total pesanan",
    "track.hint": "Data ini sama dengan menu Pesanan saya. Pilih kode di atas untuk melihat timeline pesanan lain.",
    // Login
    "login.title": "Masuk ke Jastipin",
    "login.sub": "Masuk pakai akun Google biar pesanan, alamat, dan pembayaranmu tersimpan aman.",
    "login.perk1": "Simpan dan lacak semua pesananmu",
    "login.perk2": "Alamat pengiriman tersimpan otomatis",
    "login.perk3": "Metode pembayaran lebih cepat",
    "login.google_btn": "Lanjut dengan Google",
    "login.note": "Dengan masuk, kamu setuju dengan ketentuan layanan dan kebijakan privasi Jastipin.",
  },
  en: {
    // Tab
    "tab.home": "Home",
    "tab.categories": "Categories",
    "tab.track": "Track",
    "tab.profile": "Profile",
    // Navigasi
    "nav.notifications": "Notifications",
    "nav.categories": "Categories",
    "nav.orders": "My Orders",
    "nav.order_detail": "Order Details",
    "nav.address": "Delivery Address",
    "nav.address_form": "Address",
    "nav.payment": "Payment Methods",
    "nav.help": "Help & FAQ",
    "nav.about": "About Jastipin",
    "nav.login": "Sign In",
    // Beranda
    "home.greeting_guest": "What do you want today?",
    "home.greeting": "Hi, {{name}} \uD83D\uDC4B",
    "home.search_placeholder": "Search items or paste a store link",
    "home.signin_title": "Sign in for faster checkout",
    "home.signin_desc": "Save orders, addresses, and payment methods automatically.",
    "home.google_btn": "Continue with Google",
    "home.how_it_works": "How it works",
    "home.popular_categories": "Popular categories",
    "home.see_all": "See all",
    "home.promo_title": "Got something in mind?",
    "home.promo_sub": "Chat us for a price breakdown with no commitment.",
    "home.chat_btn": "Chat",
    "home.no_results": "No matching categories.",
    "home.hero_btn": "Start Shopping",
    // Profil
    "profile.title": "Profile",
    "profile.guest_name": "Jastipin Guest",
    "profile.guest_hint": "Sign in to save orders",
    "profile.signin_btn": "Sign In",
    "profile.signout_title": "Sign Out",
    "profile.signout_msg": "Are you sure you want to sign out?",
    "profile.signout_cancel": "Cancel",
    "profile.signout_confirm": "Sign Out",
    "profile.whatsapp_btn": "Contact us on WhatsApp",
    "profile.settings_title": "Settings",
    "profile.dark_mode": "Dark mode",
    "profile.language": "Language",
    "profile.version": "Jastipin v1.0.0",
    // Menu profil
    "menu.orders": "My Orders",
    "menu.address": "Delivery Address",
    "menu.payment": "Payment Methods",
    "menu.help": "Help & FAQ",
    "menu.about": "About Jastipin",
    // Lacak
    "track.title": "Track Orders",
    "track.placeholder": "Search by code or item name",
    "track.not_found": "Order not found.",
    "track.total": "Order total",
    "track.hint": "Same data as My Orders. Select a code above to view another order's timeline.",
    // Login
    "login.title": "Sign in to Jastipin",
    "login.sub": "Sign in with Google to keep your orders, addresses, and payments safe.",
    "login.perk1": "Save and track all your orders",
    "login.perk2": "Delivery addresses saved automatically",
    "login.perk3": "Faster checkout with saved payment methods",
    "login.google_btn": "Continue with Google",
    "login.note": "By signing in, you agree to Jastipin's terms of service and privacy policy.",
  },
};

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguageState] = useState("id");
  const [ready, setReady] = useState(false);

  // Muat preferensi tersimpan saat pertama buka
  useEffect(() => {
    (async () => {
      const saved = await loadJSON(STORAGE_KEYS.appSettings, null);
      if (saved) {
        setIsDarkMode(!!saved.isDarkMode);
        setLanguageState(saved.language === "en" ? "en" : "id");
      }
      setReady(true);
    })();
  }, []);

  const persist = useCallback(async (dark, lang) => {
    await saveJSON(STORAGE_KEYS.appSettings, { isDarkMode: dark, language: lang });
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      persist(next, language);
      return next;
    });
  }, [language, persist]);

  const setLanguage = useCallback(
    (lang) => {
      setLanguageState(lang);
      persist(isDarkMode, lang);
    },
    [isDarkMode, persist]
  );

  // Fungsi terjemahan dengan dukungan variabel {{key}}
  const t = useCallback(
    (key, vars = {}) => {
      let str = strings[language]?.[key] ?? strings.id[key] ?? key;
      Object.entries(vars).forEach(([k, v]) => {
        str = str.replace(`{{${k}}}`, String(v));
      });
      return str;
    },
    [language]
  );

  const colors = useMemo(() => (isDarkMode ? darkColors : lightColors), [isDarkMode]);

  const value = useMemo(
    () => ({ isDarkMode, toggleDarkMode, language, setLanguage, colors, t, ready }),
    [isDarkMode, toggleDarkMode, language, setLanguage, colors, t, ready]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppTheme() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppTheme harus dipakai di dalam AppProvider");
  return ctx;
}
