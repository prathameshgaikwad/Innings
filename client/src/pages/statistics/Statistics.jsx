import { CssVarsProvider, useTheme } from "@mui/joy/styles";

import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import NoTournamentsJoined from "../../components/cards/NoTournamentsJoined";
import PlayerStatisticsList from "../../components/lists/PlayerStatisticsList";
import TournamentStatisticsList from "../../components/lists/TournamentStatisticsList";
import UserStatistics from "../../components/UserStatistics";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const Statistics = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <Navbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "calc(100vh - 73px)",
          maxWidth: isMobile ? "85vw" : "70vw",
          mx: "auto",
          gap: 2,
          mb: 8,
        }}>
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
      </Box>
      <Footer />
    </CssVarsProvider>
  );
};

export default Statistics;
