/* eslint-disable react/prop-types */

import { Box, Card, Typography } from "@mui/joy";

const DidNotBatSection = ({ nonBattingData }) => {
  return (
    <Card
      variant="outlined"
      size="md"
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        mb: 2,
      }}>
      <Typography level="title-sm" color="neutral">
        DID NOT BAT:
      </Typography>
      <Box sx={{ display: "inline-flex" }}>
        {nonBattingData.map((item, i) => {
          return (
            <Typography key={i} level="body-sm" color="neutral" sx={{ mx: 1 }}>
              {item},
            </Typography>
          );
        })}
      </Box>
    </Card>
  );
};
export default DidNotBatSection;
