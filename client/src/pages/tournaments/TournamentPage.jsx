import { Box, useTheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Footer from "../../components/common/Footer";
import ManageEventAlert from "../../components/ManageEventAlert";
import Navbar from "../../components/common/Navbar/Navbar";
import NextMatchCard from "../../components/cards/NextMatchCard";
import PointsTable from "../../components/tables/PointsTable/PointsTable";
import ScheduleOfMatches from "../../components/tables/ScheduleOfMatches/ScheduleOfMatches";
import SimpleMatchCard from "../../components/cards/SimpleMatchCard/SimpleMatchCard";
import TeamsList from "../../components/lists/TeamsList";
import TournamentHeader from "../../components/tournament/TournamentHeader";
import { tournamentPageApi } from "../../services/api";
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

  useEffect(() => {
    dispatch(
      tournamentPageApi.getTournamentFixtures({
        tournamentId,
        token,
        setIsLoading,
      })
    );
  }, [dispatch, tournamentId, token]);

  const fixturesData = useSelector((state) => state.tournamentPage.fixtures);

  const matchData = fixturesData[0];
  const nextMatch =
    fixturesData.length > 1
      ? {
          team1: fixturesData[1].team1Details.name_short,
          team2: fixturesData[1].team2Details.nameShort,
        }
      : {};

  return (
    <>
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
          <NextMatchCard isLoading={isLoading} nextMatch={nextMatch} />
        )}
        <PointsTable />
        <ScheduleOfMatches isLoading={isLoading} />
        <TeamsList isSetupPage={false} />
        {isAdmin && <ManageEventAlert eventType={"tournament"} />}
      </Box>
      <Footer />
    </>
  );
};
export default TournamentPage;
