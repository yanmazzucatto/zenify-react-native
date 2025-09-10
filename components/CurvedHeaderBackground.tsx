// components/CurvedHeaderBackground.tsx
import { useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

type CurvedHeaderBackgroundProps = {
  height: number;
  curveDepth: number; // A profundidade da curva no meio
};

const CurvedHeaderBackground: React.FC<CurvedHeaderBackgroundProps> = ({
  height,
  curveDepth,
}) => {
  const { theme } = useTheme();
  const width = 1000; // Usar uma largura grande para que o SVG se escale
  const curveStartPoint = width / 4;
  const curveEndPoint = (width * 3) / 4;

  // Aumenta a profundidade da curva
  const path = `
    M 0 0
    L ${width} 0
    L ${width} ${height - curveDepth}
    C ${curveEndPoint + 50} ${height + curveDepth} ${curveStartPoint - 50} ${
    height + curveDepth
  } ${0} ${height - curveDepth}
    Z
  `;

  return (
    <View style={[StyleSheet.absoluteFillObject, { height }]}>
      <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
        <Path d={path} fill={theme.primary} />
      </Svg>
    </View>
  );
};

export default CurvedHeaderBackground;
