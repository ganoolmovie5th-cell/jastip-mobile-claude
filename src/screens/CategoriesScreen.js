import React, { useMemo } from "react";
import { View, Text, Image, Pressable, StyleSheet, FlatList, Dimensions } from "react-native";
import { radius, spacing, shadow } from "../theme";
import { useAppTheme } from "../context/AppContext";
import { categories } from "../data";

const { width: SCREEN_W } = Dimensions.get("window");
// Lebar kartu: (layar - padding kiri - padding kanan - gap antar kolom) / 2
const CARD_W = Math.floor((SCREEN_W - spacing.md * 2 - spacing.md) / 2);

export default function CategoriesScreen({ navigation }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      numColumns={2}
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: spacing.md }}
      columnWrapperStyle={{ gap: spacing.md }}
      ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      ListHeaderComponent={
        <Text style={styles.lead}>Pilih kategori, atau titip barang apa pun lewat chat.</Text>
      }
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() =>
            navigation.navigate("CategoryDetail", { id: item.id, title: item.name })
          }
        >
          <Image source={item.image} style={styles.img} resizeMode="cover" />
          <View style={styles.body}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.blurb} numberOfLines={2}>
              {item.blurb}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}

function makeStyles(colors) {
  return StyleSheet.create({
    lead: { fontSize: 14, color: colors.muted, marginBottom: spacing.md, lineHeight: 20 },
    card: {
      width: CARD_W,
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      overflow: "hidden",
      ...shadow.card,
    },
    img: { width: CARD_W, height: 110 },
    body: { padding: spacing.sm + 2 },
    name: { fontSize: 14.5, fontWeight: "700", color: colors.ink },
    blurb: { fontSize: 12, color: colors.muted, marginTop: 3, lineHeight: 16 },
  });
}
