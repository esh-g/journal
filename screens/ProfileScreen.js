import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { BackButton } from "../components/BackButton";
import { auth, inter, Theme } from "../config";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { setItemAsync, getItemAsync } from "expo-secure-store";
import { LoadingIndicator } from "../components";

export function ProfileScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);

  function toggleSwitch(val) {
    setItemAsync("isAuthEnabled", `${val}`).then(() => {
      setIsEnabled(val);
    });
  }

  useEffect(() => {
    getItemAsync("isAuthEnabled").then((value) => {
      setIsEnabled(value === "true");
      setIsLoading(false);
    });
  }, []);

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown}
      exiting={FadeOutUp}
    >
      <View style={styles.content}>
        <View style={styles.top}>
          <BackButton width={45} height={45} onPress={navigation.goBack} />
          <Text style={inter.h3}>Profile</Text>
        </View>
        <View style={[styles.main, styles.profile]}>
          <Image
            source={{ uri: auth.currentUser.photoURL }}
            style={styles.image}
          />
          <View>
            <Text style={[inter.h4, { color: "white" }]} adjustsFontSizeToFit={true}>
              {auth.currentUser.displayName}
            </Text>
            <Text style={[inter.bodyBase, { color: "white" }]} adjustsFontSizeToFit={true}>
              {auth.currentUser.email}
            </Text>
          </View>
        </View>
        <View style={styles.main}>
          <TouchableOpacity>
            <Text style={inter.h4}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <TouchableOpacity>
            <Text style={inter.h4}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="lock" size={24} color={Theme.accent} />
              <Text style={[inter.h4, { marginLeft: 12 }]}>App Lock</Text>
            </View>
            <View>
              {!isLoading ? (
                <Switch
                  trackColor={{ false: "#767577", true: Theme.accent }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(val) => toggleSwitch(val)}
                  value={isEnabled}
                  style={{ transform: [{ scale: 1.25 }] }}
                />
              ) : (
                <LoadingIndicator />
              )}
            </View>
          </View>
        </View>
        <View style={styles.main}>
          <TouchableOpacity onPress={() => auth.signOut()}>
            <Text style={inter.h4}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.primary,
    padding: "4%",
  },
  profile: {
    backgroundColor: Theme.accent,
    padding: 8,
    borderRadius: 18,
  },

  main: {
    borderColor: "grey",
    padding: 12,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 100,
    marginRight: 12,
    borderWidth: 0.5,
    borderColor: Theme.accent,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  content: {
    backgroundColor: Theme.secondary,
    marginTop: "12.5%",
    padding: "5%",
    borderRadius: 24,
    paddingBottom: 36,
  },
});
