import CompletedMatches from "../../components/lists/CompletedMatches";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import NoCompletedMatches from "../../components/fallbacks/NoCompletedMatches";
import NoPendingMatches from "../../components/fallbacks/NoPendingMatches";
import PageContainer from "../../components/layouts/pages/PageContainer";
import PendingMatches from "../../components/lists/PendingMatches";
import PointsTable from "../../components/tables/PointsTable/PointsTable";
import { Stack } from "@mui/joy";
import TeamsList from "../../components/lists/TeamsList";
import TournamentHeader from "../../components/tournament/TournamentHeader";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/joy/styles";

const TournamentManagement = () => {
  const isAdmin = true;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { tournamentId } = useParams();
  const fixturesData = useSelector((state) => state.tournamentPage.fixtures);

  const pendingMatchesList = fixturesData.filter(
    (fixture) => fixture.status !== "completed"
  );
  const completedMatchesList = fixturesData.filter(
    (fixture) => fixture.status === "completed"
  );

  return (
    <>
      <Navbar />
      <TournamentHeader
        isAdmin={isAdmin}
        id={tournamentId}
        isSetupComplete={true}
      />
      <PageContainer customStyles={{ maxWidth: "92vw", gap: 4 }}>
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent="center"
          width="100%"
          spacing={4}>
          {pendingMatchesList.length === 0 ? (
            <NoPendingMatches />
          ) : (
            <PendingMatches pendingMatchesList={pendingMatchesList} />
          )}
          {completedMatchesList.length === 0 ? (
            <NoCompletedMatches />
          ) : (
            <CompletedMatches completedMatchesList={completedMatchesList} />
          )}
        </Stack>
        <PointsTable />
        <TeamsList />
      </PageContainer>
      <Footer />
    </>
  );
};

export default TournamentManagement;
