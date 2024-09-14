import { Button, Card, useTheme } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar/Navbar";
import PageContainer from "../../components/layouts/pages/PageContainer";
import RectangularSkeleton from "../../components/skeletons/RectangularSkeleton";
import TeamPageHeader from "../../components/teamPage/TeamPageHeader";
import TeamPlayersSheet from "../../components/tables/TeamPlayersSheet";
import { clearTeamData } from "../../state/team/teamSlice";
import { teamApi } from "../../services/api";
import { useMediaQuery } from "@mui/material";

const TeamPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { tournamentId, teamId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.user.token);

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
      <PageContainer customStyles={{ mb: 8 }}>
        <TeamPageHeader
          name={name}
          isLoading={isLoading}
          logo_url={logo_url}
          captain_name={captain_name}
          team_color={team_color}
        />
        <Card
          variant="outlined"
          size="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "86%",
            mb: isMobile ? 2 : 4,
            px: isMobile ? 3 : 6,
            borderWidth: 3,
          }}>
          {isLoading ? (
            <RectangularSkeleton />
          ) : (
            <TeamPlayersSheet players={players} performance={performance} />
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
