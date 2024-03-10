import { createSlice } from "@reduxjs/toolkit";

const MATCHES_API = import.meta.env.VITE_SERVER_MATCHES_API;

const initialState = {
  _id: "",
  match_no: "",
  battingTeam: "",
  bowlingTeam: "",
  venue: "",
  team1: "",
  team2: "",
  team1_ball_log: [],
  team1_run_log: [],
  team2_ball_log: [],
  team2_run_log: [],
  team1_wicket_log: [],
  team2_wicket_log: [],
  overs: "",
  innings: "1",
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
        overs,
        team1,
        team2,
        match_no,
        status,
        venue,
        team1_ball_log,
        team1_run_log,
        team2_ball_log,
        team2_run_log,
        team1_wicket_log,
        team2_wicket_log,
      } = action.payload;

      state._id = _id;
      state.team1_ball_log = team1_ball_log;
      state.team1_run_log = team1_run_log;
      state.team1_wicket_log = team1_wicket_log;
      state.team2_ball_log = team2_ball_log;
      state.team2_wicket_log = team2_wicket_log;
      state.team2_run_log = team2_run_log;
      state.toss = toss;
      state.overs = overs;
      state.venue = venue;
      state.team1 = team1;
      state.team2 = team2;
      state.match_no = match_no;
      state.innings = "1";
      state.status = status;
    },
    clearMatchData: () => initialState,
  },
});

export const getMatchInfo =
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
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

export const { setMatch, clearMatchData } = matchSlice.actions;
export const matchReducer = matchSlice.reducer;
