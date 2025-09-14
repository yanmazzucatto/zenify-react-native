// components/CreateTaskModal.js
import { Fonts } from "@/constants/Fonts";
import { useTheme } from "@/context/ThemeContext";
import { useActivityStore } from "@/store/activityStore";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const CATEGORIES = [
  { key: 'corpo', label: 'Corpo', icon: 'fitness', color: '#34C759' },
  { key: 'mente', label: 'Mente', icon: 'brain', color: '#6C63FF' },
  { key: 'estudo', label: 'Estudo', icon: 'book', color: '#FF9500' },
  { key: 'trabalho', label: 'Trabalho', icon: 'briefcase', color: '#007AFF' },
  { key: 'hobbie', label: 'Hobbie', color: '#FF3B30', icon: 'heart' },
];

const DAY_OPTIONS = [
  { key: 'weekdays', label: 'Segunda a Sexta', days: [1, 2, 3, 4, 5] },
  { key: 'weekends', label: 'Sábado e Domingo', days: [0, 6] },
  { key: 'custom', label: 'Personalizar', days: [] },
];

const TIME_OPTIONS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00', '23:00'
];

const CreateTaskModal = ({ visible, onClose, category }) => {
  const { colors } = useTheme();
  const { addActivity } = useActivityStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'corpo');
  const [selectedTime, setSelectedTime] = useState('08:00');
  const [selectedDays, setSelectedDays] = useState([1, 2, 3, 4, 5]);
  const [dayOption, setDayOption] = useState('weekdays');
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'Por favor, digite um título para a tarefa.');
      return;
    }

    addActivity({
      category: selectedCategory,
      title: title.trim(),
      description: description.trim(),
      completed: false,
      scheduledTime: selectedTime,
      scheduledDays: selectedDays,
      notificationEnabled,
      isCustom: true,
      userId: 'current_user_id',
    });

    Alert.alert('Sucesso', 'Tarefa criada com sucesso!');
    onClose();
    
    // Reset form
    setTitle('');
    setDescription('');
    setSelectedCategory('corpo');
    setSelectedTime('08:00');
    setSelectedDays([1, 2, 3, 4, 5]);
    setDayOption('weekdays');
    setNotificationEnabled(true);
  };

  const handleDayOptionSelect = (option) => {
    setDayOption(option.key);
    if (option.key !== 'custom') {
      setSelectedDays(option.days);
    }
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day].sort());
    }
  };

  const getDayName = (day) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[day];
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.cardBackground }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Criar Tarefa Personalizada
              </Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Title Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Título *</Text>
              <TextInput
                style={[styles.input, { 
                  borderColor: colors.border, 
                  color: colors.text,
                  backgroundColor: colors.inputBackground 
                }]}
                placeholder="Digite o título da tarefa"
                placeholderTextColor={colors.textSecondary}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Description Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
              <TextInput
                style={[styles.textArea, { 
                  borderColor: colors.border, 
                  color: colors.text,
                  backgroundColor: colors.inputBackground 
                }]}
                placeholder="Descreva a tarefa (opcional)"
                placeholderTextColor={colors.textSecondary}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Category Selection */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
              <View style={styles.categoryContainer}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.key}
                    style={[
                      styles.categoryButton,
                      { 
                        backgroundColor: selectedCategory === cat.key ? cat.color : colors.inputBackground,
                        borderColor: cat.color 
                      }
                    ]}
                    onPress={() => setSelectedCategory(cat.key)}
                  >
                    <Ionicons 
                      name={cat.icon} 
                      size={20} 
                      color={selectedCategory === cat.key ? colors.white : cat.color} 
                    />
                    <Text style={[
                      styles.categoryText,
                      { color: selectedCategory === cat.key ? colors.white : cat.color }
                    ]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Time Selection */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Horário</Text>
              <TouchableOpacity
                style={[styles.timeButton, { 
                  borderColor: colors.border,
                  backgroundColor: colors.inputBackground 
                }]}
                onPress={() => setShowTimePicker(!showTimePicker)}
              >
                <Ionicons name="time" size={20} color={colors.primary} />
                <Text style={[styles.timeText, { color: colors.text }]}>
                  {selectedTime}
                </Text>
                <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
              
              {showTimePicker && (
                <View style={[styles.timePicker, { backgroundColor: colors.background }]}>
                  {TIME_OPTIONS.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeOption,
                        { backgroundColor: selectedTime === time ? colors.primary : 'transparent' }
                      ]}
                      onPress={() => {
                        setSelectedTime(time);
                        setShowTimePicker(false);
                      }}
                    >
                      <Text style={[
                        styles.timeOptionText,
                        { color: selectedTime === time ? colors.white : colors.text }
                      ]}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Days Selection */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Dias da Semana</Text>
              <View style={styles.dayOptionsContainer}>
                {DAY_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.dayOption,
                      { 
                        backgroundColor: dayOption === option.key ? colors.primary : colors.inputBackground,
                        borderColor: colors.border 
                      }
                    ]}
                    onPress={() => handleDayOptionSelect(option)}
                  >
                    <Text style={[
                      styles.dayOptionText,
                      { color: dayOption === option.key ? colors.white : colors.text }
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              {dayOption === 'custom' && (
                <View style={styles.customDaysContainer}>
                  {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.dayButton,
                        { 
                          backgroundColor: selectedDays.includes(day) ? colors.primary : colors.inputBackground,
                          borderColor: colors.border 
                        }
                      ]}
                      onPress={() => toggleDay(day)}
                    >
                      <Text style={[
                        styles.dayButtonText,
                        { color: selectedDays.includes(day) ? colors.white : colors.text }
                      ]}>
                        {getDayName(day)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Notification Toggle */}
            <View style={styles.inputGroup}>
              <View style={styles.toggleContainer}>
                <View style={styles.toggleInfo}>
                  <Ionicons name="notifications" size={20} color={colors.primary} />
                  <Text style={[styles.toggleLabel, { color: colors.text }]}>
                    Notificações
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.toggle,
                    { backgroundColor: notificationEnabled ? colors.primary : colors.border }
                  ]}
                  onPress={() => setNotificationEnabled(!notificationEnabled)}
                >
                  <View style={[
                    styles.toggleThumb,
                    { 
                      backgroundColor: colors.white,
                      transform: [{ translateX: notificationEnabled ? 20 : 2 }]
                    }
                  ]} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.cancelButton, { borderColor: colors.border }]}
                onPress={onClose}
              >
                <Text style={[styles.cancelButtonText, { color: colors.text }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: colors.primary }]}
                onPress={handleSave}
              >
                <Text style={[styles.saveButtonText, { color: colors.white }]}>
                  Criar Tarefa
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    maxHeight: "90%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    fontSize: 20,
  },
  closeButton: {
    padding: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontFamily: Fonts.regular,
    fontSize: 16,
    height: 80,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  categoryText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
  },
  timeButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    gap: 10,
  },
  timeText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    flex: 1,
  },
  timePicker: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    borderRadius: 10,
    padding: 10,
    maxHeight: 200,
    zIndex: 1000,
  },
  timeOption: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 2,
  },
  timeOptionText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    textAlign: "center",
  },
  dayOptionsContainer: {
    gap: 8,
    marginBottom: 10,
  },
  dayOption: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  dayOptionText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    textAlign: "center",
  },
  customDaysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  dayButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 50,
    alignItems: "center",
  },
  dayButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  toggleLabel: {
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    padding: 2,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 15,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },
});

export default CreateTaskModal;
