// components/Checkbox.tsx
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";

type CheckboxProps = {
  checked: boolean;
  onPress: () => void;
};

export const Checkbox = ({ checked, onPress }: CheckboxProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.box,
        {
          backgroundColor: checked ? theme.primary : theme.background,
          borderColor: checked ? theme.primary : theme.textSecondary,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {checked && <Ionicons name="checkmark" size={18} color="white" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
