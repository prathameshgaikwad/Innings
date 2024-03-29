import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  match_no: "",
  battingTeam: "",
  bowlingTeam: "",
  team1: "",
  team2: "",
  runs: 0,
  wickets: 0,
  extras: {
    wides: 0,
    no_balls: 0,
    byes: 0,
    leg_byes: 0,
  },
  balls_completed: 0,
  ball_log: [],
  wicket_log: [],
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
        team1,
        team2,
        match_no,
        status,
        data,
      } = action.payload;

      state._id = _id;
      state.match_no = match_no;
      state.toss = toss;
      state.innings = innings;
      state.overs = overs;
      state.team1 = team1;
      state.team2 = team2;
      state.status = status;

      const isFirstInnings = state.innings === 1;

      setBattingTeam();

      const bowlingTeamId = state.bowlingTeam._id;

      const updateStateForInnings = (inningData1, inningData2) => {
        state.runs =
          bowlingTeamId === state.team1._id
            ? inningData2.runs
            : inningData1.runs;
        state.wickets =
          bowlingTeamId === state.team1._id
            ? inningData2.wickets
            : inningData1.wickets;
        state.extras =
          bowlingTeamId === state.team1._id
            ? inningData2.extras
            : inningData1.extras;
        state.balls_completed =
          bowlingTeamId === state.team1._id
            ? inningData2.balls_completed
            : inningData1.balls_completed;
        state.ball_log =
          bowlingTeamId === state.team1._id
            ? inningData2.ball_log
            : inningData1.ball_log;
        state.wicket_log =
          bowlingTeamId === state.team1._id
            ? inningData2.wicket_log
            : inningData1.wicket_log;
      };

      if (isFirstInnings) {
        updateStateForInnings(data.team1, data.team2);
      } else {
        updateStateForInnings(data.team2, data.team1);
      }
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
