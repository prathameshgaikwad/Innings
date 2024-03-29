import { createSlice } from "@reduxjs/toolkit";

const REGISTER_ENDPOINT = import.meta.env.VITE_SERVER_REGISTER_URL;
const LOGIN_ENDPOINT = import.meta.env.VITE_SERVER_LOGIN_URL;
const TOURNAMENTS_API = import.meta.env.VITE_SERVER_TOURNAMENTS_API;

const initialState = {
  user: null,
  token: null,
  liveMatch: { isEmpty: true, data: null },
  upcomingMatches: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { token, user } = action.payload;
      if (token) {
        state.user = user;
        state.token = token;
      } else {
        state.user = null;
        state.token = null;
      }
    },
    setLiveMatch: (state, action) => {
      state.liveMatch.isEmpty = false;
      state.liveMatch.data = action.payload;
    },
    setNoLiveMatch: (state) => {
      state.liveMatch.isEmpty = true;
    },
    setUpcomingMatches: (state, action) => {
      state.upcomingMatches = action.payload;
    },
    setLogout: () => {
      return initialState;
    },
  },
});

export const signUpGoogle = async (access_token, navigate) => {
  try {
    const response = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });
    if (response.ok) {
      navigate("/");
    } else {
      const errorData = await response.json();
      console.error("Signup failed:", errorData.message);
    }
  } catch (error) {
    console.log("Error during signup: ", error);
  }
};

export const signInGoogle = async (access_token, navigate, dispatch) => {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });

    if (response.ok) {
      const responseData = await response.json();
      dispatch(
        setLogin({
          user: responseData.user,
          token: responseData.token,
        })
      );
      navigate("/");
    } else {
      const errorData = await response.json();
      console.error("SignIn failed:", errorData.message);
    }
  } catch (error) {
    console.log("Error during signIn: ", error);
  }
};

export const registerUser = async (
  values,
  resetForm,
  setIsFailedResponseVisible,
  setIsSuccessVisible,
  navigate
) => {
  try {
    const response = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      setIsSuccessVisible(true);
      const responseData = await response.json();

      if (responseData) {
        setTimeout(() => {
          resetForm();
          navigate("/accounts/sign-in");
        }, 2000);
      }
    } else {
      if (response.status === 400) {
        setIsFailedResponseVisible(true);
        setTimeout(() => {
          setIsFailedResponseVisible(false);
          resetForm();
        }, 2400);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const signInUser = async (values, resetForm, dispatch, navigate) => {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const responseData = await response.json();
      resetForm();

      if (responseData) {
        dispatch(
          setLogin({
            user: responseData.user,
            token: responseData.token,
          })
        );
        navigate("/");
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getUpcomingMatches =
  ({ tournamentId, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `${TOURNAMENTS_API}/${tournamentId}/upcoming-matches`,
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
      const { isEmpty, upcomingMatches } = data;

      if (!isEmpty) dispatch(setUpcomingMatches(upcomingMatches));
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

export const {
  setLogout,
  setLogin,
  setLiveMatch,
  setUpcomingMatches,
  setNoLiveMatch,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
