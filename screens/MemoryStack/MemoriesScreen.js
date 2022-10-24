import { View, StyleSheet, ScrollView, Text, SafeAreaView } from "react-native";
import { Theme } from "../../config";
import { Post, Header, Fab, LoadingIndicator } from "../../components";
import { useEffect, useState } from "react";
import { DataSheet } from "../../config/database";
import { getItemAsync } from "expo-secure-store";

async function getMemories() {
  const accessToken = await getItemAsync("accessToken");
  const db = DataSheet.getInstance(accessToken);
  const sheetId = await db.getSheetId();
  const data = await db.getData(sheetId);
  return data;
}

export function MemoriesScreen({ navigation }) {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getMemories()
        .then((data) => {
          console.log(data);
          setPosts(data);
        })
        .catch((e) => {
          console.log(Object.entries(e));
        });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.body}>
        <Header />

        {posts === null ? (
          <LoadingIndicator />
        ) : posts.length > 0 ? (
          posts.map((postData) => <Post {...postData} key={postData.id} />)
        ) : (
          <Text>Add A new Memory</Text>
        )}
      </ScrollView>
      <Fab icon="plus" onPress={() => navigation.navigate("Memories.Add")}>
        Memory
      </Fab>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    height: "100%",
    width: "100%",
    backgroundColor: Theme.primary,
    color: Theme.text,
  },
  body: {
    flexDirection: "column",
    flex: 1,
  },
});
