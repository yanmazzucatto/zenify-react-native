// app/timersession.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useCountdown } from "../hooks/useCountdown";

const ControlButton = ({
  title,
  onPress,
  variant = "default",
}: {
  title: string;
  onPress: () => void;
  variant?: "default" | "danger";
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.controlButton,
        variant === "danger" ? styles.dangerButton : styles.defaultButton,
      ]}
      onPress={onPress}
    >
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function TimerSessionScreen() {
  const params = useLocalSearchParams();
  const duration = parseFloat((params.duration as string) || "25");
  const bgColor = (params.bgColor as string) || "#A8A2FF";
  const textColor = (params.textColor as string) || "#FFFFFF";

  const handleTimerEnd = () => {
    alert("Sessão de foco concluída!");
    router.back();
  };

  const { minutes, seconds, isActive, togglePause } = useCountdown(
    duration,
    handleTimerEnd
  );

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={[styles.timerText, { color: textColor }]}>
        {formattedTime}
      </Text>
      <View style={styles.controls}>
        <ControlButton
          title={isActive ? "Pausar" : "Retomar"}
          onPress={togglePause}
        />
        <ControlButton
          title="Encerrar"
          onPress={() => router.back()}
          variant="danger"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 80,
    fontWeight: "bold",
    // fontFamily: 'monospace' // Uma fonte monoespaçada é boa para timers
  },
  controls: {
    flexDirection: "row",
    marginTop: 60,
  },
  controlButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginHorizontal: 10,
  },
  defaultButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  dangerButton: {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
  },
  controlButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
