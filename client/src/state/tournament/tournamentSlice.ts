import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Tournament } from "../../types";
import { Types } from "mongoose";

interface TournamentState {
  createdTournaments: Types.ObjectId[];
  joinedTournaments: Types.ObjectId[];
  featuredTournaments: Types.ObjectId[];
  latestTournament: Tournament | null;
}

const initialState: TournamentState = {
  createdTournaments: [],
  joinedTournaments: [],
  featuredTournaments: [],
  latestTournament: null,
};

/**
 * Manages the state of tournaments in the application.
 *
 * This slice handles the creation, joining, and management of tournaments,
 * including setting the latest tournament, featured tournaments, and
 * tournaments that the user has created or joined.
 */

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    addCreatedTournament: (state, action: PayloadAction<Types.ObjectId>) => {
      state.createdTournaments.push(action.payload);
    },
    addJoinedTournament: (state, action: PayloadAction<Types.ObjectId>) => {
      const tournament_id = action.payload;
      if (!state.joinedTournaments.includes(tournament_id)) {
        state.joinedTournaments.push(tournament_id);
      }
    },
    setCreatedTournaments: (state, action: PayloadAction<Types.ObjectId[]>) => {
      state.createdTournaments = action.payload;
    },
    setJoinedTournaments: (state, action: PayloadAction<Types.ObjectId[]>) => {
      state.joinedTournaments = action.payload;
    },
    setFeaturedTournaments: (
      state,
      action: PayloadAction<Types.ObjectId[]>
    ) => {
      state.featuredTournaments = action.payload;
    },
    setLatestTournament: (state, action: PayloadAction<Tournament>) => {
      state.latestTournament = action.payload;
    },
    clearFeaturedTournaments: (state) => {
      state.featuredTournaments = [];
    },
    clearTournamentsData: () => {
      return initialState;
    },
  },
});

export const {
  addCreatedTournament,
  addJoinedTournament,
  setCreatedTournaments,
  setJoinedTournaments,
  setFeaturedTournaments,
  setLatestTournament,
  clearFeaturedTournaments,
  clearTournamentsData,
} = tournamentSlice.actions;

export const tournamentReducer = tournamentSlice.reducer;
