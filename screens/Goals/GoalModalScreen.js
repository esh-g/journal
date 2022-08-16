import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState } from "react";
import { balsamiqSans, Theme, inter } from "../../config";
import { SharedElement } from "react-native-shared-element";
import { BackButton } from "../../components/BackButton";
import { Fab } from "../../components";
import { BorderButton } from "../../components/BorderButton";

function handleEdit() {}

export function GoalModalScreen({ route, navigation }) {
  const { goal } = route.params;
  const [title, setTitle] = useState(goal.title);
  const [notes, setNotes] = useState(goal.notes);
  const [due, setDue] = useState(goal.due);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  if (!goal) return null;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.top}>
          <BackButton width={45} height={45} onPress={navigation.goBack} />
          <Text style={inter.h3}>Goal</Text>
        </View>
        <SharedElement id={`${goal.id}.title`} style={{ marginBottom: 12 }}>
          <TextInput
            style={[balsamiqSans[40], styles.title]}
            placeholder="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            multiline
            editable={!isEditing}
          />
        </SharedElement>
        <TextInput
          style={[styles.notes, inter.normal]}
          placeholder="Notes"
          value={notes}
          onChangeText={(text) => setNotes(text)}
          multiline
          editable={!isEditing}
        />
        <BorderButton>Set as Current Goal</BorderButton>
      </View>
      <Fab icon={"edit"} onPress={handleEdit}>
        Edit
      </Fab>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    lineHeight: 50,
  },
  notes: {
    marginBottom: 12,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.primary,
    padding: 18,
  },
  content: {
    marginTop: "15%",
    backgroundColor: Theme.secondary,
    padding: 18,
    borderRadius: 24,
    paddingBottom: 28,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 18,
  },
});
