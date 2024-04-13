import {
  setLiveMatch,
  setLogin,
  setNoLiveMatch,
  setUpcomingMatches,
} from "../../state/user/userSlice";

const TOURNAMENTS_API = import.meta.env.VITE_SERVER_TOURNAMENTS_API;
const REGISTER_ENDPOINT = import.meta.env.VITE_SERVER_REGISTER_URL;
const LOGIN_ENDPOINT = import.meta.env.VITE_SERVER_LOGIN_URL;

export const getLiveMatchInfo =
  ({ tournamentId, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${TOURNAMENTS_API}/${tournamentId}/live`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetching error");
      }
      if (response.status === 400) {
        dispatch(setNoLiveMatch());
      }

      const data = await response.json();
      const { isEmpty, liveMatch } = data;

      if (!isEmpty) dispatch(setLiveMatch(liveMatch));
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
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

export const signInUser =
  ({ values, resetForm, navigate }) =>
  async (dispatch) => {
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
