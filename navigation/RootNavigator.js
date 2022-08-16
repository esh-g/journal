import { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { AppStack } from "./AppStack";
import { AuthenticatedUserContext } from "../providers";
import { LoadingIndicator } from "../components";
import { auth } from "../config";
import { useFonts } from "expo-font";
import { Inter_700Bold, Inter_400Regular } from "@expo-google-fonts/inter";
import {
  BalsamiqSans_400Regular,
  BalsamiqSans_700Bold,
} from "@expo-google-fonts/balsamiq-sans";
import { WelcomeScreen } from "../screens/WelcomeScreen";

export const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
    BalsamiqSans_400Regular,
    BalsamiqSans_700Bold,
  });

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    if (!fontsLoaded) setIsLoading(true);
    return unsubscribeAuthStateChanged;
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <WelcomeScreen />}
    </NavigationContainer>
  );
};
