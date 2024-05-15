/* eslint-disable react/prop-types */

import { Card, Stack, Typography } from "@mui/joy";

import { CARD_BOX_SHADOW_SMALL } from "../../utilities/constants";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NextMatchSkeleton from "../skeletons/NextMatchSkeleton";
import VersusIcon from "../icons/VersusIcon";

const NextMatchCard = ({ isLoading, nextMatch }) => {
  return (
    <>
      {isLoading ? (
        <NextMatchSkeleton />
      ) : (
        <Card
          variant="soft"
          size="md"
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: 4,
            boxShadow: CARD_BOX_SHADOW_SMALL,
          }}>
          <Typography
            level="title-sm"
            color="warning"
            endDecorator={<NavigateNextIcon />}>
            Next Match
          </Typography>
          <Stack
            direction={"row"}
            gap={0.5}
            alignItems={"center"}
            justifyContent={"center"}>
            <Typography level="title-sm">{nextMatch.team1}</Typography>
            <VersusIcon />
            <Typography level="title-sm">{nextMatch.team2}</Typography>
          </Stack>
        </Card>
      )}
    </>
  );
};

export default NextMatchCard;
