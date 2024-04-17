/* eslint-disable react/prop-types */

import { Card, CardContent, CardOverflow, useTheme } from "@mui/joy";

import BottomBar from "./BottomBar";
import { CARD_BOX_SHADOW_GLOW_EFFECT } from "../../../utilities/constants";
import ScorePane from "./ScorePane";
import TeamBadgeVertical from "../../TeamBadgeVertical";
import TopBar from "./TopBar";
import { useMediaQuery } from "@mui/material";

const totalRuns = "91";
const totalWickets = "2";
const oversCompleted = "6.3";
const currentRunRate = "13.86";
const progress = 63;

const MatchCardContent = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTab = useMediaQuery(theme.breakpoints.down(650));
  return (
    <Card
      variant="outlined"
      sx={{
        width: isTab ? "96%" : "72%",
        minWidth: "72%",
        outline: `2px solid `,
        transition: "all 0.3s ease-in-out",
        outlineColor: "transparent",
        "&:hover": {
          outlineColor: ` ${theme.palette.primary.softHoverBg}`,
          boxShadow: CARD_BOX_SHADOW_GLOW_EFFECT,
        },
      }}>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <TopBar
          match_no={data.match_no}
          battingTeamName={data.battingTeam.name}
          bowlingTeamName={data.bowlingTeam.name}
        />
      </CardOverflow>
      <CardContent
        sx={{
          my: isMobile ? 2 : 4,
          mx: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}>
        <TeamBadgeVertical
          color={data.battingTeam.team_color}
          logoURL={data.battingTeam.logo_url}
          nameShort={data.battingTeam.name_short}
          widths={[65, 90]}
        />
        <ScorePane
          totalRuns={totalRuns}
          totalWickets={totalWickets}
          overs={data.overs}
          oversCompleted={oversCompleted}
          currentRunRate={currentRunRate}
        />
        <TeamBadgeVertical
          color={data.bowlingTeam.team_color}
          logoURL={data.bowlingTeam.logo_url}
          nameShort={data.bowlingTeam.name_short}
          widths={[65, 90]}
        />
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <BottomBar overs={data.overs} venue={data.venue} progress={progress} />
      </CardOverflow>
    </Card>
  );
};

export default MatchCardContent;
