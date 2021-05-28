export interface Set {
  mapID: string;
  map: string;
  scoreHome: number;
  scoreAway: number;
}

export interface VoteTeam {
  team?: string;
}

export interface SubmitScore {
  scores: Score[];
  substitutes: Substitute[];
}

export interface Score {
  homeScore: number;
  awayScore: number;
  map: string;
}

export interface Substitute {
  id: string;
  team: string;
}

export interface SendChallenge {
  dateScheduled: Date;
}
