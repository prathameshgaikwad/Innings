import { Box, Card, useTheme } from "@mui/joy";
import {
  addRuns,
  setBallLog,
  setMatch,
} from "../../state/match/matchManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ActionsPane from "../../components/matchManagement/ActionsPane";
import ChaseStatsCard from "../../components/matchManagement/ChaseStatsCard";
import ConductToss from "../../components/matchManagement/ConductToss";
import Footer from "../../components/common/Footer";
import Header from "../../components/matchManagement/Header";
import Navbar from "../../components/common/Navbar/Navbar";
import OnFieldStats from "../../components/match/OnFieldStats";
import PageContainer from "../../components/layouts/pages/PageContainer";
import PlayerStatsOverview from "../../components/match/PlayerStatsOverview";
import ScoreInfo from "../../components/matchManagement/ScoreInfo";
import Scorecard from "../../components/match/Scorecard/Scorecard";
import ScoringButtonsPanel from "../../components/matchManagement/ScoringButtonsPanel";
import { matchApi } from "../../services/api";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import useSocket from "../../hooks/useSocket";

const MatchManagement = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const token = useSelector((state) => state.user.token);
  const { matchId } = useParams();

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

  const {
    status,
    ball_log: ballLog,
    innings,
    batsmen: batsmenData,
    bowler: bowlerData,
    battingTeam,
    bowlingTeam,
    match_no,
  } = useSelector((state) => state.matchManagement);

  const isHeaderDataAvailable = battingTeam && bowlingTeam && match_no;

  const [tossCompleted, setTossCompleted] = useState(status);

  useEffect(() => {
    setTossCompleted(status === "ongoing");
  }, [status]);

  const secondInnings = innings && innings === "2";

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
        socket.emit("subscribeToMatch", matchId);

        socket.on("getBallLog", (ball_log) => {
          dispatch(setBallLog(ball_log));
          dispatch(addRuns({ score: ball_log.runs_conceded }));
        });
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
      });
    }
  }, [socket, matchId]);

  return (
    <>
      <Navbar />
      <PageContainer customStyles={{ gap: 2, mt: 4 }}>
        {isHeaderDataAvailable && (
          <Header
            isLoading={isLoading}
            team1={battingTeam}
            team2={bowlingTeam}
            match_no={match_no}
          />
        )}
        {!tossCompleted ? (
          battingTeam &&
          bowlingTeam && (
            <ConductToss
              matchId={matchId}
              team1={battingTeam}
              team2={bowlingTeam}
            />
          )
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                gap: isMobile ? 4 : 1.5,
                width: "100%",
              }}>
              <Card
                sx={{
                  justifyContent: "space-between",
                  minHeight: "85vh",
                }}>
                <ScoreInfo isLoading={isLoading} />
                {secondInnings && <ChaseStatsCard isAdmin={true} />}
                <ScoringButtonsPanel socket={socket} disabled={isLoading} />
              </Card>
              <Card
                sx={{
                  width: "100%",
                  maxHeight: "85vh",
                  minHeight: "85vh",
                  overflow: "auto",
                  justifyContent: "space-between",
                }}>
                <ActionsPane isLoading={isLoading} />
                <OnFieldStats
                  isLoading={isLoading}
                  batsmenData={batsmenData}
                  bowlerData={bowlerData}
                  ballLog={ballLog}
                  isAdmin={true}
                />
                <PlayerStatsOverview isLoading={isLoading} />
              </Card>
            </Box>
            <Box mb={8}>
              <Scorecard isAdmin={true} isLoading={isLoading} />
            </Box>
          </>
        )}
      </PageContainer>
      <Footer />
    </>
  );
};

export default MatchManagement;
