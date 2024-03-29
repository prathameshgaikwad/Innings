import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  match_no: "",
  battingTeam: "",
  bowlingTeam: "",
  team1: "",
  team2: "",
  ball_log: [],
  run_log: [],
  wicket_log: [],
  extras_log: [],
  batsmen: {
    onStrikeBatsman: { _id: "", name: "", runs: "", ballsPlayed: "" },
    offStrikeBatsman: { _id: "", name: "", runs: "", ballsPlayed: "" },
  },
  bowler: {
    _id: "",
    name: "",
  },
  overs: "",
  innings: "",
  status: "",
  toss: {
    decision: "",
    winner: "",
    winnerId: "",
    loser: "",
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
        team1,
        team2,
        match_no,
        status,
        team1_ball_log,
        team1_run_log,
        team2_ball_log,
        team2_run_log,
        team1_wicket_log,
        team2_wicket_log,
      } = action.payload;

      state._id = _id;
      state.match_no = match_no;
      state.toss = toss;
      state.innings = innings;
      state.overs = overs;
      state.team1 = team1;
      state.team2 = team2;
      state.status = status;
      state.batsmen = {
        onStrikeBatsman: {
          name: "",
          runs: "",
          ballsPlayed: "",
          _id: "",
        },
        offStrikeBatsman: {
          name: "",
          runs: "",
          ballsPlayed: "",
          _id: "",
        },
      };

      const isFirstInnings = state.innings === "1";

      setBattingTeam();

      const battingTeamId = state.battingTeam._id;
      const bowlingTeamId = state.bowlingTeam._id;

      if (isFirstInnings) {
        state.run_log =
          battingTeamId === state.team1._id ? team1_run_log : team2_run_log;
        state.ball_log =
          bowlingTeamId === state.team1._id ? team1_ball_log : team2_ball_log;
        state.wicket_log =
          bowlingTeamId === state.team1._id
            ? team1_wicket_log
            : team2_wicket_log;
      } else {
        state.run_log =
          battingTeamId === state.team1._id ? team2_run_log : team1_run_log;
        state.ball_log =
          bowlingTeamId === state.team1._id ? team2_ball_log : team1_ball_log;
        state.wicket_log =
          bowlingTeamId === state.team1._id
            ? team2_wicket_log
            : team1_wicket_log;
      }
    },
    setBattingTeam: (state) => {
      const winningTeam =
        state.toss.winnerId === state.team1._id ? state.team1 : state.team2;
      const losingTeam =
        state.toss.winnerId === state.team1._id ? state.team2 : state.team1;

      if (state.innings === "1") {
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
    setToss: (action, state) => {
      state.toss = action.payload;
    },
    setRunLogItem: (state, action) => {
      const newRunLog = [...state.run_log, action.payload];
      state.run_log = newRunLog;
    },
    clearMatchData: () => initialState,
  },
});

export const {
  setMatch,
  setBattingTeam,
  setToss,
  setRunLogItem,
  clearMatchData,
} = matchSlice.actions;
export const matchReducer = matchSlice.reducer;
