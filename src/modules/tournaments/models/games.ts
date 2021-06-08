export interface Region {
  id: string;
  name: string;
}

export interface Season {
  id: string;
  name: string;
}

export interface Caster {
  id: string;
  name: string;
  logo: string;
}

export interface BaseStadium {
  id: string;
  name: string;
}

export interface Channel {
  id: string;
  name: string;
}

export interface BaseTeam {
  id: string;
  name: string;
  logo: string;
  regionID: string;
  region: string;
  rank: number;
  rankWorldwide?: number;
}

export interface Team extends BaseTeam {
  division: string;
  divisionLogo: string;
  gp: number;
  w: number;
  t: number;
  l: number;
  pts: number;
  mmr?: string;
  isRecruiting: boolean;
  currentUserChallengeID: string | null;
  currentUserCanLeagueSub: boolean;
  cycleGP?: number;
  cycleW?: number;
  cycleT?: number;
  cycleL?: number;
  cycleTieBreaker?: number;
  cyclePlusMinus?: number;
  cycleScoreTotal?: number;
}

export interface BaseMatch {
  id: string;
  homeTeam: BaseTeam;
  awayTeam: BaseTeam;
  castingInfo: CastingInfo;
  dateScheduled: Date;
}

// Upcoming Match
export interface Match extends BaseMatch {
  homeBetCount: number;
  awayBetCount: number;
  castUpvotes: number;
  currentUserVotedTeamID?: string;
  currentUserUpvotedCast?: boolean;
}

export interface CastingInfo {
  channel: string;
  casterID: string;
  caster: string;
  coCasterID: string;
  coCaster: string;
  cameramanID: string;
  cameraman: string;
  postGameInterviewID: string;
  postGameInterview: string;
}

// Match History
export interface MatchHistory extends BaseMatch {
  winningTeamID: string;
  losingTeamID: string;
  homeScore: number;
  awayScore: number;
  isForfeit: boolean;
  vodURL?: string;
}

// Match Details
export interface MatchDetails {
  id: string;
  homeTeam: BaseTeam;
  awayTeam: BaseTeam;
  dateScheduled: Date;
  seasonName: string;
  winningTeamID: string;
  losingTeamID: string;
  homeScore: number;
  awayScore: number;
  week: number;
  homeHighlights: string;
  awayHighlights: string;
  vodURL?: string;
  mapsSet: MapSet[];
}

export interface MapSet {
  mapNum: number;
  mapName: string;
  homeScore: number;
  awayScore: number;
}

export interface TeamsStats {
  team1Rank: number;
  team1RankWorldwide: number;
  team2Rank: number;
  team2RankWorldwide: number;
  commonMatches: MatchDetails[];
  commonMaps: Stadium[];
  team1History: any[];
  team2History: any[];
}

export interface Stadium {
  map: string;
  played: number;
  team1Win: number;
  team1RoundsWin: number;
  team1RoundsWinPercentage: number;
  team2Win: number;
  team2RoundsWin: number;
  team2RoundsWinPercentage: number;
}

export interface TeamHistory {
  map: string;
  played: number;
  win: number;
  winPercentage: number;
  roundsPlayed: number;
  roundsWin: number;
  roundsWinPercentage: number;
}

export interface TeamUpcomingMatches {
  matches: Match[];
}

export interface TeamMatchHistory {
  matches: Match[];
}

export interface CreateTeam {
  name: string;
  region: string;
}

export interface MatchRequest {
  league: string;
  region?: string;
  posMin?: number;
}

export interface StandingRequest {
  league: string;
  region?: string;
  rankMin?: number;
}

export interface TeamDetPlayers {
  id: string;
  game: string;
  name: string;
  logo: string;
  regionID: string;
  region: string;
  active: boolean;
  retired: boolean;
  players: Player[];
}

export interface Player {
  id: string;
  userID: string;
  name: string;
  logo: string;
  country: string;
  nationality: string;
  roleID: string;
  role: string;
}
