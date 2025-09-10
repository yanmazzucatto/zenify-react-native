// components/Avatar.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

type AvatarProps = {
  initials: string;
  color?: string;
};

// Paleta de cores para os avatares
const avatarColors = ["#FFC107", "#4CAF50", "#2196F3", "#E91E63", "#9C27B0"];

export const Avatar = ({ initials, color }: AvatarProps) => {
  const { theme } = useTheme();

  // Escolhe uma cor com base no hash do nome ou usa a cor fornecida
  const colorIndex = initials.charCodeAt(0) % avatarColors.length;
  const backgroundColor = color || avatarColors[colorIndex];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
