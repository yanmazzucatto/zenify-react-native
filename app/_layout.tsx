import { useAuthStore } from "@/store/authStore";
import { ThemeProvider } from "@/theme/ThemeProvider";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { router, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Importar SafeAreaProvider

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isAuthenticated } = useAuthStore();
  const segments = useSegments();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)" as any);
    } else if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)" as any);
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      {/* Adicione headerShown: false para o grupo (tabs) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="premium"
        options={{ headerShown: true, presentation: "modal" }}
      />
      <Stack.Screen name="focustimer" options={{ headerShown: true }} />
      <Stack.Screen name="timersession" options={{ headerShown: false }} />{" "}
      {/* Também sem header padrão */}
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        {" "}
        {/* Envolva todo o app com SafeAreaProvider */}
        <RootLayoutNav />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
