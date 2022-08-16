import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { auth, balsamiqSans } from "../config";
import { ProfileModal } from "./ProfileModal";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export function Header({ children }) {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const NameBar = () => {
    return !children ? (
      <>
        <Text style={balsamiqSans[48]}>Hello,</Text>
        <Text style={{ ...balsamiqSans[40], textTransform: "capitalize" }}>
          {auth.currentUser.displayName.split(" ")[0]}
        </Text>
      </>
    ) : (
      <>
        <Text style={balsamiqSans[32]}>
          {`${auth.currentUser.displayName.split(" ")[0]}'s`}
        </Text>
        <Text style={{ ...balsamiqSans[48], textTransform: "capitalize" }}>
          {children}
        </Text>
      </>
    );
  };

  const handleProfile = () => {
    setVisible(true);
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <NameBar />
      </View>
      {/* <ProfileModal visible={visible} onClose={() => setVisible(false)} /> */}
      <Pressable onPress={handleProfile}>
        <View style={styles.profile}>
          <Image
            style={styles.profileImage}
            source={{
              uri: auth.currentUser.photoURL,
            }}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 115,
    height: 115,
    borderRadius: 100,
  },
  headerContent: {
    paddingVertical: 16,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    paddingHorizontal: 40,
    alignItems: "center",
    width: "100%",
  },
});
