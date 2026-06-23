import React from "react";
import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing, shadow } from "../theme";
import { sampleOrder } from "../data";

export default function TrackScreen() {
  const insets = useSafeAreaInsets();
  const o = sampleOrder;

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 32, paddingHorizontal: spacing.md }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.h1}>Lacak pesanan</Text>

      <View style={styles.search}>
        <Ionicons name="search-outline" size={18} color={colors.muted} />
        <TextInput
          placeholder="Masukkan kode pesanan"
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
        />
      </View>

      {/* Order card */}
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View>
            <Text style={styles.code}>{o.code}</Text>
            <Text style={styles.item} numberOfLines={1}>
              {o.item}
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{o.eta}</Text>
          </View>
        </View>
        <View style={styles.originRow}>
          <Ionicons name="airplane-outline" size={14} color={colors.muted} />
          <Text style={styles.origin}>Dari {o.origin}</Text>
        </View>

        {/* Timeline */}
        <View style={{ marginTop: spacing.md }}>
          {o.timeline.map((t, i) => {
            const last = i === o.timeline.length - 1;
            const active = t.id === o.currentStep;
            return (
              <View key={t.id} style={styles.tlRow}>
                <View style={styles.tlLeft}>
                  <View
                    style={[
                      styles.dot,
                      t.done ? styles.dotDone : styles.dotPending,
                      active && styles.dotActive,
                    ]}
                  >
                    {t.done ? <Ionicons name="checkmark" size={13} color={colors.white} /> : null}
                  </View>
                  {!last ? (
                    <View style={[styles.line, t.done ? styles.lineDone : styles.linePending]} />
                  ) : null}
                </View>
                <View style={{ flex: 1, paddingBottom: last ? 0 : spacing.md }}>
                  <Text style={[styles.tlTitle, active && { color: colors.brand }]}>{t.title}</Text>
                  <Text style={styles.tlDate}>{t.date}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <Text style={styles.hint}>
        Ini contoh pesanan untuk demo. Pesanan asli kamu akan muncul di sini setelah mulai nitip.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 24, fontWeight: "800", color: colors.ink, letterSpacing: -0.5, marginBottom: spacing.md },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: spacing.md,
  },
  searchInput: { flex: 1, color: colors.ink, fontSize: 15 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
    ...shadow.card,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  code: { fontSize: 13, fontWeight: "700", color: colors.brand, letterSpacing: 0.4 },
  item: { fontSize: 15, fontWeight: "700", color: colors.ink, marginTop: 3, maxWidth: 200 },
  badge: { backgroundColor: colors.brandSoft, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 6 },
  badgeText: { fontSize: 12, fontWeight: "700", color: colors.brand },
  originRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
  origin: { fontSize: 13, color: colors.muted },
  tlRow: { flexDirection: "row", gap: 12 },
  tlLeft: { alignItems: "center", width: 24 },
  dot: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  dotDone: { backgroundColor: colors.brand },
  dotPending: { backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line },
  dotActive: { borderWidth: 3, borderColor: colors.brandSoft },
  line: { width: 2, flex: 1, marginVertical: 2 },
  lineDone: { backgroundColor: colors.brand },
  linePending: { backgroundColor: colors.line },
  tlTitle: { fontSize: 14.5, fontWeight: "700", color: colors.ink },
  tlDate: { fontSize: 12.5, color: colors.muted, marginTop: 2 },
  hint: { fontSize: 12.5, color: colors.muted, marginTop: spacing.md, lineHeight: 18, textAlign: "center" },
});
