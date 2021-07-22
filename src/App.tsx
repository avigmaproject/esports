import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import SplashScreen from "react-native-splash-screen";
import { Provider as PaperProvider } from "react-native-paper";
import { ToastProvider } from "react-native-paper-toast";

import { store, persistor } from "./store";
import { RootNavigator, SplashScreenNavigator } from "./navigation";
import { theme } from "./core/theme";

import { isAppReady, resetAppReady } from "./modules/common/store";

import { useAppDispatch, useAppSelector } from "./store";

const App = () => {
  const dispatch = useAppDispatch();

  const appReady = useAppSelector(isAppReady);

  useEffect(() => {
    SplashScreen.hide();
    dispatch(resetAppReady());
  }, []);

  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      style={{ backgroundColor: theme.colors.background }}>
      <PaperProvider theme={theme}>
        <ToastProvider>
          <StatusBar barStyle="light-content" />
          {!appReady ? <SplashScreenNavigator /> : <RootNavigator />}
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
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
