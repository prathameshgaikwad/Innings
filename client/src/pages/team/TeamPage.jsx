import {
  AspectRatio,
  Box,
  Button,
  Card,
  Divider,
  Sheet,
  Skeleton,
  Table,
  Typography,
  useTheme,
} from "@mui/joy";
import { clearTeamData, getTeamInfo } from "../../state/team/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import RecentTeamPerformance from "../../components/lists/RecentTeamPerformance";
import RectangularSkeleton from "../../components/skeletons/RectangularSkeleton";
import { TbHexagonLetterC } from "react-icons/tb";
import TournamentHeader from "../../components/tournament/TournamentHeader";
import { useMediaQuery } from "@mui/material";

const TeamPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { tournamentId } = useParams();

  const { teamId } = useParams();
  const token = useSelector((state) => state.user.token);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getTeamInfo({ teamId, token, setIsLoading }));
  }, [dispatch, teamId, token]);

  const { name, color, players, captain, logoURL } = useSelector(
    (state) => state.team
  );

  const rawPlayersData = players.map((player) => player.playerName);
  const sortedPlayersData = rawPlayersData
    .slice()
    .sort((a, b) => a.localeCompare(b));

  const handleGoBackRequest = () => {
    dispatch(clearTeamData());
    navigate(`/tournaments/${tournamentId}`);
  };

  const recentPerformance = ["W", "W", "L", "L", "D", "W"];

  return (
    <>
      <Navbar />
      <TournamentHeader id={tournamentId} isSetupComplete={true} />
      <Box
        sx={{
          my: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}>
        <Box
          sx={{
            width: isMobile ? "95%" : "80%",
            mb: isMobile ? 3 : 6,
          }}>
          <AspectRatio
            ratio={1}
            sx={{
              mx: "auto",
              height: 150,
              width: 150,
              borderRadius: "50%",
              border: "4px solid",
              borderColor: "white",
              mb: 4,
            }}>
            {isLoading ? (
              <Skeleton animation="wave" variant="circular" />
            ) : (
              <img src={logoURL}></img>
            )}
          </AspectRatio>
          <Divider
            sx={{
              "--Divider-lineColor": isLoading
                ? theme.palette.neutral[500]
                : color,
              "--Divider-thickness": "5px",
            }}>
            {isLoading ? (
              <Skeleton
                animation="wave"
                variant="text"
                level={isMobile ? "h4" : "h3"}
                width={350}
                sx={{ mx: 2 }}
              />
            ) : (
              <Typography
                level={isMobile ? "h4" : "h3"}
                sx={{
                  mx: isMobile ? 1 : 2,
                }}>
                {name}
              </Typography>
            )}
          </Divider>
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="text"
              level="body-lg"
              width={200}
              sx={{ mx: "auto", my: 2 }}
            />
          ) : (
            <Typography
              level="body-lg"
              my={2}
              justifyContent={"center"}
              startDecorator={<TbHexagonLetterC />}>
              {captain}
            </Typography>
          )}
        </Box>
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: isMobile ? "86%" : "56%",
            mb: isMobile ? 2 : 4,
            py: isMobile ? 1.5 : 3,
            px: isMobile ? 3 : 6,
          }}>
          {isLoading ? (
            <RectangularSkeleton />
          ) : (
            <Sheet sx={{ overflow: "auto", my: isMobile ? 2 : 4 }}>
              <Card variant="soft" size="lg" sx={{ mb: 3 }}>
                <RecentTeamPerformance recentPerformance={recentPerformance} />
              </Card>
              <Table
                stickyHeader
                variant="outlined"
                sx={{
                  "& thead th:nth-of-type(1)": {
                    width: "16%",
                  },
                  fontSize: isMobile ? "0.85rem" : "",
                }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAME</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPlayersData.map((name, i) => (
                    <tr key={i}>
                      {<td>{i + 1}</td>}
                      {<td>{name}</td>}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          )}
          <Button
            startDecorator={<ArrowBackIcon />}
            size={isMobile ? "md" : "lg"}
            fullWidth
            onClick={() => {
              handleGoBackRequest();
            }}
            sx={{ mb: isMobile ? 2 : 4 }}>
            Go Back
          </Button>
        </Card>
      </Box>
      <Footer />
    </>
  );
};
export default TeamPage;
