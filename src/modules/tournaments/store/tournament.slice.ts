import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
  ThunkAction,
} from "@reduxjs/toolkit";

import * as fromServices from "../services";
import * as fromModels from "../models";
import { RootState } from "../../../store";

const initialState: fromModels.TournamentState = {
  players: [],
  regions: [],
  seasons: [],
  casters: [],
  maps: [],
  standings: [],
  error: null,
};

// Constants
export const LOAD_REGIONS_BY_LEAGUE = "tournament/LOAD_REGIONS_BY_GAME";
export const LOAD_SEASONS_BY_LEAGUE = "tournament/LOAD_SEASONS_BY_LEAGUE";
export const LOAD_CASTERS_BY_LEAGUE = "tournament/LOAD_CASTERS_BY_LEAGUE";
export const LOAD_SUBSTITUTE_BY_LEAGUE = "tournament/LOAD_SUBSTITUTE_BY_LEAGUE";

// Action Thunks
//#region Action Thunks
export const loadRegionsByLeague = createAsyncThunk(
  LOAD_REGIONS_BY_LEAGUE,
  async (league: string, { rejectWithValue }) => {
    try {
      return await fromServices.getRegionsByLeague(league);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const loadSeasonsByLeague = createAsyncThunk(
  LOAD_SEASONS_BY_LEAGUE,
  async (league: string, { rejectWithValue }) => {
    try {
      return await fromServices.getSeasonsByLeague(league);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const loadCastersByLeague = createAsyncThunk(
  LOAD_SEASONS_BY_LEAGUE,
  async (league: string, { rejectWithValue }) => {
    try {
      return await fromServices.getCastersByLeague(league);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
//#endregion

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState: initialState,
  reducers: {
    setError: (state, action: PayloadAction<SerializedError>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: (
    builder: ActionReducerMapBuilder<fromModels.TournamentState>,
  ) => {
    builder
      .addCase(
        loadRegionsByLeague.fulfilled,
        (state, action: PayloadAction<fromModels.Region[]>) => {
          state.regions = action.payload;
        },
      )
      .addCase(loadRegionsByLeague.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(
        loadSeasonsByLeague.fulfilled,
        (state, action: PayloadAction<fromModels.Season[]>) => {
          state.seasons = action.payload;
        },
      )
      .addCase(loadSeasonsByLeague.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

// Actions
export const { setError, clearError } = tournamentSlice.actions;

export default tournamentSlice.reducer;

// Selectors
export const getLeagueRegions = (state: RootState) => state.tournament.regions;
export const getLeagueSeasons = (state: RootState) => state.tournament.seasons;

export const getTournamentError = (state: RootState) => state.tournament.error;
