import { createSlice } from "@reduxjs/toolkit";

const MATCHES_API = import.meta.env.VITE_SERVER_MATCHES_API;

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
    onStrikeBatsman: { _id: "", name: "" },
    offStrikeBatsman: { _id: "", name: "" },
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
      state.innings = "1";

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
      const newInnings = "2";
      state.innings = newInnings;
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
    setBallLog: (state, action) => {
      const { runScored, isExtra, batsman, overNumber } = action.payload;
      const newBall = {
        bowler: state.bowler,
        runScored,
        isExtra,
        batsman,
        overNumber,
      };
      state.ball_log = [...state.ball_log, newBall];
    },
    setWicketLog: (state, action) => {
      const { runScored, batsman, overNumber } = action.payload;
      const newWicket = {
        bowler: state.bowler,
        runScored,
        batsman,
        overNumber,
      };
      state.wicket_log = [...state.wicket_log, newWicket];
    },
    setExtrasLog: (state, action) => {
      const { runScored, extraType } = action.payload;
      const newExtra = {
        bowler: state.bowler,
        runScored,
        extraType,
      };
      state.extras_log = [...state.extras_log, newExtra];
    },
    getWides: (state) => {
      let wides = 0;
      state.extras_log.map((extra) => {
        if (extra.extraType === "WD") {
          wides += extra.runScored;
        }
      });
      return wides;
    },
    getNoBalls: (state) => {
      let noBalls = 0;
      state.extras_log.map((extra) => {
        if (extra.extraType === "NB") {
          noBalls += extra.runScored;
        }
      });
      return noBalls;
    },
    getByes: (state) => {
      let byes = 0;
      state.extras_log.map((extra) => {
        if (extra.extraType === "B") {
          byes += extra.runScored;
        }
      });
      return byes;
    },
    getLegByes: (state) => {
      let legByes = 0;
      state.extras_log.map((extra) => {
        if (extra.extraType === "LB") {
          legByes += extra.runScored;
        }
      });
      return legByes;
    },
    getExtrasTotal: (state) => {
      let total = 0;
      state.extras_log.map((extra) => {
        total += extra.runScored;
      });
      return total;
    },
    clearMatchManagementData: () => initialState,
  },
});

export const getMatchManagementInfo =
  ({ matchId, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${MATCHES_API}/${matchId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetching error");
      }

      const data = await response.json();
      dispatch(setMatch(data));
      dispatch(setBattingTeam());
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

export const getTossResult =
  ({ matchId, token }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${MATCHES_API}/${matchId}/toss`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetching error");
      }

      const data = await response.json();
      const { status, toss } = data;
      dispatch(setTossResult(toss));
      dispatch(setStatus(status));
    } catch (error) {
      console.log("error:", error);
    }
  };

export const saveTossResultToDb =
  ({ matchId, toss, token }) =>
  async () => {
    try {
      const response = await fetch(`${MATCHES_API}/toss`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matchId, toss }),
      });
      if (!response.ok) {
        throw new Error("Could not save toss result!");
      }
      setMatchOngoing();
    } catch (error) {
      console.log("error:", error);
    }
  };

export const {
  setMatch,
  completeFirstInnings,
  setTossResult,
  setStatus,
  setBattingTeam,
  setMatchOngoing,
  setOnStrikeBatsman,
  setOffStrikeBatsman,
  setBallLog,
  setBowler,
  setExtrasLog,
  setStrikeChange,
  setWicketLog,
  getByes,
  getExtrasTotal,
  getLegByes,
  getNoBalls,
  getWides,
  clearMatchManagementData,
} = matchManagementSlice.actions;
export const matchManagementReducer = matchManagementSlice.reducer;
