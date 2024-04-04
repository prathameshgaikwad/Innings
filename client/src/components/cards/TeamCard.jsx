/* eslint-disable react/prop-types */

import { Box, Divider } from "@mui/joy";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import LinkedButton from "../buttons/LinkedButton";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { TbHexagonLetterC } from "react-icons/tb";
import { TbSteam } from "react-icons/tb";
import TeamCardSkeleton from "../skeletons/TeamCardSkeleton";
import Typography from "@mui/joy/Typography";
import { useParams } from "react-router-dom";

const TeamCard = ({ team, isLoading }) => {
  const { color, logoURL, name, captainName, players, _id } = team;
  const size = players.length;
  const { tournamentId } = useParams();
  return (
    <>
      {isLoading ? (
        <TeamCardSkeleton />
      ) : (
        <Card
          sx={{
            textAlign: "center",
            alignItems: "center",
            "--icon-size": "90px",
            width: 250,
          }}>
          <CardOverflow variant="soft" sx={{ backgroundColor: color }}>
            <AspectRatio
              variant="outlined"
              ratio="1"
              sx={{
                m: "auto",
                transform: "translateY(50%)",
                borderRadius: "50%",
                backgroundColor: color,
                width: "var(--icon-size)",
                position: "relative",
              }}>
              {!logoURL ? (
                <TbSteam style={{ padding: 10, color: "#222" }} />
              ) : (
                <img src={logoURL} style={{ backgroundSize: "cover" }} />
              )}
            </AspectRatio>
          </CardOverflow>
          <Typography
            level="title-lg"
            maxWidth={200}
            sx={{ mt: "calc(var(--icon-size) / 2)" }}
            noWrap>
            {name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.8,
              my: 1,
            }}>
            <Typography
              level="body-xs"
              mx={2}
              startDecorator={<TbHexagonLetterC size={16} />}>
              {captainName}
            </Typography>
            <Divider orientation="horizontal" />
            <Typography
              level="body-xs"
              mx={2}
              startDecorator={<PeopleAltIcon />}>
              {size} Players
            </Typography>
          </Box>
          <LinkedButton
            title={"View Team"}
            size={"sm"}
            link={`/tournaments/${tournamentId}/teams/${_id}`}
            width={200}
            my={1}
          />
        </Card>
      )}
    </>
  );
};

export default TeamCard;
