import "dotenv/config";

export default {
  expo: {
    name: "Jounal",
    slug: "journal",
    platforms: ["ios", "android"],
    version: "1.0",
    orientation: "portrait",
    icon: "./assets/flame.png",
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      googleServicesFile: "./googleService-Info.plist",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      webClientId: process.env.WEB_CLIENT_ID,
    },
    android: {
      package: "com.journalapp",
      googleServicesFile: "./google-services.json",
    },
    androidStatusBar: {
      barStyle: "dark-content",
      backgroundColor: "#0A48A5",
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "This app requires access to add photos to your memories.",
        },
      ],
    ],
  },
};
