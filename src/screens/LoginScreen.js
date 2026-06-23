import React from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing, shadow } from "../theme";
import { useAuth } from "../auth/AuthContext";

const PERKS = [
  { icon: "bag-handle-outline", text: "Simpan dan lacak semua pesananmu" },
  { icon: "location-outline", text: "Alamat pengiriman tersimpan otomatis" },
  { icon: "card-outline", text: "Metode pembayaran lebih cepat" },
];

export default function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { signInWithGoogle, signingIn, isSignedIn } = useAuth();

  // Begitu berhasil masuk, kembali ke profil.
  React.useEffect(() => {
    if (isSignedIn) navigation.goBack();
  }, [isSignedIn]);

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 8 }]}>
      <View style={styles.hero}>
        <View style={styles.logo}>
          <Ionicons name="cube" size={34} color={colors.white} />
        </View>
        <Text style={styles.title}>Masuk ke Jastipin</Text>
        <Text style={styles.sub}>
          Masuk pakai akun Google biar pesanan, alamat, dan pembayaranmu tersimpan aman.
        </Text>
      </View>

      <View style={styles.perks}>
        {PERKS.map((p) => (
          <View key={p.icon} style={styles.perkRow}>
            <View style={styles.perkIcon}>
              <Ionicons name={p.icon} size={18} color={colors.brand} />
            </View>
            <Text style={styles.perkText}>{p.text}</Text>
          </View>
        ))}
      </View>

      <Pressable
        onPress={signInWithGoogle}
        disabled={signingIn}
        style={({ pressed }) => [styles.googleBtn, pressed && { opacity: 0.9 }, signingIn && { opacity: 0.7 }]}
      >
        {signingIn ? (
          <ActivityIndicator color={colors.ink} />
        ) : (
          <>
            <Ionicons name="logo-google" size={20} color="#ea4335" />
            <Text style={styles.googleText}>Lanjut dengan Google</Text>
          </>
        )}
      </Pressable>

      <Text style={styles.note}>
        Dengan masuk, kamu setuju dengan ketentuan layanan dan kebijakan privasi Jastipin.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: spacing.lg },
  hero: { alignItems: "center", marginTop: spacing.xl, marginBottom: spacing.xl },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    ...shadow.card,
  },
  title: { fontSize: 24, fontWeight: "800", color: colors.ink, letterSpacing: -0.5 },
  sub: { fontSize: 14.5, color: colors.muted, textAlign: "center", marginTop: 10, lineHeight: 21 },
  perks: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: 14,
    ...shadow.card,
  },
  perkRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  perkIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: colors.brandSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  perkText: { flex: 1, fontSize: 14.5, color: colors.ink, fontWeight: "600" },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.line,
    paddingVertical: 15,
    marginTop: spacing.xl,
    ...shadow.card,
  },
  googleText: { fontSize: 15.5, fontWeight: "700", color: colors.ink },
  note: { fontSize: 12, color: colors.muted, textAlign: "center", marginTop: spacing.md, lineHeight: 18 },
});
