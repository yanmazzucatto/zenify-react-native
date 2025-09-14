// components/Charts/LineChart.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '@/constants/Fonts';
import { useTheme } from '@/context/ThemeContext';

interface LineChartProps {
  data: { labels: string[]; data: number[] };
  title: string;
  height?: number;
  color?: string;
}

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 40;
const CHART_HEIGHT = 200;

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  title, 
  height = CHART_HEIGHT,
  color 
}) => {
  const { colors } = useTheme();
  const lineColor = color || colors.primary;
  
  const maxValue = Math.max(...data.data, 100);
  const minValue = Math.min(...data.data, 0);
  const range = maxValue - minValue;
  
  const points = data.data.map((value, index) => {
    const x = (index / (data.data.length - 1)) * (CHART_WIDTH - 40);
    const y = height - 40 - ((value - minValue) / range) * (height - 40);
    return { x, y, value };
  });

  const createPath = () => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      
      const cp1x = prevPoint.x + (currentPoint.x - prevPoint.x) / 3;
      const cp1y = prevPoint.y;
      const cp2x = prevPoint.x + (currentPoint.x - prevPoint.x) * 2 / 3;
      const cp2y = currentPoint.y;
      
      path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${currentPoint.x} ${currentPoint.y}`;
    }
    
    return path;
  };


  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      
      <View style={[styles.chartContainer, { height }]}>
        <View style={styles.chart}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((value, index) => {
            const y = height - 40 - ((value - minValue) / range) * (height - 40);
            return (
              <View
                key={index}
                style={[
                  styles.gridLine,
                  { 
                    top: y,
                    backgroundColor: colors.border 
                  }
                ]}
              />
            );
          })}
          
          {/* Area under the curve */}
          <View style={styles.areaContainer}>
            <View
              style={[
                styles.area,
                {
                  backgroundColor: lineColor + '20',
                  height: height - 40,
                }
              ]}
            />
          </View>
          
          {/* Line */}
          <View style={styles.lineContainer}>
            {points.map((point, index) => (
              <View
                key={index}
                style={[
                  styles.point,
                  {
                    left: point.x - 4,
                    top: point.y - 4,
                    backgroundColor: lineColor,
                  }
                ]}
              />
            ))}
            
            {/* Connect points with lines */}
            {points.map((point, index) => {
              if (index === 0) return null;
              const prevPoint = points[index - 1];
              const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x);
              const distance = Math.sqrt(
                Math.pow(point.x - prevPoint.x, 2) + Math.pow(point.y - prevPoint.y, 2)
              );
              
              return (
                <View
                  key={`line-${index}`}
                  style={[
                    styles.line,
                    {
                      left: prevPoint.x,
                      top: prevPoint.y,
                      width: distance,
                      backgroundColor: lineColor,
                      transform: [{ rotate: `${angle}rad` }],
                    }
                  ]}
                />
              );
            })}
          </View>
          
          {/* Y-axis labels */}
          <View style={styles.yAxisLabels}>
            {[0, 25, 50, 75, 100].map((value, index) => {
              const y = height - 40 - ((value - minValue) / range) * (height - 40);
              return (
                <Text
                  key={index}
                  style={[
                    styles.yAxisLabel,
                    { 
                      color: colors.textSecondary,
                      top: y - 8 
                    }
                  ]}
                >
                  {value}%
                </Text>
              );
            })}
          </View>
        </View>
        
        {/* X-axis labels */}
        <View style={styles.xAxisLabels}>
          {data.labels.map((label, index) => (
            <Text
              key={index}
              style={[styles.xAxisLabel, { color: colors.textSecondary }]}
            >
              {label}
            </Text>
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
    position: 'relative',
  },
  chart: {
    position: 'relative',
    height: '100%',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
  },
  areaContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  area: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  lineContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  point: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  line: {
    position: 'absolute',
    height: 2,
  },
  yAxisLabels: {
    position: 'absolute',
    left: -30,
    top: 0,
    height: '100%',
  },
  yAxisLabel: {
    position: 'absolute',
    fontFamily: Fonts.regular,
    fontSize: 10,
    textAlign: 'right',
    width: 25,
  },
  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  xAxisLabel: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    textAlign: 'center',
  },
});

export default LineChart;
