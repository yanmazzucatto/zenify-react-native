// components/ProgressRow.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { palette } from "../theme/colors";

type ProgressRowProps = {
  label: string;
  progress: number; // um número de 0 a 1
  color: string;
};

export const ProgressRow = ({ label, progress, color }: ProgressRowProps) => {
  const { theme, isDark } = useTheme();
  const displayPercent = Math.round(progress * 100);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
        <Text style={[styles.percent, { color: theme.textSecondary }]}>
          {displayPercent}%
        </Text>
      </View>
      <View
        style={[
          styles.track,
          { backgroundColor: isDark ? palette.mediumGray : palette.offWhite },
        ]}
      >
        <View
          style={[
            styles.fill,
            { width: `${displayPercent}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  percent: {
    fontSize: 14,
  },
  track: {
    height: 8,
    borderRadius: 4,
    width: "100%",
  },
  fill: {
    height: 8,
    borderRadius: 4,
  },
});
