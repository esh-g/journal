import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { balsamiqSans, Theme } from "../config";

export function AuthScreen({ onPress }) {
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={[balsamiqSans[24], { color: Theme.secondary }]}>
          Click To Log In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.primary,
  },
  btn: {
    backgroundColor: Theme.accent,
    padding: 24,
    borderRadius: 12,
  },
});
