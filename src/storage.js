// Helper penyimpanan lokal sederhana di atas AsyncStorage.
// Semua nilai disimpan sebagai JSON. Kompatibel Expo Go.

import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadJSON(key, fallback = null) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw != null ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

export async function saveJSON(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

export async function removeKey(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

export const STORAGE_KEYS = {
  user: "jastipin.user",
  addresses: "jastipin.addresses",
  payments: "jastipin.payments",
  notifications: "jastipin.notifications",
  appSettings: "jastipin.app_settings",
};
