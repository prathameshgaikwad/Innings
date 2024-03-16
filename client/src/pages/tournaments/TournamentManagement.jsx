/* eslint-disable react/prop-types */

import { Card, Stack, Typography } from "@mui/joy";

import Box from "@mui/joy/Box";
import { FiCheckCircle } from "react-icons/fi";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import NoCompletedMatches from "../../components/cards/NoCompletedMatches";
import NoPendingMatches from "../../components/cards/NoPendingMatches";
import PendingMatches from "../../components/lists/PendingMatches";
import PointsTable from "../../components/tables/PointsTable";
import SimpleMatchCard from "../../components/cards/SimpleMatchCard";
import TeamsList from "../../components/lists/TeamsList";
import TournamentHeader from "../../components/tournament/TournamentHeader";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/joy/styles";

const CompletedMatches = ({ completedMatchesList }) => {
  const theme = useTheme();
  return (
    <Card
      variant="outlined"
      sx={{
        borderWidth: 2,
        borderStyle: "dashed",
      }}>
      <Typography
        level="h3"
        sx={{ mx: "auto", mt: 2 }}
        endDecorator={<FiCheckCircle color={theme.palette.success[400]} />}>
        Matches Completed
      </Typography>
      <Stack
        sx={{
          p: 1,
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxHeight: 500,
          overflowY: "auto",
        }}>
        {completedMatchesList.map((fixture) => {
          return (
            <SimpleMatchCard
              key={fixture.matchNumber}
              matchData={fixture}
              isTournamentManagementPage={true}
            />
          );
        })}
      </Stack>
    </Card>
  );
};

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "calc(100vh - 73px)",
          pt: isMobile ? 4 : 6,
          maxWidth: "92vw",
          mx: "auto",
          gap: 4,
        }}>
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
      </Box>
      <Footer />
    </>
  );
};

export default TournamentManagement;
