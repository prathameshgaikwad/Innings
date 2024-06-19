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

export type Match = {
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
};
