/* eslint-disable react/prop-types */

import { Box } from "@mui/joy";

const ScorecardContainer = ({ children }) => {
  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      {children}
    </Box>
  );
};

export default ScorecardContainer;
