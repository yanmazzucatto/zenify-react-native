// app/(auth)/index.tsx
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import { ThemedView } from "../../components/themed/ThemedView";
import { useTheme } from "../../theme/ThemeProvider";
import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";

export default function SignUpScreen() {
  const { theme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ width: "100%" }}>
        <View style={styles.content}>
          <View style={[styles.logo, { backgroundColor: theme.primary }]}>
            <Text style={styles.logoText}>Z</Text>
          </View>
          <Text style={[styles.title, { color: theme.text }]}>Criar Conta</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Junte-se ao Zenify
          </Text>

          <View style={[styles.formContainer, { backgroundColor: theme.card }]}>
            <CustomInput label="Nome completo" placeholder="Digite seu nome" />
            <CustomInput
              label="Email"
              placeholder="Digite seu email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <CustomInput
              label="Senha"
              placeholder="Digite sua senha"
              subLabel="Mínimo de 6 caracteres"
              secureTextEntry
            />
            <CustomButton title="Criar Conta" onPress={() => {}} />

            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text
                  style={[styles.link, { color: theme.primary, marginTop: 24 }]}
                >
                  Já tem uma conta? Fazer login
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Ao criar uma conta, você concorda com nossos termos de uso
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
  footerText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
