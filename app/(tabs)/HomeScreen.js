import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import { Fonts } from "@/constants/Fonts";
import { useTheme } from "@/context/ThemeContext";
import { useActivityStore } from "@/store/activityStore";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const HomeScreen = () => {
  const { colors } = useTheme();
  const { 
    getDailyProgress, 
    getLast30DaysData, 
    getCategoryStats, 
    getTrendData,
    isLoading 
  } = useActivityStore();
  
  const [todayProgress, setTodayProgress] = useState(null);
  const [last30Days, setLast30Days] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});
  const [trendData, setTrendData] = useState({ labels: [], data: [] });

  const loadData = async () => {
    const today = new Date().toISOString().split('T')[0];
    const progress = getDailyProgress(today);
    const last30 = getLast30DaysData();
    const trend = getTrendData(7); // Last 7 days
    
    const stats = {
      corpo: getCategoryStats('corpo', 30),
      mente: getCategoryStats('mente', 30),
      estudo: getCategoryStats('estudo', 30),
      trabalho: getCategoryStats('trabalho', 30),
      hobbie: getCategoryStats('hobbie', 30),
    };

    setTodayProgress(progress);
    setLast30Days(last30);
    setCategoryStats(stats);
    setTrendData(trend);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const getCompletionPercentage = () => {
    if (!todayProgress || todayProgress.totalActivities === 0) return 0;
    return Math.round((todayProgress.completedActivities / todayProgress.totalActivities) * 100);
  };

  const getPieChartData = () => {
    const categories = ['corpo', 'mente', 'estudo', 'trabalho', 'hobbie'];
    const colors = ['#34C759', '#6C63FF', '#FF9500', '#007AFF', '#FF3B30'];
    const labels = ['Corpo', 'Mente', 'Estudo', 'Trabalho', 'Hobbie'];
    
    return categories.map((category, index) => ({
      label: labels[index],
      value: categoryStats[category]?.completed || 0,
      color: colors[index],
      percentage: categoryStats[category]?.percentage || 0,
    }));
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Carregando dados...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.text }]}>
              {getGreeting()}, yan!
            </Text>
            <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>
              Bem vindo ao Zenify
            </Text>
          </View>
          <TouchableOpacity onPress={() => console.log("Configurações")}>
            <Ionicons name="settings-outline" size={24} color={colors.icon} />
          </TouchableOpacity>
        </View>

        {/* Progresso de Hoje */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Progresso de Hoje
            </Text>
            <Text style={[styles.progressPercentage, { color: colors.primary }]}>
              {getCompletionPercentage()}%
            </Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: colors.primary,
                    width: `${getCompletionPercentage()}%` 
                  }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.progressStats}>
            <Text style={[styles.progressText, { color: colors.textSecondary }]}>
              {todayProgress?.completedActivities || 0} de {todayProgress?.totalActivities || 0} tarefas concluídas
            </Text>
          </View>
        </View>

        {/* Gráfico de Progresso por Categoria */}
        <PieChart 
          data={getPieChartData()}
          title="Atividades por Categoria (30 dias)"
        />

        {/* Gráfico de Tendência */}
        <LineChart 
          data={trendData}
          title="Tendência de Produtividade (7 dias)"
          color={colors.primary}
        />

        {/* Estatísticas por Categoria */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Estatísticas por Categoria
          </Text>
          <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
            Últimos 30 dias
          </Text>
          
          <View style={styles.categoryStatsContainer}>
            {Object.entries(categoryStats).map(([category, stats]) => (
              <View key={category} style={styles.categoryStatItem}>
                <View style={styles.categoryStatHeader}>
                  <Text style={[styles.categoryStatLabel, { color: colors.text }]}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                  <Text style={[styles.categoryStatPercentage, { color: colors.primary }]}>
                    {Math.round(stats.percentage)}%
                  </Text>
                </View>
                <View style={[styles.categoryStatBar, { backgroundColor: colors.border }]}>
                  <View 
                    style={[
                      styles.categoryStatFill, 
                      { 
                        backgroundColor: colors.primary,
                        width: `${stats.percentage}%` 
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.categoryStatText, { color: colors.textSecondary }]}>
                  {stats.completed} de {stats.total} concluídas
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Resumo da Semana */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Resumo da Semana
          </Text>
          
          <View style={styles.weekSummaryContainer}>
            <View style={styles.weekSummaryItem}>
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              <View style={styles.weekSummaryText}>
                <Text style={[styles.weekSummaryValue, { color: colors.text }]}>
                  {last30Days.slice(-7).reduce((sum, day) => sum + day.completedActivities, 0)}
                </Text>
                <Text style={[styles.weekSummaryLabel, { color: colors.textSecondary }]}>
                  Tarefas Concluídas
                </Text>
              </View>
            </View>
            
            <View style={styles.weekSummaryItem}>
              <Ionicons name="trending-up" size={24} color={colors.accent} />
              <View style={styles.weekSummaryText}>
                <Text style={[styles.weekSummaryValue, { color: colors.text }]}>
                  {Math.round(last30Days.slice(-7).reduce((sum, day) => 
                    sum + (day.totalActivities > 0 ? (day.completedActivities / day.totalActivities) * 100 : 0), 0
                  ) / 7)}%
                </Text>
                <Text style={[styles.weekSummaryLabel, { color: colors.textSecondary }]}>
                  Média de Conclusão
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => console.log("Criar Publicação")}
      >
        <Ionicons name="add" size={30} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 80, // Espaço para o FAB
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  greeting: {
    fontFamily: Fonts.bold,
    fontSize: 28,
  },
  welcomeText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
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
  cardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    marginBottom: 10,
  },
  cardContent: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  progressPercentage: {
    fontFamily: Fonts.bold,
    fontSize: 24,
  },
  progressBarContainer: {
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressStats: {
    alignItems: "center",
  },
  progressText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  cardSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginBottom: 15,
  },
  categoryStatsContainer: {
    gap: 15,
  },
  categoryStatItem: {
    marginBottom: 10,
  },
  categoryStatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  categoryStatLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },
  categoryStatPercentage: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  categoryStatBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 5,
  },
  categoryStatFill: {
    height: "100%",
    borderRadius: 3,
  },
  categoryStatText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
  weekSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  weekSummaryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  weekSummaryText: {
    alignItems: "flex-start",
  },
  weekSummaryValue: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
  weekSummaryLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    marginTop: 10,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#fff",
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
  messageContent: {
    flex: 1,
  },
  messageSender: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },
  messageText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  messageTime: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
  progressContainer: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  dailyProgressContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  dailyProgressItem: {
    alignItems: "center",
  },
  dailyProgressLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
  dailyProgressValue: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    marginTop: 5,
  },
  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
});

export default HomeScreen;
