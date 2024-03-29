import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

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

export const tournamentPageReducer = tournamentPageSlice.reducer;
