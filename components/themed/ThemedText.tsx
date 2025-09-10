// components/themed/ThemedText.tsx
import React from "react";
import { Text, TextProps } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export const ThemedText = ({ style, ...props }: TextProps) => {
  const { theme } = useTheme();
  return (
    <Text
      style={[
        {
          color: theme.text,
          fontFamily:
            "Inter_400Regular" /* Exemplo, precisaremos carregar a fonte */,
        },
        style,
      ]}
      {...props}
    />
  );
};
