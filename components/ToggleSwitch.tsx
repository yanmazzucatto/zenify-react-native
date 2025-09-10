// components/ToggleSwitch.tsx
import React from "react";
import { View, Switch, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { palette } from "../theme/colors";

type ToggleSwitchProps = {
  label: string;
  icon: React.ReactNode;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export const ToggleSwitch = ({
  label,
  icon,
  value,
  onValueChange,
}: ToggleSwitchProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {icon}
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      </View>
      <Switch
        trackColor={{ false: palette.lightGray, true: palette.purple }}
        thumbColor={palette.white}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginLeft: 12,
    // fontFamily: 'Inter_500Medium',
  },
});
