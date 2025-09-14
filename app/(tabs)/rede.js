import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Fonts } from "@/constants/Fonts";
import { useTheme } from "@/context/ThemeContext";
import AddFriendsModal from "@/components/AddFriendsModal";
import FriendsListModal from "@/components/FriendsListModal";

const RedeScreen = () => {
  const { colors } = useTheme();
  const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);
  const [showFriendsListModal, setShowFriendsListModal] = useState(false);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>
            Olá, yan!
          </Text>
          <View style={styles.navBar}>
            <TouchableOpacity style={styles.navButton}>
              <Text style={[styles.navButtonText, { color: colors.primary }]}>
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
              <Text style={[styles.navButtonText, { color: colors.text }]}>
                Objetivos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
              <Text style={[styles.navButtonText, { color: colors.text }]}>
                Rede
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => console.log("Open Create Post Modal")}
          >
            <Ionicons name="add-circle-outline" size={24} color={colors.icon} />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.cardBackground }]}
            onPress={() => setShowAddFriendsModal(true)}
          >
            <Ionicons name="person-add" size={20} color={colors.text} />
            <Text style={[styles.actionButtonText, { color: colors.text }]}>
              Adicionar Pessoa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={() => console.log("Compartilhar")}
          >
            <Ionicons name="share" size={20} color={colors.white} />
            <Text style={[styles.actionButtonText, { color: colors.white }]}>
              Compartilhar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Friends Section */}
        <View style={styles.friendsSection}>
          <TouchableOpacity
            style={[styles.friendsButton, { backgroundColor: colors.cardBackground }]}
            onPress={() => setShowFriendsListModal(true)}
          >
            <Ionicons name="people" size={20} color={colors.text} />
            <Text style={[styles.friendsButtonText, { color: colors.text }]}>
              Lista de Amigos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.friendsButton, { backgroundColor: colors.cardBackground }]}
            onPress={() => console.log("Feed Ativo")}
          >
            <Ionicons name="eye" size={20} color={colors.text} />
            <Text style={[styles.friendsButtonText, { color: colors.text }]}>
              Feed Ativo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Feed Content */}
        <View style={styles.feedContainer}>
          <Text style={[styles.feedTitle, { color: colors.text }]}>
            Feed Ativo
          </Text>
          <View style={styles.loadingContainer}>
            <Ionicons name="refresh" size={24} color={colors.primary} />
            <Text style={[styles.feedContent, { color: colors.textSecondary }]}>
              Carregando posts...
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      <AddFriendsModal
        visible={showAddFriendsModal}
        onClose={() => setShowAddFriendsModal(false)}
      />
      
      <FriendsListModal
        visible={showFriendsListModal}
        onClose={() => setShowFriendsListModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontFamily: Fonts.bold,
  },
  navBar: {
    flexDirection: "row",
  },
  navButton: {
    paddingHorizontal: 10,
  },
  navButtonText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
  createPostButton: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 8,
  },
  actionButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
  },
  friendsSection: {
    gap: 10,
    marginBottom: 20,
  },
  friendsButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 8,
  },
  friendsButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
  },
  feedContainer: {
    marginTop: 20,
  },
  feedTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    marginBottom: 10,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 20,
  },
  feedContent: {
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
});

export default RedeScreen;
