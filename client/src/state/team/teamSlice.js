import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  team_color: "",
  players: [],
  captain_name: "",
  logo_url: "",
  performance: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action) => {
      const { name, team_color, players, logo_url, captain_name, performance } =
        action.payload;
      state.name = name;
      state.team_color = team_color;
      state.players = players;
      state.captain_name = captain_name;
      state.logo_url = logo_url;
      state.performance = performance;
    },
    clearTeamData: (state) => {
      state.name = "";
      state.team_color = "";
      state.players = [];
      state.captain_name = "";
      state.logo_url = "";
      state.performance = null;
    },
  },
});

export const { setTeam, clearTeamData } = teamSlice.actions;
export const teamReducer = teamSlice.reducer;
