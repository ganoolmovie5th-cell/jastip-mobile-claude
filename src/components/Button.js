import React, { useMemo } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { radius } from "../theme";
import { useAppTheme } from "../context/AppContext";

export default function Button({ label, onPress, variant = "solid", icon, style }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const isSolid = variant === "solid";
  const isGhost = variant === "ghost";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isSolid && styles.solid,
        isGhost && styles.ghost,
        pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] },
        style,
      ]}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={18}
          color={isSolid ? colors.white : colors.brand}
          style={{ marginRight: 8 }}
        />
      ) : null}
      <Text style={[styles.label, isSolid ? styles.labelSolid : styles.labelGhost]}>
        {label}
      </Text>
    </Pressable>
  );
}

function makeStyles(colors) {
  return StyleSheet.create({
    base: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
      paddingHorizontal: 22,
      borderRadius: radius.pill,
      borderWidth: 1.5,
      borderColor: "transparent",
    },
    solid: { backgroundColor: colors.accent },
    ghost: { backgroundColor: "transparent", borderColor: colors.brandSoft },
    label: { fontSize: 15, fontWeight: "700" },
    labelSolid: { color: colors.white },
    labelGhost: { color: colors.brand },
  });
}
