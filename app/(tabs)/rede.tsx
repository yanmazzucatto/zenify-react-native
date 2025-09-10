import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/themed/ThemedView";
// O Header é removido daqui
import { useTheme } from "@/theme/ThemeProvider";
import { TabSelector } from "@/components/TabSelector";
import { CreatePostModal } from "@/components/CreatePostModal";

const ActionButton = ({ icon, text }: { icon: any; text: string }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: theme.card }]}
    >
      <Ionicons name={icon} size={20} color={theme.primary} />
      <Text style={[styles.actionButtonText, { color: theme.primary }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default function RedeScreen() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("Feed Ativo");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  // Efeito para simular o fim do carregamento
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
  }, []);

  return (
    <ThemedView style={styles.container}>
      <CreatePostModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.actionsContainer}>
          <ActionButton icon="person-add-outline" text="Adicionar Pessoa" />
          <ActionButton icon="share-social-outline" text="Compartilhar" />
        </View>

        <TabSelector
          options={["Lista de Amigos", "Feed Ativo"]}
          selectedOption={activeTab}
          onSelect={setActiveTab}
        />

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
              Carregando posts...
            </Text>
          </View>
        ) : (
          <View style={styles.feedContainer}>
            <Text style={{ color: theme.textSecondary }}>
              Nenhuma publicação ainda.
            </Text>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    // Aplicando o mesmo espaçamento das outras telas
    paddingHorizontal: 24,
    paddingTop: 190,
    paddingBottom: 120,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  actionButtonText: {
    marginLeft: 8,
    fontWeight: "bold",
  },
  loadingContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  feedContainer: {
    alignItems: "center",
    marginTop: 50,
  },
});
