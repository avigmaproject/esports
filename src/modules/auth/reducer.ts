import { createSelector } from "reselect";
import { RootState } from "../../store";
import * as t from "./actionTypes";
import { AuthState, User } from "./models";

const initialState: AuthState = {
  token: null,
  user: null,
};

const reducer = (
  state = initialState,
  action: t.AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case t.SET_TOKEN: {
      const { token } = action.payload;
      return {
        ...state,
        token,
      };
    }

    case t.SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case t.LOGOUT: {
      return {
        ...state,
        token: null,
        user: null,
      };
    }

    case t.RESET: {
      return {
        ...state,
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
