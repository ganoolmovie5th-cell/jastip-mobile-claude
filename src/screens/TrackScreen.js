import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { radius, spacing, shadow } from "../theme";
import { useAppTheme } from "../context/AppContext";
import { buildTimeline, orderStatusMeta, orderTotal, formatRupiah } from "../data";
import { useStore } from "../store/StoreContext";

export default function TrackScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { orders, findOrder } = useStore();
  const { colors, t } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const initialId =
    route.params?.orderId ||
    (orders.find((o) => o.status === "diproses" || o.status === "dikirim") || orders[0])?.id ||
    null;
  const [selectedId, setSelectedId] = useState(initialId);
  const [query, setQuery] = useState("");

  // Kalau dibuka dari "Pesanan saya" dengan kode tertentu, ikuti pilihan itu
  useEffect(() => {
    if (route.params?.orderId) setSelectedId(route.params.orderId);
  }, [route.params?.orderId]);

  const order = findOrder(selectedId);
  const timeline = useMemo(() => buildTimeline(order), [order]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((o) => o.id.toLowerCase().includes(q) || o.item.toLowerCase().includes(q));
  }, [query, orders]);

  // Auto-pilih item pertama hasil search jika selectedId tidak ada di list
  useEffect(() => {
    if (list.length === 0) {
      setSelectedId(null);
      return;
    }
    const stillInList = list.some((o) => o.id === selectedId);
    if (!stillInList) {
      setSelectedId(list[0].id);
    }
  }, [list]);

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 32, paddingHorizontal: spacing.md }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.h1}>{t("track.title")}</Text>

      <View style={styles.search}>
        <Ionicons name="search-outline" size={18} color={colors.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t("track.placeholder")}
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
        />
        {query ? (
          <Pressable hitSlop={8} onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={18} color={colors.muted} />
          </Pressable>
        ) : null}
      </View>

      {/* Pemilih pesanan */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingBottom: spacing.md }}
      >
        {list.map((o) => {
          const active = o.id === selectedId;
          return (
            <Pressable key={o.id} onPress={() => setSelectedId(o.id)} style={[styles.chip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{o.id}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {!order ? (
        <View style={styles.empty}>
          <Ionicons name="cube-outline" size={40} color={colors.muted} />
          <Text style={styles.emptyText}>{t("track.not_found")}</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.code}>{order.id}</Text>
              <Text style={styles.item} numberOfLines={2}>
                {order.item}
              </Text>
            </View>
            <StatusBadge status={order.status} styles={styles} />
          </View>

          <View style={styles.originRow}>
            <Ionicons name="airplane-outline" size={14} color={colors.muted} />
            <Text style={styles.origin}>Dari {order.origin}</Text>
            {order.eta ? (
              <>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.origin}>{order.eta}</Text>
              </>
            ) : null}
          </View>

          {/* Timeline */}
          <View style={{ marginTop: spacing.md }}>
            {timeline.map((t_item, i) => {
              const last = i === timeline.length - 1;
              const active = t_item.id === order.currentStep;
              return (
                <View key={t_item.id} style={styles.tlRow}>
                  <View style={styles.tlLeft}>
                    <View style={[styles.dotMark, t_item.done ? styles.dotDone : styles.dotPending, active && styles.dotActive]}>
                      {t_item.done ? <Ionicons name="checkmark" size={13} color={colors.white} /> : null}
                    </View>
                    {!last ? <View style={[styles.line, t_item.done ? styles.lineDone : styles.linePending]} /> : null}
                  </View>
                  <View style={{ flex: 1, paddingBottom: last ? 0 : spacing.md }}>
                    <Text style={[styles.tlTitle, active && { color: colors.brand }]}>{t_item.title}</Text>
                    <Text style={styles.tlDate}>{t_item.date}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{t("track.total")}</Text>
            <Text style={styles.totalValue}>{formatRupiah(orderTotal(order))}</Text>
          </View>
        </View>
      )}

      <Text style={styles.hint}>{t("track.hint")}</Text>
    </ScrollView>
  );
}

function StatusBadge({ status, styles }) {
  const meta = orderStatusMeta[status] || orderStatusMeta.diproses;
  return (
    <View style={[styles.badge, { backgroundColor: meta.soft }]}>
      <Ionicons name={meta.icon} size={13} color={meta.color} />
      <Text style={[styles.badgeText, { color: meta.color }]}>{meta.label}</Text>
    </View>
  );
}

function makeStyles(colors) {
  return StyleSheet.create({
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
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: radius.pill,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
    },
    chipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
    chipText: { fontSize: 12.5, fontWeight: "700", color: colors.muted, letterSpacing: 0.3 },
    chipTextActive: { color: colors.white },
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      padding: spacing.lg,
      ...shadow.card,
    },
    cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 10 },
    code: { fontSize: 13, fontWeight: "700", color: colors.brand, letterSpacing: 0.4 },
    item: { fontSize: 15, fontWeight: "700", color: colors.ink, marginTop: 3 },
    badge: { flexDirection: "row", alignItems: "center", gap: 5, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 5 },
    badgeText: { fontSize: 12, fontWeight: "700" },
    originRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10, flexWrap: "wrap" },
    origin: { fontSize: 13, color: colors.muted },
    dot: { color: colors.muted, fontSize: 12 },
    tlRow: { flexDirection: "row", gap: 12 },
    tlLeft: { alignItems: "center", width: 24 },
    dotMark: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
    dotDone: { backgroundColor: colors.brand },
    dotPending: { backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line },
    dotActive: { borderWidth: 3, borderColor: colors.brandSoft },
    line: { width: 2, flex: 1, marginVertical: 2 },
    lineDone: { backgroundColor: colors.brand },
    linePending: { backgroundColor: colors.line },
    tlTitle: { fontSize: 14.5, fontWeight: "700", color: colors.ink },
    tlDate: { fontSize: 12.5, color: colors.muted, marginTop: 2 },
    totalRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: spacing.md,
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.line,
    },
    totalLabel: { fontSize: 13, color: colors.muted },
    totalValue: { fontSize: 16, fontWeight: "800", color: colors.ink },
    empty: { alignItems: "center", paddingVertical: 50, gap: 10 },
    emptyText: { fontSize: 14, color: colors.muted },
    hint: { fontSize: 12.5, color: colors.muted, marginTop: spacing.md, lineHeight: 18, textAlign: "center" },
  });
}
