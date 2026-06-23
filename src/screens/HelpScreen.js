import React, { useMemo, useState } from "react";
import {
  View, Text, ScrollView, StyleSheet, Pressable, TextInput,
  LayoutAnimation, Platform, UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { radius, spacing, shadow } from "../theme";
import { useAppTheme } from "../context/AppContext";
import Button from "../components/Button";
import { faqs } from "../data";
import { openWhatsApp } from "../whatsapp";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CATS = ["Semua", "Umum", "Biaya", "Pembayaran", "Pengiriman"];

export default function HelpScreen() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Semua");
  const [open, setOpen] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchCat = cat === "Semua" || f.cat === cat;
      const matchQ = !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, cat]);

  function toggle(id) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((cur) => (cur === id ? null : id));
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.md, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.search}>
        <Ionicons name="search" size={18} color={colors.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Cari pertanyaan..."
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
        />
        {query ? (
          <Pressable hitSlop={8} onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={18} color={colors.muted} />
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingVertical: spacing.md }}
      >
        {CATS.map((c) => {
          const active = cat === c;
          return (
            <Pressable key={c} onPress={() => setCat(c)} style={[styles.chip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {filtered.length === 0 ? (
        <View style={styles.noResult}>
          <Ionicons name="help-buoy-outline" size={36} color={colors.muted} />
          <Text style={styles.noResultText}>Tidak ada pertanyaan yang cocok.</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {filtered.map((f, i) => {
            const isOpen = open === f.id;
            return (
              <View key={f.id} style={[styles.qItem, i < filtered.length - 1 && styles.qDivider]}>
                <Pressable style={styles.qRow} onPress={() => toggle(f.id)}>
                  <Text style={styles.q}>{f.q}</Text>
                  <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={18} color={colors.muted} />
                </Pressable>
                {isOpen ? <Text style={styles.a}>{f.a}</Text> : null}
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>Masih butuh bantuan?</Text>
        <Text style={styles.contactDesc}>Tim kami siap bantu lewat WhatsApp, biasanya balas dalam beberapa menit.</Text>
        <Button
          label="Chat tim Jastipin"
          icon="logo-whatsapp"
          onPress={() => openWhatsApp("Halo Jastipin, saya butuh bantuan")}
          style={{ marginTop: spacing.md }}
        />
      </View>
    </ScrollView>
  );
}

function makeStyles(colors) {
  return StyleSheet.create({
    search: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.surface,
      borderRadius: radius.pill,
      borderWidth: 1,
      borderColor: colors.line,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    searchInput: { flex: 1, fontSize: 14.5, color: colors.ink, padding: 0 },
    chip: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: radius.pill,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
    },
    chipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
    chipText: { fontSize: 13, fontWeight: "600", color: colors.muted },
    chipTextActive: { color: colors.white },
    list: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      overflow: "hidden",
      ...shadow.card,
    },
    qItem: { paddingHorizontal: spacing.md, paddingVertical: 14 },
    qDivider: { borderBottomWidth: 1, borderBottomColor: colors.line },
    qRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
    q: { flex: 1, fontSize: 14.5, fontWeight: "700", color: colors.ink, lineHeight: 20 },
    a: { fontSize: 14, color: colors.muted, lineHeight: 21, marginTop: 10 },
    noResult: { alignItems: "center", paddingVertical: 40, gap: 10 },
    noResultText: { fontSize: 14, color: colors.muted },
    contactCard: {
      backgroundColor: colors.brandSoft,
      borderRadius: radius.md,
      padding: spacing.lg,
      marginTop: spacing.lg,
    },
    contactTitle: { fontSize: 16.5, fontWeight: "800", color: colors.brandStrong },
    contactDesc: { fontSize: 13.5, color: colors.brand, marginTop: 6, lineHeight: 20 },
  });
}
