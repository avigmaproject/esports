// export * from "./actions";
export * from "./tournament.slice";
import tournamentReducer from "./tournament.slice";

export default {
  tournament: tournamentReducer,
};
