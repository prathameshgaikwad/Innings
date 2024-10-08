import { LoginPayload, Match, UserState } from "../../types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  user: null,
  token: null,
  liveMatch: { isEmpty: true, data: null },
  upcomingMatches: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<LoginPayload>) => {
      const { token, user } = action.payload;
      state.user = token ? user : null;
      state.token = token || null;
    },
    setLiveMatch: (state, action) => {
      state.liveMatch = {
        isEmpty: false,
        data: {
          ...action.payload,
          current_innings_no: action.payload.innings.length,
        },
      };
    },
    setNoLiveMatch: (state) => {
      state.liveMatch = { isEmpty: true, data: null };
    },
    setUpcomingMatches: (state, action: PayloadAction<Match[]>) => {
      state.upcomingMatches = action.payload;
    },
    setLogout: () => {
      return initialState;
    },
  },
});

export const {
  setLogout,
  setLogin,
  setLiveMatch,
  setUpcomingMatches,
  setNoLiveMatch,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
