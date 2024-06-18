import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempTeam: {
    teamName: "Your Team",
    teamColor: "#3F454B",
    isProcessing: false,
    players: [],
  },
  teams: [],
  fixtures: [],
};

const tournamentSetupSlice = createSlice({
  name: "tournamentSetup",
  initialState,
  reducers: {
    createTeam: (state, action) => {
      const { teamName, teamColor } = action.payload;
      const newTeam = {
        teamName,
        teamColor,
        isProcessing: true,
        players: [],
      };
      const newState = { ...state, tempTeam: newTeam };
      return newState;
    },
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    addPlayerToTeam: (state, action) => {
      const { playerName, isCaptain } = action.payload;
      state.tempTeam.players.push({ playerName, isCaptain });
    },
    saveTeam: (state, action) => {
      state.tempTeam.isProcessing = false;
      const { teamName, teamColor, players } = action.payload;
      const newTeam = {
        teamName,
        teamColor,
        players,
      };
      state.teams.push(newTeam);
      state.tempTeam = [];
    },
    clearTempTeam: () => {
      return { ...initialState, tempTeam: [] };
    },
    addFixture: (state, action) => {
      const { team1, team2, matchNumber, overs, matchDate, matchTime } =
        action.payload;
      const team1Details = state.teams.find((team) => team._id === team1);
      const team2Details = state.teams.find((team) => team._id === team2);
      const newFixture = {
        match_no: matchNumber,
        team1Short: team1Details.name_short,
        team2Short: team2Details.name_short,
        team1_id: team1,
        team2_id: team2,
        overs,
        date: matchDate,
        time: matchTime,
      };
      state.fixtures = [...state.fixtures, newFixture];
    },
    clearFixtures: () => {
      return { ...initialState, fixtures: [] };
    },
    clearTournamentSetup: () => initialState,
  },
});

export const {
  createTeam,
  addPlayerToTeam,
  saveTeam,
  setTeams,
  clearTournamentSetup,
  clearTempTeam,
  addFixture,
  clearFixtures,
} = tournamentSetupSlice.actions;
export const tournamentSetupReducer = tournamentSetupSlice.reducer;
