// components/Card.tsx
import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

export const Card = ({ style, ...props }: ViewProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.card, { backgroundColor: theme.card }, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    // Sombra sutil para dar profundidade (opcional, mas elegante)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});
