import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Fonts } from "@/constants/Fonts";
import { useTheme } from "@/context/ThemeContext";

const ProfileScreen = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.headerTitle, { color: colors.text }]}>Perfil</Text>

      {/* Perfil Card */}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Seu nome</Text>
        <View style={styles.infoRow}>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            yanmazzucatto
          </Text>
          <TouchableOpacity>
            <Ionicons name="copy-outline" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.cardTitle, { color: colors.text, marginTop: 15 }]}>
          Email da conta
        </Text>
        <View style={styles.infoRow}>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            yanmazzucatto@gmail.com
          </Text>
          <TouchableOpacity>
            <Ionicons name="copy-outline" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Aparência Card */}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.row}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Aparência
          </Text>
          <Switch
            trackColor={{ false: colors.gray, true: colors.primary }}
            thumbColor={isDarkMode ? colors.white : colors.lightGray}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>
          Modo escuro
        </Text>
      </View>

      {/* Conta Card */}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Conta</Text>
        <TouchableOpacity onPress={() => console.log("Sair da conta")}>
          <Text style={[styles.logoutText, { color: colors.error }]}>
            Sair da conta
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sobre Card */}
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Sobre</Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>
          Zenify v1.0.0
        </Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>
          Um app para bem-estar e produtividade.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    marginBottom: 30,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    marginBottom: 5,
  },
  cardText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  logoutText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    marginTop: 10,
  },
});

export default ProfileScreen;
