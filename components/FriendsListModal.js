// components/FriendsListModal.js
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { Fonts } from "@/constants/Fonts";
import { useTheme } from "@/context/ThemeContext";
import { useFriendsStore } from "@/store/friendsStore";

const FriendsListModal = ({ visible, onClose }) => {
  const { colors } = useTheme();
  const { friends, users } = useFriendsStore();
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    // Filtrar amigos aceitos e buscar dados dos usuários
    const acceptedFriends = friends.filter(friendship => friendship.status === 'accepted');
    const friendsWithUserData = acceptedFriends.map(friendship => {
      const friendUser = users.find(user => 
        user.id === friendship.friendId || user.id === friendship.userId
      );
      return {
        ...friendship,
        user: friendUser
      };
    }).filter(friendship => friendship.user); // Remover amigos sem dados de usuário

    setFriendsList(friendsWithUserData);
  }, [friends, users]);

  const handleRemoveFriend = (friendshipId, friendName) => {
    Alert.alert(
      "Remover Amigo",
      `Tem certeza que deseja remover ${friendName} dos seus amigos?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Remover", 
          style: "destructive",
          onPress: () => {
            useFriendsStore.getState().removeFriend(friendshipId);
            Alert.alert("Amigo Removido", `${friendName} foi removido da sua lista de amigos.`);
          }
        }
      ]
    );
  };

  const renderFriendItem = ({ item }) => (
    <View style={[styles.friendItem, { borderBottomColor: colors.border }]}>
      <View style={styles.friendInfo}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={[styles.avatarText, { color: colors.white }]}>
            {item.user.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.friendDetails}>
          <Text style={[styles.friendName, { color: colors.text }]}>
            {item.user.name}
          </Text>
          <Text style={[styles.friendUsername, { color: colors.textSecondary }]}>
            @{item.user.username}
          </Text>
          {item.user.bio && (
            <Text style={[styles.friendBio, { color: colors.textSecondary }]}>
              {item.user.bio}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={[styles.removeButton, { borderColor: colors.red || '#FF3B30' }]}
        onPress={() => handleRemoveFriend(item.id, item.user.name)}
      >
        <Ionicons name="person-remove" size={16} color={colors.red || '#FF3B30'} />
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
        Você ainda não tem amigos
      </Text>
      <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
        Use o botão &quot;Adicionar Pessoa&quot; para encontrar amigos
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
                Lista de Amigos
              </Text>
              <View style={[styles.friendCount, { backgroundColor: colors.primary }]}>
                <Text style={[styles.friendCountText, { color: colors.white }]}>
                  {friendsList.length}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Friends List */}
          <View style={styles.friendsContainer}>
            {friendsList.length > 0 ? (
              <FlatList
                data={friendsList}
                keyExtractor={(item) => item.id}
                renderItem={renderFriendItem}
                showsVerticalScrollIndicator={false}
                style={styles.friendsList}
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
  friendCount: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 24,
    alignItems: "center",
  },
  friendCountText: {
    fontFamily: Fonts.bold,
    fontSize: 12,
  },
  closeButton: {
    padding: 5,
  },
  friendsContainer: {
    flex: 1,
    minHeight: 200,
  },
  friendsList: {
    flex: 1,
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  friendInfo: {
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
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    marginBottom: 2,
  },
  friendUsername: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginBottom: 4,
  },
  friendBio: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
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
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
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

export default FriendsListModal;
