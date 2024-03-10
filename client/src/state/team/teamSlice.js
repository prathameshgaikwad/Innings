import { createSlice } from "@reduxjs/toolkit";

const TEAMS_API = import.meta.env.VITE_SERVER_TEAMS_API;

const initialState = {
  name: "",
  color: "",
  players: [],
  captain: "",
  logoURL: "",
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action) => {
      const { name, color, players, logoURL, captainName } = action.payload;
      state.name = name;
      state.color = color;
      state.players = players;
      state.captain = captainName;
      state.logoURL = logoURL;
    },
    clearTeamData: () => initialState,
  },
});

export const getTeamInfo =
  ({ teamId, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${TEAMS_API}/${teamId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetching error");
      }

      const data = await response.json();
      dispatch(setTeam(data));
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

export const { setTeam, clearTeamData } = teamSlice.actions;
export const teamReducer = teamSlice.reducer;
