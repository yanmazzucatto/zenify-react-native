import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { ThemedView } from "@/components/themed/ThemedView";
import { useTheme } from "@/theme/ThemeProvider";
import { CustomInput } from "@/components/CustomInput";
import { CustomButton } from "@/components/CustomButton";

export default function LoginScreen() {
  const { theme } = useTheme();
  const { login } = useAuthStore();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ width: "100%" }}>
        <View style={styles.content}>
          <View style={[styles.logo, { backgroundColor: theme.primary }]}>
            <Text style={styles.logoText}>Z</Text>
          </View>
          <Text style={[styles.title, { color: theme.text }]}>Fazer Login</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Bem-vindo de volta
          </Text>

          <View style={[styles.formContainer, { backgroundColor: theme.card }]}>
            <CustomInput
              label="Email"
              placeholder="Digite seu email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <CustomInput
              label="Senha"
              placeholder="Digite sua senha"
              secureTextEntry
            />
            <CustomButton title="Entrar" onPress={login} />
            <Link href="/" asChild>
              <TouchableOpacity>
                <Text
                  style={[styles.link, { color: theme.primary, marginTop: 24 }]}
                >
                  Não tem conta? Criar agora
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Entre para continuar sua jornada no Zenify
          </Text>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  content: { width: "100%", padding: 24, alignItems: "center" },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logoText: { color: "white", fontSize: 32, fontWeight: "bold" },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 32 },
  formContainer: { width: "100%", borderRadius: 24, padding: 24 },
  link: { textAlign: "center", fontWeight: "bold", fontSize: 16 },
  footerText: { fontSize: 14, textAlign: "center", marginTop: 32 },
});
