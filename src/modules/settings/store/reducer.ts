import { SettingsState, Team } from "../models/settings";

const initialState: SettingsState = {
  myTeams: [],
  myMatches: [],
};

const reducer = (state: SettingsState = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default reducer;
