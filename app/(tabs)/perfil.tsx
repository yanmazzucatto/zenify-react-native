import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { ThemedView } from "@/components/themed/ThemedView";
import { Header } from "@/components/Header";
import { useTheme } from "@/theme/ThemeProvider";
import { Card } from "@/components/Card";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { palette } from "@/theme/colors";

const ProfileInfoRow = ({
  label,
  value,
  showCopy = false,
}: {
  label: string;
  value: string;
  showCopy?: boolean;
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.infoRow}>
      <View>
        <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
          {label}
        </Text>
        <Text style={[styles.infoValue, { color: theme.text }]}>{value}</Text>
      </View>
      {showCopy && (
        <TouchableOpacity onPress={() => alert("Email copiado!")}>
          <Ionicons name="copy-outline" size={24} color={theme.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function PerfilScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { logout } = useAuthStore();

  return (
    <ThemedView style={styles.container}>
      <Header name="yan" />
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.push("/premium")}>
          <Card style={styles.premiumCard}>
            <View>
              <Text style={[styles.premiumTitle, { color: theme.text }]}>
                Recursos Premium
              </Text>
              <Text style={{ color: theme.textSecondary }}>
                Turbine sua produtividade
              </Text>
            </View>
            <Ionicons name="sparkles" size={24} color={palette.purple} />
          </Card>
        </TouchableOpacity>
        <Card>
          <ProfileInfoRow label="Seu nome" value="yan" />
          <View
            style={[styles.divider, { backgroundColor: theme.background }]}
          />
          <ProfileInfoRow
            label="Email da conta"
            value="yanmazzucatto@gmail.com"
            showCopy
          />
        </Card>
        <Card>
          <ToggleSwitch
            label="Modo escuro"
            icon={
              <Ionicons
                name={isDark ? "moon" : "sunny"}
                size={22}
                color={theme.textSecondary}
              />
            }
            value={isDark}
            onValueChange={toggleTheme}
          />
        </Card>
        <Card>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="exit-outline" size={22} color={palette.red} />
            <Text style={[styles.logoutText, { color: palette.red }]}>
              Sair da conta
            </Text>
          </TouchableOpacity>
        </Card>
        <Card>
          <Text
            style={[styles.infoValue, { color: theme.text, marginBottom: 8 }]}
          >
            Sobre
          </Text>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
            Zenify v1.0.0
          </Text>
          <Text
            style={[
              styles.infoLabel,
              { color: theme.textSecondary, marginTop: 4 },
            ]}
          >
            Um app para bem-estar e produtividade.
          </Text>
        </Card>
      </ScrollView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24 },
  premiumCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: palette.lightPurple + "20",
  },
  premiumTitle: { fontSize: 16, fontWeight: "bold" },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: { fontSize: 14, marginBottom: 2 },
  infoValue: { fontSize: 16, fontWeight: "600" },
  divider: { height: 1, marginVertical: 16 },
  logoutButton: { flexDirection: "row", alignItems: "center" },
  logoutText: { fontSize: 16, marginLeft: 12, fontWeight: "600" },
});
