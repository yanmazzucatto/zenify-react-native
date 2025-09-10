import CurvedHeaderBackground from "@/components/CurvedHeaderBackground";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../theme/ThemeProvider";

// Componente para o cabeçalho personalizado
const CustomHeader = ({ insets }: { insets: any }) => {
  const HEADER_HEIGHT = 160;
  const CURVE_DEPTH = 30;
  const { theme } = useTheme();

  return (
    <View
      style={[styles.headerWrapper, { height: HEADER_HEIGHT + insets.top }]}
    >
      <CurvedHeaderBackground
        height={HEADER_HEIGHT + insets.top}
        curveDepth={CURVE_DEPTH}
      />
      <View style={[styles.headerContent, { paddingTop: insets.top + 20 }]}>
        <Text style={[styles.headerTitle, { color: theme.white }]}>
          Olá, yan!
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.white }]}>
          Bem Vindo ao Zenify
        </Text>
        {/* Ícone de configurações */}
        <View style={styles.headerSettings}>
          <Ionicons name="settings-outline" size={24} color={theme.white} />
        </View>
      </View>
      {/* Navegação superior */}
      <View style={styles.topTabsContainer}>
        <Text style={styles.topTabText}>Home</Text>
        <Text style={styles.topTabText}>Objetivos</Text>
        <Text style={styles.topTabText}>Rede</Text>
      </View>
    </View>
  );
};

export default function TabsLayout() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // O cabeçalho é renderizado manualmente
        tabBarShowLabel: false, // Esconde os rótulos da barra de navegação
        tabBarStyle: [
          styles.tabBar,
          { backgroundColor: theme.card, height: 70 + insets.bottom },
        ],
        tabBarItemStyle: {
          height: 70,
          marginBottom: insets.bottom,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          header: () => <CustomHeader insets={insets} />,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? theme.tabIconActive : theme.tabIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="objetivos"
        options={{
          title: "Objetivos",
          header: () => <CustomHeader insets={insets} />,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "star" : "star-outline"}
              size={24}
              color={focused ? theme.tabIconActive : theme.tabIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rede"
        options={{
          title: "Rede",
          header: () => <CustomHeader insets={insets} />,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? theme.tabIconActive : theme.tabIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          headerShown: false, // O Perfil não tem o cabeçalho curvo
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={24}
              color={focused ? theme.tabIconActive : theme.tabIcon}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerSettings: {
    position: "absolute",
    top: 60,
    right: 24,
  },
  headerTitle: { fontSize: 28, fontWeight: "bold" },
  headerSubtitle: { fontSize: 16, opacity: 0.8 },
  tabBar: {
    borderTopWidth: 0,
    elevation: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
  },
  topTabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  topTabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
