import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  match_no: null,
  battingTeam: {},
  bowlingTeam: {},
  team1: null,
  team2: null,
  inningsData: {},
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
  result: {
    winnerId: null,
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
        inningsData,
        result,
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
      state.inningsData = inningsData;

      state.result.winnerId = result.winnerId;
    },
    setToss: (state, action) => {
      state.toss = action.payload;
    },
    clearMatchData: () => initialState,
  },
});

export const { setMatch, setBattingTeam, setToss, clearMatchData } =
  matchSlice.actions;
export const matchReducer = matchSlice.reducer;
