// components/AddFriendsModal.js
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Fonts } from "@/constants/Fonts";
import { useTheme } from "@/context/ThemeContext";
import { useFriendsStore } from "@/store/friendsStore";

const AddFriendsModal = ({ visible, onClose }) => {
  const { colors } = useTheme();
  const {
    searchResults,
    isLoading,
    searchUsers,
    sendFriendRequest,
    setSearchQuery,
    clearSearchResults,
  } = useFriendsStore();

  const [localQuery, setLocalQuery] = useState("");

  useEffect(() => {
    if (localQuery.length >= 2) {
      searchUsers(localQuery);
    } else {
      clearSearchResults();
    }
  }, [localQuery, searchUsers, clearSearchResults]);

  const handleSearch = (text) => {
    setLocalQuery(text);
    setSearchQuery(text);
  };

  const handleSendFriendRequest = (userId) => {
    sendFriendRequest(userId);
    Alert.alert(
      "Solicitação Enviada",
      "Sua solicitação de amizade foi enviada!",
      [{ text: "OK" }]
    );
  };

  const renderUserItem = ({ item }) => (
    <View style={[styles.userItem, { borderBottomColor: colors.border }]}>
      <View style={styles.userInfo}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={[styles.avatarText, { color: colors.white }]}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={[styles.userName, { color: colors.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.userUsername, { color: colors.textSecondary }]}>
            @{item.username}
          </Text>
          {item.bio && (
            <Text style={[styles.userBio, { color: colors.textSecondary }]}>
              {item.bio}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => handleSendFriendRequest(item.id)}
      >
        <Ionicons name="person-add" size={16} color={colors.white} />
        <Text style={[styles.addButtonText, { color: colors.white }]}>
          Adicionar
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons 
        name="people-outline" 
        size={64} 
        color={colors.textSecondary} 
        style={styles.emptyIcon}
      />
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        {localQuery.length < 2 
          ? "Digite pelo menos 2 caracteres para buscar"
          : "Nenhum usuário encontrado"
        }
      </Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.titleContainer}>
              <Ionicons name="people" size={24} color={colors.primary} />
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Adicionar Amigos
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View style={[styles.searchContainer, { borderColor: colors.border }]}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Digite nome ou @username (min. 2 caracteres)"
              placeholderTextColor={colors.textSecondary}
              value={localQuery}
              onChangeText={handleSearch}
              autoFocus
            />
            {isLoading && (
              <ActivityIndicator size="small" color={colors.primary} />
            )}
          </View>

          {/* Results */}
          <View style={styles.resultsContainer}>
            {localQuery.length >= 2 ? (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={renderUserItem}
                ListEmptyComponent={renderEmptyState}
                showsVerticalScrollIndicator={false}
                style={styles.resultsList}
              />
            ) : (
              renderEmptyState()
            )}
          </View>

          {/* Close Button */}
          <TouchableOpacity
            style={[styles.closeModalButton, { backgroundColor: colors.primary }]}
            onPress={onClose}
          >
            <Text style={[styles.closeModalButtonText, { color: colors.white }]}>
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    borderRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modalTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },
  closeButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
    minHeight: 200,
  },
  resultsList: {
    flex: 1,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    marginBottom: 2,
  },
  userUsername: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginBottom: 4,
  },
  userBio: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 5,
  },
  addButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  closeModalButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  closeModalButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },
});

export default AddFriendsModal;
