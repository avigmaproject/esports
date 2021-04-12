import { combineReducers } from "redux";

import { reducer as commonReducer } from "../modules/common";
import { reducer as authReducer } from "../modules/auth";

const reducers = combineReducers({
  commonReducer,
  authReducer,
});

export default reducers;
