import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    height: "100%",
    width: "100%",
    backgroundColor: Theme.primary,
    color: Theme.text,
  },
  body: {
    marginTop: 12,
    paddingHorizontal: wp("4.5%"),
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-start",
  },
  currentGoal: {
    backgroundColor: Theme.secondary,
    maxHeight: 250,
    width: "100%",
    borderRadius: 28,
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: wp("6%"),
    marginBottom: 24,
  },
  otherGoals: {
    backgroundColor: Theme.secondary,
    width: "100%",
    flex: 1,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    padding: 24,
  },
  goalTitle: {
    marginTop: 24,
    backgroundColor: "#0001",
    padding: 12,
    borderRadius: 6,
    width: "100%",
  },
  goalAcc: {
    marginVertical: 12,
    width: "100%",
    flexDirection: "row",
  },
  goalDesc: {
    padding: 12,
    borderRadius: 4,
    backgroundColor: "#00000008",
    width: "100%",
    height: 180,
  },
  selectedField: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
});
