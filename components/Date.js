import { View, Text, StyleSheet } from "react-native";
import { balsamiqSans, Theme } from "../config";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export function DateStamp({ date }) {
  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Text style={[balsamiqSans[24], { color: "white" }]}>
            {date.getDate()}
          </Text>
          <Text style={[balsamiqSans[18], { color: "white" }]}>th</Text>
        </View>
      </View>
      <Text style={balsamiqSans[24]}>{months[date.getMonth()]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    backgroundColor: Theme.accent,
    color: "white",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    width: 70,
  },
});
