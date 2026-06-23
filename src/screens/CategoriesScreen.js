import React from "react";
import { View, Text, Image, Pressable, StyleSheet, FlatList } from "react-native";
import { colors, radius, spacing, shadow } from "../theme";
import { categories } from "../data";

export default function CategoriesScreen({ navigation }) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      numColumns={2}
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
          <Image source={item.image} style={styles.img} />
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

const styles = StyleSheet.create({
  lead: { fontSize: 14, color: colors.muted, marginBottom: spacing.md, lineHeight: 20 },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: "hidden",
    ...shadow.card,
  },
  img: { width: "100%", height: 110 },
  body: { padding: spacing.sm + 2 },
  name: { fontSize: 14.5, fontWeight: "700", color: colors.ink },
  blurb: { fontSize: 12, color: colors.muted, marginTop: 3, lineHeight: 16 },
});
