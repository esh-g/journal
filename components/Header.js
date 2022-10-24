import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { auth, balsamiqSans } from "../config";
import { ProfileModal } from "./ProfileModal";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export function Header({ children }) {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const NameBar = () => {
    return !children ? (
      <View>
        <Text style={balsamiqSans[48]}>Hello,</Text>
        <Text style={{ ...balsamiqSans[32], textTransform: "capitalize" }}>
          {auth.currentUser.displayName.split(" ")[0]}
        </Text>
      </View>
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
    width: wp("25%"),
    height: wp("25%"),
    borderRadius: 100,
  },
  headerContent: {
    paddingVertical: hp("1.5%"),
  },
  header: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-between",
    paddingHorizontal: wp("7.5%"),
    alignItems: "center",
    width: "100%",
  },
});
