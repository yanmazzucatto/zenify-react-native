import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Fonts } from '@/constants/Fonts';

const LoginScreen = () => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Image source={require('../../assets/zenify-logo.png')} style={styles.logo} />
        <Text style={[styles.title, { color: colors.text }]}>Fazer Login</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Bem-vindo de volta</Text>

        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.inputBackground }]} 
          placeholder="Email"
          placeholderTextColor={colors.textSecondary}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.inputBackground }]} 
          placeholder="Senha"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
          <Text style={[styles.buttonText, { color: colors.white }]}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.linkText, { color: colors.primary }]}>Não tem conta? Crie agora</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
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
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
  },
  linkText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
  },
});

export default LoginScreen;

