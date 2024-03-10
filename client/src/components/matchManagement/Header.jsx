import { Box, Button, Typography, useTheme } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TeamBadgeHorizontal from "./TeamBadgeHorizontal";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const Header = () => {
  const { team1, team2, match_no } = useSelector(
    (state) => state.matchManagement
  );
  const matchNumber = match_no;
  const team1name = team1.name;
  const team1nameShort = team1.nameShort;
  const team1Color = team1.color;
  const team2name = team2.name;
  const team2nameShort = team2.nameShort;
  const team2Color = team2.color;

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { tournamentId } = useParams();
  const { matchId } = useParams();

  const handleGoBackRequest = () => {
    navigate(`/tournaments/${tournamentId}/${matchId}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: isMobile ? 2 : 4,
        }}>
        <Typography level={isMobile ? "h3" : "h1"} sx={{ opacity: 0.5 }}>
          # {matchNumber}
        </Typography>
        <TeamBadgeHorizontal
          teamColor={team1Color}
          name={team1name}
          nameShort={team1nameShort}
        />
        <Typography level={isMobile ? "h4" : "h3"} color="neutral">
          vs
        </Typography>
        <TeamBadgeHorizontal
          teamColor={team2Color}
          name={team2name}
          nameShort={team2nameShort}
        />
      </Box>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<ArrowBackIcon />}
        onClick={() => handleGoBackRequest()}>
        Go Back
      </Button>
    </Box>
  );
};

export default Header;
