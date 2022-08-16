import { Text, View, Image, StyleSheet } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";
import * as Auth from "firebase/auth";
import { auth } from "../config/firebase";
import { Theme, balsamiqSans, inter } from "../config";
import { setBackgroundColorAsync } from "expo-navigation-bar";

GoogleSignin.configure({
  webClientId: Constants.manifest.extra.webClientId,
  client_type: 3,
  scopes: [
    "https://www.googleapis.com/auth/tasks",
    "https://www.googleapis.com/auth/drive.file",
  ],
});

async function onGoogleButtonPress() {
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = Auth.GoogleAuthProvider.credential(idToken);
  return Auth.signInWithCredential(auth, googleCredential);
}

export function WelcomeScreen({ navigation }) {
  setBackgroundColorAsync(Theme.primary);

  return (
    <View style={styles.container}>
      <View style={styles.up}>
        <Image
          source={require("../assets/Group.png")}
          style={{
            transform: [{ scale: 0.3 }],
          }}
        />
      </View>
      <View style={styles.down}>
        <Text style={inter.h3}>Welcome to</Text>
        <Text style={balsamiqSans[48]}>Open Journal</Text>
        <Text
          style={{
            ...inter.bodyBase,
            paddingHorizontal: 40,
            textAlign: "center",
          }}
        >
          To keep the best memories, and lead a prodcutive lifestyle.
        </Text>
        <View style={styles.auth}>
          <GoogleSigninButton
            style={{ width: 250, height: 56, marginBottom: 16 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => onGoogleButtonPress().catch((e) => console.log(e))}
          />
          <Text style={{ ...inter.label, paddingHorizontal: 80 }}>
            Let us link to your google Account to sync all the memories, photos,
            notes and tasks.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.primary,
    flexDirection: "column",
    color: Theme.text,
  },
  auth: {
    marginTop: 70,
    display: "flex",
    alignItems: "center",
  },
  up: {
    height: "60%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  down: {
    height: "40%",
    width: "100%",
    alignItems: "center",
  },
});
