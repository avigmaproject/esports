import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
  SerializedError,
  ThunkAction,
} from "@reduxjs/toolkit";

import * as fromServices from "../services";
import * as fromModels from "../models";
import { RootState } from "../../../store";
import {
  resetLoading,
  setLoadingWithText,
} from "../../common/store/loader.slice";
import { setSnackbarMessage } from "../../common/store";

const initialState: fromModels.TournamentState = {
  players: [],
  regions: [],
  seasons: [],
  casters: [],
  maps: [],
  standings: [],
  error: undefined,
  filterRegRank: undefined,
  teamDetails: undefined,
  teamDetPlayers: [],
  teamUpcomingMatches: [],
  teamMatchesHistory: [],
  upcomingMatches: [],
  pastMatches: [],
};

// Constants
export const LOAD_REGIONS_BY_LEAGUE = "tournament/LOAD_REGIONS_BY_GAME";
export const LOAD_SEASONS_BY_LEAGUE = "tournament/LOAD_SEASONS_BY_LEAGUE";
export const LOAD_CASTERS_BY_LEAGUE = "tournament/LOAD_CASTERS_BY_LEAGUE";
export const LOAD_SUBSTITUTE_BY_LEAGUE = "tournament/LOAD_SUBSTITUTE_BY_LEAGUE";
export const LOAD_STANDINGS_BY_LEAGUE = "tournament/LOAD_STANDINGS_BY_LEAGUE";
export const LOAD_TEAM_DETAILS = "tournament/LOAD_TEAM_DETAILS";
export const LOAD_TEAM_PLAYERS = "tournament/LOAD_TEAM_PLAYERS";
export const LOAD_TEAM_UPCOMING_MATCHES =
  "tournament/LOAD_TEAM_UPCOMING_MATCHES";
export const LOAD_TEAM_MATCHES_HISTORY = "tournament/LOAD_TEAM_MATCHES_HISTORY";
export const LOAD_UPCOMING_MATCHES = "tournament/LOAD_UPCOMING_MATCHES";
export const LOAD_MATCHES_HISTORY = "tournament/LOAD_MATCHES_HISTORY";
export const SUBMIT_VOTE_FOR_TEAM = "tournament/SUBMIT_VOTE_FOR_TEAM";
export const SUBMIT_VOTE_FOR_CAST = "tournament/SUBMIT_VOTE_FOR_CAST";

// Action Thunks
//#region Action Thunks
export const loadRegionsByLeague = createAsyncThunk<
  fromModels.Region[],
  string,
  { rejectValue: fromModels.CustomError }
>(LOAD_REGIONS_BY_LEAGUE, async (league: string, { rejectWithValue }) => {
  try {
    return await fromServices.getRegionsByLeague(league);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const loadSeasonsByLeague = createAsyncThunk<
  fromModels.Season[],
  string,
  { rejectValue: fromModels.CustomError }
>(LOAD_SEASONS_BY_LEAGUE, async (league: string, { rejectWithValue }) => {
  try {
    return await fromServices.getSeasonsByLeague(league);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const loadCastersByLeague = createAsyncThunk<
  fromModels.Caster[],
  string,
  { rejectValue: fromModels.CustomError }
>(LOAD_SEASONS_BY_LEAGUE, async (league: string, { rejectWithValue }) => {
  try {
    return await fromServices.getCastersByLeague(league);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const loadStandingsByLeague = createAsyncThunk<
  fromModels.Team[],
  fromModels.StandingRequest,
  { rejectValue: fromModels.CustomError }
>(
  LOAD_STANDINGS_BY_LEAGUE,
  async (data: fromModels.StandingRequest, thunkApi) => {
    thunkApi.dispatch(setLoadingWithText({ text: "Fetching standings..." }));
    try {
      return await fromServices.getStandingsByLeague(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    } finally {
      thunkApi.dispatch(resetLoading());
    }
  },
);
export const loadTeamDetails = createAsyncThunk<
  fromModels.Team,
  string,
  { rejectValue: fromModels.CustomError }
>(LOAD_TEAM_DETAILS, async (teamId: string, thunkApi) => {
  try {
    return await fromServices.getTeamDetails(teamId);
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const loadTeamPlayers = createAsyncThunk<
  fromModels.Player[],
  string,
  { rejectValue: fromModels.CustomError }
>(LOAD_TEAM_PLAYERS, async (teamId: string, thunkApi) => {
  try {
    const teamDetPlayers = await fromServices.getTeamPlayers(teamId);
    return teamDetPlayers.players;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const loadTeamUpcomingMatches = createAsyncThunk<
  fromModels.Match[],
  string,
  { rejectValue: fromModels.CustomError }
>(LOAD_TEAM_UPCOMING_MATCHES, async (teamId: string, thunkApi) => {
  try {
    return await fromServices.getTeamUpcomingMatches(teamId);
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const loadTeamMatchesHistory = createAsyncThunk<
  fromModels.MatchHistory[],
  string,
  { rejectValue: fromModels.CustomError }
>(LOAD_TEAM_MATCHES_HISTORY, async (teamId: string, thunkApi) => {
  try {
    return await fromServices.getTeamMatchesHistory(teamId);
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const loadLeagueUpcomingMatches = createAsyncThunk<
  fromModels.Match[],
  fromModels.MatchRequest,
  { rejectValue: fromModels.CustomError }
>(LOAD_UPCOMING_MATCHES, async (request: fromModels.MatchRequest, thunkApi) => {
  try {
    return await fromServices.getLeagueUpcomingMatches(request);
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const loadLeagueMatchesHistory = createAsyncThunk<
  fromModels.MatchHistory[],
  fromModels.MatchRequest,
  { rejectValue: fromModels.CustomError }
>(LOAD_MATCHES_HISTORY, async (request: fromModels.MatchRequest, thunkApi) => {
  try {
    return await fromServices.getLeagueMatchesHistory(request);
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const submitVoteForTeam = createAsyncThunk<
  void,
  string,
  { rejectValue: fromModels.CustomError }
>(SUBMIT_VOTE_FOR_TEAM, async (matchId: string, thunkApi) => {
  try {
    await fromServices.voteForTeam(matchId);
  } catch (error) {
    thunkApi.dispatch(
      setSnackbarMessage("An error occurred while processing your request"),
    );
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const submitVoteForCast = createAsyncThunk<
  void,
  string,
  { rejectValue: fromModels.CustomError }
>(SUBMIT_VOTE_FOR_CAST, async (matchId: string, thunkApi) => {
  try {
    await fromServices.voteForCast(matchId);
  } catch (error) {
    thunkApi.dispatch(
      setSnackbarMessage("An error occurred while processing your request"),
    );
    return thunkApi.rejectWithValue(error.response.data);
  }
});
//#endregion

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState: initialState,
  reducers: {
    setError: (state, action: PayloadAction<fromModels.CustomError>) => {
      state.error = action.payload.message;
    },
    clearError: state => {
      state.error = undefined;
    },
    setFilterRegRank: (
      state,
      action: PayloadAction<fromModels.FilterRegionMinRank>,
    ) => {
      state.filterRegRank = action.payload;
    },
    resetFilterRegRank: state => {
      state.filterRegRank = undefined;
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
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(
        loadSeasonsByLeague.fulfilled,
        (state, action: PayloadAction<fromModels.Season[]>) => {
          state.seasons = action.payload;
        },
      )
      .addCase(loadSeasonsByLeague.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(
        loadStandingsByLeague.fulfilled,
        (state, action: PayloadAction<fromModels.Team[]>) => {
          state.standings = action.payload;
        },
      )
      .addCase(loadStandingsByLeague.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loadTeamDetails.fulfilled, (state, action) => {
        state.teamDetails = action.payload;
      })
      .addCase(loadTeamDetails.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loadTeamPlayers.fulfilled, (state, action) => {
        state.teamDetPlayers = action.payload;
      })
      .addCase(loadTeamPlayers.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loadTeamUpcomingMatches.fulfilled, (state, action) => {
        state.teamUpcomingMatches = action.payload;
      })
      .addCase(loadTeamUpcomingMatches.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loadTeamMatchesHistory.fulfilled, (state, action) => {
        state.teamMatchesHistory = action.payload;
      })
      .addCase(loadTeamMatchesHistory.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loadLeagueUpcomingMatches.fulfilled, (state, action) => {
        state.upcomingMatches = action.payload;
      })
      .addCase(loadLeagueUpcomingMatches.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loadLeagueMatchesHistory.fulfilled, (state, action) => {
        state.pastMatches = action.payload;
      })
      .addCase(loadLeagueMatchesHistory.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(submitVoteForTeam.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(submitVoteForCast.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

// Actions
export const {
  setError,
  clearError,
  setFilterRegRank,
  resetFilterRegRank,
} = tournamentSlice.actions;

export default tournamentSlice.reducer;

// Selectors
export const getLeagueRegions = (state: RootState) => state.tournament.regions;
export const getLeagueSeasons = (state: RootState) => state.tournament.seasons;

export const getLeagueStandings = (state: RootState) =>
  state.tournament.standings;
export const getFilterRegionRank = (state: RootState) =>
  state.tournament.filterRegRank;
export const getLeagueStandingById = createSelector(
  getLeagueStandings,
  (_: RootState, teamId: string) => teamId,
  (standings, teamId) => standings.find(item => item.id === teamId),
);
export const getTeamDetails = (state: RootState) =>
  state.tournament.teamDetails;
export const getTeamPlayers = (state: RootState) =>
  state.tournament.teamDetPlayers;
export const getTeamUpcomingMatches = (state: RootState) =>
  state.tournament.teamUpcomingMatches;
export const getTeamMatchesHistory = (state: RootState) =>
  state.tournament.teamMatchesHistory;

export const getLeagueUpcomingMatches = (state: RootState) =>
  state.tournament.upcomingMatches;
export const getLeagueMatchesHistory = (state: RootState) =>
  state.tournament.pastMatches;

// export const getMappedStandings = createSelector(
//   getLeagueStandings,
//   standings => standings.map(item => ({
//     rank: item.rank
//   }))
// )

export const getTournamentError = (state: RootState) => state.tournament.error;
