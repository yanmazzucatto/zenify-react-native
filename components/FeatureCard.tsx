import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme/ThemeProvider";
import { Card } from "@/components/Card";
import { CustomButton } from "@/components/CustomButton";
import { palette } from "@/theme/colors";

type FeatureCardProps = {
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  description: string;
  status: "available" | "soon";
  onPress?: () => void;
};

const StatusBadge = ({ status }: { status: "available" | "soon" }) => {
  const isAvailable = status === "available";
  const text = isAvailable ? "Disponível" : "Em breve";
  const color = isAvailable ? palette.green : palette.lightGray;

  return (
    <View style={[styles.badge, { backgroundColor: `${color}20` }]}>
      <Text style={[styles.badgeText, { color }]}>{text}</Text>
    </View>
  );
};

export const FeatureCard = ({
  iconName,
  title,
  description,
  status,
  onPress,
}: FeatureCardProps) => {
  const { theme } = useTheme();
  const isAvailable = status === "available";

  return (
    <Card style={!isAvailable && { opacity: 0.6 }}>
      <View style={styles.header}>
        <Ionicons name={iconName} size={24} color={theme.textSecondary} />
        <StatusBadge status={status} />
      </View>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.description, { color: theme.textSecondary }]}>
        {description}
      </Text>
      {isAvailable && onPress && (
        <CustomButton
          title={`Abrir ${title}`}
          onPress={onPress}
          style={{ marginTop: 16 }}
        />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
