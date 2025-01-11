import { Fixture, Team } from "../../types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import formatLongDate from "../../utilities/helpers/formatLongDate";

export interface bannerUrls {
  large: string;
  small: string;
}

export interface TournamentDetails {
  name: string;
  venue: string;
  admin_id: string;
  start_date: string;
  end_date: string;
  total_overs: number;
  banner_urls: bannerUrls;
  adminName: string;
}

export interface TournamentPageInitState {
  fixtures: Fixture[];
  teams: Team[];
  pointsTable: Team[];
  details: TournamentDetails | null;
}

const initialState: TournamentPageInitState = {
  fixtures: [],
  teams: [],
  pointsTable: [],
  details: null,
};

const tournamentPageSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setFixturesData: (state, action: PayloadAction<Fixture[]>) => {
      state.fixtures = action.payload;
    },
    setTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload;
    },
    setPointsTable: (state, action: PayloadAction<any>) => {
      state.pointsTable = action.payload;
    },
    setTournamentDetails: (state, action: PayloadAction<TournamentDetails>) => {
      const {
        name,
        venue,
        admin_id,
        start_date,
        end_date,
        total_overs,
        banner_urls,
        adminName,
      } = action.payload;

      const details = {
        name,
        venue,
        admin_id,
        start_date: formatLongDate(start_date),
        end_date: formatLongDate(end_date),
        total_overs,
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
