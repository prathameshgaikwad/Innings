import {
  setMatch,
  setMatchOngoing,
  setStatus,
  setTossResult,
} from "../../state/match/matchManagementSlice";

const MATCHES_API = import.meta.env.VITE_SERVER_MATCHES_API;

export const getMatchManagementInfo =
  ({ matchId, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${MATCHES_API}/${matchId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetching error");
      }

      const data = await response.json();
      dispatch(setMatch(data));
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

export const getTossResult =
  ({ matchId, token }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${MATCHES_API}/${matchId}/toss`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetching error");
      }

      const data = await response.json();
      const { status, toss } = data;
      dispatch(setTossResult(toss));
      dispatch(setStatus(status));
    } catch (error) {
      console.log("error:", error);
    }
  };

export const saveTossResultToDb =
  ({ matchId, toss, token }) =>
  async () => {
    try {
      const response = await fetch(`${MATCHES_API}/toss`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matchId, toss }),
      });
      if (!response.ok) {
        throw new Error("Could not save toss result!");
      }
      setMatchOngoing();
    } catch (error) {
      console.log("error:", error);
    }
  };
