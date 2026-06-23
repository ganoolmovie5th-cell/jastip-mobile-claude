import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing, shadow } from "../theme";
import { useStore } from "../store/StoreContext";

export default function NotificationsScreen({ navigation }) {
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useStore();

  function onPressNotif(n) {
    if (!n.read) markNotificationRead(n.id);
    if (n.orderId) navigation.navigate("Lacak", { orderId: n.orderId });
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {unreadCount > 0 ? (
        <View style={styles.topBar}>
          <Text style={styles.topText}>{unreadCount} notifikasi belum dibaca</Text>
          <Pressable hitSlop={8} onPress={markAllNotificationsRead}>
            <Text style={styles.markAll}>Tandai semua dibaca</Text>
          </Pressable>
        </View>
      ) : null}

      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="notifications-off-outline" size={40} color={colors.muted} />
            <Text style={styles.emptyText}>Belum ada notifikasi.</Text>
          </View>
        ) : (
          notifications.map((n) => (
            <Pressable
              key={n.id}
              onPress={() => onPressNotif(n)}
              style={[styles.card, !n.read && styles.cardUnread]}
            >
              <View style={[styles.icon, !n.read && styles.iconUnread]}>
                <Ionicons name={n.icon} size={20} color={n.read ? colors.muted : colors.brand} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                  <Text style={[styles.title, !n.read && styles.titleUnread]} numberOfLines={1}>
                    {n.title}
                  </Text>
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

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.brandSoft,
  },
  topText: { fontSize: 13, fontWeight: "600", color: colors.brand },
  markAll: { fontSize: 13, fontWeight: "700", color: colors.brand },
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
  cardUnread: { borderColor: colors.brandSoft, backgroundColor: "#fdfcf8" },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.tint,
    alignItems: "center",
    justifyContent: "center",
  },
  iconUnread: { backgroundColor: colors.brandSoft },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { flex: 1, fontSize: 14.5, fontWeight: "700", color: colors.ink },
  titleUnread: { color: colors.ink },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
  body: { fontSize: 13, color: colors.muted, marginTop: 4, lineHeight: 19 },
  footRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
  time: { fontSize: 12, color: colors.muted },
  tag: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: colors.brandSoft, paddingHorizontal: 9, paddingVertical: 4, borderRadius: radius.pill },
  tagText: { fontSize: 11.5, fontWeight: "700", color: colors.brand },
  empty: { alignItems: "center", paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 14.5, color: colors.muted },
});
