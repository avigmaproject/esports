import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { MyMatches, MyTeams, SettingsState, Team } from "../models";
import * as fromServices from "../services";

const LOAD_MY_TEAMS = "settings/LOAD_MY_TEAMS";
const LEAVE_TEAM = "settings/LEAVE_TEAM";
const LOAD_MY_MATCHES = "settings/LOAD_MY_MATCHES";

const initialState: SettingsState = {
  myTeamsLoading: false,
  myTeamsLoaded: false,
  myTeamsError: "",
  myTeams: {
    pendingRecruits: [],
    teams: [],
  },
  myMatchesError: "",
  myMatches: {
    pending: [],
    scheduled: [],
  },
  leaveTeamError: "",
};

// Async Thunks
export const loadMyTeams = createAsyncThunk(
  LOAD_MY_TEAMS,
  async (_, { rejectWithValue }) => {
    try {
      return await fromServices.myTeams();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loadMyMatches = createAsyncThunk(
  LOAD_MY_MATCHES,
  async (_, { rejectWithValue }) => {
    try {
      return await fromServices.myMatches();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const leaveTeam = createAsyncThunk(
  LEAVE_TEAM,
  async (team: Team, { rejectWithValue }) => {
    try {
      return await fromServices.leaveTeam(team);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    removeTeam: (state, action: PayloadAction<Team>) => {
      state.myTeams.teams = state.myTeams.teams.filter(
        item => item.id !== action.payload.id,
      );
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<SettingsState>) => {
    builder
      .addCase(loadMyTeams.pending, state => {
        state.myTeamsLoading = true;
        state.myTeamsError = "";
      })
      .addCase(
        loadMyTeams.fulfilled,
        (state, action: PayloadAction<MyTeams>) => {
          state.myTeams = action.payload;
          state.myTeamsLoaded = true;
          state.myTeamsLoading = false;
        },
      )
      .addCase(loadMyTeams.rejected, (state, action) => {
        state.myTeamsLoading = false;
        state.myTeamsError = action.error.message!;
      })
      .addCase(
        loadMyMatches.fulfilled,
        (state, action: PayloadAction<MyMatches>) => {
          state.myMatches = action.payload;
        },
      )
      .addCase(loadMyMatches.rejected, (state, action) => {
        state.myMatchesError = action.error.message!;
      })
      .addCase(leaveTeam.fulfilled, (state, action) => {})
      .addCase(leaveTeam.rejected, (state, action) => {
        state.leaveTeamError = action.error.message!;
      });
  },
});

export const { removeTeam } = settingsSlice.actions;

export default settingsSlice.reducer;

// Selectors

export const getMyTeams = (state: RootState) => state.settings.myTeams;
export const getMyTeamsError = (state: RootState) =>
  state.settings.myTeamsError;
export const getMyTeamsLoading = (state: RootState) =>
  state.settings.myTeamsLoading;
export const getMyTeamsLoaded = (state: RootState) =>
  state.settings.myTeamsLoaded;

export const getPendingRecruits = createSelector(
  getMyTeams,
  myTeams => myTeams.pendingRecruits,
);

export const getTeams = createSelector(getMyTeams, myTeams => myTeams.teams);

export const getTeamById = createSelector(
  getTeams,
  (_: RootState, selectedTeamId: string) => selectedTeamId,
  (teams, teamId) => teams.find(team => team.id === teamId),
);

export const isRoleExist = createSelector(
  getTeamById,
  (_: RootState, teamId: string, userId: string, role: string) => [
    teamId,
    userId,
    role,
  ],
  (team, data) => {
    if (team) {
      if (!team.players) {
        return false;
      }
      return (
        team.players.filter(
          player => player.userID === data[1] && player.role === data[2],
        ).length > 0
      );
    }
    return false;
  },
);

export const getTeamPlayerByUserId = createSelector(
  getTeamById,
  (_: RootState, teamId: string, userId: string) => [teamId, userId],
  (team, data) => team?.players?.find(item => item.userID === data[1]),
);

export const getMyMatches = (state: RootState) => state.settings.myMatches;
export const getMyMatchesError = (state: RootState) =>
  state.settings.myMatchesError;

export const getPendingMatches = createSelector(
  getMyMatches,
  data => data.pending,
);

export const getScheduledMatches = createSelector(
  getMyMatches,
  data => data.scheduled,
);
