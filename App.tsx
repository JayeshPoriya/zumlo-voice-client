// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

import React from "react";
import { StatusBar, Text } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { store } from "./src/redux/Store";
import { navigationRef } from "./src/navigation/RootNavigation";
import InitialRouter from "./src/navigation/InitialRouter";
import colors from "./src/theme/Colors";
import MyLoader from "./src/components/MyLoader";

import { ElevenLabsProvider } from "@elevenlabs/react-native";

//ElevenLabsProvider Details
//API KEY: 8e8bafd2ef513d52a0e8120bf65571d072beec0b95bb4f9446af9fa8849aefc7
//AGENT ID: agent_5101k9hm5jqgfhptbj2vdt1hwrs7
//AGENT ID TWO: agent_6501k9vkh0wwes2v1g6h2rj4823s

//PJ Account
//AGENT ID: agent_5701k9vzrs7geyyrn1d6rz01w86c

//JP02
// AGENT ID: agent_1901k9w36cgbfzvteggnhjzg4amd
function App() {
  return (
    <ElevenLabsProvider>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <StatusBar animated backgroundColor={colors.themeColor} />
            <InitialRouter />
            <Toast />
            <MyLoader />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </ElevenLabsProvider>
  );
}

export default App;
