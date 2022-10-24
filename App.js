import { RootNavigator } from "./navigation/RootNavigator";
import { AuthenticatedUserProvider } from "./providers";
import { StatusBar, setStatusBarStyle } from "expo-status-bar";
import { Theme } from "./config";
import { View, Text, TextInput } from "react-native";

const App = () => {
  setStatusBarStyle("dark-content");
  if (Text.defaultProps) {
    Text.defaultProps.allowFontScaling = false;
  } else {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }
  
  // Override Text scaling in input fields
  if (TextInput.defaultProps) {
    TextInput.defaultProps.allowFontScaling = false;
  } else {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }
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
