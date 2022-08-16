import { TouchableOpacity, Text } from "react-native";
import { balsamiqSans } from "../config";

export function BorderButton({ onPress, children }) {
  return (
    <TouchableOpacity
      style={{
        marginTop: 15,
        padding: 12,
        borderWidth: 0.4,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <Text style={balsamiqSans[18]}>{children}</Text>
    </TouchableOpacity>
  );
}
