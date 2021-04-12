import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import SplashScreen from "react-native-splash-screen";

import store, { persistor } from "./store";
import { RootNavigator, NoInternetNavigator } from "./navigation";
import { theme } from "./core/theme";

import { appReadySelector } from "./modules/common";
import { resetAppReady } from "./modules/common/actions";
import VrSplashScreen from "./modules/common/screens/SplashScreen";

const RootStack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const { isConnected } = useNetInfo();
  const appReady = useSelector(appReadySelector);

  useEffect(() => {
    SplashScreen.hide();
    dispatch(resetAppReady());
  }, []);

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        backgroundColor={"#757575"}
        networkActivityIndicatorVisible={true}
        barStyle="dark-content"
      />
      {!appReady ? (
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStack.Navigator
              screenOptions={{
                headerShown: false,
                animationEnabled: false,
              }}>
              <RootStack.Screen name="SplashStack" component={VrSplashScreen} />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      ) : !isConnected ? (
        <NoInternetNavigator />
      ) : (
        <RootNavigator />
      )}
    </PaperProvider>
  );
};

const AppWrapper = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </StoreProvider>
  );
};

export default AppWrapper;
