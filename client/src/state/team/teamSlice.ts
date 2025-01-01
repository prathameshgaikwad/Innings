import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player, TeamPerformance } from "../../types";

interface TeamState {
  name: string;
  team_color: string;
  players: Player[];
  captain_name: string;
  logo_url: string;
  performance: TeamPerformance | null;
}

const initialState: TeamState = {
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
    setTeam: (state, action: PayloadAction<TeamState>) => {
      const { name, team_color, players, logo_url, captain_name, performance } =
        action.payload;
      state.name = name;
      state.team_color = team_color;
      state.players = players;
      state.captain_name = captain_name;
      state.logo_url = logo_url;
      state.performance = performance;
    },
    clearTeamData: () => {
      return initialState;
    },
  },
});

export const { setTeam, clearTeamData } = teamSlice.actions;
export const teamReducer = teamSlice.reducer;
