/* eslint-disable react/prop-types */

import { Card, Typography } from "@mui/joy";

import { MdSportsCricket } from "react-icons/md";
import TeamBadgeHorizontal from "../../../dataDisplay/TeamBadgeHorizontal";

const BattingSummary = ({ total, team }) => {
  return (
    <>
      <Typography
        level="h3"
        color="primary"
        sx={{ my: 2 }}
        startDecorator={<MdSportsCricket />}>
        Batting
      </Typography>
      <Card
        variant="soft"
        size="lg"
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          mt: 2,
        }}>
        <TeamBadgeHorizontal team={team} isSmall={true} />
        <Typography level="h4" color="primary">
          {total}
        </Typography>
      </Card>
    </>
  );
};
export default BattingSummary;
