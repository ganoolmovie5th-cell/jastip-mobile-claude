import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { radius, spacing, shadow } from "../theme";
import { useApp } from "../context/AppContext";

const FILTERS = [
  { id: "all", label: "Semua" },
  { id: "unread", label: "Belum dibaca" },
  { id: "order", label: "Pesanan" },
  { id: "promo", label: "Promo" },
];

export default function NotificationsScreen({ navigation }) {
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead, colors } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [filter, setFilter] = useState("all");
  const [newestFirst, setNewestFirst] = useState(true);

  const list = useMemo(() => {
    let arr = notifications.filter((n) => {
      if (filter === "unread") return !n.read;
      if (filter === "order") return !!n.orderId;
      if (filter === "promo") return !n.orderId;
      return true;
    });
    arr = [...arr].sort((a, b) => (newestFirst ? (b.ts || 0) - (a.ts || 0) : (a.ts || 0) - (b.ts || 0)));
    return arr;
  }, [notifications, filter, newestFirst]);

  function onPressNotif(n) {
    if (!n.read) markNotificationRead(n.id);
    if (n.orderId) navigation.navigate("Lacak", { orderId: n.orderId });
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.topBar}>
        <Text style={styles.topText}>
          {unreadCount > 0 ? `${unreadCount} belum dibaca` : "Semua sudah dibaca"}
        </Text>
        <View style={styles.topActions}>
          <Pressable hitSlop={8} style={styles.sortBtn} onPress={() => setNewestFirst((v) => !v)}>
            <Ionicons name="swap-vertical" size={15} color={colors.brand} />
            <Text style={styles.sortText}>{newestFirst ? "Terbaru" : "Terlama"}</Text>
          </Pressable>
          {unreadCount > 0 ? (
            <Pressable hitSlop={8} onPress={markAllNotificationsRead}>
              <Text style={styles.markAll}>Tandai semua</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={{ gap: 8, paddingHorizontal: spacing.md }}
      >
        {FILTERS.map((f) => {
          const active = filter === f.id;
          const count = f.id === "unread" ? unreadCount : null;
          return (
            <Pressable key={f.id} onPress={() => setFilter(f.id)} style={[styles.chip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {f.label}{count ? ` (${count})` : ""}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {list.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="notifications-off-outline" size={40} color={colors.muted} />
            <Text style={styles.emptyText}>Tidak ada notifikasi di filter ini.</Text>
          </View>
        ) : (
          list.map((n) => (
            <Pressable key={n.id} onPress={() => onPressNotif(n)} style={[styles.card, !n.read && styles.cardUnread]}>
              <View style={[styles.icon, !n.read && styles.iconUnread]}>
                <Ionicons name={n.icon} size={20} color={n.read ? colors.muted : colors.brand} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                  <Text style={styles.title} numberOfLines={1}>{n.title}</Text>
                  {!n.read ? <View style={styles.unreadDot} /> : null}
                </View>
                <Text style={styles.body}>{n.body}</Text>
                <View style={styles.footRow}>
                  <Text style={styles.time}>{n.time}</Text>
                  {n.orderId ? (
                    <View style={styles.tag}>
                      <Ionicons name="navigate-outline" size={12} color={colors.brand} />
                      <Text style={styles.tagText}>Lacak {n.orderId}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
}

function makeStyles(colors) {
  return StyleSheet.create({
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      paddingBottom: spacing.sm,
    },
    topText: { fontSize: 13, fontWeight: "700", color: colors.ink },
    topActions: { flexDirection: "row", alignItems: "center", gap: 16 },
    sortBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
    sortText: { fontSize: 13, fontWeight: "700", color: colors.brand },
    markAll: { fontSize: 13, fontWeight: "700", color: colors.brand },
    filterRow: { flexGrow: 0, marginBottom: spacing.sm },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: radius.pill,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
    },
    chipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
    chipText: { fontSize: 13, fontWeight: "600", color: colors.muted },
    chipTextActive: { color: colors.white },
    card: {
      flexDirection: "row",
      gap: 12,
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      padding: spacing.md,
      marginBottom: spacing.sm,
      ...shadow.card,
    },
    cardUnread: { borderColor: colors.brandSoft, backgroundColor: colors.tint },
    icon: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.tint, alignItems: "center", justifyContent: "center" },
    iconUnread: { backgroundColor: colors.brandSoft },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    title: { flex: 1, fontSize: 14.5, fontWeight: "700", color: colors.ink },
    unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
    body: { fontSize: 13, color: colors.muted, marginTop: 4, lineHeight: 19 },
    footRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
    time: { fontSize: 12, color: colors.muted },
    tag: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: colors.brandSoft,
      paddingHorizontal: 9,
      paddingVertical: 4,
      borderRadius: radius.pill,
    },
    tagText: { fontSize: 11.5, fontWeight: "700", color: colors.brand },
    empty: { alignItems: "center", paddingVertical: 60, gap: 12 },
    emptyText: { fontSize: 14.5, color: colors.muted },
  });
}
