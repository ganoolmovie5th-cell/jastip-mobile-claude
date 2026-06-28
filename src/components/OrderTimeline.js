import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { spacing } from "../theme";
import { useAppTheme } from "../context/AppContext";

export default function OrderTimeline({ timeline, currentStep }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return (
    <View>
      {timeline.map((step, i) => {
        const last = i === timeline.length - 1;
        const active = step.id === currentStep;
        return (
          <View key={step.id} style={styles.tlRow}>
            <View style={styles.tlLeft}>
              <View style={[styles.dotMark, step.done ? styles.dotDone : styles.dotPending, active && styles.dotActive]}>
                {step.done ? <Ionicons name="checkmark" size={13} color={colors.white} /> : null}
              </View>
              {!last ? <View style={[styles.line, step.done ? styles.lineDone : styles.linePending]} /> : null}
            </View>
            <View style={{ flex: 1, paddingBottom: last ? 0 : spacing.md }}>
              <Text style={[styles.tlTitle, active && { color: colors.brand }]}>{step.title}</Text>
              <Text style={styles.tlDate}>{step.date}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function makeStyles(colors) {
  return StyleSheet.create({
    tlRow: { flexDirection: "row", gap: 12 },
    tlLeft: { alignItems: "center", width: 24 },
    dotMark: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
    dotDone: { backgroundColor: colors.brand },
    dotPending: { backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line },
    dotActive: { borderWidth: 3, borderColor: colors.brandSoft },
    line: { width: 2, flex: 1, marginVertical: 2 },
    lineDone: { backgroundColor: colors.brand },
    linePending: { backgroundColor: colors.line },
    tlTitle: { fontSize: 14.5, fontWeight: "700", color: colors.ink },
    tlDate: { fontSize: 12.5, color: colors.muted, marginTop: 2 },
  });
}
