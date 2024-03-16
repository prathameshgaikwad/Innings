import { Box, Card, useTheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ActionsPane from "../../components/matchManagement/ActionsPane";
import BallLogList from "../../components/lists/BallLogList";
import BattingStats from "../../components/matchManagement/BattingStats";
import BowlingStats from "../../components/matchManagement/BowlingStats";
import ChaseStatsCard from "../../components/matchManagement/ChaseStatsCard";
import ConductToss from "../../components/matchManagement/ConductToss";
import Footer from "../../components/common/Footer";
import Header from "../../components/matchManagement/Header";
import Navbar from "../../components/common/Navbar";
import ScoreInfo from "../../components/matchManagement/ScoreInfo";
import Scorecard from "../../components/match/Scorecard";
import ScoringButtonsPanel from "../../components/matchManagement/ScoringButtonsPanel";
import { getMatchManagementInfo } from "../../state/match/matchManagement";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";

const MatchManagement = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const token = useSelector((state) => state.user.token);
  const { matchId } = useParams();
  const status = useSelector((state) => state.matchManagement.status);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getMatchManagementInfo({ matchId, token, setIsLoading }));
  }, [dispatch, matchId, token]);

  const ball_log = useSelector((state) => state.matchManagement.ball_log);
  const innings = useSelector((state) => state.matchManagement.innings);

  const [tossCompleted, setTossCompleted] = useState(status === "pending");

  useEffect(() => {
    setTossCompleted(status === "ongoing");
  }, [status]);

  const secondInnings = innings && innings === "2";

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: isMobile ? "85vw" : "78vw",
          mx: "auto",
          gap: 2,
          mt: 4,
        }}>
        <Header />
        {!tossCompleted ? (
          <ConductToss matchId={matchId} />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                gap: isMobile ? 4 : 1.5,
                mt: 4,
                width: "100%",
              }}>
              <Card
                sx={{
                  justifyContent: "space-between",
                  minHeight: "85vh",
                }}>
                <ScoreInfo isLoading={isLoading} />
                {secondInnings && <ChaseStatsCard />}
                <ScoringButtonsPanel disabled={isLoading} />
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
                <BallLogList
                  isSmall={true}
                  data={ball_log}
                  isLoading={isLoading}
                />
                <BattingStats isLoading={isLoading} />
                <BowlingStats isLoading={isLoading} />
              </Card>
            </Box>
            <Box mb={8}>
              <Scorecard isAdmin={true} isLoading={isLoading} />
            </Box>
          </>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default MatchManagement;
