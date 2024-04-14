/* eslint-disable react/prop-types */

import { Card, Typography } from "@mui/joy";

import { CARD_BOX_SHADOW_SMALL } from "../../utilities/constants";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NextMatchSkeleton from "../skeletons/NextMatchSkeleton";

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
            display: "inline-flex",
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
          <Typography level="title-sm">
            {nextMatch.team1} vs {nextMatch.team2}
          </Typography>
        </Card>
      )}
    </>
  );
};

export default NextMatchCard;
