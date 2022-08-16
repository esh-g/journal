import { RootNavigator } from "./navigation/RootNavigator";
import { AuthenticatedUserProvider } from "./providers";
import { StatusBar, setStatusBarStyle } from "expo-status-bar";
import { Theme } from "./config";
import { View } from "react-native";

const App = () => {
  setStatusBarStyle("dark-content");
  return (
    <View style={{ flex: 1 }}>
      <AuthenticatedUserProvider>
        <RootNavigator />
      </AuthenticatedUserProvider>
      <StatusBar />
    </View>
  );
};

export default App;
