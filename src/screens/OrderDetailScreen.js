import React, { useMemo } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { radius, spacing, shadow } from "../theme";
import { useAppTheme } from "../context/AppContext";
import { buildTimeline, orderTotal, formatRupiah } from "../data";
import { useStore } from "../store/StoreContext";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import OrderTimeline from "../components/OrderTimeline";
import { openWhatsApp } from "../whatsapp";

export default function OrderDetailScreen({ route, navigation }) {
  const { findOrder } = useStore();
  const order = findOrder(route.params?.orderId);
  const timeline = useMemo(() => buildTimeline(order), [order]);
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  if (!order) {
    return (
      <View style={styles.empty}>
        <Ionicons name="cube-outline" size={40} color={colors.muted} />
        <Text style={styles.emptyText}>Pesanan tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.md, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Ringkasan */}
      <View style={styles.card}>
        <View style={styles.headRow}>
          <Text style={styles.code}>{order.id}</Text>
          <StatusBadge status={order.status} />
        </View>
        <Text style={styles.item}>{order.item}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="pricetags-outline" size={14} color={colors.muted} />
          <Text style={styles.meta}>{order.category}</Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="airplane-outline" size={14} color={colors.muted} />
          <Text style={styles.meta}>Dari {order.origin}</Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={14} color={colors.muted} />
          <Text style={styles.meta}>Dipesan {order.date}</Text>
        </View>
      </View>

      {/* Rincian biaya */}
      <Text style={styles.sectionTitle}>Rincian biaya</Text>
      <View style={styles.card}>
        <CostRow label="Harga barang" value={formatRupiah(order.itemPrice)} colors={colors} styles={styles} />
        <CostRow label="Biaya titip" value={formatRupiah(order.serviceFee)} colors={colors} styles={styles} />
        <CostRow label="Ongkir" value={formatRupiah(order.shipping)} colors={colors} styles={styles} />
        <View style={styles.divider} />
        <CostRow label="Total" value={formatRupiah(orderTotal(order))} strong colors={colors} styles={styles} />
      </View>

      {/* Timeline */}
      <Text style={styles.sectionTitle}>Status pengiriman</Text>
      <View style={styles.card}>
        <OrderTimeline timeline={timeline} currentStep={order.currentStep} />
      </View>

      {order.status !== "selesai" ? (
        <Button
          label="Lacak pesanan ini"
          icon="navigate-outline"
          onPress={() => navigation.navigate("Lacak", { orderId: order.id })}
          style={{ marginTop: spacing.lg }}
        />
      ) : (
        <Button
          label="Pesan lagi"
          icon="repeat-outline"
          onPress={() => openWhatsApp(`Halo Jastipin, saya mau pesan lagi seperti ${order.id}`)}
          style={{ marginTop: spacing.lg }}
        />
      )}
      <Button
        label="Tanya soal pesanan ini"
        icon="logo-whatsapp"
        variant="ghost"
        onPress={() => openWhatsApp(`Halo Jastipin, saya mau tanya soal pesanan ${order.id}`)}
        style={{ marginTop: spacing.sm }}
      />
    </ScrollView>
  );
}

function CostRow({ label, value, strong, colors, styles }) {
  return (
    <View style={styles.costRow}>
      <Text style={[styles.costLabel, strong && styles.costLabelStrong]}>{label}</Text>
      <Text style={[styles.costValue, strong && styles.costValueStrong]}>{value}</Text>
    </View>
  );
}

function makeStyles(colors) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      padding: spacing.md,
      ...shadow.card,
    },
    headRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    code: { fontSize: 13, fontWeight: "700", color: colors.brand, letterSpacing: 0.4 },
    item: { fontSize: 18, fontWeight: "800", color: colors.ink, marginTop: 8 },
    metaRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 },
    meta: { fontSize: 13.5, color: colors.muted },
    sectionTitle: { fontSize: 16, fontWeight: "800", color: colors.ink, marginTop: spacing.lg, marginBottom: spacing.sm },
    costRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 6 },
    costLabel: { fontSize: 14, color: colors.muted },
    costLabelStrong: { fontSize: 15, fontWeight: "800", color: colors.ink },
    costValue: { fontSize: 14, fontWeight: "600", color: colors.ink },
    costValueStrong: { fontSize: 17, fontWeight: "800", color: colors.brand },
    divider: { height: 1, backgroundColor: colors.line, marginVertical: 8 },
    empty: { flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: 12 },
    emptyText: { fontSize: 14.5, color: colors.muted },
  });
}
