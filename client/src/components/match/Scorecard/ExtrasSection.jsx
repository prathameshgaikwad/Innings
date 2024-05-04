/* eslint-disable react/prop-types */

import { Box, Stack, Typography } from "@mui/joy";

import DataChip from "../../dataDisplay/DataChip";

const ExtrasSection = ({ extras }) => {
  const { wides, no_balls, byes, leg_byes, penalties } = extras;
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        p: 1,
      }}>
      <Typography level="title-sm" color="danger">
        EXTRAS: {extras.total}
      </Typography>
      <Stack direction={"row"} spacing={1}>
        <DataChip title={"Wides"} value={wides} />
        <DataChip title={"No Balls"} value={no_balls} />
        <DataChip title={"Byes"} value={byes} />
        <DataChip title={"Leg Byes"} value={leg_byes} />
        <DataChip title={"Penalty Runs"} value={penalties} />
      </Stack>
    </Box>
  );
};

export default ExtrasSection;
