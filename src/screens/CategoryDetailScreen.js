import React, { useMemo } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { radius, spacing, shadow } from "../theme";
import { useAppTheme } from "../context/AppContext";
import { categories, formatRupiah } from "../data";
import Button from "../components/Button";
import { openWhatsApp } from "../whatsapp";

const { width: SCREEN_W } = Dimensions.get("window");

export default function CategoryDetailScreen({ route }) {
  const { id } = route.params || {};
  const cat = categories.find((c) => c.id === id) || categories[0];
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: 28 }}
      showsVerticalScrollIndicator={false}
    >
      <Image source={cat.image} style={styles.cover} resizeMode="cover" />
      <View style={styles.pad}>
        <Text style={styles.title}>{cat.name}</Text>
        <Text style={styles.blurb}>{cat.blurb}</Text>

        <Text style={styles.section}>Contoh barang yang sering dititip</Text>
        {cat.items.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.metaRow}>
                <Ionicons name="airplane-outline" size={13} color={colors.muted} />
                <Text style={styles.itemOrigin}>{item.origin}</Text>
              </View>
              <Text style={styles.itemPrice}>{formatRupiah(item.price)}</Text>
            </View>
            <Button
              label="Titip"
              variant="ghost"
              onPress={() =>
                openWhatsApp(`Halo Jastipin, saya mau nitip: ${item.name} dari ${item.origin}`)
              }
            />
          </View>
        ))}

        <View style={styles.note}>
          <Ionicons name="information-circle-outline" size={18} color={colors.brand} />
          <Text style={styles.noteText}>
            Harga di atas contoh, belum termasuk biaya titip dan ongkir. Kamu dapat rincian
            lengkap sebelum bayar.
          </Text>
        </View>

        <Button
          label="Titip barang lain"
          icon="logo-whatsapp"
          onPress={() => openWhatsApp(`Halo Jastipin, saya mau nitip barang kategori ${cat.name}`)}
          style={{ marginTop: spacing.md }}
        />
      </View>
    </ScrollView>
  );
}

function makeStyles(colors) {
  return StyleSheet.create({
    cover: { width: SCREEN_W, height: 180 },
    pad: { paddingHorizontal: spacing.md, paddingTop: spacing.md },
    title: { fontSize: 22, fontWeight: "800", color: colors.ink, letterSpacing: -0.4 },
    blurb: { fontSize: 14, color: colors.muted, marginTop: 4, lineHeight: 20 },
    section: { fontSize: 16, fontWeight: "800", color: colors.ink, marginTop: spacing.lg, marginBottom: spacing.sm },
    item: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      padding: spacing.md,
      marginBottom: spacing.sm,
      ...shadow.card,
    },
    itemName: { fontSize: 15, fontWeight: "700", color: colors.ink },
    metaRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 4 },
    itemOrigin: { fontSize: 12.5, color: colors.muted },
    itemPrice: { fontSize: 15, fontWeight: "800", color: colors.brand, marginTop: 6 },
    note: {
      flexDirection: "row",
      gap: 10,
      backgroundColor: colors.brandSoft,
      borderRadius: radius.sm,
      padding: spacing.md,
      marginTop: spacing.md,
    },
    noteText: { flex: 1, fontSize: 12.5, color: colors.brandStrong, lineHeight: 18 },
  });
}
