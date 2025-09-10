import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

// Importando os componentes com o atalho correto
import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";
import { useTheme } from "@/theme/ThemeProvider";

export default function NotFoundScreen() {
  const { theme } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Esta tela não existe.</ThemedText>
        <Link href="/" asChild>
          <Text style={[styles.link, { color: theme.primary }]}>
            Voltar para a tela inicial!
          </Text>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
