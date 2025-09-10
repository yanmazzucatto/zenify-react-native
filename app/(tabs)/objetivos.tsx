import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/themed/ThemedView";
// O Header é removido daqui
import { Card } from "@/components/Card";
import { CategoryCard } from "@/components/CategoryCard";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { useTheme } from "@/theme/ThemeProvider";
import { palette } from "@/theme/colors";

// --- DADOS MOCK ---
const categoriesData = [
  {
    id: "1",
    title: "Corpo",
    subtitle: "Saúde Física",
    icon: "barbell-outline",
    color: palette.red,
  },
  {
    id: "2",
    title: "Mente",
    subtitle: "Saúde Mental",
    icon: "leaf-outline",
    color: palette.green,
  },
  {
    id: "3",
    title: "Estudos",
    subtitle: "Acadêmicos",
    icon: "book-outline",
    color: "#2196F3",
  },
  {
    id: "4",
    title: "Personalizar",
    subtitle: "Metas livres",
    icon: "color-palette-outline",
    color: "#9C27B0",
  },
];
const habitsData = [
  {
    id: "1",
    label: "Evitar celular 20 min antes de dormir",
    icon: "bed-outline",
  },
  {
    id: "2",
    label: "Caminhar ao menos 15 minutos por dia",
    icon: "walk-outline",
  },
];
// --- FIM DOS DADOS MOCK ---

export default function ObjetivosScreen() {
  const { theme } = useTheme();
  const [toggledHabits, setToggledHabits] = useState<string[]>(["2"]);

  const handleHabitToggle = (id: string) => {
    setToggledHabits((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Seção de Categorias em Grade */}
        <View style={styles.gridContainer}>
          {categoriesData.map((cat) => (
            <CategoryCard
              key={cat.id}
              title={cat.title}
              subtitle={cat.subtitle}
              iconName={cat.icon as any}
              color={cat.color}
              onPress={() => alert(`Clicou em ${cat.title}`)}
            />
          ))}
        </View>

        {/* Card de Hábitos Essenciais */}
        <Card>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Hábitos Essenciais
          </Text>
          {habitsData.map((habit) => (
            <View key={habit.id} style={{ marginBottom: 16 }}>
              <ToggleSwitch
                label={habit.label}
                icon={
                  <Ionicons
                    name={habit.icon as any}
                    size={22}
                    color={theme.textSecondary}
                  />
                }
                value={toggledHabits.includes(habit.id)}
                onValueChange={() => handleHabitToggle(habit.id)}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.suggestButton}>
            <Ionicons name="add-outline" size={20} color={theme.primary} />
            <Text style={[styles.suggestText, { color: theme.primary }]}>
              Sugerir mais hábitos
            </Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    // Aplicando o mesmo espaçamento da tela Home
    paddingHorizontal: 24,
    paddingTop: 190,
    paddingBottom: 120,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  suggestButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  suggestText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
