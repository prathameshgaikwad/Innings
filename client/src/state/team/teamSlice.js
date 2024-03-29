import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  color: "",
  players: [],
  captain: "",
  logoURL: "",
  performance: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action) => {
      const { name, color, players, logoURL, captainName, performance } =
        action.payload;
      state.name = name;
      state.color = color;
      state.players = players;
      state.captain = captainName;
      state.logoURL = logoURL;
      state.performance = performance;
    },
    clearTeamData: () => initialState,
  },
});

export const { setTeam, clearTeamData } = teamSlice.actions;
export const teamReducer = teamSlice.reducer;
