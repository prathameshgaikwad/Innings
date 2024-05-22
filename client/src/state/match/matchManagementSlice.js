import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  match_no: null,
  battingTeam: {},
  bowlingTeam: {},
  team1_id: null,
  team2_id: null,
  batsmen: {
    onStrikeBatsman: { _id: null, name: null, runs: null, ballsPlayed: null },
    offStrikeBatsman: { _id: null, name: null, runs: null, ballsPlayed: null },
  },
  bowler: {
    _id: null,
    name: null,
    overs_bowled: null,
    balls_bowled: null,
    wickets_taken: null,
    runs_conceded: null,
  },
  total_overs: null,
  venue: null,
  status: null,
  toss: {
    decision: null,
    winner_name: null,
    winner_id: null,
    loser_name: null,
    conducted: false,
  },
  result: {
    winnerId: null,
    comment: null,
    player_of_the_match: {
      id: null,
      name: null,
    },
  },
  innings: [],
  current_innings_no: null,
};

const matchManagementSlice = createSlice({
  name: "matchManagement",
  initialState,
  reducers: {
    setMatch: (state, action) => {
      const {
        _id,
        toss,
        innings,
        total_overs,
        venue,
        team1_id,
        team2_id,
        match_no,
        status,
        result,
        battingTeam,
        bowlingTeam,
      } = action.payload;

      state._id = _id;
      state.match_no = match_no;
      state.total_overs = total_overs;
      state.venue = venue;
      state.team1_id = team1_id;
      state.team2_id = team2_id;
      state.status = status;
      state.battingTeam = battingTeam;
      state.bowlingTeam = bowlingTeam;

      if (toss.winner_id) {
        state.toss.winner_id = toss.winner_id;
        state.toss.decision = toss.decision;
        state.toss.winner_name = toss.winner_name;
        state.toss.loser_name = toss.loser_name;
        state.toss.conducted = toss.conducted;
      }

      if (result.winnerId) {
        state.result.winnerId = result.winner_id;
        state.result.comment = result.comment;
        state.result.player_of_the_match.name = result.player_of_the_match.name;
      }

      state.innings = innings;

      if (innings) {
        if (innings.length === 0) {
          state.current_innings_no = 1;
        } else {
          state.current_innings_no = innings.length;
        }
      }
    },
    setTossResult: (state, action) => {
      const toss = action.payload;
      const { decision, winner_name, winner_id, loser_name, conducted } = toss;
      state.toss.decision = decision;
      state.toss.winner_name = winner_name;
      state.toss.winner_id = winner_id;
      state.toss.loser_name = loser_name;
      state.toss.conducted = conducted;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setOnStrikeBatsman: (state, action) => {
      const { _id, name } = action.payload;
      state.batsmen.onStrikeBatsman._id = _id;
      state.batsmen.onStrikeBatsman.name = name;
    },
    setOffStrikeBatsman: (state, action) => {
      const { _id, name } = action.payload;
      state.batsmen.offStrikeBatsman._id = _id;
      state.batsmen.offStrikeBatsman.name = name;
    },
    setStrikeChange: (state) => {
      [state.offStrikeBatsman, state.onStrikeBatsman] = [
        state.onStrikeBatsman,
        state.offStrikeBatsman,
      ];
    },
    setBowler: (state, action) => {
      const { _id, name } = action.payload;
      state.bowler._id = _id;
      state.bowler.name = name;
    },
    setMatchManagementInningsData: (state, action) => {
      state.innings[state.current_innings_no - 1].data = action.payload;
    },
    setOptimisticInningsRuns: (state, action) => {
      const { runs_scored } = action.payload;
      state.innings[state.current_innings_no - 1].data.total_runs +=
        runs_scored;
      state.innings[state.current_innings_no - 1].data.balls_completed += 1;
    },
    clearMatchManagementData: () => initialState,
  },
});

export const {
  setMatch,
  setTossResult,
  setStatus,
  setOnStrikeBatsman,
  setOffStrikeBatsman,
  setBowler,
  setStrikeChange,
  setMatchManagementInningsData,
  setOptimisticInningsRuns,
  clearMatchManagementData,
} = matchManagementSlice.actions;
export const matchManagementReducer = matchManagementSlice.reducer;
