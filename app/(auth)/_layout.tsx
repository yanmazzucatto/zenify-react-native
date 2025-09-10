import { Stack } from "expo-router";

export default function AuthLayout() {
  // O Stack já é o container visual. Não precisamos de um ThemedView aqui por fora.
  // O fundo de cada tela (login, signup) já é controlado pelo ThemedView dentro delas.
  return <Stack screenOptions={{ headerShown: false }} />;
}
