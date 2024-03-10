import { createSlice } from "@reduxjs/toolkit";

const USER_API = import.meta.env.VITE_SERVER_USER_API;
const TOURNAMENTS_API = import.meta.env.VITE_SERVER_TOURNAMENTS_API;

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
      state.joinedTournaments = [...state.joinedTournaments, tournament_id];
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
    clearTournamentsData: () => initialState,
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

export const fetchCreatedTournaments =
  ({ userId, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `${USER_API}/${userId}/created-tournaments`,
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

      const { data } = await response.json();
      dispatch(setCreatedTournaments(data));
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

export const fetchJoinedTournaments =
  ({ userId, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${USER_API}/${userId}/joined-tournaments`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetching error");
      }

      const { data } = await response.json();
      dispatch(setJoinedTournaments(data));
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

export const getLatestTournamentDetails =
  ({ userId, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${USER_API}/${userId}/latest-tournament`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetching error");
      }

      const data = await response.json();
      const { isEmpty, latestTournament } = data;

      if (!isEmpty) dispatch(setLatestTournament(latestTournament));

      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

export const getFeaturedTournaments =
  ({ setIsLoading }) =>
  async (dispatch, getState) => {
    const { token } = getState().user;
    const { featuredTournaments } = getState().tournaments;

    if (!featuredTournaments.length) {
      try {
        const response = await fetch(`${TOURNAMENTS_API}/featured`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Fetching error");
        }

        const { data } = await response.json();
        dispatch(setFeaturedTournaments(data));
        setIsLoading(false);
      } catch (error) {
        console.log("error:", error);
      }
    }
  };

export const tournamentReducer = tournamentSlice.reducer;
