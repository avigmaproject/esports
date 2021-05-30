import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import SplashScreen from "react-native-splash-screen";
import { Provider as PaperProvider } from "react-native-paper";

import { store, persistor } from "./store";
import {
  RootNavigator,
  NoInternetNavigator,
  SplashScreenNavigator,
} from "./navigation";
import { theme } from "./core/theme";

import { isAppReady, resetAppReady } from "./modules/common/store";
import { PaperSnackbar } from "./components";

import { useAppDispatch, useAppSelector } from "./store";

const App = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useNetInfo();
  const appReady = useAppSelector(isAppReady);

  useEffect(() => {
    SplashScreen.hide();
    dispatch(resetAppReady());
  }, []);

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="light-content" />
      <SafeAreaProvider>
        {!appReady ? (
          <SplashScreenNavigator />
        ) : !isConnected ? (
          <NoInternetNavigator />
        ) : (
          <RootNavigator />
        )}
        <PaperSnackbar />
      </SafeAreaProvider>
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
