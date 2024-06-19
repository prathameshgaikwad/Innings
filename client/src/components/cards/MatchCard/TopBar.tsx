import { CardContent, Divider, Typography, useTheme } from "@mui/joy";

import VersusIcon from "../../icons/VersusIcon";
import { useMediaQuery } from "@mui/material";

type TopBarProps = {
  match_no: number;
  battingTeamName: string;
  bowlingTeamName: string;
};

const TopBar: React.FC<TopBarProps> = ({
  match_no,
  battingTeamName,
  bowlingTeamName,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <CardContent
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Typography level={isMobile ? "title-lg" : "h4"} color="neutral">
          # {match_no}
        </Typography>
        <Divider orientation="vertical" />
        <Typography
          level={isMobile ? "title-lg" : "h4"}
          sx={{ color: "text.tertiary" }}>
          {battingTeamName}
        </Typography>
        <VersusIcon />
        <Typography
          level={isMobile ? "title-lg" : "h4"}
          sx={{ color: "text.tertiary" }}>
          {bowlingTeamName}
        </Typography>
      </CardContent>
      <Divider inset="context" />
    </>
  );
};

export default TopBar;
