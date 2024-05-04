/* eslint-disable react/prop-types */

import { Box, Typography } from "@mui/joy";

const DidNotBatSection = ({ nonBattingData }) => {
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
      <Typography level="title-sm" color="neutral">
        DID NOT BAT:
      </Typography>
      <Box sx={{ display: "inline-flex" }}>
        {nonBattingData.map((item, i) => {
          return (
            <Typography key={i} level="body-sm" color="neutral" sx={{ mx: 1 }}>
              {item}
              {i < nonBattingData.length - 1 ? "," : ""}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
};
export default DidNotBatSection;
