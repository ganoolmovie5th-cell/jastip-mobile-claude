import React, { useMemo } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { radius, spacing, shadow } from "../theme";
import { useAppTheme } from "../context/AppContext";
import { aboutContent } from "../data";

export default function AboutScreen() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.md, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.logo}>
          <Ionicons name="cube" size={32} color={colors.white} />
        </View>
        <Text style={styles.brand}>Jastipin</Text>
        <Text style={styles.tagline}>{aboutContent.tagline}</Text>
      </View>

      <View style={styles.statsRow}>
        {aboutContent.stats.map((s) => (
          <View key={s.label} style={styles.statBox}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Tentang kami</Text>
      <Text style={styles.body}>{aboutContent.description}</Text>

      <Text style={styles.sectionTitle}>Yang kami pegang</Text>
      <View style={styles.values}>
        {aboutContent.values.map((v, i) => (
          <View key={v.title} style={[styles.valueRow, i < aboutContent.values.length - 1 && styles.valueDivider]}>
            <View style={styles.valueIcon}>
              <Ionicons name={v.icon} size={19} color={colors.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.valueTitle}>{v.title}</Text>
              <Text style={styles.valueDesc}>{v.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Ikuti kami</Text>
      <View style={styles.links}>
        {aboutContent.links.map((l, i) => (
          <Pressable
            key={l.id}
            style={[
              styles.linkRow,
              i < aboutContent.links.length - 1 && styles.valueDivider,
              l.disabled && styles.linkDisabled,
            ]}
            onPress={l.disabled ? undefined : () => Linking.openURL(l.url).catch(() => {})}
          >
            <Ionicons name={l.icon} size={19} color={l.disabled ? colors.muted : colors.brand} />
            <Text style={[styles.linkLabel, l.disabled && styles.linkLabelDisabled]}>{l.label}</Text>
            {l.disabled ? (
              <View style={styles.comingSoonTag}>
                <Text style={styles.comingSoonText}>Segera</Text>
              </View>
            ) : (
              <Ionicons name="open-outline" size={16} color={colors.muted} />
            )}
          </Pressable>
        ))}
      </View>

      <Text style={styles.version}>Versi {aboutContent.version}</Text>
      <Text style={styles.copy}>© 2026 Jastipin. Dibuat dengan ❤️ di Indonesia.</Text>
    </ScrollView>
  );
}

function makeStyles(colors) {
  return StyleSheet.create({
    hero: { alignItems: "center", paddingVertical: spacing.lg },
    logo: {
      width: 70,
      height: 70,
      borderRadius: 22,
      backgroundColor: colors.brand,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.md,
      ...shadow.card,
    },
    brand: { fontSize: 22, fontWeight: "800", color: colors.ink, letterSpacing: -0.5 },
    tagline: { fontSize: 14.5, color: colors.muted, textAlign: "center", marginTop: 6, lineHeight: 21, paddingHorizontal: spacing.md },
    statsRow: { flexDirection: "row", gap: 10, marginTop: spacing.sm },
    statBox: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      paddingVertical: spacing.md,
      alignItems: "center",
      ...shadow.card,
    },
    statValue: { fontSize: 20, fontWeight: "800", color: colors.brand },
    statLabel: { fontSize: 12, color: colors.muted, marginTop: 4 },
    sectionTitle: { fontSize: 16.5, fontWeight: "800", color: colors.ink, marginTop: spacing.xl, marginBottom: spacing.sm },
    body: { fontSize: 14.5, color: colors.muted, lineHeight: 22 },
    values: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      overflow: "hidden",
      ...shadow.card,
    },
    valueRow: { flexDirection: "row", alignItems: "center", gap: 14, padding: spacing.md },
    valueDivider: { borderBottomWidth: 1, borderBottomColor: colors.line },
    valueIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.brandSoft, alignItems: "center", justifyContent: "center" },
    valueTitle: { fontSize: 15, fontWeight: "800", color: colors.ink },
    valueDesc: { fontSize: 13, color: colors.muted, marginTop: 3, lineHeight: 19 },
    links: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      overflow: "hidden",
      ...shadow.card,
    },
    linkRow: { flexDirection: "row", alignItems: "center", gap: 14, padding: spacing.md },
    linkDisabled: { opacity: 0.45 },
    linkLabel: { flex: 1, fontSize: 15, fontWeight: "600", color: colors.ink },
    linkLabelDisabled: { color: colors.muted },
    comingSoonTag: {
      backgroundColor: colors.tint,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: radius.pill,
    },
    comingSoonText: { fontSize: 11.5, fontWeight: "700", color: colors.muted },
    version: { textAlign: "center", color: colors.muted, fontSize: 13, marginTop: spacing.xl, fontWeight: "600" },
    copy: { textAlign: "center", color: colors.muted, fontSize: 12, marginTop: 6 },
  });
}
