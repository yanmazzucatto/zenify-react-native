import { Card } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";
import { ProgressRow } from "@/components/ProgressRow";
import { ThemedView } from "@/components/themed/ThemedView";
import { useTheme } from "@/theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// --- Dados Mock (Simulação de dados reais) ---
const dailyGoalsData = [
  { id: "1", text: "Meditar por 10 minutos", time: "08:00" },
  { id: "2", text: "40 min de Musculação", time: "17:00" },
  { id: "3", text: "Beber 2L de Água", time: "" },
];
// O componente de mensagens foi removido do código

const progressData = [
  { id: "1", label: "Livros", progress: 2 / 5, color: "#4CAF50" },
  { id: "2", label: "Cursos", progress: 1 / 4, color: "#2196F3" },
  { id: "3", label: "Estudos", progress: 1 / 3, color: "#FFC107" },
];

export default function HomeScreen() {
  const { theme } = useTheme();
  const [checkedGoals, setCheckedGoals] = useState<string[]>(["3"]);

  const handleGoalCheck = (id: string) => {
    setCheckedGoals((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Card: Metas Diárias */}
        <Card>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Metas Diárias
          </Text>
          {dailyGoalsData.map((goal) => (
            <View key={goal.id} style={styles.goalRow}>
              <Checkbox
                checked={checkedGoals.includes(goal.id)}
                onPress={() => handleGoalCheck(goal.id)}
              />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={[styles.goalText, { color: theme.text }]}>
                  {goal.text}
                </Text>
                {goal.time && (
                  <Text
                    style={[styles.goalTime, { color: theme.textSecondary }]}
                  >
                    {goal.time}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </Card>

        {/* Card: Objetivos Conquistados */}
        <Card>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Objetivos Conquistados
          </Text>
          <View style={styles.objectivesContainer}>
            <View
              style={[styles.objectiveIcon, { backgroundColor: "#4CAF5030" }]}
            >
              <Ionicons name="leaf" size={24} color="#4CAF50" />
            </View>
            <View
              style={[styles.objectiveIcon, { backgroundColor: "#2196F330" }]}
            >
              <Ionicons name="book" size={24} color="#2196F3" />
            </View>
            <View
              style={[styles.objectiveIcon, { backgroundColor: "#FFC10730" }]}
            >
              <Ionicons name="headset" size={24} color="#FFC107" />
            </View>
          </View>
        </Card>

        {/* Card: Progresso Diário */}
        <Card>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Progresso Diário
          </Text>
          {progressData.map((item) => (
            <ProgressRow
              key={item.id}
              label={item.label}
              progress={item.progress}
              color={item.color}
            />
          ))}
        </Card>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 190,
    paddingBottom: 120,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  badge: {
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "white", fontWeight: "bold" },
  goalRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  goalText: { fontSize: 16 },
  goalTime: { fontSize: 12, marginTop: 2 },
  messageRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  messageName: { fontSize: 16, fontWeight: "bold" },
  messageText: { fontSize: 14, marginTop: 2 },
  messageTime: { fontSize: 12 },
  objectivesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  objectiveIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
});
