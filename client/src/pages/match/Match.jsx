import { Box, CssBaseline, CssVarsProvider, useTheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BallLogList from "../../components/lists/BallLogList";
import Footer from "../../components/common/Footer";
import ManOfTheMatchCard from "../../components/cards/ManOfTheMatchCard";
import ManageEventAlert from "../../components/ManageEventAlert";
import MatchCard from "../../components/cards/MatchCard";
import Navbar from "../../components/common/Navbar";
import Scorecard from "../../components/match/Scorecard";
import TossDetails from "../../components/match/TossDetails";
import TournamentHeader from "../../components/tournament/TournamentHeader";
import { getMatchInfo } from "../../state/match/matchSlice";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";

const Match = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const token = useSelector((state) => state.user.token);
  const { matchId } = useParams();
  const { tournamentId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getMatchInfo({ matchId, token, setIsLoading }));
  }, [dispatch, matchId, token]);

  const createdTournaments = useSelector(
    (state) => state.tournaments.createdTournaments
  );

  const match = useSelector((state) => state.match);
  const toss = match.toss;

  const tossConducted = toss && toss.decision && toss.decision.length > 0;

  const tossWinner = toss.winner;
  const choice = toss.decision;

  const isAdmin = createdTournaments.includes(tournamentId);
  const matchStatus = match && match.status;
  const isMatchCompleted = matchStatus === "completed";

  const ball_log = [];

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <Navbar />
      <TournamentHeader id={tournamentId} isSetupComplete={true} />
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
        {isAdmin && <ManageEventAlert eventType={"match"} />}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 6,
            mb: 3,
          }}>
          <MatchCard
            isLoading={isLoading}
            tournamentId={tournamentId}
            data={match}
          />
        </Box>
        <BallLogList data={ball_log} isSmall={false} />
        {tossConducted && (
          <TossDetails tossWinner={tossWinner} choice={choice} />
        )}
        {isMatchCompleted && <ManOfTheMatchCard />}
        <Scorecard />
      </Box>
      <Footer />
    </CssVarsProvider>
  );
};

export default Match;
