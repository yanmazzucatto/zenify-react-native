import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Fonts } from "@/constants/Fonts";
import { useTheme } from "@/context/ThemeContext";

const CreatePostModal = ({ isVisible, onClose }) => {
  const { colors } = useTheme();
  const [postContent, setPostContent] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView
        style={[styles.modalContainer, { backgroundColor: colors.background }]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.icon} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Criar Publicação
          </Text>
          <TouchableOpacity onPress={() => console.log("Publicar")}>
            <Text style={[styles.publishButton, { color: colors.primary }]}>
              Publicar
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={[
            styles.textInput,
            { borderColor: colors.border, color: colors.text },
          ]}
          placeholder="O que você está pensando?"
          placeholderTextColor={colors.textSecondary}
          multiline={true}
          value={postContent}
          onChangeText={setPostContent}
        />

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="image-outline" size={24} color={colors.icon} />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Imagem
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons
              name="musical-notes-outline"
              size={24}
              color={colors.icon}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Música
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
  publishButton: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },
  textInput: {
    minHeight: 150,
    borderRadius: 15,
    borderWidth: 1,
    padding: 15,
    textAlignVertical: "top",
    fontFamily: Fonts.regular,
    fontSize: 16,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  optionText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    marginLeft: 5,
  },
});

export default CreatePostModal;
