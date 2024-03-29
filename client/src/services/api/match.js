import { setMatch } from "../../state/match/matchSlice";

const MATCHES_API = import.meta.env.VITE_SERVER_MATCHES_API;

export const getMatchInfo =
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
