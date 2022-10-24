import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../config";
import { FontAwesome } from "@expo/vector-icons";

const icons = {
  Memories: "list-alt",
  Goals: "bullseye",
  Schedule: "calendar",
  Notes: "sticky-note-o",
};

export function NavBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return icons[route.name] ? (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.btn}
          >
            <View
              style={[
                styles.link,
                isFocused
                  ? { backgroundColor: Theme.accent, borderRadius: 50 }
                  : null,
              ]}
            >
              <FontAwesome
                name={icons[route.name]}
                size={24}
                color={isFocused ? "white" : "black"}
              />
            </View>
            <Text style={styles.text}>{label}</Text>
          </TouchableOpacity>
        ) : null;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "8%",
    paddingTop: 10,
    backgroundColor: Theme.secondary,
    color: Theme.text,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    elevation: 20,
    bottom: 0,
  },
  btn: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "BalsamiqSans_400Regular",
    fontSize: 14,
  },
  link: {
    borderRadius: 50,
    height: 36,
    width: 66,
    marginBottom: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
