/* eslint-disable react/prop-types */

import { Box, Button, Typography, useTheme } from "@mui/joy";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TeamBadgeHorizontal from "../TeamBadgeHorizontal";
import { useMediaQuery } from "@mui/material";

const Header = ({ isLoading, team1, team2, match_no }) => {
  const matchNumber = match_no;

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
          team={team1}
          isSmall={false}
          isLoading={isLoading}
        />
        <Typography level={isMobile ? "h4" : "h3"} color="neutral">
          vs
        </Typography>
        <TeamBadgeHorizontal
          team={team2}
          isSmall={false}
          isLoading={isLoading}
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
