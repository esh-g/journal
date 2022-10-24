import Dash from "react-native-dash";
import { Card } from "./Card";
import { View, StyleSheet } from "react-native";
import { DateStamp } from "./Date";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export function Post({ title, notes, date, image, id }) {
  date = new Date(date);
  return (
    <Animated.View
      style={[
        styles.post,
        image && image.uri ? { height: hp("45%") } : { maxHeight: hp("30%") },
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
    marginTop: 10,
    justifyContent: "space-evenly",
    width: "100%"
  },
  date: {
    height: "100%",
    paddingLeft: 10,
    alignItems: "center",
    width: "15%"
  },
  postCard: {
    padding: 15,
    paddingTop: 24,
    width: "80%"
  },
});
