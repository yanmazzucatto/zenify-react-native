import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Fonts } from "@/constants/Fonts";

const SignUpScreen = () => {
  const { colors } = useTheme();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/zenify-logo.png")}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: colors.text }]}>Criar Conta</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Junte-se ao Zenify
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.inputBackground,
            },
          ]}
          placeholder="Nome completo"
          placeholderTextColor={colors.textSecondary}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.inputBackground,
            },
          ]}
          placeholder="Email"
          placeholderTextColor={colors.textSecondary}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.inputBackground,
            },
          ]}
          placeholder="Senha"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={[styles.passwordHint, { color: colors.textSecondary }]}>
          Mínimo de 6 caracteres
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>
            Criar Conta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.linkText, { color: colors.primary }]}>
            Já tem uma conta? Fazer login
          </Text>
        </TouchableOpacity>

        <Text style={[styles.termsText, { color: colors.textSecondary }]}>
          Ao criar uma conta, você concorda com nossos termos de uso
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    marginBottom: 5,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  passwordHint: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginBottom: 20,
    alignSelf: "flex-start",
    marginLeft: "10%",
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
  },
  linkText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    marginBottom: 20,
  },
  termsText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    textAlign: "center",
  },
});

export default SignUpScreen;
