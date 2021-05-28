import * as fromActions from "./../actions";
import * as fromModels from "../../models";

const initialState: fromModels.GameState = {
  players: [],
  regions: [],
  seasons: [],
  casters: [],
  maps: [],
  standings: [],
};

const reducer = (
  state = initialState,
  action: fromActions.GamesActionTypes,
) => {
  switch (action.type) {
    case fromActions.SET_PLAYERS: {
      return {
        ...state,
        players: action.payload,
      };
    }
    case fromActions.SET_CASTERS: {
      return {
        ...state,
        casters: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
