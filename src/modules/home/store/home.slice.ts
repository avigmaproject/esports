import { createSlice, ThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { leagues } from "../constants";
import { HomeState, League } from "../models";

const initialState: HomeState = {
  leagues: leagues,
  activeLeague: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    setActiveLeague: (state, action: PayloadAction<League>) => {
      state.activeLeague = action.payload;
    },
    clearActiveLeague: state => {
      state.activeLeague = null;
    },
  },
});

export const { setActiveLeague, clearActiveLeague } = homeSlice.actions;

export default homeSlice.reducer;

export const getAllLeagues = (state: RootState) => state.home.leagues;
export const getActiveLeague = (state: RootState) => state.home.activeLeague;
