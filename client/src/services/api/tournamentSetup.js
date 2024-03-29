import {
  clearTournamentSetup,
  saveTeam,
  setTeams,
} from "../../state/tournament/tournamentSetupSlice";

const TEAMS_API = import.meta.env.VITE_SERVER_TEAMS_API;
const TOURNAMENTS_API = import.meta.env.VITE_SERVER_TOURNAMENTS_API;
const FIXTURES_API = import.meta.env.VITE_SERVER_FIXTURES_API;

export const createTournament =
  ({ values, token, setOpen, resetForm, addCreatedTournament, navigate }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${TOURNAMENTS_API}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Fetching error");
      }

      const responseData = await response.json();

      dispatch(addCreatedTournament(responseData._id));
      resetForm();
      setOpen(false);
      navigate(`/tournaments/${responseData._id}/setup`);
    } catch (error) {
      console.log("Error:", error);
    }
  };

export const saveTeamToDb =
  ({ data, token, setOpenToast, teamData }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${TEAMS_API}/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log("Something went wrong!");
        return;
      }
      setOpenToast(true);
      setTimeout(() => {
        setOpenToast(false);
        dispatch(saveTeam(teamData));
      }, 1200);
    } catch (error) {
      console.log(error);
    }
  };

export const getCreatedTeams =
  ({ tournamentId, token, setIsLoading }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${TOURNAMENTS_API}/${tournamentId}/teams`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fetching error");
      }
      const { teams } = await response.json();
      dispatch(setTeams(teams));
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

export const saveFixturesBatchToDb =
  ({ tournamentId, token, fixtures, setOpen, navigate }) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${FIXTURES_API}/create-batch`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fixtures, tournamentId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create fixtures");
      }

      await response.json();
      setOpen(false);
      navigate(`/tournaments/${tournamentId}`);
      dispatch(clearTournamentSetup());
    } catch (error) {
      console.log("Error in finish setup: ", error);
    }
  };
