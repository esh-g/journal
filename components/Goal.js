import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { balsamiqSans, Theme } from "../config";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";

export function Goal({ goal, onPress, index }) {
  return (
    <Animated.View
      entering={SlideInLeft.delay(index * 100)}
      exiting={SlideOutRight}
    >
      <TouchableOpacity style={styles.goalItem} onPress={() => onPress(goal)}>
        <View style={styles.goalItemBar}></View>
        <View style={styles.goalItemText}>
          <SharedElement id={`${goal.id}.title`}>
            <Text style={balsamiqSans[24]}>{goal.title}</Text>
          </SharedElement>
          {goal.due ? (
            <FontAwesome5 name="clock" size={16} color={Theme.text} />
          ) : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Theme.secondary,
  },
  goalItemBar: {
    width: 8,
    height: "90%",
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
    backgroundColor: Theme.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  goalItemText: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
