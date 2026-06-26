// Auth context: login Gmail lewat OAuth, kompatibel Expo Go SDK 50+.
// Menggunakan WebBrowser.openAuthSessionAsync langsung (tanpa proxy auth.expo.io
// yang sudah deprecated) dengan callback page di Vercel.

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { GOOGLE_CLIENT_IDS, isGoogleConfigured } from "./googleConfig";
import { loadJSON, saveJSON, removeKey, STORAGE_KEYS } from "../storage";

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext(null);

// Callback page di Vercel — HARUS didaftarkan persis seperti ini di Google Cloud
// Console → Credentials → Web Application → Authorized redirect URIs.
// Catatan: pakai domain Vercel yang melayani 200 langsung. Jangan pakai
// https://jastip-in.web.id/callback.html karena domain apex itu 308-redirect ke
// www, dan in-app browser bisa membuang fragment #access_token saat redirect.
const CALLBACK_URL = "https://jastip-claude.vercel.app/callback.html";

// Ambil access_token dari URL balikan, baik di query (?...) maupun fragment (#...).
function extractAccessToken(url) {
  if (!url) return null;
  const tryParse = (str) => {
    if (!str) return null;
    try {
      return new URLSearchParams(str).get("access_token");
    } catch {
      return null;
    }
  };
  const hashPart  = url.includes("#") ? url.split("#")[1] : "";
  const queryPart = url.includes("?") ? url.split("?")[1].split("#")[0] : "";
  return tryParse(queryPart) || tryParse(hashPart);
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  const configured = isGoogleConfigured();

  // Pulihkan sesi saat app dibuka
  useEffect(() => {
    (async () => {
      const saved = await loadJSON(STORAGE_KEYS.user, null);
      if (saved) setUser(saved);
      setLoading(false);
    })();
  }, []);

  async function fetchProfile(accessToken) {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const profile = await res.json();
      const next = {
        id:          profile.id,
        name:        profile.name || profile.given_name || "Pengguna Jastipin",
        email:       profile.email,
        picture:     profile.picture || null,
        provider:    "google",
        signedInAt:  new Date().toISOString(),
      };
      setUser(next);
      await saveJSON(STORAGE_KEYS.user, next);
    } catch {
      Alert.alert("Login gagal", "Tidak bisa mengambil profil Google. Coba lagi ya.");
    } finally {
      setSigningIn(false);
    }
  }

  const signInWithGoogle = useCallback(async () => {
    if (!configured) {
      Alert.alert(
        "Login Google belum aktif",
        "Client ID Google belum diisi di src/auth/googleConfig.js."
      );
      return;
    }

    setSigningIn(true);
    try {
      // URL app saat ini di Expo Go (exp://IP:PORT) — dipakai sebagai state
      // agar callback page bisa redirect balik ke session yang benar
      const appUrl = Linking.createURL("");

      const params = new URLSearchParams({
        client_id:     GOOGLE_CLIENT_IDS.web,
        redirect_uri:  CALLBACK_URL,
        response_type: "token",
        scope:         "profile email",
        state:         appUrl,
      });
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

      // Buka browser, monitor sampai kembali ke appUrl (exp://...)
      const result = await WebBrowser.openAuthSessionAsync(authUrl, appUrl);

      if (result.type === "success" && result.url) {
        // result.url bisa berbentuk exp://IP:PORT?access_token=xxx
        // atau exp://IP:PORT#access_token=xxx — ambil token dari keduanya.
        const token = extractAccessToken(result.url);
        if (token) {
          await fetchProfile(token);
          return;
        }
        setSigningIn(false);
        Alert.alert(
          "Login gagal",
          "Token tidak ditemukan setelah kembali dari Google. Pastikan URL callback sudah terdaftar di Google Cloud Console."
        );
        return;
      }

      // type: cancel / dismiss / locked — beri info yang jelas
      setSigningIn(false);
      if (result.type !== "cancel" && result.type !== "dismiss") {
        Alert.alert("Login gagal", "Sesi login tidak selesai. Coba lagi ya.");
      }
    } catch (err) {
      setSigningIn(false);
      Alert.alert(
        "Login gagal",
        "Terjadi masalah saat membuka Google. Coba lagi ya.\n\n" + String(err?.message || err)
      );
    }
  }, [configured]);

  const signOut = useCallback(async () => {
    setUser(null);
    await removeKey(STORAGE_KEYS.user);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isSignedIn: !!user, loading, signingIn, configured, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return ctx;
}
