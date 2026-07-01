import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Modal, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { radius, spacing, shadow } from "../theme";
import { useApp } from "../context/AppContext";
import Button from "../components/Button";

// ponytail: local const — was exported from data.js for only this one consumer
const PAYMENT_TYPES = [
  { id: "bank", label: "Transfer Bank", icon: "business-outline", hint: "BCA, Mandiri, BNI, BRI" },
  { id: "ewallet", label: "E-Wallet", icon: "wallet-outline", hint: "GoPay, OVO, Dana, ShopeePay" },
  { id: "va", label: "Virtual Account", icon: "card-outline", hint: "VA bank pilihan" },
  { id: "qris", label: "QRIS", icon: "qr-code-outline", hint: "Scan untuk bayar" },
];

function typeMeta(typeId) {
  return PAYMENT_TYPES.find((t) => t.id === typeId) || PAYMENT_TYPES[0];
}

export default function PaymentScreen() {
  const { payments, addPayment, removePayment, setDefault, colors } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [modal, setModal] = useState(false);
  const [type, setType] = useState("bank");
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");

  function reset() { setType("bank"); setTitle(""); setNumber(""); }

  function save() {
    if (!title.trim() || !number.trim()) {
      Alert.alert("Lengkapi data", "Isi nama penyedia dan nomor/akun ya.");
      return;
    }
    addPayment({ type, title: title.trim(), subtitle: typeMeta(type).label, number: number.trim() });
    setModal(false);
    reset();
  }

  function confirmDelete(p) {
    Alert.alert("Hapus metode", `Hapus ${p.title}?`, [
      { text: "Batal", style: "cancel" },
      { text: "Hapus", style: "destructive", onPress: () => removePayment(p.id) },
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: 110 }} showsVerticalScrollIndicator={false}>
        {payments.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="card-outline" size={40} color={colors.muted} />
            <Text style={styles.emptyText}>Belum ada metode pembayaran.</Text>
          </View>
        ) : (
          payments.map((p) => {
            const meta = typeMeta(p.type);
            return (
              <Pressable key={p.id} style={styles.card} onPress={() => setDefault("payment", p.id)}>
                <View style={styles.icon}>
                  <Ionicons name={meta.icon} size={20} color={colors.brand} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <Text style={styles.title}>{p.title}</Text>
                    {p.isDefault ? (
                      <View style={styles.defaultTag}>
                        <Text style={styles.defaultTagText}>Utama</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.sub}>{meta.label} · {p.number}</Text>
                </View>
                <Pressable hitSlop={10} onPress={() => confirmDelete(p)}>
                  <Ionicons name="trash-outline" size={19} color={colors.muted} />
                </Pressable>
              </Pressable>
            );
          })
        )}
        <Text style={styles.hint}>Ketuk metode untuk menjadikannya utama.</Text>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Tambah metode pembayaran" icon="add" onPress={() => setModal(true)} />
      </View>

      <Modal visible={modal} animationType="slide" transparent onRequestClose={() => setModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Tambah metode pembayaran</Text>

            <Text style={styles.fieldLabel}>Jenis</Text>
            <View style={styles.typeGrid}>
              {PAYMENT_TYPES.map((t) => {
                const active = type === t.id;
                return (
                  <Pressable key={t.id} onPress={() => setType(t.id)} style={[styles.typeChip, active && styles.typeChipActive]}>
                    <Ionicons name={t.icon} size={16} color={active ? colors.white : colors.brand} />
                    <Text style={[styles.typeChipText, active && { color: colors.white }]}>{t.label}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Text style={styles.typeHint}>{typeMeta(type).hint}</Text>

            <Text style={styles.fieldLabel}>Nama penyedia</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder={type === "bank" ? "BCA, Mandiri..." : "GoPay, OVO..."}
              placeholderTextColor={colors.muted}
              style={styles.input}
            />

            <Text style={styles.fieldLabel}>Nomor / akun</Text>
            <TextInput
              value={number}
              onChangeText={setNumber}
              placeholder="Nomor rekening atau nomor HP"
              placeholderTextColor={colors.muted}
              keyboardType="numbers-and-punctuation"
              style={styles.input}
            />

            <View style={styles.sheetActions}>
              <Pressable style={styles.cancelBtn} onPress={() => { setModal(false); reset(); }}>
                <Text style={styles.cancelText}>Batal</Text>
              </Pressable>
              <View style={{ flex: 1 }}>
                <Button label="Simpan" onPress={save} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function makeStyles(colors) {
  return StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      padding: spacing.md,
      marginBottom: spacing.md,
      ...shadow.card,
    },
    icon: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.brandSoft, alignItems: "center", justifyContent: "center" },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    title: { fontSize: 15.5, fontWeight: "800", color: colors.ink },
    defaultTag: { backgroundColor: colors.brandSoft, paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill },
    defaultTagText: { fontSize: 11, fontWeight: "700", color: colors.brand },
    sub: { fontSize: 13, color: colors.muted, marginTop: 3 },
    hint: { fontSize: 12.5, color: colors.muted, textAlign: "center", marginTop: 4 },
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
    modalBackdrop: { flex: 1, backgroundColor: "rgba(27,36,32,0.55)", justifyContent: "flex-end" },
    sheet: {
      backgroundColor: colors.bg,
      borderTopLeftRadius: radius.lg,
      borderTopRightRadius: radius.lg,
      padding: spacing.lg,
      paddingBottom: spacing.xl,
    },
    sheetHandle: { width: 44, height: 5, borderRadius: 3, backgroundColor: colors.line, alignSelf: "center", marginBottom: spacing.md },
    sheetTitle: { fontSize: 18, fontWeight: "800", color: colors.ink, marginBottom: spacing.md },
    fieldLabel: { fontSize: 13.5, fontWeight: "700", color: colors.ink, marginBottom: 8, marginTop: 6 },
    typeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    typeChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 9,
      borderRadius: radius.pill,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
    },
    typeChipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
    typeChipText: { fontSize: 13, fontWeight: "600", color: colors.brand },
    typeHint: { fontSize: 12, color: colors.muted, marginTop: 8 },
    input: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
      borderRadius: radius.sm,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 14.5,
      color: colors.ink,
    },
    sheetActions: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: spacing.lg },
    cancelBtn: { paddingVertical: 14, paddingHorizontal: 20 },
    cancelText: { fontSize: 15, fontWeight: "700", color: colors.muted },
  });
}
