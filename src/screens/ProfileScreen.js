import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing, shadow } from "../theme";
import { profileMenu } from "../data";
import Button from "../components/Button";
import { openWhatsApp } from "../whatsapp";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 32, paddingHorizontal: spacing.md }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.h1}>Profil</Text>

      {/* Profile card */}
      <View style={styles.card}>
        <View style={styles.ava}>
          <Text style={styles.avaText}>TC</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Tamu Jastipin</Text>
          <Text style={styles.email}>Masuk untuk simpan pesanan</Text>
        </View>
        <Button label="Masuk" variant="ghost" onPress={() => Alert.alert("Masuk", "Fitur login menyusul.")} />
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {profileMenu.map((m, i) => (
          <Pressable
            key={m.id}
            style={[styles.row, i < profileMenu.length - 1 && styles.rowDivider]}
            onPress={() => Alert.alert(m.label, "Halaman ini masih contoh.")}
          >
            <View style={styles.rowIcon}>
              <Ionicons name={m.icon} size={19} color={colors.brand} />
            </View>
            <Text style={styles.rowLabel}>{m.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
        ))}
      </View>

      <Button
        label="Hubungi kami di WhatsApp"
        icon="logo-whatsapp"
        onPress={() => openWhatsApp("Halo Jastipin, saya butuh bantuan")}
        style={{ marginTop: spacing.lg }}
      />

      <Text style={styles.version}>Jastipin v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 24, fontWeight: "800", color: colors.ink, letterSpacing: -0.5, marginBottom: spacing.md },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    ...shadow.card,
  },
  ava: { width: 54, height: 54, borderRadius: 27, backgroundColor: colors.brand, alignItems: "center", justifyContent: "center" },
  avaText: { color: colors.white, fontWeight: "800", fontSize: 18 },
  name: { fontSize: 17, fontWeight: "800", color: colors.ink },
  email: { fontSize: 13, color: colors.muted, marginTop: 2 },
  menu: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    marginTop: spacing.md,
    overflow: "hidden",
    ...shadow.card,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 14, paddingHorizontal: spacing.md, paddingVertical: 15 },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: colors.line },
  rowIcon: { width: 36, height: 36, borderRadius: 11, backgroundColor: colors.brandSoft, alignItems: "center", justifyContent: "center" },
  rowLabel: { flex: 1, fontSize: 15, fontWeight: "600", color: colors.ink },
  version: { textAlign: "center", color: colors.muted, fontSize: 12.5, marginTop: spacing.lg },
});
