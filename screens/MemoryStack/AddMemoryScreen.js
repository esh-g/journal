import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Theme } from "../../config";
import { useState } from "react";
import { inter, balsamiqSans } from "../../config";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { DataSheet } from "../../config/database";
import { Fab } from "../../components";
import { Drive } from "../../config";
import axios from "axios";
import { BackButton } from "../../components/BackButton";
import { getItemAsync } from "expo-secure-store";

async function addMemory(title, notes, date, image) {
  const accessToken = await getItemAsync("accessToken");
  const db = DataSheet.getInstance(accessToken);
  const sheetId = await db.getSheetId();
  const data = await db.createMemory(sheetId, { title, notes, date, image });
  return data;
}

async function uploadData(base64Img, time, title, notes) {
  const drive = await Drive.getInstance();
  const image = `${title}-${time.valueOf()}.jpg`;
  let res;
  if (base64Img) {
    const imageId = (
      await axios.get("https://www.googleapis.com/drive/v3/files/generateIds", {
        params: { count: 1, fields: "ids" },
      })
    ).data.ids[0];
    res = await Promise.all([
      addMemory(
        title,
        notes,
        time,
        `https://drive.google.com/uc?id=${imageId}&export=download`
      ),
      drive.uploadImage(base64Img, image, imageId),
    ]);
  } else {
    res = await addMemory(title, notes, time, null);
  }
  return res;
}

export function AddMemoryScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleImage = () => {
    launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
      aspect: [3, 2],
    }).then((res) => {
      if (!res.cancelled) {
        setImage({
          uri: res.uri,
          base64: res.base64,
        });
      }
    });
  };

  const handleSubmit = () => {
    if (title.length < 5) {
      setIsValid(false);
      return;
    }
    setIsLoading(true);
    uploadData(image ? image.base64 : null, new Date(), title, notes)
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        e.json ? e.json().then((res) => console.log(res)) : console.log(e);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View style={styles.top}>
          <BackButton
            width={45}
            height={45}
            onPress={() => navigation.goBack()}
          />
          <Text style={inter.h3}>Add Memory</Text>
        </View>
        <ScrollView>
          <View style={styles.content}>
            <TextInput
              style={[styles.title, inter.h3, { borderWidth: isValid ? 0 : 1 }]}
              multiline
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                if (text.length > 4) setIsValid(true);
              }}
              placeholder="Title"
              maxLength={80}
            />
            <TextInput
              style={[styles.desc, balsamiqSans[18]]}
              multiline
              value={notes}
              onChangeText={(text) => setNotes(text)}
              placeholder="Notes"
              numberOfLines={4}
            />
          </View>
          <ImageBackground
            source={{ uri: image && image.uri }}
            style={[
              styles.image,
              {
                justifyContent: image ? "flex-end" : "center",
                alignItems: image ? "flex-end" : "center",
              },
            ]}
          >
            <TouchableOpacity
              style={{
                marginTop: 15,
                padding: 12,
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Theme.accent,
              }}
              onPress={handleImage}
            >
              <Text style={[inter.normal, { color: Theme.secondary }]}>
                {image ? "Change Image" : "Add Image"}
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </ScrollView>
      </View>
      <Fab icon="save" onPress={handleSubmit} disabled={isLoading}>
        Save
      </Fab>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    height: "100%",
    width: "100%",
    backgroundColor: Theme.primary,
    alignItems: "center",
  },
  wrap: {
    marginTop: "10%",
    maxHeight: "85%",
    width: "90%",
    backgroundColor: Theme.secondary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 28,
  },
  top: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  image: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: 3 / 2,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#00000010",
  },
  content: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: Theme.secondary,
    borderRadius: 16,
  },
  desc: {
    marginTop: 16,
    color: Theme.text,
    backgroundColor: "#00000010",
    borderRadius: 8,
    padding: 8,
    paddingLeft: 16,
    paddingBottom: 8,
    maxHeight: 300,
  },
  title: {
    color: Theme.text,
    backgroundColor: "#00000010",
    borderRadius: 8,
    paddingLeft: 16,
    padding: 16,
    borderColor: Theme.error,
  },
});
