// import { combineReducers } from "redux";

import { reducer as commonReducer } from "../modules/common";
import { reducer as authReducer } from "../modules/auth";
import { reducer as homeReducer } from "../modules/home";
import { reducer as settingsReducer } from "../modules/settings";
import { reducers as tournamentReducers } from "../modules/tournaments";

// const reducers = combineReducers({
//   commonReducer,
//   authReducer,
//   homeReducer,
//   settingsReducer,
// });

// export default reducers;

const reducers = {
  ...commonReducer,
  ...authReducer,
  ...settingsReducer,
  ...homeReducer,
  ...tournamentReducers,
};

export default reducers;
