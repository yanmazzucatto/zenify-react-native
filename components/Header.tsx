// components/Header.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";

type HeaderProps = {
  name: string;
};

export const Header = ({ name }: HeaderProps) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: theme.background }}>
      <View style={styles.container}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>
            Olá, {name}!
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Bem Vindo ao Zenify
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="settings-outline"
            size={24}
            color={theme.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    // fontFamily: 'Inter_700Bold',
  },
  subtitle: {
    fontSize: 16,
    // fontFamily: 'Inter_400Regular',
  },
});
