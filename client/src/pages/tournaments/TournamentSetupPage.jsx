import { Grid, useTheme } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";

import AddPlayers from "../../components/cards/AddPlayersCard/AddPlayers";
import AddTeamsForm from "../../components/createTournament/AddTeamsForm";
import CreateFixturesForm from "../../components/createTournament/CreateFixturesForm";
import FinishSetup from "../../components/createTournament/FinishSetup";
import PageContainer from "../../components/layouts/pages/PageContainer";
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
      <TournamentHeader
        isAdmin={true}
        id={tournamentId}
        isSetupComplete={false}
      />
      <PageContainer customStyles={{ maxWidth: isMobile ? "95vw" : "82vw" }}>
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
            <AddPlayers />
          </Grid>
        </Grid>
        <TeamsList isSetupPage={true} />
        <CreateFixturesForm />
        <FinishSetup />
      </PageContainer>
    </>
  );
};
export default TournamentSetupPage;
