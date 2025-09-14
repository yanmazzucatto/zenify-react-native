import ProgressChart from "@/components/Charts/ProgressChart";
import CreateTaskModal from "@/components/CreateTaskModal";
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

const ObjectivesScreen = () => {
  const { colors } = useTheme();
  const { 
    getActivitiesForDate, 
    getCategoryStats, 
    toggleActivity,
    isLoading 
  } = useActivityStore();
  
  const [selectedCategory, setSelectedCategory] = useState('corpo');
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [todayActivities, setTodayActivities] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});

  const categories = [
    { key: 'corpo', label: 'Corpo', icon: 'fitness', color: '#34C759' },
    { key: 'mente', label: 'Mente', icon: 'brain', color: '#6C63FF' },
    { key: 'estudo', label: 'Estudo', icon: 'book', color: '#FF9500' },
    { key: 'trabalho', label: 'Trabalho', icon: 'briefcase', color: '#007AFF' },
    { key: 'hobbie', label: 'Hobbie', icon: 'heart', color: '#FF3B30' },
  ];

  const loadData = () => {
    const today = new Date().toISOString().split('T')[0];
    const activities = getActivitiesForDate(today);
    const filteredActivities = activities.filter(activity => 
      activity.category === selectedCategory
    );
    
    const stats = getCategoryStats(selectedCategory, 30);
    
    setTodayActivities(filteredActivities);
    setCategoryStats(stats);
  };

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const handleToggleActivity = (activityId) => {
    toggleActivity(activityId);
    loadData(); // Reload data after toggle
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const getCompletionPercentage = () => {
    if (todayActivities.length === 0) return 0;
    const completed = todayActivities.filter(activity => activity.completed).length;
    return Math.round((completed / todayActivities.length) * 100);
  };

  const getChartData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const activities = getActivitiesForDate(dateStr).filter(a => a.category === selectedCategory);
      const completed = activities.filter(a => a.completed).length;
      const percentage = activities.length > 0 ? (completed / activities.length) * 100 : 0;
      
      last7Days.push({
        label: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
        data: percentage
      });
    }
    
    return {
      labels: last7Days.map(day => day.label),
      data: last7Days.map(day => day.data)
    };
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Carregando objetivos...
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
              Seus objetivos de hoje
            </Text>
          </View>
          <TouchableOpacity onPress={() => console.log("Configurações")}>
            <Ionicons name="settings-outline" size={24} color={colors.icon} />
          </TouchableOpacity>
        </View>

        {/* Category Selector */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Categorias
          </Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.key && styles.selectedCategoryItem
                ]}
                onPress={() => setSelectedCategory(category.key)}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    { 
                      backgroundColor: selectedCategory === category.key 
                        ? category.color 
                        : colors.inputBackground,
                      borderColor: category.color,
                      borderWidth: selectedCategory === category.key ? 0 : 2
                    },
                  ]}
                >
                  <Ionicons 
                    name={category.icon} 
                    size={24} 
                    color={selectedCategory === category.key ? colors.white : category.color} 
                  />
                </View>
                <Text style={[
                  styles.categoryText, 
                  { 
                    color: selectedCategory === category.key ? colors.text : colors.textSecondary 
                  }
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Progress Overview */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Progresso de Hoje - {categories.find(c => c.key === selectedCategory)?.label}
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
                    backgroundColor: categories.find(c => c.key === selectedCategory)?.color || colors.primary,
                    width: `${getCompletionPercentage()}%` 
                  }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.progressStats}>
            <Text style={[styles.progressText, { color: colors.textSecondary }]}>
              {todayActivities.filter(a => a.completed).length} de {todayActivities.length} tarefas concluídas
            </Text>
          </View>
        </View>

        {/* Today's Activities */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.activitiesHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Tarefas de Hoje
            </Text>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowCreateTaskModal(true)}
            >
              <Ionicons name="add" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          
          {todayActivities.length > 0 ? (
            <View style={styles.activitiesList}>
              {todayActivities.map((activity) => (
                <TouchableOpacity
                  key={activity.id}
                  style={[
                    styles.activityItem,
                    { borderBottomColor: colors.border }
                  ]}
                  onPress={() => handleToggleActivity(activity.id)}
                >
                  <View style={styles.activityContent}>
                    <View style={[
                      styles.checkbox,
                      { 
                        backgroundColor: activity.completed ? colors.primary : 'transparent',
                        borderColor: colors.primary
                      }
                    ]}>
                      {activity.completed && (
                        <Ionicons name="checkmark" size={16} color={colors.white} />
                      )}
                    </View>
                    <View style={styles.activityText}>
                      <Text style={[
                        styles.activityTitle,
                        { 
                          color: activity.completed ? colors.textSecondary : colors.text,
                          textDecorationLine: activity.completed ? 'line-through' : 'none'
                        }
                      ]}>
                        {activity.title}
                      </Text>
                      {activity.description && (
                        <Text style={[styles.activityDescription, { color: colors.textSecondary }]}>
                          {activity.description}
                        </Text>
                      )}
                      {activity.scheduledTime && (
                        <Text style={[styles.activityTime, { color: colors.primary }]}>
                          <Ionicons name="time" size={12} color={colors.primary} />
                          {' '}{activity.scheduledTime}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="list" size={48} color={colors.textSecondary} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Nenhuma tarefa para hoje
              </Text>
              <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
                Toque no + para adicionar uma nova tarefa
              </Text>
            </View>
          )}
        </View>

        {/* Weekly Progress Chart */}
        <ProgressChart 
          data={getChartData()}
          title={`Progresso Semanal - ${categories.find(c => c.key === selectedCategory)?.label}`}
        />

        {/* Category Statistics */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Estatísticas (30 dias)
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {categoryStats.total || 0}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Total de Tarefas
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.accent }]}>
                {categoryStats.completed || 0}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Concluídas
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {Math.round(categoryStats.percentage || 0)}%
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Taxa de Conclusão
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Create Task Modal */}
      <CreateTaskModal
        visible={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
        category={selectedCategory}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 80,
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
  selectedCategoryItem: {
    transform: [{ scale: 1.05 }],
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
  activitiesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activitiesList: {
    gap: 0,
  },
  activityItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  activityContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    marginBottom: 4,
  },
  activityDescription: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginBottom: 4,
  },
  activityTime: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    textAlign: "center",
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
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "48%", // Adjust as needed
    marginBottom: 15,
    alignItems: "center",
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  categoryText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },
  categorySubText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
});

export default ObjectivesScreen;
