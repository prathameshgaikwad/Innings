import {
  Alert,
  Box,
  CssBaseline,
  CssVarsProvider,
  Typography,
  useTheme,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Footer from "../../components/common/Footer";
import ManageEventAlert from "../../components/ManageEventAlert";
import Navbar from "../../components/common/Navbar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NextMatchSkeleton from "../../components/skeletons/NextMatchSkeleton";
import PointsTable from "../../components/tables/PointsTable";
import ScheduleOfMatches from "../../components/tables/ScheduleOfMatches";
import SimpleMatchCard from "../../components/cards/SimpleMatchCard";
import TeamsList from "../../components/lists/TeamsList";
import TournamentHeader from "../../components/tournament/TournamentHeader";
import { fetchTournamentFixtures } from "../../state/tournament/tournamentPageSlice";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";

const TournamentPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { tournamentId } = useParams();
  const token = useSelector((state) => state.user.token);

  const [isLoading, setIsLoading] = useState(true);

  const createdTournaments = useSelector(
    (state) => state.tournaments.createdTournaments
  );
  const isAdmin = createdTournaments.includes(tournamentId);
  const fixturesData = useSelector((state) => state.tournamentPage.fixtures);

  const matchData = fixturesData[0];
  const nextMatch =
    fixturesData.length > 1
      ? {
          team1: fixturesData[1].team1Details.nameShort,
          team2: fixturesData[1].team2Details.nameShort,
        }
      : {};

  useEffect(() => {
    dispatch(fetchTournamentFixtures({ tournamentId, token, setIsLoading }));
  }, [dispatch, tournamentId, token]);

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <Navbar />
      <TournamentHeader id={tournamentId} isSetupComplete={true} />
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
        {fixturesData.length !== 0 && (
          <SimpleMatchCard
            callToAction={"Go to Match"}
            matchData={matchData}
            isLoading={isLoading}
          />
        )}
        {fixturesData.length > 1 && (
          <>
            {isLoading ? (
              <NextMatchSkeleton />
            ) : (
              <Alert variant="soft" sx={{ mt: 4 }}>
                <Typography
                  level="body-sm"
                  color="warning"
                  endDecorator={<NavigateNextIcon />}>
                  Next Match
                </Typography>
                <Typography level="body-md">
                  {nextMatch.team1} vs {nextMatch.team2}
                </Typography>
              </Alert>
            )}
          </>
        )}
        <PointsTable />
        <ScheduleOfMatches isLoading={isLoading} />
        <TeamsList isSetupPage={false} />
        {isAdmin && <ManageEventAlert eventType={"tournament"} />}
      </Box>
      <Footer />
    </CssVarsProvider>
  );
};
export default TournamentPage;
