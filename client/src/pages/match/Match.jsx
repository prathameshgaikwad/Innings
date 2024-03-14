import { Box, CssBaseline, CssVarsProvider, useTheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BallLogList from "../../components/lists/BallLogList";
import BatsmenStats from "../../components/match/BatsmenStats";
import ChaseStatsCard from "../../components/matchManagement/ChaseStatsCard";
import Footer from "../../components/common/Footer";
import ManOfTheMatchCard from "../../components/cards/ManOfTheMatchCard";
import ManageEventAlert from "../../components/ManageEventAlert";
import MatchCard from "../../components/cards/MatchCard";
import Navbar from "../../components/common/Navbar";
import Scorecard from "../../components/match/Scorecard";
import TossDetails from "../../components/match/TossDetails";
import TournamentHeader from "../../components/tournament/TournamentHeader";
import { getMatchInfo } from "../../state/match/matchSlice";
import { io } from "socket.io-client";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Match = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const token = useSelector((state) => state.user.token);
  const { tournamentId, matchId } = useParams();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
        socket.emit("subscribeToMatch", matchId);
        socket.on("getRuns", (runs) => {
          console.log(runs);
        });
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
      });
    }
  }, [socket, matchId]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getMatchInfo({ matchId, token, setIsLoading }));
  }, [dispatch, matchId, token]);

  const createdTournaments = useSelector(
    (state) => state.tournaments.createdTournaments
  );

  const match = useSelector((state) => state.match);
  const toss = match.toss;
  const innings = match.innings;

  const tossConducted = toss && toss.decision && toss.decision.length > 0;

  const tossWinner = toss.winner;
  const choice = toss.decision;

  const isAdmin = createdTournaments.includes(tournamentId);
  const matchStatus = match && match.status;
  const isMatchCompleted = matchStatus === "completed";

  const ball_log = [1, 2, 3, 4, 1, 2, "-", 1, 2, 1, 3, 4];
  const batsmenData = {
    onStrikeBatsman: {
      name: "Virat Kohli",
      runs: "56",
      ballsPlayed: "40",
    },
    offStrikeBatsman: {
      name: "Shubhman Gill",
      runs: "23",
      ballsPlayed: "36",
    },
  };

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
        {tossConducted && (
          <TossDetails tossWinner={tossWinner} choice={choice} />
        )}
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
        <Box width={isMobile ? "96%" : "72%"}>
          {innings === "2" && <ChaseStatsCard isAdmin={false} />}
          <BatsmenStats data={batsmenData} isSmall={false} />
          <BallLogList data={ball_log} />
        </Box>
        {isMatchCompleted && <ManOfTheMatchCard />}
        <Scorecard />
      </Box>
      <Footer />
    </CssVarsProvider>
  );
};

export default Match;
