import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Fonts } from "@/constants/Fonts";
import { useTheme } from "@/context/ThemeContext";

const PremiumScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Recursos Premium
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Funcionalidades avançadas para turbinar sua produtividade.
        </Text>

        {/* Focus Timer Card */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="timer-outline" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Focus Timer
            </Text>
            <Text style={[styles.disponivel, { color: colors.primary }]}>
              Disponível
            </Text>
          </View>
          <Text
            style={[styles.cardDescription, { color: colors.textSecondary }]}
          >
            Temporizador para sessões de foco
          </Text>
          <Text
            style={[styles.cardDescription, { color: colors.textSecondary }]}
          >
            Configure duração, cores e fonte personalizadas.
          </Text>
          <Text
            style={[styles.cardDescription, { color: colors.textSecondary }]}
          >
            Bloqueio de tela para máximo foco
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.buttonText, { color: colors.white }]}>
              Abrir Focus Timer
            </Text>
          </TouchableOpacity>
        </View>

        {/* Em Breve Section */}
        <Text style={[styles.emBreveTitle, { color: colors.text }]}>
          Em Breve
        </Text>

        {/* Assistente de Foco IA Card */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="sparkles-outline" size={24} color={colors.accent} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Assistente de Foco IA
            </Text>
            <Text style={[styles.emBreve, { color: colors.accent }]}>
              Em breve
            </Text>
          </View>
          <Text
            style={[styles.cardDescription, { color: colors.textSecondary }]}
          >
            IA que aprende seus hábitos e sugere os melhores momentos para
            focar, descansar e ser mais produtivo.
          </Text>
        </View>

        {/* Análises Avançadas Card */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="analytics-outline"
              size={24}
              color={colors.tertiary}
            />
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Análises Avançadas
            </Text>
            <Text style={[styles.emBreve, { color: colors.tertiary }]}>
              Em breve
            </Text>
          </View>
          <Text
            style={[styles.cardDescription, { color: colors.textSecondary }]}
          >
            Visualize tendências, padrões e insights profundos sobre seu
            progresso e conquistas ao longo do tempo.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    marginBottom: 30,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  disponivel: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
  },
  emBreve: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
  },
  cardDescription: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 34, // Alinhar com o título
  },
  button: {
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },
  emBreveTitle: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default PremiumScreen;
