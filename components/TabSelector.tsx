// components/TabSelector.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

type TabSelectorProps = {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
};

export const TabSelector = ({
  options,
  selectedOption,
  onSelect,
}: TabSelectorProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.tab,
            selectedOption === option && { backgroundColor: theme.primary },
          ]}
          onPress={() => onSelect(option)}
        >
          <Text
            style={[
              styles.text,
              {
                color:
                  selectedOption === option ? "white" : theme.textSecondary,
              },
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 4,
    width: "100%",
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
