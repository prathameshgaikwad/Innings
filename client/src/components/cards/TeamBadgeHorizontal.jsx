/* eslint-disable react/prop-types */

import { Box, Link } from "@mui/joy";

import AspectRatio from "@mui/joy/AspectRatio";
import { TbSteam } from "react-icons/tb";
import TeamBadgeHorizontalSkeleton from "../skeletons/TeamBadgeHorizontalSkeleton";
import TeamPerformance from "../lists/TeamPerformance";
import Typography from "@mui/joy/Typography";
import { useParams } from "react-router-dom";

const TeamBadgeHorizontal = ({ team, isSmall, isLoading }) => {
  const { color, logoURL, name, _id, performance } = team;
  const { tournamentId } = useParams();

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
          <Link href={`/tournaments/${tournamentId}/teams/${_id}`}>
            <AspectRatio
              ratio="1"
              sx={{
                borderRadius: "50%",
                border: "4px solid",
                borderColor: color,
                width: isSmall ? 40 : 50,
                mr: 2,
              }}>
              {!logoURL ? (
                <TbSteam style={{ padding: 10, color: "#222" }} />
              ) : (
                <img src={logoURL} style={{ backgroundSize: "cover" }} />
              )}
            </AspectRatio>
            <Typography level={isSmall ? "title-lg" : "h3"}>{name}</Typography>
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
