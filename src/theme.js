export const lightColors = {
  bg: "#faf6ee",
  surface: "#ffffff",
  tint: "#f1ece0",
  ink: "#1b2420",
  muted: "#5d6b63",
  line: "#e6ddcd",
  brand: "#0f5c4a",
  brandStrong: "#0a4537",
  brandSoft: "#e4efe9",
  accent: "#e8762f",
  accentStrong: "#cf6321",
  white: "#ffffff",
};

export const darkColors = {
  bg: "#111916",
  surface: "#182420",
  tint: "#1e2e29",
  ink: "#eeeae3",
  muted: "#7d9189",
  line: "#263530",
  brand: "#1fb789",
  brandStrong: "#19997a",
  brandSoft: "#162d26",
  accent: "#e8762f",
  accentStrong: "#cf6321",
  white: "#ffffff",
};

// Alias agar file yang belum dimigrasi tetap berjalan (selalu light)
export const colors = lightColors;

export const radius = {
  sm: 12,
  md: 18,
  lg: 24,
  pill: 999,
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
};

export const shadow = {
  card: {
    shadowColor: "#1b2420",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
};

// Ganti dengan nomor WhatsApp bisnis kamu (format internasional tanpa tanda +)
export const WHATSAPP_NUMBER = "6281200000000";
