/* eslint-disable react/prop-types */

import { BiSolidCricketBall } from "react-icons/bi";
import BowlingPerformance from "./BowlingPerformance";
import SectionHeader from "../../../layouts/sections/SectionHeader";
import { Stack } from "@mui/joy";

const BowlingSection = ({ bowlingData }) => {
  return (
    <Stack
      direction={"column"}
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        mt: 4,
      }}>
      <SectionHeader
        title={"Bowling"}
        startDecorator={BiSolidCricketBall}
        level="h4"
      />
      <BowlingPerformance bowlingData={bowlingData} />
    </Stack>
  );
};

export default BowlingSection;
