// Auth context: login Gmail lewat OAuth (expo-auth-session), kompatibel Expo Go.
// Menggunakan AuthSession.useAuthRequest langsung (bukan Google provider)
// agar redirectUri tidak di-override oleh SDK.

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { GOOGLE_CLIENT_IDS, isGoogleConfigured } from "./googleConfig";
import { loadJSON, saveJSON, removeKey, STORAGE_KEYS } from "../storage";

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext(null);

// Redirect URI eksplisit — harus HTTPS agar diterima Google.
// Wajib terdaftar di Google Cloud Console → Web Application client
// → Authorized redirect URIs
const REDIRECT_URI = "https://auth.expo.io/@ganoolmovie5th/jastip-mobile-claude";

// Discovery document Google OAuth 2.0
const GOOGLE_DISCOVERY = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  const configured = isGoogleConfigured();

  // Pakai AuthSession.useAuthRequest langsung agar redirectUri tidak di-override
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_IDS.web,
      redirectUri: REDIRECT_URI,
      scopes: ["profile", "email"],
      responseType: AuthSession.ResponseType.Token,
      usePKCE: false,
      extraParams: {
        access_type: "online",
      },
    },
    GOOGLE_DISCOVERY
  );

  // Pulihkan sesi tersimpan saat aplikasi dibuka
  useEffect(() => {
    (async () => {
      const saved = await loadJSON(STORAGE_KEYS.user, null);
      if (saved) setUser(saved);
      setLoading(false);
    })();
  }, []);

  // Tangani hasil OAuth
  useEffect(() => {
    if (!response) return;
    if (response.type === "success") {
      // Implicit flow: token ada di params atau authentication
      const token =
        response.authentication?.accessToken ||
        response.params?.access_token;
      if (token) {
        fetchProfile(token);
      } else {
        setSigningIn(false);
        Alert.alert("Login gagal", "Token tidak diterima dari Google. Coba lagi ya.");
      }
    } else if (
      response.type === "error" ||
      response.type === "dismiss" ||
      response.type === "cancel"
    ) {
      setSigningIn(false);
    }
  }, [response]);

  async function fetchProfile(accessToken) {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const profile = await res.json();
      const next = {
        id: profile.id,
        name: profile.name || profile.given_name || "Pengguna Jastipin",
        email: profile.email,
        picture: profile.picture || null,
        provider: "google",
        signedInAt: new Date().toISOString(),
      };
      setUser(next);
      await saveJSON(STORAGE_KEYS.user, next);
    } catch (e) {
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
    if (!request) return;
    setSigningIn(true);
    try {
      await promptAsync();
    } catch (e) {
      setSigningIn(false);
      Alert.alert("Login gagal", "Terjadi masalah saat membuka Google. Coba lagi ya.");
    }
  }, [configured, request, promptAsync]);

  const signOut = useCallback(async () => {
    setUser(null);
    await removeKey(STORAGE_KEYS.user);
  }, []);

  const value = {
    user,
    isSignedIn: !!user,
    loading,
    signingIn,
    configured,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam AuthProvider");
  return ctx;
}
