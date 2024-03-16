/* eslint-disable react/prop-types */

import { Box, Link, Stack, Tooltip } from "@mui/joy";

import AspectRatio from "@mui/joy/AspectRatio";
import LogItem from "../LogItem";
import { TbSteam } from "react-icons/tb";
import TeamBadgeHorizontalSkeleton from "../skeletons/TeamBadgeHorizontalSkeleton";
import Typography from "@mui/joy/Typography";
import { useParams } from "react-router-dom";

const TeamBadgeHorizontal = ({ team, isSmall, isLoading }) => {
  const { color, logoURL, name, _id } = team;
  const { tournamentId } = useParams();
  const recentPerformance = ["L", "W", "D", "W"];
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
          <Tooltip variant="outlined" title={"Recent Performance"}>
            <Stack direction={"row"} gap={1}>
              {recentPerformance.map((item, i) => {
                let type = "";
                switch (item) {
                  case "W":
                    type = "success";
                    break;
                  case "L":
                    type = "danger";
                    break;
                  default:
                    type = "neutral";
                }
                return (
                  <LogItem key={i} item={item} type={type} isSmall={true} />
                );
              })}
            </Stack>
          </Tooltip>
        </Box>
      )}
    </>
  );
};

export default TeamBadgeHorizontal;
