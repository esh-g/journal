import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { inter, Theme } from "../config";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "@react-navigation/native";

const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours %= 12;
  hours = hours || 12;
  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${
    hours >= 12 ? "PM" : "AM"
  }`;
};

export function Card({ title, notes, image, date, id }) {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        nav.navigate("Memories.Detail", {
          image,
          title,
          notes,
          id,
          date: date.toISOString(),
        })
      }
    >
      <View style={styles.card}>
        {image && image.uri.length != 0 ? (
          <SharedElement id={`${id}.image`} style={styles.cardImage}>
            <Image source={image} style={styles.cardImage} />
          </SharedElement>
        ) : null}
        <SharedElement
          id={`${id}.content`}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, inter.h3]}>{title}</Text>
            <Text style={[styles.cardTime, inter.label]}>
              {formatAMPM(date)}
            </Text>
            <Text style={[styles.cardDescription, inter.bodyBase]}>
              {notes.length > 70 && image && image.uri.length != 0
                ? notes.substring(0, 70) + "..."
                : notes.substring(0, 100)}
            </Text>
          </View>
        </SharedElement>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Theme.secondary,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 18,
    height: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  cardImage: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    aspectRatio: 3 / 2,
    borderRadius: 16,
  },
  cardContent: {
    width: "100%",
    height: "100%",
    marginTop: 10,
    color: Theme.text,
  },
  cardTime: {
    marginBottom: 10,
  },
});
