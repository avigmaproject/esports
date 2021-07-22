// Redux Toolkit Implementation
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import purgeStoredState from "redux-persist/es/purgeStoredState";
import reducers from "./rootReducer"; //Import the root reducer

const persistConfig = {
  key: "vrmasterleague-app",
  storage: AsyncStorage,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === "auth/logoutUser") {
    purgeStoredState({
      key: "vrmasterleague-app",
      storage: AsyncStorage,
    });
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  // devTools: false,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
