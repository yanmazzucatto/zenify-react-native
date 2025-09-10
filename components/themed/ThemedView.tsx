// components/themed/ThemedView.tsx
import React from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "@/theme/ThemeProvider"; // Usando o atalho aqui também

export const ThemedView = ({ style, ...props }: ViewProps) => {
  const { theme } = useTheme();
  return (
    <View
      // Define a cor de fundo padrão com base no tema, mas permite que seja sobrescrita pelo 'style'
      style={[{ backgroundColor: theme.background }, style]}
      {...props}
    />
  );
};
