import { Box, useTheme } from "@mui/joy";
import {
  clearMatchManagementData,
  setMatch,
} from "../../state/match/matchManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Footer from "../../components/common/Footer";
import Header from "../../components/matchManagement/Header";
import MainContent from "../../components/matchManagement/MainContent/MainContent";
import Navbar from "../../components/common/Navbar/Navbar";
import PageContainer from "../../components/layouts/pages/PageContainer";
import Scorecard from "../../components/match/Scorecard/Scorecard";
import SocketHandler from "../../components/SocketHandler";
import TossProvider from "../../components/TossProvider";
import { matchApi } from "../../services/api";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import useSocket from "../../hooks/useSocket";

const MatchManagement = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { token } = useSelector((state) => state.user);
  const { matchId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSocket();

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

    return () => {
      dispatch(clearMatchManagementData());
    };
  }, [setIsLoading, matchId, token]);

  const { innings, current_innings_no, battingTeam, bowlingTeam, match_no } =
    useSelector((state) => state.matchManagement) || {};
  const fallOfWicketsData =
    innings[current_innings_no - 1]?.data?.fall_of_wickets_log ?? [];

  return (
    <>
      <Navbar />
      <PageContainer
        customStyles={{ gap: 2, maxWidth: isMobile ? "85vw" : "80vw" }}>
        <SocketHandler matchId={matchId} socket={socket} isAdmin={true}>
          <Header
            isLoading={isLoading}
            team1={battingTeam}
            team2={bowlingTeam}
            match_no={match_no}
          />
          <TossProvider
            isLoading={isLoading}
            matchId={matchId}
            team1={battingTeam}
            team2={bowlingTeam}
            canConductToss={true}>
            <>
              <MainContent isLoading={isLoading} socket={socket} />
              <Box mb={8}>
                <Scorecard
                  matchId={matchId}
                  isAdmin={true}
                  isLoading={isLoading}
                  innings={innings}
                  current_innings_no={current_innings_no}
                  fallOfWicketsData={fallOfWicketsData}
                />
              </Box>
            </>
          </TossProvider>
        </SocketHandler>
      </PageContainer>
      <Footer />
    </>
  );
};

export default MatchManagement;
