// components/CreatePostModal.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";
import { CustomButton } from "./CustomButton";
import { ThemedView } from "./themed/ThemedView";

type CreatePostModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const CreatePostModal = ({ visible, onClose }: CreatePostModalProps) => {
  const { theme, isDark } = useTheme();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: theme.card }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>
              Criar Publicação
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close-circle"
                size={28}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="O que você está pensando?"
            placeholderTextColor={theme.textSecondary}
            multiline
            style={[
              styles.textInput,
              {
                color: theme.text,
                borderColor: theme.background,
                backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
              },
            ]}
          />

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons
                name="image-outline"
                size={24}
                color={theme.textSecondary}
              />
              <Text style={[styles.actionText, { color: theme.textSecondary }]}>
                Imagem
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons
                name="musical-notes-outline"
                size={24}
                color={theme.textSecondary}
              />
              <Text style={[styles.actionText, { color: theme.textSecondary }]}>
                Música
              </Text>
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Publicar"
            onPress={() => {
              /* Lógica de Publicar */ onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 24,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  textInput: {
    height: 120,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 24,
  },
  actionsContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 16,
  },
});
