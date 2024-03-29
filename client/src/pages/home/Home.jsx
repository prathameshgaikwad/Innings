import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Box from "@mui/joy/Box";
import CustomToast from "../../components/cards/CustomToast";
import Footer from "../../components/common/Footer";
import LiveMatch from "../../components/match/LiveMatch";
import Navbar from "../../components/common/Navbar";
import NoTournamentsJoined from "../../components/cards/NoTournamentsJoined";
import { Skeleton } from "@mui/joy";
import UpcomingMatches from "../../components/lists/UpcomingMatches";
import { tournamentsApi } from "../../services/api";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/joy/styles";

const HomePage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  const [isLoading, setIsLoading] = useState(true);

  const username = user && user.firstName;
  const userId = user && user._id;

  useEffect(() => {
    dispatch(
      tournamentsApi.getLatestTournamentDetails({ userId, token, setIsLoading })
    );
    dispatch(
      tournamentsApi.getJoinedTournaments({ userId, token, setIsLoading })
    );
  }, [dispatch, userId, token]);

  const latestTournament = useSelector(
    (state) => state.tournaments.latestTournament
  );

  const joinedTournaments = useSelector(
    (state) => state.tournaments.joinedTournaments
  );

  let tournamentId = "";

  if (latestTournament) {
    tournamentId = latestTournament._id;
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 73px)",
          pt: isMobile ? 4 : 6,
          maxWidth: isMobile ? "85vw" : "70vw",
          mx: "auto",
        }}>
        {isLoading ? (
          <Skeleton width={"100%"} height={"100%"} />
        ) : (
          <>
            {latestTournament && tournamentId.length >= 0 ? (
              <Box sx={{ mb: 8, textAlign: "center" }}>
                <LiveMatch tournamentId={tournamentId} />
                <UpcomingMatches tournamentId={tournamentId} />
              </Box>
            ) : (
              <>
                <NoTournamentsJoined />
                {joinedTournaments && joinedTournaments.length === 0 ? (
                  <CustomToast
                    color={"warning"}
                    title={"You've not joined any tournaments."}
                    content={"Please join a tournament to see the matches!"}
                    duration={5000}
                  />
                ) : (
                  <CustomToast
                    color={"neutral"}
                    content={`All tournaments you've joined are currently inactive.`}
                    title={`Hey, ${username}!`}
                    duration={5000}
                  />
                )}
              </>
            )}
          </>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default HomePage;
