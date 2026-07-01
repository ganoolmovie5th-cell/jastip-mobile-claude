import React, { useState, useLayoutEffect, useMemo } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { radius, spacing } from "../theme";
import { useApp } from "../context/AppContext";
import Button from "../components/Button";

function Field({ label, value, onChangeText, placeholder, keyboardType, multiline, colors, styles }) {
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        keyboardType={keyboardType}
        multiline={multiline}
        style={[styles.input, multiline && { height: 84, textAlignVertical: "top" }]}
      />
    </View>
  );
}

export default function AddressFormScreen({ route, navigation }) {
  const editing = route.params?.address || null;
  const { upsertAddress, colors } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [form, setForm] = useState({
    id: editing?.id,
    label: editing?.label || "",
    recipient: editing?.recipient || "",
    phone: editing?.phone || "",
    detail: editing?.detail || "",
    city: editing?.city || "",
    province: editing?.province || "",
    postal: editing?.postal || "",
    isDefault: editing?.isDefault || false,
  });

  useLayoutEffect(() => {
    navigation.setOptions({ title: editing ? "Ubah alamat" : "Tambah alamat" });
  }, [editing]);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  function save() {
    if (!form.label.trim() || !form.recipient.trim() || !form.phone.trim() || !form.detail.trim() || !form.city.trim()) {
      Alert.alert("Lengkapi data", "Isi minimal label, penerima, nomor HP, alamat, dan kota ya.");
      return;
    }
    upsertAddress(form);
    navigation.goBack();
  }

  const fieldProps = { colors, styles };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.md, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Field label="Label alamat" value={form.label} onChangeText={set("label")} placeholder="Rumah, Kantor, Kos..." {...fieldProps} />
      <Field label="Nama penerima" value={form.recipient} onChangeText={set("recipient")} placeholder="Nama lengkap" {...fieldProps} />
      <Field label="Nomor HP" value={form.phone} onChangeText={set("phone")} placeholder="08xxxxxxxxxx" keyboardType="phone-pad" {...fieldProps} />
      <Field label="Alamat lengkap" value={form.detail} onChangeText={set("detail")} placeholder="Jalan, nomor, RT/RW, patokan" multiline {...fieldProps} />
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Field label="Kota" value={form.city} onChangeText={set("city")} placeholder="Kota" {...fieldProps} />
        </View>
        <View style={{ width: spacing.md }} />
        <View style={{ flex: 1 }}>
          <Field label="Kode pos" value={form.postal} onChangeText={set("postal")} placeholder="40123" keyboardType="number-pad" {...fieldProps} />
        </View>
      </View>
      <Field label="Provinsi" value={form.province} onChangeText={set("province")} placeholder="Provinsi" {...fieldProps} />

      <Pressable style={styles.toggle} onPress={() => set("isDefault")(!form.isDefault)}>
        <Ionicons
          name={form.isDefault ? "checkbox" : "square-outline"}
          size={22}
          color={form.isDefault ? colors.brand : colors.muted}
        />
        <Text style={styles.toggleText}>Jadikan alamat utama</Text>
      </Pressable>

      <Button label="Simpan alamat" icon="save-outline" onPress={save} style={{ marginTop: spacing.lg }} />
    </ScrollView>
  );
}

function makeStyles(colors) {
  return StyleSheet.create({
    fieldLabel: { fontSize: 13.5, fontWeight: "700", color: colors.ink, marginBottom: 7 },
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
    row: { flexDirection: "row" },
    toggle: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 4 },
    toggleText: { fontSize: 14.5, fontWeight: "600", color: colors.ink },
  });
}
