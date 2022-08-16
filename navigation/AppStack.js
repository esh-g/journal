import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GoalScreen, GoalModalScreen, AddGoalScreen } from "../screens/Goals";
import {
  MemoriesScreen,
  MemoryScreen,
  AddMemoryScreen,
} from "../screens/MemoryStack";
import { NoteScreen } from "../screens/NoteScreen";
import { ScheduleScreen } from "../screens/ScheduleScreen";
import { AuthScreen } from "../screens/AuthScreen";
import { LoadingIndicator, NavBar } from "../components";
import { Dimensions, View, Text } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { setStatusBarStyle } from "expo-status-bar";
import { Theme } from "../config";
import { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { ProfileScreen } from "../screens/ProfileScreen";
import { authenticateAsync } from "expo-local-authentication";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

const MemoriesStackNav = createSharedElementStackNavigator();
const GoalsStackNav = createSharedElementStackNavigator();

function MemoriesStack() {
  return (
    <MemoriesStackNav.Navigator screenOptions={{ headerShown: false }}>
      <MemoriesStackNav.Screen
        name="Memories.Main"
        component={MemoriesScreen}
      />
      <MemoriesStackNav.Screen
        name="Memories.Detail"
        component={MemoryScreen}
        sharedElements={(route) => {
          return [
            {
              id: `${route.params.id}.image`,
              animation: "fade",
              resize: "stretch",
            },
            {
              id: `${route.params.id}.content`,
              animation: "fade",
              resize: "stretch",
            },
          ];
        }}
      />
      <MemoriesStackNav.Screen
        name="Memories.Add"
        component={AddMemoryScreen}
      />
    </MemoriesStackNav.Navigator>
  );
}

function GoalsStack() {
  return (
    <GoalsStackNav.Navigator screenOptions={{ headerShown: false }}>
      <GoalsStackNav.Screen name="Goals.Main" component={GoalScreen} />
      <GoalsStackNav.Screen
        name="Goals.Detail"
        component={GoalModalScreen}
        sharedElements={(route) => {
          return [{ id: `${route.params.goal.id}.title` }];
        }}
      />
      <GoalsStackNav.Screen name="Goals.Add" component={AddGoalScreen} />
    </GoalsStackNav.Navigator>
  );
}

export function AppStack() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authenticate = () => {
    authenticateAsync().then((result) => {
      result.success && setIsAuthenticated(true);
    });
  };
  setBackgroundColorAsync(Theme.secondary);
  setStatusBarStyle("light");
  useEffect(() => {
    getItemAsync("isAuthEnabled").then((isAuthEnabled) => {
      if (isAuthEnabled === "false") setIsAuthenticated(true);
      else {
        authenticate();
      }
      setIsLoading(false);
    });

    GoogleSignin.getTokens().then(({ accessToken }) => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setItemAsync("accessToken", accessToken);
      setIsLoading(false);
    });
  }, []);
  if (!isLoading)
    return (
      <>
        {isAuthenticated ? (
          <Tab.Navigator
            tabBar={(props) => <NavBar {...props} />}
            screenOptions={{
              tabBarHideOnKeyboard: true,
              headerShown: false,
            }}
          >
            <Tab.Screen name="Memories" component={MemoriesStack} />
            <Tab.Screen name="Goals" component={GoalsStack} />
            <Tab.Screen name="Notes" component={NoteScreen} />
            <Tab.Screen name="Schedule" component={ScheduleScreen} />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ unmountOnBlur: true }}
            />
          </Tab.Navigator>
        ) : (
          <AuthScreen onPress={() => authenticate()} />
        )}
      </>
    );
  else return <LoadingIndicator size={"large"} color={Theme.accent} />;
}
