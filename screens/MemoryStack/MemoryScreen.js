import { Text, View, StyleSheet, Image, TextInput } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useState } from "react";
import { Fab, BackButton } from "../../components";
import { inter, Theme, Drive } from "../../config";
import { getItemAsync } from "expo-secure-store";
import { DataSheet } from "../../config/database";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

async function editPost({ title, notes, date, image, id }) {
  console.log(title, notes, date, image, id);
  const accessToken = await getItemAsync("accessToken");
  const db = DataSheet.getInstance(accessToken);
  const sheetId = await db.getSheetId();
  const data = await db.updateMemory(sheetId, {
    title,
    notes,
    date,
    image,
    id,
  });
  return data;
}

async function deleteMemory(id, title, date) {
  const accessToken = await getItemAsync("accessToken");
  const db = DataSheet.getInstance(accessToken);
  const sheetId = await db.getSheetId();
  const drive = await Drive.getInstance();
  const imageName = `${title}-${date.valueOf()}.jpg`;
  await Promise.all([
    drive.deleteImage(imageName),
    db.deleteMemory(sheetId, id),
  ]);
  return true;
}

function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours %= 12;
  hours = hours || 12;
  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${
    hours >= 12 ? "PM" : "AM"
  }`;
}

export function MemoryScreen({ route, navigation }) {
  const id = route.params.id;
  const date = new Date(route.params.date);

  const [title, setTitle] = useState(route.params.title);
  const [notes, setnotes] = useState(route.params.notes);
  const [image, setImage] = useState(route.params.image);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleEdit() {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    if (title.length === 0) return;
    setIsLoading(true);
    editPost({ title, notes, date, image, id }).then(() => {
      setIsLoading(false);
      setIsEditing(false);
      navigation.goBack();
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <BackButton
            width={45}
            height={45}
            onPress={() => navigation.goBack()}
          />
          <Text style={inter.h3}>Memory</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            deleteMemory(id, title, date)
              .then((res) => {
                console.log(res);
                navigation.goBack();
              })
              .catch((e) => console.log(e, Object.entries(e)));
          }}
        >
          <FontAwesome5 name="trash-alt" size={28} color={Theme.accent} />
        </TouchableOpacity>
      </View>
      {image && (
        <SharedElement id={`${id}.image`}>
          <Image source={image} style={styles.image} />
        </SharedElement>
      )}
      <SharedElement id={`${id}.content`}>
        <View style={styles.content}>
          <TextInput
            style={[styles.title, inter.h2, isEditing ? styles.editable : null]}
            multiline
            value={title}
            editable={isEditing}
            onChangeText={(text) => setTitle(text)}
          />
          <Text
            style={[styles.date, inter.label]}
          >{`${date.toDateString()}`}</Text>
          <Text style={[styles.date, inter.label]}>{`${formatAMPM(
            date
          )}`}</Text>
          <TextInput
            editable={isEditing}
            style={[
              styles.desc,
              inter.normal,
              isEditing ? styles.editable : null,
            ]}
            multiline
            value={notes}
            onChangeText={(text) => setnotes(text)}
          />
        </View>
      </SharedElement>
      <Fab
        icon={isEditing ? "check" : "edit"}
        onPress={handleEdit}
        disabled={isLoading}
      >
        {isEditing ? "Save" : "Edit"}
      </Fab>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: Theme.secondary,
    padding: 20,
    paddingTop: 40,
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: 3 / 2,
    borderRadius: 16,
    overflow: "hidden",
  },
  content: {
    paddingTop: 20,
    width: "100%",
    height: "100%",
    marginTop: 10,
    paddingBottom: 10,
  },
  desc: {
    marginTop: 16,
    color: Theme.text,
  },
  title: {
    color: Theme.text,
  },
  editable: {
    backgroundColor: "#00000010",
    padding: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  top: {
    flexDirection: "row",
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 16,
  },
});
