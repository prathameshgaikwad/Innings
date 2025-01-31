import { Types } from "mongoose";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LiveMatch {
  isEmpty: boolean;
  data: Match | null;
}

export interface UserState {
  user: User | null;
  token: string | null;
  liveMatch: LiveMatch;
  upcomingMatches: Match[] | null;
}

export interface LoginPayload {
  token: string;
  user: User;
}

export type Extras = {
  total: number;
  wides: number;
  no_balls: number;
  byes: number;
  leg_byes: number;
  penalties: number;
};

export type FallOfWicket = {
  bowler_id: string;
  on_strike_batsman_id: string;
  wicket_number: number;
  over: number;
  ball: number;
  total_runs: number;
  dismissal_comment: string;
};

export type ballLog = {
  bowler_id: string;
  on_strike_batsman_id: string;
  off_strike_batsman_id: string;
  runs_scored: number;
  wicket: {
    is_wicket: boolean;
    wicket_number: number;
    runs_this_ball: number;
    dismissal_comment: string;
    over: number;
    ball: number;
    total_runs: number;
  };
  extra: {
    is_extra: boolean;
    extra_type: "WD" | "B" | "LB" | "P" | "NB";
    runs_this_ball: number;
  };
};

export type Innings = {
  innings_no: number;
  status: "not-started" | "started" | "completed";
  data: {
    batting_team_id: string;
    bowling_team_id: string;
    total_runs: number;
    total_wickets: number;
    balls_completed: number;
    total_overs: { type: Number; required: [true, "overs is required"] };
    total_sixes: number;
    total_fours: number;
    extras: Extras;
    ball_log: ballLog[];
    fall_of_wickets_log: FallOfWicket[];
  };
};

export interface Match {
  innings: Innings[];
  _id: string;
  match_no: number;
  status: "pending" | "ongoing" | "completed";
  team1_id: string;
  team2_id: string;
  total_overs: number;
  toss: {
    conducted: boolean;
    decision: "bat" | "field";
    winner_id: string;
    result: {
      winner_id: string;
      comment: string;
      player_of_the_match: {
        _id: string;
      };
    };
  };
}

export interface Team {
  _id: Types.ObjectId;
  name: string;
  name_short: string;
  team_color: string;
  players: Player[];
  captain_name: string;
  logo_url: string;
  performance: TeamPerformance;
}

export interface Player {
  _id: Types.ObjectId;
  team_id?: Types.ObjectId;
  tournament_id?: Types.ObjectId;
  first_name: string;
  last_name?: string;
  debut: Date;
  picture_url?: string;
  statistics: PlayerStatistics;
  match_performances: Array<MatchPerformance>;
}

export interface PlayerStatistics {
  matches: number;
  total_runs: number;
  strike_rate: number;
  average: number;
  highest_score: {
    runs: number;
    dismissed: boolean;
  };
  fifties: number;
  hundreds: number;
  fours: number;
  sixes: number;
  total_dismissals: number;
  balls_faced: number;
  runs_conceded: number;
  balls_bowled: number;
  wickets_taken: number;
  extras: {
    wides: number;
    no_balls: number;
    byes: number;
    leg_byes: number;
    penalty_runs: number;
  };
  maidens: number;
  economy: number;
}

export interface MatchPerformance {
  match_id: Types.ObjectId;
  tournament_id: Types.ObjectId;
  batting_performance: BattingPerformance;
  bowling_performance: BowlingPerformance;
}

export interface Dismissal {
  is_dismissed: boolean;
  bowler_id?: Types.ObjectId;
  dissmissal_type:
    | "caught"
    | "bowled"
    | "lbw"
    | "run_out"
    | "stumped"
    | "hit-wicket"
    | "retired_hurt"
    | "retired_out"
    | "timed_out"
    | "not_out";
}

export interface BattingPerformance {
  status: "did_not_bat" | "did_bat";
  runs_scored: number;
  balls_faced: number;
  dismissal: Dismissal;
  fours: number;
  sixes: number;
  strike_rate: number;
}

export interface Wickets {
  wickets_taken: number;
  wicket_log: Types.ObjectId[];
}

export interface BowlingPerformance {
  status: "did_not_bowl" | "did_bowl";
  balls_bowled: number;
  runs_conceded: number;
  economy: number;
  wickets: Wickets;
  extras: Extras;
}

export type BattingData = {
  sr_no: number;
  name: string;
  wicket: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
};

export type BowlingData = {
  name: string;
  overs: number;
  runs: number;
  wickets: number;
  economy: number;
  dots: number;
};

export type FallOfWicketsData = {
  name: string;
  scoreStamp: number;
  overStamp: number;
};

export interface TeamPerformance {
  matches: number;
  win: number;
  loss: number;
  draw: number;
  points: number;
  nrr: number;
}

export interface Fixture {
  _id: Types.ObjectId;
  team1_id: Types.ObjectId;
  team2_id: Types.ObjectId;
  match_id?: Types.ObjectId;
  match_no: number;
  date: Date;
  time: string;
  status: FixtureStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export type FixtureStatus = "pending" | "ongoing" | "completed";

export interface Tournament {
  _id: Types.ObjectId;
  admin_id: Types.ObjectId;
  name: string;
  start_date: Date;
  end_date: Date;
  venue?: string;
  total_overs: number;
  teams: Types.ObjectId[];
  fixtures: Types.ObjectId[];
  banner_urls: {
    large?: string;
    small?: string;
  };
  status: "pending" | "ongoing" | "completed";
  createdAt?: Date;
  updatedAt?: Date;
}
