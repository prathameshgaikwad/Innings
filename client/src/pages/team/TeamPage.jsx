import {
  AspectRatio,
  Avatar,
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import PageContainer from "../../components/layouts/pages/PageContainer";
import RectangularSkeleton from "../../components/skeletons/RectangularSkeleton";
import { TbHexagonLetterC } from "react-icons/tb";
import TeamPerformance from "../../components/lists/TeamPerformance";
import TournamentHeader from "../../components/tournament/TournamentHeader";
import { clearTeamData } from "../../state/team/teamSlice";
import { teamApi } from "../../services/api";
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
    dispatch(teamApi.getTeamInfo({ teamId, token, setIsLoading }));
  }, [dispatch, teamId, token]);

  const { name, team_color, players, captain_name, logo_url, performance } =
    useSelector((state) => state.team);

  const handleGoBackRequest = () => {
    dispatch(clearTeamData());
    navigate(`/tournaments/${tournamentId}`);
  };

  return (
    <>
      <Navbar />
      <TournamentHeader id={tournamentId} isSetupComplete={true} />
      <PageContainer customStyles={{ mb: 8 }}>
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
              <img src={logo_url}></img>
            )}
          </AspectRatio>
          <Divider
            sx={{
              "--Divider-lineColor": isLoading
                ? theme.palette.neutral[500]
                : team_color,
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
              {captain_name}
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
            width: isMobile ? "86%" : "66%",
            mb: isMobile ? 2 : 4,
            py: isMobile ? 1.5 : 3,
            px: isMobile ? 3 : 6,
          }}>
          {isLoading ? (
            <RectangularSkeleton />
          ) : (
            <Sheet sx={{ overflow: "auto", my: isMobile ? 2 : 4 }}>
              {performance && performance.length > 0 && (
                <Card variant="soft" size="lg" sx={{ mb: 3 }}>
                  <TeamPerformance performance={performance} size={10} />
                </Card>
              )}
              <Table
                stickyHeader
                variant="outlined"
                sx={{
                  "& thead th:nth-of-type(1)": {
                    width: "12%",
                  },
                  "& thead th:nth-of-type(2)": {
                    width: "18%",
                  },
                  fontSize: isMobile ? "0.85rem" : "",
                }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th></th>
                    <th>NAME</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, i) => (
                    <tr key={player._id}>
                      {<td>{i + 1}</td>}
                      {
                        <td>
                          <Avatar
                            src={player.picture_url}
                            color="neutral"
                            sx={{ border: "2px solid" }}
                          />
                        </td>
                      }
                      {<td>{player.first_name + " " + player.last_name}</td>}
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
      </PageContainer>
      <Footer />
    </>
  );
};
export default TeamPage;
