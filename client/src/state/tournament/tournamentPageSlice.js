import { createSlice } from "@reduxjs/toolkit";
import formatDate from "../../utilities/helpers/formatDate";

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
        start_date: formatDate(start_date),
        end_date: formatDate(end_date),
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
