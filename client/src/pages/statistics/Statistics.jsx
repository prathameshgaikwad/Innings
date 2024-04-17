import Box from "@mui/joy/Box";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import NoTournamentsJoined from "../../components/fallbacks/NoTournamentsJoined";
import PageContainer from "../../components/layouts/pages/PageContainer";
import PlayerStatisticsList from "../../components/lists/PlayerStatisticsList";
import TournamentStatisticsList from "../../components/lists/TournamentStatisticsList";
import UserStatistics from "../../components/UserStatistics";
import { useSelector } from "react-redux";

const Statistics = () => {
  const latestTournament = useSelector(
    (state) => state.tournaments.latestTournament
  );

  let tournamentId = "";
  let tournamentName = "";

  if (latestTournament) {
    tournamentId = latestTournament._id;
    tournamentName = latestTournament.name;
  }

  return (
    <>
      <Navbar />
      <PageContainer customStyles={{ gap: 2, mb: 8 }}>
        {tournamentId.length > 0 ? (
          <>
            <TournamentStatisticsList tournamentName={tournamentName} />
            <PlayerStatisticsList />
            <UserStatistics />
          </>
        ) : (
          <Box sx={{ mt: 8 }}>
            <NoTournamentsJoined />
          </Box>
        )}
      </PageContainer>
      <Footer />
    </>
  );
};

export default Statistics;
