// components/CustomInput.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { palette } from "../theme/colors";

interface CustomInputProps extends TextInputProps {
  label: string;
  subLabel?: string;
}

export const CustomInput = ({
  label,
  subLabel,
  ...props
}: CustomInputProps) => {
  const { theme, isDark } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.background,
            color: theme.text,
            borderColor: isDark ? palette.mediumGray : palette.offWhite,
          },
        ]}
        placeholderTextColor={theme.textSecondary}
        {...props}
      />
      {subLabel && (
        <Text style={[styles.subLabel, { color: theme.textSecondary }]}>
          {subLabel}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    // fontFamily: 'Inter_500Medium',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    // fontFamily: 'Inter_400Regular',
  },
  subLabel: {
    fontSize: 12,
    marginTop: 8,
  },
});
