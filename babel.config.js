module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./",
          },
        },
      ],
      // A linha 'expo-router/babel' foi REMOVIDA daqui
      "react-native-reanimated/plugin",
    ],
  };
};
