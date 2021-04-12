import { AuthState } from "./models";

const initialState: AuthState = {
  token: null,
  user: undefined,
};

const reducer = (state = initialState, action: any): AuthState => {
  switch (action) {
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
