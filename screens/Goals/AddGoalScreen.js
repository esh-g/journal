import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  TextInput,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Fab } from "../../components";
import { styles } from "./styles";
import { inter } from "../../config";
import { addGoal } from "./actions.js";
import { BackButton, BorderButton } from "../../components";

export function AddGoalScreen({ navigation }) {
  const [goalTitle, setGoalTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [goalTime, setGoalTime] = useState(null);
  const [goalDesc, setGoalDesc] = useState("");
  const [selected, setSelected] = useState("desc");
  const [dateVisible, setDateVisible] = useState(false);
  const [addingGoal, setAddingGoal] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={[styles.body, { marginTop: 20 }]}>
          <View
            style={[styles.currentGoal, { marginTop: 40, maxHeight: "80%" }]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <BackButton width={45} height={45} onPress={navigation.goBack} />
              <Text style={inter.h3}>Add Goal</Text>
            </View>
            <TextInput
              style={[styles.goalTitle, inter.h3]}
              value={goalTitle}
              onChangeText={(text) => setGoalTitle(text)}
              placeholder="Title"
            />
            <View style={styles.goalAcc}>
              <TouchableOpacity
                style={[
                  styles.selectedField,
                  {
                    marginRight: 15,

                    backgroundColor:
                      selected == "desc" ? Theme.accent : Theme.secondary,
                  },
                ]}
                onPress={() => setSelected("desc")}
              >
                <FontAwesome5
                  name="align-justify"
                  size={20}
                  color={selected == "desc" ? Theme.secondary : Theme.text}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelected("time")}
                style={[
                  styles.selectedField,
                  {
                    backgroundColor:
                      selected == "time" ? Theme.accent : Theme.secondary,
                  },
                ]}
              >
                <FontAwesome5
                  name="clock"
                  size={20}
                  color={selected == "time" ? Theme.secondary : Theme.text}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.goalAcc}>
              {!selected ? null : selected === "desc" ? (
                <TextInput
                  style={[styles.goalDesc, inter.bodyBase]}
                  value={goalDesc}
                  onChangeText={(text) => setGoalDesc(text)}
                  multiline={true}
                  placeholder="How do you plan on achieving this goal?"
                />
              ) : (
                <View>
                  <Text style={inter.h4}>Add a due date to your goal!</Text>
                  <Text style={inter.bodyBase}>
                    {goalTime ? goalTime.toDateString() : "Not Set"}
                  </Text>
                  <BorderButton onPress={() => setDateVisible(true)}>
                    Set Date
                  </BorderButton>
                  {dateVisible ? (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      onChange={(event, selectedDate) => {
                        setDate(selectedDate);
                        setGoalTime(selectedDate);
                        setDateVisible(false);
                      }}
                    />
                  ) : null}
                </View>
              )}
            </View>
          </View>
        </View>
        <Fab
          icon="check"
          disabled={addingGoal}
          onPress={() => {
            if (goalTitle) {
              setAddingGoal(true);
              addGoal(goalTitle, goalDesc, goalTime).then(() => {
                setAddingGoal(false);
                setGoalTitle("");
                setGoalDesc("");
                setGoalTime(null);
                setSelected(null);
                navigation.navigate("Goals.Main", { reload: true });
              });
            }
          }}
        >
          Create
        </Fab>
      </View>
    </TouchableWithoutFeedback>
  );
}
