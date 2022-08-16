import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Theme } from "../config";

export const LoadingIndicator = ({ size, color }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size ? size : "large"}
        color={color ? color : Theme.accent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
