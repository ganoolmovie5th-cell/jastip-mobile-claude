import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing, shadow } from "../theme";
import { myOrders, orderStatusMeta, formatRupiah, ORDER_TOTAL_STEPS, orderTotal } from "../data";
import Button from "../components/Button";
import { useAuth } from "../auth/AuthContext";
import { openWhatsApp } from "../whatsapp";

const FILTERS = [
  { id: "all", label: "Semua" },
  { id: "diproses", label: "Diproses" },
  { id: "dikirim", label: "Dikirim" },
  { id: "selesai", label: "Selesai" },
];

function StatusBadge({ status }) {
  const meta = orderStatusMeta[status] || orderStatusMeta.diproses;
  return (
    <View style={[styles.badge, { backgroundColor: meta.soft }]}>
      <Ionicons name={meta.icon} size={13} color={meta.color} />
      <Text style={[styles.badgeText, { color: meta.color }]}>{meta.label}</Text>
    </View>
  );
}

export default function OrdersScreen({ navigation }) {
  const { isSignedIn } = useAuth();
  const [filter, setFilter] = useState("all");

  const orders = useMemo(
    () => (filter === "all" ? myOrders : myOrders.filter((o) => o.status === filter)),
    [filter]
  );

  if (!isSignedIn) {
    return (
      <EmptyState
        icon="lock-closed-outline"
        title="Masuk dulu yuk"
        desc="Masuk dengan akun Google untuk melihat dan menyimpan pesananmu."
        actionLabel="Masuk"
        onAction={() => navigation.navigate("Login")}
      />
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.md, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingBottom: spacing.md }}
      >
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <Pressable
              key={f.id}
              onPress={() => setFilter(f.id)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{f.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {orders.length === 0 ? (
        <View style={styles.emptyInline}>
          <Ionicons name="receipt-outline" size={40} color={colors.muted} />
          <Text style={styles.emptyInlineText}>Belum ada pesanan di status ini.</Text>
        </View>
      ) : (
        orders.map((o) => {
          const total = orderTotal(o);
          return (
            <Pressable
              key={o.id}
              style={styles.card}
              onPress={() => navigation.navigate("OrderDetail", { orderId: o.id })}
            >
              <View style={styles.cardTop}>
                <Text style={styles.code}>{o.id}</Text>
                <StatusBadge status={o.status} />
              </View>
              <Text style={styles.item}>{o.item}</Text>
              <View style={styles.metaRow}>
                <Ionicons name="airplane-outline" size={13} color={colors.muted} />
                <Text style={styles.meta}>{o.origin}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.meta}>{o.date}</Text>
              </View>

              {o.status === "dikirim" || o.status === "diproses" ? (
                <View style={styles.progressWrap}>
                  <View style={styles.progressTrack}>
                    <View
                      style={[styles.progressFill, { width: `${(o.currentStep / ORDER_TOTAL_STEPS) * 100}%` }]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    Tahap {o.currentStep} dari {ORDER_TOTAL_STEPS}
                  </Text>
                </View>
              ) : null}

              <View style={styles.cardBottom}>
                <View>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>{formatRupiah(total)}</Text>
                </View>
                <Pressable
                  style={styles.detailBtn}
                  onPress={() =>
                    o.status === "selesai"
                      ? openWhatsApp(`Halo Jastipin, saya mau pesan lagi seperti ${o.id}`)
                      : navigation.navigate("Lacak", { orderId: o.id })
                  }
                >
                  <Text style={styles.detailBtnText}>
                    {o.status === "selesai" ? "Pesan lagi" : "Lacak"}
                  </Text>
                  <Ionicons name="chevron-forward" size={15} color={colors.brand} />
                </Pressable>
              </View>
            </Pressable>
          );
        })
      )}
    </ScrollView>
  );
}

function EmptyState({ icon, title, desc, actionLabel, onAction }) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Ionicons name={icon} size={34} color={colors.brand} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDesc}>{desc}</Text>
      <Button label={actionLabel} onPress={onAction} style={{ marginTop: spacing.lg, alignSelf: "stretch" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
  chipText: { fontSize: 13.5, fontWeight: "600", color: colors.muted },
  chipTextActive: { color: colors.white },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  code: { fontSize: 13, fontWeight: "700", color: colors.muted, letterSpacing: 0.3 },
  badge: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.pill },
  badgeText: { fontSize: 12, fontWeight: "700" },
  item: { fontSize: 16, fontWeight: "800", color: colors.ink, marginTop: 8 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6, flexWrap: "wrap" },
  meta: { fontSize: 12.5, color: colors.muted },
  dot: { color: colors.muted, fontSize: 12 },
  progressWrap: { marginTop: 14 },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: colors.tint, overflow: "hidden" },
  progressFill: { height: 6, borderRadius: 3, backgroundColor: colors.brand },
  progressText: { fontSize: 12, color: colors.muted, marginTop: 6, fontWeight: "600" },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  totalLabel: { fontSize: 12, color: colors.muted },
  totalValue: { fontSize: 16, fontWeight: "800", color: colors.ink, marginTop: 2 },
  detailBtn: { flexDirection: "row", alignItems: "center", gap: 2 },
  detailBtnText: { fontSize: 14, fontWeight: "700", color: colors.brand },
  emptyInline: { alignItems: "center", paddingVertical: 40, gap: 10 },
  emptyInlineText: { fontSize: 14, color: colors.muted },
  empty: { flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", padding: spacing.xl },
  emptyIcon: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: colors.brandSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  emptyTitle: { fontSize: 19, fontWeight: "800", color: colors.ink },
  emptyDesc: { fontSize: 14.5, color: colors.muted, textAlign: "center", marginTop: 8, lineHeight: 21 },
});
