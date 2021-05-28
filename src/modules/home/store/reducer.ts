import { HomeState } from "../models";
import * as fromActions from "./actions";

const initialState: HomeState = {
  leagues: [
    {
      key: "Onward",
      title: "Onward",
    },
    {
      key: "EchoArena",
      title: "Echo Arena",
    },
    {
      key: "Snapshot",
      title: "Snapshot",
    },
    {
      key: "FinalAssault",
      title: "Final Assault",
    },
    {
      key: "Pavlov",
      title: "Pavlov",
    },
    {
      key: "Contractors",
      title: "Contractors",
    },
  ],
  activeLeague: null,
};

const reducer = (
  state: HomeState = initialState,
  action: fromActions.HomeActionTypes,
) => {
  switch (action.type) {
    case fromActions.SET_ACTIVE_LEAGUE: {
      return {
        ...state,
        activeLeague: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
