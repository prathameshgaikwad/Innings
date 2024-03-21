import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

const TOURNAMENTS_API = import.meta.env.VITE_SERVER_TOURNAMENTS_API;

const initialState = {
  fixtures: [],
  teams: [],
  pointsTable: [],
  details: null,
};

const tournamentPageSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setFixturesData: (state, action) => {
      state.fixtures = action.payload;
    },
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    setPointsTable: (state, action) => {
      state.pointsTable = action.payload;
    },
    setTournamentDetails: (state, action) => {
      const {
        name,
        venue,
        admin_id,
        start_date,
        end_date,
        overs,
        banner_urls,
        adminName,
      } = action.payload;

      const details = {
        name,
        venue,
        admin_id,
        start_date: format(new Date(start_date), "do MMM yyyy"),
        end_date: format(new Date(end_date), "do MMM yyyy"),
        overs,
        banner_urls,
        adminName,
      };
      state.details = details;
    },
    clearTournamentPage: () => {
      return initialState;
    },
  },
});

export const {
  clearTournamentPage,
  setFixturesData,
  setTeams,
  setPointsTable,
  setTournamentDetails,
} = tournamentPageSlice.actions;

export const fetchTournamentFixtures =
  ({ tournamentId, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `${TOURNAMENTS_API}/${tournamentId}/fixtures`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Fetching error");
      }
      const data = await response.json();
      dispatch(setFixturesData(data));
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

export const getTeams =
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

export const fetchPointsTable =
  ({ tournamentId, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `${TOURNAMENTS_API}/${tournamentId}/points-table`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Fetching error");
      }
      const data = await response.json();
      dispatch(setPointsTable(data));
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

export const getTournamentDetails =
  ({ id, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${TOURNAMENTS_API}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Could not retrieve tournament details");
      }

      const details = await response.json();
      dispatch(setTournamentDetails(details));
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

export const joinTournament =
  ({ tournament_id, token, user_id }) =>
  async () => {
    try {
      const response = await fetch(`${TOURNAMENTS_API}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          tournament_id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to join tournament!");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const tournamentPageReducer = tournamentPageSlice.reducer;
