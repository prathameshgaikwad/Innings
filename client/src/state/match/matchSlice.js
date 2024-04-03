import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  match_no: null,
  battingTeam: {},
  bowlingTeam: {},
  team1: null,
  team2: null,
  ball_log: [],
  wicket_log: [],
  batting_log: [],
  data: {},
  batsmen: {
    onStrikeBatsman: { _id: null, name: null, runs: null, ballsPlayed: null },
    offStrikeBatsman: { _id: null, name: null, runs: null, ballsPlayed: null },
  },
  bowler: {
    _id: null,
    name: null,
  },
  overs: null,
  innings: null,
  venue: null,
  status: null,
  toss: {
    decision: null,
    winner: null,
    winnerId: null,
    loser: null,
  },
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    setMatch: (state, action) => {
      const {
        _id,
        toss,
        innings,
        overs,
        venue,
        team1,
        team2,
        match_no,
        status,
        data,
        battingTeam,
        bowlingTeam,
      } = action.payload;

      state._id = _id;
      state.match_no = match_no;
      state.toss = toss;
      state.innings = innings;
      state.overs = overs;
      state.venue = venue;
      state.team1 = team1;
      state.team2 = team2;
      state.status = status;
      state.battingTeam = battingTeam;
      state.bowlingTeam = bowlingTeam;
      state.data = data;
    },
    setToss: (state, action) => {
      state.toss = action.payload;
    },
    setLogs: (state, action) => {
      const data = action.payload;
      if (state.battingTeam._id === state.team1._id) {
        state.ball_log = data.team1.ball_log;
        state.wicket_log = data.team1.wicket_log;
        state.batting_log = data.team1.batting_log;
      } else {
        state.ball_log = data.team2.ball_log;
        state.wicket_log = data.team2.wicket_log;
        state.batting_log = data.team2.batting_log;
      }
    },
    clearMatchData: () => initialState,
  },
});

export const { setMatch, setBattingTeam, setToss, setLogs, clearMatchData } =
  matchSlice.actions;
export const matchReducer = matchSlice.reducer;
