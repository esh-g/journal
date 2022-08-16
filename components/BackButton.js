import { Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export function BackButton({ height, width, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Theme.accent,
        width: width,
        height: height,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        marginRight: 18,
      }}
      onPress={onPress}
    >
      <FontAwesome5 name="arrow-left" size={24} color={Theme.secondary} />
    </TouchableOpacity>
  );
}
