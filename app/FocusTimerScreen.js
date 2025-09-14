import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from "react-native";
import { Fonts } from "@/constants/Fonts";
import { useTheme } from "@/context/ThemeContext";

const FocusTimerScreen = () => {
  const { colors } = useTheme();
  const [minutes, setMinutes] = useState("25");
  const [seconds, setSeconds] = useState("0");
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [selectedBorder, setSelectedBorder] = useState("Sombra");
  const [showFontModal, setShowFontModal] = useState(false);
  const [showBorderModal, setShowBorderModal] = useState(false);

  const fontOptions = [
    "Inter", "Poppins", "Roboto", "Open Sans", "Lato", 
    "Montserrat", "Source Sans Pro", "Nunito", "Ubuntu", 
    "Raleway", "Roboto Mono"
  ];

  const borderOptions = [
    "Sombra", "Sólida", "Tracejada", "Pontilhada", "Dupla",
    "Sulco", "Relevo", "Interna", "Externa", "Sem borda"
  ];

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Implementar a lógica do timer aqui

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Focus Timer
        </Text>

        {/* Personalization Card */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <View style={styles.personalizationHeader}>
            <Ionicons name="color-palette-outline" size={24} color={colors.primary} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Personalizar
            </Text>
          </View>
          
          {/* Color Preview */}
          <View style={styles.colorPreviewRow}>
            <View style={[styles.colorPreview, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Text style={[styles.colorPreviewText, { color: colors.text }]}>A</Text>
            </View>
            <View style={[styles.colorPreview, { backgroundColor: colors.white }]}>
              <Text style={[styles.colorPreviewText, { color: colors.black }]}>A</Text>
            </View>
          </View>

          {/* Font and Border Selection */}
          <View style={styles.selectionRow}>
            <View style={styles.selectionItem}>
              <Text style={[styles.selectionLabel, { color: colors.text }]}>
                Fonte
              </Text>
              <TouchableOpacity 
                style={[styles.selectionButton, { borderColor: colors.border }]}
                onPress={() => setShowFontModal(true)}
              >
                <Text style={[styles.selectionText, { color: colors.text }]}>
                  {selectedFont}
                </Text>
                <Ionicons name="chevron-down-outline" size={16} color={colors.icon} />
              </TouchableOpacity>
            </View>

            <View style={styles.selectionItem}>
              <Text style={[styles.selectionLabel, { color: colors.text }]}>
                Borda
              </Text>
              <TouchableOpacity 
                style={[styles.selectionButton, { borderColor: colors.border }]}
                onPress={() => setShowBorderModal(true)}
              >
                <Text style={[styles.selectionText, { color: colors.text }]}>
                  {selectedBorder}
                </Text>
                <Ionicons name="chevron-down-outline" size={16} color={colors.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Timer Configuration Card */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Temporizador
          </Text>
          
          <View style={styles.timerInputRow}>
            <View style={styles.timerInputGroup}>
              <Text style={[styles.timerLabel, { color: colors.text }]}>
                Minutos
              </Text>
              <TextInput
                style={[
                  styles.timerInput,
                  { 
                    borderColor: colors.border, 
                    color: colors.text,
                    backgroundColor: colors.inputBackground,
                    fontFamily: selectedFont === 'Inter' ? Fonts.bold : selectedFont
                  },
                ]}
                keyboardType="numeric"
                value={minutes}
                onChangeText={setMinutes}
                textAlign="center"
              />
            </View>
            
            <View style={styles.timerSeparator}>
              <Text style={[styles.timerSeparatorText, { color: colors.text }]}>:</Text>
            </View>
            
            <View style={styles.timerInputGroup}>
              <Text style={[styles.timerLabel, { color: colors.text }]}>
                Segundos
              </Text>
              <TextInput
                style={[
                  styles.timerInput,
                  { 
                    borderColor: colors.border, 
                    color: colors.text,
                    backgroundColor: colors.inputBackground,
                    fontFamily: selectedFont === 'Inter' ? Fonts.bold : selectedFont
                  },
                ]}
                keyboardType="numeric"
                value={seconds}
                onChangeText={setSeconds}
                textAlign="center"
              />
            </View>
          </View>
          
          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: colors.primary }]}
            onPress={() => setTimerRunning(true)}
          >
            <Ionicons name="play" size={24} color={colors.white} />
            <Text style={[styles.startButtonText, { color: colors.white }]}>
              Iniciar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Timer Display (conditionally rendered) */}
        {timerRunning && (
          <View
            style={[styles.timerDisplay, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.timerText, { color: colors.white }]}>
              {formatTime(1498)}
            </Text>
            <View style={styles.timerControls}>
              <TouchableOpacity style={styles.timerButton}>
                <Ionicons name="pause" size={24} color={colors.white} />
                <Text style={[styles.timerButtonText, { color: colors.white }]}>
                  Pausar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.timerButton}>
                <Ionicons name="stop" size={24} color={colors.white} />
                <Text style={[styles.timerButtonText, { color: colors.white }]}>
                  Encerrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Font Selection Modal */}
        <Modal
          visible={showFontModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowFontModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Selecionar Fonte
                </Text>
                <TouchableOpacity onPress={() => setShowFontModal(false)}>
                  <Ionicons name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={fontOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.modalItem,
                      { borderBottomColor: colors.border },
                      selectedFont === item && { backgroundColor: colors.primary + '20' }
                    ]}
                    onPress={() => {
                      setSelectedFont(item);
                      setShowFontModal(false);
                    }}
                  >
                    <Text style={[
                      styles.modalItemText, 
                      { color: colors.text },
                      { fontFamily: item === 'Inter' ? Fonts.bold : item }
                    ]}>
                      {item}
                    </Text>
                    {selectedFont === item && (
                      <Ionicons name="checkmark" size={20} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                )}
                style={styles.modalList}
              />
            </View>
          </View>
        </Modal>

        {/* Border Selection Modal */}
        <Modal
          visible={showBorderModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowBorderModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Selecionar Borda
                </Text>
                <TouchableOpacity onPress={() => setShowBorderModal(false)}>
                  <Ionicons name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={borderOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.modalItem,
                      { borderBottomColor: colors.border },
                      selectedBorder === item && { backgroundColor: colors.primary + '20' }
                    ]}
                    onPress={() => {
                      setSelectedBorder(item);
                      setShowBorderModal(false);
                    }}
                  >
                    <Text style={[styles.modalItemText, { color: colors.text }]}>
                      {item}
                    </Text>
                    {selectedBorder === item && (
                      <Ionicons name="checkmark" size={20} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                )}
                style={styles.modalList}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
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
  headerTitle: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    marginBottom: 30,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    marginBottom: 15,
  },
  personalizationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  colorPreviewRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 20,
  },
  colorPreview: {
    width: 60,
    height: 60,
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  colorPreviewText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  selectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  selectionItem: {
    flex: 1,
  },
  selectionLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginBottom: 8,
  },
  selectionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  selectionText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginBottom: 5,
  },
  durationButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  durationButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  durationButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },
  timerInputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    gap: 20,
  },
  timerInputGroup: {
    alignItems: "center",
  },
  timerLabel: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginBottom: 8,
  },
  timerInput: {
    borderWidth: 2,
    borderRadius: 15,
    padding: 15,
    width: 100,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  timerSeparator: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  timerSeparatorText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  startButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    marginLeft: 10,
  },
  timerDisplay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 15,
    padding: 20,
  },
  timerText: {
    fontFamily: Fonts.bold,
    fontSize: 80,
    marginBottom: 20,
  },
  timerControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  timerButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  timerButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    marginLeft: 5,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    maxHeight: "70%",
    borderRadius: 15,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
  modalList: {
    maxHeight: 300,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
});

export default FocusTimerScreen;

