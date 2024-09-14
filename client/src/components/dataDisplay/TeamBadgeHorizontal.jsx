/* eslint-disable react/prop-types */

import { Box, Link } from "@mui/joy";

import AspectRatio from "@mui/joy/AspectRatio";
import { TbSteam } from "react-icons/tb";
import TeamBadgeHorizontalSkeleton from "../skeletons/TeamBadgeHorizontalSkeleton";
import TeamPerformance from "../lists/TeamPerformance";
import Typography from "@mui/joy/Typography";
import { useParams } from "react-router-dom";

const TeamBadgeHorizontal = ({ team, isSmall, isLoading }) => {
  const { team_color, logo_url, name, _id, performance } = team;
  const { tournamentId } = useParams();

  const teamPageLink = `/teams/${_id}`;

  return (
    <>
      {isLoading ? (
        <TeamBadgeHorizontalSkeleton isSmall={isSmall} />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}>
          <Link href={teamPageLink}>
            <AspectRatio
              ratio="1"
              sx={{
                borderRadius: "50%",
                border: `${isSmall ? 3 : 4}px solid`,
                borderColor: team_color ?? "#222",
                width: isSmall ? 35 : 40,
                mr: 2,
              }}>
              {!logo_url ? (
                <TbSteam style={{ padding: 10, color: "#222" }} />
              ) : (
                <img src={logo_url} style={{ backgroundSize: "cover" }} />
              )}
            </AspectRatio>
            <Typography level={isSmall ? "title-md" : "h4"} noWrap>
              {name ?? ""}
            </Typography>
          </Link>
          {performance && performance.length > 0 && (
            <TeamPerformance performance={performance} size={5} />
          )}
        </Box>
      )}
    </>
  );
};

export default TeamBadgeHorizontal;
