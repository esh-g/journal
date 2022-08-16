import Dash from "react-native-dash";
import { Card } from "./Card";
import { View, StyleSheet } from "react-native";
import { DateStamp } from "./Date";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";

export function Post({ title, notes, date, image, id }) {
  date = new Date(date);
  return (
    <Animated.View
      style={[
        styles.post,
        image && image.uri ? { height: 420 } : { height: 200 },
      ]}
      entering={SlideInLeft}
      exiting={SlideOutRight}
    >
      <View style={styles.date}>
        <DateStamp date={date} />
        <Dash
          style={{
            marginTop: "10%",
            width: 1,
            height: "80%",
            flexDirection: "column",
          }}
          dashGap={10}
          dashLength={10}
          dashThickness={2}
          dashColor={Theme.accent}
        />
      </View>
      <View style={styles.postCard}>
        <Card title={title} notes={notes} image={image} date={date} id={id} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  post: {
    flexDirection: "row",
    overflow: "hidden",
    marginTop: 12,
  },
  date: {
    height: "100%",
    paddingLeft: 10,
    alignItems: "center",
  },
  postCard: {
    flex: 3.5,
    padding: 15,
    paddingTop: 25,
  },
});
