/* eslint-disable react/prop-types */

import { Stack, Typography } from "@mui/joy";

import { BiSolidCricketBall } from "react-icons/bi";

const CurrentBowlerData = ({ bowlerData }) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Typography
        level={"body-sm"}
        color="neutral"
        fontWeight={"lg"}
        startDecorator={
          <BiSolidCricketBall fontSize={16} style={{ marginRight: 4 }} />
        }
        noWrap>
        {bowlerData.name}
      </Typography>
      <Stack direction={"row"} justifyContent={"space-between"} gap={1}>
        <Typography level={"body-sm"} color="neutral" noWrap fontWeight={"lg"}>
          {`${bowlerData.runs_conceded || 0} - ${
            bowlerData.wickets_taken || 0
          }`}
        </Typography>
        <Typography
          level={"body-sm"}
          color="neutral"
          noWrap
          sx={{ opacity: 0.75 }}>
          {`(${bowlerData.overs_bowled || 0}.${bowlerData.balls_bowled || 0})`}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CurrentBowlerData;
