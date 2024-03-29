import { setLiveMatch, setNoLiveMatch } from "../../state/user/userSlice";

const TOURNAMENTS_API = import.meta.env.VITE_SERVER_TOURNAMENTS_API;

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
