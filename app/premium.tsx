// app/premium.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack, router } from "expo-router";
import { ThemedView } from "../components/themed/ThemedView";
import { useTheme } from "../theme/ThemeProvider";
import { FeatureCard } from "../components/FeatureCard";

export default function PremiumScreen() {
  const { theme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Recursos Premium",
          headerStyle: { backgroundColor: theme.card },
          headerTintColor: theme.text,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.mainTitle, { color: theme.text }]}>
          Recursos Premium
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Funcionalidades avançadas para turbinar sua produtividade.
        </Text>

        <FeatureCard
          iconName="timer-outline"
          title="Focus Timer"
          description="Temporizador para sessões de foco. Configure duração, cores e fonte personalizadas. Bloqueio de tela para máximo foco."
          status="available"
          onPress={() => router.push("/focustimer")}
        />

        <FeatureCard
          iconName="bulb-outline"
          title="Assistente de Foco IA"
          description="IA que aprende seus hábitos e sugere os melhores momentos para focar, descansar e ser mais produtivo."
          status="soon"
        />

        <FeatureCard
          iconName="analytics-outline"
          title="Análises Avançadas"
          description="Visualize tendências, padrões e insights profundos sobre seu progresso e conquistas ao longo do tempo."
          status="soon"
        />

        <FeatureCard
          iconName="color-palette-outline"
          title="Temas Premium"
          description="Desbloqueie temas exclusivos, gradientes únicos e opções de personalização avançada para sua interface."
          status="soon"
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24 },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
});
