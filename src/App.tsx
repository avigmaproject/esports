import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import SplashScreen from "react-native-splash-screen";
import { Provider as PaperProvider } from "react-native-paper";

import store, { persistor } from "./store";
import {
  RootNavigator,
  NoInternetNavigator,
  SplashScreenNavigator,
} from "./navigation";
import { theme } from "./core/theme";

import { appReadySelector } from "./modules/common";
import { resetAppReady } from "./modules/common/actions";
import { PaperSnackbar } from "./components";

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
