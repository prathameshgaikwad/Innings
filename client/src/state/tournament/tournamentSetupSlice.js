import { createSlice } from "@reduxjs/toolkit";

const TEAMS_API = import.meta.env.VITE_SERVER_TEAMS_API;
const TOURNAMENTS_API = import.meta.env.VITE_SERVER_TOURNAMENTS_API;
const FIXTURES_API = import.meta.env.VITE_SERVER_FIXTURES_API;

const initialState = {
  tempTeam: [],
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
        team1Short: team1Details.nameShort,
        team2Short: team2Details.nameShort,
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

export const createTournament =
  ({ values, token, setOpen, resetForm, addCreatedTournament, navigate }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${TOURNAMENTS_API}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Fetching error");
      }

      const responseData = await response.json();

      dispatch(addCreatedTournament(responseData._id));
      resetForm();
      setOpen(false);
      navigate(`/tournaments/${responseData._id}/setup`);
    } catch (error) {
      console.log("Error:", error);
    }
  };

export const saveTeamToDb =
  ({ data, token, setOpenToast, teamData }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${TEAMS_API}/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log("Something went wrong!");
        return;
      }
      setOpenToast(true);
      setTimeout(() => {
        setOpenToast(false);
        dispatch(saveTeam(teamData));
      }, 1200);
    } catch (error) {
      console.log(error);
    }
  };

export const getCreatedTeams =
  ({ tournamentId, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${TOURNAMENTS_API}/${tournamentId}/teams`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetching error");
      }
      const { teams } = await response.json();
      dispatch(setTeams(teams));
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

export const saveFixturesBatchToDb =
  ({ tournamentId, token, fixtures, setOpen, navigate }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${FIXTURES_API}/create-batch`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fixtures, tournamentId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create fixtures");
      }

      await response.json();
      setOpen(false);
      navigate(`/tournaments/${tournamentId}`);
      dispatch(clearTournamentSetup());
    } catch (error) {
      console.log("Error in finish setup: ", error);
    }
  };

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
