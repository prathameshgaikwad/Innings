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

const matchManagementSlice = createSlice({
  name: "matchManagement",
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

      if (result.winnerId) state.result.winnerId = result.winnerId;
    },
    setTossResult: (state, action) => {
      const toss = action.payload;
      const { decision, winner, winnerId, loser } = toss;
      state.toss.decision = decision;
      state.toss.winner = winner;
      state.toss.winnerId = winnerId;
      state.toss.loser = loser;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    completeFirstInnings: (state) => {
      const newInnings = 2;
      state.innings = newInnings;
    },
    setBattingTeam: (state) => {
      const winningTeam =
        state.toss.winnerId === state.team1._id ? state.team1 : state.team2;
      const losingTeam =
        state.toss.winnerId === state.team1._id ? state.team2 : state.team1;

      if (state.innings === 1) {
        if (state.toss.decision === "bat") {
          state.battingTeam = winningTeam;
          state.bowlingTeam = losingTeam;
        } else {
          state.battingTeam = losingTeam;
          state.bowlingTeam = winningTeam;
        }
      } else {
        if (state.toss.decision === "bat") {
          state.battingTeam = losingTeam;
          state.bowlingTeam = winningTeam;
        } else {
          state.battingTeam = winningTeam;
          state.bowlingTeam = losingTeam;
        }
      }
    },
    setMatchOngoing: (state) => {
      state.status = "ongoing";
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
    setOnStrikeBatsmanRuns: (state, action) => {
      const { runs, balls_played } = action.payload;
      state.onStrikeBatsman.runs = runs;
      state.onStrikeBatsman.ballsPlayed = balls_played;
    },
    setStrikeChange: (state) => {
      [state.offStrikeBatsman, state.onStrikeBatsman] = [
        state.onStrikeBatsman,
        state.offStrikeBatsman,
      ];
    },
    setRuns: (state) => {
      let totalRuns = 0;
      if (state.ball_log)
        state.ball_log.forEach((log) => (totalRuns += log.runs_scored));
      state.runs = totalRuns;
    },
    addRuns: (state, action) => {
      const { score } = action.payload;
      state.runs += score;
    },
    setBowler: (state, action) => {
      const { _id, name } = action.payload;
      state.bowler._id = _id;
      state.bowler.name = name;
    },
    setBallLog: (state, action) => {
      const { runs_scored, isWicket } = action.payload;
      const newBall = {
        bowler: state.bowler,
        runs_scored,
        isWicket,
      };
      state.ball_log = [...state.ball_log, newBall];
    },
    setWicketLog: (state, action) => {
      const { runs_completed, batsman, overNumber } = action.payload;
      const newWicket = {
        bowler: state.bowler,
        runs_completed,
        batsman,
        overNumber,
      };
      state.wicket_log = [...state.wicket_log, newWicket];
    },
    setExtrasLog: (state, action) => {
      const { runs_completed, extraType } = action.payload;
      const newExtra = {
        bowler: state.bowler,
        runs_completed,
        extraType,
      };
      state.extras_log = [...state.extras_log, newExtra];
    },
    clearMatchManagementData: () => initialState,
  },
});

export const {
  addRuns,
  setMatch,
  completeFirstInnings,
  setTossResult,
  setStatus,
  setBattingTeam,
  setMatchOngoing,
  setOnStrikeBatsman,
  setOnStrikeBatsmanRuns,
  setOffStrikeBatsman,
  setBallLog,
  setRuns,
  setBowler,
  setExtrasLog,
  setStrikeChange,
  setWicketLog,
  clearMatchManagementData,
} = matchManagementSlice.actions;
export const matchManagementReducer = matchManagementSlice.reducer;
