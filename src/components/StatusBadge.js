import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { radius } from "../theme";
import { orderStatusMeta } from "../data";

// Warna badge berasal dari orderStatusMeta (bukan tema), jadi aman di dark/light.
export default function StatusBadge({ status }) {
  const meta = orderStatusMeta[status] || orderStatusMeta.diproses;
  return (
    <View style={[styles.badge, { backgroundColor: meta.soft }]}>
      <Ionicons name={meta.icon} size={13} color={meta.color} />
      <Text style={[styles.badgeText, { color: meta.color }]}>{meta.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { flexDirection: "row", alignItems: "center", gap: 5, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 5 },
  badgeText: { fontSize: 12, fontWeight: "700" },
});
