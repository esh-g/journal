import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import SwipeableFlatList from "react-native-swipeable-list";
import { Fab, Header, LoadingIndicator, Goal } from "../../components";
import { balsamiqSans, inter } from "../../config";
import { Theme } from "../../config";
import { useState, useEffect } from "react";
import { styles } from "./styles";
import { getGoals, deleteGoal } from "./actions";

export function GoalScreen({ route, navigation }) {
  const { reload } = route.params || {};
  const [goals, setGoals] = useState(null);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onPressGoal = (goal) => {
    navigation.navigate("Goals.Detail", { goal });
  };

  async function loadGoals() {
    try {
      const { goals } = await getGoals();
      const current = goals.find((goal) => goal.notes === "[CURRENT:GOAL]");
      if (current) setCurrentGoal(current);
      else if (goals.length !== 0) setCurrentGoal(goals[0]);
      else setCurrentGoal("No Goal");
      setGoals(goals.filter((goal) => goal !== currentGoal));
    } catch (e) {
      console.log(e);
      setCurrentGoal(null);
      setGoals(null);
    }
  }

  useEffect(() => {
    loadGoals();
  }, [reload]);

  return (
    <View style={styles.container}>
      <Header>GOALS</Header>
      <View style={styles.body}>
        <View style={styles.currentGoal}>
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <Text style={[inter.h3, , { marginBottom: 12 }]}>
              Your Current Goal:
            </Text>
            <Text
              style={[
                balsamiqSans[48],
                { textAlign: "center", lineHeight: 48 },
              ]}
            >
              {currentGoal === null ? (
                <LoadingIndicator />
              ) : currentGoal === "No Goal" ? (
                "Make A Goal"
              ) : (
                currentGoal.title
              )}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.otherGoals}>
          <Text style={inter.h3}>Other Goals:</Text>
          <SwipeableFlatList
            data={goals}
            renderQuickActions={({ item, index }) => (
              <View
                style={{
                  backgroundColor: "#0001",
                  borderRadius: 12,
                  height: "100%",
                  alignContent: "center",
                  justifyContent: "center",
                  padding: 4,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: Theme.accent,
                    alignItems: "center",
                    width: 80,
                    height: "100%",
                    justifyContent: "center",
                    alignSelf: "flex-end",
                    borderRadius: 12,
                  }}
                  onPress={() => {
                    setIsRefreshing(true);
                    setGoals(goals.filter((goal) => goal !== item));
                    deleteGoal(item.id).then(() => {
                      loadGoals().then(() => setIsRefreshing(false));
                    });
                  }}
                >
                  <Text style={[inter.label, { color: "white" }]}>DELETE</Text>
                </TouchableOpacity>
              </View>
            )}
            maxSwipeDistance={90}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            onRefresh={() => {
              setIsRefreshing(true);
              loadGoals().then(() => setIsRefreshing(false));
            }}
            refreshing={isRefreshing}
            renderItem={({ item, index }) => (
              <Goal goal={item} onPress={onPressGoal} index={index} />
            )}
            shouldBounceOnMount={false}
            keyExtractor={(item) => item.id}
            style={styles.otherGoalsList}
          />
        </View>
        <Fab icon="plus" onPress={() => navigation.navigate("Goals.Add")}>
          Goal
        </Fab>
      </View>
    </View>
  );
}
