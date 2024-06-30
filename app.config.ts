import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "green-d",
  name: "Green D",
  scheme: "green-d",
  orientation: "portrait",
  platforms: ["android", "ios"],
  experiments: { typedRoutes: true },
  extra: {
    eas: {
      projectId: "0edfea24-9c31-4e5e-9a3b-a5570a24f972",
    },
  },
  android: {
    package: "com.wachamuli.greend",
  },
  plugins: [
    "expo-font",
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your photos to let you share them with your friends.",
      },
    ],
    "expo-router",
  ],
});
