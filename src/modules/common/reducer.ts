import { RootState } from "../../store";
import * as t from "./actionTypes";
import { CommonState } from "./models";

export const initialState: CommonState = {
  appReady: false,
};

const reducer = (
  state: CommonState = initialState,
  action: any,
): CommonState => {
  switch (action.type) {
    case t.SET_APP_READY: {
      return {
        ...state,
        appReady: true,
      };
    }
    case t.RESET_APP_READY: {
      return {
        ...state,
        appReady: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;

// Selectors
export const appReadySelector = (state: RootState) =>
  state.commonReducer.appReady;
