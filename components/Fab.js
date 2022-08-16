import { FontAwesome5 } from "@expo/vector-icons";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { balsamiqSans, Theme } from "../config";
import { LoadingIndicator } from "./LoadingIndicator";

export function Fab({ icon, children, onPress, disabled }) {
  return (
    <KeyboardAvoidingView style={styles.root} behavior="padding">
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={styles.container}>
          <View style={styles.icon}>
            {disabled ? (
              <LoadingIndicator size="small" color={"white"} />
            ) : (
              <FontAwesome5 name={icon} size={20} color={"white"} />
            )}
          </View>
          {children ? (
            <View style={styles.children}>
              <Text style={[balsamiqSans[18], { color: "white" }]}>
                {children}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    zIndex: 100,
    position: "absolute",
    borderRadius: 12,
    bottom: 0,
    right: 15,
  },
  container: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 25,
    backgroundColor: Theme.accent,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    justifyContent: "center",
    marginBottom: 10,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
  children: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginLeft: 10,
  },
});
