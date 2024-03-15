import {
  Box,
  CssBaseline,
  CssVarsProvider,
  Typography,
  useTheme,
} from "@mui/joy";
import {
  getMatchInfo,
  setRunLogItem,
  setToss,
} from "../../state/match/matchSlice";
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
import TeamCard from "../../components/cards/TeamCard";
import TossDetails from "../../components/match/TossDetails";
import TossNotConducted from "../../components/match/TossNotConducted";
import TournamentHeader from "../../components/tournament/TournamentHeader";
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
        socket.on("getRunLog", (runLogItem) => {
          dispatch(setRunLogItem(runLogItem));
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
  const isAdmin = createdTournaments.includes(tournamentId);

  useEffect(() => {
    if (socket) {
      socket.on("tossResult", (toss) => {
        dispatch(setToss(toss));
      });
    }
  }, [socket, matchId]);

  const match = useSelector((state) => state.match);
  const toss = match.toss;
  const innings = match.innings;

  const tossConducted = toss && toss.decision && toss.decision.length > 0;
  const tossWinner = toss.winner;
  const tossDecision = toss.decision;

  const matchStatus = match && match.status;
  const isMatchCompleted = matchStatus === "completed";

  const ball_log = match.ball_log;
  const batsmenData = match.batsmen;

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
        {tossConducted ? (
          <>
            <TossDetails
              tossWinner={tossWinner}
              choice={tossDecision}
              isLoading={isLoading}
            />
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
                isMatchPage={true}
              />
            </Box>
            {isMatchCompleted ? (
              <ManOfTheMatchCard />
            ) : (
              <Box width={isMobile ? "96%" : "72%"}>
                {innings === "2" && <ChaseStatsCard isAdmin={false} />}
                <BatsmenStats
                  data={batsmenData}
                  isSmall={false}
                  isLoading={isLoading}
                />
                <BallLogList data={ball_log} isLoading={isLoading} />
              </Box>
            )}
            <Scorecard isAdmin={false} isLoading={isLoading} />
          </>
        ) : (
          <>
            <TossNotConducted />
            {!isLoading && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 6,
                  width: "80%",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <TeamCard team={match.team1} isLoading={isLoading} />
                <Typography level="body-lg">vs</Typography>
                <TeamCard team={match.team2} isLoading={isLoading} />
              </Box>
            )}
          </>
        )}
      </Box>
      <Footer />
    </CssVarsProvider>
  );
};

export default Match;
