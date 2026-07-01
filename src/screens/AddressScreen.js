import React, { useMemo } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { radius, spacing, shadow } from "../theme";
import { useApp } from "../context/AppContext";
import Button from "../components/Button";

export default function AddressScreen({ navigation }) {
  const { addresses, removeAddress, setDefault, colors } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  function confirmDelete(addr) {
    Alert.alert("Hapus alamat", `Hapus alamat "${addr.label}"?`, [
      { text: "Batal", style: "cancel" },
      { text: "Hapus", style: "destructive", onPress: () => removeAddress(addr.id) },
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {addresses.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="location-outline" size={40} color={colors.muted} />
            <Text style={styles.emptyText}>Belum ada alamat tersimpan.</Text>
          </View>
        ) : (
          addresses.map((a) => (
            <View key={a.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.labelWrap}>
                  <Ionicons name="location" size={15} color={colors.brand} />
                  <Text style={styles.label}>{a.label}</Text>
                  {a.isDefault ? (
                    <View style={styles.defaultTag}>
                      <Text style={styles.defaultTagText}>Utama</Text>
                    </View>
                  ) : null}
                </View>
                <Pressable hitSlop={8} onPress={() => navigation.navigate("AddressForm", { address: a })}>
                  <Ionicons name="create-outline" size={20} color={colors.muted} />
                </Pressable>
              </View>
              <Text style={styles.recipient}>{a.recipient} · {a.phone}</Text>
              <Text style={styles.detail}>{a.detail}, {a.city}, {a.province} {a.postal}</Text>
              <View style={styles.actions}>
                {!a.isDefault ? (
                  <Pressable style={styles.actionBtn} onPress={() => setDefault("address", a.id)}>
                    <Ionicons name="checkmark-circle-outline" size={16} color={colors.brand} />
                    <Text style={styles.actionText}>Jadikan utama</Text>
                  </Pressable>
                ) : (
                  <View style={{ flex: 1 }} />
                )}
                <Pressable style={styles.actionBtn} onPress={() => confirmDelete(a)}>
                  <Ionicons name="trash-outline" size={16} color={colors.accentStrong} />
                  <Text style={[styles.actionText, { color: colors.accentStrong }]}>Hapus</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Button label="Tambah alamat baru" icon="add" onPress={() => navigation.navigate("AddressForm", {})} />
      </View>
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
      marginBottom: spacing.md,
      ...shadow.card,
    },
    cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    labelWrap: { flexDirection: "row", alignItems: "center", gap: 6 },
    label: { fontSize: 15.5, fontWeight: "800", color: colors.ink },
    defaultTag: { backgroundColor: colors.brandSoft, paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill },
    defaultTagText: { fontSize: 11, fontWeight: "700", color: colors.brand },
    recipient: { fontSize: 14, fontWeight: "600", color: colors.ink, marginTop: 10 },
    detail: { fontSize: 13.5, color: colors.muted, marginTop: 4, lineHeight: 20 },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 14,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.line,
    },
    actionBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
    actionText: { fontSize: 13.5, fontWeight: "700", color: colors.brand },
    empty: { alignItems: "center", paddingVertical: 60, gap: 12 },
    emptyText: { fontSize: 14.5, color: colors.muted },
    footer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      padding: spacing.md,
      backgroundColor: colors.bg,
      borderTopWidth: 1,
      borderTopColor: colors.line,
    },
  });
}
