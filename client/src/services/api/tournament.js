import {
  setCreatedTournaments,
  setFeaturedTournaments,
  setJoinedTournaments,
  setLatestTournament,
} from "../../state/tournament/tournamentSlice";

const USER_API = import.meta.env.VITE_SERVER_USER_API;
const TOURNAMENTS_API = import.meta.env.VITE_SERVER_TOURNAMENTS_API;

export const getCreatedTournaments =
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

export const getJoinedTournaments =
  ({ userId, token }) =>
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
    } catch (error) {
      console.log("error:", error);
    }
  };

export const getLatestTournamentDetails =
  ({ userId, token }) =>
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
