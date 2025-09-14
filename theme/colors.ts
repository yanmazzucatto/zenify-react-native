// theme/colors.ts

export const palette = {
  purple: "#6C63FF",
  lightPurple: "#A8A2FF",
  white: "#FFFFFF",
  black: "#121212",
  darkGray: "#1C1C1E",
  mediumGray: "#2C2C2E",
  lightGray: "#8E8E93",
  offWhite: "#F2F2F7",
  green: "#34C759",
  red: "#FF3B30",
  // Adicionando as cores do design original
  mainPurple: "#6C63FF",
  lightMainPurple: "#9B8AFF",
  darkBackground: "#17151D",
  darkCard: "#221D2C",
};

export const lightTheme = {
  background: palette.offWhite,
  card: palette.white,
  text: palette.black,
  textSecondary: palette.lightGray,
  primary: palette.mainPurple,
  tabIcon: palette.lightGray,
  tabIconActive: palette.mainPurple,
  white: palette.white,
  cardBackground: palette.white,
  border: palette.lightGray,
  inputBackground: palette.white,
  icon: palette.lightGray,
  accent: palette.green,
  red: palette.red,
};

export const darkTheme = {
  background: palette.darkBackground,
  card: palette.darkCard,
  text: palette.white,
  textSecondary: palette.lightGray,
  primary: palette.mainPurple,
  tabIcon: palette.lightGray,
  tabIconActive: palette.lightMainPurple,
  white: palette.white,
  cardBackground: palette.darkCard,
  border: palette.mediumGray,
  inputBackground: palette.mediumGray,
  icon: palette.lightGray,
  accent: palette.green,
  red: palette.red,
};

export type Theme = typeof lightTheme;
