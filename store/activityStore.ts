// store/activityStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Activity {
  id: string;
  category: 'corpo' | 'mente' | 'estudo' | 'trabalho' | 'hobbie';
  title: string;
  description?: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  scheduledTime?: string; // HH:MM format
  scheduledDays: number[]; // 0=Sunday, 1=Monday, etc.
  notificationEnabled: boolean;
  isCustom: boolean;
  userId: string;
}

export interface DailyProgress {
  date: string; // YYYY-MM-DD format
  activities: Activity[];
  totalActivities: number;
  completedActivities: number;
  categories: {
    corpo: { total: number; completed: number };
    mente: { total: number; completed: number };
    estudo: { total: number; completed: number };
    trabalho: { total: number; completed: number };
    hobbie: { total: number; completed: number };
  };
}

export interface WeeklyData {
  week: string; // YYYY-WW format
  days: DailyProgress[];
  totalActivities: number;
  completedActivities: number;
  averageCompletion: number;
}

export interface MonthlyData {
  month: string; // YYYY-MM format
  weeks: WeeklyData[];
  totalActivities: number;
  completedActivities: number;
  averageCompletion: number;
  categories: {
    corpo: { total: number; completed: number };
    mente: { total: number; completed: number };
    estudo: { total: number; completed: number };
    trabalho: { total: number; completed: number };
    hobbie: { total: number; completed: number };
  };
}

interface ActivityState {
  activities: Activity[];
  dailyProgress: { [date: string]: DailyProgress };
  currentMonth: string;
  isLoading: boolean;

  // Actions
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => void;
  updateActivity: (id: string, updates: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  toggleActivity: (id: string) => void;
  getActivitiesForDate: (date: string) => Activity[];
  getDailyProgress: (date: string) => DailyProgress;
  getWeeklyData: (week: string) => WeeklyData;
  getMonthlyData: (month: string) => MonthlyData;
  getLast30DaysData: () => DailyProgress[];
  getCategoryStats: (category: string, days: number) => { total: number; completed: number; percentage: number };
  getTrendData: (days: number) => { labels: string[]; data: number[] };
  setCurrentMonth: (month: string) => void;
  setLoading: (loading: boolean) => void;
}

// Helper functions
const getDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const getWeekString = (date: Date): string => {
  const year = date.getFullYear();
  const week = Math.ceil(((date.getTime() - new Date(year, 0, 1).getTime()) / 86400000 + 1) / 7);
  return `${year}-W${week.toString().padStart(2, '0')}`;
};

const getMonthString = (date: Date): string => {
  return date.toISOString().substring(0, 7);
};

const getDaysInRange = (startDate: Date, endDate: Date): string[] => {
  const days: string[] = [];
  const current = new Date(startDate);
  
  while (current <= endDate) {
    days.push(getDateString(current));
    current.setDate(current.getDate() + 1);
  }
  
  return days;
};

const getLast30Days = (): string[] => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 29);
  return getDaysInRange(startDate, endDate);
};

// Mock data generator
const generateMockActivities = (): Activity[] => {
  const categories: Activity['category'][] = ['corpo', 'mente', 'estudo', 'trabalho', 'hobbie'];
  const activities: Activity[] = [];
  
  const last30Days = getLast30Days();
  
  last30Days.forEach((date, index) => {
    const dayOfWeek = new Date(date).getDay();
    
    // Generate 2-5 activities per day
    const activityCount = Math.floor(Math.random() * 4) + 2;
    
    for (let i = 0; i < activityCount; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const completed = Math.random() > 0.3; // 70% completion rate
      
      activities.push({
        id: `activity_${date}_${i}`,
        category,
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Activity ${i + 1}`,
        description: `Description for ${category} activity`,
        completed,
        completedAt: completed ? new Date(date).toISOString() : undefined,
        createdAt: new Date(date).toISOString(),
        scheduledTime: `${Math.floor(Math.random() * 12) + 8}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        scheduledDays: [1, 2, 3, 4, 5], // Monday to Friday
        notificationEnabled: true,
        isCustom: false,
        userId: 'current_user_id',
      });
    }
  });
  
  return activities;
};

export const useActivityStore = create<ActivityState>()(
  persist(
    (set, get) => ({
      activities: generateMockActivities(),
      dailyProgress: {},
      currentMonth: getMonthString(new Date()),
      isLoading: false,

      addActivity: (activityData) => {
        const newActivity: Activity = {
          ...activityData,
          id: `activity_${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          activities: [...state.activities, newActivity]
        }));
      },

      updateActivity: (id, updates) => {
        set((state) => ({
          activities: state.activities.map(activity =>
            activity.id === id ? { ...activity, ...updates } : activity
          )
        }));
      },

      deleteActivity: (id) => {
        set((state) => ({
          activities: state.activities.filter(activity => activity.id !== id)
        }));
      },

      toggleActivity: (id) => {
        set((state) => ({
          activities: state.activities.map(activity =>
            activity.id === id
              ? {
                  ...activity,
                  completed: !activity.completed,
                  completedAt: !activity.completed ? new Date().toISOString() : undefined
                }
              : activity
          )
        }));
      },

      getActivitiesForDate: (date) => {
        const { activities } = get();
        return activities.filter(activity => 
          activity.createdAt.startsWith(date) || 
          (activity.completed && activity.completedAt?.startsWith(date))
        );
      },

      getDailyProgress: (date) => {
        const { activities } = get();
        const dayActivities = activities.filter(activity => 
          activity.createdAt.startsWith(date) || 
          (activity.completed && activity.completedAt?.startsWith(date))
        );

        const categories = {
          corpo: { total: 0, completed: 0 },
          mente: { total: 0, completed: 0 },
          estudo: { total: 0, completed: 0 },
          trabalho: { total: 0, completed: 0 },
          hobbie: { total: 0, completed: 0 },
        };

        dayActivities.forEach(activity => {
          categories[activity.category].total++;
          if (activity.completed) {
            categories[activity.category].completed++;
          }
        });

        return {
          date,
          activities: dayActivities,
          totalActivities: dayActivities.length,
          completedActivities: dayActivities.filter(a => a.completed).length,
          categories,
        };
      },

      getWeeklyData: (week) => {
        const { activities } = get();
        const weekActivities = activities.filter(activity => {
          const activityDate = new Date(activity.createdAt);
          return getWeekString(activityDate) === week;
        });

        const days: DailyProgress[] = [];
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        
        for (let i = 0; i < 7; i++) {
          const dayDate = new Date(weekStart);
          dayDate.setDate(dayDate.getDate() + i);
          const dateStr = getDateString(dayDate);
          days.push(get().getDailyProgress(dateStr));
        }

        const totalActivities = days.reduce((sum, day) => sum + day.totalActivities, 0);
        const completedActivities = days.reduce((sum, day) => sum + day.completedActivities, 0);

        return {
          week,
          days,
          totalActivities,
          completedActivities,
          averageCompletion: totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0,
        };
      },

      getMonthlyData: (month) => {
        const { activities } = get();
        const monthActivities = activities.filter(activity => 
          activity.createdAt.startsWith(month)
        );

        const weeks: WeeklyData[] = [];
        const monthStart = new Date(month + '-01');
        const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
        
        let currentWeek = getWeekString(monthStart);
        let weekData = get().getWeeklyData(currentWeek);
        weeks.push(weekData);

        let currentDate = new Date(monthStart);
        currentDate.setDate(currentDate.getDate() + 7);
        
        while (currentDate <= monthEnd) {
          const weekStr = getWeekString(currentDate);
          if (weekStr !== currentWeek) {
            currentWeek = weekStr;
            weekData = get().getWeeklyData(currentWeek);
            weeks.push(weekData);
          }
          currentDate.setDate(currentDate.getDate() + 7);
        }

        const totalActivities = weeks.reduce((sum, week) => sum + week.totalActivities, 0);
        const completedActivities = weeks.reduce((sum, week) => sum + week.completedActivities, 0);

        const categories = {
          corpo: { total: 0, completed: 0 },
          mente: { total: 0, completed: 0 },
          estudo: { total: 0, completed: 0 },
          trabalho: { total: 0, completed: 0 },
          hobbie: { total: 0, completed: 0 },
        };

        monthActivities.forEach(activity => {
          categories[activity.category].total++;
          if (activity.completed) {
            categories[activity.category].completed++;
          }
        });

        return {
          month,
          weeks,
          totalActivities,
          completedActivities,
          averageCompletion: totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0,
          categories,
        };
      },

      getLast30DaysData: () => {
        const last30Days = getLast30Days();
        return last30Days.map(date => get().getDailyProgress(date));
      },

      getCategoryStats: (category, days) => {
        const { activities } = get();
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days + 1);
        
        const categoryActivities = activities.filter(activity => {
          const activityDate = new Date(activity.createdAt);
          return activity.category === category && 
                 activityDate >= startDate && 
                 activityDate <= endDate;
        });

        const total = categoryActivities.length;
        const completed = categoryActivities.filter(a => a.completed).length;
        const percentage = total > 0 ? (completed / total) * 100 : 0;

        return { total, completed, percentage };
      },

      getTrendData: (days) => {
        const last30Days = getLast30Days();
        const selectedDays = last30Days.slice(-days);
        
        const labels = selectedDays.map(date => {
          const d = new Date(date);
          return `${d.getDate()}/${d.getMonth() + 1}`;
        });
        
        const data = selectedDays.map(date => {
          const progress = get().getDailyProgress(date);
          return progress.totalActivities > 0 
            ? (progress.completedActivities / progress.totalActivities) * 100 
            : 0;
        });

        return { labels, data };
      },

      setCurrentMonth: (month) => set({ currentMonth: month }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'activity-storage',
      partialize: (state) => ({ 
        activities: state.activities,
        currentMonth: state.currentMonth 
      }),
    }
  )
);
