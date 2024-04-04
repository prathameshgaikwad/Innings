import { Box, Grid, useTheme } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";

import AddPlayersForm from "../../components/createTournament/AddPlayersForm";
import AddTeamsForm from "../../components/createTournament/AddTeamsForm";
import CreateFixturesForm from "../../components/createTournament/CreateFixturesForm";
import FinishSetup from "../../components/createTournament/FinishSetup";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar/index";
import TeamsList from "../../components/lists/TeamsList";
import TournamentHeader from "../../components/tournament/TournamentHeader";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const TournamentSetupPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { tournamentId } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const createdTournaments = useSelector(
    (state) => state.tournaments.createdTournaments
  );

  if (!createdTournaments.includes(tournamentId)) {
    navigate(`/tournaments/${tournamentId}`);
  }

  return (
    <>
      <Navbar />
      <TournamentHeader
        isAdmin={true}
        id={tournamentId}
        isSetupComplete={false}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "calc(100vh - 73px)",
          pt: isMobile ? 4 : 4,
          maxWidth: isMobile ? "95vw" : "82vw",
          mx: "auto",
        }}>
        <Grid
          container
          columns={25}
          gap={2}
          justifyContent="center"
          mt={4}
          width="100%">
          <Grid xs={8}>
            <AddTeamsForm />
          </Grid>
          <Grid xs={15}>
            <AddPlayersForm />
          </Grid>
        </Grid>
        <TeamsList isSetupPage={true} />
        <CreateFixturesForm />
        <FinishSetup />
      </Box>
      <Footer />
    </>
  );
};
export default TournamentSetupPage;
