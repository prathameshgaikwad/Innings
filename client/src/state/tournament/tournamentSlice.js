import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createdTournaments: [],
  joinedTournaments: [],
  featuredTournaments: [],
  latestTournament: null,
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    addCreatedTournament: (state, action) => {
      state.createdTournaments.push(action.payload);
    },
    addJoinedTournament: (state, action) => {
      const { tournament_id } = action.payload;
      if (!state.joinedTournaments.includes(tournament_id)) {
        state.joinedTournaments.push(tournament_id);
      }
    },
    setCreatedTournaments: (state, action) => {
      state.createdTournaments = action.payload;
    },
    setJoinedTournaments: (state, action) => {
      state.joinedTournaments = action.payload;
    },
    setFeaturedTournaments: (state, action) => {
      state.featuredTournaments = action.payload;
    },
    setLatestTournament: (state, action) => {
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
