const FIXTURES_API = import.meta.env.VITE_SERVER_FIXTURES_API;

export const getFixtureInfo =
  ({ id, token, setterMethods }) =>
  async () => {
    const {
      setMatchNo,
      setDate,
      setTime,
      setOvers,
      setTeam1,
      setTeam2,
      setIsLoading,
    } = setterMethods;
    try {
      const fetchData = async () => {
        const response = await fetch(`${FIXTURES_API}/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Fetching error");
        }

        const { fixture } = await response.json();
        const { match_no, total_overs, date, time, team1, team2 } = fixture;

        setMatchNo(match_no);
        setDate(date);
        setTime(time);
        setOvers(total_overs);
        setTeam1(team1);
        setTeam2(team2);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log("error:", error);
    }
  };
