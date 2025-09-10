import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Stack, router } from "expo-router";
import { ThemedView } from "@/components/themed/ThemedView";
import { useTheme } from "@/theme/ThemeProvider";
import { palette } from "@/theme/colors";
import { CustomButton } from "@/components/CustomButton";

const PresetButton = ({
  label,
  onPress,
  isSelected,
}: {
  label: string;
  onPress: () => void;
  isSelected: boolean;
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.preset,
        { backgroundColor: isSelected ? theme.primary : theme.card },
      ]}
      onPress={onPress}
    >
      <Text style={{ color: isSelected ? "white" : theme.text }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function FocusTimerScreen() {
  const { theme } = useTheme();
  const [minutes, setMinutes] = React.useState("25");
  const [seconds, setSeconds] = React.useState("0");

  const handleStart = () => {
    const totalMinutes =
      parseInt(minutes || "0", 10) + parseInt(seconds || "0", 10) / 60;
    if (totalMinutes > 0) {
      router.push({
        pathname: "/timersession",
        params: {
          duration: totalMinutes,
          bgColor: "#A8A2FF",
          textColor: "#FFFFFF",
        },
      });
    } else {
      alert("Por favor, insira uma duração válida.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Focus Timer",
          headerStyle: { backgroundColor: theme.card },
          headerTintColor: theme.text,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Personalização
          </Text>
          <Text style={{ color: theme.textSecondary, marginBottom: 16 }}>
            Opções de personalização de cor e fonte estarão disponíveis em
            breve.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Configuração do Timer
          </Text>
          <View style={styles.presetsContainer}>
            <PresetButton
              label="10m"
              isSelected={minutes === "10"}
              onPress={() => setMinutes("10")}
            />
            <PresetButton
              label="25m"
              isSelected={minutes === "25"}
              onPress={() => setMinutes("25")}
            />
            <PresetButton
              label="60m"
              isSelected={minutes === "60"}
              onPress={() => setMinutes("60")}
            />
          </View>
          <View style={styles.inputsContainer}>
            <TextInput
              style={[
                styles.timeInput,
                { color: theme.text, borderColor: theme.background },
              ]}
              value={minutes}
              onChangeText={setMinutes}
              keyboardType="number-pad"
              placeholder="Minutos"
              placeholderTextColor={theme.textSecondary}
            />
            <TextInput
              style={[
                styles.timeInput,
                { color: theme.text, borderColor: theme.background },
              ]}
              value={seconds}
              onChangeText={setSeconds}
              keyboardType="number-pad"
              placeholder="Segundos"
              placeholderTextColor={theme.textSecondary}
            />
          </View>
        </View>

        <CustomButton title="Iniciar" onPress={handleStart} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24 },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  presetsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  preset: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  inputsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  timeInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    width: "45%",
    textAlign: "center",
  },
});
