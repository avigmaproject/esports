import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import reducers from "./rootReducer"; //Import the root reducer

// const enhancer = compose(applyMiddleware(thunk));

const persistConfig = {
  key: "vrmasterleague-app",
  storage: AsyncStorage,
};

// export default createStore(reducers, enhancer);
// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//       })
//     : compose;

const composeEnhancers = compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
