import { setTeam } from "../../state/team/teamSlice";

const TEAMS_API = import.meta.env.VITE_SERVER_TEAMS_API;

export const getTeamInfo =
  ({ teamId, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${TEAMS_API}/${teamId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetching error");
      }

      const data = await response.json();
      dispatch(setTeam(data));
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };
