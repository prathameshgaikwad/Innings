const MATCHES_API = import.meta.env.VITE_SERVER_MATCHES_API;

export const getMatchInfo =
  ({ matchId, token, setIsLoading }) =>
  async () => {
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

      const matchData = await response.json();
      return matchData;
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsLoading(false);
    }
  };
