import { combineReducers } from "redux";

import { reducer as commonReducer } from "../modules/common";
import { reducer as authReducer } from "../modules/auth";
import { reducer as homeReducer } from "../modules/home";

const reducers = combineReducers({
  commonReducer,
  authReducer,
  homeReducer,
});

export default reducers;
