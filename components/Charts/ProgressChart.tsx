// components/Charts/ProgressChart.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '@/constants/Fonts';
import { useTheme } from '@/context/ThemeContext';

interface ProgressChartProps {
  data: { labels: string[]; data: number[] };
  title: string;
  height?: number;
}

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 40;
const CHART_HEIGHT = 200;

const ProgressChart: React.FC<ProgressChartProps> = ({ 
  data, 
  title, 
  height = CHART_HEIGHT 
}) => {
  const { colors } = useTheme();
  
  const maxValue = Math.max(...data.data, 100);

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      
      <View style={[styles.chartContainer, { height }]}>
        <View style={styles.barsContainer}>
          {data.data.map((value, index) => {
            const barHeight = (value / maxValue) * (height - 40);
            const percentage = Math.round(value);
            
            return (
              <View key={index} style={styles.barWrapper}>
                <View style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        backgroundColor: colors.primary,
                      }
                    ]}
                  />
                </View>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  {data.labels[index]}
                </Text>
                <Text style={[styles.percentage, { color: colors.text }]}>
                  {percentage}%
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    marginBottom: 15,
  },
  chartContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: '80%',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  bar: {
    width: 20,
    borderRadius: 10,
    minHeight: 2,
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  percentage: {
    fontFamily: Fonts.semiBold,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default ProgressChart;
