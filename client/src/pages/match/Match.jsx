import { Box, Stack, Typography, useTheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import BallLogList from "../../components/lists/BallLogList";
import BatsmenStats from "../../components/match/BatsmenStats";
import ChaseStatsCard from "../../components/matchManagement/ChaseStatsCard";
import Footer from "../../components/common/Footer";
import ManOfTheMatchCard from "../../components/cards/ManOfTheMatchCard";
import ManageEventAlert from "../../components/ManageEventAlert";
import MatchCard from "../../components/cards/MatchCard/MatchCard";
import Navbar from "../../components/common/Navbar/Navbar";
import PageContainer from "../../components/layouts/pages/PageContainer";
import Scorecard from "../../components/match/Scorecard/Scorecard";
import TeamCard from "../../components/cards/TeamCard";
import TossDetails from "../../components/match/TossDetails";
import TossNotConducted from "../../components/fallbacks/TossNotConducted";
import TournamentHeader from "../../components/tournament/TournamentHeader";
import { matchApi } from "../../services/api";
import { setToss } from "../../state/match/matchSlice";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import useSocket from "../../hooks/useSocket";

const Match = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const token = useSelector((state) => state.user.token);
  const { tournamentId, matchId } = useParams();

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.emit("subscribeToMatch", matchId);
      });
      socket.on("tossResult", (toss) => {
        dispatch(setToss(toss));
      });
      socket.on("disconnect", () => {});
    }
  }, [socket, matchId]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(matchApi.getMatchInfo({ matchId, token, setIsLoading }));
  }, [dispatch, matchId, token]);

  const createdTournaments = useSelector(
    (state) => state.tournaments.createdTournaments
  );
  const isAdmin = createdTournaments.includes(tournamentId);

  const match = useSelector((state) => state.match);
  const toss = match.toss;
  const innings = match.innings;

  const isTossConducted = toss && toss.decision && toss.decision.length > 0;
  const tossWinner = toss.winner_name;
  const tossDecision = toss.decision;

  const matchStatus = match && match.status;
  const isMatchCompleted = matchStatus === "completed";

  const ball_log = [];
  const batsmenData = match.batsmen;

  return (
    <>
      <Navbar />
      <TournamentHeader id={tournamentId} isSetupComplete={true} />
      <PageContainer customStyles={{ gap: 2, mb: 8 }}>
        {isAdmin && <ManageEventAlert eventType={"match"} />}
        {isTossConducted ? (
          <>
            <TossDetails
              tossWinner={tossWinner}
              decision={tossDecision}
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
              <Stack
                width={isMobile ? "96%" : "72%"}
                direction={"column"}
                gap={2}>
                {innings === "2" && <ChaseStatsCard isAdmin={false} />}
                <BatsmenStats
                  data={batsmenData}
                  isSmall={false}
                  isLoading={isLoading}
                />
                <BallLogList data={ball_log} isLoading={isLoading} />
              </Stack>
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
                <TeamCard team={match.battingTeam} isLoading={isLoading} />
                <Typography level="body-lg">vs</Typography>
                <TeamCard team={match.bowlingTeam} isLoading={isLoading} />
              </Box>
            )}
          </>
        )}
      </PageContainer>
      <Footer />
    </>
  );
};

export default Match;
