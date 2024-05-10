import { Box, Stack, Typography, useTheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ChaseStatsCard from "../../components/matchManagement/ChaseStatsCard";
import Footer from "../../components/common/Footer";
import ManOfTheMatchCard from "../../components/cards/ManOfTheMatchCard";
import ManageEventAlert from "../../components/notifications/alerts/ManageEventAlert";
import MatchCard from "../../components/cards/MatchCard/MatchCard";
import Navbar from "../../components/common/Navbar/Navbar";
import OnFieldStats from "../../components/match/OnFieldStats";
import PageContainer from "../../components/layouts/pages/PageContainer";
import Scorecard from "../../components/match/Scorecard/Scorecard";
import SocketProvider from "../../components/SocketProvider";
import TeamCard from "../../components/cards/TeamCard";
import TossDetails from "../../components/match/TossDetails";
import TossNotConducted from "../../components/fallbacks/TossNotConducted";
import TournamentHeader from "../../components/tournament/TournamentHeader";
import { matchApi } from "../../services/api";
import { setMatch } from "../../state/match/matchSlice";
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      const matchDetails = await matchApi.getMatchInfo({
        matchId,
        token,
        setIsLoading,
      })();
      dispatch(setMatch(matchDetails));
    };
    fetchMatchDetails();
  }, [setIsLoading, matchId, token]);

  const createdTournaments = useSelector(
    (state) => state.tournaments.createdTournaments
  );
  const isAdmin = createdTournaments.includes(tournamentId);

  const match = useSelector((state) => state.match);
  const { toss, innings, current_innings_no, status, batsmen, bowler } = match;

  const isTossConducted = toss && toss.conducted;
  const tossWinner = toss.winner_name;
  const tossDecision = toss.decision;

  const matchStatus = status;
  const isMatchCompleted = matchStatus === "completed";

  const ball_log = innings[current_innings_no - 1]?.data?.ball_log || [];
  const batsmenData = batsmen;
  const bowlerData = bowler;

  return (
    <>
      <Navbar />
      <TournamentHeader id={tournamentId} isSetupComplete={true} />
      <PageContainer customStyles={{ gap: 2, mb: 8 }}>
        <SocketProvider matchId={matchId} socket={socket} isAdmin={false}>
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
                  {current_innings_no === 2 && (
                    <ChaseStatsCard isAdmin={false} />
                  )}
                  <OnFieldStats
                    isLoading={isLoading}
                    batsmenData={batsmenData}
                    bowlerData={bowlerData}
                    ballLog={ball_log}
                    isSmall={false}
                  />
                </Stack>
              )}
              <Scorecard
                isAdmin={false}
                isLoading={isLoading}
                innings={innings}
                current_innings_no={current_innings_no}
              />
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
        </SocketProvider>
      </PageContainer>
      <Footer />
    </>
  );
};

export default Match;
