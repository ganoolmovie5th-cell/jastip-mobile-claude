import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function SectionHeader({ title, action, onAction }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={styles.action}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  title: { fontSize: 19, fontWeight: "800", color: colors.ink, letterSpacing: -0.3 },
  action: { fontSize: 14, fontWeight: "600", color: colors.brand },
});
