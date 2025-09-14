// components/Charts/PieChart.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '@/constants/Fonts';
import { useTheme } from '@/context/ThemeContext';

interface PieChartData {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

interface PieChartProps {
  data: PieChartData[];
  title: string;
  size?: number;
}

const { width } = Dimensions.get('window');
const CHART_SIZE = Math.min(width - 80, 200);

const PieChart: React.FC<PieChartProps> = ({ 
  data, 
  title, 
  size = CHART_SIZE 
}) => {
  const { colors } = useTheme();
  
  const centerX = size / 2;
  const centerY = size / 2;
  
  let currentAngle = -90; // Start from top
  
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  if (total === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <View style={[styles.emptyState, { height: size }]}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Nenhum dado disponível
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      
      <View style={styles.chartContainer}>
        <View style={[styles.chart, { width: size, height: size }]}>
          {data.map((item, index) => {
            const startAngle = currentAngle;
            const endAngle = currentAngle + (item.percentage / 100) * 360;
            currentAngle = endAngle;
            
            return (
              <View
                key={index}
                style={[
                  styles.slice,
                  {
                    backgroundColor: item.color,
                    transform: [
                      { rotate: `${startAngle}deg` }
                    ]
                  }
                ]}
              />
            );
          })}
          
          {/* Center circle */}
          <View style={[styles.centerCircle, { backgroundColor: colors.background }]}>
            <Text style={[styles.centerText, { color: colors.text }]}>
              {total}
            </Text>
            <Text style={[styles.centerSubtext, { color: colors.textSecondary }]}>
              Total
            </Text>
          </View>
        </View>
        
        {/* Legend */}
        <View style={styles.legend}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={[styles.legendLabel, { color: colors.text }]}>
                {item.label}
              </Text>
              <Text style={[styles.legendValue, { color: colors.textSecondary }]}>
                {item.percentage.toFixed(1)}%
              </Text>
            </View>
          ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chart: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slice: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  centerCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  centerSubtext: {
    fontFamily: Fonts.regular,
    fontSize: 10,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  legend: {
    flex: 1,
    marginLeft: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    flex: 1,
  },
  legendValue: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
  },
});

export default PieChart;
